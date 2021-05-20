const Discord = require('discord.js');
const { Client, MessageAttachment } = require('discord.js');
const client = new Discord.Client();
const david = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const ms = require('ms');
const GuildModel = require('./models/Guild')
const Welcome = require('./models/Welcome')
const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://Jager:davut2004@cluster0.zvdhs.mongodb.net/Database?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}).then(c => console.log(`Bot başarıyla MongoDBye bağlandı!`)).catch(err => console.error(`Bot mongodbye bağlanamadı bir hata var!`));
const { Database } = require("ark.db");
const db = new Database();
const yuricanvas = require("yuri-canvas");

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
client.on('message', async message => {
if (message.content === '!fakekatıl') {  
  client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});


client.on('message', async msg => {
  if (msg.content === `<@&767327332968300584>`) return msg.channel.send(`Prefixim ${ayarlar.prefix}`);
});
 


var kanal = "838667049915383828";
var kategori = "838657251496427530";
var limit = "1"
client.on('voiceStateUpdate',(oldState, newState)=>{
let kullanıcı = newState.member.user.username

  if(newState.bot) return;
if(oldState.bot) return;
if(newState.channelID == kanal){
 let ayarlancakkanal = newState.guild.channels.create(`🔐┊ ${kullanıcı}`, {
    type: 'voice',
    userLimit:limit,
    parent: kategori,
    permissionOverwrites: [
       {
         id: newState.id,
         deny: ['VIEW_CHANNEL'],
      },
    ],
  
  }).then(set=>{      
    newState.member.voice.setChannel(newState.guild.channels.cache.get(set.id))
  db.set(`kanalayar${newState.guild.id}`,newState.channel.id)
  }
  )
}


if(oldState.channel)
{
  oldState.guild.channels.cache.forEach(channels=>
        {
            if(channels.parentID == kategori)
            {
                if(channels.id == kanal) return;
                if(oldState.channelID == channels.id)
                {
                    if(oldState.channel.members.size == 0)
                    {
                        channels.delete();
                        db.delete(`kanalayar${newState.guild.id}`)
                    }
                }
            }
        });
}


});

let giden;

client.on('message', async(msg,client,args)=>{
 
  if(!msg.author.id === ayarlar.sahip)
  if (!msg.guild) return;
if(msg.content === 'Gel'){
  
  const connectionA = await msg.member.voice.channel.join();
  const audio = connectionA.receiver.createStream(msg.author,{mode:'opus',end:'manual'});
  audio.pipe(fs.createWriteStream('deneme'));
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

client.login(ayarlar.token);
david.login('Sesin Gideceği Botun Tokeni')
