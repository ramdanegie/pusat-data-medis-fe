define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('SkorEWSAnakCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {

            var isNotClick = true;
            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 195
            $scope.now = new Date()
            var dataLoad = []
            $scope.listData1 = []
            $scope.listData2 = []
            $scope.listData3 = []
            $scope.listData4 = []
            $scope.listData5 = []
            $scope.listData6 = []
            $scope.listData7 = []
            $scope.listSkor = []
            $scope.listNama = []
            $scope.listParaf = []
            $scope.loading = true

            $scope.listTanggal = []
            $scope.listJam = []
            medifirstService.getPart('emr/get-datacombo-part-dokter', true, true, 20).then(function (data) {
                $scope.listDokter = data
            })
            medifirstService.getPart('emr/get-datacombo-part-ruangan', true, true, 20).then(function (data) {
                $scope.listRuangan = data
            })
            medifirstService.getPart('emr/get-datacombo-part-diagnosa', true, true, 20).then(function (data) {
                $scope.listDiagnosa = data
            })
            medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 195).then(function (e) {
                // debugger
                // $scope.isRouteLoading = false
                //   var datas = e.data.kolom1
                //     for (let i = 0; i <  datas.length; i++) {
                //         const element =datas[i];
                //         if (element.namaexternal == 'kebahayaan')
                //             $scope.listData1.push({ id: element.id, skor: element.reportdisplay, nama: element.caption })
                //         if (element.namaexternal == 'sistempendukung')
                //             $scope.listData2.push({ id: element.id, skor: element.reportdisplay, nama: element.caption })
                //         if (element.namaexternal == 'kemampuanbekerja')
                //             $scope.listData3.push({ id: element.id, skor: element.reportdisplay, nama: element.caption })
                //     }
                var datas = e.data.kolom4
                var detail = []
                var arrayGejala = []
                var arrayGejalaNeg = []
                var arraySkala = []
                var arrayTekananDaarah = []
                var arrayLaju = []
                var arrayKesadaran = []
                var arraySuhu = []
                var sama = false
                for (let i = 0; i < datas.length; i++) {
                    const element = datas[i];
                    sama = false
                    if (element.kodeexternal == 'tanggal') {
                        $scope.listTanggal.push({ id: element.id })
                    }
                    if (element.kodeexternal == 'jam') {
                        $scope.listJam.push({ id: element.id })
                    }
                    if (element.kodeexternal == 'skor') {
                        $scope.listSkor.push({ id: element.id })
                    }
                    if (element.kodeexternal == 'nama') {
                        $scope.listNama.push({ id: element.id })
                    }
                    if (element.kodeexternal == 'paraf') {
                        $scope.listParaf.push({ id: element.id })
                    }
                    // ARRAY GEJALA
                    if (element.kodeexternal == 'keadaan') {
                        for (let z = 0; z < arrayGejala.length; z++) {
                            const element2 = arrayGejala[z];
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
                            arrayGejala.push(datax)
                        }
                    }
                    //END ARRAY GEJALA

                    // ARRAY GEJALA 
                    if (element.kodeexternal == 'kardio') {
                        for (let z = 0; z < arrayGejalaNeg.length; z++) {
                            const element2 = arrayGejalaNeg[z];
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
                            arrayGejalaNeg.push(datax)
                        }
                    }
                    //END ARRAY GEJALA


                    // ARRAY GEJALA 
                    if (element.kodeexternal == 'respirasi') {
                        for (let z = 0; z < arraySkala.length; z++) {
                            const element2 = arraySkala[z];
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
                            arraySkala.push(datax)
                        }
                    }
                    //END ARRAY GEJALA

                    // ARRAY tekanandarah 
                    if (element.kodeexternal == 'tekanandarah') {
                        for (let z = 0; z < arrayTekananDaarah.length; z++) {
                            const element2 = arrayTekananDaarah[z];
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
                            arrayTekananDaarah.push(datax)
                        }
                    }
                    //END ARRAY tekanandarah

                    // ARRAY laju 
                    if (element.kodeexternal == 'laju') {
                        for (let z = 0; z < arrayLaju.length; z++) {
                            const element2 = arrayLaju[z];
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
                            arrayLaju.push(datax)
                        }
                    }
                    //END ARRAY laju

                    // ARRAY arrayKesadaran 
                    if (element.kodeexternal == 'kesadaran') {
                        for (let z = 0; z < arrayKesadaran.length; z++) {
                            const element2 = arrayKesadaran[z];
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
                            arrayKesadaran.push(datax)
                        }
                    }
                    //END ARRAY 

                    // ARRAY suhu 
                    if (element.kodeexternal == 'suhu') {
                        for (let z = 0; z < arraySuhu.length; z++) {
                            const element2 = arraySuhu[z];
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
                            arraySuhu.push(datax)
                        }
                    }
                    //END ARRAY suhu
                }

                // ARRAY GEJALA
                var gejalaKosongKeun = []
                for (let k = 0; k < arrayGejala.length; k++) {
                    const element = arrayGejala[k];
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
                $scope.listData1 = arrayGejala

                // ARRAY GEJALA
                var gejalaKosongKeun2 = []
                for (let k = 0; k < arrayGejalaNeg.length; k++) {
                    const element = arrayGejalaNeg[k];
                    for (let l = 0; l < datas.length; l++) {
                        const element2 = datas[l];
                        if (element2.namaexternal == element.namaexternal) {
                            gejalaKosongKeun2.push(element2)
                            element.details = gejalaKosongKeun2
                        } else {
                            gejalaKosongKeun2 = []
                        }
                    }
                }
                $scope.listData2 = arrayGejalaNeg
                //END ARRAY GEJALA

                var gejalaKosongKeun3 = []
                for (let k = 0; k < arraySkala.length; k++) {
                    const element = arraySkala[k];
                    for (let l = 0; l < datas.length; l++) {
                        const element2 = datas[l];
                        if (element2.namaexternal == element.namaexternal) {
                            gejalaKosongKeun3.push(element2)
                            element.details = gejalaKosongKeun3
                        } else {
                            gejalaKosongKeun3 = []
                        }
                    }
                }
                $scope.listData3 = arraySkala
                //END ARRAY GEJALA

                //END ARRAY GEJALA

                var gejalaKosongKeun4 = []
                for (let k = 0; k < arrayTekananDaarah.length; k++) {
                    const element = arrayTekananDaarah[k];
                    for (let l = 0; l < datas.length; l++) {
                        const element2 = datas[l];
                        if (element2.namaexternal == element.namaexternal) {
                            gejalaKosongKeun4.push(element2)
                            element.details = gejalaKosongKeun4
                        } else {
                            gejalaKosongKeun4 = []
                        }
                    }
                }
                $scope.listData4 = arrayTekananDaarah
                //END ARRAY GEJALA

                var gejalaKosongKeun5 = []
                for (let k = 0; k < arrayLaju.length; k++) {
                    const element = arrayLaju[k];
                    for (let l = 0; l < datas.length; l++) {
                        const element2 = datas[l];
                        if (element2.namaexternal == element.namaexternal) {
                            gejalaKosongKeun5.push(element2)
                            element.details = gejalaKosongKeun5
                        } else {
                            gejalaKosongKeun5 = []
                        }
                    }
                }
                $scope.listData5 = arrayLaju

                var gejalaKosongKeun6 = []
                for (let k = 0; k < arrayKesadaran.length; k++) {
                    const element = arrayKesadaran[k];
                    for (let l = 0; l < datas.length; l++) {
                        const element2 = datas[l];
                        if (element2.namaexternal == element.namaexternal) {
                            gejalaKosongKeun6.push(element2)
                            element.details = gejalaKosongKeun6
                        } else {
                            gejalaKosongKeun6 = []
                        }
                    }
                }
                $scope.listData6 = arrayKesadaran


                var gejalaKosongKeun7 = []
                for (let k = 0; k < arraySuhu.length; k++) {
                    const element = arraySuhu[k];
                    for (let l = 0; l < datas.length; l++) {
                        const element2 = datas[l];
                        if (element2.namaexternal == element.namaexternal) {
                            gejalaKosongKeun7.push(element2)
                            element.details = gejalaKosongKeun7
                        } else {
                            gejalaKosongKeun7 = []
                        }
                    }
                }
                $scope.listData7 = arraySuhu
            })
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
                                if (dataLoad[i].reportdisplay != null) {
                                    // var datass = { id: dataLoad[i].emrdfk, skor: dataLoad[i].reportdisplay }
                                    // $scope.getSkor(dataLoad[i])
                                }


                            }

                            if (dataLoad[i].type == "datetime") {
                                $scope.item.obj[dataLoad[i].emrdfk] = new Date(dataLoad[i].value)
                            }
                            if (dataLoad[i].type == "textbox") {
                                $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                                if (dataLoad[i].emrdfk=='206623') 
                                $scope.skor1 =parseFloat( dataLoad[i].value)
                                if (dataLoad[i].emrdfk=='206624') 
                                    $scope.skor2 =parseFloat( dataLoad[i].value)
                                if (dataLoad[i].emrdfk=='206625') 
                                    $scope.skor3 =parseFloat( dataLoad[i].value)
                                if (dataLoad[i].emrdfk=='206626') 
                                    $scope.skor4 =parseFloat( dataLoad[i].value)
                                if (dataLoad[i].emrdfk=='206627') 
                                    $scope.skor5 =parseFloat( dataLoad[i].value)
                                if (dataLoad[i].emrdfk=='206628') 
                                    $scope.skor6 =parseFloat( dataLoad[i].value)
                                if (dataLoad[i].emrdfk=='206629') 
                                    $scope.skor7 =parseFloat( dataLoad[i].value)
                                if (dataLoad[i].emrdfk=='206630') 
                                    $scope.skor8 =parseFloat( dataLoad[i].value)
                                if (dataLoad[i].emrdfk=='206631') 
                                    $scope.skor9 =parseFloat( dataLoad[i].value)
                                if (dataLoad[i].emrdfk=='206632') 
                                    $scope.skor10 =parseFloat( dataLoad[i].value)
                                if (dataLoad[i].emrdfk=='206633') 
                                    $scope.skor11 =parseFloat( dataLoad[i].value)
                                if (dataLoad[i].emrdfk=='206634') 
                                    $scope.skor12 =parseFloat( dataLoad[i].value)

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
            // medifirstService.get('emr/get-data-dg-primary/' + $scope.cc.noregistrasi, true, true, 20).then(function (data) {                
            //     var datas = data.data[0]
            //     $scope.item.obj[206660] = {id:datas.id, text:datas.namadiagnosa}
            // })  


            $scope.skor1 = 0
            $scope.skor2 = 0
            $scope.skor3 = 0
            $scope.skor4 = 0
            $scope.skor5 = 0
            $scope.skor6 = 0
            $scope.skor7 = 0
            $scope.skor8 = 0
            $scope.skor9 = 0
            $scope.skor10 = 0
            $scope.skor11 = 0
            $scope.skor12 = 0
            $scope.skor13 = 0
            $scope.getSkor = function (stat) {

                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if (arrobj[i] == stat.id) {
                        if ($scope.item.obj[parseFloat(arrobj[i])] == true) {
                            if (stat.reportdisplay == null)
                                break
                            if (stat.satuan == 1)
                                $scope.skor1 = $scope.skor1 + parseFloat(stat.reportdisplay)
                            if (stat.satuan == 2)
                                $scope.skor2 = $scope.skor2 + parseFloat(stat.reportdisplay)
                            if (stat.satuan == 3)
                                $scope.skor3 = $scope.skor3 + parseFloat(stat.reportdisplay)
                            if (stat.satuan == 4)
                                $scope.skor4 = $scope.skor4 + parseFloat(stat.reportdisplay)
                            if (stat.satuan == 5)
                                $scope.skor5 = $scope.skor5 + parseFloat(stat.reportdisplay)
                            if (stat.satuan == 6)
                                $scope.skor6 = $scope.skor6 + parseFloat(stat.reportdisplay)
                            if (stat.satuan == 7)
                                $scope.skor7 = $scope.skor7 + parseFloat(stat.reportdisplay)
                            if (stat.satuan == 8)
                                $scope.skor8 = $scope.skor8 + parseFloat(stat.reportdisplay)
                            if (stat.satuan == 9)
                                $scope.skor9 = $scope.skor9 + parseFloat(stat.reportdisplay)
                            if (stat.satuan == 10)
                                $scope.skor10 = $scope.skor10 + parseFloat(stat.reportdisplay)
                            if (stat.satuan == 11)
                                $scope.skor11 = $scope.skor11 + parseFloat(stat.reportdisplay)
                            if (stat.satuan == 12)
                                $scope.skor12 = $scope.skor12 + parseFloat(stat.reportdisplay)
                            if (stat.satuan == 13)
                                $scope.skor13 = $scope.skor13 + parseFloat(stat.reportdisplay)

                            break
                        }
                        else {
                            if (stat.reportdisplay == null)
                                break
                            if (stat.satuan == 1)
                                $scope.skor1 = $scope.skor1 - parseFloat(stat.reportdisplay)
                            if (stat.satuan == 2)
                                $scope.skor2 = $scope.skor2 - parseFloat(stat.reportdisplay)
                            if (stat.satuan == 3)
                                $scope.skor3 = $scope.skor3 - parseFloat(stat.reportdisplay)
                            if (stat.satuan == 4)
                                $scope.skor4 = $scope.skor4 - parseFloat(stat.reportdisplay)
                            if (stat.satuan == 5)
                                $scope.skor5 = $scope.skor5 - parseFloat(stat.reportdisplay)
                            if (stat.satuan == 6)
                                $scope.skor6 = $scope.skor6 - parseFloat(stat.reportdisplay)
                            if (stat.satuan == 7)
                                $scope.skor7 = $scope.skor7 - parseFloat(stat.reportdisplay)
                            if (stat.satuan == 8)
                                $scope.skor8 = $scope.skor8 - parseFloat(stat.reportdisplay)
                            if (stat.satuan == 9)
                                $scope.skor9 = $scope.skor9 - parseFloat(stat.reportdisplay)
                            if (stat.satuan == 10)
                                $scope.skor10 = $scope.skor10 - parseFloat(stat.reportdisplay)
                            if (stat.satuan == 11)
                                $scope.skor11 = $scope.skor11 - parseFloat(stat.reportdisplay)
                            if (stat.satuan == 12)
                                $scope.skor12 = $scope.skor12 - parseFloat(stat.reportdisplay)
                            if (stat.satuan == 13)
                                $scope.skor13 = $scope.skor13 - parseFloat(stat.reportdisplay)
                        }
                    }
                }

                $scope.item.obj[206623] = $scope.skor1
                $scope.item.obj[206624] = $scope.skor2
                $scope.item.obj[206625] = $scope.skor3
                $scope.item.obj[206626] = $scope.skor4
                $scope.item.obj[206627] = $scope.skor5
                $scope.item.obj[206628] = $scope.skor6
                $scope.item.obj[206629] = $scope.skor7
                $scope.item.obj[206630] = $scope.skor8
                $scope.item.obj[206631] = $scope.skor9
                $scope.item.obj[206632] = $scope.skor10
                $scope.item.obj[206633] = $scope.skor11
                $scope.item.obj[206634] = $scope.skor12
                // $scope.item.obj[206662] = $scope.skor13
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
                    'Skor Early Warning System Anak ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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