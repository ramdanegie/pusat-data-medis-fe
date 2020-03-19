define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuTandavitalCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuTandavital = 'RekamMedis.AsesmenMedis.MenuTandavital.CatatanGrafikTandaVital';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuTandavital = state;
                localStorage.setItem('activeMenuTandavital', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});