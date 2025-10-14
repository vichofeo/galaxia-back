const QUtils = require('../../utils/queries/Qutils')
const qUtil = new QUtils()

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
        return{
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


module.exports = {
    getVarsInstance,
    setVarInstance,
    updateVarInstance,
    deleteVarInstance
}