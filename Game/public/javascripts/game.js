
/* --- GLOBAL VARIABLES --- */

var gameArea = $('#gameArea');          // variable for the game area
var score = 0;                          // Variable for the score

var blueball = $('#blueball');          // Variable for the blue ball
// var greenball = $('#greenball');        // Variable for the blue ball

var timer;              // Variable for the timer 
var timerL;             // Variable for the lobby timer (Count down to start)




//This function sets the max timer for the clock and calls the other function that deducts the seconds 
//Help taken from this link https://stackoverflow.com/questions/40638402/javascript-countdown-timer-with-start-stop-buttons?fbclid=IwAR30qwUDywIojiyo_1pxMh3Jt3eyOY6izMIApJG6qU7T2pOLHXtiG8cuIaw 
function clock(){
    timer = setInterval(countDown, 1000); // calling the timer every second 
    var maxTime = 60; 

    //This function takes the seconds away from the maximum time 
    function countDown() {
        document.getElementById("timerID").innerHTML = --maxTime; //taking 1 away from the timer 
        if(maxTime == 0 ){
            clearInterval(timer)        // Clearing the timer when it gets to 0 
            var timeUp = $('#timeUp');  // Creating a variable set to 'GAME OVER' image 
            timeUp.show();               // Showing the gameover image 
            gameArea.hide();            // Hiding the game area
            $('#right').hide();         // Hide what is stored in right>
        }
      }
    }


function gameLobby(){
    killBall();
}

//Timer to countdown the time until the game can start
function lobbyClock(){
    timerL = setInterval(countDownL, 1000); 
    var maxTimeL = 5;
    
    function countDownL(){
        document.getElementById("timerIDL").innerHTML= --maxTimeL;
        if(maxTimeL == 0){
            //  function gameLobby(); 
            clearInterval(timerL) //Clearing the timer when it gets to 0, to stop it counting into the negative 

            // When count down hits 0, enable the functionality
            gameFunctionality();
            
            // hide the count down timer, show the game left timer
            $('#gameStartClock').hide();
            $('#gameTimeLeft').show();

            // Call the function to count down the timer. 
            clock();
        }
    }
}

//calling the screen size alert functions every 3 seconds, enough time to alert them before their game starts and enough time to let them 
//resize their screen before the next alert 
window.setInterval(function(){
    screenWidthAlert();
    screenHeightAlert();  
  }, 5000);

//alert the user if the width of the screen is too small  
function screenWidthAlert(){
    if($(window).width() < 900) {
        alert("Please increase the browser width")
    }
} 
//alert the user if the height of the screen is too small
function screenHeightAlert(){
    if($(window).height() < 750) {
        alert("Please increase the browser height")
    }
} 

//Function to start the game when the start button is clicked
function startButtonClick(){
    newGame();  
}


/*
 *  This is called when the page is loaded. 
 *  It sets the score to 0, and calls the function lobbyClock, which starts the game. 
 */
$(document).ready(function () {
    score = 0;
    $('#score').html(score);
    lobbyClock(); 
});

/* 
 *  For the following function, i found help at this link: https://stackoverflow.com/questions/4950575/how-to-move-a-div-with-arrow-keys
 *  
 *  This function creates the functionality of the balls movement around in the game area. 
 *  It calculates the collision detection based on the difference between the width of the ball and the game area.
 *  This makes the ball unable to leave the game area square. 
 */
