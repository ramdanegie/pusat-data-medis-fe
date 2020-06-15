define(['initialize'], function (initialize) {
  'use strict';
  initialize.controller('AsesmenUmumCtrl', ['$q', '$rootScope', '$scope', '$state', 'CacheHelper', 'MedifirstService', '$mdDialog',
      function ($q, $rootScope, $scope, $state, cacheHelper, medifirstService, $mdDialog) {
          $scope.item = {};
          $scope.dataVOloaded = true;
          $scope.now = new Date();
          $scope.item.tglOperasi = new Date();
          $rootScope.isShowNavAses = true
          $scope.showNav = function () {
              $scope.asesmen = 1
              $rootScope.isShowNavAses = !$rootScope.isShowNavAses
              // $scope.collapseEMR =1
          }
          cacheHelper.set('cacheNomorEMR', undefined);

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
          var paramSearch =''
          $scope.PegawaiLogin2 = {};
          var namaRuangan = ''
          var namaRuanganFk = ''
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
          $scope.refresh = function () {
              init()
          }

          function init() {
              $scope.isRouteLoading = true
             
              // medifirstService.get("emr/get-emr-transaksi?nocm=" + $scope.item.noMr + "&jenisEmr=umum", true).then(function (dat) {
              medifirstService.get("emr/get-emr-transaksi-detail-form?"+paramSearch+ "&jenisEmr=umum", true).then(function (dat) {
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
              medifirstService.get("emr/get-menu-rekam-medis-dynamic?namaemr=umum").then(function (e) {
                  var deptInap=[16,35,17]
                  var deptId = localStorage.getItem('departemenPengkajian');
                  var strKode =''
                  if(deptInap.includes(parseInt(deptId)) == true){
                      strKode = 'hiddenRanap'
                  }else
                      strKode = 'hiddenRajal'
                  var dataTree = e.data.data
                  for (var i = dataTree.length - 1; i >= 0; i--) {
                      if (dataTree[i].kodeexternal == strKode && dataTree[i].kodeexternal != null) {
                          dataTree.splice([i], 1)
                      }
                  }
                  var inlineDefault = new kendo.data.HierarchicalDataSource({
                      data: dataTree,
                      schema: {
                          model: {
                              children: "child",
                              expanded: false
                          }
                      }
                  });
                  $scope.treeSourceBedah = inlineDefault
                  $scope.mainTreeViewBedahOption = {
                      dataBound: function (e) {
                          $('span.k-in').each(function () {
                              // if ($(this).text() == 'Check List RJ/IGD') { $(this).addClass('tandaan') }
                              // if ($(this).text() == 'UPPER') { $(this).addClass('tandaan') }
                              // if ($(this).text() == 'Surat Kontrol') { $(this).addClass('tandaan') }
                              // if ($(this).text() == 'Penolakan Tindakan Medis') { $(this).addClass('tandaan') }
                              // if ($(this).text() == 'Formulir Pindah Rumah Sakit') { $(this).addClass('tandaan') }
                              // if ($(this).text() == 'Formulir Pemantauan Ambulan') { $(this).addClass('tandaan') }
                              // if ($(this).text() == 'Formulir Pemakaian Ambulan') { $(this).addClass('tandaan') }
                              // if ($(this).text() == 'Asesmen Kebutuhan Transportasi') { $(this).addClass('tandaan') }
                              // if ($(this).text() == 'Dischard Planning (Kebutuhan Rencana Pulang)') { $(this).addClass('tandaan') }
                              // if ($(this).text() == 'Implememtasi Diri Sendiri') { $(this).addClass('tandaan') }

                              // if ($(this).text() == 'Skor EWS') { $(this).addClass('tandaan') }
                              // if ($(this).text() == 'FORMULIR TRANSFER') { $(this).addClass('tandaan') }
                              // if ($(this).text() == 'Catatan Grafik Tanda-tanda Vital') { $(this).addClass('tandaan') }
                              // if ($(this).text() == 'Serah Terima Pasien Pada Keluarga') { $(this).addClass('tandaan') }
                              // if ($(this).text() == 'Observasi Fisik') { $(this).addClass('tandaan') }
                              // if ($(this).text() == 'Surat Permintaan Pulang (APS)') { $(this).addClass('tandaan') }
                              // if ($(this).text() == 'Daftar Barang yang Dibawa Px') { $(this).addClass('tandaan') }
                          })
                          // var text = "CPPT Vital Sign";
                          // e.sender.element.find("span.k-in:contains(" + text + ")").addClass('kuntul');
                      },
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
          $scope.DaftarRawatInap = function() {
              $state.go("RGFmdGFyQW50cmlhblN1c3RlclJhbmFw",{
              })
          }
          $scope.Lihat = function () {
              if ($scope.dataSelected == undefined) {
                  toastr.error('Pilih data dulu')
                  return
              }
              cacheHelper.set('cacheNomorEMR', undefined);
              $scope.showRiwayatEMR = true
              $scope.myVar = 2
              var noemr2 = '-'
              if ($scope.dataSelected != undefined) {
                  noemr2 = $scope.dataSelected.noemr
              }
              $state.go("RekamMedis.AsesmenUmum.AsesmenUmumDetail", {
                  namaEMR: 430,
                  nomorEMR: noemr2
              });

              var arrStr = {
                  0: noemr2,
                  1: $scope.dataSelected.norec
              }
              cacheHelper.set('cacheNomorEMR', arrStr);
              cacheHelper.set('cacheNOREC_EMR', arrStr);
          }
          $scope.hapus = function () {
              if ($scope.dataSelected == undefined) {
                  toastr.error('Pilih data dulu')
                  return
              }
              if($scope.dataSelected.pegawaifk != medifirstService.getPegawaiLogin().id){
                  toastr.error('Tidak Bisa menghapus data')
                  return
              }
              var confirm = $mdDialog.confirm()
                  .title('Peringatan')
                  .textContent('Yakin mau menghapus data?')
                  .ariaLabel('Lucky day')
                  .cancel('Tidak')
                  .ok('Ya')
              $mdDialog.show(confirm).then(function () {
                  medifirstService.post('emr/hapus-emr-transaksi-norec', { norec: $scope.dataSelected.norec }).then(function (e) {
                      init()
                        medifirstService.postLogging('Hapus EMR', 'norec emrpasien_t', $scope.dataSelected.norec,
                        'Hapus No EMR - ' + $scope.dataSelected.noemr + ' pada No Registrasi  '
                      +  $scope.item.noregistrasi  + ' - Pasien : ' + $scope.item.namaPasien   ).then(function (res) {
                      })
                  })
              })

          }
          $scope.create = function () {
              cacheHelper.set('cacheNomorEMR', undefined);
              $scope.showRiwayatEMR = true
              $scope.myVar = 2
              var noemr2 = '-'
              $state.go("RekamMedis.AsesmenUmum.AsesmenUmumDetail", {
                  namaEMR: 440,
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


          $scope.columnGrid = [
              {
                  "field": "no",
                  "title": "No",
                  "width": "10px",
              },
              {
                  "field": "tglorder",
                  "title": "Tgl Order",
                  "width": "90px",
              },
              {
                  "field": "ruangan",
                  "title": "Nama Ruangan",
                  "width": "140px"
              },
              {
                  "field": "produkfk",
                  "title": "Kode",
                  "width": "40px",
              },
              {
                  "field": "namaproduk",
                  "title": "Layanan",
                  "width": "160px",
              },
              {
                  "field": "jumlah",
                  "title": "Qty",
                  "width": "40px",
              },
              {
                  "field": "hargasatuan",
                  "title": "Harga Satuan",
                  "width": "80px",
                  "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
              },
              {
                  "field": "hargadiscount",
                  "title": "Diskon",
                  "width": "80px",
                  "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
              },
              {
                  "field": "total",
                  "title": "Total",
                  "width": "80px",
                  "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
              },
              {
                  "field": "nostruk",
                  "title": "No Struk",
                  "width": "80px"
              }
          ];

          $scope.columnGridOrder = [
              {
                  "field": "no",
                  "title": "No",
                  "width": "10px",
              },
              {
                  "field": "namaproduk",
                  "title": "Layanan",
                  "width": "160px",
              },
              {
                  "field": "qtyproduk",
                  "title": "Qty",
                  "width": "40px",
              }
          ];
          $scope.columnGridRiwayat = [
              {
                  "field": "no",
                  "title": "No",
                  "width": "20px",
              },
              {
                  "field": "tglorder",
                  "title": "Tgl Order",
                  "width": "50px",
              },
              {
                  "field": "noorder",
                  "title": "No Order",
                  "width": "60px",
              },
              {
                  "field": "dokter",
                  "title": "Dokter",
                  "width": "100px"
              },
              {
                  "field": "namaruangantujuan",
                  "title": "Ruangan",
                  "width": "100px",
              },
              {
                  "field": "statusorder",
                  "title": "Status",
                  "width": "70px",
              }
          ];
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
              {
                  "command": [{
                      text: "Hapus",
                      click: hapusData,
                      imageClass: "k-icon k-delete"
                  }],
                  title: "",
                  width: "100px",
              }]
          };

          $scope.columnDaftar = {
              selectable: 'row',
              pageable: true,
              columns:
                      [ 
                     
                      {
                          "field": "tglemr",
                          "title": "Tgl EMR",
                          "width": "30%",
                          "template": "<span class='style-left'>{{formatTanggal('#: tglemr #')}}</span>"
                      },
                      {
                          "field": "noemr",
                          "title": "No EMR",
                          "width": "30%",
                      },
                      {
                          "field": "namalengkap",
                          "title": "Pegawai",
                          "width": "35%",
                      },
                      {
                          "field": "tglregistrasi",
                          "title": "Tgl Registrasi",
                          "width": "25%",
                          "template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
                      },
                      {
                          "field": "noregistrasifk",
                          "title": "No Registrasi",
                          "width": "25%",
                      },
                      // {
                      //     "field": "details",
                      //     "title": "Form",
                      //     "width": "300px",
                      //     "template": "# for(var i=0; i < details.length;i++){# <button class=\"k-button custom-button\" style=\"margin:0 0 5px\">#= details[i].namaform #</button> #}#",
                      // },
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
          $scope.data2 = function (dataItem) {
              // for (var i = 0; i < dataItem.details.length; i++) {
              //     dataItem.details[i].no = i+1

              // }
              // debugger
              dataItem.details.sort(function (a, b) {
                  if (a.namaform < b.namaform) { return -1; }
                  if (a.namaform > b.namaform) { return 1; }
                  return 0;
              })
              var data = []
              data.push(dataItem)
              return {
                  dataSource: new kendo.data.DataSource({
                      data: data,

                  }),
                  columns: [
                      {
                          "field": "details",
                          "title": "Form yang sudah di isi",
                   
                          "template": "# for(var i=0; i < details.length;i++){# <span class=\"button-details\" )\" >#= details[i].namaform #  <em class=\"k-button k-button-icon k-primary\""
                          + " style=\" margin: 3px;padding-left: .4em;padding-right: .4em;\"  ng-click=\"asupKaForm('#=details[i].emrpasienfk#','#=details[i].reportdisplay#',"
                          + "'#=details[i].emrfk#','#=details[i].norec#')\" > <span class=\"k-sprite k-icon k-i-search\">Details</span></em> <em class=\"k-button k-button-icon  k-primary \""
                          + " style=\" margin: 3px;padding-left: .4em;padding-right: .4em; margin-left: -3px;\"  ng-click=\"hapusFormHiji('#=details[i].emrpasienfk#','#=details[i].reportdisplay#',"
                          + "'#=details[i].emrfk#','#=details[i].norec#')\" > <span class=\"k-sprite fa fa-trash\" style=\"float: left;margin-top: 0.3em;padding-bottom: 2px;\"</span></em></span> #}#",

                          // "template": "# for(var i=0; i < details.length;i++){# <button class=\"k-button custom-button\" style=\"margin:0 0 5px\"  ng-click=\"asupKaForm('#=details[i].emrpasienfk#','#=details[i].reportdisplay#','#=details[i].emrfk#','#=details[i].norec#')\" >#= details[i].namaform #</button> #}#",
                      }

                  ]
              }
          };
          $scope.hapusFormHiji = function (noemr, reportdisplay, emrfk, norec) {
           
              var noemr2 = '-'
              if (noemr != undefined) {
                  noemr2 = noemr
              }
              if (noemr2 != '-')
                  noemr2.trim()
                  
              var confirm = $mdDialog.confirm()
                  .title('Peringatan')
                  .textContent('Yakin Mau Menghapus Data ?')
                  .ariaLabel('Lucky day')
                  .cancel('Tidak')
                  .ok('Ya')
              $mdDialog.show(confirm).then(function () {
                  $scope.hapusEMRDetail(noemr2,reportdisplay,emrfk,norec);
              })
           }
           $scope.hapusEMRDetail = function(noemr,reportdisplay, idemr,norec){
               var json = {
                   'noemr' : noemr,
                   'reportdisplay' : reportdisplay,
                   'idemr' : idemr,
                   'norec' : norec,
                   'idpegawai' : medifirstService.getPegawaiLogin().id,
               }
               medifirstService.post('emr/disable-emr-details',json).then(function(e){
                  cacheHelper.set('cacheNomorEMR', undefined);
                  var subStr =reportdisplay.substr(24)
                  medifirstService.postLogging('Hapus EMR', 'norec emrpasien_t',norec,
                        'Hapus Satu Form EMR ( '+ subStr  + ' ) No EMR - ' + noemr + ' pada No Registrasi  '
                      +  $scope.item.noregistrasi  + ' - Pasien : ' + $scope.item.namaPasien   ).then(function (res) {
                      })
                  init()
               })
           }
          $scope.asupKaForm = function (noemr, reportdisplay, emrfk, norec) {
              // var json = JSON.parse(selec)
              cacheHelper.set('cacheNomorEMR', undefined);
              // emrfk
              $scope.showRiwayatEMR = true
              $scope.myVar = 2
              var noemr2 = '-'
              if (noemr != undefined) {
                  noemr2 = noemr
              }
              if (noemr2 != '-')
                  noemr2.trim()
              var url = "RekamMedis.AsesmenUmum.AsesmenUmumDetail"
              if (reportdisplay != 'null')
                  url = reportdisplay
              $state.go(url, {
                  namaEMR: emrfk,
                  nomorEMR: noemr2
              });

              var arrStr = {
                  0: noemr2,
                  1: norec
              }
              cacheHelper.set('cacheNomorEMR', arrStr);
              cacheHelper.set('cacheNOREC_EMR', arrStr);
          }
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
          function sortingDetail (data){
              data.sort(function (a, b) {
                  if (a.nourut < b.nourut) { return -1; }
                  if (a.nourut > b.nourut) { return 1; }
                  return 0;
              })
              return data;
          }
          $scope.detailGridOptions = function (dataItem) {
              return {
               
                  dataSource: new kendo.data.DataSource({
                      data: dataItem.details
                  }),
                  columns: [
                      {
                          field: "namaproduk",
                          title: "Deskripsi",
                          width: "300px"
                      },
                      {
                          field: "qtyproduk",
                          title: "Qty",
                          width: "100px"
                      }]
              };
          };
          $scope.back = function () {
              window.history.back();
          }
          $scope.order = function () {
              $scope.CmdOrderPelayanan = false;
              $scope.OrderPelayanan = true;
          }
          $scope.Batal = function () {

          }

          $scope.add = function () {
              if ($scope.item.statusVerif == true) {
                  toastr.error("Data Sudah Diclosing, Hubungi Tatarekening!");
                  return;
              }
              if ($scope.item.qty == 0) {
                  alert("Qty harus di isi!")
                  return;
              }
              if ($scope.item.ruangantujuan == undefined) {
                  alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                  return;
              }
              if ($scope.item.layanan == undefined) {
                  alert("Pilih Layanan terlebih dahulu!!")
                  return;
              }
              var nomor = 0
              if ($scope.dataGridOrder == undefined) {
                  nomor = 1
              } else {
                  nomor = data2.length + 1
              }
              var data = {};
              if ($scope.item.no != undefined) {
                  for (var i = data2.length - 1; i >= 0; i--) {
                      if (data2[i].no == $scope.item.no) {
                          data.no = $scope.item.no

                          data.produkfk = $scope.item.layanan.id
                          data.namaproduk = $scope.item.layanan.namaproduk
                          data.qtyproduk = parseFloat($scope.item.qty)
                          data.objectruanganfk = namaRuanganFk
                          data.objectruangantujuanfk = $scope.item.ruangantujuan.id
                          data.pemeriksaanluar = $scope.item.pemeriksaanKeluar === true ? 1 : 0,
                              data.objectkelasfk = $scope.item.idKelas

                          data2[i] = data;
                          $scope.dataGridOrder = new kendo.data.DataSource({
                              data: data2
                          });
                      }
                  }

              } else {
                  data = {
                      no: nomor,
                      produkfk: $scope.item.layanan.id,
                      namaproduk: $scope.item.layanan.namaproduk,
                      qtyproduk: parseFloat($scope.item.qty),
                      objectruanganfk: namaRuanganFk,
                      objectruangantujuanfk: $scope.item.ruangantujuan.id,
                      pemeriksaanluar: $scope.item.pemeriksaanKeluar === true ? 1 : 0,
                      objectkelasfk: $scope.item.idKelas
                  }
                  data2.push(data)
                  // $scope.dataGrid.add($scope.dataSelected)
                  $scope.dataGridOrder = new kendo.data.DataSource({
                      data: data2
                  });
              }
              $scope.batal();
          }
          $scope.klikGrid = function (dataSelected) {
              $scope.dataSelected = dataSelected
          }
          // $scope.hapus = function () {
          //     if ($scope.item.qty == 0) {
          //         alert("Qty harus di isi!")
          //         return;
          //     }
          //     if ($scope.item.ruangantujuan == undefined) {
          //         alert("Pilih Ruangan Tujuan terlebih dahulu!!")
          //         return;
          //     }
          //     if ($scope.item.layanan == undefined) {
          //         alert("Pilih Layanan terlebih dahulu!!")
          //         return;
          //     }
          //     var nomor = 0
          //     if ($scope.dataGrid == undefined) {
          //         nomor = 1
          //     } else {
          //         nomor = data2.length + 1
          //     }
          //     var data = {};
          //     if ($scope.item.no != undefined) {
          //         for (var i = data2.length - 1; i >= 0; i--) {
          //             if (data2[i].no == $scope.item.no) {
          //                 data2.splice(i, 1);
          //                 for (var i = data2.length - 1; i >= 0; i--) {
          //                     data2[i].no = i + 1
          //                 }
          //                 // data2[i] = data;
          //                 $scope.dataGridOrder = new kendo.data.DataSource({
          //                     data: data2
          //                 });
          //             }
          //         }

          //     }
          //     $scope.batal();
          // }
          $scope.batal = function () {
              $scope.item.layanan = ''
              $scope.item.qty = 1
              $scope.item.no = undefined
          }
          $scope.BatalOrder = function () {
              data2 = []
              $scope.dataGridOrder = new kendo.data.DataSource({
                  data: data2
              });
              $scope.CmdOrderPelayanan = true;
              $scope.OrderPelayanan = false;
          }
          $scope.riwayat = function () {
              $scope.riwayatForm = true
              $scope.inputOrder = false;
          }
          $scope.newOrder = function () {
              $scope.riwayatForm = false
              $scope.inputOrder = true;
          }
          $scope.Simpan = function () {
              if ($scope.item.ruangantujuan == undefined) {
                  alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                  return
              }
              if (data2.length == 0) {
                  alert("Pilih layanan terlebih dahulu!!")
                  return
              }
              var objSave = {
                  norec_so: '',
                  norec_apd: norec_apd,
                  norec_pd: norec_pd,
                  qtyproduk: data2.length,//
                  objectruanganfk: namaRuanganFk,
                  objectruangantujuanfk: $scope.item.ruangantujuan.id,
                  departemenfk: 25,
                  pegawaiorderfk: $scope.PegawaiLogin2.pegawai[0].id,
                  tgloperasi: moment($scope.item.tglOperasi).format('YYYY-MM-DD hh:mm'),
                  details: data2
              }

              medifirstService.post('emr/save-order-pelayanan', objSave).then(function (e) {
                  init();
                  $scope.BatalOrder();
                  medifirstService.postLogging('Order Jadwal Bedah', 'Norec strukorder_t', e.data.strukorder.norec, 'Menu Dokter').then(function (res) {
                  })
              })
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

          $scope.showInputDiagnosaDokter = function () {
              var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
              cacheHelper.set('CacheInputDiagnosaDokter', arrStr);
              $state.go('InputDiagnosaDokter')
          }

          $scope.resep = function () {
              var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
              cacheHelper.set('InputResepApotikOrderRevCtrl', arrStr);
              $state.go('InputResepApotikOrderRev')
          }

          $scope.inputTindakanDokter = function () {
              var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl')
              cacheHelper.set('InputTindakanPelayananDokterRevCtrl', arrStr);
              $state.go('InputTindakanPelayananDokterRev', {
                  norecPD: norec_pd,
                  norecAPD: norec_apd,
              });
          }

          $scope.laboratorium = function () {
              var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl')
              cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
              $state.go('TransaksiPelayananLaboratoriumDokterRev')
          }

          $scope.radiologi = function () {
              var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl')
              cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', arrStr);
              $state.go('TransaksiPelayananRadiologiDokterRev')
          }

          $scope.rekamMedisElektronik = function () {
              var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
              cacheHelper.set('cacheRMelektronik', arrStr);
              $state.go('RekamMedisElektronik')
          }

          $scope.inputCPPT = function () {
              var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
              cacheHelper.set('cacheCPPT', arrStr);
              $state.go('CPPT')
          }

          $scope.hapusOrder = function () {
              if ($scope.dataSelectedRiwayat == undefined) {
                  toastr.error('Pilih data yang mau dihapus')
                  return
              }
              if ($scope.dataSelectedRiwayat.statusorder != 'PENDING') {
                  toastr.error('Tidak bisa dihapus')
                  return
              }
              var data = {
                  norec_order: $scope.dataSelectedRiwayat.norec
              }


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
                  $state.go("RekamMedis.AsesmenUmum.AsesmenUmumDetail", {
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