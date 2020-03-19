define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuEWSAnakCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeEWSANAK = 'RekamMedis.AsesmenMedis.MenuEWSAnak.SkorEWSAnak';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeEWSANAK = state;
                localStorage.setItem('activeEWSANAK', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});