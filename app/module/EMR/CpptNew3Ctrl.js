define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('CpptNew3Ctrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 445
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
                $scope.item.obj[111957]=$scope.cc.tglregistrasi
                $scope.item.obj[111958]={ value: $scope.cc.iddpjp, text: $scope.cc.dokterdpjp }
                $scope.item.obj[111959]={ value: $scope.cc.objectruanganfk, text: $scope.cc.namaruangan }
                $scope.item.obj[111960]={ value: $scope.cc.objectkelasfk, text: $scope.cc.namakelas }
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
                            if (dataLoad[i].value!=null) {
                                var str = dataLoad[i].value
                                if(str != undefined){
                                    var res = str.split("~");
                                    // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
                                    $scope.item.obj[dataLoad[i].emrdfk] = { value: res[0], text: res[1] }        
                                }  
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
            $scope.$watch('item.obj[111838]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111838] !=null && $scope.item.obj[111837]==undefined){
                          $scope.item.obj[111837] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111848]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111848] !=null && $scope.item.obj[111847]==undefined){
                          $scope.item.obj[111847] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111858]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111858] !=null && $scope.item.obj[111857]==undefined){
                          $scope.item.obj[111857] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111868]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111868] !=null && $scope.item.obj[111867]==undefined){
                          $scope.item.obj[111867] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111878]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111878] !=null && $scope.item.obj[111877]==undefined){
                          $scope.item.obj[111877] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111888]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111888] !=null && $scope.item.obj[111887]==undefined){
                          $scope.item.obj[111887] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111898]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111898] !=null && $scope.item.obj[111897]==undefined){
                          $scope.item.obj[111897] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111908]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111908] !=null && $scope.item.obj[111907]==undefined){
                          $scope.item.obj[111907] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111918]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111918] !=null && $scope.item.obj[111917]==undefined){
                          $scope.item.obj[111917] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111928]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111928] !=null && $scope.item.obj[111927]==undefined){
                          $scope.item.obj[111927] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111938]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111938] !=null && $scope.item.obj[111937]==undefined){
                          $scope.item.obj[111937] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111948]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111948] !=null && $scope.item.obj[111947]==undefined){
                          $scope.item.obj[111947] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111962]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111962] !=null && $scope.item.obj[111961]==undefined){
                          $scope.item.obj[111961] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111972]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111972] !=null && $scope.item.obj[111971]==undefined){
                          $scope.item.obj[111971] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111982]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111982] !=null && $scope.item.obj[111981]==undefined){
                          $scope.item.obj[111981] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111992]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111992] !=null && $scope.item.obj[111991]==undefined){
                          $scope.item.obj[111991] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112002]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112002] !=null && $scope.item.obj[112001]==undefined){
                          $scope.item.obj[112001] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112012]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112012] !=null && $scope.item.obj[112011]==undefined){
                          $scope.item.obj[112011] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112022]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112022] !=null && $scope.item.obj[112021]==undefined){
                          $scope.item.obj[112021] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112032]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112032] !=null && $scope.item.obj[112031]==undefined){
                          $scope.item.obj[112031] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112042]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112042] !=null && $scope.item.obj[112041]==undefined){
                          $scope.item.obj[112041] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112052]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112052] !=null && $scope.item.obj[112051]==undefined){
                          $scope.item.obj[112051] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112062]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112062] !=null && $scope.item.obj[112061]==undefined){
                          $scope.item.obj[112061] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112072]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112072] !=null && $scope.item.obj[112071]==undefined){
                          $scope.item.obj[112071] =$scope.now
                      }

                       
                    }
                })
            
            
            
            
            

            // Pegawai isian otomatis
            $scope.$watch('item.obj[111839]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111839] !=null && $scope.item.obj[111840]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111840] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111849]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111849] !=null && $scope.item.obj[111850]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111850] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111859]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111859] !=null && $scope.item.obj[111860]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111860] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111869]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111869] !=null && $scope.item.obj[111870]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111870] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111879]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111879] !=null && $scope.item.obj[111880]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111880] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            
            $scope.$watch('item.obj[111889]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111889] !=null && $scope.item.obj[111890]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111890] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111899]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111899] !=null && $scope.item.obj[111900]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111900] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111909]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111909] !=null && $scope.item.obj[111910]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111910] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111919]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111919] !=null && $scope.item.obj[111920]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111920] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111929]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111929] !=null && $scope.item.obj[111930]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111930] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111939]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111939] !=null && $scope.item.obj[111940]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111940] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111949]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111949] !=null && $scope.item.obj[111950]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111950] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111963]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111963] !=null && $scope.item.obj[111964]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111964] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111973]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111973] !=null && $scope.item.obj[111974]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111974] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111983]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111983] !=null && $scope.item.obj[111984]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111984] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111993]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111993] !=null && $scope.item.obj[111994]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111994] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112003]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112003] !=null && $scope.item.obj[112004]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112004] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112013]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112013] !=null && $scope.item.obj[112014]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112014] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112023]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112023] !=null && $scope.item.obj[112024]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112024] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112033]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112033] !=null && $scope.item.obj[112034]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112034] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112043]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112043] !=null && $scope.item.obj[112044]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112044] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112053]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112053] !=null && $scope.item.obj[112054]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112054] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112063]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112063] !=null && $scope.item.obj[112064]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112064] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112073]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112073] !=null && $scope.item.obj[112074]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112074] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            //notice otomatis
            $scope.$watch('item.obj[114866]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114866] !=null && $scope.item.obj[111841]==undefined){
                        $scope.item.obj[111841] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111842] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114867]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114867] !=null && $scope.item.obj[111851]==undefined){
                        $scope.item.obj[111851] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111852] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114868]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114868] !=null && $scope.item.obj[111861]==undefined){
                        $scope.item.obj[111861] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111846] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114869]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114869] !=null && $scope.item.obj[111871]==undefined){
                        $scope.item.obj[111871] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111872] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114870]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114870] !=null && $scope.item.obj[111881]==undefined){
                        $scope.item.obj[111881] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111882] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114871]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114871] !=null && $scope.item.obj[111891]==undefined){
                        $scope.item.obj[111891] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111892] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114872]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114872] !=null && $scope.item.obj[111901]==undefined){
                        $scope.item.obj[111901] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111902] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114873]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114873] !=null && $scope.item.obj[111911]==undefined){
                        $scope.item.obj[111911] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111912] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114874]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114874] !=null && $scope.item.obj[111921]==undefined){
                        $scope.item.obj[111921] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111922] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114875]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114875] !=null && $scope.item.obj[111931]==undefined){
                        $scope.item.obj[111931] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111932] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114876]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114876] !=null && $scope.item.obj[111941]==undefined){
                        $scope.item.obj[111941] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111942] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114877]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114877] !=null && $scope.item.obj[111951]==undefined){
                        $scope.item.obj[111951] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111952] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114878]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114878] !=null && $scope.item.obj[111965]==undefined){
                        $scope.item.obj[111965] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111966] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114879]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114879] !=null && $scope.item.obj[111975]==undefined){
                        $scope.item.obj[111975] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111976] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114880]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114880] !=null && $scope.item.obj[111985]==undefined){
                        $scope.item.obj[111985] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111986] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114881]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114881] !=null && $scope.item.obj[111995]==undefined){
                        $scope.item.obj[111995] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111996] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114882]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114882] !=null && $scope.item.obj[112005]==undefined){
                        $scope.item.obj[112005] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112006] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114883]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114883] !=null && $scope.item.obj[112015]==undefined){
                        $scope.item.obj[112015] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112016] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114884]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114884] !=null && $scope.item.obj[112025]==undefined){
                        $scope.item.obj[112025] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112026] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114885]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114885] !=null && $scope.item.obj[112035]==undefined){
                        $scope.item.obj[112035] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112036] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114886]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114886] !=null && $scope.item.obj[112045]==undefined){
                        $scope.item.obj[112045] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112046] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114887]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114887] !=null && $scope.item.obj[112055]==undefined){
                        $scope.item.obj[112055] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112056] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114888]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114888] !=null && $scope.item.obj[112065]==undefined){
                        $scope.item.obj[112065] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112066] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[114889]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114889] !=null && $scope.item.obj[112075]==undefined){
                        $scope.item.obj[112075] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112076] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })



            // tanggal Verifikasi otomatis
            $scope.$watch('item.obj[111844]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111844] !=null && $scope.item.obj[111845]==undefined){
                          $scope.item.obj[111845] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111846] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111884]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111884] !=null && $scope.item.obj[111885]==undefined){
                          $scope.item.obj[111885] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111886] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111924]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111924] !=null && $scope.item.obj[111925]==undefined){
                          $scope.item.obj[111925] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111926] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111968]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111968] !=null && $scope.item.obj[111969]==undefined){
                          $scope.item.obj[111969] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111970] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112008]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112008] !=null && $scope.item.obj[112009]==undefined){
                          $scope.item.obj[112009] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112010] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112048]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112048] !=null && $scope.item.obj[112049]==undefined){
                          $scope.item.obj[112049] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112050] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            
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
                    'Cppt rawat inap new  3' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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