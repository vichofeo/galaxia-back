// Servicio core del engine transversal de Galaxia
// Incluye validación de ciclos en transiciones (pág. 5-18)
const QUtils = require('../../utils/queries/Qutils');
const qUtil = new QUtils();
const safeEval = require('safe-eval');
const HandleErrors = require('../../utils/handleErrors');

const hardcodedUsers = ['admin', 'user1', 'user2'];
const hardcodedRoleMappings = { 1: ['admin'], 2: ['user1', 'user2'] };

const detectCycle = (activities, transitions, newTransition = null) => {
  // Construir grafo dirigido
  const graph = {};
  activities.forEach(act => graph[act.activity_id] = []);
  transitions.forEach(tr => graph[tr.act_from_id].push(tr.act_to_id));
  if (newTransition) {
    graph[newTransition.act_from_id] = graph[newTransition.act_from_id] || [];
    graph[newTransition.act_from_id].push(newTransition.act_to_id);
  }

  // DFS para detectar ciclos
  const visited = new Set();
  const recStack = new Set();
  const dfs = (node, parentPath = []) => {
    if (!visited.has(node)) {
      visited.add(node);
      recStack.add(node);
      parentPath.push(node);

      for (const neighbor of graph[node] || []) {
        if (!visited.has(neighbor)) {
          if (dfs(neighbor, [...parentPath])) {
            return true; // Ciclo encontrado
          }
        } else if (recStack.has(neighbor)) {
          return true; // Ciclo encontrado
        }
      }
    }
    recStack.delete(node);
    return false;
  };

  // Probar desde cada nodo
  for (const node of Object.keys(graph).map(Number)) {
    if (!visited.has(node)) {
      if (dfs(node)) {
        return true; // Ciclo encontrado
      }
    }
  }
  return false; // Sin ciclos
};

const validateProcess = async (processId, newTransition = null, handleError = new HandleErrors()) => {
  const dto = { where: { p_id: processId } };
  const process = await qUtil.findOne('galaxia_processes', dto);
  if (process.error) {
    handleError.addError(process.error);
    return { valid: false, errors: handleError.getErrors() };
  }

  const activities = await qUtil.findAll('galaxia_activities', dto);
  const transitions = await qUtil.findAll('galaxia_transitions', dto);

  if (activities.error || transitions.error) {
    handleError.addError('Error cargando actividades/transiciones');
    return { valid: false, errors: handleError.getErrors() };
  }

  const starts = activities.data.filter(act => act.activity_type === 'start');
  const ends = activities.data.filter(act => act.activity_type === 'end');

  if (starts.length === 0 || ends.length === 0) {
    handleError.addError('Proceso sin start o end');
  }

  const graph = {};
  activities.data.forEach(act => graph[act.activity_id] = []);
  transitions.data.forEach(tr => graph[tr.act_from_id].push(tr.act_to_id));

  const visited = new Set();
  const queue = starts.map(s => s.activity_id);
  while (queue.length > 0) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);
    graph[current].forEach(next => queue.push(next));
  }

  const reachableEnds = ends.filter(e => visited.has(e.activity_id));
  if (reachableEnds.length !== ends.length) {
    handleError.addError('No todos los ends son reachable');
  }

  // Validar ciclos
  if (detectCycle(activities.data, transitions.data, newTransition)) {
    handleError.addError('La transición crea un ciclo en el proceso');
  }

  return { valid: !handleError.hasErrors(), errors: handleError.getErrors() };
};

const routeInstance = async (instanceId, handleError = new HandleErrors()) => {
  const instance = await qUtil.findById('galaxia_instances', instanceId, {
    include: [{ model: 'galaxia_workitems', as: 'workitems', include: ['activity'] }]
  });
  if (instance.error) {
    handleError.addError(instance.error);
    return { success: false };
  }

  const propsResult = await qUtil.findAll('galaxia_instance_properties', { where: { instance_id: instanceId } });
  const context = propsResult.data.reduce((ctx, p) => {
    ctx[p.name] = p.value;
    return ctx;
  }, {});

  const currentWorkitems = instance.data.workitems.filter(w => w.status === 'r' && !w.ended);
  if (currentWorkitems.length === 0) {
    handleError.addError('No hay workitems activos');
    return { success: false };
  }

  for (const workitem of currentWorkitems) {
    const currentActivity = workitem.activity;
    if (currentActivity.is_auto_routed === 'y') {
      let nextActivityIds = [];
      const transitions = await qUtil.findAll('galaxia_transitions', { where: { act_from_id: currentActivity.activity_id } });

      if (currentActivity.activity_type === 'split') {
        nextActivityIds = transitions.data.map(tr => tr.act_to_id);
      } else if (currentActivity.activity_type === 'switch') {
        const conditions = currentActivity.switch_conditions || [];
        let matched = false;
        for (const rule of conditions) {
          try {
            const isTrue = safeEval(rule.condition, context);
            if (isTrue) {
              nextActivityIds = [rule.act_to_id];
              matched = true;
              break;
            }
          } catch (e) {
            handleError.addError(`Error evaluando condición "${rule.condition}": ${e.message}`);
          }
        }
        if (!matched && transitions.data.length > 0) {
          nextActivityIds = [transitions.data[0].act_to_id];
          handleError.addError('Condición switch no matched, usando default');
        }
      } else {
        nextActivityIds = [transitions.data[0]?.act_to_id];
      }

      for (const nextId of nextActivityIds) {
        await setNextActivity(instanceId, nextId, handleError);
      }
    }
  }

  return { success: !handleError.hasErrors() };
};

