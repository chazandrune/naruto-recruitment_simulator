// 辅助程序开始
// 时间：20180511
// 作者：某熊
	//分辨率适应及横屏竖屏处理
    var adjust = function(){
		var width = document.documentElement.clientWidth;
		var height =  document.documentElement.clientHeight;
        $body =  $('body');
        if( width > height ){
           //横屏情况
			if($(window).innerWidth() < 900){
				var fs = $(window).innerWidth()*100/900;
			}else{
				var fs = 900*100/900;
			}
            $body.width(width);
            $body.height(height);
            $body.css('transform' , 'none');
            $body.css('transform-origin' , '50% 50%');
        }
        else{
           //竖屏情况
			if(height < 900){
				var fs = height*100/900;
			}else{
				var fs = 900*100/900;
			}
            $body.width(height);
            $body.height(width);
            $body.css('position','relative');
            $body.css('top',  (height-width)/2 );
            $body.css('left',  0-(height-width)/2 );
            $body.css('transform' , 'rotate(90deg)');
            $body.css('transform-origin' , '50% 50%');
        }
		$('html').css('font-size',fs);
	};
	adjust();
	window.onresize = adjust;
	if ((navigator.userAgent.indexOf('MSIE') >= 0)&& (navigator.userAgent.indexOf('Opera') < 0)){
		window.attachEvent("onresize",adjust);
	};
	//音效开关
	var mid = new Array();
	mid[0]="audio/open2.mp3";
	mid[1]="audio/smoke_2.mp3";
	mid[2]="audio/menu_slct.mp3";
	mid[3]="audio/menu_err.mp3";
	mid[4]="audio/menu_cancel.mp3";
	var audioid = 0;
	function playaudio(p){
		if($(".btn_audio").hasClass("on")){
			$("#audios").append("<audio id='audio"+audioid+"' preload='auto' src="+mid[p]+"></audio>");
			var audio = $("#audio"+audioid)[0];
			audio.play();
			audioid++;
		}
	}
	$(".btn_audio").on("click",function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			$("#audios").empty();
		}else{
			$(this).addClass("on");
			playaudio(2);
		}
	})
	// 背景音乐开关
	// $("body").append("<audio id='bgm' preload='auto' loop='loop' src="+mid[0]+"></audio>");
	// var bgm = $("#bgm")[0];
	// $(".btn_bgm").on("click",function(){
	// 		playaudio(2);
	// 	if($(this).hasClass("on")){
	// 		$(this).removeClass("on");
	// 		bgm.pause();
	// 	}else{
	// 		$(this).addClass("on");
	// 		bgm.play();
	// 	}
	// })
	
	//每10抽必送S级碎片开关
	$(".btn_bisong").on("click",function(){
		playaudio(2);
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			chongzhi();
		}else{
			$(this).addClass("on");
			chongzhi();
		}
	})
	
	//黑脸反馈开关
	$(".btn_sad").on("click",function(){
		playaudio(2);
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			showsad();
		}else{
			$(this).addClass("on");
			showsad();
		}
	})

	//统计数据收缩展开
	$(".tongjilist_btns .btn").on('click',function(){
		$(".tongjilist_btns").toggleClass("on");
		$(".tongjilist_wrap").toggleClass("on");
		playaudio(2);
	})
	//公告弹窗
	$(".btn_notice,.pop_notice .btn_close").on('click',function(){
		if($(".pop_notice").hasClass("on")){
			playaudio(3);
			$(".pop_notice").addClass("zoomOut");
			$(".pop_mask").fadeOut(100);
			setTimeout(function(){
				$(".pop_notice").removeClass("on");
			},500)
		}else{
			playaudio(2);
			$(".pop_notice").addClass("on");
			$(".pop_notice").removeClass("zoomOut");
			$(".pop_mask").fadeIn(100);
		}
	})
	
	//信息弹窗
	$(".btn_info,.pop_info .btn_close").on('click',function(){
		if($(".pop_info").hasClass("on")){
			playaudio(3);
			$(".pop_info").addClass("zoomOut");
			$(".pop_mask").fadeOut(100);
			setTimeout(function(){
				$(".pop_info").removeClass("on");
			},500)
		}else{
			playaudio(2);
			$(".pop_info").addClass("on");
			$(".pop_info").removeClass("zoomOut");
			$(".pop_mask").fadeIn(100);
		}
	})
	
	//设置弹窗
	$(".btn_setting,.pop_setting .btn_close").on('click',function(){
		if($(".pop_setting").hasClass("on")){
			playaudio(3);
			$(".pop_setting").addClass("zoomOut");
			$(".pop_mask").fadeOut(100);
			setTimeout(function(){
				$(".pop_setting").removeClass("on");
			},500)
		}else{
			playaudio(2);
			$(".pop_setting").addClass("on");
			$(".pop_setting").removeClass("zoomOut");
			$(".pop_mask").fadeIn(100);
		}
	})
	
	//a首付奖励弹窗
	$(".btn_baoxiang_a,.pop_baoxiang_a .btn_close").on('click',function(){
		if($(".pop_baoxiang_a").hasClass("on")){
			playaudio(3);
			$(".pop_baoxiang_a").addClass("zoomOut");
			$(".pop_mask").fadeOut(100);
			setTimeout(function(){
				$(".pop_baoxiang_a").removeClass("on");
			},500)
		}else{
			playaudio(2);
			$(".pop_baoxiang_a").addClass("on");
			$(".pop_baoxiang_a").removeClass("zoomOut");
			$(".pop_mask").fadeIn(100);
		}
	})

	//s首付奖励弹窗
	$(".btn_baoxiang,.pop_baoxiang .btn_close").on('click',function(){
		if($(".pop_baoxiang").hasClass("on")){
			playaudio(3);
			$(".pop_baoxiang").addClass("zoomOut");
			$(".pop_mask").fadeOut(100);
			setTimeout(function(){
				$(".pop_baoxiang").removeClass("on");
			},500)
		}else{
			playaudio(2);
			$(".pop_baoxiang").addClass("on");
			$(".pop_baoxiang").removeClass("zoomOut");
			$(".pop_mask").fadeIn(100);
		}
	})
	
	






