define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuSkriningManajerUmumCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;
            

            $scope.activeMenuSkriningManajerUmum = 'RekamMedis.AsesmenUmum.MenuSkriningManajerUmum.SkriningMedisUmum';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuSkriningManajerUmum = state;
                localStorage.setItem('activeMenuSkriningManajerUmum', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});