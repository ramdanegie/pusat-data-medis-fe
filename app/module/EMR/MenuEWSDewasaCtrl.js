define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuEWSDewasaCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuEWSDewasa = 'RekamMedis.AsesmenMedis.MenuEWSDewasa.SkorEWSDewasa';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuEWSDewasa = state;
                localStorage.setItem('activeMenuEWSDewasa', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});