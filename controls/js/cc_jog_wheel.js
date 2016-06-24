(function ( angular ) { 
  angular.module('ui.corecontrol').directive('ccJogWheel', ['vcproSurface', function(vcproSurface) {
  return function ccJogWheelDirective(scope, element, attr) {
      var startAngle = 0.0;
      var jogAngle = 0.0;
      var firsthandle;
      var gestureInProgress = false;
      var shuttleMode = false;
      var transparent_mode = false;
      var foo = element.children();
      foo = angular.element(foo["0"]).children();
        var wheel = foo["0"];
        var dot = foo["2"];
      var rect = {};
      rect.size = {};
      rect.size.width = wheel.offsetWidth;
      rect.size.height = wheel.offsetHeight;
      var dotrect = {};
      dotrect.size = {};
      dotrect.origin = {};
      dotrect.size.width = dot.offsetWidth;
      dotrect.size.height = dot.offsetHeight;
      var center = {};
      center.x=rect.size.width/2;
      center.y=rect.size.height/2;

      function touch(x, y) {
        x=x-center.x;
        y=y-center.y;
        gestureInProgress=true;
        shuttleMode= false;
        firsthandle=false;
        startAngle=Math.atan2(y,x);
        vcproSurface.touchControl(scope.id, 1.0);
      }
      function move(x, y) {
    		x=x-center.x;
    		y=y-center.y;
    		if (!gestureInProgress) return;
            var adHocVal = shuttleMode ? 5.0 : 5.0;
    		var numTicks=0;
    		var angle=Math.atan2(y,x);
            if (angle*startAngle<0 && Math.abs(angle-startAngle)>3.141)
                if (angle<0)
                    startAngle-=3.14159*2;
                else
                    startAngle+=3.14159*2;
            numTicks=Math.trunc((angle-startAngle)*adHocVal);		// adHocVal constant.
    		if (numTicks != 0)
    		{
    			vcproSurface.setControlValue(scope.id, numTicks);
                startAngle=angle;
                jogAngle=startAngle;
    			draw();
    		}
      }

      function release(x, y) {
        vcproSurface.touchControl(scope.id, 0.0);
        gestureInProgress=false;
        draw();
      }
      function draw() {
        if (gestureInProgress || !transparent_mode){
            dotrect.origin.x=(rect.size.width - dotrect.size.width)/2;
            dotrect.origin.y=(rect.size.height - dotrect.size.height)/2;
            var y = Math.sin(jogAngle) * 0.25 * rect.size.width * 1.0;
            var x = Math.cos(jogAngle) * 0.25 * rect.size.width * 1.0;
            dotrect.origin.x += x;
            dotrect.origin.y += y;
        		var style={};
        		style.top = dotrect.origin.y+"px";
        		style.left = dotrect.origin.x+"px";
        		scope.vcWheelPointerStyle=style;
        }
      }

      var mc = new Hammer.Manager(element["0"], {
        preventDefault: true
        ,recognizers: [
            [Hammer.Pan,{threshold:0}]
            ,[Hammer.Tap,{ pointers:2, taps:2 }]
        ]
      });
      mc.on('tap', function(ev) {
      	console.log("double tap jog wheel");
      });
      var offset;
      mc.on('panstart panmove panend', function(ev) {
      	switch (ev.type){
      		case 'panstart':
      			offset = getOffset(wheel);
      			touch(ev.center.x-offset.x+ev.deltaX,ev.center.y-offset.y+ev.deltaY);
      			break;
      		case 'panmove':
      			move(ev.center.x-offset.x+ev.deltaX,ev.center.y-offset.y+ev.deltaY);
      			break;
      		case 'panend':
      			release(ev.center.x-offset.x+ev.deltaX,ev.center.y-offset.y+ev.deltaY);
      			break;
      	}
      });

      function getOffset(el) {
        var x = 0,
            y = 0;

        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
          x += el.offsetLeft - el.scrollLeft;
          y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
        }

        return { x: x, y: y };
      }

  }
  }]);
})( angular );
