define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuObservasiFisikCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuObservasiFisik = 'RekamMedis.AsesmenMedis.MenuObservasiFisik.ObservasiFisik';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuObservasiFisik = state;
                localStorage.setItem('activeMenuObservasiFisik', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});