const os = require('os');
const pidusage = require('pidusage');
const { performance } = require('perf_hooks');

function byte2mb(bytes) {
		const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		let l = 0, n = parseInt(bytes, 10) || 0;
		while (n >= 1024 && ++l) n = n / 1024;
		return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

function getUptime(uptime) {
		const days = Math.floor(uptime / (3600 * 24));
		const hours = Math.floor((uptime % (3600 * 24)) / 3600);
		const mins = Math.floor((uptime % 3600) / 60);
		const seconds = Math.floor(uptime % 60);
		const cores = `Cores: ${os.cpus().length}`;

		return `Uptime: ${days} days, ${hours} hours, ${mins} minutes, and ${seconds} seconds`;
}

module.exports = {
	config: {
		name: "up",
		aliase: ["up", "upt"],
		version: "1.0",
		author: "Cliff",
		role: 0,
		countDown: 0,
		shortDescription: {
			en: "Displays the uptime of the bot."
		},
		longDescription: {
			en: "Displays the amount of time that the bot has been running for."
		},
		category: "System",
		guide: {
			en: "Use {p}uptime to display the uptime of the bot."
		}
	},
	onStart: async function ({ api, event }) {
		const time = process.uptime();
		const hours = Math.floor(time / (60 * 60));
		const minutes = Math.floor((time % (60 * 60)) / 60);
		const seconds = Math.floor(time % 60);

		const usage = await pidusage(process.pid);


		const osInfo = {
			platform: os.platform(),
			architecture: os.arch()
		};

		const timeStart = Date.now();
		const returnResult = `BOT has been working for ${hours} hour(s) ${minutes} minute(s) ${seconds} second(s).\n\n❖ Cpu usage: ${usage.cpu.toFixed(1)}%\n❖ RAM usage: ${byte2mb(usage.memory)}\n❖ Cores: ${os.cpus().length}\n❖ Ping: ${Date.now() - timeStart}ms\n❖ Operating System Platform: ${osInfo.platform}\n❖ System CPU Architecture: ${osInfo.architecture}`;

		return api.sendMessage(returnResult, event.threadID, event.messageID);
	}
};