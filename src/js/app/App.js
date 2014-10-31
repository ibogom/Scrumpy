define(['jquery', 'backbone', 'marionette', 'underscore', 'handlebars', '../libs/utils'],
    function ($, Backbone, Marionette, _, Handlebars, Utils) {
        var App = new Backbone.Marionette.Application();
        //Organize Application into regions corresponding to DOM elements
        //Regions can contain views, Layouts, or subregions nested as necessary
        App.addRegions({
            headerRegion:"header",
            mainRegion:".main-content",
            footerRegion:"footer"
        });

        App.addInitializer(function () {
            Backbone.history.start({
                pushState: false,
                root: ""
            });
        });

        App.mobile = Utils.isMobileDevice();

        return App;
    });