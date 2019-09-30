
// function to print the current page
function print_current_page() {
    window.print();
}

// function to do addition on two input numbers
function addBy() {
    num1 = document.getElementById("firstNumber").value;
    num2 = document.getElementById("secondNumber").value;
    document.getElementById("result").innerHTML = (+num1) + (+num2);
}

// function to do subraction on two input numbers
function subtractBy() {
    num1 = document.getElementById("firstNumber").value;
    num2 = document.getElementById("secondNumber").value;
    document.getElementById("result").innerHTML = num1 - num2;
}

// function to do multiplication on two input numbers
function multiplyBy() {
    num1 = document.getElementById("firstNumber").value;
    num2 = document.getElementById("secondNumber").value;
    document.getElementById("result").innerHTML = num1 * num2;
}

// function to do division on two input numbers
function divideBy() {
    num1 = document.getElementById("firstNumber").value;
    num2 = document.getElementById("secondNumber").value;
    document.getElementById("result").innerHTML = num1 / num2;
}

// function to get the remainder from two input numbers
function remainder() {
    num1 = document.getElementById("firstNumber").value;
    num2 = document.getElementById("secondNumber").value;
    document.getElementById("result").innerHTML = num1 % num2;
}

// function to do power on two input numbers
function doPower() {
    num1 = document.getElementById("firstNumber").value;
    num2 = document.getElementById("secondNumber").value;
    document.getElementById("result").innerHTML = num1 ** num2;
}

// function to reverse an input string
function doReverse (str) {
    str = document.getElementById("firstString").value;
    document.getElementById("stringResult").innerHTML = str.split("").reverse().join("");
    return str;
}
