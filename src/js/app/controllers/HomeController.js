/**
 * Created by snopp_000 on 30.10.2014.
 */
define([
    'App',
    'backbone',
    'marionette',
    'views/WelcomeView',
    'views/GameStartView',
    'views/GameScoreView',
    'views/GameAboutView'
], function (App, Backbone, Marionette, WelcomeView, GameStartView, GameScoreView, GameAboutView) {
    "use strict";
    return Backbone.Marionette.Controller.extend({
        initialize: function (options) {
            //App.footerRegion.show(new WelcomeFooterView());
        },
        HomePage: function () {
            App.mainRegion.show(new WelcomeView());
        },
        GameStart: function(){
            App.mainRegion.show(new GameStartView());
        },
        GameScore: function(){
            App.mainRegion.show(new GameScoreView());
        },
        GameAbout: function(){
            App.mainRegion.show(new GameAboutView());
        }
    });
});