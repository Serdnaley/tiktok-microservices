'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = []
    const userId = 1

    let lastChatId = 0
    let lastMessageId = 0
    for (let companionId = 2; companionId <= 100; companionId++) {
      const chatId = ++lastChatId

      const chatUsers = [userId, companionId].map((userId) => ({ chatId, userId }))
      const messages = Array(100).fill(0).map(() => ({
        text: `Message ${++lastMessageId}`,
        chatId,
        userId: chatUsers[Math.floor(Math.random() * 2)].userId,
      }))

      data.push({
        chatUsers,
        messages,
      })
    }

    const chats = data.map(() => ({ createdAt: new Date() }))
    const chatUsers = data.flatMap(({ chatUsers }) => chatUsers)
    const messages = data.flatMap(({ messages }) => messages)

    await queryInterface.bulkInsert('Chats', chats, {})
    await queryInterface.bulkInsert('ChatUsers', chatUsers, {})
    await queryInterface.bulkInsert('Messages', messages, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Messages', null, {});
    await queryInterface.bulkDelete('ChatUsers', null, {});
    await queryInterface.bulkDelete('Chats', null, {});
  },
};
