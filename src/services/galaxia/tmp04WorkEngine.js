const { Instance, Workitem, Process, Activity, Transition } = require('../models');

class WorkflowEngine {
  // Crear nueva instancia de proceso
  async createInstance({ processId, createdBy, initialData = {} }) {
    const process = await Process.findByPk(processId, {
      include: [{ model: Activity }]
    });

    if (!process) {
      throw new Error('Proceso no encontrado');
    }

    // Crear instancia
    const instance = await Instance.create({
      processId,
      createdBy,
      status: 'active',
      data: initialData
    });

    // Encontrar actividad de inicio
    const startActivity = process.Activities.find(act => act.type === 'start');
    if (!startActivity) {
      throw new Error('El proceso no tiene actividad de inicio');
    }

    // Crear workitem inicial
    await Workitem.create({
      instanceId: instance.id,
      activityId: startActivity.id,
      assignedTo: createdBy, // Asignar al creador inicialmente
      status: 'pending'
    });

    return instance;
  }

  // Obtener workitems pendientes por usuario
  async getUserWorkitems(userId) {
    return await Workitem.findAll({
      where: { 
        assignedTo: userId,
        status: 'pending'
      },
      include: [
        { 
          model: Instance,
          include: [{ model: Process }]
        },
        { model: Activity }
      ],
      order: [['createdAt', 'ASC']]
    });
  }

  // Completar actividad y mover a siguiente
  async completeActivity(workitemId, resultData = {}) {
    const workitem = await Workitem.findByPk(workitemId, {
      include: [{ model: Instance }, { model: Activity }]
    });

    if (!workitem) {
      throw new Error('Workitem no encontrado');
    }

    // Marcar workitem como completado
    workitem.status = 'completed';
    workitem.completedAt = new Date();
    await workitem.save();

    // Actualizar datos de instancia
    if (Object.keys(resultData).length > 0) {
      workitem.Instance.data = { ...workitem.Instance.data, ...resultData };
      await workitem.Instance.save();
    }

    // Obtener transiciones de la actividad actual
    const transitions = await Transition.findAll({
      where: { fromActivityId: workitem.activityId }
    });

    // Crear nuevos workitems para las siguientes actividades
    for (const transition of transitions) {
      await Workitem.create({
        instanceId: workitem.instanceId,
        activityId: transition.toActivityId,
        assignedTo: workitem.assignedTo, // Por defecto mismo usuario
        status: 'pending'
      });
    }

    return workitem;
  }
}

module.exports = new WorkflowEngine();