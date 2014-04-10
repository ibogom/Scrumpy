//time function
function include(url) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', url);
  document.getElementsByTagName('head').item(0).appendChild(script);
}
include('js/main.js');
//object 
  function object_chek(object_init)
  {
    if (typeof object_chek !== undefined)
    {
	    object_return = {
			width: object_init.width(),
			height: object_init.height(),
			x: object_init.offset().left,
			y: object_init.offset().top,
			true_flag: true, 
	 	};
		object_move(object_return);
		console.log("x:",object_return.x);
  	    console.log("y:",object_return.y);
        console.log("width:",object_return.width);
        console.log("height:",object_return.height);
    }
    return object_return;
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
		//console.log("seconds",seconds);
	},1000);
	};
//compare distance between objects
function compare(obj1,obj2){
	Xcomp = false;
	Ycomp = false;
	if((obj1.x+obj1.width >= obj2.x) && (obj1.x <= obj2.x + obj2.width)) XComp = true;
	if((obj1.y+obj1.height >= obj2.y) && (obj1.y <= obj2.y + obj2.height)) YComp = true;
	if (XComp & YComp){return true;}
	return false;
}
function game_settings()
{
	seconds = 0;
	minutes = 0;
	timeInterval = 0;
	cloud_id = 0;
	comp_el = 0;
	scrumpy = $("#scrumpy");
	object_chek(scrumpy);
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
function object_move(object_return)
{
	
}