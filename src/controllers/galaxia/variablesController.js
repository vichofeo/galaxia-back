const HandleErrors = require('../../utils/handleErrors')
const handleError = new HandleErrors()
const service = require('../../services/galaxia/variablesServices.js')

// Obtener variables de instancia
const getVarsInstance = async (req, res) => {
    const token = req.headers.authorization
    const instanceId = req.params.instanceId
   
    const result = await service.getVarsInstance({ instanceId, token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

// Establecer variable de instancia
const setVarInstance = async (req, res) => {
    const token = req.headers.authorization
    const instanceId = req.params.instanceId
    const { name, value, type } = req.body;
   
    const result = await service.setVarInstance({ name, value, type, instanceId, token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

// Actualizar variable existente
const updateVarInstance = async (req, res) => {
    const token = req.headers.authorization
    const instanceId = req.params.instanceId
    const variableName = req.params.variableName
    const { value } = req.body;
   
    const result = await service.updateVarInstance({ value, variableName, instanceId, token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

// Eliminar variable
const deleteVarInstance = async (req, res) => {
    const token = req.headers.authorization
    const instanceId = req.params.instanceId
    const variableName = req.params.variableName
    
   
    const result = await service.deleteVarInstance({ variableName, instanceId, token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}
module.exports={
    getVarsInstance,
    setVarInstance,
    updateVarInstance,
    deleteVarInstance
}