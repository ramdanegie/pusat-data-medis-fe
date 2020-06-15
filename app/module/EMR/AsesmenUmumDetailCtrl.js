define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AsesmenUmumDetailCtrl', ['$rootScope', '$scope', '$state', 'CacheHelper', 'MedifirstService',
        function ($rootScope, $scope, $state, cacheHelper, medifirstService) {

            $scope.item = {};
            $scope.cc = {};
            var namaEMR = ''
            var nomorEMR = ''
            var norecEMR = ''
            $scope.tombolSimpanVis = true;
            var dataLoad = [];
            var urlcetak = ''
            // $scope.now = new Date()
         
            var pegawaiInputDetail= ''
            loadMenu();
            LoadCache();
            FormLoad();
            function loadMenu () {
                 medifirstService.get("emr/get-emrbyid?id=" +$state.params.namaEMR).then(function (e) {
        
                        if (e.data.data.namaexternal != null) {
                            urlcetak=e.data.data.namaexternal
                            $scope.isCetak=true
                          
                     }
                 })
            }
            // nomorEMR = $state.params.nomorEMR            
            function LoadCache() {
                nomorEMR = '-'
                var chacePeriode = cacheHelper.get('cacheNomorEMR');
                if (chacePeriode != undefined) {
                    nomorEMR = chacePeriode[0]
                    norecEMR = chacePeriode[1]
                }
            }

            function FormLoad() {

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
                    if (nomorEMR == '') {
                        $scope.cc.norec_emr = ''
                    } else {
                        $scope.cc.norec_emr = nomorEMR
                    }
                }
            }



            if (nomorEMR == '-') {
                medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + $state.params.namaEMR).then(function (e) {
                    $scope.listData = e.data
                    $scope.item.title = e.data.title
                    $scope.item.classgrid = e.data.classgrid

                    $scope.cc.emrfk = $state.params.namaEMR
                    $scope.item.objcbo = []
                    for (var i = e.data.kolom1.length - 1; i >= 0; i--) {
                        if (e.data.kolom1[i].cbotable != null) {
                            medifirstService.getPart2(e.data.kolom1[i].id, e.data.kolom1[i].cbotable, true, true, 20).then(function (data) {
                                $scope.item.objcbo[data.options.idididid] = data
                            })
                        }
                        for (var ii = e.data.kolom1[i].child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom1[i].child[ii].cbotable != null) {
                                medifirstService.getPart2(e.data.kolom1[i].child[ii].id, e.data.kolom1[i].child[ii].cbotable, true, true, 20).then(function (data) {
                                    $scope.item.objcbo[data.options.idididid] = data

                                })
                            }
                        }
                    }

                    for (var i = e.data.kolom2.length - 1; i >= 0; i--) {
                        if (e.data.kolom2[i].cbotable != null) {
                            medifirstService.getPart2(e.data.kolom2[i].id, e.data.kolom2[i].cbotable, true, true, 20).then(function (data) {
                                $scope.item.objcbo[data.options.idididid] = data
                                // if(data.options.idididid ==80576){
                                //     $scope.item.obj[80576] = $scope.now
                                // }
                            })
                        }
                        for (var ii = e.data.kolom2[i].child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom2[i].child[ii].cbotable != null) {
                                medifirstService.getPart2(e.data.kolom2[i].child[ii].id, e.data.kolom2[i].child[ii].cbotable, true, true, 20).then(function (data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                        }
                    }
                    for (var i = e.data.kolom3.length - 1; i >= 0; i--) {
                        if (e.data.kolom3[i].cbotable != null) {
                            medifirstService.getPart2(e.data.kolom3[i].id, e.data.kolom3[i].cbotable, true, true, 20).then(function (data) {
                                $scope.item.objcbo[data.options.idididid] = data
                            })
                        }
                        for (var ii = e.data.kolom3[i].child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom3[i].child[ii].cbotable != null) {
                                medifirstService.getPart2(e.data.kolom3[i].child[ii].id, e.data.kolom3[i].child[ii].cbotable, true, true, 20).then(function (data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                        }
                    }
                    for (var i = e.data.kolom4.length - 1; i >= 0; i--) {
                        if (e.data.kolom4[i].cbotable != null) {
                            medifirstService.getPart2(e.data.kolom4[i].id, e.data.kolom4[i].cbotable, true, true, 20).then(function (data) {
                                $scope.item.objcbo[data.options.idididid] = data
                            })
                        }
                        for (var ii = e.data.kolom4[i].child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom4[i].child[ii].cbotable != null) {
                                medifirstService.getPart2(e.data.kolom4[i].child[ii].id, e.data.kolom4[i].child[ii].cbotable, true, true, 20).then(function (data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                        }
                    }

                })
            } else {
                var chekedd = false
                //medifirstService.get("emr/get-emr-transaksi-detail?noemr="+$state.params.nomorEMR, true).then(function(dat){
                medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + $state.params.namaEMR).then(function (e) {
                    $scope.listData = e.data
                    $scope.item.title = e.data.title
                    $scope.item.classgrid = e.data.classgrid

                    $scope.cc.emrfk = $state.params.namaEMR

                    $scope.item.objcbo = []
                    for (var i = e.data.kolom1.length - 1; i >= 0; i--) {
                        if (e.data.kolom1[i].cbotable != null) {
                            medifirstService.getPart2(e.data.kolom1[i].id, e.data.kolom1[i].cbotable, true, true, 20).then(function (data) {
                                $scope.item.objcbo[data.options.idididid] = data
                            })
                        }
                        for (var ii = e.data.kolom1[i].child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom1[i].child[ii].cbotable != null) {
                                medifirstService.getPart2(e.data.kolom1[i].child[ii].id, e.data.kolom1[i].child[ii].cbotable, true, true, 20).then(function (data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                        }
                    }
                    for (var i = e.data.kolom2.length - 1; i >= 0; i--) {
                        if (e.data.kolom2[i].cbotable != null) {
                            medifirstService.getPart2(e.data.kolom2[i].id, e.data.kolom2[i].cbotable, true, true, 20).then(function (data) {
                                $scope.item.objcbo[data.options.idididid] = data
                                // if(data.options.idididid ==80576){
                                //     $scope.item.obj[80576] = $scope.now
                                // }
                            })
                        }
                        for (var ii = e.data.kolom2[i].child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom2[i].child[ii].cbotable != null) {
                                medifirstService.getPart2(e.data.kolom2[i].child[ii].id, e.data.kolom2[i].child[ii].cbotable, true, true, 20).then(function (data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                        }
                    }
                    for (var i = e.data.kolom3.length - 1; i >= 0; i--) {
                        if (e.data.kolom3[i].cbotable != null) {
                            medifirstService.getPart2(e.data.kolom3[i].id, e.data.kolom3[i].cbotable, true, true, 20).then(function (data) {
                                $scope.item.objcbo[data.options.idididid] = data
                            })
                        }
                        for (var ii = e.data.kolom3[i].child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom3[i].child[ii].cbotable != null) {
                                medifirstService.getPart2(e.data.kolom3[i].child[ii].id, e.data.kolom3[i].child[ii].cbotable, true, true, 20).then(function (data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                        }
                    }
                    for (var i = e.data.kolom4.length - 1; i >= 0; i--) {
                        if (e.data.kolom4[i].cbotable != null) {
                            medifirstService.getPart2(e.data.kolom4[i].id, e.data.kolom4[i].cbotable, true, true, 20).then(function (data) {
                                $scope.item.objcbo[data.options.idididid] = data
                            })
                        }
                        for (var ii = e.data.kolom4[i].child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom4[i].child[ii].cbotable != null) {
                                medifirstService.getPart2(e.data.kolom4[i].child[ii].id, e.data.kolom4[i].child[ii].cbotable, true, true, 20).then(function (data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                        }
                    }
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
                        // setTimeout(function(){medifirstService.setDisableAllInputElement()  }, 2000);
                         
                    })


                    // for (var i = 0; i < dat.data.data.length - 1; i++) {
                    //     switch(dat.data.data[i].type) {
                    //       case "textbox":
                    //         this.item.obj[dat.data.data[i].emrdfk] = dat.data.data[i].value
                    //         // $scope.item.obj[dat.data.data[i].emrdfk] = dat.data.data[i].value
                    //         // break;

                    //         // break;
                    //       default:
                    //         // code block
                    //     }
                    // }
                    // })


                });
            }



            // 0: $scope.header.nocm,
            // 1: $scope.header.namapasien,
            // 2: $scope.header.jeniskelamin,
            // 3: $scope.header.noregistrasi,
            // 4: $scope.header.umur,
            // 5: $scope.header.kelompokpasien,
            // 6: $scope.header.tglregistrasi,
            // 7: $scope.header.norec,
            // 8: $scope.header.norec_pd,
            // 9: $scope.header.objectkelasfk,
            // 10: $scope.header.namakelas,
            // 11: $scope.header.objectruanganfk,
            // 12: $scope.header.namaruangan,
            // 13: $scope.header.DataNoregis

            // var chacePeriode = cacheHelper.get('cacheRekamMedis');
            // if(chacePeriode != undefined){
            //     $scope.cc.nocm = chacePeriode[0]
            //     $scope.cc.namapasien = chacePeriode[1]
            //     $scope.cc.jeniskelamin = chacePeriode[2]
            //     $scope.cc.noregistrasi = chacePeriode[3]
            //     $scope.cc.umur = chacePeriode[4]
            //     $scope.cc.kelompokpasien = chacePeriode[5]
            //     $scope.cc.tglregistrasi = chacePeriode[6]
            //     $scope.cc.norec = chacePeriode[7]
            //     $scope.cc.norec_pd = chacePeriode[8]
            //     $scope.cc.objectkelasfk = chacePeriode[9]
            //     $scope.cc.namakelas =chacePeriode[10]
            //     $scope.cc.objectruanganfk =chacePeriode[11]
            //     $scope.cc.namaruangan =chacePeriode[12]  
            //     $scope.cc.DataNoregis =chacePeriode[12]  
            //     if (nomorEMR == '') {
            //         $scope.cc.norec_emr = ''
            //     }else{
            //         $scope.cc.norec_emr = nomorEMR       
            //     }
            // }


            $scope.txt_change = function (index) {
                $scope.item.txt[index] = "asdasdad"
            };
            $scope.kembali = function () {
                $rootScope.showRiwayat()
            }


            $scope.checkClick = function (data) {
                // var index = $scope.currentKelainan.indexOf(data);
                // if (_.filter($scope.currentKelainan, {
                //         id: data.id
                //     }).length === 0)
                //     $scope.currentKelainan.push(data);
                // else {
                //     $scope.currentKelainan.splice(index, 1);
                // }

            }


            $scope.getdata = function () {
                var objectfk = "KLU";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                medifirstService.get("emr/get-data-rekam-medis?noregistrasifk=" + noregistrasifk + '&objectfk=' + objectfk
                    + '&riwayatfk=' + $scope.noRecPap).then(function (e) {
                        $scope.dataEdukasi = e.data.data;
                        if ($scope.dataEdukasi.length != 0) {
                            for (var i = 0; i < $scope.dataEdukasi.length; i++) {
                                if ($scope.dataEdukasi[i].objectfk == "KLU-000001") {
                                    $scope.noRec = $scope.dataEdukasi[i].norec
                                    $scope.item.keluhanUtama = $scope.dataEdukasi[i].nilai
                                }
                            }
                        }
                    })
            }
            // $scope.getdata();

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
                    if ($scope.item.obj[parseInt(arrobj[i])] instanceof Date)
                        $scope.item.obj[parseInt(arrobj[i])] = moment($scope.item.obj[parseInt(arrobj[i])]).format('YYYY-MM-DD HH:mm')
                     // $scope.item.obj[parseInt(arrobj[i])] = moment($scope.item.obj[parseInt(arrobj[i])]).format('HH:mm')
                    arrSave.push({ id: arrobj[i], values: $scope.item.obj[parseInt(arrobj[i])] })
                }
                $scope.cc.jenisemr = 'umum'
                var jsonSave = {
                    head: $scope.cc,

                    data: arrSave//$scope.item.obj
                }
                medifirstService.post('emr/save-emr-dinamis', jsonSave).then(function (e) {
                    // $state.go("RekamMedis.OrderJadwalBedah.ProsedurKeselamatan", {
                    //     namaEMR : $scope.cc.emrfk,
                    //     nomorEMR : e.data.data.noemr 
                    // });
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,
                        $scope.item.title + ' dengan No EMR - ' + e.data.data.noemr + ' pada No Registrasi '
                        + $scope.cc.noregistrasi).then(function (res) {
                        })
                    $rootScope.loadRiwayat()

                    var arrStr = {
                        0: e.data.data.noemr
                    }
                    cacheHelper.set('cacheNomorEMR', arrStr);
                });
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
                client.get('http://127.0.0.1:1237/printvb/e-rekammedis?'+ urlcetak + '&id=' + $scope.cc.nocm + '&emr=' + norecEMR + '&view=true', function (response) {
                    // do something with response
                });

               /// cetak pak jspdf
                // var b = null
               
                // medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + nomorEMR + "&emrfk=" + $scope.cc.emrfk, true).then(function (dat) {
                //     // $scope.item.obj = []
                //     var doc = new jsPDF();
                //     // debugger
                //     var result = dat.data.data
                //     var namaPenerima = ''
                //     var umurPenerima = ''
                //     var hubunganKel = ''
                //     var alamatPenerima = ''
                //     var ruang = ''
                //     var keadaan = ''
                //     for (var i = 0; i <= result.length - 1; i++) {
                //         if (result[i].emrdfk == 206910) {
                //             namaPenerima = result[i].value
                //         }
                //         if (result[i].emrdfk == 206911) {
                //             umurPenerima = result[i].value
                //         }
                //         if (result[i].emrdfk == 206912) {
                //             hubunganKel = result[i].value
                //         }
                //         if (result[i].emrdfk == 206913) {
                //             alamatPenerima = result[i].value
                //         }
                //         if (result[i].emrdfk == 206914) {
                //             ruang = result[i].value
                //         }
                //         if (result[i].emrdfk == 206920) {
                //             keadaan = result[i].value
                //         }


                //     }
                //     // Empty square
                //     doc.addImage('data:image/jpeg;base64,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',
                //         'JPEG', 12, 12, 25, 25);
                //     doc.setFontSize(13)
                //     doc.text(42, 20, "PEMERINTAH PROVINSI JAWA TENGAH")
                //     doc.text(40, 25, "RUMAH SAKIT JIWA DAERAH SURAKARTA")
                //     doc.setFontSize(11)
                //     doc.text(46, 30, "Jl. Ki Hajar Dewantara 80 Jebres Surakarta")
                //     doc.setFontSize(7)
                //     doc.text(41, 33, "Telp. 0271-641442, Fax. 0271-648920, E-mail:rsjsurakarta@jatengprov.go.id")
                //     doc.text(60, 36, "Website : http://rjsd-surakarta.jatengprov.go.id")
                //     doc.rect(10, 10, 125, 30);
                //     doc.setFontSize(11)
                //     doc.text(140, 17, "RM     : "); doc.text(170, 17, $scope.cc.nocm);
                //     doc.text(140, 23, "Nama Pasien  : "); doc.text(170, 23, $scope.cc.namapasien);
                //     doc.text(140, 29, "Jenis Kelamin : "); doc.text(170, 29, $scope.cc.jeniskelamin);
                //     doc.text(140, 35, "Tgl Lahir     : "); doc.text(170, 35, moment(new Date($scope.header.tgllahir)).format('DD-MM-YYYY'));
                //     doc.rect(135, 10, 65, 30);

                //     doc.rect(10, 42, 190, 13);
                //     doc.setFontSize(15)
                //     doc.text(50, 50, "SERAH TERIMA PASIEN KEPADA KELUARGA ")
                //     doc.rect(10, 56, 190, 230);
                //     doc.setFontSize(14);
                //     doc.text(15, 65, "Yang bertanda tangan dibawah ini saya : ")
                //     doc.text(15, 75, "Nama "); doc.text(70, 75, ":"); doc.text(75, 75, namaPenerima)
                //     doc.text(160, 75, "Umur : "); doc.text(175, 75, umurPenerima)
                //     doc.text(15, 85, "Hubungan kel dg pasien : "); doc.text(75, 85, hubunganKel)
                //     doc.text(15, 95, "Alamat"); doc.text(70, 95, ":"); doc.text(75, 95, alamatPenerima)

                //     doc.text(15, 115, "Dengan ini kami telah terima kembali pasien dari Ruang")
                //     doc.text(140, 115, ruang)
                //     doc.text(15, 125, "Rumah Sakit Jiwa Daerah Surakarta")
                //     doc.text(15, 135, "Nama")
                //     doc.text(70, 135, ":")
                //     doc.text(75, 135, $scope.cc.namapasien)
                //     doc.text(150, 135, "No RM")
                //     doc.text(170, 135, $scope.cc.nocm)

                //     doc.text(15, 145, "Umur")
                //     doc.text(70, 145, ":")
                //     doc.text(75, 145, $scope.cc.umur)

                //     doc.text(15, 155, "Alamat")
                //     doc.text(70, 155, ":")
                //     doc.text(75, 155, $scope.header.alamatlengkap != null ? $scope.header.alamatlengkap : '')

                //     doc.text(15, 175, "Dalam Keadaan")
                //     doc.text(70, 175, ":")
                //     doc.text(75, 175, keadaan)

                //     doc.text(120, 220, "Surakarta,")
                //     doc.text(145, 220, moment(new Date()).format('DD-MM-YYYY'))
                //     doc.text(30, 230, "Yang Menyerahkan,")
                //     doc.text(130, 230, "Yang Menerima,")

                //     // doc.text(30, 255, medifirstService.getPegawaiLogin().namaLengkap)
                //     // doc.text(125, 255, namaPenerima)

                //     doc.setFontSize(11)
                //     doc.text(25, 260, "Tanda tangan dan nama terang")
                //     doc.text(120, 260, "Tanda tangan dan nama terang")
                //     var st = doc.output("datauristring"),
                //         ht = "<iframe width='100%' height='100%' src='" + st + "'><\/iframe>",
                //         ot = window.open("", "_blank", "width=1024,height=900,directories=0,status=0,titlebar=0,scrollbars=0,menubar=0,toolbar=0,location=0,resizable=1");
                //     ot.focus(); ot.document.write(ht); ot.document.close()
                // })
            }
        }
    ]);
});