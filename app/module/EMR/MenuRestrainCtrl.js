define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuRestrainCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuRestrain = 'RekamMedis.AsesmenMedis.MenuRestrain.LembarObservasiPxDenganRestrain';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuRestrain = state;
                localStorage.setItem('activeMenuRestrain', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});