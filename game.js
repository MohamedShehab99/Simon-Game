var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern =[];
var level =0;
var startToToggle= true;
var sequenceSuccess= true;
function nextSequence() {
    userClickedPattern =[];
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
gamePattern.push(randomChosenColor);
$("#"+randomChosenColor).fadeOut(100).fadeIn(100);
animatePress(randomChosenColor);

$("#"+randomChosenColor).click(function(){
    $(this).fadeOut(100).fadeIn(100);
    audioPlayer(randomChosenColor);
    
    
});
level++;
startToToggle=false;
$("#level-title").text("Level "+level);
}

$(document).keydown(function(){
   if(startToToggle===true){
    nextSequence();
   }
    else {
        startToToggle= false;
    }
    
});

$(".btn").click(function(){
    var userChosenColor= $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    $(this).fadeOut(100).fadeIn(100);
    audioPlayer(userChosenColor);
    animatePress(userChosenColor);
    if(gamePattern.length === userClickedPattern.length) {
        checkAnswer(userClickedPattern[userClickedPattern.length -1]);
    }
    
});
function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");

    },100);
}
function checkAnswer(currentLevel){
    if(currentLevel!==gamePattern[gamePattern.length -1]) {
        
       gameOver();

    }
    else {
        if(gamePattern.length === userClickedPattern.length) {
        for(let i =0; i<gamePattern.length;i++) {
            if(gamePattern[i] !== userClickedPattern[i]) {
                sequenceSuccess=false;
                gameOver();
                break;
            }
            else {
                sequenceSuccess= true;
                
                
            }
        }
             }
             if(sequenceSuccess === true){
                setTimeout(nextSequence,1000);
             }
    }
    
    
    
   


}
function gameOver() {
    var wrongAudio = new Audio('./sounds/wrong.mp3');
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press any key to restart");
    startToToggle=true;
    gamePattern=[];
    userClickedPattern=[];
    level=0;
}

function audioPlayer(choice) {
    switch(choice) {
        case "red":
            var red= new Audio('./sounds/red.mp3');
             red.play();
             break;
        case "blue":
            var blue= new Audio('./sounds/blue.mp3');
            blue.play();
            break;
        case "green":
            var green= new Audio('./sounds/green.mp3');
            green.play();
            break;
        case "yellow":
            var yellow = new Audio('./sounds/yellow.mp3');
            yellow.play();
            break;
        default: 
        console.log(randomChosenColor);

    }
}