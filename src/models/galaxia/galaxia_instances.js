'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class galaxia_instances extends Model {
        static associate(models) {
            galaxia_instances.belongsTo(models.galaxia_processes, {
                as: 'gi_gp_process',
                foreignKey: 'pId'
            })
            galaxia_instances.belongsToMany(models.galaxia_activities, {
                through: 'galaxia_instance_activities',
                as: 'gi_ga_activities',
                foreignKey: 'instanceId'
            })
            galaxia_instances.hasMany(models.galaxia_workitems, {
                as: 'gi_gw_workitems',
                foreignKey: 'instanceId'
            })
            galaxia_instances.hasMany(models.galaxia_instance_comments, { // NUEVO
                as: 'gi_gic_comments',
                foreignKey: 'instanceId'
            })
        }
    }
    galaxia_instances.init(
        {
            instanceId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            pId: { type: DataTypes.INTEGER, allowNull: false },
            started: DataTypes.INTEGER,
            name: { type: DataTypes.STRING(200), defaultValue: 'No Name', allowNull: false },
            owner: DataTypes.STRING(200),
            nextActivity: DataTypes.INTEGER,
            nextUser: DataTypes.STRING(200),
            ended: DataTypes.INTEGER,
            status: DataTypes.ENUM('active', 'exception', 'aborted', 'completed'),
            properties: DataTypes.BLOB // LONGBLOB equivalente en PostgreSQL
        },
        {
            sequelize,
            modelName: 'galaxia_instances',
            timestamps: false,
            freezeTableName: true,
            tableName: 'galaxia_instances'
        }
    )
    return galaxia_instances
}