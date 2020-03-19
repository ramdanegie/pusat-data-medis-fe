define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('LaboratoriumCtrl', ['$mdDialog','$q', '$scope', '$state', 'MedifirstService', '$timeout','DateHelper', 'CacheHelper', '$rootScope',
		function ($mdDialog,$q, $scope, $state, medifirstService, $timeout,dateHelper, cacheHelper, $rootScope) {
			$scope.isRouteLoading = false;
			$scope.dataPasienSelected = {};
			$scope.dataLabSelected = {};
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

			$scope.klikGridLab = function (dataLabSelected) {
				if (dataLabSelected != undefined) {
					$scope.item.namaDokter = { id: dataLabSelected.pgid, namalengkap: dataLabSelected.namadokter }					
				}
			}

			
			function init() {
				$scope.isRouteLoading = true;

				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');
								
				
				var rg = "&ruangId=PK018"
				
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

			$scope.columnDaftarLab = {
				toolbar: [
					"excel",

				],
				excel: {
					fileName: "DaftarLabPasien.xlsx",
					allPages: true,
				},
				excelExport: function (e) {
					var sheet = e.workbook.sheets[0];
					sheet.frozenRows = 2;
					sheet.mergedCells = ["A1:H1"];
					sheet.name = "Orders";

					var myHeaders = [{
						value: "Daftar Lab Pasien",
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
						"field": "namapemeriksaan",
						"title": "Nama Pemeriksaan",
						"width": "80px",
					},
					{
						"field": "hasil",
						"title": "Hasil",
						"width": "50px",
					},
					{
						"field": "satuan",
						"title": "Satuan",
						"width": "60px",
					},
					{
						"field": "normal_laki",
						"title": "Normal Laki-laki",
						"width": "80px"
					},
					{
						"field": "normal_wanita",
						"title": "Normal Wanita",
						"width": "80px",
					},
					{
						"field": "golongan",
						"title": "Golongan",
						"width": "80px",
					}		
				],				
			};
			

			$scope.laboratorium = function () {
				if ($scope.dataPasienSelected == undefined) {
					toastr.error('Pilih data dulu')
					return
				}
				
				medifirstService.get('emr/get-lab-by-no-transaksi?notransaksi=' + $scope.dataPasienSelected.notransaksi).then(function (e) {											
						$scope.notransaksi = $scope.dataPasienSelected.notransaksi;								
						$scope.namapasien = $scope.dataPasienSelected.namapasien;
						$scope.dokter = $scope.dataPasienSelected.namadokter;						
						$scope.poliklinik = $scope.dataPasienSelected.poliklinik;	
						
						$scope.dataDaftarLab = new kendo.data.DataSource({
							data: e.data.lab,
							pageSize: 10,
							total: e.data.lab[0],
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