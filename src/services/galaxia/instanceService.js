// Servicio para operaciones con instancias
const QUtils = require('../../utils/queries/Qutils');
const qUtil = new QUtils();

const getInstance = async (dto, handleError) => {
  // Obtiene instancia con workitems y proceso asociado
  const result = await qUtil.findById('galaxia_instances', dto.id, {
    include: [
      { model: 'galaxia_workitems', as: 'workitems', include: [{ model: 'galaxia_activities', as: 'activity' }] },
      { model: 'galaxia_processes', as: 'process', include: [{ model: 'galaxia_activities', as: 'activities' }] }
    ]
  });
  if (result.error) {
    handleError.addError(result.error);
    return { data: null };
  }
  return { data: result.data };
};

const getTransitions = async (dto, handleError) => {
  // Obtiene transiciones para una actividad específica
  const result = await qUtil.findAll('galaxia_transitions', {
    where: { act_from_id: dto.activityId },
    include: [
      { model: 'galaxia_activities', as: 'fromActivity' },
      { model: 'galaxia_activities', as: 'toActivity' }
    ]
  });
  if (result.error) {
    handleError.addError(result.error);
    return { data: [] };
  }
  return { data: result.data };
};

module.exports = {
  getInstance,
  getTransitions
};