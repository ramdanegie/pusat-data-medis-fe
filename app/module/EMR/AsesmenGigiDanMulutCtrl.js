define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AsesmenGigiDanMulutCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'MedifirstService',
        function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, medifirstService) {


            $scope.noCM = $state.params.noCM;
            $scope.tombolSimpanVis = true
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.totalSkor = 0
            $scope.totalSkor2 = 0
            $scope.totalSkor4 = 0
            $scope.cc = {}
            var norecEMR = ''
            var nomorEMR = '-'
            $scope.isCetak = true
            $scope.cc.emrfk = 349
            var dataLoad = []
            $scope.now = new Date

            medifirstService.getPart('emr/get-datacombo-part-pegawai', true, true, 20).then(function (data) {
                $scope.listPegawai = data
            })
            medifirstService.getPart('emr/get-datacombo-part-ruangan-pelayanan', true, true, 20).then(function (data) {
                $scope.listRuang = data

            })
            medifirstService.getPart('emr/get-datacombo-part-diagnosa', true, true, 20).then(function (data) {
                $scope.listDiagnosa = data
            })
            // medifirstService.get("emr/get-rekam-medis-dynamic?emrid=" + 349).then(function (e) {

            //     var datas = e.data.kolom4

            // })


            $scope.listYa = [
                { name: "Ya", id: 1 },
                { name: "Tidak", id: 2 }
            ];

            $scope.listAlergi = [
                { "id": 50019, "nama": "Aspirin ", "type": "checkbox" },
                { "id": 50020, "nama": "Sulfa ", "type": "checkbox" },
                { "id": 50021, "nama": "Penicilin ", "type": "checkbox" },
                { "id": 50022, "nama": "Anestetik ", "type": "checkbox" },
                { "id": 50023, "nama": "Obat Lain (sebutkan)", "type": "checkbox" },
                { "id": 50024, "nama": "", "type": "textbox" },
            ]
            var cacheNomorEMR = cacheHelper.get('cacheNomorEMR');
            var cacheNoREC = cacheHelper.get('cacheNOREC_EMR');
            if (cacheNoREC != undefined) {
                norecEMR = cacheNomorEMR[1]
            }
            if (cacheNomorEMR != undefined) {
                nomorEMR = cacheNomorEMR[0]

                $scope.cc.norec_emr = nomorEMR
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
            $scope.cetakPdf = function () {
                if (norecEMR == '') return
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/e-rekammedis?cetak-surat-permintaan-ri&id=' + $scope.cc.nocm + '&emr=' + norecEMR + '&view=true', function (response) {
                    // do something with response
                });
            }

            var chacePeriode = cacheHelper.get('cacheRekamMedis');
            if (chacePeriode != undefined) {
                $scope.cc.nocm = chacePeriode[0]
                $scope.cc.namapasien = chacePeriode[1]
                $scope.cc.jeniskelamin = chacePeriode[2]
                $scope.cc.noregistrasi = chacePeriode[3]
                $scope.cc.umur = chacePeriode[4]
                $scope.cc.kelompokpasien = chacePeriode[5]
                $scope.cc.tglregistrasi = chacePeriode[6]
                $scope.cc.norec = chacePeriode[7]
                $scope.cc.norec_pd = chacePeriode[8]
                $scope.cc.objectkelasfk = chacePeriode[9]
                $scope.cc.namakelas = chacePeriode[10]
                $scope.cc.objectruanganfk = chacePeriode[11]
                $scope.cc.namaruangan = chacePeriode[12]
                $scope.cc.DataNoregis = chacePeriode[12]
                $scope.cc.tgllahir = chacePeriode[18]
                if (nomorEMR == '-') {
                    $scope.cc.norec_emr = '-'
                } else {
                    $scope.cc.norec_emr = nomorEMR
                }
            }
            var chekedd = false


            medifirstService.get("emr/get-emr-transaksi-detail?noemr=" + nomorEMR + "&emrfk=" + $scope.cc.emrfk, true).then(function (dat) {
                $scope.item.obj = []
                $scope.item.obj2 = []
                var dataOndonto = []
                dataLoad = dat.data.data

                $scope.item.obj[50050] = $scope.now

                $scope.item.obj[50010] = $scope.cc.namaruangan
                let pegawai = JSON.parse(localStorage.getItem('pegawai'))
                $scope.item.obj[50051] = { value: pegawai.id, text: pegawai.namaLengkap }
                for (var i = 0; i <= dataLoad.length - 1; i++) {
                    if (parseFloat($scope.cc.emrfk) == dataLoad[i].emrfk) {

                        if (dataLoad[i].type == "textbox") {
                            $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                        }
                        if (dataLoad[i].type == "checkbox") {
                            chekedd = false
                            if (dataLoad[i].value == '1') {
                                chekedd = true
                            }
                            $scope.item.obj[dataLoad[i].emrdfk] = chekedd
                            // if (dataLoad[i].emrdfk >= 14464 && dataLoad[i].emrdfk <= 14469 && chekedd) {
                            //     $scope.getSkalaNyeri(1, { descNilai: dataLoad[i].reportdisplay })
                            // }
                            // if (dataLoad[i].emrdfk >= 5053 && dataLoad[i].emrdfk <= 5084 && dataLoad[i].reportdisplay != null) {
                            //     var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                            //     $scope.getSkor2(datass)
                            // }
                            // if (dataLoad[i].emrdfk >= 14424 && dataLoad[i].emrdfk <= 14431 && dataLoad[i].reportdisplay != null) {
                            //     var datass = { id: dataLoad[i].emrdfk, descNilai: dataLoad[i].reportdisplay }
                            //     $scope.getSkorGizi(datass)
                            // }


                        }

                        if (dataLoad[i].type == "datetime") {
                            $scope.item.obj[dataLoad[i].emrdfk] = new Date(dataLoad[i].value)
                        }
                        if (dataLoad[i].type == "time") {
                            $scope.item.obj[dataLoad[i].emrdfk] = new Date(dataLoad[i].value)
                        }
                        if (dataLoad[i].type == "date") {
                            $scope.item.obj[dataLoad[i].emrdfk] = new Date(dataLoad[i].value)
                        }
                        if (dataLoad[i].type == "radio") {
                            $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                        }

                        if (dataLoad[i].type == "checkboxtextbox") {
                            $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                            $scope.item.obj2[dataLoad[i].emrdfk] = true
                        }
                        if (dataLoad[i].type == "textarea") {
                            $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                        }
                        if (dataLoad[i].type == "combobox") {
                            var str = dataLoad[i].value
                            var res = str.split("~");
                            // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
                            $scope.item.obj[dataLoad[i].emrdfk] = { value: res[0], text: res[1] }

                        }
                        if (dataLoad[i].type == "odonto") {

                            var strs = dataLoad[i].value
                            var ress = strs.split("~");

                            var eel = {
                                colour: ress[0],
                                width: parseInt(ress[1]),
                                height: parseInt(ress[2]),
                                top: parseInt(ress[3]),
                                left: parseInt(ress[4]),
                                id: parseInt(ress[5]),
                                brs: parseInt(ress[6]),
                                kol: parseInt(ress[7]),
                                seg: parseInt(ress[8]),
                                posisina: ress[9],
                                type: ress[10],
                                color: ress[11]
                            }
                            isianColor = ress[11]
                            typeIsian = ress[10]
                            isiColor(eel)

                        }
                    }

                }
            })

            $scope.kembali = function () {
                $rootScope.showRiwayat()
            }

            $scope.Save = function () {
                for (var i = data2.length - 1; i >= 0; i--) {
                    if (data2[i].type == undefined) {
                        data2[i].type = ''
                        data2[i].color = "black"
                    }
                }
                for (let z = 0; z < data2.length; z++) {
                    const element = data2[z];
                    for (let x = 0; x < elements.length; x++) {
                        const element2 = elements[x];
                        if (element.id == element2.id) {
                            $scope.item.obj[element.id] = element.colour + '~' +
                                element.width + '~' +
                                element.height + '~' +
                                element.top + '~' +
                                element.left + '~' +
                                element.id + '~' +
                                element.brs + '~' +
                                element.kol + '~' +
                                element.seg + '~' +
                                element.posisina + '~' +
                                element.type + '~' +
                                element.color
                        }
                    }
                }
                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    if ($scope.item.obj[parseInt(arrobj[i])] instanceof Date)
                        $scope.item.obj[parseInt(arrobj[i])] = moment($scope.item.obj[parseInt(arrobj[i])]).format('YYYY-MM-DD HH:mm')
                    arrSave.push({ id: arrobj[i], values: $scope.item.obj[parseInt(arrobj[i])] })
                }
                $scope.cc.jenisemr = 'asesmen'
                var jsonSave = {
                    head: $scope.cc,
                    data: arrSave
                }
                medifirstService.post('emr/save-emr-dinamis', jsonSave).then(function (e) {

                    $rootScope.loadRiwayat()
                    medifirstService.postLogging('EMR', 'norec emrpasien_t', e.data.data.norec,
                        'Surat Permintaan Rawat Inap ' + ' dengan No EMR - ' + e.data.data.noemr + ' pada No Registrasi '
                        + $scope.cc.noregistrasi).then(function (res) {
                        })
                    var arrStr = {
                        0: e.data.data.noemr
                    }
                    cacheHelper.set('cacheNomorEMR', arrStr);
                });
            }

            var data2 = []
            var isianColor = "white"
            var kdColorKaries = "#B8B7B7"
            var kdColorTambalanLogam = "#F544ED"
            var kdColorTambalanNonLogam = "#82D9D9"
            var kdColorMahkotaLogam = "#014C0A"
            var kdColorMahkotaNonLogam = "#40F5F9"
            var typeIsian = ""

            $scope.BelumErupsi = function () {
                typeIsian = "UE"
                $scope.activeStatus = 1
            }
            $scope.ErupsiSebagian = function () {
                typeIsian = "PE"
                $scope.activeStatus = 2
            }
            $scope.AnomaliBentuk = function () {
                typeIsian = "A"
                $scope.activeStatus = 3
            }
            $scope.NonVital = function () {
                typeIsian = "/"
                $scope.activeStatus = 13

            }
            $scope.Karies = function () {
                isianColor = kdColorKaries
                typeIsian = "selai"
                $scope.activeStatus = 4
            }
            $scope.TambalanLogam = function () {
                isianColor = kdColorTambalanLogam
                typeIsian = "selai"
                $scope.activeStatus = 5
            }
            $scope.TambalanNonLogam = function () {
                isianColor = kdColorTambalanNonLogam
                typeIsian = "selai"
                $scope.activeStatus = 6
            }
            $scope.MahkotaLogam = function () {
                isianColor = kdColorMahkotaLogam
                typeIsian = "selai"
                $scope.activeStatus = 7
            }
            $scope.mahkotaNonLogam = function () {
                isianColor = kdColorMahkotaNonLogam
                typeIsian = "selai"
                $scope.activeStatus = 8
            }
            $scope.SisaAkar = function () {
                typeIsian = "SisaAkar"
                $scope.activeStatus = 9
            }
            $scope.gigiHilang = function () {
                typeIsian = "gigiHilang"
                $scope.activeStatus = 10
            }
            $scope.Jembatan = function () {
                typeIsian = "Jembatan"
                $scope.activeStatus = 11
            }
            $scope.GigiTiruanLepas = function () {
                typeIsian = "GigiTiruanLepas"
                $scope.activeStatus = 12
            }
            $scope.Clear = function () {
                isianColor = "white"
                typeIsian = "selai"
                $scope.activeStatus = 14
            }
            var elem = document.getElementById('myCanvas'),
                elemLeft = elem.offsetLeft,
                elemTop = elem.offsetTop,
                context = elem.getContext('2d'),
                //context2 = elem.getContext('2d'),
                elements = [];


            // elem.addEventListener('mousemove', function(evt) {
            //     var mousePos = getMousePos(elem, evt);
            //   console.log( 'Mouse position: ' + mousePos.x + ',' + mousePos.y)
            //     // writeMessage(elem, message);
            //     }, false);

            // function writeMessage(canvas, message) {
            //     var context = canvas.getContext('2d');
            //     context.clearRect(0, 0, canvas.width, canvas.height);
            //     context.font = '18pt Calibri';
            //     context.fillStyle = 'black';
            //     context.fillText(message, 10, 25);
            //   }
            function getMousePos(canvas, evt) {
                var rect = canvas.getBoundingClientRect();
                return {
                    x: evt.clientX - rect.left,
                    y: evt.clientY - rect.top
                };
            }
            // Add event listener for `click` events.
            elem.addEventListener('click', function (event) {
                var x = event.pageX - (elemLeft + 320),
                    y = event.pageY - (elemTop + 410)
                // console.log(x, y);
                elements.forEach(function (element) {
                    if (y > element.top + 165 && y < element.top + 165 + element.height && x > element.left && x < element.left + element.width) {
                        isiColor(element)
                    }
                });

            }, false);

            var listSrc = [
                { id: 50052, no: '18' },
                { id: 50053, no: '17' },
                { id: 50054, no: '16' },
                { id: 50055, no: '15' },
                { id: 50056, no: '14' },
                { id: 50057, no: '13' },
                { id: 50058, no: '12' },
                { id: 50059, no: '11' },

                { id: 50060, no: '21' },
                { id: 50061, no: '22' },
                { id: 50062, no: '23' },
                { id: 50063, no: '24' },
                { id: 50064, no: '25' },
                { id: 50065, no: '26' },
                { id: 50066, no: '27' },
                { id: 50067, no: '28' },

                { id: 50068, no: '55' },
                { id: 50069, no: '54' },
                { id: 50070, no: '53' },
                { id: 50071, no: '52' },
                { id: 50072, no: '51' },

                { id: 50073, no: '61' },
                { id: 50074, no: '62' },
                { id: 50075, no: '63' },
                { id: 50076, no: '64' },
                { id: 50077, no: '65' },

                { id: 50078, no: '85' },
                { id: 50079, no: '84' },
                { id: 50080, no: '83' },
                { id: 50081, no: '82' },
                { id: 50082, no: '81' },

                { id: 50083, no: '71' },
                { id: 50084, no: '72' },
                { id: 50085, no: '73' },
                { id: 50086, no: '74' },
                { id: 50087, no: '75' },

                { id: 50088, no: '48' },
                { id: 50089, no: '47' },
                { id: 50090, no: '46' },
                { id: 50091, no: '45' },
                { id: 50092, no: '44' },
                { id: 50093, no: '43' },
                { id: 50094, no: '42' },
                { id: 50095, no: '41' },

                { id: 50096, no: '31' },
                { id: 50097, no: '32' },
                { id: 50098, no: '33' },
                { id: 50099, no: '34' },
                { id: 50100, no: '35' },
                { id: 50101, no: '36' },
                { id: 50102, no: '37' },
                { id: 50103, no: '38' }
            ]



            var nextKotak = 0
            var besarKotak = 65
            var spc = 0
            var ididKlik = 50051
            var idSrc = 0

            //sayur kol 1
            for (var i = 0; i < 5; i++) {
                // if (i == 8) {
                //    spc = 20
                //}


                context.moveTo(40 + (i * besarKotak) + spc, 40);
                context.lineTo(100 + (i * besarKotak) + spc, 40);
                context.lineTo(100 + (i * besarKotak) + spc, 100);
                context.lineTo(40 + (i * besarKotak) + spc, 100);
                context.lineTo(40 + (i * besarKotak) + spc, 40);

                context.lineTo(55 + (i * besarKotak) + spc, 55);
                context.lineTo(55 + (i * besarKotak) + spc, 85);
                context.lineTo(40 + (i * besarKotak) + spc, 100);

                context.moveTo(55 + (i * besarKotak) + spc, 85);
                context.lineTo(85 + (i * besarKotak) + spc, 85);
                context.lineTo(100 + (i * besarKotak) + spc, 100);

                context.moveTo(85 + (i * besarKotak) + spc, 85);
                context.lineTo(85 + (i * besarKotak) + spc, 55);
                context.lineTo(100 + (i * besarKotak) + spc, 40);

                context.moveTo(85 + (i * besarKotak) + spc, 55);
                context.lineTo(55 + (i * besarKotak) + spc, 55);



                context.stroke();


                context.font = "20px Tahoma";
                context.fillStyle = "black";
                context.fillText(listSrc[idSrc].no, 57 + (i * besarKotak) + spc, 120);

                idSrc = idSrc + 1
                elements.push(
                    //A1
                    {
                        colour: 'red',
                        width: 30, height: 15,
                        top: 40, left: 55 + (i * besarKotak) + spc,
                        id: ididKlik + 1,
                        brs: 1, kol: i + 1, seg: 1, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 55, left: 85 + (i * besarKotak) + spc,
                        id: ididKlik + 2,
                        brs: 1, kol: i + 1, seg: 2, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 30, height: 15,
                        top: 85, left: 55 + (i * besarKotak) + spc,
                        id: ididKlik + 3,
                        brs: 1, kol: i + 1, seg: 3, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 55, left: 40 + (i * besarKotak) + spc,
                        id: ididKlik + 4,
                        brs: 1, kol: i + 1, seg: 4, posisina: 'pinggir'
                    },
                    {
                        colour: 'yellow',
                        width: 30, height: 30,
                        top: 55, left: 55 + (i * besarKotak) + spc,
                        id: ididKlik + 5,
                        brs: 1, kol: i + 1, seg: 5, posisina: 'pinggir'
                    }
                );
                ididKlik = ididKlik + 5
            }


            /// SAYUR 1 nukadua
            spc = 325
            for (var i = 0; i < 6; i++) {
                // if (i == 8) {
                //    spc = 20
                //}


                context.moveTo(40 + (i * besarKotak) + spc, 40);
                context.lineTo(100 + (i * besarKotak) + spc, 40);
                context.lineTo(100 + (i * besarKotak) + spc, 100);
                context.lineTo(40 + (i * besarKotak) + spc, 100);
                context.lineTo(40 + (i * besarKotak) + spc, 40);

                context.lineTo(55 + (i * besarKotak) + spc, 70);
                context.lineTo(40 + (i * besarKotak) + spc, 100);

                context.moveTo(85 + (i * besarKotak) + spc, 70);
                context.lineTo(100 + (i * besarKotak) + spc, 100);

                context.moveTo(85 + (i * besarKotak) + spc, 70);
                context.lineTo(100 + (i * besarKotak) + spc, 40);

                context.moveTo(85 + (i * besarKotak) + spc, 70);
                context.lineTo(55 + (i * besarKotak) + spc, 70);

                context.stroke();


                context.font = "20px Tahoma";
                context.fillStyle = "black";
                context.fillText(listSrc[idSrc].no, 57 + (i * besarKotak) + spc, 120);

                idSrc = idSrc + 1

                elements.push(
                    //A1
                    {
                        colour: 'red',
                        width: 30, height: 30,
                        top: 40, left: 55 + (i * besarKotak) + spc,
                        id: ididKlik + 1,
                        brs: 1, kol: i + 1, seg: 1, posisina: 'tengah'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 55, left: 85 + (i * besarKotak) + spc,
                        id: ididKlik + 2,
                        brs: 1, kol: i + 1, seg: 2, posisina: 'tengah'
                    },
                    {
                        colour: 'red',
                        width: 30, height: 30,
                        top: 85, left: 55 + (i * besarKotak) + spc,
                        id: ididKlik + 3,
                        brs: 1, kol: i + 1, seg: 3, posisina: 'tengah'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 55, left: 40 + (i * besarKotak) + spc,
                        id: ididKlik + 4,
                        brs: 1, kol: i + 1, seg: 4, posisina: 'tengah'
                    }
                );
                ididKlik = ididKlik + 4
            }

            ///SAYUR 1 nu kadua


            ///sayur 1 nu katilu

            spc = 715
            for (var i = 0; i < 5; i++) {
                // if (i == 8) {
                //    spc = 20
                //}


                context.moveTo(40 + (i * besarKotak) + spc, 40);
                context.lineTo(100 + (i * besarKotak) + spc, 40);
                context.lineTo(100 + (i * besarKotak) + spc, 100);
                context.lineTo(40 + (i * besarKotak) + spc, 100);
                context.lineTo(40 + (i * besarKotak) + spc, 40);

                context.lineTo(55 + (i * besarKotak) + spc, 55);
                context.lineTo(55 + (i * besarKotak) + spc, 85);
                context.lineTo(40 + (i * besarKotak) + spc, 100);

                context.moveTo(55 + (i * besarKotak) + spc, 85);
                context.lineTo(85 + (i * besarKotak) + spc, 85);
                context.lineTo(100 + (i * besarKotak) + spc, 100);

                context.moveTo(85 + (i * besarKotak) + spc, 85);
                context.lineTo(85 + (i * besarKotak) + spc, 55);
                context.lineTo(100 + (i * besarKotak) + spc, 40);

                context.moveTo(85 + (i * besarKotak) + spc, 55);
                context.lineTo(55 + (i * besarKotak) + spc, 55);



                context.stroke();


                context.font = "20px Tahoma";
                context.fillStyle = "black";
                context.fillText(listSrc[idSrc].no, 57 + (i * besarKotak) + spc, 120);

                idSrc = idSrc + 1

                elements.push(
                    //A1
                    {
                        colour: 'red',
                        width: 30, height: 15,
                        top: 40, left: 55 + (i * besarKotak) + spc,
                        id: ididKlik + 1,
                        brs: 1, kol: i + 1, seg: 1, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 55, left: 85 + (i * besarKotak) + spc,
                        id: ididKlik + 2,
                        brs: 1, kol: i + 1, seg: 2, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 30, height: 15,
                        top: 85, left: 55 + (i * besarKotak) + spc,
                        id: ididKlik + 3,
                        brs: 1, kol: i + 1, seg: 3, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 55, left: 40 + (i * besarKotak) + spc,
                        id: ididKlik + 4,
                        brs: 1, kol: i + 1, seg: 4, posisina: 'pinggir'
                    },
                    {
                        colour: 'yellow',
                        width: 30, height: 30,
                        top: 55, left: 55 + (i * besarKotak) + spc,
                        id: ididKlik + 5,
                        brs: 1, kol: i + 1, seg: 5, posisina: 'pinggir'
                    }
                );
                ididKlik = ididKlik + 5
            }


            ///sayur 1 nu katilu

            spc = 0
            //sayur kol 2
            for (var i = 0; i < 2; i++) {

                context.moveTo(235 + (i * besarKotak) + spc, 150);
                context.lineTo(235 + (i * besarKotak) + spc, 210);
                context.lineTo(295 + (i * besarKotak) + spc, 210);
                context.lineTo(295 + (i * besarKotak) + spc, 150);
                context.lineTo(235 + (i * besarKotak) + spc, 150);

                context.moveTo(235 + (i * besarKotak) + spc, 150);
                context.lineTo(250 + (i * besarKotak) + spc, 165);
                context.lineTo(250 + (i * besarKotak) + spc, 195);
                context.lineTo(235 + (i * besarKotak) + spc, 210);

                context.moveTo(250 + (i * besarKotak) + spc, 195);
                context.lineTo(280 + (i * besarKotak) + spc, 195);
                context.lineTo(295 + (i * besarKotak) + spc, 210);

                context.moveTo(280 + (i * besarKotak) + spc, 195);
                context.lineTo(280 + (i * besarKotak) + spc, 165);
                context.lineTo(295 + (i * besarKotak) + spc, 150);

                context.moveTo(280 + (i * besarKotak) + spc, 165);
                context.lineTo(250 + (i * besarKotak) + spc, 165);

                context.stroke();

                context.font = "20px Tahoma";
                context.fillStyle = "black";
                context.fillText(listSrc[idSrc].no, 252 + (i * besarKotak) + spc, 230);

                idSrc = idSrc + 1

                elements.push(
                    {
                        colour: 'red',
                        width: 30, height: 15,
                        top: 150, left: 250 + (i * besarKotak) + spc,
                        id: ididKlik + 1,
                        brs: 2, kol: i + 1, seg: 1, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 165, left: 280 + (i * besarKotak) + spc,
                        id: ididKlik + 2,
                        brs: 2, kol: i + 1, seg: 2, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 30, height: 15,
                        top: 195, left: 250 + (i * besarKotak) + spc,
                        id: ididKlik + 3,
                        brs: 2, kol: i + 1, seg: 3, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 165, left: 235 + (i * besarKotak) + spc,
                        id: ididKlik + 4,
                        brs: 2, kol: i + 1, seg: 4, posisina: 'pinggir'
                    },
                    {
                        colour: 'yellow',
                        width: 30, height: 30,
                        top: 165, left: 250 + (i * besarKotak) + spc,
                        id: ididKlik + 5,
                        brs: 2, kol: i + 1, seg: 5, posisina: 'pinggir'
                    }
                );
                ididKlik = ididKlik + 5
            }



            //nu beda 2		
            spc = 130
            //sayur kol 2
            for (var i = 0; i < 6; i++) {

                context.moveTo(235 + (i * besarKotak) + spc, 150);
                context.lineTo(235 + (i * besarKotak) + spc, 210);
                context.lineTo(295 + (i * besarKotak) + spc, 210);
                context.lineTo(295 + (i * besarKotak) + spc, 150);
                context.lineTo(235 + (i * besarKotak) + spc, 150);

                context.lineTo(250 + (i * besarKotak) + spc, 180);
                context.lineTo(235 + (i * besarKotak) + spc, 210);

                context.moveTo(280 + (i * besarKotak) + spc, 180);
                context.lineTo(295 + (i * besarKotak) + spc, 210);

                context.moveTo(280 + (i * besarKotak) + spc, 180);
                context.lineTo(295 + (i * besarKotak) + spc, 150);

                context.moveTo(280 + (i * besarKotak) + spc, 180);
                context.lineTo(250 + (i * besarKotak) + spc, 180);


                //context.lineTo(55 + (i * besarKotak) + spc, 55);
                //context.lineTo(55 + (i * besarKotak) + spc, 85);
                //context.lineTo(40 + (i * besarKotak) + spc, 100);

                // context.moveTo(55 + (i * besarKotak) + spc, 85);
                // context.lineTo(85 + (i * besarKotak) + spc, 85);
                //context.lineTo(100 + (i * besarKotak) + spc, 100);

                // context.moveTo(85 + (i * besarKotak) + spc, 85);
                // context.lineTo(85 + (i * besarKotak) + spc, 55);
                // context.lineTo(100 + (i * besarKotak) + spc, 40);

                // context.moveTo(85 + (i * besarKotak) + spc, 55);
                // context.lineTo(55 + (i * besarKotak) + spc, 55);


                context.stroke();

                context.font = "20px Tahoma";
                context.fillStyle = "black";
                context.fillText(listSrc[idSrc].no, 252 + (i * besarKotak) + spc, 230);

                idSrc = idSrc + 1

                elements.push(
                    {
                        colour: 'red',
                        width: 30, height: 30,
                        top: 150, left: 250 + (i * besarKotak) + spc,
                        id: ididKlik + 1,
                        brs: 2, kol: i + 1, seg: 1, posisina: 'tengah'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 165, left: 280 + (i * besarKotak) + spc,
                        id: ididKlik + 2,
                        brs: 2, kol: i + 1, seg: 2, posisina: 'tengah'
                    },
                    {
                        colour: 'red',
                        width: 30, height: 30,
                        top: 195, left: 250 + (i * besarKotak) + spc,
                        id: ididKlik + 3,
                        brs: 2, kol: i + 1, seg: 3, posisina: 'tengah'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 165, left: 235 + (i * besarKotak) + spc,
                        id: ididKlik + 4,
                        brs: 2, kol: i + 1, seg: 4, posisina: 'tengah'
                    }
                );
                ididKlik = ididKlik + 4
            }


            spc = 520
            //sayur kol 2
            for (var i = 0; i < 2; i++) {

                context.moveTo(235 + (i * besarKotak) + spc, 150);
                context.lineTo(235 + (i * besarKotak) + spc, 210);
                context.lineTo(295 + (i * besarKotak) + spc, 210);
                context.lineTo(295 + (i * besarKotak) + spc, 150);
                context.lineTo(235 + (i * besarKotak) + spc, 150);

                context.moveTo(235 + (i * besarKotak) + spc, 150);
                context.lineTo(250 + (i * besarKotak) + spc, 165);
                context.lineTo(250 + (i * besarKotak) + spc, 195);
                context.lineTo(235 + (i * besarKotak) + spc, 210);

                context.moveTo(250 + (i * besarKotak) + spc, 195);
                context.lineTo(280 + (i * besarKotak) + spc, 195);
                context.lineTo(295 + (i * besarKotak) + spc, 210);

                context.moveTo(280 + (i * besarKotak) + spc, 195);
                context.lineTo(280 + (i * besarKotak) + spc, 165);
                context.lineTo(295 + (i * besarKotak) + spc, 150);

                context.moveTo(280 + (i * besarKotak) + spc, 165);
                context.lineTo(250 + (i * besarKotak) + spc, 165);

                context.stroke();

                context.font = "20px Tahoma";
                context.fillStyle = "black";
                context.fillText(listSrc[idSrc].no, 252 + (i * besarKotak) + spc, 230);

                idSrc = idSrc + 1

                elements.push(
                    {
                        colour: 'red',
                        width: 30, height: 15,
                        top: 150, left: 250 + (i * besarKotak) + spc,
                        id: ididKlik + 1,
                        brs: 2, kol: i + 1, seg: 1, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 165, left: 280 + (i * besarKotak) + spc,
                        id: ididKlik + 2,
                        brs: 2, kol: i + 1, seg: 2, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 30, height: 15,
                        top: 195, left: 250 + (i * besarKotak) + spc,
                        id: ididKlik + 3,
                        brs: 2, kol: i + 1, seg: 3, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 165, left: 235 + (i * besarKotak) + spc,
                        id: ididKlik + 4,
                        brs: 2, kol: i + 1, seg: 4, posisina: 'pinggir'
                    },
                    {
                        colour: 'yellow',
                        width: 30, height: 30,
                        top: 165, left: 250 + (i * besarKotak) + spc,
                        id: ididKlik + 5,
                        brs: 2, kol: i + 1, seg: 5, posisina: 'pinggir'
                    }
                );
                ididKlik = ididKlik + 5
            }

            spc = 0
            //sayur kol 3
            for (var i = 0; i < 2; i++) {

                context.moveTo(235 + (i * besarKotak) + spc, 260);
                context.lineTo(235 + (i * besarKotak) + spc, 320);
                context.lineTo(295 + (i * besarKotak) + spc, 320);
                context.lineTo(295 + (i * besarKotak) + spc, 260);
                context.lineTo(235 + (i * besarKotak) + spc, 260);

                context.moveTo(235 + (i * besarKotak) + spc, 260);
                context.lineTo(250 + (i * besarKotak) + spc, 275);
                context.lineTo(250 + (i * besarKotak) + spc, 305);
                context.lineTo(235 + (i * besarKotak) + spc, 320);

                context.moveTo(250 + (i * besarKotak) + spc, 305);
                context.lineTo(280 + (i * besarKotak) + spc, 305);
                context.lineTo(295 + (i * besarKotak) + spc, 320);

                context.moveTo(280 + (i * besarKotak) + spc, 305);
                context.lineTo(280 + (i * besarKotak) + spc, 275);
                context.lineTo(295 + (i * besarKotak) + spc, 260);

                context.moveTo(280 + (i * besarKotak) + spc, 275);
                context.lineTo(250 + (i * besarKotak) + spc, 275);

                context.stroke();

                context.font = "20px Tahoma";
                context.fillStyle = "black";
                context.fillText(listSrc[idSrc].no, 252 + (i * besarKotak) + spc, 340);

                idSrc = idSrc + 1


                elements.push(
                    {
                        colour: 'red',
                        width: 30, height: 15,
                        top: 260, left: 250 + (i * besarKotak) + spc,
                        id: ididKlik + 1,
                        brs: 3, kol: i + 1, seg: 1, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 275, left: 280 + (i * besarKotak) + spc,
                        id: ididKlik + 2,
                        brs: 3, kol: i + 1, seg: 2, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 30, height: 15,
                        top: 305, left: 250 + (i * besarKotak) + spc,
                        id: ididKlik + 3,
                        brs: 3, kol: i + 1, seg: 3, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 275, left: 235 + (i * besarKotak) + spc,
                        id: ididKlik + 4,
                        brs: 3, kol: i + 1, seg: 4, posisina: 'pinggir'
                    },
                    {
                        colour: 'yellow',
                        width: 30, height: 30,
                        top: 275, left: 250 + (i * besarKotak) + spc,
                        id: ididKlik + 5,
                        brs: 3, kol: i + 1, seg: 5, posisina: 'pinggir'
                    }
                );
                ididKlik = ididKlik + 5
            }
            spc = 130
            //sayur kol 3
            for (var i = 0; i < 6; i++) {

                context.moveTo(235 + (i * besarKotak) + spc, 260);
                context.lineTo(235 + (i * besarKotak) + spc, 320);
                context.lineTo(295 + (i * besarKotak) + spc, 320);
                context.lineTo(295 + (i * besarKotak) + spc, 260);
                context.lineTo(235 + (i * besarKotak) + spc, 260);

                context.lineTo(250 + (i * besarKotak) + spc, 290);
                context.lineTo(235 + (i * besarKotak) + spc, 320);

                context.moveTo(280 + (i * besarKotak) + spc, 290);
                context.lineTo(295 + (i * besarKotak) + spc, 320);


                context.moveTo(280 + (i * besarKotak) + spc, 290);
                context.lineTo(295 + (i * besarKotak) + spc, 260);

                context.moveTo(280 + (i * besarKotak) + spc, 290);
                context.lineTo(250 + (i * besarKotak) + spc, 290);


                context.stroke();

                context.font = "20px Tahoma";
                context.fillStyle = "black";
                context.fillText(listSrc[idSrc].no, 252 + (i * besarKotak) + spc, 340);

                idSrc = idSrc + 1


                elements.push(
                    {
                        colour: 'red',
                        width: 30, height: 30,
                        top: 260, left: 250 + (i * besarKotak) + spc,
                        id: ididKlik + 1,
                        brs: 3, kol: i + 1, seg: 1, posisina: 'tengah'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 275, left: 280 + (i * besarKotak) + spc,
                        id: ididKlik + 2,
                        brs: 3, kol: i + 1, seg: 2, posisina: 'tengah'
                    },
                    {
                        colour: 'red',
                        width: 30, height: 30,
                        top: 305, left: 250 + (i * besarKotak) + spc,
                        id: ididKlik + 3,
                        brs: 3, kol: i + 1, seg: 3, posisina: 'tengah'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 275, left: 235 + (i * besarKotak) + spc,
                        id: ididKlik + 4,
                        brs: 3, kol: i + 1, seg: 4, posisina: 'tengah'
                    }
                );
                ididKlik = ididKlik + 4
            }
            spc = 520
            //sayur kol 3
            for (var i = 0; i < 2; i++) {

                context.moveTo(235 + (i * besarKotak) + spc, 260);
                context.lineTo(235 + (i * besarKotak) + spc, 320);
                context.lineTo(295 + (i * besarKotak) + spc, 320);
                context.lineTo(295 + (i * besarKotak) + spc, 260);
                context.lineTo(235 + (i * besarKotak) + spc, 260);

                context.moveTo(235 + (i * besarKotak) + spc, 260);
                context.lineTo(250 + (i * besarKotak) + spc, 275);
                context.lineTo(250 + (i * besarKotak) + spc, 305);
                context.lineTo(235 + (i * besarKotak) + spc, 320);

                context.moveTo(250 + (i * besarKotak) + spc, 305);
                context.lineTo(280 + (i * besarKotak) + spc, 305);
                context.lineTo(295 + (i * besarKotak) + spc, 320);

                context.moveTo(280 + (i * besarKotak) + spc, 305);
                context.lineTo(280 + (i * besarKotak) + spc, 275);
                context.lineTo(295 + (i * besarKotak) + spc, 260);

                context.moveTo(280 + (i * besarKotak) + spc, 275);
                context.lineTo(250 + (i * besarKotak) + spc, 275);

                context.stroke();

                context.font = "20px Tahoma";
                context.fillStyle = "black";
                context.fillText(listSrc[idSrc].no, 252 + (i * besarKotak) + spc, 340);

                idSrc = idSrc + 1


                elements.push(
                    {
                        colour: 'red',
                        width: 30, height: 15,
                        top: 260, left: 250 + (i * besarKotak) + spc,
                        id: ididKlik + 1,
                        brs: 3, kol: i + 1, seg: 1, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 275, left: 280 + (i * besarKotak) + spc,
                        id: ididKlik + 2,
                        brs: 3, kol: i + 1, seg: 2, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 30, height: 15,
                        top: 305, left: 250 + (i * besarKotak) + spc,
                        id: ididKlik + 3,
                        brs: 3, kol: i + 1, seg: 3, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 275, left: 235 + (i * besarKotak) + spc,
                        id: ididKlik + 4,
                        brs: 3, kol: i + 1, seg: 4, posisina: 'pinggir'
                    },
                    {
                        colour: 'yellow',
                        width: 30, height: 30,
                        top: 275, left: 250 + (i * besarKotak) + spc,
                        id: ididKlik + 5,
                        brs: 3, kol: i + 1, seg: 5, posisina: 'pinggir'
                    }
                );
                ididKlik = ididKlik + 5
            }
            spc = 0
            //sayur kol 4
            for (var i = 0; i < 5; i++) {

                context.moveTo(40 + (i * besarKotak) + spc, 430);
                context.lineTo(100 + (i * besarKotak) + spc, 430);
                context.lineTo(100 + (i * besarKotak) + spc, 370);
                context.lineTo(40 + (i * besarKotak) + spc, 370);
                context.lineTo(40 + (i * besarKotak) + spc, 430);

                context.moveTo(40 + (i * besarKotak) + spc, 370);
                context.lineTo(55 + (i * besarKotak) + spc, 385);
                context.lineTo(55 + (i * besarKotak) + spc, 415);
                context.lineTo(40 + (i * besarKotak) + spc, 430);

                context.moveTo(55 + (i * besarKotak) + spc, 415);
                context.lineTo(85 + (i * besarKotak) + spc, 415);
                context.lineTo(100 + (i * besarKotak) + spc, 430);

                context.moveTo(85 + (i * besarKotak) + spc, 415);
                context.lineTo(85 + (i * besarKotak) + spc, 385);
                context.lineTo(100 + (i * besarKotak) + spc, 370);

                context.moveTo(85 + (i * besarKotak) + spc, 385);
                context.lineTo(55 + (i * besarKotak) + spc, 385);

                context.stroke();

                context.font = "20px Tahoma";
                context.fillStyle = "black";
                context.fillText(listSrc[idSrc].no, 57 + (i * besarKotak) + spc, 450);

                idSrc = idSrc + 1

                elements.push(
                    {
                        colour: 'red',
                        width: 30, height: 15,
                        top: 370, left: 55 + (i * besarKotak) + spc,
                        id: ididKlik + 1,
                        brs: 3, kol: i + 1, seg: 1, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 385, left: 85 + (i * besarKotak) + spc,
                        id: ididKlik + 2,
                        brs: 3, kol: i + 1, seg: 2, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 30, height: 15,
                        top: 415, left: 55 + (i * besarKotak) + spc,
                        id: ididKlik + 3,
                        brs: 3, kol: i + 1, seg: 3, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 385, left: 40 + (i * besarKotak) + spc,
                        id: ididKlik + 4,
                        brs: 3, kol: i + 1, seg: 4, posisina: 'pinggir'
                    },
                    {
                        colour: 'yellow',
                        width: 30, height: 30,
                        top: 385, left: 55 + (i * besarKotak) + spc,
                        id: ididKlik + 5,
                        brs: 3, kol: i + 1, seg: 5, posisina: 'pinggir'
                    }
                );
                ididKlik = ididKlik + 5

            }
            spc = 325
            //sayur kol TENGAH KA 4
            for (var i = 0; i < 6; i++) {

                context.moveTo(40 + (i * besarKotak) + spc, 430);
                context.lineTo(100 + (i * besarKotak) + spc, 430);
                context.lineTo(100 + (i * besarKotak) + spc, 370);
                context.lineTo(40 + (i * besarKotak) + spc, 370);
                context.lineTo(40 + (i * besarKotak) + spc, 430);


                context.lineTo(55 + (i * besarKotak) + spc, 400);
                context.lineTo(40 + (i * besarKotak) + spc, 370);

                context.moveTo(85 + (i * besarKotak) + spc, 400);
                context.lineTo(100 + (i * besarKotak) + spc, 430);

                context.moveTo(85 + (i * besarKotak) + spc, 400);
                context.lineTo(100 + (i * besarKotak) + spc, 370);


                context.moveTo(85 + (i * besarKotak) + spc, 400);
                context.lineTo(55 + (i * besarKotak) + spc, 400);

                context.stroke();

                context.font = "20px Tahoma";
                context.fillStyle = "black";
                context.fillText(listSrc[idSrc].no, 57 + (i * besarKotak) + spc, 450);

                idSrc = idSrc + 1

                elements.push(
                    {
                        colour: 'red',
                        width: 30, height: 30,
                        top: 370, left: 55 + (i * besarKotak) + spc,
                        id: ididKlik + 1,
                        brs: 3, kol: i + 1, seg: 1, posisina: 'tengah'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 385, left: 85 + (i * besarKotak) + spc,
                        id: ididKlik + 2,
                        brs: 3, kol: i + 1, seg: 2, posisina: 'tengah'
                    },
                    {
                        colour: 'red',
                        width: 30, height: 30,
                        top: 415, left: 55 + (i * besarKotak) + spc,
                        id: ididKlik + 3,
                        brs: 3, kol: i + 1, seg: 3, posisina: 'tengah'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 385, left: 40 + (i * besarKotak) + spc,
                        id: ididKlik + 4,
                        brs: 3, kol: i + 1, seg: 4, posisina: 'tengah'
                    }
                );
                ididKlik = ididKlik + 4

            }
            spc = 715
            //sayur kol 4
            for (var i = 0; i < 5; i++) {

                context.moveTo(40 + (i * besarKotak) + spc, 430);
                context.lineTo(100 + (i * besarKotak) + spc, 430);
                context.lineTo(100 + (i * besarKotak) + spc, 370);
                context.lineTo(40 + (i * besarKotak) + spc, 370);
                context.lineTo(40 + (i * besarKotak) + spc, 430);

                context.moveTo(40 + (i * besarKotak) + spc, 370);
                context.lineTo(55 + (i * besarKotak) + spc, 385);
                context.lineTo(55 + (i * besarKotak) + spc, 415);
                context.lineTo(40 + (i * besarKotak) + spc, 430);

                context.moveTo(55 + (i * besarKotak) + spc, 415);
                context.lineTo(85 + (i * besarKotak) + spc, 415);
                context.lineTo(100 + (i * besarKotak) + spc, 430);

                context.moveTo(85 + (i * besarKotak) + spc, 415);
                context.lineTo(85 + (i * besarKotak) + spc, 385);
                context.lineTo(100 + (i * besarKotak) + spc, 370);

                context.moveTo(85 + (i * besarKotak) + spc, 385);
                context.lineTo(55 + (i * besarKotak) + spc, 385);

                context.stroke();

                context.font = "20px Tahoma";
                context.fillStyle = "black";
                context.fillText(listSrc[idSrc].no, 57 + (i * besarKotak) + spc, 450);

                idSrc = idSrc + 1

                elements.push(
                    {
                        colour: 'red',
                        width: 30, height: 15,
                        top: 370, left: 55 + (i * besarKotak) + spc,
                        id: ididKlik + 1,
                        brs: 3, kol: i + 1, seg: 1, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 385, left: 85 + (i * besarKotak) + spc,
                        id: ididKlik + 2,
                        brs: 3, kol: i + 1, seg: 2, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 30, height: 15,
                        top: 415, left: 55 + (i * besarKotak) + spc,
                        id: ididKlik + 3,
                        brs: 3, kol: i + 1, seg: 3, posisina: 'pinggir'
                    },
                    {
                        colour: 'red',
                        width: 15, height: 30,
                        top: 385, left: 40 + (i * besarKotak) + spc,
                        id: ididKlik + 4,
                        brs: 3, kol: i + 1, seg: 4, posisina: 'pinggir'
                    },
                    {
                        colour: 'yellow',
                        width: 30, height: 30,
                        top: 385, left: 55 + (i * besarKotak) + spc,
                        id: ididKlik + 5,
                        brs: 3, kol: i + 1, seg: 5, posisina: 'pinggir'
                    }
                );
                ididKlik = ididKlik + 5

            }

            function isiColor(element) {
                if (typeIsian == "selai") {
                    if (element.posisina == 'pinggir') {
                        if (element.seg == 1) {
                            context.beginPath();
                            context.moveTo(element.left - 15, element.top);
                            context.lineTo(element.left - 15 + 60, element.top);
                            context.lineTo(element.left - 15 + 60 - 15, element.top + 15);
                            context.lineTo(element.left - 15 + 60 - 15 - 30, element.top + 15);
                            context.lineTo(element.left - 15, element.top);
                            context.closePath();
                            context.lineWidth = "1";
                            context.strokeStyle = "black";
                            context.stroke();
                            context.fillStyle = isianColor;
                            context.fill();
                        }
                        if (element.seg == 2) {
                            context.beginPath();
                            context.moveTo(element.left + 15, element.top - 15);
                            context.lineTo(element.left + 15, element.top - 15 + 60);
                            context.lineTo(element.left + 15 - 15, element.top - 15 + 60 - 15);
                            context.lineTo(element.left + 15 - 15, element.top - 15 + 60 - 15 - 30);
                            context.lineTo(element.left + 15, element.top - 15);
                            context.closePath();
                            context.lineWidth = "1";
                            context.strokeStyle = "black";
                            context.stroke();
                            context.fillStyle = isianColor;
                            context.fill();
                        }
                        if (element.seg == 3) {
                            context.beginPath();
                            context.moveTo(element.left - 15, element.top + 15);
                            context.lineTo(element.left, element.top);
                            context.lineTo(element.left + 30, element.top);
                            context.lineTo(element.left + 30 + 15, element.top + 15);
                            context.lineTo(element.left - 15, element.top + 15);
                            context.closePath();
                            context.lineWidth = "1";
                            context.strokeStyle = "black";
                            context.stroke();
                            context.fillStyle = isianColor;
                            context.fill();
                        }
                        if (element.seg == 4) {
                            context.beginPath();
                            context.moveTo(element.left, element.top - 15);
                            context.lineTo(element.left + 15, element.top - 15 + 15);
                            context.lineTo(element.left + 15, element.top - 15 + 15 + 30);
                            context.lineTo(element.left + 15 - 15, element.top - 15 + 15 + 30 + 15);
                            context.lineTo(element.left, element.top - 15);
                            context.closePath();
                            context.lineWidth = "1";
                            context.strokeStyle = "black";
                            context.stroke();
                            context.fillStyle = isianColor;
                            context.fill();
                        }
                        if (element.seg == 5) {
                            context.beginPath();
                            context.moveTo(element.left, element.top);
                            context.lineTo(element.left + 30, element.top);
                            context.lineTo(element.left + 30, element.top + 30);
                            context.lineTo(element.left, element.top + 30);
                            context.lineTo(element.left, element.top);
                            context.closePath();
                            context.lineWidth = "1";
                            context.strokeStyle = "black";
                            context.stroke();
                            context.fillStyle = isianColor;
                            context.fill();
                        }
                    }
                    if (element.posisina == 'tengah') {
                        if (element.seg == 1) {
                            context.beginPath();
                            context.moveTo(element.left - 15, element.top);
                            context.lineTo(element.left - 15 + 60, element.top);
                            context.lineTo(element.left - 15 + 60 - 15, element.top + 30);
                            context.lineTo(element.left - 15 + 60 - 15 - 30, element.top + 30);
                            context.lineTo(element.left - 15, element.top);
                            context.closePath();
                            context.lineWidth = "1";
                            context.strokeStyle = "black";
                            context.stroke();
                            context.fillStyle = isianColor;
                            context.fill();
                        }
                        if (element.seg == 2) {
                            context.beginPath();
                            context.moveTo(element.left + 15, element.top - 15);
                            context.lineTo(element.left + 15, element.top - 15 + 60);
                            context.lineTo(element.left + 15 - 15, element.top - 15 + 60 - 30);
                            context.lineTo(element.left + 15, element.top - 15);
                            context.closePath();
                            context.lineWidth = "1";
                            context.strokeStyle = "black";
                            context.stroke();
                            context.fillStyle = isianColor;
                            context.fill();
                        }
                        if (element.seg == 3) {
                            context.beginPath();
                            context.moveTo(element.left - 15, element.top + 15);
                            context.lineTo(element.left, element.top - 15);
                            context.lineTo(element.left + 30, element.top - 15);
                            context.lineTo(element.left + 30 + 15, element.top + 15);
                            context.lineTo(element.left - 15, element.top + 15);
                            context.closePath();
                            context.lineWidth = "1";
                            context.strokeStyle = "black";
                            context.stroke();
                            context.fillStyle = isianColor;
                            context.fill();
                        }
                        if (element.seg == 4) {
                            context.beginPath();
                            context.moveTo(element.left, element.top - 15);
                            context.lineTo(element.left + 15, element.top + 15);

                            context.lineTo(element.left + 15 - 15, element.top - 15 + 15 + 30 + 15);
                            context.lineTo(element.left, element.top - 15);
                            context.closePath();
                            context.lineWidth = "1";
                            context.strokeStyle = "black";
                            context.stroke();
                            context.fillStyle = isianColor;
                            context.fill();
                        }

                    }
                    element.type = typeIsian
                    element.color = isianColor
                }
                if (element.seg == 5 && typeIsian != "selai" && element.posisina == 'pinggir') {
                    if (typeIsian == "UE") {
                        context.font = "20px Tahoma";
                        context.fillStyle = "black";
                        context.fillText("UE", element.left + 3, element.top + 24);
                    }
                    if (typeIsian == "PE") {
                        context.font = "20px Tahoma";
                        context.fillStyle = "black";
                        context.fillText("PE", element.left + 3, element.top + 24);
                    }
                    if (typeIsian == "A") {
                        context.font = "20px Tahoma";
                        context.fillStyle = "green";
                        context.fillText("A", element.left + 8, element.top + 24);
                    }
                    if (typeIsian == "/") {
                        context.font = "25px Tahoma";
                        context.fillStyle = "red";
                        context.fillText("/", element.left + 10, element.top + 24);
                    }
                    if (typeIsian == "SisaAkar") {
                        context.font = "25px Tahoma";
                        context.fillStyle = "blue";
                        context.fillText("√", element.left + 4, element.top + 27);
                    }
                    if (typeIsian == "gigiHilang") {
                        context.font = "35px Tahoma";
                        context.fillStyle = "Red";
                        context.fillText("X", element.left + 3, element.top + 28);
                    }
                    if (typeIsian == "Jembatan") {
                        context.beginPath();
                        context.lineWidth = "7";
                        context.strokeStyle = "green";
                        context.moveTo(element.left + 2, element.top + 20);
                        context.lineTo(element.left + 28, element.top + 20);
                        context.stroke();
                    }
                    if (typeIsian == "GigiTiruanLepas") {
                        context.beginPath();
                        context.lineWidth = "7";
                        context.strokeStyle = "#EED63F";
                        context.moveTo(element.left + 2, element.top + 20);
                        context.lineTo(element.left + 28, element.top + 20);
                        context.stroke();
                    }
                    element.type = typeIsian
                    element.color = "black"
                }
                if (element.type != '') {
                    if (element.type != 'white') {

                        for (var i = data2.length - 1; i >= 0; i--) {
                            if (element.id == data2[i].id) {
                                data2.splice(i, 1)
                            }

                        }
                        data2.push(element)
                    }
                }

            }
            $scope.kliknol = function (data) {
                data.src = "images/odontogram/1.jpg"
            }


        }
    ]);
});