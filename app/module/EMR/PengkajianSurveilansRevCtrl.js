define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PengkajianSurveilansRevCtrl', ['$q', '$rootScope', '$scope', '$state', 'CacheHelper', 'ModelItem', 'MedifirstService',
        function ($q, $rootScope, $scope, $state, cacheHelper, ModelItem, medifirstService, ) {
            $scope.item = {};
            $scope.ItemFRD = {};
            $scope.ItemAnti = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.tglOperasi = new Date();
            var norec_apd = ''
            var norec_pd = ''
            var nocm_str = ''
            $scope.item.qty = 1
            $scope.riwayatForm = false
            $scope.inputOrder = true
            $scope.CmdOrderPelayanan = true;
            $scope.OrderPelayanan = false;
            $scope.showTombol = false
            var myVar = 0
            var detail = ''
            var data2 = [];
            $scope.PegawaiLogin2 = {};
            var namaRuangan = ''
            var namaRuanganFk = ''
            var norecSurveilans = ''
            $scope.currentPenyakitPenyerta = [];
            $scope.currentAntiPenyakitPenyerta = [];
            $scope.currentStatusGizi = [];
            $scope.currentDM = [];
            $scope.currentGulaDarah = [];
            $scope.currentMerokok = [];
            $scope.currentObesitas = [];
            $scope.currentPemeriksaanKultur = [];
            $scope.currentImplant = [];
            var dataFRD = [];
            var dataAntiBio = [];
            var dataHead = [];
            $scope.NorecSurveilans = "";
            var noRegistrasi = ''
            LoadCacheHelper();
            LoadDataCombo();

            function ClearAll() {
                $scope.item = {};
                $scope.ItemFRD = {};
                $scope.ItemAnti = {};
                $scope.gridFRD = new kendo.data.DataSource({
                    data: []
                })
                $scope.gridAntibiotika = new kendo.data.DataSource({
                    data: []
                })
            };

            function LoadCacheHelper() {
                $scope.disableCD = true;
                $scope.disableOperasi = true;
                $scope.disableCU = true;
                $scope.disableCP = true;
                $scope.disableFR = true;
                $scope.IsInfeksi = true;
                var chacePeriode = cacheHelper.get('cacheRekamMedis');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.item.noMr = chacePeriode[0]
                    nocm_str = chacePeriode[0]
                    $scope.item.namaPasien = chacePeriode[1]
                    $scope.item.jenisKelamin = chacePeriode[2]
                    $scope.item.noregistrasi = chacePeriode[3]
                    noRegistrasi = chacePeriode[3]
                    $scope.item.umur = chacePeriode[4]
                    $scope.item.kelompokPasien = chacePeriode[5]
                    $scope.item.tglRegistrasi = chacePeriode[6]
                    norec_apd = chacePeriode[7]
                    norec_pd = chacePeriode[8]
                    $scope.item.idKelas = chacePeriode[9]
                    $scope.item.kelas = chacePeriode[10]
                    $scope.item.idRuangan = chacePeriode[11]
                    $scope.item.namaRuangan = chacePeriode[12]
                    $scope.header.DataNoregis = chacePeriode[13]
                    if ($scope.header.DataNoregis == undefined) {
                        $scope.header.DataNoregis = false;
                    }

                }
                init()
            }

            function LoadDataCombo() {
                medifirstService.get("emr/get-data-combo-surveilans", true).then(function (x) {
                    var datas = x.data
                    $scope.listNamaRuangan = datas.ruangan;
                    $scope.listJenisWaktu = datas.jeniswaktu;
                    $scope.listJenisOperasi = datas.jenisoperasi;
                    $scope.listAsaScore = datas.asascore;
                    $scope.listTindakanAntibiotik = datas.produk;
                    $scope.listTindakan = datas.tindakanoperasi;
                    $scope.listTindakanOperasi = datas.tindakanoperasi;
                    $scope.listInfeksi = datas.infeksi;
                    // $scope.listTindakanAntibiotik=x.data.produk;
                });
                medifirstService.getPart("sysadmin/general/get-produk", true, true, 20).then(function (data) {
                    //      $scope.listTindakanAntibiotik = data;
                    //      $scope.listTindakan = data;
                    $scope.listProduk = data;
                });
                medifirstService.getPart("sysadmin/general/get-datacombo-icd10", true, true, 10).then(function (data) {
                    
                    $scope.listDiagnosa = data;
                });
            }

            $scope.showAndHide = function () {
                $('#contentDiagnosa').fadeToggle("fast", "linear");
            }

            $scope.showAndHideCD = function () {
                $('#contentCD').fadeToggle("fast", "linear");
            }

            $scope.showAndHideOperasi = function () {
                $('#contentOperasi').fadeToggle("fast", "linear");
            }

            $scope.showAndHideAnti = function () {
                $('#contentAnti').fadeToggle("fast", "linear");
            }

            $scope.showAndHideCU = function () {
                $('#contentCU').fadeToggle("fast", "linear");
            }

            $scope.showAndHideCP = function () {
                $('#contentCP').fadeToggle("fast", "linear");
            }

            $scope.showAndHideFR = function () {
                $('#contentFR').fadeToggle("fast", "linear");
            }

            $scope.showAndHideFRD = function () {
                $('#contentFRD').fadeToggle("fast", "linear");
            }

            $scope.showAndHidePA = function () {
                $('#contentPA').fadeToggle("fast", "linear");
            }

            $scope.listPenyakitPenyerta = [
                {
                    "id": 1,
                    "nama": "Penyakit Penyerta",
                    "detail": [
                        { "id": 1, "nama": "HIV" },
                        { "id": 2, "nama": "HCV" },
                        { "id": 3, "nama": "HBV" },
                    ]
                }
            ]

            $scope.addListPenyakitPenyerta = function (bool, data) {
                var index = $scope.currentPenyakitPenyerta.indexOf(data);
                if (_.filter($scope.currentPenyakitPenyerta, {
                    id: data.id
                }).length === 0)
                    $scope.currentPenyakitPenyerta.push(data);
                else {
                    $scope.currentPenyakitPenyerta.splice(index, 1);
                }

            }

            $scope.listStatusGizi = [
                {
                    "id": 2,
                    "nama": "Status Gizi",
                    "detail": [
                        { "id": 1, "nama": "Baik" },
                        { "id": 2, "nama": "Sedang" },
                        { "id": 3, "nama": "Buruk" },
                    ]
                }
            ]

            $scope.addListStatusGizi = function (bool, data) {
                var index = $scope.currentStatusGizi.indexOf(data);
                if (_.filter($scope.currentStatusGizi, {
                    id: data.id
                }).length === 0)
                    $scope.currentStatusGizi.push(data);
                else {
                    $scope.currentStatusGizi.splice(index, 1);
                }
            }

            $scope.listDM = [
                {
                    "id": 3,
                    "nama": "DM",
                    "detail": [
                        { "id": 1, "nama": "Ya" },
                        { "id": 2, "nama": "Tidak" }
                    ]
                }
            ]

            $scope.addListDM = function (bool, data) {
                var index = $scope.currentDM.indexOf(data);
                if (_.filter($scope.currentDM, {
                    id: data.id
                }).length === 0)
                    $scope.currentDM.push(data);
                else {
                    $scope.currentDM.splice(index, 1);
                }
            }

            $scope.listGulaDarah = [
                {
                    "id": 4,
                    "nama": "Gula Darah",
                    "detail": [
                        { "id": 1, "nama": "Normal" },
                        { "id": 2, "nama": "Tinggi" }
                    ]
                }
            ]

            $scope.addListGulaDarah = function (bool, data) {
                var index = $scope.currentGulaDarah.indexOf(data);
                if (_.filter($scope.currentGulaDarah, {
                    id: data.id
                }).length === 0)
                    $scope.currentGulaDarah.push(data);
                else {
                    $scope.currentGulaDarah.splice(index, 1);
                }
            }

            $scope.listMerokok = [
                {
                    "id": 5,
                    "nama": "Merokok",
                    "detail": [
                        { "id": 1, "nama": "Ya " },
                        { "id": 2, "nama": "Tidak " }
                    ]
                }
            ]

            $scope.addListMerokok = function (bool, data) {
                var index = $scope.currentMerokok.indexOf(data);
                if (_.filter($scope.currentMerokok, {
                    id: data.id
                }).length === 0)
                    $scope.currentMerokok.push(data);
                else {
                    $scope.currentMerokok.splice(index, 1);
                }
            }

            $scope.listObesitas = [
                {
                    "id": 6,
                    "nama": "Obesitas",
                    "detail": [
                        { "id": 1, "nama": "Ya  " },
                        { "id": 2, "nama": "Tidak  " }
                    ]
                }
            ]

            $scope.addListObesitas = function (bool, data) {
                var index = $scope.currentObesitas.indexOf(data);
                if (_.filter($scope.currentObesitas, {
                    id: data.id
                }).length === 0)
                    $scope.currentObesitas.push(data);
                else {
                    $scope.currentObesitas.splice(index, 1);
                }
            }

            $scope.listPemeriksaanKultur = [
                {
                    "id": 7,
                    "nama": "Pemeriksaan Kultur",
                    "detail": [
                        { "id": 1, "nama": "Pus Luka" },
                        // {"id":2,"nama":"Tidak"}                      
                    ]
                }
            ]

            $scope.addListPemeriksaanKultur = function (bool, data) {
                var index = $scope.currentPemeriksaanKultur.indexOf(data);
                if (_.filter($scope.currentPemeriksaanKultur, {
                    id: data.id
                }).length === 0)
                    $scope.currentPemeriksaanKultur.push(data);
                else {
                    $scope.currentPemeriksaanKultur.splice(index, 1);
                }
            }

            $scope.listImplant = [
                {
                    "id": 8,
                    "nama": "Pemasangan Implant",
                    "detail": [
                        { "id": 1, "nama": " Ya " },
                        { "id": 2, "nama": " Tidak  " }
                    ]
                }
            ]

            $scope.addListlistImplant = function (bool, data) {
                var index = $scope.currentImplant.indexOf(data);
                if (_.filter($scope.currentImplant, {
                    id: data.id
                }).length === 0)
                    $scope.currentImplant.push(data);
                else {
                    $scope.currentImplant.splice(index, 1);
                }
            }

            function init() {
                medifirstService.get("emr/get-data-history-surveilans?noRegis=" + noRegistrasi, true).then(function (dat) {
                    $scope.dataDaftar = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 10,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });
                });
                // $scope.PegawaiLogin2= JSON.parse(localStorage.getItem('pegawai'))              
            }


            $scope.cekCulturDarah = function (bool) {
                if (bool) {
                    $scope.disableCD = false;
                } else {
                    $scope.disableCD = true;
                }
            }

            $scope.cekisOperasi = function (bool) {
                if (bool) {
                    $scope.disableOperasi = false;
                } else {
                    $scope.disableOperasi = true;
                }
            }

            $scope.cekisCultureUrine = function (bool) {
                if (bool) {
                    $scope.disableCU = false;
                } else {
                    $scope.disableCU = true;
                }
            }

            $scope.cekisCultureSputum = function (bool) {
                if (bool) {
                    $scope.disableCP = false;
                } else {
                    $scope.disableCP = true;
                }
            }

            $scope.cekisFaktorResiko = function (bool) {
                if (bool) {
                    $scope.disableFR = false;
                } else {
                    $scope.disableFR = true;
                }
            }

            $scope.cekTerinfeksi = function (bool) {
                if (bool) {
                    $scope.IsInfeksi = false;
                } else {
                    $scope.IsInfeksi = true;
                }
            }

            $scope.Lihat = function () {
                if ($scope.dataSelected != undefined) {
                    norecSurveilans = $scope.dataSelected.norec;
                    $scope.NorecSurveilans = norecSurveilans;
                    LoadHistory();
                } else {
                    window.messageContainer.error("Pilih Pasien Dahulu!");
                    return;
                }
                // $scope.myVar = 2
                // var noemr2 = '-'
                // if ($scope.dataSelected != undefined) {
                //     noemr2 = $scope.dataSelected.noemr
                // }           

                // var arrStr = {
                //         0: noemr2
                //     }
                // cacheHelper.set('cacheNomorEMR', arrStr);
            }

            function LoadHistory() {
                  medifirstService.get("emr/get-detail-history-surveilans?noRec=" + $scope.NorecSurveilans, true).then(function (dat) {
                    // debugger;
                    var dataHistory = dat.data;
                    var dataHeadRe = dataHistory.datahead[0];
                    var dataFaktorResiko = dataHistory.faktorresiko[0];
                    var dataOperasi = dataHistory.operasi[0];
                    var dataCacheFrd = dataHistory.datafrd;
                    var dataCacheAnti = dataHistory.dataanti;

                    if (dataHistory != undefined) {
                        // Data Head
                        $scope.item.diagnosaMasuk = {
                            id: dataHeadRe.diagnosamasukfk,
                            kddiagnosa: dataHeadRe.kddiagnosa,
                            namadiagnosa: dataHeadRe.namadiagnosa
                        };
                        $scope.item.keteranganMasuk = dataHeadRe.keterangandiagnosamasuk;
                        $scope.item.diagnosaKeluar = {
                            id: dataHeadRe.diagnosakeluarfk,
                            kddiagnosa: dataHeadRe.kddiagnosakeluar,
                            namadiagnosa: dataHeadRe.namadiagnosakeluar
                        };
                        $scope.item.keteranganKeluar = dataHeadRe.keterangandiagnosakeluar;
                        $scope.item.AntibiotikProfillaksis = dataHeadRe.antibiotikprofillaksis;
                        $scope.item.AntibiotikDosis = dataHeadRe.dosis;
                        $scope.item.Ruangan = { id: dataHeadRe.ruanganfk, namaruangan: dataHeadRe.namaruangan };
                        $scope.item.JenisWaktu = { id: dataHeadRe.jeniswaktufk, jeniswaktu: dataHeadRe.jeniswaktu };
                        $scope.item.KeteranganCulturDarah = dataHeadRe.culturdarah;
                        $scope.item.KeteranganCulturUrine = dataHeadRe.cultururine;
                        $scope.item.KeteranganCulturSputum = dataHeadRe.cultursputum;
                        // Data Head

                        //  Data Faktor Resiko
                        $scope.item.KeteranganTemp = dataFaktorResiko.temp;
                        $scope.item.HsilKultur = dataFaktorResiko.hasilkultur;

                        if (dataFaktorResiko.statusgizi != '' || dataFaktorResiko.statusgizi != null) {
                            var statusGizi = dataFaktorResiko.statusgizi.split(',')
                            statusGizi.forEach(function (data) {
                                $scope.listStatusGizi.forEach(function (e) {
                                    for (let i in e.detail) {
                                        if (e.detail[i].id == data) {
                                            e.detail[i].isChecked = true
                                            var dataid = {
                                                "id": e.detail[i].id, "nama": e.detail[i].nama,
                                                "value": e.detail[i].id,
                                            }
                                            $scope.currentStatusGizi.push(dataid)
                                        }
                                    }
                                })
                            })
                        }

                        if (dataFaktorResiko.dm != '' || dataFaktorResiko.dm != null) {
                            var listDm = dataFaktorResiko.dm.split(',')
                            listDm.forEach(function (data) {
                                $scope.listDM.forEach(function (e) {
                                    for (let i in e.detail) {
                                        if (e.detail[i].id == data) {
                                            e.detail[i].isChecked = true
                                            var dataid = {
                                                "id": e.detail[i].id, "nama": e.detail[i].nama,
                                                "value": e.detail[i].id,
                                            }
                                            $scope.currentDM.push(dataid)
                                        }
                                    }
                                })
                            })
                        }


                        if (dataFaktorResiko.guladarah != '' || dataFaktorResiko.guladarah != null) {
                            var gulaDarah = dataFaktorResiko.guladarah.split(',')
                            gulaDarah.forEach(function (data) {
                                $scope.listGulaDarah.forEach(function (e) {
                                    for (let i in e.detail) {
                                        if (e.detail[i].id == data) {
                                            e.detail[i].isChecked = true
                                            var dataid = {
                                                "id": e.detail[i].id, "nama": e.detail[i].nama,
                                                "value": e.detail[i].id,
                                            }
                                            $scope.currentGulaDarah.push(dataid)
                                        }
                                    }
                                })
                            })
                        }

                        if (dataFaktorResiko.merokok != '' || dataFaktorResiko.merokok != null) {
                            var meRokok = dataFaktorResiko.merokok.split(',')
                            meRokok.forEach(function (data) {
                                $scope.listMerokok.forEach(function (e) {
                                    for (let i in e.detail) {
                                        if (e.detail[i].id == data) {
                                            e.detail[i].isChecked = true
                                            var dataid = {
                                                "id": e.detail[i].id, "nama": e.detail[i].nama,
                                                "value": e.detail[i].id,
                                            }
                                            $scope.currentMerokok.push(dataid)
                                        }
                                    }
                                })
                            })
                        }

                        if (dataFaktorResiko.obesitas != '' || dataFaktorResiko.obesitas != null) {
                            var oBesitas = dataFaktorResiko.obesitas.split(',')
                            oBesitas.forEach(function (data) {
                                $scope.listObesitas.forEach(function (e) {
                                    for (let i in e.detail) {
                                        if (e.detail[i].id == data) {
                                            e.detail[i].isChecked = true
                                            var dataid = {
                                                "id": e.detail[i].id, "nama": e.detail[i].nama,
                                                "value": e.detail[i].id,
                                            }
                                            $scope.currentObesitas.push(dataid)
                                        }
                                    }
                                })
                            })
                        }

                        if (dataFaktorResiko.pemeriksaankultur != '' || dataFaktorResiko.pemeriksaankultur != null) {
                            var pemeriksaanKultur = dataFaktorResiko.pemeriksaankultur.split(',')
                            pemeriksaanKultur.forEach(function (data) {
                                $scope.listPemeriksaanKultur.forEach(function (e) {
                                    for (let i in e.detail) {
                                        if (e.detail[i].id == data) {
                                            e.detail[i].isChecked = true
                                            var dataid = {
                                                "id": e.detail[i].id, "nama": e.detail[i].nama,
                                                "value": e.detail[i].id,
                                            }
                                            $scope.currentPemeriksaanKultur.push(dataid)
                                        }
                                    }
                                })
                            })
                        }
                        //  Data Faktor Resiko

                        //  Data Operasi

                        $scope.item.diagnosaOperasi = {
                            id: dataOperasi.diagnosafk,
                            kddiagnosa: dataOperasi.kddiagnosa,
                            namadiagnosa: dataOperasi.namadiagnosa
                        };
                        $scope.item.keteranganOperasi = dataOperasi.keterangandiagnosa;
                        $scope.item.namaProduk = { id: dataOperasi.produkfk, namaproduk: dataOperasi.namaproduk };
                        $scope.item.tglOperasi = moment(dataOperasi.tgloperasi).format('YYYY-MM-DD HH:mm');
                        $scope.item.JamOperasi = dataOperasi.jamoperasi;
                        $scope.item.MenitOperasi = dataOperasi.menitoperasi;
                        $scope.item.AsaScore = { id: dataOperasi.asascorefk, asascore: dataOperasi.asascore };
                        $scope.item.TindakanOperasi = { id: dataOperasi.tindakanoperasifk, namaproduk: dataOperasi.tindakanoperasi };
                        $scope.item.JenisOperasi = { id: dataOperasi.jenisoperasifk, jenisoperasi: dataOperasi.jenisoperasi };
                        $scope.item.ScoreOperasi = dataOperasi.score;

                        if (dataOperasi.penyakitpenyerta != '' || dataOperasi.penyakitpenyerta != null) {
                            var penyakitPenyerta = dataOperasi.penyakitpenyerta.split(',')
                            penyakitPenyerta.forEach(function (data) {
                                $scope.listPenyakitPenyerta.forEach(function (e) {
                                    for (let i in e.detail) {
                                        if (e.detail[i].id == data) {
                                            e.detail[i].isChecked = true
                                            var dataid = {
                                                "id": e.detail[i].id, "nama": e.detail[i].nama,
                                                "value": e.detail[i].id,
                                            }
                                            $scope.currentPenyakitPenyerta.push(dataid)
                                        }
                                    }
                                })
                            })
                        }

                        if (dataOperasi.implant != '' || dataOperasi.implant != null) {
                            var pasangImplant = dataOperasi.implant.split(',')
                            pasangImplant.forEach(function (data) {
                                $scope.listImplant.forEach(function (e) {
                                    for (let i in e.detail) {
                                        if (e.detail[i].id == data) {
                                            e.detail[i].isChecked = true
                                            var dataid = {
                                                "id": e.detail[i].id, "nama": e.detail[i].nama,
                                                "value": e.detail[i].id,
                                            }
                                            $scope.currentImplant.push(dataid)
                                        }
                                    }
                                })
                            })
                        }
                        //  Data Operasi

                        //  Data FRD                           
                        dataFRD = dataCacheFrd;
                        for (var i = 0; i < dataFRD.length; i++) {
                            dataFRD[i].no = i + 1;
                        }
                        $scope.gridFRD = new kendo.data.DataSource({
                            data: dataFRD
                        })
                        //  Data FRD

                        //  Data ANTI
                        dataAntiBio = dataCacheAnti;
                        for (var i = 0; i < dataAntiBio.length; i++) {
                            dataAntiBio[i].no = i + 1;
                        }
                        $scope.gridAntibiotika = new kendo.data.DataSource({
                            data: dataAntiBio
                        })
                        //  Data ANTI


                        $scope.myVar = 2;
                    } else {
                        window.messageContainer.error("Data Tidak Ditemukan!");
                        return;
                    }

                });
            }

            $scope.opsiGridFRD = {
                toolbar: [

                    {
                        name: "create", text: "Buat Data Faktor Resiko Selama Dirawat",
                        template: '<button ng-click="createNew()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Data Faktor Resiko Selama Dirawat</button>'
                    }
                ],
                sortable: false,
                reorderable: true,
                filterable: false,
                pageable: true,
                columnMenu: false,
                resizable: true,
                selectable: 'row',
                columns: [
                    {
                        "field": "no",
                        "title": "No",
                        "width": "50px",
                    },
                    {
                        "field": "tindakan",
                        "title": "Tindakan",
                        "width": "120px",
                    },
                    {
                        "field": "hasilkultur",
                        "title": "Hasil Kultur",
                        "width": "120px",
                    },
                    {
                        "field": "tglmulai",
                        "title": "Tgl Mulai",
                        "width": "80px",
                        "template": "<span class='style-left'>{{formatTanggal('#: tglmulai #')}}</span>"
                    },
                    {
                        "field": "tglakhir",
                        "title": "Tgl Selesai",
                        "width": "80px",
                        "template": "<span class='style-left'>{{formatTanggal('#: tglakhir #')}}</span>"
                    },
                    {
                        "field": "lamapasang",
                        "title": "Lama Pasang",
                        "width": "80px",

                    },
                    {
                        "field": "tglinfeksi",
                        "title": "Tanggal Infeksi",
                        "width": "80px",
                        "template": "<span class='style-left'>{{formatTanggal('#: tglinfeksi #')}}</span>"

                    },
                    {
                        "field": "infeksi",
                        "title": "Infeksi",
                        "width": "110px",

                    },
                    {
                        "field": "score",
                        "title": "Score",
                        "width": "80px",

                    },
                    {
                        "field": "status",
                        "title": "Status",
                        "width": "80px",

                    },
                    {
                        "command": [
                            { text: "Edit", click: Edit, imageClass: "k-icon k-i-pencil" },
                            { text: "Hapus", click: Hapus, imageClass: "k-icon k-i-delete" },
                        ],
                        title: "",
                        width: "185px",
                    }
                ]
            }

            $scope.createNew = function () {
                $scope.item.norecFrd = "";
                $scope.item.no = undefined;
                $scope.popUpFRD.center().open();
                var actions = $scope.popUpFRD.options.actions;
                actions.splice(actions.indexOf("Close"), 1);
                $scope.popUpFRD.setOptions({ actions: actions });
            }

            function Edit(e) {
              //  debugger;
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (dataItem == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                };
                $scope.item.norecFrd = dataItem.norec;
                $scope.item.no = dataItem.no;
                $scope.ItemFRD.tanggalMulai = moment(dataItem.tglmulai).format('YYYY-MM-DD HH:mm');
                $scope.ItemFRD.tanggalAkhir = moment(dataItem.tglakhir).format('YYYY-MM-DD HH:mm');
                $scope.ItemFRD.LamaPasang = dataItem.lamapasang;
                $scope.ItemFRD.Tindakan = { id: dataItem.idtindakan, namaproduk: dataItem.tindakan };
                $scope.ItemFRD.tanggalInfeksi = moment(dataItem.tglinfeksi).format('YYYY-MM-DD HH:mm');
                $scope.ItemFRD.Infeksi = { id: dataItem.idinfeksi, infeksi: dataItem.infeksi };;
                $scope.ItemFRD.Score = dataItem.score;
                $scope.ItemFRD.HasilKultur = dataItem.hasilkultur;
                if (dataItem.idsah == 1) {
                    $scope.ItemFRD.Sah = true;
                } else {
                    $scope.ItemFRD.Sah = false;
                }
                if (dataItem.idbatal == 1) {
                    $scope.ItemFRD.Batal = true
                } else {
                    $scope.ItemFRD.Batal = false
                }
                $scope.status = dataItem.status
                $scope.popUpFRD.center().open();
            }

            $scope.tambahFRD = function () {
                var listRawRequired = [
                    // "ItemFRD.tanggalMulai|k-ng-model|tanggal Mulai",
                    // "ItemFRD.tanggalAkhir|k-ng-model|tanggal Akhir",
                    // "ItemFRD.LamaPasang|ng-model|Lama Pasang",                   
                    // "ItemFRD.HasilKultur|ng-model|Hasil Kultur", 
                    "ItemFRD.Tindakan|k-ng-model|Tindakan Operasi"
                ];


                var tglMulai = null;
                if ($scope.ItemFRD.tanggalMulai != undefined) {
                    tglMulai = moment($scope.ItemFRD.tanggalMulai).format('YYYY-MM-DD HH:mm');
                }

                var tanggalAkhir = null;
                if ($scope.ItemFRD.tanggalAkhir != undefined) {
                    tanggalAkhir = moment($scope.ItemFRD.tanggalAkhir).format('YYYY-MM-DD HH:mm');
                }

                var LamaPasang = null;
                if ($scope.ItemFRD.LamaPasang != undefined) {
                    LamaPasang = $scope.ItemFRD.LamaPasang;
                }

                var HasilKultur = "Tidak ada pemeriksaan";
                if ($scope.ItemFRD.HasilKultur != undefined) {
                    HasilKultur = $scope.ItemFRD.HasilKultur;
                }

                var Tindakan = null;
                var TindakanId = null;
                if ($scope.ItemFRD.Tindakan != undefined) {
                    Tindakan = $scope.ItemFRD.Tindakan.namaproduk;
                    TindakanId = $scope.ItemFRD.Tindakan.id;
                }

                var tglInfeksi = null;
                if ($scope.ItemFRD.tanggalInfeksi != undefined) {
                    tglInfeksi = moment($scope.ItemFRD.tanggalInfeksi).format('YYYY-MM-DD HH:mm');
                }

                var Infeksi = null;
                var namaInfeksi = null;
                if ($scope.ItemFRD.Infeksi != undefined) {
                    Infeksi = $scope.ItemFRD.Infeksi.id
                    namaInfeksi = $scope.ItemFRD.Infeksi.infeksi
                }

                var Score = 0;
                if ($scope.ItemFRD.Score != undefined) {
                    Score = $scope.ItemFRD.Score;
                }

                var statusSah = "-";
                var idSah = 0
                if ($scope.ItemFRD.Sah == true) {
                    statusSah = "Pasang"
                    idSah = 1;
                }

                var idBatal = 0;
                if ($scope.ItemFRD.Batal == true) {
                    statusSah = "Lepas"
                    idBatal = 1
                }

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var nomor = 0
                    if ($scope.gridFRD == undefined) {
                        nomor = 1
                    } else {
                        nomor = dataFRD.length + 1
                    }
                    var data = {};
                    if ($scope.item.no != undefined) {
                        for (var i = dataFRD.length - 1; i >= 0; i--) {
                            if (dataFRD[i].no == $scope.item.no) {
                                data.no = $scope.item.no;
                                data.tglmulai = tglMulai;
                                data.tglakhir = tanggalAkhir;
                                data.lamapasang = LamaPasang
                                data.idtindakan = TindakanId
                                data.tindakan = Tindakan
                                data.hasilkultur = HasilKultur
                                data.tglinfeksi = tglInfeksi
                                data.infeksi = namaInfeksi
                                data.idinfeksi = Infeksi
                                data.score = Score
                                data.status = statusSah
                                data.idsah = idSah
                                data.idbatal = idBatal
                                data.norec = $scope.item.norecFrd

                                dataFRD[i] = data;
                                $scope.gridFRD = new kendo.data.DataSource({
                                    data: dataFRD
                                });
                            }
                        }

                    } else {

                        data = {

                            no: nomor,
                            tglmulai: tglMulai,
                            tglakhir: tanggalAkhir,
                            lamapasang: LamaPasang,
                            idtindakan: TindakanId,
                            tindakan: Tindakan,
                            hasilkultur: HasilKultur,
                            tglinfeksi: tglInfeksi,
                            infeksi: namaInfeksi,
                            idinfeksi: Infeksi,
                            score: Score,
                            status: statusSah,
                            idsah: idSah,
                            idbatal: idBatal,
                            norec: $scope.item.norecFrd,
                        }

                        dataFRD.push(data)
                        $scope.gridFRD = new kendo.data.DataSource({
                            data: dataFRD
                        });
                    }
                    ClearDataFRD();
                    $scope.popUpFRD.close();
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }

            function Hapus(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                if (dataItem == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                };

                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                var tr = $(e.target).closest("tr");
                for (var i = dataFRD.length - 1; i >= 0; i--) {
                    if (dataFRD[i].no == dataItem.no) {
                        dataFRD.splice(i, 1);
                    }
                }
                grid.removeRow(row);
            }

            function ClearDataFRD() {
                $scope.ItemFRD = {};
                // $scope.itemKeluarga.tglLahir=moment($scope.now).format("DD-MM-YYYY");            
            };

            $scope.batalFRD = function () {
                ClearDataFRD();
                $scope.popUpFRD.close();
            }

            $scope.opsiGridAntibiotika = {
                toolbar: [

                    {
                        name: "create", text: "Buat Data Pemakaian Antibiotika",
                        template: '<button ng-click="createNewAnti()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Data Pemakaian Antibiotika</button>'
                    }
                ],
                sortable: false,
                reorderable: true,
                filterable: false,
                pageable: true,
                columnMenu: false,
                resizable: true,
                selectable: 'row',
                columns: [
                    {
                        "field": "no",
                        "title": "No",
                        "width": "50px",
                    },
                    {
                        "field": "antibiotika",
                        "title": "Tindakan",
                        "width": "110px",
                    },
                    {
                        "field": "tglmulai",
                        "title": "Tgl Mulai",
                        "width": "100px",
                        "template": "<span class='style-left'>{{formatTanggal('#: tglmulai #')}}</span>"
                    },
                    {
                        "field": "tglakhir",
                        "title": "Tgl Selesai",
                        "width": "100px",
                        "template": "<span class='style-left'>{{formatTanggal('#: tglakhir #')}}</span>"
                    },
                    {
                        "field": "dosis",
                        "title": "Dosis",
                        "width": "100px",

                    },
                    {
                        "field": "metodepemberian",
                        "title": "Metode Pemeberian",
                        "width": "110px",

                    },
                    {
                        "field": "status",
                        "title": "Status",
                        "width": "20%",

                    },
                    {
                        "command": [
                            { text: "Edit", click: EditAnti, imageClass: "k-icon k-i-pencil" },
                            { text: "Hapus", click: HapusAnti, imageClass: "k-icon k-i-delete" },
                        ],
                        title: "",
                        width: "185px",
                    }
                ]
            }

            $scope.createNewAnti = function () {
                $scope.item.norecAnti = "";
                $scope.item.no = undefined;
                $scope.popUpAntibiotika.center().open();
                var actions = $scope.popUpAntibiotika.options.actions;
                actions.splice(actions.indexOf("Close"), 1);
                $scope.popUpAntibiotika.setOptions({ actions: actions });
            }

            $scope.tambahAnti = function () {
                var listRawRequired = [
                    // "ItemAnti.TindakanAntibiotik|k-ng-model|Antibiotika",
                    // "ItemAnti.Dosis|ng-model|Dosis",
                    // "ItemAnti.tanggalMulaiAnti|k-ng-model|tanggal Mulai",                   
                    // "ItemAnti.tanggalAkhiraAnti|k-ng-model|tanggal Akhir",
                    // "ItemAnti.Pemberian|ng-model|Metode Pemberian",                                                                         
                ];

                var tglMulai = null;
                if ($scope.ItemAnti.tanggalMulaiAnti != undefined) {
                    tglMulai = moment($scope.ItemAnti.tanggalMulaiAnti).format('YYYY-MM-DD HH:mm');
                }

                var tanggalAkhir = null;
                if ($scope.ItemAnti.tanggalAkhiraAnti != undefined) {
                    tanggalAkhir = moment($scope.ItemAnti.tanggalAkhiraAnti).format('YYYY-MM-DD HH:mm');
                }

                var Dosis = null;
                if ($scope.ItemAnti.Dosis != undefined) {
                    Dosis = $scope.ItemAnti.Dosis;
                }

                var Pemberian = null;
                if ($scope.ItemAnti.Pemberian != undefined) {
                    Pemberian = $scope.ItemAnti.Pemberian;
                }

                var Tindakan = null;
                var TindakanId = null;
                if ($scope.ItemAnti.TindakanAntibiotik != undefined) {
                    Tindakan = $scope.ItemAnti.TindakanAntibiotik.namaproduk;
                    TindakanId = $scope.ItemAnti.TindakanAntibiotik.id;
                }

                var statusSah = "-";
                var idSah = 0
                if ($scope.ItemAnti.SahAnti == true) {
                    statusSah = "Sah"
                    idSah = 1;
                }

                var idBatal = 0;
                if ($scope.ItemAnti.BatalAnti == true) {
                    statusSah = "Batal"
                    idBatal = 1
                }

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var nomor = 0
                    if ($scope.gridAntibiotika == undefined) {
                        nomor = 1
                    } else {
                        nomor = dataAntiBio.length + 1
                    }
                    var data = {};
                    if ($scope.item.no != undefined) {
                        for (var i = dataAntiBio.length - 1; i >= 0; i--) {
                            if (dataAntiBio[i].no == $scope.item.no) {
                                data.no = $scope.item.no
                                data.antibiotika = Tindakan
                                data.idantibiotika = TindakanId
                                data.dosis = Dosis
                                data.tglmulai = tglMulai
                                data.tglakhir = tanggalAkhir
                                data.metodepemberian = Pemberian
                                data.idsah = idSah
                                data.idbatal = idBatal
                                data.status = statusSah
                                data.norec = $scope.item.norecAnti

                                dataAntiBio[i] = data;
                                $scope.gridAntibiotika = new kendo.data.DataSource({
                                    data: dataAntiBio
                                });
                            }
                        }

                    } else {

                        data = {
                            no: nomor,
                            antibiotika: Tindakan,
                            idantibiotika: TindakanId,
                            dosis: Dosis,
                            tglmulai: tglMulai,
                            tglakhir: tanggalAkhir,
                            metodepemberian: Pemberian,
                            idsah: idSah,
                            idbatal: idBatal,
                            status: statusSah,
                            norec: $scope.item.norecAnti,
                        }
                        dataAntiBio.push(data)
                        $scope.gridAntibiotika = new kendo.data.DataSource({
                            data: dataAntiBio
                        });
                    }
                    ClearDataAnti();
                    $scope.popUpAntibiotika.close();
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }

            function EditAnti(e) {
              //  debugger;
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (dataItem == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                };

                $scope.item.norecAnti = dataItem.norec;
                $scope.item.no = dataItem.no;
                $scope.ItemAnti.TindakanAntibiotik = { id: dataItem.idantibiotika, namaproduk: dataItem.antibiotika };
                $scope.ItemAnti.Dosis = dataItem.dosis;
                $scope.ItemAnti.tanggalMulaiAnti = moment(dataItem.tglmulai).format('YYYY-MM-DD');
                $scope.ItemAnti.tanggalAkhiraAnti = moment(dataItem.tglakhir).format('YYYY-MM-DD');
                $scope.ItemAnti.Pemberian = dataItem.metodepemberian;
                if (dataItem.idsah == 1) {
                    $scope.ItemAnti.SahAnti = true;
                } else {
                    $scope.ItemAnti.SahAnti = false;
                }
                if (dataItem.idbatal == 1) {
                    $scope.ItemAnti.BatalAnti = true
                } else {
                    $scope.ItemAnti.BatalAnti = false
                }
                $scope.status = dataItem.status
                $scope.popUpAntibiotika.center().open();
            }

            function HapusAnti(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                if (dataItem == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                };
                debugger
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                var tr = $(e.target).closest("tr");
                for (var i = dataAntiBio.length - 1; i >= 0; i--) {
                    if (dataAntiBio[i].no == dataItem.no) {
                        dataAntiBio.splice(i, 1);
                    }
                }
                grid.removeRow(row);
            }


            function ClearDataAnti() {
                $scope.ItemAnti = {};
            };

            $scope.batalAnti = function () {
                ClearDataAnti();
                $scope.popUpAntibiotika.close();
            }

            $scope.createNewSurveilans = function () {
                ClearAll();
                $scope.myVar = 2
                var noemr2 = '-'
                var arrStr = {
                    0: noemr2
                }
                cacheHelper.set('cacheNomorEMR', arrStr);
            }


            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.columnDaftar = {
                selectable: 'row',
                pageable: true,
                columns:
                    [
                        {
                            "field": "tglsurveilans",
                            "title": "Tgl Input",
                            "width": "85px",
                            "template": "<span class='style-left'>{{formatTanggal('#: tglsurveilans #')}}</span>"
                        },
                        {
                            "field": "nosurvailens",
                            "title": "Id Surveilans",
                            "width": "85px"
                        },
                        {
                            "field": "nocmregis",
                            "title": "No RM / Noregistrasi",
                            "width": "120px"
                        },
                        {
                            "field": "namapasien",
                            "title": "Nama Pasien",
                            "width": "120px"
                        },
                        {
                            "field": "namaruangan",
                            "title": "Ruangan",
                            "width": "120px"
                        }
                    ]
            };

            function hapusData(e) { }

            $scope.back = function () {
                window.history.back();
            }

            $scope.Batal = function () { }

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            var HttpClient = function () {
                this.get = function (aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function () {
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }
                    anHttpRequest.open("GET", aUrl, true);
                    anHttpRequest.send(null);
                }
            }


            $scope.showInputDiagnosaDokter = function () {
                var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
                cacheHelper.set('CacheInputDiagnosaDokter', arrStr);
                $state.go('InputDiagnosaDokter')
            }

            $scope.resep = function () {
                var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
                cacheHelper.set('InputResepApotikOrderRevCtrl', arrStr);
                $state.go('InputResepApotikOrderRev')
            }

            $scope.inputTindakanDokter = function () {
                var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl')
                cacheHelper.set('InputTindakanPelayananDokterRevCtrl', arrStr);
                $state.go('InputTindakanPelayananDokterRev', {
                    norecPD: norec_pd,
                    norecAPD: norec_apd,
                });
            }

            $scope.laboratorium = function () {
                var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl')
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananLaboratoriumDokterRev')
            }

            $scope.radiologi = function () {
                var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl')
                cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananRadiologiDokterRev')
            }

            $scope.rekamMedisElektronik = function () {
                var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
                cacheHelper.set('cacheRMelektronik', arrStr);
                $state.go('RekamMedisElektronik')
            }

            $scope.inputCPPT = function () {
                var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
                cacheHelper.set('cacheCPPT', arrStr);
                $state.go('CPPT')
            }

            $scope.Simpan = function () {
              //  debugger;
                var listStatusGizi = "";
                var listDM = "";
                var listGulaDarah = "";
                var listMerokok = "";
                var listObesitas = "";
                var listPemeriksaanKultur = "";
                var listPenyakitPenyerta = "";
                var listPasangImplant = "";
                var a = ""
                var b = ""
                var c = ""
                var d = ""
                var e = ""
                var f = ""
                var g = ""
                var h = ""
                var i = ""
                var j = ""
                var k = ""
                var l = ""
                var m = ""
                var n = ""
                var o = ""
                var p = ""
                var q = ""
                var r = ""
                // var listRawRequired = [

                // Data Diagnosa Masuk Keluar
                // "item.diagnosaMasuk|k-ng-model|Diagnosa Masuk",                                
                // Data Diagnosa Masuk Keluar

                // // Data Rekening Bank
                // "item.bankRekeningNomor|ng-model|Nomor Rekening Pegawai",
                // "item.bankRekeningAtasNama|ng-model|Nama Pemilik Rekening",
                // "item.bankRekeningNama|ng-model|Nama Bank Rekening",
                // // Data Rekening Bank                       
                // ];     

                var DM = null
                if ($scope.item.diagnosaMasuk != undefined) {
                    DM = $scope.item.diagnosaMasuk.id
                }


                var keteranganDM = "-"
                if ($scope.item.keteranganMasuk != undefined) {
                    keteranganDM = $scope.item.keteranganMasuk
                }

                var DK = null
                if ($scope.item.diagnosaKeluar != undefined) {
                    DK = $scope.item.diagnosaKeluar.id
                }

                var keteranganDK = "-"
                if ($scope.item.keteranganKeluar != undefined) {
                    keteranganDK = $scope.item.keteranganKeluar
                }

                var AntibiotikProfillaksis = "-";
                if ($scope.item.AntibiotikProfillaksis != undefined) {
                    AntibiotikProfillaksis = $scope.item.AntibiotikProfillaksis;
                }

                var AntibiotikDosis = "-";
                if ($scope.item.AntibiotikDosis != undefined) {
                    AntibiotikDosis = $scope.item.AntibiotikDosis;
                }

                var IdRuangan = null;
                if ($scope.item.Ruangan != undefined) {
                    IdRuangan = $scope.item.Ruangan.id;
                }

                var JenisWaktu = null;
                if ($scope.item.JenisWaktu != undefined) {
                    JenisWaktu = $scope.item.JenisWaktu.id;
                }

                var KeteranganCulturDarah = "-";
                if ($scope.item.KeteranganCulturDarah != undefined) {
                    KeteranganCulturDarah = $scope.item.KeteranganCulturDarah;
                }

                var KeteranganCulturUrine = "-";
                if ($scope.item.KeteranganCulturUrine != undefined) {
                    KeteranganCulturUrine = $scope.item.KeteranganCulturUrine;
                }

                var KeteranganCulturSputum = "-";
                if ($scope.item.KeteranganCulturSputum != undefined) {
                    KeteranganCulturSputum = $scope.item.KeteranganCulturSputum;
                }

                var KeteranganTemp = "-";
                if ($scope.item.KeteranganTemp != undefined) {
                    KeteranganTemp = $scope.item.KeteranganTemp;
                }

                var HsilKultur = "-";
                if ($scope.item.HsilKultur != undefined) {
                    HsilKultur = $scope.item.HsilKultur;
                }

                for (var i = $scope.currentStatusGizi.length - 1; i >= 0; i--) {
                    var c = $scope.currentStatusGizi[i].id
                    b = "," + c
                    a = a + b
                }
                listStatusGizi = a.slice(1, a.length)

                for (var i = $scope.currentDM.length - 1; i >= 0; i--) {
                    var a = $scope.currentDM[i].id
                    c = "," + a
                    d = c + d
                }
                listDM = d.slice(1, d.length)

                for (var i = $scope.currentGulaDarah.length - 1; i >= 0; i--) {
                    var c = $scope.currentGulaDarah[i].id
                    e = "," + c
                    f = e + f
                }
                listGulaDarah = f.slice(1, f.length)

                for (var i = $scope.currentMerokok.length - 1; i >= 0; i--) {
                    var c = $scope.currentMerokok[i].id
                    g = "," + c
                    h = g + h
                }
                listMerokok = h.slice(1, h.length)

                for (var i = $scope.currentObesitas.length - 1; i >= 0; i--) {
                    var c = $scope.currentObesitas[i].id
                    i = "," + c
                    j = i + j
                }
                listObesitas = j.slice(1, j.length)

                for (var i = $scope.currentPemeriksaanKultur.length - 1; i >= 0; i--) {
                    var c = $scope.currentPemeriksaanKultur[i].id
                    k = "," + c
                    l = k + l
                }
                listPemeriksaanKultur = l.slice(1, l.length)

                var listFaktorResiko = {
                    statusgizi: listStatusGizi,
                    dm: listDM,
                    guladarah: listGulaDarah,
                    merokok: listMerokok,
                    obesitas: listObesitas,
                    pemeriksaankultur: listPemeriksaanKultur,
                    temp: KeteranganTemp,
                    hasilkultur: HsilKultur,
                    tglinput: moment($scope.now).format('YYYY-MM-DD HH:mm')
                }

                var DO = null
                if ($scope.item.diagnosaOperasi != undefined) {
                    DO = $scope.item.diagnosaOperasi.id
                }

                var keteranganDO = "-"
                if ($scope.item.keteranganOperasi != undefined) {
                    keteranganDO = $scope.item.keteranganOperasi
                }

                var Tindakan = null
                if ($scope.item.namaProduk != undefined) {
                    Tindakan = $scope.item.namaProduk.id
                }

                var tglOperasi = null
                if ($scope.item.tglOperasi != undefined) {
                    tglOperasi = moment($scope.item.tglOperasi).format('YYYY-MM-DD HH:mm')
                }

                var JamOperasi = 0
                if ($scope.item.JamOperasi != undefined) {
                    JamOperasi = $scope.item.JamOperasi
                }

                var MenitOperasi = 0
                if ($scope.item.MenitOperasi != undefined) {
                    MenitOperasi = $scope.item.MenitOperasi
                }

                var AsaScore = null
                if ($scope.item.AsaScore != undefined) {
                    AsaScore = $scope.item.AsaScore.id
                }

                var TindakanOperasi = null
                if ($scope.item.TindakanOperasi != undefined) {
                    TindakanOperasi = $scope.item.TindakanOperasi.id
                }

                var JenisOperasi = null
                if ($scope.item.JenisOperasi != undefined) {
                    JenisOperasi = $scope.item.JenisOperasi.id
                }

                var ScoreOperasi = 0
                if ($scope.item.ScoreOperasi != undefined) {
                    ScoreOperasi = $scope.item.ScoreOperasi
                }

                for (var i = $scope.currentPenyakitPenyerta.length - 1; i >= 0; i--) {
                    var c = $scope.currentPenyakitPenyerta[i].id
                    o = "," + c
                    p = o + p
                }
                listPenyakitPenyerta = p.slice(1, p.length)

                for (var i = $scope.currentImplant.length - 1; i >= 0; i--) {
                    var c = $scope.currentImplant[i].id
                    q = "," + c
                    r = q + r
                }
                listPasangImplant = r.slice(1, r.length)

                var listOperasi = {
                    diagnosafk: DO,
                    keterangandiagnosa: keteranganDO,
                    produkfk: Tindakan,
                    tgloperasi: tglOperasi,
                    jamoperasi: JamOperasi,
                    menitoperasi: MenitOperasi,
                    asascorefk: AsaScore,
                    // tindakanoperasifk : TindakanOperasi,
                    tglinput: moment($scope.now).format('YYYY-MM-DD HH:mm'),
                    jenisoperasifk: JenisOperasi,
                    score: ScoreOperasi,
                    penyakitpenyerta: listPenyakitPenyerta,
                    implant: listPasangImplant

                }

                // var isValid = ModelItem.setValidation($scope, listRawRequired);
                // if(isValid.status){

                dataHead = {

                    // Data Head                      
                    norec: $scope.NorecSurveilans,
                    norec_pd: norec_pd,
                    norec_apd: norec_apd,
                    tglsurveilans: moment($scope.now).format('YYYY-MM-DD HH:mm'),
                    diagnosamasukfk: DM,
                    diagnosakeluarfk: DK,
                    keterangandiagnosamasuk: keteranganDM,
                    keterangandiagnosakeluar: keteranganDK,
                    antibiotikprofillaksis: AntibiotikProfillaksis,
                    dosis: AntibiotikDosis,
                    ruanganfk: IdRuangan,
                    jeniswaktufk: JenisWaktu,
                    culturdarah: KeteranganCulturDarah,
                    cultururine: KeteranganCulturUrine,
                    cultursputum: KeteranganCulturSputum,
                    // Data Head                        
                }
              //  debugger;
                var objSave = {
                    datahead: dataHead,
                    faktorresiko: listFaktorResiko,
                    operasi: listOperasi,
                    faktorResikorawat: dataFRD,
                    antibiotika: dataAntiBio
                }

                medifirstService.post('emr/save-data-surveilans', objSave).then(function (e) {
                    $scope.myVar = 1;
                    ClearAll();
                    init();
                });
                // } else {
                //     ModelItem.showMessages(isValid.messages);
                // }
            }

            $scope.Batal = function () {
                ClearAll();
                $scope.myVar = 1;
            }

            $scope.hapusSurveilans = function () {
                if ($scope.dataSelected != undefined) {
                    var objSave = {
                        norec: $scope.dataSelected.norec,
                    }

                    medifirstService.post('emr/hapus-data-surveilans', objSave).then(function (e) {
                        init();
                    });

                } else {
                    window.messageContainer.error("Pilih Pasien Dahulu!");
                    return;
                }
            }
            //***********************************
        }
    ]);
});