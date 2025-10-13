// services/galaxia/workflowEngine.js
class WorkflowEngine {
  constructor() {
    console.log('🚀 WorkflowEngine iniciado')
  }

  /**
   * Inicia una nueva instancia de proceso
   */
  async startInstance(processId, instanceName, userId) {
    try {
      console.log(`🔨 Iniciando instancia del proceso ${processId}`)

      // 1. Verificar que el proceso existe y está activo
      const process = await this.getProcess(processId)
      if (!process || process.isActive !== 'y') {
        throw new Error('Proceso no encontrado o inactivo')
      }

      // 2. Encontrar actividad de inicio
      const startActivity = await this.getStartActivity(processId)
      if (!startActivity) {
        throw new Error('Proceso no tiene actividad de inicio')
      }

      // 3. Crear instancia
      const instance = await this.createInstance({
        pId: processId,
        name: instanceName || `Instancia ${process.name}`,
        owner: userId,
        started: Math.floor(Date.now() / 1000),
        status: 'active',
        nextActivity: startActivity.activityId
      })

      // 4. Crear primer workitem
      await this.createWorkitem({
        instanceId: instance.instanceId,
        activityId: startActivity.activityId,
        orderId: 1,
        started: Math.floor(Date.now() / 1000),
        user: userId,
        status: 'pending'
      })

      console.log(`✅ Instancia ${instance.instanceId} iniciada exitosamente`)
      return instance

    } catch (error) {
      console.error('❌ Error iniciando instancia:', error)
      throw error
    }
  }

  /**
   * Ejecuta una actividad y avanza el flujo
   */
  async executeActivity(instanceId, activityId, userId, inputData = {}) {
    try {
      console.log(`🎯 Ejecutando actividad ${activityId} en instancia ${instanceId}`)

      // 1. Verificar instancia y actividad
      const instance = await this.getInstance(instanceId)
      const activity = await this.getActivity(activityId)

      if (!instance || instance.status !== 'active') {
        throw new Error('Instancia no encontrada o no activa')
      }

      // 2. Verificar permisos (si la actividad es interactiva)
      if (activity.isInteractive === 'y') {
        const hasPermission = await this.checkUserPermission(userId, activityId)
        if (!hasPermission) {
          throw new Error('Usuario no tiene permisos para esta actividad')
        }
      }

      // 3. Actualizar workitem actual
      await this.completeWorkitem(instanceId, activityId, userId)

      // 4. Procesar input data (propiedades de instancia)
      if (Object.keys(inputData).length > 0) {
        await this.updateInstanceProperties(instanceId, inputData)
      }

      // 5. Determinar siguiente actividad
      const nextActivity = await this.determineNextActivity(instanceId, activityId)

      if (nextActivity) {
        // 6. Avanzar a siguiente actividad
        await this.advanceToNextActivity(instanceId, nextActivity.activityId, userId)
        
        console.log(`➡️ Instancia ${instanceId} avanzó a actividad ${nextActivity.activityId}`)
        return { 
          instanceId, 
          currentActivity: nextActivity,
          status: 'advanced'
        }
      } else {
        // 7. No hay siguiente actividad - completar instancia
        await this.completeInstance(instanceId)
        
        console.log(`🏁 Instancia ${instanceId} completada`)
        return { 
          instanceId, 
          status: 'completed'
        }
      }

    } catch (error) {
      console.error('❌ Error ejecutando actividad:', error)
      throw error
    }
  }

  /**
   * Determina la siguiente actividad basado en transiciones y lógica
   */
  async determineNextActivity(instanceId, currentActivityId) {
    const transitions = await this.getOutgoingTransitions(currentActivityId)
    
    if (transitions.length === 0) {
      return null // No hay transiciones - fin del flujo
    }

    if (transitions.length === 1) {
      // Transición simple - tomar la única opción
      return await this.getActivity(transitions[0].actToId)
    }

    // Múltiples transiciones - lógica de routing compleja
    // (esto se puede extender para switches condicionales)
    return await this.getActivity(transitions[0].actToId)
  }

  // ===== MÉTODOS AUXILIARES =====

  async getProcess(processId) {
    const qUtil = new (require('../../utils/queries/Qutils'))()
    qUtil.setTableInstance("galaxia_processes")
    await qUtil.findID(processId)
    return qUtil.getResults()
  }

