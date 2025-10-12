'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class galaxia_roles extends Model {
        static associate(models) {
            galaxia_roles.belongsTo(models.galaxia_processes, {
                as: 'gr_gp_process',
                foreignKey: 'pId'
            })
            galaxia_roles.belongsToMany(models.galaxia_activities, {
                through: 'galaxia_activity_roles',
                as: 'gr_ga_activities',
                foreignKey: 'roleId'
            })
            /*galaxia_roles.belongsToMany(models.galaxia_user, {
                through: 'galaxia_user_roles',
                as: 'gr_gu_users',
                foreignKey: 'roleId'
            })*/
        }
    }
    galaxia_roles.init(
        {
            roleId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            pId: { type: DataTypes.INTEGER, allowNull: false },
            lastModif: DataTypes.INTEGER,
            name: DataTypes.STRING(80),
            description: DataTypes.TEXT
        },
        {
            sequelize,
            modelName: 'galaxia_roles',
            timestamps: false,
            freezeTableName: true,
            tableName: 'galaxia_roles'
        }
    )
    return galaxia_roles
}