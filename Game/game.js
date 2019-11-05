// Variable for the score
var score = 0;

// Variable for the blue ball
blueball = $('#blueball');

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

//calling the screen size alert functions every 3 seconds, enough time to alert them before their game starts and enough time to let them 
//resize their screen before the next alert 
window.setInterval(function(){
    screenWidthAlert();
    screenHeightAlert();  
  }, 3000);

//alert the user if the width of the screen is too small  
function screenWidthAlert(){
    if($(window).width() < 900) {
        alert("Please increase the browser width")
    }
} 
//alert the user if the height of the screen is too small
function screenHeightAlert(){
    if($(window).height() < 800) {
        alert("Please increase the browser height")
    }
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
   


/* 
For the following function, i found help at this link: https://stackoverflow.com/questions/4950575/how-to-move-a-div-with-arrow-keys
It is used to make the ball move around in the gamearea.
*/
$(document).ready(function () {
    // Set score initially to 0, and add it to the html.
    score = 0;
    $('#score').html(score);

    // Variables for 
    var gameArea = $('#gameArea'),
       
       // redball = $('#redball'),              UNNCOMMENT FOR REDBALL
       // greenball = $('#greenball'),          UNNCOMMENT FOR GREENBALL
       // yellowball = $('#yellowball'),        UNNCOMMENT FOR YELLOWBALL

        width = gameArea.width() - blueball.width(),    // widt:        The maximal left/top value for gameArea
        keyPressed = {},                                // keyPressed:  Array to store information of which key is pressed
        speed = 10;                                     // speed:       The distance moved per intervall, in px

    /* 
    This function calculates the new top and left values based on
    the oldValue and the keyPressed. It basiclly updates the new position of the ball based on the
    key that is pressed. We have two values, key1 and key2, so the ball can move diagonally.
    */
    function newTopLeft(oldValue,key1,key2) {
        // creating a variable, setting it to the 
        // using parse int to convert the String String oldValue, with base 10, MINUS
        // keypressed of key1 (if the key pressed is in the array, return the speed, else return 0) PLUS
        // keypressed of key2 (if the key pressed is in the array, return the speed, else return 0)
        // The reason for having to keys is to be able to move diagonally. 
        var n = parseInt(oldValue, 10) - (keyPressed[key1] ? speed : 0) + (keyPressed[key2] ? speed : 0);
        
        // This expression ensures that the new value is in the permitted bounds.
        // if n is less than 0 return 0, 
        // else if n greater than the width, return the width, 
        // else return n
        return (n < 0 ? 0 : n > width ? width : n);
    } 

    // This function sets the new values of the ball. It is done when a button is pressed. 
    $(window).keydown(function(e) { 
        // The button pressed from the array is set to true. 
        keyPressed[e.which] = true; 
        // Update the left and top value of the ball in CSS. 
        blueball.css({
            left: function(i,oldValue) { return newTopLeft(oldValue, 37, 39); }, // left arrow  = left,     right arrow = right
            top: function(i,oldValue) { return newTopLeft(oldValue, 38, 40); }   // up arrow    = up,       down arrow  = down
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

        // Call track ball to get the position in the grid. 
        trackBall();
    }); 

    // This function changed the buttons value to false.
    $(window).keyup(function(e) { 
        // if the key is released, it´s not in use, set to false
        keyPressed[e.which] = false;    
    });  
});


/* 
This function prevents the screen to move up and down if the arrows are pressed. 
*/
$(window).keydown(function(e) {
    // Creating an array for the keys. 
    var keyArray=new Array(37,38,39,40);
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


// --- THE MAP ---

// Variables for the different objects. 
var obstacle = 0,   
    free = 1,       
    coin = 2;      

// 2D array representing the game. 
var gameArray = [
                [2, 1, 1, 0, 1, 1, 1, 2, 0, 1],
                [0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [2, 0, 1, 0, 1, 1, 1, 1, 0, 1],
                [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
                [0, 0, 0, 1, 1, 2, 1, 1, 0, 1],     
                [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
                [2, 0, 0, 1, 1, 1, 1, 1, 1, 2],
                [1, 0, 1, 1, 0, 1, 0, 0, 0, 0],
                [1, 0, 1, 0, 0, 1, 0, 1, 1, 1],
                [2, 0, 1, 2, 0, 1, 1, 2, 0, 1],
                ];
                

/* 
This function tracks the ball. It uses Math.floor to round the numbers down, so we get the x and y position for the grid area. 
It gets all the corners, and based on where it is positioned, it either kills the ball, or removes a coin / increment score. 
*/
function trackBall() {
                                                                                        // --- THE LEFT TOP CORNER ---
    var leftTopX = Math.floor((blueball.position().left) / 60);                         // LeftTopX is the left postion divided by 60 (600px for gameArea, 10 squares)
    var leftTopY = Math.floor((blueball.position().top) / 60);                          // LeftTopY is the top postion divided by 60 (600px for gameArea, 10 squares)

                                                                                        // --- THE RIGHT TOP CORNER ---
    var rightTopX = Math.floor(((blueball.position().left) + (blueball.width()))/60);   // RightTopX is the left postion plus the width divided by 60 (600px for gameArea, 10 squares)
                                                                                        // rightTopY is leftTopY       (on same Y position.)
    
                                                                                        // --- THE LEFT BOTTOM CORNER ---
    var leftBottomY = Math.floor(((blueball.position().top) + (blueball.height()))/60); // LeftBottomY is the top postion plus the height divided by 60 (600px for gameArea, 10 squares)
                                                                                        // leftBottomX is leftTOpX     (on same X position.)

                                                                                        // --- THE RIGHT BOTTOM CORNER ---
                                                                                        // rightBottomY is leftBottomY (on same Y position.)
                                                                                        // rightBottomX is rightTopX   (on same X position.) 
// Following is used for debugging to track the grid position of the ball:
//    console.log(left);
//    console.log(top);

    // if top left corner is 2, remove the coin
    if (gameArray[leftTopY][leftTopX] === 2) {
        removeCoin(leftTopY, leftTopX);

    }
    // if top right corner is 2, remove the coin
    else if (gameArray[leftTopY][rightTopX] === 2) {
        removeCoin(leftTopY, rightTopX);
    }
    // if bottom left corner is 2, remove the coin
    else if (gameArray[leftBottomY][leftTopX] === 2) {
        removeCoin(leftBottomY, leftTopX);
    }
    // if bottom right corner is 2, remove the coin
    else if (gameArray[leftBottomY][rightTopX] === 2) {
        removeCoin(leftBottomY, rightTopX);
    }

    // if top left corner or top right corner or bottom left corner or bottom right corner is 0, kill the ball.
    if (gameArray[leftTopY][leftTopX] === 0 || gameArray[leftTopY][rightTopX] === 0 || gameArray[leftBottomY][leftTopX] === 0 || gameArray[leftBottomY][rightTopX] === 0) {
        killBall();
    }
}

/*
This function "kills" the ball. 
It changes the users score to 0, and sends the user back to start position. 
*/
function killBall() {
    score = 0;
    $('#score').html(score);
    // set position of ball to startposition.
    blueball.css({
        left: "93%",
        top: "2.5%"
    });
}

/* 
This function removes the ball and increments the score of the user. 
NOT READY YET, MISSING IMPLEMENTATION OF COIN TO DISSAPEAR
*/
function removeCoin (y, x) {
    score++;
    $('#score').html(score);
    gameArray[y][x] = 1;
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
// - how to make the coin disapear for 5 seconds. 
