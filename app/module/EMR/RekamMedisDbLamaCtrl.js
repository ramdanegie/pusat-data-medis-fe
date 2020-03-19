define(['initialize', 'Configuration'], function (initialize, configuration) {
    'use strict';
    initialize.controller('RekamMedisDbLamaCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'MedifirstService', 'CacheHelper',
        function ($rootScope, $scope, $state, dateHelper, medifirstService, cacheHelper) {
            $scope.now = new Date();

            $scope.header = {};

            $scope.checkNoregis = '';
            $scope.checkNoregis = true
            var usia = ''
            var departemen = ''
            $scope.isLoadingNav = false
            $scope.getRekamMedisCheck = function (checkNoregis) {
                $rootScope.getRekamMedisCheck(checkNoregis);
            }

            $scope.showNav = function () {
                $rootScope.isShowNavEMR = !$rootScope.isShowNavEMR
            }

            // norec Antrian Etateh
            medifirstService.get('emr/get-antrian-pasien-norec-db-lama/' + $state.params.noRec).then(function (e) {
                var result = e.data.result
                result.umur = dateHelper.CountAge(new Date(result.tgllahir), new Date(result.tglregistrasi));
                var bln = result.umur.month,
                    thn = result.umur.year,
                    day = result.umur.day
                usia = (result.umur.year * 12) + result.umur.month;
                departemen = result.objectdepartemenfk
                result.umur = thn + 'thn ' + bln + 'bln ' + day + 'hr '
                var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(result.tgllahir);
                var secondDate = new Date(result.tglregistrasi);
                var countDay = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

                var setUsiaPengkajian = {
                    'hari': countDay,
                    'umur': thn
                }
                $scope.header.generate = true;

                $scope.header = result
                if (result.foto == null)
                    $scope.header.image = "../app/images/avatar.jpg"
                else
                    $scope.header.image = result.foto
                localStorage.setItem('usiaPengkajian', JSON.stringify(setUsiaPengkajian));
                localStorage.setItem('departemenPengkajian', departemen);
                $scope.hideShowForm(setUsiaPengkajian, departemen)

                loadTreeView()
                setCache()
            })
            function setCache() {
                cacheHelper.set('CacheInputDiagnosaDokter', undefined);
                cacheHelper.set('InputResepApotikOrderRevCtrl', undefined);
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', undefined);
                cacheHelper.set('InputTindakanPelayananDokterRevCtrl', undefined);
                cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', undefined);
                cacheHelper.set('cacheRMelektronik', undefined);
                cacheHelper.set('cacheCPPT', undefined);
                cacheHelper.set('cachePengkajianPasien', undefined);
                cacheHelper.set('OdontoGramDokterCtrl', undefined);
                cacheHelper.set('PengkajianSurveilansRevCtrl', undefined);
                cacheHelper.set('cacheRekamMedis', undefined);

                var arrStr = {
                    0: $scope.header.nocm,
                    1: $scope.header.namapasien,
                    2: $scope.header.jeniskelamin,
                    3: $scope.header.notransaksi,
                    4: $scope.header.umur,
                    5: $scope.header.kelompokpasien,
                    6: $scope.header.tglregistrasi,
                    7: $scope.header.norec,
                    8: $scope.header.norec_pd,
                    9: $scope.header.objectkelasfk,
                    10: $scope.header.objectruanganfk,
                    11: $scope.header.namaruangan,
                    12: $scope.checkNoregis,
                    13: moment($scope.header.tgllahir).format('DD-MM-YYYY'),
                    14: $scope.header.alamatlengkap
                }
                cacheHelper.set('CacheInputDiagnosaDokter', arrStr);
                cacheHelper.set('InputResepApotikOrderRevCtrl', arrStr);
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
                cacheHelper.set('InputTindakanPelayananDokterRevCtrl', arrStr);
                cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', arrStr);
                cacheHelper.set('cacheRMelektronik', arrStr);
                cacheHelper.set('cacheCPPT', arrStr);
                cacheHelper.set('cachePengkajianPasien', arrStr);
                cacheHelper.set('OdontoGramDokterCtrl', arrStr);
                cacheHelper.set('PengkajianSurveilansRevCtrl', arrStr);
                cacheHelper.set('cacheRekamMedis', arrStr);
            }
            function loadTreeView() {
                $scope.isLoadingNav = true
                $scope.treeSourceMenu = [];
                medifirstService.get("emr/get-menu-rekam-medis-dynamic-db-lama").then(function (e) {
                    $scope.isLoadingNav = false
                    var inlineDefault = new kendo.data.HierarchicalDataSource({
                        data: e.data.data,
                        schema: {
                            model: {
                                children: "child",
                                expanded: false
                            }
                        }
                    });
                    $scope.treeSourceMenu = inlineDefault
                    $scope.mainTreeViewMenuOption = {
                        dataBound: function (e) {
                            $('span.k-in').each(function () {
                                // if ($(this).text() == 'Diagnosa') { $(this).addClass('gemblung') }
                                // if ($(this).text() == 'Vital Sign') { $(this).addClass('gemblung') }
                                // if ($(this).text() == 'Resep Elektronik') { $(this).addClass('gemblung') }

                            })
                            // var text = "CPPT Vital Sign";
                            // e.sender.element.find("span.k-in:contains(" + text + ")").addClass('kuntul');
                        },
                        dataTextField: ["caption"],
                        datakKeyField: ["id"],
                        select: onSelect,
                        dragAndDrop: false,
                        checkboxes: false
                    }
                    // var treeview = $("#treeview").data("kendoTreeView");
                    // .expandPath([2, 5])

                }, function (error) {
                    $scope.isLoadingNav = false
                })

            }
            function onSelect(e) {
                var data3 = e.sender.dataSource._data

                var uid_select = e.node.dataset.uid
                var idTree = '';
                var urlTrue = null;
                $scope.listBreadCumb = []

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
                // for (let x = 0; x < data3.length; x++) {
                //   if(idTree ==data3[x].headfk){
                //     $scope.listBreadCumb.push({name:data3[x].caption}) 
                //   }                    
                // }

                var noemr = '-'
                if ($scope.dataSelected != undefined) {
                    noemr = $scope.dataSelected.noemr
                }
                if (urlTrue == null) {
                    $state.go("RekamMedis.OrderJadwalBedah.ProsedurKeselamatan", {
                        namaEMR: idTree,
                        nomorEMR: noemr
                    });
                } else {
                    $state.go(urlTrue);
                }
            }

            $scope.nav = function (state) {
                $scope.currentState = state;
                var arrStr = {
                    0: $scope.header.nocm,
                    1: $scope.header.namapasien,
                    2: $scope.header.jeniskelamin,
                    3: $scope.header.notransaksi,
                    4: $scope.header.umur,
                    5: $scope.header.kelompokpasien,
                    6: $scope.header.tglregistrasi,
                    7: $scope.header.norec,
                    8: $scope.header.norec_pd,
                    9: $scope.header.objectkelasfk,
                    10: $scope.header.objectruanganfk,
                    11: $scope.header.namaruangan,
                    12: $scope.checkNoregis,
                    13: moment($scope.header.tgllahir).format('DD-MM-YYYY'),
                    14: $scope.header.alamatlengkap
                }
                cacheHelper.set('CacheInputDiagnosaDokter', arrStr);
                cacheHelper.set('InputResepApotikOrderRevCtrl', arrStr);
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
                cacheHelper.set('InputTindakanPelayananDokterRevCtrl', arrStr);
                cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', arrStr);
                cacheHelper.set('cacheRMelektronik', arrStr);
                cacheHelper.set('cacheCPPT', arrStr);
                cacheHelper.set('cachePengkajianPasien', arrStr);
                cacheHelper.set('OdontoGramDokterCtrl', arrStr);
                cacheHelper.set('PengkajianSurveilansRevCtrl', arrStr);
                cacheHelper.set('cacheRekamMedis', arrStr);
                $state.go(state, $state.params);
                // console.log($scope.currentState);

            }


            $scope.Generate = function (data) {

                if (data === true) {
                    $scope.checkNoregis = true;
                } else {
                    $scope.checkNoregis = false;
                }
            };

            $scope.hideShowForm = function (usiaPengkajian, departemen) {

                if (usiaPengkajian.hari >= 1 && usiaPengkajian.hari <= 31) { $scope.isNeonatal = true }
                if (usiaPengkajian.hari > 31 && usiaPengkajian.umur <= 17) { $scope.isAnak = true }
                if (usiaPengkajian.umur >= 18 && usiaPengkajian.umur <= 49) { $scope.isDewasa = true }
                if (usiaPengkajian.umur > 50) { $scope.isGeriatri = true }
                if (departemen == 18 || departemen == 28 || departemen == 24) { $scope.isRawatJalan = true }
                if (departemen == 16 || departemen == 35) { $scope.isRawatInap = true }

            }

        }
    ]);
});