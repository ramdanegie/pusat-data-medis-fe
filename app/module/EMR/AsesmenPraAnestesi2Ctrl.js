define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AsesmenPraAnestesi2Ctrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 507
            var dataLoad = []
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
             })
            $scope.listAlergi = [
                {
                    "id": 1, "nama": "Alergi Obat :",
                    "detail": [
                        { "id": 115051, "nama": "1.", "type": "textbox" },
                        { "id": 115052, "nama": "2.", "type": "textbox" },
                        { "id": 115053, "nama": "3.", "type": "textbox" },
                        { "id": 115054, "nama": "4.", "type": "textbox" },
                    ]
                },
            ]
    
            $scope.listTanda = [
                {
                    "id": 1, "nama": "Tanda tanda vital sebelum tindakan :",
                    "detail": [
                        { "id": 115055, "nama": "TD :", "type": "textbox" },
                        { "id": 115056, "nama": "Nadi :", "type": "textbox" },
                        { "id": 115057, "nama": "BB :", "type": "textbox" },
                        { "id": 115058, "nama": "RR :", "type": "textbox" },
                        { "id": 115059, "nama": "TB :", "type": "textbox" },
                        { "id": 115060, "nama": "Suhu :", "type": "textbox" },
                    ]
                },
            ]
            $scope.listADL = [
                { id: 5011, nama: 'Mandiri' },
                { id: 5012, nama: 'Perlu Bantuan' },
                { id: 5013, nama: 'Bantuan Total' },

            ]
            $scope.listKeluhanFisik = [
                { id: 5014, nama: 'Tidak Ada' },
                { id: 5015, nama: 'Ada, jelaskan :' },
            ]

            $scope.listPemeriksaanLab = [
                {
                    "id": 1, "nama": "Pemeriksaan Lab",
                    "detail": [
                        { "id": 115093, "nama": "", "type": "textbox" },
                        
                    ]
                },
                {
                    "id": 2, "nama": "HB/HCT/CBC ",
                    "detail": [
                        { "id": 115094, "nama": "", "type": "textbox" },
                        

                    ]
                },
                {
                    "id": 3, "nama": "Fungsi Ginjal",
                    "detail": [
                        { "id": 115095, "nama": "Ureum", "type": "textbox" },
                        { "id": 115096, "nama": "Creatin", "type": "textbox" },
                    ]
                },
                {
                    "id": 4, "nama": "Fungsi Hati",
                    "detail": [
                        { "id": 115097, "nama": "SGOT", "type": "textbox" },
                        { "id": 115098, "nama": "SGPT", "type": "textbox" },
                        { "id": 115099, "nama": "Albumin", "type": "textbox" },
                        { "id": 115100, "nama": "Globumin", "type": "textbox" },
                        
                    ]
                },
                {
                    "id": 5, "nama": "Elektrolit",
                    "detail": [
                        { "id": 115101, "nama": "NA", "type": "textbox" },
                        { "id": 115102, "nama": "K ", "type": "textbox" },
                        { "id": 115103, "nama": "CL ", "type": "textbox" },
                        { "id": 115104, "nama": "Ca", "type": "textbox" },
                        { "id": 115105, "nama": "Mg", "type": "textbox" },
                    ]
                },
                {
                    "id": 6, "nama": "Lain-lain",
                    "detail": [
                        { "id": 115106, "nama": "", "type": "textbox" },
                    ]
                },
                // {
                //     "id": 7, "nama": "Kesimpulan Pra Anestesi/Sedasi ",
                //     "detail": [
                //         { "id": 5038, "nama": "", "type": "textbox" },
                        
                //     ]
                // },
            ]
            

            $scope.listIntruksi = [
                {
                    "id": 1, "nama": "",
                    "detail": [
                        { "id": 115107, "nama": "Puasa", "type": "textbox" },
                    ]
                },
                {
                    "id": 2, "nama": "",
                    "detail": [
                        { "id": 115108, "nama": "Makanan Padat", "type": "textbox" },
                        { "id": 115109, "nama": "Makanan Cairan", "type": "textbox" },
                    ]
                },
                {
                    "id": 2, "nama": "Obat-obat diberikan terus",
                    "detail": [
                        { "id": 115110, "nama": "Ya", "type": "checkbox" },
                        { "id": 115111, "nama": "Tidak", "type": "checkbox" },
                    ]
                },
                {
                    "id": 3, "nama": "",
                    "detail": [
                        { "id": 115112, "nama": "Obat yang dihentikan", "type": "textbox" },
                    ]
                },

                



            ]
        
            $scope.listEdmon2 = [

                {
                    "id": 6, "nama": "AMBULASI / KESEIMBANGAN",
                    "detail": [
                        { "id": 5074, "nama": "Mandiri / langkah mantap", "descNilai": "7" },
                        { "id": 5075, "nama": "Menggunakan alat bantu", "descNilai": "8" },
                        { "id": 5076, "nama": "Vertigo / hipotensi ortostatik / lemah", "descNilai": "10" },
                        { "id": 5077, "nama": "Langkah tidak mantap, membutuhkan Bantuan,sadar akan ketidakmampuannya", "descNilai": "8" },
                        { "id": 5078, "nama": "Langkah tidak mantap, namun tidak menyadari keterbatasannya", "descNilai": "15" },

                    ]
                },

                {
                    "id": 7, "nama": "NUTRISI",
                    "detail": [
                        { "id": 5079, "nama": "Asupan makanan dan cairan dalam 24 jam terakhir sangat sedikit", "descNilai": "12" },
                        { "id": 5080, "nama": "Tidak ada gangguan nafsu makan", "descNilai": "0" },

                    ]
                },

                {
                    "id": 8, "nama": "GANGGUAN TIDUR",
                    "detail": [
                        { "id": 5081, "nama": "Tidak ada gangguan tidur", "descNilai": "8" },
                        { "id": 5082, "nama": "Ada gangguan tidur yang dilaporkan oleh pasien, keluarga dan staf", "descNilai": "12" },

                    ]
                },

                {
                    "id": 9, "nama": "RIWAYAT JATUH",
                    "detail": [
                        { "id": 5083, "nama": "Tidak ada riwayat jatuh", "descNilai": "8" },
                        { "id": 5084, "nama": "Riwayat jatuh dalan 3 bulan terakhir", "descNilai": "14" },

                    ]
                },

            ]
            $scope.listNutrisi = [

                {
                    "id": 1, "nama": "Penurunan Berat Badan yang tidak diinginkan dalam 6 bulan terakhir",
                    "detail": [
                        { "id": 5085, "nama": "a. Tidak ada penurunan berat badan", "descNilai": "0" },
                        { "id": 5086, "nama": "b. Tidak yakin / tidak tahu / terasa baju lebih longgar", "descNilai": "2" },
                        { "id": 5087, "nama": "c. Penurunan : > 1 - 5 kg", "descNilai": "1" },
                        { "id": 5088, "nama": "               > 6 - 10 kg", "descNilai": "2" },
                        { "id": 5089, "nama": "               > 11 - 15 kg", "descNilai": "3" },
                        { "id": 5090, "nama": "               > 15 kg", "descNilai": "4" },
                        { "id": 5091, "nama": "  Tidak tahu berapa penurunan berat badan", "descNilai": "2" },
                    ]
                },
                {
                    "id": 2, "nama": "Asupan Makan Berkurang karena tidak nafsu makan",
                    "detail": [
                        { "id": 5092, "nama": "a. Tidak", "descNilai": "0" },
                        { "id": 5093, "nama": "b. Ya", "descNilai": "1" }
                    ]
                },
            ]
            $scope.listPasienDiagKhusus = [{
                "id": 1, "nama": "Pasien dengan diagnosa khusus :",
                "detail": [
                    { "id": 5097, "nama": "Tidak", "type": "checkbox" },
                    { "id": 5098, "nama": "Ya, sebutkan", "type": "checkbox" },
                    { "id": 5099, "nama": "", "type": "textbox" },
                ]
            },
            {
                "id": 2, "nama": "Dilaporkan ke Dokter Bila skor >= 2 dan atau pasien dengan diagnosis / kondisi khusus :",
                "detail": [
                    { "id": 5100, "nama": "Tidak", "type": "checkbox" },
                    { "id": 5101, "nama": "Ya, pukul", "type": "checkbox" },
                    { "id": 5102, "nama": "", "type": "textbox" },
                ]
            }
            ]
            $scope.listPsiko = [{
                "id": 1, "nama": "Status Emosi",
                "detail": [
                    { "id": 5103, "nama": "Kooperatif", "type": "checkbox" },
                    { "id": 5104, "nama": "Cemas", "type": "checkbox" },
                    { "id": 5105, "nama": "Depresi", "type": "checkbox" },
                ]
            },
            {
                "id": 2, "nama": "Status Pernikahan",
                "detail": [
                    { "id": 5106, "nama": "Menikah", "type": "checkbox" },
                    { "id": 5107, "nama": "Belum menikah ", "type": "checkbox" },
                    { "id": 5108, "nama": "Janda Duda", "type": "checkbox" },
                ]
            },
            {
                "id": 3, "nama": "Keluarga",
                "detail": [
                    { "id": 5109, "nama": "Tinggal Sendiri", "type": "checkbox" },
                    { "id": 5110, "nama": "Tinggal dengan keluarga ", "type": "checkbox" },

                ]
            },
            {
                "id": 4, "nama": "Penelantaran ",
                "detail": [
                    { "id": 5111, "nama": "Ya ", "type": "checkbox" },
                    { "id": 5112, "nama": "Tidak ", "type": "checkbox" },

                ]
            },
            {
                "id": 5, "nama": "Keluarga terdekat ",
                "detail": [
                    { "id": 5113, "nama": "Ayah/ Ibu", "type": "checkbox" },
                    { "id": 5114, "nama": "Adik / Kakak ", "type": "checkbox" },
                    { "id": 5115, "nama": "Lainnya", "type": "checkbox" },
                    { "id": 5116, "nama": " .. ", "type": "textbox" },
                ]
            },
            {
                "id": 6, "nama": "Bahasa Sehari-hari ",
                "detail": [
                    { "id": 5117, "nama": "Indonesia", "type": "checkbox" },
                    { "id": 5118, "nama": "Jawa ", "type": "checkbox" },
                    { "id": 5119, "nama": "Lainnya", "type": "checkbox" },
                    { "id": 5120, "nama": " .. ", "type": "textbox" },
                ]
            },
            ]

            $scope.listSosial = [{
                "id": 1, "nama": "Sosial. Ada yang menunggu",
                "detail": [
                    { "id": 5124, "nama": "Tidak", "type": "checkbox" },
                    { "id": 5125, "nama": "Ya ", "type": "checkbox" },
                    { "id": 5126, "nama": "", "type": "textbox" },
                ]
            },
            {
                "id": 2, "nama": "Ekonomi. Ada yang bertanggungjawab",
                "detail": [
                    { "id": 5127, "nama": "Tidak", "type": "checkbox" },
                    { "id": 5128, "nama": "Ya ...", "type": "checkbox" },
                    { "id": 5129, "nama": "", "type": "textbox" },
                ]
            },
            {
                "id": 3, "nama": "KEBUTUHAN EDUKASI",
                "detail": [
                    { "id": 5130, "nama": "Tidak ", "type": "checkbox" },
                    { "id": 5131, "nama": "Iya, sebutkan ... ", "type": "checkbox" },
                    { "id": 5132, "nama": "", "type": "textbox" },
                ]
            },
            {
                "id": 4, "nama": "PERENCANAAN PEMULANGAN PASIEN ",
                "detail": [
                    { "id": 5133, "nama": "Tidak ", "type": "checkbox" },
                    { "id": 5134, "nama": "Iya, sebutkan ... ", "type": "checkbox" },
                    { "id": 5135, "nama": "", "type": "textbox" },
                ]
            },

            ]

            $scope.listBarthel = [
                {
                    "id": 1, "nama": "Mengendalikan Rangsang delekasi",
                    "detail": [
                        {
                            "id": 1, "nama": "Tidak terkendali tak teratur (perlu bantuan)", "descNilai": "0", "ket": 1,
                            "detail": [{ id: 5136, baris : 1 }, { id: 5137, baris : 2 }]
                        },
                        {
                            "id": 2, "nama": "Kadang-kadang tak terkendali", "descNilai": "1", "ket": 1,
                            "detail": [{ id: 5138, baris : 1 }, { id: 5139,baris : 2  }]
                        },
                        {
                            "id": 3, "nama": "Mandiri", "descNilai": "2", "ket": 1,
                            "detail": [{ id: 5140, baris : 1}, { id: 5141, baris : 2 }]
                        },
                    ]
                },
                {
                    "id": 2, "nama": "Mengendalikan Rangsang berkemih",
                    "detail": [
                        { "id": 1, "nama": "Tak terkendali pakai kateter", "descNilai": "0" ,   "detail": [{ id: 5142, baris : 1 }, { id: 5143, baris : 2 }]},
                        { "id": 2, "nama": "Kadang-kadang tak terkendali (1x24 jam)", "descNilai": "1",   "detail": [{ id: 5144, baris : 1 }, { id: 5145, baris : 2 }] },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2" ,   "detail": [{ id: 5146, baris : 1 }, { id: 5147, baris : 2 }]},
                    ]
                },
                {
                    "id": 3, "nama": "Membersihkan diri ( cuci muka, sisir rambur, sikat gigi)",
                    "detail": [
                        { "id": 1, "nama": "Butuh pertolongan orang lain", "descNilai": "0" ,   "detail": [{ id: 5148, baris : 1 }, { id: 5149,baris : 2 }]},
                        { "id": 2, "nama": "Mandiri", "descNilai": "1" ,   "detail": [{ id: 5150, baris : 1 }, { id: 5151, baris : 2 }]},
                    ]
                },
                {
                    "id": 4, "nama": "Penggunaan jamban (masuk, keluar)",
                    "detail": [
                        { "id": 1, "nama": "Tergantung pertolongan orang lain", "descNilai": "0",   "detail": [{ id: 5152, baris : 1 }, { id: 5153, baris : 2 }] },
                        { "id": 2, "nama": "Perlu pertolongan beberapa kegiatan tetapi dapat mengerjakan sendiri pada kegiatan yang lain", "descNilai": "1" ,   
                        "detail": [{ id: 5154, baris : 1 }, { id: 5155, baris : 2 }]},
                        { "id": 3, "nama": "Mandiri", "descNilai": "2",   "detail": [{ id: 5156, baris : 1 }, { id: 5157, baris : 2 }] },
                    ]
                },
                {
                    "id": 5, "nama": "Makan",
                    "detail": [
                        { "id": 1, "nama": "Tidak mampu", "descNilai": "0", "detail": [{ id: 5158, baris : 1   }, { id: 5159, baris : 2 }]  },
                        { "id": 2, "nama": "Perlu ditolong  memotong makanan", "descNilai": "1","detail": [{ id: 5160, baris : 1 }, { id: 5161, baris : 2 }] },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2" ,"detail": [{ id: 5162, baris : 1 }, { id: 5163, baris : 2 }]},
                    ]
                },
                {
                    "id": 6, "nama": "Berubah sikap dari berbaring ke duduk",
                    "detail": [
                        { "id": 1, "nama": "Perlu banyak bantuan untuk bisa duduk (2 org)", "descNilai": "0" ,"detail": [{ id: 5164, baris : 1 }, { id: 5165, baris : 2 }]},
                        { "id": 2, "nama": "Bantuan minimal 2 org", "descNilai": "1" ,"detail": [{ id: 5166, baris : 1 }, { id: 5167, baris : 2 }]},
                        { "id": 3, "nama": "Bantuan Verbal", "descNilai": "2","detail": [{ id: 15692, baris : 1 }, { id: 15693, baris : 2 }] },
                        { "id": 4, "nama": "Mandiri", "descNilai": "3","detail": [{ id: 5168, baris : 1 }, { id: 5169, baris : 2 }] },
                    ]
                },
                {
                    "id": 7, "nama": "Berpindah / berjalan",
                    "detail": [
                        { "id": 1, "nama": "Tidak mampu", "descNilai": "0","detail": [{ id: 5170, baris : 1 }, { id: 5171, baris : 2 }] },
                        { "id": 2, "nama": "Bisa (pindah) dengan kursi ", "descNilai": "1" ,"detail": [{ id: 5172, baris : 1 }, { id: 5173, baris : 2 }]},
                        { "id": 3, "nama": "Berjalan dengan bantuan 1 orang", "descNilai": "2" ,"detail": [{ id: 5174, baris : 1 }, { id: 5175, baris : 2 }]},
                        { "id": 4, "nama": "Mandiri", "descNilai": "3","detail": [{ id: 5176, baris : 1 }, { id: 5177, baris : 2 }] },
                    ]
                },
                {
                    "id": 8, "nama": "Memakai Baju",
                    "detail": [
                        { "id": 1, "nama": "Tergantung orang lain", "descNilai": "0" ,"detail": [{ id: 5178, baris : 1 }, { id: 5179, baris : 2 }]},
                        { "id": 2, "nama": "Sebagian dibantu (misal mengancingkan baju)", "descNilai": "1" ,"detail": [{ id: 5180, baris : 1 }, { id: 5181, baris : 2 }]},
                        { "id": 3, "nama": "Mandiri", "descNilai": "2" ,"detail": [{ id: 5182, baris : 1 }, { id: 5183, baris : 2 }]},

                    ]
                },
                {
                    "id": 9, "nama": "Naik turun tangga ",
                    "detail": [
                        { "id": 1, "nama": "Tidak Mampu", "descNilai": "0","detail": [{ id: 5184, baris : 1 }, { id: 5185, baris : 2 }] },
                        { "id": 2, "nama": "Butuh Pertolongan orang lain", "descNilai": "1","detail": [{ id: 5186, baris : 1 }, { id: 5187, baris : 2 }] },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2","detail": [{ id: 5188, baris : 1 }, { id: 5189, baris : 2 }] },
                    ]
                },
                {
                    "id": 10, "nama": "Mandi",
                    "detail": [
                        { "id": 1, "nama": "Tergantung orang lain ", "descNilai": "0" ,"detail": [{ id: 5190, baris : 1 }, { id: 5191, baris : 2 }]},
                        { "id": 2, "nama": "Mandiri", "descNilai": "1" ,"detail": [{ id: 5192, baris : 1 }, { id: 5193, baris : 2 }]},
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
             medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 149).then(function (e) {

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
                    if (element.kodeexternal == 'shiftjaga2') {
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
            })
            var chekedd = false
            $scope.totalSkorAses =0
            $scope.totalSkorAses2 =0
            $scope.totalSkor2=0

            medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + nomorEMR + "&emrfk=" + $scope.cc.emrfk, true).then(function (dat) {
                $scope.item.obj = []
                $scope.item.obj2 = []
                dataLoad = dat.data.data
                for (var i = 0; i <= dataLoad.length - 1; i++) {
                    if (parseFloat($scope.cc.emrfk) == dataLoad[i].emrfk) {

                        if (dataLoad[i].type == "textbox") {
                            $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                                if (dataLoad[i].emrdfk ==  '15086')
                                $scope.totalSkorAses =parseFloat( dataLoad[i].value)
                                if (dataLoad[i].emrdfk=='5194') 
                            $scope.totalSkorAses2 =parseFloat( dataLoad[i].value)
                        if (dataLoad[i].emrdfk=='16733') 
                            $scope.totalSkor2 =parseFloat( dataLoad[i].value)
                        
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
                            // if (dataLoad[i].emrdfk >= 5053 && dataLoad[i].emrdfk <= 5084 && dataLoad[i].reportdisplay != null) {
                            //     var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                            //     $scope.getSkor2(datass)
                            // }
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
            $scope.$watch('item.obj[5041]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai == 0) {
                    $scope.item.obj[5042] = true
                    $scope.item.obj[5043] = false
                    $scope.item.obj[5044] = false
                    $scope.item.obj[5045] = false
                }
                if (nilai >= 1 && nilai <= 3) {
                    $scope.item.obj[5042] = false
                    $scope.item.obj[5043] = true
                    $scope.item.obj[5044] = false
                    $scope.item.obj[5045] = false
                }
                if (nilai >= 4 && nilai <= 6) {
                    $scope.item.obj[5042] = false
                    $scope.item.obj[5043] = false
                    $scope.item.obj[5044] = true
                    $scope.item.obj[5045] = false
                }
                if (nilai >= 7 && nilai <= 10) {
                    $scope.item.obj[5042] = false
                    $scope.item.obj[5043] = false
                    $scope.item.obj[5044] = false
                    $scope.item.obj[5045] = true
                }
            });

            $scope.getSkalaNyeri = function (data, stat) {
                $scope.activeStatus = stat.descNilai
                var nilai = stat.descNilai
                if (nilai >= 0 && nilai <= 1) {
                    $scope.item.obj[5046] = true
                    $scope.item.obj[5047] = false
                    $scope.item.obj[5048] = false
                    $scope.item.obj[5049] = false
                    $scope.item.obj[5050] = false
                    $scope.item.obj[5051] = false
                }
                if (nilai >= 2 && nilai <= 3) {
                    $scope.item.obj[5046] = false
                    $scope.item.obj[5047] = true
                    $scope.item.obj[5048] = false
                    $scope.item.obj[5049] = false
                    $scope.item.obj[5050] = false
                    $scope.item.obj[5051] = false
                }
                if (nilai >= 4 && nilai <= 5) {
                    $scope.item.obj[5046] = false
                    $scope.item.obj[5047] = false
                    $scope.item.obj[5048] = true
                    $scope.item.obj[5049] = false
                    $scope.item.obj[5050] = false
                    $scope.item.obj[5051] = false
                }
                if (nilai >= 6 && nilai <= 7) {
                    $scope.item.obj[5046] = false
                    $scope.item.obj[5047] = false
                    $scope.item.obj[5048] = false
                    $scope.item.obj[5049] = true
                    $scope.item.obj[5050] = false
                    $scope.item.obj[5051] = false
                }
                if (nilai >= 8 && nilai <= 9) {
                    $scope.item.obj[5046] = false
                    $scope.item.obj[5047] = false
                    $scope.item.obj[5048] = false
                    $scope.item.obj[5049] = false
                    $scope.item.obj[5050] = true
                    $scope.item.obj[5051] = false
                }

                if (nilai == 10) {
                    $scope.item.obj[5046] = false
                    $scope.item.obj[5047] = false
                    $scope.item.obj[5048] = false
                    $scope.item.obj[5049] = false
                    $scope.item.obj[5050] = false
                    $scope.item.obj[5051] = true
                }

            }
            $scope.getSkor = function (stat) {

                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if (arrobj[i] == stat.id) {
                        if ($scope.item.obj[parseFloat(arrobj[i])] == true) {
                            $scope.totalSkor = $scope.totalSkor + parseFloat(stat.descNilai)
                            break
                        } else {
                            $scope.totalSkor = $scope.totalSkor - parseFloat(stat.descNilai)
                            break
                        }


                    } else {

                    }
                }
                $scope.item.obj[3152] = $scope.totalSkor + $scope.totalSkor2
                setSkorAkhir($scope.item.obj[3152])
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
                $scope.item.obj[16733] = $scope.totalSkor2
                // setSkorAkhir($scope.item.obj[3152])
            }
            // $scope.totalSkorAses =0
            // $scope.getSkorAsesmen = function(stat,skor){
            //     var arrobj = Object.keys($scope.item.obj)
            //     var arrSave = []
            //     for (var i = arrobj.length - 1; i >= 0; i--) {
            //         if (arrobj[i] == stat.id) {
            //             if ($scope.item.obj[parseFloat(arrobj[i])] == true) {
            //                 $scope.totalSkorAses = $scope.totalSkorAses + parseFloat(skor.descNilai)
            //                 break
            //             } else {
            //                 $scope.totalSkorAses = $scope.totalSkorAses - parseFloat(skor.descNilai)
            //                 break
            //             }
            //         } else {

            //         }
            //     }
            //     $scope.item.obj[5194] = $scope.totalSkorAses 
            // }
             $scope.getSkorAsesmen = function(stat,skor){
                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if (arrobj[i] == stat.id) {
                        if ($scope.item.obj[parseFloat(arrobj[i])] == true) {
                            if (stat.baris == 1) {
                                $scope.totalSkorAses = $scope.totalSkorAses + parseFloat(skor.descNilai)

                            }
                            if (stat.baris == 2) {
                                $scope.totalSkorAses2 = $scope.totalSkorAses2 + parseFloat(skor.descNilai)

                            }
                            break
                        }
                        if ($scope.item.obj[parseFloat(arrobj[i])] == false) {
                            if (stat.baris == 1) {
                                $scope.totalSkorAses = $scope.totalSkorAses - parseFloat(skor.descNilai)

                            }
                            if (stat.baris == 2) {
                                $scope.totalSkorAses2 = $scope.totalSkorAses2 - parseFloat(skor.descNilai)

                            }
                            break
                        }
                    } else {

                    }
                }
                $scope.item.obj[15086] = $scope.totalSkorAses 
                $scope.item.obj[5194] = $scope.totalSkorAses2 
            }   
            $scope.skorNutrisi = 0
            $scope.getSkorNutrisi = function (stat) {
                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if (arrobj[i] == stat.id) {
                        if ($scope.item.obj[parseFloat(arrobj[i])] == true) {
                            $scope.skorNutrisi = $scope.skorNutrisi + parseFloat(stat.descNilai)
                            break
                        } else {
                            $scope.skorNutrisi = $scope.skorNutrisi - parseFloat(stat.descNilai)
                            break
                        }
                    } else {
                    }
                }
                $scope.item.obj[5094] = $scope.skorNutrisi
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
                    arrSave.push({ id: arrobj[i], values: $scope.item.obj[parseInt(arrobj[i])] })
                }
                $scope.cc.jenisemr = 'asesmen'
                var jsonSave = {
                    head: $scope.cc,
                    data: arrSave
                }
                medifirstService.post('emr/save-emr-dinamis', jsonSave).then(function (e) {
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,
                    'Pra anestesi 2'+ ' dengan No EMR - ' + e.data.data.noemr + ' pada No Registrasi '
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