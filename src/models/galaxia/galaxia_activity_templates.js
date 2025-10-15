'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    //galaxia__activities
    class galaxia_activity_templates extends Model {
        static associate(models) {
            galaxia_activity_templates.belongsTo(models.galaxia_activities, {
                as: 'gat_ga_activities',
                foreignKey: 'activityId'
            })
        }
    }
    galaxia_activity_templates.init(
        {
            tId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            activityId: { type: DataTypes.INTEGER, allowNull: false, },
            content: { type: DataTypes.TEXT, allowNull: true },
            formConfig: { type: DataTypes.JSON, allowNull: true }
        },
        {
            sequelize,
            modelName: 'galaxia_activity_templates',
            timestamps: false,
            freezeTableName: true,
            tableName: 'galaxia_activity_templates'
        }
    )
    return galaxia_activity_templates
}