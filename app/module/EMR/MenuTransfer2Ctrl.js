define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuTransfer2Ctrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;
            

            $scope.activeMenuTransfer2 = 'RekamMedis.AsesmenMedis.MenuTransfer2.FormulirTransfer19';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuTransfer2 = state;
                localStorage.setItem('activeMenuTransfer2', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});