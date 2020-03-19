define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AsesmenUlangRisikoJatuhCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.totalSkor3 = 0
            $scope.totalSkor4 = 0
            $scope.item.objcbo =[]
            $scope.listData1 = []
            $scope.listData2 = []
            $scope.listData3 = []
            $scope.listData4 = []
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 178
            var dataLoad = []
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
             })

            medifirstService.getPart2('7186','emr/get-datacombo-part-ruangan-pelayanan', true, true, 20).then(function (data) {
                                $scope.item.objcbo[data.options.idididid] = data
                            })
            medifirstService.getPart2('7187','emr/get-datacombo-part-dokter', true, true, 20).then(function (data) {
                                $scope.item.objcbo[data.options.idididid] = data
                            })
            medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 178).then(function (e) {

                var datas = e.data.kolom4

                var detail = []
                var arrayShiftJaga= []
                var arrayShiftJaga2 = []
                var arrayShiftJaga3= []
                var arrayShiftJaga4= []
                var arrayShiftJaga5= []
                var arrayShiftJaga6= []
                var arrayShiftJaga7= []
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
                    if (element.kodeexternal == 'risiko4') {
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
                    // ARRAY GEJALA
                    if (element.kodeexternal == 'risiko5') {
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
                    if (element.kodeexternal == 'risiko6') {
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

                // ARRAY GEJALA
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
                // ARRAY GEJALA
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
                // ARRAY GEJALA
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
            
            
            $scope.listEdmon1 = [
                {
                    "id": 1, "nama": "USIA",
                    "detail": [
                        { "id": 7107, "nama": "< 50 Tahun", "descNilai": "8" },
                        { "id": 7108, "nama": "50-79 Tahun", "descNilai": "10" },
                        { "id": 7109, "nama": ">= 80 Tahum", "descNilai": "26" },

                    ]
                },
                {
                    "id": 2, "nama": "STATUS MENTAL",
                    "detail": [
                        { "id": 7110, "nama": "Sadar penuh/Orientasi baik sepanjang waktu", "descNilai": "4" },
                        { "id": 7111, "nama": "Agitasi / Cemas", "descNilai": "12" },
                        { "id": 7112, "nama": "Keadaan bingung", "descNilai": "13" },
                        { "id": 7113, "nama": "Bingung / Disoreintasi", "descNilai": "14" },

                    ]
                },
                {
                    "id": 3, "nama": "ELIMINASI",
                    "detail": [
                        { "id": 7114, "nama": "Mandiri mampu mengontrol rectum dan vesica urinaria", "descNilai": "8" },
                        { "id": 7115, "nama": "Kateter / ostomi", "descNilai": "12" },
                        { "id": 7116, "nama": "Eliminasi dengan bantuan", "descNilai": "10" },
                        { "id": 7117, "nama": "Gangguan eliminasi (Inkontinensia, nocturna,Frekuensi)", "descNilai": "12" },
                        { "id": 7118, "nama": "inkontinensia tapi mampu bergerak mandiri", "descNilai": "12" },

                    ]
                },
                {
                    "id": 4, "nama": "OBAT",
                    "detail": [
                        { "id": 7119, "nama": "Tanpa obat", "descNilai": "10" },
                        { "id": 7120, "nama": "Obat Jantung", "descNilai": "10" },
                        { "id": 7121, "nama": "Obat psikotropik (termasuk benzodiazepine Anti depresan)", "descNilai": "8" },
                        { "id": 7122, "nama": "Mengalami peningkatan dosis obat tersebut dan/atau diberikan bilamana perlu, diterima dalam 24 jam terakhir", "descNilai": "12" },


                    ]
                },
                {
                    "id": 5, "nama": "DIAGNOSIS",
                    "detail": [
                        { "id": 7123, "nama": "Gangguan bipolar / Skizoaafektif", "descNilai": "10" },
                        { "id": 7124, "nama": "Gangguan penyalahgunaan zat/alkohol", "descNilai": "10" },
                        { "id": 7125, "nama": "Gangguan depresi mayor", "descNilai": "8" },
                        { "id": 7126, "nama": "Delirium / demensia", "descNilai": "12" },

                    ]
                },



            ]
        
            $scope.listEdmon2 = [

                {
                    "id": 6, "nama": "AMBULASI / KESEIMBANGAN",
                    "detail": [
                        { "id": 7127, "nama": "Mandiri / langkah mantap", "descNilai": "7" },
                        { "id": 7128, "nama": "Menggunakan alat bantu", "descNilai": "8" },
                        { "id": 7129, "nama": "Vertigo / hipotensi ortostatik / lemah", "descNilai": "10" },
                        { "id": 7130, "nama": "Langkah tidak mantap, membutuhkan Bantuan,sadar akan ketidakmampuannya", "descNilai": "8" },
                        { "id": 7131, "nama": "Langkah tidak mantap, namun tidak menyadari keterbatasannya", "descNilai": "15" },

                    ]
                },

                {
                    "id": 7, "nama": "NUTRISI",
                    "detail": [
                        { "id": 7132, "nama": "Asupan makanan dan cairan dalam 24 jam terakhir sangat sedikit", "descNilai": "12" },
                        { "id": 7133, "nama": "Tidak ada gangguan nafsu makan", "descNilai": "0" },

                    ]
                },

                {
                    "id": 8, "nama": "GANGGUAN TIDUR",
                    "detail": [
                        { "id": 7134, "nama": "Tidak ada gangguan tidur", "descNilai": "8" },
                        { "id": 7135, "nama": "Ada gangguan tidur yang dilaporkan oleh pasien, keluarga dan staf", "descNilai": "12" },

                    ]
                },

                {
                    "id": 9, "nama": "RIWAYAT JATUH",
                    "detail": [
                        { "id": 7136, "nama": "Tidak ada riwayat jatuh", "descNilai": "8" },
                        { "id": 7137, "nama": "Riwayat jatuh dalan 3 bulan terakhir", "descNilai": "14" },

                    ]
                },

            ]
            
            $scope.listMorse = [

                {
                    "id": 1, "nama": "Riwayat pasien : Apakah pasien pernah jatuh dalam 3 bulan terakhir?",
                    "detail": [
                        { "id": 7141, "nama": "Tidak", "descNilai": "0" },
                        { "id": 7142, "nama": "Ya", "descNilai": "25" },
                    ]
                },

                {
                    "id": 2, "nama": "Diagnosa Sekunder : Apakah pasien memiliki lebih dari satu penyakit?",
                    "detail": [
                        { "id": 7143, "nama": "Tidak", "descNilai": "0" },
                        { "id": 7144, "nama": "Ya", "descNilai": "15" },
                    ]
                },

                {
                    "id": 3, "nama": "Alat Bantu Jalan",
                    "detail": [
                        { "id": 7145, "nama": "Bed rest dibantu perawat", "descNilai": "0" },
                        { "id": 7146, "nama": "Kruk/tongkat/walker", "descNilai": "15" },
                        { "id": 7147, "nama": "Berpegangan pada benda-benda disekitar", "descNilai": "30" },

                    ]
                },

                {
                    "id": 4, "nama": "Terapi Intravena : Apakah saat ini pasien terpasang infus?",
                    "detail": [
                        { "id": 7148, "nama": "Tidak", "descNilai": "0" },
                        { "id": 7149, "nama": "Ya", "descNilai": "20" },

                    ]
                },
                {
                    "id": 5, "nama": "Gaya berjalan/cara  berpindah",
                    "detail": [
                        { "id": 7150, "nama": "Normal/Bed rest/immobile(tidak dapat bergerak sendiri", "descNilai": "0" },
                        { "id": 7151, "nama": "Kruk/tongkat/walker", "descNilai": "15" },
                        { "id": 7152, "nama": "Berpegangan pada benda-benda disekitar", "descNilai": "30" },


                    ]
                },
                {
                    "id": 6, "nama": "Status Mental",
                    "detail": [
                        { "id": 7153, "nama": "pasien Menyadari kondisinya", "descNilai": "0" },
                        { "id": 7154, "nama": "Pasien mengalami keterbatasan daya ingat", "descNilai": "15" },

                    ]
                },

            ]
             $scope.listHumpty = [

                {
                    "id": 1, "nama": "Usia",
                    "detail": [
                        { "id": 7159, "nama": "< 3 tahun", "descNilai": "4" },
                        { "id": 7160, "nama": "3-7 tahun", "descNilai": "3" },
                        { "id": 7161, "nama": "8-12 tahun", "descNilai": "2" },
                        { "id": 7162, "nama": ">= 13 tahun", "descNilai": "1" },
                    ]
                },

                {
                    "id": 2, "nama": "Jenis kelamin",
                    "detail": [
                        { "id": 7163, "nama": "Laki-laki", "descNilai": "2" },
                        { "id": 7164, "nama": "Perempuan", "descNilai": "1" },
                    ]
                },

                {
                    "id": 3, "nama": "Diagnosis",
                    "detail": [
                        { "id": 7165, "nama": "Diagnosis Neurologi", "descNilai": "4" },
                        { "id": 7166, "nama": "Perubahan Oksigenasi (Diagnosis respiratorik, dehidrasi, anemia, anoreksia, sinkop, pusing, dsb)", "descNilai": "3" },
                        { "id": 7167, "nama": "Gangguan perilaku / psikiatri", "descNilai": "2" },
                        { "id": 7168, "nama": "Diagnosis lainnya", "descNilai": "1" },
                    ]
                    
                },

                {
                    "id": 4, "nama": "Gangguan/kognitif",
                    "detail": [
                        { "id": 7169, "nama": "Tidak menyadari keterbatasan dirinya", "descNilai": "3" },
                        { "id": 7170, "nama": "Lupa karena adanya keterbatasan", "descNilai": "2" },
                        { "id": 7171, "nama": "Orientasi baik terhadap diri sendiri", "descNilai": "1" },

                    ]
                },
                {
                    "id": 5, "nama": "Faktor lingkungan",
                    "detail": [
                        { "id": 7172, "nama": "Riwayat jatuh-bayi diletakan ditempat tidur dewasa", "descNilai": "4" },
                        { "id": 7173, "nama": "Pasien Menggunakan Alat bantu/bayi diletakan dalam tempat tidur bayi/perabot rumah", "descNilai": "3" },
                        { "id": 7174, "nama": "Pasien diletakan ditempat tidur", "descNilai": "2" },
                        { "id": 7175, "nama": "Area diluar rumah sakit", "descNilai": "1" },


                    ]
                },
                {
                    "id": 6, "nama": "Respon terhadap :Pembedahan/sedasi/anestesi, penggunaan medikamentosa",
                    "detail": [
                        { "id": 7176, "nama": "Dalam 24 jam ", "descNilai": "3" },
                        { "id": 7177, "nama": "Dalam 48 jam", "descNilai": "2" },
                        { "id": 7178, "nama": "> 48 jam/tidak mengalami perbedaan/sedasi/anestesi", "descNilai": "1" },
                        { "id": 7179, "nama": "penggunaan multiple, sedatif, obat hipnosis, harbiturat, fanotiazin, anti depresan, pencahar, diuretik, narkosa", "descNilai": "3" },
                        { "id": 7180, "nama": "penggunaan salah satu obat diatas", "descNilai": "2" },
                        { "id": 7181, "nama": "penggunaan medikasi lainnya atau tidak ada medikasi", "descNilai": "1" },

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
                $scope.item.obj[7185]=new Date()
                $scope.item.obj[7187]={ value: $scope.cc.iddpjp, text: $scope.cc.dokterdpjp }
                $scope.item.obj[7186]={value: $scope.cc.objectruanganfk, text : $scope.cc.namaruangan}
                $scope.item.obj2 = []
                dataLoad = dat.data.data
                for (var i = 0; i <= dataLoad.length - 1; i++) {
                    if (parseFloat($scope.cc.emrfk) == dataLoad[i].emrfk) {

                        if (dataLoad[i].type == "textbox") {
                            $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                            if(dataLoad[i].emrdfk == 7138)
                                $scope.totalSkor2 = parseFloat(dataLoad[i].value)
                              if(dataLoad[i].emrdfk == 7155)
                                $scope.totalSkor3 = parseFloat(dataLoad[i].value)
                              if(dataLoad[i].emrdfk == 7182)
                                $scope.totalSkor4 = parseFloat(dataLoad[i].value)
                                           
                        }
                        if (dataLoad[i].type == "checkbox") {
                            chekedd = false
                            if (dataLoad[i].value == '1') {
                                chekedd = true
                            }
                            $scope.item.obj[dataLoad[i].emrdfk] = chekedd
                            // if (dataLoad[i].emrdfk >= 7107 && dataLoad[i].emrdfk <= 7137 && dataLoad[i].reportdisplay != null) {
                            //     var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                            //     $scope.getSkor2(datass)
                            // }
                            // if (dataLoad[i].emrdfk >= 7141 && dataLoad[i].emrdfk <= 7154 && dataLoad[i].reportdisplay != null) {
                            //     var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                            //     $scope.getSkor3(datass)
                            // }
                            // if (dataLoad[i].emrdfk >= 7159 && dataLoad[i].emrdfk <= 7181 && dataLoad[i].reportdisplay != null) {
                            //     var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                            //     $scope.getSkor4(datass)
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
                            if(str != undefined){
                                var res = str.split("~");
                                // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
                                $scope.item.obj[dataLoad[i].emrdfk] = { value: res[0], text: res[1] }        
                            }

                        }
                    }

                }
            })
            $scope.$watch('item.obj[7138]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai < 90 ) {
                    $scope.item.obj[7139] = true
                    $scope.item.obj[7140] = false
                   
                }
                if (nilai >= 90) {
                    $scope.item.obj[7139] = false
                    $scope.item.obj[7140] = true
                 
                }
            })
            $scope.$watch('item.obj[7182]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai >=7 && nilai <=11 ) {
                    $scope.item.obj[7183] = true
                    $scope.item.obj[7184] = false
                   
                }
                if (nilai >= 12) {
                    $scope.item.obj[7183] = false
                    $scope.item.obj[7184] = true
                 
                }
                
            })
                $scope.$watch('item.obj[7155]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai <=24 ) {
                    $scope.item.obj[7156] = true
                    $scope.item.obj[7157] = false
                    $scope.item.obj[7158] = false
                   
                }
                if (nilai >= 25 && nilai <=50) {
                    $scope.item.obj[7156] = false
                    $scope.item.obj[7157] = true
                    $scope.item.obj[7158] = false
                 
                }
                if (nilai >50 ) {
                    $scope.item.obj[7156] = false
                    $scope.item.obj[7157] = false
                    $scope.item.obj[7158] = true
                 
                }
                
            });

            // $scope.getSkalaNyeri = function (data, stat) {
            //     $scope.activeStatus = stat.descNilai
            //     var nilai = stat.descNilai
            //     if (nilai >= 0 && nilai <= 1) {
            //         $scope.item.obj[5046] = true
            //         $scope.item.obj[5047] = false
            //         $scope.item.obj[5048] = false
            //         $scope.item.obj[5049] = false
            //         $scope.item.obj[5050] = false
            //         $scope.item.obj[5051] = false
            //     }
            //     if (nilai >= 2 && nilai <= 3) {
            //         $scope.item.obj[5046] = false
            //         $scope.item.obj[5047] = true
            //         $scope.item.obj[5048] = false
            //         $scope.item.obj[5049] = false
            //         $scope.item.obj[5050] = false
            //         $scope.item.obj[5051] = false
            //     }
            //     if (nilai >= 4 && nilai <= 5) {
            //         $scope.item.obj[5046] = false
            //         $scope.item.obj[5047] = false
            //         $scope.item.obj[5048] = true
            //         $scope.item.obj[5049] = false
            //         $scope.item.obj[5050] = false
            //         $scope.item.obj[5051] = false
            //     }
            //     if (nilai >= 6 && nilai <= 7) {
            //         $scope.item.obj[5046] = false
            //         $scope.item.obj[5047] = false
            //         $scope.item.obj[5048] = false
            //         $scope.item.obj[5049] = true
            //         $scope.item.obj[5050] = false
            //         $scope.item.obj[5051] = false
            //     }
            //     if (nilai >= 8 && nilai <= 9) {
            //         $scope.item.obj[5046] = false
            //         $scope.item.obj[5047] = false
            //         $scope.item.obj[5048] = false
            //         $scope.item.obj[5049] = false
            //         $scope.item.obj[5050] = true
            //         $scope.item.obj[5051] = false
            //     }

            //     if (nilai == 10) {
            //         $scope.item.obj[5046] = false
            //         $scope.item.obj[5047] = false
            //         $scope.item.obj[5048] = false
            //         $scope.item.obj[5049] = false
            //         $scope.item.obj[5050] = false
            //         $scope.item.obj[5051] = true
            //     }

            // }
          
            $scope.totalSkorAses =0
            $scope.getSkorAsesmen = function(stat,skor){
                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if (arrobj[i] == stat.id) {
                        if ($scope.item.obj[parseFloat(arrobj[i])] == true) {
                            $scope.totalSkorAses = $scope.totalSkorAses + parseFloat(skor.descNilai)
                            break
                        } else {
                            $scope.totalSkorAses = $scope.totalSkorAses - parseFloat(skor.descNilai)
                            break
                        }
                    } else {

                    }
                }
                $scope.item.obj[5194] = $scope.totalSkorAses 
            }
            $scope.getSkor2 = function (stat) {

                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if (arrobj[i] == stat.id) {
                        if ($scope.item.obj[parseFloat(arrobj[i])] == true) {
                            $scope.totalSkor2 = $scope.totalSkor2 + parseFloat(stat.descNilai)
                            break
                        } else {
                            $scope.totalSkor2 = $scope.totalSkor2 - parseFloat(stat.descNilai)
                            break
                        }


                    } else {

                    }
                }
                $scope.item.obj[7138] = $scope.totalSkor2
                // setSkorAkhir($scope.item.obj[3152])
            }
            $scope.getSkor3 = function (stat) {

                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if (arrobj[i] == stat.id) {
                        if ($scope.item.obj[parseFloat(arrobj[i])] == true) {
                            $scope.totalSkor3 = $scope.totalSkor3 + parseFloat(stat.descNilai)
                            break
                        } else {
                            $scope.totalSkor3 = $scope.totalSkor3 - parseFloat(stat.descNilai)
                            break
                        }


                    } else {

                    }
                }
                $scope.item.obj[7155] = $scope.totalSkor3
                // setSkorAkhir($scope.item.obj[3152])
            }
             $scope.getSkor4 = function (stat) {

                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if (arrobj[i] == stat.id) {
                        if ($scope.item.obj[parseFloat(arrobj[i])] == true) {
                            $scope.totalSkor4 = $scope.totalSkor4 + parseFloat(stat.descNilai)
                            break
                        } else {
                            $scope.totalSkor4 = $scope.totalSkor4 - parseFloat(stat.descNilai)
                            break
                        }


                    } else {

                    }
                }
                $scope.item.obj[7182] = $scope.totalSkor4
                // setSkorAkhir($scope.item.obj[3152])
            }


            function setSkorAkhir(total) {

                if (total < 7) {
                    $scope.item.obj[3149] = true
                    $scope.item.obj[3150] = false
                    $scope.item.obj[3151] = false
                }

                if (total >= 7 && total <= 14) {
                    $scope.item.obj[3149] = false
                    $scope.item.obj[3150] = true
                    $scope.item.obj[3151] = false
                }

                if (total > 14) {
                    $scope.item.obj[3149] = false
                    $scope.item.obj[3150] = false
                    $scope.item.obj[3151] = true
                }



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
                $scope.cc.jenisemr = 'asesmen'
                var jsonSave = {
                    head: $scope.cc,
                    data: arrSave
                }
                medifirstService.post('emr/save-emr-dinamis', jsonSave).then(function (e) {

                    $rootScope.loadRiwayat()
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,  
                    'Asesmen Ulang Risiko Jatuh ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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