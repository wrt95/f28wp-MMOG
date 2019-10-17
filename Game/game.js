//initialise images globally
// var imgRedBall = null;
var imgBlueBall = null;
var imgCoin     = null;

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

// functions that calls different functions based on key pressed. 
function getKeyAndMove(e){				
    var key_code=e.which||e.keyCode;
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
    var width = leftPos + 30;                       // get the width 
    var height = topPos + 30;                       // get the height
    var centreX = leftPos + width / 2;              // get X center
    var centreY = topPos + height / 2;              // get Y center

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
    var centreX = leftPos + width / 2;          // get X center
    var centreY = topPos + height / 2;          // get Y center

    // Stuff used for debugging:
    // console.log(eight);
    // console.log("OB1 X  " + centreX);
    // console.log("OB1 Y  " + centreY);

    return [centreX, centreY];  // return an array of the x and y center 
}

// Function to compare the balls position with the game area and obstacles. 
function trackBall () {
    var ballX = blueBallPosition()[0];      // X center for ball
    var ballY = blueBallPosition()[1];      // Y center for ball

    var ob1X = getPositionOb1()[0];         // X center for ob1
    var ob1Y = getPositionOb1()[1];         // Y center for ob1


    // CALCULATIONS
    var ballX_ob1X_delta = Math.abs(ballX - ob1X);    // center of ball and ob1 X position
    var ballY_ob1Y_delta = Math.abs(ballY - ob1Y);    // center of ball and ob1 Y position

    var gaLeftSide = gameAreaPosition() [0]; // getting the left position of the GA

    var gaTop = gameAreaPosition() [2]; // getting the width of the GA

    var gaBottom = gameAreaPosition() [3]; // getting the height

    var leftLineGA = Math.abs(ballX - gaLeftSide);       // the left line of the GA
    var topLineGA = Math.abs(ballY - gaLeftSide);        // the top line of the GA
    var bottomLineGA = Math.abs(ballY - gaBottom);       // The bottom line

    if (leftLineGA < 10) {
        return false; 
    }
    else if (topLineGA < 10) {
        return false; 
    }
    else if (bottomLineGA < 10) {
        return false; 
    }



    // if the its closer to center than 120 width and 60 height. 
    if (ballX_ob1X_delta < 120 && ballY_ob1Y_delta < 60) {
        // return false 
        return false;
    }
    
    
        return true;
}

