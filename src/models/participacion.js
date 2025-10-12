"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class participacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  participacion.init(
    {
      jugador_id: DataTypes.INTEGER,
      juego_id: DataTypes.INTEGER,
      status: DataTypes.CHAR,
    },
    {
      sequelize,
      modelName: "participacion",
    }
  );
/*
  participacion.associate = function (models) {
    // associations can be defined here
    participacion.belongsTo(models.usuario, {
      as: "usuario",
      foreignKey: "usuario_id",
    });
    participacion.belongsTo(models.juego, {
      as: "juego",
      foreignKey: "juego_id",
    });
  };*/
  return participacion;
};
