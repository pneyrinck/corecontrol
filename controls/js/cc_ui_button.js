(function ( angular ) { 
	angular.module('ui.corecontrol').directive('ccUiButton', ['vcproSurface', function(vcproSurface) {
	return function ccUIButton(scope, el, attr){
		var id = (attr['ccId'] != undefined)?attr['ccId']:"";
		var isSprite = (attr['ccSprite'] != undefined)?true:false;
		var latchMode = (attr['ccLatch'] != undefined)?true:false;
		var backColors = (attr['ccBkclrs'] != undefined)?JSON.parse(attr['ccBkclrs']):false;
	  var colors = (attr['ccColors'] != undefined)?JSON.parse(attr['ccColors']):false;
	  var classes = (attr['ccClasses'] != undefined)?JSON.parse(attr['ccClasses']):false;
	  var styleVarName = attr['ngStyle'];
	  var classVarName = attr['ngClass'];
	  var numSteps = vcproSurface.getNumControlSteps(id);
		var controlStep = 0;
	  var enabled = vcproSurface.getControlEnabled(id)
	  var controlValue = 0
		vcproSurface.subscribe(id, updateControlValue);
	  vcproSurface.subscribeControlProperty(id, updateControlProperty);
		if (attr['ccDf']) vcproSurface.subscribeDirectFeedback(id);
		function updateControlValue(value) {
	    if (typeof(value) != 'number')
	      return;
			controlValue = value;
	    draw()
	  }
	  function draw()
	  {
			var style;
			var index;
			if (backColors){
				if (!style) style = {};
				var index=valueToIndex(controlValue, backColors.length);
				style['background'] = backColors[index<backColors.length?index:backColors.length-1];
			}
			if (colors){
				if (!style) style = {};
				var index=valueToIndex(controlValue, colors.length);
				style['color'] = colors[index<colors.length?index:colors.length-1];
			}
			if (isSprite){
	      var height = el["0"].offsetHeight;
				if (!style) style = {};
				style['-webkit-transform'] = 'translate3d(0, ' + (-height * controlValue) + 'px, 0)';
	      style['transform'] = 'translate3d(0, ' + (-height * controlValue) + 'px, 0)';
			}
	    if (classes){
	        var index=valueToIndex(controlValue, classes.length);
	        scope[classVarName] = classes[index<classes.length?index:classes.length-1];
	    }
	    if (!style) style = {};
	    if (attr['ccAlwaysenabled']==undefined)
	      style['opacity'] = enabled?1.0:0.4
			if (style) scope[styleVarName]=style;
		}
	  function updateControlProperty(key, value)
	  {
	    if (key == kVControlProperty_Enabled){
	      enabled = (value != 0);
	      draw()
	    }
	  }

	  function touchStart (x, y) {
		if (latchMode){
			var curValue = vcproSurface.getControlValue(id);
			vcproSurface.setControlValue(id, curValue>0.0?0.0:1.0);
		}
		else
			vcproSurface.setControlValue(id, 1.0);
	  }
	  function touchEnd(x, y) {
		if (latchMode) return;
	      vcproSurface.setControlValue(id, 0.0);
	  }
	  if (attr['ccNoTouch'] == undefined)
	    installTouchHandler(el["0"], {touchStart:touchStart, touchMove:0, touchEnd:touchEnd}, true);
		updateControlValue(0);
	}
	}]);
})( angular );