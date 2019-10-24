//initialise images globally
// var imgRedBall = null;
var imgBlueBall = null;
var imgCoin     = null;

// function to work the game timer 

function gameTimer(countDown){
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
    var oneMin = 60, 
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
/*
var blueball = $('#blueball');

$(document).keydown(function(e) {
    var left = parseInt(blueball.css('left') || 0);
    var top = parseInt(blueball.css('top') || 0);
    if (e.which === 39 && ((left + blueball.outerWidth() + 16) < 400)) {
        blueball.css('left', "+=16px");
    } else if (e.which === 37 && (left > 0)) {
        blueball.css('left', '-=16px');
    }
    else if (e.which === 40 && ((top + blueball.outerHeight() + 16) < 400)) {
        blueball.css('top', '+=16px'); 
    }
    else if (e.which === 38 && (top > 0)) {
        blueball.css('top', '-=16px');
       // alert("test");
    }
});
   
*/


// functions that calls different functions based on key pressed. 
function getKeyAndMove(e){				
    var key_code=e.which||e.keyCode;
    console.log(trackBall);
    switch(key_code){
        case 37: //left arrow key
            if (trackBall() === true)
                moveLeft();
            break;
        case 38: //Up arrow key
            if (trackBall() === true)
                 moveUp();
            break;
        case 39: //right arrow key
            if (trackBall() === true)
                moveRight();
            break;
        case 40: //down arrow key
            if (trackBall() === true)
                moveDown();
            break;				          
    }
}



// function to move left
function moveLeft(){
    imgBlueBall.style.left=parseInt(imgBlueBall.style.left)-5 +'px';
}

// function to move up
function moveUp(){
    imgBlueBall.style.top=parseInt(imgBlueBall.style.top)-5 +'px';
}

// function to move right
function moveRight(){
    imgBlueBall.style.left=parseInt(imgBlueBall.style.left)+5 +'px';
}

// function to move down
function moveDown(){
    imgBlueBall.style.top=parseInt(imgBlueBall.style.top)+5 +'px';
}

// load in the blue ball. 
window.onload=initBlue;
// load in the red ball.
// window.onload=initRed;

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

