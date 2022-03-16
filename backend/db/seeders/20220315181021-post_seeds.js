"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Posts",
      [
        {
          location: "Paris, France",
          lat: 0,
          lng: 0,
          userId: 1,
          caption: "came through #drippping",
          image: "https://hammergram.s3.amazonaws.com/js1.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          location: "Los Angeles, CA",
          lat: 0,
          lng: 0,
          userId: 2,
          caption: "how you you spell H-A-M-M-E-R",
          image: "https://hammergram.s3.amazonaws.com/rp1.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          location: "New York, NY",
          lat: 0,
          lng: 0,
          userId: 2,
          caption: "",
          image: "https://hammergram.s3.amazonaws.com/rp2.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          location: "Soho House LA",
          lat: 0,
          lng: 0,
          userId: 2,
          caption: "",
          image: "https://hammergram.s3.amazonaws.com/rp3.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          location: "",
          lat: 0,
          lng: 0,
          userId: 3,
          caption:
            "👑Last night was mad real, fresh out of Advil- Jesus grab the wheel👑Sheesh!!! You had to be there to truly Understand. Even though I wish you were there so u could. #VinoChronicles🍷 P.S. don't talk to me about wine like u know it if you really don't know what you're talking about. Seriously! Thank you! 😉👍🏾🤣🤷🏾‍♂️",
          image: "https://hammergram.s3.amazonaws.com/lb1.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          location: "",
          lat: 0,
          lng: 0,
          userId: 3,
          caption:
            "Tonight's choice of vino with my 👸🏽!! No games being played in this cellar of 🍇! 2005 Quiutarelli Giuseppe vintage 👀👀",
          image: "https://hammergram.s3.amazonaws.com/lb2.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          location: "Oregon",
          lat: 0,
          lng: 0,
          userId: 4,
          caption:
            "Opened this 2 nights ago on the plane. Had a glass worth left over and it opened up nicely! Thanks to @pdxsomm for the bottle when I needed a pick me up! #NickelAndNickel #Napa #WayTooYoung",
          image: "https://hammergram.s3.amazonaws.com/jh1.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          location: "",
          lat: 0,
          lng: 0,
          userId: 4,
          caption: "Safe to say I’m settling into Portland #DomaineSerene",
          image: "https://hammergram.s3.amazonaws.com/jh2.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          location: "",
          lat: 0,
          lng: 0,
          userId: 4,
          caption: "Flight Wine Chronicles #Tignanello #Italy",
          image: "https://hammergram.s3.amazonaws.com/jh3.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          location: "",
          lat: 0,
          lng: 0,
          userId: 4,
          caption:
            "Inspired by #willyhernangomez career high 👏🏽 #PasoRobles #Daou #SoulOfALion",
          image: "https://hammergram.s3.amazonaws.com/jh4.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          location: "",
          lat: 0,
          lng: 0,
          userId: 4,
          caption:
            "A Napa kind of night #silveroakcellars #SilverOak #NapaValley #CabernetSauvignon",
          image: "https://hammergram.s3.amazonaws.com/jh5.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          location: "",
          lat: 0,
          lng: 0,
          userId: 5,
          caption: "#STAYME70",
          image: "https://hammergram.s3.amazonaws.com/ca1.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // {
        //   location: "",
        //   lat: 0,
        //   lng: 0,
        //   userId: 5,
        //   caption: "",
        //   image: "",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },{
        //   location: "",
        //   lat: 0,
        //   lng: 0,
        //   userId: 4,
        //   caption: "",
        //   image: "",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },{
        //   location: "",
        //   lat: 0,
        //   lng: 0,
        //   userId: 5,
        //   caption: "",
        //   image: "",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Posts', null, {});

  },
};
