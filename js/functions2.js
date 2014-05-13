$(document).ready(function() {
	 set_default = function(){
		var seconds = 0;
		var minutes = 0;
		var speed = 6500;
		var cloud_id = 0;
		// var comp_el = 0;
		setInterval(function(){
			seconds++;
				if(seconds%60 === 0)
				{
					minutes=minutes+1;
					seconds = 0;
					if(speed >= 2750) {
					speed = speed-250;
					} else {
						speed = 2500;
					}
				}
		},1000);
		var stripe_height = 75;
		var wind_width = $(".obstacles_wrapper").width();
		var wind_height = $(document).height();
		var cloud_height = $("div.clouds").height(stripe_height);
		var scrampy = $("#scrumpy");
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
			    seconds = set_default.seconds;
				minutes = set_default.minutes;
				speed = set_default.speed;
				wind_height = set_default.wind_height;
				wind_width = set_default.wind_width;
				cloud_id = set_default.cloud_id; 
				// set_default.comp_el = comp_el;
			},
			get : function(){
				return {
				seconds : seconds,
				minutes : minutes,
				wind_height : wind_height,
				wind_width : wind_width,
				cloud_id : cloud_id,
				speed: speed
				// comp_el : comp_el
				}
			},
			cloud_id_ink: function() {
				cloud_id++;
				return {
					cloud_id :cloud_id
				}
			},
			scrampy : scrampy,
			numb_of_stripes : numb_of_stripes
		}
	}();
//new object create
	object_check = function (object_init){
	    if (typeof object_init !== undefined){
		    object_return = {
				width: object_init.width(),
				height: object_init.height(),
				x: object_init.offset().left,
				y: object_init.offset().top
		 	};
	    }
	    return object_return;
	};
//compare two objects "scrampy and cloud"
	objects_compare = function (obj1,obj2){
		// var rock_width = $("div.rock").width();
		// var rock_height = $("div.rock").height();
		if((obj1.x+obj1.width >= obj2.x) && (obj1.x <= obj2.x + obj2.width) && (obj1.y+obj1.height >= obj2.y) && (obj1.y <= obj2.y + obj2.height)) {
				console.log("yes");
				return true;
		}
		return false;
	};
//function that add clouds 
	cloud_add = function (){
		var new_id = set_default.cloud_id_ink().cloud_id;
		var rand_el =  Math.floor(Math.random() * (set_default.numb_of_stripes - 1) + 1);
		$("#clouds_id_"+rand_el).append("<figure class='cloud' id='cloud_id_"+new_id+"'></figure>");
		var cloud = $("#cloud_id_"+new_id);
		cloud.animate({right:set_default.get().wind_width+"px"}, {
				duration:set_default.get().speed,
				complete:function(){
					cloud.remove();
				}
	});
	};
//Add clouds with interval 500 ms
	setInterval(cloud_add,500);
//compare 2 objects on intersaction 
	setInterval(function(){
	$("figure.cloud").each(function(){
		var obj1 = object_check(set_default.scrampy);
		var obj2 = object_check($(this));
		objects_compare(obj1,obj2);
	});
	},10);
	navigation = function(){
		
	};
	
	fall_down = function(obj1){

	 };
});
