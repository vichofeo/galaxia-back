'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class cf_evento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cf_evento.init(
    {
      idx: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },      
      ente_gestor_id: { type: DataTypes.STRING, allowNull: false},   
      establecimiento_id: { type: DataTypes.STRING, allowNull: false},  
      nivel: { type: DataTypes.STRING, allowNull: false},  
      fecha_registro: { type: DataTypes.DATEONLY, allowNull: false},  
      total_camas_disp: { type: DataTypes.INTEGER, allowNull: false, defaultValue:0},  
      total_camas_disp_uti: { type: DataTypes.INTEGER, allowNull: false, defaultValue:0},  
      total_camas_disp_uci: { type: DataTypes.INTEGER, allowNull: false, defaultValue:0},  
      total_camas_disp_eme: { type: DataTypes.INTEGER, allowNull: false, defaultValue:0},  

      m_camas_disp: { type: DataTypes.INTEGER, allowNull: false, defaultValue:0}, 
      m_camas_disp_uti:{ type: DataTypes.INTEGER, allowNull: false, defaultValue:0}, 
      m_camas_disp_uci: { type: DataTypes.INTEGER, allowNull: false, defaultValue:0}, 
      m_camas_dis_eme: { type: DataTypes.INTEGER, allowNull: false, defaultValue:0}, 

      t_camas_disp: { type: DataTypes.INTEGER, allowNull: false, defaultValue:0}, 
      t_camas_disp_uti: { type: DataTypes.INTEGER, allowNull: false, defaultValue:0}, 
      t_camas_disp_uci:{ type: DataTypes.INTEGER, allowNull: false, defaultValue:0}, 
      t_camas_disp_eme:{ type: DataTypes.INTEGER, allowNull: false, defaultValue:0},  

      n_camas_disp: { type: DataTypes.INTEGER, allowNull: false, defaultValue:0},  
      n_camas_disp_uti: { type: DataTypes.INTEGER, allowNull: false, defaultValue:0},  
      n_camas_disp_uci: { type: DataTypes.INTEGER, allowNull: false, defaultValue:0}, 
      n_camas_disp_eme: { type: DataTypes.INTEGER, allowNull: false, defaultValue:0}, 
      

      dni_register: { type: DataTypes.STRING(25), allowNull: true },
      create_date: { type: DataTypes.DATE, allowNull: false },
      last_modify_date_time: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      modelName: 'cf_evento',
      timestamps: false,
      freezeTableName: true,
      tableName: 'cf_evento',
      classMethods: {},
    }
  )
  return cf_evento
}
