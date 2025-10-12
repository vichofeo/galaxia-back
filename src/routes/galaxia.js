// routes/galaxiaRouter.js
const express = require('express')
const router = express.Router()
//const authMiddleWare = require('./../middlewares/authMiddleware')
const controller = require('./../controllers/galaxia/galaxiaController')

const instancesController = require('./../controllers/galaxia/instancesController')

// Rutas específicas de Galaxia
router.get("/processes",  controller.getProcesses)
router.post("/processes",  controller.createProcess)
router.get("/processes/:id",  controller.getProcess)

// Actividades
router.get("/processes/:id/activities",  controller.getProcessActivities)
router.post("/processes/:id/activities",  controller.addActivity)
router.put("/processes/:id",  controller.updateProcess)

// ========== ACTIVIDADES ==========
router.get("/processes/:id/activities",  controller.getProcessActivities)
router.post("/processes/:id/activities",  controller.addActivity)

// ========== ROLES ==========
router.get("/processes/:id/roles",  controller.getProcessRoles)
router.post("/processes/:id/roles",  controller.createRole)

// ========== ASIGNACIONES DE ROLES ==========
router.get("/processes/:processId/roles/:roleId/assignments",  controller.getRoleAssignments)
router.post("/processes/:processId/roles/:roleId/assignments",  controller.assignRole)
router.delete("/processes/:processId/roles/:roleId/assignments/:assignmentId",  controller.removeRoleAssignment)

// ========== ROLES EN ACTIVIDADES ==========
router.get("/activities/:id/roles",  controller.getActivityRoles)
//router.post("/activities/:id/roles",  controller.assignRoleToActivity)

// ========== ROLES EN ACTIVIDADES ==========
//router.get("/activities/:id/roles",  controller.getActivityRoles)
router.post("/activities/:id/roles",  controller.assignRolesToActivity)

// ========== TRANSICIONES ==========
router.get("/processes/:id/transitions",  controller.getProcessTransitions)
router.post("/processes/:id/transitions",  controller.addTransition)
router.delete("/processes/:processId/transitions/:fromActivityId/:toActivityId",  controller.deleteTransition)


// Validación y activación de procesos
router.post("/processes/:id/validate",  controller.validateProcess)
router.post("/processes/:id/activate",  controller.activateProcess)
router.post("/processes/:id/deactivate",  controller.deactivateProcess)

// Gestión de Instancias
router.get("/instances",  controller.getInstances)
router.post("/instances",  controller.startInstance)
router.post("/instances/:id/abort",  controller.abortInstance)

// User Dashboard
router.get("/users/:userId/workitems",  controller.getUserWorkitems)
router.get("/users/:userId/instances",  controller.getUserInstances)
router.get("/users/:userId/stats",  controller.getUserStats)
router.post("/workitems/:id/execute",  controller.executeWorkitem)

//instancias
router.post("/guinstances",  instancesController.createInstance)
router.get("/guinstances",  instancesController.listInstances)
router.get("/guinstances/:id",  instancesController.detailInstance)


module.exports = router