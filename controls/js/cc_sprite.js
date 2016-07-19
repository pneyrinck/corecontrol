(function ( angular ) { 
	angular.module('ui.corecontrol').directive('ccSprite', ['coreControl', function(coreControl) {
		return function ccSpriteDirective(scope, el, attr){
		    var id = attr['vcId'];
		    var numSteps = coreControl.getNumControlSteps(id);
		    scope.getHeight = function()
		    {
		      return el["0"].offsetHeight
		    }
		}
	}]);

	angular.module('ui.corecontrol').controller('ccBtnSpCtrl', ['$scope','coreControl',
	function ccButtonSpriteController($scope, coreControl)
	{
	    $scope.enabled = true;
	    $scope.value = 0.0;
	    $scope.index = 0;
	    $scope.numSteps = 2;
	    $scope.label = "";
	    $scope.updateStyle = function (style) {
	        $scope.style=style;
	    };
	    $scope.updateLabel = function (label) {
	        $scope.label=label;
	    };
	    $scope.updateControlValue = function (value) {
	      $scope.value = value;
	      var step=value; //valueToIndex(value, $scope.numSteps);
	      if (step == $scope.controlStep)return;
	      $scope.controlStep = step;
			  draw();
	    };
	    function draw()
	    {
	      if ($scope.getHeight == undefined) return
	      var height = $scope.getHeight()
	      var style = {};
	      style['-webkit-transform'] = 'translate3d(0, ' + (-height * $scope.controlStep) + 'px, 0)';
	      style['transform'] = 'translate3d(0, ' + (-height * $scope.controlStep) + 'px, 0)';
	      style['opacity'] = $scope.enabled?1.0:0.4;
	      $scope.style_sprite=style;
	    }
	    $scope.updateProperty = function (value) {
	        if (value["label"]){
	            $scope.label = value["label"];
	        }
	    }
	    $scope.touch = function(event) {
	        coreControl.setControlValue($scope.id, 1.0);
	    }
	    $scope.release = function(event) {
	        coreControl.setControlValue($scope.id, 0.0);
	    }
	    $scope.updateControlProperty = function(key, value)
	    {
	    if (key == kVControlProperty_Enabled){
	      $scope.enabled = (value != 0);
	      draw();
	    }
	    }
	}]);

})( angular );