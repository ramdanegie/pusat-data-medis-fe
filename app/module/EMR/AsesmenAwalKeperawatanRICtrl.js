define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AsesmenAwalKeperawatanRICtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 174
            var dataLoad = []
            var pegawaiInputDetail =''
            var norecEMR = ''
            $scope.isCetak = true


            var cacheNomorEMR = cacheHelper.get('cacheNomorEMR');
            var cacheNoREC = cacheHelper.get('cacheNOREC_EMR');
            if(cacheNoREC!= undefined){
                norecEMR = cacheNomorEMR[1]
            }
            if (cacheNomorEMR != undefined) {
                nomorEMR = cacheNomorEMR[0]
                norecEMR = cacheNomorEMR[1]
                $scope.cc.norec_emr = nomorEMR
            }
            var HttpClient = function () {
                this.get = function (aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function () {
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open("GET", aUrl, true);
                    anHttpRequest.send(null);
                }
            }
            $scope.cetakPdf = function () {
                if (norecEMR == '') return
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/e-rekammedis?cetak-emr-asesmen-awal-perawat-inap&id=' + $scope.cc.nocm + '&emr=' + norecEMR + '&view=true', function (response) {
                    // do something with response
                });
            }
            medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 174).then(function (e) {

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
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
            })
            medifirstService.getPart('emr/get-datacombo-diagnosa-jiwa', true, true, 20).then(function (data) {
                $scope.listDiagnosa = data
             })
            $scope.listKeluhanFisik = [
                { id: 10412, nama: 'Tidak Ada' },
                { id: 10413, nama: 'Ada, jelaskan :' },
            ]
            $scope.listHendaya = [
                { id: 10414, nama: 'Tuna Rungu' },
                { id: 10415, nama: 'Tuna Wicara' },
                { id: 10416, nama: 'Tuna Netra' },
                { id: 10417, nama: 'Lainnya :' }
            ]
            $scope.listRisikoJatuh = [
                { id: 10418, nama: 'Tidak Risiko Jatuh , Skor : < 90' },
                { id: 10419, nama: 'Risiko Jatuh , Skor : >= 90' },
            ]
            $scope.listADL = [
                { id: 10420, nama: 'Mandiri' },
                { id: 10421, nama: 'Perlu Bantuan' },
                { id: 10422, nama: 'Bantuan Total' },

            ]


            $scope.listRiwayatKesehatan = [
                {
                    "id": 1, "nama": "Riwayat Alergi",
                    "detail": [
                        { "id": 10423, "nama": "Tidak", "type": "checkbox" },
                        { "id": 10424, "nama": "Ada , jelaskan :", "type": "checkbox" },
                        { "id": 10425, "nama": "Ada , jelaskan :", "type": "textbox" },
                        { "id": 102498, "nama": "Tidak Tahu", "type": "checkbox" },
                    ]
                },
                {
                    "id": 2, "nama": "Pernah Mengalami Gangguan Jiwa",
                    "detail": [
                        { "id": 10426, "nama": "Tidak", "type": "checkbox" },
                        { "id": 10427, "nama": "Ya, Jelaskan", "type": "checkbox" },
                        { "id": 10428, "nama": "", "type": "textbox" },
                        { "id": 102499, "nama": "Tidak Tahu", "type": "checkbox" },
                    ]
                },
                {
                    "id": 3, "nama": "Jika Ya, pengobatan sebelumnya ?",
                    "detail": [
                        { "id": 10429, "nama": "Berhasil", "type": "checkbox" },
                        { "id": 10430, "nama": "Kurang Berhasil", "type": "checkbox" },
                        { "id": 10431, "nama": "Tidak Berhasil", "type": "checkbox" },
                        { "id": 102500, "nama": "Tidak Tahu", "type": "checkbox" },


                    ]
                },
                {
                    "id": 4, "nama": "Riwayat Merokok",
                    "detail": [
                        { "id": 10432, "nama": "Tidak", "type": "checkbox" },
                        { "id": 10433, "nama": "Ya", "type": "checkbox" },
                        { "id": 102501, "nama": "Tidak Tahu", "type": "checkbox" },
                    ]
                },
                {
                    "id": 5, "nama": "Aniaya",
                    "detail": [
                        { "id": 10434, "nama": "Fisik", "type": "checkbox" },
                        { "id": 10435, "nama": "Sexual", "type": "checkbox" },
                        { "id": 10436, "nama": "Penolakan", "type": "checkbox" },
                        { "id": 10437, "nama": "KDRT", "type": "checkbox" },
                        { "id": 10438, "nama": "Kriminal", "type": "checkbox" },
                        { "id": 102502, "nama": "Tidak Tahu", "type": "checkbox" },
                    ]
                },
                {
                    "id": 6, "nama": "Keluarga Mengalamin Gangguan Jiwa",
                    "detail": [
                        { "id": 10439, "nama": "Tidak", "type": "checkbox" },
                        { "id": 10440, "nama": "Ada , jelaskan :", "type": "checkbox" },
                        { "id": 10441, "nama": "Ada , jelaskan :", "type": "textbox" },
                    ]
                },

                // {
                //     "id": 7, "nama": "Keluhan Nyeri ",
                //     "detail": [
                //         { "id": 10452, "nama": "Tidak Ada", "type": "checkbox" },
                //         { "id": 10453, "nama": "Ada , lokasi :", "type": "checkbox" },
                //         { "id": 10454, "nama": "Ada , jelaskan :", "type": "textbox" },
                //     ]
                // },
            ]
            $scope.listKeluhanNyeri = [
                {
                    "id": 1, "nama": "Keluhan Nyeri ",
                    "detail": [
                        { "id": 10442, "nama": "Tidak Ada", "type": "checkbox" },
                        { "id": 10443, "nama": "Ada , lokasi :", "type": "checkbox" },
                        { "id": 10444, "nama": "Ada , jelaskan :", "type": "textbox" },
                    ]
                },
            ]
            $scope.listSkorNRC = [{
                "id": 8, "nama": "Score ",
                "detail": [
                    { "id": 10445, "nama": "0", "type": "checkbox", "ket": "= Tidak Nyeri" },
                    { "id": 10446, "nama": "1 - 3", "type": "checkbox", "ket": "= Nyeri Ringan" },
                    { "id": 10447, "nama": "4 - 6", "type": "checkbox", "ket": "= Nyeri Sedang" },
                    { "id": 10448, "nama": "7 - 10", "type": "checkbox", "ket": "= Nyeri Berat" },
                ]
            }]
            $scope.listSkorWong = [{
                "id": 9, "nama": "Score ",
                "detail": [
                    { "id": 10449, "nama": "0 - 1", "type": "checkbox", "ket": "= Tidak Ada Nyeri" },
                    { "id": 10450, "nama": "2 - 3", "type": "checkbox", "ket": "= Sedikit Nyeri" },
                    { "id": 10451, "nama": "4 - 5", "type": "checkbox", "ket": "= Cukup Nyeri" },
                    { "id": 10452, "nama": "6 - 7", "type": "checkbox", "ket": "= Lumayan Nyeri" },
                    { "id": 10453, "nama": "8 - 9", "type": "checkbox", "ket": "= Sangat Nyeri" },
                    { "id": 10454, "nama": "10", "type": "checkbox", "ket": "= Amat Sangat Nyeri" },
                ]
            }]
            $scope.listNyeriAnak = [
                {
                    "id": 10, "nama": "Hurts",
                    "detail": [
                        { "id": 10455, "nama": "No Hurt", "descNilai": 0 },
                        { "id": 10456, "nama": "Hurts Little Bit", "descNilai": 2 },
                        { "id": 10457, "nama": "Hurts Little More", "descNilai": 4 },
                        { "id": 10458, "nama": "Hurts Even More", "descNilai": 6 },
                        { "id": 10459, "nama": "Hurts Whole Lot", "descNilai": 8 },
                        { "id": 10460, "nama": "Hurts whorts", "descNilai": 10 }]
                }
            ]

            $scope.listEdmon1 = [
                {
                    "id": 1, "nama": "USIA",
                    "detail": [
                        { "id": 10461, "nama": "< 50 Tahun", "descNilai": "8" },
                        { "id": 10462, "nama": "50-79 Tahun", "descNilai": "10" },
                        { "id": 10463, "nama": ">= 80 Tahum", "descNilai": "26" },

                    ]
                },
                {
                    "id": 2, "nama": "STATUS MENTAL",
                    "detail": [
                        { "id": 10464, "nama": "Sadar penuh/Orientasi baik sepanjang waktu", "descNilai": "-4" },
                        { "id": 10465, "nama": "Agitasi / Cemas", "descNilai": "12" },
                        { "id": 10466, "nama": "Keadaan bingung", "descNilai": "13" },
                        { "id": 10467, "nama": "Bingung / Disoreintasi", "descNilai": "14" },

                    ]
                },
                {
                    "id": 3, "nama": "ELIMINASI",
                    "detail": [
                        { "id": 10468, "nama": "Mandiri mampu mengontrol rectum dan vesica urinaria", "descNilai": "8" },
                        { "id": 10469, "nama": "Kateter / ostomi", "descNilai": "12" },
                        { "id": 10470, "nama": "Eliminasi dengan bantuan", "descNilai": "10" },
                        { "id": 10471, "nama": "Gangguan eliminasi (Inkontinensia, nocturna,Frekuensi)", "descNilai": "12" },
                        { "id": 10472, "nama": "inkontinensia tapi mampu bergerak mandiri", "descNilai": "12" },

                    ]
                },
                {
                    "id": 4, "nama": "OBAT",
                    "detail": [
                        { "id": 10473, "nama": "Tanpa obat", "descNilai": "10" },
                        { "id": 10474, "nama": "Obat Jantung", "descNilai": "10" },
                        { "id": 10475, "nama": "Obat psikotropik (termasuk benzodiazepine Anti depresan)", "descNilai": "8" },
                        { "id": 10476, "nama": "Mengalami peningkatan dosis obat tersebut dan/atau diberikan bilamana perlu, diterima dalam 24 jam terakhir", "descNilai": "12" },


                    ]
                },
                {
                    "id": 5, "nama": "DIAGNOSIS",
                    "detail": [
                        { "id": 10477, "nama": "Gangguan bipolar / Skizoaafektif", "descNilai": "10" },
                        { "id": 10478, "nama": "Gangguan penyalahgunaan zat/alkohol", "descNilai": "10" },
                        { "id": 10479, "nama": "Gangguan depresi mayor", "descNilai": "8" },
                        { "id": 10480, "nama": "Delirium / demensia", "descNilai": "12" },

                    ]
                },



            ]

            $scope.listEdmon2 = [

                {
                    "id": 6, "nama": "AMBULASI / KESEIMBANGAN",
                    "detail": [
                        { "id": 10481, "nama": "Mandiri / langkah mantap", "descNilai": "7" },
                        { "id": 10482, "nama": "Menggunakan alat bantu", "descNilai": "8" },
                        { "id": 10483, "nama": "Vertigo / hipotensi ortostatik / lemah", "descNilai": "10" },
                        { "id": 10484, "nama": "Langkah tidak mantap, membutuhkan Bantuan,sadar akan ketidakmampuannya", "descNilai": "8" },
                        { "id": 10485, "nama": "Langkah tidak mantap, namun tidak menyadari keterbatasannya", "descNilai": "15" },

                    ]
                },

                {
                    "id": 7, "nama": "NUTRISI",
                    "detail": [
                        { "id": 10486, "nama": "Asupan makanan dan cairan dalam 24 jam terakhir sangat sedikit", "descNilai": "12" },
                        { "id": 10487, "nama": "Tidak ada gangguan nafsu makan", "descNilai": "0" },

                    ]
                },

                {
                    "id": 8, "nama": "GANGGUAN TIDUR",
                    "detail": [
                        { "id": 10488, "nama": "Tidak ada gangguan tidur", "descNilai": "8" },
                        { "id": 10489, "nama": "Ada gangguan tidur yang dilaporkan oleh pasien, keluarga dan staf", "descNilai": "12" },

                    ]
                },

                {
                    "id": 9, "nama": "RIWAYAT JATUH",
                    "detail": [
                        { "id": 10490, "nama": "Tidak ada riwayat jatuh", "descNilai": "8" },
                        { "id": 10491, "nama": "Riwayat jatuh dalan 3 bulan terakhir", "descNilai": "14" },

                    ]
                },

            ]
            $scope.listNutrisi = [

                {
                    "id": 1, "nama": "Penurunan Berat Badan yang tidak diinginkan dalam 6 bulan terakhir",
                    "detail": [
                        { "id": 6004, "nama": "a. Tidak ada penurunan berat badan", "descNilai": "0" },
                        { "id": 10492, "nama": "b. Tidak yakin / tidak tahu / terasa baju lebih longgar", "descNilai": "2" },
                        { "id": 10493, "nama": "c. Penurunan : > 1 - 5 kg", "descNilai": "1" },
                        { "id": 10494, "nama": "               > 6 - 10 kg", "descNilai": "2" },
                        { "id": 10495, "nama": "               > 11 - 15 kg", "descNilai": "3" },
                        { "id": 10496, "nama": "               > 15 kg", "descNilai": "4" },
                        { "id": 10497, "nama": "  Tidak tahu berapa penurunan berat badan", "descNilai": "2" },
                    ]
                },
                {
                    "id": 2, "nama": "Asupan Makan Berkurang karena tidak nafsu makan",
                    "detail": [
                        { "id": 10498, "nama": "a. Tidak", "descNilai": "0" },
                        { "id": 10499, "nama": "b. Ya", "descNilai": "1" }
                    ]
                },
            ]
            $scope.listPasienDiagKhusus = [
                {
                    "id": 1, "nama": "Dilaporkan ke Dokter Bila skor >= 2 dan atau pasien dengan diagnosis / kondisi khusus :",
                    "detail": [
                        { "id": 10500, "nama": "Tidak", "type": "checkbox" },
                        { "id": 10501, "nama": "Ya, pukul", "type": "checkbox" },
                        { "id": 10502, "nama": "", "type": "textbox" },
                    ]
                }, {
                    "id": 2, "nama": "Pasien dengan diagnosa khusus :",
                    "detail": [
                        { "id": 10503, "nama": "Tidak", "type": "checkbox" },
                        { "id": 10504, "nama": "Ya, sebutkan", "type": "checkbox" },
                        { "id": 10505, "nama": "", "type": "textbox" },
                    ]
                },

            ]
            $scope.listPsiko = [{
                "id": 1, "nama": "Status Emosi",
                "detail": [
                    { "id": 10506, "nama": "Kooperatif", "type": "checkbox" },
                    { "id": 10507, "nama": "Cemas", "type": "checkbox" },
                    { "id": 10508, "nama": "Depresi", "type": "checkbox" },
                ]
            },
            {
                "id": 2, "nama": "Status Pernikahan",
                "detail": [
                    { "id": 10509, "nama": "Menikah", "type": "checkbox" },
                    { "id": 10510, "nama": "Belum menikah ", "type": "checkbox" },
                    { "id": 10511, "nama": "Janda Duda", "type": "checkbox" },
                ]
            },
            {
                "id": 3, "nama": "Keluarga",
                "detail": [
                    { "id": 10512, "nama": "Tinggal Sendiri", "type": "checkbox" },
                    { "id": 10513, "nama": "Tinggal dengan keluarga ", "type": "checkbox" },

                ]
            },
            {
                "id": 4, "nama": "Penelantaran ",
                "detail": [
                    { "id": 10514, "nama": "Ya ", "type": "checkbox" },
                    { "id": 10515, "nama": "Tidak ", "type": "checkbox" },

                ]
            },
            {
                "id": 5, "nama": "Keluarga terdekat ",
                "detail": [
                    { "id": 10516, "nama": "Ayah/ Ibu", "type": "checkbox" },
                    { "id": 10517, "nama": "Adik / Kakak ", "type": "checkbox" },
                    { "id": 10518, "nama": "Lainnya ...", "type": "checkbox" },
                    { "id": 10519, "nama": " .. ", "type": "textbox" },
                ]
            },
            {
                "id": 6, "nama": "Bahasa Sehari-hari ",
                "detail": [
                    { "id": 10520, "nama": "Indonesia", "type": "checkbox" },
                    { "id": 10521, "nama": "Jawa ", "type": "checkbox" },
                    { "id": 10522, "nama": "Lainnya ...", "type": "checkbox" },
                    { "id": 10523, "nama": " .. ", "type": "textbox" },
                ]
            },
            ]

            $scope.listSosial = [{
                "id": 1, "nama": "Sosial. Ada yang menunggu",
                "detail": [
                    { "id": 10524, "nama": "Tidak", "type": "checkbox" },
                    { "id": 10525, "nama": "Ya ...", "type": "checkbox" },
                    { "id": 10526, "nama": "", "type": "textbox" },
                ]
            },
            {
                "id": 2, "nama": "Ekonomi. Ada yang bertanggungjawab",
                "detail": [
                    { "id": 10527, "nama": "Tidak", "type": "checkbox" },
                    { "id": 10528, "nama": "Ya ...", "type": "checkbox" },
                    { "id": 10529, "nama": "", "type": "textbox" },
                ]
            },
            {
                "id": 3, "nama": "KEBUTUHAN EDUKASI",
                "detail": [
                    { "id": 10530, "nama": "Tidak ", "type": "checkbox" },
                    { "id": 10531, "nama": "Iya, sebutkan ... ", "type": "checkbox" },
                    { "id": 10532, "nama": "", "type": "textbox" },
                ]
            },
                // {
                //     "id": 4, "nama": "PERENCANAAN PEMULANGAN PASIEN ",
                //     "detail": [
                //         { "id": 5133, "nama": "Tidak ", "type": "checkbox" },
                //         { "id": 5134, "nama": "Iya, sebutkan ... ", "type": "checkbox" },
                //         { "id": 5135, "nama": "", "type": "textbox" },
                //     ]
                // },

            ]

            $scope.listMental = [
                {
                    "id": 1, "nama": "1. Penampilan",
                    "detail": [
                        { "id": 10533, "nama": "Tidak rapi", "type": "checkbox" },
                        { "id": 10534, "nama": "Penggunaan pakaian tidak sesuai", "type": "checkbox" },
                        { "id": 10535, "nama": "Cara berpakaian tidak seperti biasanya", "type": "checkbox" },]
                },
                {
                    "id": 2, "nama": "2. Pembicaraan",
                    "detail": [
                        { "id": 10536, "nama": "Cepat", "type": "checkbox" },
                        { "id": 10537, "nama": "Keras", "type": "checkbox" },
                        { "id": 10538, "nama": "Gagap", "type": "checkbox" },
                        { "id": 10539, "nama": "Inkoheren", "type": "checkbox" },
                        { "id": 10540, "nama": "Apatis", "type": "checkbox" },
                        { "id": 10541, "nama": "Lambat", "type": "checkbox" },
                        { "id": 10542, "nama": "Membisu", "type": "checkbox" },
                        { "id": 10543, "nama": "Tidak mampu memulai pembicaraan", "type": "checkbox" },

                    ]
                },
                {
                    "id": 3, "nama": "3. Aktifis Motorik",
                    "detail": [
                        { "id": 10544, "nama": "Lesu", "type": "checkbox" },
                        { "id": 10545, "nama": "Tegang", "type": "checkbox" },
                        { "id": 10546, "nama": "Gelisah", "type": "checkbox" },
                        { "id": 10547, "nama": "Agitasi", "type": "checkbox" },
                        { "id": 10548, "nama": "Tik", "type": "checkbox" },
                        { "id": 10549, "nama": "Grimasen", "type": "checkbox" },
                        { "id": 10550, "nama": "Tremor", "type": "checkbox" },
                        { "id": 10551, "nama": "Kompulsif", "type": "checkbox" },
                    ]
                },
                {
                    "id": 4, "nama": "4. Alam Perasaan",
                    "detail": [
                        { "id": 10552, "nama": "Sedih ", "type": "checkbox" },
                        { "id": 10553, "nama": "Ketakutan ", "type": "checkbox" },
                        { "id": 10554, "nama": "Putus asa  ", "type": "checkbox" },
                        { "id": 10555, "nama": "Khawatir ", "type": "checkbox" },
                        { "id": 10556, "nama": "Gembira berlebihan ", "type": "checkbox" },

                    ]
                },
                {
                    "id": 5, "nama": "5. Afek",
                    "detail": [
                        { "id": 10557, "nama": "Datar  ", "type": "checkbox" },
                        { "id": 10558, "nama": "Tumpul  ", "type": "checkbox" },
                        { "id": 10559, "nama": "Labil   ", "type": "checkbox" },
                        { "id": 10560, "nama": "Tidak sesuai  ", "type": "checkbox" },
                    ]
                },
                {
                    "id": 6, "nama": "6. Interaksi Selama Wawancara",
                    "detail": [
                        { "id": 10561, "nama": "Bermusuhan   ", "type": "checkbox" },
                        { "id": 10562, "nama": "Tidak Kooperatif   ", "type": "checkbox" },
                        { "id": 10563, "nama": "Curiga  ", "type": "checkbox" },
                        { "id": 10564, "nama": "Mudah Tersinggung    ", "type": "checkbox" },
                        { "id": 10565, "nama": "Kontak mata kurang", "type": "checkbox" },
                        { "id": 10566, "nama": "Defensif", "type": "checkbox" },

                    ]
                },
                {
                    "id": 7, "nama": "7. Persepsi Halusinasi",
                    "detail": [
                        { "id": 10567, "nama": "Ada , Jika Ada", "type": "checkbox" },
                        { "id": 10568, "nama": "Pengecapan  ", "type": "checkbox" },
                        { "id": 10569, "nama": "Pendengaran   ", "type": "checkbox" },
                        { "id": 10570, "nama": "Penglihatan  ", "type": "checkbox" },
                        { "id": 10571, "nama": "Perabaan ", "type": "checkbox" },
                        { "id": 10572, "nama": "Penghidu ", "type": "checkbox" },
                        { "id": 10573, "nama": "Tidak ", "type": "checkbox" },

                    ]
                },
                {
                    "id": 8, "nama": "8. Isi Pikir",
                    "detail": [
                        { "id": 15242, "nama": "Obsesi ", "type": "checkbox" },
                        { "id": 10574, "nama": "Pobia ", "type": "checkbox" },
                        { "id": 10575, "nama": "Hipokondria    ", "type": "checkbox" },
                        { "id": 10576, "nama": "Dipersionalisasi  ", "type": "checkbox" },
                        { "id": 10577, "nama": "Ide yang terkait  ", "type": "checkbox" },
                        { "id": 10578, "nama": "Pikiran magis ", "type": "checkbox" },
                        { "id": 10579, "nama": "Pengecapan  ", "type": "checkbox" },
                        {"id" : 15243, "nama": "Tidak ada", "type" : "checkbox"}

                    ]
                },
                {
                    "id": 9, "nama": "9. Waham",
                    "detail": [
                        { "id": 10580, "nama": "Agama  ", "type": "checkbox" },
                        { "id": 10581, "nama": "Somatik  ", "type": "checkbox" },
                        { "id": 10582, "nama": "Kebesaran     ", "type": "checkbox" },
                        { "id": 10583, "nama": "Curiga  ", "type": "checkbox" },
                        { "id": 10584, "nama": "Siar pikir ", "type": "checkbox" },
                        { "id": 10585, "nama": "Kontrol pikir  ", "type": "checkbox" },
                        { "id": 10586, "nama": "Sisip pikir ", "type": "checkbox" },
                        { "id": 10587, "nama": "Nihilistik ", "type": "checkbox" },
                        {"id" : 15244, "nama": "Tidak ada", "type" : "checkbox"}

                    ]
                },
                {
                    "id": 10, "nama": "10. Proses Pikir",
                    "detail": [
                        { "id": 10588, "nama": "Sirkumstansial   ", "type": "checkbox" },
                        { "id": 10589, "nama": "Tangesial   ", "type": "checkbox" },
                        { "id": 10590, "nama": "Kehilangan asosiasi", "type": "checkbox" },
                        { "id": 10591, "nama": "Fightofideas   ", "type": "checkbox" },
                        { "id": 10592, "nama": "Blocking  ", "type": "checkbox" },
                        { "id": 10593, "nama": "Penghilangan pembicaraan ", "type": "checkbox" },


                    ]
                },
                {
                    "id": 11, "nama": "11. Tingkat Kesadaran",
                    "detail": [
                        { "id": 10594, "nama": "Bingung    ", "type": "checkbox" },
                        { "id": 10595, "nama": "Sedasi    ", "type": "checkbox" },
                        { "id": 10596, "nama": "Stupor", "type": "checkbox" },

                    ]
                },
                {
                    "id": 12, "nama": "12. Disorientasi",
                    "detail": [
                        { "id": 10597, "nama": "Waktu", "type": "checkbox" },
                        { "id": 10598, "nama": "Tempat", "type": "checkbox" },
                        { "id": 10599, "nama": "Orang", "type": "checkbox" },
                        {"id" : 15245, "nama": "Tidak ada", "type" : "checkbox"}

                    ]
                },
                {
                    "id": 13, "nama": "13. Memori",
                    "detail": [
                        { "id": 10600, "nama": "Gangguan daya ingat jangka panjang ", "type": "checkbox" },
                        { "id": 10601, "nama": "Gangguan daya ingat jangka pendek ", "type": "checkbox" },
                        { "id": 10602, "nama": "Gangguan daya ingat saat ini ", "type": "checkbox" },
                        { "id": 10603, "nama": "Konfabulasi", "type": "checkbox" },
                        {"id" : 15246, "nama": "Tidak ada", "type" : "checkbox"}
                    ]
                },
                {
                    "id": 14, "nama": "14. Tingkat Kosentrasi dan Berhitung",
                    "detail": [
                        { "id": 10604, "nama": "Mudah beralih", "type": "checkbox" },
                        { "id": 10605, "nama": "Tidak mampu berkonsentrasi", "type": "checkbox" },
                        { "id": 10606, "nama": "Tidak mampu berhitung secara sederhana ", "type": "checkbox" },

                    ]
                },
                {
                    "id": 15, "nama": "15. Kemampuan Penilaian",
                    "detail": [
                        { "id": 10607, "nama": "Gangguan ringan ", "type": "checkbox" },
                        { "id": 10608, "nama": "Gangguan bermakna ", "type": "checkbox" },
                    ]
                },
                {
                    "id": 16, "nama": "16. Daya Tilik Diri ",
                    "detail": [
                        { "id": 10609, "nama": "Mengingkari penyakit yang dideritanya", "type": "checkbox" },
                        { "id": 10610, "nama": "Menyalahkan hal-hal di luar dirinya ", "type": "checkbox" },
                        { "id": 10611, "nama": "Lain-lain, jelaskan ... ", "type": "checkbox" },
                        { "id": 10612, "nama": "", "type": "textbox" },
                    ]
                },

            ]
            $scope.listPemulangan = [
                {
                    "id": 1, "nama": "1. Istirahat dan Tidur ",
                    "detail": [
                        { "id": 10613, "nama": "Bantuan minimal ", "type": "checkbox" },
                        { "id": 10614, "nama": "Bantuan Total ", "type": "checkbox" },

                    ]
                },
                {
                    "id": 2, "nama": "2. Penggunaan Obat ",
                    "detail": [
                        { "id": 10615, "nama": "Penggunaan Obat", "type": "checkbox" },
                        { "id": 10616, "nama": "Sistem Pendukung", "type": "checkbox" },

                    ]
                },
                {
                    "id": 3, "nama": "3. Pemeliharaan Kesehatan",
                    "detail": [
                        { "id": 10617, "nama": "Perawatan lanjutan ", "type": "checkbox" },
                        { "id": 10618, "nama": "Sistem pendukung  ", "type": "checkbox" },

                    ]
                },
                {
                    "id": 4, "nama": "4. Kegiatan di Dalam Rumah",

                },
                {
                    "id": 5, "nama": "Mempersiapkan makanan ",
                    "detail": [
                        { "id": 10619, "nama": "Ya ", "type": "checkbox" },
                        { "id": 10620, "nama": "Tidak", "type": "checkbox" },

                    ]
                },
                {
                    "id": 6, "nama": "Mencuci Pakaian ",
                    "detail": [
                        { "id": 10621, "nama": "Ya ", "type": "checkbox" },
                        { "id": 10622, "nama": "Tidak", "type": "checkbox" },

                    ]
                },
                {
                    "id": 7, "nama": "Pengaturan keuangan ",
                    "detail": [
                        { "id": 10623, "nama": "Ya ", "type": "checkbox" },
                        { "id": 10624, "nama": "Tidak", "type": "checkbox" },

                    ]
                },
                {
                    "id": 8, "nama": "Menjaga Kerapihan rumah  ",
                    "detail": [
                        { "id": 10625, "nama": "Ya ", "type": "checkbox" },
                        { "id": 10626, "nama": "Tidak", "type": "checkbox" },

                    ]
                },
                {
                    "id": 9, "nama": "5. Kegiatan di Luar Rumah  ",

                },
                {
                    "id": 10, "nama": "Belanja  ",
                    "detail": [
                        { "id": 10627, "nama": "Ya ", "type": "checkbox" },
                        { "id": 10628, "nama": "Tidak", "type": "checkbox" },

                    ]

                },
                {
                    "id": 11, "nama": "Transportasi  ",
                    "detail": [
                        { "id": 10629, "nama": "Ya ", "type": "checkbox" },
                        { "id": 10630, "nama": "Tidak", "type": "checkbox" },
                    ]
                },
                {
                    "id": 12, "nama": "Lain-lain  ",
                    "detail": [
                        { "id": 10631, "nama": "Ya ", "type": "checkbox" },
                        { "id": 10632, "nama": "Tidak", "type": "checkbox" },
                    ]
                },
            ]
            $scope.listBarthel = [
                {
                    "id": 1, "nama": "Mengendalikan Rangsang delekasi",
                    "detail": [
                        {
                            "id": 1, "nama": "Tidak terkendali tak teratur (perlu bantuan)", "descNilai": "0", "ket": 1,
                            "detail": [{ id: 10633, baris : 1 }, { id: 10634, baris : 2 }]
                        },
                        {
                            "id": 2, "nama": "Kadang-kadang tak terkendali", "descNilai": "1", "ket": 1,
                            "detail": [{ id: 10635, baris : 1 }, { id: 10636, baris : 2 }]
                        },
                        {
                            "id": 3, "nama": "Mandiri", "descNilai": "2", "ket": 1,
                            "detail": [{ id: 10637, baris : 1 }, { id: 10638, baris : 2 }]
                        },
                    ]
                },
                {
                    "id": 2, "nama": "Mengendalikan Rangsang berkemih",
                    "detail": [
                        { "id": 1, "nama": "Tak terkendali pakai kateter", "descNilai": "0", "detail": [{ id: 10639, baris : 1 }, { id: 10640, baris : 2 }] },
                        { "id": 2, "nama": "Kadang-kadang tak terkendali (1x24 jam)", "descNilai": "1", "detail": [{ id: 10641,baris : 1 }, { id: 10642,baris : 2 }] },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2", "detail": [{ id: 10643,baris : 1 }, { id: 10644,baris : 2 }] },
                    ]
                },
                {
                    "id": 3, "nama": "Membersihkan diri ( cuci muka, sisir rambur, sikat gigi)",
                    "detail": [
                        { "id": 1, "nama": "Butuh pertolongan orang lain", "descNilai": "0", "detail": [{ id: 10645,baris : 1 }, { id: 10646, baris : 2 }] },
                        { "id": 2, "nama": "Mandiri", "descNilai": "1", "detail": [{ id: 10647, baris : 1 }, { id: 10648,baris : 2 }] },
                    ]
                },
                {
                    "id": 4, "nama": "Penggunaan jamban (masuk, keluar)",
                    "detail": [
                        { "id": 1, "nama": "Tergantung pertolongan orang lain", "descNilai": "0", "detail": [{ id: 10649,baris : 1 }, { id: 10650,baris : 2 }] },
                        {
                            "id": 2, "nama": "Perlu pertolongan beberapa kegiatan tetapi dapat mengerjakan sendiri pada kegiatan yang lain", "descNilai": "1",
                            "detail": [{ id: 10651, baris : 1 }, { id: 10652, baris : 2 }]
                        },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2", "detail": [{ id: 10653, baris : 1 }, { id: 10654, baris : 2 }] },
                    ]
                },
                {
                    "id": 5, "nama": "Makan",
                    "detail": [
                        { "id": 1, "nama": "Tidak mampu", "descNilai": "0", "detail": [{ id: 10655, baris : 1 }, { id: 10656, baris : 2 }] },
                        { "id": 2, "nama": "Perlu ditolong  memotong makanan", "descNilai": "1", "detail": [{ id: 10657, baris : 1 }, { id: 10658, baris : 2 }] },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2", "detail": [{ id: 10659, baris : 1 }, { id: 10660, baris : 2 }] },
                    ]
                },
                {
                    "id": 6, "nama": "Berubah sikap dari berbaring ke duduk",
                    "detail": [
                        { "id": 1, "nama": "Perlu banyak bantuan untuk bisa duduk (2 org)", "descNilai": "0", "detail": [{ id: 10661, baris : 1 }, { id: 10662, baris : 2 }] },
                        { "id": 2, "nama": "Bantuan minimal 2 org", "descNilai": "1", "detail": [{ id: 10663, baris : 1 }, { id: 10664, baris : 2 }] },
                        { "id": 3, "nama": "Bantuan Verbal", "descNilai": "2", "detail": [{ id: 10665, baris : 1 }, { id: 10666, baris : 2 }] },
                        { "id": 4, "nama": "Mandiri", "descNilai": "3","detail": [{ id: 100044, baris : 1 }, { id: 100045, baris : 2 }] },
                    ]
                },
                {
                    "id": 7, "nama": "Berpindah / berjalan",
                    "detail": [
                        { "id": 1, "nama": "Tidak mampu", "descNilai": "0", "detail": [{ id: 10667,baris : 1 }, { id: 10668, baris : 2 }] },
                        { "id": 2, "nama": "Bisa (pindah) dengan kursi ", "descNilai": "1", "detail": [{ id: 10669, baris : 1 }, { id: 10670, baris : 2 }] },
                        { "id": 3, "nama": "Berjalan dengan bantuan 1 orang", "descNilai": "2", "detail": [{ id: 10671, baris : 1 }, { id: 10672, baris : 2 }] },
                        { "id": 4, "nama": "Mandiri", "descNilai": "3", "detail": [{ id: 10673, baris : 1 }, { id: 10674, baris : 2 }] },
                    ]
                },
                {
                    "id": 8, "nama": "Memakai Baju",
                    "detail": [
                        { "id": 1, "nama": "Tergantung orang lain", "descNilai": "0", "detail": [{ id: 10675, baris : 1 }, { id: 10676, baris : 2 }] },
                        { "id": 2, "nama": "Sebagian dibantu (misal mengancingkan baju)", "descNilai": "1", "detail": [{ id: 10677, baris : 1 }, { id: 10678, baris : 2 }] },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2", "detail": [{ id: 10679, baris : 1 }, { id: 10680, baris : 2 }] },

                    ]
                },
                {
                    "id": 9, "nama": "Naik turun tangga ",
                    "detail": [
                        { "id": 1, "nama": "Tidak Mampu", "descNilai": "0", "detail": [{ id: 10681, baris : 1 }, { id: 15706, baris : 2 }] },
                        { "id": 2, "nama": "Butuh Pertolongan orang lain", "descNilai": "1", "detail": [{ id: 10682, baris : 1 }, { id: 10683, baris : 2 }] },
                        { "id": 3, "nama": "Mandiri", "descNilai": "2", "detail": [{ id: 10684, baris : 1 }, { id: 10685, baris : 2 }] },
                    ]
                },
                {
                    "id": 10, "nama": "Mandi",
                    "detail": [
                        { "id": 1, "nama": "Tergantung orang lain ", "descNilai": "0", "detail": [{ id: 10686, baris : 1 }, { id: 10687, baris : 2 }] },
                        { "id": 2, "nama": "Mandiri", "descNilai": "1", "detail": [{ id: 10688, baris : 1 }, { id: 10689, baris : 2 }] },
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
             var cacheEMR_Vitaltrns = cacheHelper.get('cacheEMR_Vitaltrns');
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
                $scope.item.obj[10691]=$scope.now
                $scope.item.obj[16081]={ value: $scope.cc.iddpjp, text: $scope.cc.dokterdpjp }
                if (cacheEMR_Vitaltrns != undefined) {

                            // SET DARI SKOR CTRS
                            medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + cacheEMR_Vitaltrns + "&emrfk=" + 137, true).then(function (datss) {
                                var dataNA = datss.data.data
                                
                                for (var i = 0; i <= dataNA.length - 1; i++) {
                                    if (dataNA[i].type == "textbox") {
                                            $scope.item.obj[dataNA[i].emrdfk] = dataNA[i].value
                                            if (dataNA[i].emrdfk=='14910')
                                             $scope.item.obj[10692] = dataNA[i].value
                                            if (dataNA[i].emrdfk=='14911') 
                                             $scope.item.obj[10693] = dataNA[i].value
                                            if (dataNA[i].emrdfk=='14912') 
                                                 $scope.item.obj[10694] = dataNA[i].value
                                            if (dataNA[i].emrdfk=='14913') 
                                                 $scope.item.obj[10695] = dataNA[i].value
                                                    

                                    }
                                    if (dataNA[i].type == "datetime") {
                                        if (dataNA[i].emrdfk=='14899')
                                        $scope.item.obj[10690] = new Date(dataNA[i].value)
                                    }

                                }
                               
                                


                            })
                        }
                dataLoad = dat.data.data
                for (var i = 0; i <= dataLoad.length - 1; i++) {
                    if (parseFloat($scope.cc.emrfk) == dataLoad[i].emrfk) {

                        if (dataLoad[i].type == "textbox") {
                            $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                                if (dataLoad[i].emrdfk ==  '10721')
                                $scope.totalSkorAses =parseFloat( dataLoad[i].value)
                                if (dataLoad[i].emrdfk=='15707') 
                                $scope.totalSkorAses2 =parseFloat( dataLoad[i].value)
                                if (dataLoad[i].emrdfk=='10707') 
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
                            if (dataLoad[i].emrdfk >= 5053 && dataLoad[i].emrdfk <= 5084 && dataLoad[i].reportdisplay != null) {
                                var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                                $scope.getSkor2(datass)
                            }
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
                            if(str != undefined){
                                var res = str.split("~");
                                // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
                                $scope.item.obj[dataLoad[i].emrdfk] = { value: res[0], text: res[1] }        
                            }

                        }
                         // pegawaiInputDetail = dataLoad[i].pegawaifk
                    }

                }
                // setTimeout(function(){medifirstService.setDisableAllInputElement()  }, 2000);
                //  if( $scope.cc.norec_emr !='-' && pegawaiInputDetail !='' && pegawaiInputDetail !=null){
                //     if(pegawaiInputDetail != medifirstService.getPegawaiLogin().id){
                //         $scope.allDisabled =true
                //         // toastr.warning('Hanya Bisa melihat data','Peringatan')
                //         // return
                //     }
                // }
            })  
            $scope.$watch('item.obj[10707]', function (nilai) {
                if (nilai == undefined) return
                nilai = parseInt(nilai)

                if(nilai < 90){
                    $scope.item.obj[10418] = true
                    $scope.item.obj[10419] = false
                }
                if(nilai >= 90){
                    $scope.item.obj[10418] = false
                    $scope.item.obj[10419] = true
                }

            })


            $scope.$watch('item.obj[10702]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)

                if (nilai == 0) {
                    $scope.item.obj[10445] = true
                    $scope.item.obj[10446] = false
                    $scope.item.obj[10447] = false
                    $scope.item.obj[10448] = false
                }
                if (nilai >= 1 && nilai <= 3) {
                    $scope.item.obj[10445] = false
                    $scope.item.obj[10446] = true
                    $scope.item.obj[10447] = false
                    $scope.item.obj[10448] = false
                }
                if (nilai >= 4 && nilai <= 6) {
                    $scope.item.obj[10445] = false
                    $scope.item.obj[10446] = false
                    $scope.item.obj[10447] = true
                    $scope.item.obj[10448] = false
                }
                if (nilai >= 7 && nilai <= 10) {
                    $scope.item.obj[10445] = false
                    $scope.item.obj[10446] = false
                    $scope.item.obj[10447] = false
                    $scope.item.obj[10448] = true
                }
            });

            $scope.getSkalaNyeri = function (data, stat) {
                $scope.activeStatus = stat.descNilai
                var nilai = stat.descNilai


                if (nilai >= 0 && nilai <= 1) {
                    $scope.item.obj[10449] = true
                    $scope.item.obj[10450] = false
                    $scope.item.obj[10451] = false
                    $scope.item.obj[10452] = false
                    $scope.item.obj[10453] = false
                    $scope.item.obj[10454] = false
                }
                if (nilai >= 2 && nilai <= 3) {
                    $scope.item.obj[10449] = false
                    $scope.item.obj[10450] = true
                    $scope.item.obj[10451] = false
                    $scope.item.obj[10452] = false
                    $scope.item.obj[10453] = false
                    $scope.item.obj[10454] = false
                }
                if (nilai >= 4 && nilai <= 5) {
                    $scope.item.obj[10449] = false
                    $scope.item.obj[10450] = false
                    $scope.item.obj[10451] = true
                    $scope.item.obj[10452] = false
                    $scope.item.obj[10453] = false
                    $scope.item.obj[10454] = false
                }
                if (nilai >= 6 && nilai <= 7) {
                    $scope.item.obj[10449] = false
                    $scope.item.obj[10450] = false
                    $scope.item.obj[10451] = false
                    $scope.item.obj[10452] = true
                    $scope.item.obj[10453] = false
                    $scope.item.obj[10454] = false
                }
                if (nilai >= 8 && nilai <= 9) {
                    $scope.item.obj[10449] = false
                    $scope.item.obj[10450] = false
                    $scope.item.obj[10451] = false
                    $scope.item.obj[10452] = false
                    $scope.item.obj[10453] = true
                    $scope.item.obj[10454] = false
                }

                if (nilai == 10) {
                    $scope.item.obj[10449] = false
                    $scope.item.obj[10450] = false
                    $scope.item.obj[10451] = false
                    $scope.item.obj[10452] = false
                    $scope.item.obj[10453] = false
                    $scope.item.obj[10454] = true
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
                $scope.item.obj[10721] = $scope.totalSkorAses 
                $scope.item.obj[15707] = $scope.totalSkorAses2 
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
                $scope.item.obj[10707] = $scope.totalSkor + $scope.totalSkor2
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
                $scope.item.obj[10704] = $scope.skorNutrisi
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

                    $rootScope.loadRiwayat()
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,  
                    'Asesmen Awal Keperawatan Rawat Inap ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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