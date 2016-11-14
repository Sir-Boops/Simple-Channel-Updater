var help = function() {

    console.log("====== Help Menu ======\n");
    console.log("====== Understanding the help menu ======");
    console.log("Options wrapped in <> are required");
    console.log("Options wrapped in [] are optional \n");
    console.log("====== Current supported platforms ======");
    console.log("Twitch");
    console.log("Beam \n");
    console.log("====== Commands ======");
    console.log("To update a channel title");
    console.log("set title <title> <platform> \n");
    console.log("To update a channel game");
    console.log("set game <game> <platform>");
};

module.exports.help = help;
