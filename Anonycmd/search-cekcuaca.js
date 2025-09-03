const axios = require('axios');

const handler = async (m, { text, command }) => {
  if (!text) return m.reply(`Enter the city name!\nExample:\n.${command} Palembang`);

  try {
    const url = `https://api.diioffc.web.id/api/tools/cekcuaca?query=${encodeURIComponent(text)}`;
    const { data } = await axios.get(url);

    if (!data.status || !data.result) return m.reply('Weather not found.');

    const res = data.result;
    const weather = res.weather[0];

    const msg = `⛅ *Current Weather in ${res.name}*\n\n` +
      `🌤️ Weather : ${weather.main} (${weather.description})\n` +
      `🌡️ Temperature : ${res.main.temp}°C\n` +
      `🤒 Feels Like : ${res.main.feels_like}°C\n` +
      `💧 Humidity : ${res.main.humidity}%\n` +
      `🌬️ Wind : ${res.wind.speed} m/s\n` +
      `☁️ Clouds : ${res.clouds.all}%\n` +
      `👁️ Visibility : ${res.visibility} meters\n` +
      `📍 Location : ${res.coord.lat}, ${res.coord.lon}`;

    m.reply(msg);
  } catch (e) {
    console.error(e);
    m.reply('An error occurred while fetching weather data.');
  }
};

handler.help = ['weather <city>'];
handler.tags = ['searching'];
handler.command = ['cekcuaca'];

module.exports = handler;