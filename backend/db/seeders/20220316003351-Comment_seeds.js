"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Comments",
      [
        {
          userId: 1,
          postId: 2,
          content: `siiiiick juice brah`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          postId: 1,
          content: `looking good jimmy!!!!`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          postId: 11,
          content: `congratulations!`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          postId: 9,
          content: `🙌🏾🙌🏾🙌🏾`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          postId: 2,
          content: `did u get this at domaine?`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          postId: 6,
          content: `🔥🔥🔥🔥🔥🔥🔥🔥`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          postId: 8,
          content: `gimme gimme gimme`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          postId: 11,
          content: `FOMO`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
