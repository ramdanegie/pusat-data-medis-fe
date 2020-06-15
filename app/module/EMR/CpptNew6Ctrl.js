define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('CpptNew6Ctrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 448
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
                $scope.item.obj[112689]=$scope.cc.tglregistrasi
                $scope.item.obj[112690]={ value: $scope.cc.iddpjp, text: $scope.cc.dokterdpjp }
                $scope.item.obj[112691]={ value: $scope.cc.objectruanganfk, text: $scope.cc.namaruangan }
                $scope.item.obj[112692]={ value: $scope.cc.objectkelasfk, text: $scope.cc.namakelas }
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
            $scope.$watch('item.obj[112570]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112570] !=null && $scope.item.obj[112569]==undefined){
                          $scope.item.obj[112569] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112580]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112580] !=null && $scope.item.obj[112569]==undefined){
                          $scope.item.obj[112569] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112590]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112590] !=null && $scope.item.obj[112589]==undefined){
                          $scope.item.obj[112589] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112600]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112600] !=null && $scope.item.obj[112599]==undefined){
                          $scope.item.obj[112599] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112610]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112610] !=null && $scope.item.obj[112609]==undefined){
                          $scope.item.obj[112609] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112620]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112620] !=null && $scope.item.obj[112619]==undefined){
                          $scope.item.obj[112619] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112630]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112630] !=null && $scope.item.obj[112629]==undefined){
                          $scope.item.obj[112629] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112640]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112640] !=null && $scope.item.obj[112639]==undefined){
                          $scope.item.obj[112639] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112650]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112650] !=null && $scope.item.obj[112649]==undefined){
                          $scope.item.obj[112649] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112660]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112660] !=null && $scope.item.obj[112659]==undefined){
                          $scope.item.obj[112659] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112670]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112670] !=null && $scope.item.obj[112669]==undefined){
                          $scope.item.obj[112669] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112680]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112680] !=null && $scope.item.obj[112679]==undefined){
                          $scope.item.obj[112679] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112694]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112694] !=null && $scope.item.obj[112693]==undefined){
                          $scope.item.obj[112693] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112704]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112704] !=null && $scope.item.obj[112703]==undefined){
                          $scope.item.obj[112703] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112714]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112714] !=null && $scope.item.obj[112713]==undefined){
                          $scope.item.obj[112713] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112724]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112724] !=null && $scope.item.obj[112723]==undefined){
                          $scope.item.obj[112723] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112734]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112734] !=null && $scope.item.obj[112733]==undefined){
                          $scope.item.obj[112733] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112744]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112744] !=null && $scope.item.obj[112743]==undefined){
                          $scope.item.obj[112743] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112754]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112754] !=null && $scope.item.obj[112753]==undefined){
                          $scope.item.obj[112753] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112764]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112764] !=null && $scope.item.obj[112763]==undefined){
                          $scope.item.obj[112763] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112774]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112774] !=null && $scope.item.obj[112773]==undefined){
                          $scope.item.obj[112773] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112784]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112784] !=null && $scope.item.obj[112783]==undefined){
                          $scope.item.obj[112783] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112794]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112794] !=null && $scope.item.obj[112793]==undefined){
                          $scope.item.obj[112793] =$scope.now
                      }

                       
                    }
                })
            $scope.$watch('item.obj[112804]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112804] !=null && $scope.item.obj[112803]==undefined){
                          $scope.item.obj[112803] =$scope.now
                      }

                       
                    }
                })


            // pegawai otomatis
             $scope.$watch('item.obj[112083]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112083] !=null && $scope.item.obj[112084]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112084] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112093]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112093] !=null && $scope.item.obj[112094]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112094] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112103]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112103] !=null && $scope.item.obj[112104]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112104] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112113]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112113] !=null && $scope.item.obj[112114]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112114] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112123]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112123] !=null && $scope.item.obj[112124]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112124] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112133]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112133] !=null && $scope.item.obj[112134]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112134] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112143]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112143] !=null && $scope.item.obj[112144]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112144] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112153]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112153] !=null && $scope.item.obj[112154]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112154] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112163]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112163] !=null && $scope.item.obj[112164]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112164] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112173]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112173] !=null && $scope.item.obj[112174]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112174] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112183]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112183] !=null && $scope.item.obj[112184]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112184] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112193]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112193] !=null && $scope.item.obj[112194]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112194] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112207]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112207] !=null && $scope.item.obj[112208]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112208] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112217]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112217] !=null && $scope.item.obj[112218]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112218] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112227]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112227] !=null && $scope.item.obj[112228]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112228] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112237]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112237] !=null && $scope.item.obj[112238]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112238] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112247]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112247] !=null && $scope.item.obj[112248]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112248] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112257]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112257] !=null && $scope.item.obj[112258]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112258] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112267]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112267] !=null && $scope.item.obj[112268]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112268] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112277]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112277] !=null && $scope.item.obj[112278]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112278] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112287]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112287] !=null && $scope.item.obj[112288]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112288] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112297]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112297] !=null && $scope.item.obj[112298]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112298] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112307]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112307] !=null && $scope.item.obj[112308]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112308] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112317]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112317] !=null && $scope.item.obj[112318]==undefined){

                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112318] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            //notice otomatis
            $scope.$watch('item.obj[114890]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114890] !=null && $scope.item.obj[112085]==undefined){
                        $scope.item.obj[112085] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112086] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114891]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114891] !=null && $scope.item.obj[112095]==undefined){
                        $scope.item.obj[112095] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112096] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114892]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114892] !=null && $scope.item.obj[112105]==undefined){
                        $scope.item.obj[112105] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112106] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114893]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114893] !=null && $scope.item.obj[112115]==undefined){
                        $scope.item.obj[112115] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112116] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114894]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114894] !=null && $scope.item.obj[112125]==undefined){
                        $scope.item.obj[112125] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112126] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114895]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114895] !=null && $scope.item.obj[112135]==undefined){
                        $scope.item.obj[112135] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112136] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114896]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114896] !=null && $scope.item.obj[112145]==undefined){
                        $scope.item.obj[112145] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112146] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })  
                $scope.$watch('item.obj[114897]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114897] !=null && $scope.item.obj[112155]==undefined){
                        $scope.item.obj[112155] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112156] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114898]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114898] !=null && $scope.item.obj[112165]==undefined){
                        $scope.item.obj[112165] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112166] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114899]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114899] !=null && $scope.item.obj[112175]==undefined){
                        $scope.item.obj[112175] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112176] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114900]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114900] !=null && $scope.item.obj[112185]==undefined){
                        $scope.item.obj[112185] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112186] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114901]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114901] !=null && $scope.item.obj[112195]==undefined){
                        $scope.item.obj[112195] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112196] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114902]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114902] !=null && $scope.item.obj[112209]==undefined){
                        $scope.item.obj[112209] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112210] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114903]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114903] !=null && $scope.item.obj[112219]==undefined){
                        $scope.item.obj[112219] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112220] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114904]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114904] !=null && $scope.item.obj[112229]==undefined){
                        $scope.item.obj[112229] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112230] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114905]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114905] !=null && $scope.item.obj[112239]==undefined){
                        $scope.item.obj[112239] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112240] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                }) 
                $scope.$watch('item.obj[114906]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114906] !=null && $scope.item.obj[112249]==undefined){
                        $scope.item.obj[112249] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112250] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114907]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114907] !=null && $scope.item.obj[112259]==undefined){
                        $scope.item.obj[112259] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112260] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114908]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114908] !=null && $scope.item.obj[112269]==undefined){
                        $scope.item.obj[112269] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112270] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114909]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114909] !=null && $scope.item.obj[112279]==undefined){
                        $scope.item.obj[112279] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112280] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114910]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114910] !=null && $scope.item.obj[112289]==undefined){
                        $scope.item.obj[112289] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112290] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114911]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114911] !=null && $scope.item.obj[112299]==undefined){
                        $scope.item.obj[112299] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112300] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114912]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114912] !=null && $scope.item.obj[112309]==undefined){
                        $scope.item.obj[112309] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112310] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
                $scope.$watch('item.obj[114913]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114913] !=null && $scope.item.obj[112319]==undefined){
                        $scope.item.obj[112319] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112320] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            // tanggal Verifikasi otomatis
            $scope.$watch('item.obj[112088]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112088] !=null && $scope.item.obj[112089]==undefined){
                          $scope.item.obj[112089] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112090] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112128]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112128] !=null && $scope.item.obj[112129]==undefined){
                          $scope.item.obj[112129] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112130] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112168]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112168] !=null && $scope.item.obj[112169]==undefined){
                          $scope.item.obj[112169] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112170] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112212]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112212] !=null && $scope.item.obj[112213]==undefined){
                          $scope.item.obj[112213] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112214] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112252]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112252] !=null && $scope.item.obj[112253]==undefined){
                          $scope.item.obj[112253] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112254] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            $scope.$watch('item.obj[112292]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[112292] !=null && $scope.item.obj[112293]==undefined){
                          $scope.item.obj[112293] =$scope.now
                          let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                          $scope.listPegawai.add({value: pegawai.id, text: pegawai.namaLengkap})
                          $scope.item.obj[112294] = { value: pegawai.id, text: pegawai.namaLengkap }

                      }
                      

                       
                    }
                })
            // END tanggal Verifikasi otomatis

           
           


           
            
            
            
            
            

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
                    'Cppt rawat inap new  6' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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