// 主要程序开始
// 时间：20180511
// 作者：某熊
var now =new Date();
var hours = now.getHours();
var minutes = now.getMinutes();
var seconds = now.getSeconds();
var t = hours+":"+minutes+":"+seconds;
console.log("页面打开时间："+t);

//注意：要将raNum设置为全局变量，容易出错
var raNum;
//抽次数
var i = parseInt($("#cishu").html());
//各种碎片数量
var num_s = parseInt($("#num_s").html());
var num_a = parseInt($("#num_a").html());
var num_a_new = parseInt($("#num_a_new").html());
var num_b = parseInt($("#num_b").html());
var num_c = parseInt($("#num_c").html());
//悲剧指数
var sad = 0;
	
//单抽操作
$('#clik').on('click',function() {
	
	playaudio(2);
	$(".btns").hide();
	setTimeout(function(){$(".btns").fadeIn(100);},500);
	$(".resultlist").html("");
	$(".box").addClass("danchou");
	$(".box").removeClass("shilian");

	//判断抽次数个位是否为9
	if( $(".btn_bisong").hasClass("on") && parseInt(i%10) == 9 ){
		//必出S，让raNum在0~3.5范围内即可
		raNum = 1;
	}else{
		//随机数生成
		raNum = Math.random()*100;
	}
	i++;
	$("#cishu").html(i);
	$("#cishujinbi").html(i*168);
	//返回结果
	A();

});

//十连操作
$('#clik10').on('click',function() {
	
	playaudio(2);
	$(".btns,.btn_setting").hide();
	setTimeout(function(){$(".btns,.btn_setting").fadeIn(100);},4500);
	$(".resultlist").html("");
	$(".box").addClass("shilian");
	$(".box").removeClass("danchou");
	//重复10次
	var repeat = 10;  // 限制执行次数为10次
	var timer = setInterval(function() {    
		if (repeat == 0) {
			clearInterval(timer);
		} else {
			repeat--;
			//判断抽次数个位是否为9
			if($(".btn_bisong").hasClass("on")&& parseInt(i%10) == 9 ){
				//必出S，让raNum在0~3.5范围内即可
				raNum = 1;
			}else{
				//随机数生成
				raNum = Math.random()*100;
			}
			i++;
			$("#cishu").html(i);
			$("#cishujinbi").html(i*168);
			//返回结果
			A();
		}
	}, 400);

});

//重置操作
function chongzhi(){
	$(".box").removeClass("danchou shilian");
	$(".resultlist").html('<p style="font-size:.26rem;padding-top:.9rem;">仅供娱乐，请勿当真</p>');
	$('#tips_bisong').html('');
	$("#cishu").html("0");
	$("#cishujinbi").html("0");
	$("#num_s").html("0");
	$("#num_a").html("0");
	$("#num_a_new").html("0");
	$("#num_b").html("0");
	$("#num_c").html("0");
	i = 0;
	num_s = 0;
	num_a = 0;
	num_a_new = 0;
	num_b = 0;
	num_c = 0;
	sad = 0;
}
$('#reset').on('click',function() {
	playaudio(4);
	chongzhi();
});


