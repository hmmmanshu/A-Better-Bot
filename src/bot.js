require('dotenv').config()
const { Client, Presence, Message } = require('discord.js'); //from discord.js import Client
const client = new Client();

client.login(process.env.BOTTOKEN);

client.on('ready',()=>{
    console.log(`${client.user.tag}`);
})

//Handling greetings
const exp = require('./Expressions.js')
const hii_array = exp.hii_array();
const PREFIX = "$";//UD Command prefix
client.on('message',(msg)=>{

    if(hii_array.includes(msg.content) && msg.author.bot === false){
        msg.channel.send(hii_array[Math.floor(Math.random() * hii_array.length)]+"  "+msg.author.username+ "  😎");
    }

    if(msg.content.startsWith(PREFIX)){
        const [COMMAND_NAME, ...args] = msg.content.substring(PREFIX.length).trim().split(/\s+/);

        if(COMMAND_NAME === "kick"){
            if(!msg.member.hasPermission('KICK_MEMBERS')) 
                return msg.reply("You do not have the permission to kick that member")
            if(args.length === 0) return msg.channel.send("Please provide an ID");

            const member = msg.guild.members.cache.get(args[0]);
            if(member){
                member.kick()
                .then((member)=>msg .channel.send(`${member} Kicked`))
                .catch((err)=>msg.channel.send("Insufficient Permissions"));
                
            }
            else{
                msg.channel.send("User not found");
            }
            
        }

        if(COMMAND_NAME === 'ban'){
            if(!msg.member.hasPermission('BAN_MEMBERS'))
                return msg.reply("You do not have the permission to ban that member")
            if(args.length === 0) msg.channel.send("Please provide an ID");
            msg.member.guild.ban(args[0]);
        }
        
    }
})

