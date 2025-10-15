const HandleErrors = require('../../utils/handleErrors')
const handleError = new HandleErrors()
const service = require('../../services/galaxia/workitemsService.js')

const getInstanceWorkitems = async (req, res) => {
    const token = req.headers.authorization
    const instanceId = req.params.instanceId
    const { status, userId } = req.query;
   
    const result = await service.getInstanceWorkitems({ instanceId, status, userId, token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

const getWorkitemUsr = async (req, res) => {
    const token = req.headers.authorization
    const userId = req.params.userId
    const { status } = req.query;
   
    const result = await service.getWorkitemUsr({ status, userId, token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

const getListWorkitems = async (req, res) => {
    const token = req.headers.authorization
    const idx = req.params.id
    
   
    const result = await service.getListWorkitems({ idx,  token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}
module.exports= {
    getInstanceWorkitems,
    getWorkitemUsr,
    getListWorkitems
}