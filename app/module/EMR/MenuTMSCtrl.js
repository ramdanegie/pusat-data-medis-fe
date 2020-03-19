define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuTMSCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuTMS = 'RekamMedis.AsesmenMedis.MenuTMS.TindakanTMS';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuTMS = state;
                localStorage.setItem('activeMenuTMS', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});