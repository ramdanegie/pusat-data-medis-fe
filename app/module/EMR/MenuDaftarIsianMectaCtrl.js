define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuDaftarIsianMectaCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuDaftarIsianMecta = 'RekamMedis.AsesmenMedis.MenuDaftarIsianMecta.DaftarIsianMecta';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuDaftarIsianMecta = state;
                localStorage.setItem('activeMenuDaftarIsianMecta', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});