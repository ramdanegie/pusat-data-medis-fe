define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AsesmenPerawatJiwaRemajaRICtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.totalSkor4 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 246
            var dataLoad = []
            var pegawaiInputDetail= ''
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
            })
            medifirstService.getPart('emr/get-datacombo-part-ruangan', true, true, 20).then(function (data) {
                $scope.listRuangan = data
            })
             medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 246).then(function (e) {

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
            $scope.listPredisposisi = [{
                "id": 1, "nama": "Pernah mengalami gangguan jiwa di masa lalu :",
                "detail": [
                    { "id": 80264, "nama": "Ya ", "type": "checkbox" },
                    { "id": 80265, "nama": "Tidak ", "type": "checkbox" },
                ]
            },
            {
                "id": 2, "nama": "Jika ya, pengobatan sebelumnya :",
                "detail": [
                    { "id": 80266, "nama": "Berhasil ", "type": "checkbox" },
                    { "id": 80267, "nama": "Kurang berhasil ", "type": "checkbox" },
                    { "id": 80268, "nama": "Tidak berhasil ", "type": "checkbox" },
                ]
            }]

            $scope.listMerokok = [{
                "id": 1, "nama": "Riwayat Merokok :",
                "detail": [
                    { "id": 80269, "nama": "Ya ", "type": "checkbox" },
                    { "id": 80270, "nama": "Tidak ", "type": "checkbox" },
                ]
            }]

            $scope.listAniaya = [{
                "id": 1, "nama": "4. Aniaya :",
                "detail": [
                    { "id": 80271, "nama": "Fisik ", "type": "checkbox" },
                    { "id": 80272, "nama": "Seksual ", "type": "checkbox" },
                    { "id": 80273, "nama": "Penolakan", "type": "checkbox" },
                    { "id": 80274, "nama": "Kekerasan dalam rumah tangga ", "type": "checkbox" },
                    { "id": 80275, "nama": "Kriminal", "type": "checkbox" }
                ]
            },,{
                "id": 2, "nama": "Jelaskan :",
                "detail": [
                    { "id": 80276, "nama": " ", "type": "textbox" }
                ]
            }]

            $scope.listA5 = [{
                "id": 1, "nama": "5. Anggota keluarga mengalami gangguan jiwa :",
                "detail": [
                    { "id": 80277, "nama": "Ada ", "type": "checkbox" },
                    { "id": 80278, "nama": "Tidak ", "type": "checkbox" }
                ]
            },{
                "id": 2, "nama": "Jika ada, jelaskan :",
                "detail": [
                    { "id": 80279, "nama": " ", "type": "textbox" }
                ]
            },{
                "id": 3, "nama": "Genogram :",
                "detail": [
                    { "id": 80280, "nama": " ", "type": "textarea" }
                ]
            }]

            $scope.listA6 = [{
                "id": 1, "nama": "6. Pengalaman yang tidak menyenangkan :",
                "detail": [
                    { "id": 80281, "nama": " ", "type": "textbox" }
                ]
            }]


            $scope.listB1 = [{
                "id": 1, "nama": "1. Keluarga :",
                "detail": [
                    { "id": 80282, "nama": "Tinggal Sendiri ", "type": "checkbox" },
                    { "id": 80283, "nama": "Tinggal Serumah ", "type": "checkbox" },
                ]
            }]

            $scope.listB2 = [{
                "id": 1, "nama": "2. Tempat Tinggal :",
                "detail": [
                    { "id": 80284, "nama": "Rumah ", "type": "checkbox" },
                    { "id": 80285, "nama": "Panti Asuhan ", "type": "checkbox" },
                    { "id": 80286, "nama": "Lainnya ", "type": "textbox" },
                ]
            }]

            $scope.listB3 = [{
                "id": 1, "nama": "3. Aktifitas :",
                "detail": [
                    { "id": 80287, "nama": "Mandiri ", "type": "checkbox" },
                    { "id": 80288, "nama": "Tirah Baring ", "type": "checkbox" },
                    { "id": 80289, "nama": "Kursi Roda / Tingkat ", "type": "checkbox" },
                ]
            }]

            $scope.listB4 = [{
                "id": 1, "nama": "4. Penelantaran :",
                "detail": [
                    { "id": 80290, "nama": "Ya ", "type": "checkbox" },
                    { "id": 80291, "nama": "Tidak ", "type": "checkbox" },
                ]
            }]

            $scope.listB5 = [{
                "id": 1, "nama": "5. Status Emosional :",
                "detail": [
                    { "id": 80292, "nama": "Kooperatif ", "type": "checkbox" },
                    { "id": 80293, "nama": "Gemas ", "type": "checkbox" },
                    { "id": 80294, "nama": "Depresi ", "type": "checkbox" },
                ]
            }]

            $scope.listB6 = [{
                "id": 1, "nama": "6. Keluarga Terdekat :",
                "detail": [
                    { "id": 80295, "nama": "", "type": "textbox" },
                ]
            },{
                "id": 1, "nama": "Hubungan :",
                "detail": [
                    { "id": 80296, "nama": "", "type": "textbox" },
                ]
            }]

            $scope.listB7 = [{
                "id": 1, "nama": "7. Perilaku :",
                "detail": [
                    { "id": 80297, "nama": "Menurut ", "type": "checkbox" },
                    { "id": 80298, "nama": "Menyimpang ", "type": "textbox" },
                ]
            }]

            $scope.listB8 = [{
                "id": 1, "nama": "8. Konsep Diri :",
                "detail": [
                    { "id": 80299, "nama": "Mudah dikaji ", "type": "checkbox" },
                    { "id": 80300, "nama": "Sulit dikaji ", "type": "checkbox" },
                ]
            },{
                "id": 2, "nama": "a. Gambaran Diri :",
                "detail": [
                    { "id": 80301, "nama": "Optimal / menerima ", "type": "checkbox" },
                    { "id": 80302, "nama": "Merasa cacat / kurang ", "type": "checkbox" },
                ]
            },{
                "id": 3, "nama": "b. Ideal Diri :",
                "detail": [
                    { "id": 80303, "nama": "Merasa ", "type": "checkbox" },
                    { "id": 80304, "nama": "Merasa gagal / tidak mampu ", "type": "checkbox" },
                ]
            },{
                "id": 4, "nama": "c. Identitas Diri :",
                "detail": [
                    { "id": 80305, "nama": "Persepsi diri baik ", "type": "checkbox" },
                    { "id": 80306, "nama": "Persepsi diri kurang ", "type": "checkbox" },
                ]
            },{
                "id": 5, "nama": "d. Peran :",
                "detail": [
                    { "id": 80307, "nama": "Peran Optimal ", "type": "checkbox" },
                    { "id": 80308, "nama": "Peran Minimal ", "type": "checkbox" },
                    { "id": 80309, "nama": "Digantikan orang lain ", "type": "checkbox" },
                ]
            },{
                "id": 6, "nama": "e. Harga Diri :",
                "detail": [
                    { "id": 80310, "nama": "Percaya diri positif ", "type": "checkbox" },
                    { "id": 80311, "nama": "Rendah diri ", "type": "checkbox" },
                    { "id": 80312, "nama": "Malu ", "type": "checkbox" },
                ]
            }]

            $scope.listKognitif = [{
                "id": 1, "nama": "C. Kognitif :",
                "detail": [
                    { "id": 80313, "nama": "Mudah Dikaji ", "type": "checkbox" },
                    { "id": 80314, "nama": "Sulit Dikaji ", "type": "checkbox" },
                ]
            }]

            $scope.listC1 = [{
                "id": 1, "nama": "1. Membedakan Warna dan Simbol sesuai umur :",
                "detail": [
                    { "id": 80315, "nama": "Mampu ", "type": "checkbox" },
                    { "id": 80316, "nama": "Tidak Mampu ", "type": "checkbox" },
                ]
            }]

            $scope.listC2 = [{
                "id": 1, "nama": "2. Menghitung dan Membaca sesuai umur :",
                "detail": [
                    { "id": 80317, "nama": "Mampu ", "type": "checkbox" },
                    { "id": 80318, "nama": "Tidak Mampu ", "type": "checkbox" },
                ]
            }]

            $scope.listC3 = [{
                "id": 1, "nama": "3. Mengidentifikasi kelebihan yang dimiliki :",
                "detail": [
                    { "id": 80319, "nama": "Mampu ", "type": "checkbox" },
                    { "id": 80320, "nama": "Tidak Mampu ", "type": "checkbox" },
                ]
            }]

            $scope.listC4 = [{
                "id": 1, "nama": "4. Bersantai dan Bermain :",
                "detail": [
                    { "id": 80321, "nama": "Mampu ", "type": "checkbox" },
                    { "id": 80322, "nama": "Tidak Mampu ", "type": "checkbox" },
                ]
            }]

            $scope.listC5 = [{
                "id": 1, "nama": "5. Adaptasi dengan Lingkungan :",
                "detail": [
                    { "id": 80323, "nama": "Mampu ", "type": "checkbox" },
                    { "id": 80324, "nama": "Tidak Mampu ", "type": "checkbox" },
                ]
            }]

            $scope.listD = [{
                "id": 1, "nama": "1. Orang yang berarti :",
                "detail": [
                    { "id": 80325, "nama": "", "type": "textbox" },
                ]
            },{
                "id": 2, "nama": "2. Peran serta kelompok / masyarakat :",
                "detail": [
                    { "id": 80326, "nama": "", "type": "textbox" },
                ]
            }]

            $scope.listE = [{
                "id": 1, "nama": "1. Kegiatan Ibadah :",
                "detail": [
                    { "id": 80327, "nama": "", "type": "textbox" },
                ]
            },{
                "id": 2, "nama": "2. Nilai & Keyakinan :",
                "detail": [
                    { "id": 80328, "nama": "", "type": "textbox" },
                ]
            }]

            $scope.listF = [{
                "id": 1, "nama": "1. Luka operasi :",
                "detail": [
                    { "id": 80329, "nama": "Tidak ", "type": "checkbox" },
                    { "id": 80330, "nama": "Ada ", "type": "checkbox" },
                ]
            },{
                "id": 2, "nama": "2. Keluhan nyeri :",
                "detail": [
                    { "id": 80331, "nama": "Tidak ", "type": "checkbox" },
                    { "id": 80332, "nama": "Ya ", "type": "checkbox" },
                ]
            },{
                "id": 3, "nama": "",
                "detail": [
                    { "id": 80333, "nama": "Pencetus: ", "type": "textbox" },
                    { "id": 80334, "nama": "Kualitas: ", "type": "textbox" },
                    { "id": 80335, "nama": "Lokasi: ", "type": "textbox" },
                    { "id": 80336, "nama": "Skala: ", "type": "textbox" },
                    { "id": 80337, "nama": "Durasi: ", "type": "textbox" },
                ]
            }]



            $scope.listH = [{
                "id": 1, "nama": "1. Tanda-tanda Vital :",
                "detail": [
                    { "id": 80338, "nama": "TD :", "type": "textbox", "satuan":"mmHg" },
                    { "id": 80339, "nama": "N :", "type": "textbox", "satuan":"kali/menit" },
                    { "id": 80340, "nama": "R :", "type": "textbox", "satuan":"kali/menit" },
                    { "id": 80341, "nama": "S :", "type": "textbox", "satuan":"°C" },
                ]
            },{
                "id": 2, "nama": "2. Antropometri :",
                "detail": [
                    { "id": 80342, "nama": "BB :", "type": "textbox", "satuan":"kg" },
                    { "id": 80343, "nama": "TB :", "type": "textbox", "satuan":"cm" },
                ]
            }]

            $scope.listI = [{
                "id": 1, "nama": "Diet saat ini :",
                "detail": [
                    { "id": 80344, "nama": "", "type": "textbox" },
                    { "id": 80345, "nama": "Porsi", "type": "textbox" },
                ]
            }]

            $scope.listI2 = [{
                "id": 1, "nama": "Masalah yang berhubungan dengan nutrisi :",
                "detail": [
                    { "id": 80346, "nama": "Mual, Muntah", "type": "checkbox" },
                    { "id": 80347, "nama": "Sulit mengunyah", "type": "checkbox" },
                    { "id": 80348, "nama": "Malnutrisi, Muntah", "type": "checkbox" },
                    { "id": 80349, "nama": "Penurunan BB", "type": "checkbox" },
                    { "id": 80350, "nama": "Kehilangan nafsu makan", "type": "checkbox" },
                    { "id": 80351, "nama": "Obesitas", "type": "checkbox" },
                ]
            }]

            $scope.listJ1 = [{
                "id": 1, "nama": "1. Penampilan:",
                "detail": [
                    { "id": 80352, "nama": "Tidak Rapi ", "type": "checkbox" },
                    { "id": 80353, "nama": "Penggunaan pakaian tidak sesuai ", "type": "checkbox" },
                    { "id": 80354, "nama": "Cara berpakaian tidak seperti biasanya ", "type": "checkbox" },
                ]
            }]

            $scope.listJ2 = [{
                "id": 1, "nama": "2. Pembicaraan:",
                "detail": [
                    { "id": 80355, "nama": "Cepat ", "type": "checkbox" },
                    { "id": 80356, "nama": "Keras ", "type": "checkbox" },
                    { "id": 80357, "nama": "Gagap ", "type": "checkbox" },
                    { "id": 80358, "nama": "Inkoheren ", "type": "checkbox" },
                    { "id": 80359, "nama": "Apatis ", "type": "checkbox" },
                    { "id": 80360, "nama": "Lambat ", "type": "checkbox" },
                    { "id": 80361, "nama": "Membisu ", "type": "checkbox" },
                    { "id": 80362, "nama": "Tidak mampu memulai pembicaraan ", "type": "checkbox" },
                ]
            }]

            $scope.listJ3 = [{
                "id": 1, "nama": "3. Aktifitas Motorik:",
                "detail": [
                    { "id": 80363, "nama": "Lesu ", "type": "checkbox" },
                    { "id": 80364, "nama": "Tegang ", "type": "checkbox" },
                    { "id": 80365, "nama": "Gelisah ", "type": "checkbox" },
                    { "id": 80366, "nama": "Agitasi ", "type": "checkbox" },
                    { "id": 80367, "nama": "Hiperaktif ", "type": "checkbox" },
                    { "id": 80368, "nama": "Tik ", "type": "checkbox" },
                    { "id": 80369, "nama": "Grimasen ", "type": "checkbox" },
                    { "id": 80370, "nama": "Tremor ", "type": "checkbox" },
                    { "id": 80371, "nama": "Kompulsif ", "type": "checkbox" },
                ]
            }]

            $scope.listJ4 = [{
                "id": 1, "nama": "4. Alam Perasaan:",
                "detail": [
                    { "id": 80372, "nama": "Sedih ", "type": "checkbox" },
                    { "id": 80373, "nama": "Ketakutan ", "type": "checkbox" },
                    { "id": 80374, "nama": "Putus Asa ", "type": "checkbox" },
                    { "id": 80375, "nama": "Khawatir ", "type": "checkbox" },
                    { "id": 80376, "nama": "Gembira Berlebihan ", "type": "checkbox" },
                ]
            }]

            $scope.listJ5 = [{
                "id": 1, "nama": "5. Afek:",
                "detail": [
                    { "id": 80377, "nama": "Dasar ", "type": "checkbox" },
                    { "id": 80378, "nama": "Tumpul ", "type": "checkbox" },
                    { "id": 80379, "nama": "Labil ", "type": "checkbox" },
                    { "id": 80380, "nama": "Tidak sesuai ", "type": "checkbox" },
                ]
            }]

            $scope.listJ6 = [{
                "id": 1, "nama": "6. Interaksi selama wawancara:",
                "detail": [
                    { "id": 80381, "nama": "Bermusuhan ", "type": "checkbox" },
                    { "id": 80382, "nama": "Tidak Kooperatif ", "type": "checkbox" },
                    { "id": 80383, "nama": "Mudah tersinggung ", "type": "checkbox" },
                    { "id": 80384, "nama": "Kontak mata kurang ", "type": "checkbox" },
                    { "id": 80385, "nama": "Defensif ", "type": "checkbox" },
                    { "id": 80386, "nama": "Curiga ", "type": "checkbox" },
                ]
            }]

            $scope.listJ7 = [{
                "id": 1, "nama": "7. Halusinasi:",
                "detail": [
                    { "id": 80387, "nama": "Ada ", "type": "checkbox" },
                    { "id": 80388, "nama": "Tidak ", "type": "checkbox" },
                ]
            },{
                "id": 2, "nama": "Jika ada:",
                "detail": [
                    { "id": 80389, "nama": "Pendengaran ", "type": "checkbox" },
                    { "id": 80390, "nama": "Penglihatan ", "type": "checkbox" },
                    { "id": 80391, "nama": "Perabaan ", "type": "checkbox" },
                    { "id": 80392, "nama": "Penghidu ", "type": "checkbox" },
                    { "id": 80393, "nama": "Pengecapan ", "type": "checkbox" },
                ]
            }]

            $scope.listJ8 = [{
                "id": 1, "nama": "8. Isi Pikir:",
                "detail": [
                    { "id": 80394, "nama": "Obsesi ", "type": "checkbox" },
                    { "id": 80395, "nama": "Pobia ", "type": "checkbox" },
                    { "id": 80396, "nama": "Hipokondria ", "type": "checkbox" },
                    { "id": 80397, "nama": "Dipersonalisasi ", "type": "checkbox" },
                    { "id": 80398, "nama": "Ide yang terkait ", "type": "checkbox" },
                    { "id": 80399, "nama": "Pikiran magis ", "type": "checkbox" },
                ]
            }]

            $scope.listJ9 = [{
                "id": 1, "nama": "9. Waham:",
                "detail": [
                    { "id": 80400, "nama": "Agama ", "type": "checkbox" },
                    { "id": 80401, "nama": "Somatik ", "type": "checkbox" },
                    { "id": 80402, "nama": "Kebesaran ", "type": "checkbox" },
                    { "id": 80403, "nama": "Curiga ", "type": "checkbox" },
                    { "id": 80404, "nama": "Siap Pikir ", "type": "checkbox" },
                    { "id": 80405, "nama": "Kontrol Pikir ", "type": "checkbox" },
                    { "id": 80406, "nama": "Sisip Pikir ", "type": "checkbox" },
                    { "id": 80407, "nama": "Nihilistrik ", "type": "checkbox" },
                ]
            }]

            $scope.listJ10 = [{
                "id": 1, "nama": "10. Proses Pikir:",
                "detail": [
                    { "id": 80408, "nama": "Sirkumstansial ", "type": "checkbox" },
                    { "id": 80409, "nama": "Tangensial ", "type": "checkbox" },
                    { "id": 80410, "nama": "Kehilangan Asosiasi ", "type": "checkbox" },
                    { "id": 80411, "nama": "Flight of Ideas ", "type": "checkbox" },
                    { "id": 80412, "nama": "Blocking ", "type": "checkbox" },
                    { "id": 80413, "nama": "Penghilangan pembicaraan ", "type": "checkbox" },
                ]
            }]

            $scope.listJ11 = [{
                "id": 1, "nama": "11. Tingkat Kesadaran:",
                "detail": [
                    { "id": 80414, "nama": "Bingung ", "type": "checkbox" },
                    { "id": 80415, "nama": "Sedasi ", "type": "checkbox" },
                    { "id": 80416, "nama": "Stupor ", "type": "checkbox" },
                ]
            }]

            $scope.listJ12 = [{
                "id": 1, "nama": "12. Disorientasi:",
                "detail": [
                    { "id": 80417, "nama": "Waktu ", "type": "checkbox" },
                    { "id": 80418, "nama": "Tempat ", "type": "checkbox" },
                    { "id": 80419, "nama": "Orang ", "type": "checkbox" },
                ]
            }]

            $scope.listJ13 = [{
                "id": 1, "nama": "13. Memori:",
                "detail": [
                    { "id": 80420, "nama": "Gangguan daya ingat jangka panjang ", "type": "checkbox" },
                    { "id": 80421, "nama": "Gangguan daya ingat jangka pendek ", "type": "checkbox" },
                    { "id": 80422, "nama": "Gangguan daya ingat saat ini ", "type": "checkbox" },
                    { "id": 80423, "nama": "Konfabulasi ", "type": "checkbox" },
                ]
            }]

            $scope.listJ14 = [{
                "id": 1, "nama": "14. Tingkat Konsentrasi dan Berhitung:",
                "detail": [
                    { "id": 80424, "nama": "Mudah beralih ", "type": "checkbox" },
                    { "id": 80425, "nama": "Tidak mampu berkonsentrasi ", "type": "checkbox" },
                    { "id": 80426, "nama": "Tidak mampu berhitung sederhana ", "type": "checkbox" },
                ]
            }]

            $scope.listJ15 = [{
                "id": 1, "nama": "15. Kemampuan Penilaian:",
                "detail": [
                    { "id": 80427, "nama": "Gangguan ringan ", "type": "checkbox" },
                    { "id": 80428, "nama": "Gangguan bermakna ", "type": "checkbox" },
                ]
            }]

            $scope.listJ16 = [{
                "id": 1, "nama": "16. Daya Tilik Diri:",
                "detail": [
                    { "id": 80429, "nama": "Memngingkari penyakit yang dideritanya ", "type": "checkbox" },
                    { "id": 80430, "nama": "Menyalahkan hal-hal di luar dirinya ", "type": "checkbox" },
                    { "id": 80431, "nama": "Lain-lain, jelaskan ", "type": "textbox" },
                ]
            }]

            $scope.listK1 = [{
                "id": 1, "nama": "1. Makan:",
                "detail": [
                    { "id": 80432, "nama": "Bantuan minimal ", "type": "checkbox" },
                    { "id": 80433, "nama": "Bantuan total ", "type": "checkbox" },
                ]
            }]

            $scope.listK2 = [{
                "id": 1, "nama": "2. BAB/BAK:",
                "detail": [
                    { "id": 80434, "nama": "Bantuan minimal ", "type": "checkbox" },
                    { "id": 80435, "nama": "Bantuan total ", "type": "checkbox" },
                ]
            }]

            $scope.listK3 = [{
                "id": 1, "nama": "3. Mandi:",
                "detail": [
                    { "id": 80436, "nama": "Bantuan minimal ", "type": "checkbox" },
                    { "id": 80437, "nama": "Bantuan total ", "type": "checkbox" },
                ]
            }]

            $scope.listK4 = [{
                "id": 1, "nama": "4. Berpakaian / Berhias:",
                "detail": [
                    { "id": 80438, "nama": "Bantuan minimal ", "type": "checkbox" },
                    { "id": 80439, "nama": "Bantuan total ", "type": "checkbox" },
                ]
            }]

            $scope.listK5 = [{
                "id": 1, "nama": "5. Istirahat dan Tidur:",
                "detail": [
                    { "id": 80440, "nama": "Tidur siang selama ", "type": "textbox" },
                    { "id": 80441, "nama": "s/d ", "type": "textbox" },
                    { "id": 80442, "nama": "Tidur malam selama ", "type": "textbox" },
                    { "id": 80443, "nama": "s/d ", "type": "textbox" },
                    { "id": 80444, "nama": "Kegiatan sebelum / sesudah tidur ", "type": "textbox" },
                ]
            }]

            $scope.listK6 = [{
                "id": 1, "nama": "6. Penggunaan Obat:",
                "detail": [
                    { "id": 80445, "nama": "Bantuan minimal ", "type": "checkbox" },
                    { "id": 80446, "nama": "Bantuan total ", "type": "checkbox" },
                ]
            }]

            $scope.listK7 = [{
                "id": 1, "nama": "Perawatan lanjutan:",
                "detail": [
                    { "id": 80447, "nama": "Ya ", "type": "checkbox" },
                    { "id": 80448, "nama": "Tidak  ", "type": "checkbox" },
                ]
            },{
                "id": 2, "nama": "Perawatan pendukung :",
                "detail": [
                    { "id": 80449, "nama": "Ya ", "type": "checkbox" },
                    { "id": 80450, "nama": "Tidak  ", "type": "checkbox" },
                ]
            }]

            $scope.listK8 = [{
                "id": 1, "nama": "Mempersiapkan makanan:",
                "detail": [
                    { "id": 80451, "nama": "Ya ", "type": "checkbox" },
                    { "id": 80452, "nama": "Tidak  ", "type": "checkbox" },
                ]
            },{
                "id": 2, "nama": "Mencuci pakaian:",
                "detail": [
                    { "id": 80453, "nama": "Ya ", "type": "checkbox" },
                    { "id": 80454, "nama": "Tidak  ", "type": "checkbox" },
                ]
            },{
                "id": 3, "nama": "Pengaturan keuangan:",
                "detail": [
                    { "id": 80456, "nama": "Ya ", "type": "checkbox" },
                    { "id": 80457, "nama": "Tidak  ", "type": "checkbox" },
                ]
            },{
                "id": 4, "nama": "Menjaga kerapihan rumah:",
                "detail": [
                    { "id": 80458, "nama": "Ya ", "type": "checkbox" },
                    { "id": 80459, "nama": "Tidak  ", "type": "checkbox" },
                ]
            }]

            $scope.listK9 = [{
                "id": 1, "nama": "Belanja :",
                "detail": [
                    { "id": 80460, "nama": "Ya ", "type": "checkbox" },
                    { "id": 80461, "nama": "Tidak ", "type": "checkbox" },
                ]
            },{
                "id": 2, "nama": "Transportasi :",
                "detail": [
                    { "id": 80462, "nama": "Ya ", "type": "checkbox" },
                    { "id": 80463, "nama": "Tidak ", "type": "checkbox" },
                ]
            },{
                "id": 3, "nama": "Lain-lain :",
                "detail": [
                    { "id": 80464, "nama": "", "type": "textbox" },
                ]
            }]

            $scope.listL = [{
                "id": 1, "nama": "",
                "detail": [
                    { "id": 80465, "nama": "Halusinasi ", "type": "checkbox" },
                    { "id": 80466, "nama": "Keputusasaan ", "type": "checkbox" },
                    { "id": 80467, "nama": "Perilaku Kekerasan / Risiko Perilaku Kekerasan ", "type": "checkbox" },
                    { "id": 80468, "nama": "Ansietas Sedang ", "type": "checkbox" },
                    { "id": 80469, "nama": "Menarik Diri ", "type": "checkbox" },
                    { "id": 80470, "nama": "Peningkatan Mobilitas Fisik ", "type": "checkbox" },
                    { "id": 80471, "nama": "Waham ", "type": "checkbox" },
                    { "id": 80472, "nama": "Koping Mekanisme Tidak Efektif ", "type": "checkbox" },
                    { "id": 80473, "nama": "Harga Diri Rendah ", "type": "checkbox" },
                    { "id": 80474, "nama": "Risiko Bunuh Diri ", "type": "checkbox" },
                    { "id": 80475, "nama": "Defisit Perawatan Diri ", "type": "checkbox" },
                    { "id": 80476, "nama": "Lainnya: ", "type": "textbox" },
                ]
            }]


            $scope.listSkorNRC = [{
                "id": 8, "nama": "Score ",
                "detail": [
                    { "id": 80493, "nama": "0", "type": "checkbox", "ket": "= Tidak Nyeri" },
                    { "id": 80494, "nama": "1 - 3", "type": "checkbox", "ket": "= Nyeri Ringan" },
                    { "id": 80495, "nama": "4 - 6", "type": "checkbox", "ket": "= Nyeri Sedang" },
                    { "id": 80496, "nama": "7 - 10", "type": "checkbox", "ket": "= Nyeri Berat" },
                ]
            }]
            $scope.listSkorWong = [{
                "id": 9, "nama": "Score ",
                "detail": [
                    { "id": 80497, "nama": "0 - 1", "type": "checkbox", "ket": "= Tidak Ada Nyeri" },
                    { "id": 80498, "nama": "2 - 3", "type": "checkbox", "ket": "= Sedikit Nyeri" },
                    { "id": 80499, "nama": "4 - 5", "type": "checkbox", "ket": "= Cukup Nyeri" },
                    { "id": 80500, "nama": "6 - 7", "type": "checkbox", "ket": "= Lumayan Nyeri" },
                    { "id": 80501, "nama": "8 - 9", "type": "checkbox", "ket": "= Sangat Nyeri" },
                    { "id": 80502, "nama": "10", "type": "checkbox", "ket": "= Amat Sangat Nyeri" },
                ]
            }]
            $scope.listNyeriAnak = [
                {
                    "id": 10, "nama": "Hurts", "detail": [
                    { "id": 80503, "nama": "No Hurt", "descNilai": 0 },
                    { "id": 80504, "nama": "Hurts Little Bit", "descNilai": 2 }, 
                    { "id": 80505, "nama": "Hurts Little More", "descNilai": 4 },
                    { "id": 80506, "nama": "Hurts Even More", "descNilai": 6 }, 
                    { "id": 80507, "nama": "Hurts Whole Lot", "descNilai": 8 },
                    { "id": 80508, "nama": "Hurts whorts", "descNilai": 10 }]
                }
            ]
            $scope.listHumpty = [

                {
                    "id": 1, "nama": "Usia",
                    "detail": [
                        { "id": 80509, "nama": "< 3 tahun", "descNilai": "4" },
                        { "id": 80510, "nama": "3-7 tahun", "descNilai": "3" },
                        { "id": 80511, "nama": "8-12 tahun", "descNilai": "2" },
                        { "id": 80512, "nama": ">= 13 tahun", "descNilai": "1" },
                    ]
                },

                {
                    "id": 2, "nama": "Jenis kelamin",
                    "detail": [
                        { "id": 80513, "nama": "Laki-laki", "descNilai": "2" },
                        { "id": 80514, "nama": "Perempuan", "descNilai": "1" },
                    ]
                },

                {
                    "id": 3, "nama": "Diagnosis",
                    "detail": [
                        { "id": 80515, "nama": "Diagnosis Neurologi", "descNilai": "4" },
                        { "id": 80516, "nama": "Perubahan Oksigenasi (Diagnosis respiratorik, dehidrasi, anemia, anoreksia, sinkop, pusing, dsb)", "descNilai": "3" },
                        { "id": 80517, "nama": "Gangguan perilaku / psikiatri", "descNilai": "2" },
                        { "id": 80518, "nama": "Diagnosis lainnya", "descNilai": "1" },
                    ]
                    
                },

                {
                    "id": 4, "nama": "Gangguan/kognitif",
                    "detail": [
                        { "id": 80519, "nama": "Tidak menyadari keterbatasan dirinya", "descNilai": "3" },
                        { "id": 80520, "nama": "Lupa karena adanya keterbatasan", "descNilai": "2" },
                        { "id": 80521, "nama": "Orientasi baik terhadap diri sendiri", "descNilai": "1" },

                    ]
                },
                {
                    "id": 5, "nama": "Faktor lingkungan",
                    "detail": [
                        { "id": 80522, "nama": "Riwayat jatuh-bayi diletakan ditempat tidur dewasa", "descNilai": "4" },
                        { "id": 80523, "nama": "Pasien Menggunakan Alat bantu/bayi diletakan dalam tempat tidur bayi/perabot rumah", "descNilai": "3" },
                        { "id": 80524, "nama": "Pasien diletakan ditempat tidur", "descNilai": "2" },
                        { "id": 80525, "nama": "Area diluar rumah sakit", "descNilai": "1" },


                    ]
                },
                {
                    "id": 6, "nama": "Respon terhadap :Pembedahan/sedasi/anestesi, penggunaan medikamentosa",
                    "detail": [
                        { "id": 80526, "nama": "Dalam 24 jam ", "descNilai": "3" },
                        { "id": 80527, "nama": "Dalam 48 jam", "descNilai": "2" },
                        { "id": 80528, "nama": "> 48 jam/tidak mengalami perbedaan/sedasi/anestesi", "descNilai": "1" },

                    ]
                },
                {
                    "id": 7, "nama": "Penggunaan medikamentosa",
                    "detail": [
                        { "id": 80529, "nama": "penggunaan multiple, sedatif, obat hipnosis, harbiturat, fanotiazin, anti depresan, pencahar, diuretik, narkosa", "descNilai": "3" },
                        { "id": 80530, "nama": "penggunaan salah satu obat diatas", "descNilai": "2" },
                        { "id": 80531, "nama": "penggunaan medikasi lainnya atau tidak ada medikasi", "descNilai": "1" },

                    ]
                },
            ]





//====================================================================================================================
































            $scope.listRujukan = [
                {
                    "id": 1, "nama": "Rujukan",
                    "detail": [
                        { "id": 14360, "nama": "Ya, dari :", "type": "checkbox" },
                        { "id": 14361, "nama": "", "type": "textbox" },
                        { "id": 14362, "nama": "Datang, sendiri, diantar :", "type": "checkbox" },
                        { "id": 14363, "nama": "", "type": "textbox" },
                    ]
                },
            ]
            $scope.listNyeri = [{
                "id": 1, "nama": "Apakah ada nyeri :",
                "detail": [
                    { "id": 14435, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 14436, "nama": "Ya ", "type": "checkbox" },
                    
                ]
            }
            ]
             $scope.listNyeri2 = [{
                "id": 1, "nama": "Pasien berisiko maltrunisi tinggid rujuk ke Ahli Gizi :",
                "detail": [
                    { "id": 14885, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 14886, "nama": "Ya ", "type": "checkbox" },
                    
                ]
            }
            ]
            $scope.listNyeri3 = [{
                "id": 1, "nama": "Jelaskan :",
                "detail": [
                    { "id": 14880, "nama": "Pencetus ", "type": "textbox" },

                    { "id": 14881, "nama": "Kualitas ", "type": "textbox" },
                    { "id": 14882, "nama": "Lokasi ", "type": "textbox" },
                    { "id": 14883, "nama": "Skala ", "type": "textbox" },
                    { "id": 14884, "nama": "Durasi ", "type": "textbox" },
                    
                ]
            }
            ]
            $scope.listPartus = [{
                "id": 1, "nama": "Partus :",
                "detail": [
                    { "id": 14364, "nama": "Spontan ", "type": "checkbox" },

                    { "id": 14365, "nama": "Tindakan ", "type": "checkbox" },
                    { "id": 14366, "nama": "Ditolong Oleh : ", "type": "textbox" },
                ]
            }
            ]
            $scope.listTKA1 = [{
                "id": 1, "nama": "Imunisasi :",
                "detail": [
                    { "id": 14367, "nama": "Lengkap ", "type": "checkbox" },

                    { "id": 14368, "nama": "Tidak Lengkap ", "type": "checkbox" },
                    { "id": 14369, "nama": "Jelaskan  : ", "type": "textbox" },
                ]
            }
            ]
            $scope.listTKA2 = [{
                "id": 1, "nama": "Kelainan Bawaan :",
                "detail": [
                    { "id": 14370, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 14371, "nama": "Ya ", "type": "checkbox" },
                    { "id": 14372, "nama": "Jelaskan  : ", "type": "textbox" },
                ]
            }
            ]
            $scope.listTKA3 = [{
                "id": 1, "nama": "Penyakit yang pernah di derita :",
                "detail": [
                    { "id": 14373, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 14374, "nama": "Ya ", "type": "checkbox" },
                    { "id": 14375, "nama": "Jelaskan  : ", "type": "textbox" },
                ]
            }
            ]
            $scope.listTKA4 = [{
                "id": 1, "nama": "Pernah dirawat di RS:",
                "detail": [
                    { "id": 14376, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 14377, "nama": "Ya ", "type": "checkbox" },
                    { "id": 14378, "nama": "Jelaskan  : ", "type": "textbox" },
                ]
            }
            ]
            $scope.listTKA5 = [{
                "id": 1, "nama": "Penurunan prestasi sekolah :",
                "detail": [
                    { "id": 14379, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 14380, "nama": "Ya ", "type": "checkbox" },
                    { "id": 14381, "nama": "Jelaskan  : ", "type": "textbox" },
                ]
            }
            ]
            $scope.listTKA6 = [{
                "id": 1, "nama": "Riwayat Aniaya :",
                "detail": [
                    { "id": 14382, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 14383, "nama": "Ya : ", "type": "checkbox" },
                ]
            }
            ]
            $scope.listYa = [{
                "id": 1, "nama": "Riwayat Aniaya :",
                "detail": [
                    
                    { "id": 14384, "nama": "Fisik ", "type": "checkbox" },
                    { "id": 14385, "nama": "Sexual ", "type": "checkbox" },
                    { "id": 14386, "nama": "Penolakan ", "type": "checkbox" },
                    { "id": 14387, "nama": "KDRT ", "type": "checkbox" },
                    { "id": 14388, "nama": "Kriminal ", "type": "checkbox" },
                    { "id": 14389, "nama": "Lainnya ", "type": "checkbox" },
                ]
            }
            ]



            $scope.listStatusAnak = [{
                "id": 1, "nama": "Status Anak :",
                "detail": [
                    { "id": 14390, "nama": "Anak Kandung ", "type": "checkbox" },

                    { "id": 14391, "nama": "Anak Tiri ", "type": "checkbox" },
                    { "id": 14392, "nama": "Anak Angkat", "type": "checkbox" },
                ]
            }
            ]
            $scope.listPendidikan = [{
                "id": 1, "nama": "Pendidikan:",
                "detail": [
                    { "id": 14393, "nama": "Belum Sekolah/TIdak Sekolah", "type": "checkbox" },
                    { "id": 14394, "nama": "TK ", "type": "checkbox" },
                    { "id": 14395, "nama": "SD ", "type": "checkbox" },
                    { "id": 14396, "nama": "SMP ", "type": "checkbox" },
                    { "id": 14397, "nama": "SLTA", "type": "checkbox" },
                ]
            }
            ]
            $scope.listBahasa = [{
                "id": 1, "nama": "Bahasa yang digunakan:",
                "detail": [
                    { "id": 14398, "nama": "Indonesia", "type": "checkbox" },
                    { "id": 14399, "nama": "Daerah ", "type": "checkbox" },
                    { "id": 14400, "nama": "Jawa ", "type": "checkbox" },
                    { "id": 14401, "nama": "Lainnya : ", "type": "checkbox" },
                    { "id": 14402, "nama": "", "type": "textbox" },
                ]
            }
            ]
            $scope.listPenerjemah = [{
                "id": 1, "nama": "  Perlu Penerjemah:",
                "detail": [
                    { "id": 14403, "nama": "Tidak", "type": "checkbox" },
                    { "id": 14404, "nama": "Ya, Jelaskan ", "type": "checkbox" },
                    
                    { "id": 14405, "nama": "", "type": "textbox" },
                ]
            }
            ]
            $scope.listAgama = [{
                "id": 1, "nama": "Agama:",
                "detail": [
                    { "id": 14406, "nama": "Islam", "type": "checkbox" },
                    { "id": 14407, "nama": "Kristen ", "type": "checkbox" },
                    { "id": 14408, "nama": "Khatolik ", "type": "checkbox" },
                    { "id": 14409, "nama": "Budha : ", "type": "checkbox" },
                    { "id": 14410, "nama": "Hindu", "type": "checkbox" },
                ]
            }
            ]
            $scope.listRumah = [{
                "id": 1, "nama": "Rumah:",
                "detail": [
                    { "id": 14411, "nama": "Rumah Sendiri/Orang tua", "type": "checkbox" },
                    { "id": 14412, "nama": "Sewa ", "type": "checkbox" },
                    { "id": 14413, "nama": "Kontrak ", "type": "checkbox" },
                    { "id": 14414, "nama": "Lainnya ", "type": "textbox" },
                ]
            }
            ]
            $scope.listPendidikanOT = [{
                "id": 1, "nama": "Pendidikan Orang Tua:",
                "detail": [
                    { "id": 14415, "nama": "Tidak Sekolah", "type": "checkbox" },
                    { "id": 14416, "nama": "TK", "type": "checkbox" },
                    { "id": 14417, "nama": "SD", "type": "checkbox" },
                    { "id": 14418, "nama": "SMP", "type": "checkbox" },
                    { "id": 14419, "nama": "SLTA ", "type": "checkbox" },
                    { "id": 14420, "nama": "Sarjana", "type": "checkbox" },
                    
                ]
            }
            ]
            $scope.listPekerjaanOT = [{
                "id": 1, "nama": "Pekerjaan Orang Tua:",
                "detail": [
                    { "id": 14421, "nama": "PNS/TNI/POLRI", "type": "checkbox" },
                    { "id": 14422, "nama": "Swasta", "type": "checkbox" },
                    { "id": 14423, "nama": "Lainnya", "type": "textbox" },
                    
                    
                ]
            }
            ]

            $scope.listGizi = [

                {
                    "id": 1, "nama": "Apakah pasien tampak kurus",
                    "detail": [
                        { "id": 14424, "nama": "a. Tidak", "descNilai": "0" },
                        { "id": 14425, "nama": "b. Ya", "descNilai": "1" },
                    ]
                },
                {
                    "id": 2, "nama": "Apakah terdapat penurunan BB selama 1bulan terakhir(Berdasarkan penilaian objektif data BB bila ada/ penilaian seubjektif dari orang tua Pasien atau untuk bayi =< 1 tahun BB tidak naik selama3 bulan terakhir ",
                    "detail": [
                        { "id": 14426, "nama": "a. Tidak", "descNilai": "0" },
                        { "id": 14427, "nama": "b. Ya", "descNilai": "1" }
                    ]
                
                },
                {
                    "id": 3, "nama": "Apakah terdapat salah satu dari kondisi berikut?Diare >=5 kali/hari dan atau muntah >=3 kali/hari dalam seminggu terakhir, Asupan makananberkurang selama 1 minggu terakhir",
                    "detail": [
                        { "id": 14428, "nama": "a. Tidak", "descNilai": "0" },
                        { "id": 14429, "nama": "b. Ya", "descNilai": "1" },
                    ]
                },
                {
                    "id": 4, "nama": "Apakah terdapat Penyakit, keadaan yang mengakibatkan pasien beresiko  mengalami malnutrisi",
                    "detail": [
                        { "id": 14430, "nama": "a. Tidak", "descNilai": "0" },
                        { "id": 14431, "nama": "b. Ya", "descNilai": "2" },
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
                    { "id": 14460, "nama": "0", "type": "checkbox", "ket": "= Tidak Nyeri" },
                    { "id": 14461, "nama": "1 - 3", "type": "checkbox", "ket": "= Nyeri Ringan" },
                    { "id": 14462, "nama": "4 - 6", "type": "checkbox", "ket": "= Nyeri Sedang" },
                    { "id": 14463, "nama": "7 - 10", "type": "checkbox", "ket": "= Nyeri Berat" },
                ]
            }]
            $scope.listSkorWong = [{
                "id": 9, "nama": "Score ",
                "detail": [
                    { "id": 14464, "nama": "0 - 1", "type": "checkbox", "ket": "= Tidak Ada Nyeri" },
                    { "id": 14465, "nama": "2 - 3", "type": "checkbox", "ket": "= Sedikit Nyeri" },
                    { "id": 14466, "nama": "4 - 5", "type": "checkbox", "ket": "= Cukup Nyeri" },
                    { "id": 14467, "nama": "6 - 7", "type": "checkbox", "ket": "= Lumayan Nyeri" },
                    { "id": 14468, "nama": "8 - 9", "type": "checkbox", "ket": "= Sangat Nyeri" },
                    { "id": 14469, "nama": "10", "type": "checkbox", "ket": "= Amat Sangat Nyeri" },
                ]
            }]
            $scope.listNyeriAnak = [
                {
                    "id": 10, "nama": "Hurts", "detail": [
                    { "id": 14470, "nama": "No Hurt", "descNilai": 0 },
                    { "id": 14471, "nama": "Hurts Little Bit", "descNilai": 2 }, 
                    { "id": 14472, "nama": "Hurts Little More", "descNilai": 4 },
                    { "id": 14473, "nama": "Hurts Even More", "descNilai": 6 }, 
                    { "id": 14474, "nama": "Hurts Whole Lot", "descNilai": 8 },
                    { "id": 14475, "nama": "Hurts whorts", "descNilai": 10 }]
                }
            ]
            $scope.listHumpty = [

                {
                    "id": 1, "nama": "Usia",
                    "detail": [
                        { "id": 14476, "nama": "< 3 tahun", "descNilai": "4" },
                        { "id": 14477, "nama": "3-7 tahun", "descNilai": "3" },
                        { "id": 14478, "nama": "8-12 tahun", "descNilai": "2" },
                        { "id": 14479, "nama": ">= 13 tahun", "descNilai": "1" },
                    ]
                },

                {
                    "id": 2, "nama": "Jenis kelamin",
                    "detail": [
                        { "id": 14480, "nama": "Laki-laki", "descNilai": "2" },
                        { "id": 14481, "nama": "Perempuan", "descNilai": "1" },
                    ]
                },

                {
                    "id": 3, "nama": "Diagnosis",
                    "detail": [
                        { "id": 14482, "nama": "Diagnosis Neurologi", "descNilai": "4" },
                        { "id": 14483, "nama": "Perubahan Oksigenasi (Diagnosis respiratorik, dehidrasi, anemia, anoreksia, sinkop, pusing, dsb)", "descNilai": "3" },
                        { "id": 14484, "nama": "Gangguan perilaku / psikiatri", "descNilai": "2" },
                        { "id": 14485, "nama": "Diagnosis lainnya", "descNilai": "1" },
                    ]
                    
                },

                {
                    "id": 4, "nama": "Gangguan/kognitif",
                    "detail": [
                        { "id": 14486, "nama": "Tidak menyadari keterbatasan dirinya", "descNilai": "3" },
                        { "id": 14487, "nama": "Lupa karena adanya keterbatasan", "descNilai": "2" },
                        { "id": 14488, "nama": "Orientasi baik terhadap diri sendiri", "descNilai": "1" },

                    ]
                },
                {
                    "id": 5, "nama": "Faktor lingkungan",
                    "detail": [
                        { "id": 14489, "nama": "Riwayat jatuh-bayi diletakan ditempat tidur dewasa", "descNilai": "4" },
                        { "id": 14490, "nama": "Pasien Menggunakan Alat bantu/bayi diletakan dalam tempat tidur bayi/perabot rumah", "descNilai": "3" },
                        { "id": 14491, "nama": "Pasien diletakan ditempat tidur", "descNilai": "2" },
                        { "id": 14492, "nama": "Area diluar rumah sakit", "descNilai": "1" },


                    ]
                },
                {
                    "id": 6, "nama": "Respon terhadap :Pembedahan/sedasi/anestesi, penggunaan medikamentosa",
                    "detail": [
                        { "id": 14493, "nama": "Dalam 24 jam ", "descNilai": "3" },
                        { "id": 14494, "nama": "Dalam 48 jam", "descNilai": "2" },
                        { "id": 14495, "nama": "> 48 jam/tidak mengalami perbedaan/sedasi/anestesi", "descNilai": "1" },

                    ]
                },
                {
                    "id": 7, "nama": "Penggunaan medikamentosa",
                    "detail": [
                        { "id": 14496, "nama": "penggunaan multiple, sedatif, obat hipnosis, harbiturat, fanotiazin, anti depresan, pencahar, diuretik, narkosa", "descNilai": "3" },
                        { "id": 14497, "nama": "penggunaan salah satu obat diatas", "descNilai": "2" },
                        { "id": 14498, "nama": "penggunaan medikasi lainnya atau tidak ada medikasi", "descNilai": "1" },

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
                            if(dataLoad[i].emrdfk == 14499)
                                $scope.totalSkor4 = parseFloat(dataLoad[i].value)
                              if(dataLoad[i].emrdfk == 3152)
                                $scope.totalSkor = parseFloat(dataLoad[i].value)
                              if(dataLoad[i].emrdfk == 14432)
                                $scope.skorGizi = parseFloat(dataLoad[i].value)
                               
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
            $scope.$watch('item.obj[80532]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai >=7 && nilai <=11 ) {
                    $scope.item.obj[80533] = true
                    $scope.item.obj[80534] = false
                   
                }
                if (nilai >= 12) {
                    $scope.item.obj[80533] = false
                    $scope.item.obj[80534] = true
                 
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
                $scope.item.obj[80532] = $scope.totalSkor4
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
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,  
                   'Asesmen Keperawatan Jiwa Anak dan Remaja Rawat Jalan ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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