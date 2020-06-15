define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AsesmenPerawatJiwaDewasaCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.totalSkor4 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 442
            var dataLoad = []
            var pegawaiInputDetail= ''
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
            })
             medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 442).then(function (e) {

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
                    "id": 1, "nama": "Rujukan",
                    "detail": [
                        { "id": 111057, "nama": "Ya, dari :", "type": "checkbox" },
                        { "id": 111058, "nama": "", "type": "textbox" },
                        { "id": 111059, "nama": "Datang, sendiri, diantar :", "type": "checkbox" },
                        { "id": 111060, "nama": "", "type": "textbox" },
                    ]
                },
            ]
            $scope.listNyeri = [{
                "id": 1, "nama": "Apakah ada nyeri :",
                "detail": [
                    { "id": 111244, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 111245, "nama": "Ya ", "type": "checkbox" },
                    
                ]
            }
            ]
            $scope.listNyeri3 = [{
                "id": 1, "nama": "Jelaskan :",
                "detail": [
                    { "id": 111246, "nama": "Pencetus ", "type": "textbox" },

                    { "id": 111247, "nama": "Kualitas ", "type": "textbox" },
                    { "id": 111248, "nama": "Lokasi ", "type": "textbox" },
                    { "id": 111249, "nama": "Skala ", "type": "textbox" },
                    { "id": 111250, "nama": "Durasi ", "type": "textbox" },
                    
                ]
            }
            ]
            $scope.listPartus = [
            {
                "id": 1, "nama": "B. Keluhan Utama :",
                "detail": [
                    { "id": 111225, "nama": "Spontan ", "type": "textarea" },
                ]
            },
            {
                "id": 1, "nama": "C. Riwayat Penyakit Dahulu",
                "detail": [
                    { "id": 111226, "nama": "Spontan ", "type": "textarea" },
                ]
            },
            {
                "id": 1, "nama": "D. Riwayat Penyakit Sekarang",
                "detail": [
                    { "id": 111227, "nama": "Spontan ", "type": "textarea" },
                ]
            },
            {
                "id": 2, "nama": "E. Riwayat Alergi",
                "detail": [
                    { "id": 111228, "nama": "Ada, ", "type": "checkbox" },

                    { "id": 111229, "nama": "Tidak Ada ", "type": "checkbox" },
                    { "id": 111230, "nama": "Bila ada Jelaskan : ", "type": "textbox" },
                ]
            }
            ]
            $scope.listTKA1 = [{
                "id": 1, "nama": "Imunisasi :",
                "detail": [
                    { "id": 111075, "nama": "Lengkap ", "type": "checkbox" },

                    { "id": 111076, "nama": "Tidak Lengkap ", "type": "checkbox" },
                    { "id": 111077, "nama": "Jelaskan  : ", "type": "textbox" },
                ]
            }
            ]
            $scope.listTKA2 = [{
                "id": 1, "nama": "Kelainan Bawaan :",
                "detail": [
                    { "id": 111081, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 111082, "nama": "Ya ", "type": "checkbox" },
                    { "id": 111083, "nama": "Jelaskan  : ", "type": "textbox" },
                ]
            }
            ]
            $scope.listTKA3 = [{
                "id": 1, "nama": "Penyakit yang pernah di derita :",
                "detail": [
                    { "id": 111084, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 111085, "nama": "Ya ", "type": "checkbox" },
                    { "id": 111086, "nama": "Jelaskan  : ", "type": "textbox" },
                ]
            }
            ]
            $scope.listTKA4 = [{
                "id": 1, "nama": "Pernah dirawat di RS:",
                "detail": [
                    { "id": 111087, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 111088, "nama": "Ya ", "type": "checkbox" },
                    { "id": 111089, "nama": "Jelaskan  : ", "type": "textbox" },
                ]
            }
            ]
            $scope.listTKA5 = [{
                "id": 1, "nama": "Penurunan prestasi sekolah :",
                "detail": [
                    { "id": 111090, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 111091, "nama": "Ya ", "type": "checkbox" },
                    { "id": 111092, "nama": "Jelaskan  : ", "type": "textbox" },
                ]
            }
            ]
            $scope.listTKA6 = [{
                "id": 1, "nama": "Riwayat Aniaya :",
                "detail": [
                    { "id": 111093, "nama": "Tidak ", "type": "checkbox" },

                    // { "id": 14383, "nama": "Ya : ", "type": "checkbox" },
                ]
            }
            ]
            $scope.listYa = [{
                "id": 1, "nama": "Riwayat Aniaya :",
                "detail": [
                    
                    { "id": 111094, "nama": "Fisik ", "type": "checkbox" },
                    { "id": 111095, "nama": "Sexual ", "type": "checkbox" },
                    { "id": 111096, "nama": "Penolakan ", "type": "checkbox" },
                    { "id": 111097, "nama": "KDRT ", "type": "checkbox" },
                    { "id": 111098, "nama": "Kriminal ", "type": "checkbox" },
                    { "id": 111099, "nama": "Lainnya ", "type": "checkbox" },
                ]
            }
            ]



            $scope.listStatusAnak = [{
                "id": 1, "nama": "Status Anak :",
                "detail": [
                    { "id": 111078, "nama": "Anak Kandung ", "type": "checkbox" },

                    { "id": 111079, "nama": "Anak Tiri ", "type": "checkbox" },
                    { "id": 111080, "nama": "Anak Angkat", "type": "checkbox" },
                ]
            }
            ]
            $scope.listPendidikan = [{
                "id": 1, "nama": "Pendidikan:",
                "detail": [
                    { "id": 111109, "nama": "Belum Sekolah", "type": "checkbox" },
                    { "id": 111110, "nama": "Sudah Sekolah", "type": "checkbox" },
                    { "id": 111111, "nama": "Jelaskan", "type": "textbox" },
                ]
            }
            ]
            $scope.listBahasa = [{
                "id": 1, "nama": "Bahasa yang digunakan:",
                "detail": [
                    // { "id": 14398, "nama": "Indonesia", "type": "checkbox" },
                    // { "id": 14399, "nama": "Daerah ", "type": "checkbox" },
                    // { "id": 14400, "nama": "Jawa ", "type": "checkbox" },
                    // { "id": 14401, "nama": "Lainnya : ", "type": "checkbox" },
                    { "id": 111100, "nama": "", "type": "textbox" },
                ]
            }
            ]
            $scope.listPenerjemah = [{
                "id": 1, "nama": "  Perlu Penerjemah:",
                "detail": [
                    { "id": 111101, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 111102, "nama": "Ya ", "type": "checkbox" },
                    { "id": 111103, "nama": "Jelaskan  : ", "type": "textbox" },
                ]
            }
            ]
            $scope.listAgama = [{
                "id": 1, "nama": "Agama:",
                "detail": [
                    { "id": 111104, "nama": "Islam", "type": "checkbox" },
                    { "id": 111105, "nama": "Kristen ", "type": "checkbox" },
                    { "id": 111106, "nama": "Khatolik ", "type": "checkbox" },
                    { "id": 111107, "nama": "Budha : ", "type": "checkbox" },
                    { "id": 111108, "nama": "Hindu", "type": "checkbox" },
                ]
            }
            ]
            $scope.listRumah = [{
                "id": 1, "nama": "Rumah Orang Tua:",
                "detail": [
                    { "id": 111112, "nama": "Rumah Sendiri ", "type": "checkbox" },
                    { "id": 111113, "nama": "Sewa/Kontrak ", "type": "checkbox" },
                    { "id": 111114, "nama": "Lainnya  : ", "type": "textbox" },
                ]
            }
            ]
            $scope.listPekerjaanOT = [{
                "id": 1, "nama": "Pekerjaan Orang Tua:",
                "detail": [
                    { "id": 111115, "nama": "PNS/TNI/POLRI", "type": "checkbox" },
                    { "id": 111116, "nama": "Swasta", "type": "checkbox" },
                    { "id": 111117, "nama": "Lainnya", "type": "textbox" },
                    
                    
                ]
            }
            ]
            $scope.listKonsep = [
            {
                "id": 1, "nama": "",
                "detail": [
                    { "id": 111290, "nama": "Takut terhadap terapi / tindakan lingkungan ", "type": "checkbox" },
                    { "id": 111291, "nama": "Cemas", "type": "checkbox" },
                    { "id": 111292, "nama": "Marah / tegang", "type": "checkbox" },
                    { "id": 111293, "nama": "Sedih", "type": "checkbox" },
                    { "id": 111294, "nama": "Menangis", "type": "checkbox" },
                    { "id": 111295, "nama": "Senang", "type": "checkbox" },
                    { "id": 111296, "nama": "Tidak mampu menahan diri", "type": "checkbox" },
                    { "id": 111297, "nama": "Rendah diri", "type": "checkbox" },
                    { "id": 111298, "nama": "Gelisah", "type": "checkbox" },
                    { "id": 111299, "nama": "Tenang", "type": "checkbox" },
                    { "id": 111300, "nama": "Mudah tersinggung", "type": "checkbox" },

                                       
                ]
            }
            ]
            $scope.listSosial = [
            {
                "id": 1, "nama": "Pasien tinggl di :",
                "detail": [
                    { "id": 111301, "nama": "Rumah sendiri ", "type": "checkbox" },
                    { "id": 111302, "nama": "Rumah orang tua", "type": "checkbox" },
                    { "id": 111303, "nama": "Kos / kontrak", "type": "checkbox" },
                    { "id": 111304, "nama": "Lainnya", "type": "checkbox" },
                    { "id": 111305, "nama": "", "type": "textbox" },
                   
                                       
                ]
            },
            {
                "id": 1, "nama": "Bantuan yang dibutuhkan pasien di Rumah :",
                "detail": [
                    { "id": 111306, "nama": "Mandi ", "type": "checkbox" },
                    { "id": 111307, "nama": "BAK/BAB", "type": "checkbox" },
                    { "id": 111308, "nama": "Makan", "type": "checkbox" },
                    { "id": 111309, "nama": "Berjalan ambulasi", "type": "checkbox" },
                    { "id": 111310, "nama": "Perawatan Luka", "type": "checkbox" },
                    { "id": 111311, "nama": "Pemberian Obat", "type": "checkbox" },
                    
                   
                                       
                ]
            },
            {
                "id": 1, "nama": "Keluarga yang membantu dirumah :",
                "detail": [
                    { "id": 111312, "nama": "Mandi ", "type": "textarea" },
                    
                    
                   
                                       
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



            $scope.listHendaya = [
                { id: 14502, nama: 'Takut terhadap terapi/ tindakan/ lingkungan' },
                { id: 14503, nama: 'Sedih' },
                { id: 14504, nama: 'Menangis' },
                { id: 14505, nama: 'Rendah diri' },
                { id: 14506, nama: 'Gelisah' },
                { id: 14507, nama: 'Mudah tersinggung' },
            ]
            $scope.listHendaya2 = [
                { id: 14508, nama: 'Cemas' },
                { id: 14509, nama: 'Marah/Tegang' },
                { id: 14510, nama: 'Senang' },
                { id: 14511, nama: 'Tenang' },
                { id: 14512, nama: 'Tidak mampu menahan diri' },
            ]
            
            
            $scope.listHendaya3 = [
                { id: 14513, nama: 'Tuna Rungu' },
                { id: 14514, nama: 'Tuna wicara' },
                { id: 14515, nama: 'Tuna Netra' },
                
                
            ]
            $scope.listHendaya4 = [
                { id: 14516, nama: 'Mandi' },
                { id: 14517, nama: 'Berjalan Ambulasi' },
                { id: 14518, nama: 'BAK/BAB' },
                { id: 14519, nama: 'Perawatan Luka' },
                { id: 14520, nama: 'Makan' },
                { id: 14521, nama: 'Pemberian Obat' },
                
                
            ]

            $scope.listRiwayatKesehatan = [
                {
                    "id": 1, "nama": "Pernah Mengalami Gangguan Jiwa",
                    "detail": [
                        { "id": 5019, "nama": "Tidak", "type": "checkbox" },
                        { "id": 5020, "nama": "Ya, Jelaskan", "type": "checkbox" },
                        { "id": 5021, "nama": "", "type": "textbox" },
                    ]
                },
                {
                    "id": 2, "nama": "Jika Ya, pengobatan sebelumnya ?",
                    "detail": [
                        { "id": 5022, "nama": "Berhasil", "type": "checkbox" },
                        { "id": 5023, "nama": "Kurang Berhasil", "type": "checkbox" },
                        { "id": 5024, "nama": "Tidak Berhasil", "type": "checkbox" },

                    ]
                },
                {
                    "id": 3, "nama": "Riwayat Merokok",
                    "detail": [
                        { "id": 5025, "nama": "Tidak", "type": "checkbox" },
                        { "id": 5026, "nama": "Ya", "type": "checkbox" },
                    ]
                },
                {
                    "id": 4, "nama": "Aniaya",
                    "detail": [
                        { "id": 5027, "nama": "Fisik", "type": "checkbox" },
                        { "id": 5028, "nama": "Sexual", "type": "checkbox" },
                        { "id": 5029, "nama": "Penolakan", "type": "checkbox" },
                        { "id": 5030, "nama": "KDRT", "type": "checkbox" },
                        { "id": 5031, "nama": "Kriminal", "type": "checkbox" },
                    ]
                },
                {
                    "id": 5, "nama": "Keluarga Mengalamin Gangguan Jiwa",
                    "detail": [
                        { "id": 5032, "nama": "Tidak", "type": "checkbox" },
                        { "id": 5033, "nama": "Ada , jelaskan :", "type": "checkbox" },
                        { "id": 5034, "nama": "Ada , jelaskan :", "type": "textbox" },
                    ]
                },
                {
                    "id": 6, "nama": "Riwayat Alergi",
                    "detail": [
                        { "id": 5035, "nama": "Tidak", "type": "checkbox" },
                        { "id": 5036, "nama": "Ada , jelaskan :", "type": "checkbox" },
                        { "id": 5037, "nama": "Ada , jelaskan :", "type": "textbox" },
                    ]
                },
                {
                    "id": 7, "nama": "Keluhan Nyeri ",
                    "detail": [
                        { "id": 5038, "nama": "Tidak Ada", "type": "checkbox" },
                        { "id": 5039, "nama": "Ada , lokasi :", "type": "checkbox" },
                        { "id": 5040, "nama": "Ada , jelaskan :", "type": "textbox" },
                    ]
                },
            ]
            $scope.listSkorNRC = [{
                "id": 8, "nama": "Score ",
                "detail": [
                    { "id": 111257, "nama": "0 = Tidak Nyeri", "type": "checkbox"},
                    { "id": 111258, "nama": "1 - 3 = Nyeri Ringan", "type": "checkbox" },
                    { "id": 111259, "nama": "4 - 6 = Nyeri Sedang", "type": "checkbox" },
                    { "id": 111260, "nama": "7 - 10 = Nyeri Berat", "type": "checkbox"},
                ]
            }]
            $scope.listSkorWong = [{
                "id": 9, "nama": "Score ",
                "detail": [
                    { "id": 111267, "nama": "0 - 1= Tidak Ada Nyeri", "type": "checkbox"},
                    { "id": 111268, "nama": "2 - 3= Sedikit Nyeri", "type": "checkbox"},
                    { "id": 111269, "nama": "4 - 5= Cukup Nyeri", "type": "checkbox"},
                    { "id": 111270, "nama": "6 - 7= Lumayan Nyeri", "type": "checkbox"},
                    { "id": 111271, "nama": "8 - 9= Sangat Nyeri", "type": "checkbox"},
                    { "id": 111272, "nama": "10= Amat Sangat Nyeri", "type": "checkbox"},
                ]
            }]
            $scope.listNyeriAnak = [
                {
                    "id": 10, "nama": "Hurts", "detail": [
                    { "id": 111261, "nama": "No Hurt", "descNilai": 0 },
                    { "id": 111262, "nama": "Hurts Little Bit", "descNilai": 2 }, 
                    { "id": 111263, "nama": "Hurts Little More", "descNilai": 4 },
                    { "id": 111264, "nama": "Hurts Even More", "descNilai": 6 }, 
                    { "id": 111265, "nama": "Hurts Whole Lot", "descNilai": 8 },
                    { "id": 111266, "nama": "Hurts whorts", "descNilai": 10 }]
                }
            ]
            $scope.listHumpty = [

                {
                    "id": 1, "nama": "Riwayat Jatuh yang baru/dalam 3 Bulan terakhir",
                    "detail": [
                        { "id": 111273, "nama": "Tidak", "descNilai": "0" },
                        { "id": 111274, "nama": "Ya", "descNilai": "25" },
                    ]
                },

                {
                    "id": 2, "nama": "Diagnosa Medis Sekunder > 1",
                    "detail": [
                        { "id": 111275, "nama": "Tidak", "descNilai": "0" },
                        { "id": 111276, "nama": "Ya", "descNilai": "25" },
                    ]
                },
                {
                    "id": 3, "nama": "Alat Bantu",
                    "detail": [
                        { "id": 111277, "nama": "Bedrest dibantu Perawat", "descNilai": "0" },
                        { "id": 111278, "nama": "Penopang, tongkat / walker", "descNilai": "15" },
                        { "id": 111279, "nama": "Furniture", "descNilai": "25" },

                    ]
                },

                {
                    "id": 4, "nama": "Memakai terapi heparin lock/IV",
                    "detail": [
                        { "id": 111280, "nama": "Tidak", "descNilai": "0" },
                        { "id": 111281, "nama": "Ya", "descNilai": "25" },
                    ]
                    
                },

                {
                    "id": 5, "nama": "Cara berjalan / berpindah",
                    "detail": [
                        { "id": 111282, "nama": "Normal/bedrest/immobilisasi", "descNilai": "0" },
                        { "id": 111283, "nama": "Lemah", "descNilai": "15" },
                        { "id": 111284, "nama": "Terganggu", "descNilai": "30" },

                    ]
                },
                {
                    "id": 6, "nama": "Status Mental",
                    "detail": [
                        { "id": 111285, "nama": "Orientasi sesuai kemampuan diri", "descNilai": "0" },
                        { "id": 111286, "nama": "Lupa keterbatasan diri", "descNilai": "15" }


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
                        { "id": 111231, "nama": "a. Tidak ada penurunan berat badan", "descNilai": "0" },
                        { "id": 111232, "nama": "b. Tidak yakin / tidak tahu / terasa baju lebih longgar", "descNilai": "2" },
                        { "id": 111233, "nama": "c. Penurunan : > 1 - 5 kg", "descNilai": "1" },
                        { "id": 111234, "nama": "               > 6 - 10 kg", "descNilai": "2" },
                        { "id": 111235, "nama": "               > 11 - 15 kg", "descNilai": "3" },
                        { "id": 111236, "nama": "               > 15 kg", "descNilai": "4" },
                        { "id": 111237, "nama": "  Tidak tahu berapa penurunan berat badan", "descNilai": "2" },
                    ]
                },
                {
                    "id": 2, "nama": "Asupan Makan Berkurang karena tidak nafsu makan",
                    "detail": [
                        { "id": 111238, "nama": "a. Tidak", "descNilai": "0" },
                        { "id": 111239, "nama": "b. Ya", "descNilai": "1" }
                    ]
                },
            ]
            $scope.listPasienDiagKhusus = [{
                "id": 1, "nama": "Pasien dengan diagnosa khusus :",
                "detail": [
                    { "id": 111253, "nama": "Tidak", "type": "checkbox" },
                    { "id": 111254, "nama": "Ya, sebutkan", "type": "checkbox" },
                    { "id": 111255, "nama": "", "type": "textbox" },
                ]
            },
            {
                "id": 2, "nama": "Dilaporkan ke Dokter Bila skor >= 2 dan atau pasien dengan diagnosis / kondisi khusus :",
                "detail": [
                    { "id": 111241, "nama": "Tidak", "type": "checkbox" },
                    { "id": 111242, "nama": "Ya, pukul", "type": "checkbox" },
                    { "id": 111243, "nama": "", "type": "textbox" },
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


            $scope.listBarthel = [
                {
                    "id": 1, "nama": "Mengendalikan Rangsang delekasi",
                    "detail": [
                        {
                            "id": 1, "nama": "Tidak terkendali tak teratur (perlu bantuan)", "descNilai": "0", "ket": 1,
                            "detail": [{ id: 5136 }, { id: 5137 }]
                        },
                        {
                            "id": 2, "nama": "Kadang-kadang tak terkendali", "descNilai": "1", "ket": 1,
                            "detail": [{ id: 5138 }, { id: 5139 }]
                        },
                        {
                            "id": 3, "nama": "Mandiri", "descNilai": "2", "ket": 1,
                            "detail": [{ id: 5140 }, { id: 5141 }]
                        },
                    ]
                },
                {
                    "id": 2, "nama": "Mengendalikan Rangsang berkemih",
                    "detail": [
                        { "id": 1, "nama": "Tak terkendali pakai kateter", "descNilai": "0", "detail": [{ id: 5142 }, { id: 5143 }] },
                        { "id": 2, "nama": "Kadang-kadang tak terkendali (1x24 jam)", "descNilai": "1", "detail": [{ id: 5144 }, { id: 5145 }] },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2", "detail": [{ id: 5146 }, { id: 5147 }] },
                    ]
                },
                {
                    "id": 3, "nama": "Membersihkan diri ( cuci muka, sisir rambur, sikat gigi)",
                    "detail": [
                        { "id": 1, "nama": "Butuh pertolongan orang lain", "descNilai": "0", "detail": [{ id: 5148 }, { id: 5149 }] },
                        { "id": 2, "nama": "Mandiri", "descNilai": "1", "detail": [{ id: 5150 }, { id: 5151 }] },
                    ]
                },
                {
                    "id": 4, "nama": "Penggunaan jamban (masuk, keluar)",
                    "detail": [
                        { "id": 1, "nama": "Tergantung pertolongan orang lain", "descNilai": "0", "detail": [{ id: 5152 }, { id: 5153 }] },
                        {
                            "id": 2, "nama": "Perlu pertolongan beberapa kegiatan tetapi dapat mengerjakan sendiri pada kegiatan yang lain", "descNilai": "1",
                            "detail": [{ id: 5154 }, { id: 5155 }]
                        },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2", "detail": [{ id: 5156 }, { id: 5157 }] },
                    ]
                },
                {
                    "id": 5, "nama": "Makan",
                    "detail": [
                        { "id": 1, "nama": "Tidak mampu", "descNilai": "0", "detail": [{ id: 5158 }, { id: 5159 }] },
                        { "id": 2, "nama": "Perlu ditolong  memotong makanan", "descNilai": "1", "detail": [{ id: 5160 }, { id: 5161 }] },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2", "detail": [{ id: 5162 }, { id: 5163 }] },
                    ]
                },
                {
                    "id": 6, "nama": "Berubah sikap dari berbaring ke duduk",
                    "detail": [
                        { "id": 1, "nama": "Perlu banyak bantuan untuk bisa duduk (2 org)", "descNilai": "0", "detail": [{ id: 5164 }, { id: 5165 }] },
                        { "id": 2, "nama": "Bantuan minimal 2 org", "descNilai": "1", "detail": [{ id: 5166 }, { id: 5167 }] },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2", "detail": [{ id: 5168 }, { id: 5169 }] },
                    ]
                },
                {
                    "id": 7, "nama": "Berpindah / berjalan",
                    "detail": [
                        { "id": 1, "nama": "Tidak mampu", "descNilai": "0", "detail": [{ id: 5170 }, { id: 5171 }] },
                        { "id": 2, "nama": "Bisa (pindah) dengan kursi ", "descNilai": "1", "detail": [{ id: 5172 }, { id: 5173 }] },
                        { "id": 3, "nama": "Berjalan dengan bantuan 1 orang", "descNilai": "2", "detail": [{ id: 5174 }, { id: 5175 }] },
                        { "id": 4, "nama": "Mandiri", "descNilai": "3", "detail": [{ id: 5176 }, { id: 5177 }] },
                    ]
                },
                {
                    "id": 8, "nama": "Memakai Baju",
                    "detail": [
                        { "id": 1, "nama": "Tergantung orang lain", "descNilai": "0", "detail": [{ id: 5178 }, { id: 5179 }] },
                        { "id": 2, "nama": "Sebagian dibantu (misal mengancingkan baju)", "descNilai": "1", "detail": [{ id: 5180 }, { id: 5181 }] },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2", "detail": [{ id: 5182 }, { id: 5183 }] },

                    ]
                },
                {
                    "id": 9, "nama": "Naik turun tangga ",
                    "detail": [
                        { "id": 1, "nama": "Tidak Mampu", "descNilai": "0", "detail": [{ id: 5184 }, { id: 5185 }] },
                        { "id": 2, "nama": "Butuh Pertolongan orang lain", "descNilai": "1", "detail": [{ id: 5186 }, { id: 5187 }] },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2", "detail": [{ id: 5188 }, { id: 5189 }] },
                    ]
                },
                {
                    "id": 10, "nama": "Mandi",
                    "detail": [
                        { "id": 1, "nama": "Tergantung orang lain ", "descNilai": "0", "detail": [{ id: 5190 }, { id: 5191 }] },
                        { "id": 2, "nama": "Mandiri", "descNilai": "1", "detail": [{ id: 5192 }, { id: 5193 }] },
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
                $scope.item.obj2 = []
                $scope.item.obj[111219]=$scope.cc.tglregistrasi
                $scope.item.obj[111220]=$scope.now
                // $scope.item.obj[14563]={ value: $scope.cc.iddpjp, text: $scope.cc.dokterdpjp }
                dataLoad = dat.data.data
                medifirstService.get("emr/get-vital-sign?noregistrasi=" + $scope.cc.noregistrasi + "&objectidawal=4241&objectidakhir=4246&idemr=147", true).then(function (datas) {
                    if (datas.data.data.length>0){
                        if ($scope.item.obj[111221]==undefined) {
                            $scope.item.obj[111221]=datas.data.data[0].value
                        }
                        if ($scope.item.obj[111222]==undefined) {
                            $scope.item.obj[111222]=datas.data.data[3].value
                        }
                        if ($scope.item.obj[111223]==undefined) {
                            $scope.item.obj[111223]=datas.data.data[4].value
                        }
                        if ($scope.item.obj[111224]==undefined) {
                            $scope.item.obj[111224]=datas.data.data[5].value
                        }

                    }
                })
                for (var i = 0; i <= dataLoad.length - 1; i++) {
                    if (parseFloat($scope.cc.emrfk) == dataLoad[i].emrfk) {

                        if (dataLoad[i].type == "textbox") {
                            $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                            if(dataLoad[i].emrdfk == 111472)
                                $scope.totalSkor4 = parseFloat(dataLoad[i].value)
                              if(dataLoad[i].emrdfk == 111240)
                                $scope.skorNutrisi = parseFloat(dataLoad[i].value)
                              if(dataLoad[i].emrdfk == 111129)
                                $scope.skorGizi = parseFloat(dataLoad[i].value)
                               
                        }
                        if (dataLoad[i].type == "checkbox") {
                            chekedd = false
                            if (dataLoad[i].value == '1') {
                                chekedd = true
                            }
                            $scope.item.obj[dataLoad[i].emrdfk] = chekedd
                            // if (dataLoad[i].emrdfk >= 14174 && dataLoad[i].emrdfk <= 14182 && dataLoad[i].reportdisplay != null) {
                            //     var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                            //     $scope.getSkorNutrisi(datass)
                            // }
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
            $scope.$watch('item.obj[111256]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai == 0) {
                    $scope.item.obj[111257] = true
                    $scope.item.obj[111258] = false
                    $scope.item.obj[111259] = false
                    $scope.item.obj[111260] = false
                }
               if (nilai >= 1 && nilai <= 3) {
                    $scope.item.obj[111257] = false
                    $scope.item.obj[111258] = true   
                    $scope.item.obj[111259] = false
                    $scope.item.obj[111260] = false
                }
                if (nilai >= 4 && nilai <= 6) {
                    $scope.item.obj[111257] = false
                    $scope.item.obj[111258] = false
                    $scope.item.obj[111259] = true
                    $scope.item.obj[111260] = false
                }
                if (nilai >= 7 && nilai <= 10) {
                    $scope.item.obj[111257] = false
                    $scope.item.obj[111258] = false
                    $scope.item.obj[111259] = false
                    $scope.item.obj[111260] = true
                }
            });
            $scope.$watch('item.obj[111314]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111314] !=null && $scope.item.obj[111313]==undefined){
                          $scope.item.obj[111313] =$scope.now
                      }
                       
                    }
                })
            $scope.$watch('item.obj[111318]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111318] !=null && $scope.item.obj[111317]==undefined){
                          $scope.item.obj[111317] =$scope.now
                      }
                       
                    }
                })
            $scope.$watch('item.obj[111322]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111322] !=null && $scope.item.obj[111321]==undefined){
                          $scope.item.obj[111321] =$scope.now
                      }
                       
                    }
                })
            $scope.$watch('item.obj[111326]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111326] !=null && $scope.item.obj[111325]==undefined){
                          $scope.item.obj[111325] =$scope.now
                      }
                       
                    }
                })
            $scope.$watch('item.obj[111330]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111330] !=null && $scope.item.obj[111329]==undefined){
                          $scope.item.obj[111329] =$scope.now
                      }
                       
                    }
                })
            $scope.$watch('item.obj[111334]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111334] !=null && $scope.item.obj[111333]==undefined){
                          $scope.item.obj[111333] =$scope.now
                      }
                       
                    }
                })
            $scope.$watch('item.obj[111338]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111338] !=null && $scope.item.obj[111337]==undefined){
                          $scope.item.obj[111337] =$scope.now
                      }
                       
                    }
                })
            $scope.$watch('item.obj[111342]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[111342] !=null && $scope.item.obj[111341]==undefined){
                          $scope.item.obj[111341] =$scope.now
                      }
                       
                    }
                })

            $scope.$watch('item.obj[111472]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai <=24 ) {
                    $scope.item.obj[111287] = true
                    $scope.item.obj[111288] = false
                    $scope.item.obj[111289] = false
                   
                }
                if (nilai >=25 && nilai <=50) {
                    $scope.item.obj[111287] = false
                    $scope.item.obj[111288] = true
                    $scope.item.obj[111289] = false
                 
                }
                if (nilai >= 51) {
                    $scope.item.obj[111287] = false
                    $scope.item.obj[111288] = false
                    $scope.item.obj[111289] = true
                 
                }
                
            })
            
                

            $scope.getSkalaNyeri = function (data, stat) {
                $scope.activeStatus = stat.descNilai
                var nilai = stat.descNilai
                if (nilai >= 0 && nilai <= 1) {
                    $scope.item.obj[111267] = true
                    $scope.item.obj[111268] = false
                    $scope.item.obj[111269] = false
                    $scope.item.obj[111270] = false
                    $scope.item.obj[111271] = false
                    $scope.item.obj[111272] = false
                }
                if (nilai >= 2 && nilai <= 3) {
                    $scope.item.obj[111267] = false
                    $scope.item.obj[111268] = true
                    $scope.item.obj[111269] = false
                    $scope.item.obj[111270] = false
                    $scope.item.obj[111271] = false
                    $scope.item.obj[111272] = false
                }
                if (nilai >= 4 && nilai <= 5) {
                    $scope.item.obj[111267] = false
                    $scope.item.obj[111268] = false
                    $scope.item.obj[111269] = true
                    $scope.item.obj[111270] = false
                    $scope.item.obj[111271] = false
                    $scope.item.obj[111272] = false
                }
                if (nilai >= 6 && nilai <= 7) {
                    $scope.item.obj[111267] = false
                    $scope.item.obj[111268] = false
                    $scope.item.obj[111269] = false
                    $scope.item.obj[111270] = true
                    $scope.item.obj[111271] = false
                    $scope.item.obj[111272] = false
                }
                if (nilai >= 8 && nilai <= 9) {
                    $scope.item.obj[111267] = false
                    $scope.item.obj[111268] = false
                    $scope.item.obj[111269] = false
                    $scope.item.obj[111270] = false
                    $scope.item.obj[111271] = true
                    $scope.item.obj[111272] = false
                }

                if (nilai == 10) {
                    $scope.item.obj[111267] = false
                    $scope.item.obj[111268] = false
                    $scope.item.obj[111269] = false
                    $scope.item.obj[111270] = false
                    $scope.item.obj[111271] = false
                    $scope.item.obj[111272] = true
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
                $scope.item.obj[111472] = $scope.totalSkor4
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
                $scope.item.obj[111129] = $scope.skorGizi
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
                $scope.item.obj[111240] = $scope.skorNutrisi
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
                   'Asesmen Keperawatan Jiwa Anak dan Remaja Rawat Jalan umum ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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