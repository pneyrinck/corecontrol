(function ( angular ) {

  angular.module('ui.corecontrol').directive('ccBtnTouch', ['coreControl', function(coreControl) {
  return function ccButtonTouchDirective(scope, el, attr){
  	var latchMode = (attr['ccLatch'] != undefined)?true:false;
    var attrId = "";
    if (attr['ccBtnTouch'])
      attrId = attr['ccBtnTouch'];
    else if (attr['vcId'])
      attrId = attr['vcId'];
    else if (attr['ccId'])
      attrId = attr['ccId'];
      //    console.log("attr['vcId'] = "+attr['vcId']+" scope.id = "+scope.id)
      function touchStart (x, y) {
  		if (latchMode){
  			var curValue = coreControl.getControlValue(attrId);
  			coreControl.setControlValue(attrId, curValue>0.0?0.0:1.0);
  		}
  		else
  			coreControl.setControlValue(attrId, 1.0);
      }
      function touchEnd(x, y) {
  		if (latchMode) return;
          coreControl.setControlValue(attrId, 0.0);
      }
      installTouchHandler(el["0"], {touchStart:touchStart, touchMove:0, touchEnd:touchEnd});
  }
  }]);

  function installTouchHandler(element, handler, allowDefault) {
    if (!element) return;
    if( typeof(window.ontouchstart) == 'undefined'){
        if (handler.touchStart) element.addEventListener("mousedown", mousedown);
    }
    else{
        if (handler.touchStart) element.addEventListener("touchstart", touchstart);
        if (handler.touchMove) element.addEventListener("touchmove", touchmove);
        if (handler.touchEnd) element.addEventListener("touchend", touchend);
    }
    function mousedown(event) {
        if (event.button === 2) return; // ignore right clicks
        if (!allowDefault) event.preventDefault();
          event.stopPropagation();
        if (handler.touchMove) document.body.addEventListener("mousemove", mousemove);
        if (handler.touchEnd) document.body.addEventListener("mouseup", mouseup);
        if (handler.touchStart)
            handler.touchStart(event.pageX - element.offsetLeft, event.pageY - element.offsetTop, element);
    }
    function mousemove(event) {
        if (!allowDefault) event.preventDefault();
        if (handler.touchMove)
            handler.touchMove(event.pageX - element.offsetLeft, event.pageY - element.offsetTop, element);
    }
    function mouseup(event) {
        if (handler.touchEnd)
            handler.touchEnd(event.pageX - element.offsetLeft, event.pageY - element.offsetTop, element);
        if (handler.touchMove) document.body.removeEventListener("mousemove", mousemove);
        if (handler.touchEnd) document.body.removeEventListener("mouseup", mouseup);
    }
    function touchstart(event) {
        // this is a work-around, to prevent mouse event handling under a webview
        element.onmousedown = null;
        element.onmousemove = null;
        element.onmouseup = null;
        var touch = event.targetTouches[0];
        if (!allowDefault) event.preventDefault(); // prevent touch being converted to mouse event
        if (handler.touchStart)
            handler.touchStart(touch.pageX - element.offsetLeft, touch.pageY - element.offsetTop, element, event);
    }
    function touchmove(e) {
        var touch = e.targetTouches[0];
        if (!allowDefault) e.preventDefault(); // prevents the page scrolling
        if (handler.touchMove) {
            handler.touchMove(touch.pageX - element.offsetLeft, touch.pageY - element.offsetTop, element, e);
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

})( angular );