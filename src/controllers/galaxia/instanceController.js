// Controlador para endpoints de instancias
const HandleErrors = require('../../utils/handleErrors');
const handleError = new HandleErrors();
const instanceService = require('../../services/galaxia/instanceService');

const getInstance = async (req, res) => {
  // Obtiene detalle de una instancia con workitems
  const { instanceId } = req.params;
  const result = await instanceService.getInstance({ id: instanceId }, handleError);
  handleError.setResponse(result)
  res.status(handleError.getCode()).json(handleError.getResponse())
};

const getTransitions = async (req, res) => {
  // Obtiene transiciones para una actividad
  const { act_from_id } = req.query;
  const result = await instanceService.getTransitions({ activityId: act_from_id }, handleError);
  handleError.setResponse(result)
  res.status(handleError.getCode()).json(handleError.getResponse())
}

module.exports = {
  getInstance,
  getTransitions
};