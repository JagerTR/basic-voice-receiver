const Discord = require('discord.js');
const { Client, MessageAttachment } = require('discord.js');
const client = new Discord.Client();
const david = new Discord.Client();
const ayarlar = require('./settings.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const ms = require('ms');


var p = ayarlar.prefix;
const express = require("express");
const { relativeTimeRounding } = require('moment');
const app = express();

app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir(`${__dirname}/commands`, (error, ctg) => {
    if (error) throw error;

    ctg.forEach(category => {

        fs.readdir(`${__dirname}/commands/${category}`, (err, commands) => {
            if (err) throw err;

            commands.forEach(command => {
                const cmd = require(`${__dirname}/commands/${category}/${command}`);
                if (!cmd.help) throw new Error(`Invalid command file structure ${command}!`);

                cmd.help.category = category;
                cmd.location = `${__dirname}/commands/${category}/${command}`;

                console.log(`Yüklenen Komut ${command}...`);

                client.commands.set(cmd.help.name, cmd);
                if (cmd.help.aliases && Array.isArray(cmd.help.aliases)) cmd.help.aliases.forEach(alias => client.aliases.set(alias, cmd.help.name));
            });
        });
    });
});

client.on("warn", console.warn);
client.on("error", console.error);

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(ayarlar.prefix) !== 0) return;

    const args = message.content.slice(ayarlar.prefix.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    if (!command) return;

    try {
        await command.run(client, message, args);
    } catch(e) {
        console.error(e);
        message.channel.send(`Something went wrong while executing command "**${command}**"!`);
    }
});


    
client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};
client.on('ready', () => {

    var actvs = [
      `Kalite tesadüf değildir!`
  ];
  
  client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING' });
  setInterval(() => {
      client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING'});
  }, 3000);

  

    console.log ('_________________________________________');
    console.log (`Kullanıcı İsmi     : ${client.user.username}`);
    console.log (`Sunucular          : ${client.guilds.cache.size}`);
    console.log (`Kullanıcılar       : ${client.users.cache.size}`);
    console.log (`Prefix             : ${ayarlar.prefix}`);
    console.log (`Durum              : Hazır!`);
    console.log ('_________________________________________');
  
  });


let giden;

client.on('message', async(msg,client,args)=>{
 
  if(!msg.author.id === ayarlar.sahip)
  if (!msg.guild) return;
if(msg.content === 'Gel'){
  
  const connectionA = await msg.member.voice.channel.join();
  const audio = connectionA.receiver.createStream(msg.author,{mode:'opus',end:'manual'});
giden = audio

  }
if(msg.content === 'GidermisinCnm'){
  msg.member.voice.channel.leave()
msg.channel.send(`Tm :'( kovuldum üzülmewk`).then(x => {
  x.delete({ timeout: 5000 })
});
}
})
david.on('message', async(msg,david)=>{
  
  if(msg.content === 'Gelx2'){
  const connectionB = await msg.member.voice.channel.join() 
let audio = giden;
  connectionB.play(audio,{type:'opus',end:'manual'});
  }
  if(msg.content === 'GidermisinCnmx2'){
    msg.member.voice.channel.leave()
  msg.channel.send(`Tm :'( kovuldum üzülmewk`).then(x => {
    x.delete({ timeout: 5000 })
  });
  }
  
})

client.login(ayarlar.alıcıToken);
david.login(ayarlar.vericiToken)
