define([], function () {
    'use strict';
    if (window.location.hostname.indexOf('transmedic') > -1 || window.location.hostname.indexOf('bpjs') > -1) {
        return { 

            // BaseUrl: 'http://transmedic.co.id:3333/app/data/GetRouting',
            // RouteUrl: 'http://transmedic.co.id:3333/app/data/GetRouting',
            UrlDataConfig: 'http://203.210.84.2:3333/app/data/GetRequireConfig',         
            urlSocket: 'http://203.210.84.2:3333',
            baseUrlData: "http://203.210.84.2:3333/app/data/",         
            urlRoute: 'http://203.210.84.2:3333/app/data/GetRouting',
            urlRoutePelayanan: 'http://203.210.84.2:3333/app/data/GetRoutingPelayanan',
            urlRouteSarpras: 'http://203.210.84.2:3333/app/data/GetRoutingSarpras',
            urlRouteKeuangan: 'http://203.210.84.2:3333/app/data/GetRoutingKeuangan',
            urlRouteManagemen: 'http://203.210.84.2:3333/app/data/GetRoutingManagemen',
            urlRouteSDM: 'http://203.210.84.2:3333/app/data/GetRoutingSDM',

         
            baseUrlLogin: "http://203.210.84.2:8300/service/transdata/get-signature",
            baseUrlLogout: "http://203.210.84.2:8300/service/transdata/get-signature",
            baseApiBackend: 'http://203.210.84.2:8300/service/transdata/',
            baseProfileMenu: 1, 

            rabbitMQHost: 'amqp://rsab:rsab@localhost'

        };
    } else if (window.location.hostname.indexOf('localhost') > -1) {
        return { 

            // BaseUrl: 'http://localhost:3333/app/data/GetRouting',
            // RouteUrl: 'http://localhost:3333/app/data/GetRouting',
            UrlDataConfig: 'http://localhost:3333/app/data/GetRequireConfig',         
            urlSocket: 'http://localhost:3333',
            baseUrlData: "http://localhost:3333/app/data/",         
            urlRoute: 'http://localhost:3333/app/data/GetRouting',
            urlRoutePelayanan: 'http://localhost:3333/app/data/GetRoutingPelayanan',
            urlRouteSarpras: 'http://localhost:3333/app/data/GetRoutingSarpras',
            urlRouteKeuangan: 'http://localhost:3333/app/data/GetRoutingKeuangan',
            urlRouteManagemen: 'http://localhost:3333/app/data/GetRoutingManagemen',
            urlRouteSDM: 'http://localhost:3333/app/data/GetRoutingSDM',

            baseUrlLogin: "http://localhost:8000/service/transdata/get-signature",
            baseUrlLogout: "http://localhost:8000/service/transdata/get-signature",
            baseApiBackend: 'http://localhost:8000/service/transdata/',
            baseProfileMenu: 1, 

            rabbitMQHost: 'amqp://rsab:rsab@localhost'

        };
   
    } else {
        return {

            UrlDataConfig: 'http://172.20.1.13:3333/app/data/GetRequireConfig',         
            urlSocket: 'http://172.20.1.13:3333',
            baseUrlData: "http://172.20.1.13:3333/app/data/",         
            urlRoute: 'http://172.20.1.13:3333/app/data/GetRouting',
            urlRoutePelayanan: 'http://172.20.1.13:3333/app/data/GetRoutingPelayanan',
            urlRouteSarpras: 'http://172.20.1.13:3333/app/data/GetRoutingSarpras',
            urlRouteKeuangan: 'http://172.20.1.13:3333/app/data/GetRoutingKeuangan',
            urlRouteManagemen: 'http://172.20.1.13:3333/app/data/GetRoutingManagemen',
            urlRouteSDM: 'http://172.20.1.13:3333/app/data/GetRoutingSDM',

           baseUrlLogin: "http://172.20.1.13:8300/service/transdata/get-signature",
            baseUrlLogout: "http://172.20.1.13:8300/service/transdata/get-signature",
            baseApiBackend: 'http://172.20.1.13:8300/service/transdata/',
            baseProfileMenu: 1, 

            rabbitMQHost: 'amqp://rsab:rsab@localhost'

        };
    }
});