
// function to work the game timer 
// help taken from - https://jsfiddle.net/wr1ua0db/17/ 
//
function gameTimer(countDown, display){
    var timer = countDown, minutes, seconds; 

    setInterval(function (){
        mins = parseInt(timer / 60, 10)
        secs = parseInt(timer % 60, 10); 

        mins = mins < 10 ? "0" + mins : mins;
        secs = secs < 10 ? "0" + secs : secs;

        display.textContent = mins + ":" + secs; 

        if (--timer < 0){
            timer = countDown;
        }
    }, 1000); 

}
//test function 
function testStartTimer(){
    var counter = 60;
    setInterval(function() {
      counter--;
      if (counter >= 0) {
        span = document.getElementById("testStartTime");
        span.innerHTML = counter;
      }
      if (counter === 0) {
          alert('Game is over');
          clearInterval(counter);
      }
    }, 1000);
  }

  /*
  $("#testStartTimer").click(function(){
    testStartTimer();
 });

 */ 

function timeOut(){
alert(' Game Over '); 
}

//Function to call other function when the start button is clicked. 
function startButtonClick(){
  //  timeOut();
    newGame(); 
   // gameTimer(); 
    testStartTimer(); 
}

//Start the game timer 
/*
function startTimer () {
      
       display = document.querySelector('#time'); 
       gameTimer(oneMin, display); 
   
   };
   */  
   


// For the following function, i found help at this link: https://stackoverflow.com/questions/4950575/how-to-move-a-div-with-arrow-keys
// It is used to make the ball move around in the gamearea.
$(document).ready(function () {
    var gameArea = $('#gameArea'),
        blueball = $('#blueball'),
       // redball = $('#redball'),              UNNCOMMENT FOR REDBALL
       // greenball = $('#greenball'),          UNNCOMMENT FOR GREENBALL
       // yellowball = $('#yellowball'),        UNNCOMMENT FOR YELLOWBALL

        width = gameArea.width() - blueball.width(),    // the maximal left/top value for gameArea
       // height = gameArea.height() - blueball.height(), 
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
        // else if n greater than the width, return the width, 
        // else return n
        return (n < 0 ? 0 : n > width ? width : n);
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

   /*     UNNCOMMENT FOLLOWING FOR ACTIVATING REDDBALL, GREENBALL AND YELLOWBALL
        redball.css({
            left: function(i,oldValue) { return newTopLeft(oldValue, 65, 68); }, // a = left, d = right
            top: function(i,oldValue) { return newTopLeft(oldValue, 87, 83); } // w = up, s = down
        });

        greenball.css({
            left: function(i,oldValue) { return newTopLeft(oldValue, 74, 76); }, // j = left, l = right
            top: function(i,oldValue) { return newTopLeft(oldValue, 73, 75); } // i = up, k = down
        });

        yellowball.css({
            left: function(i,oldValue) { return newTopLeft(oldValue, 70, 72); }, // f = left, h = right
            top: function(i,oldValue) { return newTopLeft(oldValue, 84, 71); } // t = up, g = down
        });
    */

    }, 20); // executed every 20 milisec
});


// ADD OBSTACVLE AND POSITION TO MAP <position, name>
// position needs to be of all 4 walls. 



// Creating an array for the keys. 
var keyArray=new Array(37,38,39,40);

$(window).keydown(function(e) {
    // assign the key pressed to key. 
     var key = e.which;
      // if the key pressed is not in the array, prevent default, and return false. 
      if($.inArray(key,keyArray) != -1) {
          e.preventDefault();
          return false;
      }
      // if the key is in the array, return true. 
      return true;
});


// function that assigns the coins to random variables. 
function makeCoins () {
    // creating an element so we can show all. 
    imgCoin = document.createElement("img");
    var imgCoinsAttribute = document.createAttribute("class");
    imgCoinsAttribute.value = "coin";
    imgCoin.setAttributeNode(imgCoinsAttribute);
    imgCoin.src = "Images/coin.png";

    // variables for where coins might pop up. 
    var xposCoin = Math.random()*90 | 5;
    var yposCoin = Math.random()*90 | 5;

    var coinsArray = new Array (15);

    // coins position
    for (var i = 0; i < 15; i++) {
        imgCoin.style.position = "absolute";
        imgCoin.style.left = xposCoin + '%';
        imgCoin.style.top = yposCoin + '%';
        coinsArray[i] = imgCoin;
    }
    
    if (isPosFree) {
        document.getElementById('gameArea').append(imgCoin);
    }
    return coinsArray;
}

// function to check if position is free.
function isPosFree () {
    var posFree = false;
    for (var i = 0; i<10; i++) {
        for (var j = 0; j <10; j++) {
            if (gameArray[i][j] === free) {
              posFree = true;
            }
        }
    }
    return posFree;
}

// function to get the shape of an obstacle
function getObstacleShape () {
    var size = 10 + '%',                   // size of the obstacle is 10% * 10%     
        left = $("#ob*").position().left,  // left position
        top = $("#ob*").position().top,    // top position
        width = left + size,               // the width
        height = top + size;               // the height

    var bottomRight = width + height;      // bottom right position
    var obstacleArray = [left, top, width, height, bottomRight];    // array with the positions

    return obstacleArray;
}

var taken = 0;  // if position is taken
var free = 1;   // if position is free
var gameArray = [
                [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
                [0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 0, 1, 0, 1, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 1, 0, 1],     // 2D array representing the game. 
                [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 1, 1, 1, 0, 1, 0, 0, 1],
                [1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
                ];

// get 15 coins. 
for (var x = 0; x < 15; x++) {
    if (isPosFree()) {
        makeCoins();
    }
}

// function for new game
function newGame() {
    window.location.reload();
}

// function to leave game
function leaveGame(gameArea) {
    document.getElementById(gameArea).innerHTML= "Thanks for playing!";
}




// NEED HELP WITH: 
// - Coins position vs obstacle position
// - Collision detection.



/*
        add jQuery game code.

        collison ball - obstacle 
        - killBall()
            - sends ball back to start position
            - set score to 0.

        collision ball - coins
        - removeCoin()
            - removes the coin for 10 seconds
            - score++;


        Replace red iamge with galaxy image




*/