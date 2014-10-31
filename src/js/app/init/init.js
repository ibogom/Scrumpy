/**
 * Created by snopp_000 on 30.10.2014.
 */
require(["App","routers/AppRouter","controllers/HomeController"], function (App, AppRouter, HomeController) {
    "use strict";
    App.appRouter = new AppRouter({
        controller:new HomeController()
    });
    App.start();

});