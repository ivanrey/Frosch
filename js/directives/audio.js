angular.module('Frosch')
    .directive('audio', function (audio, ConfiguracionService) {

        return {
            restrict: 'E',
            priority: 99,
            scope: {
                ngSrc: '@'
            },
            transclude: false,
            link: function (scope, element, attrs) {
                var prefix = 'assets/sounds/'+ConfiguracionService.configuracion.idioma;

                element.src = prefix+scope.ngSrc;
            }
        }
    });