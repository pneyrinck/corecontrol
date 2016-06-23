app.service('touchHandler', [function appService(){
  var self = this
  this.installTouchHandler = function(element, handler, allowDefault) {
    
    if (!element) return;
    var elRect = element.getBoundingClientRect();

    if( typeof(window.ontouchstart) == 'undefined'){
        if (handler.touchStart) element.addEventListener("mousedown", mousedown);
    }
    else{
        if (handler.touchStart) element.addEventListener("touchstart", touchstart);
        if (handler.touchMove) element.addEventListener("touchmove", touchmove);
        if (handler.touchEnd) element.addEventListener("touchend", touchend);
    }
    function mousedown(event) {
        var elRect = element.getBoundingClientRect();
        if (event.button === 2) return; // ignore right clicks
        if (!allowDefault) event.preventDefault();
		      event.stopPropagation();
        if (handler.touchMove) document.body.addEventListener("mousemove", mousemove);
        if (handler.touchEnd) document.body.addEventListener("mouseup", mouseup);
        if (handler.touchStart)
          handler.touchStart(event.pageX-elRect.left, event.pageY-elRect.top, element);
      
    }
    function mousemove(event) {
        if (!elRect) elRect = element.getBoundingClientRect();
        if (!allowDefault) event.preventDefault();
        if (handler.touchMove)
          handler.touchMove(event.pageX-elRect.left, event.pageY-elRect.top, element);
    }
    function mouseup(event) {
        if (handler.touchEnd)
          handler.touchEnd(event.pageX-elRect.left, event.pageY-elRect.top, element);
        if (handler.touchMove) document.body.removeEventListener("mousemove", mousemove);
        if (handler.touchEnd) document.body.removeEventListener("mouseup", mouseup);
    }
    function touchstart(event) {
        if (!elRect) elRect = element.getBoundingClientRect();
        // this is a work-around, to prevent mouse event handling under a webview
        element.onmousedown = null;
        element.onmousemove = null;
        element.onmouseup = null;
        var touch = event.targetTouches[0];
        if (!allowDefault) event.preventDefault(); // prevent touch being converted to mouse event
        if (handler.touchStart)
            handler.touchStart(touch.pageX - elRect.left, touch.pageY - elRect.top, element, event);
    }
    function touchmove(e) {
        if (!elRect) elRect = element.getBoundingClientRect();
        var touch = e.targetTouches[0];
        if (!allowDefault) e.preventDefault(); // prevents the page scrolling
        if (handler.touchMove) {
            handler.touchMove(touch.pageX-elRect.left, touch.pageY-elRect.top, element, e);
        }
    }
    function touchend(e) {
        if (!allowDefault) e.preventDefault();
        if (handler.touchEnd) {
            if (handler.touchEnd(0,0, element, e))
                e.preventDefault();
        }
    }
  }
}
]);
