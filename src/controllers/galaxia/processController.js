// Controlador para endpoints del Process Manager (pág. 5-18)
const HandleErrors = require('../../utils/handleErrors');
const handleError = new HandleErrors();
const workflowEngine = require('../../services/galaxia/workflowEngine');
const processService = require('../../services/galaxia/processService');

const getProcesses = async (req, res) => {
  const result = await processService.getProcesses(handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(200).json(result.data);
};

const getProcess = async (req, res) => {
  const { id } = req.params;
  const result = await processService.getProcess(id, handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(200).json(result.data);
};

const validateProcess = async (req, res) => {
  const { id } = req.params;
  const result = await workflowEngine.validateProcess(id, null, handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(200).json({ valid: result.valid });
};

const createProcess = async (req, res) => {
  const data = req.body;
  const result = await processService.createProcess(data, handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(201).json(result.data);
};

const updateProcess = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await processService.updateProcess(id, data, handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(200).json(result.data);
};

const createActivity = async (req, res) => {
  const { processId } = req.params;
  const data = req.body;
  const result = await processService.createActivity(processId, data, handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(201).json(result.data);
};

const updateActivity = async (req, res) => {
  const { processId, id } = req.params;
  const data = req.body;
  const result = await processService.updateActivity(processId, id, data, handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(200).json(result.data);
};

const createTransition = async (req, res) => {
  const { processId } = req.params;
  const { fromActivityId, toActivityId } = req.body;
  const newTransition = { act_from_id: fromActivityId, act_to_id: toActivityId };

  // Validar ciclo antes de crear
  const validationResult = await workflowEngine.validateProcess(processId, newTransition, handleError);
  if (!validationResult.valid) {
    return res.status(400).json({ errors: validationResult.errors });
  }

  const result = await processService.createTransition(processId, newTransition, handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(201).json(result.data);
};

const createRole = async (req, res) => {
  const { processId } = req.params;
  const data = req.body;
  const result = await processService.createRole(processId, data, handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(201).json(result.data);
};

const createMapping = async (req, res) => {
  const { processId, roleId } = req.params;
  const data = req.body;
  const result = await processService.createMapping(processId, roleId, data, handleError);
  if (handleError.hasErrors()) {
    return res.status(400).json({ errors: handleError.getErrors() });
  }
  return res.status(201).json(result.data);
};

module.exports = {
  getProcesses,
  getProcess,
  validateProcess,
  createProcess,
  updateProcess,
  createActivity,
  updateActivity,
  createTransition,
  createRole,
  createMapping
};