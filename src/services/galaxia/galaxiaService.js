const QUtils = require('./../../utils/queries/Qutils')
const qUtil = new QUtils()



// services/galaxia/galaxiaService.js


// GET: Listar todos los procesos
const getProcesses = async (dto, handleError) => {
    try {
        qUtil.setTableInstance("galaxia_processes")
        qUtil.setInclude({
            association: 'gp_ga_activities', required: false,
            attributes: ['activityId', 'name', 'type', 'isInteractive', 'isAutoRouted']
        })
        qUtil.pushInclude({
            association: 'gp_gr_roles', required: false,
            attributes: ['roleId', 'name', 'description']
        })
        qUtil.setOrder([['pId', 'DESC']])
        await qUtil.findTune()
        const results = qUtil.getResults()


        return {
            ok: true,
            data: results,
            message: "Procesos obtenidos exitosamente"
        }
    } catch (error) {
        console.log("Error en getProcesses:", error)
        handleError.setMessage("Error de sistema: GALAXIA001")
        handleError.setHttpError(error.message)
    }
}

// GET: Obtener proceso específico
const getProcess = async (dto, handleError) => {
    try {
        console.log(dto)
        qUtil.setTableInstance("galaxia_processes")

        qUtil.setInclude({
            association: 'gp_ga_activities', required: false,
            include: [{
                association: 'ga_gr_roles', required: false,
                attributes: ['roleId', 'name']
            }]
        })
        qUtil.pushInclude({
            association: 'gp_gr_roles', required: false,
            attributes: ['roleId', 'name', 'description']
        })
        await qUtil.findID(dto.id)
        const results = qUtil.getResults()

        if (!results) {
            handleError.setMessage("Proceso no encontrado")
            return
        }

        return {
            ok: true,
            data: results,
            message: "Proceso obtenido exitosamente"
        }
    } catch (error) {
        console.log("Error en getProcess:", error)
        handleError.setMessage("Error de sistema: GALAXIA002")
        handleError.setHttpError(error.message)
    }
}

// POST: Crear nuevo proceso
const createProcess = async (dto, handleError) => {
    try {
        const registro = {
            name: dto.name,
            description: dto.description,
            version: dto.version || '1.0',
            isValid: 'n', // Por defecto no válido hasta tener actividades
            isActive: 'n', // Por defecto inactivo
            lastModif: Math.floor(Date.now() / 1000),
            normalized_name: dto.name.toLowerCase().replace(/[^a-z0-9]/g, '_')
        }
        qUtil.setTableInstance("galaxia_processes")
        qUtil.setDataset(registro)
        await qUtil.create()
        const result = qUtil.getResults()

        return {
            ok: true,
            data: result,
            message: "Proceso creado exitosamente"
        }
    } catch (error) {
        console.log("Error en createProcess:", error)
        handleError.setMessage("Error de sistema: GALAXIA003")
        handleError.setHttpError(error.message)
    }
}

// PUT: Actualizar proceso
const updateProcess = async (dto, handleError) => {
    try {
        qUtil.setTableInstance("galaxia_process")
        await qUtil.findID(dto.id)
        let process = qUtil.getResults()

        if (!process) {
            handleError.setMessage("Proceso no encontrado")
            return
        }

        const updateData = {
            lastModif: Math.floor(Date.now() / 1000)
        }

        // Solo actualizar campos que vienen en el DTO
        if (dto.name) updateData.name = dto.name
        if (dto.description) updateData.description = dto.description
        if (dto.version) updateData.version = dto.version
        if (dto.isActive) updateData.isActive = dto.isActive
        if (dto.isValid) updateData.isValid = dto.isValid

        qUtil.setTableInstance("galaxia_process")
        qUtil.setDataset(updateData)
        await qUtil.modify()

        await qUtil.findID(dto.id)
        process = qUtil.getResults()

        return {
            ok: true,
            data: process,
            message: "Proceso actualizado exitosamente"
        }
    } catch (error) {
        console.log("Error en updateProcess:", error)
        handleError.setMessage("Error de sistema: GALAXIA004")
        handleError.setHttpError(error.message)
    }
}

