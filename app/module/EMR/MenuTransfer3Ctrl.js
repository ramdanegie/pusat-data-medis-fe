define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuTransfer3Ctrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;
            

            $scope.activeMenuTransfer3 = 'RekamMedis.AsesmenMedis.MenuTransfer3.FormulirTransfer25';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuTransfer3 = state;
                localStorage.setItem('activeMenuTransfer3', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});