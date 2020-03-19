
define(['initialize', 'Configuration'], function (initialize, configuration) {
    'use strict';
    initialize.controller('MenuPengkajianCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'CacheHelper', 'MedifirstService',
        function ($rootScope, $scope, $state, ModelItem, dateHelper, cacheHelper, medifirstService) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.itemD = {};
            var norec_apd = '';
            var norec_pd = '';
            LoadCache();

            $scope.listEdukasi = [
                { "id": 2, "nama": "Edukasi yang diperlukan", "detail": [{ "id": 1, "nama": "Stimulasi Tumbuh Kembang" }, { "id": 2, "nama": " Perawatan Luka" }, { "id": 3, "nama": "Manajemen Nyeri" }, { "id": 4, "nama": "Rehabilitasi" }, { "id": 5, "nama": "Nutrisi" }, { "id": 6, "nama": "Perawatan Stoma" }, { "id": 7, "nama": "Medikasi" }, { "id": 8, "nama": "Jaminan Finansial" }, { "id": 9, "nama": "Cara menyusui yang benar" }, { "id": 10, "nama": "Perawatan tali pusat" }, { "id": 11, "nama": "Pencegah Infeksi" }, { "id": 12, "nama": "Lain-Lain" }] }
            ]

            function LoadCache() {
                var chacePeriode = cacheHelper.get('cacheRekamMedis');
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
                    $scope.item.tglLahir = chacePeriode[14]
                }
            }

            var usiaPengkajian = window.localStorage.getItem('usiaPengkajian')
            usiaPengkajian = JSON.parse(usiaPengkajian)

            var departemen = window.localStorage.getItem('departemenPengkajian')
            if (usiaPengkajian.hari >= 1 && usiaPengkajian.hari <= 31) { $scope.isNeonatal = true }
            if (usiaPengkajian.hari > 31 && usiaPengkajian.umur <= 17) { $scope.isAnak = true }
            if (usiaPengkajian.umur >= 18 && usiaPengkajian.umur <= 49) { $scope.isDewasa = true }
            if (usiaPengkajian.umur > 50) { $scope.isGeriatri = true }
            if (departemen == 18 || departemen == 28) { $scope.isRawatJalan = true }
            if (departemen == 16 || departemen == 35) { $scope.isRawatInap = true }
            $scope.navigasiPap = function (state) {
                $scope.currentPasien = cacheHelper.get('currentPasien');
                $scope.activeMenuDashboardPAP = state;
                localStorage.setItem('activeMenuDashboardPAP', state);
                $state.go(state);
            }

      
            function LoadIsiPengkajian() {
                medifirstService.get("emr/get-data-riwayat-pengkajiankeperawatan?Norec_apd=" + norec_apd).then(function (dat) {
                    var datas = dat.data.data;
                    var keluhanUtama = '';
                    var suHu = '';
                    var naDi = '';
                    var perNapasan = '';
                    var tekananDarah = '';
                    var statusAlergi = '';
                    var ketAlergi = '';
                    var statRJ = '';
                    var RJRajalSatu = '';
                    var RJRajalDua = '';
                    var lblRjSatu = '';
                    var lblRjDua = null;
                    var lblRjTiga = '';
                    var lblRjEmpat = null;
                    var lblRjLima = '';
                    var lblRjEnam = null;
                    var lblRjTujuh = '';
                    var lblRjDelapan = null;
                    var lblRjSembilan = '';
                    var lblRjSepuluh = null;
                    var lblRjSebelas = '';
                    var lblRjDuaSebelas = null;
                    var altBantu = '';
                    var proThesa = '';
                    var cacatTubuh = '';
                    var aHari = '';
                    var eduHambatan = '';
                    var EduHb1 = '';
                    var EduHb2 = '';
                    var EduHb3 = '';
                    var EduHb4 = '';
                    var EduHb5 = '';
                    var EduHb6 = '';
                    var EduHb7 = '';
                    var EduHb8 = '';
                    var EduD1 = '';
                    var EduD2 = '';
                    var EduD3 = '';
                    var EduD4 = '';
                    var EduD5 = '';
                    var EduD6 = '';
                    var EduD7 = '';
                    var EduD8 = '';
                    var EduD9 = '';
                    var EduD10 = '';
                    var EduD11 = '';
                    var EduD12 = '';
                    var ketEdu = '';

                    for (var i = datas.length - 1; i >= 0; i--) {

                        if (datas[i].objectfk == "KLU-000001") {
                            keluhanUtama = datas[i].nilai;
                        }

                        if (datas[i].objectfk == "TVI-000001") {
                            suHu = ':' + datas[i].nilai + ' ' + datas[i].satuan;
                        }

                        if (datas[i].objectfk == "TVI-000002") {
                            naDi = ':' + datas[i].nilai + ' ' + datas[i].satuan;
                        }

                        if (datas[i].objectfk == "TVI-000003") {
                            perNapasan = ':' + datas[i].nilai + ' ' + datas[i].satuan;
                        }

                        if (datas[i].objectfk == "TVI-000004") {
                            tekananDarah = ':' + datas[i].nilai + ' ' + datas[i].satuan;
                        }

                        if (datas[i].objectfk == "ALG-000001") {
                            if (datas[i].nilai == 2) {
                                statusAlergi = "Ya"
                            } else {
                                statusAlergi = "Tidak"
                            }
                        }

                        if (datas[i].objectfk == "ALG-000002") {
                            ketAlergi = datas[i].nilai;
                        }

                        if (datas[i].objectfk == "RSJ-000001") {
                            if (datas[i].nilai == 1) {
                                statRJ = "Risiko jatuh rendah"
                            } else {
                                statRJ = "Risiko jatuh tinggi"
                            }
                        }

                        if (datas[i].objectfk == "RSJ-000002") {
                            if (datas[i].nilai == 1) {
                                RJRajalSatu = "Ya";
                            } else {
                                RJRajalSatu = "Tidak";
                            }
                        }

                        if (datas[i].objectfk == "RSJ-000003") {
                            if (datas[i].nilai == 1) {
                                RJRajalDua = "Ya"
                            } else {
                                RJRajalDua = "Tidak"
                            }
                        }

                        if (datas[i].objectfk == "RSJ-000011") {
                            if (datas[i].nilai == 1) {
                                lblRjSatu = "Ya";
                                lblRjDua = 25;
                            } else {
                                lblRjSatu = "Tidak";
                                lblRjDua = 0;
                            }
                        }

                        if (datas[i].objectfk == "RSJ-000012") {
                            if (datas[i].nilai == 1) {
                                lblRjTiga = "Ya";
                                lblRjEmpat = 25;
                            } else {
                                lblRjTiga = "Tidak";
                                lblRjEmpat = 0;
                            }
                        }

                        if (datas[i].objectfk == "RSJ-000013") {
                            if (datas[i].nilai == 1) {
                                lblRjLima = "Bed Rest/Kursi Roda/Tidak Ada";
                                lblRjEnam = 0;
                            } else if (datas[i].nilai == 2) {
                                lblRjLima = "Penopang tongkat/walker";
                                lblRjEnam = 15;
                            } else {
                                lblRjLima = "Furnitur";
                                lblRjEnam = 30;
                            }
                        }

                        if (datas[i].objectfk == "RSJ-000014") {
                            if (datas[i].nilai == 1) {
                                lblRjTujuh = "Ya";
                                lblRjDelapan = 25;
                            } else {
                                lblRjTujuh = "Tidak";
                                lblRjDelapan = 0;
                            }
                        }

                        if (datas[i].objectfk == "RSJ-000015") {
                            if (datas[i].nilai == 1) {
                                lblRjSembilan = "Normal/bed rest/imobilisasi";
                                lblRjSepuluh = 0;
                            } else if (datas[i].nilai == 2) {
                                lblRjSembilan = "Lemah";
                                lblRjSepuluh = 15;
                            } else {
                                lblRjSembilan = "Terganggu";
                                lblRjSepuluh = 30;
                            }
                        }

                        if (datas[i].objectfk == "RSJ-000016") {
                            if (datas[i].nilai == 1) {
                                lblRjSebelas = "Orientasi sesuai kemampuan";
                                lblRjDuaSebelas = 0;
                            } else {
                                lblRjSebelas = "Lupa keterbatasan diri";
                                lblRjDuaSebelas = 15;
                            }
                        }

                        if (datas[i].objectfk == "SFS-000001") {
                            altBantu = datas[i].nilai;
                        }

                        if (datas[i].objectfk == "SFS-000002") {
                            proThesa = datas[i].nilai;
                        }

                        if (datas[i].objectfk == "SFS-000003") {
                            cacatTubuh = datas[i].nilai;
                        }

                        if (datas[i].objectfk == "SFS-000004") {
                            if (datas[i].nilai == 1) {
                                aHari = "Mandiri";
                            } else {
                                aHari = "Dibantu";
                            }
                        }

                        if (datas[i].objectfk == "EDU-000001") {
                            EduHb1 = " - Tidak Ada";
                        }

                        if (datas[i].objectfk == "EDU-000002") {
                            EduHb2 = " - Pengelihatan";
                        }

                        if (datas[i].objectfk == "EDU-000003") {
                            EduHb3 = " - Budaya/Kepercayaan";
                        }

                        if (datas[i].objectfk == "EDU-000004") {
                            EduHb4 = " - Bahasa";
                        }

                        if (datas[i].objectfk == "EDU-000005") {
                            EduHb5 = " - Pengelihatan";
                        }

                        if (datas[i].objectfk == "EDU-000006") {
                            EduHb6 = " - Kognitif";
                        }

                        if (datas[i].objectfk == "EDU-000007") {
                            EduHb7 = " - Emosi";
                        }

                        if (datas[i].objectfk == "EDU-000008") {
                            EduHb8 = " - Lain-Lain";
                        }

                        if (datas[i].objectfk == "EDU-000009") {
                            EduD1 = " - Stimulasi Tumbuh Kembang";
                        }

                        if (datas[i].objectfk == "EDU-000010") {
                            EduD2 = " - Perawatan Luka";
                        }

                        if (datas[i].objectfk == "EDU-000011") {
                            EduD3 = " - Manajemen Nyeri";
                        }

                        if (datas[i].objectfk == "EDU-000012") {
                            EduD4 = " - Rehabilitasi";
                        }

                        if (datas[i].objectfk == "EDU-000013") {
                            EduD5 = " - Nutrisi";
                        }

                        if (datas[i].objectfk == "EDU-000014") {
                            EduD6 = " - Perawatan Stoma";
                        }

                        if (datas[i].objectfk == "EDU-000015") {
                            EduD7 = " - Medikasi";
                        }

                        if (datas[i].objectfk == "EDU-000016") {
                            EduD8 = " - Jaminan Finansial";
                        }

                        if (datas[i].objectfk == "EDU-000017") {
                            EduD9 = " - Cara menyusui yang benar";
                        }

                        if (datas[i].objectfk == "EDU-000018") {
                            EduD10 = " - Perawatan tali pusat";
                        }

                        if (datas[i].objectfk == "EDU-000019") {
                            EduD11 = " - Pencegah Infeksi";
                        }

                        if (datas[i].objectfk == "EDU-000020") {
                            EduD12 = " - Lain-Lain";
                        }

                        if (datas[i].objectfk == "EDU-000021") {
                            ketEdu = datas[i].nilai;
                        }
                    }

                    $scope.labelKeluhanUtama = keluhanUtama;
                    $scope.labelSuhu = suHu;
                    $scope.labelNadi = naDi;
                    $scope.labelNafas = perNapasan;
                    $scope.labelTD = tekananDarah;
                    $scope.labelKetAlergi = "Keterangan  : " + ketAlergi;
                    $scope.labelStatAlergi = "Statu Alergi : " + statusAlergi;
                    $scope.labelResikoJatuh = "Resiko Jatuh : " + statRJ;
                    $scope.labelRJRajalSatu = "Apakah pernah jatuh dalam 3 bulan terakhir : " + RJRajalSatu;
                    $scope.labelRJRajalDua = "Apakah menggunakan alat bantu (tongkat, kursi roda, dll) : " + RJRajalDua;
                    $scope.LabelRjSatuT = lblRjSatu;
                    $scope.LabelRjTigaT = lblRjTiga;
                    $scope.LabelRLimaT = lblRjLima;
                    $scope.LabelRTujuhT = lblRjTujuh;
                    $scope.LabelRSembilanT = lblRjSembilan;
                    $scope.LabelRSebelasT = lblRjSebelas;
                    $scope.LabelRjDuaT = lblRjDua;
                    $scope.LabelRjEmpatT = lblRjEmpat;
                    $scope.LabelREnamT = lblRjEnam;
                    $scope.LabelRDelapanT = lblRjDelapan;
                    $scope.LabelRSepuluhT = lblRjSepuluh;
                    $scope.LabelRDuabelasT = lblRjDuaSebelas;
                    $scope.LabelRJTotalSkor = lblRjDua + lblRjEmpat + lblRjEnam + lblRjDelapan + lblRjSepuluh + lblRjDuaSebelas;

                    $scope.lblAlatBantu = "Alat Bantu : " + altBantu;
                    $scope.lblProthesa = "Prothesa : " + proThesa;
                    $scope.lblCacatTubuh = "Cacat Tubuh : " + cacatTubuh;
                    $scope.lblAHari = "Aktifitas Sehari-hari : " + aHari;

                    $scope.lblEduHb1 = EduHb1;
                    $scope.lblEduHb2 = EduHb2;
                    $scope.lblEduHb3 = EduHb3;
                    $scope.lblEduHb4 = EduHb4;
                    $scope.lblEduHb5 = EduHb5;
                    $scope.lblEduHb6 = EduHb6;
                    $scope.lblEduHb7 = EduHb7;
                    $scope.lblEduHb8 = EduHb8;
                    $scope.lblEduD1 = EduD1;
                    $scope.lblEduD2 = EduD2;
                    $scope.lblEduD3 = EduD3;
                    $scope.lblEduD4 = EduD4;
                    $scope.lblEduD5 = EduD5;
                    $scope.lblEduD6 = EduD6;
                    $scope.lblEduD7 = EduD7;
                    $scope.lblEduD8 = EduD8;
                    $scope.lblEduD9 = EduD9;
                    $scope.lblEduD10 = EduD10;
                    $scope.lblEduD11 = EduD11;
                    $scope.lblEduD12 = EduD12 + ' : ' + ketEdu;
                });
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

                var noReg = ""
                if ($scope.itemD.noRegistrasi != undefined) {
                    noReg = "&noReg=" + $scope.itemD.noRegistrasi;
                }

                managePhp.getData("registrasipasien/daftar-riwayat-registrasi?" + rm + noReg + pasien)
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

            $scope.cetakLaporan = function () {
                // CetakSok();
                RiwayatRegistrasi();
            }

            $scope.klikGrid = function () {
                // LoadHeaderCetak();                        
                if ($scope.dataPasienSelected != undefined) {
                    $scope.labelNoRm = " : " + $scope.dataPasienSelected.nocm;
                    $scope.labelNamaPasien = "     : " + $scope.dataPasienSelected.namapasien
                    $scope.labelNoRegistrasi = ": " + $scope.dataPasienSelected.noregistrasi;
                    $scope.labelRuangan = " : " + $scope.dataPasienSelected.namaruangan;
                    $scope.labelTglLahir = " : " + $scope.dataPasienSelected.tgllahir;

                    $scope.labelTglMasuk = moment($scope.dataPasienSelected.tglregistrasi).format('DD-MM-YYYY');
                    $scope.labelWktuPemeriksaan = "-";
                    $scope.labelNamaDokter = "-";

                    LoadIsiPengkajian();
                    LoadSkriningUmum();
                    LoadIsiPengkajianKlinik();
                    LoadPerencanaanPulang();
                } else {
                    messageContainer.error("Pilih data dulu!")
                }
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
            }

        }
    ]);
});