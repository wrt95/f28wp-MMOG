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
<<<<<<< HEAD

=======
function login(){
    userin();
    passin();
}

var username;
var password;
>>>>>>> 4031127e6e1829cde2b20abaa22455dd28911784

function save(){
    username = $('#username').val();
    password = $('#password').val();
    
    console.log(username);
    console.log(password);

<<<<<<< HEAD
    module.exports = {
        username,
        password
    }
    username.val('');
    password.val('');

}


=======
    $('#username').val('');
    $('#password').val('');

}
module.exports = {
    username,
    password
}
>>>>>>> 4031127e6e1829cde2b20abaa22455dd28911784

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



