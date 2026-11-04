'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turma extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Turma.init({
    nome: DataTypes.STRING,
    ano: DataTypes.INTEGER,
    professorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Turma',
  });
  return Turma;
};