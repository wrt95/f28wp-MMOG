// $(document).ready(function () {
//helper function to make a random string of size length, this is to simulate a new user instead of etering new datsa each time
//take from:
//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
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
 //login();
function userin() {
    //var username = prompt("Please enter your username:")
    var username = makeid(5);
    //var username = "username"
    return username;
}
function passin(){
    //var password = prompt("Enter enter your password:"
    var password = makeid(5);
    //var password = "password"
    return password;
}
//newAccount() function
//if username is in DB, enter a different username
//else add to DB


var username = userin();
var password  = passin();
module.exports = {
    username,
    password
}
