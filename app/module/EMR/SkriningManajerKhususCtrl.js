define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('SkriningManajerKhususCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {

            var isNotClick = true;
            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 143
            $scope.now = new Date()
            var dataLoad = []
            var norecEMR = ''
            $scope.isCetak = true
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
                client.get('http://127.0.0.1:1237/printvb/e-rekammedis?cetak-emr-smpp&id=' + $scope.cc.nocm + '&emr=' + norecEMR + '&view=true', function (response) {
                    // do something with response
                });
            }
            $scope.listData1 = [
                {
                    "id": 1, "nama": "Sistem pendukung yang buruk, dinilai dengan : - Riwayat dropping, - LOS yang panjang (3 bln), - Kontrol rawat jalan, - Pengetahuan dan akses keluarga kurang, - Pasung",
                    "detail": [
                        { "id": 10341, "nama": "", "type": "checkbox", skor: 1, kolomskor: 10343 },
                        { "id": 10342, "nama": "", "type": "checkbox", skor: 0, kolomskor: 10343 },
                        { "id": 10343, "nama": "", "type": "textbox" },
                    ]
                },
                {
                    "id": 2, "nama": "Mondok lebih dari 3 kali dalam 1 tahun terakhir",
                    "detail": [
                        { "id": 10313, "nama": "", "type": "checkbox", skor: 1, kolomskor: 10315 },
                        { "id": 10314, "nama": "", "type": "checkbox", skor: 0, kolomskor: 10315 },
                        { "id": 10315, "nama": "", "type": "textbox" },
                    ]
                },
                {
                    "id": 3, "nama": "Ada komorbiditas gangguan fisik yang bermakna (yang membutuhkan penanganan dari spesualis lain, pain management, neuromuscular disease, PPOK, diabetes,kardiovaskuler",
                    "detail": [
                        { "id": 10316, "nama": "", "type": "checkbox", skor: 1, kolomskor: 10318 },
                        { "id": 10317, "nama": "", "type": "checkbox", skor: 0, kolomskor: 10318 },
                        { "id": 10318, "nama": "", "type": "textbox" },
                    ]
                },
                {
                    "id": 4, "nama": "Riwayat perobaan bunuh diri",
                    "detail": [
                        { "id": 10319, "nama": "", "type": "checkbox", skor: 1, kolomskor: 10321 },
                        { "id": 10320, "nama": "", "type": "checkbox", skor: 0, kolomskor: 10321 },
                        { "id": 10321, "nama": "", "type": "textbox" },
                    ]
                },
                {
                    "id": 5, "nama": "Pembiayaan beresiko membengkak : - Dilihat dari gejala klinisnya, gejala negatif menonjol, - Bisa dinilai lagi dari awal perawatan ruang rawat inap, - Terapi multi modalitas",
                    "detail": [
                        { "id": 10322, "nama": "", "type": "checkbox", skor: 1, kolomskor: 10324 },
                        { "id": 10323, "nama": "", "type": "checkbox", skor: 0, kolomskor: 10324 },
                        { "id": 10324, "nama": "", "type": "textbox" },
                    ]
                },
                {
                    "id": 6, "nama": "Pasien mengalami disablititas/handicap fisik Misal tuna netra, tuna rungu , tuna daksa",
                    "detail": [
                        { "id": 10325, "nama": "", "type": "checkbox", skor: 1, kolomskor: 10327 },
                        { "id": 10326, "nama": "", "type": "checkbox", skor: 0, kolomskor: 10327 },
                        { "id": 10327, "nama": "", "type": "textbox" },
                    ]
                },
                {
                    "id": 7, "nama": "Memiliki keterlibatan dengan hukum, termasuk rehabilitasi NAPZA, penggunakan diluar kasus visum",
                    "detail": [
                        { "id": 10328, "nama": "", "type": "checkbox", skor: 1, kolomskor: 10330 },
                        { "id": 10329, "nama": "", "type": "checkbox", skor: 0, kolomskor: 10330 },
                        { "id": 10330, "nama": "", "type": "textbox" },
                    ]
                },
                {
                    "id": 8, "nama": "Mengalami infeksi nosokomial (bisa ditengah perawatan)",
                    "detail": [
                        { "id": 10331, "nama": "", "type": "checkbox", skor: 1, kolomskor: 10333 },
                        { "id": 10332, "nama": "", "type": "checkbox", skor: 0, kolomskor: 10333 },
                        { "id": 10333, "nama": "", "type": "textbox" },
                    ]
                },
                {
                    "id": 9, "nama": "Mengalami efek samping obat ( bisa ditengah perawatan)",
                    "detail": [
                        { "id": 10334, "nama": "", "type": "checkbox", skor: 1, kolomskor: 10336 },
                        { "id": 10335, "nama": "", "type": "checkbox", skor: 0, kolomskor: 10336 },
                        { "id": 10336, "nama": "", "type": "textbox" },
                    ]
                },
                {
                    "id": 10, "nama": "Riwayat melarikan diri",
                    "detail": [
                        { "id": 10337, "nama": "", "type": "checkbox", skor: 1, kolomskor: 10339 },
                        { "id": 10338, "nama": "", "type": "checkbox", skor: 0, kolomskor: 10339 },
                        { "id": 10339, "nama": "", "type": "textbox" },
                    ]
                },
            ]
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
            })



            var chekedd = false
            var chacePeriode = cacheHelper.get('cacheNomorEMR');
            if (chacePeriode != undefined) {
                nomorEMR = chacePeriode[0]
                $scope.cc.norec_emr = nomorEMR

                // // SET RECALL CTRS
                // if (nomorEMR != '-') {
                //     cacheHelper.set('cacheEMR_CTRS', nomorEMR)
                // }
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

                                if (dataLoad[i].reportdisplay != null) {
                                    var datass = { id: dataLoad[i].emrdfk, skor: dataLoad[i].reportdisplay,kolomskor:dataLoad[i].kodeexternal }
                                    $scope.getSkor(datass)
                                }


                            }

                            if (dataLoad[i].type == "datetime") {
                                $scope.item.obj[dataLoad[i].emrdfk] = new Date(dataLoad[i].value)
                            }

                            if (dataLoad[i].type == "combobox") {
                                var str = dataLoad[i].value
                                var res = str.split("~");
                                // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
                                $scope.item.obj[dataLoad[i].emrdfk] = { value: res[0], text: res[1] }

                            }
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




            $scope.getSkor = function (stat) {

                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if (arrobj[i] == stat.id) {
                        if ($scope.item.obj[parseFloat(arrobj[i])] == true) {
                            $scope.item.obj[stat.kolomskor] = parseFloat(stat.skor)
                            $scope.totalSkor = $scope.totalSkor + parseFloat(stat.skor)
                            break
                        } else {
                            $scope.item.obj[stat.kolomskor] = parseFloat(stat.skor)- parseFloat(stat.skor)
                            $scope.totalSkor = $scope.totalSkor - parseFloat(stat.skor)
                            break
                        }

                    }
                }
                // ?ID DITABLE NYA
                // $scope.item.obj[stat.kolomskor] = $scope.totalSkor //+ $scope.totalSkor2
                $scope.item.obj[10340] = $scope.totalSkor //+ $scope.totalSkor2
            }


            $scope.kembali = function () {
                $rootScope.showRiwayat()
            }

            $scope.Save = function () {

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
                    // $state.go("RekamMedis.OrderJadwalBedah.ProsedurKeselamatan", {
                    //     namaEMR : $scope.cc.emrfk,
                    //     nomorEMR : e.data.data.noemr 
                    // });
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,  
                    'Skrining pasien yang memerlukan manajer kasus ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
                    + $scope.cc.noregistrasi).then(function (res) {
                    })

                    var arrStr = {
                        0: e.data.data.noemr
                    }
                    cacheHelper.set('cacheNomorEMR', arrStr);
                });
            }

        }
    ]);
});