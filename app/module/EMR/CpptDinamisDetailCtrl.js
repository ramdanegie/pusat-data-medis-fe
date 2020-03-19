define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('CpptDinamisDetailCtrl', ['$rootScope', '$scope', '$state', 'CacheHelper', 'MedifirstService',
        function ($rootScope, $scope, $state, cacheHelper, medifirstService) {

            $scope.item = {};
            $scope.cc = {};
            var namaEMR = ''
            var nomorEMR = ''
            $scope.tombolSimpanVis = true;
            var dataLoad = [];
            LoadCache();
            FormLoad();
            var peagawaiLogin = medifirstService.getPegawaiLogin()
            // nomorEMR = $state.params.nomorEMR            
            function LoadCache() {
                nomorEMR = '-'
                var chacePeriode = cacheHelper.get('cacheNomorEMR');
                if (chacePeriode != undefined) {
                    nomorEMR = chacePeriode[0]
                }
            }

            function FormLoad() {

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
                    if (nomorEMR == '') {
                        $scope.cc.norec_emr = ''
                    } else {
                        $scope.cc.norec_emr = nomorEMR
                    }
                }
            }



            if (nomorEMR == '-') {
                medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + $state.params.namaEMR).then(function (e) {
                    $scope.listData = e.data
                     var deptInap=[16,35,17]
                    var deptId = localStorage.getItem('departemenPengkajian');
                   if(deptInap.includes(parseInt(deptId)) == true){
                     $scope.statusHidden = false 
                  }else{
                      $scope.statusHidden = true 
                  }
                    $scope.item.title = e.data.title
                    $scope.item.classgrid = e.data.classgrid

                    $scope.cc.emrfk = $state.params.namaEMR
                    $scope.item.objcbo = []
                    for (var i = e.data.kolom1.length - 1; i >= 0; i--) {
                        if (e.data.kolom1[i].cbotable != null) {
                            medifirstService.getPart2(e.data.kolom1[i].id, e.data.kolom1[i].cbotable, true, true, 20).then(function (data) {
                                $scope.item.objcbo[data.options.idididid] = data
                                // if(data.options.idididid ==5219){
                                //     $scope.item.obj[5219] = { value:peagawaiLogin.id,text:peagawaiLogin.namaLengkap}
                                // }
                                // if(data.options.idididid ==5220){
                                //     $scope.item.obj[5220] = { value:peagawaiLogin.id,text:peagawaiLogin.namaLengkap}
                                // }
                            })
                        }
                        for (var ii = e.data.kolom1[i].child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom1[i].child[ii].cbotable != null) {
                                medifirstService.getPart2(e.data.kolom1[i].child[ii].id, e.data.kolom1[i].child[ii].cbotable, true, true, 20).then(function (data) {
                                    $scope.item.objcbo[data.options.idididid] = data

                                })
                            }
                        }
                    }

                    for (var i = e.data.kolom2.length - 1; i >= 0; i--) {
                        if (e.data.kolom2[i].cbotable != null) {
                            medifirstService.getPart2(e.data.kolom2[i].id, e.data.kolom2[i].cbotable, true, true, 20).then(function (data) {
                                $scope.item.objcbo[data.options.idididid] = data
                            })
                        }
                        for (var ii = e.data.kolom2[i].child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom2[i].child[ii].cbotable != null) {
                                medifirstService.getPart2(e.data.kolom2[i].child[ii].id, e.data.kolom2[i].child[ii].cbotable, true, true, 20).then(function (data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                        }
                    }
                    for (var i = e.data.kolom3.length - 1; i >= 0; i--) {
                        if (e.data.kolom3[i].cbotable != null) {
                            medifirstService.getPart2(e.data.kolom3[i].id, e.data.kolom3[i].cbotable, true, true, 20).then(function (data) {
                                $scope.item.objcbo[data.options.idididid] = data
                            })
                        }
                        for (var ii = e.data.kolom3[i].child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom3[i].child[ii].cbotable != null) {
                                medifirstService.getPart2(e.data.kolom3[i].child[ii].id, e.data.kolom3[i].child[ii].cbotable, true, true, 20).then(function (data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                        }
                    }
                    for (var i = e.data.kolom4.length - 1; i >= 0; i--) {
                        if (e.data.kolom4[i].cbotable != null) {
                            medifirstService.getPart2(e.data.kolom4[i].id, e.data.kolom4[i].cbotable, true, true, 20).then(function (data) {
                                $scope.item.objcbo[data.options.idididid] = data
                            })
                        }
                        for (var ii = e.data.kolom4[i].child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom4[i].child[ii].cbotable != null) {
                                medifirstService.getPart2(e.data.kolom4[i].child[ii].id, e.data.kolom4[i].child[ii].cbotable, true, true, 20).then(function (data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                        }
                    }

                    var cacheVital = cacheHelper.get('cacheVitalSign')
                    if (cacheVital != undefined) {
                        if (cacheVital.length > 0) {
                            $scope.item.obj = []
                            // debugger
                            for (var i = 0; i <= cacheVital.length - 1; i++) {
                                if (parseFloat($scope.cc.emrfk) != cacheVital[i].emrfk) {
                                    if (cacheVital[i].type == "textbox") {
                                        $scope.item.obj[cacheVital[i].kodeex] = cacheVital[i].value
                                    }
                                    if (cacheVital[i].type == "checkbox") {
                                        chekedd = false
                                        if (cacheVital[i].value == '1') {
                                            chekedd = true
                                        }
                                        $scope.item.obj[cacheVital[i].kodeex] = chekedd
                                    }

                                    if (cacheVital[i].type == "datetime") {
                                        $scope.item.obj[cacheVital[i].kodeex] = new Date(cacheVital[i].value)
                                    }
                                    if (cacheVital[i].type == "time") {
                                        $scope.item.obj[cacheVital[i].kodeex] = new Date(cacheVital[i].value)
                                    }
                                    if (cacheVital[i].type == "date") {
                                        $scope.item.obj[cacheVital[i].kodeex] = new Date(cacheVital[i].value)
                                    }

                                    if (cacheVital[i].type == "checkboxtextbox") {
                                        $scope.item.obj[cacheVital[i].kodeex] = cacheVital[i].value
                                        $scope.item.obj2[cacheVital[i].kodeex] = true
                                    }
                                    if (cacheVital[i].type == "textarea") {
                                        $scope.item.obj[cacheVital[i].kodeex] = cacheVital[i].value
                                    }
                                    if (cacheVital[i].type == "combobox") {
                                        var str = cacheVital[i].value
                                        var res = str.split("~");
                                        // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
                                        $scope.item.obj[cacheVital[i].kodeex] = { value: res[0], text: res[1] }

                                    }
                                }

                            }
                        }

                    }
                   
                })
            } else {
                var chekedd = false
                //medifirstService.get("emr/get-emr-transaksi-detail?noemr="+$state.params.nomorEMR, true).then(function(dat){
                medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + $state.params.namaEMR).then(function (e) {
                       var deptInap=[16,35,17]
                    var deptId = localStorage.getItem('departemenPengkajian');
                   if(deptInap.includes(parseInt(deptId)) == true){
                     $scope.statusHidden = false 
                  }else{
                      $scope.statusHidden = true 
                  }
                    $scope.listData = e.data
                    $scope.item.title = e.data.title
                    $scope.item.classgrid = e.data.classgrid
              
                    $scope.cc.emrfk = $state.params.namaEMR

                    $scope.item.objcbo = []
                    for (var i = e.data.kolom1.length - 1; i >= 0; i--) {
                        if (e.data.kolom1[i].cbotable != null) {
                            medifirstService.getPart2(e.data.kolom1[i].id, e.data.kolom1[i].cbotable, true, true, 20).then(function (data) {
                                $scope.item.objcbo[data.options.idididid] = data
                                 if(data.options.idididid==5219){
                                    $scope.item.obj[5219] = { value:peagawaiLogin.id,text:peagawaiLogin.namaLengkap}
                                }
                                if(data.options.idididid==5220){
                                    $scope.item.obj[5220] = { value:peagawaiLogin.id,text:peagawaiLogin.namaLengkap}
                                }
                            })

                        }
                        for (var ii = e.data.kolom1[i].child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom1[i].child[ii].cbotable != null) {
                                medifirstService.getPart2(e.data.kolom1[i].child[ii].id, e.data.kolom1[i].child[ii].cbotable, true, true, 20).then(function (data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                        }
                    }
                    for (var i = e.data.kolom2.length - 1; i >= 0; i--) {
                        if (e.data.kolom2[i].cbotable != null) {
                            medifirstService.getPart2(e.data.kolom2[i].id, e.data.kolom2[i].cbotable, true, true, 20).then(function (data) {
                                $scope.item.objcbo[data.options.idididid] = data
                            })
                        }
                        for (var ii = e.data.kolom2[i].child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom2[i].child[ii].cbotable != null) {
                                medifirstService.getPart2(e.data.kolom2[i].child[ii].id, e.data.kolom2[i].child[ii].cbotable, true, true, 20).then(function (data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                        }
                    }
                    for (var i = e.data.kolom3.length - 1; i >= 0; i--) {
                        if (e.data.kolom3[i].cbotable != null) {
                            medifirstService.getPart2(e.data.kolom3[i].id, e.data.kolom3[i].cbotable, true, true, 20).then(function (data) {
                                $scope.item.objcbo[data.options.idididid] = data
                            })
                        }
                        for (var ii = e.data.kolom3[i].child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom3[i].child[ii].cbotable != null) {
                                medifirstService.getPart2(e.data.kolom3[i].child[ii].id, e.data.kolom3[i].child[ii].cbotable, true, true, 20).then(function (data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                        }
                    }
                    for (var i = e.data.kolom4.length - 1; i >= 0; i--) {
                        if (e.data.kolom4[i].cbotable != null) {
                            medifirstService.getPart2(e.data.kolom4[i].id, e.data.kolom4[i].cbotable, true, true, 20).then(function (data) {
                                $scope.item.objcbo[data.options.idididid] = data

                            })
                        }
                        for (var ii = e.data.kolom4[i].child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom4[i].child[ii].cbotable != null) {
                                medifirstService.getPart2(e.data.kolom4[i].child[ii].id, e.data.kolom4[i].child[ii].cbotable, true, true, 20).then(function (data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                        }
                    }
                    var cacheVital = cacheHelper.get('cacheVitalSign')
                    if (cacheVital != undefined) {
                        if (cacheVital.length > 0) {
                            $scope.item.obj = []
                            // debugger
                            for (var i = 0; i <= cacheVital.length - 1; i++) {
                                if (parseFloat($scope.cc.emrfk) != cacheVital[i].emrfk) {
                                    if (cacheVital[i].type == "textbox") {
                                        $scope.item.obj[cacheVital[i].kodeex] = cacheVital[i].value
                                    }
                                    if (cacheVital[i].type == "checkbox") {
                                        chekedd = false
                                        if (cacheVital[i].value == '1') {
                                            chekedd = true
                                        }
                                        $scope.item.obj[cacheVital[i].kodeex] = chekedd
                                    }

                                    if (cacheVital[i].type == "datetime") {
                                        $scope.item.obj[cacheVital[i].kodeex] = new Date(cacheVital[i].value)
                                    }
                                    if (cacheVital[i].type == "time") {
                                        $scope.item.obj[cacheVital[i].kodeex] = new Date(cacheVital[i].value)
                                    }
                                    if (cacheVital[i].type == "date") {
                                        $scope.item.obj[cacheVital[i].kodeex] = new Date(cacheVital[i].value)
                                    }

                                    if (cacheVital[i].type == "checkboxtextbox") {
                                        $scope.item.obj[cacheVital[i].kodeex] = cacheVital[i].value
                                        $scope.item.obj2[cacheVital[i].kodeex] = true
                                    }
                                    if (cacheVital[i].type == "textarea") {
                                        $scope.item.obj[cacheVital[i].kodeex] = cacheVital[i].value
                                    }
                                    if (cacheVital[i].type == "combobox") {
                                        var str = cacheVital[i].value
                                        var res = str.split("~");
                                        // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
                                        $scope.item.obj[cacheVital[i].kodeex] = { value: res[0], text: res[1] }

                                    }
                                }

                            }
                        }

                    }
                   
                    medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + nomorEMR + "&emrfk=" + $scope.cc.emrfk, true).then(function (dat) {
                        $scope.item.obj = []
                        $scope.item.obj2 = []
                        dataLoad = dat.data.data
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
                                }

                                if (dataLoad[i].type == "datetime") {
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
                                if (dataLoad[i].type == "textarea") {
                                    $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                                }
                                if (dataLoad[i].type == "combobox") {
                                    var str = dataLoad[i].value
                                    var res = str.split("~");
                                    // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
                                    $scope.item.obj[dataLoad[i].emrdfk] = { value: res[0], text: res[1] }

                                }
                            }

                        }
                    })


                    // for (var i = 0; i < dat.data.data.length - 1; i++) {
                    //     switch(dat.data.data[i].type) {
                    //       case "textbox":
                    //         this.item.obj[dat.data.data[i].emrdfk] = dat.data.data[i].value
                    //         // $scope.item.obj[dat.data.data[i].emrdfk] = dat.data.data[i].value
                    //         // break;

                    //         // break;
                    //       default:
                    //         // code block
                    //     }
                    // }
                    // })


                });
            }
            // medifirstService.get('emr/get-pegawai-parts?id=' + medifirstService.getPegawaiLogin().id).then(function (e) {
            //         $scope.listPenulisResep.add(e.data[0])
            //         // $scope.item.penulisResep = e.data[0]// { id: medifirstService.getPegawaiLogin().id, namalengkap: medifirstService.getPegawaiLogin().namaLengkap };
            //     })
            // medifirstService.getPart('emr/get-pegawai-parts', true, 10).then(function (e) {
            //     $scope.listPenulisResep = e
            //     // $scope.item.penulisResep = { id: medifirstService.getPegawaiLogin().id, namalengkap: medifirstService.getPegawaiLogin().namaLengkap };
            // })



            // 0: $scope.header.nocm,
            // 1: $scope.header.namapasien,
            // 2: $scope.header.jeniskelamin,
            // 3: $scope.header.noregistrasi,
            // 4: $scope.header.umur,
            // 5: $scope.header.kelompokpasien,
            // 6: $scope.header.tglregistrasi,
            // 7: $scope.header.norec,
            // 8: $scope.header.norec_pd,
            // 9: $scope.header.objectkelasfk,
            // 10: $scope.header.namakelas,
            // 11: $scope.header.objectruanganfk,
            // 12: $scope.header.namaruangan,
            // 13: $scope.header.DataNoregis

            // var chacePeriode = cacheHelper.get('cacheRekamMedis');
            // if(chacePeriode != undefined){
            //     $scope.cc.nocm = chacePeriode[0]
            //     $scope.cc.namapasien = chacePeriode[1]
            //     $scope.cc.jeniskelamin = chacePeriode[2]
            //     $scope.cc.noregistrasi = chacePeriode[3]
            //     $scope.cc.umur = chacePeriode[4]
            //     $scope.cc.kelompokpasien = chacePeriode[5]
            //     $scope.cc.tglregistrasi = chacePeriode[6]
            //     $scope.cc.norec = chacePeriode[7]
            //     $scope.cc.norec_pd = chacePeriode[8]
            //     $scope.cc.objectkelasfk = chacePeriode[9]
            //     $scope.cc.namakelas =chacePeriode[10]
            //     $scope.cc.objectruanganfk =chacePeriode[11]
            //     $scope.cc.namaruangan =chacePeriode[12]  
            //     $scope.cc.DataNoregis =chacePeriode[12]  
            //     if (nomorEMR == '') {
            //         $scope.cc.norec_emr = ''
            //     }else{
            //         $scope.cc.norec_emr = nomorEMR       
            //     }
            // }


            $scope.txt_change = function (index) {
                $scope.item.txt[index] = "asdasdad"
            };
            $scope.kembali = function () {
                $rootScope.showRiwayat()
            }


            $scope.checkClick = function (data) {
                // var index = $scope.currentKelainan.indexOf(data);
                // if (_.filter($scope.currentKelainan, {
                //         id: data.id
                //     }).length === 0)
                //     $scope.currentKelainan.push(data);
                // else {
                //     $scope.currentKelainan.splice(index, 1);
                // }

            }


            $scope.getdata = function () {
                var objectfk = "KLU";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                medifirstService.get("emr/get-data-rekam-medis?noregistrasifk=" + noregistrasifk + '&objectfk=' + objectfk
                    + '&riwayatfk=' + $scope.noRecPap).then(function (e) {
                        $scope.dataEdukasi = e.data.data;
                        if ($scope.dataEdukasi.length != 0) {
                            for (var i = 0; i < $scope.dataEdukasi.length; i++) {
                                if ($scope.dataEdukasi[i].objectfk == "KLU-000001") {
                                    $scope.noRec = $scope.dataEdukasi[i].norec
                                    $scope.item.keluhanUtama = $scope.dataEdukasi[i].nilai
                                }
                            }
                        }
                    })
            }
            // $scope.getdata();

            $scope.Save = function () {
                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if (arrobj[i] != "" && arrobj[i] != "null")
                        arrSave.push({ id: arrobj[i], values: $scope.item.obj[parseInt(arrobj[i])] })
                }
                $scope.cc.jenisemr = 'cppt'
                var jsonSave = {
                    head: $scope.cc,

                    data: arrSave//$scope.item.obj
                }
                medifirstService.post('emr/save-emr-dinamis', jsonSave).then(function (e) {
                    // $state.go("RekamMedis.OrderJadwalBedah.ProsedurKeselamatan", {
                    //     namaEMR : $scope.cc.emrfk,
                    //     nomorEMR : e.data.data.noemr 
                    // });
                    $rootScope.loadRiwayat()

                    var arrStr = {
                        0: e.data.data.noemr
                    }
                    cacheHelper.set('cacheNomorEMR', arrStr);
                });
            }

        }
    ]);
});