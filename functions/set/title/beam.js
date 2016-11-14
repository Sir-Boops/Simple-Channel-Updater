//Node-JS Imports
var Beam = require('beam-client-node');

var set = function(title, top) {

    //Import the config
    var config = require(top + "/config.json");

    if (config.beam.enabled) {

        //Init Beam api
        var beam = new Beam();

        beam.use("password", {
            username: config.beam.username,
            password: config.beam.password
        }).attempt().then(res => {
          return beam.request("PUT", "/channels/" + res.body.channel.id, {
            body: {
              id: res.body.channel.id,
              userId: res.body.channel.userId,
              name: title
            }
          }).then(res2 => {
            console.log("Channel Updated");
          });
        });
    }
}

//Export
module.exports.set = set;
