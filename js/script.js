// JavaScript Document
//document.global_var = {};
$(document).ready(function(e) {
	game_settings();
	time();
	do{	
	timeInterval = 0;
	navigation();
	clearInterval(timeInterval);
	timeInterval = setInterval(game_logic,10);
	//cloud_add();
	}while(step == wind_width);
	function time()
		{
		//clearInterval(intervalId);
		 timeInterval = setInterval(function()
			{
				
				seconds = seconds+1;
			   // cloud_add();
				if(seconds == 60)
				{
					seconds = 0;
					minutes = minutes+1;
				}
				console.log("seconds",seconds);
				dificult_levels();
				//console.log("minutes",minutes);
			},1000);
		}
	function speed()
	{
		//console.log("speed_yes");
		spd = 4000-(2000*minutes);
		if(spd <= 4000)
		{
			spd == 4000;
		}
		return spd;
	}
	
	function cloud_add()
	{
		//rand_clouds_id = Math.floor(Math.random() * (numb_of_stripes - 1) + 1);
		//console.log("rand_gen", rand_clouds_id );
		rand_el =  Math.floor(Math.random() * (numb_of_stripes - 1) + 1);
		comp_el =  Math.floor(Math.random() * (numb_of_stripes - 1) + 1);
		//console.log("rand_el:",rand_el);
		//console.log("comp_el:",comp_el);
			if (comp_el == rand_el)
			{
				do
				{
				rand_el = Math.floor(Math.random() * (numb_of_stripes - 1) + 1);
				//console.log("new_rend",rand_el);
				}while(rand_el != comp_el);
				comp_el = rand_el;
				$("#clouds_id_"+comp_el).append("<div class='cloud'></div>");
				clouds_move();
			}
			remove_cloud(comp_el);
			return comp_el;
	}
	function dificult_levels()
	{
		//console.log("yes");
		intervalId = setInterval(cloud_add,speed());
		//console.log("interval:",intervalId);
	}
	function clouds_move()
	{
		cloud = $("div.cloud");
		cloud_width = cloud.width();
		cloud_move_speed = 12000 - (2000*minutes);
	 	cloud.animate({right:wind_width+"px"},cloud_move_speed);
	}
	function remove_cloud(comp_el)
	{
		console.log("in remove_cloud");
		$("#clouds_id_"+comp_el).children("div.cloud").each(function()
		 {
			if($("div.cloud").css("right") == wind_width+"px")
			{
			console.log("in IF in remove_cloud");
			$(this).remove();
			}
		   // $("div.done").css({"display":"none"});
		 });
	}
	function game_settings()
	{
	intervalId = 0;
	seconds = 0;
	minutes = 0;
    wind_height = $( window ).height();
    wind_width = $(".start").width()+($(".obstacles_wrapper").width() - $(".start").width()) ;
	$(".wrapper").height(wind_height);
	stripe_height = 75;
	step = 178;
		if(wind_height >= 600)
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
		for(var i=1; i<=numb_of_stripes; i++)
		{
			$("div.obstacles_wrapper").append("<div class='clouds' id='clouds_id_"+i+"'></div>");
		}
		$("div.clouds").height(stripe_height);
	}
	function game_logic(){
		s_x = $("#scrumpy").offset().left;
		s_y = ($("#scrumpy").offset().top+$("#scrumpy").height());
		r_x = $("div.rock").offset().left;
		r_y = $("div.rock").offset().top;
		wind_y = $("div.wrapper").height();
		//wind_y = $("div.wrapper").offset().top - bottom_window;
		//console.log("wind_y:",wind_y);
		wind_x = $("div.wrapper").offset().left;
		//console.log("rock_x",r_x);
		//console.log("rock_y",r_y);
		var dx = Math.abs(s_x - r_x);
		var dy = Math.abs(s_y - r_y);
		var dist = Math.sqrt(dx*dx +dy*dy);
		//console.log("dist:",dist);
		rock_width = $("div.rock").width();
		//console.log("rock_width:",rock_width);
		if (dist>= (rock_width- ($("#scrumpy").width()/2)))
		{
			fall_down();
		}
		//console.log("x",s_x);
		//console.log("y",s_y);
	}
	function fall_down()
	{
		//console.log("yes");
		down = Math.floor(s_y);
		if( down > wind_y){
				console.log("yes");
				$("#scrumpy").removeClass("flip");
				$(window).stop();
				clearInterval(timeInterval);
			} else {
				down= Math.floor(s_y + 1);
				console.log("down:",down);
				$("#scrumpy").css({"margin-top":down+"px"});
				$("#scrumpy").addClass("flip");
			}
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
});