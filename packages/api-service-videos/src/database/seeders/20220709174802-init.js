'use strict';

const videosMock = require('./mock/videos.mock.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    let lastVideoId = 0;
    let lastFileId = 0;
    const videos = [];
    const files = [];

    videosMock.map((url, i) => {
      const videoId = ++lastVideoId;
      const fileId = ++lastFileId;
      const userId = i % 100 + 1;

      files.push({ url, name: `File for video ${videoId}` });
      videos.push({
        title: `Video ${i + 1}`,
        description: `This is a video ${i + 1}`,
        fileId,
        userId,
      });
    });

    await queryInterface.bulkInsert('Files', files, {})
    await queryInterface.bulkInsert('Videos', videos, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Videos', null, {});
    await queryInterface.bulkDelete('Files', null, {});
  },
};
