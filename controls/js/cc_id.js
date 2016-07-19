(function ( angular ) {	
	angular.module('ui.corecontrol').directive('ccId', ['coreControl', function(coreControl) {
	return function ccIdDirective(scope, element, attr){
	    // bind to vcontrol
	    scope.id = attr['ccId'];

	    scope.enabled = coreControl.getControlEnabled(scope.id)
		if (scope.id[0] == "[")
			scope.id = JSON.parse(attr['ccId']);
		scope.numSteps = coreControl.getNumControlSteps(scope.id);
		if (scope.updateControlValue)
			coreControl.subscribe(scope.id, scope.updateControlValue);
		if (scope.updateControlProperty)
			coreControl.subscribeControlProperty(scope.id, scope.updateControlProperty);
	    scope.$on('$destroy', destroy)
	    function destroy(){
	        coreControl.unsubscribe(scope.id);
	    }
	}
	}]);
})( angular );