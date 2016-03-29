angular.module('simon', [])
    .controller('simonController', ['$scope', '$timeout', function($scope, $timeout) {
        //scope variables
        $scope.count = 1;
        $scope.strict = "normal";
        $scope.red = "red";
        $scope.yellow = "yellow";
        $scope.blue = "blue";
        $scope.green = "green";
        //variables
        var compMoves = [];
        var playerMoves = [];
        var gameover = false;
        var time = 5000;
        //TODO: rename, contents of array are not promises
        var promiseArr = [];
        var newGame = true;

        $scope.switchMode = function(){
            //only switch mode when game has not started
            //TODO: remove conditional, wont be hit if ui element is disabled
            if(newGame){
                $scope.strict = "normal" ? $scope.strict = "strict" : $scope.strict = "normal";
            }
        };
        //cancel all timeout promises
        function cancelPromises(count){
            if(count < promiseArr.length){
                $timeout.cancel(promiseArr[count]);
                return cancelPromises(count + 1);
            }
            else return null; //this line might not be necessary
        }

        //TODO: Do not use id or class selectors. Defeats the purpose of using angular.
        function PlaySound(id) {
              var sound = document.getElementById('audio'+id);
              sound.play();
        }
        //reset all variables to starting values
        $scope.reset = function(){
              PlaySound(6);
              $scope.count = 1;
              compMoves = [];
              playerMoves = [];
              gameover = false;
              time = 5000;
              cancelPromises(0);
              newGame = true;
        };

        //visual and auditory indication of a button being pressed
        //TODO: Don't use a switch. It's clumsy. Repititious and unneccessary.
        //TODO: Don't use ids hardcoded into the html. Generate the buttons by looping over an array of color strings.
        //      Use index and value as parameters to this function.
        $scope.clickVisualEffect = function(id) {
            PlaySound(id);
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

        //TODO: fix indentation in function
        var movePattern = function(){
            //1000ms delay between moves, keep going until all moves are shown
            var x = 0;
            //TODO: define "move" function outside "movePattern"'s scope
            var move = function(){
                  var currentPos = compMoves[x];
                  $scope.clickVisualEffect(currentPos);
                  if(x < compMoves.length-1){
                      x++;
                      promiseArr[0] = $timeout(move,1000);
                  }
            };
            promiseArr[0] = $timeout(move,1000);
        };

        //TODO: fix indentation in function
        $scope.buttonPress = function(id) {
              //add the players move to the playerMoves array
              playerMoves.push(id);
              //indicate the button press
              $scope.clickVisualEffect(id);
        };

        //TODO: fix indentation in function
        $scope.nextMove = function() {
              //indicate game is in progress
              newGame = false;

              compMoves.push(Math.floor(Math.random() * 4) + 1);
        };

        //TODO: fix indentation in function
        var playerMoveCheck = function(){
            for(var i = 0; i<compMoves.length; i++){
                //end game if player moves do not match comp moves
                gameover = (compMoves[i] !== playerMoves[i]);
            }
            if(!gameover){
                playerMoves = [];
                $scope.count ++;
                if($scope.count === 21){
                    PlaySound(8);
                    $scope.reset();
                }else{
                    time=time+3000;
                    $scope.start();
                }
            }else{
                if($scope.strict === "strict"){
                    PlaySound(7);
                    $scope.reset();
                }
                else{
                PlaySound(9);
                playerMoves = [];
                movePattern();
                promiseArr[1] = $timeout(playerMoveCheck,time);
                }
            }
        };

        $scope.start = function() {
            if(newGame){
                PlaySound(5);
            }
            //choose a button to press add it to the end of the moves array
            $scope.nextMove();
            //press that button plus any previous ones
            movePattern();
            //check player moves after an increasing delay
            promiseArr[2] = $timeout(playerMoveCheck,time);
        };
    }]);
