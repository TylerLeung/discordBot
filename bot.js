const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

var commandList = new Array("!commandlist", "!gamble", "!ban", "!kick", "!auction", "!purge", "!disconnect")
var gameList = new Array("blackjack", "roulette", "slots")

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    var generalChannel = client.channels.get("604035488826785794")
    generalChannel.send("Tuuler Bot Ready to Serve!")
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'welcome-to-the-server')
    if (!channel) return
    channel.send('Welcome to the server, ${member}')
})
client.on('message', (msg) => {
    if (msg.content.startsWith("!")){
        runCommand(msg)
    }
})

function runCommand(msg) {
    let cmd = msg.content.substr(1)
    let cmdStatement = cmd.split(" ")
    let command = cmdStatement[0]
    let args = cmdStatement.slice(1)    
    if(msg.author.bot){
        return;
    } else{
        if(command == "commandlist"){
            displayCommands(msg);
        } else if (command == "gamble"){
            casinoGames(args, msg);
        } else if (command == "ban"){
            banUser(args, msg);
        } else if (command == "kick"){
            kickUser(args, msg);
        } else if (command == "auction"){
           auctionGame(args,msg);
        } else if (command == "purge"){
            purgeChat(args,msg);
        } else if (command == "disconnect"){
            disconnectBot(msg);
        } else {
            msg.channel.send("That command does not exist.")
            msg.channel.send("Find the list of commands using !commandlist")
        }
    }
}

function displayCommands(msg){
    if(!msg.author.bot){
        msg.channel.send("Here is the list of commands: ")
        msg.channel.send(commandList)
    }       
}

function casinoGames(msg){
    msg.channel.send("Here is the list of casino games: ")
    msg.channel.send(gameList)
}

function banUser(args, msg){
    const user = msg.mentions.users.first()
    const banReason = args.slice(1).join(" ")

    if (!user) {
        try {
            if (!msg.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Unable to find a Discord user with this userID!')
            user = msg.guild.members.get(args.slice(0, 1).join(' '))
            user = user.user
        } catch (error) {
            return msg.reply("No user with this ID")
        }
    }

    if (user === msg.author) return msg.channel.send('You can\'t ban yourself') 
    if (!banReason) return msg.reply('You must enter a reason for this ban')
    if (!msg.guild.member(user).bannable) return msg.reply('The bot has  insufficient permissions!')

    
    return msg.reply("User has been Banned")
}

function kickUser(args, msg){

}

function auctionGame(args, msg){

}

function purgeChat(args,msg){
    msg.channel.bulkDelete(args)
}

function disconnectBot(msg){
    msg.channel.send("Disconnecting Bot...")
    client.destroy()
}
client.login(auth.token);