const complete = async (instanceId, activityId, handleError = new HandleErrors()) => {
  const activity = await qUtil.findById('galaxia_activities', activityId);
  if (activity.error || !activity.data) {
    handleError.addError('Actividad no encontrada');
    return { success: false };
  }

  const propsResult = await qUtil.findAll('galaxia_instance_properties', { where: { instance_id: instanceId } });
  let context = propsResult.data.reduce((ctx, p) => {
    ctx[p.name] = p.value;
    return ctx;
  }, {});

  if (['activity', 'standalone'].includes(activity.data.activity_type) && activity.data.code) {
    try {
      const updatedProps = safeEval(activity.data.code, {
        properties: context,
        Math,
        Date
      });
      if (updatedProps && typeof updatedProps === 'object') {
        await handleProperties(instanceId, updatedProps, handleError);
      }
    } catch (e) {
      handleError.addError(`Error ejecutando código de actividad ${activity.data.name}: ${e.message}`);
    }
  }

  const updateDto = { ended: Date.now() / 1000, status: 'c' };
  const result = await qUtil.update('galaxia_workitems', { where: { instance_id: instanceId, activity_id: activityId, status: 'r' } }, updateDto);
  if (result.error) {
    handleError.addError(result.error);
  }

  if (activity.data.activity_type === 'join') {
    const incomingTransitions = await qUtil.findAll('galaxia_transitions', { where: { act_to_id: activityId } });
    let allCompleted = true;
    for (const tr of incomingTransitions.data) {
      const prevWorkitem = await qUtil.findOne('galaxia_workitems', { where: { instance_id: instanceId, activity_id: tr.act_from_id } });
      if (!prevWorkitem.data || prevWorkitem.data.status !== 'c') {
        allCompleted = false;
        break;
      }
    }
    if (!allCompleted) {
      return { success: true };
    }
  }

  await routeInstance(instanceId, handleError);
  return { success: !handleError.hasErrors() };
};

const setNextActivity = async (instanceId, nextActivityId, handleError = new HandleErrors()) => {
  const createDto = {
    instance_id: instanceId,
    activity_id: nextActivityId,
    started: Date.now() / 1000,
    status: 'r'
  };
  const result = await qUtil.create('galaxia_workitems', createDto);
  if (result.error) {
    handleError.addError(result.error);
  }
  return { success: !handleError.hasErrors() };
};

const checkRole = (user, roleId, handleError = new HandleErrors()) => {
  if (!hardcodedUsers.includes(user)) {
    handleError.addError('Usuario no válido');
    return false;
  }
  const usersInRole = hardcodedRoleMappings[roleId] || [];
  if (!usersInRole.includes(user)) {
    handleError.addError('Usuario sin rol');
    return false;
  }
  return true;
};

const setNextUser = async (instanceId, activityId, nextUser, handleError = new HandleErrors()) => {
  if (!hardcodedUsers.includes(nextUser)) {
    handleError.addError('Next user no válido');
    return { success: false };
  }
  const updateDto = { user: nextUser };
  const result = await qUtil.update('galaxia_workitems', { where: { instance_id: instanceId, activity_id: activityId, status: 'r' } }, updateDto);
  if (result.error) {
    handleError.addError(result.error);
  }
  return { success: !handleError.hasErrors() };
};

const handleProperties = async (instanceId, properties, handleError = new HandleErrors()) => {
  const instance = await qUtil.findById('galaxia_instances', instanceId);
  if (instance.error || !instance.data) {
    handleError.addError('Instancia no encontrada');
    return { success: false };
  }

  for (const [name, value] of Object.entries(properties)) {
    const existing = await qUtil.findOne('galaxia_instance_properties', {
      where: { instance_id: instanceId, name }
    });
    if (existing.data) {
      const result = await qUtil.update(
        'galaxia_instance_properties',
        { where: { instance_id: instanceId, name } },
        { value }
      );
      if (result.error) {
        handleError.addError(`Error al actualizar propiedad ${name}`);
      }
    } else {
      const createDto = {
        instance_id: instanceId,
        name,
        value
      };
      const result = await qUtil.create('galaxia_instance_properties', createDto);
      if (result.error) {
        handleError.addError(`Error al crear propiedad ${name}`);
      }
    }
  }

  return { success: !handleError.hasErrors() };
};

const submitForm = async (instanceId, activityId, formData, handleError = new HandleErrors()) => {
  const activity = await qUtil.findById('galaxia_activities', activityId);
  if (activity.error || !activity.data) {
    handleError.addError('Actividad no encontrada');
    return { success: false };
  }
  if (activity.data.is_interactive !== 'y') {
    handleError.addError('Actividad no es interactiva');
    return { success: false };
  }

  const formFields = activity.data.form_fields || [];
  for (const field of formFields) {
    if (field.required && (formData[field.name] === undefined || formData[field.name] === null)) {
      handleError.addError(`Campo requerido ${field.name} no proporcionado`);
    }
    if (formData[field.name] !== undefined && formData[field.name] !== null) {
      if (field.type === 'number' && isNaN(formData[field.name])) {
        handleError.addError(`Campo ${field.name} debe ser un número`);
      }
      if (field.type === 'string' && typeof formData[field.name] !== 'string') {
        handleError.addError(`Campo ${field.name} debe ser una cadena`);
      }
    }
  }

  if (handleError.hasErrors()) {
    return { success: false, errors: handleError.getErrors() };
  }

  await handleProperties(instanceId, formData, handleError);
  if (handleError.hasErrors()) {
    return { success: false, errors: handleError.getErrors() };
  }

  if (activity.data.is_auto_routed === 'y') {
    await complete(instanceId, activityId, handleError);
  }

  return { success: !handleError.hasErrors() };
};

module.exports = {
  validateProcess,
  detectCycle,
  routeInstance,
  complete,
  setNextActivity,
  checkRole,
  setNextUser,
  handleProperties,
  submitForm
};