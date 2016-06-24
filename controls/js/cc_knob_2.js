(function ( angular ) {  
  angular.module('ui.corecontrol').directive('ccKnob2', ['vcproSurface', function(vcproSurface) {
  return function ccKnob2Directive(scope, element, attr) {

    var id="";
    if (attr['vcId'])
      id = attr['vcId'];
    else if (attr['ccId'])
      id = attr['ccId'];
    var startAngle = 0.0;
    if (!attr.vcKnobWidth)
      attr.vcKnobWidth = 51
    var touchParams = {moved:0, touched:0};
    var width=attr.vcKnobWidth
    var height=width;
    var controlValue = 0.5;
    var centerLightOn=0;
    var halfwidth = width/2;
    var halfheight = height/2;
    var startangle_degrees=180;
    var endangle_degrees=35;
    var gestureInProgress = false

    function touch(x, y) {
      x=x-halfwidth;
      y=y-halfheight;
      gestureInProgress=true;
      firsthandle=false;
      startAngle=Math.atan2(y,x);
    }
    function move(x, y) {
      x=x-halfwidth;
      y=y-halfheight;
      if (!gestureInProgress) return;
      var numTicks=0;
      var angle=Math.atan2(y,x);
      if (angle*startAngle<0 && Math.abs(angle-startAngle)>3.141)
        if (angle<0)
            startAngle-=3.14159*2;
        else
            startAngle+=3.14159*2;
      numTicks=Math.trunc((angle-startAngle)*20);		// adHocVal constant.
      if (numTicks != 0)
      {
        vcproSurface.setControlValue(id, numTicks);
        startAngle=angle;
        jogAngle=startAngle;
      }
    }
    function release(x, y) {
      gestureInProgress=false;
    }
    var mc = new Hammer.Manager(element["0"], {
      preventDefault: true
      ,recognizers: [
          [Hammer.Pan,{threshold:0}]
          ,[Hammer.Tap,{ pointers:1, taps:1 }]
      ]
    });
    mc.on('tap', function(ev) {
      if (attr['tap-id'])
      {
        vcproSurface.setControlValue(attr['tap-id'], 1);
        vcproSurface.setControlValue(attr['tap-id'], 0);
      }
    });
    var offset;
    mc.on('panstart panmove panend', function(ev) {
      switch (ev.type){
        case 'panstart':
          offset = getOffset(element["0"]);
          touch(ev.center.x-offset.x,ev.center.y-offset.y);
          break;
        case 'panmove':
          move(ev.center.x-offset.x,ev.center.y-offset.y);
          break;
        case 'panend':
          release(ev.center.x-offset.x,ev.center.y-offset.y);
          break;
      }
    });
  }
  }]);
})( angular );