define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AsesmenAwalKeperawatanRJCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 196
            var dataLoad = []
            var pegawaiInputDetail= ''
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
             })
            $scope.listHendaya=[]
            $scope.listTandaVital=[]
            $scope.listADL=[]
            $scope.listAntro=[]
            $scope.listKeadaanUmum=[]
            $scope.listRiwasadasdyatKesehatan=[]
            $scope.listKonsepDiri=[]
            medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 196).then(function (e) {

                var datas = e.data.kolom4
                var arrayShiftJaga= []
                var detail = []
                

                var sama = false
                for (let i = 0; i < datas.length; i++) {
                    const element = datas[i];
                    sama = false
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
                
                    if (element.kodeexternal == 'hendaya') {
                        $scope.listHendaya.push(element)
                    }
                    if (element.kodeexternal == 'tandavital') {
                        $scope.listTandaVital.push(element)
                    }
                    if (element.kodeexternal == 'ADL') {
                        $scope.listADL.push(element)
                    }
                    if (element.kodeexternal == 'antro') {
                        $scope.listAntro.push(element)
                    }
                    if (element.kodeexternal == 'keadaanUmum') {
                        $scope.listKeadaanUmum.push(element)
                    }
                    if (element.kodeexternal == 'riwayatKesehatan') {
                        $scope.listRiwayatKdasdasesehatan.push(element)
                    }
                    if (element.kodeexternal == 'konsepdiri') {
                        $scope.listKonsepDiri.push(element)
                    }
                    
                    }
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
            // $scope.listHendaya = [
            //     { id: 5006, nama: 'Tuna Rungu' },
            //     { id: 5007, nama: 'Tuna Wicara' },
            //     { id: 5008, nama: 'Tuna Netra' },
            //     { id: 5009, nama: 'Lainnya :' }
            // ]
            // $scope.listADL = [
            //     { id: 5011, nama: 'Mandiri' },
            //     { id: 5012, nama: 'Perlu Bantuan' },
            //     { id: 5013, nama: 'Bantuan Total' },

            // ]
            // $scope.listKeluhanFisik = [
            //     { id: 5014, nama: 'Tidak Ada' },
            //     { id: 5015, nama: 'Ada, jelaskan :' },
            // ]

            $scope.listRiwayatKesehatan = [
                {
                    "id": 1, "nama": "Pernah Mengalami Gangguan Jiwa",
                    "detail": [
                        { "id": 14139, "nama": "Tidak", "type": "checkbox" },
                        { "id": 14140, "nama": "Ya, Jelaskan", "type": "checkbox" },
                        { "id": 14141, "nama": "", "type": "textbox" },
                        { "id": 102032, "nama": "Tidak Tahu", "type": "checkbox" },
                    ]
                },
                {
                    "id": 2, "nama": "Jika Ya, pengobatan sebelumnya ?",
                    "detail": [
                        { "id": 14142, "nama": "Berhasil", "type": "checkbox" },
                        { "id": 14143, "nama": "Kurang Berhasil", "type": "checkbox" },
                        { "id": 14144, "nama": "Tidak Berhasil", "type": "checkbox" },
                        { "id": 102033, "nama": "Tidak Tahu", "type": "checkbox" },

                    ]
                },
                {
                    "id": 3, "nama": "Riwayat Merokok",
                    "detail": [
                        { "id": 14145, "nama": "Tidak", "type": "checkbox" },
                        { "id": 14146, "nama": "Ya", "type": "checkbox" },
                        { "id": 102034, "nama": "Tidak Tahu", "type": "checkbox" },
                    ]
                },
                {
                    "id": 4, "nama": "Aniaya",
                    "detail": [
                        { "id": 14147, "nama": "Fisik", "type": "checkbox" },
                        { "id": 14148, "nama": "Sexual", "type": "checkbox" },
                        { "id": 14149, "nama": "Penolakan", "type": "checkbox" },
                        { "id": 14150, "nama": "KDRT", "type": "checkbox" },
                        { "id": 14151, "nama": "Kriminal", "type": "checkbox" },
                        { "id": 102028, "nama": "Tidak ada", "type": "checkbox" },
                        { "id": 102029, "nama": "Tidak Tahu", "type": "checkbox" },
                    ]
                },
                
                {
                    "id": 5, "nama": "Riwayat Alergi",
                    "detail": [
                        { "id": 14152, "nama": "Tidak", "type": "checkbox" },
                        { "id": 14153, "nama": "Ada , jelaskan :", "type": "checkbox" },
                        { "id": 14154, "nama": "Ada , jelaskan :", "type": "textbox" },
                        { "id": 102030, "nama": "Tidak Tahu", "type": "checkbox" },
                    ]
                },
                {
                    "id": 6, "nama": "Keluhan Nyeri ",
                    "detail": [
                        { "id": 14155, "nama": "Tidak Ada", "type": "checkbox" },
                        { "id": 14156, "nama": "Ada , lokasi :", "type": "checkbox" },
                        { "id": 14157, "nama": "Ada , jelaskan :", "type": "textbox" },
                        { "id": 102031, "nama": "Tidak Tahu", "type": "checkbox" },
                    ]
                },
            ]
            $scope.listSkorNRC = [{
                "id": 8, "nama": "Score ",
                "detail": [
                    { "id": 14158, "nama": "0", "type": "checkbox", "ket": "= Tidak Nyeri" },
                    { "id": 14159, "nama": "1 - 3", "type": "checkbox", "ket": "= Nyeri Ringan" },
                    { "id": 14160, "nama": "4 - 6", "type": "checkbox", "ket": "= Nyeri Sedang" },
                    { "id": 14161, "nama": "7 - 10", "type": "checkbox", "ket": "= Nyeri Berat" },
                ]
            }]
            $scope.listSkorWong = [{
                "id": 9, "nama": "Score ",
                "detail": [
                    { "id": 14162, "nama": "0 - 1", "type": "checkbox", "ket": "= Tidak Ada Nyeri" },
                    { "id": 14163, "nama": "2 - 3", "type": "checkbox", "ket": "= Sedikit Nyeri" },
                    { "id": 14164, "nama": "4 - 5", "type": "checkbox", "ket": "= Cukup Nyeri" },
                    { "id": 14165, "nama": "6 - 7", "type": "checkbox", "ket": "= Lumayan Nyeri" },
                    { "id": 14166, "nama": "8 - 9", "type": "checkbox", "ket": "= Sangat Nyeri" },
                    { "id": 14167, "nama": "10", "type": "checkbox", "ket": "= Amat Sangat Nyeri" },
                ]
            }]
            $scope.listNyeriAnak = [
                {
                    "id": 10, "nama": "Hurts", "detail": [
                    { "id": 14168, "nama": "No Hurt", "descNilai": 0 },
                    { "id": 14169, "nama": "Hurts Little Bit", "descNilai": 2 },
                    { "id": 14170, "nama": "Hurts Little More", "descNilai": 4 },
                    { "id": 14171, "nama": "Hurts Even More", "descNilai": 6 }, 
                    { "id": 14172, "nama": "Hurts Whole Lot", "descNilai": 8 },
                    { "id": 14173, "nama": "Hurts whorts", "descNilai": 10 }]
                }
            ]

             $scope.listEdmon1 = [
                {
                    "id": 1, "nama": "USIA",
                    "detail": [
                        { "id": 14191, "nama": "< 50 Tahun", "descNilai": "8" },
                        { "id": 14192, "nama": "50-79 Tahun", "descNilai": "10" },
                        { "id": 14193, "nama": ">= 80 Tahum", "descNilai": "26" },

                    ]
                },
                {
                    "id": 2, "nama": "STATUS MENTAL",
                    "detail": [
                        { "id": 14194, "nama": "Sadar penuh/Orientasi baik sepanjang waktu", "descNilai": "4" },
                        { "id": 14195, "nama": "Agitasi / Cemas", "descNilai": "12" },
                        { "id": 14196, "nama": "Keadaan bingung", "descNilai": "13" },
                        { "id": 14197, "nama": "Bingung / Disoreintasi", "descNilai": "14" },

                    ]
                },
                {
                    "id": 3, "nama": "ELIMINASI",
                    "detail": [
                        { "id": 14198, "nama": "Mandiri mampu mengontrol rectum dan vesica urinaria", "descNilai": "8" },
                        { "id": 14199, "nama": "Kateter / ostomi", "descNilai": "12" },
                        { "id": 14200, "nama": "Eliminasi dengan bantuan", "descNilai": "10" },
                        { "id": 14201, "nama": "Gangguan eliminasi (Inkontinensia, nocturna,Frekuensi)", "descNilai": "12" },
                        { "id": 14202, "nama": "inkontinensia tapi mampu bergerak mandiri", "descNilai": "12" },

                    ]
                },
                {
                    "id": 4, "nama": "OBAT",
                    "detail": [
                        { "id": 14203, "nama": "Tanpa obat", "descNilai": "10" },
                        { "id": 14204, "nama": "Obat Jantung", "descNilai": "10" },
                        { "id": 14205, "nama": "Obat psikotropik (termasuk benzodiazepine Anti depresan)", "descNilai": "8" },
                        { "id": 14206, "nama": "Mengalami peningkatan dosis obat tersebut dan/atau diberikan bilamana perlu, diterima dalam 24 jam terakhir", "descNilai": "12" },


                    ]
                },
                {
                    "id": 5, "nama": "DIAGNOSIS",
                    "detail": [
                        { "id": 14207, "nama": "Gangguan bipolar / Skizoaafektif", "descNilai": "10" },
                        { "id": 14208, "nama": "Gangguan penyalahgunaan zat/alkohol", "descNilai": "10" },
                        { "id": 14209, "nama": "Gangguan depresi mayor", "descNilai": "8" },
                        { "id": 14210, "nama": "Delirium / demensia", "descNilai": "12" },

                    ]
                },



            ]
        
            $scope.listEdmon2 = [

                {
                    "id": 6, "nama": "AMBULASI / KESEIMBANGAN",
                    "detail": [
                        { "id": 14211, "nama": "Mandiri / langkah mantap", "descNilai": "7" },
                        { "id": 14212, "nama": "Menggunakan alat bantu", "descNilai": "8" },
                        { "id": 14213, "nama": "Vertigo / hipotensi ortostatik / lemah", "descNilai": "10" },
                        { "id": 14214, "nama": "Langkah tidak mantap, membutuhkan Bantuan,sadar akan ketidakmampuannya", "descNilai": "8" },
                        { "id": 14215, "nama": "Langkah tidak mantap, namun tidak menyadari keterbatasannya", "descNilai": "15" },

                    ]
                },

                {
                    "id": 7, "nama": "NUTRISI",
                    "detail": [
                        { "id": 14216, "nama": "Asupan makanan dan cairan dalam 24 jam terakhir sangat sedikit", "descNilai": "12" },
                        { "id": 14217, "nama": "Tidak ada gangguan nafsu makan", "descNilai": "0" },

                    ]
                },

                {
                    "id": 8, "nama": "GANGGUAN TIDUR",
                    "detail": [
                        { "id": 14218, "nama": "Tidak ada gangguan tidur", "descNilai": "8" },
                        { "id": 14219, "nama": "Ada gangguan tidur yang dilaporkan oleh pasien, keluarga dan staf", "descNilai": "12" },

                    ]
                },

                {
                    "id": 9, "nama": "RIWAYAT JATUH",
                    "detail": [
                        { "id": 14220, "nama": "Tidak ada riwayat jatuh", "descNilai": "8" },
                        { "id": 14221, "nama": "Riwayat jatuh dalan 3 bulan terakhir", "descNilai": "14" },

                    ]
                },

            ]
            $scope.listNutrisi = [

                {
                    "id": 1, "nama": "Penurunan Berat Badan yang tidak diinginkan dalam 6 bulan terakhir",
                    "detail": [
                        { "id": 14174, "nama": "a. Tidak ada penurunan berat badan", "descNilai": "0" },
                        { "id": 14175, "nama": "b. Tidak yakin / tidak tahu / terasa baju lebih longgar", "descNilai": "2" },
                        { "id": 14176, "nama": "c. Penurunan : > 1 - 5 kg", "descNilai": "1" },
                        { "id": 14177, "nama": "               > 6 - 10 kg", "descNilai": "2" },
                        { "id": 14178, "nama": "               > 11 - 15 kg", "descNilai": "3" },
                        { "id": 14179, "nama": "               > 15 kg", "descNilai": "4" },
                        { "id": 14180, "nama": "  Tidak tahu berapa penurunan berat badan", "descNilai": "2" },
                    ]
                },
                {
                    "id": 2, "nama": "Asupan Makan Berkurang karena tidak nafsu makan",
                    "detail": [
                        { "id": 14181, "nama": "a. Tidak", "descNilai": "0" },
                        { "id": 14182, "nama": "b. Ya", "descNilai": "1" }
                    ]
                },

            ]
            $scope.listPasienDiagKhusus = [{
                "id": 1, "nama": "Pasien dengan diagnosa khusus :",
                "detail": [
                    { "id": 14185, "nama": "Tidak", "type": "checkbox" },
                    { "id": 14186, "nama": "Ya, sebutkan", "type": "checkbox" },
                    { "id": 14187, "nama": "", "type": "textbox" },
                ]
            },
            {
                "id": 2, "nama": "Dilaporkan ke Dokter Bila skor >= 2 dan atau pasien dengan diagnosis / kondisi khusus :",
                "detail": [
                    { "id": 14188, "nama": "Tidak", "type": "checkbox" },
                    { "id": 14189, "nama": "Ya, pukul", "type": "checkbox" },
                    { "id": 14190, "nama": "", "type": "textbox" },
                ]
            }
            ]
            $scope.listPsiko = [{
                "id": 1, "nama": "Status Emosi",
                "detail": [
                    { "id": 14226, "nama": "Kooperatif", "type": "checkbox" },
                    { "id": 14227, "nama": "Cemas", "type": "checkbox" },
                    { "id": 14228, "nama": "Depresi", "type": "checkbox" },
                ]
            },
            {
                "id": 2, "nama": "Status Pernikahan",
                "detail": [
                    { "id": 14229, "nama": "Menikah", "type": "checkbox" },
                    { "id": 14230, "nama": "Belum menikah ", "type": "checkbox" },
                    { "id": 14231, "nama": "Janda Duda", "type": "checkbox" },
                ]
            },
            {
                "id": 3, "nama": "Keluarga",
                "detail": [
                    { "id": 14232, "nama": "Tinggal Sendiri", "type": "checkbox" },
                    { "id": 14233, "nama": "Tinggal dengan keluarga ", "type": "checkbox" },

                ]
            },
            {
                "id": 4, "nama": "Penelantaran ",
                "detail": [
                    { "id": 14234, "nama": "Ya ", "type": "checkbox" },
                    { "id": 14235, "nama": "Tidak ", "type": "checkbox" },

                ]
            },
            {
                "id": 5, "nama": "Keluarga terdekat ",
                "detail": [
                    { "id": 14236, "nama": "Ayah/ Ibu", "type": "checkbox" },
                    { "id": 14237, "nama": "Adik / Kakak ", "type": "checkbox" },
                    { "id": 14238, "nama": "Lainnya", "type": "checkbox" },
                    { "id": 14239, "nama": "", "type": "textbox" },
                ]
            },
            {
                "id": 6, "nama": "Bahasa Sehari-hari ",
                "detail": [
                    { "id": 14240, "nama": "Indonesia", "type": "checkbox" },
                    { "id": 14241, "nama": "Jawa ", "type": "checkbox" },
                    { "id": 14242, "nama": "Lainnya ", "type": "checkbox" },
                    { "id": 14243, "nama": " ", "type": "textbox" },
                ]
            },
            // {
            //     "id": 6, "nama": "Bahasa Sehari-hari ",
            //     "detail": [
            //         { "id": 14240, "nama": "Indonesia", "type": "checkbox" },
            //         { "id": 14241, "nama": "Jawa ", "type": "checkbox" },
            //         { "id": 14242, "nama": "Lainnya ", "type": "checkbox" },
            //         { "id": 14243, "nama": " ", "type": "textbox" },
            //     ]
            // },
            {
                "id": 7, "nama": "Nilai dan Keyakinan ",
                "detail": [
                    { "id": 16841, "nama": "", "type": "textarea" },
                    
                ]
            },
            {
                "id": 8, "nama": "Kegiatan Ibadah ",
                "detail": [
                    { "id": 16842, "nama": "", "type": "textarea" },
                    
                ]
            },
            ]

            $scope.listSosial = [
            // {
            //     "id": 1, "nama": "Pendidikan",
            //     "detail": [
            //         { "id": 14244, "nama": "Tidak Sekolah", "type": "checkbox" },
            //         { "id": 14245, "nama": "SD", "type": "checkbox" },
            //         { "id": 14246, "nama": "SMP", "type": "checkbox" },
            //         { "id": 14247, "nama": "SLTA", "type": "checkbox" },
            //         { "id": 14248, "nama": "D1-S1", "type": "checkbox" },
                    
            //     ]
            // },
            // {
            //     "id": 2, "nama": "Pekerjaan",
            //     "detail": [
            //         { "id": 14321, "nama": "TNI", "type": "checkbox" },
            //         { "id": 14322, "nama": "PNS", "type": "checkbox" },
            //         { "id": 14323, "nama": "Swasta", "type": "checkbox" },
            //         { "id": 14324, "nama": "Tani", "type": "checkbox" },
            //         { "id": 14325, "nama": "Buruh", "type": "checkbox" },
            //         { "id": 14326, "nama": "Lainnya", "type": "textbox" },
            //     ]
            // },
            {
                "id": 1, "nama": "Sosial",
                "detail": [
                    { "id": 16833, "nama": "Ada yang Menunggu", "type": "checkbox" },
                    { "id": 16834, "nama": "Tidak", "type": "checkbox" },
                    { "id": 16835, "nama": "Ada", "type": "textbox" },
                    
                ]
            },
            {
                "id": 2, "nama": "Ekonomi",
                "detail": [
                    { "id": 16836, "nama": "Ada Yang Bertanggung Jawab", "type": "checkbox" },
                    { "id": 16837, "nama": "Tidak", "type": "checkbox" },
                    { "id": 16838, "nama": "Ada", "type": "textbox" },
                    
                ]
            },
            {
                "id": 2, "nama": "Kebutuhan Edukasi",
                "detail": [
                    
                    { "id": 16839, "nama": "Tidak", "type": "checkbox" },
                    { "id": 16840, "nama": "Ya, Sebutkan", "type": "textbox" },
                    
                ]
            },

            ]

            $scope.listBarthel = [
                {
                    "id": 1, "nama": "Mengendalikan Rangsang delekasi",
                    "detail": [
                        {
                            "id": 1, "nama": "Tidak terkendali tak teratur (perlu bantuan)", "descNilai": "0", "ket": 1,
                            "detail": [{ id: 14257, baris : 1 }, { id: 14258, baris : 2 }]
                        },
                        {
                            "id": 2, "nama": "Kadang-kadang tak terkendali", "descNilai": "1", "ket": 1,
                            "detail": [{ id: 14259, baris : 1 }, { id: 14260,baris : 2 }]
                        },
                        {
                            "id": 3, "nama": "Mandiri", "descNilai": "2", "ket": 1,
                            "detail": [{ id: 14261, baris : 1 }, { id: 14262, baris : 2 }]
                        },
                    ]
                },
                {
                    "id": 2, "nama": "Mengendalikan Rangsang berkemih",
                    "detail": [
                        { "id": 1, "nama": "Tak terkendali pakai kateter", "descNilai": "0" , 
                          "detail": [{ id: 14263 ,baris:1}, { id: 14264 , baris :2 }]},
                        { "id": 2, "nama": "Kadang-kadang tak terkendali (1x24 jam)", "descNilai": "1",   "detail": [{ id: 14265,baris : 1 }, { id: 14266,baris : 2 }] },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2" ,   "detail": [{ id: 14267,baris : 1 }, { id: 14268,baris : 2 }]},
                    ]
                },
                {
                    "id": 3, "nama": "Membersihkan diri ( cuci muka, sisir rambur, sikat gigi)",
                    "detail": [
                        { "id": 1, "nama": "Butuh pertolongan orang lain", "descNilai": "0" ,   "detail": [{ id: 14269,baris : 1 }, { id: 14270,baris : 2 }]},
                        { "id": 2, "nama": "Mandiri", "descNilai": "1" ,   "detail": [{ id: 14271,baris : 1 }, { id: 14272,baris : 2 }]},
                    ]
                },
                {
                    "id": 4, "nama": "Penggunaan jamban (masuk, keluar)",
                    "detail": [
                        { "id": 1, "nama": "Tergantung pertolongan orang lain", "descNilai": "0",   "detail": [{ id: 14273, baris : 1 }, { id: 14274, baris : 2 }] },
                        { "id": 2, "nama": "Perlu pertolongan beberapa kegiatan tetapi dapat mengerjakan sendiri pada kegiatan yang lain", "descNilai": "1" ,   
                        "detail": [{ id: 14275, baris : 1 }, { id: 14276, baris : 2 }]},
                        { "id": 3, "nama": "Mandiri", "descNilai": "2",   "detail": [{ id: 14277, baris : 1 }, { id: 14278, baris : 2 }] },
                    ]
                },
                {
                    "id": 5, "nama": "Makan",
                    "detail": [
                        { "id": 1, "nama": "Tidak mampu", "descNilai": "0", "detail": [{ id: 14279, baris : 1   }, { id: 14280, baris : 2 }]  },
                        { "id": 2, "nama": "Perlu ditolong  memotong makanan", "descNilai": "1","detail": [{ id: 14281,baris : 1 }, { id: 14282, baris : 2 }] },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2" ,"detail": [{ id: 14283, baris : 1 }, { id: 14284, baris: 2 }]},
                    ]
                },
                {
                    "id": 6, "nama": "Berubah sikap dari berbaring ke duduk",
                    "detail": [
                        { "id": 1, "nama": "Tidak Mampu", "descNilai": "0" ,"detail": [{ id: 14285, baris : 1 }, { id: 14286, baris : 2 }]},
                        { "id": 2, "nama": "Perlu banyak bantuan untuk bisa duduk (2 org)", "descNilai": "1" ,"detail": [{ id: 14287, baris : 1 }, { id: 14288, baris : 2 }]},
                        { "id": 3, "nama": "Bantuan minimal", "descNilai": "2","detail": [{ id: 15082, baris : 1 }, { id: 15083, baris : 2 }] },
                        { "id": 4, "nama": "Mandiri", "descNilai": "3","detail": [{ id: 14289, baris : 1 }, { id: 14290, baris : 2 }] },
                    ]
                },
                {
                    "id": 7, "nama": "Berpindah / berjalan",
                    "detail": [
                        { "id": 1, "nama": "Tidak mampu", "descNilai": "0","detail": [{ id: 14291, baris : 1 }, { id: 14292, baris : 2 }] },
                        { "id": 2, "nama": "Bisa (pindah) dengan kursi ", "descNilai": "1" ,"detail": [{ id: 14293, baris : 1 }, { id: 14294, baris : 2 }]},
                        { "id": 3, "nama": "Berjalan dengan bantuan 1 orang", "descNilai": "2" ,"detail": [{ id: 14295,baris : 1 }, { id: 14296,baris : 2 }]},
                        { "id": 4, "nama": "Mandiri", "descNilai": "3","detail": [{ id: 14297, baris : 1 }, { id: 14298, baris : 2 }] },
                    ]
                },
                {
                    "id": 8, "nama": "Memakai Baju",
                    "detail": [
                        { "id": 1, "nama": "Tergantung orang lain", "descNilai": "0" ,"detail": [{ id: 14299, baris : 1 }, { id: 14300, baris : 2 }]},
                        { "id": 2, "nama": "Sebagian dibantu (misal mengancingkan baju)", "descNilai": "1" ,"detail": [{ id: 14301, baris : 1 }, { id: 14302, baris : 2 }]},
                        { "id": 3, "nama": "Mandiri", "descNilai": "2" ,"detail": [{ id: 14303, baris : 1 }, { id: 14304, baris : 2 }]},

                    ]
                },
                {
                    "id": 9, "nama": "Naik turun tangga ",
                    "detail": [
                        { "id": 1, "nama": "Tidak Mampu", "descNilai": "0","detail": [{ id: 14305, baris : 1 }, { id: 14306, baris : 2 }] },
                        { "id": 2, "nama": "Butuh Pertolongan orang lain", "descNilai": "1","detail": [{ id: 14307, baris : 1 }, { id: 14308, baris : 2 }] },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2","detail": [{ id: 14309, baris : 1 }, { id: 14310,baris : 2 }] },
                    ]
                },
                {
                    "id": 10, "nama": "Mandi",
                    "detail": [
                        { "id": 1, "nama": "Tergantung orang lain ", "descNilai": "0" ,"detail": [{ id: 14311, baris : 1 }, { id: 14312, baris : 2 }]},
                        { "id": 2, "nama": "Mandiri", "descNilai": "1" ,"detail": [{ id: 14313,baris : 1 }, { id: 14314, baris : 2 }]},
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
   $scope.totalSkorAses =0
            $scope.totalSkorAses2 = 0
            medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + nomorEMR + "&emrfk=" + $scope.cc.emrfk, true).then(function (dat) {
                $scope.item.obj = []
                $scope.item.obj2 = []
                $scope.item.obj[14317]=$scope.now
                $scope.item.obj[14318]=$scope.now
                $scope.item.obj[79986]={ value: $scope.cc.iddpjp, text: $scope.cc.dokterdpjp }
                dataLoad = dat.data.data
                for (var i = 0; i <= dataLoad.length - 1; i++) {
                    if (parseFloat($scope.cc.emrfk) == dataLoad[i].emrfk) {

                        if (dataLoad[i].type == "textbox") {
                            $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                                if (dataLoad[i].emrdfk ==  '15084')
                                $scope.totalSkorAses =parseFloat( dataLoad[i].value)
                                if (dataLoad[i].emrdfk=='14256') 
                            $scope.totalSkorAses2 =parseFloat( dataLoad[i].value)
                          
                        }
                        if (dataLoad[i].type == "checkbox") {
                            chekedd = false
                            if (dataLoad[i].value == '1') {
                                chekedd = true
                            }
                            $scope.item.obj[dataLoad[i].emrdfk] = chekedd
                            // if (dataLoad[i].emrdfk >= 14162 && dataLoad[i].emrdfk <= 14167 && chekedd) {
                            //     $scope.getSkalaNyeri(1, { descNilai: dataLoad[i].reportdisplay })
                            // }
                            if (dataLoad[i].emrdfk >= 14191 && dataLoad[i].emrdfk <= 14221  && dataLoad[i].reportdisplay  != null) {
                                var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                                $scope.getSkor2(datass)
                            }
                            if (dataLoad[i].emrdfk >= 14174 && dataLoad[i].emrdfk <= 14182 && dataLoad[i].reportdisplay != null) {
                                var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                                $scope.getSkorNutrisi(datass)
                            }
                      
                            // if (dataLoad[i].kodeexternal == 'Bar' && dataLoad[i].reportdisplay != null) {
                            //     var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                            //     $scope.getSkorAsesmen(datass)
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
                        pegawaiInputDetail = dataLoad[i].pegawaifk
                    }

                }
                // if( $scope.cc.norec_emr !='-' && pegawaiInputDetail !='' && pegawaiInputDetail !=null){
                //     if(pegawaiInputDetail != medifirstService.getPegawaiLogin().id){
                //         $scope.allDisabled =true
                //         // toastr.warning('Hanya Bisa melihat data','Peringatan')
                //         // return
                //     }
                // }
            })

            $scope.$watch('item.obj[14224]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai < 90 ) {
                    $scope.item.obj[14222] = true
                    $scope.item.obj[14223] = false
                   
                }
                if (nilai >= 90) {
                    $scope.item.obj[14222] = false
                    $scope.item.obj[14223] = true
                 
                }
            })
            $scope.$watch('item.obj[14320]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai == 0) {
                    $scope.item.obj[14158] = true
                    $scope.item.obj[14159] = false
                    $scope.item.obj[14160] = false
                    $scope.item.obj[14161] = false
                }
                if (nilai >= 1 && nilai <= 3) {
                    $scope.item.obj[14158] = false
                    $scope.item.obj[14159] = true
                    $scope.item.obj[14160] = false
                    $scope.item.obj[14161] = false
                }
                if (nilai >= 4 && nilai <= 6) {
                    $scope.item.obj[14158] = false
                    $scope.item.obj[14159] = false
                    $scope.item.obj[14160] = true
                    $scope.item.obj[14161] = false
                }
                if (nilai >= 7 && nilai <= 10) {
                    $scope.item.obj[14158] = false
                    $scope.item.obj[14159] = false
                    $scope.item.obj[14160] = false
                    $scope.item.obj[14161] = true
                }
            });

            $scope.getSkalaNyeri = function (data, stat) {
                $scope.activeStatus = stat.descNilai
                var nilai = stat.descNilai
                if (nilai >= 0 && nilai <= 1) {
                    $scope.item.obj[14162] = true
                    $scope.item.obj[14163] = false
                    $scope.item.obj[14164] = false
                    $scope.item.obj[14165] = false
                    $scope.item.obj[14166] = false
                    $scope.item.obj[14167] = false
                }
                if (nilai >= 2 && nilai <= 3) {
                    $scope.item.obj[14162] = false
                    $scope.item.obj[14163] = true
                    $scope.item.obj[14164] = false
                    $scope.item.obj[14165] = false
                    $scope.item.obj[14166] = false
                    $scope.item.obj[14167] = false
                }
                if (nilai >= 4 && nilai <= 5) {
                    $scope.item.obj[14162] = false
                    $scope.item.obj[14163] = false
                    $scope.item.obj[14164] = true
                    $scope.item.obj[14165] = false
                    $scope.item.obj[14166] = false
                    $scope.item.obj[14167] = false
                }
                if (nilai >= 6 && nilai <= 7) {
                    $scope.item.obj[14162] = false
                    $scope.item.obj[14163] = false
                    $scope.item.obj[14164] = false
                    $scope.item.obj[14165] = true
                    $scope.item.obj[14166] = false
                    $scope.item.obj[14167] = false
                }
                if (nilai >= 8 && nilai <= 9) {
                    $scope.item.obj[14162] = false
                    $scope.item.obj[14163] = false
                    $scope.item.obj[14164] = false
                    $scope.item.obj[14165] = false
                    $scope.item.obj[14166] = true
                    $scope.item.obj[14167] = false
                }

                if (nilai == 10) {
                    $scope.item.obj[14162] = false
                    $scope.item.obj[14163] = false
                    $scope.item.obj[14164] = false
                    $scope.item.obj[14165] = false
                    $scope.item.obj[14166] = false
                    $scope.item.obj[14167] = true
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
                $scope.item.obj[15084] = $scope.totalSkorAses 
                $scope.item.obj[14256] = $scope.totalSkorAses2 
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
                $scope.item.obj[14224] = $scope.totalSkor + $scope.totalSkor2
                // setSkorAkhir($scope.item.obj[3152])
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
                $scope.item.obj[14225] = $scope.skorNutrisi
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
                //  if( $scope.cc.norec_emr !='-' && pegawaiInputDetail !='' && pegawaiInputDetail !=null){
                //     if(pegawaiInputDetail != medifirstService.getPegawaiLogin().id){
                //         toastr.warning('Hanya Bisa melihat data','Peringatan')
                //         return
                //     }
                // }
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
                    'Asesmen Awal Keperawatan Rawat Jalan ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
                    + $scope.cc.noregistrasi).then(function (res) {
                    })

                    $rootScope.loadRiwayat()
                    // var arrStr = {
                    //     0: e.data.data.noemr
                    // }
                    // cacheHelper.set('cacheNomorEMR', arrStr);
                });
            }

        }
    ]);
    initialize.directive('disableContents', function() {
        return {
            compile: function(tElem, tAttrs) {
                var inputs = tElem.find('input');
                var inputsArea = tElem.find('textarea');
                inputs.attr('ng-disabled', tAttrs['disableContents']);
                inputsArea.attr('ng-disabled', tAttrs['disableContents']);
                for (var i = 0; i < inputs.length; i++) {
                }
            }
        }
    });
});