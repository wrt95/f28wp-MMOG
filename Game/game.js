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
            moveLeft();
            break;
        case 38: //Up arrow key
            moveUp();
            break;
        case 39: //right arrow key
            moveRight();
            break;
        case 40: //down arrow key
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

