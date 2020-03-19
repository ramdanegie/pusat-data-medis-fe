define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuBunuhDiriCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuBunuhDiri = 'RekamMedis.AsesmenMedis.MenuKekerasan.AsesmenFisik';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuBunuhDiri = state;
                localStorage.setItem('activeMenuBunuhDiri', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});