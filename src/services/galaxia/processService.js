// Servicio para operaciones de Process Manager
const QUtils = require('../../utils/queries/Qutils');
const qUtil = new QUtils();

const getProcesses = async (handleError) => {
  const result = await qUtil.findAll('galaxia_processes', {});
  if (result.error) {
    handleError.addError(result.error);
    return { data: [] };
  }
  return { data: result.data };
};

const getProcess = async (id, handleError) => {
  const result = await qUtil.findById('galaxia_processes', id, {
    include: [
      { model: 'galaxia_activities', as: 'activities' },
      { model: 'galaxia_transitions', as: 'transitions' },
      { model: 'galaxia_roles', as: 'roles' }
    ]
  });
  if (result.error) {
    handleError.addError(result.error);
    return { data: null };
  }
  return { data: result.data };
};

const createProcess = async (data, handleError) => {
  const result = await qUtil.create('galaxia_processes', data);
  if (result.error) {
    handleError.addError(result.error);
    return { data: null };
  }
  return { data: result.data };
};

const updateProcess = async (id, data, handleError) => {
  const result = await qUtil.update('galaxia_processes', { where: { p_id: id } }, data);
  if (result.error) {
    handleError.addError(result.error);
    return { data: null };
  }
  return { data: result.data };
};

const createActivity = async (processId, data, handleError) => {
  const process = await qUtil.findById('galaxia_processes', processId);
  if (process.error || !process.data) {
    handleError.addError('Proceso no encontrado');
    return { data: null };
  }
  data.p_id = processId;
  const result = await qUtil.create('galaxia_activities', data);
  if (result.error) {
    handleError.addError(result.error);
    return { data: null };
  }
  return { data: result.data };
};

const updateActivity = async (processId, id, data, handleError) => {
  const process = await qUtil.findById('galaxia_processes', processId);
  if (process.error || !process.data) {
    handleError.addError('Proceso no encontrado');
    return { data: null };
  }
  const result = await qUtil.update('galaxia_activities', { where: { activity_id: id, p_id: processId } }, data);
  if (result.error) {
    handleError.addError(result.error);
    return { data: null };
  }
  return { data: result.data };
};

const createTransition = async (processId, data, handleError) => {
  const process = await qUtil.findById('galaxia_processes', processId);
  if (process.error || !process.data) {
    handleError.addError('Proceso no encontrado');
    return { data: null };
  }
  data.p_id = processId;
  const result = await qUtil.create('galaxia_transitions', {
    p_id: processId,
    act_from_id: data.act_from_id,
    act_to_id: data.act_to_id
  });
  if (result.error) {
    handleError.addError(result.error);
    return { data: null };
  }
  return { data: result.data };
};

const createRole = async (processId, data, handleError) => {
  const process = await qUtil.findById('galaxia_processes', processId);
  if (process.error || !process.data) {
    handleError.addError('Proceso no encontrado');
    return { data: null };
  }
  data.p_id = processId;
  const result = await qUtil.create('galaxia_roles', data);
  if (result.error) {
    handleError.addError(result.error);
    return { data: null };
  }
  return { data: result.data };
};

const createMapping = async (processId, roleId, data, handleError) => {
  const process = await qUtil.findById('galaxia_processes', processId);
  if (process.error || !process.data) {
    handleError.addError('Proceso no encontrado');
    return { data: null };
  }
  const role = await qUtil.findById('galaxia_roles', roleId);
  if (role.error || !role.data) {
    handleError.addError('Rol no encontrado');
    return { data: null };
  }
  data.p_id = processId;
  data.role_id = roleId;
  const result = await qUtil.create('galaxia_role_mappings', data);
  if (result.error) {
    handleError.addError(result.error);
    return { data: null };
  }
  return { data: result.data };
};

module.exports = {
  getProcesses,
  getProcess,
  createProcess,
  updateProcess,
  createActivity,
  updateActivity,
  createTransition,
  createRole,
  createMapping
};