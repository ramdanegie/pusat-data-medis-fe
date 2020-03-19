define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuPansECCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuPansEC = 'RekamMedis.AsesmenMedis.MenuPansEC.LembarPenilaianPansEC';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuPansEC = state;
                localStorage.setItem('activeMenuPansEC', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});