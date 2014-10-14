angular.module('Frosch')
    .controller('NotificacionCtrl',
    function ($scope, $state, config, $timeout) {

        var timer = $timeout(function () {
            $state.go('jugar.chico.principal')
        }, 5000);

        $scope.$on("$destroy",
            function (event) {
                $timeout.cancel(timer);
            }
        );

    });