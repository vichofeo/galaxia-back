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
                foreignKey: 'actFromId',
                target: 'activityId'
            })
            galaxia_transitions.belongsTo(models.galaxia_activities, {
                as: 'gt_ga_toActivity',
                foreignKey: 'actToId'
            })
        }
    }
    galaxia_transitions.init(
        {
            pId: { type: DataTypes.INTEGER, allowNull: false },
            actFromId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
            actToId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true }
        },
        {
            sequelize,
            modelName: 'galaxia_transitions',
            timestamps: false,
            freezeTableName: true,
            tableName: 'galaxia_transitions',
            primaryKey: false // Tabla tiene clave primaria compuesta
        }
    )
    return galaxia_transitions
}