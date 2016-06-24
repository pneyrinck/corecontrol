(function ( angular ) { 	
	angular.module('ui.corecontrol').directive('ccLabel', ['vcproSurface', function(vcproSurface) {
	return function ccLabelDirective(scope, element, attr){
	    // bind to vcontrol
	    var id="";
		if (attr['vcId'])
			id = attr['vcId'];
		else if (attr['ccId'])
			id = attr['ccId'];
	    var label = vcproSurface.getControlLabel(id);
		if (label)
			scope.label = label;
	}
	}]);
})( angular );