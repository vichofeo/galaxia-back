// routes/galaxiaRouter.js
const express = require('express')
const router = express.Router()

const processController = require('../controllers/galaxia/processController');
const workflowController = require('../controllers/galaxia/workflowController');


// Process Manager routes
router.get('/processes', processController.getProcesses);
router.get('/processes/:id', processController.getProcess);
router.get('/processes/:id/validate', processController.validateProcess);
router.post('/processes', processController.createProcess);
router.put('/processes/:id', processController.updateProcess);
router.post('/processes/:processId/activities', processController.createActivity);
router.put('/processes/:processId/activities/:id', processController.updateActivity);
router.post('/processes/:processId/transitions', processController.createTransition);
router.post('/processes/:processId/roles', processController.createRole);
router.post('/processes/:processId/roles/:roleId/mappings', processController.createMapping);

// Workflow Engine routes
router.get('/instances', workflowController.getInstances);
router.get('/instances/:instanceId', workflowController.getInstance);
router.get('/transitions', workflowController.getTransitions);
router.post('/instances/:instanceId/route', workflowController.routeInstance);
router.post('/instances/:instanceId/activities/:activityId/complete', workflowController.completeActivity);
router.post('/instances/:instanceId/activities/set-next', workflowController.setNextActivity);
router.post('/instances/:instanceId/activities/:activityId/set-user', workflowController.setNextUser);
router.post('/roles/:roleId/check', workflowController.checkRole);
router.post('/instances/:instanceId/properties', workflowController.setProperties);
router.post('/instances/:instanceId/activities/:activityId/submit-form', workflowController.submitForm);

// Instance routes
router.get('/instances/:instanceId', instanceController.getInstance);
router.get('/transitions', instanceController.getTransitions);


module.exports = router;