define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AsesmenPerawatInapUmumCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.totalSkor4 = 0
            $scope.totalSkor5 = 0
            var peagawaiLogin = medifirstService.getPegawaiLogin()
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 467
            var dataLoad = []
            var pegawaiInputDetail= ''
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
            })
             medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 467).then(function (e) {

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
                    if (element.kodeexternal == 'nyeri') {
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
            $scope.listRujukan = [
            {
                    "id": 1, "nama": "1. KELUHAN DAN RIWAYAT KESEHATAN SEKARANG",
                    "detail": [
                        { "id": 114457, "nama": "", "type": "textarea" },
                    ]
                },
            ]
            $scope.listRiwayatKesehatan = [
                {
                    "id": 1, "nama": "a. Riwayat kesehatan yang lalu ",
                    "detail": [
                        { "id": 114458, "nama": "Ya,","type": "checkbox"  },
                        { "id": 114459, "nama": "Tidak", "type": "checkbox"  },
                        { "id": 114460, "nama": "Penyakit", "type": "textbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Pernah pembedahan  ",
                    "detail": [
                        { "id": 114461, "nama": "Ya,","type": "checkbox"  },
                        { "id": 114462, "nama": "Tidak", "type": "checkbox"  },
                        { "id": 114463, "nama": "Jenis Operasi", "type": "textbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "b. Riwayat transfusi  ",
                    "detail": [
                        { "id": 114464, "nama": "Ya,","type": "checkbox"  },
                        { "id": 114465, "nama": "Tidak", "type": "checkbox"  },
                        { "id": 114466, "nama": "Tahun", "type": "textbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "c. Riwayat Penyakit Keluarga  ",
                    "detail": [
                        { "id": 114467, "nama": "Ya,","type": "checkbox"  },
                        { "id": 114468, "nama": "Tidak", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Jika ya",
                    "detail": [
                        { "id": 114469, "nama": "Paru","type": "checkbox"  },
                        { "id": 114470, "nama": "Hepatitis", "type": "checkbox"  },
                        { "id": 114471, "nama": "DM","type": "checkbox"  },
                        { "id": 114472, "nama": "Hipertensi", "type": "checkbox"  },
                        { "id": 114473, "nama": "Lainnya", "type": "textbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "e. Riwayat Alergi ",
                    "detail": [
                        { "id": 114474, "nama": "Ya,","type": "checkbox"  },
                        { "id": 114475, "nama": "Tidak", "type": "checkbox"  },
                        { "id": 114476, "nama": "Obat", "type": "textbox"  },
                        { "id": 114477, "nama": "Makanan", "type": "textbox"  },
                        { "id": 114478, "nama": "Lainnya", "type": "textbox"  },
                        { "id": 114479, "nama": "Reaksi", "type": "textbox"  },
                    ]
                }
            ]
            $scope.listRiwayatStatusSosial = [
                {
                    "id": 1, "nama": "Status Perkawinan",
                    "detail": [
                        { "id": 114480, "nama": "Menikah","type": "checkbox"  },
                        { "id": 114481, "nama": "Belum Menikah", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Tinggal dengan ",
                    "detail": [
                        { "id": 114482, "nama": "Keluarga inti","type": "checkbox"  },
                        { "id": 114483, "nama": "Lainnya", "type": "checkbox"  },
                        { "id": 114484, "nama": "", "type": "textbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Hubungan pasien dengan anggota keluarga  ",
                    "detail": [
                        { "id": 114485, "nama": "Baik","type": "checkbox"  },
                        { "id": 114486, "nama": "Tidak Baik", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Peran dalam keluarga  ",
                    "detail": [
                        { "id": 114487, "nama": "","type": "textarea"  },
                    ]
                },
                {
                    "id": 1, "nama": "Pengambilan Keputusan dalam Keluarga  ",
                    "detail": [
                        { "id": 114488, "nama": "","type": "textarea"  },
                    ]
                },
                {
                    "id": 1, "nama": "Pemberi dukungan  ",
                    "detail": [
                        { "id": 114489, "nama": "","type": "textarea"  },
                    ]
                },
                {
                    "id": 1, "nama": "Kegiatan yang dilakukan dalam lingkungan masyarakat ",
                    "detail": [
                        { "id": 114490, "nama": "","type": "textarea"  },
                    ]
                },
                
                
            ]
            $scope.listRiwayatStatusPsikologi = [
                {
                    "id": 1, "nama": "",
                    "detail": [
                        { "id": 114491, "nama": "Tenang ","type": "checkbox"  },
                        { "id": 114492, "nama": "Marah", "type": "checkbox"  },
                        { "id": 114493, "nama": "Menarik diri ","type": "checkbox"  },
                        { "id": 114494, "nama": "Tidak Sabar", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Cemas ",
                    "detail": [
                        { "id": 114495, "nama": "Merasa bingung ","type": "checkbox"  },
                        { "id": 114496, "nama": "Merasa khawatir dengan kondisi yang dihadapai", "type": "checkbox"  },
                        { "id": 114497, "nama": "sulit berkonsentrasi ","type": "checkbox"  },
                        { "id": 114498, "nama": "Tampak Gelisah", "type": "checkbox"  },
                        { "id": 114499, "nama": "Sulit Tidur ", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Faktor Stress  ",
                    "detail": [
                        { "id": 114500, "nama": "Finansial","type": "checkbox"  },
                        { "id": 114501, "nama": "Penyakit", "type": "checkbox"  },
                        { "id": 114502, "nama": "Keluarga", "type": "checkbox"  },
                        { "id": 114503, "nama": "Lainnya", "type": "textbox"  },

                    ]
                },
                
                
            ]
            $scope.listRiwayatStatusEkonomi = [
                {
                    "id": 1, "nama": "Status Pembiayaan",
                    "detail": [
                        { "id": 114504, "nama": "asuransi swasta","type": "checkbox"  },
                        { "id": 114505, "nama": "BPJS", "type": "checkbox"  },
                        { "id": 114506, "nama": "biaya sendiri ","type": "checkbox"  },
                        { "id": 114507, "nama": "Lainnya", "type": "checkbox"  },
                        { "id": 114508, "nama": "sebutkan", "type": "textbox"  },
                    ]
                },
            ]
            $scope.listRiwayatStatusBudaya= [
                {
                    "id": 1, "nama": "",
                    "detail": [
                        { "id": 114509, "nama": "Suku", "type": "textbox"  },
                        { "id": 114510, "nama": "Budaya yang dianut terkait kesehatan", "type": "textbox"  },
                    ]
                },
            ]
            $scope.listRiwayatStatusSpiritualKeper= [
                {
                    "id": 1, "nama": "Kegiatan ibadah selama sakit",
                    "detail": [
                        { "id": 114511, "nama": "Terganggu,", "type": "checkbox"  },
                        { "id": 114512, "nama": "Tidak Terganggu", "type": "checkbox"  },
                        { "id": 114513, "nama": "", "type": "textbox"  },
                        
                    ]
                },
                {
                    "id": 1, "nama": "Kebutuhan bimbingan rohani",
                    "detail": [
                        { "id": 114514, "nama": "Ya", "type": "checkbox"  },
                        { "id": 114515, "nama": "Tidak", "type": "checkbox"  },
                    ]
                },
            ]
            $scope.listRiwayatPerjalanan= [
                {
                    "id": 1, "nama": "Dalam Negeri",
                    "detail": [
                        { "id": 114516, "nama": "Daerah, Sebutkan", "type": "textarea"  },
                        
                    ]
                },
                {
                    "id": 1, "nama": "Luar Negeri",
                    "detail": [
                        { "id": 114517, "nama": "Negara, Sebutkan", "type": "textarea"  },
                    ]
                },
            ]
            $scope.listNyeri = [{
                "id": 1, "nama": "Apakah ada nyeri :",
                "detail": [
                    { "id": 114637, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 114638, "nama": "Ya ", "type": "checkbox" },
                    
                ]
            },
            {
                "id": 1, "nama": "Jika Ya, :",
                "detail": [
                    { "id": 114639, "nama": "Nyeri kronis ", "type": "checkbox" },

                    { "id": 114640, "nama": "Nyeri ", "type": "checkbox" },
                    
                ]
            }
            ]
            $scope.listNyeri3 = [{
                "id": 1, "nama": "Jelaskan :",
                "detail": [
                    { "id": 114653, "nama": "Lokasi ", "type": "textbox" },
                    { "id": 114654, "nama": "Frekuensi ", "type": "textbox" },
                    { "id": 114655, "nama": "Durasi ", "type": "textbox" },
                    
                ]
            },
            {
                "id": 1, "nama": "Tipe Nyeri :",
                "detail": [
                    { "id": 114656, "nama": "Terus menerus  ", "type": "checkbox" },
                    { "id": 114657, "nama": "Hilang timbul ", "type": "checkbox" },
                    
                ]
            },
            {
                "id": 1, "nama": "Karateristik Nyeri :",
                "detail": [
                    { "id": 114658, "nama": "Terbakar  ", "type": "checkbox" },
                    { "id": 114659, "nama": "Tertusuk", "type": "checkbox" },
                    { "id": 114660, "nama": "Tumpul ", "type": "checkbox" },
                    { "id": 114661, "nama": "Tertekan ", "type": "checkbox" },
                    { "id": 114662, "nama": "Tajam ", "type": "checkbox" },
                    { "id": 114663, "nama": "Lainnya ", "type": "checkbox" },
                    { "id": 114664, "nama": "", "type": "textbox" },

                    
                ]
            },
            {
                "id": 1, "nama": "Masalah nyeri mempengaruhi :",
                "detail": [
                    { "id": 114665, "nama": "Tidur  ", "type": "checkbox" },
                    { "id": 114666, "nama": "Aktivitas fisik", "type": "checkbox" },
                    { "id": 114667, "nama": "Konsentrasi ", "type": "checkbox" },
                    { "id": 114668, "nama": "emosi ", "type": "checkbox" },
                ]
            },
            {
                "id": 1, "nama": "Cara menghilangkan nyeri :",
                "detail": [
                    { "id": 114669, "nama": "Minum Obat  ", "type": "checkbox" },
                    { "id": 114670, "nama": "Istirahat", "type": "checkbox" },
                    { "id": 114671, "nama": "Mendengarkan musik ", "type": "checkbox" },
                ]
            }
            ]
            $scope.listGizi = [

                {
                    "id": 1, "nama": "Apakah pasien tampak kurus",
                    "detail": [
                        { "id": 111121, "nama": "a. Tidak", "descNilai": "0" },
                        { "id": 111122, "nama": "b. Ya", "descNilai": "1" },
                    ]
                },
                {
                    "id": 2, "nama": "Apakah terdapat penurunan BB selama 1bulan terakhir(Berdasarkan penilaian objektif data BB bila ada/ penilaian seubjektif dari orang tua Pasien atau untuk bayi =< 1 tahun BB tidak naik selama3 bulan terakhir ",
                    "detail": [
                        { "id": 111123, "nama": "a. Tidak", "descNilai": "0" },
                        { "id": 111124, "nama": "b. Ya", "descNilai": "1" }
                    ]
                
                },
                {
                    "id": 3, "nama": "Apakah terdapat salah satu dari kondisi berikut?Diare >=5 kali/hari dan atau muntah >=3 kali/hari dalam seminggu terakhir, Asupan makananberkurang selama 1 minggu terakhir",
                    "detail": [
                        { "id": 111125, "nama": "a. Tidak", "descNilai": "0" },
                        { "id": 111126, "nama": "b. Ya", "descNilai": "1" },
                    ]
                },
                {
                    "id": 4, "nama": "Apakah terdapat Penyakit, keadaan yang mengakibatkan pasien beresiko  mengalami malnutrisi",
                    "detail": [
                        { "id": 111127, "nama": "a. Tidak", "descNilai": "0" },
                        { "id": 111128, "nama": "b. Ya", "descNilai": "2" },
                    ]
                },
            ]
            
            $scope.listSkorNRC = [{
                "id": 8, "nama": "Score ",
                "detail": [
                    { "id": 114641, "nama": "0", "type": "checkbox", "ket": "= Tidak Nyeri" },
                    { "id": 114642, "nama": "1 - 3", "type": "checkbox", "ket": "= Nyeri Ringan" },
                    { "id": 114643, "nama": "4 - 6", "type": "checkbox", "ket": "= Nyeri Sedang" },
                    { "id": 114644, "nama": "7 - 10", "type": "checkbox", "ket": "= Nyeri Berat" },
                ]
            }]
            $scope.listSkorWong = [{
                "id": 9, "nama": "Score ",
                "detail": [
                    { "id": 114647, "nama": "0 - 1", "type": "checkbox", "ket": "= Tidak Ada Nyeri" },
                    { "id": 114648, "nama": "2 - 3", "type": "checkbox", "ket": "= Sedikit Nyeri" },
                    { "id": 114649, "nama": "4 - 5", "type": "checkbox", "ket": "= Cukup Nyeri" },
                    { "id": 114650, "nama": "6 - 7", "type": "checkbox", "ket": "= Lumayan Nyeri" },
                    { "id": 114651, "nama": "8 - 9", "type": "checkbox", "ket": "= Sangat Nyeri" },
                    { "id": 114652, "nama": "10", "type": "checkbox", "ket": "= Amat Sangat Nyeri" },
                ]
            }]
            $scope.listNyeriAnak = [
                {"id": 10, "nama": "Hurts", "detail": [
                    { "id": 6000, "nama": "No Hurt", "descNilai": 4 },
                    { "id": 6001, "nama": "Hurts Little Bit", "descNilai": 6 }, 
                    { "id": 3, "nama": "Hurts Little More", "descNilai": 0 },
                    { "id": 6002, "nama": "Hurts Even More", "descNilai": 8 }, 
                    { "id": 5, "nama": "Hurts Whole Lot", "descNilai": 2 },
                    { "id": 6003, "nama": "Hurts whorts", "descNilai": 10 }]
                }
            ]
            $scope.listHumpty = [

                {
                    "id": 1, "nama": "Usia",
                    "detail": [
                        { "id": 114580, "nama": "< 3 tahun", "descNilai": "4" },
                        { "id": 114581, "nama": "3-7 tahun", "descNilai": "3" },
                        { "id": 114582, "nama": "8-12 tahun", "descNilai": "2" },
                        { "id": 114583, "nama": ">= 13 tahun", "descNilai": "1" },
                    ]
                },

                {
                    "id": 2, "nama": "Jenis kelamin",
                    "detail": [
                        { "id": 114584, "nama": "Laki-laki", "descNilai": "2" },
                        { "id": 114585, "nama": "Perempuan", "descNilai": "1" },
                    ]
                },

                {
                    "id": 3, "nama": "Diagnosis",
                    "detail": [
                        { "id": 114586, "nama": "Diagnosis Neurologi", "descNilai": "4" },
                        { "id": 114587, "nama": "Perubahan Oksigenasi (Diagnosis respiratorik, dehidrasi, anemia, anoreksia, sinkop, pusing, dsb)", "descNilai": "3" },
                        { "id": 114588, "nama": "Gangguan perilaku / psikiatri", "descNilai": "2" },
                        { "id": 114589, "nama": "Diagnosis lainnya", "descNilai": "1" },
                    ]
                    
                },

                {
                    "id": 4, "nama": "Gangguan/kognitif",
                    "detail": [
                        { "id": 114590, "nama": "Tidak menyadari keterbatasan dirinya", "descNilai": "3" },
                        { "id": 114591, "nama": "Lupa karena adanya keterbatasan", "descNilai": "2" },
                        { "id": 114592, "nama": "Orientasi baik terhadap diri sendiri", "descNilai": "1" },

                    ]
                },
                {
                    "id": 5, "nama": "Faktor lingkungan",
                    "detail": [
                        { "id": 114593, "nama": "Riwayat jatuh-bayi diletakan ditempat tidur dewasa", "descNilai": "4" },
                        { "id": 114594, "nama": "Pasien Menggunakan Alat bantu/bayi diletakan dalam tempat tidur bayi/perabot rumah", "descNilai": "3" },
                        { "id": 114595, "nama": "Pasien diletakan ditempat tidur", "descNilai": "2" },
                        { "id": 114596, "nama": "Area diluar rumah sakit", "descNilai": "1" },


                    ]
                },
                {
                    "id": 6, "nama": "Respon terhadap Pembedahan/sedasi/anestesi",
                    "detail": [
                        { "id": 114597, "nama": "Dalam 24 jam ", "descNilai": "3" },
                        { "id": 114598, "nama": "Dalam 48 jam", "descNilai": "2" },
                        { "id": 114599, "nama": "> 48 jam/tidak mengalami perbedaan/sedasi/anestesi", "descNilai": "1" },

                    ]
                },
                {
                    "id": 7, "nama": "Penggunaan medikamentosa",
                    "detail": [
                        { "id": 114600, "nama": "penggunaan multiple, sedatif, obat hipnosis, harbiturat, fanotiazin, anti depresan, pencahar, diuretik, narkosa", "descNilai": "3" },
                        { "id": 114601, "nama": "penggunaan salah satu obat diatas", "descNilai": "2" },
                        { "id": 114602, "nama": "penggunaan medikasi lainnya atau tidak ada medikasi", "descNilai": "1" },

                    ]
                },



            ]
            $scope.listHumpty2 = [

                {
                    "id": 1, "nama": "Riwayat jatuh",
                    "detail": [
                        { "id": 114606, "nama": "Tidak", "descNilai": "0" },
                        { "id": 114607, "nama": "Ya", "descNilai": "25" },
                    ]
                },

                {
                    "id": 2, "nama": "Diagnosa Sekunder (>2 diagnosa medis)",
                    "detail": [
                        { "id": 114608, "nama": "Tidak", "descNilai": "0" },
                        { "id": 114609, "nama": "Ya", "descNilai": "15" },
                    ]
                },
                {
                    "id": 3, "nama": "Alat Bantu",
                    "detail": [
                        { "id": 114610, "nama": "Tidak Ada/Kursi roda/perawat/tirah baring", "descNilai": "0" },
                        { "id": 114611, "nama": "Tongkat/ alat Penopang", "descNilai": "15" },
                        { "id": 114612, "nama": "Berpegangan pada perabot", "descNilai": "25" },

                    ]
                },

                {
                    "id": 4, "nama": "Terpasang infus",
                    "detail": [
                        { "id": 114613, "nama": "Tidak", "descNilai": "0" },
                        { "id": 114614, "nama": "Ya", "descNilai": "20" },
                    ]
                    
                },

                {
                    "id": 5, "nama": "Gaya berjalan",
                    "detail": [
                        { "id": 114615, "nama": "Normal/bedrest/immobilisasi", "descNilai": "0" },
                        { "id": 114616, "nama": "Lemah", "descNilai": "10" },
                        { "id": 114617, "nama": "Terganggu", "descNilai": "20" },

                    ]
                },
                {
                    "id": 6, "nama": "Status Mental",
                    "detail": [
                        { "id": 114618, "nama": "Sadar akan kemampuan diri sendiri", "descNilai": "0" },
                        { "id": 114619, "nama": "Serinng Lupa akan keterbatasan yang dimiliki", "descNilai": "15" }


                    ]
                },



            ]

            $scope.listEdmon1 = [
                {
                    "id": 1, "nama": "USIA",
                    "detail": [
                        { "id": 5053, "nama": "< 50 Tahun", "descNilai": "8" },
                        { "id": 5054, "nama": "50-79 Tahun", "descNilai": "10" },
                        { "id": 5056, "nama": ">= 80 Tahun", "descNilai": "26" },

                    ]
                },
                {
                    "id": 2, "nama": "STATUS MENTAL",
                    "detail": [
                        { "id": 5057, "nama": "Sadar penuh/Orientasi baik sepanjang waktu", "descNilai": "-4" },
                        { "id": 5058, "nama": "Agitasi / Cemas", "descNilai": "12" },
                        { "id": 5059, "nama": "Keadaan bingung", "descNilai": "13" },
                        { "id": 5060, "nama": "Bingung / Disoreintasi", "descNilai": "14" },

                    ]
                },
                {
                    "id": 3, "nama": "ELIMINASI",
                    "detail": [
                        { "id": 5061, "nama": "Mandiri mampu mengontrol rectum dan vesica urinaria", "descNilai": "8" },
                        { "id": 5062, "nama": "Kateter / ostomi", "descNilai": "12" },
                        { "id": 5063, "nama": "Eliminasi dengan bantuan", "descNilai": "10" },
                        { "id": 5064, "nama": "Gangguan eliminasi (Inkontinensia, nocturna,Frekuensi)", "descNilai": "12" },
                        { "id": 5065, "nama": "inkontinensia tapi mampu bergerak mandiri", "descNilai": "12" },

                    ]
                },
                {
                    "id": 4, "nama": "OBAT",
                    "detail": [
                        { "id": 5066, "nama": "Tanpa obat", "descNilai": "10" },
                        { "id": 5067, "nama": "Obat Jantung", "descNilai": "10" },
                        { "id": 5068, "nama": "Obat psikotropik (termasuk benzodiazepine Anti depresan)", "descNilai": "8" },
                        { "id": 5069, "nama": "Mengalami peningkatan dosis obat tersebut dan/atau diberikan bilamana perlu, diterima dalam 24 jam terakhir", "descNilai": "12" },


                    ]
                },
                {
                    "id": 5, "nama": "DIAGNOSIS",
                    "detail": [
                        { "id": 5070, "nama": "Gangguan bipolar / Skizoaafektif", "descNilai": "10" },
                        { "id": 5071, "nama": "Gangguan penyalahgunaan zat/alkohol", "descNilai": "10" },
                        { "id": 5072, "nama": "Gangguan depresi mayor", "descNilai": "8" },
                        { "id": 5073, "nama": "Delirium / demensia", "descNilai": "12" },

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
                        { "id": 114624, "nama": "a. Tidak ada penurunan berat badan", "descNilai": "0" },
                        { "id": 114625, "nama": "b. Tidak yakin / tidak tahu / terasa baju lebih longgar", "descNilai": "2" },
                        { "id": 114626, "nama": "c. Penurunan : > 1 - 5 kg", "descNilai": "1" },
                        { "id": 114627, "nama": "               > 6 - 10 kg", "descNilai": "2" },
                        { "id": 114628, "nama": "               > 11 - 15 kg", "descNilai": "3" },
                        { "id": 114629, "nama": "               > 15 kg", "descNilai": "4" },
                        { "id": 114630, "nama": "  Tidak tahu berapa penurunan berat badan", "descNilai": "2" },
                    ]
                },
                {
                    "id": 2, "nama": "Asupan Makan Berkurang karena tidak nafsu makan",
                    "detail": [
                        { "id": 114631, "nama": "a. Tidak", "descNilai": "0" },
                        { "id": 114632, "nama": "b. Ya", "descNilai": "1" }
                    ]
                },
            ]
            $scope.listPasienDiagKhusus = [
            {
                "id": 2, "nama": "Dilaporkan ke Dokter Bila skor >= 2 dan atau pasien dengan diagnosis / kondisi khusus :",
                "detail": [
                    { "id": 114634, "nama": "Tidak", "type": "checkbox" },
                    { "id": 114635, "nama": "Ya, pukul", "type": "checkbox" },
                    { "id": 114636, "nama": "", "type": "textbox" },
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
                    { "id": 5115, "nama": "Lainnya ...", "type": "checkbox" },
                    { "id": 5116, "nama": " .. ", "type": "textbox" },
                ]
            },
            {
                "id": 6, "nama": "Bahasa Sehari-hari ",
                "detail": [
                    { "id": 5117, "nama": "Indonesia", "type": "checkbox" },
                    { "id": 5118, "nama": "Jawa ", "type": "checkbox" },
                    { "id": 5119, "nama": "Lainnya ...", "type": "checkbox" },
                    { "id": 5120, "nama": " .. ", "type": "textbox" },
                ]
            },
            ]

            $scope.listSosial = [{
                "id": 1, "nama": "Sosial. Ada yang menunggu",
                "detail": [
                    { "id": 5124, "nama": "Tidak", "type": "checkbox" },
                    { "id": 5125, "nama": "Ya ...", "type": "checkbox" },
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
                            "detail": [{ id: 114518, baris : 1 }, { id: 114519, baris : 2 }]
                        },
                        {
                            "id": 2, "nama": "Kadang-kadang tak terkendali", "descNilai": "1", "ket": 1,
                            "detail": [{ id: 114520, baris : 1 }, { id: 114521,baris : 2  }]
                        },
                        {
                            "id": 3, "nama": "Mandiri", "descNilai": "2", "ket": 1,
                            "detail": [{ id: 114522, baris : 1}, { id: 114523, baris : 2 }]
                        },
                    ]
                },
                {
                    "id": 2, "nama": "Mengendalikan Rangsang berkemih",
                    "detail": [
                        { "id": 1, "nama": "Tak terkendali pakai kateter", "descNilai": "0" ,   "detail": [{ id: 114524, baris : 1 }, { id: 114525, baris : 2 }]},
                        { "id": 2, "nama": "Kadang-kadang tak terkendali (1x24 jam)", "descNilai": "1",   "detail": [{ id: 114526, baris : 1 }, { id: 114527, baris : 2 }] },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2" ,   "detail": [{ id: 114528, baris : 1 }, { id: 114529, baris : 2 }]},
                    ]
                },
                {
                    "id": 3, "nama": "Membersihkan diri ( cuci muka, sisir rambur, sikat gigi)",
                    "detail": [
                        { "id": 1, "nama": "Butuh pertolongan orang lain", "descNilai": "0" ,   "detail": [{ id: 114530, baris : 1 }, { id: 114531,baris : 2 }]},
                        { "id": 2, "nama": "Mandiri", "descNilai": "1" ,   "detail": [{ id: 114532, baris : 1 }, { id: 114533, baris : 2 }]},
                    ]
                },
                {
                    "id": 4, "nama": "Penggunaan jamban (masuk, keluar)",
                    "detail": [
                        { "id": 1, "nama": "Tergantung pertolongan orang lain", "descNilai": "0",   "detail": [{ id: 114534, baris : 1 }, { id: 114535, baris : 2 }] },
                        { "id": 2, "nama": "Perlu pertolongan beberapa kegiatan tetapi dapat mengerjakan sendiri pada kegiatan yang lain", "descNilai": "1" ,   
                        "detail": [{ id: 114536, baris : 1 }, { id: 114537, baris : 2 }]},
                        { "id": 3, "nama": "Mandiri", "descNilai": "2",   "detail": [{ id: 114538, baris : 1 }, { id: 114539, baris : 2 }] },
                    ]
                },
                {
                    "id": 5, "nama": "Makan",
                    "detail": [
                        { "id": 1, "nama": "Tidak mampu", "descNilai": "0", "detail": [{ id: 114540, baris : 1   }, { id: 114541, baris : 2 }]  },
                        { "id": 2, "nama": "Perlu ditolong  memotong makanan", "descNilai": "1","detail": [{ id: 114542, baris : 1 }, { id: 114543, baris : 2 }] },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2" ,"detail": [{ id: 114544, baris : 1 }, { id: 114545, baris : 2 }]},
                    ]
                },
                {
                    "id": 6, "nama": "Berubah sikap dari berbaring ke duduk",
                    "detail": [
                        { "id": 1, "nama": "Perlu banyak bantuan untuk bisa duduk (2 org)", "descNilai": "0" ,"detail": [{ id: 114546, baris : 1 }, { id: 114547, baris : 2 }]},
                        { "id": 2, "nama": "Bantuan minimal 2 org", "descNilai": "1" ,"detail": [{ id: 114548, baris : 1 }, { id: 114549, baris : 2 }]},
                        { "id": 3, "nama": "Bantuan Verbal", "descNilai": "2","detail": [{ id: 114550, baris : 1 }, { id: 114551, baris : 2 }] },
                        { "id": 4, "nama": "Mandiri", "descNilai": "3","detail": [{ id: 114552, baris : 1 }, { id: 114553, baris : 2 }] },
                    ]
                },
                {
                    "id": 7, "nama": "Berpindah / berjalan",
                    "detail": [
                        { "id": 1, "nama": "Tidak mampu", "descNilai": "0","detail": [{ id: 114554, baris : 1 }, { id: 114555, baris : 2 }] },
                        { "id": 2, "nama": "Bisa (pindah) dengan kursi ", "descNilai": "1" ,"detail": [{ id: 114556, baris : 1 }, { id: 114557, baris : 2 }]},
                        { "id": 3, "nama": "Berjalan dengan bantuan 1 orang", "descNilai": "2" ,"detail": [{ id: 114558, baris : 1 }, { id: 114559, baris : 2 }]},
                        { "id": 4, "nama": "Mandiri", "descNilai": "3","detail": [{ id: 114560, baris : 1 }, { id: 114561, baris : 2 }] },
                    ]
                },
                {
                    "id": 8, "nama": "Memakai Baju",
                    "detail": [
                        { "id": 1, "nama": "Tergantung orang lain", "descNilai": "0" ,"detail": [{ id: 114562, baris : 1 }, { id: 114563, baris : 2 }]},
                        { "id": 2, "nama": "Sebagian dibantu (misal mengancingkan baju)", "descNilai": "1" ,"detail": [{ id: 114564, baris : 1 }, { id: 114565, baris : 2 }]},
                        { "id": 3, "nama": "Mandiri", "descNilai": "2" ,"detail": [{ id: 114566, baris : 1 }, { id: 114567, baris : 2 }]},

                    ]
                },
                {
                    "id": 9, "nama": "Naik turun tangga ",
                    "detail": [
                        { "id": 1, "nama": "Tidak Mampu", "descNilai": "0","detail": [{ id: 114568, baris : 1 }, { id: 114569, baris : 2 }] },
                        { "id": 2, "nama": "Butuh Pertolongan orang lain", "descNilai": "1","detail": [{ id: 114570, baris : 1 }, { id: 114571, baris : 2 }] },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2","detail": [{ id: 114572, baris : 1 }, { id: 114573, baris : 2 }] },
                    ]
                },
                {
                    "id": 10, "nama": "Mandi",
                    "detail": [
                        { "id": 1, "nama": "Tergantung orang lain ", "descNilai": "0" ,"detail": [{ id: 114574, baris : 1 }, { id: 114575, baris : 2 }]},
                        { "id": 2, "nama": "Mandiri", "descNilai": "1" ,"detail": [{ id: 114576, baris : 1 }, { id: 114577, baris : 2 }]},
                    ]
                },
            ]
            $scope.listNeurologi= [
                {
                    "id": 1, "nama": "Kesadaran",
                    "detail": [
                        { "id": 114678, "nama": "Kompos mentis", "type": "checkbox"  },
                        { "id": 114679, "nama": "Apatis", "type": "checkbox"  },
                        { "id": 114680, "nama": "delirium", "type": "checkbox"  },
                        { "id": 114681, "nama": "somnolen", "type": "checkbox"  },
                        { "id": 114682, "nama": "Sopor", "type": "checkbox"  },
                        { "id": 114683, "nama": "coma", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "GCS",
                    "detail": [
                        { "id": 114684, "nama": "E", "type": "textbox"  },
                        { "id": 114685, "nama": "M", "type": "textbox"  },
                        { "id": 114686, "nama": "V", "type": "textbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Gangguan Neurologis",
                    "detail": [
                        { "id": 114687, "nama": "Tidak ada ", "type": "checkbox"  },
                        { "id": 114688, "nama": "Ada", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Kekuatan Otot",
                    "detail": [
                        { "id": 114689, "nama": "", "type": "textarea"  },
                    ]
                },
            ]
            $scope.listPernafasan= [
                {
                    "id": 1, "nama": "Irama",
                    "detail": [
                        { "id": 114690, "nama": "Regular", "type": "checkbox"  },
                        { "id": 114691, "nama": "Irreguler", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Retraksi dada",
                    "detail": [
                        { "id": 114692, "nama": "Tidak ada ", "type": "checkbox"  },
                        { "id": 114693, "nama": "Ada", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Bentuk dada",
                    "detail": [
                        { "id": 114694, "nama": "Tidak normal, ", "type": "checkbox"  },
                        { "id": 114695, "nama": "Normal", "type": "checkbox"  },
                        { "id": 114696, "nama": "Sebutkan", "type": "textbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Pola nafas",
                    "detail": [
                        { "id": 114697, "nama": "Tidak normal, ", "type": "checkbox"  },
                        { "id": 114698, "nama": "Normal", "type": "checkbox"  },
                        { "id": 114699, "nama": "Sebutkan", "type": "textbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Suara nafas",
                    "detail": [
                        { "id": 114700, "nama": "Tidak normal, ", "type": "checkbox"  },
                        { "id": 114701, "nama": "Normal", "type": "checkbox"  },
                        { "id": 114702, "nama": "Sebutkan", "type": "textbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Nafas cuping hidung",
                    "detail": [
                        { "id": 114703, "nama": "Tidak ada, ", "type": "checkbox"  },
                        { "id": 114704, "nama": "ada", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Penggunaan otot bantu nafas",
                    "detail": [
                        { "id": 114705, "nama": "Tidak ada, ", "type": "checkbox"  },
                        { "id": 114706, "nama": "ada", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Alat bantu nafas",
                    "detail": [
                        { "id": 114707, "nama": "Ya, ", "type": "checkbox"  },
                        { "id": 114708, "nama": "Tidak", "type": "checkbox"  },
                        { "id": 114709, "nama": "Sebutkan", "type": "textbox"  },
                    ]
                },
            ]
            $scope.listSirkulasi= [
                {
                    "id": 1, "nama": "Sianosis",
                    "detail": [
                        { "id": 114713, "nama": "Tidak ada", "type": "checkbox"  },
                        { "id": 114714, "nama": "ada", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Pucat",
                    "detail": [
                        { "id": 114715, "nama": "Tidak ada ", "type": "checkbox"  },
                        { "id": 114716, "nama": "Ada", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Intensitas nadi",
                    "detail": [
                        { "id": 114717, "nama": "kuat ", "type": "checkbox"  },
                        { "id": 114718, "nama": "lemah", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Capilary refill Time",
                    "detail": [
                        { "id": 114719, "nama": "<3 ", "type": "checkbox"  },
                        { "id": 114720, "nama": ">3", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Irama Nadi",
                    "detail": [
                        { "id": 114721, "nama": "Regular  ", "type": "checkbox"  },
                        { "id": 114722, "nama": "Irreguler", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Clubbing finger",
                    "detail": [
                        { "id": 114723, "nama": "Tidak ada  ", "type": "checkbox"  },
                        { "id": 114724, "nama": "ada", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Edema",
                    "detail": [
                        { "id": 114725, "nama": "Tidak ada  ", "type": "checkbox"  },
                        { "id": 114726, "nama": "ada", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Akral",
                    "detail": [
                        { "id": 114727, "nama": "Hangat ", "type": "checkbox"  },
                        { "id": 114728, "nama": "Dingin", "type": "checkbox"  },
                    ]
                },
                
            ]
            $scope.listGastrointstinal= [
                {
                    "id": 1, "nama": "Mulut",
                    "detail": [
                        { "id": 114729, "nama": "Mukosa lembab", "type": "checkbox"  },
                        { "id": 114730, "nama": "mukosa kering", "type": "checkbox"  },
                        { "id": 114731, "nama": "stomatitis", "type": "checkbox"  },
                        { "id": 114732, "nama": "labia/palatoschiziz", "type": "checkbox"  },
                        { "id": 114733, "nama": "Perdarahan guzi", "type": "checkbox"  },
                        { "id": 114734, "nama": "Lain-lain", "type": "checkbox"  },
                        { "id": 114735, "nama": "", "type": "textbox"  },
                    ]
                }
                
            ]
            $scope.listEliminasi= [
                {
                    "id": 1, "nama": "Pengeluaran",
                    "detail": [
                        { "id": 114736, "nama": "Mukosa lembab", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Frekuensi",
                    "detail": [
                        { "id": 114737, "nama": "", "type": "textarea"  },
                    ]
                },
                {
                    "id": 1, "nama": "Karateristik feses",
                    "detail": [
                        { "id": 114738, "nama": "Normal", "type": "checkbox"  },
                        { "id": 114739, "nama": "cair", "type": "checkbox"  },
                        { "id": 114740, "nama": "hijau", "type": "checkbox"  },
                        { "id": 114741, "nama": "Terdapat darah", "type": "checkbox"  },
                        { "id": 114742, "nama": "Lain-lain", "type": "checkbox"  },
                        { "id": 114743, "nama": "", "type": "textbox"  },
                    ]
                }
                
            ]
            $scope.listUrin= [
                {
                    "id": 1, "nama": "Pengeluaran",
                    "detail": [
                        { "id": 114744, "nama": "spontan", "type": "checkbox"  },
                        { "id": 114745, "nama": "kateter urine", "type": "checkbox"  },
                        { "id": 114746, "nama": "Cystostomy", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Kelainan",
                    "detail": [
                        { "id": 114747, "nama": "ada,", "type": "checkbox"  },
                        { "id": 114748, "nama": "Tidak ada", "type": "checkbox"  },
                        { "id": 114749, "nama": "", "type": "textbox"  },
                    ]
                }
                
            ]
            $scope.listIntregument= [
                {
                    "id": 1, "nama": "Pengeluaran",
                    "detail": [
                        { "id": 114750, "nama": "spontan", "type": "checkbox"  },
                        { "id": 114751, "nama": "kateter urine", "type": "checkbox"  },
                        { "id": 114752, "nama": "Cystostomy", "type": "checkbox"  },
                        { "id": 114753, "nama": "Mottied", "type": "checkbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Kelainan",
                    "detail": [
                        { "id": 114754, "nama": "ada,", "type": "checkbox"  },
                        { "id": 114755, "nama": "Tidak ada", "type": "checkbox"  },
                        { "id": 114756, "nama": "", "type": "textbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Resiko dekibitus",
                    "detail": [
                        { "id": 114757, "nama": "ada,", "type": "checkbox"  },
                        { "id": 114758, "nama": "Tidak ada", "type": "checkbox"  },
                        { "id": 114759, "nama": "", "type": "textbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Luka",
                    "detail": [
                        { "id": 114760, "nama": "ada,", "type": "checkbox"  },
                        { "id": 114761, "nama": "Tidak ada", "type": "checkbox"  },
                        { "id": 114762, "nama": "", "type": "textbox"  },
                    ]
                }
                
            ]
            $scope.listMusculoskeletal= [
                {
                    "id": 1, "nama": "Kelainan Tulang",
                    "detail": [
                        { "id": 114763, "nama": "Ada, ", "type": "checkbox"  },
                        { "id": 114764, "nama": "Tidak ada", "type": "checkbox"  },
                        { "id": 114765, "nama": "", "type": "textbox"  },
                        
                    ]
                },
                {
                    "id": 1, "nama": "Gerakan",
                    "detail": [
                        { "id": 114766, "nama": "ada,", "type": "checkbox"  },
                        { "id": 114767, "nama": "Tidak ada", "type": "checkbox"  },
                        { "id": 114768, "nama": "", "type": "textbox"  },
                    ]
                }
                
            ]
            $scope.listGentalia= [
                {
                    "id": 1, "nama": "",
                    "detail": [
                        { "id": 114769, "nama": "Kelainan, ", "type": "checkbox"  },
                        { "id": 114770, "nama": "Bebas", "type": "checkbox"  },
                        { "id": 114771, "nama": "", "type": "textbox"  },
                        
                    ]
                }
                
            ]
            $scope.listNurosensori= [
                {
                    "id": 1, "nama": "Pengecapan",
                    "detail": [
                        { "id": 114772, "nama": "Tidak normal, ", "type": "checkbox"  },
                        { "id": 114773, "nama": "Normal", "type": "checkbox"  },
                        { "id": 114774, "nama": "", "type": "textbox"  },
                        
                    ]
                },
                {
                    "id": 1, "nama": "perabaan",
                    "detail": [
                        { "id": 114775, "nama": "Tidak normal, ", "type": "checkbox"  },
                        { "id": 114776, "nama": "Normal", "type": "checkbox"  },
                        { "id": 114777, "nama": "", "type": "textbox"  },
                        
                    ]
                },
                {
                    "id": 1, "nama": "penghidu",
                    "detail": [
                        { "id": 114778, "nama": "Tidak normal, ", "type": "checkbox"  },
                        { "id": 114779, "nama": "Normal", "type": "checkbox"  },
                        { "id": 114780, "nama": "", "type": "textbox"  },
                        
                    ]
                },
                {
                    "id": 1, "nama": "pendengaran",
                    "detail": [
                        { "id": 114781, "nama": "Tidak normal, ", "type": "checkbox"  },
                        { "id": 114782, "nama": "Normal", "type": "checkbox"  },
                        { "id": 114783, "nama": "", "type": "textbox"  },
                        
                    ]
                },
                {
                    "id": 1, "nama": "penglihatan",
                    "detail": [
                        { "id": 114784, "nama": "Tidak normal, ", "type": "checkbox"  },
                        { "id": 114785, "nama": "Normal", "type": "checkbox"  },
                        { "id": 114786, "nama": "", "type": "textbox"  },
                        
                    ]
                },
                
            ]
            $scope.listCairan= [
                {
                    "id": 1, "nama": "IV cath",
                    "detail": [
                        { "id": 114787, "nama": "Ya ", "type": "checkbox"  },
                        { "id": 114788, "nama": "Tidak", "type": "checkbox"  },
                        
                    ]
                },
                {
                    "id": 1, "nama": "Tanggal Pemasangan",
                    "detail": [
                        { "id": 114789, "nama": "", "type": "datetime"},
                        
                    ]
                },
                {
                    "id": 1, "nama": "Lokasi",
                    "detail": [
                        { "id": 114790, "nama": "", "type": "textbox"  },
                    ]
                },
                {
                    "id": 1, "nama": "Balance cairan",
                    "detail": [
                        { "id": 114791, "nama": "", "type": "textbox"  },
                        
                    ]
                },
                {
                    "id": 1, "nama": "diuresis",
                    "detail": [
                        { "id": 114792, "nama": "", "type": "textbox"  },
                        
                    ]
                },
                {
                    "id": 1, "nama": "Intake (sebelumnya)",
                    "detail": [
                        { "id": 114793, "nama": "Infus", "type": "textbox2"  },
                        { "id": 114794, "nama": "Oral / NGT", "type": "textbox2"  },
                        { "id": 114795, "nama": "Medical Drip", "type": "textbox2"  },
                        
                    ]
                },
                {
                    "id": 1, "nama": "Output (sebelumnya)",
                    "detail": [
                        { "id": 114796, "nama": "Urine", "type": "textbox2"  },
                        { "id": 114797, "nama": "Drine", "type": "textbox2"  },                        
                    ]
                },
                {
                    "id": 1, "nama": "Terapi Cairan dalam 24 jam",
                    "detail": [
                        { "id": 114798, "nama": "Urine", "type": "textbox"  },                       
                    ]
                },
                
            ]
            $scope.listKebutuhanEdukasi= [
                {
                    "id": 1, "nama": "",
                    "detail": [
                        { "id": 114799, "nama": "Ya, ", "type": "checkbox"  },
                        { "id": 114800, "nama": "Tidak", "type": "checkbox"  },
                        { "id": 114801, "nama": "Sebutkan ", "type": "textbox"  },
                        
                    ]
                }
                
            ]
            $scope.listKebutuhanPerencanaan= [
                {
                    "id": 1, "nama": "a. Pemenuhan Kebutuhan Nutrisi",
                    "detail": [
                        { "id": 114802, "nama": "Mandiri", "type": "checkbox"  },
                        { "id": 114803, "nama": "Bantuan", "type": "checkbox"  },
                        
                    ]
                },
                {
                    "id": 1, "nama": "b. Pemenuhan kebutuhan mobilitas fisik",
                    "detail": [
                        { "id": 114804, "nama": "Mandiri", "type": "checkbox"  },
                        { "id": 114805, "nama": "Bantuan", "type": "checkbox"  },
                        
                    ]
                },
                {
                    "id": 1, "nama": "c. Istirahat dan Tidur",
                    "detail": [
                        { "id": 114806, "nama": "Mandiri", "type": "checkbox"  },
                        { "id": 114807, "nama": "Bantuan", "type": "checkbox"  },
                        
                    ]
                },
                {
                    "id": 1, "nama": "d. Pemenuhan kebutuhan eliminasi",
                    "detail": [
                        { "id": 114808, "nama": "Mandiri", "type": "checkbox"  },
                        { "id": 114809, "nama": "Bantuan", "type": "checkbox"  },
                        
                    ]
                }
                
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
                $scope.item.obj2 = []
                // $scope.item.obj[113121]=$scope.now
                $scope.item.obj[114812]=$scope.now
                $scope.item.obj[114813] = { value:peagawaiLogin.id,text:peagawaiLogin.namaLengkap}
                dataLoad = dat.data.data
                medifirstService.get("emr/get-vital-sign?noregistrasi=" + $scope.cc.noregistrasi + "&objectidawal=4241&objectidakhir=4246&idemr=147", true).then(function (datas) {
                    if (datas.data.data.length>0){
                        if ($scope.item.obj[111061]== undefined) {
                            $scope.item.obj[111061]=datas.data.data[0].value
                        }
                        if ($scope.item.obj[111062]== undefined) {
                            $scope.item.obj[111062]=datas.data.data[3].value
                        }
                        if ($scope.item.obj[111063]==undefined) {
                            $scope.item.obj[111063]=datas.data.data[4].value
                        }
                        if ($scope.item.obj[111064]==undefined) {
                            $scope.item.obj[111064]=datas.data.data[5].value
                        }

                    }
                })
                for (var i = 0; i <= dataLoad.length - 1; i++) {
                    if (parseFloat($scope.cc.emrfk) == dataLoad[i].emrfk) {

                        if (dataLoad[i].type == "textbox") {
                            $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                            if (dataLoad[i].emrdfk ==  '114578')
                                $scope.totalSkorAses =parseFloat( dataLoad[i].value)
                            if (dataLoad[i].emrdfk=='114579') 
                                $scope.totalSkorAses2 =parseFloat( dataLoad[i].value)
                            if (dataLoad[i].emrdfk=='114605') 
                                $scope.totalSkor4 =parseFloat( dataLoad[i].value)
                            if (dataLoad[i].emrdfk=='114620') 
                                $scope.totalSkor5 =parseFloat( dataLoad[i].value)

                               
                        }
                        if (dataLoad[i].type == "checkbox") {
                            chekedd = false
                            if (dataLoad[i].value == '1') {
                                chekedd = true
                            }
                            $scope.item.obj[dataLoad[i].emrdfk] = chekedd
                            // if (dataLoad[i].emrdfk >= 14464 && dataLoad[i].emrdfk <= 14469 && chekedd) {
                            //     $scope.getSkalaNyeri(1, { descNilai: dataLoad[i].reportdisplay })
                            // }
                            // if (dataLoad[i].emrdfk >= 5053 && dataLoad[i].emrdfk <= 5084 && dataLoad[i].reportdisplay != null) {
                            //     var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                            //     $scope.getSkor2(datass)
                            // }
                            // if (dataLoad[i].emrdfk >= 14424 && dataLoad[i].emrdfk <= 14431 && dataLoad[i].reportdisplay != null) {
                            //     var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                            //     $scope.getSkorGizi(datass)
                            // }
                            if (dataLoad[i].emrdfk >= 114624 && dataLoad[i].emrdfk <= 114632 && dataLoad[i].reportdisplay != null) {
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
                            if(str != undefined){
                                var res = str.split("~");
                                // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
                                $scope.item.obj[dataLoad[i].emrdfk] = { value: res[0], text: res[1] }        
                            }

                        }
                        // pegawaiInputDetail = dataLoad[i].pegawaifk
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
            $scope.$watch('item.obj[114645]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai == 0) {
                    $scope.item.obj[114641] = true
                    $scope.item.obj[114642] = false
                    $scope.item.obj[114643] = false
                    $scope.item.obj[114644] = false
                }
               if (nilai >= 1 && nilai <= 3) {
                    $scope.item.obj[114641] = false
                    $scope.item.obj[114642] = true   
                    $scope.item.obj[114643] = false
                    $scope.item.obj[114644] = false
                }
                if (nilai >= 4 && nilai <= 6) {
                    $scope.item.obj[114641] = false
                    $scope.item.obj[114642] = false
                    $scope.item.obj[114643] = true
                    $scope.item.obj[114644] = false
                }
                if (nilai >= 7 && nilai <= 10) {
                    $scope.item.obj[114641] = false
                    $scope.item.obj[114642] = false
                    $scope.item.obj[114643] = false
                    $scope.item.obj[114644] = true
                }
            });
            
            $scope.$watch('item.obj[113143]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[113143] !=null && $scope.item.obj[113145]==undefined && $scope.item.obj[113146]==undefined
                        && $scope.item.obj[113147]==undefined && $scope.item.obj[113148]==undefined && $scope.item.obj[113149]==undefined){
                          $scope.item.obj[113145] = "-"
                          $scope.item.obj[113146] = "-"
                          $scope.item.obj[113147] = "-"
                          $scope.item.obj[113148] = "-"
                          $scope.item.obj[113149] = "-"

                      }
                      else{
                        $scope.item.obj[113145] = null
                        $scope.item.obj[113146] = null
                        $scope.item.obj[113147] = null
                        $scope.item.obj[113148] = null
                        $scope.item.obj[113149] = null
                    }
                       
                    }
                })
            $scope.$watch('item.obj[113134]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[113134] !=null && $scope.item.obj[113137]==undefined && $scope.item.obj[113137]==null){
                          $scope.item.obj[113137] = "-"
                      }
                      else
                        $scope.item.obj[113137] = null
                       
                    }
                })
            $scope.$watch('item.obj[113135]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[113135] !=null && $scope.item.obj[113137]==undefined && $scope.item.obj[113137]==null){
                          $scope.item.obj[113137] = "-"
                      }
                      else
                        $scope.item.obj[113137] = null
                       
                    }
                })
            $scope.$watch('item.obj[113122]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[113122] !=null && $scope.item.obj[113125]==undefined && $scope.item.obj[113125]==null){
                          $scope.item.obj[113125] = "-"
                      }
                      else
                        $scope.item.obj[113125] = null
                       
                    }
                })
            $scope.$watch('item.obj[113123]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[113123] !=null && $scope.item.obj[113125]==undefined && $scope.item.obj[113125]==null) {
                          $scope.item.obj[113125] = "-"
                      }
                      else
                      $scope.item.obj[113125] = null
                       
                    }
                })
            $scope.$watch('item.obj[113090]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[113090] !=null && $scope.item.obj[113089]==undefined){
                          $scope.item.obj[113089] =$scope.now
                      }
                       
                    }
                })
            $scope.$watch('item.obj[113094]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[113094] !=null && $scope.item.obj[113093]==undefined){
                          $scope.item.obj[113093] =$scope.now
                      }
                       
                    }
                })
            $scope.$watch('item.obj[113098]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[113098] !=null && $scope.item.obj[113097]==undefined){
                          $scope.item.obj[113097] =$scope.now
                      }
                       
                    }
                })
            $scope.$watch('item.obj[113102]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[113102] !=null && $scope.item.obj[113101]==undefined){
                          $scope.item.obj[113101] =$scope.now
                      }
                       
                    }
                })
            $scope.$watch('item.obj[113106]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[113106] !=null && $scope.item.obj[113105]==undefined){
                          $scope.item.obj[113105] =$scope.now
                      }
                       
                    }
                })
            $scope.$watch('item.obj[113110]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[113110] !=null && $scope.item.obj[113109]==undefined){
                          $scope.item.obj[113109] =$scope.now
                      }
                       
                    }
                })
            $scope.$watch('item.obj[113114]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[113114] !=null && $scope.item.obj[113113]==undefined){
                          $scope.item.obj[113113] =$scope.now
                      }
                       
                    }
                })
            $scope.$watch('item.obj[113118]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[113118] !=null && $scope.item.obj[113117]==undefined){
                          $scope.item.obj[113117] =$scope.now
                      }
                       
                    }
                })

            $scope.$watch('item.obj[114605]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai >=7 && nilai <=11 ) {
                    $scope.item.obj[114603] = true
                    $scope.item.obj[114604] = false
                   
                }
                if (nilai >= 12) {
                    $scope.item.obj[114603] = false
                    $scope.item.obj[114604] = true
                 
                }
                
            })
            $scope.$watch('item.obj[114620]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai ==0 && nilai <=24 ) {
                    $scope.item.obj[114621] = true
                    $scope.item.obj[114622] = false
                    $scope.item.obj[114623] = false
                   
                }
                if (nilai >= 25 && nilai <=44) {
                    $scope.item.obj[114621] = false
                    $scope.item.obj[114622] = true
                    $scope.item.obj[114623] = false
                 
                }
                if (nilai >= 45) {
                    $scope.item.obj[114621] = false
                    $scope.item.obj[114622] = false
                    $scope.item.obj[114623] = true
                 
                }
                
            })
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
                $scope.item.obj[114633] = $scope.skorNutrisi
            }

            
                

            $scope.getSkalaNyeri = function (data, stat) {
                $scope.activeStatus = stat.descNilai
                var nilai = stat.descNilai
                if (nilai >= 0 && nilai <= 1) {
                    $scope.item.obj[114647] = true
                    $scope.item.obj[114648] = false
                    $scope.item.obj[114649] = false
                    $scope.item.obj[114650] = false
                    $scope.item.obj[114651] = false
                    $scope.item.obj[114652] = false
                }
                if (nilai >= 2 && nilai <= 3) {
                    $scope.item.obj[114647] = false
                    $scope.item.obj[114648] = true
                    $scope.item.obj[114649] = false
                    $scope.item.obj[114650] = false
                    $scope.item.obj[114651] = false
                    $scope.item.obj[114652] = false
                }
                if (nilai >= 4 && nilai <= 5) {
                    $scope.item.obj[114647] = false
                    $scope.item.obj[114648] = false
                    $scope.item.obj[114649] = true
                    $scope.item.obj[114650] = false
                    $scope.item.obj[114651] = false
                    $scope.item.obj[114652] = false
                }
                if (nilai >= 6 && nilai <= 7) {
                    $scope.item.obj[114647] = false
                    $scope.item.obj[114648] = false
                    $scope.item.obj[114649] = false
                    $scope.item.obj[114650] = true
                    $scope.item.obj[114651] = false
                    $scope.item.obj[114652] = false
                }
                if (nilai >= 8 && nilai <= 9) {
                    $scope.item.obj[114647] = false
                    $scope.item.obj[114648] = false
                    $scope.item.obj[114649] = false
                    $scope.item.obj[114650] = false
                    $scope.item.obj[114651] = true
                    $scope.item.obj[114652] = false
                }

                if (nilai == 10) {
                    $scope.item.obj[114647] = false
                    $scope.item.obj[114648] = false
                    $scope.item.obj[114649] = false
                    $scope.item.obj[114650] = false
                    $scope.item.obj[114651] = false
                    $scope.item.obj[114652] = true
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
                $scope.item.obj[114605] = $scope.totalSkor4
            }
            $scope.getSkor5 = function (stat) {

                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if (arrobj[i] == stat.id) {
                        if ($scope.item.obj[parseFloat(arrobj[i])] == true) {
                            $scope.totalSkor5 = $scope.totalSkor5 + parseFloat(stat.descNilai)
                            break
                        } else {
                            $scope.totalSkor5 = $scope.totalSkor5 - parseFloat(stat.descNilai)
                            break
                        }


                    } else {

                    }
                }
                $scope.item.obj[114620] = $scope.totalSkor5
            }
            $scope.totalSkorAses =0
            $scope.totalSkorAses2 =0
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
                $scope.item.obj[114578] = $scope.totalSkorAses 
                $scope.item.obj[114579] = $scope.totalSkorAses2 
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
                $scope.item.obj[111129] = $scope.skorGizi
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
                // if( $scope.cc.norec_emr !='-' && pegawaiInputDetail !='' && pegawaiInputDetail !=null){
                //     if(pegawaiInputDetail != medifirstService.getPegawaiLogin().id){
                //         toastr.warning('Hanya Bisa melihat data','Peringatan')
                //         return
                //     }
                // }
                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if ($scope.item.obj[parseInt(arrobj[i])] instanceof Date)
                        $scope.item.obj[parseInt(arrobj[i])] = moment($scope.item.obj[parseInt(arrobj[i])]).format('YYYY-MM-DD HH:mm')
                     // $scope.item.obj[parseInt(arrobj[i])] = moment($scope.item.obj[parseInt(arrobj[i])]).format('HH:mm')
                    arrSave.push({ id: arrobj[i], values: $scope.item.obj[parseInt(arrobj[i])] })
                }
                $scope.cc.jenisemr = 'umum'
                var jsonSave = {
                    head: $scope.cc,
                    data: arrSave
                }
                medifirstService.post('emr/save-emr-dinamis', jsonSave).then(function (e) {
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,  
                   'Asesmen Keperawatan Inap Non Psikiatri ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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