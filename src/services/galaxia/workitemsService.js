const QUtils = require('../../utils/queries/Qutils')
const qUtil = new QUtils()

// Obtener workitems de una instancia
const getInstanceWorkitems = async (dto, handleError) => {
    try {
        const { instanceId, status, userId, token } = dto

        const where = { instanceId: instanceId };
        if (status) where.status = status;
        if (userId) where.user = userId;

        qUtil.setTableInstance("galaxia_workitems")
        qUtil.setInclude({
            association: 'gw_ga_activity', required: false, 
        })
        qUtil.pushInclude({
            association: 'gw_gi_instance', required: false, 
            include:[{association: 'gi_gp_process', required: false, }]
        })
        qUtil.setWhere(where)
        qUtil.setOrder([['started', 'ASC']])
        await qUtil.findTune()
        const workitems = qUtil.getResults()
        
        return {
            ok: true,
            data: workitems,
        
            message: "Datos encontrados"
        }

    } catch (error) {
        console.log("Error en guardado DATOS:", error)
        handleError.setMessage("Error de sistema: WI001")
        handleError.setHttpError(error.message)
    }
}

// Obtener workitems de un usuario
//status, userId, token 
const getWorkitemUsr = async (dto, handleError) => {
    try {
        const { status, userId, token  } = dto

        const where = { user: userId };
        if (status) where.status = status;

        qUtil.setTableInstance("galaxia_workitems")
        qUtil.setInclude({
            association: 'gw_ga_activity', required: false, 
        })
        qUtil.pushInclude({
            association: 'gw_gi_instance', required: false, 
            include:[{association: 'gi_gp_process', required: false, }]
        })
        qUtil.setWhere(where)
        qUtil.setOrder([['started', 'ASC']])
        await qUtil.findTune()
        const workitems = qUtil.getResults()
        
        return {
            ok: true,
            data: workitems,
        
            message: "Datos encontrados"
        }

    } catch (error) {
        console.log("Error en busqueda DATOS:", error)
        handleError.setMessage("Error de sistema: WI002")
        handleError.setHttpError(error.message)
    }
}

// Obtener workitem específico
const getListWorkitems = async (dto, handleError) => {
    try {
        const { idx, token  } = dto

        qUtil.setTableInstance("galaxia_workitems")
        qUtil.setInclude({
            association: 'gw_ga_activity', required: false, 
        })
        qUtil.pushInclude({
            association: 'gw_gi_instance', required: false, 
            include:[{association: 'gi_gp_process', required: false, }]
        })
        
        await qUtil.findID(idx)
        const workitems = qUtil.getResults()
        
        if (!workitem) {
      return {
        ok:false,
        data: null,
        message: 'Workitem no encontrado'
      }
    }

        return {
            ok: true,
            data: workitems,        
            message: "Dato encontrado"
        }

    } catch (error) {
        console.log("Error en busqueda DATO:", error)
        handleError.setMessage("Error de sistema: WI003")
        handleError.setHttpError(error.message)
    }
}

module.exports = {
    getInstanceWorkitems,
    getWorkitemUsr,
    getListWorkitems
}