define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AsesmenUlangRiNyeriUmumCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 466
            var dataLoad = []
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
             })
            medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 466).then(function (e) {

                var datas = e.data.kolom4

                var detail = []
                var arrayShiftJaga= []
                var arrayShiftJaga2 = []
                var arrayShiftJaga3= []
                var arrayShiftJaga4=[]
                var arrayShiftJaga5=[]
                var arrayShiftJaga6=[]
                var sama = false
                for (let i = 0; i < datas.length; i++) {
                    const element = datas[i];
                    sama = false

                    // ARRAY GEJALA
                    if (element.kodeexternal == 'shiftjaga') {
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
                    if (element.kodeexternal == 'shiftjaga2') {
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
                     // ARRAY GEJALA
                    if (element.kodeexternal == 'shiftjaga4') {
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
                    if (element.kodeexternal == 'shiftjaga5') {
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
                    if (element.kodeexternal == 'shiftjaga6') {
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

               

                


            })

            $scope.listRiwayatKesehatan = [
                
                {
                    "id": 7, "nama": "Keluhan Nyeri ",
                    "detail": [
                        { "id": 113781, "nama": "Tidak Ada", "type": "checkbox" },
                        { "id": 113782, "nama": "Ada , lokasi :", "type": "checkbox" },
                        { "id": 113783, "nama": "Ada , jelaskan :", "type": "textbox" },
                    ]
                },
            ]
            $scope.listSkorNRC = [{
                "id": 8, "nama": "Score ",
                "detail": [
                    { "id": 113765, "nama": "0 = Tidak Nyeri", "type": "checkbox" },
                    { "id": 113766, "nama": "1 - 3 = Nyeri Ringan", "type": "checkbox"},
                    { "id": 113767, "nama": "4 - 6 = Nyeri Sedang", "type": "checkbox" },
                    { "id": 113768, "nama": "7 - 10 = Nyeri Berat", "type": "checkbox"},
                ]
            }]
            $scope.listSkorWong = [{
                "id": 9, "nama": "Score ",
                "detail": [
                    { "id": 113769, "nama": "0 - 1= Tidak Ada Nyeri", "type": "checkbox"},
                    { "id": 113770, "nama": "2 - 3= Sedikit Nyeri", "type": "checkbox" },
                    { "id": 113771, "nama": "4 - 5 Cukup Nyeri", "type": "checkbox"},
                    { "id": 113772, "nama": "6 - 7= Lumayan Nyeri", "type": "checkbox"},
                    { "id": 113773, "nama": "8 - 9= Sangat Nyeri", "type": "checkbox"},
                    { "id": 113774, "nama": "10= Amat Sangat Nyeri", "type": "checkbox"},
                ]
            }]
            $scope.listNyeriAnak = [
                {
                    "id": 10, "nama": "Hurts", "detail": 
            [
                    { "id": 113775, "nama": "No Hurt", "descNilai": 0 },
                    { "id": 113776, "nama": "Hurts Little Bit", "descNilai": 2 }, 
                    { "id": 113777, "nama": "Hurts Little More", "descNilai": 4 },
                    { "id": 113778, "nama": "Hurts Even More", "descNilai": 6 }, 
                    { "id": 113779, "nama": "Hurts Whole Lot", "descNilai": 8 },
                    { "id": 113780, "nama": "Hurts whorts", "descNilai": 10 }]
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
                $scope.item.obj[113762]=$scope.now
                $scope.item.obj[113763]=$scope.now
                $scope.item.obj[113764]={ value: $scope.cc.iddpjp, text: $scope.cc.dokterdpjp }
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
            $scope.$watch('item.obj[113781]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[113781] !=null && $scope.item.obj[113783]==undefined){
                          $scope.item.obj[113783] ="-"
                      }else{$scope.item.obj[113783] =null}

                       
                    }
                })
            $scope.$watch('item.obj[114456]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai == 0) {
                    $scope.item.obj[113765] = true
                    $scope.item.obj[113766] = false
                    $scope.item.obj[113767] = false
                    $scope.item.obj[113768] = false
                }
                if (nilai >= 1 && nilai <= 3) {
                    $scope.item.obj[113765] = false
                    $scope.item.obj[113766] = true
                    $scope.item.obj[113767] = false
                    $scope.item.obj[113768] = false
                }
                if (nilai >= 4 && nilai <= 6) {
                    $scope.item.obj[113765] = false
                    $scope.item.obj[113766] = false
                    $scope.item.obj[113767] = true
                    $scope.item.obj[113768] = false
                }
                if (nilai >= 7 && nilai <= 10) {
                    $scope.item.obj[113765] = false
                    $scope.item.obj[113766] = false
                    $scope.item.obj[113767] = false
                    $scope.item.obj[113768] = true
                }
            });

            $scope.getSkalaNyeri = function (data, stat) {
                $scope.activeStatus = stat.descNilai
                var nilai = stat.descNilai
                if (nilai >= 0 && nilai <= 1) {
                    $scope.item.obj[113769] = true
                    $scope.item.obj[113770] = false
                    $scope.item.obj[113771] = false
                    $scope.item.obj[113772] = false
                    $scope.item.obj[113773] = false
                    $scope.item.obj[113774] = false
                }
                if (nilai >= 2 && nilai <= 3) {
                    $scope.item.obj[113769] = false
                    $scope.item.obj[113770] = true
                    $scope.item.obj[113771] = false
                    $scope.item.obj[113772] = false
                    $scope.item.obj[113773] = false
                    $scope.item.obj[113774] = false
                }
                if (nilai >= 4 && nilai <= 5) {
                    $scope.item.obj[113769] = false
                    $scope.item.obj[113770] = false
                    $scope.item.obj[113771] = true
                    $scope.item.obj[113772] = false
                    $scope.item.obj[113773] = false
                    $scope.item.obj[113774] = false
                }
                if (nilai >= 6 && nilai <= 7) {
                    $scope.item.obj[113769] = false
                    $scope.item.obj[113770] = false
                    $scope.item.obj[113771] = false
                    $scope.item.obj[113772] = true
                    $scope.item.obj[113773] = false
                    $scope.item.obj[113774] = false
                }
                if (nilai >= 8 && nilai <= 9) {
                    $scope.item.obj[113769] = false
                    $scope.item.obj[113770] = false
                    $scope.item.obj[113771] = false
                    $scope.item.obj[113772] = false
                    $scope.item.obj[113773] = true
                    $scope.item.obj[113774] = false
                }

                if (nilai == 10) {
                    $scope.item.obj[113769] = false
                    $scope.item.obj[113770] = false
                    $scope.item.obj[113771] = false
                    $scope.item.obj[113772] = false
                    $scope.item.obj[113773] = false
                    $scope.item.obj[113774] = true
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
                    if($scope.item.obj[parseInt(arrobj[i])] instanceof Date){
                       $scope.item.obj[parseInt(arrobj[i])]= moment($scope.item.obj[parseInt(arrobj[i])]).format('YYYY-MM-DD HH:mm')
                    }
                    arrSave.push({ id: arrobj[i], values: $scope.item.obj[parseInt(arrobj[i])] })
                }
                $scope.cc.jenisemr = 'umum'
                var jsonSave = {
                    head: $scope.cc,
                    data: arrSave
                }
                medifirstService.post('emr/save-emr-dinamis', jsonSave).then(function (e) {

                    $rootScope.loadRiwayat()
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,  
                    'Asesmen Ulang R I Nyeri Umum ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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