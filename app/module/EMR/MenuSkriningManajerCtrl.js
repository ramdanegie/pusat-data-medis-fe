define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuSkriningManajerCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;
            

            $scope.activeMenuSkriningManajer = 'RekamMedis.AsesmenMedis.MenuSkriningManajer.SkriningMedis';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuSkriningManajer = state;
                localStorage.setItem('activeMenuSkriningManajer', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});