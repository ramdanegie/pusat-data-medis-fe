define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuPemesananCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuPemesanan = 'RekamMedis.AsesmenMedis.MenuPemesanan.PemesananMakanan';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuPemesanan = state;
                localStorage.setItem('activeMenuPemesanan', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});