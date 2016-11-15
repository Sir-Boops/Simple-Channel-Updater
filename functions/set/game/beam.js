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
        request.get("https://beam.pro/api/v1/types?limit=10&query=" + game, function(err, res, body) {
            if (err) {
                console.log(err)
            } else {

                var game_id;

                //Find the best maching game else 0
                if (JSON.parse(body)[0].name.toLowerCase() != game) {

                    //Loop and try to find a better match
                    for (i = 0; JSON.parse(body).length >= i; i++) {

                        if (JSON.parse(body)[i].name.toLowerCase() == game.toLowerCase()) {
                            //Found a better match!
                            game_id = JSON.parse(body)[i].id;
                            i = (JSON.parse(body).length + 2)
                        }

                        if ((i + 1) >= JSON.parse(body).length && !game_id) {
                            //If theirs no better match then 0
                            game_id = JSON.parse(body)[0].id;
                        }
                    }

                } else {
                    //0 Is the best mach
                    game_id = JSON.parse(body)[0].id;
                }

                //Update Game On Beam
                beam.use("password", {
                    username: config.beam.username,
                    password: config.beam.password
                }).attempt().then(res => {
                    return beam.request("PUT", "/channels/" + res.body.channel.id, {
                        body: {
                            id: res.body.channel.id,
                            userId: res.body.channel.userId,
                            typeId: game_id
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
