define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MenuAsesmenPraAnestesiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function ($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;

            $scope.activeMenuAsesmenPraAnestesi = 'RekamMedis.AsesmenMedis.MenuAsesmenPraAnestesi.AsesmenPraAnestesi';
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function (state) {
                $scope.activeMenuAsesmenPraAnestesi = state;
                localStorage.setItem('activeMenuAsesmenPraAnestesi', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});