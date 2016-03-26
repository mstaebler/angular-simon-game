angular.module('simon', [])
  .controller('simonController', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.count = 1;
    $scope.strict = "strict";
    compMoves = [];
    playerMoves = [];
    $scope.colors = ['red', 'yellow', 'blue', 'green'];
    $scope.red = "red";
    $scope.yellow = "yellow";
    $scope.blue = "blue";
    $scope.green = "green";
    $scope.hide = "hide";
    var gameover = false;
    var time = 5000;
    var promiseOne ='';
    var promiseTwo ='';
    var promiseThree ='';


    $scope.reset = function(){
      $scope.count = 1;
      compMoves = [];
      playerMoves = [];
      gameover = false;
      time = 5000;
      $timeout.cancel(promiseOne);
      $timeout.cancel(promiseTwo);
      $timeout.cancel(promiseThree);
      $scope.hide = "hide";
    };

    //visual indiation of a button being pressed
    $scope.clickVisualEffect = function(id) {

      switch(id){
        case 1:
        $scope.red = 'white';
        $timeout(function() {
        $scope.red = 'red';
        }, 500);
        break;
        case 2:
        $scope.yellow = 'white';
        $timeout(function() {
        $scope.yellow = 'yellow';
        }, 500);
        break;
        case 3:
        $scope.blue = 'white';
        $timeout(function() {
        $scope.blue = 'blue';
        }, 500);
        break;
        case 4:
        $scope.green = 'white';
        $timeout(function() {
        $scope.green = 'green';
        }, 500);
        break;
      }

    };

    var movePattern = function(){
        //500ms delay between moves, keep going until all moves are shown
        var x = 0;
        var move = function(){
          var currentPos = compMoves[x];
          $scope.clickVisualEffect(currentPos);
          if(x < compMoves.length-1){
            x++;
            promiseOne = $timeout(move,1000);
          }
        };
        promiseOne = $timeout(move,1000);
    };


    $scope.buttonPress = function(id) {
      playerMoves.push(id);
      //indicate the button press
      $scope.clickVisualEffect(id);

    };
    $scope.nextMove = function() {

      compMoves.push(Math.floor(Math.random() * 4) + 1);
    };
    var playerMoveCheck = function(){
      for(var i = 0; i<compMoves.length;i++){
          gameover = (compMoves[i]!==playerMoves[i]);
          console.log(compMoves[i]+" "+playerMoves[i]);
      }
      if(!gameover){
        playerMoves = [];
        $scope.count ++;
        time=time+3000;
        $scope.start();
      }else{
        console.log("wrong try again");
        playerMoves = [];
        promiseTwo = $timeout(playerMoveCheckStrict,time);
      }
    };

    var playerMoveCheckStrict = function(){
      for(var i = 0; i<compMoves.length;i++){
          gameover = (compMoves[i]!==playerMoves[i]);
          console.log(compMoves[i]+" "+playerMoves[i]);
      }
      if(!gameover){
        playerMoves = [];
        $scope.count ++;
        time=time+3000;
        $scope.start();
      }else{
        console.log("you lose");
        $scope.hide = 'show';
      }
    };
    $scope.start = function() {


        //choose a button to press add it to the end of the moves array
        $scope.nextMove();
        //press that button plus any previous ones
        movePattern();

        promiseThree = $timeout(playerMoveCheckStrict,time);




      //evaluate player button press sequence

      //increment score or end the game
    };

  }]);
