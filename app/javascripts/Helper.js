define(['Configuration'], function (configuration) {
    'use strict';
    return {
        getRouting: function (isFromLogin) {
            var dataUrlRoute = [];
            var dataUrlRoutePelayanan = [];
            var dataUrlRouteSDM = [];
            var dataUrlRouteSarpras = [];
            var dataUrlRouteManagemen = [];
            var dataUrlRouteKeuangan = [];
            $.when(
                $.getJSON(configuration.urlRoute, function (data) {
                    dataUrlRoute = data;
                }),
                $.getJSON(configuration.urlRoutePelayanan, function (data) {
                    dataUrlRoutePelayanan = data;
                }),
                $.getJSON(configuration.urlRouteSDM, function (data) {
                    dataUrlRouteSDM = data;
                }),
                $.getJSON(configuration.urlRouteSarpras, function (data) {
                    dataUrlRouteSarpras = data;
                }),
                $.getJSON(configuration.urlRouteManagemen, function (data) {
                    dataUrlRouteManagemen = data;
                }),
                $.getJSON(configuration.urlRouteKeuangan, function (data) {
                    dataUrlRouteKeuangan = data;
                })
            ).then(function () {
                var msgError = "";
                var arrDataConfig = [dataUrlRoute, dataUrlRoutePelayanan, dataUrlRouteSDM, dataUrlRouteSarpras, dataUrlRouteManagemen, dataUrlRouteKeuangan];
                var dataConfig = [];
                dataConfig.push({
                    "nameDep": "jQuery",
                    "urlDep": "../jquery"
                });
                for (var i = 0; i < arrDataConfig.length; i++) {
                    for (var k = 0; k < arrDataConfig[i].length; k++) {
                        dataConfig.push(arrDataConfig[i][k]);
                    }
                }

                if (msgError == "") {
                    window.localStorage.setItem('urlBind', JSON.stringify(dataConfig));
                    if (isFromLogin) {
                        window.location = "/app/#/home";
                    }
                }
            });
        },
    };
});