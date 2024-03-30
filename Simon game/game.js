const buttonColours = ['red', 'blue', 'green', 'yellow']

var gamePattern = []
var userClickedPattern = []

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    animation(userChosenColour);
    playSound(userChosenColour);
    check(userClickedPattern.length - 1);
});

var level = 0;
var started = false;
$(document).on('keypress', function () {
    if (!started) {
        $("#level-title").text(`level-${level}`);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    userClickedPattern = [];
    var randomnumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomnumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    animation(randomChosenColour);
    playSound(randomChosenColour);

    $("#level-title").text(`level-${level}`);
    level++;
}

function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animation(chose) {
    $(`#${chose}`).fadeIn(100).fadeOut(100).fadeIn(100);
}

function check(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        console.log(gamePattern);
        console.log(userClickedPattern);
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("#demo").text("your score  "+level);
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 600);
        $("#level-title").text("Game game-over. Press any key to Restart");
        started = false;
        level = 0;
        userClickedPattern = [];
        gamePattern = [];
    }
}