// GET: Actividades de un proceso
const getProcessActivities = async (dto, handleError) => {
    try {
        qUtil.setTableInstance("galaxia_activities")
        qUtil.setInclude({ //model: galaxia_role,                    
            association: 'ga_gr_roles', required: false,
            attributes: ['roleId', 'name']
        })//ga_gt_ftransitions
        qUtil.pushInclude({
            association: 'ga_gt_ftransitions', required: false,
            attributes: ['actToId']
        })
        qUtil.setWhere({ pId: dto.id })
        qUtil.setOrder([['flowNum', 'ASC']])
        await qUtil.findTune()
        const activities = qUtil.getResults()

        return {
            ok: true,
            data: activities,
            message: "Actividades del proceso obtenidas exitosamente"
        }
    } catch (error) {
        console.log("Error en getProcessActivities:", error)
        handleError.setMessage("Error de sistema: GALAXIA005")
        handleError.setHttpError(error.message)
    }
}

const addActivity = async (dto, handleError) => {
    try {
        console.log(dto)
        const registro = {
            name: dto.name,
            normalized_name: dto.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
            pId: dto.processId,
            type: dto.type || 'activity',
            isAutoRouted: dto.isAutoRouted || 'n',
            flowNum: dto.flowNum || 0,
            isInteractive: dto.isInteractive || 'n',
            lastModif: Math.floor(Date.now() / 1000),
            description: dto.description || '',
            expirationTime: dto.expirationTime || 0
        }

        qUtil.setTableInstance("galaxia_activities")
        qUtil.setDataset(registro)
        await qUtil.create()
        const result = qUtil.getResults()

        return {
            ok: true,
            data: result,
            message: "Actividad creada exitosamente"
        }
    } catch (error) {
        console.log(error)
        console.log("\n\nerror::: EN SERVICES addActivity\n")
        handleError.setMessage("Error de sistema: CREATEACTIVITYSRV")
        handleError.setHttpError(error.message)
    }
}

// FASE 2
// ========== ROLES ==========
// GET: Obtener roles de un proceso
const getProcessRoles = async (dto, handleError) => {
    try {
        qUtil.setTableInstance("galaxia_roles")
        qUtil.setWhere({ pId: dto.processId })
        qUtil.setOrder([['roleId', 'ASC']])
        await qUtil.findTune()
        const roles = qUtil.getResults()

        return {
            ok: true,
            data: roles,
            message: "Roles del proceso obtenidos exitosamente"
        }
    } catch (error) {
        console.log("Error en getProcessRoles:", error)
        handleError.setMessage("Error de sistema: GALAXIA006")
        handleError.setHttpError(error.message)
    }
}

// POST: Crear nuevo rol en proceso
const createRole = async (dto, handleError) => {
    try {
        const registro = {
            pId: dto.processId,
            name: dto.name,
            description: dto.description || '',
            lastModif: Math.floor(Date.now() / 1000)
        }

        qUtil.setTableInstance("galaxia_roles")
        qUtil.setDataset(registro)
        await qUtil.create()
        const result = qUtil.getResults()

        return {
            ok: true,
            data: result,
            message: "Rol creado exitosamente"
        }
    } catch (error) {
        console.log("Error en createRole:", error)
        handleError.setMessage("Error de sistema: GALAXIA007")
        handleError.setHttpError(error.message)
    }
}

// ========== ASIGNACIONES DE ROLES ==========
// GET: Obtener asignaciones de un rol
const getRoleAssignments = async (dto, handleError) => {
    try {
        qUtil.setTableInstance("galaxia_user_roles")
        qUtil.setWhere({
            pId: dto.processId,
            roleId: dto.roleId
        })
        await qUtil.findTune()
        const assignments = qUtil.getResults()

        return {
            ok: true,
            data: assignments,
            message: "Asignaciones del rol obtenidas exitosamente"
        }
    } catch (error) {
        console.log("Error en getRoleAssignments:", error)
        handleError.setMessage("Error de sistema: GALAXIA008")
        handleError.setHttpError(error.message)
    }
}

