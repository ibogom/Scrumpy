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
                'click #back':"goBack"
            },
            goBack:function(e){
                e.preventDefault();
                window.history.back();
            },
            render: function(){
                this.$el.empty().append(templateFn["gameStart.hbs"]());
            }

        });
    });
