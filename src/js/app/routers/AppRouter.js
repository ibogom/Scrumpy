/**
 * Created by snopp_000 on 30.10.2014.
 */
define(['backbone', 'marionette', 'controllers/HomeController'],
    function (Backbone, Marionette, HomeController) {
        "use strict";
        return Backbone.Marionette.AppRouter.extend({
            //All this methods must be in HomeController
            appRoutes: {
                "": "HomePage", // default route
                "start": "GameStart", // Game start route
                "score": "GameScore", // Game statistic route
                "about": "GameAbout" //  Info page route
            }
        });
    });