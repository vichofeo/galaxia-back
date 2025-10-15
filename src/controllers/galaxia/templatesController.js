const HandleErrors = require('../../utils/handleErrors')
const handleError = new HandleErrors()
const service = require('../../services/galaxia/templatesService.js')

const getTemplateActivity = async (req, res) => {
    const token = req.headers.authorization
    const activityId = req.params.activityId
   
    const result = await service.getTemplateActivity({ activityId, token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

const saveTemplateActivity = async (req, res) => {
    const token = req.headers.authorization
    const activityId = req.params.activityId
    const { template, formConfig } = req.body;
   
    const result = await service.saveTemplateActivity({ activityId, template, formConfig, token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

const renderTemplate = async (req, res) => {
    const token = req.headers.authorization
    const { template, instanceData } = req.body;
   
    const result = await service.renderTemplate({ template, instanceData, token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

const getTemplateLibrary = async (req, res) => {
    const token = req.headers.authorization
       
    const result = await service.getTemplateLibrary({ token }, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}

module.exports={
    getTemplateActivity,
    saveTemplateActivity,
    renderTemplate,
    getTemplateLibrary

}