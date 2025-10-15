const QUtils = require('../../utils/queries/Qutils')
const qUtil = new QUtils()

// Obtener template de una actividad
const getTemplateActivity = async (dto, handleError) => {
    try {
        const { activityId, token } = dto

        qUtil.setTableInstance("galaxia_activity_templates")
        qUtil.setWhere({ activityId: activityId })
        await qUtil.findTune()
        const template = qUtil.getResults()
        if (!template) {
            return {
                ok: false,
                activityId: activityId,
                template: '',
                formConfig: [],
                message: 'template no encontrada'
            }
        }
        return {
            ok: true,
            data: template,
            activityId: template.activityId,
            template: template.content || '',
            formConfig: template.formConfig || [],
            message: "Datos encontrados"
        }

    } catch (error) {
        console.log("Error en OBTENCION DATOS:", error)
        handleError.setMessage("Error de sistema: TEMPLATE001")
        handleError.setHttpError(error.message)
    }
}

// Guardar template en actividad
const saveTemplateActivity = async (dto, handleError) => {
    try {
        const { activityId, template, formConfig, token } = dto

        qUtil.setTableInstance("galaxia_activities")
        await qUtil.findID(activityId)
        const activity = qUtil.getResults()
        if (!activity) {
            return {
                ok: false,
                message: 'actividad no encontrada'
            }
        }

        // Buscar template existente o crear nuevo
        qUtil.setTableInstance("galaxia_activities")
        qUtil.setWhere({ activityId: activityId })
        await qUtil.findTune()
        activity_template = qUtil.getResults()
        if (activity_template.length > 0) {
            //actualizacion
            qUtil.setDataset({ content: template, formConfig: formConfig })
            await qUtil.modify()
        } else {
            //insercion
            qUtil.setDataset({ content: template, formConfig: formConfig, activityId: activityId })
            await qUtil.create()
        }

        return {
            ok: true,
            message: 'Template guardado exitosamente',
            template: activityTemplate

        }

    } catch (error) {
        console.log("Error en creacion/modify DATOS:", error)
        handleError.setMessage("Error de sistema: TEMPLATE002")
        handleError.setHttpError(error.message)
    }
}
// Renderizar template con datos (ESTE SÍ FUNCIONA)
const renderTemplate = async (dto, handleError) => {
    try {
        const { template, instanceData, token } = dto

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
        return {
            ok: true,
            rendered: rendered,
            original: template,
            variablesUsed: instanceData ? Object.keys(instanceData) : []

        }

    } catch (error) {
        console.log("Error en creacion/modify DATOS:", error)
        handleError.setMessage("Error de sistema: TEMPLATE002")
        handleError.setHttpError(error.message)
    }
}

// Biblioteca de templates (ESTE SÍ FUNCIONA)
const getTemplateLibrary = async (dto, handleError) => {
    try {
        const { token } = dto

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
        return {
            ok: true,
            data: libraryTemplates

        }

    } catch (error) {
        console.log("Error en creacion/modify DATOS:", error)
        handleError.setMessage("Error de sistema: TEMPLATE002")
        handleError.setHttpError(error.message)
    }
}
module.exports = {
    getTemplateActivity,
    saveTemplateActivity,
    renderTemplate,
    getTemplateLibrary

}