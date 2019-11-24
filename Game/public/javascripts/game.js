
/* --- GLOBAL VARIABLES --- */
var gameArea = $('#gameArea'),          // variable for the game area
    score = 0,                          // Variable for the score
    blueball = $('#blueball');          // Variable for the blue ball
//  var greenball = $('#greenball');    // Variable for the blue ball

var timer,              // Variable for the timer (Count down to the game ending)
    timerL;             // Variable for the lobby timer (Count down to the game starting)

// source - https://www.audioblocks.com/stock-audio/action-platform-game-from-the-80s-behle5j6ivbk0wyabwm.html
var gameAudio = new Audio('../public/Audio/gamesong.m4a');

// source - https://www.myinstants.com/instant/minecraft-hurt/
var dieAudio = new Audio('../public/Audio/die.mp3');

// source - https://www.myinstants.com/instant/game-over-halo/
var gameoverAudio = new Audio('../public/Audio/gameover.mp3');

// source - https://www.audioblocks.com/royalty-free-audio/3+2+1+go+countdown
var timeupAudio = new Audio('../public/Audio/timeup.m4a');

// source - https://www.myinstants.com/instant/coin-mario/
var coinAudio = new Audio('../public/Audio/coin.mp3');


/* 
 *  This function starts a new game. 
 */
function newGame() {
    window.location.reload();
}

/*
 *  This function sets the max timer for the clock and calls the other function that deducts the seconds 
 *  Help taken from this link https://stackoverflow.com/questions/40638402/javascript-countdown-timer-with-start-stop-buttons?fbclid=IwAR30qwUDywIojiyo_1pxMh3Jt3eyOY6izMIApJG6qU7T2pOLHXtiG8cuIaw 
 */
function clock(){
    timer = setInterval(countDown, 1000); // calling the countdown function every second (countdown takes 1 away. ie minus 1 every 1 second) 
    var maxTime = 60; 

    /*
     *  This function takes the seconds away from the maximum time. It is called every second. 
     */
    function countDown() {
        document.getElementById("timerID").innerHTML = --maxTime; // Taking 1 away from the timer 

        // Keep the color to red. 
        if (maxTime > 0) {
            gameArea.css ("border-color", "red" );
        }
        // Notify the user that the time is almost out by making the 
        // game area change colour the last seconds. 
        if (maxTime === 5) {
            gameArea.css ("border-color", "blue" );
        }
        if (maxTime === 4) {
            gameArea.css ("border-color", "green" );
        }
        if (maxTime === 3) {
            gameArea.css ("border-color", "blue" );
        }
        if (maxTime === 2) {
            gameArea.css ("border-color", "green" );
        }

        if(maxTime === 0 ){
            clearInterval(timer)        // Clearing the timer when it gets to 0 
            gameArea.hide();            // Hiding the game area
            var timeUp = $('#timeUp');  // Creating a variable set to 'TIME UP' image 
            timeUp.show();              // Showing the time up image 
            gameAudio.pause();          // Pausing the game music when the time is up 
            timeupAudio.play();         // Playing the time up music 
            $('#right').hide();         // Hide what is stored in right


            // sql stuff
           // updateScore();
        }
      }
    }

/*
 *  This function counts down from 5 until the game starts. No functionality is available 
 *  in the game before this time hits 0. 
 */
function lobbyClock(){
    timerL = setInterval(countDownL, 1000); // Calling the countDownL function every second 
    var maxTimeL = 5; 
    
    /*
     *  This is the function called in the interval. It decrements the time. 
     *  When it hits 0, it calls the gameFunctionality, hides the count down clock, 
     *  and displays the time left clock. 
     */
    function countDownL(){
        maxTimeL--; 

        var img5 = $('#fiveImg'),
            img4 = $('#fourImg'),
            img3 = $('#threeImg'),
            img2 = $('#twoImg'),
            img1 = $('#oneImg');

        // Display different colours for the countdown 
        if (maxTimeL === 4) {
            gameArea.css ("border-color", "orange" );
            img5.hide();
            img4.show(); 
        }
        if (maxTimeL === 3) {
            gameArea.css ("border-color", "blue" );
            img4.hide();
            img3.show();
        }
        if (maxTimeL === 2) {
            gameArea.css ("border-color", "yellow" );
            img3.hide();
            img2.show();
        }
        if (maxTimeL === 1) {
            gameArea.css ("border-color", "green" );
            img2.hide();
            img1.show();
        }
        if(maxTimeL === 0){ 
            img1.hide();
            gameArea.css ("border-color", "red" );
            clearInterval(timerL) // Clearing the timer when it gets to 0, to stop it counting into the negative 
            gameFunctionality();
            gameAudio.play(); 
            clock();
        }
    }
}


/*
 *  This function calls the screen-size functions every 5 seconds, incase the user 
 *  changes the screen-size during the game.  
 */
window.setInterval(function(){
    screenWidthAlert(); 
    screenHeightAlert();  
  }, 5000);

/*
 * This function alerts the user if the width of their screen is too small  
 */
function screenWidthAlert(){
    if($(window).width() < 900) {
        alert("Please increase the browser width")
    }
} 

