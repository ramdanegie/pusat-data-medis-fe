define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuKonselingCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuKonseling = 'RekamMedis.AsesmenMedis.MenuKonseling.RingkasanKonseling';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuKonseling = state;
                localStorage.setItem('activeMenuKonseling', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});