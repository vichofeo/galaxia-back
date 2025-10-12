'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class galaxia_instance_comments extends Model {
        static associate(models) {
            galaxia_instance_comments.belongsTo(models.galaxia_instances, {
                as: 'gic_gi_instance',
                foreignKey: 'instanceId'
            })
            galaxia_instance_comments.belongsTo(models.galaxia_activities, {
                as: 'gic_ga_activity',
                foreignKey: 'activityId'
            })
        }
    }
    galaxia_instance_comments.init(
        {
            cId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            instanceId: { type: DataTypes.INTEGER, allowNull: false },
            user: DataTypes.STRING(40),
            activityId: { type: DataTypes.INTEGER, allowNull: false },
            hash: DataTypes.STRING(32),
            title: DataTypes.STRING(250),
            comment: DataTypes.TEXT,
            activity: DataTypes.STRING(80),
            timestamp: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'galaxia_instance_comments',
            timestamps: false,
            freezeTableName: true,
            tableName: 'galaxia_instance_commentss'
        }
    )
    return galaxia_instance_comments
}