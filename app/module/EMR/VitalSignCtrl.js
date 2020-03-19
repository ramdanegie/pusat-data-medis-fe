define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('VitalSignCtrl', ['$q', '$rootScope', '$scope', '$state', 'CacheHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, $state, cacheHelper, medifirstService) {
            $scope.item = {};
            $scope.cc = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();

            var norec_apd = ''
            var norec_pd = ''
            var nocm_str = ''
            var namaEMR = ''
            var nomorEMR = '-'
            var dataLoad = [];
            $scope.tombolSimpanVis = true;
            $scope.isRiwayat = true
            // $scope.header = {}
            var myVar = 0
            var paramSearch ='' 
            // debugger



            // LoadCache()
            // cacheHelper.get('cacheNomorEMR',undefined);;
            LoadCacheHelper();

            function LoadCacheHelper() {
                var chacePeriode = cacheHelper.get('cacheNomorEMR');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    // $scope.cc.nocm = chacePeriode[0]
                    // $scope.cc.namapasien = chacePeriode[1]
                    // $scope.cc.jeniskelamin = chacePeriode[2]
                    // $scope.cc.noregistrasi = chacePeriode[3]
                    // $scope.cc.umur = chacePeriode[4]
                    // $scope.cc.kelompokpasien = chacePeriode[5]
                    // $scope.cc.tglregistrasi = chacePeriode[6]
                    // $scope.cc.norec = chacePeriode[7]
                    // $scope.cc.norec_pd = chacePeriode[8]
                    // $scope.cc.objectkelasfk = chacePeriode[9]
                    // $scope.cc.namakelas = chacePeriode[10]
                    // $scope.cc.objectruanganfk = chacePeriode[11]
                    // $scope.cc.namaruangan = chacePeriode[12]
                    // $scope.cc.DataNoregis = chacePeriode[13]
                    $scope.cc.norec_emr = '-'
                    if (nomorEMR == '') {
                        $scope.cc.norec_emr = ''
                    } else {
                        $scope.cc.norec_emr = nomorEMR
                    }
                    nomorEMR = chacePeriode[0]
                    namaEMR =147
                    $scope.cc.emrfk =147
                    // $scope.item.noMr = chacePeriode[0]
                    // nocm_str = chacePeriode[0]
                    // $scope.item.namaPasien = chacePeriode[1]
                    // $scope.item.jenisKelamin = chacePeriode[2]
                    // $scope.item.noregistrasi = chacePeriode[3]
                    // $scope.item.umur = chacePeriode[4]
                    // $scope.item.kelompokPasien = chacePeriode[5]
                    // $scope.item.tglRegistrasi = chacePeriode[6]
                    // norec_apd = chacePeriode[7]
                    // norec_pd = chacePeriode[8]
                    // $scope.item.idKelas = chacePeriode[9]
                    // $scope.item.kelas = chacePeriode[10]
                    // $scope.item.idRuangan = chacePeriode[11]
                    // $scope.item.namaRuangan = chacePeriode[12]
                    // $scope.header.DataNoregis = chacePeriode[13]
                    // if ($scope.header.DataNoregis == undefined) {
                    //     $scope.header.DataNoregis = false;
                    // }
                    
                    // if ($scope.cc.DataNoregis == undefined) {
                    //     $scope.cc.DataNoregis = false;
                    // }
                    // if ($scope.cc.DataNoregis == true) {
                        // paramSearch ='noregistrasi=' + $scope.cc.noregistrasi
                    // } else {
                        // paramSearch ='nocm=' + $scope.cc.nocm
                    // }
                    loadEMR()
                }

                // init()
            }
            // $rootScope.getRekamMedisCheck = function (bool) {
            //     if (bool) {
            //         paramSearch = 'noregistrasi=' + $scope.cc.noregistrasi
            //         init()
            //     }
            //     else {
            //         paramSearch ='nocm=' + $scope.cc.nocm
            //         init()
            //     }
            // }
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }
            $scope.Batal = function () {
                $scope.item.obj = []
            }
      
            function loadEMR() {
                if (nomorEMR == '-') {
                    medifirstService.get("emr/get-rekam-medis-dynamic?emrid=147").then(function (e) {
                        $scope.listData = e.data
                        $scope.item.title = e.data.title
                        $scope.item.classgrid = e.data.classgrid

                        $scope.cc.emrfk = '147'
                        $scope.item.objcbo = []



                    })
                } else {
                    var chekedd = false
                    //medifirstService.get("emr/get-emr-transaksi-detail?noemr="+$state.params.nomorEMR, true).then(function(dat){
                    medifirstService.get("emr/get-rekam-medis-dynamic?emrid=147").then(function (e) {
                        $scope.listData = e.data
                        $scope.item.title = e.data.title
                        $scope.item.classgrid = e.data.classgrid

                        $scope.cc.emrfk = '147'


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
                                }

                            }
                        })



                    });
                }
            }
            // function setobjectToModel(nomorEMRSS,emrfk){
            //     medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + nomorEMRSS + "&emrfk=" + emrfk, true).then(function (dat) {
            //         $scope.item.obj = []
            //         $scope.item.obj2 = []
                
            //         dataLoad = dat.data.data
            //         cacheHelper.set('cacheVitalSign',dataLoad)
            //         for (var i = 0; i <= dataLoad.length - 1; i++) {
            //             if (parseFloat($scope.cc.emrfk) == dataLoad[i].emrfk) {
            //                 if (dataLoad[i].type == "textbox") {
            //                     $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
            //                 }
            //                 if (dataLoad[i].type == "checkbox") {
            //                     chekedd = false
            //                     if (dataLoad[i].value == '1') {
            //                         chekedd = true
            //                     }
            //                     $scope.item.obj[dataLoad[i].emrdfk] = chekedd
            //                 }

            //                 if (dataLoad[i].type == "datetime") {
            //                     $scope.item.obj[dataLoad[i].emrdfk] = new Date(dataLoad[i].value)
            //                 }
            //                 if (dataLoad[i].type == "time") {
            //                     $scope.item.obj[dataLoad[i].emrdfk] = new Date(dataLoad[i].value)
            //                 }
            //                 if (dataLoad[i].type == "date") {
            //                     $scope.item.obj[dataLoad[i].emrdfk] = new Date(dataLoad[i].value)
            //                 }

            //                 if (dataLoad[i].type == "checkboxtextbox") {
            //                     $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
            //                     $scope.item.obj2[dataLoad[i].emrdfk] = true
            //                 }
            //                 if (dataLoad[i].type == "textarea") {
            //                     $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
            //                 }
            //                 if (dataLoad[i].type == "combobox") {
            //                     var str = dataLoad[i].value
            //                     var res = str.split("~");
            //                     // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
            //                     $scope.item.obj[dataLoad[i].emrdfk] = { value: res[0], text: res[1] }

            //                 }
            //             }

            //         }
            //     })
            // }
            // function init() {
            //     $scope.isRouteLoading = true
            //     medifirstService.get("emr/get-emr-transaksi?" +paramSearch + "&jenisEmr=navigasi", true).then(function (dat) {
            //         // debugger
            //         $scope.isRouteLoading = false
            //         var nomorEMRSS = ''
            //         cacheHelper.set('cacheVitalSign',undefined)
            //         if( dat.data.data.length > 0){
            //             for (var i = 0; i <  dat.data.data.length; i++) {
            //                 const element =  dat.data.data[i];
            //                 element.no = i +1
            //             }
            //             nomorEMRSS =  dat.data.data[0].noemr
            //             $scope.cc.emrfk = '147'
            //             setobjectToModel(nomorEMRSS,  $scope.cc.emrfk )
            //         }
                   
            //         $scope.dataDaftar = new kendo.data.DataSource({
            //             data: dat.data.data,
            //             pageSize: 10,
            //             serverPaging: false,
            //             schema: {
            //                 model: {
            //                     fields: {
            //                     }
            //                 }
            //             }
            //         });
            //     });



            //     $scope.treeSourceRuangan = [];
            //     medifirstService.get("emr/get-menu-rekam-medis-dynamic?namaemr=navigasi").then(function (e) {
            //         var inlineDefault = new kendo.data.HierarchicalDataSource({
            //             data: e.data.data,
            //             schema: {
            //                 model: {
            //                     children: "child",
            //                     expanded: true
            //                 }
            //             }
            //         });
            //         $scope.treeSourceBedah = inlineDefault
            //         $scope.mainTreeViewBedahOption = {
            //             dataTextField: ["caption"],
            //             datakKeyField: ["id"],
            //             select: onSelect,
            //             dragAndDrop: true,
            //             checkboxes: false
            //         }
            //         // var treeview = $("#treeview").data("kendoTreeView");
            //         // .expandPath([2, 5])
            //     })
            // }
            $scope.Riwayat = function () {
                $scope.myVar = 2
                $scope.showRiwayatEMR = true
            }
            $scope.kembali = function(){
                cacheHelper.set('cacheNomorEMR',undefined);
                // $state.go('RekamMedis.AsesmenMedis');
                $rootScope.showRiwayat()
            }
            $scope.kembaliIsi = function () {
                $scope.myVar = 1
                $scope.showRiwayatEMR = false
            }
            $scope.hapus = function(){
                if($scope.dataSelected == undefined){
                    toastr.error('pilih data dulu')
                    return
                }
                medifirstService.post('emr/hapus-emr-transaksi',{norec:$scope.dataSelected.norec ,emrfk:$scope.dataSelected.emrfk }).then(function(e){
                    init()
                    $scope.dataSelected = undefined
                })
            }
            $scope.Save = function () {
                if ($scope.item.obj.length == 0)
                    return
                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    arrSave.push({ id: arrobj[i], values: $scope.item.obj[parseInt(arrobj[i])] })
                }
                $scope.cc.jenisemr = 'navigasi'
                var jsonSave = {
                    head: $scope.cc,

                    data: arrSave//$scope.item.obj
                }
                medifirstService.post('emr/save-emr-dinamis', jsonSave).then(function (e) {
                    if(medifirstService.getKelompokUser() =='suster'){
                        var data ={
                            "norec_apd" :$state.params.noRec,
                            "kelompokUser" : medifirstService.getKelompokUser(),
                            "vitalsign" : true
                        }
                        medifirstService.postNonMessage('rawatjalan/save-panggil',data)
                        .then(function (res) {
                          
                        })
                    }
                    $scope.item.obj = []
                    $scope.cc.norec_emr = '-'
                    $rootScope.loadRiwayat()

                });
            }
            $scope.back = function () {
                $scope.myVar = 1
                $scope.showRiwayatEMR = false
            }
            // $rootScope.showRiwayat = function () {
            //     $scope.showRiwayatEMR = false
            // }
            $rootScope.loadRiwayat = function () {
                // debugger
                init()
            }
            $scope.klikGrid = function (dataSelected) {
                $scope.dataSelected = dataSelected
            }
            $scope.showRiwayatEMR = false
            $scope.Lihat = function () {
                if ($scope.dataSelected == undefined){
                    toastr.error('Pilih data dulu')
                    return
                }
                  
                $scope.showRiwayatEMR = false
                $scope.myVar = 1

                nomorEMR = $scope.dataSelected.noemr
                $scope.cc.norec_emr = $scope.dataSelected.noemr
                $scope.cc.emrfk = 147
                loadEMR()

            }
            $scope.create = function () {
                $scope.showRiwayatEMR = false
                $scope.myVar = 1
                nomorEMR = '-'
                $scope.cc.norec_emr = '-'
                $scope.item.obj =[]
                var noemr2 = '-'
                loadEMR()

            }


            $scope.mainGridOptions = {
                pageable: true,
                columns: [{
                    "field": "kdpap",
                    "title": "Kode PAP",
                    "width": "15%"
                }, {
                    "field": "tglinput",
                    "title": "Tgl Pengkajian Awal",
                    "width": "20%",
                    template: "#= new moment(tglinput).format(\'DD-MM-YYYY HH:mm\') #",
                }, {
                    "field": "noregistrasi",
                    "title": "No Registrasi",
                    "width": "15%"
                },
                {
                    "field": "namaruangan",
                    "title": "Ruangan",
                    "width": "25%"
                },
                {
                    "field": "namalengkap",
                    "title": "Petugas",
                    "width": "25%"
                },
                    // {
                    // "command": [{
                    //     text: "Hapus",
                    //     click: hapusData,
                    //     imageClass: "k-icon k-delete"
                    // }],
                    // title: "",
                    // width: "100px",
                    // }
                ]
            };

            $scope.columnDaftar = {
                selectable: 'row',
                pageable: true,
                columns:
                    [
                        {
                            "field": "no",
                            "title": "No ",
                            "width": "10px"
                        },
                        
                        {
                            "field": "tglemr",
                            "title": "Tgl EMR",
                            "width": "80px",
                            "template": "<span class='style-left'>{{formatTanggal('#: tglemr #')}}</span>"
                        },
                        {
                            "field": "noemr",
                            "title": "No EMR",
                            "width": "80px"
                        },
                        {
                            "field": "namalengkap",
                            "title": "Pegawai",
                            "width": "100px"
                        },
                        {
                            "field": "tglregistrasi",
                            "title": "Tgl Registrasi",
                            "width": "80px",
                            "template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
                        },
                        {
                            "field": "noregistrasifk",
                            "title": "No Registrasi",
                            "width": "80px",
                        },
                        // {
                        //     "field": "noregistrasi",
                        //     "title": "NoRegistrasi",
                        //     "width":"150px",
                        //     "template": "<span class='style-left'>#: noregistrasi #</span>"
                        // },
                        // {
                        //     "field": "namaruangan",
                        //     "title": "Nama Ruangan",
                        //     "width":"150px",
                        //     "template": "<span class='style-left'>#: namaruangan #</span>"
                        // }
                    ]
            };


            $scope.back = function () {
                window.history.back();
            }










            function onSelect(e) {
                var data3 = e.sender.dataSource._data
                // var itm = findObjectByKey(data3, 'uid', "245421fd-68db-4d25-8afc-dbe1d20a2056");
                var uid_select = e.node.dataset.uid
                var idTree = '';
                var urlTrue = null;
                for (var i = data3.length - 1; i >= 0; i--) {
                    if (uid_select == data3[i].uid) {
                        idTree = data3[i].id
                        urlTrue = data3[i].reportdisplay
                        break;
                    }
                    if (data3[i].child != undefined) {
                        for (var ii = data3[i].child.length - 1; ii >= 0; ii--) {
                            if (uid_select == data3[i].child[ii].uid) {
                                idTree = data3[i].child[ii].id
                                urlTrue = data3[i].child[ii].reportdisplay
                                break;
                            }
                            if (data3[i].child[ii].child != undefined) {
                                for (var iii = data3[i].child[ii].child.length - 1; iii >= 0; iii--) {
                                    if (uid_select == data3[i].child[ii].child[iii].uid) {
                                        idTree = data3[i].child[ii].child[iii].id
                                        urlTrue = data3[i].child[ii].child[iii].reportdisplay
                                        break;
                                    }
                                }
                            }

                        }
                    }

                }
                var noemr = '-'
                if ($scope.dataSelected != undefined) {
                    noemr = $scope.dataSelected.noemr
                }
                if (urlTrue == null) {
                    $state.go("RekamMedis.AsesmenMedis.AsesmenMedisDetail", {
                        namaEMR: idTree,
                        nomorEMR: noemr
                    });
                } else {
                    // $scope.currentState = state;
                    var arrStr = {
                        0: $scope.header.nocm,
                        1: $scope.header.namapasien,
                        2: $scope.header.jeniskelamin,
                        3: $scope.header.tgllahir,
                        4: $scope.header.umur,
                        5: $scope.header.alamatlengkap,
                        6: $scope.header.notelepon,
                    }
                    // cacheHelper.set('RekamMedisIGDCtrl', arrStr);       
                    $state.go(urlTrue);
                }




            }
            //***********************************

        }
    ]);
});

// http://127.0.0.1:1237/printvb/farmasiApotik?cetak-label-etiket=1&norec=6a287c10-8cce-11e7-943b-2f7b4944&cetak=1