(function ( angular ) {
	angular.module('ui.corecontrol').directive('ccTap', ['vcproSurface', function(vcproSurface) {
	return function ccTapDirective(scope, el, attr){
	    scope.tapId = attr['vcTap'];
	}
	}]);
})( angular );