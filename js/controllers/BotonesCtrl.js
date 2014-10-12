angular.module('Frosch')
    .controller('BotonesCtrl', function ($scope, $timeout,  hotkeys) {
        'use strict';

        hotkeys.bindTo($scope)
            .add({
                combo: 'down',
                callback: function () {
                    $scope.seleccionado++;
                    if ($scope.seleccionado > $scope.max)
                        $scope.seleccionado = 1;

                }
            })
            .add({
                combo: 'up',
                callback: function () {
                    $scope.seleccionado--;
                    if ($scope.seleccionado < 1)
                        $scope.seleccionado = $scope.max;
                }
            })
            .add({
                combo: 'enter',
                callback: function () {
                    if($scope.seleccionado)
                        $scope.callback.configurar($scope.seleccionado);
                }
            })
        ;

        $scope.seleccionado = 0;
    });
