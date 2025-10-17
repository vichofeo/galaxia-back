'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class galaxia_workitems extends Model {
        static associate(models) {
            galaxia_workitems.belongsTo(models.galaxia_instances, {
                as: 'gw_gi_instance',
                foreignKey: 'instance_id'
            })
            galaxia_workitems.belongsTo(models.galaxia_activities, {
                as: 'gw_ga_activity',
                foreignKey: 'activity_id'
            })
        }
    }
    galaxia_workitems.init(
        {

            item_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            instance_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
            order_id: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
            activity_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
            properties: DataTypes.BLOB,
            started: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
            ended: { type: DataTypes.BIGINT, allowNull: true },
            user: { type: DataTypes.STRING(80), allowNull: true },// Hardcodeado, e.g., 'admin', 'user1'
            //status: {    type: DataTypes.STRING(10),    allowNull: false,    defaultValue: 'r'   }// running
        },
        {
            sequelize,
            modelName: 'galaxia_workitems',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'galaxia_workitems'
        }
    )
    return galaxia_workitems
}