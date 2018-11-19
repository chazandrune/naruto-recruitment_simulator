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
			if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) { 
	            //横屏下分辨率大于16:9（横向细长）的情况
	            //适配当下诸如iPhone X 19.488:9 以及其他Android 18:9/21:9的分辨率
	            if(width/height > 16/9){
	            	var fs = height*100/562;
	            }
			}
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
			if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) { 
	            //竖屏下分辨率大于16:9（竖向细长）的情况
	            //适配当下诸如iPhone X 19.488:9 以及其他Android 18:9/21:9的分辨率
	            if(height/width > 16/9){
	            	var fs = width*100/562;
	            }
			}
        }
		$('html').css('font-size',fs);
	};
	adjust();
	window.onresize = adjust;
	if ((navigator.userAgent.indexOf('MSIE') >= 0)&& (navigator.userAgent.indexOf('Opera') < 0)){
		window.attachEvent("onresize",adjust);
	};
	//音效开关
	// var mid = new Array();
	// mid[0]="audio/open2.mp3";
	// mid[1]="audio/smoke_2.mp3";
	// mid[2]="audio/menu_slct.mp3";
	// mid[3]="audio/menu_err.mp3";
	// mid[4]="audio/menu_cancel.mp3";
	// var audioid = 0;
	// new 一个audioSprite实例，把合成的mp3里面的每段音效起始、持续时间赋值，并初始化好其他的属性。
	const audioSprite = new Howl({
	    src: ['audio/audiosprite.mp3'],
	    sprite: {
	        menu_cancel: [0, 1900],
	        menu_err: [2289, 1965],
	        menu_slct: [4254, 1642],
	        smoke_2: [5896, 1568]
	    },
	    preload: true,
	    volume: 1
	});
	// new 一个bgmSprite实例，背景音乐mp3里面的每段音效起始、持续时间赋值，并初始化好其他的属性。
	const bgmSprite = new Howl({
	    src: ['audio/open2.mp3'],
	    sprite: {
	        open2: [0, 38995]
	    },
	    preload: true,
	    loop:true,
	    volume: 1
	});
	function playaudio(p){
		var canshu = p
		if($(".btn_audio").hasClass("on")){
			switch(canshu){
				case 4:
					audioSprite.play('menu_cancel');
					break;
				case 3:
					audioSprite.play('menu_err');
					break;
				case 2:
					audioSprite.play('menu_slct');
					break;
				case 1:
					audioSprite.play('smoke_2');
					break;
			}
			
		}
	}
	$(".btn_audio").on("click",function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			//$("#audios").empty();
		}else{
			$(this).addClass("on");
			playaudio(2);
		}
	})
	// 背景音乐开关
	// $("body").append("<audio id='bgm' preload='auto' loop='loop' src="+mid[0]+"></audio>");
	// var bgm = $("#bgm")[0];
	// bgmSprite.play('open2');
	$(".btn_bgm").on("click",function(){
			playaudio(2);
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			bgmSprite.pause();
		}else{
			$(this).addClass("on");
			bgmSprite.play('open2');
		}
	})
	
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

	//公众号弹窗
	$(".jump_gzh,.pop_gzh .btn_close").on('click',function(){
		if($(".pop_gzh").hasClass("on")){
			playaudio(3);
			$(".pop_gzh").addClass("zoomOut");
			setTimeout(function(){
				$(".pop_gzh").removeClass("on");
			},500)
		}else{
			playaudio(2);
			$(".pop_gzh").addClass("on");
			$(".pop_gzh").removeClass("zoomOut");
		}
	})

	//新忍者弹窗
	$(".pop_newninja .btn_close").on('click',function(){
		if($(".pop_newninja").hasClass("on")){
			playaudio(3);
			$(".pop_newninja").addClass("zoomOut");
			setTimeout(function(){
				$(".pop_newninja").removeClass("on");
			},500)
		}else{
			playaudio(2);
			$(".pop_newninja").addClass("on");
			$(".pop_newninja").removeClass("zoomOut");
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
var num_s_new = parseInt($("#num_s_new").html());
var num_a = parseInt($("#num_a").html());
var num_a_new = parseInt($("#num_a_new").html());
var num_b = parseInt($("#num_b").html());
var num_c = parseInt($("#num_c").html());
//全局定义是否领取S首付奖励，初始状态为0
var isaddsuipian = 0;
//全局定义是否领取A首付奖励，初始状态为0
var isaddsuipian_a = 0;
//悲剧指数
var sad = 0;
//是否弹出过获得新忍者图 重置
var istanchunewninja = 0;
	
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
	setTimeout(function(){$(".btns,.btn_setting").fadeIn(100);},3700);
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
	}, 320);

});

