// Servicio para operaciones de Workflow (instancias y transiciones)
const QUtils = require('../../utils/queries/Qutils');
const qUtil = new QUtils();

const getInstances = async (dto, handleError) => {
  const where = {};
  if (dto.processId) where.p_id = dto.processId;
  if (dto.status) where.status = dto.status;

  const workitemWhere = { status: 'r' };
  if (dto.activityName) {
    workitemWhere['$workitems.activity.name$'] = { like: `%${dto.activityName}%` };
  }

  const result = await qUtil.findAll('galaxia_instances', {
    where,
    include: [
      { model: 'galaxia_processes', as: 'process' },
      {
        model: 'galaxia_workitems',
        as: 'workitems',
        where: workitemWhere,
        include: [{ model: 'galaxia_activities', as: 'activity' }],
        required: false
      }
    ]
  });
  if (result.error) {
    handleError.addError(result.error);
    return { data: [] };
  }
  return { data: result.data };
};

const getInstance = async (dto, handleError) => {
  const result = await qUtil.findById('galaxia_instances', dto.id, {
    include: [
      { model: 'galaxia_workitems', as: 'workitems', include: [{ model: 'galaxia_activities', as: 'activity' }] },
      { model: 'galaxia_processes', as: 'process', include: [{ model: 'galaxia_activities', as: 'activities' }] },
      { model: 'galaxia_instance_properties', as: 'properties' }
    ]
  });
  if (result.error) {
    handleError.addError(result.error);
    return { data: null };
  }
  return { data: result.data };
};

const getTransitions = async (dto, handleError) => {
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
  getInstances,
  getInstance,
  getTransitions
};