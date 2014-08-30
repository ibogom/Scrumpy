requirejs.config({ 
    //By default load any module IDs from js/lib
    baseUrl: 'src/js/',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        'App': 'app',
        'jQuery': 'vendor/jquery', 
        'Backbone': 'vendor/backbone',
        'Underscore': 'vendor/underscore',
        'templates': 'templateCollection',
        'handlebars': 'vendor/handlebars.runtime'
    }
});


// Start the main app logic.
requirejs([
    'jQuery',
    'Underscore',
    'Backbone',
    'templates',
    'App',
],function ($, _, Backbone, TemplateFn, App ) {

    Backbone.$ = $;
    window.jQuery = window.jQuery || $;
    /* Get route */
    var url = document.location.pathname.toString(),
        route = '';
        
    /* Run our app */
    window.app = new App({
        route: route
    });
    
});


