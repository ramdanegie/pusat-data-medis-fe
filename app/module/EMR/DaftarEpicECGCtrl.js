define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarEpicECGCtrl', ['$q', '$rootScope', '$scope', 'MedifirstService', '$state', 'CacheHelper', '$window', '$location',
        function ($q, $rootScope, $scope, medifirstService, $state, cacheHelper, $window, $location) {
            // if( window.location.href != $location.$$absUrl ){
            //     window.location.href= $location.$$absUrl
            //     window.location.reload()  
            // }

            $scope.item = {};
            $scope.dataVOloaded = false;
            $scope.now = new Date();
            var norec_apd = ''
            var norec_pd = ''
            var nocm_str = ''
            $scope.item.qty = 1
            $scope.riwayatForm = false
            $scope.inputOrder = true
            $scope.CmdOrderPelayanan = true;
            $scope.OrderPelayanan = false;
            $scope.showTombol = false
            var dokter = '';
            var idUser = '';
            var data2 = [];
            $scope.PegawaiLogin2 = {};
            var namaRuangan = ''
            var namaRuanganFk = ''
            var detail = ''
            var x = 0;
            var y = 0;
            var cardio_lead_vis = false;
            var dataxml = ''


            //{//load kotak-kotak tea as@epic 2019-03-07
            // function ecganyar(){
            var elem = document.getElementById('myCanvas'),
                elemLeft = elem.offsetLeft,
                elemTop = elem.offsetTop,
                context = elem.getContext('2d'),
                elements = [],
                dragging = false,
                lastX = 0,
                translated = 0;

            context.scale(1, -1);
            context.translate(0, -450);
            //     // Add event listener for `click` events.
            elem.addEventListener('click', function (event) {
                x = event.pageX - elemLeft,
                    y = event.pageY - elemTop;
                // console.log(x, y);
                // elements.forEach(function(element) {
                //     if (y > element.top + 165 && y < element.top + 165 + element.height && x > element.left && x < element.left + element.width) {
                //         isiColor(element)
                //     }
                // });

            }, false);
            elem.onmousedown = function (e) {
                var evt = e || event;
                dragging = true;
                lastX = evt.offsetX;
            }
            elem.addEventListener('click', function (event) {
                x = event.pageX - elemLeft,
                    y = event.pageY - elemTop;

            }, false);
            // }


            window.onmousemove = function (e) {
                var evt = e || event;
                if (dragging) {
                    var delta = evt.offsetX - lastX;
                    translated += delta;
                    context.translate(delta, 0);
                    lastX = evt.offsetX;
                    draw();
                }
            }

            window.onmouseup = function () {
                dragging = false;
            }

            function draw() {
                context.clearRect(-translated, 0, 1300, 450);
                var x_normal;
                // medifirstService.get('emr/get-data-ecg-epic?custid=' + $scope.item.noMr).then(function (e) {
                // let dataxml = ''
                // for (var i = 0; i < e.data.data.length; i++) {
                //     if (e.data.data[i].kunci == "xmlframe") {
                //         dataxml = dataxml + e.data.data[i].nilai
                //     }
                // }
                kotakabu()
                garisKeras()

                // });
                // for (var i = 0; i < plot.length; i++){
                //   context.beginPath();
                //   context.arc(plot[i].x, plot[i].y, 5, 0, 2*Math.PI);
                //   context.fill();
                // }
            }
            // var plot = [
            //   {x:50, y:100},
            //   {x:200, y:200},
            //   {x:400, y:300},
            //   {x:500, y:190}
            // ];

            draw();

            //     // Add event listener for `click` events.

            kotakabu()
            function kotakabu() {
                var grid_size = 175 / 8;
                var tiny_grid_size = 175 / 8 / 5;

                var grid_hor_cnt = 4000 / grid_size;
                var tiny_grid_hor_cnt = 4000 / tiny_grid_size;

                // var grid_size = 210/8;
                // var tiny_grid_size = grid_size/5;

                // var grid_hor_cnt = 4000/grid_size;
                // var tiny_grid_hor_cnt = 4000/tiny_grid_size;

                context.fillStyle = 'rgb(255,255,255)';
                context.fillRect(0, 0, 4000, 175);

                context.beginPath();
                var i = 0;
                for (i = 0; i <= 8 + 4; i++) {
                    context.moveTo(0, i * grid_size);
                    context.lineTo(4000, i * grid_size);
                }
                for (i = 0; i <= grid_hor_cnt; i++) {
                    context.moveTo(i * grid_size, 0);
                    context.lineTo(i * grid_size, 175 + 90);
                }
                context.strokeStyle = 'rgba(16, 74, 168, 1)';
                context.lineWidth = 1;
                context.stroke();

                context.beginPath();
                for (i = 0; i <= 40 + 20; i++) {
                    context.moveTo(0, i * tiny_grid_size);
                    context.lineTo(4000, i * tiny_grid_size);
                }
                for (i = 0; i <= tiny_grid_hor_cnt; i++) {
                    context.moveTo(i * tiny_grid_size, 0);
                    context.lineTo(i * tiny_grid_size, 175 + 90);
                }
                context.strokeStyle = 'rgba(138, 179, 244, 5)';
                context.lineWidth = 1;
                context.stroke();


                // context.beginPath();
                // context.moveTo(0,130+6-10);
                // context.lineTo(4000,130+6-10);
                // context.strokeStyle = 'rgba(237, 12, 27, 1)';
                // context.lineWidth = 2;
                // context.stroke();

                // context.beginPath();
                // context.moveTo(0,130+6-65);
                // context.lineTo(4000,130+6-65);
                // context.strokeStyle = 'rgba(17, 255, 0, 1)';
                context.lineWidth = 2;
                // context.stroke();
            }
            function garisKeras() {
                var x_normal;
                let hasil = ''
                let dt = ''
                for (var i = 0; i < dataxml.length; i++) {
                    if (i > 0) {
                        if (i % 4 == 0) {
                            hasil = parseInt(dataxml.substring(i - 4, i), 16);
                            dt = dt + ',' + hasil
                        }
                    }
                }
                var data2 = 'EPI' + dt;
                var res = data2.split(",");
                if (res[0] == 'ART')
                    x_normal = -1;
                else
                    x_normal = get_normal_curve(res, context);

                i = 1;

                context.beginPath();
                context.moveTo(22 + Math.round(1), (parseInt(res[i]) / 4) - 180 + 190);

                while (i < res.length) {
                    draw_point(context, 22 + Math.round(i * 1), (parseInt(res[i]) / 4) - 180 + 190);
                    i++;
                }

                context.strokeStyle = 'RGB(0,0,0)';
                context.stroke();
            }


            function convertCanvasToImage(canvas) {
                var image = new Image();
                image.src = canvas.toDataURL("image/png");
                return image;
            }
            function draw_point(ctx, x, y) {
                ctx.lineTo(x, y);
            }
            function GetPointElm(e, tc, lc) {
                return { Y: e.pageY - tc, X: e.pageX - lc };
            }






            function get_normal_curve(_data, _ctx) {

                var prev = 0;
                var x_peak = -1;
                var first_peak = -1;
                var amp = -999999;
                var peak_val = 0;
                var finish_peak = false;
                var ever_peak = false;
                var val;
                var peak_point = 0;
                var max_val = -999999;
                var direction;
                var cnt_eq = 0;
                var get_normal = false;
                var last_peak = 0;
                var ecg_points = [];
                var i = 0


                i = 10;
                var array_delta = [];
                val = 0;

                while (i < _data.length) {
                    val = Math.abs(_data[i] - prev);

                    if (val > max_val) {
                        max_val = val;

                        if (_data[i] > prev)
                            direction = 1;
                        else
                            direction = -1;
                    }

                    if (array_delta.indexOf(val) == -1)
                        array_delta.push(val);

                    prev = _data[i];
                    i++;
                }

                array_delta.sort();

                peak_point = array_delta[Math.round(array_delta.length / 8)];


                i = 10;
                val = 0;

                while (i < _data.length) {


                    val = Math.abs(_data[i] - prev);

                    if ((val <= peak_point) && (finish_peak == false)) {
                        peak_val = 0;

                        finish_peak = true;
                    }
                    else if ((val > peak_point) && (i - last_peak > 10)) {
                        ever_peak = true;
                        finish_peak = false;

                        if ((val > peak_val) && (((_data[i] > prev) && (direction == 1)) || ((_data[i] < prev) && (direction == -1)))) {

                            peak_val = val;
                            x_peak = i;
                        }
                    }

                    if ((finish_peak == true) && (ever_peak == true) && (x_peak != -1)) {
                        ever_peak = false;

                        if ((Math.abs(amp - _data[x_peak]) <= 10)) {
                            last_peak = x_peak;
                            cnt_eq++;
                            amp = ecg_points[x_peak];
                        }
                        else {
                            cnt_eq = 0;
                            first_peak = x_peak;
                            amp = ecg_points[x_peak];
                            x_peak = -1;
                        }


                        if ((x_peak != -1) && (cnt_eq > 3
                        )) {
                            get_normal = true;
                            /*
                            _ctx.beginPath();
                            _ctx.moveTo(35+Math.round(first_peak*1.1),0);
                            _ctx.lineTo(35+Math.round(first_peak*1.1),180);
                            _ctx.strokeStyle = 'RGB(0,0,255)';
                            _ctx.stroke();
                            */
                            break
                        }

                    }



                    prev = _data[i];
                    i++;
                }

                if (get_normal == true)
                    return first_peak;
                else return -1;
            }






            function isikeunColor() {
                medifirstService.get('emr/get-data-ecg-epic?custid=' + $scope.item.noMr + '&vis=true').then(function (e) {
                    // let dataxml = ''
                    for (var i = 0; i < e.data.data.length; i++) {
                        if (e.data.data[i].kunci == "xmlframe") {
                            dataxml = dataxml + e.data.data[i].nilai
                        }
                        if (e.data.data[i].kunci == "NoOfBytesPerFrame") {
                            $scope.item.NoOfBytesPerFrame = e.data.data[i].nilai
                        }
                        if (e.data.data[i].kunci == "MobilePhoneNo") {
                            $scope.item.MobilePhoneNo = e.data.data[i].nilai
                        }
                        if (e.data.data[i].kunci == "PhoneIMSINo") {
                            $scope.item.PhoneIMSINo = e.data.data[i].nilai
                        }
                        if (e.data.data[i].kunci == "CustomerID") {
                            $scope.item.CustomerID = e.data.data[i].nilai
                        }
                        // if (e.data.data[i].kunci == "Date") {
                        //     $scope.item.Date = e.data.data[i].nilai
                        // }
                        // if (e.data.data[i].kunci == "ecgTime") {
                        //     $scope.item.Date = $scope.item.Date + ' ' + e.data.data[i].nilai
                        // }
                        $scope.item.Date = e.data.data[i].datesend
                        if (e.data.data[i].kunci == "SignalStrength") {
                            $scope.item.SignalStrength = e.data.data[i].nilai
                        }
                        if (e.data.data[i].kunci == "SampleRate") {
                            $scope.item.SampleRate = e.data.data[i].nilai
                        }
                        if (e.data.data[i].kunci == "HeartBeat") {
                            $scope.item.HeartBeat = e.data.data[i].nilai
                        }
                        if (e.data.data[i].kunci == "expertise") {
                            $scope.item.expertise = e.data.data[i].nilai
                        }
                    }
                    garisKeras()


                    // let hasil = ''
                    // let dt = ''
                    // for (var i = 0; i < dataxml.length; i++) {
                    //     if (i > 0){
                    //         if (i % 4 == 0){
                    //             hasil = parseInt(dataxml.substring(i-4, i), 16);
                    //             dt = dt + ',' + hasil
                    //         }
                    //     }
                    // }
                    // var data2 = 'EPI' + dt;
                    // var res = data2.split(",");
                    // if (res[0] == 'ART')
                    //     x_normal = -1;
                    // else 
                    //     x_normal = get_normal_curve(res,context);

                    // i = 1;

                    // context.beginPath();
                    // context.moveTo(22+Math.round(1),180+70-(parseInt(res[i])/4));

                    // while (i < res.length) {
                    //         draw_point(context,22+Math.round(i*1),180+70-(parseInt(res[i])/4));
                    //     i++;
                    // }

                    // context.strokeStyle = 'RGB(0,0,0)';
                    // context.stroke();
                });

            }

            LoadCacheHelper();
            function LoadCacheHelper() {
                var chacePeriode = cacheHelper.get('OdontoGramDokterCtrl');
                if (chacePeriode != undefined) {
                    $scope.item.noMr = chacePeriode[0]
                    nocm_str = chacePeriode[0]
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

                    $scope.dat2Head = chacePeriode

                    if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                        $scope.showTombol = true
                    }

                }
                isikeunColor()
                medifirstService.get("emr/get-daftar-ecg-epic").then(function (data) {
                    $scope.sourceKomponens = data.data;
                    // $scope.popupKomponen.center().open();

                });
            }
            $scope.RefreshLoadDataECG = function () {
                medifirstService.get("emr/get-daftar-ecg-epic").then(function (data) {
                    $scope.sourceKomponens = data.data;
                    // $scope.popupKomponen.center().open();

                });
            }
            $scope.loadECG = function () {

                // medifirstService.get("emr/get-daftar-ecg-epic?custid=" + $scope.item.noMr).then(function(data){
                //         $scope.sourceKomponens = data.data;
                //         $scope.popupKomponen.center().open();

                // });
            }
            $scope.tutupPOPupECG = function () {

                $scope.popupKomponen.center().close();
            }
            function LoadDataECG(e) {
                context.clearRect(0, 0, myCanvas.width, myCanvas.height);
                kotakabu()
                $scope.item.tglecgpilih = e.datesend
                $scope.item.customerid = e.customerid
                $scope.item.norm = e.customerid
                medifirstService.get('emr/get-data-ecg-epic?datesend=' + e.datesend).then(function (e) {
                    dataxml = ''
                    $scope.item.expertise = ''
                    for (var i = 0; i < e.data.data.length; i++) {
                        if (e.data.data[i].kunci == "xmlframe") {
                            dataxml = dataxml + e.data.data[i].nilai
                        }
                        if (e.data.data[i].kunci == "NoOfBytesPerFrame") {
                            $scope.item.NoOfBytesPerFrame = e.data.data[i].nilai
                        }
                        if (e.data.data[i].kunci == "MobilePhoneNo") {
                            $scope.item.MobilePhoneNo = e.data.data[i].nilai
                        }
                        if (e.data.data[i].kunci == "PhoneIMSINo") {
                            $scope.item.PhoneIMSINo = e.data.data[i].nilai
                        }
                        if (e.data.data[i].kunci == "CustomerID") {
                            $scope.item.CustomerID = e.data.data[i].nilai
                        }
                        // if (e.data.data[i].kunci == "Date") {
                        //     $scope.item.Date = e.data.data[i].nilai
                        // }
                        // $scope.item.Date = ''
                        // if (e.data.data[i].kunci == "ecgTime") {
                        $scope.item.Date = e.data.data[i].datesend
                        // }
                        if (e.data.data[i].kunci == "SignalStrength") {
                            $scope.item.SignalStrength = e.data.data[i].nilai
                        }
                        if (e.data.data[i].kunci == "SampleRate") {
                            $scope.item.SampleRate = e.data.data[i].nilai
                        }
                        if (e.data.data[i].kunci == "HeartBeat") {
                            $scope.item.HeartBeat = e.data.data[i].nilai
                        }
                        if (e.data.data[i].kunci == "expertise") {
                            $scope.item.expertise = e.data.data[i].nilai
                        }
                    }
                    garisKeras()
                });
            }

            $scope.save = function () {
                var objHead = {}
                objHead = {
                    'customerid': $scope.item.norm,
                    'expertise': $scope.item.expertise,
                    'datesend': $scope.item.tglecgpilih
                }
                var objsave = {}
                objsave = {
                    'head': objHead
                }
                //postpost
                medifirstService.post('emr/save-data-ecg', objsave).then(function (e) {

                });
            }
            $scope.columnKomponens = [

                {
                    "field": "datesend",
                    "title": "Tanggal",
                    "width": "80px"//,
                    // "template": "<span class='style-left'>{{formatTanggal('#: datesend #')}}</span>"
                }
                // ,
                // {
                //     "template": "<button class='k-button' ng-click='LoadDataECG()'' >Load</button>",
                //     "width": 40
                // }
                // ,
                // {
                //     "field": "customerid",
                //     "title": "customerid",
                //     "width" : "0px"
                // }

            ];
            $scope.klikKomponen = function (dataSelectedKomponen) {
                LoadDataECG(dataSelectedKomponen)
            }
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }

            // function init() { 

            //     var client = new HttpClient();
            //     client.get('http://127.0.0.1:1237/formvb/rawat-jalan?form-odontogram'+'&norec_apd='+norec_apd+'&DokterId='+dokter+'&idUser='+idUser, function (response) {
            //         // do something with response
            //     });
            // }

            // $scope.formatTanggal = function(tanggal){
            //     return moment(tanggal).format('DD-MMM-YYYY');
            // }

            // $scope.formatRupiah = function(value, currency) {
            //     return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            // }


            //***********************************

        }
    ]);
});

// http://127.0.0.1:1237/printvb/farmasiApotik?cetak-label-etiket=1&norec=6a287c10-8cce-11e7-943b-2f7b4944&cetak=1