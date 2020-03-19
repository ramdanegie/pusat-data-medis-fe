define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuHasilRadCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuHasilRad = 'RekamMedis.AsesmenMedis.MenuHasilRad.HasilRadiologiAss';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuHasilRad = state;
                localStorage.setItem('activeMenuHasilRad', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});