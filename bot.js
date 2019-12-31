const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

var commandList = new Array("!commandlist", "!gamble", "!ban", "!kick", "!auction", "!purge", "!disconnect")
var gameList = new Array("blackjack", "roulette", "slots")
//Indicate that the bot is activated and ready for use
client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    var generalChannel = client.channels.get("604035488826785794")
    generalChannel.send("Tuuler Bot Ready to Serve!")
});
//When new user has joined the server, send welcome message in specific channel
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'welcome-to-the-server')
    if (!channel) return
    channel.send('Welcome to the server, ${member}')
})
//When messsage is sent, check if it is a command
client.on('message', (msg) => {
    if (msg.content.startsWith("!")){
        runCommand(msg)
    }
})
//Checks which command user is calling
function runCommand(msg) {
    let cmd = msg.content.substr(1) //Removing leading character
    let cmdStatement = cmd.split(" ") //Split message per space
    let command = cmdStatement[0] //First word is command name
    let args = cmdStatement.slice(1) //Other words used as arguments
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
//Displays All Commands Available
function displayCommands(msg){
    if(!msg.author.bot){
        msg.channel.send("Here is the list of commands: ")
        msg.channel.send(commandList)
    }       
}
//Sends list of casino games that can be played *Still under development*
function casinoGames(msg){
    msg.channel.send("Here is the list of casino games: ")
    msg.channel.send(gameList)
}
//Function that bans the user from the server
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
//Function that kicks the user from the server
function kickUser(args, msg){

}
//Game to be developed that users in server can play
function auctionGame(args, msg){

}
//Deletes Specified Number of Messages (Including the one being sent)
function purgeChat(args,msg){
    var deleteNumber = 0;
    if (args.length == 1){
        deleteNumber = parseFloat(args[0])
    } 
    msg.channel.bulkDelete(deleteNumber)
    msg.channel.send("Deleted: " + deleteNumber + " messages!")
}

function disconnectBot(msg){
    msg.channel.send("Disconnecting Bot...")
    client.destroy()
}
client.login(auth.token);