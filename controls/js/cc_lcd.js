(function ( angular ) {
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
});
