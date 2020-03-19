define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PengkajianKeperawatanCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'MedifirstService', 'CacheHelper',
        function ($rootScope, $scope, $state, DateHelper, medifirstService, cacheHelper) {

            $scope.isRouteLoading = false
          
            LoadCache();
            loadGrid();
            $scope.dataPegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));
            function LoadCache() {
                var chacePeriode = cacheHelper.get('cachePengkajianPasien');
                if (chacePeriode != undefined) {
                    $scope.noCM = chacePeriode[0]
                    $scope.namaPasien = chacePeriode[1]
                    $scope.jenisKelamin = chacePeriode[2]
                    $scope.noregistrasi = chacePeriode[3]
                    $scope.umur = chacePeriode[4]
                    $scope.kelompokPasien = chacePeriode[5]
                    $scope.tglRegistrasi = chacePeriode[6]
                    $scope.norec_pd = chacePeriode[8]
                    $scope.idKelas = chacePeriode[9]
                    $scope.kelas = chacePeriode[10]
                    $scope.idRuangan = chacePeriode[11]
                    $scope.namaRuangan = chacePeriode[12]
                    $scope.isNoregis= chacePeriode[13]
                }
            }
            function loadGrid() {
                if ($scope.isNoregis == true) {
                    loadRiwayat('noregistrasi=' + $scope.noregistrasi)

                } else {
                    loadRiwayat('nocm=' +   $scope.noCM)

                }
              
            }
            function loadRiwayat(params) {
                $scope.isRouteLoading = true
                medifirstService.get('emr/get-pengkajianpasien?' + params).then(function (data) {
                    $scope.isRouteLoading = false
                    $scope.sourcePAP = new kendo.data.DataSource({
                        data: data.data.data,
                        pageSize: 10,
                        // change: function(e) {
                        //     console.log('action : ' + e.action);
                        // }
                    });
                })
            }
            $scope.kl = function (current) {
                $scope.current = current;
                $state.params.kdPap = current.kdpap;
                $state.params.noRecRiwayatPap = current.norec;
                $scope.noRecRiwayatPap = $scope.current.norec;
                $scope.pasienId = $scope.current.objectpasienfk
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
            function hapusData(e) {
				// if (loginITI ==false){
				// 	toastr.error('Tidak Bisa Menghapus Data','Info')
				// 	return
				// }
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if (!dataItem) {
					toastr.error("Data Tidak Ditemukan");
					return;
				}
				var itemDelete = {
					"norec": dataItem.norec
				}

                medifirstService.post( 'emr/hapus-pengkajianpasien',itemDelete).then(function (e) {
					if (e.status === 201) {
                        loadGrid()

						grid.removeRow(row);
					}
				})

			}
            // $rootScope.$watch('showMenuPengkajian', function(e) {
            //     debugger
            //     if (e === undefined) return;
            //     $scope.showMenuPengkajian = e;
            // });
            $scope.showDaftarPengkajian = true
            $scope.Lihat = function () {
                localStorage.removeItem('activeMenuDashboardPAP'); // remove cache activeMenuDashboardPAP
                localStorage.removeItem('activeMenuSkriningUmum'); // remove cache activeMenuSkriningUmum
                localStorage.removeItem('activeMenuSkriningKhusus'); // remove cache activeMenuSkriningKhusus
                window.localStorage.setItem('activeMenuPengkajian', true);
                $scope.showMenuPengkajian = true
                $scope.showDaftarPengkajian = false
                cacheHelper.set('noRecPap', $scope.noRecRiwayatPap);
                if ($scope.noRecRiwayatPap) {

                    $state.go('RekamMedis.MenuPengkajian',{
                        norecAPD: $state.params.noRec,
                        noRec: $state.params.noRec,
                    })
                    // $rootScope.isShowNavEMR = true

                    // $state.go('dashboardpasien.pengkajianUtama', {
                    //     noCM: $scope.noCM,
                    //     tanggal: moment(new Date($scope.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    //     noRec: $state.params.norecAPD,
                    //     // ruangana: $scope.ruangana,
                    //     noRecRiwayatPap: $scope.noRecRiwayatPap,
                    //     pasienId: $scope.pasienId,
                    //     kdPap: $scope.current.kdpap
                    // });
                } else {
                    window.messageContainer.error('Riwayat  belum dipilih')
                }
            }

            $scope.create = function () {
                var tmp = {
                    "norec": '',
                    "tglregistrasi": DateHelper.getPeriodeFormatted(new Date()),
                    "nocm": $scope.noCM,
                    "objectruanganfk": $scope.idRuangan,
                    "noregistrasifk": $state.params.noRec,
                    "pegawaifk": $scope.dataPegawaiLogin.id
                }
                medifirstService.post( 'emr/save-pengkajianpasien',tmp).then(function (response) {
                    cacheHelper.set('noRecPap', response.data.pap.norec);
                    
                    var cookie = document.cookie.split(';');
                    cookie = cookie[0].split('=');
                    if(cookie[1] =='suster'){
                        var data ={
                            "norec_apd" :$state.params.noRec,
                            "kelompokUser" : cookie[1]
                        }
                        medifirstService.postNonMessage('rawatjalan/save-panggil',data)
                        .then(function (res) {
                            $state.go('RekamMedis.MenuPengkajian', {
                                noRec:  $state.params.noRec,
                   
                                // kdPap: $scope.current.kdPap
                                // minta backend kirim respon berupa kdPap saat buat PAP baru
                            });
                            $rootScope.isShowNavEMR = true
                        })
                    }
                   
                //     // loadData();
                    
                })
            }


            $rootScope.getRekamMedisCheck = function (bool) {
                if (bool) {
                    loadRiwayat('noregistrasi=' + $scope.noregistrasi)
                } else {
                    loadRiwayat('NoCM=' + $scope.noCM)
                }
            }


        }
    ]);
});