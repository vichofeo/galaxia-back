'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class galaxia_processes extends Model {
        static associate(models) {
            galaxia_processes.hasMany(models.galaxia_activities, {
                as: 'gp_ga_activities',
                foreignKey: 'p_id'
            })
            galaxia_processes.hasMany(models.galaxia_roles, {
                as: 'gp_gr_roles',
                foreignKey: 'p_id'
            })
            galaxia_processes.hasMany(models.galaxia_instances, {
                as: 'gp_gi_instances',
                foreignKey: 'p_id'
            })
            galaxia_processes.hasMany(models.galaxia_transitions, { foreignKey: 'p_id', as: 'gp_gt_transitions' });
        }
    }
    galaxia_processes.init(
        {
            p_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            name: { type: DataTypes.STRING(80), allowNull: false, defaultValue: '' },
            is_active: { type: DataTypes.STRING(1), allowNull: false, defaultValue: 'n' },
            is_alid: { type: DataTypes.STRING(1), defaultValue: 'n' },
            description: { type: DataTypes.TEXT, allowNull: true },
            version: { type: DataTypes.STRING(12), allowNull: false, defaultValue: '' },
            normalized_name: { type: DataTypes.STRING(80), allowNull: true },
            last_modif: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'galaxia_processes',
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            tableName: 'galaxia_processes'
        }
    )
    return galaxia_processes
}