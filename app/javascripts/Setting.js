define([], function () {
    'use strict';
    if (window.location.hostname.indexOf('transmedic') > -1 ) {
        return { 

            // BaseUrl: 'http://transmedic.co.id:3333/app/data/GetRouting',
            // RouteUrl: 'http://transmedic.co.id:3333/app/data/GetRouting',
            UrlDataConfig: 'http://transmedic.co.id:3333/app/data/GetRequireConfig',         
            urlSocket: 'http://transmedic.co.id:3333',
            baseUrlData: "http://transmedic.co.id:3333/app/data/",         
            urlRoute: 'http://transmedic.co.id:3333/app/data/GetRouting',
            urlRoutePelayanan: 'http://transmedic.co.id:3333/app/data/GetRoutingPelayanan',
            urlRouteSarpras: 'http://transmedic.co.id:3333/app/data/GetRoutingSarpras',
            urlRouteKeuangan: 'http://transmedic.co.id:3333/app/data/GetRoutingKeuangan',
            urlRouteManagemen: 'http://transmedic.co.id:3333/app/data/GetRoutingManagemen',
            urlRouteSDM: 'http://transmedic.co.id:3333/app/data/GetRoutingSDM',

         
            baseUrlLogin: "http://transmedic.co.id:8300/service/transdata/get-signature",
            baseUrlLogout: "http://transmedic.co.id:8300/service/transdata/get-signature",
            baseApiBackend: 'http://transmedic.co.id:8300/service/transdata/',
            baseProfileMenu: 1, 

            rabbitMQHost: 'amqp://rsab:rsab@localhost'

        };
    } else if ( window.location.hostname.indexOf('bpjs') > -1) {
        return { 

            // BaseUrl: 'http://transmedic.co.id:3333/app/data/GetRouting',
            // RouteUrl: 'http://transmedic.co.id:3333/app/data/GetRouting',
            UrlDataConfig: 'http://bpjs-jkn.com:3333/app/data/GetRequireConfig',         
            urlSocket: 'http://bpjs-jkn.com:3333',
            baseUrlData: "http://bpjs-jkn.com:3333/app/data/",         
            urlRoute: 'http://bpjs-jkn.com:3333/app/data/GetRouting',
            urlRoutePelayanan: 'http://bpjs-jkn.com:3333/app/data/GetRoutingPelayanan',
            urlRouteSarpras: 'http://bpjs-jkn.com:3333/app/data/GetRoutingSarpras',
            urlRouteKeuangan: 'http://bpjs-jkn.com:3333/app/data/GetRoutingKeuangan',
            urlRouteManagemen: 'http://bpjs-jkn.com:3333/app/data/GetRoutingManagemen',
            urlRouteSDM: 'http://bpjs-jkn.com:3333/app/data/GetRoutingSDM',

         
            baseUrlLogin: "http://bpjs-jkn.com:8300/service/transdata/get-signature",
            baseUrlLogout: "http://bpjs-jkn.com:8300/service/transdata/get-signature",
            baseApiBackend: 'http://bpjs-jkn.com:8300/service/transdata/',
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