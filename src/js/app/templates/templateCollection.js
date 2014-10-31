define(['handlebars'], function(Handlebars) {

this["Scrumpy"] = this["Scrumpy"] || {};

Handlebars.registerPartial("gameAbout.hbs", this["Scrumpy"]["gameAbout.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h2>Hello from About Template!</h2>\r\n<ul>\r\n    <li><a id=\"back\" href=\"#\">Back</a></li>\r\n</ul>";
  },"useData":true}));



Handlebars.registerPartial("gameScore.hbs", this["Scrumpy"]["gameScore.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h2>Hello from Score Template!</h2>\r\n<ul>\r\n    <li><a id=\"back\" href=\"#\">Back</a></li>\r\n</ul>";
  },"useData":true}));



Handlebars.registerPartial("gameStart.hbs", this["Scrumpy"]["gameStart.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h2>Hello from Start Template!</h2>\r\n<ul>\r\n    <li><a id=\"back\" href=\"#\">Back</a></li>\r\n</ul>";
  },"useData":true}));



Handlebars.registerPartial("header.hbs", this["Scrumpy"]["header.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "";
},"useData":true}));



Handlebars.registerPartial("home.hbs", this["Scrumpy"]["home.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h2>Hello from Home Template!</h2>\r\n<ul>\r\n    <li><a id=\"start\" href=\"#\">Start</a></li>\r\n    <li><a id=\"score\" href=\"#\">Score</a></li>\r\n    <li><a id=\"about\" href=\"#\">About</a></li>\r\n</ul>";
  },"useData":true}));

return this["Scrumpy"];

});