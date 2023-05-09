
const TelegramBot = require('node-telegram-bot-api');
const { Configuration, OpenAIApi } = require('openai');
const TOKEN = '5947855269:AAEvVWdXHG-WEzYDSooHm6yumTbqdFy_SvI';
const express = require('express');
const app = express();
app.get('/', (req, resp) => {
  resp.send('Hello world');
});
const port = 3000;
app.listen(port, () => {
  console.log("server is running at port ")
})
const bot = new TelegramBot(TOKEN, { polling: true });
const key = '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';
const org = 'org-JkZ0LUNKNGucB22m3Xj2oe3X';
console.log("chat bot started");
const configuration = new Configuration({
  organization: org,
  apiKey: key
})
const openai = new OpenAIApi(key);
bot.on('message', async function(msg) {
  const chatId = msg.chat.id;
  const input = msg.text;
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    prompt: input,
    model: "text-davinci-003",
    max_tokens: 500,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  })

  bot.sendMessage(chatId, `${response.data.choices[0].text}`);
})

