define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuCPPTRawatInapCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuCPPTRawatInap = 'RekamMedis.AsesmenMedis.MenuCPPTRawatInap.CpptNew';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuCPPTRawatInap = state;
                localStorage.setItem('activeMenuCPPTRawatInap', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});