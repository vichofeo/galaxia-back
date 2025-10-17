'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class galaxia_activities extends Model {
        static associate(models) {
            galaxia_activities.belongsTo(models.galaxia_processes, {
                as: 'ga_gp_process',
                foreignKey: 'p_id'
            })
            galaxia_activities.belongsToMany(models.galaxia_roles, {
                through: 'galaxia_activity_roles',
                as: 'ga_gr_roles',
                foreignKey: 'activity_id'
            })
            galaxia_activities.hasMany(models.galaxia_transitions, {
                as: 'ga_gt_ftransitions',
                foreignKey: 'act_from_id'
            })
            galaxia_activities.hasMany(models.galaxia_transitions, {
                as: 'ga_gt_ttransitions',
                foreignKey: 'act_to_id'
            })
            galaxia_activities.hasMany(models.galaxia_instance_comments, { // NUEVO
                as: 'ga_gic_comments',
                foreignKey: 'activity_id'
            })
        }
    }
    galaxia_activities.init(
        {

            activity_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            p_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
            name: { type: DataTypes.STRING(80), allowNull: false, defaultValue: '' },
            normalized_name: { type: DataTypes.STRING(80), allowNull: true },
            description: { type: DataTypes.TEXT, allowNull: true },
            activity_type: {
                type: DataTypes.ENUM('start', 'end', 'split', 'switch', 'join', 'activity', 'standalone'), allowNull: false, defaultValue: 'activity'
            },
            is_auto_routed: { type: DataTypes.STRING(1), allowNull: false, defaultValue: 'n' },
            flow_num: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
            is_interactive: { type: DataTypes.STRING(1), allowNull: false, defaultValue: 'n' },
            last_modif: { type: DataTypes.BIGINT, allowNull: true },
            expiration_time: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },

            switch_conditions: { type: DataTypes.JSONB, allowNull: true, defaultValue: [] }, // Nuevo: Array JSON para condiciones en switch [{condition: string, act_to_id: number}]
            role_id: { type: DataTypes.INTEGER, allowNull: true },
            code: { type: DataTypes.TEXT, allowNull: true }, // Nuevo: Código JavaScript seguro para actividades activity/standalone
            form_fields: { type: DataTypes.JSONB, allowNull: true, defaultValue: [] },

        },
        {
            sequelize,
            modelName: 'galaxia_activities',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'galaxia_activities'
        }
    )
    return galaxia_activities
}