function gameFunctionality() {
     // Variables for 
     var width = gameArea.width() - blueball.width(),       // The maximal left/top value for gameArea
     //  widthGreen = gameArea.width() - greenball.width(),    // The maximal left/top value for gameArea
 
         keyPressed = {},                                   // Array to store information of which key is pressed
         speed = 10;                                        // The distance moved by the ball per intervall, in px


     /* 
      * This function calculates the new top and left values based on
      * the oldValue and the keyPressed. It updates the new position of the ball based on the
      * key that is pressed. We have two values, key1 and key2, so the ball can move diagonally.
     */
     function newTopLeft(oldValue,key1,key2) {
         // Creating a variable, setting it to the 
         //     - Integer value of the String String oldValue, with base 10,                            MINUS
         //     - The key pressed first. (If the key is in the array, return the speed, else return 0)  PLUS
         //     - The key pressed second. (If the key is in the array, return the speed, else return 0)  
         var n = parseInt(oldValue, 10) - (keyPressed[key1] ? speed : 0) + (keyPressed[key2] ? speed : 0);
         
         // This expression ensures that the new value is in the permitted bounds.
         // if n is less than 0 return 0, 
         // else if n greater than the width, return the width, 
         // else return n
         return (n < 0 ? 0 : n > width ? width : n);
     } 
 
     /*
      * This function sets the new values of the ball. It happens when a button that is in the
      * array is pressed.  
      */
     $(window).keydown(function(e) { 
         // The button pressed from the array is set to true. 
         keyPressed[e.which] = true; 

         // Update the left and top value of the ball in CSS. 
         blueball.css({
             left: function(i,oldValue) { return newTopLeft(oldValue, 37, 39); }, // left arrow  = left,     right arrow = right
             top: function(i,oldValue) { return newTopLeft(oldValue, 38, 40); }   // up arrow    = up,       down arrow  = down
         });
 
  /*     UNNCOMMENT FOLLOWING FOR ACTIVATING REDDBALL, GREENBALL AND YELLOWBALL
         greenball.css({
             left: function(i,oldValue) { return newTopLeft(oldValue, 74, 76); }, // j = left, l = right
             top: function(i,oldValue) { return newTopLeft(oldValue, 73, 75); } // i = up, k = down
         });
  */
 
         // Call track ball to get the position in the grid. 
         trackBall();
     }); 

 
     /*
      * This function changes the buttons value to false when the key is relesed.
      */
     $(window).keyup(function(e) { 
         keyPressed[e.which] = false;    
     });  
}


/* 
 *  This function prevents the screen to move up and down if the arrows are pressed. 
 *  It uses an array with the arrow keys to check if it is pressed. 
 */
$(window).keydown(function(e) {
    var keyArray=new Array(37,38,39,40);
    var key = e.which;
    // If the key pressed is not in the array, prevent default, and return false. 
    if($.inArray(key,keyArray) != -1) {
        e.preventDefault();
        return false;
    }
    // If the key is in the array, return true. 
    return true;
});


/* --- THE MAP --- */

/* 
 *  2D array to represent the game area. 
 *  0 = obstacle
 *  1 = free position
 *  2 = coin
 */
