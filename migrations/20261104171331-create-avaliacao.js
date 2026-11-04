'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Avaliacaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      alunoId: {
        type: Sequelize.INTEGER
      },
      turmaId: {
        type: Sequelize.INTEGER
      },
      professorId: {
        type: Sequelize.INTEGER
      },
      nota: {
        type: Sequelize.DECIMAL
      },
      dataAvaliacao: {
        type: Sequelize.DATE
      },
      observacao: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Avaliacaos');
  }
};