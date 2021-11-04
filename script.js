var randomColors = ['green','red','yellow','blue'];
var generatedColors = [];
var userColors = [] ;
var l = 0;
var gameStart = false; 

function playAudio(colorSequence){
    var audio = new Audio('sounds/' + colorSequence + '.mp3');
    audio.play();
    audio.muted = false;
}
function keyPressed(colorSequence){
    $('.'+colorSequence).addClass("pressed");
    setTimeout(function(){
    $('.'+colorSequence).removeClass("pressed");
    },100);
}

function checkWin(lastEnteredIndex){
    if(generatedColors[lastEnteredIndex] === userColors[lastEnteredIndex]){
        if(generatedColors.length === userColors.length){
            setTimeout(function(){
                generateSequence();
            },1000);
        }
        
    }
    else{
        playAudio("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart ,lost at level "+ l);

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startAgain();

    }
}
function startAgain(){
    generatedColors = [];
    gameStart = false; 
    l = 0;
}
function generateSequence(){
    userColors = [];
    l++;
    $("h1").text("Level " + l);
    var randomNumber  = Math.floor(Math.random()*4);
    var randomColorSequence = randomColors[randomNumber];
    generatedColors.push(randomColorSequence);
    $('#'+randomColorSequence).fadeOut(200).fadeIn(100).fadeOut(200).fadeIn(100);
    playAudio(randomColorSequence);
}

$(document).keypress(function(){
    if(!gameStart){
        generateSequence();
        gameStart = true;
        $("h1").text("Level " + l);
    }
})


$(".btn").click(function(){
    var userClickedColor = $(this).attr("id");
    userColors.push(userClickedColor);
    playAudio(userClickedColor);
    keyPressed(userClickedColor);
    checkWin(userColors.length - 1);
})
