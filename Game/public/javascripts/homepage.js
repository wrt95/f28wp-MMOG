// $(document).ready(function () {
//helper function to make a random string of size length, this is to simulate a new user instead of etering new datsa each time
//take from:
//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

/*
function makeid(length) {

    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}
function login(){
    userin();
    passin();
}
*/

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
    if($(window).width() < 1000) {
        alert("Please increase the browser width")
    }
} 

/*
 * This function alerts the user if the height of their screen is too small  
 */
function screenHeightAlert(){
    if($(window).height() < 400) {
        alert("Please increase the browser height")
    }
} 


// Variables for the user inputs.
var username,
    password;

/* 
 *  This function changes the display from the buttons to the log in area. 
 */
function logOut() {
    $('#loginArea').show();
    $('.btn-group').hide();
}

/* 
 *  This function changes the display from login area to the new user area. 
 */
function newUser() {
    $('#loginArea').hide();
    $('#makeUser').show();
}

/* 
 *  This function is to create a new user. 
 *  It takes the username and password from the user input. 
 *  After the button is pressed, the display is changed to log in area. 
 */
function createUser() {
    username = $('#username').val();
    password = $('#password').val();
    
    // Used for debugging
    console.log(username);
    console.log(password);

    $('#loginArea').show();
    $('#makeUser').hide(); 

    module.exports = {
        username,
        password
    }
    // Empty the input area after text is displayed
    $('#username').val('');
    $('#password').val('');


}

/* 
 *  This function changes the display from login area to the buttons to use. 
 */
function save(){
    username = $('#username').val();
    password = $('#password').val();
    
    // Used for debugging
    console.log(username);
    console.log(password);

    $('#loginArea').hide();
    $('.btn-group').show(); 
    
    module.exports = {
        username,
        password
    }
    // Empty the input area after text is displayed
    $('#username').val('');
    $('#password').val('');
}


/*
 *  Function to hide/show the password when the tick box is clicked. 
 *  Help taken from: https://www.w3schools.com/howto/howto_js_toggle_password.asp
 */
function showPassword() {
    var visibility = document.getElementById("password");
    if (visibility.type === "password") {
        visibility.type = "text";
    } else {
        visibility.type = "password";
    }
  }




  
//var username = makeid(5);
//var username = "username";

//var password = makeid(5);
//var password = "password"