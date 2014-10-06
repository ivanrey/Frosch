angular.module('translate', ['pascalprecht.translate'])
    .config(function ($translateProvider) {

        $translateProvider.useStaticFilesLoader({
            prefix: 'assets/idioma/',
            suffix: '.json'
        });


        $translateProvider.preferredLanguage('es-co');
    });