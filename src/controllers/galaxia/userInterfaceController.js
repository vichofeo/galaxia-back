// controllers/galaxia/userInterfaceController.js
const HandleErrors = require('./../../utils/handleErrors')
const handleError = new HandleErrors()
const service = require('./../../services/galaxia/userInterfaceService')

const getWorkitems = async (req, res) => {
    const token = req.headers.authorization
    
    const { userId, status } = req.query;
    const result = await service.getWorkitems({ userId, status, token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}
//detailWorkitem
// Obtener workitem específico
const detailWorkitem = async (req, res) => {
    const token = req.headers.authorization
    const idx = req.params.id
    const result = await service.detailWorkitem({ idx, token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

const completeWorkitem = async (req, res) => {
    const token = req.headers.authorization
    const idx = req.params.id
    const data = req.body
    const result = await service.completeWorkitem({ idx, resultData:data, token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

module.exports = {
    getWorkitems,
    detailWorkitem, 
    completeWorkitem
}