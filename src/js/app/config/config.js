/**
 * Created by snopp_000 on 30.10.2014.
 */
require.config({
    baseUrl:"./js/app",
    paths:{
        // Core Libraries
        "jquery":"../libs/jquery",
        //"jqueryui":"../libs/jqueryui",
        //"jquerymobile":"../libs/jquery.mobile",
        "underscore":"../libs/underscore",
        "backbone":"../libs/backbone",
        "marionette":"../libs/backbone.marionette",
        "handlebars":"../libs/handlebars.runtime",
        "jasmine": "../libs/jasmine",
        "jasmine-html": "../libs/jasmine-html"
    },
    shim:{

        underscore : {
            exports : "_"
        },
        backbone : {
            deps    : [ "jquery", "underscore" ],
            exports : "Backbone"
        },
        handlebars : {
            exports : "Handlebars"
        },
        "marionette":{
            "deps":["underscore", "backbone", "jquery"],
            "exports":"Marionette"
        }
    }
});