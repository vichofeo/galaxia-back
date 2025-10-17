'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class galaxia_mappings extends Model {
        static associate(models) {
            galaxia_mappings.belongsTo(models.galaxia_roles, {
                as: 'gm_gr_roles',
                foreignKey: 'role_id'
            })
            
        }
    }
    galaxia_mappings.init(
        {

            mapping_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            role_id: { type: DataTypes.INTEGER, allowNull: false },
            user: { type: DataTypes.STRING(80), allowNull: false }// Hardcodeado como string, e.g., 'admin', 'user1'
        },
        {
            sequelize,
            modelName: 'galaxia_mappings',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'galaxia_mappings'
        }
    )
    return galaxia_mappings
}