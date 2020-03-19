define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('CpptDinamisCtrl', ['$q', '$rootScope', '$scope', '$state', 'CacheHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, $state, cacheHelper, medifirstService) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.tglOperasi = new Date();
            var norec_apd = ''
            var norec_pd = ''
            var nocm_str = ''
            $scope.item.qty = 1
            $scope.riwayatForm = false
            $scope.inputOrder = true
            $scope.CmdOrderPelayanan = true;
            $scope.OrderPelayanan = false;
            $scope.showTombol = false
            // $scope.header = {}
            var myVar = 0
            var detail = ''
            var data2 = [];
            $scope.PegawaiLogin2 = {};
            var namaRuangan = ''
            var namaRuanganFk = ''
            var paramSearch =''
            LoadCacheHelper();
            function LoadCacheHelper() {
                var chacePeriode = cacheHelper.get('cacheRekamMedis');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.item.noMr = chacePeriode[0]
                    nocm_str = chacePeriode[0]
                    $scope.item.namaPasien = chacePeriode[1]
                    $scope.item.jenisKelamin = chacePeriode[2]
                    $scope.item.noregistrasi = chacePeriode[3]
                    $scope.item.umur = chacePeriode[4]
                    $scope.item.kelompokPasien = chacePeriode[5]
                    $scope.item.tglRegistrasi = chacePeriode[6]
                    norec_apd = chacePeriode[7]
                    norec_pd = chacePeriode[8]
                    $scope.item.idKelas = chacePeriode[9]
                    $scope.item.kelas = chacePeriode[10]
                    $scope.item.idRuangan = chacePeriode[11]
                    $scope.item.namaRuangan = chacePeriode[12]
                    $scope.header.DataNoregis = chacePeriode[13]
                    if ($scope.header.DataNoregis == undefined) {
                        $scope.header.DataNoregis = false;
                    }
                    if ($scope.header.DataNoregis == true) {
                        paramSearch = 'noregistrasi=' + $scope.item.noregistrasi
                    } else {
                        paramSearch ='nocm=' + $scope.item.noMr
                    }
                    init()
                }

              
            }

            $rootScope.getRekamMedisCheck = function (bool) {
                if (bool) {
                    paramSearch = 'noregistrasi=' + $scope.item.noregistrasi
                    init()
                }
                else {
                    paramSearch ='nocm=' + $scope.item.noMr
                    init()
                }
            }
            function init() {
                $scope.isRouteLoading = true
                medifirstService.get("emr/get-emr-transaksi?"+paramSearch+ "&jenisEmr=cppt", true).then(function (dat) {
                    $scope.isRouteLoading = false
                    $scope.dataDaftar = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 10,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });
                });

                $scope.PegawaiLogin2 = JSON.parse(localStorage.getItem('pegawai'))

                $scope.treeSourceRuangan = [];
                medifirstService.get("emr/get-menu-rekam-medis-dynamic?namaemr=cppt").then(function (e) {
                    var inlineDefault = new kendo.data.HierarchicalDataSource({
                        data: e.data.data,
                        schema: {
                            model: {
                                children: "child",
                                expanded: true
                            }
                        }
                    });
                    $scope.treeSourceBedah = inlineDefault
                    $scope.mainTreeViewBedahOption = {
                        dataTextField: ["caption"],
                        datakKeyField: ["id"],
                        select: onSelect,
                        dragAndDrop: true,
                        checkboxes: false
                    }
                    // var treeview = $("#treeview").data("kendoTreeView");
                    // .expandPath([2, 5])
                })
            }
            medifirstService.get("rawatjalan/get-dokters-combos", false).then(function(data) {
                $scope.listDokter = data.data.dokter;
            });
            var tipe = ''
            $scope.verif = function(){
                if ($scope.dataSelected == undefined)
                return
                tipe = 'verif'
                $scope.item.pilihDokter='';
                $scope.winDialogss.center().open();
            }
            $scope.notif = function(){
                if ($scope.dataSelected == undefined)
                return
                tipe = 'notif'
                $scope.item.pilihDokter='';
                $scope.winDialogss.center().open();
            }
            $scope.simpanDokter = function() {
            
                  var tmpData = {
                      norec: $scope.dataSelected.norec,
                      iddokter: $scope.item.pilihDokter.id,
                      tipe: tipe
                  }
                  medifirstService.post('emr/save-verif-cppt-dokter',tmpData).then(function(e){
                      // update status antrian
                      $scope.winDialogss.close();
                      init();
              
                      $scope.item.pilihDokter='';
                     
                  });
              
          }
            $scope.back = function () {
                $scope.myVar = 1
                $scope.showRiwayatEMR = false
            }
            $rootScope.showRiwayat = function () {
                $scope.showRiwayatEMR = false
            }
            $rootScope.loadRiwayat = function () {
                // debugger
                init()
            }
            $scope.showRiwayatEMR = false
            $scope.Lihat = function () {
                if ($scope.dataSelected == undefined)
                    return
                $scope.showRiwayatEMR = true
                $scope.myVar = 2
                var noemr2 = '-'
                if ($scope.dataSelected != undefined) {
                    noemr2 = $scope.dataSelected.noemr
                }
                $state.go("RekamMedis.CpptDinamis.CpptDinamisDetail.InputDiagnosaDokter", {
                    namaEMR: 94,
                    nomorEMR: noemr2
                });

                var arrStr = {
                    0: noemr2
                }
                cacheHelper.set('cacheNomorEMR', arrStr);
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
            $scope.create = function () {
                $scope.showRiwayatEMR = true
                $scope.myVar = 2
                var noemr2 = '-'
                $state.go("RekamMedis.CpptDinamis.CpptDinamisDetail.InputDiagnosaDokter", {
                    namaEMR: 94,
                    nomorEMR: noemr2
                });
                var arrStr = {
                    0: noemr2
                }
                cacheHelper.set('cacheNomorEMR', arrStr);
            }


            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }


    
            $scope.columnDaftar = {
                selectable: 'row',
                pageable: true,
                columns:
                        [

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
                            "width": "150px"
                        },
                        {
                            "field": "dokter",
                            "title": "Verif DPJP",
                            "width": "100px"
                        },
                        {
                            "field": "notifikasi",
                            "title": "Notifikasi",
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
            function hapusData(e) {
                // // if (loginITI ==false){
                // //  toastr.error('Tidak Bisa Menghapus Data','Info')
                // //  return
                // // }
                // e.preventDefault();
                // var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                // if (!dataItem) {
                //     toastr.error("Data Tidak Ditemukan");
                //     return;
                // }
                // var itemDelete = {
                //     "norec": dataItem.norec
                // }

                // managePhp.postData(itemDelete, 'rekam-medis/hapus-pengkajianpasien').then(function (e) {
                //     if (e.status === 201) {
                //         loadGrid()

                //         grid.removeRow(row);
                //     }
                // })

            }
          
            $scope.back = function () {
                window.history.back();
            }
      
        
            $scope.klikGrid = function (dataSelected) {
                $scope.dataSelected = dataSelected
            }
            
            $scope.batal = function () {
                $scope.item.layanan = ''
                $scope.item.qty = 1
                $scope.item.no = undefined
            }
            

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
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

            $scope.back = function () {
                $state.go('DaftarAntrianDokterRajal')
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
                    $state.go("RekamMedis.CpptDinamis.CpptDinamisDetail", {
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