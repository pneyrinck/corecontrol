(function ( angular ) {

angular.module('ui.corecontrol',[]);
angular.module('ui.corecontrol').controller('vcTrackCtrl', vcTrackController);
angular.module('ui.corecontrol').controller('vcMeterCtrl', vcMeterController);
angular.module('ui.corecontrol').controller('vcFaderCtrl', vcFaderController);
angular.module('ui.corecontrol').controller('vcJogCtrl', vcJogController);

angular.module('ui.corecontrol').controller('counterCtrl', counterController);

angular.module('ui.corecontrol')
    .directive('ccLcd', ['vcproSurface', function (vcproSurface) {
    return {
        restrict: 'EA', //E = element, A = attribute, C = class, M = comment
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            title: '@'         },
        templateUrl: 'templates/mackie_lcd_l.html',
        link: function ($scope, element, attr) {
          var msgRows = []
        	$scope.numberOfRows = attr['lcdRows'];
          $scope.numberOfColumns = attr['lcdColumns'];
          $scope.rowHeight = attr['lcdRowHeight'];
          $scope.rowHeight += "px";
        	msgRows.push("")
        	msgRows.push("")
        	msgRows.push("")

          $scope.messages = []
          $scope.messages.push(msgRows[0].split(''))
          $scope.messages.push(msgRows[1].split(''))
          $scope.messages.push(msgRows[2].split(''))

        	// Adjust row height according to the number of rows
			updateLCDText();
      // populate the number of rows and columns
			var id = attr['ccId'];
			vcproSurface.subscribe(id, updateControlValue);
			function updateControlValue(value) {
        if (typeof value === "string")
          value = JSON.parse(value)
        var row = value["row"]
        var column = value["col"]
        if (row==undefined) return
        if (column==undefined) return
        var part1 = msgRows[row].substr(0,column)
        var part2 = msgRows[row].substr(column+value["text"].length,$scope.numberOfColumns-column+value["text"].length)
        msgRows[row] = part1+value["text"]+part2
        $scope.messages[row] = msgRows[row].split('')
				updateLCDText();
			}
			function updateLCDText(){
				var numRows = $scope.numberOfRows;
				var numCols = $scope.numberOfColumns;
				var tempDisplayArray = new Array();
				for (var r=0; r<numRows; r++){
					var message = $scope.messages[r];
					var tempMsgArray = new Array();
					for (var c=0; c<numCols; c++){
						if (message) var character = message[c];
						 else var character = " ";
						tempMsgArray.push(character);
					}
					tempDisplayArray.push(tempMsgArray);
				}
				$scope.display = tempDisplayArray;
			}
        } //DOM manipulation
    }
}]);



angular.module('ui.corecontrol').directive('vcJogPad', ['vcproSurface', function(vcproSurface){
return function vcJogPadDirective(scope, element, attr) {
	var lastpoint;
	var gestureInProgress=true;
    function touchStart (x, y) {
		gestureInProgress = true;
		vcproSurface.touchControl(attr['ccId'], 1.0);
		lastpoint = x;
    }
    function touchMove(x, y) {
		if (!gestureInProgress) return;
		var numTicks=0;
		numTicks=Math.trunc((x-lastpoint) * 0.25);	//ad hoc for iPad
		if (numTicks != 0)
		{
			vcproSurface.setControlValue(attr['ccId'], numTicks);
			lastpoint = x;
		}
    }
    function touchEnd(x, y) {
		gestureInProgress = false;
		vcproSurface.touchControl(attr['ccId'], 0.0);
    }
    installTouchHandler(element["0"], {touchStart:touchStart, touchMove:touchMove, touchEnd:touchEnd});
}
}]);

angular.module('ui.corecontrol').directive('vcTouch', function() {return vcTouchDirective;});
angular.module('ui.corecontrol').directive('vcBtnTouch', ['vcproSurface', function(vcproSurface) {
return function vcButtonTouchDirective(scope, el, attr){
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
angular.module('ui.corecontrol').directive('vcTap', ['vcproSurface', function(vcproSurface) {
return function vcTapDirective(scope, el, attr){
    scope.tapId = attr['vcTap'];
}
}]);

angular.module('ui.corecontrol').directive('vcBankTouch', ['vcproSurface', function(vcproSurface) {
return function (scope, element, attr){
	var mc = new Hammer.Manager(element["0"], {
	preventDefault: true
    ,recognizers: [
        // RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
        [Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL, pointers:2 }]
        ,[Hammer.Pan,{ direction: Hammer.DIRECTION_HORIZONTAL , pointers:1}]
        ,[Hammer.Tap,{ taps:2, pointers:2 }]
//        ,[Hammer.Tap,{ pointers:2, taps:2 }]
    ]
	});
	//mc.on('pan', handlePan);
	//mc.on('panstart', handlePan);
	//mc.on('panend', handlePan);
  mc.on('swipeleft', function(ev) {
    console.log("swipeleft");
				vcproSurface.setControlValue("global/bankleft", 1);
				vcproSurface.setControlValue("global/bankleft", 0);
				console.log("bank left");
	});
	mc.on('swiperight', function(ev) {
    console.log("swiperight");
				vcproSurface.setControlValue("global/bankright", 1);
				vcproSurface.setControlValue("global/bankright", 0);
				console.log("bank right");
	});
  mc.on('panleft', function(ev) {
    console.log("panleft");
  });
  mc.on('panright', function(ev) {
    console.log("panright");
  });
	mc.on('tap', function(ev) {
				console.log("double tap");
	});

	var firstpan = false;
	var drag_offset = 0;
	function handlePan(ev) {
		console.log("handle pan, type="+ev.type);
		if (ev.type=="panstart"){
			drag_offset = 0;
			firstpan = true;
		}
		else if (ev.type=="pan"){
			if (firstpan){
			// this hack works around a Hammer problem
			// Hammer triggers a pan when a two finger gesture finishes
				if (ev.deltaX > 30) return;
				firstpan = false;
			}
			dragdistance = ev.deltaX-drag_offset;
			if (dragdistance > 118)
			{
				drag_offset+=118;
				console.log("scroll right");
				vcproSurface.setControlValue("global/scrollright", 1);
				vcproSurface.setControlValue("global/scrollright", 0);
			}
			else if (dragdistance < -118)
			{
				drag_offset-=118;
				console.log("scroll left");
				vcproSurface.setControlValue("global/scrollleft", 1);
				vcproSurface.setControlValue("global/scrollleft", 0);
			}
		}
	}

}
}]);

angular.module('ui.corecontrol').directive('vcXyPad', ['vcproSurface', function(vcproSurface) {
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

angular.module('ui.corecontrol').directive('vcId', ['vcproSurface', function(vcproSurface) {
return function vcIdDirective(scope, element, attr){
    // bind to vcontrol
    scope.id = attr['vcId'];
    scope.enabled = vcproSurface.getControlEnabled(scope.id)

	if (scope.id[0] == "[")
		scope.id = JSON.parse(attr['vcId']);
	scope.numSteps = vcproSurface.getNumControlSteps(scope.id);
	if (scope.updateControlValue)
		vcproSurface.subscribe(scope.id, scope.updateControlValue);
	if (scope.updateControlProperty)
		vcproSurface.subscribeControlProperty(scope.id, scope.updateControlProperty);
    scope.$on('$destroy', destroy)
    function destroy(){
        vcproSurface.unsubscribe(scope.id);
    }
}
}]);

angular.module('ui.corecontrol').directive('ccId', ['vcproSurface', function(vcproSurface) {
return function ccIdDirective(scope, element, attr){
    // bind to vcontrol
    scope.id = attr['ccId'];

    scope.enabled = vcproSurface.getControlEnabled(scope.id)
	if (scope.id[0] == "[")
		scope.id = JSON.parse(attr['ccId']);
	scope.numSteps = vcproSurface.getNumControlSteps(scope.id);
	if (scope.updateControlValue)
		vcproSurface.subscribe(scope.id, scope.updateControlValue);
	if (scope.updateControlProperty)
		vcproSurface.subscribeControlProperty(scope.id, scope.updateControlProperty);
    scope.$on('$destroy', destroy)
    function destroy(){
        vcproSurface.unsubscribe(scope.id);
    }
}
}]);

angular.module('ui.corecontrol').directive('vcLabel', ['vcproSurface', function(vcproSurface) {
return function vcLabelDirective(scope, element, attr){
    // bind to vcontrol
    var id="";
	if (attr['vcId'])
		id = attr['vcId'];
	else if (attr['ccId'])
		id = attr['ccId'];
    var label = vcproSurface.getControlLabel(id);
	if (label)
		scope.label = label;
}
}]);

angular.module('ui.corecontrol').directive('vcJogWheel', ['vcproSurface', function(vcproSurface) {
return function vcJogWheelDirective(scope, element, attr) {
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
}
}]);
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


function rotaryArcPath(startangle_degrees, endangle_degrees, innerradius, outerradius, centerx, centery) {
	var startangle=startangle_degrees/180*Math.PI;
	var endangle=endangle_degrees/180*Math.PI;
	var largeArc=1;
	if (Math.abs(startangle_degrees-endangle_degrees)<180){largeArc=0;}
	var backarcx1 = centerx+outerradius*Math.cos(startangle);
	var backarcy1 = centery-outerradius*Math.sin(startangle);
	var backarcx2 = centerx+outerradius*Math.cos(endangle);
	var backarcy2 = centery-outerradius*Math.sin(endangle);
	var backarcx3 = centerx+innerradius*Math.cos(endangle);
	var backarcy3 = centery-innerradius*Math.sin(endangle);
	var backarcx4 = centerx+innerradius*Math.cos(startangle);
	var backarcy4 = centery-innerradius*Math.sin(startangle);
	var path = 'M'+backarcx1+' '+backarcy1+' A'+outerradius+' '+outerradius+' 0 '+largeArc+' 0 '+backarcx2+' '+backarcy2+' L'+backarcx3+' '+backarcy3+' A'+innerradius+' '+innerradius+' 0 '+largeArc+' 1 '+backarcx4+' '+backarcy4;
	return path;
}
angular.module('ui.corecontrol').directive('vcKnob', function() {return vcKnobDirective;});
function vcKnobDirective(scope, element, attr){
  var knobs={};
  knobs.protools = {
  displayBackRadius:[0.96, 0.78],
  displayLightRadius:[.94, 0.81],
  displayBackColor:"#000",
  displayLightColor:"#0C0",
  circle1Radius:0.78,
  circle1Color:'#8e8f8f',
  circle2Radius:0.66,
  circle2Color:'#595a5e',
  }
  knobs.logic = {
  displayBackRadius:[0.7, 0.86],
  displayLightRadius:[.72, 0.83],
  displayBackColor:"#222",
  displayLightColor:"#04e028",
  circle1Radius:0.69,
  circle1Color:'#8e8f8f',
  circle2Radius:0.60,
  circle2Color:'#595a5e',
  }
  knobs.mackie = {
  displayBackRadius:[0.82, 1.0],
  displayLightRadius:[0.82, 1.0],
  displayBackColor:"#2c324d",
  displayLightColor:"#bfe9ee",
  circle1Radius:0.80,
  circle1Color:'#8e8f8f',
  circle2Radius:0.70,
  circle2Color:'#595a5e',
  }
  knobs.mc = {
  displayBackRadius:[1.0, 0.68],
  displayLightRadius:[.96, 0.72],
  displayBackColor:"#000",
  displayLightColor:"#0C0",
  circle1Radius:0.68,
  circle1Color:'#888',
  circle2Radius:0.58,
  circle2Color:'#444',
  }
  	scope.knobData = knobs[attr.vcKnob];
  	initialize();
  	function initialize(){
  	  var encoder_el = element["0"];
      if (!attr.vcKnobWidth)
        attr.vcKnobWidth = 51
      scope.el = encoder_el;
  		scope.paper = Raphael(encoder_el, attr.vcKnobWidth, attr.vcKnobWidth);
  		scope.updateWidth(attr.vcKnobWidth);
  	}
}

// the knob does not use any data binding and could probably just be a directive.
// but I need a scope to share data with other directives. My solution is to use a controller.
angular.module('ui.corecontrol').controller('vcKnobCtrl', ['$scope', 'vcproSurface',
function vcKnobDirective($scope, vcproSurface) {
    var touchParams = {moved:0, touched:0};
    var width=0
    var height=width;
    var controlValue = 0.5;
    var centerLightOn=0;
    var halfwidth = 0;
    var halfheight = 0;
    var outerradius=0;
    var innerradius=0;
    var startangle_degrees=180;
    var endangle_degrees=35;
    var gestureInProgress = false
    $scope.paper = 0;
    $scope.el = 0;
    var displayBackPath='';
    var hammer;
	  var displayMode = kVControlDisplayMode_Point;
	  $scope.enabled = true;
    $scope.updateWidth = function(newValue){
        width = newValue;
        height=width;
        halfwidth = width/2;
        halfheight = height/2;

		hammer = new Hammer.Manager($scope.el, {
			preventDefault: true
			,recognizers: [
			[Hammer.Pan,{threshold:0}]
			,[Hammer.Tap,{ pointers:1, taps:1 }]]
		});
		var offset;
		hammer.on('panstart panmove panend tap', function(ev) {
			switch (ev.type){
				case 'panstart':
          console.log("panstart")
					offset = getOffset($scope.paper.canvas);
					touch(ev.center.x-offset.x+ev.deltaX,ev.center.y-offset.y+ev.deltaY);
					break;
				case 'panmove':
        console.log("panmove")
					move(ev.center.x-offset.x+ev.deltaX,ev.center.y-offset.y+ev.deltaY);
					break;
				case 'panend':
        console.log("panend")
					release(ev.center.x-offset.x+ev.deltaX,ev.center.y-offset.y+ev.deltaY);
					break;
				case 'tap':
					if ($scope.tapId){
						vcproSurface.setControlValue($scope.tapId, 1);
						vcproSurface.setControlValue($scope.tapId, 0);
					}
					break;
			}
		});
        updateMagicNumbers();
        outerradius = halfwidth*$scope.knobData.displayLightRadius[1];
        innerradius = halfwidth*$scope.knobData.displayLightRadius[0];
        displayBackPath=rotaryArcPath(-45, 225, halfwidth*$scope.knobData.displayBackRadius[1], halfwidth*$scope.knobData.displayBackRadius[0], halfwidth, halfheight);
        draw();
    }
    $scope.updateControlValue = function(value)
    {
        if (value == controlValue) return;
        controlValue=value;
        updateMagicNumbers();
        draw();
    }
    $scope.updateControlProperty = function(key, value)
    {
		if (key == kVControlProperty_DisplayMode){
			displayMode = value;
			updateMagicNumbers();
			draw();
		}
		if (key == kVControlProperty_Enabled){
      $scope.enabled = (value != 0);
			draw();
		}
    }

    function updateMagicNumbers()
    {
        if (!$scope.paper) return;
        var rawposition = controlValue;

        var start = 1.0;
        var arcdistance = 0.0;
        var end = 0.0;
		var numdots = 11;
        var dotdistance = 1.0 / numdots;
        switch (displayMode)
        {
            case kVControlDisplayMode_Point:	//dot mode
                start = (1.0-rawposition)*(numdots-1)/numdots;
                arcdistance = 1.0 / numdots;
                break;
            case kVControlDisplayMode_BoostCut:	//boost cut mode
                if (rawposition <= 0.5) {
                    start = 0.5;// - 0.5 / ((float)numdots);
                    end = 1.0-rawposition + 1.0 / numdots;
                    if ((end-start) < dotdistance)
                        start = end - dotdistance;
                    arcdistance = end - start;
                }
                else {
                    end = 0.5; // + 0.5 / ((float)numdots);
                    start = 1.0-rawposition;
                    if ((end-start) < dotdistance)
                        end = start + dotdistance;
                    arcdistance = end - start;
                }
                break;
            case kVControlDisplayMode_Wrap:	//wrap mode
                end = 1.0; // + 0.5 / ((float)numdots);
                start = (1.0-rawposition)*(numdots-1)/numdots;
                arcdistance = end - start;
                break;
            case kVControlDisplayMode_Spread:	//spread mode
                start = 0.5 - rawposition * 0.5;
                end = 1.0 - start;
                arcdistance = end - start;
                break;
            default:
                break;
        }
        startangle_degrees=-45+270 * start;
        endangle_degrees=startangle_degrees+270*arcdistance;
    }

    function draw() {
        if (!$scope.paper) return;
        $scope.paper.clear();
		if (!$scope.enabled) return;
        var displayLightPath=rotaryArcPath(startangle_degrees, endangle_degrees, innerradius, outerradius, halfwidth, halfwidth);
		$scope.paper.circle(halfwidth, halfheight, halfwidth*$scope.knobData.circle1Radius).attr({fill: $scope.knobData.circle1Color, stroke: 'none'});
		$scope.paper.circle(halfwidth, halfheight, halfwidth*$scope.knobData.circle2Radius).attr({fill: $scope.knobData.circle2Color, stroke: 'none'});
        $scope.paper.path(displayBackPath).attr({fill: $scope.knobData.displayBackColor, stroke: "none"});
        $scope.paper.path(displayLightPath).attr({fill: $scope.knobData.displayLightColor, stroke: "none"});
    }
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
        vcproSurface.setControlValue($scope.id, numTicks);
        startAngle=angle;
      }
    }

    function release(x, y) {
      gestureInProgress=false;
    }
}]);

angular.module('ui.corecontrol').directive('vcKnobDraw', ['vcproSurface', function(vcproSurface) {
return function vcKnobDrawDirective(scope, element, attr) {
  var knobs={};
  knobs.protools = {
  displayBackRadius:[0.96, 0.78],
  displayLightRadius:[.94, 0.81],
  displayBackColor:"#000",
  displayLightColor:"#0C0",
  circle1Radius:0.78,
  circle1Color:'#8e8f8f',
  circle2Radius:0.66,
  circle2Color:'#595a5e',
  }
  knobs.logic = {
  displayBackRadius:[0.7, 0.86],
  displayLightRadius:[.72, 0.83],
  displayBackColor:"#222",
  displayLightColor:"#04e028",
  circle1Radius:0.69,
  circle1Color:'#8e8f8f',
  circle2Radius:0.60,
  circle2Color:'#595a5e',
  }
  knobs.mackie = {
  displayBackRadius:[0.82, 1.0],
  displayLightRadius:[0.82, 1.0],
  displayBackColor:"#2c324d",
  displayLightColor:"#bfe9ee",
  circle1Radius:0.80,
  circle1Color:'#8e8f8f',
  circle2Radius:0.70,
  circle2Color:'#595a5e',
  }
  knobs.mc = {
  displayBackRadius:[1.0, 0.68],
  displayLightRadius:[.96, 0.72],
  displayBackColor:"#000",
  displayLightColor:"#0C0",
  circle1Radius:0.68,
  circle1Color:'#888',
  circle2Radius:0.58,
  circle2Color:'#444',
  }
  var id="";
  if (attr['vcId'])
    id = attr['vcId'];
  else if (attr['ccId'])
    id = attr['ccId'];
  var startAngle = 0.0;
  if (!attr.vcKnobWidth)
    attr.vcKnobWidth = 51
  var paper = Raphael(element["0"], attr.vcKnobWidth, attr.vcKnobWidth);
  var touchParams = {moved:0, touched:0};
  var width=attr.vcKnobWidth
  var height=width;
  var controlValue = 0.5;
  var centerLightOn=0;
  var halfwidth = width/2;
  var halfheight = height/2;
  var outerradius=0;
  var innerradius=0;
  var startangle_degrees=180;
  var endangle_degrees=35;
  var gestureInProgress = false
  var displayBackPath='';
  var displayMode = kVControlDisplayMode_Point;
  var enabled = true;
  var knobData = knobs[attr.vcKnobDraw];
  updateMagicNumbers();
  outerradius = halfwidth*knobData.displayLightRadius[1];
  innerradius = halfwidth*knobData.displayLightRadius[0];
  displayBackPath=rotaryArcPath(-45, 225, halfwidth*knobData.displayBackRadius[1], halfwidth*knobData.displayBackRadius[0], halfwidth, halfheight);
  draw();
  vcproSurface.subscribe(id, updateControlValue, 1);
  vcproSurface.subscribeControlProperty(id, updateControlProperty);

  function updateMagicNumbers()
  {
      if (!paper) return;
      var rawposition = controlValue;

      var start = 1.0;
      var arcdistance = 0.0;
      var end = 0.0;
      var numdots = 11;
      var dotdistance = 1.0 / numdots;
      switch (displayMode)
      {
          case kVControlDisplayMode_Point:	//dot mode
              start = (1.0-rawposition)*(numdots-1)/numdots;
              arcdistance = 1.0 / numdots;
              break;
          case kVControlDisplayMode_BoostCut:	//boost cut mode
              if (rawposition <= 0.5) {
                  start = 0.5;// - 0.5 / ((float)numdots);
                  end = 1.0-rawposition + 1.0 / numdots;
                  if ((end-start) < dotdistance)
                      start = end - dotdistance;
                  arcdistance = end - start;
              }
              else {
                  end = 0.5; // + 0.5 / ((float)numdots);
                  start = 1.0-rawposition;
                  if ((end-start) < dotdistance)
                      end = start + dotdistance;
                  arcdistance = end - start;
              }
              break;
          case kVControlDisplayMode_Wrap:	//wrap mode
              end = 1.0; // + 0.5 / ((float)numdots);
              start = (1.0-rawposition)*(numdots-1)/numdots;
              arcdistance = end - start;
              break;
          case kVControlDisplayMode_Spread:	//spread mode
              start = 0.5 - rawposition * 0.5;
              end = 1.0 - start;
              arcdistance = end - start;
              break;
          default:
              break;
      }
      startangle_degrees=-45+270 * start;
      endangle_degrees=startangle_degrees+270*arcdistance;
  }
  function draw() {
      if (!paper) return;
      paper.clear();
      if (!enabled) return;
      var displayLightPath=rotaryArcPath(startangle_degrees, endangle_degrees, innerradius, outerradius, halfwidth, halfwidth);
      paper.circle(halfwidth, halfheight, halfwidth*knobData.circle1Radius).attr({fill: knobData.circle1Color, stroke: 'none'});
      paper.circle(halfwidth, halfheight, halfwidth*knobData.circle2Radius).attr({fill: knobData.circle2Color, stroke: 'none'});
      paper.path(displayBackPath).attr({fill: knobData.displayBackColor, stroke: "none"});
      paper.path(displayLightPath).attr({fill: knobData.displayLightColor, stroke: "none"});
  }
  function updateControlValue(value)
  {
      if (value == controlValue) return;
      controlValue=value;
      updateMagicNumbers();
      draw();
  }
  function updateControlProperty(key, value)
  {
    if (key == kVControlProperty_DisplayMode){
      displayMode = value;
      updateMagicNumbers();
      draw();
    }
    if (key == kVControlProperty_Enabled){
      scope.enabled = (value != 0);
      draw();
    }
  }
}
}]);

angular.module('ui.corecontrol').directive('vcKnob2', ['vcproSurface', function(vcproSurface) {
return function vcKnob2Directive(scope, element, attr) {

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
//    console.log("touch x="+x+" y="+y)
    x=x-halfwidth;
    y=y-halfheight;
    gestureInProgress=true;
    firsthandle=false;
    startAngle=Math.atan2(y,x);
  }
  function move(x, y) {
//    console.log("move x="+x+" y="+y)
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
//      console.log("numTicks = "+numTicks)
      vcproSurface.setControlValue(id, numTicks);
      startAngle=angle;
      jogAngle=startAngle;
    }
  }
  function release(x, y) {
//    console.log("release x="+x+" y="+y)
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

angular.module('ui.corecontrol').directive('vcMeter', function() {
return function vcMeterDirective(scope, element, attr)
{
    var controlValue = 0.0;
    var el = element["0"];
    var trackLength = calcHeight();
    if (trackLength == 0)
        scope.$watch(calcHeight, updateHeight);
    function calcHeight(){
        return el.offsetHeight;
    }
    function updateHeight(newValue, oldValue){
        trackLength = newValue;
        draw();
    }
    scope.updateControlValue = function(value)
    {
        if (controlValue == value) return;
        controlValue = value;
        draw();
    }
    function draw(){
      
        var trackLength = calcHeight();

        if (trackLength == 0) return;
        var level=Math.floor(controlValue*trackLength);
        if (level > trackLength) level = trackLength;
        var style_clip = new Object();
        style_clip['-webkit-transform'] = 'translate3d(0, ' + (trackLength - level) + 'px, 0)';
        style_clip['transform'] = 'translate3d(0, ' + (trackLength - level) + 'px, 0)';
        scope.style_clip = style_clip;
        var style_top = new Object();
        style_top['-webkit-transform'] = 'translate3d(0, ' + (level - trackLength) + 'px, 0)';
        style_top['transform'] = 'translate3d(0, ' + (level - trackLength) + 'px, 0)';
        scope.style_top=style_top;
    }
    draw();
}
});

angular.module('ui.corecontrol').directive('vcMeterSimple', function() {
return function vcMeterSimpleDirective(scope, element, attr)
{
    var controlValue = 0.0;
    var el = element["0"];
    var trackLength = calcHeight();
    if (trackLength == 0)
        scope.$watch(calcHeight, updateHeight);
    function calcHeight(){
        return el.offsetHeight;
    }
    function updateHeight(newValue, oldValue){
        trackLength = newValue;
        draw();
    }
    scope.updateControlValue = function(value)
    {
        if (controlValue == value) return;
        controlValue = value;
        draw();
    }
    function draw(){
        if (trackLength == 0) return;
        var level=Math.floor(controlValue*trackLength);
        if (level > trackLength) level = trackLength;
        level = -level;
        var style_top = new Object();
        style_top['-webkit-transform'] = 'translate3d(0, ' + level + 'px, 0)';
        style_top['transform'] = 'translate3d(0, ' + level + 'px, 0)';
        scope.style_top = style_top;
    }
    draw();
}
});

angular.module('ui.corecontrol').directive('vcDbText', ['$timeout', 'vcproSurface', 'appService', function($timeout, vcproSurface, appService) {
return function vcDbTextDirective(scope, element, attr) {
  var controlValue = 0;
  var dbText = "-99";
  var id = (attr['ccId'] != undefined)?attr['ccId']:"";
  id = (attr['vcId'] != undefined)?attr['vcId']:id;
  vcproSurface.subscribe(id, updateControlValue, 1);
  var faderTaper = appService.getFaderTaper(attr.vcDbText)

  function updateControlValue(newvalue) {
      if (controlValue == newvalue) return;
      controlValue = newvalue;
      draw();
  }
  function draw(){
    var dbTextNew = getFaderValue(controlValue, faderTaper);
    if (dbText != dbTextNew){
        dbText = dbTextNew
        element.html(dbText)
    }
  }
  function getFaderValue(position, taper){
      var dbval=-500;
      var sizeof_taper=taper.length;
      if (position >=1)
          dbval = taper[taper.length-1][0];
      else if (position <= taper[0][1])
          return "off";
      else
      {
          for (i=0; i<sizeof_taper-1; i = i + 1)
          {
              if ((position>=taper[i][1]) && (position <taper[i+1][1]))
                  dbval=taper[i][0]+(taper[i+1][0]-taper[i][0])*(position-taper[i][1])/(taper[i+1][1]-taper[i][1]);
          }
      }
      if (dbval<0)
          return dbval.toFixed(1);
      return "+"+dbval.toFixed(1);
  }

}}]);

angular.module('ui.corecontrol').directive('ccTextProperty', ['$timeout', 'vcproSurface', 'appService', function($timeout, vcproSurface, appService) {
return function ccTextPropertyDirective(scope, element, attr) {
  var controlValue = "";
  var id = (attr['ccId'] != undefined)?attr['ccId']:"";
  vcproSurface.subscribeControlProperty(id, updateControlProperty);

  function updateControlProperty(key, newvalue) {
      if (key == kVControlProperty_ValueString)
      {
        if (controlValue == newvalue) return;
        controlValue = newvalue;
        draw();
      }
  }
  function draw(){
    element.html(controlValue);
  }
  draw()
}}]);
angular.module('ui.corecontrol').directive('ccNameProperty', ['$timeout', 'vcproSurface', 'appService', function($timeout, vcproSurface, appService) {
return function ccNameProperty(scope, element, attr) {
  var controlValue = "";
  var id = (attr['ccId'] != undefined)?attr['ccId']:"";
  vcproSurface.subscribeControlProperty(id, updateControlProperty);

  function updateControlProperty(key, newvalue) {
      if (key == kVControlProperty_Name)
      {
        if (controlValue == newvalue) return;
        controlValue = newvalue;
        draw();
      }
  }
  function draw(){
    element.html(controlValue);
  }
  draw()
}}]);

angular.module('ui.corecontrol').directive('ccTextValue', ['$timeout', 'vcproSurface', 'appService', function($timeout, vcproSurface, appService) {
return function ccTextValueDirective(scope, element, attr) {
  var controlValue = "";
  var id = (attr['ccId'] != undefined)?attr['ccId']:"";
  id = (attr['vcId'] != undefined)?attr['vcId']:id;
  vcproSurface.subscribe(id, updateControlValue);
  function updateControlValue(value) {
      var newvalue = String(value);
      if (controlValue == newvalue) return;
      controlValue = newvalue;
      draw();
  }
  function draw(){
    element.html(controlValue);
  }
  draw()
}}]);

angular.module('ui.corecontrol').directive('vcFader', ['$timeout', 'vcproSurface', 'appService', function($timeout, vcproSurface, appService) {
return function vcFaderDirective(scope, element, attr) {
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
//      console.log("fader val = "+newvalue)
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


function vcTouchDirective(scope, el, attr){
    var element = el["0"];
    function touchStart (x, y) {
        if (scope && scope.touch)
            scope.touch({clientX:x, clientY:y});
    }
    function touchMove (x, y) {
        if (scope && scope.move)
            scope.move({clientX:x, clientY:y});
    }
    function touchEnd(x, y) {
        if (scope && scope.release)
            scope.release({clientX:x, clientY:y});
    }
    installTouchHandler(el["0"], {touchStart:touchStart, touchMove:touchMove, touchEnd:touchEnd});

/*    var mc = new Hammer.Manager(el["0"], {
      preventDefault: true
      ,recognizers: [
          [Hammer.Pan,{threshold:0}]
      ]
    });
    var offset;
    mc.on('panstart panmove panend', function(ev) {
    	switch (ev.type){
        case 'panstart':
          if (!ev.srcEvent) return;
          if (ev.srcEvent.pageX) touchStart(ev.srcEvent.pageX - element.offsetLeft, ev.srcEvent.pageY - element.offsetTop);
          if (ev.srcEvent.touches[0]) touchStart(ev.srcEvent.touches[0].pageX - element.offsetLeft, ev.srcEvent.touches[0].pageY - element.offsetTop);
          break;
        case 'panmove':
          if (!ev.srcEvent) return;
          if (ev.srcEvent.pageX) touchMove(ev.srcEvent.pageX - element.offsetLeft, ev.srcEvent.pageY - element.offsetTop);
          if (ev.srcEvent.touches[0]) touchMove(ev.srcEvent.touches[0].pageX - element.offsetLeft, ev.srcEvent.touches[0].pageY - element.offsetTop);
          break;
        case 'panend':
          if (!ev.srcEvent) return;
          if (ev.srcEvent.pageX) touchEnd(ev.srcEvent.pageX - element.offsetLeft, ev.srcEvent.pageY - element.offsetTop);
          if (ev.srcEvent.touches[0]) touchEnd(ev.srcEvent.touches[0].pageX - element.offsetLeft, ev.srcEvent.touches[0].pageY - element.offsetTop);
            else touchEnd(0,0);
          break;
      }
    });*/
}

angular.module('ui.corecontrol').directive('vcSprite', ['vcproSurface', function(vcproSurface) {
return function vcSpriteDirective(scope, el, attr){
    var id = attr['vcId'];
    var numSteps = vcproSurface.getNumControlSteps(id);
    scope.getHeight = function()
    {
      return el["0"].offsetHeight
    }
}
}]);

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

angular.module('ui.corecontrol').controller('ccBtnCtrl',
function ccButtonController($scope)
{
	//provides a scope which directives can share
}
);

angular.module('ui.corecontrol').controller('vcBtnBgCtrl',
function vcButtonBgController($scope)
{
	var controlValue = 0;
  $scope.enabled = true;
    $scope.label = "";

    $scope.updateControlValue = function (value) {
      if (typeof(value) != 'number')
        return;
		controlValue = value;
		draw();
	}
  $scope.updateControlProperty = function(key, value)
  {
    if (key == kVControlProperty_Enabled){
      $scope.enabled = (value != 0);
      draw();
    }
  }

	function draw(){
		var style;// = new Object();
		var index;
		if ($scope.backColors){
			if (!style) style = {};
			var index=valueToIndex(controlValue, $scope.backColors.length);
			style['background'] = $scope.backColors[index<$scope.backColors.length?index:$scope.backColors.length-1];
		}
		if ($scope.colors){
			if (!style) style = {};
			var index=valueToIndex(controlValue, $scope.colors.length);
			style['color'] = $scope.colors[index<$scope.colors.length?index:$scope.colors.length-1];
		}
		if ($scope.classes){
			var index=valueToIndex(controlValue, $scope.classes.length);
			$scope.class = $scope.classes[index<$scope.classes.length?index:$scope.classes.length-1];
		}
    if (!style) style = {};
    style['opacity'] = $scope.enabled?1.0:0.4
		if (style) $scope.style=style;
	}
    $scope.updateProperty = function (value) {
        if (value["label"]){
            $scope.label = value["label"];
        }
    }
}
);

// HOW TO TREAT THIS IN CORECONTROL... vcLabel and ccLabel
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

angular.module('ui.corecontrol').controller('vcLabelCtrl',
function vcLabelController($scope) {
    $scope.label = "";
    $scope.updateControlValue = function (value) {
        var newValue = String(value);
        if (newValue == $scope.label) return;
        $scope.label = newValue;
    }
}
);

function vcMeterController($scope) {
}

function vcFaderController($scope) {
}

function vcJogController($scope) {
}

angular.module('ui.corecontrol').controller('vcBtnSpCtrl', ['$scope','vcproSurface',
function vcButtonSpriteController($scope, vcproSurface)
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
        vcproSurface.setControlValue($scope.id, 1.0);
    }
    $scope.release = function(event) {
        vcproSurface.setControlValue($scope.id, 0.0);
    }
    $scope.updateControlProperty = function(key, value)
    {
    if (key == kVControlProperty_Enabled){
      $scope.enabled = (value != 0);
      draw();
    }
    }
}]);

function vcTrackController($scope)
{
}
function counterController($scope)
{
	var value = "";
  $scope.test = "1";
    $scope.digits = [];
    $scope.digits.push(" ");
    $scope.digits.push(" ");
    $scope.digits.push(" ");
    $scope.digits.push(" ");
    $scope.digits.push(" ");
    $scope.digits.push(" ");
    $scope.digits.push(" ");
    $scope.digits.push(" ");
    $scope.digits.push(" ");
    $scope.digits.push(" ");
    $scope.digits.push(" ");
    $scope.digits.push(" ");

    $scope.updateControlValue = function (ivalue) {
        var newValue = String(ivalue);
        if (newValue == $scope.value) return;
		var counter = 11;
		for (var i=newValue.length-1; i>=0; i--){
			$scope.digits[counter--] = newValue[i];
		}
	}
}

angular.module('ui.corecontrol').directive('vcSlider', function() {return vcSliderDirective;});
function vcSliderDirective(scope, element, attr) {
// this is very fragile way to get the slider cap element.
// TBD - something better!
    var foo = element.children();
    var cap_element = foo["1"];
    if (!cap_element) cap_element=foo["0"];
	var trackElement = element["0"];
	var isHorizontal = false;
	var trackLength = element["0"].offsetHeight - cap_element.offsetHeight;
	if (trackElement.offsetWidth > trackElement.offsetHeight){
		isHorizontal = true;
		trackLength = element["0"].offsetWidth - cap_element.offsetWidth;
	}
	scope.updateTrackLength(trackLength, isHorizontal);
}
angular.module('ui.corecontrol').controller('vcSliderCtrl', ['$scope', 'vcproSurface',
function vcSliderController($scope, vcproSurface) {
    var controlValue = 0.5;
    var trackLength = 0;
	var isHorizontal = false;
    var touchStartParameters = {touched:0};

    $scope.updateControlValue = function (newvalue) {
        if (touchStartParameters.touched==1) return;
        if (controlValue == newvalue) return;
        previousControlValue=controlValue;
        controlValue = newvalue;
        draw();
		}
    $scope.updateTrackLength = function (newLength, isHoriz) {
        if (trackLength == newLength) return;
        trackLength = newLength;
		isHorizontal = isHoriz;
        draw();
    }
    function draw(){
        $scope.style_cap = getStyle();
    }
    function getStyle() {
        var style = new Object();
        var top = Math.floor(controlValue * trackLength);
        // webkit transitions can not be cancelled. this logic helps when changes come in that
        // are close together so that no animation happens.
		    style['-webkit-transition-duration'] = '0';
        style['-webkit-transform'] = 'translate3d(' + top + 'px, 0, 0)';
        style['-moz-transition-duration'] = '0';
        style['transform'] = 'translate3d(' + top + 'px, 0, 0)';
        return style;
    }
}]);


function installTouchHandler(element, handler, allowDefault) {
    if (!element) return;
    if( typeof(window.ontouchstart) == 'undefined'){
        if (handler.touchStart) element.addEventListener("mousedown", mousedown);
    }
    else{
        if (handler.touchStart) element.addEventListener("touchstart", touchstart);
        if (handler.touchMove) element.addEventListener("touchmove", touchmove);
        if (handler.touchEnd) element.addEventListener("touchend", touchend);
    }
    function mousedown(event) {
        if (event.button === 2) return; // ignore right clicks
        if (!allowDefault) event.preventDefault();
		      event.stopPropagation();
        if (handler.touchMove) document.body.addEventListener("mousemove", mousemove);
        if (handler.touchEnd) document.body.addEventListener("mouseup", mouseup);
        if (handler.touchStart)
            handler.touchStart(event.pageX - element.offsetLeft, event.pageY - element.offsetTop, element);
    }
    function mousemove(event) {
        if (!allowDefault) event.preventDefault();
        if (handler.touchMove)
            handler.touchMove(event.pageX - element.offsetLeft, event.pageY - element.offsetTop, element);
    }
    function mouseup(event) {
        if (handler.touchEnd)
            handler.touchEnd(event.pageX - element.offsetLeft, event.pageY - element.offsetTop, element);
        if (handler.touchMove) document.body.removeEventListener("mousemove", mousemove);
        if (handler.touchEnd) document.body.removeEventListener("mouseup", mouseup);
    }
    function touchstart(event) {
        // this is a work-around, to prevent mouse event handling under a webview
        element.onmousedown = null;
        element.onmousemove = null;
        element.onmouseup = null;
        var touch = event.targetTouches[0];
        if (!allowDefault) event.preventDefault(); // prevent touch being converted to mouse event
        if (handler.touchStart)
            handler.touchStart(touch.pageX - element.offsetLeft, touch.pageY - element.offsetTop, element, event);
    }
    function touchmove(e) {
        var touch = e.targetTouches[0];
        if (!allowDefault) e.preventDefault(); // prevents the page scrolling
        if (handler.touchMove) {
            handler.touchMove(touch.pageX - element.offsetLeft, touch.pageY - element.offsetTop, element, e);
        }
    }
    function touchend(e) {
        if (!allowDefault) e.preventDefault();
        if (handler.touchEnd) {
            if (handler.touchEnd(0,0, element, e))
                e.preventDefault();
        }
    }
}
function valueToIndex(value, numSteps){
	var step=Math.round(value*(numSteps-1));
	if (step > (numSteps-1)) step = numSteps-1;
	return step;
}
})( angular );
