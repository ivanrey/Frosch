angular.module('Frosch')
    .directive('opcion', function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'html/opcion.html',
            link: function(scope, element, attrs){
                scope.opcion = attrs.opcion;

            },
            scope: true
        }
    });