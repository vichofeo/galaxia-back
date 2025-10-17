'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class galaxia_instances extends Model {
        static associate(models) {
            galaxia_instances.belongsTo(models.galaxia_processes, {
                as: 'gi_gp_process',
                foreignKey: 'p_id'
            })
            galaxia_instances.belongsToMany(models.galaxia_activities, {
                through: 'galaxia_instance_activities',
                as: 'gi_ga_activities',
                foreignKey: 'instance_id'
            })
            galaxia_instances.hasMany(models.galaxia_workitems, {
                as: 'gi_gw_workitems',
                foreignKey: 'instance_id'
            })
            galaxia_instances.hasMany(models.galaxia_instance_comments, { // NUEVO
                as: 'gi_gic_comments',
                foreignKey: 'instance_id'
            })
        }
    }
    galaxia_instances.init(
        {
            instance_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            p_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
            started: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
            owner: { type: DataTypes.STRING(80), allowNull: true },
            //status: {    type: DataTypes.STRING(1),    allowNull: false,    defaultValue: 'r'   },// running
            status: DataTypes.ENUM('active', 'exception', 'aborted', 'completed'),
            name: { type: DataTypes.STRING(80), allowNull: true },
            ended: { type: DataTypes.BIGINT, allowNull: true },
            next_activity: DataTypes.INTEGER,
            next_user: DataTypes.STRING(200),
            properties: DataTypes.BLOB // LONGBLOB equivalente en PostgreSQL
        },
        {
            sequelize,
            modelName: 'galaxia_instances',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'galaxia_instances'
        }
    )
    return galaxia_instances
}