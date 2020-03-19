define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PengkajianEdukasi2Ctrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.totalSkor4 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 302
            var dataLoad = []

            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
            })
            medifirstService.getPart('emr/get-datacombo-metode', true, true, 20).then(function (data) {
                $scope.listMetode = data
            })
            medifirstService.getPart('emr/get-datacombo-part-ruangan-pelayanan', true, true, 20).then(function (data) {
                $scope.listRuang = data
            
             })
             medifirstService.getPart('emr/get-datacombo-part-diagnosa', true, true, 20).then(function (data) {
                $scope.listDiagnosa = data
            })
             medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 302).then(function (e) {

                var datas = e.data.kolom4

                var detail = []
                var arrayShiftJaga= []
                var arrayShiftJaga2 = []
                var arrayShiftJaga3= []
                var sama = false
                for (let i = 0; i < datas.length; i++) {
                    const element = datas[i];
                    sama = false

                    // ARRAY GEJALA
                    if (element.kodeexternal == 'No') {
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

               

                


            })
            $scope.listKebutuhanEdukasi = [
                {
                    "id": 1, "nama": "1. Bicara :",
                    "detail": [
                        { "id": 80677, "nama": "Normal", "type": "checkbox" },
                        { "id": 80678, "nama": "Gangguan Bicara Sejak:", "type": "checkbox" },
                        { "id": 80679, "nama": "", "type": "textbox" },
                        
                    ]
                },
                {
                    "id": 2, "nama": "2. Bahasa Sehari-hari :",
                    "detail": [
                        { "id": 80680, "nama": "Lain-lain, sebutkan", "type": "checkbox" },
                        { "id": 80681, "nama": "Indonesia Pasif", "type": "checkbox" },
                        { "id": 80682, "nama": "Indonesia Aktif", "type": "checkbox" },
                        { "id": 80683, "nama": "Jawa", "type": "checkbox" },
                        { "id": 80684, "nama": "", "type": "textbox" },
                        
                        
                    ]
                },
                {
                    "id": 3, "nama": "3. Perlu Penerjemah :",
                    "detail": [
                        { "id": 80685, "nama": "Tidak", "type": "checkbox" },
                        { "id": 80686, "nama": "Ya, Bahasa :", "type": "checkbox" },
                        { "id": 80687, "nama": "", "type": "textbox" },
                        
                        
                    ]
                },
                {
                    "id": 4, "nama": "4.Bahasa Isyarat :",
                    "detail": [
                        { "id": 80688, "nama": "Tidak", "type": "checkbox" },
                        { "id": 80689, "nama": "Ya", "type": "checkbox"},
                        
                        
                    ]
                },
                {
                    "id": 5, "nama": "5.Cara Belajar Yang Disukai :",
                    "detail": [
                        { "id": 80690, "nama": "Menulis", "type": "checkbox" },
                        { "id": 80691, "nama": "Audio-visual/gambar", "type": "checkbox"},
                        { "id": 80692, "nama": "Diskusi", "type": "checkbox"},
                        { "id": 80693, "nama": "Simulasi", "type": "checkbox"},
                        
                        
                    ]
                },
                {
                    "id": 6, "nama": "6.Tingkat Pendidikan :",
                    "detail": [
                        { "id": 80694, "nama": "TDS", "type": "checkbox" },
                        { "id": 80695, "nama": "SD", "type": "checkbox"},
                        { "id": 80696, "nama": "SMP", "type": "checkbox"},
                        { "id": 80697, "nama": "SMA", "type": "checkbox"},
                        { "id": 80698, "nama": "D3/S1/S2", "type": "checkbox"},
                        { "id": 80699, "nama": "Lain-lain", "type": "checkbox"},
                        
                        
                    ]
                },
                {
                    "id": 7, "nama": "7.Hambatan Belajar:",
                    "detail": [
                        { "id": 80700, "nama": "Tidak Ada", "type": "checkbox" },
                        { "id": 80701, "nama": "Tidak ada pengkajian Ulang tgl :", "type": "checkbox"},
                        { "id": 80702, "nama": "", "type": "datetime"},
                        { "id": 80703, "nama": "Ada, Yaitu", "type": "checkbox"},
                        { "id": 80704, "nama": "Takut/Gelisah", "type": "checkbox2"},
                        { "id": 80705, "nama": "Tidak Tertarik", "type": "checkbox2"},
                        { "id": 80706, "nama": "Nyeri/Tidak Nyaman", "type": "checkbox2"},
                        { "id": 80707, "nama": "Buta Huruf", "type": "checkbox2"},
                        { "id": 80708, "nama": "Gangguan kognitif", "type": "checkbox2"},
                        { "id": 80709, "nama": "Lain-lain", "type": "textbox2"},


                        
                        
                    ]
                },
                {
                    "id": 8, "nama": "8.Kemampuan belajar :",
                    "detail": [
                        { "id": 80710, "nama": "Mampu Menerima Informasi", "type": "checkbox2" },
                        { "id": 80711, "nama": "Tidak mampu Menerima Informasi", "type": "checkbox2"},
                        { "id": 80712, "nama": "Mampu Menerima Informasi pada pengkajian Ulang, tgl", "type": "checkbox3"},
                        { "id": 80713, "nama": "", "type": "datetime2"},
                    ]
                },
                {
                    "id": 9, "nama": "9.Nilai dan Keyakinan :",
                },
                {
                    "id": 10, "nama": "a.Penyakit Merupakan :",
                    "detail": [
                        
                        { "id": 80714, "nama": "Ujian/Cobaan", "type": "checkbox2"},
                        { "id": 80715, "nama": "Kutukan", "type": "checkbox2"},
                        { "id": 80716, "nama": "Lain-lain", "type": "textbox2" },
                        
                  
                    ]
                },
                {
                    "id": 11, "nama": "b.Keputusan Memilih layanan Kesehatan:",
                    "detail": [
                        
                        { "id": 80717, "nama": "Sendiri", "type": "checkbox2"},
                        { "id": 80718, "nama": "Keluarga", "type": "checkbox2"},
                        { "id": 80719, "nama": "Lain-lain", "type": "textbox2" },
                        
                  
                    ]
                },
                {
                    "id": 12, "nama": "c.Keyakinan terhadap hasil terapi:",
                    "detail": [
                        
                        { "id": 80720, "nama": "pasrah", "type": "checkbox2"},
                        { "id": 80721, "nama": "Yakin", "type": "checkbox2"},
                        { "id": 80722, "nama": "sembuh", "type": "checkbox2" },
                        
                  
                    ]
                },
                {
                    "id": 13, "nama": "Jika",
                    "detail": [
                        
                        { "id": 80723, "nama": "Kontrol teratur", "type": "checkbox2"},
                        { "id": 80724, "nama": "Minum Obat teratur", "type": "checkbox2"},
                        { "id": 80725, "nama": "Lain-lain", "type": "textbox2" },
                        
                  
                    ]
                },
                {
                    "id": 13, "nama": "d. Askep keyakinan yang perlu dipertimbangkan selama masa Perawatan :",
                    "detail": [
                        
                        { "id": 80726, "nama": "Tidak", "type": "checkbox2"},
                        { "id": 80727, "nama": "Ada", "type": "checkbox2"},
                        { "id": 80728, "nama": "Lain-lain", "type": "textbox2" },
                        
                    
                    ]
                },
                {
                    "id": 14, "nama": "10. Kesediaan menerima informasi :",
                    "detail": [
                        
                        { "id": 80729, "nama": "Tidak", "type": "checkbox2"},
                        { "id": 80730, "nama": "Ada", "type": "checkbox2"},
                        
                        
                  
                    ]
                },
            ]
            $scope.listNamaEdukasi = [
                {
                    "id": 1, "nama": "1. Nama Penerima Edukasi :",
                    "detail": [
                        { "id": 80668, "nama": "", "type": "textbox" },
                        { "id": 80669, "nama": "L", "type": "checkbox" },
                        { "id": 80670, "nama": "P", "type": "checkbox" },
                        
                    ]
                },
                {
                    "id": 2, "nama": "2. Umur :",
                    "detail": [
                        { "id": 80671, "nama": "", "type": "textbox" },
                        
                        
                    ]
                },
                {
                    "id": 2, "nama": "3. Hubungan :",
                    "detail": [
                        { "id": 80672, "nama": "Pasien", "type": "checkbox" },
                        { "id": 80673, "nama": "Keluarga", "type": "checkbox" },
                        { "id": 80674, "nama": "Penanggung Jawab", "type": "checkbox" },
                        
                        
                    ]
                },
                {
                    "id": 2, "nama": "4.Alamat :",
                    "detail": [
                        { "id": 80675, "nama": "", "type": "textbox" },
                        
                        
                    ]
                },
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

            medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + nomorEMR + "&emrfk=" + $scope.cc.emrfk, true).then(function (dat) {
                $scope.item.obj = []
                $scope.item.obj2 = []
                $scope.item.obj[80676]=$scope.now
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
                            if (dataLoad[i].emrdfk >= 14464 && dataLoad[i].emrdfk <= 14469 && chekedd) {
                                $scope.getSkalaNyeri(1, { descNilai: dataLoad[i].reportdisplay })
                            }
                            if (dataLoad[i].emrdfk >= 5053 && dataLoad[i].emrdfk <= 5084 && dataLoad[i].reportdisplay != null) {
                                var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                                $scope.getSkor2(datass)
                            }
                            if (dataLoad[i].emrdfk >= 14424 && dataLoad[i].emrdfk <= 14431 && dataLoad[i].reportdisplay != null) {
                                var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                                $scope.getSkorGizi(datass)
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
                $scope.cc.jenisemr = 'asesmen'
                var jsonSave = {
                    head: $scope.cc,
                    data: arrSave
                }
                medifirstService.post('emr/save-emr-dinamis', jsonSave).then(function (e) {
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,  
                   'Pengkajian dan Perencanaan Kebutuhan Edukasi ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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