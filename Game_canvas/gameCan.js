

var canvas = document.getElementById('myCanvas'),
context = canvas.getContext('2d');

// adding the images to the canvas
make_blueball();
make_obstacle1();
make_coin();

// Function to create and display the users ball
function make_blueball() {
    imgBlueBall = new Image();
    imgBlueBall.src = 'images/blueball.png';
    imgBlueBall.onload = function(){
        context.drawImage(imgBlueBall, 120, 60, 10, 10);
    }
}

// functions to create the obstacles
function make_obstacle1() {
    imgObstacle1 = new Image();
    imgObstacle1.src = 'images/obstacle1.png';
    imgObstacle1.onload = function(){
        context.drawImage(imgObstacle1, 120, 20, 15, 30); // middle top
        context.drawImage(imgObstacle1, 120, 100, 15, 30); // middle bottom
        context.drawImage(imgObstacle1, 20, 20, 30, 15); // top left
        context.drawImage(imgObstacle1, 50, 20, 30, 15); // top left2
        context.drawImage(imgObstacle1, 250, 20, 30, 15); // top right
        context.drawImage(imgObstacle1, 20, 110, 30, 15); // bottom left
        context.drawImage(imgObstacle1, 250, 110, 30, 15); // bottom right
    }
}


// function to make the coin

// TODO
// make 30 coins that appear randomly on the screen
function make_coin () {
    var coinSize = 4;
    imgCoin = new Image();
    imgCoin.src = 'images/coin.png';
    imgCoin.onload = function(){
        context.drawImage(imgCoin, 5, 5, coinSize, coinSize);
        context.drawImage(imgCoin, 5, 31, coinSize, coinSize);
        context.drawImage(imgCoin, 5, 57, coinSize, coinSize);
        context.drawImage(imgCoin, 5, 83, coinSize, coinSize);
        context.drawImage(imgCoin, 5, 109, coinSize, coinSize);
        context.drawImage(imgCoin, 5, 135, coinSize, coinSize);
        context.drawImage(imgCoin, 70, 5, coinSize, coinSize);
        context.drawImage(imgCoin, 70, 40, coinSize, coinSize);
        context.drawImage(imgCoin, 70, 57, coinSize, coinSize);
        context.drawImage(imgCoin, 70, 83, coinSize, coinSize);
        context.drawImage(imgCoin, 70, 109, coinSize, coinSize);
        context.drawImage(imgCoin, 70, 135, coinSize, coinSize);
        context.drawImage(imgCoin, 140, 5, coinSize, coinSize);
        context.drawImage(imgCoin, 140, 31, coinSize, coinSize);
        context.drawImage(imgCoin, 140, 57, coinSize, coinSize);
        context.drawImage(imgCoin, 140, 83, coinSize, coinSize);
        context.drawImage(imgCoin, 140, 109, coinSize, coinSize);
        context.drawImage(imgCoin, 140, 135, coinSize, coinSize);
        context.drawImage(imgCoin, 200, 5, coinSize, coinSize);
        context.drawImage(imgCoin, 200, 31, coinSize, coinSize);
        context.drawImage(imgCoin, 200, 57, coinSize, coinSize);
        context.drawImage(imgCoin, 200, 83, coinSize, coinSize);
        context.drawImage(imgCoin, 200, 109, coinSize, coinSize);
        context.drawImage(imgCoin, 200, 135, coinSize, coinSize);
        context.drawImage(imgCoin, 265, 5, coinSize, coinSize);
        context.drawImage(imgCoin, 230, 31, coinSize, coinSize);
        context.drawImage(imgCoin, 265, 57, coinSize, coinSize);
        context.drawImage(imgCoin, 265, 83, coinSize, coinSize);
        context.drawImage(imgCoin, 230, 109, coinSize, coinSize);
        context.drawImage(imgCoin, 265, 135, coinSize, coinSize);

        


        
        /*
        for (var i = 5; i < Math.random() * 280; i++) {
            for (var j = 5; j < Math.random() * 120; j++) {
                context.drawImage(imgCoin, i, j, 8, 8);
            }
        }
        */
    }
}






/*
var imgBlueBall     = null,
    canvas          = document.getElementById('myCanvas'),
    context         = canvas.getContext('2d'),
 //   CANVAS_HEIGHT   = 500,
 //   CANVAS_WIDTH    = 600;



function init(){
    imgBlueBall = new Image ();
    imgBlueBall.src = 'images/blueball.png';
    imgBlueBall.onload = function(){
        context.drawImage(imgBlueBall, 0, 0, 15, 15);
    }
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


*/
