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

        //Get The URL if it's not already there
        if (config.twitch.code != "") {

            var options = {
                query: game,
                type: "suggest"
            }

            //If we already have proper auth
            twitch.searchGames(options, function(err, ans) {
                if (err) {
                    console.log(err);
                } else {
                    var game_name;

                    //console.log(ans.games)

                    //Find the best game name
                    if (ans.games[0].name.toLowerCase() != game.toLowerCase()) {
                        for (var i = 0; ans.games.length > i; i++) {

                            if (ans.games[i].name.toLowerCase() == game.toLowerCase()) {
                                game_name = ans.games[i].name
                                i = (ans.games.length + 2);
                            }

                            if ((i + 1) >= ans.games.length && !game_name) {
                                game_name = ans.games[0].name
                            }

                        }
                    } else {
                        game_name = ans.games[0].name
                    }

                    //Build the channel settings
                    var channel_settings = {
                        "channel": {
                            "game": game_name
                        }
                    };

                    //Now Update Twitch
                    twitch.updateChannel(config.twitch.username, config.twitch.code, channel_settings, function(err, ans) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (ans.game == game_name) {
                                console.log("Channel Updated");
                            } else {
                                console.log("Channel may not have updated");
                            };
                        };
                    });
                }
            })

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
