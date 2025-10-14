const QUtils = require('./../../utils/queries/Qutils')
const qUtil = new QUtils()

const workflowEngine = require('./../../services/galaxia/workflowEngine');


// services/galaxia/instancesService.js

const getProcesses= async (dto, handleError) => {
    try {
        const { idx } = dto

        //qUtil.setTableInstance("galaxia_processes")
        //qUtil.setWhere({ status: idx })
        qUtil.setTableInstance("galaxia_processes")
        qUtil.setInclude({
            association: 'gp_ga_activities', required: true,
            attributes: ['activityId', 'name', 'type', 'isInteractive', 'isAutoRouted']
        })
        qUtil.pushInclude({
            association: 'gp_gr_roles', required: false,
            attributes: ['roleId', 'name', 'description']
        })
        qUtil.setOrder([['pId', 'DESC']])

        await qUtil.findTune()
        const processes = qUtil.getResults()
        if (!processes)
            return {
                ok: false,
                message: 'Instancia no encontrada'
            }
        else
            return {
                ok: true,
                data: processes,
                message: "Instancia devuelta exitosamente"
            }

    } catch (error) {
        console.log("Error en startInstance:", error)
        handleError.setMessage("Error de sistema: INSTDETAILSRV")
        handleError.setHttpError(error.message)
    }
}


const createInstance = async (dto, handleError) => {
    try {
        const { processId, owner, initialData } = dto

        // Usar el WorkflowEngine para iniciar instancia
        const instance = await workflowEngine.createGuInstance({
            processId,
            owner,
            initialData}
        )

        return {
            ok: true,
            data: instance,
            message: "Instancia creada exitosamente"
        }

    } catch (error) {
        console.log("Error en startInstance:", error)
        handleError.setMessage("Error de sistema: INSTCREATESRV")
        handleError.setHttpError(error.message)
    }
}

// Listar instancias del usuario
const listInstances = async (dto, handleError) => {
    try {
        const { userId, processId, status } = dto

        
        const where = {};
        if (userId) where.owner = userId;
        if (processId) where.processId = processId;
        if (status) where.status = status;

        qUtil.setTableInstance("galaxia_instances")
        qUtil.setInclude({ association: 'gi_gp_process', required: false, attributes: ['name', 'version'] })
        //{ model: User, as: 'creator', attributes: ['id', 'username'] }
        //qUtil.pushInclude({})
        qUtil.setWhere(where)
        qUtil.setOrder([['started', 'DESC']])
        await qUtil.findTune()
        const instances = qUtil.getResults()

        return {
            ok: true,
            data: instances,
            message: "Instancias devueltas exitosamente"
        }

    } catch (error) {
        console.log("Error en startInstance:", error)
        handleError.setMessage("Error de sistema: INSTLISTSRV")
        handleError.setHttpError(error.message)
    }
}


const detailInstance = async (dto, handleError) => {
    try {
        const { idx } = dto

        qUtil.setTableInstance("galaxia_instances")
        qUtil.setInclude({
            association: 'gi_gp_process', required: false,
            include: [{ association: 'gp_ga_activities', required: false }]
        }
        )
        //{ model: User, as: 'creator', attributes: ['id', 'username'] }
        //qUtil.pushInclude({})
        qUtil.pushInclude({
            association: 'gi_gw_workitems', required: false,
            include: [{
                association: 'gw_ga_activity', required: false
            },
                //{ model: User, attributes: ['id', 'username'] }]
            ]
        })
        await qUtil.findID(idx)
        const instance = qUtil.getResults()
        if (!instance)
            return {
                ok: false,
                message: 'Instancia no encontrada'
            }
        else
            return {
                ok: true,
                data: instance,
                message: "Instancia devuelta exitosamente"
            }

    } catch (error) {
        console.log("Error en startInstance:", error)
        handleError.setMessage("Error de sistema: INSTDETAILSRV")
        handleError.setHttpError(error.message)
    }
}

const updateInstance = async (dto, handleError) => {
    try {
        const { status, data, idx } = dto

        qUtil.setTableInstance("galaxia_instances")
        await qUtil.findID(idx)
        let instance = qUtil.getResults()
        if (!instance)
            return {
                ok: false,
                message: 'Instancia no encontrada'
            }
        if (status) instance.status = status;
        if (data) instance = { ...instance, ...data };
        qUtil.setWhere({ instanceId: idx })
        await qUtil.modify()

        return {
            ok: true,
            data: instance,
            message: "Instancia actualizada exitosamente"
        }

    } catch (error) {
        console.log("Error en startInstance:", error)
        handleError.setMessage("Error de sistema: INSTUPDATESRV")
        handleError.setHttpError(error.message)
    }
}
module.exports = {getProcesses,
    createInstance,
    listInstances,
    detailInstance,
    updateInstance
}