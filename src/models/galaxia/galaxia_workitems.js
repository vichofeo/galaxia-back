'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class galaxia_workitems extends Model {
        static associate(models) {
            galaxia_workitems.belongsTo(models.galaxia_instances, {
                as: 'gw_gi_instance',
                foreignKey: 'instanceId'
            })
            galaxia_workitems.belongsTo(models.galaxia_activities, {
                as: 'gw_ga_activity',
                foreignKey: 'activityId'
            })
        }
    }
    galaxia_workitems.init(
        {
            itemId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            instanceId: { type: DataTypes.INTEGER, allowNull: false },
            orderId: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
            activityId: { type: DataTypes.INTEGER, allowNull: false },
            properties: DataTypes.BLOB,
            started: DataTypes.INTEGER,
            ended: DataTypes.INTEGER,
            user: DataTypes.STRING(40),
            status: DataTypes.STRING(10)
        },
        {
            sequelize,
            modelName: 'galaxia_workitems',
            timestamps: false,
            freezeTableName: true,
            tableName: 'galaxia_workitems'
        }
    )
    return galaxia_workitems
}