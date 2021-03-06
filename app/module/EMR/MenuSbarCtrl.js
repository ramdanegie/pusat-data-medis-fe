define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuSbarCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuSbar = 'RekamMedis.AsesmenMedis.MenuSbar.FormulirSbar';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuSbar = state;
                localStorage.setItem('activeMenuSbar', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});