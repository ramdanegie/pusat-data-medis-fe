define(['Configuration'], function(setting) {
    var services = angular.module('LoginServices', ['ngResource']);
    var baseUrlApiAction = setting.baseApiPostData;
    var baseProfileMenu = setting.baseProfileMenu
    var baseApiBackend = setting.baseApiBackend;
    services.factory('LoginService', ['$location', '$resource', '$http', 'R',
        function($location, $resource, $http, r) {
            return {
                superviseLogin: function(data, obj, urlSave) { // data = user login, obj = object to save, urlSave = url to save object
                    var urlPath = "#"+ $location.path();
                    var lDataRuangan = window.localStorage.getItem('dataRuangan');
                    var dataRuangan = {};
                    if (lDataRuangan === undefined || lDataRuangan === null){
                        dataRuangan = {
                            ruanganId : 0
                        };
                    } else {
                        dataRuangan = JSON.parse(lDataRuangan);
                    }                     

                    // Start Syamsu
                    window.localStorage.setItem('Supervising',true);
                    // End Syamsu
                    
                    return $http({
                        method: 'POST',
                        headers: {
                            'Supervising': true,
                            'Module': data.module,
                            'Form': "",
                            'Action': "",
                            "AlamatUrlForm" : urlPath,
                            "kdRuangan" : dataRuangan.ruanganId
                        },
                        data: data,
                        url: setting.baseUrlLogin
                    }).then(function (response) {
                        console.log('Supervise login success');
                        if (response.status === 200 && response.data.messages !== null) {
                            var token = response.data.messages['X-AUTH-SUPERVISOR-TOKEN'];
                            obj.supervisorToken = token;
                            obj.url = baseUrlApiAction;
                            r.post(urlSave, obj).then(function successCallback(response) {
                                console.log('Superivise saves data success');
                            }, function errorCallback(response) {
                                console.log('Error saving data');
                            });
                        }
                    });
                },
                authentication: function(obj) {
                    return $http.get(setting.baseUrlLogin+'?'+obj);
                },
                getHistory: function(start, until) {
                    return r.get({
                        url: baseUrlApiAction + "auth/history/?dateStart=" + moment(start).format('YYYY-MM-DD 00:00:00') + "&dateEnd=" + moment(until).format('YYYY-MM-DD 23:59:59')
                    });
                },
                logout: function() {

                    // var urlPath = "#"+ $location.path();                    

                    // var datauserlogin = JSON.parse(window.localStorage.getItem("datauserlogin"));
                    // var dataRuangan = JSON.parse(window.localStorage.getItem('dataRuangan'));

                    // if (datauserlogin == undefined || datauserlogin == null){
                    //     return "";                        
                    // }

                    // if (dataRuangan == undefined || dataRuangan == null){
                    //     dataRuangan = {
                    //         ruanganId : 0
                    //     };
                    // }
                    
                    // var headersPost = {
                    //     headers: { 
                    //             "AlamatUrlForm" : urlPath,
                    //             "kdRuangan" : dataRuangan.ruanganId
                    //     }
                    // }
                    //debugger;
                    let data = localStorage.getItem('loginuser')
                    var hasil = $http.get(setting.baseUrlLogout+'?'+data);

                    return hasil;
                },
                getBaseProfileMenu: function() {
                    return baseProfileMenu ;
                  
                },
                get: function (url) {
                    return r.get({
                        url: baseApiBackend + url
                    });
                },
            }
        }
    ]);
    return {
        authentication: function(obj) {
            return $http.post(setting.baseUrlLogin, obj);
        }
    };
});