//输出碎片
function writelog(a,j,h,m){
	$(".resultlist").append("<div class='animated fadeIn item_wrap'><div class='item item_"+j+"'><div class='img img"+m+"'></div><div class='fg'><p class='num'>"+h+"</p></div><div class='yanwu'></div></div><p class='text'>"+a+"</p></div>")
	// console.log(m);
	playaudio(1);
}

//输出必送S级忍者碎片文字提醒
function writebisong(){
	var num_bisong = 9 - parseInt(i%10);
	//判断是否开启10次必出s碎片，若开启则输出文字提醒，不开启则清空文字
	if($(".btn_bisong").hasClass("on")){
		if( parseInt(i%10) == 9){
			$('#tips_bisong').html('本次招募必送S级忍者碎片');
		}else{
			$('#tips_bisong').html('再招募<span>'+num_bisong+'</span>次后，下次招募必送S级忍者碎片');
		}
	}else{
		$('#tips_bisong').html('');
	}
	
}

//恭喜提示
function gongxi(obj,t){
	$(obj).show("300");
	$(obj).animate({opacity:0},00);
	$(obj).queue(function () {
		$(this).html(t);
        $(this).dequeue();
	});
	$(obj).animate({opacity:1},300);
	$(obj).delay(3000).animate({opacity:0},500);
	$(obj).queue(function () {
		$(this).html("");
        $(this).dequeue();
	});
	$(obj).delay(100).hide("300");
}

//toast提示
function toast(obj,t){
	clearTimeout(timer);
	$(obj).html(t);
	$(obj).parent().stop(true,true);
	$(obj).parent().fadeIn(0);
	var timer = setTimeout(function(){
		$(obj).parent().fadeOut(300);
	},1000)
}

//悲剧指数反馈
function showsad(){
	if($(".btn_sad").hasClass("on")){
		$("html").attr("class","gray"+sad);
	}else{
		$("html").attr("class","gray0");
		sad = 0;
	}
}

//领取S首付奖励
//全局定义是否领取S首付奖励，初始状态为0
var isaddsuipian = 0;
function addsuipian(n){
	//增加s碎片数量
	num_s = num_s + n;
	$("#num_s").html(num_s);
	//是否领取s首付奖励状态变为1
	isaddsuipian = 1;
	//s首付弹窗消失
	setTimeout(function(){
		$(".pop_baoxiang").addClass("zoomOut");
		$(".pop_mask").fadeOut(100);
	},1000)
	setTimeout(function(){
		$(".pop_baoxiang").removeClass("on");
	},1500)
	//s首付奖励按钮消失
	$(".btn_baoxiang").hide(100);
	//恭喜文字提示
	gongxi("#congratulation","已领取首付奖励 <span>S级忍者碎片 × "+n+"</span>");
}
//V0-V4领取
$("#baoxiang01").on('click',function(){
	playaudio(3);
	if(isaddsuipian == 0){
		//宝箱变为打开状态
		$(this).addClass("open");
		addsuipian(25);	
	}else{
		toast("#toast","首付奖励只能领取一次！");
	}
})
//V5-V9领取
$("#baoxiang02").on('click',function(){
	playaudio(3);
	if(isaddsuipian == 0){
		//宝箱变为打开状态
		$(this).addClass("open");
		addsuipian(28);	
	}else{
		toast("#toast","首付奖励只能领取一次！");
	}
})
//V10-V14领取
$("#baoxiang03").on('click',function(){
	playaudio(3);
	if(isaddsuipian == 0){
		//宝箱变为打开状态
		$(this).addClass("open");
		addsuipian(33);	
	}else{
		toast("#toast","首付奖励只能领取一次！");
	}
})
//V15领取
$("#baoxiang04").on('click',function(){
	playaudio(3);
	if(isaddsuipian == 0){
		//宝箱变为打开状态
		$(this).addClass("open");
		addsuipian(38);	
	}else{
		toast("#toast","首付奖励只能领取一次！");
	}
})

