const express = require('express');
const router = express.Router();
const { Workitem, Instance, Activity, Process, User } = require('../models');
const workflowEngine = require('../services/workflowEngine');

// Obtener workitems de un usuario
router.get('/user', async (req, res) => {
  try {
    const { userId, status } = req.query;
    
    const where = { assignedTo: userId };
    if (status) where.status = status;
    
    const workitems = await Workitem.findAll({
      where,
      include: [
        { 
          model: Instance,
          include: [{ model: Process }]
        },
        { model: Activity }
      ],
      order: [['createdAt', 'ASC']]
    });
    
    res.json(workitems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener workitem específico
router.get('/:id', async (req, res) => {
  try {
    const workitem = await Workitem.findByPk(req.params.id, {
      include: [
        { 
          model: Instance,
          include: [{ model: Process }]
        },
        { model: Activity }
      ]
    });
    
    if (!workitem) {
      return res.status(404).json({ error: 'Workitem no encontrado' });
    }
    
    res.json(workitem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Completar workitem
router.post('/:id/complete', async (req, res) => {
  try {
    const { resultData = {} } = req.body;
    
    const workitem = await workflowEngine.completeActivity(req.params.id, resultData);
    res.json(workitem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;


// Agregar estas líneas
app.use('/api/workitems', require('./workitems'));
app.use('/api/instances', require('./instances'));