var fs = require('fs');
var Discord = require('discord.io');
var moment = require('moment-timezone');
var data = fs.readFileSync('token', "utf8");
var token =  data.toString().trim();

// commands
var commands = {
    role: require('./commands/role.js'),
    lua: require('./commands/lua.js'),
    wago: require('./commands/wago.js')
}

var bot = new Discord.Client({
    token: token,
    autorun: true,

});
var prefix = '$'

bot.on('ready', function() {
    console.log("===================================================");
    console.log("TIME: " + moment().tz("America/Chicago").format('MMMM Do YYYY, h:mm:ss a'));
    console.log(bot.username + " - (" + bot.id + ")");    
});


// Main message handler-
bot.on('message', function(user, userID, channelID, message, event) {
    if (message[0] !== prefix) {return}
    var cmd = message.split(" ");
    var args = '';
    for (var i = 1; i < cmd.length; i++) {
        args += cmd[i] + " ";
    }
    cmd = cmd[0].substring(1);
    // console.log("cmd: " + cmd);
    // console.log("args: " + args);
    if (commands[cmd]) {
        console.log("Sending command: " + cmd)
        commands[cmd](args.trim(), user, userID, channelID, bot);
    }


});