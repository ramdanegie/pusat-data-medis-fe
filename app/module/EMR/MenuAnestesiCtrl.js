define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuAnestesiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;
            

            $scope.activeMenuAnestesi = 'RekamMedis.AsesmenMedis.MenuAnestesi.LaporanAnestesi';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuAnestesi = state;
                localStorage.setItem('activeMenuAnestesi', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});