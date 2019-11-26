"use strict";

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("Topics", [
      {
        topicName: "HTML",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topicName: "CSS",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topicName: "JavaScript",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topicName: "JQuery",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topicName: "Timers",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topicName: "Ajax",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("Topics", null, {});
  }
};
