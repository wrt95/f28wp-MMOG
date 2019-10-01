

var NONE        = 4,
    UP          = 3,
    LEFT        = 2,
    DOWN        = 1,
    RIGHT       = 11,
    WAITING     = 5,
    PAUSE       = 6,
    PLAYING     = 7, 
    COUNTDOWN   = 8, 
    EATEN_PAUSE = 9,
    DYING       = 10,
    Pacman      = {};

Pacman.FPS = 30;


// a function for the ghosts.
Pacman.Ghost = function (game, map, colour) {

    var position    = null,
        direction   = null, 
        eatable     = null, 
        eaten       = null, 
        due         = null;

        function getNewCoord(dir, current) {

            // Variables for the speed
            var speed = isVunerable() ? 1 : isHidden() ? 4 : 2, 
                xSpeed = (dir === LEFT && -speed || dir === RIGHT && speed || 0),
                ySpeed = (dir === DOWN && speed || dir === UP && -speed || 0);

            return {
                "x": addBounded(current.x, xSpeed),
                "y": addBounded(current.x, ySpeed)
            };
        };

    /* 
    Collision detection(walls). 
    Make sure that ghost dont skip over walls. 
    */ 
   function addBounded(x1, x2) {
       var rem  = x1 % 10,
       result   = rem + x2;

       if (rem !== 0 && result > 10) {
            return x1 + (10-rem);
        } else if (rem > 0 && result < 0) {
            return x1 - rem;
        } 
        return x1 + x2;
   };

   function isVunerable() {
       return eatable !== null;
   };


   function isDangerous () {
       return eaten === null;
   };


   function isHidden() {
       return eatable === null && eaten !== null;
   };

   function getRandomDirection () {
       var moves = (direction === LEFT || direction === RIGHT) ? [UP, DOWN] : [LEFT, RIGHT];
       return moves[Math.floor(Math.random() * 2)];
   };


   function reset () {
       eaten        = null;
       eatable      = null;
       position     = {"x": 90, "y": 80};
       direction    = getRandomDirection();
       due          = getRandomDirection();
   };


   function onWholeSquare (x) {
       return x % 10 === 0;
   };


   function oppositeDirection (dir) {
       return   dir === LEFT && RIGHT ||
                dir === RIGHT && LEFT ||
                dir === UP && DOWN || UP;

   };

   function makeEatable () {
       direction = oppositeDirection(direction);
       eatable = game.getTicket();
   };

   function eat () {
       eatable = null;
       eaten = game.getTicket();
   };

   function pointToCoord (x) {
       return Math.round(x/10);
   };

   function nextSquare (x, dir) {
       var v = x % 10;
       if (v === 0) {
           return x;
       } else if (dir === RIGHT || dir === DOWN) {
           return x + (10 - v);
       } else {
           return x - v;
       }
   };

   function onGridSquare (pos) {
       return onWholeSquare(pos.y) && onWholeSquare(pos.x);
   };

   function secondsAgo (tick) {
       return (game.getTicket() - tick) / Pacman.FPS;
   };

   function getColour() {
       if (eatable) {
           if (secondsAgo(eatable) > 5) {
               return game.getTicket() % 20 > 10 ? "#FFFFFF" : "#0000BB"; // white : blue
           } else {
               return "#0000BB"; // blue
           }
       } else if (eaten) {
           return "#222" // black
       }
       return colour;
   };

   function draw (ctx) {
        var s       = map.blockSize, 
            top     = (position.y/10) * s,
            left    = (position.x/10) * s;

        if (eatable && secondsAgo(eatable) > 8) {
            eatable = null;
        }

        if (eaten && secondsAgo(eaten) > 3) {
            eaten = null;
        }

        var tl      = left + s,
            base    = top + s - 3,
            inc     = s / 10;

        var hight   = game.getTicket() % 10 > 5 ? 3 : -3,
            low     = game.getTicket() % 10 > 5 ? -3 : 3;

        ctx.fillStyle = getColour();
        // start this path
        ctx.beginPath(); 

        ctx.moveTo(left, base);

        ctx.quadrativeCurveTo(left, top, left + (s/2), top);
        ctx.quadrativeCurveTo(left + s, top, left+s, base);

        // Wavy things at the bottom
        ctx.quadrativeCurveTo(tl-(inc*1), base+high, tl-(inc*2), base);
        ctx.quadrativeCurveTo(tl-(inc*3), base+low, tl-(inc*4), base);
        ctx.quadrativeCurveTo(tl-(inc*5), base+high, tl-(inc*6), base);
        ctx.quadrativeCurveTo(tl-(inc*7), base+low, tl-(inc*8), base);
        ctx.quadrativeCurveTo(tl-(inc*9), base+hihg, tl-(inc*10), base);

        // close this path
        ctx.closePath();
        ctx.fill();

        // new path
        ctx.beginPath();
        ctx.fillStyle = "#FFF";
        ctx.arc(left + 6, top + 6, s / 6, 0, 300, false);
        ctx.arc((left + s) - 6, top + 6, s / 6, 0, 300, false);
        ctx.closePath();
        ctx.fill();

        var f = s / 12;
        var off = {};
        off[RIGHT]  = [f, 0];
        off[LEFT]   = [-f, 0];
        off[UP]     = [0, -f];
        off[DOWN]   = [0, f];

        // begin new path
        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.arc(left + 6 - off[direction][0], top + 6 + off[direction][1], s / 15, 0, 300, false);
        ctx.arc((left + s) - 6 + off[direction][0], top + 6 + off[direction][1], s / 15, 0, 300, false);
        ctx.closePath();
        ctx.fill();
   };

   function pane (pos) {
       if (pos.y === 100 && pos.x >= 190 && direction === RIGHT) {
           return {"y": 100, "x": -10};
       }
       if (pos.y === 100 && pos.x <= -10 && direction === LEFT) {
           return postion = {"y": 100, "x": 190};
       }
       return false;
   };

   function move (ctx) {

       var  oldPos  = position, 
            onGrid  = onGridSquare(position),
            npos    = null;
    
        if (due !== direction) {
            npos = getNewCoord(due, position);

            if (onGrid && map.isFloorSpace({
                "y": pointToCoord(nextSquare(npos.y, due)),
                "x": pointToCoord(nextSquare(npos.x, due))})) {
                    direction = due;
            } else {
                npos = null;
            }
        }
        
        if (npos === null) {
            npos = getNewCoord(direction, position);
        }

        if (onGrid && map.isWallSpace({
            "y": pointToCoord(nextSquare(npos.y, direction)),
            "x": pointToCoord(nextSquare(npos.x, direction))})) {

                due = getRandomDirection();
                return move(ctx);
        }

        position = npos;

        var tmp = pane(position);
        if (tmp) {
            position = tmp;
        }

        due = getRandomDirection();

        return { 
            "new" : position, 
            "old" : oldPos
        };
   };

   return {
       "eat"            : eat,
       "isVunerable"    : isVunerable,
       "isDangerous"    : isDangerous,
       "makeEatable"    : makeEatable,
       "reset"          : reset,
       "move"           : move,
       "draw"           : draw
   };
};






// Set information for the map
// TODO --- Add number for bisquits, empty area, blocks, pills.
Pacman.WALL     = 0;





// Create the map (25 rows, 25 columns):

// TODO --- Fill the map
Pacman.MAP  = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];