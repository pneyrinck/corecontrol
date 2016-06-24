(function ( angular ) {
  angular.module('ui.corecontrol').directive('ccFader', ['$timeout', 'vcproSurface', 'appService', function($timeout, vcproSurface, appService) {
  return function ccFaderDirective(scope, element, attr) {
      // set up to watch the height of the fader travel distance
      // and update the controller as it changes
      var isNotAndroid = !appService.isAndroid()
      scope.enabled = true;
      var foo = element.children();
      var cap_element = foo["1"];
      var main_element = element["0"]
      if (!cap_element) cap_element=foo["0"];
      var heightIsSet = false;
      $timeout(updateHeightHack, 2000)
      function updateHeightHack()
      {
        getHeight()
        if (trackLength == 0)
          $timeout(updateHeightHack, 2000)
        else
          heightIsSet = true
      }
      function getHeight()
      {
        trackLength = main_element.offsetHeight - cap_element.offsetHeight
      }
      var controlValue = 0;
      var touchStartParameters = {touched:0};
      var previousControlValue=0;
      var trackLength = 0;
      var id = (attr['ccId'] != undefined)?attr['ccId']:"";
      id = (attr['vcId'] != undefined)?attr['vcId']:id;
    	vcproSurface.subscribe(id, updateControlValue);
      vcproSurface.subscribeControlProperty(id, updateControlProperty);

      function updateControlValue(newvalue) {
          if (touchStartParameters.touched==1) return;
          if (controlValue == newvalue) return;
          previousControlValue=controlValue;
          controlValue = newvalue;
          draw();
      }
      function updateControlProperty(key, value)
      {
        if (key == kVControlProperty_Enabled){
          scope.enabled = (value != 0);
          draw()
        }
      }

      function draw(){
        if (!heightIsSet) getHeight()
        if (trackLength == 0)return;
        var top = -Math.floor(controlValue * trackLength);
        var diff = Math.abs(previousControlValue-controlValue);
        // webkit transitions can not be cancelled. this logic helps when changes come in that
        // are close together so that no animation happens.
        // fyi, Android faders act really weird so they are not animated
        if (isNotAndroid && (diff>0.2)&&(touchStartParameters.touched==0)){
          cap_element.style['-webkit-transition-duration'] = '.09s';
          cap_element.style['-moz-transition-duration'] = '.09s';
        } else {
          cap_element.style['-webkit-transition-duration'] = '0';
          cap_element.style['-moz-transition-duration'] = '0';
        }
        cap_element.style['-webkit-transform'] = 'translate3d(0, ' + top + 'px, 0)';
        cap_element.style['transform'] = 'translate3d(0, ' + top + 'px, 0)';
        cap_element.style['opacity'] = scope.enabled?1.0:0.4;
      }
      scope.touch = function(event) {
          if (!scope.enabled) return;
          var x = event.clientX;
          var y = event.clientY;
          touchStartParameters = {touched:1, x: x, y: y, controlValue: controlValue };
          vcproSurface.touchControl(scope.id, 1.0);
      }
      scope.move = function(event) {
        if (!scope.enabled) return;
          if (trackLength == 0)return;
          var x = event.clientX;
          var y = event.clientY;
          if (touchStartParameters.touched==0) return;
          var offset = (touchStartParameters.y - y);
          var value = Math.min(Math.max(0, touchStartParameters.controlValue + (offset / trackLength)), 1);
          if (value !== controlValue) {
              previousControlValue=controlValue;
              controlValue = value;
              vcproSurface.setControlValue(scope.id, controlValue);
              draw();
          }
      }
      scope.release = function(event) {
        if (!scope.enabled) return;
          touchStartParameters = {touched:0};
          vcproSurface.touchControl(scope.id, 0.0);
      }
      vcproSurface.setControlValue(scope.id, controlValue);
  }}]);
})( angular );