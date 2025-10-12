const QUtils = require('./../../utils/queries/Qutils')
const qUtil = new QUtils()

const workflowEngine = require('./../../services/galaxia/workflowEngine');


// services/galaxia/instancesService.js
const createInstance = async (dto, handleError) => {
    try {
        const { processId, createdBy, initialData } = dto

        // Usar el WorkflowEngine para iniciar instancia
        const instance = await workflowEngine.createInstance(
            processId,
            createdBy,
            initialData
        )

        return {
            ok: true,
            data: instance,
            message: "Instancia creada exitosamente"
        }

    } catch (error) {
        console.log("Error en startInstance:", error)
        handleError.setMessage("Error de sistema: STARTINSTSRV")
        handleError.setHttpError(error.message)
    }
}


const listInstances = async (dto, handleError) => {
    try {
        const { userId, processId, status } = dto

        const where = {};
        if (userId) where.createdBy = userId;
        if (processId) where.processId = processId;
        if (status) where.status = status;

        qUtil.setTableInstance("galaxia_instances")
        qUtil.setInclude({ asociation: 'gi_gp_process', required: false, attributes: ['name', 'version'] })
        //{ model: User, as: 'creator', attributes: ['id', 'username'] }
        //qUtil.pushInclude({})
        qUtil.setWhere(where)
        qUtil.setOrder([['createdAt', 'DESC']])
        await qUtil.findTune()
        const instances = qUtil.getResults()

        return {
            ok: true,
            data: instances,
            message: "Instancias devueltas exitosamente"
        }

    } catch (error) {
        console.log("Error en startInstance:", error)
        handleError.setMessage("Error de sistema: STARTINSTSRV")
        handleError.setHttpError(error.message)
    }
}

const detailInstance = async (dto, handleError) => {
    try {
        const { idx } = dto

        qUtil.setTableInstance("galaxia_instances")
        qUtil.setInclude({
            asociation: 'gi_gp_process', required: false,
            include: [{ asociation: 'gp_ga_activities', required: false }]
        }
        )
        //{ model: User, as: 'creator', attributes: ['id', 'username'] }
        //qUtil.pushInclude({})
        qUtil.pushInclude({
            asociation: 'gi_gw_workitems', required: false,
            include: [{
                asociation: 'gw_ga_activity', required: false
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
        handleError.setMessage("Error de sistema: STARTINSTSRV")
        handleError.setHttpError(error.message)
    }
}

module.exports = {
    createInstance,
    listInstances,
    detailInstance
}