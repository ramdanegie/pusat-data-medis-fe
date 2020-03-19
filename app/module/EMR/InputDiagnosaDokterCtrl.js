define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('InputDiagnosaDokterCtrl', ['$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService','$rootScope',
        function ($scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService,$rootScope) {

            $scope.item = {};
            // $scope.chk = {};
            $scope.now = new Date();
            $scope.dataVOloaded = true
            $scope.findBy = "1"
            var norec_apd = ''
            var norec_pd = ''
            var nocm_str = ''
            var detail = ''
            $scope.showTombol = false
            $scope.item.kasusbaru = true
            $scope.item.kasuslama = false

            LoadCache();
            function LoadCache() {
                LoadCombo();
                var chacePeriode = cacheHelper.get('CacheInputDiagnosaDokter');
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
                    $scope.item.isNoRegis = chacePeriode[13]
                    if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                        $scope.showTombol = true
                    }
                }
            }



            function LoadCombo() {
                $scope.isLoadingDiagnosis = true;
                medifirstService.getPart("emr/get-combo-icd9", true, true, 10).then(function (data) {
                    $scope.listDiagnosaTindakan = data;
                });
                medifirstService.getPart("emr/get-combo-icd10", true, true, 10).then(function (data) {
                    $scope.listDiagnosa = data;
                });
                medifirstService.get('emr/get-combo-diagnosis').then(function (data) {
                    $scope.listJenisDiagnosa = data.data.jenisdiagnosa;
                });

                //   ModelItem.getDataDummyGeneric("JenisDiagnosa", true, true, 10).then(function (data) {
                //     $scope.listJenisDiagnosa = data;
                // });

                // ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                //     $scope.listDiagnosa = data;
                // });

            }

            $scope.klikIcd9 = function (dataIcd9Selected) {
                $scope.item.diagnosaTindakan = {
                    id: dataIcd9Selected.id,
                    namaDiagnosaTindakan: dataIcd9Selected.namadiagnosatindakan,
                    kodeNama: dataIcd9Selected.kddiagnosatindakan + ' - ' +  dataIcd9Selected.namadiagnosatindakan,
                    kdDiagnosaTindakan: dataIcd9Selected.kddiagnosatindakan
                }
                $scope.item.ketTindakan = dataIcd9Selected.keterangantindakan
                $scope.findBy = "1";
            }
            $scope.klikIcd10 = function (dataIcd10Selected) {
                $scope.item.jenisDiagnosis = {
                    id: dataIcd10Selected.objectjenisdiagnosafk,
                    jenisDiagnosa: dataIcd10Selected.jenisdiagnosa
                }

                $scope.item.diagnosa = {
                    id: dataIcd10Selected.id,
                    namaDiagnosa: dataIcd10Selected.namadiagnosa,
                    kdDiagnosa: dataIcd10Selected.kddiagnosa,
                    kodeNama: dataIcd10Selected.kddiagnosa + ' - ' +dataIcd10Selected.namadiagnosa    
                }
                $scope.item.keterangan = dataIcd10Selected.keterangan
                if (dataIcd10Selected.iskasusbaru == '1') {
                    $scope.item.kasusbaru = true
                    $scope.item.kasuslama = false
                } else {
                    $scope.item.kasusbaru = false
                    $scope.item.kasuslama = true
                }
                // if (dataIcd10Selected.iskasuslama = '1') {
                //     $scope.item.kasuslama = true
                //     $scope.item.kasusbaru = false
                // }else{
                //     $scope.item.kasuslama = false
                //     $scope.item.kasusbaru = true
                // }

                $scope.findBy = "1";
            }
            $scope.checkboxClicked = function (dat) {
                if ($scope.item.kasusbaru == true) {
                    $scope.item.kasusbaru = true
                    $scope.item.kasuslama = false
                } else {
                    $scope.item.kasusbaru = false
                    $scope.item.kasuslama = true
                }
            }

            $scope.checkboxClicked2 = function (dat) {
                if ($scope.item.kasuslama == false) {
                    $scope.item.kasusbaru = true
                    $scope.item.kasuslama = false
                } else {
                    $scope.item.kasusbaru = false
                    $scope.item.kasuslama = true
                }
            }
            $rootScope.getRekamMedisCheck = function (bool) {
                if (bool) {
                    $scope.isRouteLoading = true;
                    var param = "noReg=" + $scope.item.noregistrasi;
                    medifirstService.get("emr/get-diagnosapasienbynoregicd9?"
                    + param
                        ).then(function (data) {
                            $scope.isRouteLoading = false;
                            var dataICD9 = data.data.datas;
                            $scope.dataSourceDiagnosaIcd9 = new kendo.data.DataSource({
                                data: dataICD9,
                                pageSize: 10
                            });
                        });

                        medifirstService.get("emr/get-diagnosapasienbynoreg?"
                            + param
                        ).then(function (data) {
                            // $scope.isRouteLoading = false;
                            var dataICD10 = data.data.datas;
                            $scope.dataSourceDiagnosaIcd10 = new kendo.data.DataSource({
                                data: dataICD10,
                                pageSize: 10
                            });
                        });
                }
                else {
                    $scope.isRouteLoading = true;
                    var param = "noCm=" + $scope.item.noMr;
                    medifirstService.get("emr/get-diagnosapasienbynoregicd9?"
                    + param
                        ).then(function (data) {
                            $scope.isRouteLoading = false;
                            var dataICD9 = data.data.datas;
                            $scope.dataSourceDiagnosaIcd9 = new kendo.data.DataSource({
                                data: dataICD9,
                                pageSize: 10
                            });
                        });

                        medifirstService.get("emr/get-diagnosapasienbynoreg?"
                            + param
                        ).then(function (data) {
                            // $scope.isRouteLoading = fals e;
                            var dataICD10 = data.data.datas;
                            $scope.dataSourceDiagnosaIcd10 = new kendo.data.DataSource({
                                data: dataICD10,
                                pageSize: 10
                            });
                        });
                   
                }
            }
            $scope.riwayatResep = function () {
                $scope.popUpResep.center().open();
                loadResep();   
            }
           

            loadDiagnosa();
            function loadDiagnosa() {
                $scope.isRouteLoading = true;
                var param =""
                if($scope.item.isNoRegis == true)
                   param = "noReg=" + $scope.item.noregistrasi;
                else
                  param = "noCm=" + $scope.item.noMr;
              
                medifirstService.get("emr/get-diagnosapasienbynoregicd9?"
                    + param
                ).then(function (data) {
                    $scope.isRouteLoading = false;
                    var dataICD9 = data.data.datas;
                    $scope.dataSourceDiagnosaIcd9 = new kendo.data.DataSource({
                        data: dataICD9,
                        pageSize: 10
                    });
                });

                medifirstService.get("emr/get-diagnosapasienbynoreg?"
                    + param
                ).then(function (data) {
                    // $scope.isRouteLoading = false;
                    var dataICD10 = data.data.datas;
                    $scope.dataSourceDiagnosaIcd10 = new kendo.data.DataSource({
                        data: dataICD10,
                        pageSize: 10
                    });
                });
            }

            $scope.columnDiagnosaIcd9 = [{
                "title": "No",
                "template": "{{dataSourceDiagnosaIcd9.indexOf(dataItem) + 1}}",
                "width": "30px"
            }, 
            {
                "field": "noregistrasi",
                "title": "No Registrasi",
                "width": "100px"
            }, {
                "field": "kddiagnosatindakan",
                "title": "Kode ICD 9",
                "width": "100px"
            }, {
                "field": "namadiagnosatindakan",
                "title": "Nama ICD 9",
                "width": "300px"
            }, {
                "field": "keterangantindakan",
                "title": "Keterangan",
                "width": "200px"
            }, {
                "field": "namaruangan",
                "title": "Ruangan",
                "width": "200px"
            },
            {
                "field": "namalengkap",
                "title": "Penginput",
                "width": "200px"
            },
            {
                "field": "tglinputdiagnosa",
                "title": "Tgl Input",
                "width": "200px"
            }];
            $scope.columnDiagnosaIcd10 = [{
                "title": "No",
                "template": "{{dataSourceDiagnosaIcd10.indexOf(dataItem) + 1}}",
                "width": "30px"
            }, 
            {
                "field": "noregistrasi",
                "title": "No Registrasi",
                "width": "100px"
            },{
                "field": "jenisdiagnosa",
                "title": "Jenis Diagnosis",
                "width": "150px"
            }, {
                "field": "kddiagnosa",
                "title": "Kode ICD 10",
                "width": "100px"
            }, {
                "field": "namadiagnosa",
                "title": "Nama ICD 10",
                "width": "300px"
            }, {
                "field": "keterangan",
                "title": "Keterangan",
                "width": "200px"
            }, {
                "field": "namaruangan",
                "title": "Ruangan",
                "width": "150px"
            },
            {
                "field": "namalengkap",
                "title": "Penginput",
                "width": "200px"
            },
            {
                "field": "tglinputdiagnosa",
                "title": "Tgl Input",
                "width": "200px"
            }];

            
            function loadResep() {
                $scope.isRouteLoading = true;
                medifirstService.get("emr/get-transaksi-pelayanan?noReg=" +$scope.item.noregistrasi
                // nocm=" + $scope.item.noMr
                    // + "&noregistrasifk=" + norec_apd
                    , true).then(function (dat) {
                        let group = [];
                        if (dat.statResponse == true) {
                            for (var i = 0; i < dat.data.length; i++) {
                                dat.data[i].no = i + 1                                
                                dat.data[i].total = parseFloat(dat.data[i].jumlah) * (parseFloat(dat.data[i].hargasatuan) - parseFloat(dat.data[i].hargadiscount));
                                dat.data[i].total = parseFloat(dat.data[i].total) + parseFloat(dat.data[i].jasa);
                                if (dat.data[i].reseppulang == '1') {
                                    dat.data[i].cekreseppulang = "✔"
                                }else{
                                    dat.data[i].cekreseppulang = "-"
                                }
                            }
                            var array = dat.data;
                            let sama = false

                            for (let i in array) {
                                array[i].count = 1
                                sama = false
                                for (let x in group) {
                                    if (group[x].noresep == array[i].noresep) {
                                        sama = true;
                                        group[x].count = parseFloat(group[x].count) + parseFloat(array[i].count)

                                    }
                                }
                                if (sama == false) {
                                    var dataDetail0 = [];
                                    for (var f = 0; f < array.length; f++) {
                                        if (array[i].noresep == array[f].noresep) {
                                            dataDetail0.push(array[f]);
                                        };
                                    }
                                    let result = {
                                        noregistrasi: array[i].noregistrasi,
                                        tglpelayanan: array[i].tglpelayanan,
                                        noresep: array[i].noresep,
                                        aturanpakai: array[i].aturanpakai,
                                        namaruangandepo: array[i].namaruangandepo,
                                        namaruangan: array[i].namaruangan,
                                        dokter: array[i].dokter,
                                        count: array[i].count,
                                        cekreseppulang : array[i].cekreseppulang,
                                        details: dataDetail0
                                    }
                                    group.push(result)
                                }
                            }
                        }

                        $scope.dataGridResep = group
                        console.log(group)
                        $scope.isRouteLoading = false;
                    });
            }
            $scope.columnGridResep = [

                {
                    "field": "noresep",
                    "title": "No.Resep",
                    "width": "100px",
                },
                {
                    "field": "tglpelayanan",
                    "title": "Tgl Resep",
                    "width": "120px",
                },
                {
                    "field": "noregistrasi",
                    "title": "No.Registrasi",
                    "width": "100px",
                },
                {
                    "field": "dokter",
                    "title": "Penulis Resep",
                    "width": "170px",
                },
                {
                    "field": "namaruangan",
                    "title": "Ruangan",
                    "width": "100px",
                },
                {
                    "field": "namaruangandepo",
                    "title": "Depo",
                    "width": "90px",
                },
                {
                    "field": "cekreseppulang",
                    "title": "Resep Pulang",
                    "width": "90px",
                     "template": "<span class='style-center'>#: cekreseppulang #</span>"
                }
            ];
            $scope.data2 = function (dataItem) {
                // debugger
                for (var i = 0; i < dataItem.details.length; i++) {
                    dataItem.details[i].no = i + 1

                }
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details,

                    }),
                    columns: [
                        {
                            "field": "no",
                            "title": "No",
                            "width": "15px",
                        },
                        {
                            "field": "namaproduk",
                            "title": "Deskripsi",
                            "width": "200px",
                        },
                        {
                            "field": "aturanpakai",
                            "title": "Aturan Pakai",
                            "width": "80px",
                        },
                        {
                            "field": "satuanstandar",
                            "title": "Satuan",
                            "width": "80px",
                        },
                        {
                            "field": "jumlah",
                            "title": "Qty",
                            "width": "40px",
                        },
                        {
                            "field": "kekuatan",
                            "title": "Kekuatan",
                            "width": "80px",                            
                        }

                    ]
                }
            };
           
            $scope.batal = function () {
                delete $scope.item.diagnosaTindakan;
                delete $scope.item.ketTindakan;
                delete $scope.item.jenisDiagnosis;
                delete $scope.item.diagnosa;
                delete $scope.item.keterangan;
            }

            function validasi() {
                var listRawRequired = [
                    "item.diagnosaTindakan|k-ng-model|kode / Nama Diagnosa"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var norec_diagnosapasien = "";
                    if ($scope.dataIcd9Selected != undefined) {
                        norec_diagnosapasien = $scope.dataIcd9Selected.norec_diagnosapasien
                    }
                    var ketTindakans = "";
                    if ($scope.item.ketTindakan != undefined) {
                        ketTindakans = $scope.item.ketTindakan
                    }
                    var data = {
                        norec_dp: norec_diagnosapasien,
                        objectpasienfk: norec_apd,
                        tglpendaftaran: $scope.item.tglRegistrasi,
                        objectdiagnosatindakanfk: $scope.item.diagnosaTindakan.id,
                        keterangantindakan: ketTindakans
                    }

                    $scope.objSave =
                        {
                            detaildiagnosatindakanpasien: data,
                        }
                } else {
                    ModelItem.showMessages(isValid.messages)
                }
            }

            $scope.saveIcd9 = function () {
                 if(medifirstService.getPegawai().jenisPegawai != undefined && medifirstService.getPegawai().jenisPegawai.jenispegawai !='DOKTER'){
                    toastr.error('Hanya Dokter yang bisa mengisi Diagnosis','Peringatan')
                    return
                }
                validasi();
                console.log(JSON.stringify($scope.objSave));
                medifirstService.post('emr/save-diagnosa-tindakan-pasien', $scope.objSave).then(function (e) {

                    medifirstService.postLogging('Diagnosis', 'Norec DiagnosaTindakanPasien_T', e.data.data.norec,
                        'Input Diagnosis ICD 9 ( ' + $scope.item.diagnosaTindakan.kdDiagnosaTindakan + '-' + $scope.item.diagnosaTindakan.namaDiagnosaTindakan + ' )' + ' No Registrasi ' + $scope.item.noregistrasi
                        + '/ ' + $scope.item.noMr

                    ).then(function (res) {
                    })
                    delete $scope.item.diagnosaTindakan;
                    delete $scope.item.ketTindakan;
                    delete $scope.dataIcd9Selected;
                    loadDiagnosa()
                })
            }

            $scope.deleteIcd9 = function () {
                if ($scope.item.diagnosaTindakan == undefined) {
                    alert("Pilih data yang mau di hapus!!")
                    return
                }
                var diagnosa = {
                    norec_dp: $scope.dataIcd9Selected.norec_diagnosapasien
                }
                var objDelete =
                {
                    diagnosa: diagnosa,
                }
                medifirstService.post('emr/delete-diagnosa-tindakan-pasien', objDelete).then(function (e) {
                    medifirstService.postLogging('Diagnosis', 'Norec DiagnosaTindakanPasien_T', '',
                        'Hapus Diagnosis ICD 9 ( ' + $scope.dataIcd9Selected.kddiagnosatindakan + '-' + $scope.dataIcd9Selected.namadiagnosatindakan + ' )' + ' No Registrasi ' + $scope.item.noregistrasi
                        + '/ ' + $scope.item.noMr

                    ).then(function (res) {
                    })
                    delete $scope.item.diagnosaTindakan;
                    delete $scope.item.ketTindakan;
                    delete $scope.dataIcd9Selected
                    loadDiagnosa()

                })
            }
            function validasiIcd10() {
                var listRawRequired = [
                    "item.diagnosa|k-ng-model|kode / Nama Diagnosa",
                    "item.jenisDiagnosis|k-ng-model|kode / Jenis Diagnosa"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var norec_diagnosapasien = "";
                    var tglinput = "";
                    if ($scope.dataIcd10Selected != undefined) {
                        norec_diagnosapasien = $scope.dataIcd10Selected.norec_diagnosapasien
                        tglinput = $scope.dataIcd10Selected.tglinputdiagnosa
                    } else {
                        tglinput = moment($scope.now).format('YYYY-MM-DD hh:mm:ss')
                    }
                    var keterangan = "";
                    if ($scope.item.keterangan == undefined) {
                        keterangan = "-"
                    }
                    else {
                        keterangan = $scope.item.keterangan
                    }

                    $scope.now = new Date();
                    var data = {
                        norec_dp: norec_diagnosapasien,
                        noregistrasifk: norec_apd,
                        tglregistrasi: moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss'),
                        objectdiagnosafk: $scope.item.diagnosa.id,
                        objectjenisdiagnosafk: $scope.item.jenisDiagnosis.id,
                        tglinputdiagnosa: tglinput,
                        keterangan: keterangan,
                        kasusbaru: $scope.item.kasusbaru,
                        kasuslama: $scope.item.kasuslama
                    }

                    $scope.objSave =
                        {
                            detaildiagnosapasien: data,
                        }
                } else {
                    ModelItem.showMessages(isValid.messages)
                }
            }
            $scope.saveIcd10 = function () {
                if(medifirstService.getPegawai().jenisPegawai != undefined && medifirstService.getPegawai().jenisPegawai.jenispegawai !='DOKTER'){
                    toastr.error('Hanya Dokter yang bisa mengisi Diagnosis','Peringatan')
                    return
                }
                validasiIcd10();
                console.log(JSON.stringify($scope.objSave));
                medifirstService.post('emr/save-diagnosa-pasien', $scope.objSave).then(function (e) {

                    $scope.savePeriksaDokter()
                    medifirstService.postLogging('Diagnosis', 'Norec DiagnosaPasien_T', e.data.data.norec,
                        'Input Diagnosis ICD 10 ( ' + $scope.item.diagnosa.kdDiagnosa + '-' + $scope.item.diagnosa.namaDiagnosa + ' )' + ' No Registrasi ' + $scope.item.noregistrasi
                        + '/ ' + $scope.item.noMr
                    ).then(function (res) {
                    })
                    delete $scope.item.jenisDiagnosis;
                    delete $scope.item.diagnosa;
                    delete $scope.item.keterangan;
                    delete $scope.dataIcd10Selected;
                    loadDiagnosa()
                })
            }
            $scope.savePeriksaDokter=  function(){
                
                    var kelompokUser = medifirstService.getKelompokUser()
                    // var chacePeriode = cacheHelper.get('InputTindakanPelayananDokterRevCtrl');
                    if(kelompokUser== 'dokter' ){
                        var data ={
                        "norec_apd" :norec_apd,
                        "kelompokUser" : kelompokUser
                    }
                    medifirstService.postNonMessage('rawatjalan/save-periksa',data)
                    .then(function (res) {

                    })
                    }
                }
            $scope.deleteIcd10 = function () {
                if ($scope.item.diagnosa == undefined) {
                    alert("Pilih data yang mau di hapus!!")
                    return
                }
                var diagnosa = {
                    norec_dp: $scope.dataIcd10Selected.norec_diagnosapasien
                }
                var objDelete =
                {
                    diagnosa: diagnosa,
                }
                medifirstService.post('emr/delete-diagnosa-pasien', objDelete).then(function (e) {
                    medifirstService.postLogging('Diagnosis', 'Norec DiagnosaPasien_T', '',
                        'Hapus Diagnosis ICD 10 ( ' + $scope.dataIcd10Selected.kddiagnosa + '-' + $scope.dataIcd10Selected.namadiagnosa + ' )' + ' No Registrasi ' + $scope.item.noregistrasi
                        + '/ ' + $scope.item.noMr

                    ).then(function (res) {
                    })
                    delete $scope.item.jenisDiagnosis;
                    delete $scope.item.diagnosa;
                    delete $scope.item.keterangan;
                    delete $scope.dataIcd10Selected
                    loadDiagnosa()


                })
            }


            $scope.back = function () {
                $state.go('DaftarAntrianDokterRajal')
            }
            $scope.showInputDiagnosaDokter = function () {
                var arrStr = cacheHelper.get('CacheInputDiagnosaDokter');
                cacheHelper.set('CacheInputDiagnosaDokter', arrStr);
                $state.go('InputDiagnosaDokter')
            }
            $scope.resep = function () {
                var arrStr = cacheHelper.get('CacheInputDiagnosaDokter');
                cacheHelper.set('InputResepApotikOrderRevCtrl', arrStr);
                $state.go('InputResepApotikOrderRev')
            }
            $scope.inputTindakanDokter = function () {
                var arrStr = cacheHelper.get('CacheInputDiagnosaDokter')
                cacheHelper.set('InputTindakanPelayananDokterRevCtrl', arrStr);
                $state.go('InputTindakanPelayananDokterRev', {
                    norecPD: norec_pd,
                    norecAPD: norec_apd,

                });
            }
            $scope.laboratorium = function () {
                var arrStr = cacheHelper.get('CacheInputDiagnosaDokter')
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananLaboratoriumDokterRev')
            }
            $scope.radiologi = function () {
                var arrStr = cacheHelper.get('CacheInputDiagnosaDokter')
                cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananRadiologiDokterRev')
            }
            $scope.rekamMedisElektronik = function () {
                var arrStr = cacheHelper.get('CacheInputDiagnosaDokter');
                cacheHelper.set('cacheRMelektronik', arrStr);
                $state.go('RekamMedisElektronik')
            }
            $scope.inputCPPT = function () {
                var arrStr = cacheHelper.get('CacheInputDiagnosaDokter');
                cacheHelper.set('cacheCPPT', arrStr);
                $state.go('CPPT')
            }

        }

    ]);
});