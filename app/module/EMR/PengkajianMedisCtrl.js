define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PengkajianMedisCtrl', ['$scope', '$timeout', 'MedifirstService', '$state', 'CacheHelper', 'DateHelper',
        function ($scope, $timeout, medifirstService, $state, cacheHelper, dateHelper) {
            $scope.item = {};
            $scope.itemD = {};
            $scope.now = new Date();
            $scope.dataVOloaded = true;
            $scope.isRouteLoading = false;
            $scope.klinikKulit = false;
            $scope.klinikMata = false;
            $scope.klinikTHT = false;
            // menu disabled
            $scope.isShowAnamnesis = true;
            $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'));
            $scope.showAnamnesis = function () {
                $scope.isShowAnamnesis = !$scope.isShowAnamnesis;
            }
            $scope.ishShowFisikUmum = true;
            $scope.showFisikUmum = function () {
                $scope.ishShowFisikUmum = !$scope.ishShowFisikUmum;
            }
            $scope.isShowRencana = true;
            $scope.showRencana = function () {
                $scope.isShowRencana = !$scope.isShowRencana;
            }

            $scope.isShowEdukasi = true;
            $scope.showEdukasi = function () {
                $scope.isShowEdukasi = !$scope.isShowEdukasi;
            }
            $scope.isShowPerjanjian = true;
            $scope.showPerjanjian = function () {
                $scope.isShowPerjanjian = !$scope.isShowPerjanjian;
            }
            $scope.nav = function (state) {
                // debugger;
                $scope.currentState = state;
                $state.go(state, $state.params);
                console.log($scope.currentState);
            }

            $scope.findBy = "1"
            var norec_apd = ''
            var norec_pd = ''
            $scope.showTombol = false
            // LoadDataCombo();
            LoadCache();
            function LoadCache() {
                var chacePeriode = cacheHelper.get('cacheRMelektronik');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.item.noMr = chacePeriode[0]
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
                    $scope.item.tglLahir = chacePeriode[14]
                    if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                        $scope.showTombol = true
                    }

                }
            }

          

            $scope.back = function () {
                $state.go('DaftarAntrianDokterRajal')
            }
            $scope.showInputDiagnosaDokter = function () {
                var arrStr = cacheHelper.get('cacheRMelektronik');
                cacheHelper.set('CacheInputDiagnosaDokter', arrStr);
                $state.go('InputDiagnosaDokter')
            }
            $scope.resep = function () {
                var arrStr = cacheHelper.get('cacheRMelektronik');
                cacheHelper.set('InputResepApotikOrderRevCtrl', arrStr);
                $state.go('InputResepApotikOrderRev')
            }
            $scope.inputTindakanDokter = function () {
                var arrStr = cacheHelper.get('cacheRMelektronik')
                cacheHelper.set('InputTindakanPelayananDokterRevCtrl', arrStr);
                $state.go('InputTindakanPelayananDokterRev', {
                    norecPD: norec_pd,
                    norecAPD: norec_apd,

                });
            }
            $scope.laboratorium = function () {
                var arrStr = cacheHelper.get('cacheRMelektronik')
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananLaboratoriumDokterRev')
            }
            $scope.radiologi = function () {
                var arrStr = cacheHelper.get('cacheRMelektronik')
                cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananRadiologiDokterRev')
            }
            $scope.rekamMedisElektronik = function () {
                var arrStr = cacheHelper.get('cacheRMelektronik');
                cacheHelper.set('cacheRMelektronik', arrStr);
                $state.go('RekamMedisElektronik')
            }
            $scope.inputCPPT = function () {
                var arrStr = cacheHelper.get('cacheRMelektronik');
                cacheHelper.set('cacheCPPT', arrStr);
                $state.go('CPPT')
            }

            $scope.gridAnamnesis = {
                pageable: true,
                columns: [
                    {
                        "field": "tglinput",
                        "title": "Tgl / Jam",
                        "width": "100px"
                    }, {
                        "field": "namalengkap",
                        "title": "Petugas",
                        "width": "150px"
                    }, {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": "150px"
                    }, {
                        "field": "anamnesisdokter",
                        "title": "Anamnesis",
                        "width": "400px"
                    }
                ]
            };

            $scope.gridRiwayatAnamnesis = {
                pageable: true,
                columns: [
                    {
                        "field": "tglinput",
                        "title": "Tgl / Jam",
                        "width": "100px"
                    }, {
                        "field": "namalengkap",
                        "title": "Petugas",
                        "width": "150px"
                    }, {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": "150px"
                    }, {
                        "field": "riwayatpenyakit",
                        "title": "Riwayat Penyakit",
                        "width": "300px"
                    },
                    {
                        "field": "riwayatpengobatan",
                        "title": "Riwayat Pengobatan",
                        "width": "300px"
                    }
                ]
            };


            $scope.gridFisikUmum = {
                pageable: true,
                columns: [
                    {
                        "field": "tglinput",
                        "title": "Tgl / Jam",
                        "width": "100px"
                    }, {
                        "field": "namalengkap",
                        "title": "Petugas",
                        "width": "150px"
                    }, {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": "150px"
                    }, {
                        "field": "pemeriksaanumum",
                        "title": "Pemeriksaan Fisik Umum",
                        "width": "400px"
                    }
                ]
            }
            $scope.gridRencana = {
                pageable: true,
                columns: [
                    {
                        "field": "tglinput",
                        "title": "Tgl / Jam",
                        "width": "100px"
                    }, {
                        "field": "namalengkap",
                        "title": "Petugas",
                        "width": "150px"
                    }, {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": "150px"
                    }, {
                        "field": "rencana",
                        "title": "Rencana",
                        "width": "400px"
                    }
                ]
            }

            $scope.gridEdukasi = {
                pageable: true,
                columns: [
                    {
                        "field": "tglinput",
                        "title": "Tgl / Jam",
                        "width": "100px"
                    }, {
                        "field": "namalengkap",
                        "title": "Petugas",
                        "width": "150px"
                    }, {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": "150px"
                    }, {
                        "field": "edukasi",
                        "title": "Edukasi",
                        "width": "400px"
                    }
                ]
            }
            // anam
            $scope.anamnesis = {};
            function loadAnamnesis() {
                medifirstService.get("emr/get-anamnesis?noregistrasifk=" + norec_apd
                    , true).then(function (dat) {
                        let array = dat.data.data;
                        for (let i in array) {

                        }
                        $scope.sourceAnamnesis = new kendo.data.DataSource({
                            data: array
                        });
                    })
            }

            loadAnamnesis()
            $scope.tambahAnamnesis = function () {
                if ($scope.anamnesis.anamnesis == undefined) {
                    toastr.error('Anamnesis masih kosong')
                    return
                }
                var jsonSave = {
                    norec: $scope.anamnesis.norecAnam !== undefined ? $scope.anamnesis.norecAnam : '',
                    noregistrasifk: norec_apd,
                    anamnesisdokter: $scope.anamnesis.anamnesis,
                    anamnesissuster: null,
                    ruanganfk: $scope.item.idRuangan,
                    pegawaifk: $scope.dataLogin.id,
                    // jenisinput: 'Anamnesis',
                }
                medifirstService.post('emr/post-anamnesis/save',jsonSave).then(function (e) {
                    loadAnamnesis()
                    $scope.anamnesis = {}
                    medifirstService.postLogging('Pengkajian Medis', 'Norec anamnesis_t', e.data.norec, 'Pengkajian Medis - Anamnesis dengan No Registrasi ' + $scope.item.noregistrasi).then(function (res) {
                    })
                });
            };

            $scope.klikAnamnesis = function (dataAnamnesis) {
                $scope.anamnesis.anamnesis = dataAnamnesis.anamnesisdokter
                $scope.anamnesis.norecAnam = dataAnamnesis.norec
                LoadIsiPengkajian();
            }

            $scope.hapusAnamnesis = function () {
                if ($scope.dataAnamnesis == undefined) {
                    toastr.error('Pilih data yg mau di hapus')
                    return
                }
                var jsonSave = {
                    norec: $scope.dataAnamnesis.norec,
                    jenisinput: $scope.dataAnamnesis.jenisinput
                }
                medifirstService.post('emr/post-anamnesis/delete',jsonSave).then(function (e) {
                    loadAnamnesis()
                    $scope.anamnesis = {}
                });
            }

            // riawyat anamnesis
            var timeoutPromise;
            $scope.$watch('anamnesis.cariAnamnesis', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter("anamnesisdokter", newVal)
                    }
                })
            });
            $scope.$watch('anamnesis.cariPetugas', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter("namalengkap", newVal)
                    }
                })
            });
            function applyFilter(filterField, filterValue) {
                var dataGrid = $("#gridRiwayatAnamnesisss").data("kendoGrid");
                var currFilterObject = dataGrid.dataSource.filter();
                var currentFilters = currFilterObject ? currFilterObject.filters : [];

                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field === filterField)
                            currentFilters.splice(i, 1);
                        break;
                    }
                }

                if (filterValue.id) {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue
                    });
                } else {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    });
                }

                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
            };
            $scope.resetFilter = function () {
                var dataGrid = $("#gridRiwayatAnamnesisss").data("kendoGrid");
                if (dataGrid != undefined)
                    dataGrid.dataSource.filter({});
                var dataGrid2 = $("#idRiwayatPengobatan").data("kendoGrid");
                if (dataGrid2 != undefined)
                    dataGrid2.dataSource.filter({});
                var dataGrid3 = $("#idRiwayatPemeriksaan").data("kendoGrid");
                if (dataGrid3 != undefined)
                    dataGrid3.dataSource.filter({});
                var dataGrid4 = $("#idRiwayatRencana").data("kendoGrid");
                if (dataGrid4 != undefined)
                    dataGrid4.dataSource.filter({});

                $scope.edukasi = {}
                $scope.rencana = {}
                $scope.pemriksaan = {}
                $scope.riwayat = {}
                $scope.anamnesis = {}
            }
            $scope.riwayatAnamnesis = function (data) {
                $scope.gridRiwayatAnamnesis2 = {
                    pageable: true,
                    columns: [
                        {
                            "field": "noregistrasi",
                            "title": "No Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglregistrasi",
                            "title": "Tgl Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglinput",
                            "title": "Tgl / Jam",
                            "width": "100px"
                        }, {
                            "field": "namalengkap",
                            "title": "Petugas",
                            "width": "150px"
                        }, {
                            "field": "namaruangan",
                            "title": "Ruangan",
                            "width": "150px"
                        }, {
                            "field": "anamnesisdokter",
                            "title": "Anamnesis",
                            "width": "300px"
                        }
                    ]
                }
                medifirstService.get("emr/get-anamnesis?nocm=" + $scope.item.noMr
                    , true).then(function (dat) {
                        let array = dat.data.data;
                        $scope.sourceRiwayatAnamnesis2 = new kendo.data.DataSource({
                            data: array
                        });
                    })
                if (data == true)
                    $scope.isRiwayatAnam = true
                else
                    $scope.isRiwayatAnam = false
            }
            // emd riwayat anam
            // end anamnesis

            // riwayatpenuakit
            $scope.riwayat = {};
            function loadRiwayat() {
                medifirstService.get("emr/get-riwayat?noregistrasifk=" + norec_apd
                    , true).then(function (dat) {
                        let array = dat.data.data;

                        $scope.sourceRiwayatAnamnesis = new kendo.data.DataSource({
                            data: array
                        });
                    })
            }
            loadRiwayat()
            $scope.tambahRiwayatPenyakit = function () {
                if ($scope.riwayat.riwayatPenyakit == undefined) {
                    toastr.error('Riwayat Penyakit masih kosong')
                    return
                }
                if ($scope.riwayat.riwayatPengobatan == undefined) {
                    toastr.error('Riwayat Pengobatan masih kosong')
                    return
                }
                var jsonSave = {
                    norec: $scope.riwayat.norec !== undefined ? $scope.riwayat.norec : '',
                    noregistrasifk: norec_apd,
                    riwayatpenyakit: $scope.riwayat.riwayatPenyakit,
                    riwayatpengobatan: $scope.riwayat.riwayatPengobatan,
                    ruanganfk: $scope.item.idRuangan,
                    pegawaifk: $scope.dataLogin.id,
                    jenisinput: 'Riwayat',
                }
                medifirstService.post( 'emr/post-riwayat/save',jsonSave).then(function (e) {
                    loadRiwayat()
                    $scope.riwayat = {}
                    medifirstService.postLogging('Pengkajian Medis', 'Norec riwayatpengobatan_t', e.data.norec, 'Pengkajian Medis - Riwayat Pengobatan dengan No Registrasi ' + $scope.item.noregistrasi).then(function (res) {
                    })
                });
            };

            $scope.klikRiwayatAnamnesis = function (data) {
                $scope.riwayat.riwayatPenyakit = data.riwayatpenyakit
                $scope.riwayat.riwayatPengobatan = data.riwayatpengobatan
                $scope.riwayat.norec = data.norec
                LoadIsiPengkajian();
            }
            $scope.hapusRiwayatPenyakit = function () {
                if ($scope.dataRiwayatAnamnesis == undefined) {
                    toastr.error('Pilih data yg mau di hapus')
                    return
                }
                var jsonSave = {
                    norec: $scope.dataRiwayatAnamnesis.norec,
                    jenisinput: $scope.dataRiwayatAnamnesis.jenisinput
                }
                medifirstService.post( 'emr/post-riwayat/delete',jsonSave).then(function (e) {
                    loadRiwayat()
                    $scope.riwayat = {}
                });
            }

            // riawyat poengobaytan
            var timeoutPromise;
            $scope.$watch('riwayat.penyakit', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter2("riwayatpenyakit", newVal)
                    }
                })
            });
            $scope.$watch('riwayat.pengobatan', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter2("riwayatpengobatan", newVal)
                    }
                })
            });
            function applyFilter2(filterField, filterValue) {
                var dataGrid = $("#idRiwayatPengobatan").data("kendoGrid");
                var currFilterObject = dataGrid.dataSource.filter();
                var currentFilters = currFilterObject ? currFilterObject.filters : [];

                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field === filterField)
                            currentFilters.splice(i, 1);
                        break;
                    }
                }

                if (filterValue.id) {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue
                    });
                } else {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    });
                }

                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
            };

            $scope.riwayatPengobatan = function (data) {
                $scope.gridRiwayatPengobatan = {
                    pageable: true,
                    columns: [
                        {
                            "field": "noregistrasi",
                            "title": "No Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglregistrasi",
                            "title": "Tgl Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglinput",
                            "title": "Tgl / Jam",
                            "width": "100px"
                        }, {
                            "field": "namalengkap",
                            "title": "Petugas",
                            "width": "150px"
                        }, {
                            "field": "namaruangan",
                            "title": "Ruangan",
                            "width": "150px"
                        }, {
                            "field": "riwayatpenyakit",
                            "title": "Riwayat Penyakit",
                            "width": "300px"
                        },
                        {
                            "field": "riwayatpengobatan",
                            "title": "Riwayat Pengobatan",
                            "width": "300px"
                        }
                    ]
                }
                medifirstService.get("emr/get-riwayat?nocm=" + $scope.item.noMr
                    , true).then(function (dat) {
                        let array = dat.data.data;
                        $scope.sourceRiwayatPengobatan = new kendo.data.DataSource({
                            data: array
                        });
                    })
                if (data == true) {
                    $scope.isRiwayatPengobatan = true
                    $scope.isRiwayatAnam = false
                }
                else {
                    $scope.isRiwayatAnam = false
                    $scope.isRiwayatPengobatan = false
                }


            }
            // emd riwayat poengobaytan
            // end riwayatpenuakit


            // PEMERIKSAAN UMUM
            $scope.pemriksaan = {};
            function loadPemeriksaan() {
                medifirstService.get("emr/get-pemeriksaanumum?noregistrasifk=" + norec_apd
                    // + "&jenisinput=" + "Pemeriksaan Umum"
                    , true).then(function (dat) {
                        let array = dat.data.data;

                        $scope.sourceFisikUmum = new kendo.data.DataSource({
                            data: array
                        });
                    })
            }
            loadPemeriksaan()
            $scope.tambahFisik = function () {
                if ($scope.pemriksaan.pemeriksaanUmum == undefined) {
                    toastr.error('pemeriksaanUmum masih kosong')
                    return
                }

                var jsonSave = {
                    norec: $scope.pemriksaan.norec !== undefined ? $scope.pemriksaan.norec : '',
                    noregistrasifk: norec_apd,
                    pemeriksaanumum: $scope.pemriksaan.pemeriksaanUmum,
                    // keterangantambahan: null,
                    ruanganfk: $scope.item.idRuangan,
                    pegawaifk: $scope.dataLogin.id,
                    jenisinput: 'Pemeriksaan Umum',
                }
                medifirstService.post( 'emr/post-pemeriksaanumum/save',jsonSave).then(function (e) {
                    loadPemeriksaan()
                    $scope.pemriksaan = {}
                    medifirstService.postLogging('Pengkajian Medis', 'Norec pemeriksaanumum_t', e.data.norec, 'Pengkajian Medis - Pemeriksaan Umum dengan No Registrasi ' + $scope.item.noregistrasi).then(function (res) {
                    })
                });
            };

            $scope.klikFisikUmum = function (data) {
                $scope.pemriksaan.pemeriksaanUmum = data.pemeriksaanumum
                $scope.pemriksaan.norec = data.norec
            }
            $scope.hapusFisik = function () {
                if ($scope.dataFisikUmum == undefined) {
                    toastr.error('Pilih data yg mau di hapus')
                    return
                }
                var jsonSave = {
                    norec: $scope.dataFisikUmum.norec,
                    // jenisinput: $scope.dataFisikUmum.jenisinput
                }
                medifirstService.post( 'emr/post-pemeriksaanumum/delete',jsonSave).then(function (e) {
                    loadPemeriksaan()
                    $scope.pemriksaan = {}
                });
            }

            //  RIWAYAT PEMERIKSAAN UMUM
            var timeoutPromise;
            $scope.$watch('pemriksaan.cariPemeriksaan', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter3("pemeriksaanumum", newVal)
                    }
                })
            });

            function applyFilter3(filterField, filterValue) {
                var dataGrid = $("#idRiwayatPemeriksaan").data("kendoGrid");
                var currFilterObject = dataGrid.dataSource.filter();
                var currentFilters = currFilterObject ? currFilterObject.filters : [];

                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field === filterField)
                            currentFilters.splice(i, 1);
                        break;
                    }
                }

                if (filterValue.id) {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue
                    });
                } else {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    });
                }

                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
            };

            $scope.riwayatFisik = function (data) {
                $scope.gridRiwayatPemeriksaan = {
                    pageable: true,
                    columns: [
                        {
                            "field": "noregistrasi",
                            "title": "No Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglregistrasi",
                            "title": "Tgl Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglinput",
                            "title": "Tgl / Jam",
                            "width": "100px"
                        }, {
                            "field": "namalengkap",
                            "title": "Petugas",
                            "width": "150px"
                        }, {
                            "field": "namaruangan",
                            "title": "Ruangan",
                            "width": "150px"
                        }, {
                            "field": "pemeriksaanumum",
                            "title": "Pemeriksaan Umum",
                            "width": "300px"
                        },

                    ]
                }
                medifirstService.get("emr/get-pemeriksaanumum?nocm=" + $scope.item.noMr
                    , true).then(function (dat) {
                        let array = dat.data.data;
                        $scope.sourceRiwayatPemeriksaan = new kendo.data.DataSource({
                            data: array
                        });
                    })
                if (data == true) {
                    $scope.isRiwayatFisik = true
                }
                else {
                    $scope.isRiwayatFisik = false
                }
            }
            // emd RIWAYAT PEMERIKSAAN UMUM
            // END PEMERIKSAAN UMUM


            // RENCANA
            $scope.rencana = {};
            function loadRencana() {
                medifirstService.get("emr/get-rencana?noregistrasifk=" + norec_apd
                    // + "&jenisinput=" + "Rencana"
                    , true).then(function (dat) {
                        let array = dat.data.data;

                        $scope.sourceRencana = new kendo.data.DataSource({
                            data: array
                        });
                    })
            }
            loadRencana()
            $scope.tambahRencana = function () {
                if ($scope.rencana.rencana == undefined) {
                    toastr.error('rencana masih kosong')
                    return
                }

                var jsonSave = {
                    norec: $scope.rencana.norec !== undefined ? $scope.rencana.norec : '',
                    noregistrasifk: norec_apd,
                    rencana: $scope.rencana.rencana,
                    // keterangantambahan: null,
                    ruanganfk: $scope.item.idRuangan,
                    pegawaifk: $scope.dataLogin.id,
                    jenisinput: 'Rencana',
                }
                medifirstService.post('emr/post-rencana/save',jsonSave).then(function (e) {
                    loadRencana()
                    $scope.rencana = {}
                    medifirstService.postLogging('Pengkajian Medis', 'Norec rencana_t', e.data.norec, 'Pengkajian Medis - Rencana dengan No Registrasi ' + $scope.item.noregistrasi).then(function (res) {
                    })
                });
            };

            $scope.klikRencana = function (data) {
                $scope.rencana.rencana = data.rencana
                $scope.rencana.norec = data.norec
            }
            $scope.hapusRencana = function () {
                if ($scope.dataRencana == undefined) {
                    toastr.error('Pilih data yg mau di hapus')
                    return
                }
                var jsonSave = {
                    norec: $scope.dataRencana.norec,
                    jenisinput: $scope.dataRencana.jenisinput
                }
                medifirstService.post( 'emr/post-rencana/delete',jsonSave).then(function (e) {
                    loadRencana()
                    $scope.rencana = {}
                });
            }

            //  RIWAYAT RENCANA
            var timeoutPromise;
            $scope.$watch('rencana.cariRencana', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter4("rencana", newVal)
                    }
                })
            });

            function applyFilter4(filterField, filterValue) {
                var dataGrid = $("#idRiwayatRencana").data("kendoGrid");
                var currFilterObject = dataGrid.dataSource.filter();
                var currentFilters = currFilterObject ? currFilterObject.filters : [];

                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field === filterField)
                            currentFilters.splice(i, 1);
                        break;
                    }
                }

                if (filterValue.id) {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue
                    });
                } else {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    });
                }

                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
            };

            $scope.riwayatRencana = function (data) {
                $scope.gridRiwayatRencana = {
                    pageable: true,
                    columns: [
                        {
                            "field": "noregistrasi",
                            "title": "No Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglregistrasi",
                            "title": "Tgl Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglinput",
                            "title": "Tgl / Jam",
                            "width": "100px"
                        }, {
                            "field": "namalengkap",
                            "title": "Petugas",
                            "width": "150px"
                        }, {
                            "field": "namaruangan",
                            "title": "Ruangan",
                            "width": "150px"
                        }, {
                            "field": "rencana",
                            "title": "Rencana",
                            "width": "300px"
                        },

                    ]
                }
                medifirstService.get("emr/get-rencana?nocm=" + $scope.item.noMr
                    , true).then(function (dat) {
                        let array = dat.data.data;
                        $scope.sourceRiwayatRencana = new kendo.data.DataSource({
                            data: array
                        });
                    })
                if (data == true) {
                    $scope.isRiwayatRencana = true
                }
                else {
                    $scope.isRiwayatRencana = false
                }
            }
            // emd RIWAYAT RencanaM
            // END RENCANA


            // EDUKASI
            $scope.edukasi = {};
            function loadEdukasi() {
                medifirstService.get("emr/get-edukasi?noregistrasifk=" + norec_apd
                    // + "&jenisinput=" + "Edukasi"
                    , true).then(function (dat) {
                        let array = dat.data.data;

                        $scope.sourceEdukasi = new kendo.data.DataSource({
                            data: array
                        });
                    })
            }
            loadEdukasi()
            $scope.tambahEdukasi = function () {
                if ($scope.edukasi.edukasi == undefined) {
                    toastr.error('edukasi masih kosong')
                    return
                }

                var jsonSave = {
                    norec: $scope.edukasi.norec !== undefined ? $scope.edukasi.norec : '',
                    noregistrasifk: norec_apd,
                    edukasi: $scope.edukasi.edukasi,
                    // keterangantambahan: null,
                    ruanganfk: $scope.item.idRuangan,
                    pegawaifk: $scope.dataLogin.id,
                    // jenisinput: 'Edukasi',
                }
                medifirstService.post( 'emr/post-edukasi/save',jsonSave).then(function (e) {
                    loadEdukasi()
                    $scope.edukasi = {}
                    medifirstService.postLogging('Pengkajian Medis', 'Norec edukasi_t', e.data.norec, 'Pengkajian Medis - Edukasi dengan No Registrasi ' + $scope.item.noregistrasi).then(function (res) {
                    })
                });
            };

            $scope.klikEdukasi = function (data) {
                $scope.edukasi.edukasi = data.edukasi
                $scope.edukasi.norec = data.norec
            }
            $scope.hapusEdukasi = function () {
                if ($scope.dataEdukasi == undefined) {
                    toastr.error('Pilih data yg mau di hapus')
                    return
                }
                var jsonSave = {
                    norec: $scope.dataEdukasi.norec,
                    jenisinput: $scope.dataEdukasi.jenisinput
                }
                medifirstService.post( 'emr/post-edukasi/delete',jsonSave).then(function (e) {
                    loadEdukasi()
                    $scope.edukasi = {}
                });
            }
            //  RIWAYAT Edukasi
            var timeoutPromise;
            $scope.$watch('edukasi.cariEdukasi', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter5("edukasi", newVal)
                    }
                })
            });

            function applyFilter5(filterField, filterValue) {
                var dataGrid = $("#idRiwayatEdukasi").data("kendoGrid");
                var currFilterObject = dataGrid.dataSource.filter();
                var currentFilters = currFilterObject ? currFilterObject.filters : [];

                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field === filterField)
                            currentFilters.splice(i, 1);
                        break;
                    }
                }

                if (filterValue.id) {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue
                    });
                } else {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    });
                }

                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
            };

            $scope.riwayatEdukasi = function (data) {
                $scope.gridRiwayatEdukasi = {
                    pageable: true,
                    columns: [
                        {
                            "field": "noregistrasi",
                            "title": "No Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglregistrasi",
                            "title": "Tgl Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglinput",
                            "title": "Tgl / Jam",
                            "width": "100px"
                        }, {
                            "field": "namalengkap",
                            "title": "Petugas",
                            "width": "150px"
                        }, {
                            "field": "namaruangan",
                            "title": "Ruangan",
                            "width": "150px"
                        }, {
                            "field": "edukasi",
                            "title": "Edukasi",
                            "width": "300px"
                        },

                    ]
                }
                medifirstService.get("emr/get-edukasi?nocm=" + $scope.item.noMr
                    , true).then(function (dat) {
                        let array = dat.data.data;
                        $scope.sourceRiwayatEdukasi = new kendo.data.DataSource({
                            data: array
                        });
                    })
                if (data == true) {
                    $scope.isRiwayatEdu = true
                }
                else {
                    $scope.isRiwayatEdu = false
                }
            }
            // emd RIWAYAT EDUKASI
            // END EDUKASI

            $scope.batal = function () {
                $scope.edukasi = {}
                $scope.rencana = {}
                $scope.pemriksaan = {}
                $scope.riwayat = {}
                $scope.anamnesis = {}
            }

            // PERJANJIAN
            $scope.gridPerjanjian = {
                pageable: true,
                columns: [
                    {
                        "field": "noperjanjian",
                        "title": "No Perjanjian",
                        "width": "100px"
                    },
                    {
                        "field": "tglperjanjian",
                        "title": "Tgl Perjanjian",
                        "width": "100px"
                    },
                    {
                        "field": "namaruangan",
                        "title": "Poliklinik",
                        "width": "150px"
                    }, {
                        "field": "namalengkap",
                        "title": "Dokter",
                        "width": "150px"
                    }, {
                        "field": "keterangan",
                        "title": "Keterangan",
                        "width": "200px"
                    }

                ]
            }
            $scope.perjanjian = {};
            function loadPerjanjian() {
                $scope.perjanjian.tglPerjanjian = new Date();
                medifirstService.get("emr/get-combo").then(function (dat) {
                    $scope.listRuangan = dat.data.ruanganrajal
                    $scope.listDokter = dat.data.dokter
                })
                medifirstService.get("emr/get-perjanjian?nocm=" + $scope.item.noMr).then(function (dat) {
                    let array = dat.data.data;
                    $scope.sourcePerjanjian = new kendo.data.DataSource({
                        data: array
                    });
                })
            }
            loadPerjanjian()
            $scope.tambahPerjanjian = function () {
                if ($scope.perjanjian.ruangan == undefined) {
                    toastr.error('Ruangan masih kosong')
                    return
                }
                if ($scope.perjanjian.dokter == undefined) {
                    toastr.error('Dokter masih kosong')
                    return
                }

                var jsonSave = {
                    norec: $scope.perjanjian.norec !== undefined ? $scope.perjanjian.norec : '',
                    nocm: $scope.item.noMr,
                    objectdokterfk: $scope.perjanjian.dokter.id,
                    tglperjanjian: moment($scope.perjanjian.tglPerjanjian).format('YYYY-MM-DD HH:mm'),
                    jumlahkujungan: null,
                    keterangan: $scope.perjanjian.keteranganLainnya !== undefined ? $scope.perjanjian.keteranganLainnya : '-',
                    objectruanganfk: $scope.perjanjian.ruangan.id,
                }
                medifirstService.post('emr/post-perjanjian/save',jsonSave).then(function (e) {
                    loadPerjanjian()
                    $scope.perjanjian = {}
                    medifirstService.postLogging('Pengkajian Medis', 'Norec pasienperjanjian_t', e.data.norec, 'Pengkajian Medis - Perjanjian dengan No Registrasi ' + $scope.item.noregistrasi).then(function (res) {
                    })
                });
            };

            $scope.klikPerjanjian = function (data) {
                $scope.perjanjian.ruangan = { id: data.objectruanganfk, namaruangan: data.namaruangan }
                $scope.perjanjian.dokter = { id: data.objectdokterfk, namalengkap: data.namalengkap }
                $scope.perjanjian.tglPerjanjian = data.tglperjanjian
                $scope.perjanjian.norec = data.norec
                $scope.perjanjian.keteranganLainnya = data.keterangan
                LoadIsiPengkajian();
            }
            $scope.hapusPerjanjian = function () {
                if ($scope.dataPerjanjian == undefined) {
                    toastr.error('Pilih data yg mau di hapus')
                    return
                }
                var jsonSave = {
                    norec: $scope.dataPerjanjian.norec,
                }
                medifirstService.post( 'emr/post-perjanjian/delete',jsonSave).then(function (e) {
                    loadPerjanjian()
                    $scope.perjanjian = {}
                });
            }
            // END PERJANJIAN           

            // function LoadHeaderCetak(){
            //     $scope.labelNoRm = " : " + $scope.item.noMr;
            //     $scope.labelNamaPasien = "     : " + $scope.item.namaPasien                
            //     $scope.labelNoRegistrasi = ": " + $scope.item.noregistrasi;
            //     $scope.labelRuangan = " : " + $scope.item.namaRuangan;   
            //     $scope.labelTglLahir =  " : " + $scope.item.tglLahir;             

            //     $scope.labelTglMasuk =  moment($scope.item.tglRegistrasi).format('DD-MM-YYYY');
            //     $scope.labelWktuPemeriksaan = "-";
            //     $scope.labelNamaDokter =  "-"; 

            //     LoadIsiPengkajian();
            //     LoadSkriningUmum();
            //     LoadIsiPengkajianKlinik(); 
            //     LoadPerencanaanPulang();           
            // }

            function LoadPerencanaanPulang() {
                medifirstService.get("emr/get-data-riwayat-pengkajiankeperawatan?Norec_apd=" + norec_apd).then(function (dat) {
                    var datas = dat.data.data;
                    var StatSatu = '';
                    var StatDua = '';
                    var StatTiga = '';
                    var StatEmpat = '';
                    var StatLima = '';
                    var StatEnam = '';
                    var StatTujuh = '';
                    var KetSatu = '';
                    var KetDua = '';
                    var KetTiga = '';
                    var KetEmpat = '';
                    var KetLima = '';
                    var KetEnam = '';
                    var KetTujuh = '';

                    for (var i = datas.length - 1; i >= 0; i--) {
                        if (datas[i].objectfk == "PPP-000001") {
                            if (datas[i].nilai == 1) {
                                StatSatu = "Ya"
                            } else {
                                StatSatu = "Tidak"
                            }
                        }

                        if (datas[i].objectfk == "PPP-000002") {
                            KetSatu = datas[i].nilai;
                        }

                        if (datas[i].objectfk == "PPP-000003") {
                            if (datas[i].nilai == 1) {
                                StatDua = "Ya"
                            } else {
                                StatDua = "Tidak"
                            }
                        }

                        if (datas[i].objectfk == "PPP-000004") {
                            KetDua = datas[i].nilai;
                        }

                        if (datas[i].objectfk == "PPP-000005") {
                            if (datas[i].nilai == 1) {
                                StatTiga = "Ya"
                            } else {
                                StatTiga = "Tidak"
                            }
                        }

                        if (datas[i].objectfk == "PPP-000006") {
                            KetTiga = datas[i].nilai;
                        }

                        if (datas[i].objectfk == "PPP-000007") {
                            if (datas[i].nilai == 1) {
                                StatEmpat = "Ya"
                            } else {
                                StatEmpat = "Tidak"
                            }
                        }

                        if (datas[i].objectfk == "PPP-000008") {
                            KetEmpat = datas[i].nilai;
                        }

                        if (datas[i].objectfk == "PPP-000009") {
                            if (datas[i].nilai == 1) {
                                StatLima = "Ya"
                            } else {
                                StatLima = "Tidak"
                            }
                        }

                        if (datas[i].objectfk == "PPP-000010") {
                            KetLima = datas[i].nilai;
                        }

                        if (datas[i].objectfk == "PPP-000011") {
                            if (datas[i].nilai == 1) {
                                StatEnam = "Ya"
                            } else {
                                StatEnam = "Tidak"
                            }
                        }

                        if (datas[i].objectfk == "PPP-000012") {
                            KetEnam = datas[i].nilai;
                        }

                        if (datas[i].objectfk == "PPP-000013") {
                            if (datas[i].nilai == 1) {
                                StatTujuh = "Ya"
                            } else {
                                StatTujuh = "Tidak"
                            }
                        }

                        if (datas[i].objectfk == "PPP-000014") {
                            KetTujuh = datas[i].nilai;
                        }
                    }

                    $scope.lblStatSatu = StatSatu;
                    $scope.lblStatDua = StatDua;
                    $scope.lblStatTiga = StatTiga;
                    $scope.lblStatEmpat = StatEmpat;
                    $scope.lblStatLima = StatLima;
                    $scope.lblStatEnam = StatEnam;
                    $scope.lblStatTujuh = StatTujuh;

                    $scope.lblKetSatu = KetSatu;
                    $scope.lblKetDua = KetDua;
                    $scope.lblKetTiga = KetTiga;
                    $scope.lblKetEmpat = KetEmpat;
                    $scope.lblKetLima = KetLima;
                    $scope.lblKetEnam = KetEnam;
                    $scope.lblKetTujuh = KetTujuh;
                })
            }

            function LoadSkriningUmum() {
                medifirstService.get("emr/get-data-riwayat-pengkajiankeperawatan?Norec_apd=" + norec_apd).then(function (dat) {
                    var datas = dat.data.data;
                    var keluhanUtama = '';
                    var suHu = '';
                    var naDi = '';
                    var perNapasan = '';
                    var tekananDarah = '';
                    var statusAlergi = '';
                    var ketAlergi = '';
                    var statRJ = '';
                    var RJRajalSatu = '';
                    var RJRajalDua = '';
                    var lblRjSatu = '';
                    var lblRjDua = null;
                    var lblRjTiga = '';
                    var lblRjEmpat = null;
                    var lblRjLima = '';
                    var lblRjEnam = null;
                    var lblRjTujuh = '';
                    var lblRjDelapan = null;
                    var lblRjSembilan = '';
                    var lblRjSepuluh = null;
                    var lblRjSebelas = '';
                    var lblRjDuaSebelas = null;
                    var altBantu = '';
                    var proThesa = '';
                    var cacatTubuh = '';
                    var aHari = '';
                    var eduHambatan = '';
                    var EduHb1 = '';
                    var EduHb2 = '';
                    var EduHb3 = '';
                    var EduHb4 = '';
                    var EduHb5 = '';
                    var EduHb6 = '';
                    var EduHb7 = '';
                    var EduHb8 = '';
                    var EduD1 = '';
                    var EduD2 = '';
                    var EduD3 = '';
                    var EduD4 = '';
                    var EduD5 = '';
                    var EduD6 = '';
                    var EduD7 = '';
                    var EduD8 = '';
                    var EduD9 = '';
                    var EduD10 = '';
                    var EduD11 = '';
                    var EduD12 = '';
                    var ketEdu = '';

                    for (var i = datas.length - 1; i >= 0; i--) {

                        if (datas[i].objectfk == "KLU-000001") {
                            keluhanUtama = datas[i].nilai;
                        }

                        if (datas[i].objectfk == "TVI-000001") {
                            suHu = ':' + datas[i].nilai + ' ' + datas[i].satuan;
                        }

                        if (datas[i].objectfk == "TVI-000002") {
                            naDi = ':' + datas[i].nilai + ' ' + datas[i].satuan;
                        }

                        if (datas[i].objectfk == "TVI-000003") {
                            perNapasan = ':' + datas[i].nilai + ' ' + datas[i].satuan;
                        }

                        if (datas[i].objectfk == "TVI-000004") {
                            tekananDarah = ':' + datas[i].nilai + ' ' + datas[i].satuan;
                        }

                        if (datas[i].objectfk == "ALG-000001") {
                            if (datas[i].nilai == 2) {
                                statusAlergi = "Ya"
                            } else {
                                statusAlergi = "Tidak"
                            }
                        }

                        if (datas[i].objectfk == "ALG-000002") {
                            ketAlergi = datas[i].nilai;
                        }

                        if (datas[i].objectfk == "RSJ-000001") {
                            if (datas[i].nilai == 1) {
                                statRJ = "Resiko jatuh rendah"
                            } else {
                                statRJ = "Resiko jatuh tinggi"
                            }
                        }

                        if (datas[i].objectfk == "RSJ-000002") {
                            if (datas[i].nilai == 1) {
                                RJRajalSatu = "Ya";
                            } else {
                                RJRajalSatu = "Tidak";
                            }
                        }

                        if (datas[i].objectfk == "RSJ-000003") {
                            if (datas[i].nilai == 1) {
                                RJRajalDua = "Ya"
                            } else {
                                RJRajalDua = "Tidak"
                            }
                        }

                        if (datas[i].objectfk == "RSJ-000011") {
                            if (datas[i].nilai == 1) {
                                lblRjSatu = "Ya";
                                lblRjDua = 25;
                            } else {
                                lblRjSatu = "Tidak";
                                lblRjDua = 0;
                            }
                        }

                        if (datas[i].objectfk == "RSJ-000012") {
                            if (datas[i].nilai == 1) {
                                lblRjTiga = "Ya";
                                lblRjEmpat = 25;
                            } else {
                                lblRjTiga = "Tidak";
                                lblRjEmpat = 0;
                            }
                        }

                        if (datas[i].objectfk == "RSJ-000013") {
                            if (datas[i].nilai == 1) {
                                lblRjLima = "Bed Rest/Kursi Roda/Tidak Ada";
                                lblRjEnam = 0;
                            } else if (datas[i].nilai == 2) {
                                lblRjLima = "Penopang tongkat/walker";
                                lblRjEnam = 15;
                            } else {
                                lblRjLima = "Furnitur";
                                lblRjEnam = 30;
                            }
                        }

                        if (datas[i].objectfk == "RSJ-000014") {
                            if (datas[i].nilai == 1) {
                                lblRjTujuh = "Ya";
                                lblRjDelapan = 25;
                            } else {
                                lblRjTujuh = "Tidak";
                                lblRjDelapan = 0;
                            }
                        }

                        if (datas[i].objectfk == "RSJ-000015") {
                            if (datas[i].nilai == 1) {
                                lblRjSembilan = "Normal/bed rest/imobilisasi";
                                lblRjSepuluh = 0;
                            } else if (datas[i].nilai == 2) {
                                lblRjSembilan = "Lemah";
                                lblRjSepuluh = 15;
                            } else {
                                lblRjSembilan = "Terganggu";
                                lblRjSepuluh = 30;
                            }
                        }

                        if (datas[i].objectfk == "RSJ-000016") {
                            if (datas[i].nilai == 1) {
                                lblRjSebelas = "Orientasi sesuai kemampuan";
                                lblRjDuaSebelas = 0;
                            } else {
                                lblRjSebelas = "Lupa keterbatasan diri";
                                lblRjDuaSebelas = 15;
                            }
                        }

                        if (datas[i].objectfk == "SFS-000001") {
                            altBantu = datas[i].nilai;
                        }

                        if (datas[i].objectfk == "SFS-000002") {
                            proThesa = datas[i].nilai;
                        }

                        if (datas[i].objectfk == "SFS-000003") {
                            cacatTubuh = datas[i].nilai;
                        }

                        if (datas[i].objectfk == "SFS-000004") {
                            if (datas[i].nilai == 1) {
                                aHari = "Mandiri";
                            } else {
                                aHari = "Dibantu";
                            }
                        }

                        if (datas[i].objectfk == "EDU-000001") {
                            EduHb1 = " - Tidak Ada";
                        }

                        if (datas[i].objectfk == "EDU-000002") {
                            EduHb2 = " - Pengelihatan";
                        }

                        if (datas[i].objectfk == "EDU-000003") {
                            EduHb3 = " - Budaya/Kepercayaan";
                        }

                        if (datas[i].objectfk == "EDU-000004") {
                            EduHb4 = " - Bahasa";
                        }

                        if (datas[i].objectfk == "EDU-000005") {
                            EduHb5 = " - Pengelihatan";
                        }

                        if (datas[i].objectfk == "EDU-000006") {
                            EduHb6 = " - Kognitif";
                        }

                        if (datas[i].objectfk == "EDU-000007") {
                            EduHb7 = " - Emosi";
                        }

                        if (datas[i].objectfk == "EDU-000008") {
                            EduHb8 = " - Lain-Lain";
                        }

                        if (datas[i].objectfk == "EDU-000009") {
                            EduD1 = " - Stimulasi Tumbuh Kembang";
                        }

                        if (datas[i].objectfk == "EDU-000010") {
                            EduD2 = " - Perawatan Luka";
                        }

                        if (datas[i].objectfk == "EDU-000011") {
                            EduD3 = " - Manajemen Nyeri";
                        }

                        if (datas[i].objectfk == "EDU-000012") {
                            EduD4 = " - Rehabilitasi";
                        }

                        if (datas[i].objectfk == "EDU-000013") {
                            EduD5 = " - Nutrisi";
                        }

                        if (datas[i].objectfk == "EDU-000014") {
                            EduD6 = " - Perawatan Stoma";
                        }

                        if (datas[i].objectfk == "EDU-000015") {
                            EduD7 = " - Medikasi";
                        }

                        if (datas[i].objectfk == "EDU-000016") {
                            EduD8 = " - Jaminan Finansial";
                        }

                        if (datas[i].objectfk == "EDU-000017") {
                            EduD9 = " - Cara menyusui yang benar";
                        }

                        if (datas[i].objectfk == "EDU-000018") {
                            EduD10 = " - Perawatan tali pusat";
                        }

                        if (datas[i].objectfk == "EDU-000019") {
                            EduD11 = " - Pencegah Infeksi";
                        }

                        if (datas[i].objectfk == "EDU-000020") {
                            EduD12 = " - Lain-Lain";
                        }

                        if (datas[i].objectfk == "EDU-000021") {
                            ketEdu = datas[i].nilai;
                        }
                    }

                    $scope.labelKeluhanUtama = keluhanUtama;
                    $scope.labelSuhu = suHu;
                    $scope.labelNadi = naDi;
                    $scope.labelNafas = perNapasan;
                    $scope.labelTD = tekananDarah;
                    $scope.labelKetAlergi = "Keterangan  : " + ketAlergi;
                    $scope.labelStatAlergi = "Statu Alergi : " + statusAlergi;
                    $scope.labelResikoJatuh = "Resiko Jatuh : " + statRJ;
                    $scope.labelRJRajalSatu = "Apakah pernah jatuh dalam 3 bulan terakhir : " + RJRajalSatu;
                    $scope.labelRJRajalDua = "Apakah menggunakan alat bantu (tongkat, kursi roda, dll) : " + RJRajalDua;
                    $scope.LabelRjSatuT = lblRjSatu;
                    $scope.LabelRjTigaT = lblRjTiga;
                    $scope.LabelRLimaT = lblRjLima;
                    $scope.LabelRTujuhT = lblRjTujuh;
                    $scope.LabelRSembilanT = lblRjSembilan;
                    $scope.LabelRSebelasT = lblRjSebelas;
                    $scope.LabelRjDuaT = lblRjDua;
                    $scope.LabelRjEmpatT = lblRjEmpat;
                    $scope.LabelREnamT = lblRjEnam;
                    $scope.LabelRDelapanT = lblRjDelapan;
                    $scope.LabelRSepuluhT = lblRjSepuluh;
                    $scope.LabelRDuabelasT = lblRjDuaSebelas;
                    $scope.LabelRJTotalSkor = lblRjDua + lblRjEmpat + lblRjEnam + lblRjDelapan + lblRjSepuluh + lblRjDuaSebelas;

                    $scope.lblAlatBantu = "Alat Bantu : " + altBantu;
                    $scope.lblProthesa = "Prothesa : " + proThesa;
                    $scope.lblCacatTubuh = "Cacat Tubuh : " + cacatTubuh;
                    $scope.lblAHari = "Aktifitas Sehari-hari : " + aHari;

                    $scope.lblEduHb1 = EduHb1;
                    $scope.lblEduHb2 = EduHb2;
                    $scope.lblEduHb3 = EduHb3;
                    $scope.lblEduHb4 = EduHb4;
                    $scope.lblEduHb5 = EduHb5;
                    $scope.lblEduHb6 = EduHb6;
                    $scope.lblEduHb7 = EduHb7;
                    $scope.lblEduHb8 = EduHb8;
                    $scope.lblEduD1 = EduD1;
                    $scope.lblEduD2 = EduD2;
                    $scope.lblEduD3 = EduD3;
                    $scope.lblEduD4 = EduD4;
                    $scope.lblEduD5 = EduD5;
                    $scope.lblEduD6 = EduD6;
                    $scope.lblEduD7 = EduD7;
                    $scope.lblEduD8 = EduD8;
                    $scope.lblEduD9 = EduD9;
                    $scope.lblEduD10 = EduD10;
                    $scope.lblEduD11 = EduD11;
                    $scope.lblEduD12 = EduD12 + ' : ' + ketEdu;
                });
            }


            function LoadIsiPengkajianKlinik() {
                $scope.klinikKulit = false;
                $scope.klinikMata = false;
                $scope.klinikTHT = false;
                if ($scope.item.namaRuangan == "Poli Kulit dan Kelamin"
                    || $scope.item.namaRuangan == "Poli Kulit dan Kelamin Eksekutif") {
                    $scope.klinikKulit = true;
                    $scope.klinikMata = false;
                    $scope.klinikTHT = false;
                    medifirstService.get("emr/get-data-riwayat-pengkajiankeperawatan?Norec_apd=" + norec_apd).then(function (dat) {
                        var datas = dat.data.data;
                        var lblJerawat = '';
                        var lblGatal = '';
                        var lblkelainan = '';
                        var lblKetKul = '';
                        $scope.lblJudulKulit = "4. Klinik Kulit";
                        for (var i = datas.length - 1; i >= 0; i--) {

                            if (datas[i].objectfk == "KLN-000001") {
                                if (datas[i].nilai == 1) {
                                    lblJerawat = "Ya";
                                } else {
                                    lblJerawat = "Tidak";
                                }
                            }

                            if (datas[i].objectfk == "KLN-000002") {
                                if (datas[i].nilai == 1) {
                                    lblGatal = "Ya";
                                } else {
                                    lblGatal = "Tidak";
                                }
                            }

                            if (datas[i].objectfk == "KLN-000003") {
                                if (datas[i].nilai == 1) {
                                    lblkelainan = "Ya";
                                } else {
                                    lblkelainan = "Tidak";
                                }
                            }

                            if (datas[i].objectfk == "KLN-000025") {
                                lblKetKul = datas[i].nilai;
                            }
                        }

                        $scope.lblKlSatu = "Jerawat : " + lblJerawat;
                        $scope.lblKlDua = "Gatal-gatal : " + lblGatal;
                        $scope.lblKlTiga = "Kelainan Kulit : " + lblkelainan;
                        $scope.lblKlKet = "Keterangan : " + lblKetKul;
                    });
                }

                if ($scope.item.namaRuangan == "Poli Mata"
                    || $scope.item.namaRuangan == "Poli Mata Eksekutif") {
                    $scope.klinikMata = true;
                    $scope.klinikTHT = false;
                    $scope.klinikKulit = false;
                    $scope.lblJudulMata = "4. Klinik Mata";
                    medifirstService.get("emr/get-data-riwayat-pengkajiankeperawatan?Norec_apd=" + norec_apd).then(function (dat) {
                        var datas = dat.data.data;
                        var lblMataSatu = '';
                        var lblMataDua = '';
                        var lblMataTiga = '';
                        var lblMataEmpat = '';
                        var lblMataKet = '';
                        for (var i = datas.length - 1; i >= 0; i--) {

                            if (datas[i].objectfk == "KLN-000004") {
                                if (datas[i].nilai == 1) {
                                    lblMataSatu = "Ya";
                                } else {
                                    lblMataSatu = "Tidak";
                                }
                            }

                            if (datas[i].objectfk == "KLN-000005") {
                                if (datas[i].nilai == 1) {
                                    lblMataDua = "Ya";
                                } else {
                                    lblMataDua = "Tidak";
                                }
                            }

                            if (datas[i].objectfk == "KLN-000006") {
                                if (datas[i].nilai == 1) {
                                    lblMataTiga = "Ya";
                                } else {
                                    lblMataTiga = "Tidak";
                                }
                            }

                            if (datas[i].objectfk == "KLN-000007") {
                                if (datas[i].nilai == 1) {
                                    lblMataEmpat = "Ya";
                                } else {
                                    lblMataEmpat = "Tidak";
                                }
                            }

                            if (datas[i].objectfk == "KLN-000026") {
                                lblMataKet = datas[i].nilai;
                            }
                        }

                        $scope.lblMataSatu = "Mata Merah : " + lblMataSatu;
                        $scope.lblMataDua = "Banyak Kotoran Mata : " + lblMataDua;
                        $scope.lblMataTiga = "Penglihatan Jelas : " + lblMataTiga;
                        $scope.lblMataEmpat = "Kelainan Bentuk : " + lblMataEmpat;
                        $scope.lblMataKet = "Keterangan : " + lblMataKet;

                    });
                }

                if ($scope.item.namaRuangan == "Poli THT"
                    || $scope.item.namaRuangan == "Poli THT Eksekutif") {
                    $scope.klinikTHT = true;
                    $scope.klinikMata = false;
                    $scope.klinikTHT = false;
                    $scope.lblJudulTHT = "4. Klinik THT";
                    medifirstService.get("emr/get-data-riwayat-pengkajiankeperawatan?Norec_apd=" + norec_apd).then(function (dat) {
                        var datas = dat.data.data;
                        var lblTHTSatu = '';
                        var lblTHTDua = '';
                        var lblTHTTiga = '';
                        var lblTHTEmpat = '';
                        var lblTHTLima = '';
                        var lblTHTEnam = '';
                        var lblTHTKet = '';
                        for (var i = datas.length - 1; i >= 0; i--) {

                            if (datas[i].objectfk == "KLN-000019") {
                                if (datas[i].nilai == 1) {
                                    lblTHTSatu = "Ya";
                                } else {
                                    lblTHTSatu = "Tidak";
                                }
                            }

                            if (datas[i].objectfk == "KLN-000020") {
                                if (datas[i].nilai == 1) {
                                    lblTHTDua = "Ya";
                                } else {
                                    lblTHTDua = "Tidak";
                                }
                            }

                            if (datas[i].objectfk == "KLN-000021") {
                                if (datas[i].nilai == 1) {
                                    lblTHTTiga = "Ya";
                                } else {
                                    lblTHTTiga = "Tidak";
                                }
                            }

                            if (datas[i].objectfk == "KLN-000022") {
                                if (datas[i].nilai == 1) {
                                    lblTHTEmpat = "Ya";
                                } else {
                                    lblTHTEmpat = "Tidak";
                                }
                            }

                            if (datas[i].objectfk == "KLN-000023") {
                                if (datas[i].nilai == 1) {
                                    lblTHTLima = "Ya";
                                } else {
                                    lblTHTLima = "Tidak";
                                }
                            }

                            if (datas[i].objectfk == "KLN-000024") {
                                if (datas[i].nilai == 1) {
                                    lblMataEmpat = "Ya";
                                } else {
                                    lblMataEmpat = "Tidak";
                                }
                            }

                            if (datas[i].objectfk == "KLN-000029") {
                                lblKetKul = datas[i].nilai;
                            }
                        }

                        $scope.lblTHTSatu = "Mimisan : " + lblTHTSatu;
                        $scope.lblTHTDua = "Gangguan Menelan : " + lblMataDua;
                        $scope.lblTHTTiga = "Nyeri Pada Telinga : " + lblTHTTiga;
                        $scope.lblTHTEmpat = "Masalah Pendengaran : " + lblTHTEmpat;
                        $scope.lblTHTLima = "Telinga keluar cairan/nanah : " + lblTHTLima;
                        $scope.lblTHTEnam = "Benda asing di telinga/hidung/tenggorokan : " + lblTHTEnam;
                        $scope.lblTHTKet = "Keterangan : " + lblTHTKet;

                    });
                }
            }

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.columnRiwayatRegistrasi = {
                toolbar: [
                    "excel",

                ],
                excel: {
                    fileName: "DaftarRiwayatRegistrasi.xlsx",
                    allPages: true,
                },
                excelExport: function (e) {
                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 2;
                    sheet.mergedCells = ["A1:K1"];
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
                        "template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
                    },
                    {
                        "field": "noregistrasi",
                        "title": "No Registrasi",
                        "width": "90px"
                    },
                    {
                        "field": "namaruangan",
                        "title": "Ruanganan Layanan",
                        "width": "150px",
                        "template": "<span class='style-left'>#: namaruangan #</span>"
                    },
                    {
                        "field": "namadokter",
                        "title": "Nama Dokter",
                        "width": "150px",
                        "template": "<span class='style-left'>#: namadokter #</span>"
                    },
                    {
                        "field": "tglpulang",
                        "title": "Tgl Pulang",
                        "width": "80px",
                        "template": "<span class='style-left'>{{formatTanggal('#: tglpulang #')}}</span>"
                    },
                    {
                        "field": "lamarawat",
                        "title": "Lama Dirawat",
                        "width": "80px"
                        // "template": "<span class='style-left'>{{formatTanggal('#: tglpulang #')}}</span>"
                    }
                ]
            };

            function RiwayatRegistrasi() {
                if ($scope.item.noMr == undefined) {
                    messageContainer.error("Pilih data dulu!")
                }
                $scope.itemD.noRM = $scope.item.noMr;
                $scope.itemD.namaPasien = $scope.item.namaPasien;
                $scope.itemD.tglLahir = moment($scope.item.tglLahir).format('YYYY-MM-DD');
                loadDataRiwayat();
                $scope.popUpRiwayatRegistrasi.center().open();
                var actions = $scope.popUpRiwayatRegistrasi.options.actions;
                actions.splice(actions.indexOf("Close"), 1);
                $scope.popUpRiwayatRegistrasi.setOptions({ actions: actions });
            }

            // $scope.RiwayatRegistrasi = function(){     
            //    if ($scope.dataPasienSelected == undefined) {
            //        messageContainer.error("Pilih data dulu!")
            //    }
            //    $scope.itemD.noRM = $scope.dataPasienSelected.nocm;
            //    $scope.itemD.namaPasien = $scope.dataPasienSelected.namapasien;
            //    $scope.itemD.tglLahir = moment($scope.dataPasienSelected.tgllahir).format('YYYY-MM-DD');
            //    loadDataRiwayat();
            //    $scope.popUpRiwayatRegistrasi.center().open();
            //    var actions = $scope.popUpRiwayatRegistrasi.options.actions; 
            //    actions.splice(actions.indexOf("Close"), 1); 
            //    $scope.popUpRiwayatRegistrasi.setOptions({ actions : actions });
            // }

            $scope.TutupPopUp = function () {
                $scope.itemD.noRM = undefined;
                $scope.itemD.namaPasien = undefined;
                $scope.itemD.tglLahir = undefined;
                $scope.itemD.noRegistrasi = undefined;
                $scope.itemD.JumlahRawat = undefined;
                $scope.dataRiwayatRegistrasi = new kendo.data.DataSource({
                    data: []
                });
                $scope.popUpRiwayatRegistrasi.close();
            }

            function loadDataRiwayat() {
                $scope.isRouteLoading = true;
                var rm = ""
                if ($scope.itemD.noRM != undefined) {
                    rm = "&norm=" + $scope.itemD.noRM
                }

                var pasien = ""
                if ($scope.itemD.namaPasien != undefined) {
                    pasien = "&namaPasien=" + $scope.itemD.namaPasien
                }

                // var tglLahirs =""
                // if ($scope.itemD.tglLahir != undefined){
                //      tglLahirs ="tglLahir=" + moment($scope.itemD.tglLahir).format('YYYY-MM-DD HH:mm:ss');
                // }

                var noReg = ""
                if ($scope.itemD.noRegistrasi != undefined) {
                    noReg = "&noReg=" + $scope.itemD.noRegistrasi;
                }

                modelItemAkuntansi.getDataTableTransaksi("registrasipasien/daftar-riwayat-registrasi?" + rm + noReg + pasien)
                    .then(function (data) {
                        $scope.isRouteLoading = false;
                        var jumlahRawat = 0;
                        var dRiwayatReg = data.daftar;
                        for (var i = 0; i < dRiwayatReg.length; i++) {
                            dRiwayatReg[i].no = i + 1
                            if (dRiwayatReg[i].statusinap == 1) {
                                jumlahRawat = jumlahRawat + 1;
                                if (dRiwayatReg[i].tglpulang != undefined) {
                                    var umur = dateHelper.CountAge(new Date(dRiwayatReg[i].tglregistrasi), new Date(dRiwayatReg[i].tglpulang));
                                    var bln = umur.month,
                                        thn = umur.year,
                                        day = umur.day
                                    dRiwayatReg[i].lamarawat = day + " Hari";
                                } else {
                                    var umur = DateHelper.CountAge(new Date(dRiwayatReg[i].tglregistrasi), new Date($scope.now));
                                    var bln = umur.month,
                                        thn = umur.year,
                                        day = umur.day
                                    dRiwayatReg[i].lamarawat = day + " Hari";
                                }
                            }
                        }
                        $scope.itemD.JumlahRawat = jumlahRawat;
                        $scope.dataRiwayatRegistrasi = new kendo.data.DataSource({
                            data: dRiwayatReg,
                            pageSize: 10,
                            total: dRiwayatReg.length,
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

            $scope.SearchEnterDetail = function () {
                loadDataRiwayat();
            }

            function LoadIsiPengkajian() {
                // emr/get-data-pengkajian-medis-pasien
                medifirstService.get("emr/get-data-pengkajian-medis-pasien?noReg=" + $scope.item.noregistrasi).then(function (dat) {
                    var datas = dat.data.data[0];
                    $scope.labelAnamnesis = datas.anamnesis;
                    $scope.labelRiwayatPenyakit = datas.riwayatpenyakit;
                    $scope.labelRiwayatPengobatan = datas.riwayatpengobatan;
                    $scope.labelPemeriksaanFisik = datas.pemeriksaanumum;
                    $scope.labelRencana = datas.rencana;
                    $scope.labelEdukasi = datas.edukasi;

                    $scope.labelTglPerjanjian = " : " + moment(datas.tglperjanjian).format('DD-MM-YYYY');
                    $scope.labelPoliklinik = " : " + datas.ruangankontrol
                    $scope.labelNamaDokter = " : " + datas.namadokter;
                    $scope.labelKeterangan = " : " + datas.keterangan;

                    $scope.lblS = datas.s;
                    $scope.lblO = datas.o;
                    $scope.lblA = datas.a;
                    $scope.lblP = datas.p;

                })
            }

            $scope.klikGrid = function () {
                // LoadHeaderCetak();                        
                if ($scope.dataPasienSelected != undefined) {
                    $scope.labelNoRm = " : " + $scope.dataPasienSelected.nocm;
                    $scope.labelNamaPasien = "     : " + $scope.dataPasienSelected.namapasien
                    $scope.labelNoRegistrasi = ": " + $scope.dataPasienSelected.noregistrasi;
                    $scope.labelRuangan = " : " + $scope.dataPasienSelected.namaruangan;
                    $scope.labelTglLahir = " : " + $scope.dataPasienSelected.tgllahir;

                    $scope.labelTglMasuk = moment($scope.dataPasienSelected.tglregistrasi).format('DD-MM-YYYY');
                    $scope.labelWktuPemeriksaan = "-";
                    $scope.labelNamaDokter = "-";

                    LoadIsiPengkajian();
                    LoadSkriningUmum();
                    LoadIsiPengkajianKlinik();
                    LoadPerencanaanPulang();
                } else {
                    messageContainer.error("Pilih data dulu!")
                }
            }

            $scope.cetakLaporan = function () {
                // CetakSok();
                RiwayatRegistrasi();
            }

            function CetakSok() {

                let printContents, popupWin;
                printContents = document.getElementById('diaglog').innerHTML;
                popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
                popupWin.document.open();
                popupWin.document.write(`
                    <html>                           
                        <body onload="window.print();window.close()">${printContents}</body>
                     </html>
                     `
                );
            }

            $scope.printEmr = function () {
                CetakSok();
            }
            /////////////////////////////////////////////
        }

    ]);
});