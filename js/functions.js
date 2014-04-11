//time function
function include(url) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', url);
  document.getElementsByTagName('head').item(0).appendChild(script);
}
//include('js/main.js');
$(document).ready(function(e) {
  game_settings();
  navigation();
  time();
  setInterval(function(){
  	$("div.cloud").each(function(){
  	// object_check(scrampy);
  	// object_check($(this));
  	object_compare(object_check(scrampy),object_check($(this)));	
  });
  },50);
});
function game_settings()
{
	seconds = 0;
	minutes = 0;
	step = 178;
	cloud_id = 0;
	comp_el = 0;
	scrampy = $("#scrumpy");
    wind_width = $(".obstacles_wrapper").width();
	wind_height = $(document).height();
	//console.log("wind_height:", wind_height);
	$(".wrapper").height(wind_height);
	stripe_height = 75;
	step = 178;
		if(wind_height < 600)
		{
			numb_of_stripes = 6;
		}
		if(wind_height > 600)
		{
			numb_of_stripes = 7;
		}
		if(wind_height > 700)
		{
			numb_of_stripes = 9;
		}
		if(wind_height >800)
		{
			numb_of_stripes = 10;
		}
		if(wind_height >900)
		{
			numb_of_stripes = 12;
		}
		if(wind_height >1000)
		{
			numb_of_stripes = 13;
		}
		if(wind_height >1100)
		{
			numb_of_stripes = 14;
		}
		if(wind_height >1200)
		{
			numb_of_stripes = 16;
		}
		obstacles_wrapper_height = numb_of_stripes*stripe_height;
		obstacles_wrapper_padding = Math.floor((wind_height - obstacles_wrapper_height)/2);
		$("div.obstacles_wrapper").css({"padding-top":obstacles_wrapper_padding+"px"});
		$("div.obstacles_wrapper").css({"padding-bottom":obstacles_wrapper_padding+"px"});
		$("div.obstacles_wrapper").height(obstacles_wrapper_height);
		for(var i=1; i<=numb_of_stripes; i++)
		{
			$("div.obstacles_wrapper").append("<div class='clouds' id='clouds_id_"+i+"'></div>");
		}
		$("div.clouds").height(stripe_height);
}
function navigation(){
		$(window).keydown(function key_pressed(e){
		////console.log("code:",e.keyCode);
		////console.log("step:",step);
			switch(e.keyCode) {
				//пробел 
				case 32:
				{
					$("#scrumpy").addClass("animate");
					if(step >= (wind_width-$("#scrumpy").width()))
					{
						step = wind_width-$("#scrumpy").width();	
					}
					else
					{
						step=step+10;
					}
					$("#scrumpy").css({"margin-top": -140+"px","margin-left":step+"px"});
					$("#scrumpy").addClass("flip");
				}
				break;
				//стрелка вправо
				case 39:
					if(step >= (wind_width-$("#scrumpy").width()))
					{
						step = wind_width-$("#scrumpy").width();	
					}
					else
					{
						step=step+10;
					}
					$("#scrumpy").css({"margin-left":step+"px"});
				break;
				//стрелка влево
				case 37:
					if(step <= (wind_width - wind_width-$("#scrumpy").width()+100))
					{
						step =wind_width - wind_width-$("#scrumpy").width()+100;						
					}
					else
					{
						step=step-10;
					}
					$("#scrumpy").css({"margin-left":step+"px"});
				break;
			}
		});
		$(window).keyup(function key_up(e){
			switch(e.keyCode) {
					//пробел
					case 32:
					{
						$("#scrumpy").css({"margin-top": 0+"px"});
						$("#scrumpy").removeClass("animate"); 
						$("#scrumpy").removeClass("flip");
					}
					break;
					//стрелка вправо
					case 39: 
						$("#scrumpy").stop();
					break;
					//стрелка влево
					case 37:
						$("#scrumpy").stop();
					break;
				}
			});	
}
function time(){
	timeInterval = setInterval(function()
	{				
		seconds = seconds+1;
		if(seconds == 60)
		{
			seconds = 0;
			minutes = minutes+1;
		}
		cloud_add();
		////console.log("seconds",seconds);
	},1000);
};
function object_check(object_init){
    if (typeof object_init !== undefined)
    {
	    object_return = {
			width: object_init.width(),
			height: object_init.height(),
			x: object_init.offset().left,
			y: object_init.offset().top,
			name: object_init.attr("id"),
			true_flag: true, 
	 	};
	 	console.log("name:",object_return.name);
		//console.log("x:",object_return.x);
  	    //console.log("y:",object_return.y);
        //console.log("width:",object_return.width);
        //console.log("height:",object_return.height);
        object_move(object_return);
    }
    return object_return;
}
function object_move(object_init){
	//console.log("in object move");
	last_object_X = object_init.x;
	last_object_Y = object_init.y;
	setInterval(function () {
		new_object_X = last_object_X;
		new_object_Y = last_object_Y;
	},10);
	 //console.log("last_object_X:",last_object_X);
	 //console.log("new_object_X:",new_object_X);
	if (last_object_X != new_object_X || last_object_Y != new_object_Y)
	{
		object_limit(object_init);
		return true;
	}
	return false;
}
function object_limit(object_init)
{
	// console.log("in object_limit");
	// console.log("x:",object_init.x);
	// console.log("y:",object_init.y);
	// console.log("wind_width:",wind_width);
	if(object_init.x >= (wind_width-object_init.width) || object_init.x <= 0)
	{
		//console.log("in if object_limit");
		object_init(object_init);
	}
}
function object_init(object_init)
{
	if(object_init.name == "scrumpy")
	{
		if (object_init.y <= 0)
		{
			object_destroy(object_init);
		}
		else if(object_init.y >= (wind_height-object_init.height))
		{

		}
	}
	else
	{
		object_destroy(object_init);
	}
}
function object_destroy(object_init)
{
	$(this).remove();
}
function cloud_add()
{
	cloud_id=cloud_id+1;
	rand_el =  Math.floor(Math.random() * (numb_of_stripes - 1) + 1);
	if (comp_el == 0)
	{
	comp_el =  Math.floor(Math.random() * (numb_of_stripes - 1) + 1);
	}
	else if (comp_el == rand_el)
			{
				do
				{
				rand_el = Math.floor(Math.random() * (numb_of_stripes - 1) + 1);
				//console.log("new_rend",rand_el);
				}while(rand_el != comp_el);
			}
	comp_el = rand_el;
	//cloud_array = [];
	$("#clouds_id_"+comp_el).append("<div class='cloud' id='cloud_id_"+cloud_id+"'></div>");
	cloud = $("div#cloud_id_"+cloud_id);
	clouds_move(cloud);
	//object_check(cloud);
	// for(var i=1; i<cloud_id; i++)
	// {
	// 	cloud_array.push(i);
	// 	clouds_move(i);
		//game_logic(i);
		//cloud_remove();
	// 	console.log("cloud_row_array:",cloud_array);
	// }
	//console.log("",cloud_array.length);
	//clearInterval(timeInterval);
	//timeInterval = setInterval(cloud_remove,5);
}
function clouds_move(cloud)
{
		cloud_speed_move = 12000 - (2000*minutes);
		if (minutes >= 4)
		{
			cloud_speed_move = 4000;
		}
			cloud.animate({right:wind_width+"px"}, {
			duration:cloud_speed_move,
			complete:function(){
				cloud.remove();
				//delete cloud;
			}
		});
}
function object_compare(obj1,obj2)
{
	var XComp = false;
	var YComp = false;
	console.log("object_compare");
	console.log("object1_x:",obj1.x);
	console.log("object2_x:",obj2.x);
	if((obj1.x+obj1.width >= obj2.x) && (obj1.x <= obj2.x + obj2.width)) 
		{
			//alert("yes");
			//console.log("yes");
			XComp = true;
		}
	if((obj1.y+obj1.height >= obj2.y) && (obj1.y <= obj2.y + obj2.height))
		{
			//alert("yes");
			YComp = true;
			//console.log("yes");
		} 
	if (XComp & YComp){return true;}
	return false;
}