// POST: Asignar usuarios/grupos a rol
const assignRole = async (dto, handleError) => {
    try {
        const { processId, roleId, users, groups } = dto
        const assignments = []

        // Procesar usuarios individuales
        if (users && users.length > 0) {
            for (const user of users) {
                assignments.push({
                    pId: processId,
                    roleId: roleId,
                    user: user,
                    group_name: null,
                    is_group: false
                })
            }
        }

        // Procesar grupos
        if (groups && groups.length > 0) {
            for (const group of groups) {
                assignments.push({
                    pId: processId,
                    roleId: roleId,
                    user: null,
                    group_name: group,
                    is_group: true
                })
            }
        }

        // Crear asignaciones (una por una por ahora)
        const createdAssignments = []
        for (const assignment of assignments) {
            qUtil.setTableInstance("galaxia_user_roles")
            qUtil.setDataset(assignment)
            await qUtil.create()
            const result = qUtil.getResults()
            createdAssignments.push(result)
        }

        return {
            ok: true,
            data: createdAssignments,
            message: "Asignaciones creadas exitosamente"
        }
    } catch (error) {
        console.log("Error en assignRole:", error)
        handleError.setMessage("Error de sistema: GALAXIA009")
        handleError.setHttpError(error.message)
    }
}

// DELETE: Eliminar asignación de rol
const removeRoleAssignment = async (dto, handleError) => {
    try {
        const { processId, roleId, assignmentId } = dto

        qUtil.setTableInstance("galaxia_user_roles")
        qUtil.setWhere({
            pId: processId,
            roleId: roleId,
            [Op.or]: [
                { user: assignmentId },
                { group_name: assignmentId }
            ]
        })
        await qUtil.delete()
        const result = qUtil.getResults()

        return {
            ok: true,
            data: result,
            message: "Asignación eliminada exitosamente"
        }
    } catch (error) {
        console.log("Error en removeRoleAssignment:", error)
        handleError.setMessage("Error de sistema: GALAXIA010")
        handleError.setHttpError(error.message)
    }
}

// ========== ASIGNAR ROLES A ACTIVIDADES ==========
// POST: Asignar rol a actividad
const assignRoleToActivity = async (dto, handleError) => {
    try {
        const registro = {
            activityId: dto.activityId,
            roleId: dto.roleId
        }

        qUtil.setTableInstance("galaxia_activity_roles")
        qUtil.setDataset(registro)
        await qUtil.create()
        const result = qUtil.getResults()

        return {
            ok: true,
            data: result,
            message: "Rol asignado a actividad exitosamente"
        }
    } catch (error) {
        console.log("Error en assignRoleToActivity:", error)
        handleError.setMessage("Error de sistema: GALAXIA011")
        handleError.setHttpError(error.message)
    }
}

// GET: Obtener roles de una actividad
const getActivityRoles = async (dto, handleError) => {
    try {
        qUtil.setTableInstance("galaxia_activity_roles")
        qUtil.setInclude({
            association: 'gar_gr_role', // Asumiendo que tienes esta relación
            required: true,
            attributes: ['roleId', 'name', 'description']
        })
        qUtil.setWhere({ activityId: dto.activityId })
        await qUtil.findTune()
        const activityRoles = qUtil.getResults()

        return {
            ok: true,
            data: activityRoles,
            message: "Roles de la actividad obtenidos exitosamente"
        }
    } catch (error) {
        console.log("Error en getActivityRoles:", error)
        handleError.setMessage("Error de sistema: GALAXIA012")
        handleError.setHttpError(error.message)
    }
}

