// Controlador para endpoints del ejecutor de procesos (User Interface, pág. 18-20)
const HandleErrors = require('../../utils/handleErrors');
const handleError = new HandleErrors();
const workflowEngine = require('../../services/galaxia/workflowEngine');
const workflowService = require('../../services/galaxia/workflowService');

const getInstances = async (req, res) => {
  const { processId, status, activityName } = req.query;
  const filters = { processId, status, activityName };
  const result = await workflowService.getInstances(filters, handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(200).json(result.data);
};

const getInstance = async (req, res) => {
  const { instanceId } = req.params;
  const result = await workflowService.getInstance({ id: instanceId }, handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(200).json(result.data);
};

const getTransitions = async (req, res) => {
  const { activityId } = req.query;
  const result = await workflowService.getTransitions({ activityId }, handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(200).json(result.data);
};

const routeInstance = async (req, res) => {
  const { instanceId } = req.params;
  const result = await workflowEngine.routeInstance(instanceId, handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(200).json({ success: result.success });
};

const completeActivity = async (req, res) => {
  const { instanceId, activityId } = req.params;
  const result = await workflowEngine.complete(instanceId, activityId, handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(200).json({ success: result.success });
};

const setNextActivity = async (req, res) => {
  const { instanceId } = req.params;
  const { nextActivityId } = req.body;
  const result = await workflowEngine.setNextActivity(instanceId, nextActivityId, handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(200).json({ success: result.success });
};

const setNextUser = async (req, res) => {
  const { instanceId, activityId } = req.params;
  const { nextUser } = req.body;
  const result = await workflowEngine.setNextUser(instanceId, activityId, nextUser, handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(200).json({ success: result.success });
};

const checkRole = async (req, res) => {
  const { roleId } = req.params;
  const { user } = req.body;
  const result = await workflowEngine.checkRole(user, roleId, handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(200).json({ hasRole: result });
};

const setProperties = async (req, res) => {
  const { instanceId } = req.params;
  const properties = req.body;
  const result = await workflowEngine.handleProperties(instanceId, properties, handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(200).json({ success: result.success });
};

module.exports = {
  getInstances,
  getInstance,
  getTransitions,
  routeInstance,
  completeActivity,
  setNextActivity,
  setNextUser,
  checkRole,
  setProperties
};