(function ( angular ) {	
	angular.module('ui.corecontrol').directive('ccBankTouch', ['vcproSurface', function(vcproSurface) {
	return function (scope, element, attr){
		var mc = new Hammer.Manager(element["0"], {
		preventDefault: true
	    ,recognizers: [
	        // RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
	        [Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL, pointers:2 }]
	        ,[Hammer.Pan,{ direction: Hammer.DIRECTION_HORIZONTAL , pointers:1}]
	        ,[Hammer.Tap,{ taps:2, pointers:2 }]
	    ]
		});

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
});