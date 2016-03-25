angular.module('simon', [])
  .controller('simonController', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.count = 0;
    $scope.strict = "strict";
    $scope.moves = [];
    $scope.playerMoves = [];
    $scope.colors = ['red', 'yellow', 'blue', 'green'];
    var x = 0;
    //visual indiation of a button being pressed
    $scope.clickVisualEffect = function(element, color) {

      element.css({
        'background': 'white'
      });
      $timeout(function() {
        element.css({
          'background': color
        });
      }, 500);
    }
    
    var movePattern = function(){
      
    }
    
    
    $scope.buttonPress = function(event, color) {
      //indicate the button press
      element = angular.element(event.target);
      $scope.clickVisualEffect(element, color);

    }
    $scope.nextMove = function() {
      $scope.moves.push(Math.floor(Math.random() * 4) + 1);
    };
    $scope.start = function() {
      //choose a button to press add it to the end of the moves array
      $scope.nextMove();
      //press that button plus any previous ones
      
      
      
      
      //evaluate player button press sequence

      //increment score or end the game
    }

  }]);