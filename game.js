var buttonColors = ["red", "blue", "green" , "yellow"];

var gamePattern = []
var userClickedPattern = [];

var gameStarted = false;
var loadingLevel = false;
var level = 0;

$(".btn").click(function(){
    if (!gameStarted || loadingLevel) {
        return;
    }
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length-1);
})

$(document).keypress(function(){
    if (gameStarted) {
        return;
    }
    nextSequence();
    gameStarted = true;
    $("#level-title").text("Level " + level);
})

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
}

function playSound(audio) {
    var audio = new Audio("sounds/" + audio + ".mp3");
    audio.play();
}

function animatePress(color) {
    $("."+color).addClass("pressed");
    setTimeout(function(){
        $("."+color).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) {
    console.log[gamePattern[currentLevel]];
    console.log[userClickedPattern[currentLevel]];
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        console.log("success");
        if (currentLevel+1 === gamePattern.length) {
            console.log("Moving to next level");
            loadingLevel = true;
            setTimeout(function(){
                nextSequence();
                loadingLevel = false;
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        $("#level-title").text("Game over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
}