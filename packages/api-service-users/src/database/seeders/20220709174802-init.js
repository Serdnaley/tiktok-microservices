'use strict';

const password = '$2a$10$5apzLF/fI.sSE2IzBASRyuC8rHc6XHT3Gu/n0wPc5X7HWrJ0mbogq' // password
const avatarUrl = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80'

const createUser = () => {
  const id = Math.random().toString().split('.')[1];

  return {
    email: `${id}@example.com`,
    username: `user${id}`,
    avatarUrl,
    password,
  };
};

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        email: 'test@example.com',
        username: 'test',
        avatarUrl,
        password,
      },
      ...Array(1000).fill(0).map(createUser),
    ];
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
