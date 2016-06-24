(function ( angular ) { 
	angular.module('ui.corecontrol').directive('ccNameProperty', ['$timeout', 'vcproSurface', 'appService', function($timeout, vcproSurface, appService) {
	return function ccNameProperty(scope, element, attr) {
	  var controlValue = "";
	  var id = (attr['ccId'] != undefined)?attr['ccId']:"";
	  vcproSurface.subscribeControlProperty(id, updateControlProperty);

	  function updateControlProperty(key, newvalue) {
	      if (key == kVControlProperty_Name)
	      {
	        if (controlValue == newvalue) return;
	        controlValue = newvalue;
	        draw();
	      }
	  }
	  function draw(){
	    element.html(controlValue);
	  }
	  draw()
	}}]);
})( angular );