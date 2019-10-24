//initialise images globally
// var imgRedBall = null;
/*var imgBlueBall = null;
var imgCoin     = null;

// function to work the game timer 

function gameTimer(countDown, display){
    var timer = countDown, minutes, seconds; 

    setInterval(function (){
        mins = parseInt (gameTimer/ 60, 10)
        secs = parseInt (gameTimer% 60, 10); 

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
    display = document.querySelector('#timer'); 
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

/*
// Function to get positions for the gamearea 
function gameAreaPosition () {
    var leftPos = $("#gameArea").position().left;   // get left position 
    var topPos = $("#gameArea").position().top;     // get top position
    var width = leftPos + 1200;                     // get the width 
    var height = topPos + 450;                      // get the height
    var centreX = leftPos + width / 2;              // get X center
    var centreY = topPos + height / 2;              // get Y center

   return [leftPos, topPos, width, height];   // return an array of 
}

// Function to get positions for the blue ball
function blueBallPosition () {
    var leftPos = $("#blueball").position().left;   // get left position 
    var topPos = $("#blueball").position().top;     // get top position
    var right = leftPos + 30;                       // get the right 
    var bottom = topPos + 30;                       // get the bottom
    var centreX = leftPos + right / 2;              // get X center
    var centreY = topPos + bottom / 2;              // get Y center

    var tmpNext = leftPos + 5;

    // Stuff used for debugging
    // console.log (leftPos);
    // console.log("BB X   " + centreX);
    // console.log("BB Y   " + centreY);

   return [centreX, centreY];   // return an array of the x and y center 
}

// Function to get positions for obstacle 1
function getPositionOb1 () {
    var leftPos = $("#ob1").position().left;    // get left position 
    var topPos = $("#ob1").position().top;      // get top position
    var width = leftPos + 100;                  // get the width 
    var height = topPos + 50;                   // get the height
    var centreX = leftPos + width / 2;        // get X center
    var centreY = topPos + height / 2;          // get Y center

    // Stuff used for debugging:
    // console.log(eight);
    // console.log("OB1 X  " + centreX);
    // console.log("OB1 Y  " + centreY);

    return [centreX, centreY];  // return an array of the x and y center 
}

// Function to get positions for obTr1
function getPositionObTr1 () {
    var leftPos = $("#obTr1").position().left;    // get left position 
    var topPos = $("#obTr1").position().top;      // get top position
    var width = leftPos + 50;                     // get the width                          // WHY IS THE POSITION SO OFF?!?!?!??!?!?!??!?
    var height = topPos + 50;                     // get the height
    var centreX = (leftPos + width) / 2;          // get X center
    var centreY = topPos + height / 2;            // get Y center

    return [centreX, centreY];  // return an array of the x and y center 
}


// Function to compare the balls position with the game area and obstacles. 
function trackBall () {
    var ballX = blueBallPosition()[0];      // X center for ball
    var ballY = blueBallPosition()[1];      // Y center for ball

    // BALL VS GAME AREA
    var gaLeftSide = gameAreaPosition() [0];        // getting the left position of the GA
    var gaTop = gameAreaPosition() [2];             // getting the width of the GA
    var gaBottom = gameAreaPosition() [3];          // getting the height

    var leftLineGA = Math.abs(ballX - gaLeftSide);  // the left line of the GA
    var topLineGA = Math.abs(ballY - gaLeftSide);   // the top line of the GA
    var bottomLineGA = Math.abs(ballY - gaBottom);  // The bottom line of the GA
    var rightLineGA = Math.abs(ballX - gaTop - 565);// The right line of the GA

    if (leftLineGA < 10) {          // if the left line is less than 10, return false
        return false;
    }
    else if (topLineGA < 10) {      // if the top line is less than 10, return false
        return false; 
    }
    else if (bottomLineGA < 10) {   // if the bottom line is less than 10, return false
        return false; 
    }
    else if (rightLineGA < 10) {   // if the bottom line is less than 10, return false
        return false; 
    }

    // BALL VS OBTR1
    var obTr1X = getPositionObTr1()[0];     // X center for obTr1
    var obTr1Y = getPositionObTr1()[1];     // Y center for obTr1

    var ballX_obTr1X_delta = Math.abs(ballX - obTr1X); 
    var ballY_obTr1Y_delta = Math.abs(ballY - obTr1Y); 

    if (ballX_obTr1X_delta < 120 && ballY_obTr1Y_delta < 120) {
        return false; 
    }



    // BALL VS OB1
    var ob1X = getPositionOb1()[0];         // X center for ob1
    var ob1Y = getPositionOb1()[1];         // Y center for ob1

    var ballX_ob1X_delta = Math.abs(ballX - ob1X);  // center of ball and ob1 X position
    var ballY_ob1Y_delta = Math.abs(ballY - ob1Y);  // center of ball and ob1 Y position

    // if the ball is closer to center than 120 width and 60 height. 
    if (ballX_ob1X_delta < 120 && ballY_ob1Y_delta < 60) {
        // return false 
        return false;
    }
    









    
        return true;
}
*/
