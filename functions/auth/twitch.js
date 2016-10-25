//Node-JS Imports
var TwitchAPI = require('twitch-api');

var auth = function(code) {

    twitch.getAccessToken(code, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            //Now tell the user to update their config
            console.log("Done! Now add " + data.access_token + " To the code string in the config.json file under twitch and your good to go!");
        };
    });
}

module.exports.auth = auth;