  async getStartActivity(processId) {
    const qUtil = new (require('../../utils/queries/Qutils'))()
    qUtil.setTableInstance("galaxia_activities")
    qUtil.setWhere({ pId: processId, type: 'start' })
    await qUtil.findTune()
    const activities = qUtil.getResults()
    return activities.length > 0 ? activities[0] : null
  }

  async createInstance(instanceData) {
    const qUtil = new (require('../../utils/queries/Qutils'))()
    qUtil.setTableInstance("galaxia_instances")
    qUtil.setDataset(instanceData)
    await qUtil.create()
    return qUtil.getResults()
  }

  async createWorkitem(workitemData) {
    const qUtil = new (require('../../utils/queries/Qutils'))()
    qUtil.setTableInstance("galaxia_workitems")
    qUtil.setDataset(workitemData)
    await qUtil.create()
    return qUtil.getResults()
  }

  async getInstance(instanceId) {
    const qUtil = new (require('../../utils/queries/Qutils'))()
    qUtil.setTableInstance("galaxia_instances")
    await qUtil.findID(instanceId)
    return qUtil.getResults()
  }

  async getActivity(activityId) {
    const qUtil = new (require('../../utils/queries/Qutils'))()
    qUtil.setTableInstance("galaxia_activities")
    await qUtil.findID(activityId)
    return qUtil.getResults()
  }

  async getOutgoingTransitions(activityId) {
    const qUtil = new (require('../../utils/queries/Qutils'))()
    qUtil.setTableInstance("galaxia_transitions")
    qUtil.setWhere({ actFromId: activityId })
    await qUtil.findTune()
    return qUtil.getResults()
  }

  async completeWorkitem(instanceId, activityId, userId) {
    const qUtil = new (require('../../utils/queries/Qutils'))()
    qUtil.setTableInstance("galaxia_workitems")
    qUtil.setDataset({ 
      ended: Math.floor(Date.now() / 1000),
      status: 'completed',
      user: userId
    })
    qUtil.setWhere({ instanceId, activityId, status: 'pending' })
    await qUtil.modify()
  }

  async advanceToNextActivity(instanceId, nextActivityId, userId) {
    // Actualizar instancia
    const qUtil1 = new (require('../../utils/queries/Qutils'))()
    qUtil1.setTableInstance("galaxia_instances")
    qUtil1.setDataset({ 
      nextActivity: nextActivityId,
      nextUser: userId
    })
    qUtil1.setWhere({ instanceId })
    await qUtil1.modify()

    // Crear nuevo workitem
    const qUtil2 = new (require('../../utils/queries/Qutils'))()
    qUtil2.setTableInstance("galaxia_workitems")
    qUtil2.setDataset({
      instanceId,
      activityId: nextActivityId,
      orderId: await this.getNextOrderId(instanceId),
      started: Math.floor(Date.now() / 1000),
      user: userId,
      status: 'pending'
    })
    await qUtil2.create()
  }

  async completeInstance(instanceId) {
    const qUtil = new (require('../../utils/queries/Qutils'))()
    qUtil.setTableInstance("galaxia_instances")
    qUtil.setDataset({ 
      status: 'completed',
      ended: Math.floor(Date.now() / 1000),
      nextActivity: null
    })
    qUtil.setWhere({ instanceId })
    await qUtil.modify()
  }

  async getNextOrderId(instanceId) {
    const qUtil = new (require('../../utils/queries/Qutils'))()
    qUtil.setTableInstance("galaxia_workitems")
    qUtil.setWhere({ instanceId })
    qUtil.setOrder([['orderId', 'DESC']])
    await qUtil.findTune()
    const workitems = qUtil.getResults()
    return workitems.length > 0 ? workitems[0].orderId + 1 : 1
  }

  async updateInstanceProperties(instanceId, properties) {
    // Por ahora guardamos como JSON en un campo
    // En Galaxia original esto era más sofisticado ($instance->set)
    const qUtil = new (require('../../utils/queries/Qutils'))()
    qUtil.setTableInstance("galaxia_instances")
    qUtil.setDataset({ 
      properties: JSON.stringify(properties)
    })
    qUtil.setWhere({ instanceId })
    await qUtil.modify()
  }

