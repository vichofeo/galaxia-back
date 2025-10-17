'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class galaxia_transitions extends Model {
        static associate(models) {
            galaxia_transitions.belongsTo(models.galaxia_processes, {
                as: 'gt_gp_process',
                foreignKey: 'pId'
            })
            galaxia_transitions.belongsTo(models.galaxia_activities, {
                as: 'gt_ga_fromActivity',
                foreignKey: 'act_from_id',
                target: 'activityId'
            })
            galaxia_transitions.belongsTo(models.galaxia_activities, {
                as: 'gt_ga_toActivity',
                foreignKey: 'act_to_id'
            })
        }
    }
    galaxia_transitions.init(
        {


            p_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
            act_from_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, primaryKey: true },
            act_to_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, primaryKey: true }
        },
        {
            sequelize,
            modelName: 'galaxia_transitions',
            timestamps: false,
            freezeTableName: true,
            tableName: 'galaxia_transitions',
            underscored: true,
            primaryKey: false // Tabla tiene clave primaria compuesta
        }
    )
    return galaxia_transitions
}