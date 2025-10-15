// /galaxia-back/src/routes/templates.js - CORREGIDO
const express = require('express');
const router = express.Router();
const { Activity, ActivityTemplate } = require('../models'); // Nueva tabla para templates

// Obtener template de una actividad
router.get('/activities/:activityId/template', async (req, res) => {
  try {
    // Buscar en tabla separada ActivityTemplate
    const template = await ActivityTemplate.findOne({
      where: { activityId: req.params.activityId }
    });

    if (!template) {
      return res.json({
        activityId: req.params.activityId,
        template: '',
        formConfig: []
      });
    }

    res.json({
      activityId: template.activityId,
      template: template.content || '',
      formConfig: template.formConfig || []
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Guardar template en actividad
router.post('/activities/:activityId/template', async (req, res) => {
  try {
    const { template, formConfig } = req.body;
    
    // Verificar que la actividad existe
    const activity = await Activity.findByPk(req.params.activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    // Buscar template existente o crear nuevo
    const [activityTemplate, created] = await ActivityTemplate.findOrCreate({
      where: { activityId: req.params.activityId },
      defaults: {
        content: template,
        formConfig: formConfig
      }
    });

    // Si ya existe, actualizar
    if (!created) {
      await activityTemplate.update({
        content: template,
        formConfig: formConfig,
        updatedAt: new Date()
      });
    }

    res.json({
      success: true,
      message: 'Template guardado exitosamente',
      template: activityTemplate
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Renderizar template con datos (ESTE SÍ FUNCIONA)
router.post('/templates/render', async (req, res) => {
  try {
    const { template, instanceData } = req.body;
    
    let rendered = template;
    
    // Reemplazar variables {{ variable }} con datos
    if (instanceData && typeof instanceData === 'object') {
      Object.keys(instanceData).forEach(key => {
        const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
        const value = instanceData[key] !== null && instanceData[key] !== undefined 
          ? String(instanceData[key]) 
          : '';
        rendered = rendered.replace(regex, value);
      });
    }

    res.json({
      rendered: rendered,
      original: template,
      variablesUsed: instanceData ? Object.keys(instanceData) : []
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Biblioteca de templates (ESTE SÍ FUNCIONA)
router.get('/templates/library', async (req, res) => {
  try {
    const libraryTemplates = [
      {
        id: 1,
        name: 'Formulario de Solicitud Simple',
        category: 'Solicitud',
        content: `Solicitud: {{ tipo }}\n\nSolicitante: {{ solicitante }}\nDescripción: {{ descripcion }}\nPrioridad: {{ prioridad }}`,
        variables: ['tipo', 'solicitante', 'descripcion', 'prioridad']
      },
      {
        id: 2, 
        name: 'Formulario de Aprobación',
        category: 'Aprobación', 
        content: `Solicitud de Aprobación\n\nProyecto: {{ proyecto }}\nMonto: {{ monto }}\nJustificación: {{ justificacion }}\n\nDecisión: {{ decision }}`,
        variables: ['proyecto', 'monto', 'justificacion', 'decision']
      },
      {
        id: 3,
        name: 'CD Loan Request',
        category: 'Préstamo',
        content: `Solicitud de Préstamo de CD\n\nCD Solicitado: {{ cdTitle }}\nUsuario: {{ userName }}\nDías Requeridos: {{ daysRequested }}\n\nFecha Solicitud: {{ requestDate }}`,
        variables: ['cdTitle', 'userName', 'daysRequested', 'requestDate']
      }
    ];

    res.json(libraryTemplates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;