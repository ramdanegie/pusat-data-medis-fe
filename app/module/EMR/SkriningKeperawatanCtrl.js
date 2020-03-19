define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('SkriningKeperawatanCtrl', ['$rootScope', '$scope', '$state', 'MedifirstService', 'CacheHelper',
        function ($rootScope, $scope, $state, medifirstService, cacheHelper) {

            // new
            $scope.title = "Psikologi";
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.noRecPap = cacheHelper.get('noRecPap');
            // $scope.nav = function(state) {
            //     $state.go(state, $state.params);
            // }
            $scope.arrIntervensi = [];
            $scope.arrImplementasi = [];
            $scope.arrEvaluasi = [];
            $scope.arrDiagnosisKep = [];
            $scope.arrDiagnosisParent = [];
            $scope.checkedDiagnosisKep = [];

            medifirstService.get("emr/get-master-diagnosa-kep").then(function (data) {
                // $scope.items = data.data;

                $scope.dataDaftarDiagnosis = new kendo.data.DataSource({
                    data: data.data.data,
                    sort: { field: "namaDiagnosaKep", dir: "asc" },
                    // autoSync: true,
                    schema: {
                        model: {
                            fields: {
                                namaDiagnosaKep: { editable: false }
                            }
                        }
                    }
                });
            })
            $scope.getHistory = function () {
                var objectfk = "KPR,EVL,IMP,INT";
                var objectfkGrid = "KPR";
                var noregistrasifk = $state.params.noRec;
                var status = "t";



                medifirstService.get("emr/get-data-rekam-medis-dp?noregistrasifk=" + noregistrasifk + '&objectfk=' + objectfk
                    + '&riwayatfk=' + $scope.noRecPap).then(function (data) {

                        if (data.data) {
                            if (data.data.length !== 0) {
                                data.data.forEach(function (items) {
                                    var result = $.grep($scope.arrDiagnosisParent, function (e) {
                                        return e.id == items.id;
                                    });
                                    if (result.length == 0) {
                                        var tmpParent = {
                                            "id": items.id,
                                            "nama": items.nama
                                        }
                                        var dataItem = {
                                            "id": items.id,
                                            "namaDiagnosaKep": items.nama,
                                            "kodeexternal": items.kodeexternal,
                                        }
                                        $scope.arrDiagnosisParent.push(tmpParent);
                                        $scope.selectedDataGrid.push(dataItem);

                                        // findPasien.getDetailDiagnosis(items.id).then(function (e) {
                                        medifirstService.get("emr/get-detail-diagnosa-kep-by-id/" + items.id).then(function (e) {
                                            e.data.forEach(function (parent) {
                                                switch (parent.header) {
                                                    case "Intervensi":
                                                        var tempArr = [];
                                                        parent.detail.forEach(function (child) {
                                                            var tmpData = {
                                                                "objectfk": child.kodeexternal,
                                                                "nilai": child.id,
                                                                "satuan": child.name,
                                                                "jenisobject": "checkbox",
                                                                "idDiagosis": items.id,
                                                                "header": parent.header,
                                                                "name": child.name,
                                                                "id": child.id
                                                            }
                                                            tempArr.push(tmpData);
                                                        })

                                                        var dataModified = {
                                                            "id": items.id,
                                                            "nama": "Intervensi " + parent.nama,
                                                            "detail": tempArr
                                                        }
                                                        $scope.arrIntervensi.push(dataModified);
                                                        break;
                                                    case "Implementasi":
                                                        var tempArr = [];
                                                        parent.detail.forEach(function (child) {
                                                            var tmpData = {
                                                                "objectfk": child.kodeexternal,
                                                                "nilai": child.id,
                                                                "satuan": child.name,
                                                                "jenisobject": "checkbox",
                                                                "idDiagosis": items.id,
                                                                "header": parent.header,
                                                                "name": child.name,
                                                                "id": child.id
                                                            }
                                                            tempArr.push(tmpData);
                                                        })
                                                        var dataModified = {
                                                            "id": items.id,
                                                            "nama": "Implementasi " + parent.nama,
                                                            "detail": tempArr
                                                        }
                                                        $scope.arrImplementasi.push(dataModified);
                                                        break;
                                                    case "Evaluasi":
                                                        var tempArr = [];
                                                        parent.detail.forEach(function (child) {
                                                            var tmpData = {
                                                                "objectfk": child.kodeexternal,
                                                                "nilai": child.id,
                                                                "satuan": child.name,
                                                                "jenisobject": "checkbox",
                                                                "idDiagosis": items.id,
                                                                "header": parent.header,
                                                                "name": child.name,
                                                                "id": child.id
                                                            }
                                                            tempArr.push(tmpData);
                                                        })
                                                        var dataModified = {
                                                            "id": items.id,
                                                            "nama": "Evaluasi " + parent.nama,
                                                            "detail": tempArr
                                                        }
                                                        $scope.arrEvaluasi.push(dataModified);
                                                        break;
                                                }
                                            })
                                        })

                                    }

                                    items.detail.forEach(function (e) {
                                        // debugger;

                                        $scope.arrDiagnosisKep.push(e);
                                        var tmpChild = {
                                            // "idDiagosis": items.id,
                                            "header": items.header,
                                            "name": e.name,
                                            "id": e.id,
                                            "objectfk": e.kodeexternal,
                                            "nilai": e.id,
                                            "satuan": e.name,
                                            "jenisobject": "checkbox",
                                            "idDiagosis": items.id,
                                            "value": true
                                            // "noRec": e.noRec
                                        }
                                        $scope.checkedDiagnosisKep.push(tmpChild);
                                    })
                                })
                            }
                        }

                        // console.log($scope.checkedDiagnosisKep)
                    })

                medifirstService.get("emr/get-data-rekam-medis?noregistrasifk=" + noregistrasifk + '&objectfk=' + objectfkGrid
                    + '&riwayatfk=' + $scope.noRecPap).then(function (e) {
                        var dataSource = [];
                        var result = e.data.data
                        var dataGrid = $scope.dataDaftarDiagnosis._data
                        if (result.length > 0) {
                            for (var i = 0; i < dataGrid.length; i++) {
                                result.forEach(function (data) {
                                    if (data.jenisobject.indexOf('tgl') > -1) {
                                        if (dataGrid[i].kodeexternal == data.objectfk && data.jenisobject == 'tgl-akhir') {
                                            dataGrid[i].tglAkhir = new Date(data.nilai)
                                        }
                                        if (dataGrid[i].kodeexternal == data.objectfk && data.jenisobject == 'tgl-awal') {
                                            dataGrid[i].tglAwal = new Date(data.nilai)
                                        }
                                    }
                                })
                            }
                        }


                        $scope.dataDaftarDiagnosis = new kendo.data.DataSource({
                            data: dataGrid,
                            sort: { field: "namaDiagnosaKep", dir: "asc" },
                            // autoSync: true,
                            schema: {
                                model: {
                                    fields: {
                                        namaDiagnosaKep: { editable: false }
                                    }
                                }
                            }
                        });
                    })
            }

            $scope.getHistory();

            $scope.opsiDiagnosis = {
                pageable: true,
                columns: [
                    { template: "<input type='checkbox' class='checkbox' ng-checked='isExistId(dataItem.id)' ng-click='onClick($event)' ng-change='cekArrDiagnosis(bool, dataItem)' ng-model='bool'/>", width: 40 },
                    { field: "id", title: "id", hidden: true },
                    { field: "tglAwal", title: "Tanggal Ditemukan", editor: dateTimeEditor, width: 200, type: "date", format: "{0:dd/MM/yyyy HH:mm:ss}" },
                    { field: "namaDiagnosaKep", title: "Diagnosis Keperawatan" },
                    { field: "tglAkhir", title: "Tanggal Teratas", editor: dateTimeEditor, width: 200, type: "date", format: "{0:dd/MM/yyyy HH:mm:ss}" }
                ],
                editable: true,
                selectable: true
            };
            $scope.selectedDataGrid = [];
            $scope.onClick = function (e) {
                var element = $(e.currentTarget);

                var checked = element.is(':checked'),
                    row = element.closest('tr'),
                    grid = $("#kGrid").data("kendoGrid"),
                    dataItem = grid.dataItem(row);


                if (checked) {
                    var result = $.grep($scope.selectedDataGrid, function (e) {
                        return e.id == dataItem.id;
                    });
                    if (result.length == 0) {
                        $scope.selectedDataGrid.push(dataItem);
                    } else {
                        for (var i = 0; i < $scope.selectedDataGrid.length; i++)
                            if ($scope.selectedDataGrid[i].id === dataItem.id) {
                                $scope.selectedDataGrid.splice(i, 1);
                                break;
                            }
                        $scope.selectedDataGrid.push(dataItem);
                    }
                    row.addClass("k-state-selected");
                } else {
                    for (var i = 0; i < $scope.selectedDataGrid.length; i++)
                        if ($scope.selectedDataGrid[i].id === dataItem.id) {
                            $scope.selectedDataGrid.splice(i, 1);
                            break;
                        }
                    row.removeClass("k-state-selected");
                }
            }
            $scope.isChecked = function (id) {
                var match = false;
                for (var i = 0; i < $scope.arrDiagnosisKep.length; i++) {
                    if ($scope.arrDiagnosisKep[i].id == id) {
                        match = true;
                    }
                }
                return match;
            };
            $scope.isExistId = function (id) {
                var match = false;
                for (var i = 0; i < $scope.arrDiagnosisParent.length; i++) {
                    if ($scope.arrDiagnosisParent[i].id == id) {
                        match = true;
                    }
                }

                return match;
            };
            $scope.cekArrDiagnosis = function (bool, item) {
                // debugger;
                if (bool) {
                    // add item separated by header name (Intervensi/Implementasi/Evaluasi)
                    medifirstService.get("emr/get-detail-diagnosa-kep-by-id/" + item.id).then(function (e) {
                        // findPasien.getDetailDiagnosis(item.id).then(function (e) {
                        e.data.forEach(function (parent) {
                            switch (parent.header) {
                                case "Intervensi":
                                    var tempArr = [];
                                    parent.detail.forEach(function (child) {
                                        var tmpData = {
                                            "objectfk": child.kodeexternal,
                                            "nilai": child.id,
                                            "satuan": child.name,
                                            "jenisobject": "checkbox",
                                            "idDiagosis": item.id,
                                            "header": parent.header,
                                            "name": child.name,
                                            "id": child.id
                                        }
                                        tempArr.push(tmpData);
                                    })

                                    var dataModified = {
                                        "id": item.id,
                                        "nama": "Intervensi " + parent.nama,
                                        "detail": tempArr
                                    }
                                    $scope.arrIntervensi.push(dataModified);
                                    break;
                                case "Implementasi":
                                    var tempArr = [];
                                    parent.detail.forEach(function (child) {
                                        var tmpData = {
                                            "objectfk": child.kodeexternal,
                                            "nilai": child.id,
                                            "satuan": child.name,
                                            "jenisobject": "checkbox",
                                            "idDiagosis": item.id,
                                            "header": parent.header,
                                            "name": child.name,
                                            "id": child.id
                                        }
                                        tempArr.push(tmpData);
                                    })
                                    var dataModified = {
                                        "id": item.id,
                                        "nama": "Implementasi " + parent.nama,
                                        "detail": tempArr
                                    }
                                    $scope.arrImplementasi.push(dataModified);
                                    break;
                                case "Evaluasi":
                                    var tempArr = [];
                                    parent.detail.forEach(function (child) {
                                        var tmpData = {
                                            "objectfk": child.kodeexternal,
                                            "nilai": child.id,
                                            "satuan": child.name,
                                            "jenisobject": "checkbox",
                                            "idDiagosis": item.id,
                                            "header": parent.header,
                                            "name": child.name,
                                            "id": child.id
                                        }
                                        tempArr.push(tmpData);
                                    })
                                    var dataModified = {
                                        "id": item.id,
                                        "nama": "Evaluasi " + parent.nama,
                                        "detail": tempArr
                                    }
                                    $scope.arrEvaluasi.push(dataModified);
                                    break;
                            }
                        })
                        // debugger;
                    })
                } else {
                    // remove item
                    $scope.arrIntervensi.forEach(function (item) {
                        for (var i = 0; i < $scope.arrIntervensi.length; i++) {
                            if ($scope.arrIntervensi[i].id == item.id) {
                                $scope.arrIntervensi.splice(i, 1);
                            }
                        }
                    })
                    $scope.arrImplementasi.forEach(function (item) {
                        for (var i = 0; i < $scope.arrImplementasi.length; i++) {
                            if ($scope.arrImplementasi[i].id == item.id) {
                                $scope.arrImplementasi.splice(i, 1);
                            }
                        }
                    })
                    $scope.arrEvaluasi.forEach(function (item) {
                        for (var i = 0; i < $scope.arrEvaluasi.length; i++) {
                            if ($scope.arrEvaluasi[i].id == item.id) {
                                $scope.arrEvaluasi.splice(i, 1);
                            }
                        }
                    })
                }
            };
            $scope.checkedDiagnosis = function (bool, item) {
                // debugger;
                if (bool) {
                    // add item
                    item.value = true;
                    if (item.detail) {
                        item.detail.forEach(function (e) {
                            $scope.checkedDiagnosisKep.push(e)
                        })
                    } else {
                        $scope.checkedDiagnosisKep.push(item);
                    }
                    console.log($scope.checkedDiagnosisKep)
                } else {
                    // remove item
                    if (item.detail) {
                        item.detail.forEach(function (e) {
                            $scope.checkedDiagnosisKep.forEach(function (data) {
                                for (var i = 0; i < $scope.checkedDiagnosisKep.length; i++) {
                                    if ($scope.checkedDiagnosisKep[i].id == e.id) {
                                        $scope.checkedDiagnosisKep.splice(i, 1);
                                    }
                                }
                            })
                        })
                    } else {
                        $scope.checkedDiagnosisKep.forEach(function (data) {
                            for (var i = 0; i < $scope.checkedDiagnosisKep.length; i++) {
                                if ($scope.checkedDiagnosisKep[i].id == item.id) {
                                    $scope.checkedDiagnosisKep.splice(i, 1);
                                }
                            }
                        })
                    }
                }
            };
            function dateTimeEditor(container, options) {
                $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="{0:dd/MM/yyyy hh:mm:ss}"/>')
                    .appendTo(container)
                    .kendoDateTimePicker({

                        // value: kendo.toString(new Date(), 'dd/MM/yyyy HH:mm:ss'),
                        close: function (e) {
                            e.preventDefault();
                        }
                    });


            }
            $scope.Save = function () {
                var data = $scope.checkedDiagnosisKep
                var grid = $scope.selectedDataGrid;
                for (var i = 0; i < grid.length; i++) {
                    var nomor = 1;
                    nomor = nomor + i;

                    data.push({
                        objectfk: grid[i].kodeexternal,//"KPR-" + nomor + "00564",
                        nilai: grid[i].tglAwal != undefined ? moment(grid[i].tglAwal).format('YYYY-MM-DD HH:mm:ss') : undefined,
                        satuan: grid[i].tglAwal != undefined ? moment(grid[i].tglAwal).format('YYYY-MM-DD HH:mm:ss') : undefined,
                        jenisobject: "tgl-awal"
                    })
                    data.push({
                        objectfk: grid[i].kodeexternal,// "KPR-" + nomor + "00565",
                        nilai: grid[i].id,
                        satuan: grid[i].namaDiagnosaKep,
                        jenisobject: "grid-text"
                    })
                    data.push({
                        objectfk: grid[i].kodeexternal,//"KPR-" + nomor + "00565",
                        nilai: grid[i].tglAkhir != undefined ? moment(grid[i].tglAkhir).format('YYYY-MM-DD HH:mm:ss') : undefined,
                        satuan: grid[i].tglAkhir != undefined ? moment(grid[i].tglAkhir).format('YYYY-MM-DD HH:mm:ss') : undefined,
                        jenisobject: "tgl-akhir"
                    })

                }

                for (var i = data.length - 1; i >= 0; i--) {
                    if (data[i].norec == undefined) {
                        data[i].norec = '-'
                    }
                    if (data[i].nilai == undefined) {
                        data.splice([i], 1)
                    }
                }
                console.log(data)
                var jsonSave = {
                    data: data,
                    noregistrasifk: $state.params.noRec,
                    riwayatpapfk: $scope.noRecPap,
                    form: 'masalahkeperawatan',
                    kodeexternal: 'masalahkeperawatan'
                }
                medifirstService.post('emr/save-data-rekam-medis',jsonSave).then(function (e) {
                    medifirstService.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa', $state.params.noRec, 'Riwayat Persalinan dan Nifas').then(function (res) {
                    })
                });
            }


        }
    ]);
});