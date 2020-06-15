define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('CpptNewUmumCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 510
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
                $scope.item.obj[115395]=$scope.cc.tglregistrasi
                $scope.item.obj[115396]={ value: $scope.cc.iddpjp, text: $scope.cc.dokterdpjp }
                $scope.item.obj[115397]={ value: $scope.cc.objectruanganfk, text: $scope.cc.namaruangan }
                $scope.item.obj[115398]={ value: $scope.cc.objectkelasfk, text: $scope.cc.namakelas }
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
            $scope.$watch('item.obj[111594]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111594] !=null && $scope.item.obj[111593]==undefined){
                          $scope.item.obj[111593] =$scope.now
                      }

                       
                    }
                })

            
            $scope.$watch('item.obj[111604]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111604] !=null && $scope.item.obj[111603]==undefined){
                          $scope.item.obj[111603] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111614]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111614] !=null && $scope.item.obj[111613]==undefined){
                          $scope.item.obj[111613] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111624]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111624] !=null && $scope.item.obj[111623]==undefined){
                          $scope.item.obj[111623] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111634]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111634] !=null && $scope.item.obj[111633]==undefined){
                          $scope.item.obj[111633] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111644]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111644] !=null && $scope.item.obj[111643]==undefined){
                          $scope.item.obj[111643] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111654]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111654] !=null && $scope.item.obj[111653]==undefined){
                          $scope.item.obj[111653] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111664]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111664] !=null && $scope.item.obj[111663]==undefined){
                          $scope.item.obj[111663] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111674]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111674] !=null && $scope.item.obj[111673]==undefined){
                          $scope.item.obj[111673] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111684]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111684] !=null && $scope.item.obj[111683]==undefined){
                          $scope.item.obj[111683] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111694]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111694] !=null && $scope.item.obj[111693]==undefined){
                          $scope.item.obj[111693] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111718]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111718] !=null && $scope.item.obj[111717]==undefined){
                          $scope.item.obj[111717] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111728]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111728] !=null && $scope.item.obj[111727]==undefined){
                          $scope.item.obj[111727] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111738]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111738] !=null && $scope.item.obj[111737]==undefined){
                          $scope.item.obj[111737] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111748]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111748] !=null && $scope.item.obj[111747]==undefined){
                          $scope.item.obj[111747] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111758]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111758] !=null && $scope.item.obj[111757]==undefined){
                          $scope.item.obj[111757] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111768]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111768] !=null && $scope.item.obj[111767]==undefined){
                          $scope.item.obj[111767] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111778]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111778] !=null && $scope.item.obj[111777]==undefined){
                          $scope.item.obj[111777] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111788]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111788] !=null && $scope.item.obj[111787]==undefined){
                          $scope.item.obj[111787] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111798]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111798] !=null && $scope.item.obj[111797]==undefined){
                          $scope.item.obj[111797] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111808]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111808] !=null && $scope.item.obj[111807]==undefined){
                          $scope.item.obj[111807] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111818]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111818] !=null && $scope.item.obj[111817]==undefined){
                          $scope.item.obj[111817] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111828]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111828] !=null && $scope.item.obj[111827]==undefined){
                          $scope.item.obj[111827] =$scope.now
                      }

                       
                    }
                })
            
            

            // Pegawai isian otomatis
            $scope.$watch('item.obj[111595]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111595] !=null && $scope.item.obj[111596]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111596] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111605]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111605] !=null && $scope.item.obj[111606]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111606] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111615]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111615] !=null && $scope.item.obj[111616]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111616] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111625]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111625] !=null && $scope.item.obj[111626]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111626] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111635]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111635] !=null && $scope.item.obj[111636]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111636] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111645]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111645] !=null && $scope.item.obj[111646]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111646] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111655]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111655] !=null && $scope.item.obj[111656]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111656] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111665]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111665] !=null && $scope.item.obj[111666]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111666] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111675]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111675] !=null && $scope.item.obj[111676]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111676] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111685]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111685] !=null && $scope.item.obj[111686]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111686] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111695]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111695] !=null && $scope.item.obj[111696]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111696] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111705]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111705] !=null && $scope.item.obj[111706]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111706] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111719]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111719] !=null && $scope.item.obj[111720]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111720] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111729]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111729] !=null && $scope.item.obj[111730]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111730] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111739]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111739] !=null && $scope.item.obj[111740]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111740] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111749]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111749] !=null && $scope.item.obj[111750]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111750] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111759]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111759] !=null && $scope.item.obj[111760]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111760] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111769]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111769] !=null && $scope.item.obj[111770]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111770] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111779]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111779] !=null && $scope.item.obj[111780]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111780] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111789]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111789] !=null && $scope.item.obj[111790]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111790] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111799]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111799] !=null && $scope.item.obj[111800]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111800] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111809]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111809] !=null && $scope.item.obj[111810]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111810] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111819]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111819] !=null && $scope.item.obj[111820]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111820] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111829]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111829] !=null && $scope.item.obj[111830]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111830] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            //notice otomatis
            $scope.$watch('item.obj[114842]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114842] !=null && $scope.item.obj[111597]==undefined){
                        $scope.item.obj[111597] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111598] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114843]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114843] !=null && $scope.item.obj[111607]==undefined){
                        $scope.item.obj[111607] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111608] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114844]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114844] !=null && $scope.item.obj[111617]==undefined){
                        $scope.item.obj[111617] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111618] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114845]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114845] !=null && $scope.item.obj[111627]==undefined){
                        $scope.item.obj[111627] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111628] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114846]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114846] !=null && $scope.item.obj[111637]==undefined){
                        $scope.item.obj[111637] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111638] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114847]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114847] !=null && $scope.item.obj[111647]==undefined){
                        $scope.item.obj[111647] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111648] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114848]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114848] !=null && $scope.item.obj[111657]==undefined){
                        $scope.item.obj[111657] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111658] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })  
                $scope.$watch('item.obj[114849]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114849] !=null && $scope.item.obj[111667]==undefined){
                        $scope.item.obj[111667] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111668] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114850]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114850] !=null && $scope.item.obj[111688]==undefined){
                        $scope.item.obj[111687] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111688] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114851]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114851] !=null && $scope.item.obj[111487]==undefined){
                        $scope.item.obj[111487] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111488] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114852]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114852] !=null && $scope.item.obj[111697]==undefined){
                        $scope.item.obj[111697] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111698] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114853]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114853] !=null && $scope.item.obj[111707]==undefined){
                        $scope.item.obj[111707] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111708] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114854]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114854] !=null && $scope.item.obj[111721]==undefined){
                        $scope.item.obj[111721] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111722] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114854]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114854] !=null && $scope.item.obj[111721]==undefined){
                        $scope.item.obj[111721] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111722] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114855]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114855] !=null && $scope.item.obj[111731]==undefined){
                        $scope.item.obj[111731] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111732] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114856]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114856] !=null && $scope.item.obj[111741]==undefined){
                        $scope.item.obj[111741] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111742] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114857]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114857] !=null && $scope.item.obj[111751]==undefined){
                        $scope.item.obj[111751] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111752] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114858]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114858] !=null && $scope.item.obj[111761]==undefined){
                        $scope.item.obj[111761] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111762] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114859]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114859] !=null && $scope.item.obj[111771]==undefined){
                        $scope.item.obj[111771] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111772] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114860]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114860] !=null && $scope.item.obj[111781]==undefined){
                        $scope.item.obj[111781] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111782] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114861]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114861] !=null && $scope.item.obj[111791]==undefined){
                        $scope.item.obj[111791] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111792] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114862]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114862] !=null && $scope.item.obj[111801]==undefined){
                        $scope.item.obj[111801] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111802] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114863]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114863] !=null && $scope.item.obj[111811]==undefined){
                        $scope.item.obj[111811] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111812] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114864]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114864] !=null && $scope.item.obj[111821]==undefined){
                        $scope.item.obj[111821] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111822] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114865]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114865] !=null && $scope.item.obj[111831]==undefined){
                        $scope.item.obj[111831] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111832] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            // tanggal Verifikasi otomatis
            $scope.$watch('item.obj[111600]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111600] !=null && $scope.item.obj[111601]==undefined){
                          $scope.item.obj[111601] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111602] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111640]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111640] !=null && $scope.item.obj[111641]==undefined){
                          $scope.item.obj[111641] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111642] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111680]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111680] !=null && $scope.item.obj[111681]==undefined){
                          $scope.item.obj[111681] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111682] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111724]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111724] !=null && $scope.item.obj[111725]==undefined){
                          $scope.item.obj[111725] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111726] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111764]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111764] !=null && $scope.item.obj[111765]==undefined){
                          $scope.item.obj[111765] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111766] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111804]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111804] !=null && $scope.item.obj[111805]==undefined){
                          $scope.item.obj[111805] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111806] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
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
                $scope.cc.jenisemr = 'umum'
                var jsonSave = {
                    head: $scope.cc,
                    data: arrSave
                }
                medifirstService.post('emr/save-emr-dinamis', jsonSave).then(function (e) {

                    $rootScope.loadRiwayat()
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,  
                    'Cppt rawat inap new umum' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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