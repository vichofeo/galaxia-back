const express = require('express');
const router = express.Router();
const { Instance, Workitem, Process, Activity, User } = require('../models');
const workflowEngine = require('../services/workflowEngine');

// Crear nueva instancia
router.post('/', async (req, res) => {
  try {
    const { processId, createdBy, initialData = {} } = req.body;
    
    const instance = await workflowEngine.createInstance({
      processId,
      createdBy, 
      initialData
    });
    
    res.json(instance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar instancias del usuario
router.get('/', async (req, res) => {
  try {
    const { userId, processId, status } = req.query;
    
    const where = {};
    if (userId) where.createdBy = userId;
    if (processId) where.processId = processId; 
    if (status) where.status = status;
    
    const instances = await Instance.findAll({
      where,
      include: [
        { model: Process, attributes: ['name', 'version'] },
        { model: User, as: 'creator', attributes: ['id', 'username'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json(instances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener detalle de instancia
router.get('/:id', async (req, res) => {
  try {
    const instance = await Instance.findByPk(req.params.id, {
      include: [
        { 
          model: Process,
          include: [{ model: Activity }]
        },
        { model: User, as: 'creator', attributes: ['id', 'username'] },
        { 
          model: Workitem,
          include: [{ model: Activity }, { model: User, attributes: ['id', 'username'] }]
        }
      ]
    });
    
    if (!instance) {
      return res.status(404).json({ error: 'Instancia no encontrada' });
    }
    
    res.json(instance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar instancia
router.put('/:id', async (req, res) => {
  try {
    const { status, data } = req.body;
    
    const instance = await Instance.findByPk(req.params.id);
    if (!instance) {
      return res.status(404).json({ error: 'Instancia no encontrada' });
    }
    
    if (status) instance.status = status;
    if (data) instance.data = { ...instance.data, ...data };
    
    await instance.save();
    res.json(instance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;