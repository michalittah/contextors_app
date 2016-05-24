/**
 * Created by Michal on 5/23/16.
 */
angular.module('directive.clickedParagraph', ['ui.bootstrap','LocalStorageModule'])
    .directive('clickedParagraph', ["$rootScope", "$modal", "localStorageService", function($rootScope, $modal,localStorageService) {
        return {
            restrict: 'A',
            template: '<div><span ng-repeat="word in words track by $index" ng-click="wordChecked($event)">{{word}} </span></div>',
            link: function($scope, $element) {
                
                //split paragraph to words
                $scope.words = $element.attr('words').split(' ');
                
                //when word been clicked
                $scope.wordChecked = function(event){
                    $scope.currentWord=angular.element(event.target);
                    $scope.currentWord.toggleClass('hide-word');
                    //open spell-modal
                    $scope.open(event.target.innerText);
                };

                //open spell-modal
                $scope.open = function (word) {
                    var modalInstance = $modal.open({
                        templateUrl: 'myModalContent.html',
                        controller: 'SpellModalCtrl',
                        size: null,
                        resolve: {
                            word: function () {
                                return word;
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                    }, function () {
                        if($scope.currentWord) {
                            $scope.currentWord.toggleClass('hide-word');
                        }
                        localStorageService.remove('answer', 'word','checkBtn','shuffleChars');
                    });
                };

                //open modal if word is already in storage 
                var word=localStorageService.get('word');
                if(word){
                    $scope.open(word);
                }
            }
        };
    }]);