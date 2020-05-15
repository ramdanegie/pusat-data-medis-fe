require.config({
    // urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl: '/',
    paths: {
        'LoginService': window.root + 'javascripts/Services/LoginService',
        'HttpServices': window.root + 'javascripts/Services/HttpServices',
        'core': window.root + 'javascripts/core',
        'jQuery': 'jquery',
        'Configuration': window.root + 'javascripts/Setting',
        'Service': window.root + 'javascripts/Services/Service',
        'Helper': window.root + 'javascripts/Helper',
    },
    shim: {
    }
});
require(['LoginService', 'core', "kendo.angular", 'Configuration', 'Helper', 'jQuery', 'Service', 'HttpServices'],
    function (LoginService, core, kendo, conf, helper, MedifirstService) {
        angular.module('myApp', ["kendo.directives", "core", 'LoginServices', 'LocalStorageModule', 'Services', 'HttpServices'])
            .controller('Controller', [
                'socket', '$rootScope', '$scope', '$timeout', 'LoginService', 'localStorageService',
                function (socket, $rootScope, $scope, $timeout, loginService, localStorageService) {

                    var goLogin = function (userName, password) {
                        window.localStorage.clear();
                        var delete_cookie = function (name) {
                            var today = new Date();
                            var expr = new Date(today.getTime() + (-1 * 24 * 60 * 60 * 1000));
                            document.cookie = name + '=;expires=' + (expr.toGMTString());
                        }
                        delete_cookie('tokenauth');
                        delete_cookie('statusCode');
                        delete_cookie('io');

                        loginService.authentication(
                            'username=' + userName + '&' +
                            'password=' + password
                        ).then(function (data) {

                            if (data.data['X-AUTH-TOKEN'] == undefined) {
                                window.messageContainer.error('Login Gagal username password salah');
                                $scope.isBusy = false;
                                return;
                            }
                            var cookieStr = "statusCode=;";
                            document.cookie = cookieStr;
                            document.cookie = 'tokenauth=' + data.data['X-AUTH-TOKEN'] + ";";

                            var dataUserLogin = {
                                id: data.data['X-ID'],
                                kdUser: data.data['X-USERNAME'],
                                // kdProfile: data.data.data.kdProfile,
                                waktuLogin: new Date(),
                                endWaktuLogin: new Date(new Date().getTime() + (1 * 24 * 60 * 60 * 1000))
                            };

                            // debugger
                            window.localStorage.setItem('user.login', JSON.stringify(dataUserLogin));
                            window.localStorage.setItem('pegawai', null);
                            window.localStorage.setItem('loginuser', 'username=' + userName + '&' + 'password=' + password);

                            // if (data.data.data.mapLoginUserToRuangan)
                            //     window.localStorage.setItem('mapLoginUserToRuangan', JSON.stringify(data.data.data.mapLoginUserToRuangan));
                            // if (data.data.data.profile)
                            //     window.localStorage.setItem('profile', JSON.stringify(data.data.data.profile));
                            var dataUrlRoute = [];

                            $.when(
                                $.getJSON(conf.urlRoute, function (data) {
                                    dataUrlRoute = data;
                                }),
                                $.getJSON(conf.urlRoutePelayanan, function (data) {
                                    dataUrlRoutePelayanan = data;
                                }),
                                $.getJSON(conf.urlRouteSDM, function (data) {
                                    dataUrlRouteSDM = data;
                                }),
                                $.getJSON(conf.urlRouteSarpras, function (data) {
                                    dataUrlRouteSarpras = data;
                                }),
                                $.getJSON(conf.urlRouteManagemen, function (data) {
                                    dataUrlRouteManagemen = data;
                                }),
                                $.getJSON(conf.urlRouteKeuangan, function (data) {
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
                                    socket.emit('login', data.data);
                                    window.localStorage.setItem('urlBind', JSON.stringify(dataConfig));
                                    setTimeout(function () {
                                        window.location = "/app/#/RekamMedis/AsesmenMedis";
                                        $scope.isBusy = false;
                                    }, 1000);
                                }
                            });
                        },
                            function (error) {

                                if (error.data != null)
                                    window.messageContainer.error('Login Gagal,Username Password Salah')
                                else
                                    window.messageContainer.error('Login Gagal, Koneksi Internet Tidak Stabil')
                                $scope.isBusy = false;
                                // window.messageContainer.error('Gagal masuk ke dalam system')
                            });

                    };


                    $scope.isBusy = true;
                    $scope.login = function (userName, password) {

                        var datauserlogin = JSON.parse(window.localStorage.getItem("datauserlogin"));
                        var blmLogout = !(datauserlogin == undefined || datauserlogin == null);

                        if (blmLogout) {
                            loginService.logout().then(function (e) {
                                var pegawai = JSON.parse(window.localStorage.getItem("pegawai"));
                                socket.emit('logout.otomatis', pegawai);
                                goLogin(userName, password);
                            }, function (e) {
                                goLogin(userName, password);
                            });
                        } else {
                            goLogin(userName, password);
                        }
                    };
                    // Alter Syamsu, perubahaan cara user login
                }
            ]);
        angular.bootstrap(document, ['myApp']);
    }
);