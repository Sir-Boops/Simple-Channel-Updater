//Node-JS Imports
var Beam = require('beam-client-node');
var request = require('request');

var set = function(game, top) {

    //Import the config
    var config = require(top + "/config.json");

    if (config.beam.enabled) {

        //Init Beam api
        var beam = new Beam();

        //Get Game
        request.get("https://player.me/api/v1/games?_query=" + game, function(err, res, body) {
            if (err) {
                console.log(err)
            } else {
                var game_id = JSON.parse(body).results[0].id;
                console.log(JSON.parse(body).results[0]);

                //Update Game On Beam
                beam.use("password", {
                    username: config.beam.username,
                    password: config.beam.password
                }).attempt().then(res => {
                    return beam.request("PUT", "/channels/" + res.body.channel.id, {
                        body: {
                            id: res.body.channel.id,
                            userId: res.body.channel.userId,
                            typeId: 8819
                        }
                    }).then(res2 => {
                        console.log(res2.body);
                        console.log("Channel Updated");
                    });
                });
            }
        })
    }
}

//Export
module.exports.set = set;
