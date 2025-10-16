// routes/galaxiaRouter.js
const express = require('express')
const router = express.Router()
//const authMiddleWare = require('./../middlewares/authMiddleware')
const controller = require('./../controllers/galaxia/galaxiaController')


// Rutas específicas de Galaxia
//procesos
router.get("/processes",  controller.getProcesses)
router.get("/processes/:id",  controller.getProcess)





module.exports = router