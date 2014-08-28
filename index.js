var finch = require("finch");
var History = require("history");
var $ = require("jquery");

var FitzRoy = FitzRoy || function(){
    var routes = [],
        mapping = {},
        base = '',
        init = function(){
            $.expr[':'].external = function (a) {
                var PATTERN_FOR_EXTERNAL_URLS = /^\w+:\/\//;
                var href = $(a).attr('href');
                return href !== undefined &&
                    href.search(PATTERN_FOR_EXTERNAL_URLS) !== -1;
            };
            $.expr[':'].internal = function (a) {
                return $(a).attr('href') !== undefined && !$.expr[':'].external(a);
            };

            History.options.debug = false;

            History.Adapter.bind(window,'statechange',function(){
                finch.call(History.getState().hash);
            });
        };
    init();
};

 FitzRoy.prototype.getHash = function(){
     return History.getState().hash;
 };
 FitzRoy.prototype.pushState = function(data, title, url){
     History.pushState(data, title, url);
 };
 FitzRoy.prototype.call = function(route){
     finch.call(route);
 };
 FitzRoy.prototype.add = function(route, fn, context){
     route = this.base + route;
     console.log(route);
     finch.route(route, function(){
         fn.call(context);
     });
 };
 FitzRoy.prototype.ajaxify = function(el){
     if(!(el instanceof $)){
         el = $(el);
     }
     el.find('a:internal:not(.no-ajax)').off('click').on('click',
         function(event){
             // Prepare
             var $this = $(this),
                 url = $this.attr('href'),
                 title = $this.attr('title')||null;
             // Continue as normal for cmd clicks etc
             if ( event.which == 2 || event.metaKey ) { return true; }
             // Ajaxify this link
             History.pushState(null, title, url);
             event.preventDefault();
             return false;
         }
     );
 };

module.exports = FitzRoy;
// amd compliance https://github.com/sockjs/sockjs-client/blob/master/lib/index.js