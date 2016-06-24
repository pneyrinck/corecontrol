(function ( angular ) { 
	angular.module('ui.corecontrol').directive('ccTextProperty', ['$timeout', 'vcproSurface', 'appService', function($timeout, vcproSurface, appService) {
	return function ccTextPropertyDirective(scope, element, attr) {
	  var controlValue = "";
	  var id = (attr['ccId'] != undefined)?attr['ccId']:"";
	  vcproSurface.subscribeControlProperty(id, updateControlProperty);

	  function updateControlProperty(key, newvalue) {
	      if (key == kVControlProperty_ValueString)
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