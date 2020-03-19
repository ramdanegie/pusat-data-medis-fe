define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('RadiologiCtrl', ['$mdDialog','$q', '$scope', '$state', 'MedifirstService', '$timeout','DateHelper', 'CacheHelper', '$rootScope',
		function ($mdDialog,$q, $scope, $state, medifirstService, $timeout,dateHelper, cacheHelper, $rootScope) {
			$scope.isRouteLoading = false;
			$scope.dataPasienSelected = {};
			$scope.dataRadiologiSelected = {};
			$scope.now = new Date()
			$scope.item = {
				tglresume: $scope.now
			} // set defined object

			$scope.pegawaiLogin = JSON.parse(localStorage.getItem('pegawai'))
			var cookie = document.cookie.split(';')
			var kelompokUser = cookie[0].split('=')
			var getCache = cacheHelper.get('cacheRekamMedis')
			if (getCache != undefined) {
				$scope.notransaksi = getCache[3]
				$scope.norecPd = getCache[8]
				$scope.item.namaruangan = getCache[12]
				$scope.norm = getCache[0];
				// $rootScope.itemFormResumeRJ = getCache
			}
			$scope.resumeOpt = {
				toolbar: [
					"excel",

				],
				excel: {
					fileName: "DaftarKunjunganPasien.xlsx",
					allPages: true,
				},
				excelExport: function (e) {
					var sheet = e.workbook.sheets[0];
					sheet.frozenRows = 2;
					sheet.mergedCells = ["A1:H1"];
					sheet.name = "Orders";

					var myHeaders = [{
						value: "Daftar Kunjungan Pasien",
						fontSize: 20,
						textAlign: "center",
						background: "#ffffff",
						// color:"#ffffff"
					}];

					sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70 });
				},
				selectable: 'row',				
				pageable: true,
				scrollable: true,
				columns: [
					{
						"field": "no",
						"title": "No",
						"width": "30px",
					},
					{
						"field": "tglregistrasi",
						"title": "Tgl Registrasi",
						"width": "80px",
						//"template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
					},
					{
						"field": "notransaksi",
						"title": "No Transaksi",
						"width": "90px"
					},
					{
						"field": "norec",
						"title": "NoRM",
						"width": "70px",
						"template": "<span class='style-center'>#: norec #</span>"
					},
					{
						"field": "namapasien",
						"title": "Nama Pasien",
						"width": "150px",
						"template": "<span class='style-left'>#: namapasien #</span>"
					},
					{
						"field": "poliklinik",
						"title": "Poliklinik",
						"width": "150px",
						"template": "<span class='style-left'>#: poliklinik #</span>"
					},					
					{
						"field": "namadokter",
						"title": "Nama Dokter",
						"width": "150px",
						"template": '# if( namadokter==null) {# - # } else {# #= namadokter # #} #'
					},
					{
						"field": "carabayar",
						"title": "Penjamin",
						"width": "100px",
						"template": '# if( carabayar==null) {# - # } else {# #= carabayar # #} #'
					},
					// {
					// 	"field": "statuspasien",
					// 	"title": "Status Pasien",
					// 	"width":"100px",
					// }				
				],				
			};
			
			init();

			$scope.klikGrid = function (dataPasienSelected) {
				if (dataPasienSelected != undefined) {
					$scope.item.namaDokter = { id: dataPasienSelected.pgid, namalengkap: dataPasienSelected.namadokter }					
				}
			}

			$scope.klikGridRadiologi = function (dataRadiologiSelected) {
				if (dataRadiologiSelected != undefined) {
					$scope.item.namaDokter = { id: dataRadiologiSelected.pgid, namalengkap: dataRadiologiSelected.namadokter }					
				}
			}

			
			function init() {
				$scope.isRouteLoading = true;

				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');
								
				
				var rg = "&ruangId=PK019"
				
				var dk = ""
				if ($scope.item.dokter != undefined) {
					var dk = "&dokId=" + $scope.item.dokter.id
				}				
				var jmlRows = "";
				if ($scope.item.jmlRows != undefined) {
					jmlRows = $scope.item.jmlRows
				}

				$q.all([
					medifirstService.get("registrasi/daftar-registrasi/get-riwayat-pasien-db-lama-by-rm?norm="+$scope.norm+
						"&tglAwal=" + tglAwal +
						"&tglAkhir=" + tglAkhir + rg  + dk
						+ '&jmlRows=' + jmlRows),
				]).then(function (data) {
					$scope.isRouteLoading = false;
					for (var i = 0; i < data[0].data.length; i++) {
						data[0].data[i].no = i + 1
						var umur = dateHelper.CountAge(new Date(data[0].data[i].tgllahir), new Date(data[0].data[i].tglregistrasi));
						data[0].data[i].umur = umur.year + ' th, ' + umur.month + ' bln, ' + umur.day + ' hr'
					}
					$scope.sourceResume = new kendo.data.DataSource({
						data: data[0].data,
						pageSize: 10,
						total: data[0].data,
						serverPaging: false,
						schema: {
							model: {
								fields: {
								}
							}
						}
					});

					var chacePeriode = tglAwal + "~" + tglAkhir
					cacheHelper.set('DaftarRiwayatPasienCtrl', chacePeriode);
				});

				 $scope.isRouteLoading = false;

			};

			$scope.columnDaftarRadiologi = {
				toolbar: [
					"excel",

				],
				excel: {
					fileName: "DaftarRadiologiPasien.xlsx",
					allPages: true,
				},
				excelExport: function (e) {
					var sheet = e.workbook.sheets[0];
					sheet.frozenRows = 2;
					sheet.mergedCells = ["A1:H1"];
					sheet.name = "Orders";

					var myHeaders = [{
						value: "Daftar Radiologi Pasien",
						fontSize: 20,
						textAlign: "center",
						background: "#ffffff",
						// color:"#ffffff"
					}];

					sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70 });
				},
				selectable: 'row',				
				pageable: true,
				scrollable: true,
				columns: [
					{
						"field": "tglperiksa",
						"title": "Tanggal Periksa",
						"width": "50px",
					},
					{
						"field": "produk",
						"title": "Nama Produk",
						"width": "50px",
					},					
				],				
			};
			

			$scope.radiologi = function () {
				if ($scope.dataPasienSelected == undefined) {
					toastr.error('Pilih data dulu')
					return
				}
				
				medifirstService.get('emr/get-radiologi-by-no-transaksi?notransaksi=' + $scope.dataPasienSelected.notransaksi).then(function (e) {						
						$scope.notransaksi = $scope.dataPasienSelected.notransaksi;								
						$scope.namapasien = $scope.dataPasienSelected.namapasien;
						$scope.dokter = $scope.dataPasienSelected.namadokter;						
						$scope.poliklinik = $scope.dataPasienSelected.poliklinik;	
						//alert(e.data.Radiologi);

						$scope.hasil = e.data.radiologi[0].hasil;	

						$scope.dataDaftarRadiologi = new kendo.data.DataSource({
							data: e.data.radiologi,
							pageSize: 10,
							total: e.data.radiologi[0],
							serverPaging: false,
							schema: {
								model: {
									fields: {
									}
								}
							}
						});

						$scope.isRouteLoading = false
						
					});

				$scope.popUpDiagnosa.center().open()
			}

			

			$scope.tutup = function () {
				$scope.popUpDiagnosa.close()
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
		}
	]);
});