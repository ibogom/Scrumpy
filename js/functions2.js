//file script - first version of logic
//file script2 - second version of logic 
//file functions - third version of logic (almost done)
$(document).ready(function() {
	 set_default = function(){
		var seconds = 0;
		var minutes = 0;
		var speed = 1500;
		if(seconds%60 === 0)
		{
			minutes++;
			speed = speed+1000;
		}
		var stripe_height = 75;
		var wind_width = $(".obstacles_wrapper").width();
		var wind_height = $(document).height();
		var cloud_height = $("div.clouds").height(stripe_height);
		// var scrampy = $("#scrumpy");
		$(".wrapper").height(wind_height);
		var stripes_count = function(){
			if(wind_height < 600){
				numb_of_stripes = 6;
			}
			else if(wind_height > 600){
				numb_of_stripes = 7;
			}
			else if(wind_height > 700){
				numb_of_stripes = 9;
			}
			else if(wind_height >800){
				numb_of_stripes = 10;
			}
			else if(wind_height >900){
				numb_of_stripes = 12;
			}
			else if(wind_height >1000){
				numb_of_stripes = 13;
			}
			else if(wind_height >1100){
				numb_of_stripes = 14;
			}
			else if(wind_height >1200){
				numb_of_stripes = 16;
			}
			var obstacles_wrapper_height = numb_of_stripes*stripe_height;
			var	obstacles_wrapper_padding = Math.floor((wind_height - obstacles_wrapper_height)/2);
			$("div.obstacles_wrapper").css({"padding-top":obstacles_wrapper_padding+"px"});
			$("div.obstacles_wrapper").css({"padding-bottom":obstacles_wrapper_padding+"px"});
			$("div.obstacles_wrapper").height(obstacles_wrapper_height);
			for(var i=1; i<=numb_of_stripes; i++){
				$("div.obstacles_wrapper").append("<div class='clouds' id='clouds_id_"+i+"'></div>");
			}
		}();
		return {
			set : function(set_default){
				seconds = settings_default.seconds;
				minutes = settings_default.minutes;
				speed = settings_default.speed;
				wind_height = settings_default.wind_height;
				wind_width = settings_default.wind_width;
			},
			get : function(){
				return {
				seconds : seconds,
				minutes : minutes,
				wind_height : wind_height,
				wind_width : wind_width
				}
			}
		}
	}();
	function object_check(object){
		if (typeof object !== undefined)
	    {
	    	new_object = {
				width: object.width(),
				height: object.height(),
				x: object.offset().left,
				y: object.offset().top,
				name: object.attr("id")
		 	};
	    }
	    return new_object;
	};
});
