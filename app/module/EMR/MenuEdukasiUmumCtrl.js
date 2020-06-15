define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuEdukasiUmumCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;
            

            $scope.activeMenuEdukasiUmum = 'RekamMedis.AsesmenUmum.MenuEdukasiUmum.PengkajianEdukasiUmum';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuEdukasiUmum = state;
                localStorage.setItem('activeMenuEdukasiUmum', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});