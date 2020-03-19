define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('CatatanGrafikTandaVital3Ctrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 284
            var dataLoad = []
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
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
            var sesiesSuhu = []
            var seriesNadi = []
            loadChart()
            function loadChart() {
                $("#chartNadi").kendoChart({
                    // title: {
                    //     text: "Tanda Tanda Vital"
                    // },
                    // legend: {
                    //     position: "top"
                    // },
                    // series: [
                    //     {
                    //         type: "line",
                    //         data: sesiesSuhu,
                    //         name: "Suhu",
                    //         color: "#ec5e0a",
                    //         // axis: "S"
                    //     }, {
                    //         type: "line",
                    //         data: seriesNadi,
                    //         name: "Nadi",
                    //         color: "#4e4141",
                    //         // axis: "N"
                    //     }

                    // ],
                    // valueAxes: [{
                    //     name: "Suhu",
                    //     title: { text: "S" },
                    //     min:     ,
                    //     max: 42
                    // }, {
                    //     name: "Nadi",
                    //     title: { text: "N" },
                    //     min: 40,
                    //     max: 180,
                    //     majorUnit: 20
                    // }],
                    title: {
                        text: "Grafik Nadi"
                    },
                    legend: {
                        position: "top"
                    },
                    series: [
                        //     {
                        //     type: "line",
                        //     data: sesiesSuhu,
                        //     name: "Suhu",
                        //     color: "#ec5e0a",

                        // }, 
                        {
                            type: "line",
                            data: seriesNadi,
                            name: "Nadi",
                            color: "#fc0303",

                        }],
                    valueAxes: [{
                        title: { text: "N" },
                        min: 40,
                        max: 180,
                        majorUnit: 20
                    },
                        //  {
                        //     name: "S",
                        //     title: { text: "S" },
                        //     min: 35,
                        //     max: 42,

                        // }
                    ],
                    categoryAxis: {
                        categories: [6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24],
                        // categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],

                        axisCrossingValues: [0, 35]
                    }
                });
                $("#chartSuhu").kendoChart({
                    // title: {
                    //     text: "Tanda Tanda Vital"
                    // },
                    // legend: {
                    //     position: "top"
                    // },
                    // series: [
                    //     {
                    //         type: "line",
                    //         data: sesiesSuhu,
                    //         name: "Suhu",
                    //         color: "#ec5e0a",
                    //         // axis: "S"
                    //     }, {
                    //         type: "line",
                    //         data: seriesNadi,
                    //         name: "Nadi",
                    //         color: "#4e4141",
                    //         // axis: "N"
                    //     }

                    // ],
                    // valueAxes: [{
                    //     name: "Suhu",
                    //     title: { text: "S" },
                    //     min:     ,
                    //     max: 42
                    // }, {
                    //     name: "Nadi",
                    //     title: { text: "N" },
                    //     min: 40,
                    //     max: 180,
                    //     majorUnit: 20
                    // }],
                    title: {
                        text: "Grafik Suhu"
                    },
                    legend: {
                        position: "top"
                    },
                    series: [{
                        type: "line",
                        data: sesiesSuhu,
                        name: "Suhu",
                        color: "#0328fc",

                    }
                        // , {
                        //     type: "line",
                        //     data: seriesNadi,
                        //     name: "Nadi",
                        //     color: "#4e4141",

                        // }
                    ],
                    valueAxes: [
                        //     {
                        //     title: { text: "N" },
                        //     min: 40,
                        //     max: 180,
                        //     majorUnit: 20
                        // }, 
                        {
                            name: "S",
                            title: { text: "S" },
                            min: 35,
                            max: 42,

                        }
                    ],
                    categoryAxis: {
                        categories: [ 6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24],
                        // categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],

                        axisCrossingValues: [0, 35]
                    }
                });
            }
            $scope.listData1 = []
            $scope.listData2 = []
            $scope.listData3 = []
            $scope.listData4 = []
            $scope.listTanggal = []
            $scope.listTanggal2= []
            medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 284).then(function (e) {

                var datas = e.data.kolom4

                var detail = []
                var arrayAskep = []
                var arrayAskep2 = []
                var arrayParenteral = []
                var arrayParenteral2 = []
                var sama = false
                for (let i = 0; i < datas.length; i++) {
                    const element = datas[i];
                    sama = false
                    if (element.kodeexternal == 'date') {
                        $scope.listTanggal.push({ id: element.id })
                    }
                    if (element.kodeexternal == 'date2') {
                        $scope.listTanggal2.push({ id: element.id })
                    }
                    // ARRAY GEJALA
                    if (element.kodeexternal == 'pernafasan') {
                        for (let z = 0; z < arrayAskep.length; z++) {
                            const element2 = arrayAskep[z];
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
                            arrayAskep.push(datax)
                        }
                    }
                    //END ARRAY GEJALA
                    if (element.kodeexternal == 'pernafasan2') {
                        for (let z = 0; z < arrayAskep2.length; z++) {
                            const element2 = arrayAskep2[z];
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
                            arrayAskep2.push(datax)
                        }
                    }
                    //END ARRAY GEJALA
                    // ARRAY GEJALA
                    if (element.kodeexternal == 'parenteral2') {
                        for (let z = 0; z < arrayParenteral2.length; z++) {
                            const element2 = arrayParenteral2[z];
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
                            arrayParenteral2.push(datax)
                        }
                    }
                    //END ARRAY GEJALA


                    // ARRAY GEJALA
                    if (element.kodeexternal == 'parenteral') {
                        for (let z = 0; z < arrayParenteral.length; z++) {
                            const element2 = arrayParenteral[z];
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
                            arrayParenteral.push(datax)
                        }
                    }
                    //END ARRAY GEJALA


                }
                // ARRAY GEJALA
                var gejalaKosongKeun = []
                for (let k = 0; k < arrayAskep.length; k++) {
                    const element = arrayAskep[k];
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
                $scope.listData1 = arrayAskep

                var gejalaKosong1 = []
                for (let k = 0; k < arrayParenteral.length; k++) {
                    const element = arrayParenteral[k];
                    for (let l = 0; l < datas.length; l++) {
                        const element2 = datas[l];
                        if (element2.namaexternal == element.namaexternal) {
                            gejalaKosong1.push(element2)
                            element.details = gejalaKosong1
                        } else {
                            gejalaKosong1 = []
                        }
                    }
                }
                $scope.listData2 = arrayParenteral
                 // ARRAY GEJALA
                var gejalaKosongKeun = []
                for (let k = 0; k < arrayAskep2.length; k++) {
                    const element = arrayAskep2[k];
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
                $scope.listData3 = arrayAskep2

                var gejalaKosong1 = []
                for (let k = 0; k < arrayParenteral2.length; k++) {
                    const element = arrayParenteral2[k];
                    for (let l = 0; l < datas.length; l++) {
                        const element2 = datas[l];
                        if (element2.namaexternal == element.namaexternal) {
                            gejalaKosong1.push(element2)
                            element.details = gejalaKosong1
                        } else {
                            gejalaKosong1 = []
                        }
                    }
                }
                $scope.listData4 = arrayParenteral2









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
                var arrobj = Object.keys($scope.item.obj)

                for (var i = arrobj.length - 1; i >= 0; i--) {
                    for (let z = 0; z < 23; z++) {
                        if (arrobj[i] == 73959 + z)
                            sesiesSuhu[z] = $scope.item.obj[parseFloat(arrobj[i])]
                    }

                }
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    for (let y = 0; y < 23; y++) {
                        if (arrobj[i] == 73983 + y)
                            seriesNadi[y] = $scope.item.obj[parseInt(arrobj[i])]
                    }

                }

                for (let x = 0; x < sesiesSuhu.length; x++) {

                    if (!isNaN(parseFloat(sesiesSuhu[x])))
                        sesiesSuhu[x] = parseFloat(sesiesSuhu[x])
                    else
                        sesiesSuhu[x] = 0
                }
                for (let x = 0; x < seriesNadi.length; x++) {
                    if (!isNaN(parseInt(seriesNadi[x])))
                        seriesNadi[x] = parseInt(seriesNadi[x])
                    else
                        seriesNadi[x] = 0
                }
                loadChart()
                console.log(seriesNadi)
                console.log(sesiesSuhu)
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

                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,  
                    'Catatan Grafik Tanda - Tanda Vital ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
                    + $scope.cc.noregistrasi).then(function (res) {
                    })
                    var arrobj = Object.keys($scope.item.obj)

                    for (var i = arrobj.length - 1; i >= 0; i--) {
                        for (let z = 0; z < 23; z++) {
                            if (arrobj[i] == 73959 + z)
                                sesiesSuhu[z] = $scope.item.obj[parseFloat(arrobj[i])]
                        }
                        for (let z = 0; z < 23; z++) {
                            if (arrobj[i] == 73983 + z)
                                seriesNadi[z] = $scope.item.obj[parseInt(arrobj[i])]
                        }
                    }
                    for (let x = 0; x < sesiesSuhu.length; x++) {
                        if (!isNaN(parseFloat(sesiesSuhu[x])))
                            sesiesSuhu[x] = parseFloat(sesiesSuhu[x])
                    }
                    for (let x = 0; x < seriesNadi.length; x++) {
                        if (!isNaN(parseInt(seriesNadi[x])))
                            seriesNadi[x] = parseInt(seriesNadi[x])
                    }
                    loadChart()
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,
                    'Catatan Grafik Tanda - Tanda Vital' + ' dengan No EMR - ' + e.data.data.noemr + ' pada No Registrasi '
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