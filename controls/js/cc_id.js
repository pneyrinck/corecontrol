(function ( angular ) {	
	angular.module('ui.corecontrol').directive('ccId', ['vcproSurface', function(vcproSurface) {
	return function ccIdDirective(scope, element, attr){
	    // bind to vcontrol
	    scope.id = attr['ccId'];

	    scope.enabled = vcproSurface.getControlEnabled(scope.id)
		if (scope.id[0] == "[")
			scope.id = JSON.parse(attr['ccId']);
		scope.numSteps = vcproSurface.getNumControlSteps(scope.id);
		if (scope.updateControlValue)
			vcproSurface.subscribe(scope.id, scope.updateControlValue);
		if (scope.updateControlProperty)
			vcproSurface.subscribeControlProperty(scope.id, scope.updateControlProperty);
	    scope.$on('$destroy', destroy)
	    function destroy(){
	        vcproSurface.unsubscribe(scope.id);
	    }
	}
	}]);
})( angular );