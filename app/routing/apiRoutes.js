var friends = require("../data/friends");

module.exports = function(app) {
  // All friends found in friends.js are sent as json
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    // get user information
    var user = req.body;
    var newFriend;

    // parseInt for scores
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    //result will be whoever has the minimum difference in scores 
    var minDifference = 100;

    // finds the friend closest to your scores
    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < friends[i].scores.length; j++) {
        totalDifference += Math.abs(user.scores[j] - friends[i].scores[j]);
      }

      // change the newFriend index and set the new minimum if needed
      if(totalDifference < minDifference) {
       newFriend = friends[i];
        minDifference = totalDifference;
        console.log(totalDifference)
      }
    }

    // Add user to friends array after finding the new best friend
    friends.push(user);

    // send back to browser the best friend match
    res.send(newFriend);
    console.log(newFriend)
  });
};