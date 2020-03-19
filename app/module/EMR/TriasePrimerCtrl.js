define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('TriasePrimerCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 160
            var dataLoad = []
            $scope.item.objcbo= []
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
            })
            $scope.listCaraMasuk = [
                {
                    "id": 1, "nama": "Cara Masuk",
                    "detail": [
                        { "id": 9000, "nama": "Datang Sendiri", "type": "checkbox" },
                        { "id": 9001, "nama": "Dirujuk Oleh :", "type": "checkbox" },
                        { "id": 9002, "nama": "", "type": "textbox" },
                    ]
                },
                {
                    "id": 2, "nama": "Menghubungi IGD",
                    "detail": [
                        { "id": 9003, "nama": "Tidak ", "type": "checkbox" },
                        { "id": 9004, "nama": "Ya, Tgl /Jam :", "type": "checkbox" },
                        { "id": 9005, "nama": "", "type": "textbox" },

                    ]
                },
                {
                    "id": 3, "nama": "Dibawa Ke IGD menggunakan",
                    "detail": [
                        { "id": 9006, "nama": "Kendaraan Pribadi", "type": "checkbox" },
                        { "id": 9007, "nama": "Mobil Polisi", "type": "checkbox" },
                        { "id": 9008, "nama": "Ambulance", "type": "checkbox" },
                        { "id": 9009, "nama": "Lain-lain :", "type": "checkbox" },
                        { "id": 9010, "nama": "", "type": "textbox" },
                    ]
                },
                {
                    "id": 4, "nama": "Kecelakaan",
                    "detail": [
                        { "id": 9011, "nama": "Tidak", "type": "checkbox" },
                        { "id": 9012, "nama": "Ya, tgl/jam :", "type": "checkbox" },
                        { "id": 9013, "nama": "", "type": "textbox" },

                    ]
                },
                {
                    "id": 4, "nama": "TKP :",
                    "detail": [

                        { "id": 9014, "nama": "", "type": "textbox" },

                    ]
                },

            ]

            $scope.listUmur = [
                { id: 9030, nama: '< 3 bl' },
                { id: 9031, nama: '> 180' },
                { id: 9032, nama: '> 50' },
                { id: 9033, nama: '38C' },
                // { id: 9034, nama: '> 92%' }
            ]
            $scope.listData2 = [
                { id: 9035, nama: '3 bl - 3th' },
                { id: 9036, nama: '> 160' },
                { id: 9037, nama: '> 40' },

            ]
            $scope.listData3 = [
                { id: 9038, nama: '3 - 8th' },
                { id: 9039, nama: '> 140' },
                { id: 9040, nama: '> 30' },

            ]
            $scope.listData4 = [
                { id: 9041, nama: '> 8 th' },
                { id: 9042, nama: '> 100' },
                { id: 9043, nama: '> 20' },

            ]
            $scope.listStabil = [
                { id: 9045, nama: 'Jalan Nafas Bebas' },
                { id: 9046, nama: 'Pernafasan Spontan' },
                { id: 9047, nama: 'Nadi Adekuat' },
                { id: 9048, nama: 'Pasien Sadar Penuh' },
            ]
            $scope.listKeptusan = [
                { "id": 9057, "nama": "R. Resusitasi", "type": "checkbox" },
                { "id": 9058, "nama": "R. Non Resusitasi", "type": "checkbox" },
                { "id": 9059, "nama": "Poliklinik", "type": "checkbox" },
                { "id": 9060, "nama": "Lain-lain", "type": "checkbox" },
                { "id": 9061, "nama": "", "type": "textbox" },
            ]

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
                if (nomorEMR == '-') {
                    $scope.cc.norec_emr = '-'
                } else {
                    $scope.cc.norec_emr = nomorEMR
                }
            }
            var chekedd = false
           if(nomorEMR!='-'){
               cacheHelper.set('cacheEMR_TRIASE_PRIMER', nomorEMR)
           }
            medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + nomorEMR + "&emrfk=" + $scope.cc.emrfk, true).then(function (dat) {
                $scope.item.obj = []
                $scope.item.obj2 = []
                $scope.item.obj[9016]=$scope.now
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
                            if (dataLoad[i].emrdfk >= 5046 && dataLoad[i].emrdfk <= 5051 && chekedd) {
                                $scope.getSkalaNyeri(1, { descNilai: dataLoad[i].reportdisplay })
                            }
                            if (dataLoad[i].emrdfk >= 5053 && dataLoad[i].emrdfk <= 5084 && dataLoad[i].reportdisplay != null) {
                                var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                                $scope.getSkor2(datass)
                            }
                            if (dataLoad[i].emrdfk >= 5085 && dataLoad[i].emrdfk <= 5093 && dataLoad[i].reportdisplay != null) {
                                var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                                $scope.getSkorNutrisi(datass)
                            }


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
            $scope.$watch('item.obj[5041]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai == 0) {
                    $scope.item.obj[5042] = true
                    $scope.item.obj[5043] = false
                    $scope.item.obj[5044] = false
                    $scope.item.obj[5045] = false
                }
                if (nilai >= 1 && nilai <= 3) {
                    $scope.item.obj[5042] = false
                    $scope.item.obj[5043] = true
                    $scope.item.obj[5044] = false
                    $scope.item.obj[5045] = false
                }
                if (nilai >= 4 && nilai <= 6) {
                    $scope.item.obj[5042] = false
                    $scope.item.obj[5043] = false
                    $scope.item.obj[5044] = true
                    $scope.item.obj[5045] = false
                }
                if (nilai >= 7 && nilai <= 10) {
                    $scope.item.obj[5042] = false
                    $scope.item.obj[5043] = false
                    $scope.item.obj[5044] = false
                    $scope.item.obj[5045] = true
                }
            });

            $scope.getSkalaNyeri = function (data, stat) {
                $scope.activeStatus = stat.descNilai
                var nilai = stat.descNilai
                if (nilai >= 0 && nilai <= 1) {
                    $scope.item.obj[5046] = true
                    $scope.item.obj[5047] = false
                    $scope.item.obj[5048] = false
                    $scope.item.obj[5049] = false
                    $scope.item.obj[5050] = false
                    $scope.item.obj[5051] = false
                }
                if (nilai >= 2 && nilai <= 3) {
                    $scope.item.obj[5046] = false
                    $scope.item.obj[5047] = true
                    $scope.item.obj[5048] = false
                    $scope.item.obj[5049] = false
                    $scope.item.obj[5050] = false
                    $scope.item.obj[5051] = false
                }
                if (nilai >= 4 && nilai <= 5) {
                    $scope.item.obj[5046] = false
                    $scope.item.obj[5047] = false
                    $scope.item.obj[5048] = true
                    $scope.item.obj[5049] = false
                    $scope.item.obj[5050] = false
                    $scope.item.obj[5051] = false
                }
                if (nilai >= 6 && nilai <= 7) {
                    $scope.item.obj[5046] = false
                    $scope.item.obj[5047] = false
                    $scope.item.obj[5048] = false
                    $scope.item.obj[5049] = true
                    $scope.item.obj[5050] = false
                    $scope.item.obj[5051] = false
                }
                if (nilai >= 8 && nilai <= 9) {
                    $scope.item.obj[5046] = false
                    $scope.item.obj[5047] = false
                    $scope.item.obj[5048] = false
                    $scope.item.obj[5049] = false
                    $scope.item.obj[5050] = true
                    $scope.item.obj[5051] = false
                }

                if (nilai == 10) {
                    $scope.item.obj[5046] = false
                    $scope.item.obj[5047] = false
                    $scope.item.obj[5048] = false
                    $scope.item.obj[5049] = false
                    $scope.item.obj[5050] = false
                    $scope.item.obj[5051] = true
                }

            }
            $scope.getSkor = function (stat) {

                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if (arrobj[i] == stat.id) {
                        if ($scope.item.obj[parseFloat(arrobj[i])] == true) {
                            $scope.totalSkor = $scope.totalSkor + parseFloat(stat.descNilai)
                            break
                        } else {
                            $scope.totalSkor = $scope.totalSkor - parseFloat(stat.descNilai)
                            break
                        }


                    } else {

                    }
                }
                $scope.item.obj[3152] = $scope.totalSkor + $scope.totalSkor2
                setSkorAkhir($scope.item.obj[3152])
            }
            $scope.totalSkorAses = 0
            $scope.getSkorAsesmen = function (stat, skor) {
                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if (arrobj[i] == stat.id) {
                        if ($scope.item.obj[parseFloat(arrobj[i])] == true) {
                            $scope.totalSkorAses = $scope.totalSkorAses + parseFloat(skor.descNilai)
                            break
                        } else {
                            $scope.totalSkorAses = $scope.totalSkorAses - parseFloat(skor.descNilai)
                            break
                        }
                    } else {

                    }
                }
                $scope.item.obj[5194] = $scope.totalSkorAses
            }
            $scope.getSkor2 = function (stat) {

                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if (arrobj[i] == stat.id) {
                        if ($scope.item.obj[parseFloat(arrobj[i])] == true) {
                            $scope.totalSkor2 = $scope.totalSkor2 + parseFloat(stat.descNilai)
                            break
                        } else {
                            $scope.totalSkor2 = $scope.totalSkor2 - parseFloat(stat.descNilai)
                            break
                        }


                    } else {

                    }
                }
                $scope.item.obj[5084] = $scope.totalSkor + $scope.totalSkor2
                // setSkorAkhir($scope.item.obj[3152])
            }
            $scope.skorNutrisi = 0
            $scope.getSkorNutrisi = function (stat) {
                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if (arrobj[i] == stat.id) {
                        if ($scope.item.obj[parseFloat(arrobj[i])] == true) {
                            $scope.skorNutrisi = $scope.skorNutrisi + parseFloat(stat.descNilai)
                            break
                        } else {
                            $scope.skorNutrisi = $scope.skorNutrisi - parseFloat(stat.descNilai)
                            break
                        }
                    } else {
                    }
                }
                $scope.item.obj[5094] = $scope.skorNutrisi
            }

            function setSkorAkhir(total) {

                if (total < 7) {
                    $scope.item.obj[3149] = true
                    $scope.item.obj[3150] = false
                    $scope.item.obj[3151] = false
                }

                if (total >= 7 && total <= 14) {
                    $scope.item.obj[3149] = false
                    $scope.item.obj[3150] = true
                    $scope.item.obj[3151] = false
                }

                if (total > 14) {
                    $scope.item.obj[3149] = false
                    $scope.item.obj[3150] = false
                    $scope.item.obj[3151] = true
                }



            }
            $scope.kembali = function () {
                $rootScope.showRiwayat()
            }

            $scope.Save = function () {

                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    arrSave.push({ id: arrobj[i], values: $scope.item.obj[parseInt(arrobj[i])] })
                }
                $scope.cc.jenisemr = 'asesmen'
                var jsonSave = {
                    head: $scope.cc,
                    data: arrSave
                }
                medifirstService.post('emr/save-emr-dinamis', jsonSave).then(function (e) {
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,  
                    'Triase Primer ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
                    + $scope.cc.noregistrasi).then(function (res) {
                    })
                  
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,  
                    'Triase Primer' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
                     + $scope.cc.noregistrasi).then(function (res) {
                     })
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