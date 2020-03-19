define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuEdukasiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuEdukasi = 'RekamMedis.AsesmenMedis.MenuEdukasi.PengkajianEdukasi';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuEdukasi = state;
                localStorage.setItem('activeMenuEdukasi', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});