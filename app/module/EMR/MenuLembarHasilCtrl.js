define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuLembarHasilCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuLembarHasil = 'RekamMedis.AsesmenMedis.MenuLembarHasil.LembarHasilMecta';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuLembarHasil = state;
                localStorage.setItem('activeMenuLembarHasil', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});