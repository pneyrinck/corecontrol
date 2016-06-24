(function ( angular ) {
  angular.module('ui.corecontrol').directive('ccBtnTouch', ['vcproSurface', function(vcproSurface) {
  return function ccButtonTouchDirective(scope, el, attr){
  	var latchMode = (attr['ccLatch'] != undefined)?true:false;
    var attrId = "";
    if (attr['vcBtnTouch'])
      attrId = attr['vcBtnTouch'];
    else if (attr['vcId'])
      attrId = attr['vcId'];
    else if (attr['ccId'])
      attrId = attr['ccId'];
      //    console.log("attr['vcId'] = "+attr['vcId']+" scope.id = "+scope.id)
      function touchStart (x, y) {
  		if (latchMode){
  			var curValue = vcproSurface.getControlValue(attrId);
  			vcproSurface.setControlValue(attrId, curValue>0.0?0.0:1.0);
  		}
  		else
  			vcproSurface.setControlValue(attrId, 1.0);
      }
      function touchEnd(x, y) {
  		if (latchMode) return;
          vcproSurface.setControlValue(attrId, 0.0);
      }
      installTouchHandler(el["0"], {touchStart:touchStart, touchMove:0, touchEnd:touchEnd});
  }
  }]);
})( angular );