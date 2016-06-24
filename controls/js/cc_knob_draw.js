(function ( angular ) {   
  angular.module('ui.corecontrol').directive('ccKnobDraw', ['vcproSurface', function(vcproSurface) {
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
})( angular );