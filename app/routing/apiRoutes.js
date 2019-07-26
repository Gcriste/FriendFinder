var path = require("path");
var friends = require("../data/friends.js")


module.exports = function(app){
app.get("/api/friends", function(req, res) {
    res.json(friends)
  });

 // Add new friend entry
 app.post('/api/friends', function(req, res) {

    var userInput = req.body;

    var userResponses = req.body.scores;

    var name = '';
    var image = '';
    var difference = 10000;

    // Examine all existing friends in the list
    for (var i = 0; i < friends.length; i++) {
      
        var diff = 0;
        for (var j = 0; j < userResponses.length; j++) {
            diff += Math.abs(friends[i].scores[j] - userResponses[j]);
        }
   

        // If lowest difference, record the friend match
        if (diff < difference) {
       

            totalDifference = diff;
            name = friends[i].name;
            image = friends[i].photo;
        }
    }

    // Add new user
    friends.push(userInput);

    // Send appropriate response
    res.json({status: 'OK', name: name, image: image});
});
};