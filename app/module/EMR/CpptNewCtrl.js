define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('CpptNewCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 443
            var dataLoad = []
             $scope.isCetak = true
            var norecEMR = ''
            // var peagawaiLogin = medifirstService.getPegawaiLogin()
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
                $scope.item.obj[111468]=$scope.cc.tglregistrasi
                $scope.item.obj[111469]={ value: $scope.cc.iddpjp, text: $scope.cc.dokterdpjp }
                $scope.item.obj[111470]={ value: $scope.cc.objectruanganfk, text: $scope.cc.namaruangan }
                $scope.item.obj[111471]={ value: $scope.cc.objectkelasfk, text: $scope.cc.namakelas }
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
            $scope.$watch('item.obj[111349]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111349] !=null && $scope.item.obj[111348]==undefined){
                          $scope.item.obj[111348] =$scope.now
                      }

                       
                    }
                })

            
            $scope.$watch('item.obj[111359]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111359] !=null && $scope.item.obj[111358]==undefined){
                          $scope.item.obj[111358] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111369]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111369] !=null && $scope.item.obj[111368]==undefined){
                          $scope.item.obj[111368] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111379]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111379] !=null && $scope.item.obj[111378]==undefined){
                          $scope.item.obj[111378] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111389]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111389] !=null && $scope.item.obj[111388]==undefined){
                          $scope.item.obj[111388] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111399]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111399] !=null && $scope.item.obj[111398]==undefined){
                          $scope.item.obj[111398] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111409]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111409] !=null && $scope.item.obj[111408]==undefined){
                          $scope.item.obj[111408] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111419]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111419] !=null && $scope.item.obj[111418]==undefined){
                          $scope.item.obj[111418] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111429]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111429] !=null && $scope.item.obj[111428]==undefined){
                          $scope.item.obj[111428] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111439]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111439] !=null && $scope.item.obj[111438]==undefined){
                          $scope.item.obj[111438] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111449]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111449] !=null && $scope.item.obj[111448]==undefined){
                          $scope.item.obj[111448] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111474]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111474] !=null && $scope.item.obj[111473]==undefined){
                          $scope.item.obj[111473] =$scope.now
                      }

                       
                    }
                })

            $scope.$watch('item.obj[111459]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111459] !=null && $scope.item.obj[111458]==undefined){
                          $scope.item.obj[111458] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111474]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111474] !=null && $scope.item.obj[111473]==undefined){
                          $scope.item.obj[111473] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111484]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111484] !=null && $scope.item.obj[111483]==undefined){
                          $scope.item.obj[111483] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111494]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111494] !=null && $scope.item.obj[111493]==undefined){
                          $scope.item.obj[111493] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111504]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111504] !=null && $scope.item.obj[111503]==undefined){
                          $scope.item.obj[111503] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111514]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111514] !=null && $scope.item.obj[111513]==undefined){
                          $scope.item.obj[111513] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111524]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111524] !=null && $scope.item.obj[111523]==undefined){
                          $scope.item.obj[111523] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111534]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111534] !=null && $scope.item.obj[111533]==undefined){
                          $scope.item.obj[111533] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111544]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111544] !=null && $scope.item.obj[111543]==undefined){
                          $scope.item.obj[111543] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111554]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111554] !=null && $scope.item.obj[111553]==undefined){
                          $scope.item.obj[111553] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111564]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111564] !=null && $scope.item.obj[111563]==undefined){
                          $scope.item.obj[111563] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111574]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111574] !=null && $scope.item.obj[111573]==undefined){
                          $scope.item.obj[111573] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[111584]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111584] !=null && $scope.item.obj[111583]==undefined){
                          $scope.item.obj[111583] =$scope.now
                      }

                       
                    }
                })

            //notice otomatis
            
            $scope.$watch('item.obj[114818]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114818] !=null && $scope.item.obj[111352]==undefined){
                        $scope.item.obj[111352] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111353] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114819]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114819] !=null && $scope.item.obj[111362]==undefined){
                        $scope.item.obj[111362] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111363] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114820]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114820] !=null && $scope.item.obj[111372]==undefined){
                        $scope.item.obj[111372] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111373] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114821]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114821] !=null && $scope.item.obj[111382]==undefined){
                        $scope.item.obj[111382] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111383] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114822]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114822] !=null && $scope.item.obj[111392]==undefined){
                        $scope.item.obj[111392] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111393] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114823]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114823] !=null && $scope.item.obj[111402]==undefined){
                        $scope.item.obj[111402] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111403] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114824]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114824] !=null && $scope.item.obj[111412]==undefined){
                        $scope.item.obj[111412] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111413] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114825]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114825] !=null && $scope.item.obj[111422]==undefined){
                        $scope.item.obj[111422] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111423] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114826]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114826] !=null && $scope.item.obj[111432]==undefined){
                        $scope.item.obj[111432] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111433] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114827]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114827] !=null && $scope.item.obj[111442]==undefined){
                        $scope.item.obj[111442] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111443] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114828]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114828] !=null && $scope.item.obj[111452]==undefined){
                        $scope.item.obj[111452] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111453] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114829]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114829] !=null && $scope.item.obj[111462]==undefined){
                        $scope.item.obj[111462] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111463] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114830]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114830] !=null && $scope.item.obj[111477]==undefined){
                        $scope.item.obj[111477] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111478] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114831]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114831] !=null && $scope.item.obj[111487]==undefined){
                        $scope.item.obj[111487] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111488] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114832]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114832] !=null && $scope.item.obj[111497]==undefined){
                        $scope.item.obj[111497] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111498] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114832]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114832] !=null && $scope.item.obj[111497]==undefined){
                        $scope.item.obj[111497] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111498] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114833]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114833] !=null && $scope.item.obj[111507]==undefined){
                        $scope.item.obj[111507] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111508] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114834]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114834] !=null && $scope.item.obj[111517]==undefined){
                        $scope.item.obj[111517] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111518] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114835]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114835] !=null && $scope.item.obj[111527]==undefined){
                        $scope.item.obj[111527] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111528] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114836]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114836] !=null && $scope.item.obj[111537]==undefined){
                        $scope.item.obj[111537] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111538] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114837]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114837] !=null && $scope.item.obj[111547]==undefined){
                        $scope.item.obj[111547] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111548] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114838]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114838] !=null && $scope.item.obj[111557]==undefined){
                        $scope.item.obj[111557] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111558] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114839]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114839] !=null && $scope.item.obj[111567]==undefined){
                        $scope.item.obj[111567] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111568] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114841]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114841] !=null && $scope.item.obj[111577]==undefined){
                        $scope.item.obj[111577] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111578] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114841]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114841] !=null && $scope.item.obj[111587]==undefined){
                        $scope.item.obj[111587] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111588] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })         

            // tanggal isian otomatis
            $scope.$watch('item.obj[111350]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111350] !=null && $scope.item.obj[111351]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111351] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111360]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111360] !=null && $scope.item.obj[111361]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111361] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111370]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111370] !=null && $scope.item.obj[111371]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111371] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111380]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111380] !=null && $scope.item.obj[111381]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111381] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111390]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111390] !=null && $scope.item.obj[111391]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111391] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111400]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111400] !=null && $scope.item.obj[111401]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111401] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111410]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111410] !=null && $scope.item.obj[111411]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111411] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111420]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111420] !=null && $scope.item.obj[111421]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111421] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111430]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111430] !=null && $scope.item.obj[111431]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111431] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111440]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111440] !=null && $scope.item.obj[111441]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111441] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111450]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111450] !=null && $scope.item.obj[111451]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111451] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111460]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111460] !=null && $scope.item.obj[111461]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111461] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111475]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111475] !=null && $scope.item.obj[111476]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111476] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111485]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111485] !=null && $scope.item.obj[111486]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111486] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111495]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111495] !=null && $scope.item.obj[111496]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111496] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111505]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111505] !=null && $scope.item.obj[111506]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111506] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111515]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111515] !=null && $scope.item.obj[111516]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111516] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111525]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111525] !=null && $scope.item.obj[111526]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111526] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111535]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111535] !=null && $scope.item.obj[111536]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111536] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111545]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111545] !=null && $scope.item.obj[111546]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111546] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111555]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111555] !=null && $scope.item.obj[111556]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111556] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111565]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111565] !=null && $scope.item.obj[111566]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111566] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111575]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111575] !=null && $scope.item.obj[111576]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111576] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111585]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111585] !=null && $scope.item.obj[111586]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111586] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            // tanggal Verifikasi otomatis

            $scope.$watch('item.obj[111355]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111355] !=null && $scope.item.obj[111356]==undefined){
                          $scope.item.obj[111356] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[111357] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111395]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                    
                      if($scope.item.obj[111395] !=null && $scope.item.obj[111397]==undefined){
                        $scope.item.obj[111396] =$scope.now
                        let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                        $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                        $scope.item.obj[111397] = { value: pegawai.id, text: pegawai.namaLengkap }
                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111435]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                    
                      if($scope.item.obj[111435] !=null && $scope.item.obj[111436]==undefined){
                        $scope.item.obj[111436] =$scope.now
                        let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                        $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                        $scope.item.obj[111437] = { value: pegawai.id, text: pegawai.namaLengkap }
                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111480]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                    
                      if($scope.item.obj[111480] !=null && $scope.item.obj[111481]==undefined){
                        $scope.item.obj[111481] =$scope.now
                        let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                        $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                        $scope.item.obj[111482] = { value: pegawai.id, text: pegawai.namaLengkap }
                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111520]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                    
                      if($scope.item.obj[111520] !=null && $scope.item.obj[111521]==undefined){
                        $scope.item.obj[111521] =$scope.now
                        let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                        $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                        $scope.item.obj[111522] = { value: pegawai.id, text: pegawai.namaLengkap }
                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[111560]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                    
                      if($scope.item.obj[111560] !=null && $scope.item.obj[111561]==undefined){
                        $scope.item.obj[111561] =$scope.now
                        let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                        $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                        $scope.item.obj[111562] = { value: pegawai.id, text: pegawai.namaLengkap }
                      }
                      

                       
                    }
                })
            
            // $scope.$watch('item.obj[111350]', function(newValue,oldValue){
            //         if(newValue!=oldValue){
                
            //           if($scope.item.obj[111350] !=null && $scope.item.obj[111351]==undefined){
            //               $scope.item.obj[111351] ={text:peagawaiLogin.namaLengkap, value:peagawaiLogin.id}
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
                    'Cppt rawat inap new ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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