/*
 * This function alerts the user if the height of their screen is too small  
 */
function screenHeightAlert(){
    if($(window).height() < 750) {
        alert("Please increase the browser height")
    }
} 

/*
 *  This is called when the page is loaded. 
 *  It sets the score to 0, and calls the function lobbyClock, which starts the
 *  countdown until the game begins. 
 */
$(document).ready(function () {
    score = 0;
    $('#score').html(score);
    lobbyClock();  
});

/* 
 *  For the following function, I found help at this link: https://stackoverflow.com/questions/4950575/how-to-move-a-div-with-arrow-keys
 *  
 *  This function creates the functionality of the balls movement in the game area. 
 *  It calculates the collision detection between the ball and the game area 
 *  boundary based on the difference between the width of the ball and the width of the game area.
 *  This makes the ball unable to leave the game area square. 
 */
function gameFunctionality() {
     var width = gameArea.width() - blueball.width(),       // The maximal top/left value for gameArea
     //  widthGreen = gameArea.width() - greenball.width(), // The maximal top/left value for gameArea
 
         keyPressed = {},                                   // Array to store information of which key is pressed
         speed = 10;                                        // The distance moved by the ball per interval, in px


     /* 
      * This function calculates the new top and left values based on
      * the oldValue and the keyPressed. It updates the new position of the ball based on the
      * key that is pressed. We have two values, key1 and key2, so the ball can move diagonally.
     */
     function newTopLeft(oldValue,key1,key2) {
         // Creating a variable, setting it to the 
         //     - Integer value of the String oldValue, with base 10, MINUS
         //     - The key pressed first. (If the key is in the array, return the speed, else return 0), PLUS
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
 
         // Call track ball to get the ball´s position in the grid. 
         trackBall();
     }); 

 
     /*
      * This function changes the buttons value to false when the key is released.
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
    var keyArray=new Array(37,38,39,40),
        key = e.which;
    // If the key pressed is not in the array, prevent default, and return false. 
    // The default for a button is to move the screen up and down. 
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
 *  3 = teleport bottom
 *  4 = teleport top
 */
