// controllers/galaxia/galaxiaController.js
const HandleErrors = require('./../../utils/handleErrors')
const handleError = new HandleErrors()
const service = require('./../../services/galaxia/galaxiaService')

// ========== PROCESOS ==========
// GET /api/galaxia/processes - Listar todos los procesos
const getProcesses = async (req, res) => {
    const token = req.headers.authorization
    const result = await service.getProcesses({ token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

// GET /api/galaxia/processes/:id - Obtener proceso específico
const getProcess = async (req, res) => {
    const processId = req.params.id
    const token = req.headers.authorization

    const result = await service.getProcess({
        id: processId,
        token
    }, handleError)

    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

// POST /api/galaxia/processes - Crear nuevo proceso
const createProcess = async (req, res) => {
    const { name, description, version } = req.body
    const token = req.headers.authorization

    const result = await service.createProcess({
        name,
        description,
        version,
        token
    }, handleError)

    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

// PUT /api/galaxia/processes/:id - Actualizar proceso
const updateProcess = async (req, res) => {
    const { id } = req.params
    const { name, description, version, isActive, isValid } = req.body
    const token = req.headers.authorization

    const result = await service.updateProcess({
        id, name, description, version, isActive, isValid, token
    }, handleError)

    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

// ========== ACTIVIDADES ==========
// GET /api/galaxia/processes/:id/activities - Actividades del proceso
const getProcessActivities = async (req, res) => {
    const processId = req.params.id
    const token = req.headers.authorization

    const result = await service.getProcessActivities({
        id: processId,
        token
    }, handleError)

    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

const addActivity = async (req, res) => {
    const processId = req.params.id
    const activityData = req.body
    const token = req.headers.authorization

    const result = await service.addActivity({
        processId,
        ...activityData,
        token
    }, handleError)

    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

// ========== ROLES ==========
// FASE 2
// GET /api/galaxia/processes/:id/roles - Obtener roles del proceso
const getProcessRoles = async (req, res) => {
    const processId = req.params.id
    const token = req.headers.authorization

    const result = await service.getProcessRoles({
        processId,
        token
    }, handleError)

    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

// POST /api/galaxia/processes/:id/roles - Crear rol en proceso
const createRole = async (req, res) => {
    const processId = req.params.id
    const { name, description } = req.body
    const token = req.headers.authorization

    const result = await service.createRole({
        processId,
        name,
        description,
        token
    }, handleError)

    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

// ========== ASIGNACIONES DE ROLES ==========
// GET /api/galaxia/processes/:processId/roles/:roleId/assignments - Obtener asignaciones
const getRoleAssignments = async (req, res) => {
    const { processId, roleId } = req.params
    const token = req.headers.authorization

    const result = await service.getRoleAssignments({
        processId,
        roleId,
        token
    }, handleError)

    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

// POST /api/galaxia/processes/:processId/roles/:roleId/assignments - Asignar usuarios/grupos
const assignRole = async (req, res) => {
    const { processId, roleId } = req.params
    const { users, groups } = req.body
    const token = req.headers.authorization

    const result = await service.assignRole({
        processId,
        roleId,
        users: users || [],
        groups: groups || [],
        token
    }, handleError)

    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

// DELETE /api/galaxia/processes/:processId/roles/:roleId/assignments/:assignmentId - Eliminar asignación
const removeRoleAssignment = async (req, res) => {
    const { processId, roleId, assignmentId } = req.params
    const token = req.headers.authorization

    const result = await service.removeRoleAssignment({
        processId,
        roleId,
        assignmentId,
        token
    }, handleError)

    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

// ========== ROLES EN ACTIVIDADES ==========
// POST /api/galaxia/activities/:activityId/roles - Asignar rol a actividad
const assignRoleToActivity = async (req, res) => {
    const activityId = req.params.id
    const { roleId } = req.body
    const token = req.headers.authorization

    const result = await service.assignRoleToActivity({
        activityId,
        roleId,
        token
    }, handleError)

    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

// GET /api/galaxia/activities/:activityId/roles - Obtener roles de actividad
const getActivityRoles = async (req, res) => {
    const activityId = req.params.id
    const token = req.headers.authorization

    const result = await service.getActivityRoles({
        activityId,
        token
    }, handleError)

    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

// POST /api/galaxia/activities/:id/roles - Asignar roles a actividad
const assignRolesToActivity = async (req, res) => {
    const activityId = req.params.id
    const { roleIds } = req.body
    const token = req.headers.authorization

    const result = await service.assignRolesToActivity({
        activityId,
        roleIds,
        token
    }, handleError)

    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}


// ========== TRANSICIONES ==========

// GET /api/galaxia/processes/:id/transitions - Listar transiciones del proceso
const getProcessTransitions = async (req, res) => {
    const processId = req.params.id
    const token = req.headers.authorization

    const result = await service.getProcessTransitions({
        processId,
        token
    }, handleError)

    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

// POST /api/galaxia/processes/:id/transitions - Crear transición
const addTransition = async (req, res) => {
    const processId = req.params.id
    const { fromActivityId, toActivityId } = req.body
    const token = req.headers.authorization

    const result = await service.addTransition({
        processId,
        fromActivityId,
        toActivityId,
        token
    }, handleError)

    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

// DELETE /api/galaxia/processes/:processId/transitions/:fromActivityId/:toActivityId - Eliminar transición
const deleteTransition = async (req, res) => {
    const { processId, fromActivityId, toActivityId } = req.params
    const token = req.headers.authorization

    const result = await service.deleteTransition({
        processId,
        fromActivityId,
        toActivityId,
        token
    }, handleError)

    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

const validateProcess = async (req, res) => {
    const processId = req.params.id
    const token = req.headers.authorization

    try {
        const result = await service.validateProcess({ processId, token }, handleError)
        handleError.setResponse(result)
        res.status(handleError.getCode()).json(handleError.getResponse())
    } catch (error) {
        console.error('Error validating process:', error)
        handleError.setMessage('Error validando proceso')
        res.status(500).json(handleError.getResponse())
    }
}

const activateProcess = async (req, res) => {
    const processId = req.params.id
    const token = req.headers.authorization

    try {
        const result = await service.activateProcess({ processId, token }, handleError)
        handleError.setResponse(result)
        res.status(handleError.getCode()).json(handleError.getResponse())
    } catch (error) {
        console.error('Error activating process:', error)
        handleError.setMessage('Error activando proceso')
        res.status(500).json(handleError.getResponse())
    }
}

const deactivateProcess = async (req, res) => {
    const processId = req.params.id
    const token = req.headers.authorization

    try {
        const result = await service.deactivateProcess({ processId, token }, handleError)
        handleError.setResponse(result)
        res.status(handleError.getCode()).json(handleError.getResponse())
    } catch (error) {
        console.error('Error deactivating process:', error)
        handleError.setMessage('Error desactivando proceso')
        res.status(500).json(handleError.getResponse())
    }
}

//INSTANCIAS
const getInstances = async (req, res) => {
    const token = req.headers.authorization

    try {
        const result = await service.getInstances({ token }, handleError)
        handleError.setResponse(result)
        res.status(handleError.getCode()).json(handleError.getResponse())
    } catch (error) {
        console.error('Error getting instances:', error)
        handleError.setMessage('Error obteniendo instancias')
        res.status(500).json(handleError.getResponse())
    }
}

const startInstance = async (req, res) => {
    const { processId, name } = req.body
    const token = req.headers.authorization

    try {
        const result = await service.startInstance({ processId, name, token }, handleError)
        handleError.setResponse(result)
        res.status(handleError.getCode()).json(handleError.getResponse())
    } catch (error) {
        console.error('Error starting instance:', error)
        handleError.setMessage('Error iniciando instancia')
        res.status(500).json(handleError.getResponse())
    }
}

const abortInstance = async (req, res) => {
    const instanceId = req.params.id
    const token = req.headers.authorization

    try {
        const result = await service.abortInstance({ instanceId, token }, handleError)
        handleError.setResponse(result)
        res.status(handleError.getCode()).json(handleError.getResponse())
    } catch (error) {
        console.error('Error aborting instance:', error)
        handleError.setMessage('Error abortando instancia')
        res.status(500).json(handleError.getResponse())
    }
}

//DASHBOARD
const getUserWorkitems = async (req, res) => {
  const userId = req.params.userId
  const token = req.headers.authorization
  
  try {
    const result = await service.getUserWorkitems({ userId, token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
  } catch (error) {
    console.error('Error getting user workitems:', error)
    handleError.setMessage('Error obteniendo workitems del usuario')
    res.status(500).json(handleError.getResponse())
  }
}

const getUserInstances = async (req, res) => {
  const userId = req.params.userId
  const token = req.headers.authorization
  
  try {
    const result = await service.getUserInstances({ userId, token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
  } catch (error) {
    console.error('Error getting user instances:', error)
    handleError.setMessage('Error obteniendo instancias del usuario')
    res.status(500).json(handleError.getResponse())
  }
}

const getUserStats = async (req, res) => {
  const userId = req.params.userId
  const token = req.headers.authorization
  
  try {
    const result = await service.getUserStats({ userId, token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
  } catch (error) {
    console.error('Error getting user stats:', error)
    handleError.setMessage('Error obteniendo estadísticas del usuario')
    res.status(500).json(handleError.getResponse())
  }
}

const executeWorkitem = async (req, res) => {
  const workitemId = req.params.id
  const { userId, inputData } = req.body
  const token = req.headers.authorization
  
  try {
    const result = await service.executeWorkitem({ workitemId, userId, inputData, token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
  } catch (error) {
    console.error('Error executing workitem:', error)
    handleError.setMessage('Error ejecutando workitem')
    res.status(500).json(handleError.getResponse())
  }
}

module.exports = {
    getProcesses,
    getProcess,
    createProcess,
    updateProcess,
    getProcessActivities, addActivity,

    //  NUEVOS MÉTODOS FASE 2
    getProcessRoles,
    createRole,
    getRoleAssignments,
    assignRole,
    removeRoleAssignment,
    assignRoleToActivity,
    getActivityRoles,
    assignRolesToActivity,

    //MÉTODOS TRANSICIONES
    getProcessTransitions,
    addTransition,
    deleteTransition,

    //validaciones
    validateProcess,
    activateProcess, deactivateProcess,

    //INSTANCIAS
    getInstances, startInstance, abortInstance,

    //DASHBOARD
    getUserWorkitems, getUserInstances, getUserStats, executeWorkitem

}