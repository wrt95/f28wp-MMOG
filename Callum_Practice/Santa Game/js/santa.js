

var myTime  = null;
var xdir    = 0;
var ydir    = 0;
var yvel    = -100;

function Timer() // update loop for game
{
	// Get current positions
	var y =document.getElementById('football').offsetTop;
	var x =document.getElementById('football').offsetLeft; 
	
	// Movement velocities (positions change over time)
	yvel = yvel - 1;
	if ( yvel < -100 ) yvel = -100;
	if ( y    >  200  ) y    = 200;
	xs = xs + 1;
	if ( xs   > 500 ) xs = -200;
	if ( x < 0   ) x = 0;
	if ( x > 600 ) x = 600;
	
	// New positions
	y = y + ydir - yvel*0.1;
	x = x + xdir;
	
    // Store positions	
	document.getElementById('i1').style.top= y + "px"; // vertical movment
	document.getElementById('i1').style.left= x + "px"; // horizontal movment
	document.getElementById('i2').style.left= xs + "px"; // horizontal movment
	
	myTime=setTimeout('Timer()',10);
	
	document.getElementById("msg").innerHTML="Santa" + xs;
}

// when key is pressed  (user input)
function KeyDown(e) 
{
  if (e.keyCode == 39) {  xdir =  2;   } // right key
  if (e.keyCode == 37) {  xdir = -2;   } // left key
  if (e.keyCode == 38 && yvel<-70 ) {  yvel = 70;   } // up key
}

function Reset1()
{

	xdir = 0;
	ydir = 0;
	
	clearTimeout(myTime);
	document.getElementById('i1').style.left= "500px";
	document.getElementById('i1').style.top= "200px";
	document.getElementById("msg").innerHTML="";

	// Add an event listener to the keypress event.
	document.addEventListener("keydown", KeyDown, false);

	Timer();
	
}