(function ( angular ) {	
	var ngUICoreControl = angular.module('ngUICoreControl',[]);

	/*
	*******************************************************
		Fader
	********************************************************
	*/

	angular.module('ngUICoreControl').directive('ccFader', 
	['$timeout', 'coreControl',function($timeout, coreControl) {
	return function ccFaderDirective(scope, element, attr) 
	{
		var isHorizontal;
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
		  // check if a horizontal fader
		  if (main_element.offsetWidth > main_element.offsetHeight) isHorizontal = true;
		  if (isHorizontal) trackLength = main_element.offsetWidth - cap_element.offsetWidth;
		    else trackLength = main_element.offsetHeight - cap_element.offsetHeight;
		}
		var controlValue = 0;
		var touchStartParameters = {touched:0};
		var previousControlValue=0;
		var trackLength = 0;
		var id = (attr['ccId'] != undefined)?attr['ccId']:"";
		id = (attr['vcId'] != undefined)?attr['vcId']:id;
		coreControl.subscribe(id, updateControlValue);
		coreControl.subscribeControlProperty(id, updateControlProperty);

		function updateControlValue(newvalue) {
		  if (touchStartParameters.touched==1) return;
		  if (controlValue == newvalue) return;
		  previousControlValue=controlValue;
		  controlValue = newvalue;
		  draw();
		}
		function updateControlProperty(key, value)
		{
			if (key == kVControlProperty_Enabled)
			{
		  		scope.enabled = (value != 0);
		  		draw()
			}
		}


		function draw()
		{
			if (!heightIsSet) getHeight()
			if (trackLength == 0)return;
			var top = -Math.floor(controlValue * trackLength);
			var left = Math.floor(controlValue * trackLength);
			var diff = Math.abs(previousControlValue-controlValue);
			
			cap_element.style['-webkit-transition-duration'] = '0';
			cap_element.style['-moz-transition-duration'] = '0';
			

			if (isHorizontal){
			  cap_element.style['-webkit-transform'] = 'translate3d('+ left +'px, 0, 0)';
			  cap_element.style['transform'] = 'translate3d('+ left +'px, 0, 0)';

			} else {
			  cap_element.style['-webkit-transform'] = 'translate3d(0, ' + top + 'px, 0)';
			  cap_element.style['transform'] = 'translate3d(0, ' + top + 'px, 0)';
			}

			cap_element.style['opacity'] = scope.enabled?1.0:0.4;
		}

		scope.touch = function(event) {
		  if (!scope.enabled) return;
		  var x = event.clientX;
		  var y = event.clientY;
		  touchStartParameters = {touched:1, x: x, y: y, controlValue: controlValue };
		  coreControl.touchControl(scope.id, 1.0);
		}
		scope.move = function(event) {
			if (!scope.enabled) return;
		  	if (trackLength == 0)return;
			var x = event.clientX;
			var y = event.clientY;
			if (touchStartParameters.touched==0) return;

			if (isHorizontal){
				var offset = (x-touchStartParameters.x);
				var value = Math.min(Math.max(0, Number(touchStartParameters.controlValue) + (offset / trackLength)), 1);
			} else {
				var offset = (touchStartParameters.y - y);
				var value = Math.min(Math.max(0, Number(touchStartParameters.controlValue) + (offset / trackLength)), 1);
			}

		  	if (value !== controlValue) {
		      previousControlValue=controlValue;
		      controlValue = value;
		      coreControl.setControlValue(scope.id, controlValue);
		      draw();
		  	}
		}
		scope.release = function(event) {
			if (!scope.enabled) return;
		  	touchStartParameters = {touched:0};
		  	coreControl.touchControl(scope.id, 0.0);
		}
		coreControl.setControlValue(scope.id, controlValue);
	}
	}]);

	angular.module('ngUICoreControl').controller('ccFaderCtrl', function(){
	});


	/*
	*******************************************************
		Knob
	********************************************************
	*/
	angular.module('ngUICoreControl').directive('ccKnob', function() {return ccKnobDirective;});
  	function ccKnobDirective(scope, element, attr){
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

	  	scope.knobData = knobs[attr.ccKnob];
	  	initialize();
	    
	  	function initialize(){
	  	  var encoder_el = element["0"];
	      if (!attr.ccKnobWidth)
	        attr.ccKnobWidth = 51
	      scope.el = encoder_el;
	  		scope.paper = Raphael(encoder_el, attr.ccKnobWidth, attr.ccKnobWidth);
	  		scope.updateWidth(attr.ccKnobWidth);
	  	}
	}

	angular.module('ngUICoreControl').controller('ccKnobCtrl', ['$scope', 'coreControl',
	function ccKnobController($scope, coreControl) {
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
				      coreControl.setControlValue($scope.tapId, 1);
				      coreControl.setControlValue($scope.tapId, 0);
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
				case kVControlDisplayMode_Point:  //dot mode
				  start = (1.0-rawposition)*(numdots-1)/numdots;
				  arcdistance = 1.0 / numdots;
				  break;
				case kVControlDisplayMode_BoostCut: //boost cut mode
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
				case kVControlDisplayMode_Wrap: //wrap mode
				  end = 1.0; // + 0.5 / ((float)numdots);
				  start = (1.0-rawposition)*(numdots-1)/numdots;
				  arcdistance = end - start;
				  break;
				case kVControlDisplayMode_Spread: //spread mode
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
			numTicks=Math.trunc((angle-startAngle)*20);   // adHocVal constant.
			if (numTicks != 0)
			{
			  coreControl.setControlValue($scope.id, numTicks);
			  startAngle=angle;
			}
		}

		function release(x, y) {
			gestureInProgress=false;
		}
	}]);

	angular.module('ngUICoreControl').directive('ccKnobDraw', ['coreControl', function(coreControl) {
		return function ccKnobDrawDirective(scope, element, attr) 
		{
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
		    coreControl.subscribe(id, updateControlValue, 1);
		    coreControl.subscribeControlProperty(id, updateControlProperty);

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
		            case kVControlDisplayMode_Point:  //dot mode
		                start = (1.0-rawposition)*(numdots-1)/numdots;
		                arcdistance = 1.0 / numdots;
		                break;
		            case kVControlDisplayMode_BoostCut: //boost cut mode
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
		            case kVControlDisplayMode_Wrap: //wrap mode
		                end = 1.0; // + 0.5 / ((float)numdots);
		                start = (1.0-rawposition)*(numdots-1)/numdots;
		                arcdistance = end - start;
		                break;
		            case kVControlDisplayMode_Spread: //spread mode
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
		        $scope.enabled = (value != 0);
		        draw();
		      }
		    }
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

	angular.module('ngUICoreControl').directive('ccKnob2', ['coreControl', function(coreControl) {
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
		  numTicks=Math.trunc((angle-startAngle)*20);   // adHocVal constant.
		  if (numTicks != 0)
		  {
		    coreControl.setControlValue(id, numTicks);
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
		    coreControl.setControlValue(attr['tap-id'], 1);
		    coreControl.setControlValue(attr['tap-id'], 0);
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



	/*
	*******************************************************
		Id
	********************************************************
	*/
	angular.module('ngUICoreControl').directive('ccId', ['coreControl', function(coreControl) {
	return function ccIdDirective(scope, element, attr){
	    // bind to vcontrol
	    scope.id = attr['ccId'];

	    scope.enabled = coreControl.getControlEnabled(scope.id)
		if (scope.id[0] == "[")
			scope.id = JSON.parse(attr['ccId']);
		scope.numSteps = coreControl.getNumControlSteps(scope.id);
		if (scope.updateControlValue)
			coreControl.subscribe(scope.id, scope.updateControlValue);
		if (scope.updateControlProperty)
			coreControl.subscribeControlProperty(scope.id, scope.updateControlProperty);
	    scope.$on('$destroy', destroy)
	    function destroy(){
	        coreControl.unsubscribe(scope.id);
	    }
	}
	}]);


	/*
	*******************************************************
		Touch
	********************************************************
	*/
	angular.module('ngUICoreControl').directive('ccTouch', function() {
		return function ccTouchDirective(scope, el, attr){
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
	  }
	});

	/*
	*******************************************************
		Button Touch
	********************************************************
	*/

	angular.module('ngUICoreControl').directive('ccBtnTouch', ['coreControl', function(coreControl) {
	return function ccButtonTouchDirective(scope, el, attr)
	{
		var latchMode = (attr['ccLatch'] != undefined)?true:false;
		var attrId = "";
		if (attr['ccBtnTouch'])
		attrId = attr['ccBtnTouch'];
		else if (attr['vcId'])
		attrId = attr['vcId'];
		else if (attr['ccId'])
	  	attrId = attr['ccId'];
		function touchStart (x, y) {
			if (latchMode){
				var curValue = coreControl.getControlValue(attrId);
				coreControl.setControlValue(attrId, curValue>0.0?0.0:1.0);
			}
			else coreControl.setControlValue(attrId, 1.0);
		}
		function touchEnd(x, y) {
			if (latchMode) return;
		  	coreControl.setControlValue(attrId, 0.0);
		}
		installTouchHandler(el["0"], {touchStart:touchStart, touchMove:0, touchEnd:touchEnd});

		function installTouchHandler(element, handler, allowDefault) {
		  if (!element) return;
		  if( typeof(window.ontouchstart) == 'undefined'){
		      if (handler.touchStart) element.addEventListener("mousedown", mousedown);
		  }	else { 
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
	}
  	}]);

  	/*
	*******************************************************
		Sprite
	********************************************************
	*/

	angular.module('ngUICoreControl').directive('ccSprite', ['coreControl', function(coreControl) {
		return function ccSpriteDirective(scope, el, attr){
		    var id = attr['vcId'];
		    var numSteps = coreControl.getNumControlSteps(id);
		    scope.getHeight = function()
		    {
		      return el["0"].offsetHeight
		    }
		}
	}]);

	angular.module('ngUICoreControl').controller('ccBtnSpCtrl', ['$scope','coreControl',
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