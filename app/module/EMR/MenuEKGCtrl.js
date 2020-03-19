define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuEKGCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuEKG = 'RekamMedis.AsesmenMedis.MenuEKG.EKG';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuEKG = state;
                localStorage.setItem('activeMenuEKG', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});