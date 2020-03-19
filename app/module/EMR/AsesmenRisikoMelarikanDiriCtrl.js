define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AsesmenRisikoMelarikanDiriCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 180
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

            medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 180).then(function (e) {

                var datas = e.data.kolom4

                var detail = []
                var arrayShiftJaga = []
                var arrayShiftJaga2 = []
                var arrayShiftJaga3 = []
                var sama = false
                for (let i = 0; i < datas.length; i++) {
                    const element = datas[i];
                    sama = false

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


            $scope.listTanggal = [
                { id: 11306 },
                { id: 11307 },
                { id: 11308 },
                { id: 11309 },
                { id: 11310 },
                { id: 11311 }
            ]

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
                $scope.item.obj[11301]=$scope.cc.tglregistrasi
                $scope.item.obj[11303]={ value: $scope.cc.iddpjp, text: $scope.cc.dokterdpjp }
                $scope.item.obj[11302]={value: $scope.cc.objectruanganfk, text : $scope.cc.namaruangan}
                dataLoad = dat.data.data
                
                medifirstService.get("emr/get-nilai-statis-igd?noregistrasi=" + $scope.cc.noregistrasi + "&objectidawal=3095&objectidakhir=3121&idemr=125", true).then(function (datas) {
                    if (datas.data.data.length>0){
                        $scope.item.obj[11798]=datas.data.data[0].nilai
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
                                $scope.skor9 = $scope.skor9 + parseFloat(stat.reportdisplay)
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
                { id: 11798 },
                { id: 11799 },
                { id: 11800 },
                { id: 11801 },
                { id: 11802 },
                { id: 11803 },
                { id: 11804 },
                { id: 11805 },
                { id: 11806 },
                { id: 11807 },
                { id: 11808 },
                { id: 11809 },
                { id: 11810 },
                { id: 11811 },
                { id: 11812 },
                { id: 11813 },
                { id: 11814 },
                { id: 11815 },
            ]
            $scope.listTotalSkor = [
                { id: 11816 },
                { id: 11817 },
                { id: 11818 },
                { id: 11819 },
                { id: 11820 },
                { id: 11821 },
                { id: 11822 },
                { id: 11823 },
                { id: 11824 },
                { id: 11825 },
                { id: 11826 },
                { id: 11827 },
                { id: 11828 },
                { id: 11829 },
                { id: 11830 },
                { id: 11831 },
                { id: 11832 },
                { id: 11833 },
            ]
            $scope.listInitial = [
                { id: 11834 },
                { id: 11835 },
                { id: 11836 },
                { id: 11837 },
                { id: 11838 },
                { id: 11839 },
                { id: 11840 },
                { id: 11841 },
                { id: 11842 },
                { id: 11843 },
                { id: 11844 },
                { id: 11845 },
                { id: 11846 },
                { id: 11847 },
                { id: 11848 },
                { id: 11849 },
                { id: 11850 },
                { id: 11851 },
            ]
            $scope.listParaf = [
                { id: 11852 },
                { id: 11853 },
                { id: 11854 },
                { id: 11855 },
                { id: 11856 },
                { id: 11857 },
                { id: 11858 },
                { id: 11859 },
                { id: 11860 },
                { id: 11861 },
                { id: 11862 },
                { id: 11863 },
                { id: 11864 },
                { id: 11865 },
                { id: 11866 },
                { id: 11867 },
                { id: 11868 },
                { id: 11869 },
            ]



            $scope.listRisikoJatuhSkor = [
                { id: 11870, nama: 'Rendah ( < 7 )' },
                { id: 11871, nama: 'Sedang ( 7 - 14 )' },
                { id: 11872, nama: 'Tinggi ( > 14 )' },
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

                    $rootScope.loadRiwayat()
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,  
                    'Asesmen Ulang R I ( Risiko Melarikan Diri ) ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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