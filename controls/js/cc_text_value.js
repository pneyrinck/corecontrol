(function ( angular ) { 
	angular.module('ui.corecontrol').directive('ccTextValue', ['$timeout', 'vcproSurface', 'appService', function($timeout, vcproSurface, appService) {
	return function ccTextValueDirective(scope, element, attr) {
	  var controlValue = "";
	  var id = (attr['ccId'] != undefined)?attr['ccId']:"";
	  id = (attr['vcId'] != undefined)?attr['vcId']:id;
	  vcproSurface.subscribe(id, updateControlValue);
	  function updateControlValue(value) {
	      var newvalue = String(value);
	      if (controlValue == newvalue) return;
	      controlValue = newvalue;
	      draw();
	  }
	  function draw(){
	    element.html(controlValue);
	  }
	  draw()
	}}]);

})( angular );