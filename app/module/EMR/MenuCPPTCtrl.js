define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuCPPTCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuCPPT = 'RekamMedis.AsesmenMedis.MenuCPPT.CPPTJiwaRanap';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuCPPT = state;
                localStorage.setItem('activeMenuCPPT', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});