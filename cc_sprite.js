(function ( angular ) { 
	angular.module('ui.corecontrol').directive('ccSprite', ['vcproSurface', function(vcproSurface) {
	return function ccSpriteDirective(scope, el, attr){
	    var id = attr['vcId'];
	    var numSteps = vcproSurface.getNumControlSteps(id);
	    scope.getHeight = function()
	    {
	      return el["0"].offsetHeight
	    }
	}
}]);

});