//领取A首付奖励
//全局定义是否领取A首付奖励，初始状态为0
var isaddsuipian_a = 0;
function addsuipian_a(n){
	//增加a碎片数量
	num_a = num_a + n;
	num_a_new = num_a_new + n;
	$("#num_a").html(num_a);
	$("#num_a_new").html(num_a_new);
	//是否领取A首付奖励状态变为1
	isaddsuipian_a = 1;
	//A首付弹窗消失
	setTimeout(function(){
		$(".pop_baoxiang_a").addClass("zoomOut");
		$(".pop_mask").fadeOut(100);
	},1000)
	setTimeout(function(){
		$(".pop_baoxiang_a").removeClass("on");
	},1500)
	//a首付奖励按钮消失
	$(".btn_baoxiang_a").hide(100);
	//恭喜文字提示
	gongxi("#congratulation","已领取首付奖励 <span>A级忍者碎片 × "+n+"</span>");
}
//V0-V4领取
$("#baoxiang_a01").on('click',function(){
	playaudio(3);
	if(isaddsuipian_a == 0){
		//宝箱变为打开状态
		$(this).addClass("open");
		addsuipian_a(10);
	}else{
		toast("#toast","首付奖励只能领取一次！");
	}
})
//V5-V9领取
$("#baoxiang_a02").on('click',function(){
	playaudio(3);
	if(isaddsuipian_a == 0){
		//宝箱变为打开状态
		$(this).addClass("open");
		addsuipian_a(11);
	}else{
		toast("#toast","首付奖励只能领取一次！");
	}
})
//V10-V14领取
$("#baoxiang_a03").on('click',function(){
	playaudio(3);
	if(isaddsuipian_a == 0){
		//宝箱变为打开状态
		$(this).addClass("open");
		addsuipian_a(13);
	}else{
		toast("#toast","首付奖励只能领取一次！");
	}
})
//V15领取
$("#baoxiang_a04").on('click',function(){
	playaudio(3);
	if(isaddsuipian_a == 0){
		//宝箱变为打开状态
		$(this).addClass("open");
		addsuipian_a(15);
	}else{
		toast("#toast","首付奖励只能领取一次！");
	}
})


//返回结果进入数据统计
function A(){
	
	console.log("随机数="+raNum+",次数="+i+",");
	if(0 < raNum && raNum <= 3.5){
			//出现5片和1片的概率，先判断是否抽到第10次，若是第10次则必出1片
			if( parseInt(i%10) == 0 ){
				var n = 6;
			}else{
				var n = parseInt(Math.random()*10);
			}
			if(n<5){
				num_this = 5;
				num_s = num_s+5;
			}else{
				num_this = 1;
				num_s++;
			}
			//m为定值，指定s忍者，不随机
			var m = 5;
			//console.log("n="+n+"(小于5为5片)");
			writelog("S碎片 × "+num_this,"s",num_this,m);
			$("#num_s").html(num_s);
			$("#num_s_new").html(num_s);
			gongxi("#congratulation","恭喜你获得 <span>四代目雷影碎片 × "+num_this+"</span>");
			sad = 0;
			//return;
		}else if(3.5 < raNum && raNum <= 15){
			//出现4片和1片的概率
			var n = parseInt(Math.random()*10);
			if(n<5){
				num_this = 4;
				num_a = num_a+4;
			}else{
				num_this = 1;
				num_a++;
			}
			//随机出现某个忍者
			var m = parseInt(Math.random()*10);
			writelog("A碎片 × "+num_this,"a",num_this,m);
			$("#num_a").html(num_a);
			//这里判断是否为新A，m值需要与css设定相对应，目前两a概率各50%
			if(m == 5 || m==6 || m==7 ||m==8||m==9){
				//是新a，恭喜公告出现，并且额外计入新a计数器
				gongxi("#congratulation","恭喜你获得 <span>鹰小队佐助碎片 × "+num_this+"</span>");
				num_a_new = num_a_new + num_this;
				$("#num_a_new").html(num_a_new);
			}
			//return;
		}else if(15 < raNum && raNum <= 55){
			//出现2片和1片的概率
			var n = parseInt(Math.random()*10);
			if(n<5){
				num_this = 2;
				num_b = num_b+2;
			}else{
				num_this = 1;
				num_b++;
			}
			//随机出现某个忍者
			var m = parseInt(Math.random()*10);
			writelog("B碎片 × "+num_this,"b",num_this,m);
			$("#num_b").html(num_b);
			//return;
		}else if(55 < raNum && raNum <= 100){
			//出现5片和1片的概率
			var n = parseInt(Math.random()*10);
			if(n<5){
				num_this = 5;
				num_c = num_c+5;
			}else{
				num_this = 1;
				num_c++;
			}
			//随机出现某个忍者
			var m = parseInt(Math.random()*10);
			writelog("C碎片 × "+num_this,"c",num_this,m);
			$("#num_c").html(num_c);
			//return;
		}
		
		//必送文字输出
		writebisong();
		
		//悲剧指数体现
		sad++;
		showsad();
		
		//如果抽够50次会有A首付奖励出现
		if(i>=50 && isaddsuipian_a == 0 ){
			$(".btn_baoxiang_a").show(100);
		}else{
			$(".btn_baoxiang_a").hide(100);
		}
		//如果抽够100次会有S首付奖励出现
		/*if(i>=100 && isaddsuipian == 0 ){
			$(".btn_baoxiang").show(100);
		}else{
			$(".btn_baoxiang").hide(100);
		}*/
		
}
