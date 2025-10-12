'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class galaxia_processes extends Model {
        static associate(models) {
            galaxia_processes.hasMany(models.galaxia_activities, {
                as: 'gp_ga_activities',
                foreignKey: 'pId'
            })
            galaxia_processes.hasMany(models.galaxia_roles, {
                as: 'gp_gr_roles',
                foreignKey: 'pId'
            })
            galaxia_processes.hasMany(models.galaxia_instances, {
                as: 'gp_gi_instances',
                foreignKey: 'pId'
            })
        }
    }
    galaxia_processes.init(
        {
            pId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            name: { type: DataTypes.STRING(80), allowNull: false },
            isValid: { type: DataTypes.CHAR(1), defaultValue: 'n' },
            isActive: { type: DataTypes.CHAR(1), defaultValue: 'n' },
            version: { type: DataTypes.STRING(12), defaultValue: '1.0' },
            description: DataTypes.TEXT,
            lastModif: DataTypes.INTEGER,
            normalized_name: DataTypes.STRING(80)
        },
        {
            sequelize,
            modelName: 'galaxia_processes',
            timestamps: false,
            freezeTableName: true,
            tableName: 'galaxia_processes'
        }
    )
    return galaxia_processes
}