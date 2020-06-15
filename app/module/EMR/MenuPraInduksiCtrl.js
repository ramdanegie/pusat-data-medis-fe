define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuPraInduksiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuPraInduksi = 'RekamMedis.AsesmenMedis.MenuPraInduksi.PraInduksi';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuPraInduksi = state;
                localStorage.setItem('activeMenuPraInduksi', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});