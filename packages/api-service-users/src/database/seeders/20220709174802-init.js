'use strict';

const password = '$2a$10$5apzLF/fI.sSE2IzBASRyuC8rHc6XHT3Gu/n0wPc5X7HWrJ0mbogq' // password

const createUser = () => {
  const id = Math.random().toString().split('.')[1];

  return {
    email: `${id}@example.com`,
    username: `user${id}`,
    password,
  };
};

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        email: 'test@example.com',
        username: 'test',
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
