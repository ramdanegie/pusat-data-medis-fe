define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('KonsultasiDokterCtrl', ['$q', '$scope', '$state', 'MedifirstService', '$timeout', 'CacheHelper',
        function ($q, $scope, $state, medifirstService, $timeout, cacheHelper) {
            $scope.isRouteLoading = false;
            $scope.now = new Date()
            $scope.item = {
                tglresume: $scope.now
            } // set defined object
            $scope.filter = {}
            $scope.pegawaiLogin = JSON.parse(localStorage.getItem('pegawai'))
            var cookie = document.cookie.split(';')
            var kelompokUser = cookie[0].split('=')
            var getCache = cacheHelper.get('cacheRekamMedis')
            if (getCache != undefined) {
                $scope.nocm = getCache[0]
                $scope.norecPd = getCache[8]
                $scope.item.ruanganAsal = { id: getCache[11], namaruangan: getCache[12] }

            }
            $scope.resumeOpt = {
                toolbar: [{
                    name: "create", text: "Input Baru",
                    template: '<button ng-click="inputBaru()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah Konsul</button>'
                },],
                pageable: true,
                scrollable: true,
                columns: [
                    // { field: "rowNumber", title: "#", width: 40, width: 40, attributes: { style: "text-align:right; padding-right: 15px;"}, hideMe: true},
                    { field: "no", title: "No", width: 40 },
                    { field: "tglorder", title: "Tanggal", width: 120 },
                    { field: "ruanganasal", title: "Ruangan Asal", width: 120 },
                    { field: "ruangantujuan", title: "Ruangan Tujuan", width: 150 },
                    { field: "namalengkap", title: "Dokter", width: 120 },
                    { field: "keteranganorder", title: "Keterangan", width: 120 },
                    { field: "keteranganlainnya", title: "Jawaban", width: 200 },
                    { command: [
                        { imageClass: "k-icon k-delete", text: "Hapus", click: hapus }, 
                    { name: "edit", text: "Edit", click: editData },
                    { imageClass: "k-icon k-edit", text: "Jawab", click: jawab },], title: "&nbsp;", width: 200 }
                ],
            };
            $scope.inputBaru = function () {
                if (kelompokUser[1] == 'dokter') {
                    $scope.item.namadokter = { id: $scope.pegawaiLogin.id, namalengkap: $scope.pegawaiLogin.namaLengkap }
                }
                clear()
                $scope.popUp.center().open()
            }
            $scope.batal = function () {
                $scope.popUp.close()
            }
            init();

            function hapus(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (!dataItem) {
                    toastr.error("Data Tidak Ditemukan");
                    return
                }
                var itemDelete = {
                    "norec": dataItem.norec
                }

                medifirstService.post( 'emr/disabled-konsultasi',itemDelete).then(function (e) {
                    if (e.status == 201) {
                        init()
                    }
                })

            }
            function jawab(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.item.norec = dataItem.norec
                $scope.item.ruanganAsalJawab = dataItem.ruanganasal
                $scope.item.ruanganTujuanJawab =  dataItem.ruangantujuan
                $scope.item.dokterJawab  =dataItem.namalengkap 
                $scope.item.keteranganJawab  = dataItem.keteranganorder
                if(dataItem.keteranganlainnya != null)
                $scope.item.jawaban  = dataItem.keteranganlainnya
                $scope.popUpJawab.center().open()
                

            }
            $scope.SaveJawab = function(){
                if ($scope.item.jawaban == undefined) {
                    toastr.error("Jawaban Belum di isi!")
                    return
                }
             
                var objSave = {
                    norec_so: $scope.item.norec,
                    jawaban : $scope.item.jawaban
                }
                medifirstService.post( 'emr/update-jawaban-konsultasi',objSave).then(function (e) {
                    clear()
                    init();
                    $scope.popUpJawab.close()
                    
                });
            }
            function editData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (!dataItem) {
                    toastr.error("Data Tidak Ditemukan");
                    return
                }
                var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                var dateNow = new Date();
                var dateOrder = new Date(dataItem.tglorder);
                var diffDays = Math.round(Math.abs((dateNow.getTime() - dateOrder.getTime()) / (oneDay)))
                if (diffDays >= 1) {
                    toastr.warning('data tidak bisa di edit')
                    return
                }
                $scope.item.norec = dataItem.norec
                $scope.item.ruanganAsal = { id: dataItem.objectruanganfk, namaruangan: dataItem.ruanganasal }
                $scope.item.ruanganTujuan = { id: dataItem.objectruangantujuanfk, namaruangan: dataItem.ruangantujuan }
                $scope.item.dokter = { id: dataItem.pegawaifk, namalengkap: dataItem.namalengkap }
                $scope.item.keterangan = dataItem.keteranganorder
                $scope.popUp.center().open()

            }
            function init() {
                $scope.isRouteLoading = true;
                 medifirstService.get( "emr/get-combo").then(function (e) {
                    $scope.listDokter = e.data.dokter
                    $scope.listRuangan = e.data.ruangkonsulnonpenunjang; //e.data.ruangankonsul
                })

                $q.all([
                     medifirstService.get( "emr/get-order-konsul?norecpd=" + $scope.norecPd)
                ]).then(function (res) {
                    if (res[0].statResponse) {
                        var result = res[0].data.data
                        if (result.length > 0) {
                            for (let index = 0; index < result.length; index++) {
                                result[index].no = index + 1
                            }
                        }

                        $scope.sourceResume = new kendo.data.DataSource({
                            data: result,
                            pageSize: 20,
                        });
                    }

                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                    throw error;
                })


            };


            $scope.Save = function (data) {
                if ($scope.item.ruanganTujuan == undefined) {
                    toastr.error("Pilih Ruangan Tujuan terlebih dahulu!")
                    return
                }
                if ($scope.item.dokter == undefined) {
                    toastr.error("Pilih Dokter terlebih dahulu!")
                    return
                }
                var objSave = {
                    norec_so: $scope.item.norec != undefined ? $scope.item.norec : '',
                    norec_pd: $scope.norecPd,
                    pegawaifk: $scope.item.dokter.id,
                    objectruanganasalfk: $scope.item.ruanganAsal.id,
                    objectruangantujuanfk: $scope.item.ruanganTujuan.id,
                    keterangan: $scope.item.keterangan != undefined ? $scope.item.keterangan : '',
                }
                medifirstService.post( 'emr/post-konsultasi',objSave).then(function (e) {
                    clear()
                    init();
                    medifirstService.postLogging('Konsultasi', 'Norec strukorder_t', e.data.strukorder.norec, 'Menu Dokter').then(function (res) {
                    })
                });
            };
            function clear() {
                delete $scope.item.norec
                delete $scope.item.ruanganTujuan
                delete $scope.item.keterangan
                delete $scope.item.dokter
                delete $scope.item.jawaban
            }
            function categoryDropDownEditor(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField: "jenisJabatan",
                        dataValueField: "id",
                        dataSource: $scope.listJenisJabatan
                    });
            }
            var timeoutPromise;
            $scope.$watch('filter.ruanganAsal', function (newVal, oldVal) {
                if (newVal != oldVal) {
                    applyFilter("objectruanganfk", newVal)
                }
            })
            $scope.$watch('filter.ruanganTujuan', function (newVal, oldVal) {
                if (newVal != oldVal) {
                    applyFilter("objectruangantujuanfk", newVal)
                }
            })
            $scope.$watch('filter.dokter', function (newVal, oldVal) {
                if (newVal != oldVal) {
                    applyFilter("pegawaifk", newVal)
                }
            })

            $scope.$watch('filter.keterangan', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal != oldVal) {
                        applyFilter("keteranganorder", newVal)
                    }
                }, 500)
            })

            function applyFilter(filterField, filterValue) {
                var dataGrid = $("#gridResume").data("kendoGrid");
                var currFilterObject = dataGrid.dataSource.filter();
                var currentFilters = currFilterObject ? currFilterObject.filters : [];

                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field == filterField) {
                            currentFilters.splice(i, 1);
                            break;
                        }
                    }
                }

                if (filterValue.id) {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue.id
                    });
                } else {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    })
                }

                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
            }
            $scope.resetFilter = function () {
                var dataGrid = $("#gridResume").data("kendoGrid");
                dataGrid.dataSource.filter({});
                $scope.filter = {}
            }

            $scope.cetak = function () {
                if (confirm('View Resume? ')) {
                    var stt = 'true';
                } else {
                    var stt = 'false'
                }
                // Do nothing!
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/rekammedis?cetak-resume-rj=' + $scope.nocm
                    + '&view=' + stt
                    , function (response) {
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
        }
    ]);
});