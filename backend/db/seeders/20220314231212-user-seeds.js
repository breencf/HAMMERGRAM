const bcrypt = require("bcryptjs");
("use strict");

module.exports = {
  up: (queryInterface, Sequelize) => {
    Example: return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "james@suckling.com",
          username: "jimmysuckling",
          name: "James 'Jimmy the Hammer' Sucking",
          image: "https://hammergram.s3.amazonaws.com/icons/jsicon.jpg",
          bio: "Ornellaia Stan",
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "robert@parker.com",
          username: "rparker",
          name: "Robert Parker",
          image: "https://hammergram.s3.amazonaws.com/icons/rpicon.jpg",
          bio: "Must be 97 points to ride",
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "lebron@james.com",
          username: "kingjames",
          name: "👑",
          image: "https://hammergram.s3.amazonaws.com/icons/lbicon.jpg",
          bio: null,
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "josh@hart.com",
          username: "jhartcellars",
          name: "Jhart Cellars",
          image: "https://hammergram.s3.amazonaws.com/icons/jhicon.jpg",
          bio: "Welcome to @jhart’s cellar 👋🏽, Bordeaux has my heart ❤️ 🇫🇷, Self-Proclaimed Master of Wine🍷, Check out some of my favs 👇🏽👇🏽",
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "carmelo@anthony.com",
          username: "carmeloanthony",
          name: "Carmelo Anthony",
          image: "https://hammergram.s3.amazonaws.com/icons/caicon.jpg",
          bio: "#STAYME70",
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "breencf@gmail.com",
          username: "grindrveltliner",
          name: "c",
          image: "https://hammergram.s3.amazonaws.com/cb+icon.png",
          bio: "宁为玉醉，不为瓦全",
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "wonder@woman.com",
          username: "wonderwoman",
          name: "KK Rose",
          image:
            "https://pagesix.com/wp-content/uploads/sites/3/2015/05/tcdwowo_ec021.jpg",
          bio: "Gorgeous Gorgeous Girls love Sherry ",

          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "nick@nick.com",
          username: "syrahboi96",
          name: "nick",
          image: "https://hammergram.s3.amazonaws.com/pb.jpg",
          bio: "In this house, we believe syrah isn't so petit",

          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "cj@cj.com",
          username: "cjmc",
          name: "Cj McCollum",
          image: "https://hammergram.s3.amazonaws.com/cj2.jpg",
          bio: "NO Pelicans Guard, Winemaker @ McCollum Heritage 91 Cellars",

          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "d@wade.com",
          username: "dwade",
          name: "Dwayne Wade",
          image: "https://hammergram.s3.amazonaws.com/dw1.jpg",
          bio: "Aspiring winemaker @DWadeCellars",

          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // {
        //   email: "",
        //   username: "",
        //   name: "",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
