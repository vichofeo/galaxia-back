'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class galaxia_roles extends Model {
        static associate(models) {
            galaxia_roles.belongsTo(models.galaxia_processes, {
                as: 'gr_gp_process',
                foreignKey: 'p_id'
            })
            galaxia_roles.belongsToMany(models.galaxia_activities, {
                through: 'galaxia_activity_roles',
                as: 'gr_ga_activities',
                foreignKey: 'role_id'
            })
            //galaxia_roles.hasMany(models.Mapping, { foreignKey: 'role_id' });
            /*galaxia_roles.belongsToMany(models.galaxia_user, {
                through: 'galaxia_user_roles',
                as: 'gr_gu_users',
                foreignKey: 'roleId'
            })*/
        }
    }
    galaxia_roles.init(
        {
            
            role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            p_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
            name: { type: DataTypes.STRING(80), allowNull: false, defaultValue: '' },
            description: { type: DataTypes.TEXT, allowNull: true },
            last_modif: { type: DataTypes.BIGINT, allowNull: true }
        },
        {
            sequelize,
            modelName: 'galaxia_roles',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'galaxia_roles'
        }
    )
    return galaxia_roles
}