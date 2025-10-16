// controllers/galaxia/galaxiaController.js
const HandleErrors = require('./../../utils/handleErrors')
const handleError = new HandleErrors()
const service = require('./../../services/galaxia/galaxiaService')

// ========== PROCESOS ==========
// GET /api/galaxia/processes - Listar todos los procesos
const getProcesses = async (req, res) => {
    const token = req.headers.authorization
    const result = await service.getProcesses({ token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

// GET /api/galaxia/processes/:id - Obtener proceso específico
const getProcess = async (req, res) => {
    const processId = req.params.id
    const token = req.headers.authorization

    const result = await service.getProcess({
        id: processId,
        token
    }, handleError)

    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}


module.exports = {
    getProcesses,
    getProcess,


}