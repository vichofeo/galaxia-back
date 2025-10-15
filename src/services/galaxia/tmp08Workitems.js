// /galaxia-back/src/routes/workitems.js - COMPLETO
const express = require('express');
const router = express.Router();
const { Workitem, Instance, Activity, Process, User } = require('../models');

// Obtener workitems de una instancia
router.get('/instances/:instanceId/workitems', async (req, res) => {
  try {
    const { status, userId } = req.query;
    
    const where = { instanceId: req.params.instanceId };
    if (status) where.status = status;
    if (userId) where.assignedTo = userId;
    
    const workitems = await Workitem.findAll({
      where,
      include: [
        { model: Activity },
        { 
          model: Instance,
          include: [{ model: Process }]
        }
      ],
      order: [['createdAt', 'ASC']]
    });
    
    res.json(workitems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener workitems de un usuario
router.get('/user/:userId', async (req, res) => {
  try {
    const { status } = req.query;
    
    const where = { assignedTo: req.params.userId };
    if (status) where.status = status;
    
    const workitems = await Workitem.findAll({
      where,
      include: [
        { model: Activity },
        { 
          model: Instance,
          include: [{ model: Process }]
        }
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
        { model: Activity },
        { 
          model: Instance,
          include: [{ model: Process }]
        }
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

module.exports = router;