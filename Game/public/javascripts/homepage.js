// $(document).ready(function () {

function userin() {
    //var username = prompt("Please enter your username:")
    var username = "Enemy";
    return username;
}
function passin(){
    // var password = prompt("Enter enter your password:")
    var password = "ILOVEYOU";
    return password;
}
var username = userin();
var password  = passin();
module.exports = {
    username,
    password
}
