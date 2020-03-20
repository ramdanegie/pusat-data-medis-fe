define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarAntrianPasienCtrl', ['DateHelper', '$rootScope', '$scope', 'ModelItem', 'MedifirstService', '$state', '$window', 'CetakHelper', 'CacheHelper',
        function (dateHelper, $rootScope, $scope, ModelItem, medifirstService, $state, $window, cetakHelper, cacheHelper) {
            $scope.isRouteLoading = false;
            $scope.title = "ini page pencarian pasien";
            $scope.isCalling = false;
            $scope.pegawai = ModelItem.getPegawai();
            $rootScope.isOpen = true;
            $scope.items = {};
            $scope.item = {};
            $scope.dataItem = {};
            $scope.now = new Date();
            LoadData();


            $scope.Column = {
                toolbar: [
                    "excel",

                ],
                excel: {
                    fileName: "DaftarPasien.xlsx",
                    allPages: true,
                },
                excelExport: function (e) {
                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 2;
                    sheet.mergedCells = ["A1:M1"];
                    sheet.name = "Orders";

                    var myHeaders = [{
                        value: "Daftar Registrasi Pasien",
                        fontSize: 20,
                        textAlign: "center",
                        background: "#ffffff",
                        // color:"#ffffff"
                    }];

                    sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70 });
                },
                selectable: 'row',
                pageable: true,
                columns:
                    [
                        {
                            "field": "no",
                            "title": "No",                           
                            "width": "60px",
                        },
                        {
                            "field": "namapasien",
                            "title": "Nama Pasien",
                            "width": "150px",
                        },
                        {
                            "field": "nik",
                            "title": "NIK",
                            "width": "100px",
                        },
                        {
                            "field": "nobpjs",
                            "title": "No. BPJS",
                            "width": "100px",
                        },
                        {
                            "field": "nokk",
                            "title": "No. KK",
                            "width": "100px",
                        },
                        {
                            "field": "tgllahir",
                            "title": "Tgl Lahir",
                            "template": "#= new moment(new Date(tgllahir)).format('DD-MM-YYYY') #",
                            "width": "80px",
                        },
                        {
                            "field": "umur",
                            "title": "Umur",
                            "width": "120px",
                        },
                        {
                            "field": "jeniskelamin",
                            "title": "Jenis Kelamin",
                            "width": "100px",
                        },
                        {
                            "field": "golongandarah",
                            "title": "Golongan Darah",
                            "width": "100px",
                        }
                    ]
            };           
            // $scope.Page = {
            //     refresh: true,
            //     pageSizes: true,
            //     buttonCount: 5
            // }

            function LoadData() {
                $scope.isRouteLoading = true;
                var nik = ''
                if ($scope.NIK)
                    nik = '&nik=' + $scope.NIK
                var namaPasien = ''
                if ($scope.namaPasiens)
                    namaPasien = '&namapasien=' + $scope.namaPasiens
                var noBpjs = ''
                if ($scope.noBpjs)
                    noBpjs = '&nobpjs=' + $scope.noBpjs
                var noKK = ''
                if ($scope.noKK)
                    noKK = '&nokk=' + $scope.noKK
                medifirstService.get('get-pasien?' + nik + namaPasien + noBpjs + noKK).then(function (e) {
                    $scope.isRouteLoading = false;
                    var data = e.data;
                    for (let i = 0; i < data.length; i++) {
                        const element = data[i];
                        element.no = i + 1;
                        var tanggal = $scope.now;
                        var tanggalLahir = new Date(element.tgllahir);
                        var umurzz = dateHelper.CountAge(tanggalLahir, tanggal);
                        element.umur = umurzz.year + ' thn ' + umurzz.month + ' bln ' + umurzz.day + ' hari'
                    }
                    $scope.patienGrids = new kendo.data.DataSource({
                        data: data,
                        pageSize: 10,
                        total: data.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });
                });
            }

            $scope.findData = function () {
                LoadData();
            }

            $scope.klikGrid = function (dataPasienSelected) {
				if (dataPasienSelected != undefined) {
                    $scope.dataPasienSelected = dataPasienSelected;
				}
            }
            
            $scope.RiwayatPasien = function(){                
                if ($scope.dataPasienSelected == undefined) {
                    window.messageContainer.error("Pasien Belum Dipilih!!!");
					return;
                }
                var chacePeriode = {
                    0: $scope.dataPasienSelected.nik,
                    1: 'GetRiwayat',
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                cacheHelper.set('CacheRiwayatPasien', chacePeriode);
                $state.go('RekamMedis')

            }

            /*
            Batas
            */
        }
    ]);
});