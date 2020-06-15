define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('CpptNew5Ctrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 447
            var dataLoad = []
             $scope.isCetak = true
            var norecEMR = ''
            var peagawaiLogin = medifirstService.getPegawaiLogin()
            var cacheNomorEMR = cacheHelper.get('cacheNomorEMR');
            var cacheNoREC = cacheHelper.get('cacheNOREC_EMR');
            if(cacheNoREC!= undefined){
                norecEMR = cacheNomorEMR[1]
            }
            if (cacheNomorEMR != undefined) {
                nomorEMR = cacheNomorEMR[0]
                norecEMR = cacheNomorEMR[1]
                $scope.cc.norec_emr = nomorEMR
            }
            var HttpClient = function () {
                this.get = function (aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function () {
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open("GET", aUrl, true);
                    anHttpRequest.send(null);
                }
            }
            $scope.cetakPdf = function () {
                if (norecEMR == '') return
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/e-rekammedis?cetak-emr-cppt&id=' + $scope.cc.nocm + '&emr=' + norecEMR + '&view=true', function (response) {
                    // do something with response
                });
            }
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
             })
            medifirstService.getPart('emr/get-datacombo-part-kelas', true, true, 20).then(function (data) {
                $scope.listKelas = data

             })
            medifirstService.getPart('emr/get-datacombo-part-ruangan-pelayanan', true, true, 20).then(function (data) {
                $scope.listRuang = data
            
             })
            // medifirstService.getPart("sysadmin/general/get-datacombo-jenispegawai-general", true, true, 20).then(function (data) {
            //         $scope.listJenisPegawai = data;
            //     });
            medifirstService.getPart("sysadmin/general/get-datacombo-jenispegawai-cppt", true, true, 20).then(function (data) {
                    $scope.listJenisPegawai = data;
                });
            

           
            var cacheNomorEMR = cacheHelper.get('cacheNomorEMR');
            if (cacheNomorEMR != undefined) {
                nomorEMR = cacheNomorEMR[0]
                $scope.cc.norec_emr = nomorEMR
            }

            // var chacePeriode = cacheHelper.get('cacheHeader');
            // if (chacePeriode != undefined) {

            //     chacePeriode.umur = dateHelper.CountAge(new Date(chacePeriode.tgllahir), new Date());
            //     var bln = chacePeriode.umur.month,
            //         thn = chacePeriode.umur.year,
            //         day = chacePeriode.umur.day


            //     chacePeriode.umur = thn + 'thn ' + bln + 'bln ' + day + 'hr '
            //     $scope.cc.nocm = chacePeriode.nocm
            //     $scope.cc.namapasien = chacePeriode.namapasien;
            //     $scope.cc.jeniskelamin = chacePeriode.jeniskelamin;
            //     $scope.cc.tgllahir = chacePeriode.tgllahir;
            //     $scope.cc.umur = chacePeriode.umur;
            //     $scope.cc.alamatlengkap = chacePeriode.alamatlengkap;
            //     $scope.cc.notelepon = chacePeriode.notelepon;

            // }
            
            var chacePeriode = cacheHelper.get('cacheRekamMedis');
            if (chacePeriode != undefined) {
                $scope.cc.nocm = chacePeriode[0]
                $scope.cc.namapasien = chacePeriode[1]
                $scope.cc.jeniskelamin = chacePeriode[2]
                $scope.cc.noregistrasi = chacePeriode[3]
                $scope.cc.umur = chacePeriode[4]
                $scope.cc.kelompokpasien = chacePeriode[5]
                $scope.cc.tglregistrasi = chacePeriode[6]
                $scope.cc.norec = chacePeriode[7]
                $scope.cc.norec_pd = chacePeriode[8]
                $scope.cc.objectkelasfk = chacePeriode[9]
                $scope.cc.namakelas = chacePeriode[10]
                $scope.cc.objectruanganfk = chacePeriode[11]
                $scope.cc.namaruangan = chacePeriode[12]
                $scope.cc.DataNoregis = chacePeriode[12]
                $scope.cc.dokterdpjp = chacePeriode[16]
                $scope.cc.iddpjp = chacePeriode[17]
                if (nomorEMR == '-') {
                    $scope.cc.norec_emr = '-'
                } else {
                    $scope.cc.norec_emr = nomorEMR
                }
            }
            var chekedd = false

            medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + nomorEMR + "&emrfk=" + $scope.cc.emrfk, true).then(function (dat) {
                $scope.item.obj = []
                $scope.item.obj2 = []
                dataLoad = dat.data.data
                $scope.item.obj[112445]=$scope.cc.tglregistrasi
                $scope.item.obj[112446]={ value: $scope.cc.iddpjp, text: $scope.cc.dokterdpjp }
                $scope.item.obj[112447]={ value: $scope.cc.objectruanganfk, text: $scope.cc.namaruangan }
                $scope.item.obj[112448]={ value: $scope.cc.objectkelasfk, text: $scope.cc.namakelas }
                for (let i = 0; i < dataLoad.length; i++) {
                    const element = dataLoad[i];
                    element.nourut = parseInt(element.nourut)
                }
                dataLoad.sort(function (a, b) {
                    if (a.nourut < b.nourut) { return -1; }
                    if (a.nourut > b.nourut) { return 1; }
                    return 0;
                })
                // console.log(dataLoad)
                for (var i = 0; i <= dataLoad.length - 1; i++) {
                    if (parseFloat($scope.cc.emrfk) == dataLoad[i].emrfk) {

                        if (dataLoad[i].type == "textbox") {
                            $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                        }
                        if (dataLoad[i].type == "checkbox") {
                            chekedd = false
                            if (dataLoad[i].value == '1') {
                                chekedd = true
                            }
                            $scope.item.obj[dataLoad[i].emrdfk] = chekedd
                            if (dataLoad[i].emrdfk >= 7590 && dataLoad[i].emrdfk <= 7593 && chekedd) {
                                $scope.getSkalaNyeri(1, { descNilai: dataLoad[i].reportdisplay })
                            }
                            


                        }

                        if (dataLoad[i].type == "datetime") {
                            $scope.item.obj[dataLoad[i].emrdfk] = new Date(dataLoad[i].value)
                        }
                        if (dataLoad[i].type == "datetime2") {
                            $scope.item.obj[dataLoad[i].emrdfk] = new Date(dataLoad[i].value)
                        }
                        if (dataLoad[i].type == "time") {
                            $scope.item.obj[dataLoad[i].emrdfk] = new Date(dataLoad[i].value)
                        }
                        if (dataLoad[i].type == "date") {
                            $scope.item.obj[dataLoad[i].emrdfk] = new Date(dataLoad[i].value)
                        }

                        if (dataLoad[i].type == "checkboxtextbox") {
                            $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                            $scope.item.obj2[dataLoad[i].emrdfk] = true
                        }
                        if (dataLoad[i].type == "checkboxtextarea") {
                            $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                            $scope.item.obj2[dataLoad[i].emrdfk] = true
                        }
                        if (dataLoad[i].type == "textarea") {
                            $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                        }
                        if (dataLoad[i].type == "combobox2") {
                            var str = dataLoad[i].value
                            if(str != undefined){
                                var res = str.split("~");
                                // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
                                $scope.item.obj[dataLoad[i].emrdfk] = { value: res[0], text: res[1] }        
                            }   
                            // var res = str.split("~");
                            // // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
                            // $scope.item.obj[dataLoad[i].emrdfk] = { value: res[0], text: res[1] }

                        }
                        if (dataLoad[i].type == "combobox") {
                            var str = dataLoad[i].value
                            if(str != undefined){
                                var res = str.split("~");
                                // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
                                $scope.item.obj[dataLoad[i].emrdfk] = { value: res[0], text: res[1] }        
                            }   
                            // var res = str.split("~");
                            // // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
                            // $scope.item.obj[dataLoad[i].emrdfk] = { value: res[0], text: res[1] }

                        }
                   
                        if (dataLoad[i].type == "combobox3") {
                            var str = dataLoad[i].value
                            if(str != undefined){
                                var res = str.split("~");
                                // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
                                $scope.item.obj[dataLoad[i].emrdfk] = { value: res[0], text: res[1] }        
                            }   
                            // var res = str.split("~");
                            // // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
                            // $scope.item.obj[dataLoad[i].emrdfk] = { value: res[0], text: res[1] }

                        }

                    }

                }
                // setTimeout(function(){medifirstService.setDisableAllInputElement()  }, 2000);
            })
            // tanggal isian otomatis
            $scope.$watch('item.obj[112326]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112326] !=null && $scope.item.obj[112325]==undefined){
                          $scope.item.obj[112325] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112336]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112336] !=null && $scope.item.obj[112335]==undefined){
                          $scope.item.obj[112335] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112346]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112346] !=null && $scope.item.obj[112345]==undefined){
                          $scope.item.obj[112345] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112356]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112356] !=null && $scope.item.obj[112355]==undefined){
                          $scope.item.obj[112355] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112366]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112366] !=null && $scope.item.obj[112365]==undefined){
                          $scope.item.obj[112365] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112376]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112376] !=null && $scope.item.obj[112375]==undefined){
                          $scope.item.obj[112375] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112386]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112386] !=null && $scope.item.obj[112385]==undefined){
                          $scope.item.obj[112385] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112396]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112396] !=null && $scope.item.obj[112395]==undefined){
                          $scope.item.obj[112395] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112406]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112406] !=null && $scope.item.obj[112405]==undefined){
                          $scope.item.obj[112405] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112416]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112416] !=null && $scope.item.obj[112415]==undefined){
                          $scope.item.obj[112415] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112426]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112426] !=null && $scope.item.obj[112425]==undefined){
                          $scope.item.obj[112425] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112436]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112436] !=null && $scope.item.obj[112435]==undefined){
                          $scope.item.obj[112435] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112450]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112450] !=null && $scope.item.obj[112449]==undefined){
                          $scope.item.obj[112449] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112460]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112460] !=null && $scope.item.obj[112459]==undefined){
                          $scope.item.obj[112459] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112470]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112470] !=null && $scope.item.obj[112469]==undefined){
                          $scope.item.obj[112469] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112480]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112480] !=null && $scope.item.obj[112479]==undefined){
                          $scope.item.obj[112479] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112490]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112490] !=null && $scope.item.obj[112489]==undefined){
                          $scope.item.obj[112489] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112500]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112500] !=null && $scope.item.obj[112499]==undefined){
                          $scope.item.obj[112499] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112510]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112510] !=null && $scope.item.obj[112509]==undefined){
                          $scope.item.obj[112509] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112520]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112520] !=null && $scope.item.obj[112519]==undefined){
                          $scope.item.obj[112519] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112530]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112530] !=null && $scope.item.obj[112529]==undefined){
                          $scope.item.obj[112529] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112540]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112540] !=null && $scope.item.obj[112539]==undefined){
                          $scope.item.obj[112539] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112550]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112550] !=null && $scope.item.obj[112549]==undefined){
                          $scope.item.obj[112549] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112560]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112560] !=null && $scope.item.obj[112559]==undefined){
                          $scope.item.obj[112559] =$scope.now
                      }

                       
                    }
                })

            // pegawai isian otomatis
            $scope.$watch('item.obj[112327]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112327] !=null && $scope.item.obj[112328]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112328] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112337]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112337] !=null && $scope.item.obj[112338]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112338] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112347]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112347] !=null && $scope.item.obj[112348]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112348] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112357]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112357] !=null && $scope.item.obj[112358]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112358] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112367]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112367] !=null && $scope.item.obj[112368]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112368] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112377]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112377] !=null && $scope.item.obj[112378]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112378] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112387]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112387] !=null && $scope.item.obj[112388]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112388] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112397]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112397] !=null && $scope.item.obj[112398]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112398] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112407]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112407] !=null && $scope.item.obj[112408]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112408] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112417]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112417] !=null && $scope.item.obj[112418]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112418] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112427]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112427] !=null && $scope.item.obj[112428]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112428] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112437]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112437] !=null && $scope.item.obj[112438]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112438] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112451]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112451] !=null && $scope.item.obj[112452]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112452] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112461]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112461] !=null && $scope.item.obj[112462]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112462] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112471]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112471] !=null && $scope.item.obj[112472]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112472] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112481]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112481] !=null && $scope.item.obj[112482]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112482] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112491]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112491] !=null && $scope.item.obj[112492]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112492] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[112501]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112501] !=null && $scope.item.obj[112502]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112502] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[112511]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112511] !=null && $scope.item.obj[112512]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112512] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[112521]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112521] !=null && $scope.item.obj[112522]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112522] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[112531]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112531] !=null && $scope.item.obj[112532]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112532] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[112541]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112541] !=null && $scope.item.obj[112542]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112542] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[112551]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112551] !=null && $scope.item.obj[112552]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112552] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[112561]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112561] !=null && $scope.item.obj[112562]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112562] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })


            
            //notice otomatis
            $scope.$watch('item.obj[114914]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114914] !=null && $scope.item.obj[112329]==undefined){
                        $scope.item.obj[112329] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112330] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114915]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114915] !=null && $scope.item.obj[112339]==undefined){
                        $scope.item.obj[112339] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112340] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114916]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114916] !=null && $scope.item.obj[112349]==undefined){
                        $scope.item.obj[112349] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112350] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114917]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114917] !=null && $scope.item.obj[112359]==undefined){
                        $scope.item.obj[112359] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112360] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114918]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114918] !=null && $scope.item.obj[112369]==undefined){
                        $scope.item.obj[112369] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112370] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114919]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114919] !=null && $scope.item.obj[112379]==undefined){
                        $scope.item.obj[112379] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112380] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114920]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114920] !=null && $scope.item.obj[112389]==undefined){
                        $scope.item.obj[112389] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112390] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114921]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114921] !=null && $scope.item.obj[112399]==undefined){
                        $scope.item.obj[112399] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112400] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114922]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114922] !=null && $scope.item.obj[112409]==undefined){
                        $scope.item.obj[112409] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112410] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114923]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114923] !=null && $scope.item.obj[112419]==undefined){
                        $scope.item.obj[112419] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112420] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114924]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114924] !=null && $scope.item.obj[112429]==undefined){
                        $scope.item.obj[112429] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112430] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114925]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114925] !=null && $scope.item.obj[112439]==undefined){
                        $scope.item.obj[112439] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112440] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114926]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114926] !=null && $scope.item.obj[112453]==undefined){
                        $scope.item.obj[112453] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112454] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114927]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114927] !=null && $scope.item.obj[112463]==undefined){
                        $scope.item.obj[112463] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112464] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114928]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114928] !=null && $scope.item.obj[112473]==undefined){
                        $scope.item.obj[112473] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112474] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114929]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114929] !=null && $scope.item.obj[112483]==undefined){
                        $scope.item.obj[112483] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112484] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114930]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114930] !=null && $scope.item.obj[112493]==undefined){
                        $scope.item.obj[112493] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112494] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114931]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114931] !=null && $scope.item.obj[112503]==undefined){
                        $scope.item.obj[112503] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112504] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114932]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114932] !=null && $scope.item.obj[112513]==undefined){
                        $scope.item.obj[112513] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112514] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114933]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114933] !=null && $scope.item.obj[112523]==undefined){
                        $scope.item.obj[112523] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112524] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114934]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114934] !=null && $scope.item.obj[112533]==undefined){
                        $scope.item.obj[112533] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112534] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114935]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114935] !=null && $scope.item.obj[112543]==undefined){
                        $scope.item.obj[112543] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112544] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114936]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114936] !=null && $scope.item.obj[112553]==undefined){
                        $scope.item.obj[112553] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112554] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114937]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114937] !=null && $scope.item.obj[112563]==undefined){
                        $scope.item.obj[112563] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112564] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            // tanggal Verifikasi otomatis
            $scope.$watch('item.obj[112332]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112332] !=null && $scope.item.obj[112333]==undefined){
                          $scope.item.obj[112333] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112334] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112342]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112342] !=null && $scope.item.obj[112343]==undefined){
                          $scope.item.obj[112343] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112344] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112352]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112352] !=null && $scope.item.obj[112353]==undefined){
                          $scope.item.obj[112353] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112354] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112362]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112362] !=null && $scope.item.obj[112363]==undefined){
                          $scope.item.obj[112363] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112364] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112372]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112372] !=null && $scope.item.obj[112373]==undefined){
                          $scope.item.obj[112373] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112374] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112382]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112382] !=null && $scope.item.obj[112383]==undefined){
                          $scope.item.obj[112383] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112384] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112392]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112392] !=null && $scope.item.obj[112393]==undefined){
                          $scope.item.obj[112393] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112394] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112402]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112402] !=null && $scope.item.obj[112403]==undefined){
                          $scope.item.obj[112403] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112404] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112412]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112412] !=null && $scope.item.obj[112413]==undefined){
                          $scope.item.obj[112413] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112414] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112422]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112422] !=null && $scope.item.obj[112423]==undefined){
                          $scope.item.obj[112423] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112424] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
            $scope.$watch('item.obj[112432]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112432] !=null && $scope.item.obj[112433]==undefined){
                          $scope.item.obj[112433] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112434] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112442]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112442] !=null && $scope.item.obj[112443]==undefined){
                          $scope.item.obj[112443] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112444] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
            $scope.$watch('item.obj[112456]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112456] !=null && $scope.item.obj[112457]==undefined){
                          $scope.item.obj[112457] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112458] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })  
            $scope.$watch('item.obj[112466]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112466] !=null && $scope.item.obj[112467]==undefined){
                          $scope.item.obj[112467] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112468] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })   
            $scope.$watch('item.obj[112476]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112476] !=null && $scope.item.obj[112477]==undefined){
                          $scope.item.obj[112477] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112478] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
            $scope.$watch('item.obj[112486]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112486] !=null && $scope.item.obj[112487]==undefined){
                          $scope.item.obj[112487] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112488] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
            $scope.$watch('item.obj[112496]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112496] !=null && $scope.item.obj[112497]==undefined){
                          $scope.item.obj[112497] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112498] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
            $scope.$watch('item.obj[112506]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112506] !=null && $scope.item.obj[112507]==undefined){
                          $scope.item.obj[112507] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112508] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
            $scope.$watch('item.obj[112516]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112516] !=null && $scope.item.obj[112517]==undefined){
                          $scope.item.obj[112517] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112518] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
            $scope.$watch('item.obj[112526]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112526] !=null && $scope.item.obj[112527]==undefined){
                          $scope.item.obj[112527] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112528] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
            $scope.$watch('item.obj[112536]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112536] !=null && $scope.item.obj[112537]==undefined){
                          $scope.item.obj[112537] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112538] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
            $scope.$watch('item.obj[112546]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112546] !=null && $scope.item.obj[112547]==undefined){
                          $scope.item.obj[112547] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112548] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
            $scope.$watch('item.obj[112556]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112556] !=null && $scope.item.obj[112557]==undefined){
                          $scope.item.obj[112557] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112558] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
            $scope.$watch('item.obj[112566]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112566] !=null && $scope.item.obj[112567]==undefined){
                          $scope.item.obj[112567] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112568] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 


           
            
            
            
            
            

            // tanggal isian otomatis
            // tanggal Verifikasi otomatis
            // $scope.$watch('item.obj[111355]', function(newValue,oldValue){
            //         if(newValue!=oldValue){
                
            //           if($scope.item.obj[111355] !=null && $scope.item.obj[111354]==undefined){
            //               $scope.item.obj[111354] =$scope.now
            //           }
                      

                       
            //         }
            //     })
            // $scope.$watch('item.obj[111363]', function(newValue,oldValue){
            //         if(newValue!=oldValue){
                
            //           if($scope.item.obj[111363] !=null && $scope.item.obj[111362]==undefined){
            //               $scope.item.obj[111362] =$scope.now
            //           }
                      

                       
            //         }
            //     })
            // $scope.$watch('item.obj[111371]', function(newValue,oldValue){
            //         if(newValue!=oldValue){
                
            //           if($scope.item.obj[111371] !=null && $scope.item.obj[111370]==undefined){
            //               $scope.item.obj[111370] =$scope.now
            //           }
                      

                       
            //         }
            //     })
            // $scope.$watch('item.obj[111379]', function(newValue,oldValue){
            //         if(newValue!=oldValue){
                
            //           if($scope.item.obj[111379] !=null && $scope.item.obj[111378]==undefined){
            //               $scope.item.obj[111378] =$scope.now
            //           }

                       
            //         }
            //     })
            // END tanggal Verifikasi otomatis
            // verifikasi otomatis
            // $scope.$watch('item.obj[111363]', function(newValue,oldValue){
            //         if(newValue!=oldValue){
                
            //           if($scope.item.obj[111363] !=null && $scope.item.obj[111355] == undefined && $scope.item.obj[111354] == undefined){
            //               $scope.item.obj[111355] = $scope.item.obj[111363]
            //           }
                      

                       
            //         }
            //     })
            // $scope.$watch('item.obj[111371]', function(newValue,oldValue){
            //         if(newValue!=oldValue){
                
            //           if($scope.item.obj[111371] !=null && $scope.item.obj[111355]==undefined && $scope.item.obj[111363] == undefined){
            //               $scope.item.obj[111355] = $scope.item.obj[111371]
            //               $scope.item.obj[111363] = $scope.item.obj[111371]
            //           }
            //           if($scope.item.obj[111371] !=null && $scope.item.obj[111363] == undefined){
            //               $scope.item.obj[111363] = $scope.item.obj[111371]
            //           }
                      

                       
            //         }
            //     })
            // $scope.$watch('item.obj[111379]', function(newValue,oldValue){
            //         if(newValue!=oldValue){
                
            //           if($scope.item.obj[111379] !=null && $scope.item.obj[111355]==undefined 
            //             && $scope.item.obj[111363] == undefined && $scope.item.obj[111371] == undefined){
            //               $scope.item.obj[111355] = $scope.item.obj[111379]
            //               $scope.item.obj[111363] = $scope.item.obj[111379]
            //               $scope.item.obj[111371] = $scope.item.obj[111379]
            //           }
            //           if($scope.item.obj[111379] !=null && $scope.item.obj[111363] == undefined 
            //             && $scope.item.obj[111371] == undefined){
            //               $scope.item.obj[111363] = $scope.item.obj[111379]
            //               $scope.item.obj[111371] = $scope.item.obj[111379]
            //           }
            //           if($scope.item.obj[111379] !=null && $scope.item.obj[111371] == undefined){
            //               $scope.item.obj[111371] = $scope.item.obj[111379]
            //           }
                      

                       
            //         }
            //     })






            // $scope.idpegawai=peagawaiLogin.id;
            // $scope.namapegawai=peagawaiLogin.namaLengkap
            // $scope.rubah = false
            // $scope.rubahid = ""

            // $scope.$watch('item.obj[111350]', function(newValue,oldValue){
            //         if(newValue!=oldValue){
                
            //           $scope.rubahid = 111351
            //           if($scope.item.obj[111350] !=null){
            //             if($scope.item.obj[111351] == undefined){
                        
            //               $scope.item.obj[111351] = { text:$scope.namapegawai}
            //               $scope.rubah = true
            //             }
            //           }else{
            //               $scope.item.obj[111351] = null
            //           }
                       
            //         if ($scope.rubah == true){
            //             $scope.item.obj[$scope.rubahid] ={ value:$scope.idpegawai,text:$scope.namapegawai}
            //         }   
            //         }

            //     })
            // $scope.$watch('item.obj[111358]', function(newValue,oldValue){
            //         if(newValue!=oldValue){
            //         $scope.rubahid = 111359
            //           if($scope.item.obj[111358] !=null){
            //             if ($scope.item.obj[111359] == undefined){
            //               $scope.item.obj[111359] = { text:$scope.namapegawai}
            //               $scope.rubah = true
                          
            //             }
            //           }else{
            //               $scope.item.obj[111359] = null
            //           }

            //         if ($scope.rubah == true){
            //             $scope.item.obj[$scope.rubahid] ={ value:$scope.idpegawai,text:$scope.namapegawai}
            //         }   
            //         }

                    
            //     })

           
        
            
            

            $scope.Batal =function(){
                $scope.item.obj=[]
            }
            $scope.kembali = function () {
                $rootScope.showRiwayat()
            }

            $scope.Save = function () {
                
                // $scope.item.obj[111351] ={ value:$scope.idpegawai1,text:$scope.namapegawai1}
                // $scope.item.obj[111359] ={ value:$scope.idpegawai2,text:$scope.namapegawai2}
                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if ($scope.item.obj[parseInt(arrobj[i])] instanceof Date)
                        $scope.item.obj[parseInt(arrobj[i])] = moment($scope.item.obj[parseInt(arrobj[i])]).format('YYYY-MM-DD HH:mm')
                     // $scope.item.obj[parseInt(arrobj[i])] = moment($scope.item.obj[parseInt(arrobj[i])]).format('HH:mm')
                    arrSave.push({ id: arrobj[i], values: $scope.item.obj[parseInt(arrobj[i])] })
                }
                $scope.cc.jenisemr = 'asesmen'
                var jsonSave = {
                    head: $scope.cc,
                    data: arrSave
                }
                medifirstService.post('emr/save-emr-dinamis', jsonSave).then(function (e) {

                    $rootScope.loadRiwayat()
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,  
                    'Cppt rawat inap new  5' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
                    + $scope.cc.noregistrasi).then(function (res) {
                    })
                    // var arrStr = {
                    //     0: e.data.data.noemr
                    // }
                    // cacheHelper.set('cacheNomorEMR', arrStr);
                });
            }

        }
    ]);
});