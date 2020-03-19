define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('GeriatriMMSECtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {
            // copy from PenilaianResikoJatuhPasienAnakCtrl.js
            var isNotClick = true;
            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 49
            var dataLoad = []
            $scope.kembali = function () {
                $rootScope.showRiwayat()
            }
            $scope.listParameter = [
                {
                    "id": 1, "nama": "Parameter", "detail": [
                        { "id": 993, "nama": "Mengendalikan Rangsang BAB", "descNilai": "2", "value": "0" },
                        { "id": 994, "nama": "Mengendalikan Rangsang BAK", "descNilai": "2", "value": "0" },
                        { "id": 995, "nama": "Membersihkan diri (seka,sisir,sikat gigi)", "descNilai": "1", "value": "0" },
                        { "id": 996, "nama": "P(g)n WC (in/out, lepas/pakai celana, siram)", "descNilai": "2", "value": "0" },
                        { "id": 997, "nama": "Makan", "descNilai": "2", "value": "0" },
                        { "id": 998, "nama": "Transfer", "descNilai": "3", "value": "0" },
                        { "id": 999, "nama": "Mobilisasi = Ambulasi", "descNilai": "3", "value": "0" },
                        { "id": 1000, "nama": "Mengenakan pakaian", "descNilai": "2", "value": "0" },
                        { "id": 1001, "nama": "Naik turun anak tangga", "descNilai": "2", "value": "0" },
                        { "id": 1002, "nama": "Mandi", "descNilai": "1", "value": "0" },
                    ]
                }
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
                            if (dataLoad[i].type == "textbox") {
                                $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                            }
                            if (dataLoad[i].type == "checkbox") {
                                chekedd = false
                                if (dataLoad[i].value == '1') {
                                    chekedd = true
                                }
                                $scope.item.obj[dataLoad[i].emrdfk] = chekedd
                                var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                                $scope.getSkor(datass)
                            }

                            if (dataLoad[i].type == "datetime") {
                                $scope.item.obj[dataLoad[i].emrdfk] = new Date(dataLoad[i].value)
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



            $scope.listKeterangan = [
                { "id": 1, "nama": "Mandiri", "descNilai": "20" },
                { "id": 2, "nama": "Ketergantungan Ringan", "descNilai": "12-19" },
                { "id": 3, "nama": "Ketergantungan Sedang", "descNilai": "9-11" },
                { "id": 4, "nama": "Ketergantungan Berat", "descNilai": "5-8" },
                { "id": 5, "nama": "Ketergantungan Total", "descNilai": "0-4" },
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
                    if (arrobj[i] == stat.id && $scope.item.obj[parseInt(arrobj[i])] == true) {
                        $scope.totalSkor = $scope.totalSkor + parseInt(stat.descNilai)
                        break

                    } else {
                        $scope.totalSkor = $scope.totalSkor - parseInt(stat.descNilai)
                        break
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
            $scope.$watch('item.obj[1106]', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.item.obj[1107] = parseFloat($scope.item.obj[1101]) + parseFloat($scope.item.obj[1102]) +
                        parseFloat($scope.item.obj[1103]) + parseFloat($scope.item.obj[1104]) +
                        parseFloat($scope.item.obj[1105]) + parseFloat($scope.item.obj[1106])
                }
            });
            $scope.$watch('item.obj[1101]', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.item.obj[1107] = parseFloat($scope.item.obj[1101]) + parseFloat($scope.item.obj[1102]) +
                        parseFloat($scope.item.obj[1103]) + parseFloat($scope.item.obj[1104]) +
                        parseFloat($scope.item.obj[1105]) + parseFloat($scope.item.obj[1106])
                }
            });
            $scope.$watch('item.obj[1102]', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.item.obj[1107] = parseFloat($scope.item.obj[1101]) + parseFloat($scope.item.obj[1102]) +
                        parseFloat($scope.item.obj[1103]) + parseFloat($scope.item.obj[1104]) +
                        parseFloat($scope.item.obj[1105]) + parseFloat($scope.item.obj[1106])
                }
            });
            $scope.$watch('item.obj[1103]', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.item.obj[1107] = parseFloat($scope.item.obj[1101]) + parseFloat($scope.item.obj[1102]) +
                        parseFloat($scope.item.obj[1103]) + parseFloat($scope.item.obj[1104]) +
                        parseFloat($scope.item.obj[1105]) + parseFloat($scope.item.obj[1106])
                }
            });
            $scope.$watch('item.obj[1104]', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.item.obj[1107] = parseFloat($scope.item.obj[1101]) + parseFloat($scope.item.obj[1102]) +
                        parseFloat($scope.item.obj[1103]) + parseFloat($scope.item.obj[1104]) +
                        parseFloat($scope.item.obj[1105]) + parseFloat($scope.item.obj[1106])
                }
            });
            $scope.$watch('item.obj[1105]', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.item.obj[1107] = parseFloat($scope.item.obj[1101]) + parseFloat($scope.item.obj[1102]) +
                        parseFloat($scope.item.obj[1103]) + parseFloat($scope.item.obj[1104]) +
                        parseFloat($scope.item.obj[1105]) + parseFloat($scope.item.obj[1106])
                }
            });
        }
    ]);
});