var gameArray = [
                [1, 2, 1, 0, 1, 1, 1, 4, 0, 1],
                [0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [2, 0, 1, 0, 1, 1, 1, 1, 0, 1],
                [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
                [0, 0, 0, 1, 1, 2, 1, 1, 0, 1],     
                [2, 1, 1, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 1, 1, 1, 1, 1, 2, 1],
                [1, 0, 1, 1, 0, 1, 0, 0, 0, 0],
                [1, 0, 1, 0, 0, 1, 0, 1, 1, 1],
                [3, 0, 1, 2, 0, 1, 1, 1, 0, 2],
                ];

var deadCounter = 0,        // Variable to count number of deaths. 

    coin1 = $('#coin1'),    // Variable for coin 1
    coin2 = $('#coin2'),    // Variable for coin 2
    coin3 = $('#coin3'),    // Variable for coin 3
    coin4 = $('#coin4'),    // Variable for coin 4
    coin5 = $('#coin5'),    // Variable for coin 5
    coin6 = $('#coin6'),    // Variable for coin 6
    coin7 = $('#coin7');    // Variable for coin 7


// Array for all the coins
var coinArray = [coin1, coin2, coin3, coin4, coin5, coin6, coin7];  
                
/* 
 *  This function tracks the ball. It uses Math.floor to round the numbers down, so we get the x and y position for the grid area as a whole number. 
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
                                                                                        // leftBottomX is leftTopX     (on same X position.)

                                                                                        // --- THE RIGHT BOTTOM CORNER ---
                                                                                        // rightBottomY is leftBottomY (on same Y position.)
                                                                                        // rightBottomX is rightTopX   (on same X position.) 
    // Following is used for debugging to track the grid position of the ball:
    console.log(leftTopX, leftTopY);


    // --- COLLISION DETECTION --- 

    // If one of the 4 corners of the ball enters a grid position that is set to 2, 
    // remove the coin stored at that postion. Bring it back after up to 10 seconds. 
    if (gameArray[leftTopY][leftTopX] === 2) {
        removeCoin(leftTopY, leftTopX);
        setTimeout(function() {
           bringBackCoins();
        }, 10000);
    }
    else if (gameArray[leftTopY][rightTopX] === 2) {
        removeCoin(leftTopY, rightTopX);
        setTimeout(function() {
            bringBackCoins();
        }, 10000);
    }
    else if (gameArray[leftBottomY][leftTopX] === 2) {
        removeCoin(leftBottomY, leftTopX);
        setTimeout(function() {
            bringBackCoins();
        }, 10000);
    }
    else if (gameArray[leftBottomY][rightTopX] === 2) {
        removeCoin(leftBottomY, rightTopX);
        setTimeout(function() {
            bringBackCoins();
        }, 10000);
    }

    // If one of the 4 corners of the ball enters a grid postition that is set to 0, 
    // kill the ball. Update the screen with the deadColour function (information that you died). 
    // If deadCounter is greater than 10, end the game. 
    if (gameArray[leftTopY][leftTopX] === 0 || gameArray[leftTopY][rightTopX] === 0 || gameArray[leftBottomY][leftTopX] === 0 || gameArray[leftBottomY][rightTopX] === 0) {
        killBall();   

        if (deadCounter < 10) {
            deadColour();    
        }
        else {
            clearInterval(timer);
            heartArray[9].hide();          // Hide last heart.
            var endGame = $('#endGame');   // Creating a variable set to 'GAME OVER' image 
            endGame.show();                // Showing the gameover image 
            gameArea.hide();               // Hiding the game area
            gameAudio.pause(); 
            gameoverAudio.play(); 
            $('#right').hide();            // Hide what is stored in right
            blueball.hide();
        }
        $('#score').html("0"); 
    }

    // If the ball enters the bottom teleport area. 
    if (gameArray[leftTopY][leftTopX] === 3 || gameArray[leftTopY][rightTopX] === 3 || gameArray[leftBottomY][leftTopX] === 3 || gameArray[leftBottomY][rightTopX] === 3) {   
        teleportBottom(); 
    }
    // If the ball enters the top teleport area.
    if (gameArray[leftTopY][leftTopX] === 4 || gameArray[leftTopY][rightTopX] === 4 || gameArray[leftBottomY][leftTopX] === 4 || gameArray[leftBottomY][rightTopX] === 4) {
        teleportTop();
    }
}


/*
 *  This function "kills" the ball if the ball collide with an obstacle. 
 *  It changes the users score to 0, and sends the user back to start position, 
 *  and changes the colour of the game area to white for a short periode. 
 *  deadCounter is incremented. 
 */
function killBall() {
    score = 0;
    $('#score').html(score);
    dieAudio.play(); 
    blueball.css({
        left: "93%",
        top: "2.5%"
    });
    // Changing the border colour to white to notify about death. 
    gameArea.css ("border-color", "white" );
    deadCounter++;
}

/* 
 *  This function teleports the ball from the bottom to the top.
 */
function teleportBottom() {
    blueball.css({
        left: "66.5%",
        top: "2.5%"
    });
    // Change border colour to blue to notify about teleport. 
    gameArea.css ("border-color", "blue" );
}
/* 
 *  This function teleports the ball from the top to the bottom.
 */
function teleportTop() {
    blueball.css({
        left: "2.5%",
        top: "86.5%"
    });
    // Change border colour to blue to notify about teleport. 
    gameArea.css ("border-color", "blue" );
}

/*
 *  This function creates a new <p> element that prints "YOU DIED! You have x lives left" in the right 
 *  area of the screen if the user dies. The colours are randomly choosen from an array of colours. 
 *  The function loops up to the deadCounter, so it prints every time the user dies. 
 */
function deadColour () {
    var colors = ["red","green","blue","yellow", "orange", "purple", "lime"];      // Array of colours
 
    for (var i = 0; i < deadCounter; i++) {
        var color = colors[Math.floor(Math.random()*colors.length)];    // Variable for colour to display. 
        tmp = document.createElement("p");                              // Create a <p> element, and set the colour of it. 
        tmp.style.color = color;
        $("#right").append(tmp);                                        // Append the <p> to the right area of the game. 
        var livesLeft = 9 - i;
    }
    tmp.innerHTML = ("YOU DIED! You have " + livesLeft + " lives left"); // Set the text, update with number of lives left. 
    removeHearts();                                                      // Call the remove heart function
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
    // Change border colour to yellow to notify about coin pick up. 
    gameArea.css ("border-color", "yellow" );

    coinAudio.play(); 
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
}


/* 
 *  Below are 7 functions, one for each coin. It sets the coin to be visible, 
 *  and changes the value in the 2D array to be 2, which represent a coin.
 */
function bringBack1 () {  
    coinArray[0].show();
    gameArray[1][0] = 2;
}
function bringBack2 () {   
    coinArray[1].show();
    gameArray[4][5] = 2;
}
function bringBack3 () {   
    coinArray[2].show();
    gameArray[2][0] = 2;
}
function bringBack4 () {   
    coinArray[3].show();
    gameArray[5][0] = 2;
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
    gameArray[6][8] = 2;
}

/* --- THE LIFE COUNTER --- */
var heart1 = $('#heartImg1'),
    heart2 = $('#heartImg2'),
    heart3 = $('#heartImg3'),
    heart4 = $('#heartImg4'),
    heart5 = $('#heartImg5'),
    heart6 = $('#heartImg6'),
    heart7 = $('#heartImg7'),
    heart8 = $('#heartImg8'),
    heart9 = $('#heartImg9'),
    heart10 = $('#heartImg10');

var heartArray = [heart10, heart9, heart8, heart7, heart6, heart5, heart4, heart3, heart2, heart1];

/*
 *  This function removes one heart everytime the player dies. 
 */
function removeHearts() {
    for (var i = 0; i < deadCounter; i++){
        heartArray[i].hide();
    }
}





/*
exports.getScore = function(){
    return score
}

/*
function updateScore(){
    console.log(score)
    module.exports = {
        score
    }
}*/
