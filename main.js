//Node-JS Imports
var help = require("./commands/help.js");

//Get Current dir
var dir = __dirname;

//Import set title commands
var set_title_twitch = require("./functions/set/title/twitch.js");

//Import auth commands
var auth_twitch = require("./functions/auth/twitch.js");

//Get Run Command Options
if (process.argv[2]) {
    //We have a command
    //Help Command
    if (process.argv[2].toLowerCase() == "help") {
        help.help();
    }
    //Set Command
    if (process.argv[2].toLowerCase() == "set") {
        //title sub command
        if (process.argv[3].toLowerCase() == "title") {
            //Set twitch title
            if (process.argv[5].toLowerCase() == "twitch") {
                set_title_twitch.set(process.argv[4], dir);
            }
        }
    }
    //Auth command
    if (process.argv[2].toLowerCase() == "auth") {
        //If twitch
        if (process.argv[3].toLowerCase() == "twitch") {
            auth_twitch.auth(process.argv[4]);
        }
    }
} else {
    //Run help
    console.log("Run help to view commands!");
};
