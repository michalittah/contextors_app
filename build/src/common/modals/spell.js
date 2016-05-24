/**
 * Created by Michal on 5/23/16.
 */
angular.module('modal.spell',[]).controller('SpellModalCtrl', ["$scope", "$modalInstance", "word", "localStorageService", function ($scope, $modalInstance, word,localStorageService) {

    //initial parameters
    $scope.result=null;
    $scope.answer =localStorageService.get('answer')|| [];
    $scope.checkBtn=localStorageService.get('checkBtn')||[];
    $scope.word =_.lowerCase(word).replace(/[\. ,:-]+/g, "");
    $scope.chars = $scope.word.split('');
    $scope.shuffleChars = localStorageService.get('shuffleChars')||_.shuffle($scope.chars);

    //update answer on every spell
    $scope.updateAnswer=function(par,index){
        $scope.result=null;
        if (!$scope.checkBtn[index]) {
            $scope.answer.push(par);
            $scope.checkBtn[index]=true;

            //set local storage
            localStorageService.set('word', $scope.word);
            localStorageService.set('checkBtn', $scope.checkBtn);
            localStorageService.set('answer', $scope.answer);
            localStorageService.set('shuffleChars', $scope.shuffleChars);
        }
    };

    //clean answer
    $scope.clean = function () {
        $scope.answer=[];
        $scope.checkBtn=[];
        $scope.result=null;
    };

    //hint function show the next letter
    $scope.hint = function () {
        for(var i=0;i<$scope.chars.length;i++){
            if(!$scope.answer[i]){
                $scope.answer[i]=$scope.chars[i];
                $scope.checkBtn[_.indexOf($scope.shuffleChars , $scope.chars[i])]=true;
                break;
            }
        }
    };

    //check result
    $scope.check = function () {
        var diff=0;
        for(var i=0;i<$scope.chars.length;i++){
            if($scope.answer[i]!==$scope.chars[i]){
                diff+=1;
            } 
        }
        $scope.result=((1- diff/$scope.chars.length)*100).toFixed(0) +"%";
    };
}]);