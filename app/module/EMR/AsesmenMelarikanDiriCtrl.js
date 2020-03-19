define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AsesmenMelarikanDiriCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
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
            $scope.cc.emrfk = 125
            var dataLoad = []
          
            $scope.listDatas = [
                {
                    "id": 1, "nama": "Riwayat Melarikan Diri",
                    "detail": [
                        { "id": 3095, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3096, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3097, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 2, "nama": "Riwayat Penolakan Pengobatan/ ketidakpatuhan ",
                    "detail": [
                        { "id": 3098, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3099, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3100, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 3, "nama": "Usia <= 35 tahun",
                    "detail": [
                        { "id": 3101, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3102, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3103, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 4, "nama": "Laki-laki",
                    "detail": [
                        { "id": 3104, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3105, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3106, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 5, "nama": "Diagnosis Skizofrenia",
                    "detail": [
                        { "id": 3107, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3108, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3109, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 6, "nama": "Belum menikah",
                    "detail": [
                        { "id": 3110, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3111, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3112, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 7, "nama": "Riwayat penggunaan NAPZA",
                    "detail": [
                        { "id": 3113, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3114, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3115, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 8, "nama": "Diagnosis gangguan kepribadian",
                    "detail": [
                        { "id": 3116, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3117, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3118, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 9, "nama": "Riwayat Kriminal",
                    "detail": [
                        { "id": 3119, "nama": "a. Ya (1)", "descNilai": "1" },
                        { "id": 3120, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3121, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                }
            ]
            $scope.listData2 = [
                {
                    "id": 1, "nama": "Anti treatment/ insight jelek",
                    "detail": [
                        { "id": 3122, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3123, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3124, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 2, "nama": "Penggunaan NAPZA",
                    "detail": [
                        { "id": 3125, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3126, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3127, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 3, "nama": "Kebosanan",
                    "detail": [
                        { "id": 3128, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3129, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3130, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 4, "nama": "Perintah halusinasi untuk melarikan diri",
                    "detail": [
                        { "id": 3131, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3132, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3133, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 5, "nama": "Berkurangnya/ kehilangan kontrol diri (dimensia)",
                    "detail": [
                        { "id": 3134, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3135, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3136, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 6, "nama": "Perilaku seksual yang tidak wajar",
                    "detail": [
                        { "id": 3137, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3138, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3139, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 7, "nama": "Kemarahan frustasi",
                    "detail": [
                        { "id": 3140, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3141, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3142, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 8, "nama": "Ketakutan perawatan (pasien, Nakes, Pengobatan)",
                    "detail": [
                        { "id": 3143, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3144, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3145, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },
                {
                    "id": 9, "nama": "Penggunaan NAPZA",
                    "detail": [
                        { "id": 3146, "nama": "a. Ya (2)", "descNilai": "2" },
                        { "id": 3147, "nama": "b. Tidak (0)", "descNilai": "0" },
                        { "id": 3148, "nama": "c. Tidak Tahu", "descNilai": "0" },

                    ]
                },

            ]
            $scope.listHasil = [
                { "id": 3149, "nama": "Rendah (< 7)", "descNilai": "1" },
                { "id": 3150, "nama": "Sedang (7-14)", "descNilai": "0" },
                { "id": 3151, "nama": "Tinggi (> 14)", "descNilai": "0" },

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
                                if (dataLoad[i].emrdfk >= 3122 && dataLoad[i].emrdfk <=3148) {
                                    var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                                    $scope.getSkor2(datass)
                                }
                                if (dataLoad[i].emrdfk < 3122) {
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
                $scope.item.obj[3152] = $scope.totalSkor + $scope.totalSkor2
                setSkorAkhir($scope.item.obj[3152])
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
                $scope.item.obj[3152] = $scope.totalSkor + $scope.totalSkor2
                setSkorAkhir($scope.item.obj[3152])
            }
            function setSkorAkhir(total) {
             
                    if (total < 7){
                        $scope.item.obj[3149] = true
                        $scope.item.obj[3150] = false
                        $scope.item.obj[3151] = false
                    }
                       
                    if (total >= 7 && total <= 14){
                        $scope.item.obj[3149] = false
                        $scope.item.obj[3150] = true
                        $scope.item.obj[3151] = false
                    }
                   
                    if (total > 14){
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
                    // $state.go("RekamMedis.OrderJadwalBedah.ProsedurKeselamatan", {
                    //     namaEMR : $scope.cc.emrfk,
                    //     nomorEMR : e.data.data.noemr 
                    // });

                    var arrStr = {
                        0: e.data.data.noemr
                    }
                    cacheHelper.set('cacheNomorEMR', arrStr);
                });
            }

        }
    ]);
});