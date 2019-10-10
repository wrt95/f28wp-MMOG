//initialise images globally
var imgBlueBall = null;
var imgCoin     = null;

// function to initialise the blue ball.
function init(){
    // getting the id for the ball, and assigning it to the variable. 
    imgBlueBall=document.getElementById("blueball");				
    imgBlueBall.style.position='relative';
    imgBlueBall.style.left='285px';
    imgBlueBall.style.top='195px';
}

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
function moveLeft(){
    imgBlueBall.style.left=parseInt(imgBlueBall.style.left)-5 +'px';
}
function moveUp(){
    imgBlueBall.style.top=parseInt(imgBlueBall.style.top)-5 +'px';
}
function moveRight(){
    imgBlueBall.style.left=parseInt(imgBlueBall.style.left)+5 +'px';
}
function moveDown(){
    imgBlueBall.style.top=parseInt(imgBlueBall.style.top)+5 +'px';
}
window.onload=init;

function randomiseCoins () {
    imgCoin = document.createElement("img");
    var imgCoinsAttribute = document.createAttribute("class");
    imgCoinsAttribute.value = "coin";
    imgCoin.setAttributeNode(imgCoinsAttribute);
    imgCoin.src = "Images/coin.png";

    var xposCoin = Math.random()*700;
    var yposCoin = Math.random()*400;

    for (var i = 0; i < 30; i++) {
        imgCoin.style.position = "absolute";
        imgCoin.style.left = xposCoin + 'px';
        imgCoin.style.top = yposCoin + 'px';
       
    }
    document.getElementById('gameArea').append(imgCoin);
    return imgCoin;
}

for (var i = 0; i<15; i++) {
    randomiseCoins();
}


function newGame() {
    window.location.reload();
}

function leaveGame(gameArea) {
    document.getElementById(gameArea).innerHTML= "";
}