var gameArray = [
                [2, 1, 1, 0, 1, 1, 1, 2, 0, 1],
                [0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [2, 0, 1, 0, 1, 1, 1, 1, 0, 1],
                [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
                [0, 0, 0, 1, 1, 2, 1, 1, 0, 1],     
                [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 1, 1, 1, 1, 1, 1, 2],
                [1, 0, 1, 1, 0, 1, 0, 0, 0, 0],
                [1, 0, 1, 0, 0, 1, 0, 1, 1, 1],
                [2, 0, 1, 2, 0, 1, 1, 1, 0, 2],
                ];


var deadCounter = 0,        // Variable to count number of deaths. 
    coin1 = $('#coin1'),    // Variable for coin 1
    coin2 = $('#coin2'),    // Variable for coin 2
    coin3 = $('#coin3'),    // Variable for coin 3
    coin4 = $('#coin4'),    // Variable for coin 4
    coin5 = $('#coin5'),    // Variable for coin 5
    coin6 = $('#coin6'),    // Variable for coin 6
    coin7 = $('#coin7'),    // Variable for coin 7
    coin8 = $('#coin8');    // Variable for coin 8


// Array for all the coins
var coinArray = [coin1, coin2, coin3, coin4, coin5, coin6, coin7, coin8];  

                
/* 
 *  This function tracks the ball. It uses Math.floor to round the numbers down, so we get the x and y position for the grid area. 
 *  It gets all the corners, and based on where it is positioned, it either kills the ball, or removes a coin / increment score. 
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
    console.log(leftTopX, leftTopY);

    // If top left corner is 2, remove the coin. Bring back after 10 seconds. 
    if (gameArray[leftTopY][leftTopX] === 2) {
        removeCoin(leftTopY, leftTopX);
        setTimeout(function() {
           bringBackCoins();
        }, 10000);
    }
    // If top right corner is 2, remove the coin. Bring back after 10 seconds. 
    else if (gameArray[leftTopY][rightTopX] === 2) {
        removeCoin(leftTopY, rightTopX);
        setTimeout(function() {
            bringBackCoins();
        }, 10000);

    }
    // If bottom left corner is 2, remove the coin. Bring back after 10 seconds. 
    else if (gameArray[leftBottomY][leftTopX] === 2) {
        removeCoin(leftBottomY, leftTopX);
        setTimeout(function() {
            bringBackCoins();
        }, 10000);
    }
    // If bottom right corner is 2, remove the coin. Bring back after 10 seconds. 
    else if (gameArray[leftBottomY][rightTopX] === 2) {
        removeCoin(leftBottomY, rightTopX);
        setTimeout(function() {
            bringBackCoins();
        }, 10000);
    }

    // If one of the corners is 0, kill the ball. Update the screen with the deadColour function. 
    if (gameArray[leftTopY][leftTopX] === 0 || gameArray[leftTopY][rightTopX] === 0 || gameArray[leftBottomY][leftTopX] === 0 || gameArray[leftBottomY][rightTopX] === 0) {
        killBall();   
        // If deadColour is displayed more 18 times, stop creating more of it. 
        if (deadCounter <= 10) {
            deadColour();    
        }
        else {
            clearInterval(timer)        // Clearing the timer when it gets to 0 
            var endGame = $('#endGame');  // Creating a variable set to 'GAME OVER' image 
            endGame.show();               // Showing the gameover image 
            gameArea.hide();            // Hiding the game area
            $('#right').hide();         // Hide what is stored in right
        }
    }
}


/*
 *  This function "kills" the ball if the ball collide with an obstacle. 
 *  It changes the users score to 0, and sends the user back to start position. 
 */
function killBall() {
    score = 0;
    $('#score').html(score);
    // set position of ball to startposition.
    blueball.css({
        left: "93%",
        top: "2.5%"
    });
    deadCounter++;
}

/*
 *  This function creates a new <p> element that prints "YOU DIED!" in the right area of the screen 
 *  if the user dies. The colours are randomly choosen from an array of colours. The function loops
 *  up to the deadCounter, so it prints every time the user dies. 
 */
function deadColour () {
    var colors = ["red","green","blue","yellow", "orange", "purple", "lime"];      // Array of colours
 
    for (var i = 0; i < deadCounter; i++) {
        var color = colors[Math.floor(Math.random()*colors.length)];    // Variable for colour to display. 
        tmp = document.createElement("p");                              // Create a <p> element, and set the colour of it. 
        tmp.style.color = color;
        $("#right").append(tmp);                                        // Append the <p> to the right area of the game. 
        var livesLeft = 10 - i;
    }
    tmp.innerHTML = ("YOU DIED! You have " + livesLeft + " lives left");    // Set the text, update with number of lives left. 
}


/* 
 *  This function removes the coin and increments the score of the user. 
 *  It takes two arguments, y and x, to represent the positon of the coin. 
 *  y is which row, x is which column.
*/
function removeCoin (y, x) {
    // Looping through the array. Create X and Y value for the index coin. 
    for (var i = 0; i < coinArray.length; i++) {
        var coinX = Math.floor((coinArray[i].position().left) / 60);    // Divide by 60 and round down to get a value between 0-9.
        var coinY = Math.floor((coinArray[i].position().top) / 60);     // Divide by 60 and round down to get a value between 0-9.

        // If the coins´ x- and y-positon is equal to whats passed in, hide the coin, and set that position to be free-position.
        if (coinX === x && coinY === y) {
            coinArray[i].hide();
            gameArray[y][x] = 1; 
        }       
    }
    // Increment score.
    score++;
    $('#score').html(score);  
}


/*
 * This function brings back the coins. 
 */
function bringBackCoins(){
    bringBack1();
    bringBack2();
    bringBack3();
    bringBack4();
    bringBack5();
    bringBack6();
    bringBack7();
    bringBack8();
    bringBack9();
}


/* 
 *  Below are 8 functions, one for each coin. It sets the coin to be visible, 
 *  and changes the value in the 2D array to be 2, which represent a coin.
 */
function bringBack1 () {  
    coinArray[0].show();
    gameArray[0][0] = 2;
}
function bringBack2 () {   
    coinArray[1].show();
    gameArray[0][7] = 2;
}
function bringBack3 () {   
    coinArray[2].show();
    gameArray[2][0] = 2;
}
function bringBack4 () {   
    coinArray[3].show();
    gameArray[9][0] = 2;
}
function bringBack5 () {   
    coinArray[4].show();
    gameArray[9][3] = 2;
}
function bringBack6 () {   
    coinArray[5].show();
    gameArray[9][9] = 2;
}
function bringBack7 () {           
    coinArray[6].show();
    gameArray[6][9] = 2;
}
function bringBack8 () {   
    coinArray[7].show();
    gameArray[4][5] = 2;
}

/* 
 *  This function starts a new game.
 */
function newGame() {
    window.location.reload();
}

