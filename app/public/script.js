

var leaderName = "";
var leaderPic = "";
var leaderScore = 1000;

var scoreCount = 0;

function find(event) {
    event.preventDefault();
    var new_user = $("#userName");
    var new_pic = $("#userPic");
    var user_picks = [
        $("#limits1").val(),
        $("#limits2").val(),
        $("#limits3").val(),
        $("#limits4").val(),
        $("#limits5").val(),
        $("#limits6").val(),
        $("#limits7").val(),
        $("#limits8").val(),
        $("#limits9").val(),
        $("#limits0").val()
    ];
    console.log(user_picks);
    $.get("/api/friends", function (data){
        for (var i=0; i<data.length; i++) {
            for (var j=0; j<10; j++) {
                scoreCount = scoreCount + Math.abs((user_picks[j] - data[i].scores[j]));
            }
            if (scoreCount < leaderScore) {
                leaderScore = scoreCount;
                leaderPic = data[i].pic;
                leaderName = data[i].name;
            }
            scoreCount = 0;
        }
        offerFriend();
    })
}


function offerFriend(){
    $('#friend_Here').empty();
    var newFriendName = $("<div>")
    newFriendName.text(leaderName);
    var newFriendPic = $('<img>');
    newFriendPic.attr('src', leaderPic);
    $('#friend_Here').append(newFriendName, newFriendPic);
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
}

var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}

$(document).on("click", "#search", find);
