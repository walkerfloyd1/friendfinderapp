var path = require("path");

var friendsList =require("../data/friends.js")

function apiRoutes (app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendsList);
    });
    app.post("/api/friends", function(req, res, ) {
        var bod = req.body;
        var newUser = {
            name: bod.name,
            photo: bod.photo,
            scores: []
        };
        console.log(newUser.scores);
        var userScores = [];
        for (var i = 0; i < bod.scores.length; i++){
            userScores.push(parseInt(bod.scores[i]));
        }
        newUser.scores = userScores
    var scoreDiffs = [];
    for (var i = 0; i < friendsList.length; i++) {
        var diff = 0;
        for (var j = 0; j < newUser.scores.length; j++) {
            diff += Math.abs(newUser.scores[j] - friendsList[i].scores[j]);
        }
        scoreDiffs.push(diff);
    }
    var bestMatch = 0;
    for (var i = 1; i < scoreDiffs.length; i++) {
        if (scoreDiffs[i] <= scoreDiffs[bestMatch]) {
            bestMatch = i;
        }
    }
    var newBestFriend = friendsList[bestMatch];
    res.json(newBestFriend);
    friendsList.push(newUser);

    console.log(newBestFriend.name);
    });
}

module.exports = apiRoutes;