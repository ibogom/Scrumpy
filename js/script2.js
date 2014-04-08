// Scrampy game animation V.2.0
$(document).ready(function(e) {
	game_settings();
	time();
	do
	{
	navigation();
	}while(step == wind_width);
});
function time()
		{
		 timeInterval = setInterval(function()
			{				
				seconds = seconds+1;
				if(seconds == 60)
				{
					seconds = 0;
					minutes = minutes+1;
				}
				//console.log("seconds",seconds);
				speed();
				cloud_add();
			},1000);
		}
function speed()
{
	spd = 4000-(2000*minutes);
		if(spd <= 4000)
		{
			spd == 4000;
		}
		//console.log("spd:",{spd:spd});
		return {spd:spd};
}
function game_settings()
{
	seconds = 0;
	minutes = 0;
	timeInterval = 0;
	cloud_id = 0;
	comp_el = 0;
	wind_height = $(window).height();
    wind_width = $(".start").width()+($(".obstacles_wrapper").width() - $(".start").width()) ;
	$(".wrapper").height(wind_height);
	stripe_height = 75;
	step = 178;
		if(wind_height < 600)
		{
			numb_of_stripes = 6;
		}
		else if(wind_height >= 600)
		{
			numb_of_stripes = 7;
		}
		else if(wind_height >= 700)
		{
			numb_of_stripes = 9;
		}
		else if(wind_height >=800)
		{
			numb_of_stripes = 10;
		}
		else if(wind_height >=900)
		{
			numb_of_stripes = 12;
		}
		else if(wind_height >=1000)
		{
			numb_of_stripes = 13;
		}
		else if(wind_height >=1100)
		{
			numb_of_stripes = 14;
		}
		else if(wind_height >=1200)
		{
			numb_of_stripes = 16;
		}
		obstacles_wrapper_height = numb_of_stripes*stripe_height;
		obstacles_wrapper_padding = Math.floor((wind_height - obstacles_wrapper_height)/2);
		$("div.obstacles_wrapper").css({"padding-top":obstacles_wrapper_padding+"px"});
		$("div.obstacles_wrapper").css({"padding-bottom":obstacles_wrapper_padding+"px"});
		$("div.obstacles_wrapper").height(obstacles_wrapper_height);
		cloud_array =[];
		for(var i=1; i<=numb_of_stripes; i++)
		{
			$("div.obstacles_wrapper").append("<div class='clouds' id='clouds_id_"+i+"'></div>");
		}
		$("div.clouds").height(stripe_height);
}
function cloud_add()
{
	cloud_id=cloud_id+1;
	rand_el =  Math.floor(Math.random() * (numb_of_stripes - 1) + 1);
	//console.log("rand_el:",rand_el);
	//console.log("comp_el:",comp_el);
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
	cloud_array = [];
	$("#clouds_id_"+comp_el).append("<div class='cloud' id='cloud_id_"+cloud_id+"'></div>");
	for(var i=1; i<cloud_id; i++)
	{
		cloud_array.push(i);
		clouds_move(i);
		//game_logic(i);
		//cloud_remove();
		//console.log("cloud_row_array:",cloud_array);
	}
	//console.log("",cloud_array.length);
	//clearInterval(timeInterval);
	//timeInterval = setInterval(cloud_remove,5);
}
function clouds_move(i)
	{
		cloud_speed_move = 12000 - (2000*minutes);
		if (minutes >= 4)
		{
			cloud_speed_move = 4000;
		}
			cloud = $("div#cloud_id_"+i);	
			cloud.animate({right:wind_width+"px"}, {
				duration:cloud_speed_move,
				complete:function(){
					$("div#cloud_id_"+i).remove();
				}
			});
		//console.log("cloud:",cloud);
	}
function game_logic(i)
{
	//console.log("yes");
		wind_x = $("div.wrapper").offset().left;
		wind_y = $("div.wrapper").height();
		//scrampy_x
		s_x = $("#scrumpy").offset().left;
		//scrampy_y
		s_y = ($("#scrumpy").offset().top+$("#scrumpy").height());
		r_x = $("div.rock").offset().left;
		r_y = $("div.rock").offset().top;
		cloud = $("div#cloud_id_"+i);
		//console.log("cloud:",cloud);
		cloud_width = cloud.width();
		cloud_x = cloud.offset().left;
		cloud_y = cloud.offset().top;
		console.log("cloud_array:",cloud_array[i]);
		cloud_dist_x = Math.floor(s_x - cloud_x);
		cloud_dist_y = Math.floor(s_y - cloud_y);
		cloud_dist = Math.sqrt(cloud_dist_x*cloud_dist_x+cloud_dist_y*cloud_dist_y);
		console.log("cloud_dist:",cloud_dist);
}
function navigation(){
		$(window).keydown(function key_pressed(e){
		//console.log("code:",e.keyCode);
		//console.log("step:",step);
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
function MacroCollision(obj1,obj2)
{
	var XColl = false;
	var YColl = false;
	
	if((obj1.x+obj1.width >= obj2.x) && (obj1.x <= obj2.x + obj2.width)) XColl = true;
	if((obj1.y+obj1.height >= obj2.y) && (obj1.y <= obj2.y + obj2.height)) YColl = true;
	
	if (XColl & YColl){return true;}
	return false;
}