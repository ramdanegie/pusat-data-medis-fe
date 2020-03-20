define(['initialize', 'Configuration'], function (initialize, configuration) {
    'use strict';
    initialize.controller('RekamMedisCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'MedifirstService', '$timeout','CacheHelper',
        function ($rootScope, $scope, $state, dateHelper, medifirstService, $timeout,cacheHelper) {
            $scope.now = new Date();

            $scope.header = {};
            $scope.item = {};

            $scope.checkNoregis = '';
            $scope.checkNoregis = true
            var dataTindakan = []
            var dataObat = []
            var dataEMR = []
            var NoNik = '';
            var Status = '';            

            function LoadCache() {                
                var chacePeriode = cacheHelper.get('CacheRiwayatPasien');
                if (chacePeriode != undefined) {
                    NoNik = chacePeriode[0];
                    Status = chacePeriode[1];
                    $scope.item.nik = NoNik;                
                    $scope.loadEMRTRans()
                    var chacePeriode = {
                        0: '',
                        1: '',
                        2: '',
                        3: '',
                        4: '',
                        5: '',
                        6: ''
                    }
                    cacheHelper.set('CacheRiwayatPasien', undefined);
                } 
            }

            $scope.isLoadingNav = false
            // cacheHelper.set('cacheRekamMedis', undefined);
            $scope.getRekamMedisCheck = function (checkNoregis) {
                $rootScope.getRekamMedisCheck(checkNoregis);
            }

            $scope.showNav = function () {
                $rootScope.isShowNavEMR = !$rootScope.isShowNavEMR
            }
            var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

            var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu'];
            $scope.loadEMRTRans = function () {
                if ($scope.item.nik == undefined && $scope.item.nik == '') return
                $scope.loading = true
                dataTindakan = []
                dataObat = []
                dataEMR = []
                medifirstService.get('get-medical-record?nik=' + $scope.item.nik).then(function (e) {
                    if (e.data.pasien) {
                        var result = e.data.pasien
                        toastr.success('Success')

                        result.umur = dateHelper.CountAge(new Date(result.tgllahir), new Date());
                        var bln = result.umur.month,
                            thn = result.umur.year,
                            day = result.umur.day

                        var date = new Date(result.tgllahir)
                        var day = date.getDate();
                        var month = date.getMonth();
                        var thisDay = date.getDay(), thisDay = myDays[thisDay];

                        var yy = date.getYear();

                        var year = (yy < 1000) ? yy + 1900 : yy;

                        result.umur = thn + 'thn ' + bln + 'bln ' + day + 'hr '
                        result.tgllahir = thisDay + ', ' + day + ' ' + months[month] + ' ' + year
                        $scope.header = result
                        $scope.header.image = "../app/images/avatar2.png"
                        dataTindakan = []
                        dataObat = []
                        dataEMR = []
                        if (e.data.medicalrecord.length > 0) {
                            for (let i = 0; i < e.data.medicalrecord.length; i++) {
                                const element = e.data.medicalrecord[i];
                                if (element.namaemr == 'PELAYANAN TINDAKAN') {
                                    dataTindakan.push(element)
                                }
                                else if (element.namaemr == 'PELAYANAN OBAT') {
                                    dataObat.push(element)
                                } else {
                                    dataEMR.push(element)
                                }
                            }
                            $scope.gridTindakan = new kendo.data.DataSource({
                                data: dataTindakan,
                                group: $scope.group,
                                pageSize: 10,
                                total: dataTindakan.length,
                                serverPaging: false,
                                schema: {
                                    model: {
                                        fields: {
                                        }
                                    }
                                }
                            });
                            $scope.gridObat = new kendo.data.DataSource({
                                data: dataObat,
                                group: $scope.group,
                                pageSize: 10,
                                total: dataTindakan.length,
                                serverPaging: false,
                                schema: {
                                    model: {
                                        fields: {
                                        }
                                    }
                                }
                            });
                            $scope.gridEMR = new kendo.data.DataSource({
                                data: dataEMR,
                                group: $scope.group,
                                pageSize: 10,
                                total: dataTindakan.length,
                                serverPaging: false,
                                schema: {
                                    model: {
                                        fields: {
                                        }
                                    }
                                }
                            });
                        } else {
                            dataTindakan = []
                            dataObat = []
                            dataEMR = []
                        }

                        $scope.loading = false
                    } else {
                        $scope.loading = false
                    }
                    init()

                })
            }
            LoadCache();
            function init() {
                $scope.isRouteLoading = true

                // medifirstService.get("emr/get-emr-transaksi?nocm=" + $scope.item.noMr + "&jenisEmr=asesmen", true).then(function (dat) {
                medifirstService.get("get-emr-transaksi-detail-form?nik=" + $scope.item.nik, true).then(function (dat) {
                    $scope.isRouteLoading = false
                    for (var i = dat.data.data.length - 1; i >= 0; i--) {
                
                        if (dat.data.data[i].details.length ==0) {
                            dat.data.data.splice([i], 1)
                        }
                    }
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
                medifirstService.get("get-menu-rekam-medis-dynamic?namaemr=asesmen").then(function (e) {
                    // var deptInap=[16,35,17]
                    // var deptId = localStorage.getItem('departemenPengkajian');
                    // var strKode =''
                    // if(deptInap.includes(parseInt(deptId)) == true){
                    //     strKode = 'hiddenRanap'
                    // }else
                    //     strKode = 'hiddenRajal'
                    var dataTree = e.data.data
                    // for (var i = dataTree.length - 1; i >= 0; i--) {
                    //     if (dataTree[i].kodeexternal == strKode && dataTree[i].kodeexternal != null) {
                    //         dataTree.splice([i], 1)
                    //     }
                    // }
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

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }
            $scope.klikGrid = function (dataSelected) {
                $scope.dataSelected = dataSelected
            }
            $scope.Lihat = function () {
                if ($scope.dataSelected == undefined) {
                    toastr.error('Pilih data dulu')
                    return
                }
                cacheHelper.set('cacheNomorEMR', undefined);
                $scope.showRiwayatEMR = true
                $scope.myVar = 4
                var noemr2 = '-'
                if ($scope.dataSelected != undefined) {
                    noemr2 = $scope.dataSelected.noemr
                }
                // $state.go("RekamMedis.AsesmenMedisDetail", {
                //     namaEMR: 113,
                //     nomorEMR: noemr2
                // });
                $state.go("RekamMedis.VitalSign");

                var arrStr = {
                    0: noemr2,
                    1: $scope.dataSelected.norec
                }
                cacheHelper.set('cacheNomorEMR', arrStr);
                cacheHelper.set('cacheNOREC_EMR', arrStr);
            }
            $rootScope.showRiwayat = function () {
                $scope.showRiwayatEMR = false
            }
            $scope.asupKaForm = function (noemr, reportdisplay, emrfk, norec) {
                // var json = JSON.parse(selec)
                cacheHelper.set('cacheNomorEMR', undefined);
                // emrfk
                $scope.showRiwayatEMR = true
                $scope.myVar = 4
                var noemr2 = '-'
                if (noemr != undefined) {
                    noemr2 = noemr
                }
                if (noemr2 != '-')
                    noemr2.trim()
                var url = "RekamMedis.AsesmenMedisDetail"
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
                    $state.go("RekamMedis.AsesmenMedisDetail", {
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
            $scope.columnDaftar = {
                selectable: 'row',
                pageable: true,
                // dataBound: function() {
                //     this.expandRow(this.tbody.find("tr.k-master-row"));
                // },
                columns:
                    [
                        {
                            "field": "namaprofile",
                            "title": "Faskes",
                            "width": "30%",
                        },
                        {
                            "field": "tglregistrasi",
                            "title": "Tgl Registrasi",
                            "width": "30%",
                            "template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
                        },
                        {
                            "field": "noregistrasi",
                            "title": "No Registrasi",
                            "width": "30%",
                        },
                        {
                            "field": "dpjp",
                            "title": "DPJP",
                            "width": "35%",
                        },
                        {
                            "field": "tgltransaksi",
                            "title": "Tgl EMR",
                            "width": "25%",
                            "template": "<span class='style-left'>{{formatTanggal('#: tgltransaksi #')}}</span>"
                        },
                        {
                            "field": "norm",
                            "title": "No RM",
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
                                + "'#=details[i].emrfk#','#=details[i].norec#')\" > <span class=\"k-sprite k-icon k-i-search\">Details</span></em> </span> #}#",

                            // "template": "# for(var i=0; i < details.length;i++){# <button class=\"k-button custom-button\" style=\"margin:0 0 5px\"  ng-click=\"asupKaForm('#=details[i].emrpasienfk#','#=details[i].reportdisplay#','#=details[i].emrfk#','#=details[i].norec#')\" >#= details[i].namaform #</button> #}#",
                        }

                    ]
                }
            };
            $scope.group = {
                field: "namaprofile",
                aggregates: [

                    {
                        field: "namaprofile",
                        aggregate: "count"
                    }]
            };
            $scope.aggregate = [
                {
                    field: "namaprofile",
                    aggregate: "count"
                }]
            $scope.header.image = "../app/images/avatar2.png"
            var timeoutPromise;
            $scope.$watch('item.namapelayanan', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter("deskripsi", newVal, "#grid1")
                    }
                }, 500)
            })
            $scope.$watch('item.namapelayanan2', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter("deskripsi", newVal, "#grid2")
                    }
                }, 500)
            })
            $scope.$watch('item.namapelayanan3', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter("deskripsi", newVal, "#grid3")
                    }
                }, 500)
            })
            $scope.$watch('item.faskes', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter("namaprofile", newVal, "#grid1")
                    }
                }, 500)
            })
            $scope.$watch('item.faskes2', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter("namaprofile", newVal, "#grid2")
                    }
                }, 500)
            })
            $scope.$watch('item.faskes3', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter("namaprofile", newVal, "#grid3")
                    }
                }, 500)
            })
            $scope.$watch('item.jenis', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter("namaemr", newVal, "#grid3")
                    }
                }, 500)
            })
            function applyFilter(filterField, filterValue, idgrid) {
                var dataGrid = $(idgrid).data("kendoGrid");
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
            $scope.resetFilter = function (grid) {
                var dataGrid = $(grid).data("kendoGrid");
                dataGrid.dataSource.filter({});
                $scope.item = {};
            }
            $scope.mainGridOptions = {
                scrollable: true,
                // toolbar: ["search"],
                // dataBound: onDataBound,
                columns: [
                    // {
                    //     "field": "namaprofile",
                    //     "title": "RS / Klinik",
                    //     "width": "100px",
                    //     aggregates: ["count"],
                    //     groupHeaderTemplate: "RS / Klinik #= value # (Jumlah: #= count#)"
                    // },
                    {
                        "field": "noregistrasi",
                        "title": "No Registrasi",
                        "width": "90px",
                    },
                    {
                        "field": "tglregistrasi",
                        "title": "Tgl Registrasi",
                        "template": "#= new moment(new Date(tglregistrasi)).format('DD-MM-YYYY') #",
                        "width": "80px"
                    },
                    {
                        "field": "norm",
                        "title": "No Rekam Medis",
                        "width": "80px"
                    },
                    {
                        "field": "ruangan",
                        "title": "Poli / Ruang",
                        "width": "120px"
                    },
                    {
                        "field": "tgltransaksi",
                        "title": "Tgl Pelayanan",
                        "template": "#= new moment(new Date(tgltransaksi)).format('DD-MM-YYYY') #",
                        "width": "80px"
                    },
                    {
                        "title": "Nama Pelayanan",
                        "field": "deskripsi",
                        "width": "140px"
                    },
                    {
                        "field": "jumlah",
                        "title": "Jumlah",
                        "width": "80px"
                    },
                    {
                        "field": "dpjp",
                        "title": "Dokter",
                        "width": "100px"
                    },
                    {
                        "field": "tglpulang",
                        "title": "Tgl Pulang",
                        "template": "#= new moment(new Date(tglpulang)).format('DD-MM-YYYY') #",
                        "width": "80px"
                    },
                    {
                        hidden: true,
                        field: "namaprofile",
                        title: "Faskes",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Faskes : #= value # (Jumlah: #= count#)"
                    }
                ]
            }
            $scope.mainGridOptionsObat = {
                scrollable: true,
                // dataBound: onDataBound,
                columns: [
                    // {
                    //     "field": "namaprofile",
                    //     "title": "RS / Klinik",
                    //     "width": "100px",
                    //     aggregates: ["count"],
                    //     groupHeaderTemplate: "RS / Klinik #= value # (Jumlah: #= count#)"
                    // },
                    {
                        "field": "noregistrasi",
                        "title": "No Registrasi",
                        "width": "90px",
                    },
                    {
                        "field": "tglregistrasi",
                        "title": "Tgl Registrasi",
                        "template": "#= new moment(new Date(tglregistrasi)).format('DD-MM-YYYY') #",
                        "width": "80px"
                    },
                    {
                        "field": "norm",
                        "title": "No Rekam Medis",
                        "width": "80px"
                    },
                    {
                        "field": "ruangan",
                        "title": "Poli / Ruang",
                        "width": "120px"
                    },
                    {
                        "field": "tgltransaksi",
                        "title": "Tgl Pelayanan",
                        "template": "#= new moment(new Date(tgltransaksi)).format('DD-MM-YYYY') #",
                        "width": "80px"
                    },
                    {
                        "title": "Nama Obat",
                        "field": "deskripsi",
                        "width": "140px"
                    },
                    {
                        "field": "jumlah",
                        "title": "Jumlah",
                        "width": "80px"
                    },
                    {
                        "field": "satuan",
                        "title": "Satuan",
                        "width": "80px"
                    },
                    {
                        "field": "dpjp",
                        "title": "Penulis Resep",
                        "width": "100px"
                    },
                    {
                        "field": "tglpulang",
                        "title": "Tgl Pulang",
                        "template": "#= new moment(new Date(tglpulang)).format('DD-MM-YYYY') #",
                        "width": "80px"
                    },
                    {
                        hidden: true,
                        field: "namaprofile",
                        title: "Faskes",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Faskes : #= value # (Jumlah: #= count#)"
                    }
                ]
            }
            $scope.mainGridOptionsEMR = {
                scrollable: true,
                // dataBound: onDataBound,
                columns: [
                    // {
                    //     "field": "namaprofile",
                    //     "title": "RS / Klinik",
                    //     "width": "100px",
                    //     aggregates: ["count"],
                    //     groupHeaderTemplate: "RS / Klinik #= value # (Jumlah: #= count#)"
                    // },
                    {
                        "field": "noregistrasi",
                        "title": "No Registrasi",
                        "width": "90px",
                    },
                    {
                        "field": "tglregistrasi",
                        "title": "Tgl Registrasi",
                        "template": "#= new moment(new Date(tglregistrasi)).format('DD-MM-YYYY') #",
                        "width": "80px"
                    },
                    {
                        "field": "norm",
                        "title": "No Rekam Medis",
                        "width": "80px"
                    },
                    {
                        "field": "ruangan",
                        "title": "Poli / Ruang",
                        "width": "120px"
                    },
                    {
                        "field": "tgltransaksi",
                        "title": "Tgl Pelayanan",
                        "template": "#= new moment(new Date(tgltransaksi)).format('DD-MM-YYYY') #",
                        "width": "80px"
                    },
                    {
                        "title": "Jenis",
                        "field": "namaemr",
                        "width": "100px"
                    },
                    {
                        "title": "Deskripsi",
                        "field": "deskripsi",
                        "width": "140px"
                    },
                    {
                        "field": "dpjp",
                        "title": "Dokter",
                        "width": "100px"
                    },
                    {
                        "field": "tglpulang",
                        "title": "Tgl Pulang",
                        "template": "#= new moment(new Date(tglpulang)).format('DD-MM-YYYY') #",
                        "width": "80px"
                    },
                    {
                        hidden: true,
                        field: "namaprofile",
                        title: "Faskes",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Faskes : #= value # (Jumlah: #= count#)"
                    }
                ]
            }
        }
    ]);
});