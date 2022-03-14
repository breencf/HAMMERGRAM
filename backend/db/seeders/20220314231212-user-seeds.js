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
          image:
            "https://scontent-bos3-1.cdninstagram.com/v/t51.2885-19/91805441_255856285575298_254154376208187392_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=PoZ-EAGnk1cAX_A1sBL&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT_pWy_8BBRd6gJWZxI1B7KIUAcWr2GNlss-YhvBX9RwUg&oe=6235C745&_nc_sid=7bff83",
          bio: "Ornellaia Stan",
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "robert@parker.com",
          username: "rparker",
          name: "Robert Parker",
          image: "",
          bio: "Must be 97 points to ride",
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "lebron@james.com",
          username: "kingjames",
          name: "👑",
          image:
            "https://scontent-bos3-1.cdninstagram.com/v/t51.2885-19/263570976_273354718170504_5597971410410838789_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=1&_nc_ohc=HPa8-8Xw-JgAX_BEa16&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT9Zr6k_cznzby5kstrMIlkB1o1xpPIbKCcRgbwLpzpl9Q&oe=623784B8&_nc_sid=7bff83",
          bio: null,
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "josh@hart.com",
          username: "jhartcellars",
          name: "Jhart Cellars",
          image:
            "https://scontent-bos3-1.cdninstagram.com/v/t51.2885-19/106558462_265185668122786_4002296779210179198_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=3Lo2zzSU3a4AX99mRhK&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT_JmVbggS-ksvo98OoA_e1G5oaVH1O3X9UvQ99BXTf0gw&oe=6236475A&_nc_sid=7bff83",
          bio: "Welcome to @jhart’s cellar 👋🏽, Bordeaux has my heart ❤️ 🇫🇷, Self-Proclaimed Master of Wine🍷, Check out some of my favs 👇🏽👇🏽",
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "carmelo@anthony.com",
          username: "carmeloanthony",
          name: "Carmelo Anthony",
          image:
            "https://scontent-bos3-1.cdninstagram.com/v/t51.2885-19/106698725_1171904809834471_7367484525560161424_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=1&_nc_ohc=_lEjM8GGUz0AX9SAP2D&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT_GHjzoBmsDYGdKVnX4hEB089--JTdSA7UIA2WBM0pdXw&oe=6235E09A&_nc_sid=7bff83",
          bio: "#STAYME70",
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "breencf@gmail.com",
          username: "grindrveltliner",
          name: "c",
          image: "",
          bio: "宁为玉醉，不为瓦全",
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "rudy@kurniawan.com",
          username: "rudy",
          name: "rudy kurniawan",
          image: "",
          bio: "making #hammers out of thin air since '76 ",

          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // {
        //   email: "arnaud@lambert.com",
        //   username: "Arnaud",
        //   name: "Lambert",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "patrick@baudoin.com",
        //   username: "Patrick",
        //   name: "Baudouin",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "sylvain@dittiere.com",
        //   username: "Sylvain",
        //   name: "Dittiere",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "charly@foucault.com",
        //   username: "Charly and Nady",
        //   name: "Foucault",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "jerome@bretaudeau.com",
        //   username: "Jerome",
        //   name: "Bretaudeau",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "gaston@huet.com",
        //   username: "Gaston",
        //   name: "Huet",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "philippe@tessier.com",
        //   username: "Philippe",
        //   name: "Tessier",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "francois@chidaine.com",
        //   username: "Francois",
        //   name: "Chidaine",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "fred@niger.com",
        //   username: "Fred",
        //   name: "Niger",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "denis@barbara.com",
        //   username: "Denis",
        //   name: "Barbara",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "roman@guibertau.com",
        //   username: "Romain",
        //   name: "Guibertau",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "francois@saintlo.com",
        //   username: "François",
        //   name: "Saint-Lô",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "damien@delecheneau.com",
        //   username: "Damien",
        //   name: "Delecheneau",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "olga@raffault.com",
        //   username: "Olga",
        //   name: "Raffault",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "herve@villemade.com",
        //   username: "Herve",
        //   name: "Villemade",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "michel@chevre.com",
        //   username: "Michel",
        //   name: "Chevré",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "charles@joguet.com",
        //   username: "Charles",
        //   name: "Joguet",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "marie@thibault.com",
        //   username: "Marie",
        //   name: "Thibault",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "lise@jousset.com",
        //   username: "Lise & Bertrand",
        //   name: "Jousset",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "eddy@oosterlinck.com",
        //   username: "Eddy",
        //   name: "Oosterlinck",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "noella@morantin.com",
        //   username: "Noella",
        //   name: "Morantin",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "jacky@blot.com",
        //   username: "Jacky",
        //   name: "Blot",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "frantz@saumon.com",
        //   username: "Frantz",
        //   name: "Saumon",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "sebastien@riffault.com",
        //   username: "Sebastien",
        //   name: "Riffault",
        //   image: "",
        //   bio: "",

        //   hashedPassword: bcrypt.hashSync("password"),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: "jeandominique@vacheron.com",
        //   username: "Jean-Dominique",
        //   name: "Vacheron",
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
