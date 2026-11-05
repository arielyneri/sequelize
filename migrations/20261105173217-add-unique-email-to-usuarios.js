'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex('Usuarios', ['email'], {
      name: 'usuarios_email_unique',
      unique: true
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('Usuarios', 'usuarios_email_unique');
  }
};