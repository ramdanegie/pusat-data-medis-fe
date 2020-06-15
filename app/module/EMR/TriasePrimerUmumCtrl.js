define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('TriasePrimerUmumCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 450
            var dataLoad = []
            $scope.item.objcbo= []
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
            })
            $scope.listCaraMasuk = [
                {
                    "id": 1, "nama": "Cara Masuk",
                    "detail": [
                        { "id": 112813, "nama": "Datang Sendiri", "type": "checkbox" },
                        { "id": 112814, "nama": "Dirujuk Oleh :", "type": "checkbox" },
                        { "id": 112815, "nama": "", "type": "textbox" },
                    ]
                },
                {
                    "id": 2, "nama": "Menghubungi IGD",
                    "detail": [
                        { "id": 112816, "nama": "Tidak ", "type": "checkbox" },
                        { "id": 112817, "nama": "Ya, Tgl /Jam :", "type": "checkbox" },
                        { "id": 112818, "nama": "", "type": "textbox" },

                    ]
                },
                {
                    "id": 3, "nama": "Dibawa Ke IGD menggunakan",
                    "detail": [
                        { "id": 112819, "nama": "Kendaraan Pribadi", "type": "checkbox" },
                        { "id": 112820, "nama": "Mobil Polisi", "type": "checkbox" },
                        { "id": 112821, "nama": "Ambulance", "type": "checkbox" },
                        { "id": 112822, "nama": "Lain-lain :", "type": "checkbox" },
                        { "id": 112823, "nama": "", "type": "textbox" },
                    ]
                },
                {
                    "id": 4, "nama": "Kecelakaan",
                    "detail": [
                        { "id": 112824, "nama": "Tidak", "type": "checkbox" },
                        { "id": 112825, "nama": "Ya, tgl/jam :", "type": "checkbox" },
                        { "id": 112826, "nama": "", "type": "textbox" },

                    ]
                },
                {
                    "id": 4, "nama": "TKP :",
                    "detail": [

                        { "id": 112827, "nama": "", "type": "textbox" },

                    ]
                },

            ]

            $scope.listUmur = [
                { id: 112843, nama: '< 3 bl' },
                { id: 112844, nama: '> 180' },
                { id: 112845, nama: '> 50' },
                { id: 112846, nama: '38C' },
                // { id: 9034, nama: '> 92%' }
            ]
            $scope.listData2 = [
                { id: 112848, nama: '3 bl - 3th' },
                { id: 112849, nama: '> 160' },
                { id: 112850, nama: '> 40' },

            ]
            $scope.listData3 = [
                { id: 112851, nama: '3 - 8th' },
                { id: 112852, nama: '> 140' },
                { id: 112853, nama: '> 30' },

            ]
            $scope.listData4 = [
                { id: 9041, nama: '> 8 th' },
                { id: 9042, nama: '> 100' },
                { id: 9043, nama: '> 20' },

            ]
            $scope.listStabil = [
                { id: 112853, nama: 'Jalan Nafas Bebas' },
                { id: 112854, nama: 'Pernafasan Spontan' },
                { id: 112855, nama: 'Nadi Adekuat' },
                { id: 112856, nama: 'Pasien Sadar Penuh' },
            ]
            $scope.listKeptusan = [
                { "id": 112870, "nama": "R. Resusitasi", "type": "checkbox" },
                { "id": 112871, "nama": "R. Non Resusitasi", "type": "checkbox" },
                { "id": 112872, "nama": "Poliklinik", "type": "checkbox" },
                { "id": 112873, "nama": "Lain-lain", "type": "checkbox" },
                { "id": 112874, "nama": "", "type": "textbox" },
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
           if(nomorEMR!='-'){
               cacheHelper.set('cacheEMR_TRIASE_PRIMER_UMUM', nomorEMR)
           }
            medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + nomorEMR + "&emrfk=" + $scope.cc.emrfk, true).then(function (dat) {
                $scope.item.obj = []
                $scope.item.obj2 = []
                $scope.item.obj[112829]=$scope.now
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
                            if (dataLoad[i].emrdfk >= 5046 && dataLoad[i].emrdfk <= 5051 && chekedd) {
                                $scope.getSkalaNyeri(1, { descNilai: dataLoad[i].reportdisplay })
                            }
                            if (dataLoad[i].emrdfk >= 5053 && dataLoad[i].emrdfk <= 5084 && dataLoad[i].reportdisplay != null) {
                                var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                                $scope.getSkor2(datass)
                            }
                            if (dataLoad[i].emrdfk >= 5085 && dataLoad[i].emrdfk <= 5093 && dataLoad[i].reportdisplay != null) {
                                var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                                $scope.getSkorNutrisi(datass)
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
            
            $scope.kembali = function () {
                $rootScope.showRiwayat()
            }

            $scope.Save = function () {

                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    arrSave.push({ id: arrobj[i], values: $scope.item.obj[parseInt(arrobj[i])] })
                }
                $scope.cc.jenisemr = 'umum'
                var jsonSave = {
                    head: $scope.cc,
                    data: arrSave
                }
                medifirstService.post('emr/save-emr-dinamis', jsonSave).then(function (e) {
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,  
                    'Triase Primer  Umum' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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