// POST: Asignar roles a actividad
const assignRolesToActivity = async (dto, handleError) => {
    try {
        const { activityId, roleIds } = dto

        console.log("\n dto", dto)
        // Primero eliminar asignaciones existentes
        qUtil.setTableInstance("galaxia_activity_roles")
        qUtil.setWhere({ activityId: activityId })
        await qUtil.deleting()

        // Luego crear nuevas asignaciones
        const createdAssignments = []
        for (const roleId of roleIds) {
            const registro = {
                activityId: activityId,
                roleId: roleId
            }

            qUtil.setTableInstance("galaxia_activity_roles")
            qUtil.setDataset(registro)
            await qUtil.create()
            const result = qUtil.getResults()
            createdAssignments.push(result)
        }

        return {
            ok: true,
            data: createdAssignments,
            message: "Roles asignados a actividad exitosamente"
        }
    } catch (error) {
        console.log("Error en assignRolesToActivity:", error)
        handleError.setMessage("Error de sistema: GALAXIA013")
        handleError.setHttpError(error.message)
    }
}

//TRANSICIONES 
const getProcessTransitions = async (dto, handleError) => {
    try {
        qUtil.setTableInstance("galaxia_transitions")
        //attributes: ['activityId', 'name', 'type']
        qUtil.setInclude({
            association: 'gt_ga_fromActivity', required: false,
            attributes: ['activityId', 'name', 'type']
        })
        qUtil.pushInclude({
            association: 'gt_ga_toActivity', required: false,
            attributes: ['activityId', 'name', 'type']
        })
        qUtil.setWhere({ pId: dto.processId })
        await qUtil.findTune()
        const transitions = qUtil.getResults()

        return {
            ok: true,
            data: transitions,
            message: "Transiciones del proceso obtenidas exitosamente"
        }
    } catch (error) {
        console.log("Error en getProcessTransitions:", error)
        handleError.setMessage("Error de sistema: GALAXIA014")
        handleError.setHttpError(error.message)
    }
}

const addTransition = async (dto, handleError) => {
    try {
        const registro = {
            pId: dto.processId,
            actFromId: dto.fromActivityId,
            actToId: dto.toActivityId
        }

        qUtil.setTableInstance("galaxia_transitions")
        qUtil.setDataset(registro)
        await qUtil.create()
        const result = qUtil.getResults()

        return {
            ok: true,
            data: result,
            message: "Transición creada exitosamente"
        }
    } catch (error) {
        console.log("Error en addTransition:", error)
        handleError.setMessage("Error de sistema: GALAXIA015")
        handleError.setHttpError(error.message)
    }
}

const deleteTransition = async (dto, handleError) => {
    try {
        qUtil.setTableInstance("galaxia_transitions")
        qUtil.setWhere({
            pId: dto.processId,
            actFromId: dto.fromActivityId,
            actToId: dto.toActivityId
        })
        await qUtil.deleting()
        const result = qUtil.getResults()

        return {
            ok: true,
            data: result,
            message: "Transición eliminada exitosamente"
        }
    } catch (error) {
        console.log("Error en deleteTransition:", error)
        handleError.setMessage("Error de sistema: GALAXIA016")
        handleError.setHttpError(error.message)
    }
}

const validationService = require('./validationService')

