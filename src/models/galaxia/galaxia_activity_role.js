'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class galaxia_activity_roles extends Model {
        static associate(models) {
            // Relaciones definidas en los modelos principales
            galaxia_activity_roles.belongsTo(models.galaxia_roles, {
                as: 'gar_gr_role',
                foreignKey: 'roleId'
            })
        }
    }
    galaxia_activity_roles.init(
        {
            activityId: { type: DataTypes.INTEGER, allowNull: false },
            roleId: { type: DataTypes.INTEGER, allowNull: false }
        },
        {
            sequelize,
            modelName: 'galaxia_activity_roles',
            timestamps: false,
            freezeTableName: true,
            tableName: 'galaxia_activity_roles'
        }
    )
    return galaxia_activity_roles
}