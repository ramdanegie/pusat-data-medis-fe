define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuCPKCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuCPK = 'RekamMedis.AsesmenMedis.MenuCPK.CatatanPerkembanganKeperawatan';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuCPK = state;
                localStorage.setItem('activeMenuCPK', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});