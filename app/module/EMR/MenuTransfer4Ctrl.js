define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuTransfer4Ctrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;
            

            $scope.activeMenuTransfer4 = 'RekamMedis.AsesmenMedis.MenuTransfer4.FormulirTransfer31';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuTransfer4 = state;
                localStorage.setItem('activeMenuTransfer4', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});