//重置操作
function chongzhi(){
	$(".box").removeClass("danchou shilian");
	$(".resultlist").html('<p style="font-size:.26rem;padding-top:.9rem;">仅供娱乐，请勿当真</p>');
	$('#tips_bisong').html('');
	$("#cishu").html("0");
	$("#cishujinbi").html("0");
	$("#num_s").html("0");
	$("#num_s_new").html("0");
	$("#num_a").html("0");
	$("#num_a_new").html("0");
	$("#num_b").html("0");
	$("#num_c").html("0");
	i = 0;
	num_s = 0;
	num_s_new = 0;
	num_a = 0;
	num_a_new = 0;
	num_b = 0;
	num_c = 0;
	//是否领取首付 重置
	isaddsuipian = 0;
	isaddsuipian_a = 0;
	//首付奖励宝箱变为关闭外观
	$(".baoxianglist .item").removeClass("open");
	sad = 0;
	//是否弹出过获得新忍者图 重置
	istanchunewninja = 0;
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
function addsuipian(n){
	//增加s碎片数量
	num_s = num_s + n;
	num_s_new = num_s_new +n;
	$("#num_s").html(num_s);
	$("#num_s_new").html(num_s_new);
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
	//如果照美冥碎片达到40 出现弹窗
	if(num_a_new>=40 && istanchunewninja == 0 ){
			playaudio(2);
			$(".pop_newninja").addClass("on");
			$(".pop_newninja").removeClass("zoomOut");
			//$(".pop_mask").fadeIn(100);
			istanchunewninja = 1;
	}
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
			//S忍 出现5片和1片的概率，先判断是否抽到第10次，若是第10次则必出1片
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
			//m为定值，指定s忍者，不用随机数
			var m = 1;
			//console.log("n="+n+"(小于5为5片)");
			writelog("S碎片 × "+num_this,"s",num_this,m);
			$("#num_s").html(num_s);
			num_s_new = num_s_new + num_this;
			$("#num_s_new").html(num_s_new);
			gongxi("#congratulation","恭喜你获得 <span>千手柱间碎片 × "+num_this+"</span>");
			sad = 0;
			//return;
		}else if(3.5 < raNum && raNum <= 15){
			//A忍 出现4片和1片的概率
			var n = parseInt(Math.random()*10);
			if(n<5){
				num_this = 4;
				num_a = num_a+4;
			}else{
				num_this = 1;
				num_a++;
			}
			//随机出现某个忍者 1-2
			//var m = parseInt(Math.random()*10);
			var m = parseInt(Math.random()*(2-1+1)+1,10);
			writelog("A碎片 × "+num_this,"a",num_this,m);
			$("#num_a").html(num_a);
			//这里判断是否为新A，m值需要与css设定相对应，目前两a概率各50%
			if(m == 1){
				//是新a，恭喜公告出现，并且额外计入新a计数器
				gongxi("#congratulation","恭喜你获得 <span>五代目水影碎片 × "+num_this+"</span>");
				num_a_new = num_a_new + num_this;
				$("#num_a_new").html(num_a_new);
			}
			//return;
		}else if(15 < raNum && raNum <= 55){
			//B忍 出现2片和1片的概率
			var n = parseInt(Math.random()*10);
			if(n<5){
				num_this = 2;
				num_b = num_b+2;
			}else{
				num_this = 1;
				num_b++;
			}
			//随机出现某个忍者 1-6
			//var m = parseInt(Math.random()*10);
			var m = parseInt(Math.random()*(6-1+1)+1,10);
			writelog("B碎片 × "+num_this,"b",num_this,m);
			$("#num_b").html(num_b);
			//return;
		}else if(55 < raNum && raNum <= 100){
			//C忍 出现5片和1片的概率
			var n = parseInt(Math.random()*10);
			if(n<5){
				num_this = 5;
				num_c = num_c+5;
			}else{
				num_this = 1;
				num_c++;
			}
			//随机出现某个忍者 1-12
			//var m = parseInt(Math.random()*10);
			var m = parseInt(Math.random()*(12-1+1)+1,10);
			writelog("C碎片 × "+num_this,"c",num_this,m);
			$("#num_c").html(num_c);
			//return;
		}
	console.log("s="+num_s+",a="+num_a+",a_new="+num_a_new+",b="+num_b+",c="+num_c+",");

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
		// if(i>=100 && isaddsuipian == 0 ){
		// 	$(".btn_baoxiang").show(100);
		// }else{
		// 	$(".btn_baoxiang").hide(100);
		// }
		//如果照美冥碎片达到40 出现弹窗
		if(num_a_new>=40 && istanchunewninja == 0 ){
				playaudio(2);
				gongxi("#congratulation","恭喜你成功招募 <span>照美冥[五代目水影]</span>");
				$(".pop_newninja").addClass("on");
				$(".pop_newninja").removeClass("zoomOut");
				//$(".pop_mask").fadeIn(100);
				istanchunewninja = 1;
		}
}
