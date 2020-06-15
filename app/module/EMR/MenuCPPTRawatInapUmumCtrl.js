define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuCPPTRawatInapUmumCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuCPPTRawatInapUmum = 'RekamMedis.AsesmenMedis.MenuCPPTRawatInapUmum.CpptNewUmum';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuCPPTRawatInapUmum = state;
                localStorage.setItem('activeMenuCPPTRawatInapUmum', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});