define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DASCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {

            var isNotClick = true;
            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 166
            $scope.now = new Date()
            var dataLoad = []
            $scope.listData1 = []
            $scope.listData2 = []
            $scope.listData3 = []
            $scope.listData4 = []
            $scope.listData5 = []
            $scope.listData6 = []
            $scope.listData7 = []
            $scope.listData8 = []
            $scope.listData9 = []
            $scope.listData10 = []
            $scope.listData11 = []
            $scope.listData11 = []
            $scope.listData12 = []
            $scope.listDaily = [
                {
                    "id": 1, "nama": "A1. Mencatat Jenis Kelamin Berdasarkan Pengamatan",
                    "detail": [
                        { "id": 9167, "nama": "Laki-laki", "type": "checkbox" },
                        { "id": 9168, "nama": "Perempuan", "type": "checkbox" },

                    ]
                },
                {
                    "id": 2, "nama": "A2. Berapa usia anda saat ini ?",
                    "detail": [
                        { "id": 9169, "nama": "", "type": "textbox" },

                    ]
                },
                {
                    "id": 3, "nama": "A3. Berapa tahun menempuh pendidikan ? ( Sejak ds sampai pendidikan terakhir )",
                    "detail": [
                        { "id": 9170, "nama": "", "type": "textbox" },
                    ]
                },
                {
                    "id": 4, "nama": "A4. Apakah status perkawinan anda saat ini ? ( pilih salah satu yang paling tepat )",
                    "detail": [
                        { "id": 9171, "nama": "Belum Kawin", "type": "checkbox" },
                        { "id": 9172, "nama": "Kawin ", "type": "checkbox" },
                        { "id": 9173, "nama": "Berpisah", "type": "checkbox" },
                        { "id": 9174, "nama": "Cerai Hidup", "type": "checkbox" },
                        { "id": 9175, "nama": "Cerai Mati", "type": "checkbox" },
                        { "id": 9176, "nama": "Hidup tanpa ikatan resmi", "type": "checkbox" },
                    ]
                },
                {
                    "id": 4, "nama": "A5. Apakah pekerjaan utama anda saat ini? (pilih salah satu yang paling tepat)",
                    "detail": [
                        { "id": 9177, "nama": "Karyawan", "type": "checkbox" },
                        { "id": 9178, "nama": "Wiraswasta", "type": "checkbox" },
                        { "id": 9179, "nama": "Pekerjaan Sukarela", "type": "checkbox" },
                        { "id": 9180, "nama": "Pelajar", "type": "checkbox" },
                        { "id": 9181, "nama": "Ibu Rumah Tangga", "type": "checkbox" },
                        { "id": 9182, "nama": "Pensiunan", "type": "checkbox" },
                        { "id": 9183, "nama": "Tidak Bekerja (kesehatan)", "type": "checkbox" },
                        { "id": 9184, "nama": "Tidak Bekerja (lain)", "type": "checkbox" },
                        { "id": 9185, "nama": "Lain lain :", "type": "checkbox" },
                        { "id": 9186, "nama": "", "type": "textbox" },

                    ]
                },

            ]
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
            })
            medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 166).then(function (e) {
                // debugger
                var datas = e.data.kolom4
                for (let i = 0; i < datas.length; i++) {
                    const element = datas[i];
                    if (element.namaexternal == 's1')
                        $scope.listData1.push({ id: element.id, skor: element.reportdisplay, nama: element.caption, kodeexternal: element.kodeexternal })
                    if (element.namaexternal == 's2')
                        $scope.listData2.push({ id: element.id, skor: element.reportdisplay, nama: element.caption, kodeexternal: element.kodeexternal })
                    if (element.namaexternal == 's3')
                        $scope.listData3.push({ id: element.id, skor: element.reportdisplay, nama: element.caption, kodeexternal: element.kodeexternal })
                    if (element.namaexternal == 's4')
                        $scope.listData4.push({ id: element.id, skor: element.reportdisplay, nama: element.caption, kodeexternal: element.kodeexternal })
                    if (element.namaexternal == 's5')
                        $scope.listData5.push({ id: element.id, skor: element.reportdisplay, nama: element.caption, kodeexternal: element.kodeexternal })
                    if (element.namaexternal == 's6')
                        $scope.listData6.push({ id: element.id, skor: element.reportdisplay, nama: element.caption, kodeexternal: element.kodeexternal })
                    if (element.namaexternal == 's7')
                        $scope.listData7.push({ id: element.id, skor: element.reportdisplay, nama: element.caption, kodeexternal: element.kodeexternal })
                    if (element.namaexternal == 's8')
                        $scope.listData8.push({ id: element.id, skor: element.reportdisplay, nama: element.caption, kodeexternal: element.kodeexternal })
                    if (element.namaexternal == 's9')
                        $scope.listData9.push({ id: element.id, skor: element.reportdisplay, nama: element.caption, kodeexternal: element.kodeexternal })
                    if (element.namaexternal == 's10')
                        $scope.listData10.push({ id: element.id, skor: element.reportdisplay, nama: element.caption, kodeexternal: element.kodeexternal })
                    if (element.namaexternal == 's11')
                        $scope.listData11.push({ id: element.id, skor: element.reportdisplay, nama: element.caption, kodeexternal: element.kodeexternal })
                    if (element.namaexternal == 's12')
                        $scope.listData12.push({ id: element.id, skor: element.reportdisplay, nama: element.caption, kodeexternal: element.kodeexternal })
                }

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
                                // if (dataLoad[i].emrdfk >= 3122 && dataLoad[i].emrdfk <= 3148) {
                                //     var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                                //     $scope.getSkor2(datass)
                                // }
                                if (dataLoad[i].caption != null) {
                                    var datass = { id: dataLoad[i].emrdfk, skor: dataLoad[i].caption }
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
                            $scope.totalSkor = $scope.totalSkor + parseFloat(stat.skor)
                            break
                        } else {
                            $scope.totalSkor = $scope.totalSkor - parseFloat(stat.skor)
                            break
                        }


                    } else {

                    }
                }
                $scope.item.obj[9164] = $scope.totalSkor //+ $scope.totalSkor2
                // setSkorAkhir($scope.item.obj[3152])
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
                    // $state.go("RekamMedis.OrderJadwalBedah.ProsedurKeselamatan", {
                    //     namaEMR : $scope.cc.emrfk,
                    //     nomorEMR : e.data.data.noemr 
                    // });
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,  
                    'D A S ( Daily Activity Skill ) ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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