// ===== VALIDACIÓN DE PROCESOS =====
const validateProcess = async (dto, handleError) => {
    try {
        const { processId } = dto

        // 1. Obtener proceso
        qUtil.setTableInstance("galaxia_processes")
        //qUtil.setWhere({ pId: processId })
        await qUtil.findID(processId)
        const process = qUtil.getResults()

        if (!process || Object.keys(process).length === 0) {
            handleError.setMessage("Proceso no encontrado")
            return
        }

        // 2. Obtener actividades con relaciones
        qUtil.setTableInstance("galaxia_activities")
        qUtil.setInclude({ association: 'ga_gr_roles', required: false, through: { attributes: [] } })
        qUtil.setWhere({ pId: processId })
        await qUtil.findTune()
        const activities = qUtil.getResults()

        // 3. Obtener transiciones
        qUtil.setTableInstance("galaxia_transitions")
        qUtil.setWhere({ pId: processId })
        await qUtil.findTune()
        const transitions = qUtil.getResults()

        // 4. Obtener roles
        qUtil.setTableInstance("galaxia_roles")
        qUtil.setInclude({ association: 'gr_ga_activities', required: false, through: { attributes: [] } })
        qUtil.setWhere({ pId: processId })
        await qUtil.findTune()
        const roles = qUtil.getResults()

        // 5. Ejecutar validación manual (sin servicio separado por ahora)
        const validationResult = validationService.validateProcess(
            processId,
            activities,
            transitions,
            roles
        )

        // 6. Actualizar estado de validación del proceso
        qUtil.setTableInstance("galaxia_processes")
        qUtil.setDataset({
            isValid: validationResult.isValid ? 'y' : 'n',
            lastModif: Math.floor(Date.now() / 1000)
        })
        qUtil.setWhere({ pId: processId })
        await qUtil.modify()

        return {
            ok: true,
            data: validationResult,
            message: validationResult.isValid ?
                '✅ Proceso válido - Listo para activar' :
                '❌ Proceso inválido - Corrige los errores'
        }

    } catch (error) {
        console.log("Error en validateProcess:", error)
        handleError.setMessage("Error de sistema: VALIDPROCSRV")
        handleError.setHttpError(error.message)
    }
}

// ===== ACTIVACIÓN DE PROCESOS =====
const activateProcess = async (dto, handleError) => {
    try {
        const { processId } = dto

        // 1. Verificar que el proceso es válido
        qUtil.setTableInstance("galaxia_processes")
        //qUtil.setWhere({ pId: processId })
        await qUtil.findID(processId)
        const process = qUtil.getResults()

        if (!process || Object.keys(process).length === 0) {
            handleError.setMessage("Proceso no encontrado")
            return
        }

        if (process.isValid !== 'y') {
            handleError.setMessage("No se puede activar un proceso inválido")
            return
        }

        // 2. Activar proceso
        qUtil.setTableInstance("galaxia_processes")
        qUtil.setDataset({
            isActive: 'y',
            lastModif: Math.floor(Date.now() / 1000)
        })
        qUtil.setWhere({ pId: processId })
        await qUtil.modify()

        return {
            ok: true,
            data: { ...process, isActive: 'y' },
            message: '✅ Proceso activado exitosamente - Listo para ejecutar instancias'
        }

    } catch (error) {
        console.log("Error en activateProcess:", error)
        handleError.setMessage("Error de sistema: ACTIVEPROCSRV")
        handleError.setHttpError(error.message)
    }
}

const deactivateProcess = async (dto, handleError) => {
    try {
        const { processId } = dto

        // Desactivar proceso
        qUtil.setTableInstance("galaxia_processes")
        qUtil.setDataset({
            isActive: 'n',
            lastModif: Math.floor(Date.now() / 1000)
        })
        qUtil.setWhere({ pId: processId })
        await qUtil.modify()

        return {
            ok: true,
            message: 'Proceso desactivado - Las instancias existentes se pausarán'
        }

    } catch (error) {
        console.log("Error en deactivateProcess:", error)
        handleError.setMessage("Error de sistema: DEACTIVEPROCSRV")
        handleError.setHttpError(error.message)
    }
}

const workflowEngine = require('./workflowEngine')

// ===== INSTANCIAS =====
const getInstances = async (dto, handleError) => {
    try {
        qUtil.setTableInstance("galaxia_instances")
        qUtil.setInclude({
            association: 'gi_gp_process',
            required: true,
            attributes: ['pId', 'name', 'version']
        })
        /*qUtil.setInclude({
          association: 'currentActivity',
          required: false,
          attributes: ['activityId', 'name', 'type', 'isInteractive']
        })*/
        qUtil.setOrder([['instanceId', 'DESC']])
        await qUtil.findTune()
        const instances = qUtil.getResults()

        return {
            ok: true,
            data: instances,
            message: "Instancias obtenidas exitosamente"
        }

    } catch (error) {
        console.log("Error en getInstances:", error)
        handleError.setMessage("Error de sistema: GETINSTANCESRV")
        handleError.setHttpError(error.message)
    }
}

