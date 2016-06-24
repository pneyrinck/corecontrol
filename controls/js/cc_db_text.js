(function ( angular ) { 
	angular.module('ui.corecontrol').directive('ccDbText', ['$timeout', 'vcproSurface', 'appService', function($timeout, vcproSurface, appService) {
	return function ccDbTextDirective(scope, element, attr) {
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
})( angular );