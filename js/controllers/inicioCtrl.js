angular.module('Frosch')
    .controller('InicioCtrl',function ($scope, $state, hotkeys) {

    hotkeys.bindTo($scope)
        .add({
            combo: 'enter',
            description: 'Iniciar',
            callback: function () {
                $state.go('jugar.seleccionEquipos');
            }
        })
});