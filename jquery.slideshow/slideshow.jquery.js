var currentTop = 0;
var maxTop = 0 - ( $("#uSlideContainer img").size() * 350 - 350);

$("#uSlideTop").click(function() {
	uSlideTop(1, 350, 2000);
});

$("#uSlideBottom").click(function() {
	uSlideTop(-1, 350, 2000);
});

$("#uSlideMain div").mousewheel(function(event, delta) {
    uSlideTop(delta, 50, 1000);
});

function uSlideTop(delta, length, duration) {
	switch( delta ) {
	case -1: 
		if ( currentTop > maxTop ) {
			currentTop -= length;
			$("#uSlideContainer img").stop().animate({top: currentTop}, duration);
		}
		break;
		
	case 1:
		if (currentTop < 0) {
			currentTop += length;
			$("#uSlideContainer img").stop().animate({top: currentTop}, duration);
		}
		break;
	}
}