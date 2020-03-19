define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AsesmenFisik5Ctrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.listTanggal = []
            $scope.listTotalSkor =[]
            $scope.listInitial = []
            $scope.listParaf =[]
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 265
            var dataLoad = []
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
            })
            medifirstService.getPart('emr/get-datacombo-part-ruangan', true, true, 20).then(function (data) {
                $scope.listRuangan = data
            })
            medifirstService.getPart('emr/get-datacombo-part-diagnosa', true, true, 20).then(function (data) {
                $scope.listDiagnosa = data
            })

            medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 265).then(function (e) {

                var datas = e.data.kolom4

                var detail = []
                var arrayShiftJaga = []
                var arrayShiftJaga2 = []
                var arrayShiftJaga3 = []
                var sama = false
                for (let i = 0; i < datas.length; i++) {
                    const element = datas[i];
                    sama = false
                    if (element.kodeexternal == 'tanggal') {
                        $scope.listTanggal.push({ id: element.id })
                    }
                    if (element.kodeexternal == 'totalskor') {
                        $scope.listTotalSkor.push({ id: element.id })
                    }
                    if (element.kodeexternal == 'initial') {
                        $scope.listInitial.push({ id: element.id })
                    }
                    if (element.kodeexternal == 'paraf') {
                        $scope.listParaf.push({ id: element.id })
                    }

                    // ARRAY GEJALA
                    if (element.kodeexternal == 'tabel') {
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
                    if (element.kodeexternal == 'tabel1') {
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
                    if (element.kodeexternal == 'shiftjaga3') {
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

            })



            // $scope.listTanggal = [
            //     { id: 62933 },
            //     { id: 62934 },
            //     { id: 62935 },
            //     { id: 62936 },
            //     { id: 62937 },
            //     { id: 62938 }
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
                $scope.cc.dokterdpjp = chacePeriode[16]
                $scope.cc.iddpjp = chacePeriode[17]
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
                $scope.item.obj[64647]=$scope.cc.tglregistrasi
                $scope.item.obj[64649]={ value: $scope.cc.iddpjp, text: $scope.cc.dokterdpjp }
                $scope.item.obj[64648]={value: $scope.cc.objectruanganfk, text : $scope.cc.namaruangan}
                dataLoad = dat.data.data
                
                medifirstService.get("emr/get-nilai-statis-igd?noregistrasi=" + $scope.cc.noregistrasi + "&objectidawal=3037&objectidakhir=3063&idemr=124", true).then(function (datas) {
                    if (datas.data.data.length>0){
                        $scope.item.obj[65144]=datas.data.data[0].nilai
                    }
                })
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
                            if(dataLoad[i].reportdisplay){
                                $scope.getSkor({id:dataLoad[i].emrdfk,reportdisplay:dataLoad[i].reportdisplay,caption:dataLoad[i].caption},'')
                            }
                            // if (dataLoad[i].emrdfk >= 7590 && dataLoad[i].emrdfk <= 7593 && chekedd) {
                            //     $scope.getSkalaNyeri(1, { reportdisplay: dataLoad[i].reportdisplay })
                            // }



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
            $scope.skor14 = 0
            $scope.skor15 = 0
            $scope.skor16 = 0
            $scope.skor17 = 0
            $scope.skor18 = 0
             $scope.getSkor =0

            $scope.getSkor = function (stat, skor) {
                var arrobj = Object.keys($scope.item.obj)
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if (arrobj[i] == stat.id) {
                        if ($scope.item.obj[parseFloat(arrobj[i])] == true) {
                            if (stat.reportdisplay == '')
                                break
                            // $scope.totalSkorAses = $scope.totalSkorAses + parseFloat(skor.reportdisplay)
                            if (stat.caption == 1)
                                $scope.skor1 = $scope.skor1 + parseFloat(stat.reportdisplay)
                            if (stat.caption == 2)
                                $scope.skor2 = $scope.skor2 + parseFloat(stat.reportdisplay)
                            if (stat.caption == 3)
                                $scope.skor3 = $scope.skor3 + parseFloat(stat.reportdisplay)
                            if (stat.caption == 4)
                                $scope.skor4 = $scope.skor4 + parseFloat(stat.reportdisplay)
                            if (stat.caption == 5)
                                $scope.skor5 = $scope.skor5 + parseFloat(stat.reportdisplay)
                            if (stat.caption == 6)
                                $scope.skor6 = $scope.skor6 + parseFloat(stat.reportdisplay)
                            if (stat.caption == 7)
                                $scope.skor7 = $scope.skor7 + parseFloat(stat.reportdisplay)
                            if (stat.caption == 8)
                                $scope.skor8 = $scope.skor8 + parseFloat(stat.reportdisplay)
                            if (stat.caption == 9)
                                $scope.skor9 = $scope.skor8 + parseFloat(stat.reportdisplay)
                            if (stat.caption == 10)
                                $scope.skor10 = $scope.skor10 + parseFloat(stat.reportdisplay)
                            if (stat.caption == 11)
                                $scope.skor11 = $scope.skor11 + parseFloat(stat.reportdisplay)
                            if (stat.caption == 12)
                                $scope.skor12 = $scope.skor12 + parseFloat(stat.reportdisplay)
                            if (stat.caption == 13)
                                $scope.skor13 = $scope.skor13 + parseFloat(stat.reportdisplay)
                            if (stat.caption == 14)
                                $scope.skor14 = $scope.skor14 + parseFloat(stat.reportdisplay)
                            if (stat.caption == 15)
                                $scope.skor15 = $scope.skor15 + parseFloat(stat.reportdisplay)
                            if (stat.caption == 16)
                                $scope.skor16 = $scope.skor16 + parseFloat(stat.reportdisplay)
                            if (stat.caption == 17)
                                $scope.skor17 = $scope.skor17 + parseFloat(stat.reportdisplay)
                            if (stat.caption == 18)
                                $scope.skor18 = $scope.skor18 + parseFloat(stat.reportdisplay)
                            break
                        } else {
                            if (stat.reportdisplay == '')
                                break
                            if (stat.caption == 1)
                                $scope.skor1 = $scope.skor1 - parseFloat(stat.reportdisplay)
                            if (stat.caption == 2)
                                $scope.skor2 = $scope.skor2 - parseFloat(stat.reportdisplay)
                            if (stat.caption == 3)
                                $scope.skor3 = $scope.skor3 - parseFloat(stat.reportdisplay)
                            if (stat.caption == 4)
                                $scope.skor4 = $scope.skor4 - parseFloat(stat.reportdisplay)
                            if (stat.caption == 5)
                                $scope.skor5 = $scope.skor5 - parseFloat(stat.reportdisplay)
                            if (stat.caption == 6)
                                $scope.skor6 = $scope.skor6 - parseFloat(stat.reportdisplay)
                            if (stat.caption == 7)
                                $scope.skor7 = $scope.skor7 - parseFloat(stat.reportdisplay)
                            if (stat.caption == 8)
                                $scope.skor8 = $scope.skor8 - parseFloat(stat.reportdisplay)
                            if (stat.caption == 9)
                                $scope.skor9 = $scope.skor9 - parseFloat(stat.reportdisplay)
                            if (stat.caption == 10)
                                $scope.skor10 = $scope.skor10 - parseFloat(stat.reportdisplay)
                            if (stat.caption == 11)
                                $scope.skor11 = $scope.skor11 - parseFloat(stat.reportdisplay)
                            if (stat.caption == 12)
                                $scope.skor12 = $scope.skor12 - parseFloat(stat.reportdisplay)
                            if (stat.caption == 13)
                                $scope.skor13 = $scope.skor13 - parseFloat(stat.reportdisplay)
                            if (stat.caption == 14)
                                $scope.skor14 = $scope.skor14 - parseFloat(stat.reportdisplay)
                            if (stat.caption == 15)
                                $scope.skor15 = $scope.skor15 - parseFloat(stat.reportdisplay)
                            if (stat.caption == 16)
                                $scope.skor16 = $scope.skor16 - parseFloat(stat.reportdisplay)
                            if (stat.caption == 17)
                                $scope.skor17 = $scope.skor17 - parseFloat(stat.reportdisplay)
                            if (stat.caption == 18)
                                $scope.skor18 = $scope.skor18 - parseFloat(stat.reportdisplay)
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
                $scope.skors11 = $scope.skor11
                $scope.skors12 = $scope.skor12
                $scope.skors13 = $scope.skor13
                $scope.skors14 = $scope.skor14
                $scope.skors15 = $scope.skor15
                $scope.skors16 = $scope.skor16
                $scope.skors17 = $scope.skor17
                $scope.skors18 = $scope.skor18
            }
            $scope.Batal = function () {
                $scope.item.obj = []
            }
            $scope.kembali = function () {
                $rootScope.showRiwayat()
            }
            $scope.listSkorStatis = [
                { id: 65144 },
                { id: 65144 },
                { id: 65144 },
                { id: 65144 },
                { id: 65144 },
                { id: 65144 },
                { id: 65144 },
                { id: 65144 },
                { id: 65144 },
                { id: 65144 },
                { id: 65144 },
                { id: 65144 },
                { id: 65144 },
                { id: 65144 },
                { id: 65144 },
                { id: 65144 },
                { id: 65144 },
                { id: 65144 },
            ]
            // $scope.listTotalSkor = [
            //     { id: 11243 },
            //     { id: 11244 },
            //     { id: 11245 },
            //     { id: 11246 },
            //     { id: 11247 },
            //     { id: 11248 },
            //     { id: 11249 },
            //     { id: 11250 },
            //     { id: 11251 },
            //     { id: 11252 },
            //     { id: 11253 },
            //     { id: 11254 },
            //     { id: 11255 },
            //     { id: 11256 },
            //     { id: 11257 },
            //     { id: 11258 },
            //     { id: 11259 },
            //     { id: 11260 },
            // ]
            // $scope.listInitial = [
            //     { id: 11261 },
            //     { id: 11262 },
            //     { id: 11263 },
            //     { id: 11264 },
            //     { id: 11265 },
            //     { id: 11266 },
            //     { id: 11267 },
            //     { id: 11268 },
            //     { id: 11269 },
            //     { id: 11270 },
            //     { id: 11272 },
            //     { id: 11273 },
            //     { id: 11274 },
            //     { id: 11275 },
            //     { id: 11276 },
            //     { id: 11277 },
            //     { id: 11278 },
            //     { id: 11279 },
            // ]
            // $scope.listParaf = [
            //     { id: 11280 },
            //     { id: 11281 },
            //     { id: 11282 },
            //     { id: 11283 },
            //     { id: 11284 },
            //     { id: 11285 },
            //     { id: 11286 },
            //     { id: 11287 },
            //     { id: 11288 },
            //     { id: 11289 },
            //     { id: 11290 },
            //     { id: 11291 },
            //     { id: 11292 },
            //     { id: 11293 },
            //     { id: 11294 },
            //     { id: 11295 },
            //     { id: 11296 },
            //     { id: 11297 },
            // ]



            $scope.listRisikoJatuhSkor = [
                { id: 65217, nama: 'Rendah ( < 7 )' },
                { id: 65218, nama: 'Sedang ( 7 - 14 )'  },
                { id: 65219, nama: 'Tinggi ( > 14 )' },
            ]


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
                    'Asesmen Ulang R I ( Risiko Kekerasan Fisik )' + ' dengan No EMR - ' + e.data.data.noemr + ' pada No Registrasi '
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