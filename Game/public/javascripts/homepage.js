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


//newAccount() function
//if username is in DB, enter a different username
//else add to DB

/*
var username = userin();
var password  = passin();
*/



