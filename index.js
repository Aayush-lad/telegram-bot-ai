require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { Configuration, OpenAIApi } = require('openai');
const TOKEN = process.env.TOKEN;
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8001;
app.get('/', (req, resp) => {
  resp.send('Hello world');
});
app.listen(PORT, () => {
  console.log("server is running at port ")
})

const bot = new TelegramBot(TOKEN, { polling: false });

const key = process.env.APIKEY;
const org = process.env.ORG;
console.log(key,org,TOKEN);
const configuration = new Configuration({
  organization: org,
  apiKey: key
})
const openai = new OpenAIApi(key);
bot.on('message', async function(msg) { 
  const chatId = msg.chat.id;
  const input = msg.text;
  console.log(msg);

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
  console.log(response.data.choices[0].text);
  bot.sendMessage("HI THERE HERE IS YOUR ANSWER ");
  bot.sendMessage(chatId, `${response.data.choices[0].text}`);

})

