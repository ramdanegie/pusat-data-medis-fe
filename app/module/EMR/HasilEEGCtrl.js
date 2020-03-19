define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('HasilEEGCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 202
            var dataLoad = []
            medifirstService.getPart('emr/get-datacombo-part-dokter', true, true, 20).then(function (data) {
                $scope.listDokter = data
            })
            medifirstService.getPart('emr/get-datacombo-part-kelas', true, true, 20).then(function (data) {
                $scope.listKelas = data

            })
            medifirstService.getPart('emr/get-datacombo-part-ruangan-pelayanan', true, true, 20).then(function (data) {
                $scope.listRuang = data

            })
            $scope.tekananDarah = [
                // {
                //     nilai: 10,
                //     nilai2: 30
                // }, {
                //     nilai: 10,
                //     nilai2: 30
                // },
            ]
            $("#chart").kendoChart({
                title: {
                    text: "Tanda Tanda Vital"
                },
                legend: {
                    position: "top"
                },
                series: [
                    //         {
                    //         type: "line",
                    //         data: [30, 38, 40, 32, 42],
                    //         name: "mpg",
                    //         color: "#ec5e0a",
                    //         axis: "mpg"
                    //     }, {
                    //         type: "line",
                    //         data: [7.8, 6.2, 5.9, 7.4, 5.6],
                    //         name: "l/100 km",
                    //         color: "#4e4141",
                    //         axis: "l100km"
                    //     }
                    // 
                ],
                valueAxes: [{
                    title: { text: "S" },
                    min: 35,
                    max: 42
                }, {
                    name: "N",
                    title: { text: "N" },
                    min: 40,
                    max: 180,
                    majorUnit: 20
                }],
                categoryAxis: {
                    categories: [6,12,18,24,6,12,18,24,6,12,18,24,6,12,18,24,6,12,18,24,6,12,18,24,6,12,18,24],
                    // categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
                   
                    axisCrossingValues: [0, 0, 10, 10]
                }
            });
            $scope.listData1 = []
            $scope.listData2 = []
            $scope.listTanggal = []
           medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 202).then(function (e) {

                var datas = e.data.kolom4

                var detail = []
                var arrayCons=[]
                var sama = false
                for (let i = 0; i < datas.length; i++) {
                    const element = datas[i];
                    sama = false

                    // ARRAY GEJALA
                    if (element.kodeexternal == 'Cons') {
                        for (let z = 0; z < arrayCons.length; z++) {
                            const element2 = arrayCons[z];
                            if (element2.namaexternal == element.namaexternal) {
                                detail.push(element)
                                element2.details = detail
                                sama = true
                            }
                        }
                        if (sama == false) {
                            var datax = {
                                caption: element.caption,
                                cbotable: element.cbotable,
                                child: [],
                                emrfk: element.emrfk,
                                headfk: element.headfk,
                                id: element.id,
                                kdprofile: element.kdprofile,
                                kodeexternal: element.kodeexternal,
                                namaemr: element.namaemr,
                                namaexternal: element.namaexternal,
                                nourut: element.nourut,
                                reportdisplay: element.reportdisplay,
                                satuan: element.satuan,
                                statusenabled: element.statusenabled,
                                style: element.style,
                                type: element.type,

                            }
                            arrayCons.push(datax)
                        }
                    }
                    //END ARRAY GEJALA


                }
                // ARRAY GEJALA
                var gejalaKosongKeun = []
                for (let k = 0; k < arrayCons.length; k++) {
                    const element = arrayCons[k];
                    for (let l = 0; l < datas.length; l++) {
                        const element2 = datas[l];
                        if (element2.namaexternal == element.namaexternal) {
                            gejalaKosongKeun.push(element2)
                            element.details = gejalaKosongKeun
                        } else {
                            gejalaKosongKeun = []
                        }
                    }
                }
                $scope.listData1 = arrayCons


                

               

                


            })


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
                            if (dataLoad[i].emrdfk >= 7590 && dataLoad[i].emrdfk <= 7593 && chekedd) {
                                $scope.getSkalaNyeri(1, { descNilai: dataLoad[i].reportdisplay })
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
            $scope.$watch('item.obj[7589]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai == 0) {
                    $scope.item.obj[7590] = true
                    $scope.item.obj[7591] = false
                    $scope.item.obj[7592] = false
                    $scope.item.obj[7593] = false
                }
                if (nilai >= 1 && nilai <= 3) {
                    $scope.item.obj[7590] = false
                    $scope.item.obj[7591] = true
                    $scope.item.obj[7592] = false
                    $scope.item.obj[7593] = false
                }
                if (nilai >= 4 && nilai <= 6) {
                    $scope.item.obj[7590] = false
                    $scope.item.obj[7591] = false
                    $scope.item.obj[7592] = true
                    $scope.item.obj[7593] = false
                }
                if (nilai >= 7 && nilai <= 10) {
                    $scope.item.obj[7590] = false
                    $scope.item.obj[7591] = false
                    $scope.item.obj[7592] = false
                    $scope.item.obj[7593] = true
                }
            });

            $scope.getSkalaNyeri = function (data, stat) {
                $scope.activeStatus = stat.descNilai
                var nilai = stat.descNilai
                if (nilai >= 0 && nilai <= 1) {
                    $scope.item.obj[7594] = true
                    $scope.item.obj[7595] = false
                    $scope.item.obj[7596] = false
                    $scope.item.obj[7597] = false
                    $scope.item.obj[7598] = false
                    $scope.item.obj[7599] = false
                }
                if (nilai >= 2 && nilai <= 3) {
                    $scope.item.obj[7594] = false
                    $scope.item.obj[7595] = true
                    $scope.item.obj[7596] = false
                    $scope.item.obj[7597] = false
                    $scope.item.obj[7598] = false
                    $scope.item.obj[7599] = false
                }
                if (nilai >= 4 && nilai <= 5) {
                    $scope.item.obj[7594] = false
                    $scope.item.obj[7595] = false
                    $scope.item.obj[7596] = true
                    $scope.item.obj[7597] = false
                    $scope.item.obj[7598] = false
                    $scope.item.obj[7599] = false
                }
                if (nilai >= 6 && nilai <= 7) {
                    $scope.item.obj[7594] = false
                    $scope.item.obj[7595] = false
                    $scope.item.obj[7596] = false
                    $scope.item.obj[7597] = true
                    $scope.item.obj[7598] = false
                    $scope.item.obj[7599] = false
                }
                if (nilai >= 8 && nilai <= 9) {
                    $scope.item.obj[7594] = false
                    $scope.item.obj[7595] = false
                    $scope.item.obj[7596] = false
                    $scope.item.obj[7597] = false
                    $scope.item.obj[7598] = true
                    $scope.item.obj[7599] = false
                }

                if (nilai == 10) {
                    $scope.item.obj[7594] = false
                    $scope.item.obj[7595] = false
                    $scope.item.obj[7596] = false
                    $scope.item.obj[7597] = false
                    $scope.item.obj[7598] = false
                    $scope.item.obj[7599] = true
                }

            }




            $scope.Batal = function () {
                $scope.item.obj = []
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

                    $rootScope.loadRiwayat()
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,  
                    'Laporan Hasil Pemeriksaan E E G ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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