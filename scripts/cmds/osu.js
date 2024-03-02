const axios = require('axios');
module.exports = {
  config: {
    name: "osu",
    aliases: ["screenshot"],
    version: "1.0",
    author: "MILAN",
    countDown: 5,
    role: 0,
    shortDescription: "get screenshot of website",
    longDescription: "get screenshot of website",
    category: "media",
    guide: "{pn} link"
  },

  onStart: async function ({ message, args }) {
    const mode = args.join(" ");
    if (!mode) {
      return message.reply(`⚠️ | Please enter a mode!`);
    } else {
      try {
        const BASE_URL = `https://image.thum.io/get/width/1920/crop/400/fullpage/noanimate/https://osu-sig.vercel.app/card?user=${args[0]}&mode=${args[1]}&lang=en&w=2002&h=1165`;
        const form = {
          body: ``
        };
        form.attachment = []
        form.attachment[0] = await global.utils.getStreamFromURL(BASE_URL);
        message.reply(form); 
      } catch (e) { 
        message.reply(`Error`);
      }
    }
  }
};