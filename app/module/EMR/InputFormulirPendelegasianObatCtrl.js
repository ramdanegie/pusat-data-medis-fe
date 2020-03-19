define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('InputFormulirPendelegasianObatCtrl', ['$q', '$rootScope', '$scope', 'MedifirstService', '$state', 'CacheHelper', '$mdDialog',
        function ($q, $rootScope, $scope, medifirstService, $state, cacheHelper, $mdDialog) {
            var norecAPD = $state.params.noRec;
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.rke = 1;
            $scope.item.tglresep = $scope.now;
            $scope.item.tglresepAkhir = $scope.now;
            $scope.riwayatForm = false
            $scope.riwayatFormResep = true
            $scope.InputDelegasi = true//false
            $scope.item.nilaiKonversi = 0
            $scope.item.jumlah = 1
            $scope.item.totalSubTotal = 0
            $scope.item.stok = 0
            $scope.item.hargaSatuan = 0
            $scope.item.total = 0
            $scope.showTombol = false
            $scope.norecOrder = ''
            var norec_apd = '';
            var norec_pd = '';
            var nocm_str = '';
            var dataProdukDetail = [];
            var noTerima = '';
            var data2 = [];
            $scope.currentAturanPakai = []
            var hrg1 = 0
            var hrgsdk = 0
            var detail = ''
            $scope.item.TglDelegasi = moment($scope.now).format('YYYY-MM-DD HH:mm');
            LoadCacheHelper();
            FormLoad();
            // LoadCache();/
            init();

            function LoadCacheHelper() {
                var chacePeriode = cacheHelper.get('InputFormulirPendelegasianObatCtrl');
                if (chacePeriode != undefined) {
                    $scope.item.noMr = chacePeriode[0]
                    nocm_str = chacePeriode[0]
                    $scope.item.namaPasien = chacePeriode[1]
                    $scope.item.jenisKelamin = chacePeriode[2]
                    $scope.item.noregistrasi = chacePeriode[3]
                    $scope.item.umur = chacePeriode[4]
                    $scope.item.kelompokPasien = chacePeriode[5]
                    $scope.item.tglRegistrasi = chacePeriode[6]
                    norec_apd = chacePeriode[7]
                    norec_pd = chacePeriode[8]
                    $scope.item.idKelas = chacePeriode[9]
                    $scope.item.kelas = chacePeriode[10]
                    $scope.item.idRuangan = chacePeriode[11]
                    $scope.item.namaRuangan = chacePeriode[12]
                    $scope.item.ceklisNoRegis = chacePeriode[13]
                }
            }

            function init() {
                $scope.isRouteLoading = true;
                medifirstService.get("emr/get-combo-resep-emr", true).then(function (dat) {
                    $scope.isRouteLoading = false;
                    $scope.listRuangan = dat.data.ruanganfarmasi;
                    $scope.listJenisKemasan = dat.data.jeniskemasan;
                    $scope.listProduk = dat.data.produk;
                    $scope.listAsalProduk = dat.data.asalproduk;
                    $scope.listAturanPakai = dat.data.signa;
                    $scope.listJenisRacikan = dat.data.jenisracikan;
                    $scope.item.ruangan = dat.data.ruanganfarmasi[1];
                    $scope.item.jenisKemasan = dat.data.jeniskemasan[1];
                    $scope.listRouteFarmasi = dat.data.route;
                });
            }

            function FormLoad() {
                medifirstService.getPart("sysadmin/general/get-combo-pegawai", true, true, 20).then(function (data) {
                    $scope.listPegawaiFarmasi = data;
                });

                medifirstService.getPart("sysadmin/general/get-combo-pegawai", true, true, 20).then(function (data) {
                    $scope.listPenulisResep = data;
                });

                // medifirstService.get('emr/get-pegawai-parts?id=' + medifirstService.getPegawaiLogin().id).then(function (e) {
                //     $scope.listPenulisResep.add(e.data[0])
                //     $scope.item.PerawatPelaksana = { id: e.data[0].id, namalengkap: e.data[0].namalengkap }
                // });

                // medifirstService.getPart('emr/get-pegawai-parts', true, 10).then(function (e) {
                //     $scope.listPenulisResep = e
                // })

                medifirstService.get("emr/get-transaksi-pelayanan?noReg=" + $scope.item.noregistrasi, true).then(function (dat) {
                    let group = [];
                    if (dat.statResponse == true) {
                        for (var i = 0; i < dat.data.length; i++) {
                            dat.data[i].no = i + 1
                            dat.data[i].total = parseFloat(dat.data[i].jumlah) * (parseFloat(dat.data[i].hargasatuan) - parseFloat(dat.data[i].hargadiscount))
                            dat.data[i].total = parseFloat(dat.data[i].total) + parseFloat(dat.data[i].jasa)
                        }
                        var array = dat.data;
                        let sama = false

                        for (let i in array) {
                            array[i].count = 1
                            sama = false
                            for (let x in group) {
                                if (group[x].noresep == array[i].noresep) {
                                    sama = true;
                                    group[x].count = parseFloat(group[x].count) + parseFloat(array[i].count)

                                }
                            }
                            if (sama == false) {
                                var dataDetail0 = [];
                                for (var f = 0; f < array.length; f++) {
                                    if (array[i].noresep == array[f].noresep) {
                                        dataDetail0.push(array[f]);
                                    };
                                }
                                let result = {
                                    noregistrasi: array[i].noregistrasi,
                                    tglpelayanan: array[i].tglpelayanan,
                                    noresep: array[i].noresep,
                                    aturanpakai: array[i].aturanpakai,
                                    namaruangandepo: array[i].namaruangandepo,
                                    namaruangan: array[i].namaruangan,
                                    dokter: array[i].dokter,
                                    count: array[i].count,
                                    details: dataDetail0
                                }
                                group.push(result)
                            }
                        }
                    }

                    $scope.dataGridResep = group
                    console.log(group)
                    $scope.isRouteLoading = false;
                });
                $scope.riwayatForm = false
                $scope.riwayatFormResep = true
                $scope.inputObatOrder = false;
            }

            $scope.hapus1 = function () {

                if ($scope.item.produk == undefined) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return;
                }

                if ($scope.item.satuan == undefined) {
                    alert("Pilih Satuan terlebih dahulu!!")
                    return;
                }

                var data = {};
                if ($scope.item.no != undefined) {
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no == $scope.item.no) {
                            data2.splice(i, 1);
                            var subTotal = 0;
                            for (var i = data2.length - 1; i >= 0; i--) {
                                subTotal = subTotal + parseFloat(data2[i].total)
                                data2[i].no = i + 1
                            }
                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2
                            });
                        }
                    }
                }
                Kosongkan()
            }

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.tambah = function () {

                if ($scope.item.produk == undefined) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return;
                }

                var dosis = 1;
                if ($scope.item.dosis != undefined) {
                    dosis = $scope.item.dosis
                }

                var nomor = 0
                if ($scope.dataGrid == undefined) {
                    nomor = 1
                } else {
                    nomor = data2.length + 1
                }

                var data = {};
                if ($scope.item.no != undefined) {
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no == $scope.item.no) {
                            data.no = $scope.item.no;
                            data.produkfk = $scope.item.produk.id,
                                data.namaproduk = $scope.item.produk.namaproduk,
                                data.dosis = dosis;
                            data.routefk = $scope.item.Route.id;
                            data.route = $scope.item.Route.name;
                            data.ispagi = $scope.item.chkp;
                            data.issiang = $scope.item.chks;
                            data.issore = $scope.item.chksr;
                            data.ismalam = $scope.item.chkm;
                            data2[i] = data;
                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2
                            });
                        }
                    }
                } else {
                    data = {
                        no: nomor,
                        produkfk: $scope.item.produk.id,
                        namaproduk: $scope.item.produk.namaproduk,
                        dosis: dosis,
                        routefk: $scope.item.Route.id,
                        route: $scope.item.Route.name,
                        ispagi: $scope.item.chkp,
                        issiang: $scope.item.chks,
                        issore: $scope.item.chksr,
                        ismalam: $scope.item.chkm,
                    }
                    data2.push(data)
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: data2
                    });
                }
                Kosongkan();
                clear();
            }

            $scope.klikGrid = function (dataSelected) {
                var dataProduk = [];
                $scope.item.no = dataSelected.no
                $scope.item.dosis = dataSelected.dosis
                $scope.item.produk = { id: dataSelected.produkfk, namaproduk: dataSelected.namaproduk }
                $scope.item.Route = { id: dataSelected.routefk, name: dataSelected.route }
                $scope.item.chkp = 0
                $scope.item.chks = 0
                $scope.item.chksr = 0
                $scope.item.chkm = 0
                let sp = false
                if (dataSelected.ispagi != "0") {
                    sp = true
                    $scope.item.chkp = 1
                }
                let ss = false
                if (dataSelected.issiang != "0") {
                    ss = true
                    $scope.item.chks = 1
                }
                let sr = false
                if (dataSelected.issore != "0") {
                    sr = true
                    $scope.item.chksr = 1
                }
                let sm = false
                if (dataSelected.ismalam != "0") {
                    sm = true
                    $scope.item.chkm = 1
                }
                $scope.listDataSigna = [
                    {
                        "id": 1,
                        "nama": "Aturan Pakai",
                        "detail": [
                            { "id": 1, "nama": "P", 'isChecked': sp },
                            { "id": 2, "nama": "S", 'isChecked': ss },
                            { "id": 3, "nama": "Sr", 'isChecked': sr },
                            { "id": 4, "nama": "M", 'isChecked': sm }
                        ]
                    }
                ];
            }

            $scope.klikGrids = function (dataSelectedDelegasi) {
                if (dataSelectedDelegasi != undefined) {
                    $scope.dataSelectedDelegasi = dataSelectedDelegasi;
                }
            }

            function Kosongkan() {
                $scope.item.produk = ''
                $scope.item.satuan = ''
                $scope.item.nilaiKonversi = 0
                $scope.item.stok = 0
                $scope.item.jumlah = 1
                $scope.item.no = undefined
                $scope.item.total = 0
                $scope.item.hargaSatuan = 0
                $scope.item.chkp = 0
                $scope.item.chks = 0
                $scope.item.chksr = 0
                $scope.item.chkm = 0
                $scope.item.KeteranganPakai = undefined;
                $scope.item.dosis = undefined;
                $scope.item.Route = undefined;
                $scope.item.aturanpakaitxt = undefined;
            }

            function clear() {
                $scope.item.Route = {};
                $scope.item.Route = undefined;
            }

            function cleargrid() {
                for (var i = 0; i < data2.length; i++) {
                    data2.splice(i, 1);
                    var subTotal = 0;
                    for (var i = data2.length - 1; i >= 0; i--) {
                        subTotal = subTotal + parseFloat(data2[i].total)
                    }
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: data2
                    });
                    $scope.item.totalSubTotal = subTotal
                }
            }

            $scope.batal1 = function () {
                Kosongkan();
                clear();
            }

            $scope.batal = function () {
                Kosongkan();
                clear();
                cleargrid();
            }

            $scope.columnGrid = [
                {
                    "field": "no",
                    "title": "No",
                    "width": "30px",
                },
                {
                    "field": "namaproduk",
                    "title": "Deskripsi",
                    "width": "200px",
                },
                {
                    "field": "route",
                    "title": "Rute",
                    "width": "80px",
                },
                {
                    "field": "dosis",
                    "title": "Jml/Dosis",
                    "width": "70px",
                }
            ];


            $scope.detailGridOptions = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            field: "namaproduk",
                            title: "Deskripsi",
                            width: "200px"
                        },
                        {
                            "field": "route",
                            "title": "Rute",
                            "width": "80px",
                        },
                        {
                            "field": "jmldosis",
                            "title": "Jml/Dosis",
                            "width": "70px",
                        }
                    ]
                };
            };

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            $scope.kembali = function () {
                window.history.back();
            }

            $scope.save = function () {
                if ($scope.dataGridRiwayat != undefined && $scope.dataGridRiwayat._data.length > 0 && $scope.norecOrder == '') {
                    var confirm = $mdDialog.confirm()
                        .title('Peringatan')
                        .textContent('Apakah Anda Yakin Akan Menyimpan Data ?')
                        .ariaLabel('Lucky day')
                        .cancel('Tidak')
                        .ok('OK')
                    $mdDialog.show(confirm).then(function () {
                        $scope.simpan();
                    })
                } else {
                    $scope.simpan();
                }

            }

            $scope.simpan = function () {
                if (data2.length == 0) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return
                }

                if ($scope.item.PegawaiFarmasi == undefined) {
                    alert("Pilih Pegawai Farmasi terlebih dahulu!!")
                    return
                }

                // if ($scope.item.PerawatPelaksana == undefined) {
                //     alert("Pilih Perawat Pelaksana terlebih dahulu!!")
                //     return
                // }

                var alergi = 'tidak'
                if ($scope.item.Alergi != undefined) {
                    alergi = $scope.item.Alergi
                    return
                }

                if ($scope.item.PerawatPelaksana == undefined){
                        var strukorder = {
                        norec: $scope.norecOrder,
                        norec_pd: norec_pd,
                        norec_apd: norec_apd,
                        nocmfk: nocm_str,
                        tglpelayanan: moment($scope.item.TglDelegasi).format('YYYY-MM-DD HH:mm'),
                        pegawaifarmasifk: $scope.item.PegawaiFarmasi.id,
                        perawatfk: null,
                        alergi: alergi,
                    }
                } else{
                    var strukorder = {
                        norec: $scope.norecOrder,
                        norec_pd: norec_pd,
                        norec_apd: norec_apd,
                        nocmfk: nocm_str,
                        tglpelayanan: moment($scope.item.TglDelegasi).format('YYYY-MM-DD HH:mm'),
                        pegawaifarmasifk: $scope.item.PegawaiFarmasi.id,
                        perawatfk: $scope.item.PerawatPelaksana.id,
                        alergi: alergi,
                    }
                }
                
                var objSave = [
                    {
                        strukorder: strukorder,
                        detail: data2
                    }
                ]
                medifirstService.post('emr/save-data-delegasi-obat', objSave).then(function (e) {
                    $scope.item.resep == undefined
                    $scope.norecOrder = ''
                    // medifirstService.postLogging('Pendelegasian Pemberi Obat', 'Norec formulirobat_t', e.data.noresep.norec,
                    //     'Order Resep No Order - ' + e.data.noresep.noorder + ' dengan No Registrasi ' + $scope.item.noregistrasi).then(function (res) {
                    //     })                    
                    init();
                    $scope.batal();
                })
            }

            $scope.riwayat = function () {
                $scope.riwayatForm = true
                $scope.riwayatFormResep = false;
                $scope.InputDelegasi = false;
                loadRiwayat();
            }

            function loadRiwayat(params) {
                $scope.isRouteLoading = true;
                medifirstService.get("emr/get-daftar-delegasi?noRM=" + $scope.item.noMr, + "&Noreg=" + $scope.item.noregistrasi, true).then(function (dat) {
                    var datas = dat.data.daftar;
                    for (var i =0; i < datas.length; i++){
                        datas[i].tgldelegasi = moment(datas[i].tglpelayanan).format('DD-MM-YYYY');
                    }
                    $scope.isRouteLoading = false;
                    $scope.dataGridDelegasi = new kendo.data.DataSource({
                        data: datas
                    });
                });
            }

            $rootScope.getRekamMedisCheck = function (bool) {
                if (bool) {
                    loadRiwayat('noReg=' + $scope.item.noregistrasi)
                }
                else {
                    loadRiwayat('nocm=' + $scope.item.noMr)
                }
            }

            $scope.columnGridResep = [
                {
                    "field": "noresep",
                    "title": "No.Resep",
                    "width": "100px",
                },
                {
                    "field": "tglpelayanan",
                    "title": "Tgl Resep",
                    "width": "120px",
                },
                {
                    "field": "noregistrasi",
                    "title": "No.Registrasi",
                    "width": "100px",
                },
                {
                    "field": "dokter",
                    "title": "Penulis Resep",
                    "width": "170px",
                },
                {
                    "field": "namaruangan",
                    "title": "Ruangan",
                    "width": "100px",
                },
                {
                    "field": "namaruangandepo",
                    "title": "Depo",
                    "width": "90px",
                }
            ];

            $scope.data2 = function (dataItem) {
                for (var i = 0; i < dataItem.details.length; i++) {
                    dataItem.details[i].no = i + 1
                }
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details,

                    }),
                    columns: [
                        {
                            "field": "no",
                            "title": "No",
                            "width": "15px",
                        },
                        {
                            "field": "namaproduk",
                            "title": "Deskripsi",
                            "width": "200px",
                        },
                        {
                            "field": "aturanpakai",
                            "title": "Aturan Pakai",
                            "width": "80px",
                        },
                        {
                            "field": "satuanstandar",
                            "title": "Satuan",
                            "width": "80px",
                        },
                        {
                            "field": "jumlah",
                            "title": "Qty",
                            "width": "40px",
                        },
                        {
                            "field": "kekuatan",
                            "title": "Kekuatan",
                            "width": "80px",
                        }

                    ]
                }
            };

            $scope.columnGridDelegasi = [
                {
                    "field": "tgldelegasi",
                    "title": "Tgl Pendelegasian",
                    "width": "90px",
                },
                {
                    "field": "noregistrasi",
                    "title": "No.Registrasi",
                    "width": "100px",
                },
                {
                    "field": "nocm",
                    "title": "No. Rm",
                    "width": "100px",
                },
                {
                    "field": "namapasien",
                    "title": "Nama Pasien",
                    "width": "120px",
                }
            ];

            $scope.data4 = function (dataItem) {
                for (var i = 0; i < dataItem.details.length; i++) {
                    dataItem.details[i].no = i + 1
                    dataItem.details[i].jamdelegasi = moment(dataItem.tglpelayanan).format('HH:mm:ss');
                }
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details,
                    }),
                    columns: [
                        {
                            "field": "no",
                            "title": "No",
                            "width": "15px",
                        },
                        {
                            "field": "namaproduk",
                            "title": "Deskripsi",
                            "width": "200px",
                        },
                        {
                            "field": "route",
                            "title": "Rute",
                            "width": "80px",
                        },
                        {
                            "field": "dosis",
                            "title": "Dosis",
                            "width": "70px",
                        },
                        {
                            "field": "waktuminum",
                            "title": "Waktu Minum",
                            "width": "70px",
                        },
                        {
                            "field": "pegawaifarmasi",
                            "title": "FA",
                            "width": "70px",
                        },
                        {
                            "field": "perawat",
                            "title": "PR",
                            "width": "70px",
                        },
                        {
                            "field": "jamdelegasi",
                            "title": "J",
                            "width": "70px",
                        }
                    ]
                }
            };

            $scope.klikDetail = function (dataSelectedResepDetail) {
                if (dataSelectedResepDetail != undefined) {
                    $scope.dataSelectedResepDetail = dataSelectedResepDetail;                    
                    $scope.item.produk = { id: $scope.dataSelectedResepDetail.produkfk, namaproduk: $scope.dataSelectedResepDetail.namaproduk };
                    $scope.item.chkp = 0
                    $scope.item.chks = 0
                    $scope.item.chksr = 0
                    $scope.item.chkm = 0
                    let sp = false
                    if (dataSelectedResepDetail.ispagi != "0") {
                        sp = true
                        $scope.item.chkp = 1
                    }
                    let ss = false
                    if (dataSelectedResepDetail.issiang != "0") {
                        ss = true
                        $scope.item.chks = 1
                    }
                    let sr = false
                    if (dataSelectedResepDetail.issore != "0") {
                        sr = true
                        $scope.item.chksr = 1
                    }
                    let sm = false
                    if (dataSelectedResepDetail.ismalam != "0") {
                        sm = true
                        $scope.item.chkm = 1
                    }
                    $scope.listDataSigna = [
                        {
                            "id": 1,
                            "nama": "Aturan Pakai",
                            "detail": [
                                { "id": 1, "nama": "P", 'isChecked': sp },
                                { "id": 2, "nama": "S", 'isChecked': ss },
                                { "id": 3, "nama": "Sr", 'isChecked': sr },
                                { "id": 4, "nama": "M", 'isChecked': sm }
                            ]
                        }
                    ];
                    $scope.item.aturanpakaitxt = dataSelectedResepDetail.aturanpakai;
                }
            }

            $scope.newOrder = function () {
                $scope.riwayatFormResep = true;
                $scope.InputDelegasi = true;
                // $scope.riwayatFormResep = false
                // $scope.riwayatForm = false
                // $scope.inputObatOrder = true;
            }

            $scope.back = function () {
                $state.go('DaftarAntrianDokterRajal')
            }

            $scope.showInputDiagnosaDokter = function () {
                var arrStr = cacheHelper.get('InputFormulirPendelegasianObatCtrl');
                cacheHelper.set('CacheInputDiagnosaDokter', arrStr);
                $state.go('InputDiagnosaDokter')
            }

            $scope.resep = function () {
                var arrStr = cacheHelper.get('InputFormulirPendelegasianObatCtrl');
                cacheHelper.set('InputFormulirPendelegasianObatCtrl', arrStr);
                $state.go('InputResepApotikOrderRev')
            }

            $scope.inputTindakanDokter = function () {
                var arrStr = cacheHelper.get('InputFormulirPendelegasianObatCtrl')

                cacheHelper.set('InputTindakanPelayananDokterRevCtrl', arrStr);
                $state.go('InputTindakanPelayananDokterRev', {
                    norecPD: norec_pd,
                    norecAPD: norec_apd,

                });
            }

            $scope.laboratorium = function () {
                var arrStr = cacheHelper.get('InputFormulirPendelegasianObatCtrl')
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananLaboratoriumDokterRev')
            }

            $scope.radiologi = function () {
                var arrStr = cacheHelper.get('InputFormulirPendelegasianObatCtrl')
                cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananRadiologiDokterRev')
            }

            $scope.rekamMedisElektronik = function () {
                var arrStr = cacheHelper.get('InputFormulirPendelegasianObatCtrl');
                cacheHelper.set('cacheRMelektronik', arrStr);
                $state.go('RekamMedisElektronik')
            }

            $scope.inputCPPT = function () {
                var arrStr = cacheHelper.get('InputFormulirPendelegasianObatCtrl');
                cacheHelper.set('cacheCPPT', arrStr);
                $state.go('CPPT')
            }

            $scope.editOrder = function () {
                if ($scope.dataSelectedDelegasi == undefined) {
                    toastr.error('Pilih data dulu')
                    return
                }

                medifirstService.get("emr/get-delegasi-obat?Norec=" + $scope.dataSelectedDelegasi.norec, true).then(function (dat) {
                    var datas = dat.data.daftar[0];
                    $scope.isRouteLoading = false;
                    $scope.item.TglDelegasi = new Date(datas.tglpelayanan)
                    $scope.item.PegawaiFarmasi = { id: datas.pegawaifarmasifk, namalengkap: datas.pegawaifarmasi }
                    $scope.item.PerawatPelaksana = { id: datas.perawatfk, namalengkap: datas.perawat }
                    $scope.item.Alergi = datas.alergi;
                    for (let i = 0; i < dat.data.detail.length; i++) {
                        dat.data.detail[i].no = i + 1;
                    }
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: dat.data.detail
                    });
                    $scope.riwayatFormResep = false
                    $scope.riwayatForm = false
                    $scope.InputDelegasi = true;
                });
            }

            $scope.listDataSigna = [
                {
                    "id": 1,
                    "nama": "Aturan Pakai",
                    "detail": [
                        { "id": 1, "nama": "P", 'isChecked': false },
                        { "id": 2, "nama": "S", 'isChecked': false },
                        { "id": 3, "nama": "Sr", 'isChecked': false },
                        { "id": 4, "nama": "M", 'isChecked': false }
                    ]
                }
            ];
            $scope.item.chkp = 0
            $scope.item.chks = 0
            $scope.item.chksr = 0
            $scope.item.chkm = 0
            $scope.addListAturanPakai = function (bool, data) {
                let jml = 0
                var index = $scope.currentAturanPakai.indexOf(data);
                if (bool == true) {
                    $scope.currentAturanPakai.push(data);
                    if (data.id == 1) {
                        $scope.item.chkp = 1
                        // jml =jml +1
                    }
                    if (data.id == 2) {
                        $scope.item.chks = 1
                        // jml =jml +1
                    }
                    if (data.id == 3) {
                        $scope.item.chksr = 1
                        // jml =jml +1
                    }
                    if (data.id == 4) {
                        $scope.item.chkm = 1
                        // jml =jml +1
                    }
                } else {
                    $scope.currentAturanPakai.splice(index, 1);
                    if (data.id == 1) {
                        $scope.item.chkp = 0
                        // jml =jml -1
                    }
                    if (data.id == 2) {
                        $scope.item.chks = 0
                        // jml =jml -1
                    }
                    if (data.id == 3) {
                        $scope.item.chksr = 0
                        // jml =jml -1
                    }
                    if (data.id == 4) {
                        $scope.item.chkm = 0
                        // jml =jml -1
                    }
                }
                if ($scope.item.chkp == 1) {
                    jml = jml + 1
                }
                if ($scope.item.chks == 1) {
                    jml = jml + 1
                }
                if ($scope.item.chksr == 1) {
                    jml = jml + 1
                }
                if ($scope.item.chkm == 1) {
                    jml = jml + 1
                }
                $scope.item.aturanpakaitxt = jml + 'x1'
                // $scope.item.aturanPakai = $scope.currentAturanPakai.length + 'x1' 
                if (jml == 0) {
                    $scope.item.aturanpakaitxt = ''
                }
            }

            $scope.hapusOrder = function () {
                if ($scope.dataSelectedDelegasi == undefined) {
                    toastr.error("Data Belum Dipilih")
                }

                var stt = '';
                if (confirm('Yakin Mau Menghapus data? ')) {
                    stt = 'true';
                } else {
                    return;
                }

                medifirstService.post('emr/hapus-delegasi-obat', {norec: $scope.dataSelectedDelegasi.norec}).then(function (e) {
                    init();
                })
            }

            $scope.klikExist = function (dataSelectedResepExist) {
                var dataProduk = []
                for (var i = $scope.listProduk.length - 1; i >= 0; i--) {
                    if ($scope.listProduk[i].id == dataSelectedResepExist.id) {
                        dataProduk = $scope.listProduk[i]
                        break;
                    }
                }
                $scope.item.produk = dataProduk
                $scope.getSatuan()
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

            $scope.cetakDelegasi = function () {
                if ($scope.item.noregistrasi == undefined) {
                    toastr.error('Data Belum Ada')
                }

                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/farmasi?cetak-formulir-delegasi-pemberi-obat' + '&Noreg=' + $scope.item.noregistrasi + '&view=true', function (response) {

                });
            }

            //***********************************

        }
    ]);
});

