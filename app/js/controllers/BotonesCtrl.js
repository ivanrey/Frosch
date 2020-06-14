angular.module('Frosch')
    .controller('BotonesCtrl', function ($scope, $timeout,  hotkeys) {
        'use strict';

        hotkeys.bindTo($scope)
            .add({
                combo: $scope.keymap.abajo,
                callback: function () {
                    $scope.seleccionado++;
                    if ($scope.seleccionado > $scope.max)
                        $scope.seleccionado = 1;

                }
            })
            .add({
                combo: $scope.keymap.arriba,
                callback: function () {
                    $scope.seleccionado--;
                    if ($scope.seleccionado < 1)
                        $scope.seleccionado = $scope.max;
                }
            })
            .add({
                combo: $scope.keymap.enter,
                callback: function () {
                    if($scope.seleccionado)
                        $scope.callback.configurar($scope.seleccionado);
                }
            })
        ;

        $scope.seleccionado = 0;
    });
