angular.module('translate', ['pascalprecht.translate'])
    .config(function ($translateProvider) {

        $translateProvider.useStaticFilesLoader({
            prefix: 'assets/lang/',
            suffix: '.json'
        });


        $translateProvider.preferredLanguage('es-co');
    })
    .filter('translateReplace', function ($translate) {
        return function (translationId, interpolateParams, interpolation) {
            var traduccion = $translate.instant(translationId, interpolateParams, interpolation);
            angular.forEach(interpolateParams, function (val, key) {
                if (traduccion.indexOf('%' + key + '%') !== -1) {
                    traduccion = traduccion.replace('%' + key + '%', val);
                }
            });
            return traduccion;
        };
    })
    .filter('translateAudio', function ($translate) {
        return function (audioSrc) {
            return 'assets/sounds/'+$translate.use()+'/'+audioSrc;
        }
    });