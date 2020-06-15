define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuTransferUmumCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;
            

            $scope.activeMenuTransferUmum = 'RekamMedis.AsesmenUmum.MenuTransferUmum.FormulirTransferUmum';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuTransferUmum = state;
                localStorage.setItem('activeMenuTransferUmum', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});