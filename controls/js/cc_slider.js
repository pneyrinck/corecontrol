(function ( angular ) {
	angular.module('ui.corecontrol').directive('ccSlider', function() {return vcSliderDirective;});
	function vcSliderDirective(scope, element, attr) {
	    var foo = element.children();
	    var cap_element = foo["1"];
	    if (!cap_element) cap_element=foo["0"];
		var trackElement = element["0"];
		var isHorizontal = false;
		var trackLength = element["0"].offsetHeight - cap_element.offsetHeight;
		if (trackElement.offsetWidth > trackElement.offsetHeight){
			isHorizontal = true;
			trackLength = element["0"].offsetWidth - cap_element.offsetWidth;
		}
		scope.updateTrackLength(trackLength, isHorizontal);
	}
})( angular );