  async checkUserPermission(userId, activityId) {
    // Implementación básica - siempre true por ahora
    // En producción, verificar roles del usuario vs roles de la actividad
    return true
  }

  //METODOS PARA LA INSTANCIACION POR EL USUARIO
  // Crear nueva instancia de proceso
  async createGuInstance({ processId, owner, initialData = {} }) {
    console.log("\n\nProceso para instanciar:", processId)
    const qUtil = new (require('../../utils/queries/Qutils'))()
    qUtil.setTableInstance("galaxia_processes")
    qUtil.setInclude({association: 'gp_ga_activities', required: false})
    await qUtil.findID(processId)
    const process = qUtil.getResults()

    console.log("\n\nProceso para instanciar:", process)

    if (!process) {
      throw new Error('Proceso no encontrado');
    }

    // Encontrar actividad de inicio    
    const startActivity = process.gp_ga_activities.find(act => act.type === 'start');
    if (!startActivity) {
      throw new Error('El proceso no tiene actividad de inicio');
    }
    

    // Crear instancia
    let instance = {
      pId: processId,
      owner,
      status: 'active',
      ...initialData,
      started: Math.floor(Date.now() / 1000),
      nextActivity: startActivity.activityId
    }
console.log("\n\ninstanciar:", instance)

    qUtil.setTableInstance("galaxia_instances")
    qUtil.setDataset(instance)
    await qUtil.create()
    instance = qUtil.getResults()
    
    

    // Crear workitem inicial
    qUtil.setTableInstance("galaxia_workitems")
    qUtil.setDataset({
      instanceId: instance.instanceId,
      activityId: startActivity.activityId,
      orderId: 1,
      started: Math.floor(Date.now() / 1000),
      user: owner, // Asignar al creador inicialmente
      status: 'pending'
    })
    await qUtil.create()

    return instance;
  }

  async getGuUserWorkitems(userId) {
    const qUtil = new (require('../../utils/queries/Qutils'))()
    qUtil.setTableInstance("galaxia_workitems")
    qUtil.setInclude({association: 'gw_gi_instance', required: true,
            include: [{association: 'gi_gp_process', required: true},
              {association: 'gi_ga_activities', required: true}
            ]
    })
    qUtil.setWhere({ assignedTo: userId, status: 'pending' })
    qUtil.setOrder([['started', 'ASC']])
    await qUtil.findTune()
    return qUtil.getResults()
    
  }

   // Completar actividad y mover a siguiente
  async completeGuActivity(workitemId, resultData = {}) {
    const qUtil = new (require('../../utils/queries/Qutils'))()
    qUtil.setTableInstance("galaxia_workitems")
    qUtil.setInclude({association: 'gw_gi_instance', required: true,})
    qUtil.pushInclude({association: 'gw_ga_activity', required: true,})
    await qUtil.findID(workitemId)
    const workitem = qUtil.getResults()

    if (!workitem) {
      throw new Error('Workitem no encontrado');
    }

    // Marcar workitem como completado
    workitem.status = 'completed';
    workitem.completedAt = new Date();
    qUtil.setTableInstance("galaxia_workitems")
    qUtil.setDataset(workitem)
    await qUtil.create()

    // Actualizar datos de instancia
    if (Object.keys(resultData).length > 0) {
      workitem.gw_gi_instance = { ...workitem.gw_gi_instance, ...resultData };
      qUtil.setTableInstance('galaxia_instances')
      qUtil.setDataset(workitem.gw_gi_instance)
      qUtil.setWhere({instanceId: workitem.instanceId})
      await qUtil.modify()
      //await workitem.Instance.save();
    }

    // Obtener transiciones de la actividad actual
    qUtil.setTableInstance("galaxia_transitions")
    qUtil.setWhere({ fromActivityId: workitem.activityId })
    await qUtil.findTune()
    const transitions = qUtil.getResults()

    // Crear nuevos workitems para las siguientes actividades
    for (const transition of transitions) {
      qUtil.setTableInstance("galaxia_workitems")
      qUtil.setDataset({
        instanceId: workitem.instanceId,
        activityId: transition.toActivityId,
        assignedTo: workitem.assignedTo, // Por defecto mismo usuario
        status: 'pending'
      })
      await qUtil.create()
    }

    return workitem;
  }
}

module.exports = new WorkflowEngine()