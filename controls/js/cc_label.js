(function ( angular ) { 	
	angular.module('ui.corecontrol').directive('ccLabel', ['vcproSurface', function(vcproSurface){
	return function ($scope, element, attr) {
	    $scope.label = ""
	    var id = (attr['ccId'] != undefined)?attr['ccId']:"";
	    id = (attr['vcId'] != undefined)?attr['vcId']:id;
	    vcproSurface.subscribe(id, updateControlValue);

	    function updateControlValue(value) {
	        var newValue = String(value);
	        if (newValue == $scope.label) return;
	        $scope.label = newValue;
	    }
	  }
	}]);
})( angular );