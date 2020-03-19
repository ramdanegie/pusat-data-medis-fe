define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('CPPTCtrl', ['$scope', '$timeout', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($scope, $timeout, $state, cacheHelper, dateHelper, medifirstService) {
            $scope.itemD = {};
            $scope.item = {};
            $scope.now = new Date();
            $scope.dataVOloaded = true
            $scope.isRouteLoading = false
            $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'));
            var cookie = document.cookie.split(';')
            var kelompokUser = cookie[0].split('=')
            var norec_apd = ''
            var norec_pd = ''
            $scope.cetakVisible = false;
            localStorage.removeItem('activeMenuPengkajian');
            LoadCache();
            function LoadCache() {
                var chacePeriode = cacheHelper.get('cacheCPPT');
                if (chacePeriode != undefined) {
                    $scope.item.noMr = chacePeriode[0]
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
                    if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                        $scope.showTombol = true
                    }
                }
            }

            $scope.back = function () {
                $state.go('DaftarAntrianDokterRajal')
            }
            $scope.showInputDiagnosaDokter = function () {
                var arrStr = cacheHelper.get('cacheCPPT');
                cacheHelper.set('CacheInputDiagnosaDokter', arrStr);
                $state.go('InputDiagnosaDokter')
            }
            $scope.resep = function () {
                var arrStr = cacheHelper.get('cacheCPPT');
                cacheHelper.set('InputResepApotikOrderRevCtrl', arrStr);
                $state.go('InputResepApotikOrderRev')
            }
            $scope.inputTindakanDokter = function () {
                var arrStr = cacheHelper.get('cacheCPPT')
                cacheHelper.set('InputTindakanPelayananDokterRevCtrl', arrStr);
                $state.go('InputTindakanPelayananDokterRev', {
                    norecPD: norec_pd,
                    norecAPD: norec_apd,
                });
            }
            $scope.laboratorium = function () {
                var arrStr = cacheHelper.get('cacheCPPT')
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananLaboratoriumDokterRev')
            }
            $scope.radiologi = function () {
                var arrStr = cacheHelper.get('cacheCPPT')
                cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananRadiologiDokterRev')
            }
            $scope.rekamMedisElektronik = function () {
                var arrStr = cacheHelper.get('cacheCPPT');
                cacheHelper.set('cacheRMelektronik', arrStr);
                $state.go('RekamMedisElektronik')
            }
            $scope.inputCPPT = function () {
                var arrStr = cacheHelper.get('cacheCPPT');
                cacheHelper.set('cacheCPPT', arrStr);
                $state.go('CPPT')
            }
            $scope.cppt = {}
            $scope.gridCPPT = {
                pageable: true,
                columns: [
                    {
                        "field": "tglinput",
                        "title": "Tgl / Jam",
                        "width": "100px"
                    }, {
                        "field": "namalengkap",
                        "title": "Dokter",
                        "width": "150px"
                    },
                    {
                        "field": "pegawaiasal",
                        "title": "Pegawai",
                        "template": '# if( pegawaiasal==null) {# - # } else {# #= pegawaiasal # #} #',

                        "width": "150px"
                    }, {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": "150px"
                    }, {
                        "field": "noregistrasi",
                        "title": "No Registrasi",
                        "width": "100px"
                    },
                    {
                        "command": [{
                            text: "Detail",
                            click: showDetail,
                            imageClass: "k-icon k-i-pencil"
                        }],
                        title: "",
                        width: "40px",
                    }
                ]
            };
            $scope.show = {}
            function showDetail(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.show = dataItem

                $scope.popUp.center().open();

            }
            $scope.gridCPPTnotVerif = {
                pageable: true,
                columns: [
                    {
                        "field": "tglinput",
                        "title": "Tgl / Jam",
                        "width": "100px"
                    }, {
                        "field": "namalengkap",
                        "title": "Pegawai",
                        "width": "150px"
                    }, {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": "150px"
                    }, {
                        "field": "noregistrasi",
                        "title": "No Registrasi",
                        "width": "100px"
                    },
                    {
                        "command": [{
                            text: "Detail",
                            click: showDetailss,
                            imageClass: "k-icon k-i-pencil"
                        }],
                        title: "",
                        width: "40px",
                    }
                ]
            };
            function showDetailss(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.show = dataItem

                $scope.popUp.center().open();

            }
            $scope.showSoap = function (bool, edit, verif) {

                if (bool && edit != true)
                    $scope.isShowSoap = true
                else
                    $scope.isShowSoap = false

                if (edit == true) {
                    if ($scope.dataCPPT == undefined) {
                        toastr.error('Pilih data dulu')
                        return
                    }

                    if ($scope.dataLogin.id != $scope.dataCPPT.pegawaifk && verif != true) {
                        toastr.error('Tidak bisa edit')
                        return
                    }
                    if (verif == true) {
                        if (kelompokUser[1] != 'dokter' && kelompokUser[1] != 'bedah') {
                            toastr.info('Verifikasi hanya untuk Dokter')
                            $scope.isShowSoap = false
                            return
                        }
                    }

                    $scope.isShowSoap = true
                    $scope.cppt.norec = $scope.dataCPPT.norec
                    $scope.cppt.s = $scope.dataCPPT.s
                    $scope.cppt.o = $scope.dataCPPT.o
                    $scope.cppt.a = $scope.dataCPPT.a
                    $scope.cppt.p = $scope.dataCPPT.p

                } else {
                    // buat Baru tapi ngambil data yg terakhir di input
                    if (kelompokUser[1] == 'dokter' && $scope.sourceCPPT._data.length > 0) {
                        var data = $scope.sourceCPPT._data[0]
                        // $scope.cppt.s = data.s
                        // $scope.cppt.o = data.o
                        // $scope.cppt.a = data.a
                        // $scope.cppt.p = data.p

                    } if (kelompokUser[1] == 'suster' && $scope.sourceCPPTnotVerif._data.length > 0) {
                        var data = $scope.sourceCPPTnotVerif._data[0]
                        // $scope.cppt.s = data.s
                        // $scope.cppt.o = data.o
                        // $scope.cppt.a = data.a
                        // $scope.cppt.p = data.p
                    }
                }
            }

            $scope.Save = function () {
                var s = ''
                if ($scope.cppt.s != undefined)
                    s = $scope.cppt.s
                var o = ''
                if ($scope.cppt.o != undefined)
                    o = $scope.cppt.o
                var a = ''
                if ($scope.cppt.a != undefined)
                    a = $scope.cppt.a
                var p = ''
                if ($scope.cppt.p != undefined)
                    p = $scope.cppt.p
                var jsonSave = {
                    "norec": $scope.cppt.norec !== undefined ? $scope.cppt.norec : '',
                    "noregistrasifk": norec_apd,
                    "pegawaifk": $scope.dataLogin.id,
                    "pegawaiasalfk": $scope.dataCPPT != undefined ? $scope.dataCPPT.pegawaifk : null,
                    "ruanganfk": $scope.item.idRuangan,
                    "pasienfk": $scope.item.noMr,
                    "s": s,
                    "o": o,
                    "a": a,
                    "p": p,

                }
                medifirstService.post( 'emr/post-cppt/save',jsonSave).then(function (e) {
                    medifirstService.postLogging('CPPT', 'Norec cppt_t', e.data.norec, 'SOAP No Registrasi ' + $scope.item.noregistrasi + ' (' + $scope.item.noMr + ' )').then(function (res) {
                    })
                    loadCPPT()
                    $scope.cppt = {}

                });
            }
            $scope.delete = function () {
                if ($scope.dataCPPT == undefined) {
                    toastr.error('Pilih data dulu')
                    return
                }
                if ($scope.dataLogin.id != $scope.dataCPPT.pegawaifk) {
                    toastr.warning('Tidak bisa hapus data')
                    return
                }
                var deletes = {
                    'norec': $scope.dataCPPT.norec
                }
                medifirstService.post( 'emr/post-cppt/delete',deletes).then(function (e) {
                    loadCPPT()
                    $scope.cppt = {}
                });
            }
            loadCPPT()
            function loadCPPT() {
                let dataVerif = []
                let dataUnverif = []
                medifirstService.get('emr/get-cppt?nocm=' + $scope.item.noMr).then(function (dat) {
                    let array = dat.data.data;
                    for (let i in array) {
                        if (array[i].isverifikasi == true) {
                            dataVerif.push(array[i])
                        }
                        if (array[i].isverifikasi == false) {
                            dataUnverif.push(array[i])
                        }
                    }
                    $scope.sourceCPPT = new kendo.data.DataSource({
                        data: dataVerif
                    });
                    $scope.sourceCPPTnotVerif = new kendo.data.DataSource({
                        data: dataUnverif
                    });
                })
            }

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.columnRiwayatRegistrasi = {
                toolbar: [
                    "excel",

                ],
                excel: {
                    fileName: "DaftarRiwayatRegistrasi.xlsx",
                    allPages: true,
                },
                excelExport: function (e) {
                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 2;
                    sheet.mergedCells = ["A1:K1"];
                    sheet.name = "Orders";

                    var myHeaders = [{
                        value: "Daftar Registrasi Pasien",
                        fontSize: 20,
                        textAlign: "center",
                        background: "#ffffff",
                        // color:"#ffffff"
                    }];

                    sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70 });
                },
                selectable: 'row',
                pageable: true,
                columns: [
                    {
                        "field": "no",
                        "title": "No",
                        "width": "30px",
                    },
                    {
                        "field": "tglregistrasi",
                        "title": "Tgl Registrasi",
                        "width": "80px",
                        "template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
                    },
                    {
                        "field": "noregistrasi",
                        "title": "No Registrasi",
                        "width": "90px"
                    },
                    {
                        "field": "namaruangan",
                        "title": "Ruanganan Layanan",
                        "width": "150px",
                        "template": "<span class='style-left'>#: namaruangan #</span>"
                    },
                    {
                        "field": "namadokter",
                        "title": "Nama Dokter",
                        "width": "150px",
                        "template": "<span class='style-left'>#: namadokter #</span>"
                    },
                    {
                        "field": "tglpulang",
                        "title": "Tgl Pulang",
                        "width": "80px",
                        "template": "<span class='style-left'>{{formatTanggal('#: tglpulang #')}}</span>"
                    },
                    {
                        "field": "lamarawat",
                        "title": "Lama Dirawat",
                        "width": "80px"
                        // "template": "<span class='style-left'>{{formatTanggal('#: tglpulang #')}}</span>"
                    }
                ]
            };

            function RiwayatRegistrasi() {
                if ($scope.item.noMr == undefined) {
                    messageContainer.error("Pilih data dulu!")
                }
                $scope.itemD.noRM = $scope.item.noMr;
                $scope.itemD.namaPasien = $scope.item.namaPasien;
                $scope.itemD.tglLahir = moment($scope.item.tglLahir).format('YYYY-MM-DD');
                loadDataRiwayat();
                $scope.popUpRiwayatRegistrasi.center().open();
                var actions = $scope.popUpRiwayatRegistrasi.options.actions;
                actions.splice(actions.indexOf("Close"), 1);
                $scope.popUpRiwayatRegistrasi.setOptions({ actions: actions });
            }

            $scope.TutupPopUp = function () {
                $scope.cetakVisible = false;
                $scope.itemD.noRM = undefined;
                $scope.itemD.namaPasien = undefined;
                $scope.itemD.tglLahir = undefined;
                $scope.itemD.noRegistrasi = undefined;
                $scope.itemD.JumlahRawat = undefined;
                $scope.dataRiwayatRegistrasi = new kendo.data.DataSource({
                    data: []
                });
                $scope.popUpRiwayatRegistrasi.close();
            }

            function loadDataRiwayat() {
                $scope.isRouteLoading = true;
                var rm = ""
                if ($scope.itemD.noRM != undefined) {
                    rm = "&norm=" + $scope.itemD.noRM
                }

                var pasien = ""
                if ($scope.itemD.namaPasien != undefined) {
                    pasien = "&namaPasien=" + $scope.itemD.namaPasien
                }

                // var tglLahirs =""
                // if ($scope.itemD.tglLahir != undefined){
                //      tglLahirs ="tglLahir=" + moment($scope.itemD.tglLahir).format('YYYY-MM-DD HH:mm:ss');
                // }

                var noReg = ""
                if ($scope.itemD.noRegistrasi != undefined) {
                    noReg = "&noReg=" + $scope.itemD.noRegistrasi;
                }

                medifirstService.get("emr/daftar-riwayat-registrasi?" + rm + noReg + pasien)
                    .then(function (data) {
                        $scope.isRouteLoading = false;
                        var jumlahRawat = 0;
                        var dRiwayatReg = data.data.daftar;
                        for (var i = 0; i < dRiwayatReg.length; i++) {
                            dRiwayatReg[i].no = i + 1
                            if (dRiwayatReg[i].statusinap == 1) {
                                jumlahRawat = jumlahRawat + 1;
                                if (dRiwayatReg[i].tglpulang != undefined) {
                                    var umur = dateHelper.CountAge(new Date(dRiwayatReg[i].tglregistrasi), new Date(dRiwayatReg[i].tglpulang));
                                    var bln = umur.month,
                                        thn = umur.year,
                                        day = umur.day
                                    dRiwayatReg[i].lamarawat = day + " Hari";
                                } else {
                                    var umur = DateHelper.CountAge(new Date(dRiwayatReg[i].tglregistrasi), new Date($scope.now));
                                    var bln = umur.month,
                                        thn = umur.year,
                                        day = umur.day
                                    dRiwayatReg[i].lamarawat = day + " Hari";
                                }
                            }
                        }
                        $scope.itemD.JumlahRawat = jumlahRawat;
                        $scope.dataRiwayatRegistrasi = new kendo.data.DataSource({
                            data: dRiwayatReg,
                            pageSize: 10,
                            total: dRiwayatReg.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                    }
                                }
                            }
                        });
                    });
            }

            $scope.SearchEnterDetail = function () {
                loadDataRiwayat();
            }

            function LoadIsiPengkajian() {
               medifirstService.get('emr/get-cppt?noRegistrasi=' + $scope.item.noregistrasi).then(function (dat) {
                    var datas = dat.data.data[0];
                    if (datas != undefined) {
                        $scope.labelS = datas.s;
                        $scope.labelO = datas.o;
                        $scope.labelA = datas.a;
                        $scope.labelP = datas.p;
                    } else {
                        $scope.labelS = "-";
                        $scope.labelO = "-";
                        $scope.labelA = "-";
                        $scope.labelP = "-";
                    }
                    $scope.cetakVisible = true;
                })
            }

            $scope.klikGrid = function () {
                // LoadHeaderCetak();                        
                if ($scope.dataPasienSelected != undefined) {
                    $scope.item.noregistrasi = $scope.dataPasienSelected.noregistrasi;
                    $scope.labelNoRm = " : " + $scope.dataPasienSelected.nocm;
                    $scope.labelNamaPasien = "     : " + $scope.dataPasienSelected.namapasien
                    $scope.labelNoRegistrasi = ": " + $scope.dataPasienSelected.noregistrasi;
                    $scope.labelRuangan = " : " + $scope.dataPasienSelected.namaruangan;
                    $scope.labelTglLahir = " : " + $scope.dataPasienSelected.tgllahir;

                    $scope.labelTglMasuk = moment($scope.dataPasienSelected.tglregistrasi).format('DD-MM-YYYY');
                    $scope.labelWktuPemeriksaan = "-";
                    $scope.labelNamaDokter = "-";

                    LoadIsiPengkajian();
                } else {
                    messageContainer.error("Pilih data dulu!")
                }
            }

            $scope.cetakLaporan = function () {
                // CetakSok();
                RiwayatRegistrasi();
            }

            function CetakSok() {

                let printContents, popupWin;
                printContents = document.getElementById('diaglog').innerHTML;
                popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
                popupWin.document.open();
                popupWin.document.write(`
                    <html>                           
                        <body onload="window.print();window.close()">${printContents}</body>
                     </html>
                     `
                );
            }

            $scope.printEmr = function () {
                CetakSok();
                $scope.cetakVisible = false;
            }
        }
    ]);
});