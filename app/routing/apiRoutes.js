var friends = require("../data/friends");

module.exports = function(app) {
  // Return all friends found in friends.js as JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    // get user information
    var user = req.body;

    // parseInt for scores
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    //result will be whoever has the minimum difference in scores
    var bestFriendIndex = 0;
    var minDifference = 100;

    // finds the friend closest to your scores
    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }

      // if there is a new minimum, change the best friend index and set the new minimum 
      if(totalDifference < minDifference) {
        bestFriendIndex = i;
        minDifference = totalDifference;
      }
    }

    // after finding match, add user to friends array
    friends.push(user);

    // send back to browser the best friend match
    res.send(friends[bestFriendIndex]);
    console.log(friends[bestFriendIndex])
  });
};