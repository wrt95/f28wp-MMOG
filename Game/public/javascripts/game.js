

var gameArea = $('#gameArea');          // variable for the game area
var score = 0;                          // Variable for the score

var blueball = $('#blueball');          // Variable for the blue ball
// var greenball = $('#greenball');        // Variable for the blue ball

//timer function 
var timer; 

//lobby timer function 
var timerL; 

//This function sets the max timer for the clock and calls the other function that deducts the seconds 
//Help taken from this link https://stackoverflow.com/questions/40638402/javascript-countdown-timer-with-start-stop-buttons?fbclid=IwAR30qwUDywIojiyo_1pxMh3Jt3eyOY6izMIApJG6qU7T2pOLHXtiG8cuIaw 
function clock(){
    timer = setInterval(countDown, 1000); //calling the timer every second 
    var maxTime = 60; 

    //This function takes the seconds away from the maximum time 
    function countDown() {
        document.getElementById("timerID").innerHTML = --maxTime; //taking 1 away from the timer 
        if(maxTime == 0 ){
            clearInterval(timer) //clearing the timer when it gets to 0 
            var egImg = $('#endGame'); //creating a variable set to 'GAME OVER' image 
            egImg.show(); //Showing the game over image 
            gameArea.hide(); //hiding the game area


            // Delete what is stored in right
            $('#right').hide();
        }
      }
    }

function gameLobby(){
    killBall();
}

