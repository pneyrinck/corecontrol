(function ( angular ) {  
  angular.module('ui.corecontrol').directive('ccKnob', function() {return ccKnobDirective;});
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


// the knob does not use any data binding and could probably just be a directive.
// but I need a scope to share data with other directives. My solution is to use a controller.
angular.module('ui.corecontrol').controller('ccKnobCtrl', ['$scope', 'coreControl',
function ccKnobDirective($scope, coreControl) {
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

angular.module('ui.corecontrol').directive('ccKnobDraw', ['coreControl', function(coreControl) {
return function ccKnobDrawDirective(scope, element, attr) {
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

angular.module('ui.corecontrol').directive('ccKnob2', ['coreControl', function(coreControl) {
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
    numTicks=Math.trunc((angle-startAngle)*20);   // adHocVal constant.
    if (numTicks != 0)
    {
//      console.log("numTicks = "+numTicks)
      coreControl.setControlValue(id, numTicks);
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

})( angular );