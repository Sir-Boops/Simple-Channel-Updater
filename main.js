//Node-JS Imports
var help = require("./commands/help.js");

//Get Current dir
var dir = __dirname;

//Import set title commands
var set_title_twitch = require("./functions/set/title/twitch.js");
var set_title_beam = require("./functions/set/title/beam.js");
var set_title_hitbox = require("./functions/set/title/hitbox.js");

//Import set game commands
var set_game_twitch = require("./functions/set/game/twitch.js");
var set_game_beam = require("./functions/set/game/beam.js");
var set_game_hitbox = require("./functions/set/game/hitbox.js");

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
            //Set Beam title
            if (process.argv[5].toLowerCase() == "beam") {
                set_title_beam.set(process.argv[4], dir);
            }
            //Set hitbox title
            if (process.argv[5].toLowerCase() == "hitbox") {
                set_title_hitbox.set(process.argv[4], dir);
            }
        }
        //game sub command
        if (process.argv[3].toLowerCase() == "game") {
            if (process.argv[5].toLowerCase() == "twitch") {
                set_game_twitch.set(process.argv[4], dir);
            }
            if (process.argv[5].toLowerCase() == "beam") {
                set_game_beam.set(process.argv[4], dir);
            }
            if (process.argv[5].toLowerCase() == "hitbox") {
                set_game_hitbox.set(process.argv[4], dir);
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
