define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('InputResepApotikOrderRevCtrl', ['$q', '$rootScope', '$scope', 'MedifirstService', '$state', 'CacheHelper', '$mdDialog',
        function ($q, $rootScope, $scope, medifirstService, $state, cacheHelper, $mdDialog) {
            var norecAPD = $state.params.noRec;
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.rke = 1;
            $scope.item.tglresep = $scope.now;
            $scope.item.tglresepAkhir = $scope.now;
            $scope.riwayatForm = false
            $scope.riwayatFormResep = false
            $scope.inputObatOrder = true
            $scope.item.nilaiKonversi = 0
            $scope.item.jumlah = 1
            $scope.item.totalSubTotal = 0
            $scope.item.stok = 0
            $scope.item.hargaSatuan = 0
            $scope.item.total = 0
            $scope.showTombol = false
            $scope.norecOrder = ''
            var statusTambah = true
            var norec_apd = '';
            var norec_pd = '';
            var nocm_str = '';
            var dataProdukDetail = [];
            var noTerima = '';
            var data2 = [];
            $scope.currentAturanPakai = []
            var hrg1 = 0
            var hrgsdk = 0
            var diffDays = 1

            var date1 = new Date($scope.item.tglresep);
            var date2 = new Date($scope.item.tglresepAkhir);
            diffDays = date2.getDate() - date1.getDate();
            diffDays = diffDays + 1
            $scope.kAngka = diffDays
            var detail = ''

            LoadCacheHelper();
            function LoadCacheHelper() {
                // medifirstService.get("akutansi/get-terakhir-posting", true).then(function(dat){
                //     var tgltgltgltgl = dat.data.data[0].max
                //     $scope.startDateOptions = {
                //         min: new Date(tgltgltgltgl),
                //         max: new Date($scope.now)
                //     };
                // })
                medifirstService.get("sysadmin/general/get-tgl-posting", true).then(function (dat) {
                    var tgltgltgltgl = dat.data.mindate[0].max
                    var tglkpnaja = dat.data.datedate
                    $scope.minDate = new Date(tgltgltgltgl);
                    $scope.maxDate = new Date(new Date().setMonth(new Date().getMonth() + 1))//new Date($scope.now);
                    $scope.startDateOptions = {
                        disableDates: function (date) {
                            var disabled = tglkpnaja;
                            if (date && disabled.indexOf(date.getDate()) > -1) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    };
                });
                var chacePeriode = cacheHelper.get('InputResepApotikOrderRevCtrl');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
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
                    medifirstService.get("sysadmin/general/get-sudah-verif?noregistrasi=" +
                        $scope.item.noregistrasi, true).then(function (dat) {
                            $scope.item.statusVerif = dat.data.status
                        });
                    //  ** cek status closing
                    medifirstService.get("sysadmin/general/get-status-close/" + $scope.item.noregistrasi, false).then(function (rese) {
                        if (rese.data.status == true) {
                            toastr.error('Pemeriksaan sudah ditutup tanggal ' + moment(new Date(rese.data.tglclosing)).format('DD-MMM-YYYY HH:mm'), 'Peringatan!')
                            $scope.isSelesaiPeriksa = true
                        }
                    })
                    //** */
                    if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                        $scope.showTombol = true
                    }
                }

                var cacheNoRuang = cacheHelper.get('noRuangInputResep');
                if (cacheNoRuang != undefined) {
                    $scope.item.noRuang = cacheNoRuang
                }
            }

            $scope.getCheckResepPulang = function(checkResepPulang){                
                if (checkResepPulang != undefined) {                             
                    $scope.checkResepPulang = checkResepPulang
                }
            }
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            init();
            function LoadCache() {
                //  var chacePeriode = cacheHelper.get('InputResepApotikOrderCtrl');
                //  if(chacePeriode != undefined){
                //     //var arrPeriode = chacePeriode.split(':');
                //     $scope.item.nocm = chacePeriode[0]
                //     $scope.item.namaPasien = chacePeriode[1]
                //     $scope.item.jenisKelamin = chacePeriode[2]
                //     $scope.item.noRegistrasi = chacePeriode[3]

                //     $scope.item.umur = chacePeriode[4]

                //     $scope.listKelas =([{id:chacePeriode[5],namakelas:chacePeriode[6]}]) 
                //     $scope.item.kelas ={id:chacePeriode[5],namakelas:chacePeriode[6]} 
                //     $scope.item.tglregistrasi = chacePeriode[7]
                //     norec_apd = chacePeriode[8]

                //     $scope.item.tglAwal =  new Date($scope.now);
                //     $scope.item.resep = '-';

                //     init()
                // }else{

                // }
            }
            function init() {
                // debugger;
                $scope.isRouteLoading = true;
                medifirstService.get("emr/get-combo-resep-emr", true).then(function (dat) {
                    $scope.isRouteLoading = false;
                    // $scope.listPenulisResep = dat.data.penulisresep;
                    $scope.listRuangan = dat.data.ruanganfarmasi;
                    $scope.listJenisKemasan = dat.data.jeniskemasan;
                    $scope.listProduk = dat.data.produk;
                    $scope.listAsalProduk = dat.data.asalproduk;
                    // $scope.listRoute = dat.data.route;
                    $scope.listAturanPakai = dat.data.signa;
                    $scope.listJenisRacikan = dat.data.jenisracikan;
                    if ($scope.item.idRuangan == 569){
                        $scope.item.ruangan = dat.data.ruanganfarmasi[0];
                    } else if ($scope.item.idRuangan != 569 && $scope.item.kelas == "Non Kelas"){
                        $scope.item.ruangan = dat.data.ruanganfarmasi[1];
                    } else if ($scope.item.idRuangan != 569 && $scope.item.kelas != "Non Kelas"){
                        $scope.item.ruangan = dat.data.ruanganfarmasi[2];
                    }
                    $scope.item.jenisKemasan = dat.data.jeniskemasan[1];
                });
                medifirstService.get('emr/get-pegawai-parts?id=' + medifirstService.getPegawaiLogin().id).then(function (e) {
                    $scope.listPenulisResep.add(e.data[0])
                    $scope.item.penulisResep = e.data[0]// { id: medifirstService.getPegawaiLogin().id, namalengkap: medifirstService.getPegawaiLogin().namaLengkap };
                })
                // medifirstService.get("get-data-login", true).then(function (dat) {
                // var penulis = []
                // penulis.push({id:medifirstService.getPegawaiLogin().id,namalengkap:medifirstService.getPegawaiLogin().namaLengkap})
                // $scope.listPenulisResep = penulis
                // $scope.item.penulisResep = { id: medifirstService.getPegawaiLogin().id, namalengkap: medifirstService.getPegawaiLogin().namaLengkap };
                // });
                medifirstService.get('emr/get-daftar-detail-order?norec_apd=' + norec_apd).then(function (e) {
                    for (var i = e.data.length - 1; i >= 0; i--) {
                        e.data[i].no = i + 1                        
                        if (e.data[i].reseppulang == 1) {
                            e.data[i].cekreseppulang = "✔"                            
                        }else{
                            e.data[i].cekreseppulang = "-"
                        }
                    }
                    $scope.dataGridRiwayat = new kendo.data.DataSource({
                        data: e.data,
                        pageSize: 10
                    });


                });
                medifirstService.get('emr/get-daftar-obat-sering-diresepkan').then(function (e) {
                    var array = e.data.data
                    for (let i = 0; i < array.length; i++) {
                        const element = array[i];
                        element.no = i + 1
                    }

                    $scope.dataGridResepExist = new kendo.data.DataSource({
                        data: array,
                        pageSize: 10
                    });


                });

                if ($scope.item.ceklisNoRegis == true) {
                    loadRiwayat('noReg=' + $scope.item.noregistrasi)


                } else {
                    loadRiwayat('nocm=' + $scope.item.noMr)
                }
            }

            medifirstService.getPart('emr/get-pegawai-parts', true, 10).then(function (e) {
                $scope.listPenulisResep = e
                // $scope.item.penulisResep = { id: medifirstService.getPegawaiLogin().id, namalengkap: medifirstService.getPegawaiLogin().namaLengkap };
            })
            $scope.getSatuan = function () {
                medifirstService.get("emr/get-info-stok?produkfk=" + $scope.item.produk.id, true)
                    .then(function (e) {
                        $scope.item.namaProduks = $scope.item.produk.namaproduk;
                        for (var i = 0; i < e.data.infostok.length; i++) {
                            e.data.infostok[i].no = i + 1
                        }
                        $scope.dataGridStok = new kendo.data.DataSource({
                            data: e.data.infostok,
                            pageable: true,
                            pageSize: 5,
                            total: e.data.infostok.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                    }
                                }
                            }
                        })
                    })
                GETKONVERSI()
            }
            function GETKONVERSI() {
                $scope.listSatuan = $scope.item.produk.konversisatuan
                if ($scope.listSatuan.length == 0) {
                    $scope.listSatuan = ([{ ssid: $scope.item.produk.ssid, satuanstandar: $scope.item.produk.satuanstandar }])
                }
                $scope.item.satuan = { ssid: $scope.item.produk.ssid, satuanstandar: $scope.item.produk.satuanstandar }
                $scope.item.nilaiKonversi = 1// $scope.item.satuan.nilaikonversi
                if ($scope.item.ruangan == undefined) {
                    //alert("Pilih Ruangan terlebih dahulu!!")
                    return;
                }
                // if ($scope.item.asal == undefined) {
                //     //alert("Pilih asal terlebih dahulu!!")
                //     return;
                // }
                statusTambah = false
                $scope.isRouteLoading = false;
                medifirstService.get("emr/get-produkdetail?" +
                    "produkfk=" + $scope.item.produk.id +
                    "&ruanganfk=" + $scope.item.ruangan.id, true).then(function (dat) {
                        $scope.isRouteLoading = false;
                        dataProdukDetail = dat.data.detail;
                        $scope.item.stok = dat.data.jmlstok / $scope.item.nilaiKonversi
                        $scope.item.kekuatan = dat.data.kekuatan
                        $scope.item.sediaan = dat.data.sediaan
                     
                        // $scope.item.dosis =$scope.dataSelected.dosis
                        // $scope.item.jumlahxmakan =parseFloat($scope.dataSelected.jumlah) / parseFloat($scope.item.dosis)
                        if ($scope.dataSelected != undefined ){                        
                            $scope.item.nilaiKonversi = $scope.dataSelected.nilaikonversi
                            // $scope.item.satuan = {ssid:$scope.dataSelected.satuanstandarfk,satuanstandar:$scope.dataSelected.satuanstandar}
                            $scope.item.stok = $scope.dataSelected.jmlstok //* $scope.item.nilaiKonversi 
                            $scope.item.jumlah = $scope.dataSelected.jumlah
                            $scope.item.hargaSatuan = $scope.dataSelected.hargasatuan
                            // $scope.item.hargadiskon = $scope.dataSelected.hargadiscount
                            $scope.item.total = $scope.dataSelected.total
                            if($scope.item.kekuatan != undefined && $scope.item.kekuatan != 0) {
                                $scope.item.jumlahxmakan = (parseFloat($scope.item.jumlah) / parseFloat($scope.item.dosis)) * parseFloat($scope.item.kekuatan)
                            }
                        }
                        statusTambah = true
                        gettotal();
                    });
            }
            $scope.getNilaiKonversi = function () {
                $scope.item.nilaiKonversi = $scope.item.satuan.nilaikonversi
            }
            $scope.$watch('item.nilaiKonversi', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if ($scope.item.stok > 0) {
                        $scope.item.stok = parseFloat($scope.item.stok) * (parseFloat(oldValue) / parseFloat(newValue))
                        $scope.item.jumlah = 1//parseFloat($scope.item.jumlah) / parseFloat(newValue)
                        $scope.item.hargaSatuan = 0//hrg1 * parseFloat(newValue)
                        // $scope.item.hargadiskon =0//hrgsdk * parseFloat(newValue)
                        $scope.item.total = 0// parseFloat(newValue) * 
                        // (hrg1-hrgsdk)
                    }
                }
            });
            $scope.$watch('item.tglresepAkhir', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    var date1 = new Date($scope.item.tglresep);
                    var date2 = new Date($scope.item.tglresepAkhir);
                    var Difference_In_Time = date2.getTime() - date1.getTime();
                    diffDays = date2.getDate() - date1.getDate();
                    diffDays = diffDays + 1
                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                    $scope.kAngka = Difference_In_Days//diffDays
                }
            });
            $scope.$watch('item.jumlahxmakan', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if ($scope.item.stok > 0) {
                        // $scope.item.jumlah = parseFloat($scope.item.jumlahxmakan) * parseFloat($scope.item.dosis)
                        $scope.item.jumlah = (parseFloat($scope.item.jumlahxmakan) * parseFloat($scope.item.dosis)) / parseFloat($scope.item.kekuatan)
                    }
                }
            });
            $scope.$watch('item.dosis', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if ($scope.item.stok > 0) {
                        // $scope.item.jumlah = parseFloat($scope.item.jumlahxmakan) * parseFloat($scope.item.dosis)
                        $scope.item.jumlah = (parseFloat($scope.item.jumlahxmakan) * parseFloat($scope.item.dosis)) / parseFloat($scope.item.kekuatan)
                    }
                }
            });
            $scope.$watch('item.jenisKemasan.jeniskemasan', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if (newValue == 'Racikan') {
                        $scope.showRacikanDose = true
                    } else {
                        $scope.showRacikanDose = false
                    }
                }
            });
            $scope.$watch('item.jumlah', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    gettotal()
                }
            });

            function gettotal() {
                if ($scope.item.stok == 0) {
                    $scope.item.jumlah = 1
                    //alert('Stok kosong')

                    return;
                }
                // var tarifJasa = 0
                // var qty20 = 0
                // if ($scope.item.jenisKemasan.id == 2) {
                //     tarifJasa = 800
                // }
                // if ($scope.item.jenisKemasan.id == 1) {
                //     qty20 = Math.floor(parseFloat($scope.item.jumlah)/20)
                //     if (parseFloat($scope.item.jumlah) % 20 == 0) {
                //         qty20 = qty20 
                //     }else{
                //         qty20 = qty20 + 1
                //     }

                //     tarifJasa = 800 * qty20
                // }

                var ada = false;
                for (var i = 0; i < dataProdukDetail.length; i++) {
                    ada = false
                    if (parseFloat($scope.item.jumlah * parseFloat($scope.item.nilaiKonversi)) <= parseFloat(dataProdukDetail[i].qtyproduk)) {
                        hrg1 = Math.round(parseFloat(dataProdukDetail[i].hargajual) * parseFloat($scope.item.nilaiKonversi))
                        $scope.item.hargaSatuan = parseFloat(hrg1)
                        $scope.item.total = parseFloat((parseFloat($scope.item.jumlah) * (hrg1)))//+tarifJasa
                        noTerima = dataProdukDetail[i].norec
                        ada = true;
                        break;
                    }
                }
                if (ada == false) {
                    $scope.item.hargaSatuan = 0
                    $scope.item.total = 0

                    noTerima = ''
                }
                if ($scope.item.jumlah == 0) {
                    $scope.item.hargaSatuan = 0
                }
                // if ($scope.item.stok > 0) {
                //     $scope.item.stok =parseFloat($scope.item.stok) * (parseFloat(oldValue)/ parseFloat(newValue))
                // }
            }
            $scope.hapus1 = function () {
                if ($scope.item.jumlah == 0) {
                    alert("Jumlah harus di isi!")
                    return;
                }
                if ($scope.item.total == 0) {
                    alert("Stok tidak ada harus di isi!")
                    return;
                }
                if ($scope.item.jenisKemasan == undefined) {
                    alert("Pilih Jenis Kemasan terlebih dahulu!!")
                    return;
                }
                // if ($scope.item.asal == undefined) {
                //     alert("Pilih Asal Produk terlebih dahulu!!")
                //     return;
                // }
                if ($scope.item.produk == undefined) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return;
                }
                if ($scope.item.satuan == undefined) {
                    alert("Pilih Satuan terlebih dahulu!!")
                    return;
                }
                // var nomor =0
                // if ($scope.dataGrid == undefined) {
                //     nomor = 1
                // }else{
                //     nomor = data2.length+1
                // }
                var data = {};
                if ($scope.item.no != undefined) {
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no == $scope.item.no) {

                            //data2[i] = data;
                            // delete data2[i]
                            data2.splice(i, 1);

                            var subTotal = 0;
                            for (var i = data2.length - 1; i >= 0; i--) {
                                subTotal = subTotal + parseFloat(data2[i].total)
                                data2[i].no = i + 1
                            }
                            // data2.length = data2.length -1
                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2
                            });
                            // for (var i = data2.length - 1; i >= 0; i--) {
                            //     subTotal=subTotal+ parseFloat(data2[i].total)
                            // }
                            // $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.item.totalSubTotal = subTotal
                        }
                        // break;
                    }

                }
                Kosongkan()
            }
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.tambah = function () {
                if(statusTambah == false){
                    return
                }
                if ($scope.dataGridRiwayat != undefined && $scope.norecOrder == '' && $scope.item.ruangan.id == 94) {
                    if ($scope.dataGridRiwayat._data.length > 0) {
                        var orderanDepoRajal = []
                        for (let i = 0; i < $scope.dataGridRiwayat._data.length; i++) {
                            const element = $scope.dataGridRiwayat._data[i];
                            if (element.namaruangan == 'DEPO RAJAL') {
                                orderanDepoRajal.push(element)
                            }
                        }
                        if (orderanDepoRajal.length > 0) {
                            toastr.error('Hanya Bisa Order Satu Kali !', 'Peringatan')
                            return
                        }
                    }
                }
                if ($scope.isSelesaiPeriksa == true) {
                    toastr.error("Data Sudah Diclosing!");
                    return;
                }
                // if ($scope.item.statusVerif == true) {
                //     toastr.error("Data Sudah Diclosing, Hubungi Tatarekening!");
                //     return;
                // }
                if ($scope.item.jumlah == 0) {
                    alert("Jumlah harus di isi!")
                    return;
                }
                if ($scope.item.stok == 0) {
                    alert("Stok tidak ada harus di isi!")
                    return;
                }
                if ($scope.item.jenisKemasan == undefined) {
                    alert("Pilih Jenis Kemasan terlebih dahulu!!")
                    return;
                }
                if ($scope.item.produk == undefined) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return;
                }
                if ($scope.item.satuan == undefined) {
                    alert("Pilih Satuan terlebih dahulu!!")
                    return;
                }
                if ($scope.item.aturanpakaitxt == undefined) {
                    alert("Aturan Pakai Belum diisi!!")
                    return;
                }
                if ($scope.item.stok < $scope.item.jumlah) {
                    alert("Stok tidak cukup!!")
                    return;
                }
                var KetPakai = "";
                if ($scope.item.KeteranganPakai) {
                    KetPakai = $scope.item.KeteranganPakai;
                }

                var dosis = 1;
                if ($scope.item.jenisKemasan.jeniskemasan == 'Racikan') {
                    dosis = $scope.item.dosis
                }
                var jRacikan = null
                if ($scope.item.jenisRacikan != undefined) {
                    jRacikan = $scope.item.jenisRacikan.id
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
                            data.no = $scope.item.no

                            data.noregistrasifk = norec_apd//$scope.item.noRegistrasi
                            //data.tglregistrasi = $scope.item.tglregistrasi
                            data.generik = null
                            data.hargajual = $scope.item.hargaSatuan
                            data.jenisobatfk = jRacikan
                            //data.kelasfk = $scope.item.kelas.id
                            data.stock = $scope.item.stok
                            data.harganetto = $scope.item.hargaSatuan
                            data.nostrukterimafk = noTerima
                            data.ruanganfk = $scope.item.ruangan.id

                            data.rke = $scope.item.rke
                            data.jeniskemasanfk = $scope.item.jenisKemasan.id
                            data.jeniskemasan = $scope.item.jenisKemasan.jeniskemasan
                            data.aturanpakaifk = 0//$scope.item.aturanPakai.id
                            data.aturanpakai = $scope.item.aturanpakaitxt//aturanPakai.name
                            data.ispagi = $scope.item.chkp
                            data.issiang = $scope.item.chks
                            data.issore = $scope.item.chksr
                            data.ismalam = $scope.item.chkm
                            data.asalprodukfk = 0//$scope.item.asal.id
                            data.asalproduk = ''//$scope.item.asal.asalproduk
                            data.produkfk = $scope.item.produk.id
                            data.namaproduk = $scope.item.produk.namaproduk
                            data.nilaikonversi = $scope.item.nilaiKonversi
                            data.satuanstandarfk = $scope.item.satuan.ssid
                            data.satuanstandar = $scope.item.satuan.satuanstandar
                            data.satuanviewfk = $scope.item.satuan.ssid
                            data.satuanview = $scope.item.satuan.satuanstandar
                            data.jmlstok = $scope.item.stok
                            data.jumlah = $scope.item.jumlah
                            data.hargasatuan = $scope.item.hargaSatuan
                            data.hargadiscount = 0
                            data.total = $scope.item.total
                            data.dosis = dosis
                            data.jumlahxmakan = $scope.item.jumlahxmakan
                            data.jmldosis = String(($scope.item.jumlah) / dosis) + '/' + String(dosis)
                            data.keterangan = KetPakai

                            data2[i] = data;
                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2
                            });

                        }
                    }

                } else {
                    data = {
                        no: nomor,
                        generik: null,
                        hargajual: $scope.item.hargaSatuan,
                        jenisobatfk: jRacikan,
                        //kelasfk:$scope.item.kelas.id,
                        stock: $scope.item.stok,
                        harganetto: $scope.item.hargaSatuan,
                        nostrukterimafk: noTerima,
                        ruanganfk: $scope.item.ruangan.id,//£££
                        rke: $scope.item.rke,
                        jeniskemasanfk: $scope.item.jenisKemasan.id,
                        jeniskemasan: $scope.item.jenisKemasan.jeniskemasan,
                        aturanpakaifk: 0,//$scope.item.aturanPakai.id,
                        aturanpakai: $scope.item.aturanpakaitxt,//aturanPakai.name,
                        ispagi: $scope.item.chkp,
                        issiang: $scope.item.chks,
                        issore: $scope.item.chksr,
                        ismalam: $scope.item.chkm,
                        asalprodukfk: 0,//$scope.item.asal.id,
                        asalproduk: '',//$scope.item.asal.asalproduk,
                        produkfk: $scope.item.produk.id,
                        namaproduk: $scope.item.produk.namaproduk,
                        nilaikonversi: $scope.item.nilaiKonversi,
                        satuanstandarfk: $scope.item.satuan.ssid,
                        satuanstandar: $scope.item.satuan.satuanstandar,
                        satuanviewfk: $scope.item.satuan.ssid,
                        satuanview: $scope.item.satuan.satuanstandar,
                        jmlstok: $scope.item.stok,
                        jumlah: $scope.item.jumlah,
                        hargasatuan: $scope.item.hargaSatuan,
                        hargadiscount: 0,
                        total: $scope.item.total,
                        dosis: dosis,
                        jumlahxmakan: $scope.item.jumlahxmakan,
                        jmldosis: String(($scope.item.jumlah) / dosis) + '/' + String(dosis),
                        keterangan: KetPakai
                    }
                    data2.push(data)
                    // $scope.dataGrid.add($scope.dataSelected)
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: data2
                    });
                    var subTotal = 0;
                    for (var i = data2.length - 1; i >= 0; i--) {
                        subTotal = subTotal + parseFloat(data2[i].total)
                    }
                    $scope.item.totalSubTotal = subTotal
                }
                if ($scope.item.jenisKemasan.jeniskemasan != 'Racikan') {
                    $scope.item.rke = parseFloat($scope.item.rke) + 1
                }
                Kosongkan();
                clear();
            }

            $scope.klikGrid = function (dataSelected) {
                if(statusTambah == false)
                return
                var dataProduk = [];
                //no:no,
                $scope.item.no = dataSelected.no
                $scope.item.rke = dataSelected.rke
                medifirstService.get("emr/get-jenis-obat?jrid=" + dataSelected.jenisobatfk, true).then(function (JR) {
                    $scope.item.jenisRacikan = { id: JR.data.data[0].id, jenisracikan: JR.data.data[0].jenisracikan }
                });
                $scope.item.jenisKemasan = { id: dataSelected.jeniskemasanfk, jeniskemasan: dataSelected.jeniskemasan }
                $scope.item.jumlahxmakan = dataSelected.jumlahxmakan
                $scope.item.dosis = dataSelected.dosis
                $scope.item.aturanPakai = { id: dataSelected.aturanpakaifk, name: dataSelected.aturanpakai }
                $scope.item.aturanpakaitxt = dataSelected.aturanpakai
                $scope.item.KeteranganPakai = dataSelected.keterangan
                $scope.currentAturanPakai = []

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
                // let sp = dataSelected.ispagi
                // let ss = dataSelected.issiang
                // let sm = dataSelected.ismalam
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
                $scope.item.asal = { id: dataSelected.asalprodukfk, asalproduk: dataSelected.asalproduk }
                for (var i = $scope.listProduk.length - 1; i >= 0; i--) {
                    if ($scope.listProduk[i].id == dataSelected.produkfk) {
                        dataProduk = $scope.listProduk[i]
                        break;
                    }
                }
                $scope.item.produk = dataProduk//{id:dataSelected.produkfk,namaproduk:dataSelected.namaproduk}
                GETKONVERSI()

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
                // $scope.item.chkp = 0
                // $scope.item.chks = 0
                // $scope.item.chksr = 0
                // $scope.item.chkm = 0
                $scope.item.KeteranganPakai = undefined;
                // $scope.listDataSigna = [
                //     {
                //         "id": 1,
                //         "nama": "Aturan Pakai",
                //         "detail": [
                //             { "id": 1, "nama": "P" ,'isChecked':false},
                //             { "id": 2, "nama": "S" ,'isChecked':false},
                //             { "id": 3, "nama": "Sr" ,'isChecked':false},
                //             { "id": 4, "nama": "M" ,'isChecked':false}                      
                //         ]
                //     }
                // ];
            }
            function clear() {
                if ($scope.item.jenisKemasan.jeniskemasan != 'Racikan') {
                    $scope.item.jenisRacikan = ''
                }

                // $scope.item.aturanPakai = ''
                // $scope.item.aturanpakaitxt = ''
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
                    "field": "rke",
                    "title": "R/ke",
                    "width": "40px",
                },
                {
                    "field": "jeniskemasan",
                    "title": "Kemasan",
                    "width": "70px",
                },
                {
                    "field": "jmldosis",
                    "title": "Jml/Dosis",
                    "width": "70px",
                },
                {
                    "field": "aturanpakai",
                    "title": "Aturan Pakai",
                    "width": "100px",
                },
                {
                    "field": "keterangan",
                    "title": "Keterangan Pakai",
                    "width": "120px",
                },
                {
                    "field": "namaproduk",
                    "title": "Deskripsi",
                    "width": "200px",
                },
                {
                    "field": "satuanstandar",
                    "title": "Satuan",
                    "width": "80px",
                },
                {
                    "field": "stock",
                    "title": "Stok",
                    "width": "50px",
                },
                {
                    "field": "jumlah",
                    "title": "Qty",
                    "width": "70px",
                },
                {
                    "field": "hargasatuan",
                    "title": "Harga Satuan",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                },
                {
                    "field": "total",
                    "title": "Total",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                }
            ];
            $scope.columnGridRiwayat = [
                {
                    "field": "no",
                    "title": "No",
                    "width": "20px",
                },
                {
                    "field": "tglorder",
                    "title": "Tgl Order",
                    "width": "50px",
                },
                {
                    "field": "noorder",
                    "title": "No Order",
                    "width": "60px",
                },
                {
                    "field": "namalengkap",
                    "title": "Dokter",
                    "width": "100px"
                },
                {
                    "field": "namaruangan",
                    "title": "Apotik",
                    "width": "70px",
                },
                {
                    "field": "statusorder",
                    "title": "Status",
                    "width": "70px",
                },
                {
                    "field": "cekreseppulang",
                    "title": "Resep Pulang",
                    "width": "50px",
                }
            ];
            $scope.detailGridOptions = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            field: "rke",
                            title: "Rke",
                            width: "30px",
                        },
                        {
                            field: "jeniskemasan",
                            title: "Jenis Kemasan",
                            width: "100px",
                        },
                        {
                            field: "namaproduk",
                            title: "Deskripsi",
                            width: "200px"
                        },
                        {
                            field: "satuanstandar",
                            title: "Satuan",
                            width: "100px"
                        },
                        {
                            field: "aturanpakai",
                            title: "Aturan Pakai",
                            width: "100px"
                        },
                        {
                            field: "jumlah",
                            title: "Qty",
                            width: "100px"
                        }]
                };
            };
            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.kembali = function () {
                //$state.go("TransaksiPelayananApotik")
                window.history.back();
            }

            $scope.save = function () {
                if ($scope.dataGridRiwayat != undefined && $scope.dataGridRiwayat._data.length > 0 && $scope.norecOrder == '' && $scope.item.ruangan.id == 94) {
                    var confirm = $mdDialog.confirm()
                        .title('Peringatan')
                        .textContent('Order Resep sudah dilakukan, Apakah ingin order lagi ?')
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
                if (diffDays < 1) {
                    alert("Tanggal Akhir tidak boleh lebih kecil!!")
                    return
                }

                if ($scope.item.noRuang == undefined) {
                    alert("Nomor Ruangan Tidak Boleh Kosong!!")
                    return
                }

                var checkRP = 0;
                if ($scope.checkResepPulang == true) {
                    checkRP = 1;
                }

                var tglResepHari = ''
                for (var i = diffDays - 1; i >= 0; i--) {
                    var someDate = moment($scope.item.tglresep).toDate();//new Date(moment($scope.item.tglresep).format('YYYY-MM-DD hh:mm:ss'));
                    var numberOfDaysToAdd = i;
                    tglResepHari = moment(someDate.setDate(someDate.getDate() + numberOfDaysToAdd)).format('YYYY-MM-DD hh:mm:ss');

                    var strukorder = {
                        norec: $scope.norecOrder,
                        tglresep: tglResepHari,//moment($scope.item.tglAwal).format('YYYY-MM-DD hh:mm:ss'),
                        penulisresepfk: $scope.item.penulisResep.id,
                        ruanganfk: $scope.item.ruangan.id,
                        noregistrasifk: norec_apd,
                        qtyproduk: $scope.dataGrid._data.length,
                        noruangan: $scope.item.noRuang != undefined ? $scope.item.noRuang : null,
                        isreseppulang: checkRP != undefined ? checkRP : null
                    }
                    var objSave = [
                        {
                            strukorder: strukorder,
                            orderfarmasi: data2
                        }
                    ]
                    medifirstService.post('emr/simpan-order-pelayananobatfarmasi', objSave).then(function (e) {
                        $scope.item.resep == undefined
                        $scope.norecOrder = ''
                        medifirstService.postLogging('Order Resep', 'Norec strukresep_t', e.data.noresep.norec,
                            'Order Resep No Order - ' + e.data.noresep.noorder + ' dengan No Registrasi ' + $scope.item.noregistrasi).then(function (res) {
                            })
                        // $scope.item.resep = e.data.noresep.noorder

                        init();
                        $scope.batal();
                        if ($scope.item.noRuang != undefined)
                            cacheHelper.set('noRuangInputResep', $scope.item.noRuang)
                    })
                }
            }

            $scope.riwayat = function () {
                $scope.riwayatForm = true
                $scope.riwayatFormResep = false
                $scope.inputObatOrder = false;
            }
            function loadRiwayat(params) {
                $scope.isRouteLoading = true;
                medifirstService.get("emr/get-transaksi-pelayanan?" + params, true).then(function (dat) {
                    let group = [];                                   
                    if (dat.statResponse == true) {
                        for (var i = 0; i < dat.data.length; i++) {
                            dat.data[i].no = i + 1
                            dat.data[i].total = parseFloat(dat.data[i].jumlah) * (parseFloat(dat.data[i].hargasatuan) - parseFloat(dat.data[i].hargadiscount))
                            dat.data[i].total = parseFloat(dat.data[i].total) + parseFloat(dat.data[i].jasa)
                            if ( dat.data[i].reseppulang == '1') {
                                dat.data[i].cekreseppulang = '✔'
                            }else{
                                dat.data[i].cekreseppulang = '-'
                            }
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
                                    count: array[i].count,
                                    aturanpakai: array[i].aturanpakai,
                                    namaruangandepo: array[i].namaruangandepo,
                                    namaruangan: array[i].namaruangan,
                                    dokter: array[i].dokter,
                                    cekreseppulang: array[i].cekreseppulang,                                 
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
                // $scope.riwayatForm = false
                // $scope.riwayatFormResep = true
                // $scope.inputObatOrder = false;
            }
            $rootScope.getRekamMedisCheck = function (bool) {
                if (bool) {
                    loadRiwayat('noReg=' + $scope.item.noregistrasi)
                }
                else {
                    loadRiwayat('nocm=' + $scope.item.noMr)
                }
            }
            $scope.riwayatResep = function () {
                $scope.isRouteLoading = true;
                medifirstService.get("emr/get-transaksi-pelayanan?noReg=" +$scope.item.noregistrasi
                // nocm=" + $scope.item.noMr
                    // + "&noregistrasifk=" + norec_apd
                    , true).then(function (dat) {
                        let group = [];
                        if (dat.statResponse == true) {
                            for (var i = 0; i < dat.data.length; i++) {
                                dat.data[i].no = i + 1                                
                                dat.data[i].total = parseFloat(dat.data[i].jumlah) * (parseFloat(dat.data[i].hargasatuan) - parseFloat(dat.data[i].hargadiscount));
                                dat.data[i].total = parseFloat(dat.data[i].total) + parseFloat(dat.data[i].jasa);
                                if (dat.data[i].reseppulang == '1') {
                                    dat.data[i].cekreseppulang = "✔"
                                }else{
                                    dat.data[i].cekreseppulang = "-"
                                }
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
                                        cekreseppulang : array[i].cekreseppulang,
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
                },
                {
                    "field": "cekreseppulang",
                    "title": "Resep Pulang",
                    "width": "90px",
                     "template": "<span class='style-center'>#: cekreseppulang #</span>"
                }
            ];
            $scope.data2 = function (dataItem) {
                // debugger
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
            $scope.newOrder = function () {
                $scope.riwayatFormResep = false
                $scope.riwayatForm = false
                $scope.inputObatOrder = true;
            }
            $scope.back = function () {
                $state.go('DaftarAntrianDokterRajal')
            }

            $scope.showInputDiagnosaDokter = function () {
                var arrStr = cacheHelper.get('InputResepApotikOrderRevCtrl');
                cacheHelper.set('CacheInputDiagnosaDokter', arrStr);
                $state.go('InputDiagnosaDokter')
            }
            $scope.resep = function () {
                var arrStr = cacheHelper.get('InputResepApotikOrderRevCtrl');
                cacheHelper.set('InputResepApotikOrderRevCtrl', arrStr);
                $state.go('InputResepApotikOrderRev')
            }
            $scope.inputTindakanDokter = function () {
                var arrStr = cacheHelper.get('InputResepApotikOrderRevCtrl')

                cacheHelper.set('InputTindakanPelayananDokterRevCtrl', arrStr);
                $state.go('InputTindakanPelayananDokterRev', {
                    norecPD: norec_pd,
                    norecAPD: norec_apd,

                });
            }
            $scope.laboratorium = function () {
                var arrStr = cacheHelper.get('InputResepApotikOrderRevCtrl')
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananLaboratoriumDokterRev')
            }
            $scope.radiologi = function () {
                var arrStr = cacheHelper.get('InputResepApotikOrderRevCtrl')
                cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananRadiologiDokterRev')
            }
            $scope.rekamMedisElektronik = function () {
                var arrStr = cacheHelper.get('InputResepApotikOrderRevCtrl');
                cacheHelper.set('cacheRMelektronik', arrStr);
                $state.go('RekamMedisElektronik')
            }
            $scope.inputCPPT = function () {
                var arrStr = cacheHelper.get('InputResepApotikOrderRevCtrl');
                cacheHelper.set('cacheCPPT', arrStr);
                $state.go('CPPT')
            }
            $scope.columnGridStok = [
                {
                    "field": "no",
                    "title": "No",
                    "width": "20px",
                },
                {
                    "field": "namaruangan",
                    "title": "Ruangan",
                    "width": "100px",
                },
                {
                    "field": "qtyproduk",
                    "title": "Stok",
                    "width": "50px",
                }

            ];
            $scope.editOrder = function () {
                if ($scope.dataSelectedRiwayat == undefined) {
                    toastr.error('Pilih data dulu')
                    return
                }
                if ($scope.dataSelectedRiwayat.statusorder != "Menunggu") {
                    toastr.error('Tidak bisa di edit sudah di verifikasi')
                    return
                }

                medifirstService.get("farmasi/get-detail-order?noorder=" + $scope.dataSelectedRiwayat.noorder, true).then(function (dat) {
                    $scope.isRouteLoading = false;
                    $scope.norecOrder = $scope.dataSelectedRiwayat.norec_order
                    $scope.item.resep = $scope.dataSelectedRiwayat.noorder
                    $scope.item.ruangan = { id: dat.data.strukorder.id, namaruangan: dat.data.strukorder.namaruangan }
                    $scope.item.penulisResep = { id: dat.data.strukorder.pgid, namalengkap: dat.data.strukorder.namalengkap }
                    $scope.item.tglresep = new Date(dat.data.strukorder.tglorder)
                    $scope.item.tglresepAkhir = new Date(dat.data.strukorder.tglorder)
                    if ($scope.dataSelectedRiwayat.reseppulang == '1') {
                        $scope.checkResepPulang = true;
                    }else{
                        $scope.checkResepPulang = false;
                    }
                    
                    data2 = dat.data.orderpelayanan
                    for (var i = data2.length - 1; i >= 0; i--) {



                        data2[i].noregistrasifk = norec_apd//$scope.item.noRegistrasi
                        data2[i].tglregistrasi = $scope.item.tglregistrasi

                        data2[i].kelasfk = $scope.item.kelas.id

                    }

                    $scope.dataGrid = new kendo.data.DataSource({
                        data: data2
                    });


                    var subTotal = 0;
                    for (var i = data2.length - 1; i >= 0; i--) {
                        subTotal = subTotal + parseFloat(data2[i].total)
                    }
                    $scope.item.totalSubTotal = subTotal
                    $scope.riwayatFormResep = false
                    $scope.riwayatForm = false
                    $scope.inputObatOrder = true;
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
                if ($scope.dataSelectedRiwayat == undefined) return
                if ($scope.dataSelectedRiwayat.statusorder != "Menunggu") {
                    toastr.error('Tidak bisa di Hapus sudah di verifikasi')
                    return
                }
                var stt = '';
                if (confirm('Yakin Mau Menghapus data? ')) {
                    stt = 'true';
                } else {
                    return;
                }
                medifirstService.post('emr/hapus-order-pelayananobatfarmasi', { norec: $scope.dataSelectedRiwayat.norec_order }).then(function (e) {
                    init();
                })
            }
            $scope.columnGridResepExist = [
                {
                    "field": "no",
                    "title": "No",
                    "width": "20px",
                },
                {
                    "field": "namaproduk",
                    "title": "Nama Produk",
                    "width": "100px",
                },

            ];
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

            //***********************************

        }
    ]);
});

