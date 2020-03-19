define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('GeriatriMNACtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {
            // copy from PenilaianResikoJatuhPasienAnakCtrl.js
            var isNotClick = true;
            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 50
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
            $scope.kembali = function () {
                $rootScope.showRiwayat()
            }
            $scope.listUmur = [
                {
                    "id": 1, "nama": "Indexs masa tubuh : BB/TB (m2)",
                    "detail": [
                        { "id": 1110, "nama": "a. < 19 = 0", "descNilai": "0" },
                        { "id": 1111, "nama": "b. 19 21 = 1", "descNilai": "1" },
                        { "id": 1112, "nama": "c. 21 23", "descNilai": "2" },
                        { "id": 1113, "nama": "d. > 23", "descNilai": "3" }
                    ]
                },
                {
                    "id": 2, "nama": "Lingkar lengan atas (cm)",
                    "detail": [
                        { "id": 1114, "nama": "a. < 21 = 0", "descNilai": "0" },
                        { "id": 1115, "nama": "b. 21-22 = 0.5", "descNilai": "0.5" },
                        { "id": 1116, "nama": "c. > 22", "descNilai": "1" },

                    ]
                },
                {
                    "id": 3, "nama": "Lingkar betis (cm)",
                    "detail": [
                        { "id": 1117, "nama": "a. = 31 = 0 ", "descNilai": "0" },
                        { "id": 1118, "nama": "b. > 31 = 1", "descNilai": "1" },
                    ]
                },
                {
                    "id": 4, "nama": "BB Selama tiga bulan terakhir",
                    "detail": [
                        { "id": 1119, "nama": "a. Kehilangan > 3kg = 0", "descNilai": "0" },
                        { "id": 1120, "nama": "b. Tidak tahu = 1", "descNilai": "1" },
                        { "id": 1121, "nama": "c. Kehilangan antara 1-3 kg", "descNilai": "2" },
                        { "id": 1122, "nama": "d. Tidak kehilangan BB", "descNilai": "3" }
                    ]
                },
                {
                    "id": 5, "nama": "Hidup Tidak tergantung (tidak ditempat perawatan atau RS)",
                    "detail": [
                        { "id": 1123, "nama": "Tidak = 1", "descNilai": "1" },
                        { "id": 1124, "nama": "Ya = 0", "descNilai": "0" },

                    ]
                },
                {
                    "id": 6, "nama": "Menggunakan lebih dari 3 obat perhari",
                    "detail": [
                        { "id": 1125, "nama": "Tidak = 1", "descNilai": "1" },
                        { "id": 1126, "nama": "Ya = 0", "descNilai": "0" },

                    ]
                }, ,
                {
                    "id": 7, "nama": "Mengalami stres psikologis atau penyakit akut dalam 3 bulan terakhir",
                    "detail": [
                        { "id": 1127, "nama": "Tidak = 1", "descNilai": "1" },
                        { "id": 1128, "nama": "Ya = 0", "descNilai": "0" },

                    ]
                },
                {
                    "id": 8, "nama": "Mobilitas",
                    "detail": [
                        { "id": 1129, "nama": "a. Hanya terbaring atau di atas kursi roda = 0", "descNilai": "0" },
                        { "id": 1130, "nama": "b. Dapat bangkit dari tempat tidur tapi tidak keluar rumah = 1", "descNilai": "1" },
                        { "id": 1131, "nama": "a. Dapat pergi keluar rumah  = 2", "descNilai": "2" },
                    ]
                },
                ////////////////////////
                {
                    "id": 9, "nama": "Masalah Neuropsikologis",
                    "detail": [
                        { "id": 1132, "nama": "a. Demensia berat dan depreso = 0", "descNilai": "0" },
                        { "id": 1133, "nama": "b. Demensia ringan = 1", "descNilai": "1" },
                        { "id": 1134, "nama": "a. Tidak ada masalah psikologis  = 2", "descNilai": "2" },
                    ]
                },

                {
                    "id": 10, "nama": "Nyeri tekan atau luka kulit",
                    "detail": [
                        { "id": 1135, "nama": "Tidak = 1", "descNilai": "1" },
                        { "id": 1136, "nama": "Ya = 0", "descNilai": "0" },
                    ]
                },
                {
                    "id": 11, "nama": "Berapa banyak daging yang dikonsumsi setiap hari ?",
                    "detail": [
                        { "id": 1137, "nama": "a. 1 x makan = 0", "descNilai": "0" },
                        { "id": 1138, "nama": "b. 2 x makan = 1", "descNilai": "1" },
                        { "id": 1139, "nama": "a. 3 x makan  = 2", "descNilai": "2" },
                    ]
                },
                {
                    "id": 12.1, "nama": "Asupan Proteion terpilih Minimal 1x penyajian produk-produk susu olahan (susu, kejju, yoghurt, es krim) perhari",
                    "detail": [
                        { "id": 1140, "nama": "Ya = 1", "descNilai": "1" },
                        { "id": 1141, "nama": "Tidak = 0", "descNilai": "0" },
                    ]
                },
                {
                    "id": 12.2, "nama": "Dua atau lebih penyajian produk kacang-kacangan (tahu, tempe, susu kedelai) dan telur perminggu",
                    "detail": [
                        { "id": 1142, "nama": "Ya = 1", "descNilai": "1" },
                        { "id": 1143, "nama": "Tidak = 0", "descNilai": "0" },
                    ]
                },
                {
                    "id": 12.3, "nama": "Daging, ikan , unggas tiap hari",
                    "detail": [
                        { "id": 1144, "nama": "Ya = 1", "descNilai": "1" },
                        { "id": 1145, "nama": "Tidak = 0", "descNilai": "0" },
                    ]
                },
                {
                    "id": 13, "nama": "Konsumsi 2 atau lebih penyajian sayur atau buah-buahan perhari",
                    "detail": [
                        { "id": 1146, "nama": "Ya = 1", "descNilai": "1" },
                        { "id": 1147, "nama": "Tidak = 0", "descNilai": "0" },
                    ]
                },
                {
                    "id": 14, "nama": "Bagaimana asupan makanan 3 bulan terakhir?",
                    "detail": [
                        { "id": 1148, "nama": "a. Kehilangan nafsu makan berat = 0", "descNilai": "0" },
                        { "id": 1149, "nama": "b. Kehilangan nafsu makan sedang = 1", "descNilai": "1" },
                        { "id": 1150, "nama": "a. Tidak kehilangan nafsu makan  = 2", "descNilai": "2" },
                    ]
                },
                {
                    "id": 15, "nama": "Berapa banyak cair (jus, kopi, teh, susu) yang dikonsumsi perhari ?",
                    "detail": [
                        { "id": 1151, "nama": "< 3 cangkir = 0", "descNilai": "0" },
                        { "id": 1152, "nama": "3 -5 cangkir = 0.5", "descNilai": "0.5" },
                        { "id": 1153, "nama": "> 5 = 1", "descNilai": "1" },
                    ]
                },
                {
                    "id": 16, "nama": "Pola Makan",
                    "detail": [
                        { "id": 1154, "nama": "a. Tidak dapat makan tanpa bantuan = 0", "descNilai": "0" },
                        { "id": 1155, "nama": "b. Dapat makan sendiri dengan sedikit bantuan = 1", "descNilai": "1" },
                        { "id": 1156, "nama": "a. Dapat makan sendiri dengan masalah  = 2", "descNilai": "2" },
                    ]
                },
                {
                    "id": 17, "nama": "Apakah mereka tahu bahwa mereka memiliki masalah gizi ?",
                    "detail": [
                        { "id": 1157, "nama": "a. Malnutrisi = 0", "descNilai": "0" },
                        { "id": 1158, "nama": "b. Tidak tahu atau malnutrisi sedang = 1", "descNilai": "1" },
                        { "id": 1159, "nama": "a. Tidak ada masalah gizi  = 2", "descNilai": "2" },
                    ]
                },
                {
                    "id": 18, "nama": "Dibandingkan dengan orang lain dengan usia yang sama, bagaimana mereka menilai kesehatan mereka sekarang ?",
                    "detail": [
                        { "id": 1160, "nama": "Tidak baik = 0", "descNilai": "0" },
                        { "id": 1161, "nama": "Tidah tahu = 0.5", "descNilai": "0.5" },
                        { "id": 1162, "nama": "Baik  = 1", "descNilai": "1" },
                        { "id": 1163, "nama": "Lebih Baik  = 2", "descNilai": "2" },
                    ]
                },
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
                                var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                                $scope.getSkor(datass)
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
                // if (data) {
                //     $scope.totalSkor = $scope.totalSkor + parseInt(stat.descNilai)
                // } else {
                //     $scope.totalSkor = $scope.totalSkor - parseInt(stat.descNilai)
                // }
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
            }


            $scope.Save = function () {

                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    arrSave.push({ id: arrobj[i], values: $scope.item.obj[parseInt(arrobj[i])] })
                }
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