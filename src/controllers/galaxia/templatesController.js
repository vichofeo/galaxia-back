const HandleErrors = require('../../utils/handleErrors')
const handleError = new HandleErrors()
const service = require('../../services/galaxia/templatesService.js')

const getVarsInstance = async (req, res) => {
    const token = req.headers.authorization
    const instanceId = req.params.instanceId
   
    const result = await service.getVarsInstance({ instanceId, token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}


module.exports={
    getVarsInstance,
    setVarInstance,
    updateVarInstance,
    deleteVarInstance
}