(function ( angular ) { 
    angular.module('ui.corecontrol').directive('ccMeterSimple', function() {
    return function ccMeterSimpleDirective(scope, element, attr)
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
})( angular );