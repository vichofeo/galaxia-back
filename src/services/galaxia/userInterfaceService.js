// services/galaxia/userInterfaceService.js
const QUtils = require('./../../utils/queries/Qutils')
const qUtil = new QUtils()

const workflowEngine = require('./../../services/galaxia/workflowEngine');

// Obtener workitems de un usuario
const getWorkitems = async (dto, handleError) => {
    try {
        const { userId, status } = dto
        const where = { user: userId };
        if (status) where.status = status;

        qUtil.setTableInstance("galaxia_workitems")
        qUtil.setInclude({
            association: 'gw_gi_instance', required: false,
            include:[{association: 'gi_gp_process', required: false, }]
        })
        qUtil.pushInclude({
            association: 'gw_ga_activity', required: false,            
        })
        qUtil.setOrder([['started', 'DESC']])
        await qUtil.findTune()
        const results = qUtil.getResults()


        return {
            ok: true,
            data: results,
            message: "Procesos obtenidos exitosamente"
        }
    } catch (error) {
        console.log("Error en getProcesses:", error)
        handleError.setMessage("Error de sistema: GALAXIAUI001")
        handleError.setHttpError(error.message)
    }
}
//detailWorkitem
// Obtener workitem específico
const detailWorkitem = async (dto, handleError) => {
    try {
        
        qUtil.setTableInstance("galaxia_workitems")
        qUtil.setInclude({
            association: 'gw_gi_instance', required: false,
            include:[{association: 'gi_gp_process', required: false, }]
        })
        qUtil.pushInclude({
            association: 'gw_ga_activity', required: false,            
        })
        
        await qUtil.findTune(dto.idx)
        const results = qUtil.getResults()

        return {
            ok: true,
            data: results,
            message: "Procesos obtenidos exitosamente"
        }
    } catch (error) {
        console.log("Error en getdetaailWKi:", error)
        handleError.setMessage("Error de sistema: GALAXIAUI002")
        handleError.setHttpError(error.message)
    }
}

// Completar workitem
const completeWorkitem = async (dto, handleError) => {
    try {
        const { idx, resultData = {} } = dto
        const workitem = await workflowEngine.completeGuActivity(idx, resultData);
        

        return {
            ok: true,
            data: workitem,
            message: "Procesos obtenidos exitosamente"
        }
    } catch (error) {
        console.log("Error en getCompleteWKi:", error)
        handleError.setMessage("Error de sistema: GALAXIAUI003")
        handleError.setHttpError(error.message)
    }
}

module.exports = {
    getWorkitems, detailWorkitem,
    completeWorkitem
}