'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class galaxia_user_roles extends Model {
        static associate(models) {
            // Relaciones definidas en los modelos principales
            galaxia_user_roles.belongsTo(models.galaxia_roles, {
                as: 'gur_gr_role',
                foreignKey: 'roleId'
            })
        }
    }
    galaxia_user_roles.init(
        {
            pId: { type: DataTypes.INTEGER, allowNull: false },
            roleId: { type: DataTypes.INTEGER, allowNull: false },
            user: { type: DataTypes.STRING(40), allowNull: true },
            group_name: { type: DataTypes.STRING(80), allowNull: true },
            is_group: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false }
        },
        {
            sequelize,
            modelName: 'galaxia_user_roles',
            timestamps: false,
            freezeTableName: true,
            tableName: 'galaxia_user_roles',
            indexes: [
                {
                    unique: true,
                    fields: ['roleId', 'user', 'group_name']
                }
            ]
        }
    )
     galaxia_user_roles.removeAttribute("id");
    return galaxia_user_roles
}