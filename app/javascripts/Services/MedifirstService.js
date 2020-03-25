define(['Configuration'], function (config) {

    var baseApiBackend = config.baseApiBackend;

    var medifirst2000Service = angular.module('MedifirstService', ['ngResource', 'ApiService', 'Services']);

    medifirst2000Service.service('MedifirstService', ['ApiService','$mdDialog', function (r,$mdDialog) {
        return {
            /** standar API service */
            get: function (url) {
                return r.get({
                    url: baseApiBackend + url
                });
            },
            post: function (url, data) {
                return r.post({
                    url: baseApiBackend + url
                }, data)
            },
            put: function (url, data) {
                return r.put({
                    url: baseApiBackend + url
                }, data)
            },
            delete: function (url) {
                return r.delete({
                    url: baseApiBackend + url
                });
            },
            postNonMessage: function (url, data) {
                return r.postNonMessage({
                    url: baseApiBackend + url
                }, data)
            },
            deleteNonMessage: function (url) {
                return r.deleteNonMessage({
                    url: baseApiBackend + url
                });
            },
            putNonMessage: function (url, data) {
                return r.putNonMessage({
                    url: baseApiBackend + url
                }, data)
            },
            getServiceArray: function (url) {
                return r.getServiceArray(url);
            },
            /** end  */

            /** buat nge-get combo box part*/
            getPart: function (url, kendoSource, isServerFiltering, top, filter, selec) {
                return r.getPart(url, kendoSource, isServerFiltering, top, filter, selec);
            },
            getPart2: function (url, ididid, nameGeneric, kendoSource, isServerFiltering, top, filter, select) {
                return r.getDataDummyPHP2(url, ididid, nameGeneric, kendoSource, isServerFiltering, top, filter, select);
            },
            getPart3: function (url, ididid, nameGeneric, kendoSource, isServerFiltering, top, filter, select) {
                return r.getDataDummyPHP3(url, ididid, nameGeneric, kendoSource, isServerFiltering, top, filter, select);
            },
            getPart4: function (url, ididid, columnName, nameGeneric, kendoSource, isServerFiltering, top, filter, select) {
                return r.getDataDummyPHP4(url, ididid, columnName, nameGeneric, kendoSource, isServerFiltering, top, filter, select);
            },
            getDataDummyPHPV2: function (url, nameGeneric, kendoSource, isServerFiltering, top, filter, select) {
                return r.getDataDummyPHPV2(url, nameGeneric, kendoSource, isServerFiltering, top, filter, select);
            },
            /** end */

            /** Data USER yang Login */
            getPegawaiLogin: function () {
                return r.getPegawai();
            },
            getUserLogin: function () {
                return r.getUserLogin();
            },
            getMapLoginUserToRuangan: function () {
                return r.getMapLoginUserToRuangan();
            },
            getPegawai: function () {
                return r.getPegawai();
            },            
            /** End */
            getKelompokUser: function () {
                var arr = document.cookie.split(';')
                for (var i = 0; i < arr.length; i++) {
                    var element = arr[i].split('=');
                    if (element[0].indexOf('statusCode') >= 0) {
                        return element[1];
                    }
                }
                return null;
            },

            setActiveMenu: function(data, namePage) {
                data[namePage] = false;
            },

            setValidation:function(scope, listRawRequired){
               var listFixRequired = [];
               var msg = "";

               for(var i=0; i<listRawRequired.length; i++){
                   var arr = listRawRequired[i].split("|");
                   var arrModel = arr[0].split(".");
                   var obj = {
                       ngModel : scope[arrModel[0]][arrModel[1]],
                       ngModelText : arr[0],
                       type : arr[1],
                       label : arr[2]
                   };

                   listFixRequired.push(obj);
               }

               for(var i=0; i<listFixRequired.length; i++){
                   if(listFixRequired[i].ngModel === undefined || listFixRequired[i].ngModel === "" || listFixRequired[i].ngModel === null){
                       this.cekValidation(listFixRequired[i].type, listFixRequired[i].ngModelText, false);
                       msg += listFixRequired[i].label + " tidak boleh kosong|";
                   }
                   else
                   {
                       this.cekValidation(listFixRequired[i].type, listFixRequired[i].ngModelText, true);
                   }
               }

               var result = {};
               if(msg == ""){
                   result = {
                       status : true
                   };
               }
               else
               {
                   result = {
                       status : false,
                       messages : msg
                   };
               }

               return result;
            },

            cekEnableDisableButton: function(buttonDisabled) {

                if(!buttonDisabled)
                {
                   var element = angular.element('[class="btnTemplate1"]');
                   element.addClass("button-disabled");
                }
                else
                {
                   var element = angular.element('[class="btnTemplate1 button-disabled"]');
                   element.removeClass("button-disabled")
                }
            },

            cekValidation: function(ngModelType, ngModelName, statusValidation) {
                var element = angular.element('['+ngModelType+'="'+ngModelName+'"]');

                if(!statusValidation)
                {
                   element.addClass("validation-error");
                }
                else
                {
                   element.removeClass("validation-error")
                }
            },

            showMessages: function(messages){
               var arrMsgError = messages.split("|");
               for(var i=0; i<arrMsgError.length-1; i++){
                   window.messageContainer.error(arrMsgError[i]);
               }
            },
            
            getDataGlobal: function(strUrl) {

                var deffer = $q.defer();
                var arr = document.cookie.split(';')
                var authorization =""// "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";
            
                for (var i = 0; i < arr.length; i++) {
                    var element = arr[i].split('=');
                    if (element[0].indexOf('authorization') > -1) {
                        authorization = element[1];
                    }
                }
                
                var url = urlBaseApiPostDataAkuntansi + strUrl;
               

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

                return deffer.promise;

            },

            postLogging: function(jenislog,referensi, noreff,keterangan) {
                return r.get({
                   url: baseApiBackend + "sysadmin/logging/save-log-all?jenislog="+jenislog+"&referensi=" +
                        referensi +'&noreff='+ noreff +'&keterangan='+keterangan
                });
            },

            getMicroService: function(url){
                return r.getMicroService({
                    url: baseApiBackend + url
                })
            },
            getProfile: function(){
                return JSON.parse(localStorage.getItem('profile'));
            },
            showAlertDialog : function(title, textContent, labelOk, labelCancel){
                if(labelCancel == undefined){
                    return $mdDialog.confirm()
                      .title(title)
                      .textContent(textContent)
                      .ariaLabel('Lucky day')
                      .ok(labelOk)
                      .cancel(labelCancel)
                }
                else
                {
                    return $mdDialog.confirm()
                      .title(title)
                      .textContent(textContent)
                      .ariaLabel('Lucky day')
                      .ok(labelOk)
                }
             },
          getCustomHeader: function (url,token) {
            return r.getCustomHeader({
                url:url,
                token:token
            });
           },
           postCustomHeader: function (url, data,token) {
                return r.postCustomHeader({
                    url:url,
                    token:token
                }, data)
            },

        }
    }]);
});
