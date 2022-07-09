'use strict';

const createUser = () => {
  const id = Math.random().toString().split('.')[1];

  return {
    email: `${id}@example.com`,
    username: `user${id}`,
  }
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', Array(1000).fill(0).map(createUser), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
