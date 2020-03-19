define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AsesmenAwalKeperawatanPsikogeriatriCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.totalSkor4 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 226
            var dataLoad = []
     var pegawaiInputDetail =''
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
            })
            medifirstService.getPart('emr/get-datacombo-part-ruangan-pelayanan', true, true, 20).then(function (data) {
                $scope.listRuang = data
            
             })
             medifirstService.getPart('emr/get-datacombo-part-diagnosa', true, true, 20).then(function (data) {
                $scope.listDiagnosa = data
            })
             medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 226).then(function (e) {

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
                        { "id": 15028, "nama": "Normal", "type": "checkbox" },
                        { "id": 15029, "nama": "Gangguan Bicara Sejak                :", "type": "checkbox" },
                        { "id": 15030, "nama": "", "type": "textbox" },
                        
                    ]
                },
                {
                    "id": 2, "nama": "2. Bahasa Sehari-hari :",
                    "detail": [
                        { "id": 15031, "nama": "Lain-lain, sebutkan", "type": "checkbox" },
                        { "id": 15032, "nama": "Indonesia Pasif", "type": "checkbox" },
                        { "id": 15033, "nama": "Indonesia Aktif", "type": "checkbox" },
                        { "id": 15034, "nama": "Jawa", "type": "checkbox" },
                        { "id": 15035, "nama": "", "type": "textbox" },
                        
                        
                    ]
                },
                {
                    "id": 3, "nama": "3. Perlu Penerjemah :",
                    "detail": [
                        { "id": 15036, "nama": "Tidak", "type": "checkbox" },
                        { "id": 15037, "nama": "Ya, Bahasa :", "type": "checkbox" },
                        { "id": 15038, "nama": "", "type": "textbox" },
                        
                        
                    ]
                },
                {
                    "id": 4, "nama": "4.Bahasa Isyarat :",
                    "detail": [
                        { "id": 15039, "nama": "Tidak", "type": "checkbox" },
                        { "id": 15040, "nama": "Ya", "type": "checkbox"},
                        
                        
                    ]
                },
                {
                    "id": 5, "nama": "5.Cara Belajar Yang Disukai :",
                    "detail": [
                        { "id": 15041, "nama": "Menulis", "type": "checkbox" },
                        { "id": 15042, "nama": "Audio-visual/gambar", "type": "checkbox"},
                        { "id": 15043, "nama": "Diskusi", "type": "checkbox"},
                        { "id": 15044, "nama": "Simulasi", "type": "checkbox"},
                        
                        
                    ]
                },
                {
                    "id": 6, "nama": "6.Tingkat Pendidikan :",
                    "detail": [
                        { "id": 15045, "nama": "TDS", "type": "checkbox" },
                        { "id": 15046, "nama": "SD", "type": "checkbox"},
                        { "id": 15047, "nama": "SMP", "type": "checkbox"},
                        { "id": 15048, "nama": "SMA", "type": "checkbox"},
                        { "id": 15049, "nama": "D3/S1/S2", "type": "checkbox"},
                        { "id": 15050, "nama": "Lain-lain", "type": "checkbox"},
                        
                        
                    ]
                },
                {
                    "id": 7, "nama": "7.Hambatan Belajar:",
                    "detail": [
                        { "id": 15051, "nama": "Tidak Ada", "type": "checkbox" },
                        { "id": 15052, "nama": "Tidak ada pengkajian Ulang tgl", "type": "checkbox"},
                        { "id": 15053, "nama": "", "type": "datetime"},
                        { "id": 15054, "nama": "Ada, Yaitu", "type": "checkbox"},
                        { "id": 15055, "nama": "Takut/Gelisah", "type": "checkbox"},
                        { "id": 15056, "nama": "Tidak Tertarik", "type": "checkbox"},
                        { "id": 15057, "nama": "Nyeri/Tidak Nyaman", "type": "checkbox"},
                        { "id": 15058, "nama": "Buta Huruf", "type": "checkbox"},
                        { "id": 15059, "nama": "Gangguan kognitif", "type": "checkbox"},
                        { "id": 15060, "nama": "Lain-lain", "type": "textbox"},


                        
                        
                    ]
                },
                {
                    "id": 8, "nama": "8.Kemampuan belajar :",
                    "detail": [
                    { "id": 15061, "nama": "Mampu Menerima Indormasi pada pengkajian Ulang, tgl", "type": "checkbox2"},
                        { "id": 15062, "nama": "", "type": "datetime"},
                        { "id": 15063, "nama": "Mampu Menerima Indormasi", "type": "checkbox2" },
                        { "id": 15064, "nama": "Tidak mampu Menerima Indormasi", "type": "checkbox2"},
                  
                    ]
                },
                {
                    "id": 9, "nama": "9.Nilai dan Keyakinan :",
                },
                {
                    "id": 10, "nama": "a.Penyakit Merupakan :",
                    "detail": [
                        
                        { "id": 15065, "nama": "Ujian/Cobaan", "type": "checkbox2"},
                        { "id": 15066, "nama": "Kutukan", "type": "checkbox"},
                        { "id": 15067, "nama": "Lain-lain", "type": "textbox" },
                        
                  
                    ]
                },
                {
                    "id": 11, "nama": "b.Keputusan Memilih layanan Kesehatan:",
                    "detail": [
                        
                        { "id": 15068, "nama": "Sendiri", "type": "checkbox2"},
                        { "id": 15069, "nama": "Keluarga", "type": "checkbox"},
                        { "id": 15070, "nama": "Lain-lain", "type": "textbox" },
                        
                  
                    ]
                },
                {
                    "id": 12, "nama": "c.Keyakinan terhadap hasil terapi:",
                    "detail": [
                        
                        { "id": 15071, "nama": "pasrah", "type": "checkbox2"},
                        { "id": 15072, "nama": "Yakin", "type": "checkbox"},
                        { "id": 15073, "nama": "sembuh", "type": "checkbox" },
                        
                  
                    ]
                },
                {
                    "id": 13, "nama": "Jika",
                    "detail": [
                        
                        { "id": 15074, "nama": "Kontrol teratur", "type": "checkbox2"},
                        { "id": 15075, "nama": "Minum Obat teratur", "type": "checkbox"},
                        { "id": 15076, "nama": "Lain-lain", "type": "textbox" },
                        
                  
                    ]
                },
                {
                    "id": 13, "nama": "d. Askep keyakinan yang perlu dipertimbangkan selama masa Perawatan :",
                    "detail": [
                        
                        { "id": 15077, "nama": "Tidak", "type": "checkbox2"},
                        { "id": 15078, "nama": "Ada", "type": "checkbox"},
                        { "id": 15079, "nama": "Lain-lain", "type": "textbox" },
                        
                    
                    ]
                },
                {
                    "id": 14, "nama": "10. Kesediaan menerima informasi :",
                    "detail": [
                        
                        { "id": 15080, "nama": "Tidak", "type": "checkbox2"},
                        { "id": 15081, "nama": "Ada", "type": "checkbox"},
                        
                        
                  
                    ]
                },
            ]
            $scope.listNamaEdukasi = [
                {
                    "id": 15, "nama": "1. Postur tulang belakang lansia :",
                    "detail": [
                        { "id": 15439, "nama": "Tegap", "type": "checkbox" },
                        { "id": 15440, "nama": "Skoliosis", "type": "checkbox" },
                        { "id": 15441, "nama": "Lordosis", "type": "checkbox" },
                        { "id": 15442, "nama": "Kyposis", "type": "checkbox" },
                        
                    ]
                },
                {
                    "id": 16, "nama": "2. Pengukuran Fisik :",
                },
                
                
            ]
            $scope.listTandaVital = [
                {
                    "id": 17, "nama": "a. Tanda-tanda Vital",
                    "detail": [
                        { "id": 15443, "nama": "TD", "type": "textbox" },
                        { "id": 15444, "nama": "N", "type": "textbox" },
                        { "id": 15445, "nama": "R", "type": "textbox" },
                        { "id": 15446, "nama": "S", "type": "textbox" },
                    ]
                },
                {
                    "id": 18, "nama": "b. Antropometri",
                    "detail": [
                        { "id": 15447, "nama": "BB", "type": "textbox" },
                        { "id": 15448, "nama": "TB", "type": "textbox" },
                        
                    ]
                },
            ]
            $scope.listHeadToeto = [
                {
                    "id": 19, "nama": "3. Pengkajian Head To Toe",
                    "detail": [
                        { "id": 15451, "nama": "a. Kepala", "type": "textbox" },
                        { "id": 15452, "nama": "b. Mata", "type": "textbox" },
                        { "id": 15453, "nama": "c. Hidung", "type": "textbox" },
                        { "id": 15454, "nama": "d. Mulut dan Tenggorokan", "type": "textbox" },
                        { "id": 15455, "nama": "e. telinga", "type": "textbox" },
                        { "id": 15456, "nama": "f. Leher", "type": "textbox" },
                        { "id": 15457, "nama": "g. Dada", "type": "textbox" },
                        { "id": 15458, "nama": "h. Abdomen", "type": "textbox" },
                        { "id": 15459, "nama": "i. Genetalia", "type": "textbox" },
                        { "id": 15460, "nama": "j. Integumen", "type": "textbox" },
                        { "id": 15461, "nama": "k. Ekstremitas", "type": "textbox" },
                        { "id": 15450, "nama": "l. Kekuatan Otot", "type" : "textbox"},
                        { "id": 15464, "nama": "Lumpuh", "type" : "checkbox"},
                        { "id": 15465, "nama": "Ada Kontraksi", "type" : "checkbox"},
                        { "id": 15466, "nama": "Melawan Gravitasi dengan sokongan", "type" : "checkbox"},
                        { "id": 15467, "nama": "Melawan Gravitasi tanpa ada tahanan", "type" : "checkbox"},
                        { "id": 15468, "nama": "Melawan Gravitasi ada tahanan sedikit", "type" : "checkbox"},
                        { "id": 15463, "nama": "Melawan Gravitasi dengan kekuatan penuh", "type" : "checkbox"},    
                    ]
                },
            ]
            $scope.listRentangGerak = [{
                "id": 20, "nama": "m. Rentang gerak :",
                "detail": [
                    { "id": 15469, "nama": "maksimal ", "type": "checkbox" },

                    { "id": 15470, "nama": "Terbatas ", "type": "checkbox" },
                    
                ]

            }
            ]
            
             $scope.listDeformitas = [
             {
                "id": 20, "nama": "n. Deformitas :",
                "detail": [
                    { "id": 15471, "nama": "Ya, Jelaskan ", "type": "checkbox","descNilai": 1 },
                    { "id": 15473, "nama": "", "type": "textbox","descNilai": 2 },

                    { "id": 15472, "nama": "Tidak ", "type": "checkbox","descNilai": 3 },
                    

                    
                ]
                
            },
            {
                "id": 20, "nama": "o. Tremor :",
                "detail": [
                    { "id": 15474, "nama": "Ya, Jelaskan ", "type": "checkbox","descNilai": 1 },
                    { "id": 5203, "nama": "", "type": "textbox","descNilai": 2 },

                    { "id": 15475, "nama": "Tidak ", "type": "checkbox","descNilai": 3 },

                    
                ]
                
            },
            {
                "id": 20, "nama": "p. Penggunaan alat bantu :",
                "detail": [
                    { "id": 15476, "nama": "Ya, Jenis ", "type": "checkbox","descNilai": 1 },

                    { "id": 15477, "nama": "Tidak ", "type": "checkbox","descNilai": 3 },
                    { "id": 15478, "nama": "", "type": "textbox","descNilai": 2 },

                    
                ]
                
            },
            ]
             $scope.listSkoreEdmon = [{
                "id": 1, "nama": "Skore Edmonson:",
                "detail": [
                    { "id": 15479, "nama": "Tidak Risiko Jatuh Skor : < 90 ", "type": "checkbox" },

                    { "id": 15480, "nama": "Risiko Jatuh Skor : > 90", "type": "checkbox" },
                    
                ]
            }
            ]
            $scope.listlistPengkajianPsiko = [{
                "id": 1, "nama": "1. Konsep Diri :",
                "detail": [
                    { "id": 15481, "nama": "a. Citra tubuh ", "type": "textbox" },

                    { "id": 15482, "nama": "b. Identitas Diri ", "type": "textbox" },
                    { "id": 15483, "nama": "c. Peran ", "type": "textbox" },
                    { "id": 15484, "nama": "d. Ideal diri ", "type": "textbox" },
                    { "id": 15485, "nama": "e. Harga diri ", "type": "textbox" },
                    
                ]
            },
            {
                "id": 2 , "nama": "2.  Hubungan sosial :",
                "detail": [
                    { "id": 15486, "nama": "a. Orang yang Berarti ", "type": "textbox" },

                    { "id": 15487, "nama": "b. Peran Serta dalam kelompok / masyarakat ", "type": "textbox" },
                    { "id": 15488, "nama": "c. Hambatan dalam hubungan dengan orang lain ", "type": "textbox" },
                    
                ]
            },
            {
                "id": 3, "nama": "3. Spiritual :",
                "detail": [
                    { "id": 15492, "nama": "a.Nilai dan Keyakinan ", "type": "textbox" },

                    { "id": 15493, "nama": "b. Kegiatan ibadah ", "type": "textbox" },
                    //{ "id": 15494, "nama": "c. Hambatan dalam hubungan dengan orang lain ", "type": "textbox" },
                    
                ]
            },
            {
                "id": 4, "nama": "4. Tingakat Fungsi Intelektual :",
                "detail": [
                    { "id": 15495, "nama": "Fungsi Utuh", "type": "checkbox" },

                    { "id": 15496, "nama": "Kerusakan ringan", "type": "checkbox" },
                    { "id": 15497, "nama": "Kerusakan sedang ", "type": "checkbox" },
                    { "id": 15498, "nama": "Kerusakan berat ", "type": "checkbox" },
                    
                ]
            },
            ]
            $scope.listlistPPTK = [{
                "id": 1, "nama": "1. Kebiasaan merokok :",
                "detail": [
                    { "id": 15499, "nama": " > 3 batang ", "type": "checkbox" },

                    { "id": 15500, "nama": " < 3 batang ", "type": "checkbox" },
                    { "id": 15501, "nama": " Tidak merokok", "type": "checkbox" },
                    
                    
                ]
            },
            {
                "id": 2 , "nama": "2.  Kebiasaan minum alkohol :",
                "detail": [
                    { "id": 15502, "nama": " Tidak Pernah ", "type": "checkbox" },

                    { "id": 15503, "nama": " Sering ", "type": "checkbox" },
                    
                    
                ]
            },
            {
                "id": 3, "nama": "3. Minum Kopi :",
                "detail": [
                    { "id": 15504, "nama": " Tidak ", "type": "checkbox" },

                    { "id": 15505, "nama": " Ya, Berapa kali ", "type": "textbox" },
                    // { "id": 14882, "nama": "c. Hambatan dalam hubungan dengan orang lain ", "type": "textbox" },
                    
                ]
            },
            // {
            //     "id": 4, "nama": "4. Tingakat Fungsi Intelektual :",
            //     "detail": [
            //         { "id": 14880, "nama": "Fungsi Utuh", "type": "checkbox" },

            //         { "id": 14881, "nama": "Kerusakan ringan", "type": "checkbox" },
            //         { "id": 14882, "nama": "Kerusakan sedang ", "type": "checkbox" },
            //         { "id": 14882, "nama": "Kerusakan berat ", "type": "checkbox" },
                    
            //     ]
            // },
            ]
            
            $scope.listPengetahuan = [{
                "id": 5, "nama": "a. Apakah anda sudah mengetahui tentang makanan sehat ?",
                "detail": [
                    { "id": 15506, "nama": " Sudah Tahu dan Jelas", "type": "checkbox" },

                    { "id": 15507, "nama": " Kurang tahu", "type": "checkbox" },
                    { "id": 15508, "nama": " Belum tahu", "type": "checkbox" },
                    
                    
                ]
            },
            {
                "id": 6 , "nama": "b. Apakah anda sudah mengerti tentang penyakit yang anda derita ?",
                "detail": [
                    { "id": 15509, "nama": " Sudah Tahu dan Jelas", "type": "checkbox" },

                    { "id": 15510, "nama": " Kurang tahu", "type": "checkbox" },
                    { "id": 15511, "nama": " Belum tahu", "type": "checkbox" },
                    
                    
                ]
            },
            {
                "id": 7, "nama": "c. Apakah anda sudah mengetahui tentang pencegahan penyakit-penyakit pada usia lanjut:",
                "detail": [
                    { "id": 15512, "nama": " Sudah Tahu dan Jelas", "type": "checkbox" },

                    { "id": 15513, "nama": " Kurang tahu", "type": "checkbox" },
                    { "id": 15514, "nama": " Belum tahu", "type": "checkbox" },
                    
                ]
            },
            {
                "id": 8, "nama": "d. Apakah anda sudah Mengerti tentang latihan-latihan fisik untuk usia lanjut",
                "detail": [
                    { "id": 15515, "nama": " Sudah Tahu dan Jelas", "type": "checkbox" },

                    { "id": 15516, "nama": " Kurang tahu", "type": "checkbox" },
                    { "id": 15517, "nama": " Belum tahu", "type": "checkbox" },
                    
                ]
            },
            
            ]
            $scope.listpola = [{
                "id": 1, "nama": "a. Frekuensi Makan :",
                "detail": [
                    { "id": 15518, "nama": " 1 Kali Sehari ", "type": "checkbox" },

                    { "id": 15519, "nama": " 2 Kali Sehari ", "type": "checkbox" },
                    { "id": 15520, "nama": " 3 Kali Sehari", "type": "checkbox" },
                    { "id": 15521, "nama": " TTidak Teratur ", "type": "checkbox" },
                    
                    
                ]
            },
            {
                "id": 2 , "nama": "b.  Jumlah makanan yang dihabiskan :",
                "detail": [
                    { "id": 15522, "nama": " 1 porsi", "type": "checkbox" },

                    { "id": 15523, "nama": " 1/2 porsi", "type": "checkbox" },
                    { "id": 15524, "nama": " <1/2 porsi", "type": "checkbox" },
                    { "id": 15525, "nama": " Lain-lain", "type": "checkbox" },
                    
                    
                ]
            },
            {
                "id": 2 , "nama": "c. Makanan Tambahan:",
                "detail": [
                    { "id": 15526, "nama": " Dihabiskan", "type": "checkbox" },

                    { "id": 15527, "nama": " Tidak Dihabiskan", "type": "checkbox" },
                    { "id": 15528, "nama": " Kadang-kadang dihabiskan", "type": "checkbox" },
                    
                    
                    
                ]
            },
            
            ]
            $scope.listpolaMinum = [{
                "id": 1, "nama": "a. Frekuensi Minum :",
                "detail": [
                    { "id": 15529, "nama": " 3 gelas Sehari ", "type": "checkbox" },

                    { "id": 15530, "nama": " <3 gelas Sehari ", "type": "checkbox" },
                    
                    
                    
                ]
            },
            {
                "id": 2 , "nama": "b.  Jika jawaban <3 gelas :",
                "detail": [
                    { "id": 15531, "nama": " Takut kencing malam hari", "type": "checkbox" },

                    { "id": 15532, "nama": " Persediaan minum terbatas", "type": "checkbox" },
                    { "id": 15533, "nama": " Tidak haus", "type": "checkbox" },
                    { "id": 15534, "nama": " Kebiasaan minum sedikit", "type": "checkbox" },
                    
                    
                ]
            },
            {
                "id": 2 , "nama": "c. Jenis Minuman:",
                "detail": [
                    { "id": 15535, "nama": " Air putih", "type": "checkbox" },

                    { "id": 15536, "nama": " Teh", "type": "checkbox" },
                    { "id": 15537, "nama": " Susu", "type": "checkbox" },
                    { "id": 15538, "nama": " kopi", "type": "checkbox" },
                    { "id": 15539, "nama": " Lainnya", "type": "textbox" },
                    
                    
                    
                ]
            },
            
            ]
            $scope.listpolaTidur = [{
                "id": 1, "nama": "a. Jumlah waktu tidur :",
                "detail": [
                    { "id": 15540, "nama": " <4 jam ", "type": "checkbox" },

                    { "id": 15541, "nama": " <4-6 jam ", "type": "checkbox" },
                    { "id": 15542, "nama": " >6 jam ", "type": "checkbox" },
                    
                    
                    
                ]
            },
            {
                "id": 2 , "nama": "b.  Gangguan tidur serupa :",
                "detail": [
                    { "id": 15543, "nama": " Insomnia", "type": "checkbox" },

                    { "id": 15544, "nama": " Sering terbangun", "type": "checkbox" },
                    { "id": 15545, "nama": " Sulit mengawali", "type": "checkbox" },
                    { "id": 15546, "nama": " Tidak ada gangguan", "type": "checkbox" },
                    
                    
                ]
            },
            {
                "id": 2 , "nama": "c. Penggunaan waktu luang ketika tidak tidur:",
                "detail": [
                    { "id": 15547, "nama": " Santai", "type": "checkbox" },

                    { "id": 15548, "nama": "  Diam saja", "type": "checkbox" },
                    { "id": 15549, "nama": " Ketrampilan", "type": "checkbox" },
                    { "id": 15550, "nama": " kegiatan keagamaan", "type": "checkbox" },
                    
                    
                    
                    
                ]
            },
            
            ]
            $scope.listpolaBab = [{
                "id": 1, "nama": "a. Frekuensi BAB :",
                "detail": [
                    { "id": 15551, "nama": " 1 kali sehari ", "type": "checkbox" },

                    { "id": 15552, "nama": " 2 kali sehari ", "type": "checkbox" },
                    { "id": 15553, "nama": " lainya ", "type": "checkbox" },
                    
                    
                    
                ]
            },
            {
                "id": 2 , "nama": "b.  Konsistensi :",
                "detail": [
                

                    { "id": 15554, "nama": " Encer", "type": "checkbox" },
                    { "id": 15555, "nama": " Keras", "type": "checkbox" },
                    { "id": 15556, "nama": " Lembek", "type": "checkbox" },
                    
                    
                ]
            },
            {
                "id": 2 , "nama": "c. Gangguan BAB:",
                "detail": [
                    { "id": 15557, "nama": " Inkontinesia alvi", "type": "checkbox" },

                    { "id": 15558, "nama": " Konstipasi", "type": "checkbox" },
                    { "id": 15559, "nama": " Diare", "type": "checkbox" },
                    { "id": 15560, "nama": " Tidak ada", "type": "checkbox" },
                    
                    
                    
                    
                ]
            },
            
            ]
             $scope.listpolaBak = [{
                "id": 1, "nama": "a. Frekuensi BAK :",
                "detail": [
                    { "id": 15560, "nama": " 1-3 kali sehari ", "type": "checkbox" },

                    { "id": 15561, "nama": " 4-6 kali sehari ", "type": "checkbox" },
                    { "id": 15562, "nama": " > 6 Sehari ", "type": "checkbox" },
                    
                    
                    
                ]
            },
            {
                "id": 2 , "nama": "b. Warna Urine :",
                "detail": [
                

                    { "id": 15563, "nama": " Putih jernih", "type": "checkbox" },
                    { "id": 15564, "nama": " Kuning jernih", "type": "checkbox" },
                    { "id": 15565, "nama": " kuning keruh", "type": "checkbox" },
                    
                    
                ]
            },
            {
                "id": 2 , "nama": "c. Gangguan BAK:",
                "detail": [
                    { "id": 15566, "nama": " Inkontinesia", "type": "checkbox" },

                    { "id": 15567, "nama": " Urine Retensi", "type": "checkbox" },
                    { "id": 15568, "nama": " Tidak ada", "type": "checkbox" },
                    
                    
                    
                    
                ]
            },
            
            ]
            $scope.listpolaAktifitas = [{
                "id": 1, "nama": "a. Frekuensi BAK :",
                "detail": [
                    { "id": 15569, "nama": " Membantu Kegiatan dapur    ", "type": "checkbox" },

                    { "id": 15570, "nama": " Berkebun", "type": "checkbox" },
                    { "id": 15571, "nama": " Ketrampilan  tangan ", "type": "checkbox" },
                    { "id": 15572, "nama": " Pekerjaan rumah tangga ", "type": "checkbox" },
                    
                    
                    
                ]
            },
            
            
            ]
            $scope.listpolaPemenuhan = [{
                "id": 1, "nama": "a. Mandi :",
                "detail": [
                    { "id": 15573, "nama": " 1 kali sehari ", "type": "checkbox" },

                    { "id": 15574, "nama": " 2 kali sehari ", "type": "checkbox" },
                    { "id": 15575, "nama": " 3 kali Sehari ", "type": "checkbox" },
                    { "id": 15576, "nama": " <1 kali Sehari ", "type": "checkbox" },
                    
                    
                    
                ]
            },
            {
                "id": 2 , "nama": "b. Kebiasaan berganti pakaian bersih :",
                "detail": [
                

                    { "id": 15577, "nama": " 1 kali sehari", "type": "checkbox" },
                    { "id": 15578, "nama": " > 1 kali sehari", "type": "checkbox" },
                    { "id": 15579, "nama": " Tidak ganti", "type": "checkbox" },
                    
                    
                ]
            },
            
            ]
            $scope.listStatusFungsional = [{
                "id": 1, "nama": "F. Status fungsional :",
                "detail": [
                    { "id": 15580, "nama": " Mandiri ", "type": "checkbox" },

                    { "id": 15581, "nama": " Perlu bantuan, sebutkan", "type": "textbox" },
                    { "id": 15582, "nama": " Ketergantungan total, dilaporkan ke dokter pk ", "type": "textbox" },
                    
                    
                    
                    
                ]
            },
            
            ]
            $scope.listStatusMental = [{
                "id": 1, "nama": "1. Penampilan :",
                "detail": [
                    { "id": 15583, "nama": " Tidak rapi ", "type": "checkbox" },

                    { "id": 15584, "nama": " Penggunaan Pakaian tidak sesuai", "type": "checkbox" },
                    { "id": 15585, "nama": " cara berpakaian tidak seperti biasanya ", "type": "checkbox" },
                    
                    
                    
                    
                ]
            },
            {
                "id": 2, "nama": "2. Pembicaraan :",
                "detail": [
                    { "id": 15586, "nama": " Cepat ", "type": "checkbox" },

                    { "id": 15587, "nama": " Keras", "type": "checkbox" },
                    { "id": 15588, "nama": " Gagap ", "type": "checkbox" },
                    { "id": 15589, "nama": " Inkoheren ", "type": "checkbox" },

                    { "id": 15590, "nama": " Apatis", "type": "checkbox" },
                    { "id": 15591, "nama": " Lambat ", "type": "checkbox" },
                    { "id": 15592, "nama": " Membisu ", "type": "checkbox" },

                    { "id": 15593, "nama": " Tidak mampu memulai Pembicaraan", "type": "checkbox" },
                    
                    
                    
                    
                    
                ]
            },
            {
                "id": 3, "nama": "3. Aktifitas motorik :",
                "detail": [
                    { "id": 15594, "nama": " Lesu ", "type": "checkbox" },

                    { "id": 15595, "nama": " Tegang", "type": "checkbox" },
                    { "id": 15596, "nama": " Gelisah", "type": "checkbox" },
                    { "id": 15597, "nama": " Agitasi ", "type": "checkbox" },

                    { "id": 15598, "nama": " Tik", "type": "checkbox" },
                    { "id": 15599, "nama": " Grimasen ", "type": "checkbox" },
                    { "id": 15600, "nama": " Tremor ", "type": "checkbox" },

                    { "id": 15601, "nama": " Kompulsif", "type": "checkbox" },
                    
                    
                    
                    
                    
                ]
            },
            {
                "id": 4, "nama": "4. Alam perasaan :",
                "detail": [
                    { "id": 15602, "nama": " Sedih ", "type": "checkbox" },

                    { "id": 15603, "nama": " Ketakutan", "type": "checkbox" },
                    { "id": 15604, "nama": " Putus Asa", "type": "checkbox" },
                    { "id": 15605, "nama": " Khawatir ", "type": "checkbox" },

                    { "id": 15606, "nama": " Gembira berlebihan", "type": "checkbox" },
                    
                    
                    
                    
                    
                    
                ]
            },
            {
                "id": 5, "nama": "5. Afek :",
                "detail": [
                    { "id": 15607, "nama": " Datar ", "type": "checkbox" },

                    { "id": 15608, "nama": " Tumpul", "type": "checkbox" },
                    { "id": 15609, "nama": " Labil", "type": "checkbox" },
                    { "id": 15610, "nama": " Tidak sesuai", "type": "checkbox" },

                ]
            },
            {
                "id": 6, "nama": "6. Interaksi selama wawancara :",
                "detail": [
                    { "id": 15611, "nama": " Bermusuhan ", "type": "checkbox" },

                    { "id": 15612, "nama": " Tidak Kooperatif", "type": "checkbox" },
                    { "id": 15613, "nama": " Mudah Tersinggung", "type": "checkbox" },
                    { "id": 15614, "nama": " Kontak mata kurang", "type": "checkbox" },
                    { "id": 15615, "nama": " Defensif", "type": "checkbox" },
                    { "id": 15616, "nama": " Curiga", "type": "checkbox" },

                ]
            },
            


            
            ]
            $scope.listPersepsi = [{
                "id": 1, "nama": "Halusinasi :",
                "detail": [
                    { "id": 15617, "nama": " ada ", "type": "checkbox" },

                    { "id": 15618, "nama": " Tidak, sebutkan", "type": "checkbox" },
                    
                ]
            },
            {
                "id": 1, "nama": "Jika Ada :",
                "detail": [
                    { "id": 15619, "nama": " Pendenganran ", "type": "checkbox" },

                    { "id": 15620, "nama": " Pengelihatan", "type": "checkbox" },
                    { "id": 15621, "nama": " Perabaan ", "type": "checkbox" },

                    { "id": 15622, "nama": " Penghidu", "type": "checkbox" },
                    { "id": 15623, "nama": " Pengecapan ", "type": "checkbox" },

                    
                ]
            },
            
            ]
            $scope.listIsiPikir = [{
                "id": 1, "nama": "8.Isi Pikir :",
                "detail": [
                    { "id": 15624, "nama": " Obsesi ", "type": "checkbox" },

                    { "id": 15625, "nama": " Fobia", "type": "checkbox" },
                    { "id": 15626, "nama": " Hipokondria", "type": "checkbox" },
                    { "id": 15627, "nama": " FDipersonalisasi", "type": "checkbox" },
                    { "id": 15628, "nama": " Ide yang terkait", "type": "checkbox" },
                    { "id": 15629, "nama": " Pikiran magis", "type": "checkbox" },
                    
                ]
            },
            {
                "id": 1, "nama": "9. Waham",
                "detail": [
                    { "id": 15630, "nama": " Agama ", "type": "checkbox" },

                    { "id": 15631, "nama": " Somatik", "type": "checkbox" },
                    { "id": 15632, "nama": " Kebesaran ", "type": "checkbox" },

                    { "id": 15633, "nama": " Curiga", "type": "checkbox" },
                    { "id": 15634, "nama": " Siar Pikir ", "type": "checkbox" },
                    { "id": 15635, "nama": " Kontrol pikir", "type": "checkbox" },
                    { "id": 15636, "nama": " Sisip Pikir ", "type": "checkbox" },
                    { "id": 15637, "nama": " Nihilistik", "type": "checkbox" },
                    

                    
                ]
            },
            {
                "id": 1, "nama": "10. Proses Pikir",
                "detail": [
                    { "id": 15638, "nama": " Sirkumtansial ", "type": "checkbox" },

                    { "id": 15639, "nama": " Tangelsial", "type": "checkbox" },
                    { "id": 15640, "nama": " Kehilangan Soasialisi ", "type": "checkbox" },

                    { "id": 15641, "nama": " Flight of ideas", "type": "checkbox" },
                    { "id": 15642, "nama": " Blocking ", "type": "checkbox" },
                    { "id": 15643, "nama": " Penghilangan pembicaraan", "type": "checkbox" },

                    
                ]
            },
            {
                "id": 1, "nama": "11. Tingkat Kesadaran",
                "detail": [
                    { "id": 15644, "nama": " bingung ", "type": "checkbox" },

                    { "id": 15645, "nama": " Sedasi", "type": "checkbox" },
                    { "id": 15646, "nama": " Stupor ", "type": "checkbox" },

                    

                    
                ]
            },
            {
                "id": 1, "nama": "12. Disorientasi",
                "detail": [
                    { "id": 15647, "nama": " waktu ", "type": "checkbox" },

                    { "id": 15648, "nama": " Tempat", "type": "checkbox" },
                    { "id": 15649, "nama": " Orang ", "type": "checkbox" },

                    

                    
                ]
            },
            {
                "id": 1, "nama": "13.Memori",
                "detail": [
                    { "id": 15650, "nama": " Gangguan daya ingat jangka panjang ", "type": "checkbox" },

                    { "id": 15651, "nama": " Gangguan daya ingat saat ini", "type": "checkbox" },
                    { "id": 15652, "nama": " Gangguan daya ingat jangka pendek  ", "type": "checkbox" },
                    { "id": 15653, "nama": " Konfabulasi  ", "type": "checkbox" },


                    

                    
                ]
            },
            {
                "id": 1, "nama": "14.Tingakt konsentrasi dan berhitung",
                "detail": [
                    { "id": 15654, "nama": " Mudah beralih ", "type": "checkbox" },

                    { "id": 15655, "nama": " Tidak mampu berkonsentrasi", "type": "checkbox" },
                    { "id": 15656, "nama": " Tidak mampu berhitung sederhana  ", "type": "checkbox" },
                   
                ]
            },
            {
                "id": 1, "nama": "15.Kemampuan Penilaian",
                "detail": [
                    { "id": 15657, "nama": " Gangguan ringan", "type": "checkbox" },

                    { "id": 15658, "nama": " Gangguan Bermakna", "type": "checkbox" },
                    
                   
                ]
            },
            {
                "id": 1, "nama": "16. Daya tilik diri",
                "detail": [
                    { "id": 15659, "nama": " Mengingkari penyakit yang dideritanya", "type": "checkbox" },

                    { "id": 15660, "nama": " Menyalahkan hal-hal diluar dirinya", "type": "checkbox" },
                    { "id": 15661, "nama": " Lain-lain", "type": "checkbox" },
                    
                   
                ]
            },
            
            ]
            $scope.listDiagnosake = [{
                "id": 1, "nama": "H. Diagnosa Keperawatan :",
                "detail": [
                    { "id": 15662, "nama": " Gangguan rasa nyaman dan nyeri ", "type": "checkbox" },

                    { "id": 15663, "nama": "Ganggaun pola tidur", "type": "checkbox" },
                    { "id": 15664, "nama": " Risiko cidera jatuh ", "type": "checkbox" },

                    { "id": 15665, "nama": " Perubahan eliminasi : Bak", "type": "checkbox" },
                    { "id": 15666, "nama": " Perubahan eliminasi usus : Bab ", "type": "checkbox" },

                    { "id": 15666, "nama": " Halusinasi", "type": "checkbox" },
                    { "id": 15667, "nama": " Waham ", "type": "checkbox" },

                    { "id": 15668, "nama": " Isolasi sosial", "type": "checkbox" },
                    { "id": 15669, "nama": " Defisit perawatan diri ", "type": "checkbox" },

                    { "id": 15670, "nama": " TKeputusasaan", "type": "checkbox" },
                    { "id": 15671, "nama": " Gangguan nutrisi : Kurang ", "type": "checkbox" },

                    { "id": 15672, "nama": " Gangguan cairan dan elektrolit : kurang", "type": "checkbox" },
                    { "id": 15673, "nama": " Risiko perilaku kekerasan ", "type": "checkbox" },

                    { "id": 15674, "nama": " Harga diri rendah", "type": "checkbox" },
                    { "id": 15675, "nama": " Perubahan penampilan ", "type": "checkbox" },

                    { "id": 15676, "nama": " gangguan gambaran diri", "type": "checkbox" },
                    { "id": 15677, "nama": " Ideal diri tidak realistis ", "type": "checkbox" },

                    { "id": 15678, "nama": " Ganggaun gambaran diri", "type": "checkbox" },
                    { "id": 15679, "nama": " Lainnya ", "type": "textbox" },

                    

                    
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
                       pegawaiInputDetail = dataLoad[i].pegawaifk
                    }

                }
                if( $scope.cc.norec_emr !='-' && pegawaiInputDetail !='' && pegawaiInputDetail !=null){
                    if(pegawaiInputDetail != medifirstService.getPegawaiLogin().id){
                        $scope.allDisabled =true
                        // toastr.warning('Hanya Bisa melihat data','Peringatan')
                        // return
                    }
                }
            })
            $scope.$watch('item.obj[14459]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai == 0) {
                    $scope.item.obj[14460] = true
                    $scope.item.obj[14460] = false
                    $scope.item.obj[14460] = false
                    $scope.item.obj[14460] = false
                }
               if (nilai >= 1 && nilai <= 3) {
                    $scope.item.obj[14460] = false
                    $scope.item.obj[14461] = true   
                    $scope.item.obj[14462] = false
                    $scope.item.obj[14463] = false
                }
                if (nilai >= 4 && nilai <= 6) {
                    $scope.item.obj[14460] = false
                    $scope.item.obj[14461] = false
                    $scope.item.obj[14462] = true
                    $scope.item.obj[14463] = false
                }
                if (nilai >= 7 && nilai <= 10) {
                    $scope.item.obj[14460] = false
                    $scope.item.obj[14461] = false
                    $scope.item.obj[14462] = false
                    $scope.item.obj[14463] = true
                }
            });
            $scope.$watch('item.obj[14499]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai >=7 && nilai <=11 ) {
                    $scope.item.obj[14500] = true
                    $scope.item.obj[14501] = false
                   
                }
                if (nilai >= 12) {
                    $scope.item.obj[14500] = false
                    $scope.item.obj[14501] = true
                 
                }
                
            })
                

            $scope.getSkalaNyeri = function (data, stat) {
                $scope.activeStatus = stat.descNilai
                var nilai = stat.descNilai
                if (nilai >= 0 && nilai <= 1) {
                    $scope.item.obj[14464] = true
                    $scope.item.obj[14465] = false
                    $scope.item.obj[14466] = false
                    $scope.item.obj[14467] = false
                    $scope.item.obj[14468] = false
                    $scope.item.obj[14469] = false
                }
                if (nilai >= 2 && nilai <= 3) {
                    $scope.item.obj[14464] = false
                    $scope.item.obj[14465] = true
                    $scope.item.obj[14466] = false
                    $scope.item.obj[14467] = false
                    $scope.item.obj[14468] = false
                    $scope.item.obj[14469] = false
                }
                if (nilai >= 4 && nilai <= 5) {
                    $scope.item.obj[14464] = false
                    $scope.item.obj[14465] = false
                    $scope.item.obj[14466] = true
                    $scope.item.obj[14467] = false
                    $scope.item.obj[14468] = false
                    $scope.item.obj[14469] = false
                }
                if (nilai >= 6 && nilai <= 7) {
                    $scope.item.obj[14464] = false
                    $scope.item.obj[14465] = false
                    $scope.item.obj[14466] = false
                    $scope.item.obj[14467] = true
                    $scope.item.obj[14468] = false
                    $scope.item.obj[14469] = false
                }
                if (nilai >= 8 && nilai <= 9) {
                    $scope.item.obj[14464] = false
                    $scope.item.obj[14465] = false
                    $scope.item.obj[14466] = false
                    $scope.item.obj[14467] = false
                    $scope.item.obj[14468] = true
                    $scope.item.obj[14469] = false
                }

                if (nilai == 10) {
                    $scope.item.obj[14464] = false
                    $scope.item.obj[14465] = false
                    $scope.item.obj[14466] = false
                    $scope.item.obj[14467] = false
                    $scope.item.obj[14468] = false
                    $scope.item.obj[14469] = true
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
                $scope.item.obj[14499] = $scope.totalSkor4
            }
                // setSkorAkhir($scope.item.obj[3152])
            $scope.totalSkorAses = 0
            $scope.getSkorAsesmen = function (stat, skor) {
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
                $scope.item.obj[5084] = $scope.totalSkor + $scope.totalSkor2
                // setSkorAkhir($scope.item.obj[3152])
            }
            $scope.skorGizi = 0
            $scope.getSkorGizi= function (stat) {
                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if (arrobj[i] == stat.id) {
                        if ($scope.item.obj[parseFloat(arrobj[i])] == true) {
                            $scope.skorGizi = $scope.skorGizi + parseFloat(stat.descNilai)
                            break
                        } else {
                            $scope.skorGizi = $scope.skorGizi - parseFloat(stat.descNilai)
                            break
                        }
                    } else {
                    }
                }
                $scope.item.obj[14432] = $scope.skorGizi
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
            $scope.$watch('item.obj[14432]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai < 4 ) {
                    $scope.item.obj[14433] = true
                    $scope.item.obj[14434] = false
                   
                }
                if (nilai >= 4) {
                    $scope.item.obj[14433] = false
                    $scope.item.obj[14434] = true
                 
                }
            })
            $scope.kembali = function () {
                $rootScope.showRiwayat()
            }

            $scope.Save = function () {
                if( $scope.cc.norec_emr !='-' && pegawaiInputDetail !='' && pegawaiInputDetail !=null){
                    if(pegawaiInputDetail != medifirstService.getPegawaiLogin().id){
                        toastr.warning('Hanya Bisa melihat data','Peringatan')
                        return
                    }
                }
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
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,  
                    'Asesmen Awal Keperawatan Psikogeriatri ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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