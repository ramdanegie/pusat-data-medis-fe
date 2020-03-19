define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('SerahTerimaPasienCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 191

            var dataLoad = []
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
            })
            medifirstService.getPart('emr/get-datacombo-part-kelas', true, true, 20).then(function (data) {
                $scope.listKelas = data

            })
            medifirstService.getPart('emr/get-datacombo-part-ruangan-pelayanan', true, true, 20).then(function (data) {
                $scope.listRuang = data

            })
            $scope.tekananDarah = [
                // {
                //     nilai: 10,
                //     nilai2: 30
                // }, {
                //     nilai: 10,
                //     nilai2: 30
                // },
            ]
            $("#chart").kendoChart({
                title: {
                    text: "Tanda Tanda Vital"
                },
                legend: {
                    position: "top"
                },
                series: [
                    //         {
                    //         type: "line",
                    //         data: [30, 38, 40, 32, 42],
                    //         name: "mpg",
                    //         color: "#ec5e0a",
                    //         axis: "mpg"
                    //     }, {
                    //         type: "line",
                    //         data: [7.8, 6.2, 5.9, 7.4, 5.6],
                    //         name: "l/100 km",
                    //         color: "#4e4141",
                    //         axis: "l100km"
                    //     }
                    // 
                ],
                valueAxes: [{
                    title: { text: "S" },
                    min: 35,
                    max: 42
                }, {
                    name: "N",
                    title: { text: "N" },
                    min: 40,
                    max: 180,
                    majorUnit: 20
                }],
                categoryAxis: {
                    categories: [6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24],
                    // categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],

                    axisCrossingValues: [0, 0, 10, 10]
                }
            });
            $scope.listData1 = []
            $scope.listData2 = []
            $scope.listTanggal = []
            medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 191).then(function (e) {

                var datas = e.data.kolom4

                var detail = []
                var arrayAskep = []
                var arrayParenteral = []
                var sama = false
                for (let i = 0; i < datas.length; i++) {
                    const element = datas[i];
                    sama = false
                    if (element.type == 'date') {
                        $scope.listTanggal.push({ id: element.id })
                    }
                    // ARRAY GEJALA
                    if (element.kodeexternal == 'pernafasan') {
                        for (let z = 0; z < arrayAskep.length; z++) {
                            const element2 = arrayAskep[z];
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
                            arrayAskep.push(datax)
                        }
                    }
                    //END ARRAY GEJALA

                    // ARRAY GEJALA
                    if (element.kodeexternal == 'parenteral') {
                        for (let z = 0; z < arrayParenteral.length; z++) {
                            const element2 = arrayParenteral[z];
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
                            arrayParenteral.push(datax)
                        }
                    }
                    //END ARRAY GEJALA


                }
                // ARRAY GEJALA
                var gejalaKosongKeun = []
                for (let k = 0; k < arrayAskep.length; k++) {
                    const element = arrayAskep[k];
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
                $scope.listData1 = arrayAskep

                var gejalaKosong1 = []
                for (let k = 0; k < arrayParenteral.length; k++) {
                    const element = arrayParenteral[k];
                    for (let l = 0; l < datas.length; l++) {
                        const element2 = datas[l];
                        if (element2.namaexternal == element.namaexternal) {
                            gejalaKosong1.push(element2)
                            element.details = gejalaKosong1
                        } else {
                            gejalaKosong1 = []
                        }
                    }
                }
                $scope.listData2 = arrayParenteral









            })

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

            medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + nomorEMR + "&emrfk=" + $scope.cc.emrfk, true).then(function (dat) {
                $scope.item.obj = []
                $scope.item.obj2 = []
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
            $scope.$watch('item.obj[7589]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai == 0) {
                    $scope.item.obj[7590] = true
                    $scope.item.obj[7591] = false
                    $scope.item.obj[7592] = false
                    $scope.item.obj[7593] = false
                }
                if (nilai >= 1 && nilai <= 3) {
                    $scope.item.obj[7590] = false
                    $scope.item.obj[7591] = true
                    $scope.item.obj[7592] = false
                    $scope.item.obj[7593] = false
                }
                if (nilai >= 4 && nilai <= 6) {
                    $scope.item.obj[7590] = false
                    $scope.item.obj[7591] = false
                    $scope.item.obj[7592] = true
                    $scope.item.obj[7593] = false
                }
                if (nilai >= 7 && nilai <= 10) {
                    $scope.item.obj[7590] = false
                    $scope.item.obj[7591] = false
                    $scope.item.obj[7592] = false
                    $scope.item.obj[7593] = true
                }
            });

            $scope.getSkalaNyeri = function (data, stat) {
                $scope.activeStatus = stat.descNilai
                var nilai = stat.descNilai
                if (nilai >= 0 && nilai <= 1) {
                    $scope.item.obj[7594] = true
                    $scope.item.obj[7595] = false
                    $scope.item.obj[7596] = false
                    $scope.item.obj[7597] = false
                    $scope.item.obj[7598] = false
                    $scope.item.obj[7599] = false
                }
                if (nilai >= 2 && nilai <= 3) {
                    $scope.item.obj[7594] = false
                    $scope.item.obj[7595] = true
                    $scope.item.obj[7596] = false
                    $scope.item.obj[7597] = false
                    $scope.item.obj[7598] = false
                    $scope.item.obj[7599] = false
                }
                if (nilai >= 4 && nilai <= 5) {
                    $scope.item.obj[7594] = false
                    $scope.item.obj[7595] = false
                    $scope.item.obj[7596] = true
                    $scope.item.obj[7597] = false
                    $scope.item.obj[7598] = false
                    $scope.item.obj[7599] = false
                }
                if (nilai >= 6 && nilai <= 7) {
                    $scope.item.obj[7594] = false
                    $scope.item.obj[7595] = false
                    $scope.item.obj[7596] = false
                    $scope.item.obj[7597] = true
                    $scope.item.obj[7598] = false
                    $scope.item.obj[7599] = false
                }
                if (nilai >= 8 && nilai <= 9) {
                    $scope.item.obj[7594] = false
                    $scope.item.obj[7595] = false
                    $scope.item.obj[7596] = false
                    $scope.item.obj[7597] = false
                    $scope.item.obj[7598] = true
                    $scope.item.obj[7599] = false
                }

                if (nilai == 10) {
                    $scope.item.obj[7594] = false
                    $scope.item.obj[7595] = false
                    $scope.item.obj[7596] = false
                    $scope.item.obj[7597] = false
                    $scope.item.obj[7598] = false
                    $scope.item.obj[7599] = true
                }

            }




            $scope.Batal = function () {
                $scope.item.obj = []
            }
            $scope.kembali = function () {
                $rootScope.showRiwayat()
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

                    $rootScope.loadRiwayat()
                    // var arrStr = {
                    //     0: e.data.data.noemr
                    // }
                    // cacheHelper.set('cacheNomorEMR', arrStr);
                });
            }
            // var doc = new jsPDF({
            //     orientation: 'landscape',
            //     unit: 'in',
            //     format: [4, 2]
            // })

            // doc.text('Hello world!', 1, 1)
            // var string = doc.output('datauristring');
            // var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
            // var x = window.open();
            // x.document.open();
            // x.document.write(embed);
            // x.document.close();
            // doc.save('two-by-four.pdf')
            var b = null
            var tt = new jsPDF("l", "mm", [95, 210]), it, rt; if (
                // tt.addImage("data:image/png;base64,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", "PNG", 10, 6, 45, 10),
                tt.addImage("../app/images/logo_jateng.png"),
                tt.text(58, 15, 'RSJD SURAKARTA'), tt.setFontSize(16), tt.text(130, 10, ""),
                tt.setFontSize(10), tt.text(10, 25, "No.SEP"), tt.text(10, 30, "Tgl.SEP"), tt.text(10, 35, "No.Kartu"),
                tt.text(10, 40, "Nama Peserta"), tt.text(10, 45, "Tgl.Lahir"),
                tt.text(10, 50, "No.Telepon"), tt.text(10, 55, "Sub/Spesialis"), tt.text(10, 60, "Faskes Perujuk"),
                tt.text(10, 65, "Diagnosa Awal"), tt.text(10, 70, "Catatan"), tt.text(40, 25, ": " + 'caca'),
                tt.text(40, 30, ": " + 'asas'), tt.text(40, 35, ": " + 'asa'), tt.text(40, 40, ": " + 'asas'),
                tt.text(40, 45, ": " + 'u'+ ' f'), tt.text(40, 50, ": " + 'asa'), tt.text(40, 55, ": " + 'sas' + 'asa'),
                tt.text(40, 60, ": " + 's'), tt.text(40, 65, ": " + 'sas'), tt.text(40, 70, ": " + 'sazzzz'), tt.setFontSize(9),
                tt.text(120, 25,   ""), tt.setFontSize(10), tt.text(120, 30, "Peserta "),
                tt.text(120, 35, "COB "), tt.text(120, 40, "Jns.Rawat "), tt.text(120, 45, "Kls.Rawat "),
                tt.text(120, 50, "Penjamin "), tt.text(140, 15, 'p'), tt.text(140, 30, ": " + 'l'),
                tt.text(140, 35, ": " +'sa'), tt.text(140, 40, ": " + 'v'),
                tt.text(140, 45, ": " + 'y'),
                
                b != null && b != "-") {
                var et = b.split(";"),
                    ut = 50, ft = ""; for (it = 0; it < et.length; it++)rt = rr(et[it]), it == 0 ? (tt.text(140, ut, ": " + rt), ft = rt) :
                        (tt.text(140, ut, "  " + rt), ft = ft + "," + rt), ut = ut + 4; et.length > 0 && (tt.text(10, 83, ir(k)),
                            tt.text(10, 86, " dgn " + ft + " terlebih dahulu."))
            }
             tt.setFontSize(9); tt.text(150, 75, "Pasien/Keluarga Pasien"); tt.text(150, 82, "________________");
            tt.setFontSize(8); tt.text(10, 75, "*Saya menyetujui BPJS Kesehatan menggunakan infomasi medis pasien jika diperlukan.");
            tt.text(10, 78, "*SEP Bukan sebagai bukti penjaminan peserta.");
            tt.text(10, 90, "Cetakan ke " + '1');
            var st = tt.output("datauristring"),
                ht = "<iframe width='100%' height='100%' src='" + st + "'><\/iframe>",
                ot = window.open("", "_blank", "width=1024,height=600,directories=0,status=0,titlebar=0,scrollbars=0,menubar=0,toolbar=0,location=0,resizable=1");
            ot.focus(); ot.document.write(ht); ot.document.close()

        }
    ]);
});