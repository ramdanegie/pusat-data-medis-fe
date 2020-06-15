define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanAnestesi2Ctrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 363
            var dataLoad = []

            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
            })
            medifirstService.getPart('emr/get-datacombo-part-ruangan-pelayanan', true, true, 20).then(function (data) {
                $scope.listRuang = data
            
             })
             medifirstService.getPart('emr/get-datacombo-part-diagnosa', true, true, 20).then(function (data) {
                $scope.listDiagnosa = data
            })
             $scope.listKeadaanPra = [
                {
                    "id": 1, "nama": "Keadaan Pra Anestesi :",
                    "detail": [
                        { "id": 110637, "nama": "Check Identitas", "type": "checkbox" },
                        { "id": 110638, "nama": "Izin OP", "type": "checkbox" },
                        { "id": 110639, "nama": "Tanggal", "type": "checkbox" },
                        { "id": 110640, "nama": "Terencana", "type": "checkbox" },
                    ]
                },
                {
                    "id": 1, "nama": "",
                    "detail": [
                        { "id": 110641, "nama": "BB :", "type": "textbox" },
                        { "id": 110642, "nama": "EKG :", "type": "textbox" },
                        { "id": 110643, "nama": "", "type": "textbox" },             
                    ]
                },
                {
                    "id": 1, "nama": "",
                    "detail": [
                        { "id": 110644, "nama": "Tensi :", "type": "textbox" },
                        { "id": 110645, "nama": "Hb :", "type": "textbox" },
                        { "id": 110646, "nama": "", "type": "textbox" },             
                    ]
                },
                {
                    "id": 1, "nama": "",
                    "detail": [
                        { "id": 110647, "nama": "Nadi :", "type": "textbox" },
                        { "id": 110648, "nama": "Lain-lain :", "type": "textbox" },
                        { "id": 110649, "nama": "", "type": "textbox2" },          
                    ]
                },
                {
                    "id": 1, "nama": "",
                    "detail": [
                        { "id": 110650, "nama": "Premedikasi :", "type": "textbox3" },        
                    ]
                },
                {
                    "id": 1, "nama": "",
                    "detail": [
                        { "id": 110651, "nama": "Diagnose Pre Mecta :", "type": "textbox3" },        
                    ]
                },
                {
                    "id": 1, "nama": "",
                    "detail": [
                        { "id": 110652, "nama": "Diagnose Post Mecta :", "type": "textbox3" },        
                    ]
                },
                {
                    "id": 1, "nama": "",
                    "detail": [
                        { "id": 110653, "nama": "Macam Tindakan :", "type": "textbox3" },        
                    ]
                },
                {
                    "id": 1, "nama": "",
                    "detail": [
                        { "id": 110654, "nama": "Ahli Jiwa :", "type": "textbox3" },        
                    ]
                },
                {
                    "id": 1, "nama": "",
                    "detail": [
                        { "id": 110655, "nama": "Ahli Anestesi :", "type": "textbox" },
                        { "id": 110656, "nama": "Anestesi Mulai :", "type": "textbox" },
                    ]
                },
                {
                    "id": 1, "nama": "",
                    "detail": [
                        { "id": 110657, "nama": "Perawat :   ", "type": "textbox" },
                        { "id": 110658, "nama": "Sadar Jam :", "type": "textbox" },
                    ]
                }
            ]
            $scope.listPosisi = [
                {
                    "id": 1, "nama": "",
                    "detail": [
                        { "id": 110675, "nama": "Posisi", "type": "textbox" },
                        { "id": 110676, "nama": "Jenis Anestesi", "type": "textbox" },
                        { "id": 110677, "nama": "Teknik Anestesi", "type": "textbox" },
                    ]
                },
                {
                    "id": 1, "nama": "Induksi :",
                    "detail": [
                        { "id": 110678, "nama": "Pentotal", "type": "textbox" },
                        { "id": 110679, "nama": "Propofol", "type": "textbox" },
                        { "id": 110680, "nama": "Antrakurium", "type": "textbox" },
                        { "id": 110681, "nama": "Suksimil kolin", "type": "textbox" },             
                    ]
                },
                {
                    "id": 1, "nama": "Airway Aparatus :",
                    "detail": [
                        { "id": 110682, "nama": "Oro Trach No.", "type": "checkbox" },
                        { "id": 110683, "nama": "Naso Trach No.", "type": "checkbox" },             
                    ]
                },
                {
                    "id": 1, "nama": "Maintenance",
                    "detail": [
                        { "id": 110684, "nama": "", "type": "textbox" },
                        { "id": 110685, "nama": "", "type": "textbox" },            
                    ]
                },
                {
                    "id": 1, "nama": "Catatan",
                    "detail": [
                        { "id": 110686, "nama": "Nadi :", "type": "textarea" },
                                 
                    ]
                },
                {
                    "id": 1, "nama": "Tanda Tangan",
                    "detail": [
                        { "id": 110687, "nama": "", "type": "combobox" },
                                 
                    ]
                },
                
            ]
            var sesiesSuhu = []
            var seriesNadi = []
            var seriesTensi = []
            var seriesResp = []
            var seriesSis = []
            var seriesDis = []
            loadChart()
            function loadChart() {
                $("#chartNadi").kendoChart({
                    title: {
                        text: "Grafik Nadi"
                    },
                    legend: {
                        position: "top"
                    },
                    series: [
                        {
                            type: "line",
                            data: seriesNadi,
                            name: "Nadi",
                            color: "#fc0303",

                        }],
                    valueAxes: [{
                        title: { text: "N" },
                        min: 20,
                        max: 240,
                        majorUnit: 20
                    }],
                    categoryAxis: {
                        categories: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
                        axisCrossingValues: [0, 35]
                    }
                });
                $("#chartSuhu").kendoChart({

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

                    }],
                    valueAxes: [
                        {
                            name: "S",
                            title: { text: "S" },
                            min: 32,
                            max: 43,

                        }
                    ],
                    categoryAxis: {
                        categories: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
                        // categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],

                        axisCrossingValues: [0, 35]
                    }
                });
                $("#chartTensi").kendoChart({

                    title: {
                        text: "Grafik Tensi"
                    },
                    legend: {
                        position: "top"
                    },
                    series: [{
                        type: "line",
                        data: seriesSis,
                        name: "Siastole",
                        color: "red",

                    },
                    {
                        type: "line",
                        data: seriesDis,
                        name: "Diastole",
                        color: "green",

                    }
                    ],
                    valueAxes: [

                        {
                            name: "TD",
                            title: { text: "TD" },
                            min: 20,
                            max: 240,
                            majorUnit: 20
                        }
                    ],
                    categoryAxis: {
                        categories: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
                        axisCrossingValues: [0, 35]
                    }
                });
                $("#chartResp").kendoChart({

                    title: {
                        text: "Grafik Respirasi"
                    },
                    legend: {
                        position: "top"
                    },
                    series: [{
                        type: "line",
                        data: seriesResp,
                        name: "Respirasi",
                        color: "orange",

                    }],
                    valueAxes: [

                        {
                            name: "RR",
                            title: { text: "RR" },
                            min: 0,
                            max: 48,
                            majorUnit: 4
                        }
                    ],
                    categoryAxis: {
                        categories: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
                        axisCrossingValues: [0, 35]
                    }
                });
                
            }
              $scope.listData1 = []
            $scope.listData2 = []
            $scope.listTanggal = []
            medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 363).then(function (e) {

                var datas = e.data.kolom4

                var detail = []
                var arrayAskep = []
                var arrayParenteral = []
                var sama = false
                for (let i = 0; i < datas.length; i++) {
                    const element = datas[i];
                    sama = false
                    if (element.type == 'label') {
                        $scope.listTanggal.push({ id: element.id, namaexternal: element.namaexternal })
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
            })
            
            // $scope.listKeadaanPra = [
            //     {
            //         "id": 1, "nama": "Keadaan Pra Anestesi :",
            //         "detail": [
            //             { "id": 110487, "nama": "Check Identitas", "type": "checkbox" },
            //             { "id": 110488, "nama": "Izin OP", "type": "checkbox" },
            //             { "id": 110489, "nama": "Tanggal", "type": "checkbox" },
            //             { "id": 110490, "nama": "Terencana", "type": "checkbox" },
            //         ]
            //     },
            //     {
            //         "id": 1, "nama": "",
            //         "detail": [
            //             { "id": 110491, "nama": "BB :", "type": "textbox" },
            //             { "id": 110492, "nama": "EKG :", "type": "textbox" },
            //             { "id": 110493, "nama": "", "type": "textbox" },             
            //         ]
            //     },
            //     {
            //         "id": 1, "nama": "",
            //         "detail": [
            //             { "id": 110494, "nama": "Tensi :", "type": "textbox" },
            //             { "id": 110495, "nama": "Hb :", "type": "textbox" },
            //             { "id": 110496, "nama": "", "type": "textbox" },             
            //         ]
            //     },
            //     {
            //         "id": 1, "nama": "",
            //         "detail": [
            //             { "id": 110497, "nama": "Nadi :", "type": "textbox" },
            //             { "id": 110498, "nama": "Lain-lain :", "type": "textbox" },
            //             { "id": 110499, "nama": "", "type": "textbox2" },          
            //         ]
            //     },
            //     {
            //         "id": 1, "nama": "",
            //         "detail": [
            //             { "id": 110500, "nama": "Premedikasi :", "type": "textbox3" },        
            //         ]
            //     },
            //     {
            //         "id": 1, "nama": "",
            //         "detail": [
            //             { "id": 110501, "nama": "Diagnose Pre Mecta :", "type": "textbox3" },        
            //         ]
            //     },
            //     {
            //         "id": 1, "nama": "",
            //         "detail": [
            //             { "id": 110502, "nama": "Diagnose Post Mecta :", "type": "textbox3" },        
            //         ]
            //     },
            //     {
            //         "id": 1, "nama": "",
            //         "detail": [
            //             { "id": 110503, "nama": "Macam Tindakan :", "type": "textbox3" },        
            //         ]
            //     },
            //     {
            //         "id": 1, "nama": "",
            //         "detail": [
            //             { "id": 110504, "nama": "Ahli Jiwa :", "type": "textbox3" },        
            //         ]
            //     },
            //     {
            //         "id": 1, "nama": "",
            //         "detail": [
            //             { "id": 110505, "nama": "Ahli Anestesi :", "type": "textbox" },
            //             { "id": 110506, "nama": "Anestesi Mulai :", "type": "textbox" },
            //         ]
            //     },
            //     {
            //         "id": 1, "nama": "",
            //         "detail": [
            //             { "id": 110507, "nama": "Perawat :   ", "type": "textbox" },
            //             { "id": 110508, "nama": "Sadar Jam :", "type": "textbox" },
            //         ]
            //     }
            // ]
            // $scope.listPosisi = [
            //     {
            //         "id": 1, "nama": "",
            //         "detail": [
            //             { "id": 110525, "nama": "Posisi", "type": "textbox" },
            //             { "id": 110526, "nama": "Jenis Anestesi", "type": "textbox" },
            //             { "id": 110527, "nama": "Teknik Anestesi", "type": "textbox" },
            //         ]
            //     },
            //     {
            //         "id": 1, "nama": "Induksi :",
            //         "detail": [
            //             { "id": 110528, "nama": "Pentotal", "type": "checkbox" },
            //             { "id": 110529, "nama": "Propofol", "type": "checkbox" },
            //             { "id": 110530, "nama": "Antrakurium", "type": "checkbox" },
            //             { "id": 110531, "nama": "Suksimil kolin", "type": "checkbox" },             
            //         ]
            //     },
            //     {
            //         "id": 1, "nama": "Airway Aparatus :",
            //         "detail": [
            //             { "id": 110532, "nama": "Oro Trach No.", "type": "checkbox" },
            //             { "id": 110533, "nama": "Naso Trach No.", "type": "checkbox" },             
            //         ]
            //     },
            //     {
            //         "id": 1, "nama": "Maintenance",
            //         "detail": [
            //             { "id": 110534, "nama": "", "type": "textbox" },
            //             { "id": 110535, "nama": "", "type": "textbox" },            
            //         ]
            //     },
            //     {
            //         "id": 1, "nama": "Catatan",
            //         "detail": [
            //             { "id": 110536, "nama": "Nadi :", "type": "textarea" },
                                 
            //         ]
            //     },
            //     {
            //         "id": 1, "nama": "Tanda Tangan",
            //         "detail": [
            //             { "id": 110537, "nama": "", "type": "combobox" },
                                 
            //         ]
            //     },
                
            // ]
            
            

            
            var cacheNomorEMR = cacheHelper.get('cacheNomorEMR');
            if (cacheNomorEMR != undefined) {
                nomorEMR = cacheNomorEMR[0]
                $scope.cc.norec_emr = nomorEMR
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
                    for (let z = 0; z < 15; z++) {
                        if (arrobj[i] == 110659 + z)
                            sesiesSuhu[z] = $scope.item.obj[parseFloat(arrobj[i])]
                    }
                    for (let z = 0; z < 15; z++) {
                        if (arrobj[i] == 110589 + z)
                            seriesNadi[z] = $scope.item.obj[parseFloat(arrobj[i])]
                    }
                    for (let z = 0; z < 15; z++) {
                        if (arrobj[i] == 110557 + z)
                            seriesSis[z] = $scope.item.obj[parseFloat(arrobj[i])]
                    }
                    for (let z = 0; z < 15; z++) {
                        if (arrobj[i] == 110573 + z)
                            seriesDis[z] = $scope.item.obj[parseFloat(arrobj[i])]
                    }
                    for (let z = 0; z < 15; z++) {
                        if (arrobj[i] == 110621 + z)
                            seriesResp[z] = $scope.item.obj[parseFloat(arrobj[i])]
                    }
                }
                for (let x = 0; x < sesiesSuhu.length; x++) {
                    if (!isNaN(parseFloat(sesiesSuhu[x])))
                        sesiesSuhu[x] = parseFloat(sesiesSuhu[x])
                    else
                        sesiesSuhu[x] = 0
                }
                for (let x = 0; x < seriesNadi.length; x++) {
                    if (!isNaN(parseFloat(seriesNadi[x])))
                        seriesNadi[x] = parseFloat(seriesNadi[x])
                    else
                        seriesNadi[x] = 0
                }
                for (let x = 0; x < seriesSis.length; x++) {
                    if (!isNaN(parseFloat(seriesSis[x])))
                        seriesSis[x] = parseFloat(seriesSis[x])
                    else
                        seriesSis[x] = 0
                }
                for (let x = 0; x < seriesDis.length; x++) {
                    if (!isNaN(parseFloat(seriesDis[x])))
                        seriesDis[x] = parseFloat(seriesDis[x]) 
                    else
                        seriesDis[x] = 0
                }
                for (let x = 0; x < seriesResp.length; x++) {
                    if (!isNaN(parseFloat(seriesResp[x])))
                        seriesResp[x] = parseFloat(seriesResp[x]) 
                    else
                        seriesResp[x] = 0
                }
                loadChart()
                console.log(seriesNadi)
                console.log(sesiesSuhu)
            })
            


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

                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,
                        'Laporan Anestesi 2 ' + ' dengan No EMR - ' + e.data.data.noemr + ' pada No Registrasi '
                        + $scope.cc.noregistrasi).then(function (res) {
                        })
                    var arrobj = Object.keys($scope.item.obj)

                    for (var i = arrobj.length - 1; i >= 0; i--) {
                        for (let z = 0; z < 15; z++) {
                            if (arrobj[i] == 110659 + z)
                                sesiesSuhu[z] = $scope.item.obj[parseFloat(arrobj[i])]
                        }
                        for (let z = 0; z < 15; z++) {
                            if (arrobj[i] == 110589 + z)
                                seriesNadi[z] = $scope.item.obj[parseFloat(arrobj[i])]
                        }
                        for (let z = 0; z < 15; z++) {
                            if (arrobj[i] == 110557 + z)
                                seriesSis[z] = $scope.item.obj[parseFloat(arrobj[i])]
                        }
                        for (let z = 0; z < 15; z++) {
                            if (arrobj[i] == 110573 + z)
                                seriesDis[z] = $scope.item.obj[parseFloat(arrobj[i])]
                        }
                        for (let z = 0; z < 15; z++) {
                            if (arrobj[i] == 110621 + z)
                                seriesResp[z] = $scope.item.obj[parseFloat(arrobj[i])]
                        }
                    }
                    for (let x = 0; x < sesiesSuhu.length; x++) {
                        if (!isNaN(parseFloat(sesiesSuhu[x])))
                            sesiesSuhu[x] = parseFloat(sesiesSuhu[x])
                    }
                    for (let x = 0; x < seriesNadi.length; x++) {
                        if (!isNaN(parseFloat(seriesNadi[x])))
                            seriesNadi[x] = parseFloat(seriesNadi[x])
                    }
                    for (let x = 0; x < seriesSis.length; x++) {
                        if (!isNaN(parseFloat(seriesSis[x])))
                            seriesSis[x] = parseFloat(seriesSis[x])
                    }
                    for (let x = 0; x < seriesDis.length; x++) {
                        if (!isNaN(parseFloat(seriesDis[x])))
                            seriesDis[x] = parseFloat(seriesDis[x]) 
                    }
                    for (let x = 0; x < seriesResp.length; x++) {
                        if (!isNaN(parseFloat(seriesResp[x])))
                            seriesResp[x] = parseFloat(seriesResp[x]) 
                    }
                    loadChart()

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