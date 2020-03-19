define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuMelarikandiriCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuMelarikandiri = 'RekamMedis.AsesmenMedis.MenuMelarikandiri.AsesmenRisikoMelarikanDiri';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuMelarikandiri = state;
                localStorage.setItem('activeMenuMelarikandiri', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});