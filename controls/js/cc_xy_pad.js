(function ( angular ) { 
  angular.module('ui.corecontrol').directive('ccXyPad', ['vcproSurface', function(vcproSurface) {
  return function (scope, element, attr){
    var element = element["0"];
    function touchStart (x, y) {
      console.log("mdown x="+x+" y="+y)
      vcproSurface.setControlValue("vwindow/mdown", x+","+y);
    }
    function touchMove (x, y) {
      vcproSurface.setControlValue("vwindow/mmove", x+","+y);
    }
    function touchEnd(x, y) {
      console.log("mup x="+x+" y="+y)
      vcproSurface.setControlValue("vwindow/mup", x+","+y);
    }
    installTouchHandler(element, {touchStart:touchStart, touchMove:touchMove, touchEnd:touchEnd});
  }
  }]);
})( angular );