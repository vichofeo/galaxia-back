'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class galaxia_instance_properties extends Model {
        static associate(models) {
            galaxia_instance_properties.belongsTo(models.galaxia_instances, {
                as: 'gip_gi_instance',
                foreignKey: 'instanceId'
            })

        }
    }
    galaxia_instance_properties.init(
        {
            instance_id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false },
            name: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
            value: { type: DataTypes.JSONB, allowNull: true } // Usamos JSONB para almacenar valores dinámicos
        },
        {
            sequelize,
            modelName: 'galaxia_instance_properties',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'galaxia_instance_properties'
        }
    )
    return galaxia_instance_properties
}