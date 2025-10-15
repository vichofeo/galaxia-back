const QUtils = require('../../utils/queries/Qutils')
const qUtil = new QUtils()

// Obtener variables de instancia
const getVarsInstance = async (dto, handleError) => {
    try {
        const { instanceId, token } = dto

        qUtil.setTableInstance("galaxia_instances")
        await qUtil.findID(instanceId)
        const instance = qUtil.getResults()
        if (!instance) {
            return {
                ok: false,
                message: 'Instancia no encontrada'
            }
        }
        return {
            ok: true,
            data: instance,
            message: "Datos encontrados"
        }

    } catch (error) {
        console.log("Error en OBTENCION DATOS:", error)
        handleError.setMessage("Error de sistema: TEMPLATE001")
        handleError.setHttpError(error.message)
    }
}
// Establecer variable de instancia
const setVarInstance = async (dto, handleError) => {
    try {
        const { name, value, type, instanceId } = dto;


        qUtil.setTableInstance("galaxia_instances")
        await qUtil.findID(instanceId)
        const instance = qUtil.getResults()
        if (!instance) {
            return {
                ok: false,
                message: 'Instancia no encontrada'
            }
        }

        const currentData = instance || {};
        currentData[name] = value;
        qUtil.setDataset(currentData[name])
        await qUtil.modify()

        return {
            ok: true,
            data: currentData,
            variable: { name, value, type },
            message: "Actualizacion exitosa"
        }

    } catch (error) {
        console.log("Error en el seteo de datos:", error)
        handleError.setMessage("Error de sistema: TEMPLATE002")
        handleError.setHttpError(error.message)
    }
}

// Actualizar variable existente
const updateVarInstance = async (dto, handleError) => {
    try {
        const { value, variableName, instanceId, token } = dto


        qUtil.setTableInstance("galaxia_instances")
        await qUtil.findID(instanceId)
        const instance = qUtil.getResults()
        if (!instance) {
            return {
                ok: false,
                message: 'Instancia no encontrada'
            }
        }

        const currentData = instance || {};
        currentData[variableName] = value;
        qUtil.setDataset(currentData)
        await qUtil.modify()

        return {
            ok: true,
            data: currentData,
            variable: { name: variableName, value },
            message: "Actualizacion exitosa"
        }

    } catch (error) {
        console.log("Error en el actualizacion de datos:", error)
        handleError.setMessage("Error de sistema: TEMPLATE003")
        handleError.setHttpError(error.message)
    }
}


const deleteVarInstance = async (dto, handleError) => {
    try {
        const { variableName, instanceId, token } = dto


        qUtil.setTableInstance("galaxia_instances")
        await qUtil.findID(instanceId)
        const instance = qUtil.getResults()
        if (!instance) {
            return {
                ok: false,
                message: 'Instancia no encontrada'
            }
        }

        const currentData = instance || {};
        if (!(variableName in currentData)) {
            return {
                ok: false,
                message: 'Variable no encontrada'
            }
        }

        delete currentData[variableName];
        qUtil.setDataset(currentData)
        await qUtil.modify()


        return {
            ok: true,            
            message: `Variable ${variableName} eliminada`
        }
        

    } catch (error) {
        console.log("Error en el actualizacion de datos:", error)
        handleError.setMessage("Error de sistema: TEMPLATE003")
        handleError.setHttpError(error.message)
    }
}
module.exports = {
    getVarsInstance,
    setVarInstance,
    updateVarInstance,
    deleteVarInstance
}