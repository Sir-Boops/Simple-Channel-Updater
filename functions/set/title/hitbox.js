//Node-JS Imports
var request = require('request');

var set = function(title, top) {

    //Import the config
    var config = require(top + "/config.json");

    if (config.hitbox.enabled) {

        //Login to hitbox
        request.post("https://api.hitbox.tv/auth/login", {
            login: config.hitbox.username,
            pass: config.hitbox.password,
            app: "title-set"
        }, function(err, res, body) {
            if (err) {
                console.log(err);
            } else {
                console.log(body);
            };
        });

    } else {
        console.log("Hitbox is not enabled!");
    }
}

//Export
module.exports.set = set;
