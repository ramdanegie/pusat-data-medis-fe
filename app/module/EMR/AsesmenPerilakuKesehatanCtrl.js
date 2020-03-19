define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AsesmenPerilakuKesehatanCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
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
            $scope.cc.emrfk = 124
            var dataLoad = []
          
            $scope.listDatas = [
                {
                    "id": 1, "nama": "Insiden kekerasan baru-baru ini",
                    "detail": [
                        { "id": 3037, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3038, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3039, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 2, "nama": "Riwayat penggunaan senjata",
                    "detail": [
                        { "id": 3040, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3041, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3042, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 3, "nama": "Laki-laki",
                    "detail": [
                        { "id": 3043, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3044, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3045, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 4, "nama": "Usia di bawah 35 tahun",
                    "detail": [
                        { "id": 3046, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3047, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3048, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 5, "nama": "Penyakit criminal",
                    "detail": [
                        { "id": 3049, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3050, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3051, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 6, "nama": "Riwayat melakukan tindakan berbahaya atau ide kekerasan...",
                    "detail": [
                        { "id": 3052, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3053, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3054, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 7, "nama": "Riwayat kekerasan masa kanak-kanak",
                    "detail": [
                        { "id": 3055, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3056, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3057, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 8, "nama": "Kurangnya peran dalam hidup (pekerjaan, hubungan)",
                    "detail": [
                        { "id": 3058, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3059, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3060, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 9, "nama": "Riwayat penggunaan NAPZA",
                    "detail": [
                        { "id": 3061, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3062, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3063, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                }
            ]
            $scope.listData2 = [
                {
                    "id": 1, "nama": "Mengekspresikan ide untuk melukai orang lain",
                    "detail": [
                        { "id": 3064, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3065, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3066, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 2, "nama": "Akses untuk melakukan tindakan kekerasan",
                    "detail": [
                        { "id": 3067, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3068, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3069, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 3, "nama": "Ide paranoid atau lainnya",
                    "detail": [
                        { "id": 3070, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3071, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3072, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 4, "nama": "Perintah halusinasi untuk tindakan kekerasan",
                    "detail": [
                        { "id": 3073, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3074, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3075, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 5, "nama": "Kemarahan, frustasi atau agitasi",
                    "detail": [
                        { "id": 3076, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3077, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3078, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 6, "nama": "Kesenangan untuk ide/tindakan kekerasan",
                    "detail": [
                        { "id": 3079, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3080, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3081, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 7, "nama": "Prilaku seksual yang tidak wajar",
                    "detail": [
                        { "id": 3082, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3083, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3084, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 8, "nama": "Berkurang atau hilangnya untuk kontrol diri",
                    "detail": [
                        { "id": 3085, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3086, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3087, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 9, "nama": "Penggunaan NAPZA",
                    "detail": [
                        { "id": 3088, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3089, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3090, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },

            ]
            $scope.listHasil = [
                { "id": 3091, "nama": "Rendah (< 7)", "descNilai": "1" },
                { "id": 3092, "nama": "Sedang (7-14)", "descNilai": "0" },
                { "id": 3093, "nama": "Tinggi (> 14)", "descNilai": "0" },

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
                                if (dataLoad[i].emrdfk >= 3064 && dataLoad[i].emrdfk <=3090) {
                                    var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                                    $scope.getSkor2(datass)
                                }
                                if (dataLoad[i].emrdfk < 3064) {
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
                $scope.item.obj[3094] = $scope.totalSkor + $scope.totalSkor2
                setSkorAkhir($scope.item.obj[3094])
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
                $scope.item.obj[3094] = $scope.totalSkor + $scope.totalSkor2
                setSkorAkhir($scope.item.obj[3094])
            }
            function setSkorAkhir(total) {
             
                    if (total < 7){
                        $scope.item.obj[3091] = true
                        $scope.item.obj[3092] = false
                        $scope.item.obj[3093] = false
                    }
                       
                    if (total >= 7 && total <= 14){
                        $scope.item.obj[3092] = true
                        $scope.item.obj[3091] = false
                        $scope.item.obj[3093] = false
                    }
                   
                    if (total > 14){
                        $scope.item.obj[3093] = true
                        $scope.item.obj[3091] = false
                        $scope.item.obj[3092] = false
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
                    'Asesmen Perilaku Kekerasan Awal Pasien Beresiko' + ' dengan No EMR - ' + e.data.data.noemr + ' pada No Registrasi '
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