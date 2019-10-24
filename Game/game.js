
// function to work the game timer 
// help taken from - https://jsfiddle.net/wr1ua0db/17/ 
function gameTimer(countDown, display){
    var timer = countDown, minutes, seconds; 

    setInterval(function (){
        mins = parseInt(timer / 60, 10)
        secs = parseInt(timer % 60, 10); 

        mins = mins < 10 ? "0" + mins : mins;
        secs = secs < 10 ? "0" + secs : secs;

        display.textContent = mins + ":" + secs; 

        if (--timer <0){
            timer = countDown;
        }
    }, 1000); 

}

window.onload = function () {
      var oneMin = 60 * 1, 
       display = document.querySelector('#time'); 
       gameTimer(oneMin, display); 
   
   }; 


// function to initialise the blue ball.
function initBlue(){
    // getting the id for the ball, assigning it to the variable, and positons
    imgBlueBall=document.getElementById("blueball");				
    imgBlueBall.style.position='absolute';
    imgBlueBall.style.left='285px';
    imgBlueBall.style.top='195px';
}
/*
// function to initialise the blue ball.
function initRed(){
    // getting the id for the ball, assigning it to the variable, and positons
    imgRedBall=document.getElementById("blueball");				
    imgRedBall.style.position='absolute';
    imgRedBall.style.left='285px';
    imgRedBall.style.top='195px';
}
*/

const canMove = {
    left:false,
    right:false,
    up:false,
    down:false,
};


// For the following function, i found help at this link: https://stackoverflow.com/questions/4950575/how-to-move-a-div-with-arrow-keys
// It is used to make the ball move around in the gamearea.
$(document).ready(function () {
    var gameArea = $('#gameArea'),
        blueball = $('#blueball'),
        width = gameArea.width() - blueball.width(),    // the maximal left/top value for gameArea
        height = gameArea.height() - blueball.height(), 
        keyPressed = {},                                // stores information of what key is pressed
        distance = 3;                                   // the "speed", distance moved per intervall, in px

    // This function calculates the new top and left values based on
    // the oldValue and the keyPressed. 
    // we have two values, key1 and key2, so the ball can move diagonally.
    function newTopLeft(oldValue,key1,key2) {

        // creating a variable, setting it to the 
        // parseInt version of the String oldValue, and the radix 10, MINUS
        // keypressed of key1 (if the key pressed is in the array, return the distance, else return 0) PLUS
        // keypressed of key2 (if the key pressed is in the array, return the distance, else return 0)
        var n = parseInt(oldValue, 10) - (keyPressed[key1] ? distance : 0) + (keyPressed[key2] ? distance : 0);
        
        // This expression ensures that the new value is in the permitted bounds.
        // if n is less than 0 return 0, 
        // else if n greater than the width/height, return the width/height, 
        // else return n
        return (n < 0 ? 0 : n > width ? width : n) && (n < 0 ? 0 : n > height ? height : n);
    } 

    $(window).keydown(function(e) { keyPressed[e.which] = true; }); // stores the key pressed, and set it to true
    $(window).keyup(function(e) { keyPressed[e.which] = false; });  // if the key is released, it´s not in use, so false

    // this function updates the interval. It is done every 20 milisecond. 
    // if updates the left and top value of the blueball. The values is calculated by the 
    // newTopLeft function. 
    setInterval(function() {
        blueball.css({
            left: function(i,oldValue) { return newTopLeft(oldValue, 37, 39); },
            top: function(i,oldValue) { return newTopLeft(oldValue, 38, 40); }
        });
    }, 20); // executed every 20 milisec
});



// function that assigns the coins to random variables. 
function randomiseCoins () {
    // creating an element so we can show all. 
    imgCoin = document.createElement("img");
    var imgCoinsAttribute = document.createAttribute("class");
    imgCoinsAttribute.value = "coin";
    imgCoin.setAttributeNode(imgCoinsAttribute);
    imgCoin.src = "Images/coin.png";

    // variables for where coins might pop up. 
    var xposCoin = Math.random()*1180;
    var yposCoin = Math.random()*430;

    // 30 random positions
    for (var i = 0; i < 30; i++) {
        imgCoin.style.position = "absolute";
        imgCoin.style.left = xposCoin + 'px';
        imgCoin.style.top = yposCoin + 'px';
       
    }
    document.getElementById('gameArea').append(imgCoin);
    return imgCoin;
}
// displays 15 coins.
for (var i = 0; i<15; i++) {
    randomiseCoins();
}

// function for new game
function newGame() {
    window.location.reload();
}


// function to leave game
function leaveGame(gameArea) {
    document.getElementById(gameArea).innerHTML= "Thanks for playing!";
}