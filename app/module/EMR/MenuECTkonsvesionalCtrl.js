define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuECTkonsvesionalCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuECTkonsvesional = 'RekamMedis.AsesmenMedis.MenuECTkonsvesional.ECTkonsvesional';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuECTkonsvesional = state;
                localStorage.setItem('activeMenuECTkonsvesional', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});