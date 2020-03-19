define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AsesmenBunuhDiriCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {
            // copy from PenilaianResikoJatuhPasienAnakCtrl.js
            var isNotClick = true;
            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 123
            var dataLoad = []
            // $scope.item.obj = []
            // $scope.item.obj[1] = 1
            // $scope.listParameter = [
            //     {
            //         "id": 1, "nama": "Parameter", "detail": [
            //             { "id": 993, "nama": "Mengendalikan Rangsang BAB", "descNilai": "2", "value": "0" },
            //             { "id": 994, "nama": "Mengendalikan Rangsang BAK", "descNilai": "2", "value": "0" },
            //             { "id": 995, "nama": "Membersihkan diri (seka,sisir,sikat gigi)", "descNilai": "1", "value": "0" },
            //             { "id": 996, "nama": "P(g)n WC (in/out, lepas/pakai celana, siram)", "descNilai": "2", "value": "0" },
            //             { "id": 997, "nama": "Makan", "descNilai": "2", "value": "0" },
            //             { "id": 998, "nama": "Transfer", "descNilai": "3", "value": "0" },
            //             { "id": 999, "nama": "Mobilisasi = Ambulasi", "descNilai": "3", "value": "0" },
            //             { "id": 1000, "nama": "Mengenakan pakaian", "descNilai": "2", "value": "0" },
            //             { "id": 1001, "nama": "Naik turun anak tangga", "descNilai": "2", "value": "0" },
            //             { "id": 1002, "nama": "Mandi", "descNilai": "1", "value": "0" },
            //         ]
            //     }
            // ]

            $scope.listDatas = [
                {
                    "id": 1, "nama": "Tinggal Hidup Sendiri",
                    "detail": [
                        { "id": 2994, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 2995, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 2996, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 2, "nama": "Riwayat Upaya serius Suicide",
                    "detail": [
                        { "id": 2997, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 2998, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 2999, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 3, "nama": "Riwayat keluarga suicide",
                    "detail": [
                        { "id": 3000, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3001, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3002, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 4, "nama": "Adanya diagnosis gangguan jiwa",
                    "detail": [
                        { "id": 3003, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3004, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3005, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 5, "nama": "Penyakit/ disabilitas berat",
                    "detail": [
                        { "id": 3006, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3007, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3008, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 6, "nama": "Berpisah/ duda/ cerai",
                    "detail": [
                        { "id": 3009, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3010, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3011, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 7, "nama": "Kehilangan pekerjaan/ pensiun/ tidak punya kerja",
                    "detail": [
                        { "id": 3012, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3013, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3014, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                }
            ]
            $scope.listData2 = [
                {
                    "id": 1, "nama": "Memungkinkan ide bunuh diri",
                    "detail": [
                        { "id": 3015, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3016, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3017, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 2, "nama": "Memungkinkan rencana/ maksud suicide ",
                    "detail": [
                        { "id": 3018, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3019, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3020, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 3, "nama": "Mengungkapkan stress yang berat",
                    "detail": [
                        { "id": 3021, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3022, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3023, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 4, "nama": "Keputusasaan",
                    "detail": [
                        { "id": 3024, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3025, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3026, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 5, "nama": "Peristiwa/ kejadian signifikan akhir-akhir ini",
                    "detail": [
                        { "id": 3027, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3028, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3029, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 6, "nama": "Berkurangnya/ kehilangan untuk kontrol diri",
                    "detail": [
                        { "id": 3030, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3031, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3032, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 7, "nama": "Penggunaan NAPZA",
                    "detail": [
                        { "id": 3033, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3034, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3035, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },

            ]
            $scope.listHasil = [
                { "id": 3037, "nama": "Rendah (< 7)", "descNilai": "1" },
                { "id": 3038, "nama": "Sedang (7-14)", "descNilai": "0" },
                { "id": 3039, "nama": "Tinggi (> 14)", "descNilai": "0" },

            ]
            var chekedd = false
            var chacePeriode = cacheHelper.get('cacheNomorEMR');
            if (chacePeriode != undefined) {
                nomorEMR = chacePeriode[0]
                $scope.cc.norec_emr = nomorEMR
                
                medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + nomorEMR + "&emrfk=" + $scope.cc.emrfk, true).then(function (dat) {
                    $scope.item.obj = []
                    $scope.item.obj2 = []
                    dataLoad = dat.data.data
                    for (var i = 0; i <= dataLoad.length - 1; i++) {
                        if (parseFloat($scope.cc.emrfk) == dataLoad[i].emrfk) {
                            // if(dataLoad[i].type == "textbox") {
                            //     $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                            // }
                            if (dataLoad[i].type == "checkbox") {
                                chekedd = false
                                if (dataLoad[i].value == '1') {
                                    chekedd = true
                                }
                                $scope.item.obj[dataLoad[i].emrdfk] = chekedd
                                if (dataLoad[i].emrdfk >= 3015 && dataLoad[i].emrdfk <= 3035 && chekedd) {
                                    var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                                    $scope.getSkor2(datass)
                                }
                                if (dataLoad[i].emrdfk >= 2994 && dataLoad[i].emrdfk <= 3014 && chekedd) {
                                    var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                                    $scope.getSkor(datass)
                                }


                            }

                            // if(dataLoad[i].type == "datetime") {
                            //     $scope.item.obj[dataLoad[i].emrdfk] = new Date(dataLoad[i].value)
                            // }

                            // if(dataLoad[i].type == "checkboxtextbox") {
                            //     $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                            //     $scope.item.obj2[dataLoad[i].emrdfk] = true
                            // }
                            // if(dataLoad[i].type == "textarea") {
                            //     $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                            // }
                        }

                    }
                })
            }

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



            $scope.listKeterangan = [
                { "id": 1, "nama": "Gizi Baik", "descNilai": "Skor > 24" },
                { "id": 2, "nama": "Berisiko malnutrisi", "descNilai": "Skor 17-23,5" },
                { "id": 3, "nama": "malnutrisi", "descNilai": "Skor < 17" },

            ]
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
                $scope.item.obj[3036] = $scope.totalSkor + $scope.totalSkor2
                setSkorAkhir($scope.item.obj[3036])
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
                $scope.item.obj[3036] = $scope.totalSkor + $scope.totalSkor2
                setSkorAkhir($scope.item.obj[3036])
            }
            function setSkorAkhir(total) {
             
                    if (total < 7){
                        $scope.item.obj[3037] = true
                        $scope.item.obj[3038] = false
                        $scope.item.obj[3039] = false
                    }
                       
                    if (total >= 7 && total <= 14){
                        $scope.item.obj[3038] = true
                        $scope.item.obj[3037] = false
                        $scope.item.obj[3039] = false
                    }
                   
                    if (total > 14){
                        $scope.item.obj[3039] = true
                        $scope.item.obj[3038] = false
                        $scope.item.obj[3037] = false
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
                    'Asesmen Bunuh Diri Awal Pasien Beresiko' + ' dengan No EMR - ' + e.data.data.noemr + ' pada No Registrasi '
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