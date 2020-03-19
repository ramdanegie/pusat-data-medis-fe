define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuTransferCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;
            

            $scope.activeMenuTransfer = 'RekamMedis.AsesmenMedis.MenuTransfer.FormulirTransfer';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuTransfer = state;
                localStorage.setItem('activeMenuTransfer', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});