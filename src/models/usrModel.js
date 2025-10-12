("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class usr extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usr.init(
    {
      usuario: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      estado: {
        allowNull: true,
        defaultValue: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "usr",
      timestamps: false,
      freezeTableName: true,
      tableName: "usr",
      classMethods: {},
    }
  );
  return usr;
};
