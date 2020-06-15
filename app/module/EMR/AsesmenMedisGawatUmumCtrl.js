define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AsesmenMedisGawatUmumCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.totalSkor4 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 468
            var peagawaiLogin = medifirstService.getPegawaiLogin()
            var dataLoad = []
            var pegawaiInputDetail= ''
            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
            })
            $scope.listRujukan = [
                {
                    "id": 1, "nama": "1. Keluhan Utama atau Indikasi",
                    "detail": [
                        { "id": 114939, "nama": "", "type": "textarea" },
                    ]
                },
                {
                    "id": 1, "nama": "2. Riwayat penyakit sekarang",
                    "detail": [
                        { "id": 114940, "nama": "", "type": "textarea" },
                    ]
                },
                {
                    "id": 1, "nama": "3. Riwayat penyakit sebelumnya",
                    "detail": [
                        { "id": 114941, "nama": "", "type": "textarea" },
                    ]
                },
            ]
            $scope.listRPS = [{
                "id": 1, "nama": "a. Riwayat Alergi :",
                "detail": [
                    { "id": 114942, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 114943, "nama": "Ya ", "type": "checkbox" },
                    { "id": 114944, "nama": "Obat, Sebutkan  : ", "type": "textarea" },
                    { "id": 114945, "nama": "Makanan, Sebutkan  : ", "type": "textarea" },               
                ]
            },
            {
                "id": 1, "nama": "b. Riwayat Diabetis Melitus :",
                "detail": [
                    { "id": 114946, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 114947, "nama": "Ya, ", "type": "checkbox" },
                    { "id": 114948, "nama": "Pengobatan  : ", "type": "textarea" },
                ]
            },
            {
                "id": 1, "nama": "c. Riwayat Penyakit Fisik :",
                "detail": [
                    { "id": 114949, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 114950, "nama": "Ya, ", "type": "checkbox" },
                    { "id": 114951, "nama": "Sebutkan  : ", "type": "textarea" },
                ]
            },
            {
                "id": 1, "nama": "d. Riwayat Hipertensi :",
                "detail": [
                    { "id": 114952, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 114953, "nama": "Ya, ", "type": "checkbox" },
                    { "id": 114954, "nama": "Sebutkan  : ", "type": "textarea" },
                ]
            },
            {
                "id": 1, "nama": "e. Riwayat Penggunaan Obat :",
                "detail": [
                    { "id": 114955, "nama": "Amphetamin ", "type": "checkbox" },

                    { "id": 114956, "nama": "Benzodiazepin", "type": "checkbox" },
                    { "id": 114957, "nama": "Canabis ", "type": "checkbox" },
                    { "id": 114958, "nama": "Opiate ", "type": "checkbox" },

                    { "id": 114959, "nama": "Alkohol", "type": "checkbox" },
                    { "id": 114960, "nama": "Lainnya, ", "type": "checkbox" },
                    { "id": 114961, "nama": " ", "type": "textarea" },
                ]
            },
            {
                "id": 1, "nama": "f. Riwayat Mondok :",
                "detail": [
                    { "id": 114962, "nama": "Tidak ", "type": "checkbox" },

                    { "id": 114963, "nama": "Ya, ", "type": "checkbox" },
                    { "id": 114964, "nama": "Karena apa dan dimana  : ", "type": "textarea" },
                ]
            },
            ]
            $scope.listRPS2 = [{
                "id": 1, "nama": "a. Keadaan Umum :",
                "detail": [
                    { "id": 114965, "nama": "Baik ", "type": "checkbox" },
                    { "id": 114966, "nama": "Sedang ", "type": "checkbox" },
                    { "id": 114967, "nama": "Lemah ", "type": "checkbox" },
                    { "id": 114968, "nama": "Lainnya ", "type": "checkbox" },
                    { "id": 114969, "nama": " ", "type": "textarea" },
                    
                ]
            },
            {
                "id": 1, "nama": "b. Kesadaran (GCS) :",
                "detail": [
                    { "id": 114970, "nama": "E : ", "type": "textbox" },
                    { "id": 114971, "nama": "V : ", "type": "textbox" },
                    { "id": 114972, "nama": "M : ", "type": "textbox" },
                ]
            }
            ]
            $scope.listRPS3 = [{
                "id": 1, "nama": "",
                "detail": [
                    { "id": 114977, "nama": "Kulit ", "type": "textarea" },  
                ]
            },
            {
                "id": 1, "nama": "",
                "detail": [
                    { "id": 114978, "nama": "Kepala (Mata/hidung/telinga/mulut/tenggorok ", "type": "textarea" },  
                ]
            },
            {
                "id": 1, "nama": "",
                "detail": [
                   { "id": 114979, "nama": "Leher ", "type": "textarea" }, 
                ]
            },
            {
                "id": 1, "nama": "Dada Bentuk",
                "detail": [
                   { "id": 114980, "nama": "Jantung  ", "type": "textarea" }, 
                   { "id": 114981, "nama": "Paru-paru  ", "type": "textarea" }, 
                ]
            },
            {
                "id": 1, "nama": "",
                "detail": [
                   { "id": 114982, "nama": "Abdomen", "type": "textarea" }, 
                ]
            },
            {
                "id": 1, "nama": "",
                "detail": [
                   { "id": 114983, "nama": "Ekstremitas", "type": "textarea" },
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
            var cacheEMR_TRIASE_PRIMER_UMUM  = cacheHelper.get('cacheEMR_TRIASE_PRIMER_UMUM');
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
             medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 468).then(function (e) {

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
            medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + nomorEMR + "&emrfk=" + $scope.cc.emrfk, true).then(function (dat) {
                $scope.item.obj = []
                $scope.item.obj2 = []
                $scope.item.obj[114938]=$scope.cc.tglregistrasi
                $scope.item.obj[115034] = { value:peagawaiLogin.id,text:peagawaiLogin.namaLengkap}
                // $scope.item.obj[111056]=$scope.now
                // $scope.item.obj[14563]={ value: $scope.cc.iddpjp, text: $scope.cc.dokterdpjp }
                if (cacheEMR_TRIASE_PRIMER_UMUM != undefined) {
                        medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + cacheEMR_TRIASE_PRIMER_UMUM + "&emrfk=" + 450, true).then(function (dat) {
                            var dataNA = dat.data.data
                            for (var i = 0; i <= dataNA.length - 1; i++) {
                                if (dataNA[i].emrdfk == '112857') {
                                    if (dataNA[i].value == '1') {
                                        $scope.item.obj[114814] = true
                                    }
                                }
                                if (dataNA[i].emrdfk == '112863') {
                                    if (dataNA[i].value == '1') {
                                        $scope.item.obj[114815] = true
                                    }
                                }
                                if (dataNA[i].emrdfk == '112865') {
                                    if (dataNA[i].value == '1') {
                                        $scope.item.obj[114816] = true
                                    }
                                }
                                if (dataNA[i].emrdfk == '112868') {
                                    if (dataNA[i].value == '1') {
                                        $scope.item.obj[114817] = true
                                    }
                                }

                            }

                        })
                    }
                dataLoad = dat.data.data
                medifirstService.get("emr/get-vital-sign?noregistrasi=" + $scope.cc.noregistrasi + "&objectidawal=4241&objectidakhir=4246&idemr=147", true).then(function (datas) {
                    if (datas.data.data.length>0){
                        if ($scope.item.obj[114973]== undefined) {
                            $scope.item.obj[114973]=datas.data.data[0].value
                        }
                        if ($scope.item.obj[114974]== undefined) {
                            $scope.item.obj[114974]=datas.data.data[3].value
                        }
                        if ($scope.item.obj[114975]==undefined) {
                            $scope.item.obj[114975]=datas.data.data[4].value
                        }
                        if ($scope.item.obj[114976]==undefined) {
                            $scope.item.obj[114976]=datas.data.data[5].value
                        }

                    }
                })
                for (var i = 0; i <= dataLoad.length - 1; i++) {
                    if (parseFloat($scope.cc.emrfk) == dataLoad[i].emrfk) {

                        if (dataLoad[i].type == "textbox") {
                            $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                            if(dataLoad[i].emrdfk == 14499)
                                $scope.totalSkor4 = parseFloat(dataLoad[i].value)
                              if(dataLoad[i].emrdfk == 3152)
                                $scope.totalSkor = parseFloat(dataLoad[i].value)
                              if(dataLoad[i].emrdfk == 111129)
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



            $scope.$watch('item.obj[111134]', function (nilai) {

                if (nilai == undefined) return
                nilai = parseInt(nilai)


                if (nilai == 0) {
                    $scope.item.obj[111157] = true
                    $scope.item.obj[111158] = false
                    $scope.item.obj[111159] = false
                    $scope.item.obj[111160] = false
                }
               if (nilai >= 1 && nilai <= 3) {
                    $scope.item.obj[111157] = false
                    $scope.item.obj[111158] = true   
                    $scope.item.obj[111159] = false
                    $scope.item.obj[111160] = false
                }
                if (nilai >= 4 && nilai <= 6) {
                    $scope.item.obj[111157] = false
                    $scope.item.obj[111158] = false
                    $scope.item.obj[111159] = true
                    $scope.item.obj[111160] = false
                }
                if (nilai >= 7 && nilai <= 10) {
                    $scope.item.obj[111157] = false
                    $scope.item.obj[111158] = false
                    $scope.item.obj[111159] = false
                    $scope.item.obj[111160] = true
                }
            });
            
            $scope.$watch('item.obj[114814]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114814] !=null){
                          $scope.activeTriaseStatus = 'merah'
                      }
                       
                    }
                })
            $scope.$watch('item.obj[114815]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114815] !=null){
                          $scope.activeTriaseStatus = 'kuning'
                      }
                       
                    }
                })
            $scope.$watch('item.obj[114816]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114816] !=null){
                          $scope.activeTriaseStatus = 'hijau'
                      }
                       
                    }
                })
            $scope.$watch('item.obj[114817]', function(newValue,oldValue){
                    if(newValue!=oldValue){
                
                      if($scope.item.obj[114817] !=null){
                          $scope.activeTriaseStatus = 'hitam'
                      }
                       
                    }
                })
            

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
                    $scope.item.obj[111167] = true
                    $scope.item.obj[111168] = false
                    $scope.item.obj[111169] = false
                    $scope.item.obj[111170] = false
                    $scope.item.obj[111171] = false
                    $scope.item.obj[111172] = false
                }
                if (nilai >= 2 && nilai <= 3) {
                    $scope.item.obj[111167] = false
                    $scope.item.obj[111168] = true
                    $scope.item.obj[111169] = false
                    $scope.item.obj[111170] = false
                    $scope.item.obj[111171] = false
                    $scope.item.obj[111172] = false
                }
                if (nilai >= 4 && nilai <= 5) {
                    $scope.item.obj[111167] = false
                    $scope.item.obj[111168] = false
                    $scope.item.obj[111169] = true
                    $scope.item.obj[111170] = false
                    $scope.item.obj[111171] = false
                    $scope.item.obj[111172] = false
                }
                if (nilai >= 6 && nilai <= 7) {
                    $scope.item.obj[111167] = false
                    $scope.item.obj[111168] = false
                    $scope.item.obj[111169] = false
                    $scope.item.obj[111170] = true
                    $scope.item.obj[111171] = false
                    $scope.item.obj[111172] = false
                }
                if (nilai >= 8 && nilai <= 9) {
                    $scope.item.obj[111167] = false
                    $scope.item.obj[111168] = false
                    $scope.item.obj[111169] = false
                    $scope.item.obj[111170] = false
                    $scope.item.obj[111171] = true
                    $scope.item.obj[111172] = false
                }

                if (nilai == 10) {
                    $scope.item.obj[111167] = false
                    $scope.item.obj[111168] = false
                    $scope.item.obj[111169] = false
                    $scope.item.obj[111170] = false
                    $scope.item.obj[111171] = false
                    $scope.item.obj[111172] = true
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
                   'Asesmen Medis Gawat Darurat Non Psikiatri ' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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