const startInstance = async (dto, handleError) => {
    try {
        const { processId, name } = dto

        // Usar el WorkflowEngine para iniciar instancia
        const instance = await workflowEngine.startInstance(
            processId,
            name,
            'current-user' // En producción, obtener del token
        )

        return {
            ok: true,
            data: instance,
            message: "Instancia iniciada exitosamente"
        }

    } catch (error) {
        console.log("Error en startInstance:", error)
        handleError.setMessage("Error de sistema: STARTINSTSRV")
        handleError.setHttpError(error.message)
    }
}

const abortInstance = async (dto, handleError) => {
    try {
        const { instanceId } = dto

        qUtil.setTableInstance("galaxia_instances")
        qUtil.setDataset({
            status: 'aborted',
            ended: Math.floor(Date.now() / 1000),
            nextActivity: null
        })
        qUtil.setWhere({ instanceId })
        await qUtil.modify()

        // También abortar workitems pendientes
        qUtil.setTableInstance("galaxia_workitems")
        qUtil.setDataset({
            status: 'aborted',
            ended: Math.floor(Date.now() / 1000)
        })
        qUtil.setWhere({ instanceId, status: 'pending' })
        await qUtil.modify()

        return {
            ok: true,
            message: "Instancia abortada exitosamente"
        }

    } catch (error) {
        console.log("Error en abortInstance:", error)
        handleError.setMessage("Error de sistema: ABORTINSTSRV")
        handleError.setHttpError(error.message)
    }
}



// ===== USER DASHBOARD =====
const getUserWorkitems = async (dto, handleError) => {
    try {
        const { userId } = dto

        qUtil.setTableInstance("galaxia_workitems")
        qUtil.setInclude({
            association: 'gw_ga_activity',
            required: false,
            attributes: ['activityId', 'name', 'type', 'isInteractive', 'isAutoRouted']
        })
        qUtil.pushInclude({
            association: 'gw_gi_instance',
            required: false,
            include: [{
                association: 'gi_gp_process',
                required: false,
                attributes: ['pId', 'name', 'version']
            }]
        })
        qUtil.setWhere({
            user: userId,
            status: 'pending'
        })
        qUtil.setOrder([['started', 'ASC']])
        await qUtil.findTune()
        const workitems = qUtil.getResults()

        // Agregar prioridad calculada
        const workitemsWithPriority = workitems.map(workitem => ({
            ...workitem,
            priority: calculateWorkitemPriority(workitem)
        }))

        return {
            ok: true,
            data: workitemsWithPriority,
            message: "Workitems del usuario obtenidos exitosamente"
        }

    } catch (error) {
        console.log("Error en getUserWorkitems:", error)
        handleError.setMessage("Error de sistema: GETUSERWORKITEMSRV")
        handleError.setHttpError(error.message)
    }
}

const getUserInstances = async (dto, handleError) => {
    try {
        const { userId } = dto

        qUtil.setTableInstance("galaxia_instances")
        qUtil.setInclude({
            association: 'gi_gp_process',
            required: true,
            attributes: ['pId', 'name', 'version']
        })
        qUtil.setWhere({
            owner: userId,
            status: 'active'
        })
        qUtil.setOrder([['started', 'DESC']])
        await qUtil.findTune()
        const instances = qUtil.getResults()

        return {
            ok: true,
            data: instances,
            message: "Instancias del usuario obtenidas exitosamente"
        }

    } catch (error) {
        console.log("Error en getUserInstances:", error)
        handleError.setMessage("Error de sistema: GETUSERINSTANCESRV")
        handleError.setHttpError(error.message)
    }
}

