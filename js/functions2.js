$(document).ready(function() {
	set_default = function(){
		var seconds = 0;
		var minutes = 0;
		var speed = 8500;
		var cloud_id = 0;
		setInterval(function() {
			seconds++;
				if(seconds%60 === 0) {
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
		var stripes_count = function() {
			if(wind_height < 600){
				numb_of_stripes = 6;
			}
			if(wind_height > 600){
				numb_of_stripes = 8;
			}
			if(wind_height > 700){
				numb_of_stripes = 9;
			}
			if(wind_height >800){
				numb_of_stripes = 10;
			}
			if(wind_height >900){
				numb_of_stripes = 12;
			}
			if(wind_height >1000){
				numb_of_stripes = 13;
			}
			if(wind_height >1100){
				numb_of_stripes = 14;
			}
			if(wind_height >1200){
				numb_of_stripes = 16;
			}
			var obstacles_wrapper_height = numb_of_stripes*stripe_height;
			var	obstacles_wrapper_padding = Math.floor((wind_height - obstacles_wrapper_height)/2);
			$("div.obstacles_wrapper").css({"padding-top":obstacles_wrapper_padding+"px"});
			$("div.obstacles_wrapper").css({"padding-bottom":obstacles_wrapper_padding+"px"});
			$("div.obstacles_wrapper").height(obstacles_wrapper_height);
			for(var i=1; i<=numb_of_stripes; i++) {
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
			},
			get : function(){
				return {
				seconds : seconds,
				minutes : minutes,
				wind_height : wind_height,
				wind_width : wind_width,
				cloud_id : cloud_id,
				speed: speed
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
	calculateBoundingBox = function (object_init){
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
//fall down function
	fall_down = function(){
		var scrampy = set_default.scrampy;
		var scr_top = calculateBoundingBox(set_default.scrampy).y;
		var scr_left = calculateBoundingBox(set_default.scrampy).x;
		var step = 0;
		if(scr_top >= 0 && scr_top <= set_default.get().wind_height) {
		step = scr_top +50;
		set_default.scrampy.css({"top":step+"px"});
		}
	};
//compare two objects "scrampy and cloud"
	objects_compare = function (obj1,obj2){
		var rock_width = $("div.rock").width();
		var rock_height = $("div.rock").height();
		var rock_x =  $("div.rock").offset().left;
		var rock_y =  $("div.rock").offset().top;
        var scrumpty_geometrical_center = {
            x: (obj1.x + obj1.width) / 2,
            y: (obj1.y + obj1.height) / 2
        };
        var cloud_geometrical_center = {
            x: (obj2.x + obj2.width) / 2,
            y: (obj2.y + obj2.height) / 2
        };
        var CONTACT_OFFSET = {
            x: (obj2.width / 2), /* half of a cloud width */
            y: (obj2.height / 2) /* half of a cloud width */
            //y: 10
        };
        /*
         *var scrampy_bottom = obj1.y;
         *var cloud_top = obj2.y + obj2.height;
         *var is_scrumpy_on_cloud = (Math.abs(scrumpty_geometrical_center.x - cloud_geometrical_center.x) < CONTACT_OFFSET.x) && (Math(scrampy_bottom - cloud_top) < CONTACT_OFFSET.y);
         */
        var is_scrumpy_on_cloud = (Math.abs(scrumpty_geometrical_center.x - cloud_geometrical_center.x) < CONTACT_OFFSET.x)
                                  && (Math.abs(scrumpty_geometrical_center.y - cloud_geometrical_center.y) < CONTACT_OFFSET.y);
		if(((obj1.x+obj1.width >= rock_x) && (obj1.x <= rock_x + (rock_width-40)) && (obj1.y+obj1.height >= rock_y - 60) && (obj1.y <= rock_y + rock_height)) || is_scrumpy_on_cloud){
				 console.log("yes");
		} else {
		   fall_down();
		}
	};
//function that add clouds 
	function cloud_add (){
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
    // action predicates
    function isSpaceKey(event) {
        return event.keyCode === 32;
    }

    function isLeftArrowKey(event) {
        return event.keyCode === 37;
    }

    function isRightArrowKey(event) {
        return event.keyCode === 39;
    }

    function isActionKey(event) {
        return isSpaceKey(event) || isLeftArrowKey(event) || isRightArrowKey(event);
    }
   
    // actions 
    function jumpAction() {
		var bounding_box = calculateBoundingBox(set_default.scrampy);
        set_default.scrampy.css({'top': bounding_box.y - 250, 'left': bounding_box.x + 10});
    }

    function moveLeftAction() {
		var bounding_box = calculateBoundingBox(set_default.scrampy);
        set_default.scrampy.css({'left': bounding_box.x - 90});
    }

    function moveRightAction() {
		var bounding_box = calculateBoundingBox(set_default.scrampy);
        set_default.scrampy.css({'left': bounding_box.x + 10});
    }

    var keyupEventStream = $(document).asEventStream('keyup');
    keyupEventStream.filter(isSpaceKey).onValue(jumpAction);
    keyupEventStream.filter(isLeftArrowKey).onValue(moveLeftAction);
    keyupEventStream.filter(isRightArrowKey).onValue(moveRightAction);
    
//Add clouds with interval 500 ms
	setInterval(cloud_add,500);
//compare 2 objects on intersaction 
	setInterval(function(){
	$("figure.cloud").each(function(){
		//obj1 - scrampy
		var obj1 = calculateBoundingBox(set_default.scrampy);
        set_default.scrampy.css('background-color', 'red');
		//obj2 - cloud 
        $(this).css('background-color', 'red');
		var obj2 = calculateBoundingBox($(this));
		objects_compare(obj1,obj2);
		});
	},100);
});
