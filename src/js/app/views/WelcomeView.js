define( ['App', 'backbone', 'marionette', 'jquery', 'templates/templateCollection'],
    function(App, Backbone, Marionette, $, templateFn) {
        "use strict";
        //window.console.log("in Welcome View");
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            //model: new Model({
            //    mobile: App.mobile
            //}),
            initializase: function(){
                this.$el = $('.main-content');
            },
            // View Event Handlers
            events: {
                'click #start':"GameStart",
                'click #score':"GameScore",
                'click #about':"GameAbout"
            },
            GameStart:function(e){
                e.preventDefault();
                Backbone.history.navigate("start",{trigger:true, replace:false});
            },
            GameScore:function(e){
                e.preventDefault();
                Backbone.history.navigate("score",{trigger:true, replace:false});
            },
            GameAbout:function(e){
                e.preventDefault();
                Backbone.history.navigate("about",{trigger:true, replace:false});
            },
            render: function(){
                this.$el.empty().append(templateFn["home.hbs"]());
            }

        });
    });
