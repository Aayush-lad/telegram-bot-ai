const TelegramBot = require('node-telegram-bot-api');
const {Configuration,OpenAIApi} = require('openai');
require('dotenv').config();
const TOKEN=process.env.TOKEN
const bot = new TelegramBot(TOKEN, { polling: true });
const key=process.env.OPENAI_API_KEY;
const org=process.env.ORG;
console.log("chat bot started");
const configuration=new Configuration({
    organization:org ,
    apiKey: key
})
const openai = new OpenAIApi(key);
bot.on('message',async function(msg){
    const chatId = msg.chat.id;
    const input = msg.text;
    const openai= new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        prompt:input,
        model: "text-davinci-003",
        max_tokens: 500,
        temperature:0,
        top_p:1,
        frequency_penalty:0.5,
        presence_penalty:0,
    })

    bot.sendMessage(chatId, `${response.data.choices[0].text}`);
})