//Timer to countdown the time until the game can start
function lobbyClock(){
    timerL = setInterval(countDownL, 1000); 
    var maxTimeL = 10;
    
    function countDownL(){
        document.getElementById("timerIDL").innerHTML= --maxTimeL;
        if(maxTimeL == 0){
        //  function gameLobby(); 
        clearInterval(timerL) //Clearing the timer when it gets to 0, to stop it counting into the negative 
            
        }
    }
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

//Function to start the game when the start button is clicked
function startButtonClick(){
    newGame();  
}


/* 
For the following function, i found help at this link: https://stackoverflow.com/questions/4950575/how-to-move-a-div-with-arrow-keys
It is used to make the ball move around in the gamearea.
*/
$(document).ready(function () {
    // Set score initially to 0, and add it to the html.
    score = 0;
    $('#score').html(score);
    lobbyClock(); //Starting the lobby clock when the screen is loaded 

    // Variables for 
    var width = gameArea.width() - blueball.width(),    // width:        The maximal left/top value for gameArea
    //  widthGreen = gameArea.width() - greenball.width(),    // width:        The maximal left/top value for gameArea

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

    
    var  counter = 0; //used for making the clock start on one click rather than multiple clicks 

    // This function sets the new values of the ball. It is done when a button is pressed. 
    $(window).keydown(function(e) { 
       // clock(); //uncomment for demo 
        counter = counter + 1; //adding 1 to the counter
        //the timer starts when the counter = 1 *the first button press*
        //equal to 1 so it doesnt keep re starting with every button press 
        if(counter == 1){
            clock(); 
        }
     
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
                [1, 0, 0, 1, 1, 1, 1, 1, 1, 2],
                [1, 0, 1, 1, 0, 1, 0, 0, 0, 0],
                [1, 0, 1, 0, 0, 1, 0, 1, 1, 1],
                [2, 0, 1, 2, 0, 1, 1, 2, 0, 2],
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
    console.log(leftTopX, leftTopY);

    // if top left corner is 2, remove the coin
    if (gameArray[leftTopY][leftTopX] === 2) {
        removeCoin(leftTopY, leftTopX);

       // var coinX = leftTopX;
       // var coinY = leftTopY;

        // after 10 seconds, bring the coins back
        setTimeout(function() {
           bringBackCoins();
        }, 10000);
    }
    // if top right corner is 2, remove the coin
    else if (gameArray[leftTopY][rightTopX] === 2) {
        removeCoin(leftTopY, rightTopX);

       // var coinX = leftTopX;
       // var coinY = leftTopY;

        // after 10 seconds, bring the coins back
        setTimeout(function() {
            bringBackCoins();
        }, 10000);

    }
    // if bottom left corner is 2, remove the coin
    else if (gameArray[leftBottomY][leftTopX] === 2) {
        removeCoin(leftBottomY, leftTopX);

       // var coinX = leftTopX;
       // var coinY = leftTopY;

        // after 10 seconds, bring the coins back
        setTimeout(function() {
            bringBackCoins();
        }, 10000);
    }
    // if bottom right corner is 2, remove the coin
    else if (gameArray[leftBottomY][rightTopX] === 2) {
        removeCoin(leftBottomY, rightTopX);

       // var coinX = leftTopX;
       // var coinY = leftTopY;
 
        // after 10 seconds, bring the coins back
        setTimeout(function() {
            bringBackCoins();
        }, 10000);
    }

    // if top left corner or top right corner or bottom left corner or bottom right corner is 0, kill the ball.
    if (gameArray[leftTopY][leftTopX] === 0 || gameArray[leftTopY][rightTopX] === 0 || gameArray[leftBottomY][leftTopX] === 0 || gameArray[leftBottomY][rightTopX] === 0) {
        killBall();   
        deadColour();
        
    }
}
var deadCounter = 0;

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
    deadCounter++;
}



function deadColour () {
    // Array of colours
    var colors = ["red","green","blue","yellow", "orange", "purple", "lime"];

    // Loop up through deadcounter. 
    for (var i = 0; i < deadCounter; i++) {

        // make the colour to display. 
        var color = colors[Math.floor(Math.random()*colors.length)] 

        // create an element, and set the colour of it. 
        tmp = document.createElement("p");
        tmp.style.color = color;

        // append it to the right area of the game. 
        $("#right").append(tmp);
    }
    // Set the text.
    tmp.innerHTML = "YOU DIED!";
}

// Array for all the coins
var coinArray = [$('#coin1'), $('#coin2'), $('#coin3'), $('#coin4'), $('#coin5'),  
                 $('#coin6'), $('#coin7'), $('#coin8'), $('#coin9')]

var coin1 = $('#coin1'), 
    coin2 = $('#coin2'), 
    coin3 = $('#coin3'), 
    coin4 = $('#coin4'), 
    coin5 = $('#coin5'), 
    coin6 = $('#coin6'), 
    coin7 = $('#coin7'), 
    coin8 = $('#coin8'), 
    coin9 = $('#coin9');



/* 
This function removes the coin and increments the score of the user. 
*/
function removeCoin (y, x) {
    // Looping through the array. Create X and Y value for the index coin. 
    for (var i = 0; i < coinArray.length; i++) {
        var coinX = Math.floor((coinArray[i].position().left) / 60);
        var coinY = Math.floor((coinArray[i].position().top) / 60); 

        // if the coins x and y is equal to whats passed in, hide the coin. 
        if (coinX === x && coinY === y) {
            coinArray[i].hide();
            gameArray[y][x] = 1; 
        }       
    }
    score++;
    $('#score').html(score);  
}

/*
function moveSquare () {

    var ob14 = $('#ob14'), 
        ob15 = $('#ob15'),
        ob16 = $('#ob16'),
        ob17 = $('#ob17');

    ob14.css({
        left: '40%', 
        top: '40%'  
    })
}

function moveSquareBack () {

    var ob14 = $('#ob14'), 
        ob15 = $('#ob15'),
        ob16 = $('#ob16'),
        ob17 = $('#ob17');

    ob14.css({
        left: '40%', 
        top: '30%'  
    })
}


setInterval(function() {
    moveSquare();
}, 3000);
*/



// Function to bring the coins back
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

// Below are 13 functions, one for each coin. 
// It sets the coin to be visible, and changes the 
// value in the 2D array to 2, which represents a coin. 
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
function bringBack9 () {   
    coinArray[8].show();
    gameArray[9][7] = 2;
}

// function for new game
function newGame() {
    window.location.reload();
}

// function to leave game
/* function leaveGame(gameArea) {
    document.getElementById(gameArea).innerHTML= "Thanks for playing!";
}*/

