define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuKegiatanRehabCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuKegiatanRehab = 'RekamMedis.AsesmenMedis.MenuKegiatanRehab.LembarKegiatanRehab';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuKegiatanRehab = state;
                localStorage.setItem('activeMenuKegiatanRehab', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});