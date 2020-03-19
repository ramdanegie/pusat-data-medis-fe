define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LembarPedagogeCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.totalSkor4 = 0
            $scope.cc = {}
            var norecEMR = ''
            var nomorEMR = '-'
            $scope.isCetak = true
            $scope.cc.emrfk = 362
            var dataLoad = []
            $scope.now = new Date

            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
            })
            medifirstService.getPart('emr/get-datacombo-part-ruangan-pelayanan', true, true, 20).then(function (data) {
                $scope.listRuang = data
            
             })
             medifirstService.getPart('emr/get-datacombo-part-diagnosa', true, true, 20).then(function (data) {
                $scope.listDiagnosa = data
            })
             medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 362).then(function (e) {

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
                    "id": 3, "nama": "3. Tanggal/Lahir :",
                    "detail": [
                        { "id": 15036, "nama": "", "type": "datetime" },
                        
                        
                        
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
                    "id": 1, "nama": "I. Diagnosis masuk :",
                    "detail": [
                        { "id": 101996, "": "", "type": "textarea" },
                        
                        
                    ]
                },
                {
                    "id": 1, "nama": "II. Diagnosis Penerima :",
                    "detail": [
                        { "id": 101997, "": "", "type": "textarea" },
                        
                        
                    ]
                },
            ]
             $scope.listpemeriksaan = [
                {
                    "id": 1, "nama": "III. Pemeriksaan",
                    "detail": [
                        { "id": 101998, "nama": "A. Keluhan utama", "type": "textarea" },
                        { "id": 101999, "nama": "B. Kemampuan Kognitif", "type": "textarea" },
                        { "id": 102000, "nama": "C. Kemampuan Bahasa dan Bicara", "type": "textarea" },
                        { "id": 102001, "nama": "D. Kemampuan Sensori Penglihatan dan Pendengaran", "type": "textarea" },
                        { "id": 102002, "nama": "E. Kemampuan Motorik Kasar dan Halus", "type": "textarea" },
                        { "id": 102003, "nama": "F. Perkembangan Psikologis", "type": "textarea" },
                        { "id": 102004, "nama": "G. Sosialisasi", "type": "textarea" },
                        { "id": 102005, "nama": "H. Program Terapi", "type": "textarea" },
                        

                        
                        
                    ]
                },
                
            ]
            
            
            
            var cacheNomorEMR = cacheHelper.get('cacheNomorEMR');
            var cacheNoREC = cacheHelper.get('cacheNOREC_EMR');
            if(cacheNoREC!= undefined){
                norecEMR = cacheNomorEMR[1]
            }
            if (cacheNomorEMR != undefined) {
                nomorEMR = cacheNomorEMR[0]
              
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
                client.get('http://127.0.0.1:1237/printvb/e-rekammedis?cetak-surat-permintaan-ri&id=' + $scope.cc.nocm + '&emr=' + norecEMR + '&view=true', function (response) {
                    // do something with response
                });
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
                $scope.cc.tgllahir = chacePeriode[18]
                if (nomorEMR == '-') {
                    $scope.cc.norec_emr = '-'
                } else {
                    $scope.cc.norec_emr = nomorEMR
                }
            }
            var chekedd = false
            var cacheEMR_igd = cacheHelper.get('cacheEMR_igd');

            medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + nomorEMR + "&emrfk=" + $scope.cc.emrfk, true).then(function (dat) {
                $scope.item.obj = []
                $scope.item.obj2 = []
                if (cacheEMR_igd != undefined) {

                            // SET DARI SKOR CTRS
                            medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + cacheEMR_igd + "&emrfk=" + 146, true).then(function (datss) {
                                var dataNA = datss.data.data
                                
                                for (var i = 0; i <= dataNA.length - 1; i++) {
                                    if (dataNA[i].type == "textbox") {
                                            $scope.item.obj[dataNA[i].emrdfk] = dataNA[i].value
                                            if (dataNA[i].emrdfk=='4193')
                                             $scope.item.obj[15699] = dataNA[i].value
                                            // if (dataNA[i].emrdfk=='14911') 
                                            //  $scope.item.obj[10693] = dataNA[i].value
                                            // if (dataNA[i].emrdfk=='14912') 
                                            //      $scope.item.obj[10694] = dataNA[i].value
                                            //  if (dataNA[i].emrdfk=='14913') 
                                            //      $scope.item.obj[10695] = dataNA[i].value
                                                    

                                    }

                                }
                               
                                


                            })
                        }
                dataLoad = dat.data.data
                
                // $scope.item.obj[15131] = $scope.now
                // $scope.item.obj[15696] = new Date ($scope.cc.tgllahir) 
                // $scope.item.obj[15694] = $scope.cc.namapasien
                // $scope.item.obj[15695] = $scope.cc.nocm
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

                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if($scope.item.obj[parseInt(arrobj[i])] instanceof Date)
                        $scope.item.obj[parseInt(arrobj[i])] = moment($scope.item.obj[parseInt(arrobj[i])]).format('YYYY-MM-DD HH:mm')
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
                    'Surat Permintaan Rawat Inap ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
                    + $scope.cc.noregistrasi).then(function (res) {
                    })
                    var arrStr = {
                        0: e.data.data.noemr
                    }
                    cacheHelper.set('cacheNomorEMR', arrStr);
                });
            }

        }
    ]);
});