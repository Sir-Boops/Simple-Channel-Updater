//Node-JS Imports
var request = require('request');

var set = function(game, top) {

    //Import the config
    var config = require(top + "/config.json");

    if (config.hitbox.enabled) {

        //Get Game ID
        request.get("https://api.hitbox.tv/games?q=" + game, function(err, res, body) {
            if (err) {
                console.log(err);
            } else {

                var game_id;

                //Find best game name
                if (JSON.parse(body).categories[0].category_name.toLowerCase() != game.toLowerCase()) {

                    //try and find a better one
                    for (i = 0; JSON.parse(body).categories.length > i; i++) {

                        if (JSON.parse(body).categories[i].category_name.toLowerCase() == game.toLowerCase()) {
                            //Found a better match!
                            game_id = JSON.parse(body).categories[i].category_id;
                            i = (JSON.parse(body).categories.length + 2)
                        }

                        if ((i + 1) >= JSON.parse(body).categories.length && !game_id) {
                            //If theirs no better match then 0
                            game_id = JSON.parse(body).categories[0].category_id;
                        }
                    }

                } else {
                    game_id = JSON.parse(body).categories[0].category_id;
                }

                //Login to hitbox
                request.post("https://api.hitbox.tv/auth/token", {
                    form: {
                        login: config.hitbox.username,
                        pass: config.hitbox.password,
                        app: "desktop"
                    }
                }, function(err, res, body) {
                    if (err) {
                        console.log(err);
                    } else {
                        var token = JSON.parse(body).authToken;

                        //Now Get the current media
                        request({
                            uri: ("https://api.hitbox.tv/media/live/" + config.hitbox.username.toLowerCase() + "?authToken=" + token),
                            method: "GET"
                        }, function(err, res, body) {
                            if (err) {
                                console.log(err);
                            } else {
                                var media = JSON.parse(body).livestream[0];

                                //Now Update the media
                                request({
                                    uri: ("https://api.hitbox.tv/media/live/" + config.hitbox.username.toLowerCase() + "?authToken=" + token),
                                    method: "PUT",
                                    json: {
                                        "livestream": [{
                                            "media_user_name": media.media_user_name,
                                            "media_id": media.media_id,
                                            "media_category_id": game_id,
                                            "media_live_delay": media.media_live_delay,
                                            "media_hidden": media.media_hidden,
                                            "media_recording": media.media_recording,
                                            "media_mature": media.media_mature,
                                            "media_hosted_name": media.media_hosted_name,
                                            "media_countries": [
                                                "EN"
                                            ],
                                            "media_status": media.media_status,
                                            "media_description": media.media_description
                                        }]
                                    }
                                }, function(err, res, body) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        if (body.livestream[0].media_category_id == game_id) {
                                            console.log("Channel Updated");
                                        } else {
                                            console.log("Channel may not have updated");
                                        }
                                    }
                                })
                            }
                        })

                    };
                });
            }
        })

    } else {
        console.log("Hitbox is not enabled!");
    }
}

//Export
module.exports.set = set;
