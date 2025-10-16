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



module.exports = {
    getProcesses,
    getProcess,
    
}