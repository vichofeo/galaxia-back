// /galaxia-back/src/routes/variables.js - NUEVO ARCHIVO
const express = require('express');
const router = express.Router();
const { Instance } = require('../models');

// Obtener variables de instancia
router.get('/instances/:instanceId/variables', async (req, res) => {
  try {
    const instance = await Instance.findByPk(req.params.instanceId);
    if (!instance) {
      return res.status(404).json({ error: 'Instancia no encontrada' });
    }

    res.json(instance.data || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Establecer variable de instancia
router.post('/instances/:instanceId/variables', async (req, res) => {
  try {
    const { name, value, type } = req.body;
    const instance = await Instance.findByPk(req.params.instanceId);
    
    if (!instance) {
      return res.status(404).json({ error: 'Instancia no encontrada' });
    }

    const currentData = instance.data || {};
    currentData[name] = value;

    await instance.update({ data: currentData });

    res.json({
      success: true,
      variable: { name, value, type },
      instanceData: currentData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar variable existente
router.put('/instances/:instanceId/variables/:variableName', async (req, res) => {
  try {
    const { value } = req.body;
    const instance = await Instance.findByPk(req.params.instanceId);
    
    if (!instance) {
      return res.status(404).json({ error: 'Instancia no encontrada' });
    }

    const currentData = instance.data || {};
    if (!(req.params.variableName in currentData)) {
      return res.status(404).json({ error: 'Variable no encontrada' });
    }

    currentData[req.params.variableName] = value;
    await instance.update({ data: currentData });

    res.json({
      success: true,
      variable: { name: req.params.variableName, value },
      instanceData: currentData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar variable
router.delete('/instances/:instanceId/variables/:variableName', async (req, res) => {
  try {
    const instance = await Instance.findByPk(req.params.instanceId);
    
    if (!instance) {
      return res.status(404).json({ error: 'Instancia no encontrada' });
    }

    const currentData = instance.data || {};
    if (!(req.params.variableName in currentData)) {
      return res.status(404).json({ error: 'Variable no encontrada' });
    }

    delete currentData[req.params.variableName];
    await instance.update({ data: currentData });

    res.json({
      success: true,
      message: `Variable ${req.params.variableName} eliminada`,
      instanceData: currentData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;