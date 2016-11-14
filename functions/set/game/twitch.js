//Node-JS Imports
var TwitchAPI = require('twitch-api');

var set = function(game, top) {

    //Import the config
    var config = require(top + "/config.json");

    if (config.twitch.enabled) {

        //Init the Twitch API
        var twitch = new TwitchAPI({
            clientId: config.twitch.clientID,
            clientSecret: config.twitch.clientSecret,
            redirectUri: config.twitch.redirectURI,
            scopes: ["channel_editor"]
        });

        //Twitch Strings
        var channel_settings = {
            "channel": {
                "game": game
            }
        };

        //Get The URL if it's not already there
        if (config.twitch.code != "") {

            //If we already have proper auth

            twitch.updateChannel(config.twitch.username, config.twitch.code, channel_settings,
                function(err, ans) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (ans.game == game) {
                            console.log("Channel Updated");
                        } else {
                            console.log("Channel may not have updated");
                        };
                    };
                });

        } else {
            var getauthorizationurl = twitch.getAuthorizationUrl();
            console.log("Please get the auth code: " + getauthorizationurl + " \n");
            console.log("Then copy the <code> code=<code> from the url and run it in the command");
            console.log("auth twitch <code>");
        };

    } else {
        console.log("Twitch is not enabled!");
    }
}

//Export
module.exports.set = set;
