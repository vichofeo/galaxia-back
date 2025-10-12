// controllers/galaxia/instancesController.js
const HandleErrors = require('./../../utils/handleErrors')
const handleError = new HandleErrors()
const service = require('./../../services/galaxia/instancesServices')



// Crear nueva instancia
const createInstance = async (req, res) => {
    const { processId, createdBy, initialData = {} } = req.body;
    const token = req.headers.authorization

    try {
        const result = await service.createInstance({ processId, createdBy, initialData, token }, handleError)
        handleError.setResponse(result)
        res.status(handleError.getCode()).json(handleError.getResponse())
    } catch (error) {
        console.error('Error starting instance:', error)
        handleError.setMessage('Error iniciando instancia')
        res.status(500).json(handleError.getResponse())
    }
}

//listar instancias
const listInstances = async (req, res) => {
    const { userId, processId, status } = req.query;
    const token = req.headers.authorization

    try {
        const result = await service.listInstances({ userId, processId, status, token }, handleError)
        handleError.setResponse(result)
        res.status(handleError.getCode()).json(handleError.getResponse())
    } catch (error) {
        console.error('Error list instance:', error)
        handleError.setMessage('Error list instancia')
        res.status(500).json(handleError.getResponse())
    }
}

//detalle de instancia
const detailInstance = async (req, res) => {
    const idx = req.params.id;
    const token = req.headers.authorization

    try {
        const result = await service.detailInstance({ token, idx }, handleError)
        handleError.setResponse(result)
        res.status(handleError.getCode()).json(handleError.getResponse())
    } catch (error) {
        console.error('Error detail instance:', error)
        handleError.setMessage('Error detail instancia')
        res.status(500).json(handleError.getResponse())
    }
}


module.exports = {
   createInstance,
   listInstances, 
   detailInstance
}