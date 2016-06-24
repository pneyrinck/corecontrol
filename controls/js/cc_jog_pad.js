(function ( angular ) {	
	angular.module('ui.corecontrol').directive('ccJogPad', ['vcproSurface', function(vcproSurface){
	return function ccJogPadDirective(scope, element, attr) {
		var lastpoint;
		var gestureInProgress=true;
	    function touchStart (x, y) {
			gestureInProgress = true;
			vcproSurface.touchControl(attr['ccId'], 1.0);
			lastpoint = x;
	    }
	    function touchMove(x, y) {
			if (!gestureInProgress) return;
			var numTicks=0;
			numTicks=Math.trunc((x-lastpoint) * 0.25);	//ad hoc for iPad
			if (numTicks != 0)
			{
				vcproSurface.setControlValue(attr['ccId'], numTicks);
				lastpoint = x;
			}
	    }
	    function touchEnd(x, y) {
			gestureInProgress = false;
			vcproSurface.touchControl(attr['ccId'], 0.0);
	    }
	    installTouchHandler(element["0"], {touchStart:touchStart, touchMove:touchMove, touchEnd:touchEnd});
	}
	}]);
})( angular );