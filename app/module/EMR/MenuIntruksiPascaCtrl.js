define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuIntruksiPascaCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;
            

            $scope.activeMenuIntruksiPasca = 'RekamMedis.RekamMedis.AsesmenMedis.MenuIntruksiPasca.MenuIntruksiPasca.IntruksiPascaAnastesi';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuIntruksiPasca = state;
                localStorage.setItem('activeMenuIntruksiPasca', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});