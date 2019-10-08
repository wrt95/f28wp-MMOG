var canvas = document.getElementById('myCanvas'),
context = canvas.getContext('2d');

make_base();

function make_base() {
    base_image = new Image();
    base_image.src = 'images/blueball.png';
    base_image.onload = function(){
        context.drawImage(base_image, 0, 0);
    }
}