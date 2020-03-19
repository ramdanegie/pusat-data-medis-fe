define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LembarKegiatanRehab2Ctrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 322
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
            medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 322).then(function (e) {

                var datas = e.data.kolom4

                var detail = []
                var arrayAskep=[]
                var arrayAskep2=[]
                var arrayAskep3=[]
                var arrayAskep4=[]
                var arrayAskep5=[]
                var arrayAskep6=[]
                var arrayAskep7=[]
                var arrayAskep8=[]
                var arrayAskep9=[]
                var arrayAskep10    =[]

                var sama = false
                for (let i = 0; i < datas.length; i++) {
                    const element = datas[i];
                    sama = false

                    // ARRAY GEJALA
                    if (element.kodeexternal == 'No') {
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
                     // ARRAY GEJALA
                    if (element.kodeexternal == 'No2') {
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
                    if (element.kodeexternal == 'No3') {
                        for (let z = 0; z < arrayAskep3.length; z++) {
                            const element2 = arrayAskep3[z];
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
                            arrayAskep3.push(datax)
                        }
                    }
                    //END ARRAY GEJALA
                     // ARRAY GEJALA
                    if (element.kodeexternal == 'No4') {
                        for (let z = 0; z < arrayAskep4.length; z++) {
                            const element2 = arrayAskep4[z];
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
                            arrayAskep4.push(datax)
                        }
                    }
                    //END ARRAY GEJALA
                    // ARRAY GEJALA
                    if (element.kodeexternal == 'No5') {
                        for (let z = 0; z < arrayAskep5.length; z++) {
                            const element2 = arrayAskep5[z];
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
                            arrayAskep5.push(datax)
                        }
                    }
                    //END ARRAY GEJALA

                    // ARRAY GEJALA
                    if (element.kodeexternal == 'No6') {
                        for (let z = 0; z < arrayAskep6.length; z++) {
                            const element2 = arrayAskep6[z];
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
                            arrayAskep6.push(datax)
                        }
                    }
                    //END ARRAY GEJALA

                    // ARRAY GEJALA
                    if (element.kodeexternal == 'No7') {
                        for (let z = 0; z < arrayAskep7.length; z++) {
                            const element2 = arrayAskep7[z];
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
                            arrayAskep7.push(datax)
                        }
                    }
                    //END ARRAY GEJALA

                    // ARRAY GEJALA
                    if (element.kodeexternal == 'No8') {
                        for (let z = 0; z < arrayAskep8.length; z++) {
                            const element2 = arrayAskep8[z];
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
                            arrayAskep8.push(datax)
                        }
                    }
                    //END ARRAY GEJALA

                    // ARRAY GEJALA
                    if (element.kodeexternal == 'No9') {
                        for (let z = 0; z < arrayAskep9.length; z++) {
                            const element2 = arrayAskep9[z];
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
                            arrayAskep9.push(datax)
                        }
                    }
                    //END ARRAY GEJALA

                    // ARRAY GEJALA
                    if (element.kodeexternal == 'No10') {
                        for (let z = 0; z < arrayAskep10.length; z++) {
                            const element2 = arrayAskep10[z];
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
                            arrayAskep10.push(datax)
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
                $scope.listData2 = arrayAskep2
                
                
                 // ARRAY GEJALA
                var gejalaKosongKeun = []
                for (let k = 0; k < arrayAskep3.length; k++) {
                    const element = arrayAskep3[k];
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
                $scope.listData3 = arrayAskep3

                var gejalaKosongKeun = []
                for (let k = 0; k < arrayAskep4.length; k++) {
                    const element = arrayAskep4[k];
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
                $scope.listData4 = arrayAskep4 

                var gejalaKosongKeun = []
                for (let k = 0; k < arrayAskep5.length; k++) {
                    const element = arrayAskep5[k];
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
                $scope.listData5 = arrayAskep5

                 var gejalaKosongKeun = []
                for (let k = 0; k < arrayAskep6.length; k++) {
                    const element = arrayAskep6[k];
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
                $scope.listData6 = arrayAskep6
                
                var gejalaKosongKeun = []
                for (let k = 0; k < arrayAskep7.length; k++) {
                    const element = arrayAskep7[k];
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
                $scope.listData7 = arrayAskep7

                var gejalaKosongKeun = []
                for (let k = 0; k < arrayAskep8.length; k++) {
                    const element = arrayAskep8[k];
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
                $scope.listData8 = arrayAskep8

                var gejalaKosongKeun = []
                for (let k = 0; k < arrayAskep9.length; k++) {
                    const element = arrayAskep9[k];
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
                $scope.listData9 = arrayAskep9

                var gejalaKosongKeun = []
                for (let k = 0; k < arrayAskep10.length; k++) {
                    const element = arrayAskep10[k];
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
                $scope.listData10 = arrayAskep10





                

               

                


            })

            $scope.listRiwayatKesehatan = [
                
                {
                    "id": 7, "nama": "Keluhan Nyeri ",
                    "detail": [
                        { "id": 7606, "nama": "Tidak Ada", "type": "checkbox" },
                        { "id": 7607, "nama": "Ada , lokasi :", "type": "checkbox" },
                        { "id": 7608, "nama": "Ada , jelaskan :", "type": "textbox" },
                    ]
                },
            ]
            $scope.listSkorNRC = [{
                "id": 8, "nama": "Score ",
                "detail": [
                    { "id": 7590, "nama": "0", "type": "checkbox", "ket": "= Tidak Nyeri" },
                    { "id": 7591, "nama": "1 - 3", "type": "checkbox", "ket": "= Nyeri Ringan" },
                    { "id": 7592, "nama": "4 - 6", "type": "checkbox", "ket": "= Nyeri Sedang" },
                    { "id": 7593, "nama": "7 - 10", "type": "checkbox", "ket": "= Nyeri Berat" },
                ]
            }]
            $scope.listSkorWong = [{
                "id": 9, "nama": "Score ",
                "detail": [
                    { "id": 7594, "nama": "0 - 1", "type": "checkbox", "ket": "= Tidak Ada Nyeri" },
                    { "id": 7595, "nama": "2 - 3", "type": "checkbox", "ket": "= Sedikit Nyeri" },
                    { "id": 7596, "nama": "4 - 5", "type": "checkbox", "ket": "= Cukup Nyeri" },
                    { "id": 7597, "nama": "6 - 7", "type": "checkbox", "ket": "= Lumayan Nyeri" },
                    { "id": 7598, "nama": "8 - 9", "type": "checkbox", "ket": "= Sangat Nyeri" },
                    { "id": 7599, "nama": "10", "type": "checkbox", "ket": "= Amat Sangat Nyeri" },
                ]
            }]
            $scope.listNyeriAnak = [
                {
                    "id": 10, "nama": "Hurts", "detail": 
            [
                    { "id": 7600, "nama": "No Hurt", "descNilai": 0 },
                    { "id": 7601, "nama": "Hurts Little Bit", "descNilai": 2 }, 
                    { "id": 7602, "nama": "Hurts Little More", "descNilai": 4 },
                    { "id": 7603, "nama": "Hurts Even More", "descNilai": 6 }, 
                    { "id": 7604, "nama": "Hurts Whole Lot", "descNilai": 8 },
                    { "id": 7605, "nama": "Hurts whorts", "descNilai": 10 }]
                }
            ]

           
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
        
            
            

            $scope.Batal =function(){
                $scope.item.obj=[]
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
                    // var arrStr = {
                    //     0: e.data.data.noemr
                    // }
                    // cacheHelper.set('cacheNomorEMR', arrStr);
                });
            }

        }
    ]);
});