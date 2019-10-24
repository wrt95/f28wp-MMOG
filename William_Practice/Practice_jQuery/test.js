var p1 = $('#p1');

$(document).keydown(function(e) {
    var left = parseInt(p1.css('left') || 0);
    var top = parseInt(p1.css('top') || 0);
    if (e.which === 39 && ((left + p1.outerWidth() + 16) < 400)) {
        p1.css('left', "+=16px");
    } else if (e.which === 37 && (left > 0)) {
        p1.css('left', '-=16px');
    }
    else if (e.which === 40 && ((top + p1.outerHeight() + 16) < 400)) {
        p1.css('top', '+=16px'); 
    }
    else if (e.which === 38 && (top > 0)) {
        p1.css('top', '-=16px');
       // alert("test");
    }
});