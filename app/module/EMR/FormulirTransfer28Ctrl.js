define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('FormulirTransfer28Ctrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.totalSkor4 = 0
            $scope.cc = {}
            var nomorEMR = '-'
            $scope.cc.emrfk = 407
            var dataLoad = []

            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
            })
            medifirstService.getPart('emr/get-datacombo-part-ruangan-pelayanan', true, true, 20).then(function (data) {
                $scope.listRuang = data
            
             })
             medifirstService.getPart('emr/get-datacombo-part-diagnosa', true, true, 20).then(function (data) {
                $scope.listDiagnosa = data
            })
             medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 407).then(function (e) {

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
            $scope.listRujukan = [
                {
                    "id": 1, "nama": "Ruang Asal",
                    "detail": [
                        { "id": 109328, "nama": "IGD", "type": "checkbox" },
                        { "id": 109329, "nama": "IRJ", "type": "checkbox" },
                        { "id": 109330, "nama": "Lain nya,", "type": "checkbox" },
                        { "id": 109331, "nama": "", "type": "textbox" },
                    ]
                },
            ]
            $scope.listAdaTidak = [
                {
                    "id": 1, "nama": "Penggunaan Cateter",
                    "detail": [
                        { "id": 109358, "nama": "Ada", "type": "checkbox" },
                        { "id": 109359, "nama": "Tidak", "type": "checkbox" },
                        { "id": 109360, "nama": "Pemakaian ke :", "type": "textbox" },
                        { "id": 109361, "nama": "Tgl/Jam", "type": "datetime" },
                    ]
                },
            ]
            $scope.listAlasanP = [
                {
                    "id": 1, "nama": "Alasan Pindah",
                    "detail": [
                        { "id": 109333, "nama": "PANNS EC < 15", "type": "checkbox" },
                        { "id": 109334, "nama": "PANNS EC > 15", "type": "checkbox" },
                        { "id": 109335, "nama": "Kondisi Fisik", "type": "checkbox" },
                        { "id": 109336, "nama": "Keinginan Sendiri", "type": "checkbox" },
                        { "id": 109337, "nama": "Pemeriksaan", "type": "checkbox" },
                        { "id": 109338, "nama": "Terapi", "type": "checkbox" },
                        
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
            var cacheEMR_igd = cacheHelper.get('cacheEMR_igd');
            var cacheEMR_PANEC = cacheHelper.get('cacheEMR_PANEC');
            var cacheEMR_TRIASE_PRIMER = cacheHelper.get('cacheEMR_TRIASE_PRIMER');
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
             if(nomorEMR!='-'){
                    cacheHelper.set('cacheEMR_Vitaltrns', nomorEMR)
                }

            medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + nomorEMR + "&emrfk=" + $scope.cc.emrfk, true).then(function (dat) {
                $scope.item.obj = []
                $scope.item.obj2 = []
                // $scope.item.obj[14900]={ value: $scope.cc.iddpjp, text: $scope.cc.dokterdpjp }
                $scope.item.obj[109369]={ value: $scope.cc.iddpjp, text: $scope.cc.dokterdpjp }
               
                if (cacheEMR_PANEC != undefined) {

                            // SET DARI SKOR CTRS
                            medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + cacheEMR_PANEC + "&emrfk=" + 138, true).then(function (datss) {
                                var dataNA = datss.data.data
                                
                                for (var i = 0; i <= dataNA.length - 1; i++) {
                                    if (dataNA[i].type == "textbox") {
                                            $scope.item.obj[dataNA[i].emrdfk] = dataNA[i].value
                                             if (dataNA[i].emrdfk=='9084') 
                                            $scope.totalSkor = dataNA[i].emrdfk
                                                if ($scope.totalSkor <= 15) {
                                                $scope.item.obj[14892] = true
                                                }
                                                if ($scope.totalSkor > 15) {
                                                    $scope.item.obj[14893] = true
                                                }    

                                    }

                                }
                               
                                


                            })
                        }
 if (cacheEMR_igd != undefined) {

                            // SET DARI SKOR CTRS
                            medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + cacheEMR_igd + "&emrfk=" + 146, true).then(function (datss) {
                                var dataNA = datss.data.data
                                
                                for (var i = 0; i <= dataNA.length - 1; i++) {
                                    if (dataNA[i].type == "textbox") {
                                            $scope.item.obj[dataNA[i].emrdfk] = dataNA[i].value
                                            if (dataNA[i].emrdfk=='4853')
                                             $scope.item.obj[14905] = dataNA[i].value
                                            if (dataNA[i].emrdfk=='4854') 
                                             $scope.item.obj[14906] = dataNA[i].value
                                            if (dataNA[i].emrdfk=='4856') 
                                                 $scope.item.obj[14907] = dataNA[i].value
                                             if (dataNA[i].emrdfk=='4855') 
                                                 $scope.item.obj[14908] = dataNA[i].value
                                                    

                                    }

                                }
                               
                                


                            })
                        }                
if (cacheEMR_TRIASE_PRIMER != undefined) {

                            // SET DARI SKOR CTRS
                            medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + cacheEMR_TRIASE_PRIMER + "&emrfk=" + 160, true).then(function (datss) {
                                var dataNA = datss.data.data
                                
                                for (var i = 0; i <= dataNA.length - 1; i++) {
                                    if (dataNA[i].type == "combobox") {
                                            $scope.item.obj[dataNA[i].emrdfk] = dataNA[i].value
                                             if (dataNA[i].emrdfk=='9062') 
                                             $scope.item.obj[14900] = { value: res[0], text: res[1] }
                                                    

                                    }

                                }
                               
                                


                            })
                        }
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
                            if(str != undefined){
                                var res = str.split("~");
                                // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
                                $scope.item.obj[dataLoad[i].emrdfk] = { value: res[0], text: res[1] }        
                            }   
                            // var res = str.split("~");
                            // // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
                            // $scope.item.obj[dataLoad[i].emrdfk] = { value: res[0], text: res[1] }

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
                    arrSave.push({ id: arrobj[i], values: $scope.item.obj[parseInt(arrobj[i])] })
                }
                $scope.cc.jenisemr = 'asesmen'
                var jsonSave = {
                    head: $scope.cc,
                    data: arrSave
                }
                medifirstService.post('emr/save-emr-dinamis', jsonSave).then(function (e) {
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,  
                    'Formulir Transfer 28' + ' dengan No EMR - ' +e.data.data.noemr +  ' pada No Registrasi ' 
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
});