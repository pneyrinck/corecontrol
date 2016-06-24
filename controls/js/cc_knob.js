(function ( angular ) {  
  angular.module('ui.corecontrol').directive('ccKnob', function() {return vcKnobDirective;});
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
})( angular );