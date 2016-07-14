(function ( angular ) {	
	corecontrolDirectives.directive('ccFader', 
	['$timeout', 'coreControl',function($timeout, coreControl) {
	return function ccFaderDirective(scope, element, attr) 
	{
		// set up to watch the height of the fader travel distance
		// and update the controller as it changes
		var isHorizontal;
		scope.enabled = true;
		var foo = element.children();
		var cap_element = foo["1"];
		var main_element = element["0"]
		if (!cap_element) cap_element=foo["0"];
		var heightIsSet = false;
		$timeout(updateHeightHack, 2000)
		function updateHeightHack()
		{
		  getHeight()
		  if (trackLength == 0)
		    $timeout(updateHeightHack, 2000)
		  else
		    heightIsSet = true
		}
		function getHeight()
		{
		  // check if a horizontal fader
		  if (main_element.offsetWidth > main_element.offsetHeight) isHorizontal = true;
		  if (isHorizontal) trackLength = main_element.offsetWidth - cap_element.offsetWidth;
		    else trackLength = main_element.offsetHeight - cap_element.offsetHeight;
		}
		var controlValue = 0;
		var touchStartParameters = {touched:0};
		var previousControlValue=0;
		var trackLength = 0;
		var id = (attr['ccId'] != undefined)?attr['ccId']:"";
		id = (attr['vcId'] != undefined)?attr['vcId']:id;
		coreControl.subscribe(id, updateControlValue);
		coreControl.subscribeControlProperty(id, updateControlProperty);

		function updateControlValue(newvalue) {
		  if (touchStartParameters.touched==1) return;
		  if (controlValue == newvalue) return;
		  previousControlValue=controlValue;
		  controlValue = newvalue;
		  draw();
		}
		function updateControlProperty(key, value)
		{
			if (key == kVControlProperty_Enabled)
			{
		  		scope.enabled = (value != 0);
		  		draw()
			}
		}


		function draw()
		{
			if (!heightIsSet) getHeight()
			if (trackLength == 0)return;
			var top = -Math.floor(controlValue * trackLength);
			var left = Math.floor(controlValue * trackLength);
			var diff = Math.abs(previousControlValue-controlValue);
			// webkit transitions can not be cancelled. this logic helps when changes come in that
			// are close together so that no animation happens.
			
			  cap_element.style['-webkit-transition-duration'] = '0';
			  cap_element.style['-moz-transition-duration'] = '0';
			

			if (isHorizontal){
			  cap_element.style['-webkit-transform'] = 'translate3d('+ left +'px, 0, 0)';
			  cap_element.style['transform'] = 'translate3d('+ left +'px, 0, 0)';

			} else {
			  cap_element.style['-webkit-transform'] = 'translate3d(0, ' + top + 'px, 0)';
			  cap_element.style['transform'] = 'translate3d(0, ' + top + 'px, 0)';
			}

			cap_element.style['opacity'] = scope.enabled?1.0:0.4;
		}

		scope.touch = function(event) {
		  if (!scope.enabled) return;
		  var x = event.clientX;
		  var y = event.clientY;
		  touchStartParameters = {touched:1, x: x, y: y, controlValue: controlValue };
		  coreControl.touchControl(scope.id, 1.0);
		}
		scope.move = function(event) {
			console.log("moved");
			if (!scope.enabled) return;
		  	if (trackLength == 0)return;
			var x = event.clientX;
			var y = event.clientY;
			if (touchStartParameters.touched==0) return;

			if (isHorizontal){
				var offset = (x-touchStartParameters.x);
				var value = Math.min(Math.max(0, Number(touchStartParameters.controlValue) + (offset / trackLength)), 1);
			} else {
				var offset = (touchStartParameters.y - y);
				var value = Math.min(Math.max(0, Number(touchStartParameters.controlValue) + (offset / trackLength)), 1);
			}

		  	if (value !== controlValue) {
		      previousControlValue=controlValue;
		      controlValue = value;
		      coreControl.setControlValue(scope.id, controlValue);
		      draw();
		  	}
		}
		scope.release = function(event) {
			if (!scope.enabled) return;
		  	touchStartParameters = {touched:0};
		  	coreControl.touchControl(scope.id, 0.0);
		}
		coreControl.setControlValue(scope.id, controlValue);
	}
	}]);
})( angular );




