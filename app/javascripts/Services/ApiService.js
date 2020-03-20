define(['Configuration'], function (config) {
    // AINK MACAN LAPAR
    var urlData = config.baseApiBackend;

    var apiService = angular.module('ApiService', []);
    apiService.service('ApiService', ['$mdDialog', '$q', '$http',
        function ($mdDialog, $q, $http) {
            return {

                get: function (obj) {
                    // var online = navigator.onLine
                    // if (online == false) {

                    //     window.location.href = window.location.origin + window.location.pathname + '#/ErrorPage'
                    //     toastr.error('Maaf, koneksi ke server terputus ', 'Error')
                    //     var data = {
                    //         "statResponse": false,
                    //     }
                    //     var deffer = $q.defer();
                    //     deffer.resolve(data);
                    //     return deffer.promise;
                    // }
                    var deffer = $q.defer();
                    if (obj.method === undefined)
                        obj.method = "GET";
                    var authorization = ""// "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";
                    var arr = document.cookie.split(';')
                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i].split('=');
                        if (element[0].indexOf('authorizationss') > -1) {
                            authorization = element[1];
                        }
                    }
                    var url = "";
                    if (obj.url.indexOf("?") >= 0) {
                        url = obj.url;
                    } else
                        url = obj.url;

                    $http.get(url, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-AUTH-TOKEN': authorization
                        }
                    }).then(function successCallback(response) {
                        response.statResponse = true;
                        deffer.resolve(response);
                    }, function errorCallback(response) {
                        if (response.data == null)
                            window.messageContainer.error("Maaf, Terjadi kesalahan saat memproses data");
                        response.statResponse = false;
                        deffer.resolve(response);
                    });
                    return deffer.promise;
                },
                post: function (obj, data) {
                    // console.log(JSON.stringify(data));
                    var deffer = $q.defer();
                    var authorization = ""//"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";
                    var arr = document.cookie.split(';')
                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i].split('=');
                        if (element[0].indexOf('authorizationss') > -1) {
                            authorization = element[1];
                        }
                    }
                    var url = "";
                    if (obj.url.indexOf("?") >= 0) {
                        url = obj.url;
                    } else
                        url = obj.url;
                    var req = {
                        method: 'POST',
                        url: url,
                        headers: {
                            'Content-Type': 'application/json',
                            'X-AUTH-TOKEN': authorization
                        },
                        data: data
                    }
                    $http(req).then(function successCallback(response, a, b) {
                        /*var msg = response.headers("x-message");
                        window.messageContainer.log(msg);*/

                        var msg = response.data.messages;
                        window.messageContainer.log(msg);

                        deffer.resolve(response);
                    }, function errorCallback(response) {
                        //var msgError = response.headers("x-message");

                        if (response.data != null) {
                            var msgError = response.data.messages;

                            if (msgError != "") {
                                var p = response.data.errors

                                for (var key in p) {
                                    if (p.hasOwnProperty(key)) {
                                        for (var i = 0; i < p[key].length; i++) {
                                            window.messageContainer.error(key + " : " + p[key][i])
                                        }
                                    }
                                }

                                window.messageContainer.error(msgError);
                            }
                        }
                        else {
                            window.messageContainer.error("Maaf, halaman API tidak ditemukan");
                        }

                        deffer.reject(response);

                    });
                    return deffer.promise;
                },
                put: function (obj, data) {
                    // console.log(JSON.stringify(data));
                    var deffer = $q.defer();
                    var authorization = ""//"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";
                    var arr = document.cookie.split(';')
                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i].split('=');
                        if (element[0].indexOf('authorizationss') > -1) {
                            authorization = element[1];
                        }
                    }
                    var url = "";
                    if (obj.url.indexOf("?") >= 0) {
                        url = obj.url;
                    } else
                        url = obj.url;
                    var req = {
                        method: 'PUT',
                        url: url,
                        headers: {
                            'Content-Type': 'application/json',
                            'X-AUTH-TOKEN': authorization
                        },
                        data: data
                    }
                    $http(req).then(function successCallback(response, a, b) {

                        var msg = response.data.messages;
                        window.messageContainer.log(msg);

                        deffer.resolve(response);
                    }, function errorCallback(response) {
                        var msgError = response.data.messages;

                        if (msgError != "") {
                            var p = response.data.errors

                            for (var key in p) {
                                if (p.hasOwnProperty(key)) {
                                    for (var i = 0; i < p[key].length; i++) {
                                        window.messageContainer.error(key + " : " + p[key][i])
                                    }
                                }
                            }

                            window.messageContainer.error(msgError);
                        }

                        deffer.reject(response);
                    });
                    return deffer.promise;
                },
                delete: function (obj) {
                    var deffer = $q.defer();
                    var authorization = ""//"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";
                    var arr = document.cookie.split(';')
                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i].split('=');
                        if (element[0].indexOf('authorizationss') > -1) {
                            authorization = element[1];
                        }
                    }
                    url = obj.url;
                    var req = {
                        method: 'DELETE',
                        url: url,
                        headers: {
                            'Content-Type': 'application/json',
                            'X-AUTH-TOKEN': authorization
                        }
                    }
                    $http(req).then(function successCallback(response, a, b) {

                        var msg = response.headers("x-message");
                        window.messageContainer.log(msg);

                        deffer.resolve(response);
                    }, function errorCallback(response) {
                        var msgError = response.headers("x-message");

                        if (msgError != "") {
                            var p = response.data.errors

                            for (var key in p) {
                                if (p.hasOwnProperty(key)) {
                                    for (var i = 0; i < p[key].length; i++) {
                                        window.messageContainer.error(key + " : " + p[key][i])
                                    }
                                }
                            }
                        }

                        deffer.reject(response);
                    });
                    return deffer.promise;
                },
                postNonMessage: function (obj, data) {
                    console.log(JSON.stringify(data));
                    var deffer = $q.defer();
                    var authorization = ""//"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";
                    var arr = document.cookie.split(';')
                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i].split('=');
                        if (element[0].indexOf('authorizationss') > -1) {
                            authorization = element[1];
                        }
                    }
                    var url = "";
                    if (obj.url.indexOf("?") >= 0) {
                        url = obj.url;
                    } else
                        url = obj.url;
                    var req = {
                        method: 'POST',
                        url: url,
                        headers: {
                            'Content-Type': 'application/json',
                            'X-AUTH-TOKEN': authorization
                        },
                        data: data
                    }
                    $http(req).then(function successCallback(response, a, b) {
                        /*var msg = response.headers("x-message");
                        window.messageContainer.log(msg);*/

                        // var msg = response.data.messages;
                        // window.messageContainer.log(msg);

                        deffer.resolve(response);
                    }, function errorCallback(response) {
                        //var msgError = response.headers("x-message");

                        if (response.data != null) {
                            var msgError = response.data.messages;

                            if (msgError != "") {
                                var p = response.data.errors

                                for (var key in p) {
                                    if (p.hasOwnProperty(key)) {
                                        for (var i = 0; i < p[key].length; i++) {
                                            window.messageContainer.error(key + " : " + p[key][i])
                                        }
                                    }
                                }

                                window.messageContainer.error(msgError);
                            }
                        }
                        else {
                            window.messageContainer.error("Maaf, alamat API tidak ditemukan");
                        }

                        deffer.reject(response);

                    });
                    return deffer.promise;
                },
                deleteNonMessage: function (obj) {
                    // console.log(JSON.stringify(data));
                    var deffer = $q.defer();
                    var authorization = ""//"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";
                    var arr = document.cookie.split(';')
                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i].split('=');
                        if (element[0].indexOf('authorizationss') > -1) {
                            authorization = element[1];
                        }
                    }
                    var url = "";
                    if (obj.url.indexOf("?") >= 0) {
                        url = obj.url;
                    } else
                        url = obj.url;
                    var req = {
                        method: 'DELETE',
                        url: url,
                        headers: {
                            'Content-Type': 'application/json',
                            'X-AUTH-TOKEN': authorization
                        },
                        // data: data
                    }
                    $http(req).then(function successCallback(response, a, b) {
                        /*var msg = response.headers("x-message");
                        window.messageContainer.log(msg);*/

                        // var msg = response.data.messages;
                        // window.messageContainer.log(msg);

                        deffer.resolve(response);
                    }, function errorCallback(response) {
                        //var msgError = response.headers("x-message");

                        if (response.data != null) {
                            var msgError = response.data.messages;

                            if (msgError != "") {
                                var p = response.data.errors

                                for (var key in p) {
                                    if (p.hasOwnProperty(key)) {
                                        for (var i = 0; i < p[key].length; i++) {
                                            window.messageContainer.error(key + " : " + p[key][i])
                                        }
                                    }
                                }

                                window.messageContainer.error(msgError);
                            }
                        }
                        else {
                            window.messageContainer.error("Maaf, halaman API tidak ditemukan");
                        }

                        deffer.reject(response);

                    });
                    return deffer.promise;
                },
                putNonMessage: function (obj, data) {
                    // console.log(JSON.stringify(data));
                    var deffer = $q.defer();
                    var authorization = ""//"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";
                    var arr = document.cookie.split(';')
                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i].split('=');
                        if (element[0].indexOf('authorizationss') > -1) {
                            authorization = element[1];
                        }
                    }
                    var url = "";
                    if (obj.url.indexOf("?") >= 0) {
                        url = obj.url;
                    } else
                        url = obj.url;
                    var req = {
                        method: 'PUT',
                        url: url,
                        headers: {
                            'Content-Type': 'application/json',
                            'X-AUTH-TOKEN': authorization
                        },
                        data: data
                    }
                    $http(req).then(function successCallback(response, a, b) {
                        /*var msg = response.headers("x-message");
                        window.messageContainer.log(msg);*/

                        // var msg = response.data.messages;
                        // window.messageContainer.log(msg);

                        deffer.resolve(response);
                    }, function errorCallback(response) {
                        //var msgError = response.headers("x-message");

                        if (response.data != null) {
                            var msgError = response.data.messages;

                            if (msgError != "") {
                                var p = response.data.errors

                                for (var key in p) {
                                    if (p.hasOwnProperty(key)) {
                                        for (var i = 0; i < p[key].length; i++) {
                                            window.messageContainer.error(key + " : " + p[key][i])
                                        }
                                    }
                                }

                                window.messageContainer.error(msgError);
                            }
                        }
                        else {
                            window.messageContainer.error("Maaf, halaman API tidak ditemukan");
                        }

                        deffer.reject(response);

                    });
                    return deffer.promise;
                },
                getPegawai: function () {
                    return JSON.parse(window.localStorage.getItem('pegawai'));
                },
                getUserLogin: function () {
                    return JSON.parse(window.localStorage.getItem('datauserlogin'));
                },
                getMapLoginUserToRuangan: function () {
                    return JSON.parse(window.localStorage.getItem('mapLoginUserToRuangan'));
                },                               

                getPart: function (nameGeneric, kendoSource, isServerFiltering, top, filter, select) {
                    //#di PHP
                    // if(isset($req['filter']['filters'][0]['value']) &&
                    //     $req['filter']['filters'][0]['value']!="" &&
                    //     $req['filter']['filters'][0]['value']!="undefined"){
                    //     $dataProduk = $dataProduk->where('pr.namaproduk','ilike','%'. $req['filter']['filters'][0]['value'].'%' );
                    // };

                    //#di js
                    // modelItemAkuntansi.getDataDummyPHP("BPJS/get-detail-produk-kelompok", true, true, 20).then(function(data) {
                    //     $scope.listproduk= data;
                    var deffer = $q.defer();
                    if (isServerFiltering === undefined)
                        isServerFiltering = false;
                    var arr = document.cookie.split(';')
                    var authorization = "";

                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i].split('=');
                        if (element[0].indexOf('authorizationss') > -1) {
                            authorization = element[1];
                        }
                    }
                    if (kendoSource) {
                        var currentTop = '';
                        if (top !== undefined)
                            if (urlData.indexOf('?') >= 0)
                                currentTop = "&take=" + top;
                            else
                                currentTop = "?take=" + top;
                        if (!select) {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=*";
                            else
                                currentTop += "?select=*";
                        } else {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=" + select
                            else
                                currentTop += "?select=" + select;
                        };

                        var url = "";
                        url = urlData + nameGeneric + currentTop;
                        if (url.indexOf("?") >= 0) {
                            url = url //+ "&X-AUTH-TOKEN=" + authorization;
                        } else
                            url = url //+ "?X-AUTH-TOKEN=" + authorization;
                        var kendoSourceData = new kendo.data.DataSource({
                            filter: filter,
                            serverFiltering: isServerFiltering,
                            transport: {
                                read: {
                                    type: 'GET',
                                    url: url,
                                    dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-AUTH-TOKEN': authorization
                                    }
                                }
                            }
                        });

                        if (kendoSourceData != undefined) {
                            deffer.resolve(kendoSourceData);
                        } else {

                            deffer.reject();
                        }


                    } else {
                        var currentTop = '';

                        if (top !== undefined) {
                            if (urlData.indexOf('?') >= 0)
                                currentTop = "&take=" + top;
                            else
                                currentTop = "?take=" + top;
                        }
                        var url = "";
                        if (!select) {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=*";
                            else
                                currentTop += "?select=*";
                        } else {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=" + select
                            else
                                currentTop += "?select=" + select;
                        };
                        url = urlData + nameGeneric + currentTop;
                        if (url.indexOf("?") >= 0) {
                            url = url + "&X-AUTH-TOKEN=" + authorization;
                        } else
                            url = url + "?X-AUTH-TOKEN=" + authorization;

                        $http({
                            method: 'GET',
                            url: url,
                            headers: {
                                'Content-Type': 'application/json',
                                'X-AUTH-TOKEN': authorization
                            }

                        }).then(function successCallback(response) {
                            if (response.status === 200) {

                                var data = response.data;
                                data.statResponse = true;
                                deffer.resolve(data);
                            }
                        }, function errorCallback(response) {
                            var data = {
                                "statResponse": false,
                            }
                            deffer.resolve(data);
                        });
                    }

                    return deffer.promise;

                },
                getDataDummyPHPV2: function (nameGeneric, kendoSource, isServerFiltering, top, filter, select) {

                    var deffer = $q.defer();
                    if (isServerFiltering === undefined)
                        isServerFiltering = false;
                    var arr = document.cookie.split(';')
                    var authorization = "";

                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i].split('=');
                        if (element[0].indexOf('authorizationss') > -1) {
                            authorization = element[1];
                        }
                    }
                    if (kendoSource) {
                        var currentTop = '';
                        if (top !== undefined)
                            if (urlData.indexOf('?') >= 0)
                                currentTop = "&take=" + top;
                            else
                                currentTop = "?take=" + top;
                        if (!select) {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=*";
                            else
                                currentTop += "?select=*";
                        } else {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=" + select
                            else
                                currentTop += "?select=" + select;
                        };

                        var url = "";
                        url = urlData + nameGeneric;
                        if (url.indexOf("?") >= 0) {
                            url = url //+ "&X-AUTH-TOKEN=" + authorization;
                        } else
                            url = url //+ "?X-AUTH-TOKEN=" + authorization;
                        var kendoSourceData = new kendo.data.DataSource({
                            filter: filter,
                            serverFiltering: isServerFiltering,
                            transport: {
                                read: {
                                    type: 'GET',
                                    url: url,
                                    dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-AUTH-TOKEN': authorization
                                    }
                                }
                            }
                        });

                        if (kendoSourceData != undefined) {
                            deffer.resolve(kendoSourceData);
                        } else {

                            deffer.reject();
                        }


                    } else {
                        var currentTop = '';

                        if (top !== undefined) {
                            if (urlData.indexOf('?') >= 0)
                                currentTop = "&take=" + top;
                            else
                                currentTop = "?take=" + top;
                        }
                        var url = "";
                        if (!select) {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=*";
                            else
                                currentTop += "?select=*";
                        } else {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=" + select
                            else
                                currentTop += "?select=" + select;
                        };
                        url = urlData + nameGeneric

                        $http({
                            method: 'GET',
                            url: url,
                            headers: {
                                'Content-Type': 'application/json',
                                'X-AUTH-TOKEN': authorization
                            }

                        }).then(function successCallback(response) {
                            if (response.status === 200) {

                                var data = response.data;
                                data.statResponse = true;
                                deffer.resolve(data);
                            }
                        }, function errorCallback(response) {
                            var data = {
                                "statResponse": false,
                            }
                            deffer.resolve(data);
                        });
                    }

                    return deffer.promise;

                },
                getDataDummyPHP2: function (ididid, nameGeneric, kendoSource, isServerFiltering, top, filter, select) {

                    var deffer = $q.defer();
                    if (isServerFiltering === undefined)
                        isServerFiltering = false;
                    var arr = document.cookie.split(';')
                    var authorization = "";

                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i].split('=');
                        if (element[0].indexOf('authorizationss') > -1) {
                            authorization = element[1];
                        }
                    }
                    if (kendoSource) {
                        var currentTop = '';
                        if (top !== undefined)
                            if (urlData.indexOf('?') >= 0)
                                currentTop = "&take=" + top;
                            else
                                currentTop = "?take=" + top;
                        if (!select) {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=*";
                            else
                                currentTop += "?select=*";
                        } else {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=" + select
                            else
                                currentTop += "?select=" + select;
                        };

                        var url = "";
                        url = urlData + nameGeneric + currentTop;
                        if (url.indexOf("?") >= 0) {
                            url = url //+ "&X-AUTH-TOKEN=" + authorization;
                        } else
                            url = url //+ "?X-AUTH-TOKEN=" + authorization;
                        var kendoSourceData = new kendo.data.DataSource({
                            filter: filter,
                            serverFiltering: isServerFiltering,
                            transport: {
                                read: {
                                    type: 'GET',
                                    url: url,
                                    dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-AUTH-TOKEN': authorization
                                    }
                                }
                            },
                            idididid: ididid
                        });

                        if (kendoSourceData != undefined) {
                            deffer.resolve(kendoSourceData);
                        } else {

                            deffer.reject();
                        }


                    } else {
                        var currentTop = '';

                        if (top !== undefined) {
                            if (urlData.indexOf('?') >= 0)
                                currentTop = "&take=" + top;
                            else
                                currentTop = "?take=" + top;
                        }
                        var url = "";
                        if (!select) {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=*";
                            else
                                currentTop += "?select=*";
                        } else {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=" + select
                            else
                                currentTop += "?select=" + select;
                        };
                        url = urlData + nameGeneric + currentTop;
                        if (url.indexOf("?") >= 0) {
                            url = url + "&X-AUTH-TOKEN=" + authorization;
                        } else
                            url = url + "?X-AUTH-TOKEN=" + authorization;

                        $http({
                            method: 'GET',
                            url: url,
                            headers: {
                                'Content-Type': 'application/json',
                                'X-AUTH-TOKEN': authorization
                            }

                        }).then(function successCallback(response) {
                            if (response.status === 200) {

                                var data = response.data;
                                data.statResponse = true;
                                deffer.resolve(data);
                            }
                        }, function errorCallback(response) {
                            var data = {
                                "statResponse": false,
                            }
                            deffer.resolve(data);
                        });
                    }

                    return deffer.promise;

                },
                getDataDummyPHP3: function (ididid, nameGeneric, kendoSource, isServerFiltering, top, filter, select) {

                    var deffer = $q.defer();
                    if (isServerFiltering === undefined)
                        isServerFiltering = false;
                    var arr = document.cookie.split(';')
                    var authorization = "";

                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i].split('=');
                        if (element[0].indexOf('authorizationss') > -1) {
                            authorization = element[1];
                        }
                    }
                    if (kendoSource) {
                        var currentTop = '';
                        if (top !== undefined)
                            if (urlData.indexOf('?') >= 0)
                                currentTop = "&take=" + top;
                            else
                                currentTop = "?take=" + top;
                        if (!select) {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=*";
                            else
                                currentTop += "?select=*";
                        } else {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=" + select
                            else
                                currentTop += "?select=" + select;
                        };

                        var url = "";
                        url = urlData + nameGeneric + currentTop + '&id=' + ididid;
                        if (url.indexOf("?") >= 0) {
                            url = url //+ "&X-AUTH-TOKEN=" + authorization;
                        } else
                            url = url //+ "?X-AUTH-TOKEN=" + authorization;
                        var kendoSourceData = new kendo.data.DataSource({
                            filter: filter,
                            serverFiltering: isServerFiltering,
                            transport: {
                                read: {
                                    type: 'GET',
                                    url: url,
                                    dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-AUTH-TOKEN': authorization
                                    }
                                }
                            },
                            idididid: ididid
                        });

                        if (kendoSourceData != undefined) {
                            deffer.resolve(kendoSourceData);
                        } else {

                            deffer.reject();
                        }


                    } else {
                        var currentTop = '';

                        if (top !== undefined) {
                            if (urlData.indexOf('?') >= 0)
                                currentTop = "&take=" + top;
                            else
                                currentTop = "?take=" + top;
                        }
                        var url = "";
                        if (!select) {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=*";
                            else
                                currentTop += "?select=*";
                        } else {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=" + select
                            else
                                currentTop += "?select=" + select;
                        };
                        url = urlData + nameGeneric + currentTop;
                        if (url.indexOf("?") >= 0) {
                            url = url + "&X-AUTH-TOKEN=" + authorization;
                        } else
                            url = url + "?X-AUTH-TOKEN=" + authorization;

                        $http({
                            method: 'GET',
                            url: url,
                            headers: {
                                'Content-Type': 'application/json',
                                'X-AUTH-TOKEN': authorization
                            }

                        }).then(function successCallback(response) {
                            if (response.status === 200) {

                                var data = response.data;
                                data.statResponse = true;
                                deffer.resolve(data);
                            }
                        }, function errorCallback(response) {
                            var data = {
                                "statResponse": false,
                            }
                            deffer.resolve(data);
                        });
                    }

                    return deffer.promise;

                },
                getDataDummyPHP4: function (ididid, columnName, nameGeneric, kendoSource, isServerFiltering, top, filter, select) {

                    var deffer = $q.defer();
                    if (isServerFiltering === undefined)
                        isServerFiltering = false;
                    var arr = document.cookie.split(';')
                    var authorization = "";

                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i].split('=');
                        if (element[0].indexOf('authorizationss') > -1) {
                            authorization = element[1];
                        }
                    }
                    if (kendoSource) {
                        var currentTop = '';
                        if (top !== undefined)
                            if (urlData.indexOf('?') >= 0)
                                currentTop = "&take=" + top;
                            else
                                currentTop = "?take=" + top;
                        if (!select) {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=*";
                            else
                                currentTop += "?select=*";
                        } else {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=" + select
                            else
                                currentTop += "?select=" + select;
                        };

                        var url = "";
                        url = urlData + nameGeneric + currentTop + '&id=' + ididid + '&columnName=' + columnName;
                        if (url.indexOf("?") >= 0) {
                            url = url //+ "&X-AUTH-TOKEN=" + authorization;
                        } else
                            url = url //+ "?X-AUTH-TOKEN=" + authorization;
                        var kendoSourceData = new kendo.data.DataSource({
                            filter: filter,
                            serverFiltering: isServerFiltering,
                            transport: {
                                read: {
                                    type: 'GET',
                                    url: url,
                                    dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-AUTH-TOKEN': authorization
                                    }
                                }
                            },
                            idididid: ididid
                        });

                        if (kendoSourceData != undefined) {
                            deffer.resolve(kendoSourceData);
                        } else {

                            deffer.reject();
                        }


                    } else {
                        var currentTop = '';

                        if (top !== undefined) {
                            if (urlData.indexOf('?') >= 0)
                                currentTop = "&take=" + top;
                            else
                                currentTop = "?take=" + top;
                        }
                        var url = "";
                        if (!select) {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=*";
                            else
                                currentTop += "?select=*";
                        } else {
                            if (urlData.indexOf('?') >= 0)
                                currentTop += "&select=" + select
                            else
                                currentTop += "?select=" + select;
                        };
                        url = urlData + nameGeneric + currentTop;
                        if (url.indexOf("?") >= 0) {
                            url = url + "&X-AUTH-TOKEN=" + authorization;
                        } else
                            url = url + "?X-AUTH-TOKEN=" + authorization;

                        $http({
                            method: 'GET',
                            url: url,
                            headers: {
                                'Content-Type': 'application/json',
                                'X-AUTH-TOKEN': authorization
                            }

                        }).then(function successCallback(response) {
                            if (response.status === 200) {

                                var data = response.data;
                                data.statResponse = true;
                                deffer.resolve(data);
                            }
                        }, function errorCallback(response) {
                            var data = {
                                "statResponse": false,
                            }
                            deffer.resolve(data);
                        });
                    }

                    return deffer.promise;

                },
                kendoHttpSource: function (url, serverFiltering) {
                    var authorization = "";
                    var arr = document.cookie.split(';')
                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i].split('=');
                        if (element[0].indexOf('authorizationss') > -1) {
                            authorization = element[1];
                        }
                    }
                    if (serverFiltering === undefined)
                        serverFiltering = false;
                    var tempurl = urlDataTableTransaksi + url;
                    if (tempurl.indexOf('?') > 0)
                        tempurl = tempurl + "&X-AUTH-TOKEN=" + authorization
                    else
                        tempurl = tempurl + "?X-AUTH-TOKEN=" + authorization
                    var kendoSourceData = new kendo.data.DataSource({
                        serverFiltering: serverFiltering,
                        transport: {
                            read: {
                                type: 'GET',
                                url: tempurl,
                                beforeSend: function (req) {
                                    req.setRequestHeader('X-AUTH-TOKEN', authorization);
                                },
                                dataType: "json" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                            }
                        },
                        pageSize: 20,
                        serverPaging: true,
                        schema: {
                            model: {
                                id: "id"
                            },
                            data: function (a, e, r, t) {
                                if (a.data !== undefined) {
                                    if (a.data.data !== undefined)
                                        return a.data.data;
                                    return a.data;
                                }
                                kendoSourceData.total(50);
                                return a;
                            },
                            total: function (e) {
                                if (e.messages !== undefined && e.messages["Total-Count"] !== undefined)
                                    return e.messages["Total-Count"];
                                return undefined;
                            },
                            totalPages: function (e) { }
                        }

                    });

                    return kendoSourceData;

                },

                getServiceArray: function (tableName) {
                    // var online = navigator.onLine
                    // if (online == false) {
                    //     // debugger
                    //     window.location.href = window.location.origin + window.location.pathname + '#/ErrorPage'
                    //     toastr.error('Maaf, koneksi ke server terputus ', 'Error')
                    //     var data = {
                    //         "statResponse": false,
                    //     }
                    //     var deffer = $q.defer();
                    //     deffer.resolve(data);
                    //     return deffer.promise;
                    // }
                    var deffer = $q.defer();
                    var arr = document.cookie.split(';')
                    var authorization = ""//"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";

                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i].split('=');
                        if (element[0].indexOf('authorizationss') > -1) {
                            authorization = element[1];
                        }
                    }

                    var url = urlData + tableName;


                    $http({
                        method: 'GET',
                        url: url,
                        headers: {
                            'Content-Type': 'application/json',
                            'X-AUTH-TOKEN': authorization
                        }

                    }).then(function successCallback(response) {
                        if (response.status === 200) {

                            var data = response.data;
                            data.statResponse = true;
                            deffer.resolve(data);
                        }
                    }, function errorCallback(response) {
                        var data = {
                            "statResponse": false,
                        }
                        deffer.resolve(data);
                        // if(response.status == 500){ 

                        //     toastr.error('Maaf, koneksi ke server terputus, Periksa Jaringan LAN','Error')
                        // }
                    });

                    return deffer.promise;

                },



                setValidation: function (scope, listRawRequired) {
                    var listFixRequired = [];
                    var msg = "";

                    for (var i = 0; i < listRawRequired.length; i++) {
                        var arr = listRawRequired[i].split("|");
                        var arrModel = arr[0].split(".");
                        var obj = {
                            ngModel: scope[arrModel[0]][arrModel[1]],
                            ngModelText: arr[0],
                            type: arr[1],
                            label: arr[2]
                        };

                        listFixRequired.push(obj);
                    }

                    for (var i = 0; i < listFixRequired.length; i++) {
                        if (listFixRequired[i].ngModel === undefined || listFixRequired[i].ngModel === "") {
                            this.cekValidation(listFixRequired[i].type, listFixRequired[i].ngModelText, false);
                            msg += listFixRequired[i].label + " tidak boleh kosong|";
                        }
                        else {
                            this.cekValidation(listFixRequired[i].type, listFixRequired[i].ngModelText, true);
                        }
                    }

                    var result = {};
                    if (msg == "") {
                        result = {
                            status: true
                        };
                    }
                    else {
                        result = {
                            status: false,
                            messages: msg
                        };
                    }

                    return result;
                },

                cekEnableDisableButton: function (buttonDisabled) {

                    if (!buttonDisabled) {
                        var element = angular.element('[class="btnTemplate1"]');
                        element.addClass("button-disabled");
                    }
                    else {
                        var element = angular.element('[class="btnTemplate1 button-disabled"]');
                        element.removeClass("button-disabled")
                    }
                },

                cekValidation: function (ngModelType, ngModelName, statusValidation) {
                    var element = angular.element('[' + ngModelType + '="' + ngModelName + '"]');

                    if (!statusValidation) {
                        element.addClass("validation-error");
                    }
                    else {
                        element.removeClass("validation-error")
                    }
                },

                showMessages: function (messages) {
                    var arrMsgError = messages.split("|");
                    for (var i = 0; i < arrMsgError.length - 1; i++) {
                        window.messageContainer.error(arrMsgError[i]);
                    }
                },

                showAlertDialog: function (title, textContent, labelOk, labelCancel) {
                    if (labelCancel == undefined) {
                        return $mdDialog.confirm()
                            .title(title)
                            .textContent(textContent)
                            .ariaLabel('Lucky day')
                            .ok(labelOk)
                            .cancel(labelCancel)
                    }
                    else {
                        return $mdDialog.confirm()
                            .title(title)
                            .textContent(textContent)
                            .ariaLabel('Lucky day')
                            .ok(labelOk)
                    }
                },
                
                getMicroService: function (obj) {
                    var arr = document.cookie.split(';')
                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i].split('=');
                        if (element[0].indexOf('authorizationss') > -1) {
                            authorization = element[1];
                        }
                    }
                    
                    return authorization;
                },
                getCustomHeader: function (obj) {
             
                    var deffer = $q.defer();
                    if (obj.method === undefined)
                        obj.method = "GET";
                    var authorization = obj.token
                  
                  
                   var url = obj.url;

                    $http.get(url, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-AUTH-TOKEN': authorization
                        }
                    }).then(function successCallback(response) {
                        response.statResponse = true;
                        deffer.resolve(response);
                    }, function errorCallback(response) {
                        if (response.data == null)
                            window.messageContainer.error("Maaf, Terjadi kesalahan saat memproses data");
                        response.statResponse = false;
                        deffer.resolve(response);
                    });
                    return deffer.promise;
                },
                postCustomHeader: function (obj, data,token) {
            
                    var deffer = $q.defer();
                    var authorization = obj.token
                    var url = obj.url;
                    var req = {
                        method: 'POST',
                        url: url,
                        headers: {
                            'Content-Type': 'application/json',
                            'X-AUTH-TOKEN': authorization
                        },
                        data: data
                    }
                    $http(req).then(function successCallback(response, a, b) {
                        

                        var msg = response.data.messages;
                        window.messageContainer.log(msg);

                        deffer.resolve(response);
                    }, function errorCallback(response) {
                        //var msgError = response.headers("x-message");

                        if (response.data != null) {
                            var msgError = response.data.messages;

                            if (msgError != "") {
                                var p = response.data.errors

                                for (var key in p) {
                                    if (p.hasOwnProperty(key)) {
                                        for (var i = 0; i < p[key].length; i++) {
                                            window.messageContainer.error(key + " : " + p[key][i])
                                        }
                                    }
                                }

                                window.messageContainer.error(msgError);
                            }
                        }
                        else {
                            window.messageContainer.error("Maaf, halaman API tidak ditemukan");
                        }

                        deffer.reject(response);

                    });
                    return deffer.promise;
                },
            };
        }
    ]);



});