const getUserStats = async (dto, handleError) => {
    try {
        const { userId } = dto

        // Workitems pendientes
        qUtil.setTableInstance("galaxia_workitems")
        qUtil.setWhere({
            user: userId,
            status: 'pending'
        })
        await qUtil.findTune()
        const pendingWorkitems = qUtil.getResults().length

        // Instancias activas
        qUtil.setTableInstance("galaxia_instances")
        qUtil.setWhere({
            owner: userId,
            status: 'active'
        })
        await qUtil.findTune()
        const activeInstances = qUtil.getResults().length

        // Workitems completados hoy
        const today = Math.floor(Date.now() / 1000) - 86400 // Últimas 24 horas
        qUtil.setTableInstance("galaxia_workitems")
        qUtil.setWhere({
            user: userId,
            status: 'completed',
            //ended: { $gte: today }
            ended: qUtil.cMayorIgualQue(today)
        })
        await qUtil.findTune()
        const completedToday = qUtil.getResults().length

        // Procesos asignados (únicos)
        qUtil.setTableInstance("galaxia_workitems")
        qUtil.setInclude({
            association: 'gw_gi_instance', required: false,
            include: [{
                association: 'gi_gp_process', required: true,
                attributes: ['pId']
            }]
        })
        qUtil.setWhere({
            user: userId,
            status: 'pending'
        })
        await qUtil.findTune()
        const workitemsWithProcesses = qUtil.getResults()
        const assignedProcesses = new Set(workitemsWithProcesses.map(w => w.gw_gi_instance.gi_gp_process.pId)).size

        const stats = {
            pendingWorkitems,
            activeInstances,
            completedToday,
            assignedProcesses
        }

        return {
            ok: true,
            data: stats,
            message: "Estadísticas del usuario obtenidas exitosamente"
        }

    } catch (error) {
        console.log("Error en getUserStats:", error)
        handleError.setMessage("Error de sistema: GETUSERSTATSSRV")
        handleError.setHttpError(error.message)
    }
}

const executeWorkitem = async (dto, handleError) => {
    try {
        const { workitemId, userId, inputData } = dto

        // Obtener workitem
        qUtil.setTableInstance("galaxia_workitems")
        qUtil.setInclude({
            association: 'gw_ga_activity',
            required: false
        })
        qUtil.pushInclude({
            association: 'gw_gi_instance',
            required: false
        })
        await qUtil.findID(workitemId)
        const workitem = qUtil.getResults()

        if (!workitem) {
            handleError.setMessage("Workitem no encontrado")
            return
        }

        // Verificar que el workitem pertenece al usuario
        if (workitem.user !== userId) {
            handleError.setMessage("No tienes permisos para ejecutar este workitem")
            return
        }

        // Usar el WorkflowEngine para ejecutar la actividad
        const result = await workflowEngine.executeActivity(
            workitem.gw_gi_instance.instanceId,
            workitem.gw_ga_activity.activityId,
            userId,
            inputData
        )

        return {
            ok: true,
            data: result,
            message: "Workitem ejecutado exitosamente"
        }

    } catch (error) {
        console.log("Error en executeWorkitem:", error)
        handleError.setMessage("Error de sistema: EXECWORKITEMSRV")
        handleError.setHttpError(error.message)
    }
}

// ===== FUNCIONES AUXILIARES =====
function calculateWorkitemPriority(workitem) {
    const now = Math.floor(Date.now() / 1000)
    const elapsed = now - workitem.started

    // Prioridad basada en tiempo transcurrido
    if (elapsed > 86400) return 'high'     // Más de 24 horas
    if (elapsed > 3600) return 'medium'    // Más de 1 hora
    return 'low'                           // Menos de 1 hora
}
module.exports = {
    getProcesses,
    getProcess,
    createProcess,
    updateProcess,
    getProcessActivities,
    addActivity,
    // fase 2 
    getProcessRoles,
    createRole,
    getRoleAssignments,
    assignRole,
    removeRoleAssignment,
    assignRoleToActivity,
    getActivityRoles,
    assignRolesToActivity,

    getProcessTransitions,
    addTransition,
    deleteTransition,

    //activacion procesoso
    validateProcess,
    activateProcess, deactivateProcess,

    //instancias
    getInstances, startInstance, abortInstance,

    //Dshboard
    getUserWorkitems, getUserInstances, getUserStats, executeWorkitem
}