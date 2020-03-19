define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('WhoAssistCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {

            var isNotClick = true;
            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 138
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
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
            })
            medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 325).then(function (e) {

                var datas = e.data.kolom4

                var detail = []
                var arrayShiftJaga = []
                var arrayShiftJaga2 = []
                var arrayShiftJaga3 = []
                var arrayShiftJaga4 = []
                var arrayShiftJaga5 = []
                var arrayShiftJaga6 = []
                var arrayShiftJaga7 = []
                var arrayShiftJaga8 = []
                var arrayShiftJaga11 = []
                var sama = false
                for (let i = 0; i < datas.length; i++) {
                    const element = datas[i];
                    sama = false

                    // ARRAY GEJALA
                    if (element.kodeexternal == 'Pertanyaan1') {
                        for (let z = 0; z < arrayShiftJaga.length; z++) {
                            const element2 = arrayShiftJaga[z];
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
                            arrayShiftJaga.push(datax)
                        }
                    }
                    //END ARRAY GEJALA

                    // ARRAY GEJALA
                    if (element.kodeexternal == 'Pertanyaan2') {
                        for (let z = 0; z < arrayShiftJaga2.length; z++) {
                            const element2 = arrayShiftJaga2[z];
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
                            arrayShiftJaga2.push(datax)
                        }
                    }
                    //END ARRAY GEJALA
                    // ARRAY GEJALA
                    if (element.kodeexternal == 'Pertanyaan3') {
                        for (let z = 0; z < arrayShiftJaga3.length; z++) {
                            const element2 = arrayShiftJaga3[z];
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
                            arrayShiftJaga3.push(datax)
                        }
                    }
                    //END ARRAY GEJALA
                    // ARRAY GEJALA
                    if (element.kodeexternal == 'Pertanyaan4') {
                        for (let z = 0; z < arrayShiftJaga4.length; z++) {
                            const element2 = arrayShiftJaga4[z];
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
                            arrayShiftJaga4.push(datax)
                        }
                    }
                    //END ARRAY GEJALA
                    // ARRAY GEJALA
                    if (element.kodeexternal == 'Pertanyaan5') {
                        for (let z = 0; z < arrayShiftJaga5.length; z++) {
                            const element2 = arrayShiftJaga5[z];
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
                            arrayShiftJaga5.push(datax)
                        }
                    }
                    //END ARRAY GEJALA
                    // ARRAY GEJALA
                    if (element.kodeexternal == 'Pertanyaan6') {
                        for (let z = 0; z < arrayShiftJaga6.length; z++) {
                            const element2 = arrayShiftJaga6[z];
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
                            arrayShiftJaga6.push(datax)
                        }
                    }
                    //END ARRAY GEJALA
                    // ARRAY GEJALA
                    if (element.kodeexternal == 'Pertanyaan7') {
                        for (let z = 0; z < arrayShiftJaga7.length; z++) {
                            const element2 = arrayShiftJaga7[z];
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
                            arrayShiftJaga7.push(datax)
                        }
                    }
                    //END ARRAY GEJALA
                    // ARRAY GEJALA
                    if (element.kodeexternal == 'Pertanyaan8') {
                        for (let z = 0; z < arrayShiftJaga8.length; z++) {
                            const element2 = arrayShiftJaga8[z];
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
                            arrayShiftJaga8.push(datax)
                        }
                    }
                    //END ARRAY GEJALA
                    if (element.kodeexternal == 'Pertanyaan11') {
                        for (let z = 0; z < arrayShiftJaga11.length; z++) {
                            const element2 = arrayShiftJaga11[z];
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
                            arrayShiftJaga11.push(datax)
                        }
                    }

                }
                // ARRAY GEJALA
                var gejalaKosongKeun = []
                for (let k = 0; k < arrayShiftJaga.length; k++) {
                    const element = arrayShiftJaga[k];
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
                $scope.listData1 = arrayShiftJaga


                // ARRAY GEJALA
                var gejalaKosongKeun = []
                for (let k = 0; k < arrayShiftJaga2.length; k++) {
                    const element = arrayShiftJaga2[k];
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
                $scope.listData2 = arrayShiftJaga2

                $scope.concat = $scope.listData1.concat($scope.listData2);

                // ARRAY GEJALA
                var gejalaKosongKeun = []
                for (let k = 0; k < arrayShiftJaga3.length; k++) {
                    const element = arrayShiftJaga3[k];
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
                $scope.listData3 = arrayShiftJaga3

                // ARRAY GEJALA
                var gejalaKosongKeun = []
                for (let k = 0; k < arrayShiftJaga4.length; k++) {
                    const element = arrayShiftJaga4[k];
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
                $scope.listData4 = arrayShiftJaga4

                // ARRAY GEJALA
                var gejalaKosongKeun = []
                for (let k = 0; k < arrayShiftJaga5.length; k++) {
                    const element = arrayShiftJaga5[k];
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
                $scope.listData5 = arrayShiftJaga5

                // ARRAY GEJALA
                var gejalaKosongKeun = []
                for (let k = 0; k < arrayShiftJaga6.length; k++) {
                    const element = arrayShiftJaga6[k];
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
                $scope.listData6 = arrayShiftJaga6

                // ARRAY GEJALA
                var gejalaKosongKeun = []
                for (let k = 0; k < arrayShiftJaga7.length; k++) {
                    const element = arrayShiftJaga7[k];
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
                $scope.listData7 = arrayShiftJaga7

                // ARRAY GEJALA
                var gejalaKosongKeun = []
                for (let k = 0; k < arrayShiftJaga8.length; k++) {
                    const element = arrayShiftJaga8[k];
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
                $scope.listData8 = arrayShiftJaga8

                // ARRAY GEJALA
                var gejalaKosongKeun = []
                for (let k = 0; k < arrayShiftJaga11.length; k++) {
                    const element = arrayShiftJaga11[k];
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
                $scope.listData11 = arrayShiftJaga11



            })
            
            var chekedd = false
            var chacePeriode = cacheHelper.get('cacheNomorEMR');
            if (chacePeriode != undefined) {
                nomorEMR = chacePeriode[0]
                $scope.cc.norec_emr = nomorEMR

                if(nomorEMR!='-'){
                    cacheHelper.set('cacheEMR_PANEC', nomorEMR)
                }
                $scope.totalSkor =0
                medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + nomorEMR + "&emrfk=" + $scope.cc.emrfk, true).then(function (dat) {
                    $scope.item.obj = []
                    $scope.item.obj2 = []
                    $scope.item.obj[13303]=$scope.now
                    $scope.item.obj[13304]={ value: $scope.cc.iddpjp, text: $scope.cc.dokterdpjp }
                    dataLoad = dat.data.data
                    for (var i = 0; i <= dataLoad.length - 1; i++) {
                        if (parseFloat($scope.cc.emrfk) == dataLoad[i].emrfk) {
                            if (dataLoad[i].type == "textbox") {
                                $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                                 if (dataLoad[i].emrdfk=='9084') 
                            $scope.totalSkor =parseFloat( dataLoad[i].value)
                            }
                            // if (dataLoad[i].type == "checkbox") {
                            //     chekedd = false
                            //     if (dataLoad[i].value == '1') {
                            //         chekedd = true
                            //     }
                            //     $scope.item.obj[dataLoad[i].emrdfk] = chekedd
                            //     // if (dataLoad[i].emrdfk >= 3122 && dataLoad[i].emrdfk <= 3148) {
                            //     //     var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                            //     //     $scope.getSkor2(datass)
                            //     // }
                            //     // // if (dataLoad[i].reportdisplay != null) {
                            //     // //     var datass = { id: dataLoad[i].emrdfk, skor: dataLoad[i].reportdisplay }
                            //     // //     $scope.getSkor(datass)
                            //     // }


                            // }

                            if (dataLoad[i].type == "checkbox") {
                            chekedd = false
                            if (dataLoad[i].value == '1') {
                                chekedd = true
                            }
                            $scope.item.obj[dataLoad[i].emrdfk] = chekedd
                            if(dataLoad[i].reportdisplay){
                                $scope.getSkor({id:dataLoad[i].emrdfk,reportdisplay:dataLoad[i].reportdisplay,caption:dataLoad[i].caption,nourut:dataLoad[i].nourut},'')
                            }
                            // if (dataLoad[i].emrdfk >= 7590 && dataLoad[i].emrdfk <= 7593 && chekedd) {
                            //     $scope.getSkalaNyeri(1, { reportdisplay: dataLoad[i].reportdisplay })
                            // }



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
                $scope.cc.dokterdpjp = chacePeriode[16]
                $scope.cc.iddpjp = chacePeriode[17]
                if (nomorEMR == '-') {
                    $scope.cc.norec_emr = '-'
                } else {
                    $scope.cc.norec_emr = nomorEMR
                }
            }



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
            $scope.getSkor = function (stat, skor) {
                var arrobj = Object.keys($scope.item.obj)
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if (arrobj[i] == stat.id) {
                        if ($scope.item.obj[parseFloat(arrobj[i])] == true) {
                            if (stat.reportdisplay == '')
                                break
                            // $scope.totalSkorAses = $scope.totalSkorAses + parseFloat(skor.reportdisplay)
                            if (stat.nourut == 1)
                                $scope.skor1 = $scope.skor1 + parseFloat(stat.reportdisplay)
                            if (stat.nourut == 2)
                                $scope.skor2 = $scope.skor2 + parseFloat(stat.reportdisplay)
                            if (stat.nourut == 3)
                                $scope.skor3 = $scope.skor3 + parseFloat(stat.reportdisplay)
                            if (stat.nourut == 4)
                                $scope.skor4 = $scope.skor4 + parseFloat(stat.reportdisplay)
                            if (stat.nourut == 5)
                                $scope.skor5 = $scope.skor5 + parseFloat(stat.reportdisplay)
                            if (stat.nourut == 6)
                                $scope.skor6 = $scope.skor6 + parseFloat(stat.reportdisplay)
                            if (stat.nourut == 7)
                                $scope.skor7 = $scope.skor7 + parseFloat(stat.reportdisplay)
                            if (stat.nourut == 8)
                                $scope.skor8 = $scope.skor8 + parseFloat(stat.reportdisplay)
                            if (stat.nourut == 9)
                                $scope.skor9 = $scope.skor9 + parseFloat(stat.reportdisplay)
                            if (stat.nourut == 0)
                                $scope.skor10 = $scope.skor10 + parseFloat(stat.reportdisplay)
                            break
                        } else {
                            if (stat.reportdisplay == '')
                                break
                            if (stat.nourut == 1)
                                $scope.skor1 = $scope.skor1 - parseFloat(stat.reportdisplay)
                            if (stat.nourut == 2)
                                $scope.skor2 = $scope.skor2 - parseFloat(stat.reportdisplay)
                            if (stat.nourut == 3)
                                $scope.skor3 = $scope.skor3 - parseFloat(stat.reportdisplay)
                            if (stat.nourut == 4)
                                $scope.skor4 = $scope.skor4 - parseFloat(stat.reportdisplay)
                            if (stat.nourut == 5)
                                $scope.skor5 = $scope.skor5 - parseFloat(stat.reportdisplay)
                            if (stat.nourut == 6)
                                $scope.skor6 = $scope.skor6 - parseFloat(stat.reportdisplay)
                            if (stat.nourut == 7)
                                $scope.skor7 = $scope.skor7 - parseFloat(stat.reportdisplay)
                            if (stat.nourut == 8)
                                $scope.skor8 = $scope.skor8 - parseFloat(stat.reportdisplay)
                            if (stat.nourut == 9)
                                $scope.skor9 = $scope.skor9 - parseFloat(stat.reportdisplay)
                            if (stat.nourut == 0)
                                $scope.skor10 = $scope.skor10 - parseFloat(stat.reportdisplay)
                            break
                        }
                    }
                }
                $scope.skors1 = $scope.skor1
                $scope.skors2 = $scope.skor2
                $scope.skors3 = $scope.skor3
                $scope.skors4 = $scope.skor4
                $scope.skors5 = $scope.skor5
                $scope.skors6 = $scope.skor6
                $scope.skors7 = $scope.skor7
                $scope.skors8 = $scope.skor8
                $scope.skors9 = $scope.skor9
                $scope.skors10 = $scope.skor10
            }

            $scope.getSkorOld = function (stat) {

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
                $scope.item.obj[9084] = $scope.totalSkor //+ $scope.totalSkor2
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
            $scope.Batal = function () {
                $scope.item.obj = []
                $scope.item.obj2 = []
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
                    'WhoAssist ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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