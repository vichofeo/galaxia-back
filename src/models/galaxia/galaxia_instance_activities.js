'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class galaxia_instance_activities extends Model {
        static associate(models) {
            // Relaciones definidas en los modelos principales
        }
    }
    galaxia_instance_activities.init(
        {
            instanceId: { type: DataTypes.INTEGER, allowNull: false },
            activityId: { type: DataTypes.INTEGER, allowNull: false },
            started: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
            ended: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
            user: DataTypes.STRING(40),
            status: DataTypes.ENUM('running', 'completed')
        },
        {
            sequelize,
            modelName: 'galaxia_instance_activities',
            timestamps: false,
            freezeTableName: true,
            tableName: 'galaxia_instance_activities'
        }
    )
    return galaxia_instance_activities
}