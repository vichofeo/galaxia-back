'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class galaxia_activities extends Model {
        static associate(models) {
            galaxia_activities.belongsTo(models.galaxia_processes, {
                as: 'ga_gp_process',
                foreignKey: 'pId'
            })
            galaxia_activities.belongsToMany(models.galaxia_roles, {
                through: 'galaxia_activity_roles',
                as: 'ga_gr_roles',
                foreignKey: 'activityId'
            })
            galaxia_activities.hasMany(models.galaxia_transitions, {
                as: 'ga_gt_ftransitions',
                foreignKey: 'actFromId'
            })
            galaxia_activities.hasMany(models.galaxia_transitions, {
                as: 'ga_gt_ttransitions',
                foreignKey: 'actToId'
            })
            galaxia_activities.hasMany(models.galaxia_instance_comments, { // NUEVO
                as: 'ga_gic_comments',
                foreignKey: 'activityId'
            })
        }
    }
    galaxia_activities.init(
        {
            activityId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            name: DataTypes.STRING(80),
            normalized_name: DataTypes.STRING(80),
            pId: { type: DataTypes.INTEGER, allowNull: false },
            type: {
                type: DataTypes.ENUM('start', 'end', 'split', 'switch', 'join', 'activity', 'standalone'),
                allowNull: false
            },
            isAutoRouted: DataTypes.CHAR(1),
            flowNum: DataTypes.INTEGER,
            isInteractive: DataTypes.CHAR(1),
            lastModif: DataTypes.INTEGER,
            description: DataTypes.TEXT,
            expirationTime: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false }
        },
        {
            sequelize,
            modelName: 'galaxia_activities',
            timestamps: false,
            freezeTableName: true,
            tableName: 'galaxia_activities'
        }
    )
    return galaxia_activities
}