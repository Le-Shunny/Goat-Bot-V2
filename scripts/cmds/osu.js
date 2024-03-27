const axios = require("axios");
module.exports = {
  config: {
    name: "",
    aliases: ["OSU!"],
    version: "1.0",
    author: "Shen",
    countDown: 5,
    role: 0,
    shortDescription: "get osu stats card",
    longDescription: "get osu stats card",
    category: "noprefix",
    guide: "{pn} <username> <mode> <language>",
  },

  onStart: async function ({ message, args }) {
    const username = args[0];
    const mode = args[1];
    const language = args[2];
    if (!username) {
      return message.reply("⚠️ | Please enter a username!");
    } else if (!["std", "taiko", "catch", "mania"].includes(mode)) {
      return message.reply("⚠️ | Please enter a valid mode (std, taiko, catch, mania)!");
    } else if (!["en", "cn"].includes(language)) {
      return message.reply("⚠️ | Please enter a valid language (cn, en)!");
    } else {
      try {
        const BASE_URL = `https://image.thum.io/get/width/1920/crop/400/fullpage/noanimate/https://osu-sig.vercel.app/card?user=${username}&mode=${mode}&lang=${language}&w=2002&h=1165&animation=false`;
        const form = {
          body: "",
        };
        form.attachment = [];
        form.attachment[0] = await global.utils.getStreamFromURL(BASE_URL);
        message.reply(form);
      } catch (e) {
        message.reply("Error");
      }
    }
  },
};
