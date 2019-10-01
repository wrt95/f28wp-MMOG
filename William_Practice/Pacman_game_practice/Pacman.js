

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


   function oppositeDirection (dir) {
       return   dir === LEFT && RIGHT ||
                dir === RIGHT && LEFT ||
                dir === UP && DOWN || UP;

   }
}