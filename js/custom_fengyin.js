// 辅助程序开始
// 时间：20180511
// 作者：某熊
//解决移动端300ms延迟点击
FastClick.attach(document.body);
//解决移动端按钮按下效果bug
document.body.addEventListener('touchstart', function () { }); 
//解决微信禁止上下滑动
// document.body.addEventListener('touchmove', function (e) {
//   e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
// }, {passive: false});


	//分辨率适应及横屏竖屏处理
    var adjust = function(){
		var width = document.documentElement.clientWidth;
		var height = document.documentElement.clientHeight;
		var fs = 100;
        $body = $('body');
        if( width > height ){
           //横屏情况
			if($(window).innerWidth() < 900){
				fs = $(window).innerWidth()*100/900;
			}else{
				fs = 900*100/900;
			}
            $body.width(width);
            $body.height(height);
            $body.css('transform' , 'none');
            $body.css('transform-origin' , '50% 50%');
			if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) { 
	            //横屏下分辨率大于16:9（横向细长）的情况
	            //适配当下诸如iPhone X 19.488:9 以及其他Android 18:9/21:9的分辨率
	            if(width/height > 16/9){
	            	fs = height*100/562;
	            }
			}
        }
        else{
           //竖屏情况
			if(height < 900){
				fs = height*100/900;
			}else{
				fs = 900*100/900;
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
	            	fs = width*100/562;
	            }
			}
        }
		$('html').css('font-size',fs);
	};
	adjust();
	window.onresize = adjust;
	if ((navigator.userAgent.indexOf('MSIE') >= 0)&& (navigator.userAgent.indexOf('Opera') < 0)){
		window.attachEvent("onresize",adjust);
	}
	//音效开关
	// var mid = new Array();
	// mid[0]="audio/open2.mp3";
	// mid[1]="audio/smoke_2.mp3";
	// mid[2]="audio/menu_slct.mp3";
	// mid[3]="audio/menu_err.mp3";
	// mid[4]="audio/menu_cancel.mp3";
	// var audioid = 0;
	// new 一个audioSprite实例，把合成的mp3里面的每段音效起始、持续时间赋值，并初始化好其他的属性。
	var audioSprite = new Howl({
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
	var bgmSprite = new Howl({
	    src: ['audio/open2.mp3'],
	    sprite: {
	        open2: [0, 38995]
	    },
	    preload: true,
	    loop:true,
	    volume: 1
	});
	function playaudio(p){
		//var canshu = p;
		if($(".btn_audio").hasClass("on")){
			switch(p){
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
		if ($(this).hasClass("on") ){
			$(this).removeClass("on");
			//$("#audios").empty();
		}else{
			$(this).addClass("on");
			playaudio(2);
		}
	});
	// 背景音乐开关
	// $("body").append("<audio id='bgm' preload='auto' loop='loop' src="+mid[0]+"></audio>");
	// var bgm = $("#bgm")[0];
	//bgmSprite.play('open2');
	$(".btn_bgm").on("click",function(){
		playaudio(2);
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			bgmSprite.pause();
		}else{
			$(this).addClass("on");
			bgmSprite.play('open2');
		}
	});
	
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
	});
	
	//页面加载完毕执行，判断左侧统计橱窗中央是否显示当前高招忍者碎片
	if($(".btn_shoufu_s").hasClass("on")){
		$("#for_new_s").show();
	}else{
		$("#for_new_s").hide();
	}
	if($(".btn_shoufu_a").hasClass("on")){
		$("#for_new_a").show();
	}else{
		$("#for_new_a").hide();
	}

	//S首付奖励开关
	$(".btn_shoufu_s").on("click",function(){
		playaudio(2);
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			ifshowshoufu_s();
			//联动判断是否显示当前高招忍者碎片数目
			$("#for_new_s").hide();
		}else{
			$(this).addClass("on");
			ifshowshoufu_s();
			//联动判断是否显示当前高招忍者碎片数目
			$("#for_new_s").show();
		}
	});

	//A首付奖励开关
	$(".btn_shoufu_a").on("click",function(){
		playaudio(2);
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			ifshowshoufu_a();
			//联动判断是否显示当前高招忍者碎片数目
			$("#for_new_a").hide();
		}else{
			$(this).addClass("on");
			ifshowshoufu_a();
			//联动判断是否显示当前高招忍者碎片数目
			$("#for_new_a").show();
		}
	});

	//页面加载完毕执行，判断免费抽开关是否开启
	if($(".btn_free").hasClass("on")){
		$("#clik").hide();
		$("#clik_free").css("display","inline-block");
	}else{
		$("#clik").css("display","inline-block");
		$("#clik_free").hide();
	}

	//免费抽开关
	$(".btn_free").on("click",function(){
		playaudio(2);
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			$("#clik").css("display","inline-block");
			$("#clik_free").hide();
			chongzhi();
		}else{
			$(this).addClass("on");
			$("#clik").hide();
			$("#clik_free").css("display","inline-block");
			chongzhi();
		}
	});

	//统计数据收缩展开
	$(".tongjilist_btns .btn").on('click',function(){
		$(".tongjilist_btns").toggleClass("on");
		$(".tongjilist_wrap").toggleClass("on");
		playaudio(2);
	});
	//公告弹窗
	$(".btn_notice,.pop_notice .btn_close").on('click',function(){
		if($(".pop_notice").hasClass("on")){
			playaudio(3);
			$(".pop_notice").addClass("zoomOut");
			$(".pop_mask").fadeOut(100);
			setTimeout(function(){
				$(".pop_notice").removeClass("on");
			},500);
		}else{
			playaudio(2);
			$(".pop_notice").addClass("on");
			$(".pop_notice").removeClass("zoomOut");
			$(".pop_mask").fadeIn(100);
		}
	});

	//公众号弹窗
	$(".jump_gzh,.pop_gzh .btn_close").on('click',function(){
		if($(".pop_gzh").hasClass("on")){
			playaudio(3);
			$(".pop_gzh").addClass("zoomOut");
			setTimeout(function(){
				$(".pop_gzh").removeClass("on");
			},500);
		}else{
			playaudio(2);
			$(".pop_gzh").addClass("on");
			$(".pop_gzh").removeClass("zoomOut");
		}
	});

	//新忍者弹窗
	$(".pop_newninja .btn_close").on('click',function(){
		if($(".pop_newninja").hasClass("on")){
			playaudio(3);
			$(".pop_newninja").addClass("zoomOut");
			setTimeout(function(){
				$(".pop_newninja").removeClass("on");
			},500);
		}else{
			playaudio(2);
			$(".pop_newninja").addClass("on");
			$(".pop_newninja").removeClass("zoomOut");
		}
	});
	
	//信息弹窗
	$(".btn_info,.pop_info .btn_close").on('click',function(){
		if($(".pop_info").hasClass("on")){
			playaudio(3);
			$(".pop_info").addClass("zoomOut");
			$(".pop_mask").fadeOut(100);
			setTimeout(function(){
				$(".pop_info").removeClass("on");
			},500);
		}else{
			playaudio(2);
			$(".pop_info").addClass("on");
			$(".pop_info").removeClass("zoomOut");
			$(".pop_mask").fadeIn(100);
		}
	});
	
	//设置弹窗
	$(".btn_setting,.pop_setting .btn_close").on('click',function(){
		if($(".pop_setting").hasClass("on")){
			playaudio(3);
			$(".pop_setting").addClass("zoomOut");
			$(".pop_mask").fadeOut(100);
			setTimeout(function(){
				$(".pop_setting").removeClass("on");
			},500);
		}else{
			playaudio(2);
			$(".pop_setting").addClass("on");
			$(".pop_setting").removeClass("zoomOut");
			$(".pop_mask").fadeIn(100);
		}
	});
	
	//a首付奖励弹窗
	$(".btn_baoxiang_a,.pop_baoxiang_a .btn_close").on('click',function(){
		if($(".pop_baoxiang_a").hasClass("on")){
			playaudio(3);
			$(".pop_baoxiang_a").addClass("zoomOut");
			$(".pop_mask").fadeOut(100);
			setTimeout(function(){
				$(".pop_baoxiang_a").removeClass("on");
			},500);
		}else{
			playaudio(2);
			$(".pop_baoxiang_a").addClass("on");
			$(".pop_baoxiang_a").removeClass("zoomOut");
			$(".pop_mask").fadeIn(100);
		}
	});

	//解封奖励领取
	$(".btn_baoxiang").on('click',function(){
			playaudio(3);
			if(isaddsuipian_s == 0){
				//宝箱变为打开状态
				$(this).removeClass("tada","infinite").addClass("opened");
				addsuipian_s(1);
			}else{
				toast("#toast","解封奖励只能领取一次！");
			}
	});
	
	//指引提示，点击关闭
	$(".guide_wrap").on('click',function(){
		$(this).hide(500);
	});






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
//概率值 百分数
var gailv_s = 10;
var gailv_a = 0;
var gailv_b = 40;
var gailv_c = 100-gailv_s-gailv_a-gailv_b;
//幸运值
var luckystar = 0;
//抽次数
var i = parseInt($("#cishu").html());
var i_free = 0;
//免费抽的次数
var num_free = parseInt($("#clik_free .num_free").html());
//各种碎片数量
var num_s = parseInt($("#num_s").html());
var num_s_new = parseInt($("#num_s_new").html());
var num_a = parseInt($("#num_a").html());
var num_a_new = parseInt($("#num_a_new").html());
var num_b = parseInt($("#num_b").html());
var num_c = parseInt($("#num_c").html());
var num_s_new_zengjia = 0;
var num_a_new_zengjia = 0;
//全局定义是否领取S首付奖励，初始状态为0
var isaddsuipian_s = 0;
//全局定义是否领取A首付奖励，初始状态为0
var isaddsuipian_a = 0;
//悲剧指数
var sad = 0;
//是否弹出过获得新忍者图
var istanchunewninja = 0;
//你真黑的次数计数
var count_nizhenhei = 0;
//是否弹出过你是真的黑toast
var toast_nizhenhei = 0;
//全局定义新s名称、新a名称，默认给值为 当前忍者配置中默认选中的
var name_s_new = $(".pop_setninja .tabbox_bd_item_s .item_wrap:eq(0)").attr("data-name");
var name_a_new = $(".pop_setninja .tabbox_bd_item_s .item_wrap:eq(0)").attr("data-name");


	
//单抽操作
$('#clik').on('click',function() {
	
	playaudio(2);
	$(".box .btns").hide();
	setTimeout(function(){$(".box .btns").fadeIn(100);},500);
	$(".resultlist").html("");
	$(".box").addClass("danchou");
	$(".box").removeClass("shilian");

	//判断幸运值是否满100
	if( luckystar >= 100 ){
		//必出忍者信物，让raNum在0~3.5范围内即可
		raNum = 1;
	}else{
		//随机数生成
		raNum = Math.random()*100;
	}
	i++;
	$("#cishu").html(i+i_free);
	$("#cishujinbi").html(i*120);
	//返回结果
	A();

});
//免费单抽操作，即不计算金币
$('#clik_free').on('click',function() {
	
	playaudio(2);
	$(".box .btns").hide();
	setTimeout(function(){$(".box .btns").fadeIn(100);},500);
	$(".resultlist").html("");
	$(".box").addClass("danchou");
	$(".box").removeClass("shilian");

	//判断幸运值是否满100
	if( luckystar >= 100 ){
		//必出忍者信物，让raNum在0~3.5范围内即可
		raNum = 1;
	}else{
		//随机数生成
		raNum = Math.random()*100;
	}
	i_free++;
	$("#cishu").html(i+i_free);
	//$("#cishujinbi").html(i*120);
	//返回结果
	A();

	//判断是否用尽免费7次
	num_free = num_free-1;
	$("#clik_free .num_free").html(num_free);
	if(num_free<1 ){
		$('#clik_free').hide();
		$('#clik').css("display","inline-block");
	}

});

//十连操作
$('#clik10').on('click',function() {
	
	playaudio(2);
	$(".box .btns,.btn_setting").hide();
	//setTimeout(function(){$(".btns,.btn_setting").fadeIn(100);},3700);
	$(".resultlist").html("");
	$(".box").addClass("shilian");
	$(".box").removeClass("danchou");
	num_s_new_zengjia = 0;
	num_a_new_zengjia = 0;
	//重复10次
	var repeat = 10;  // 限制执行次数为10次
	var timer = setInterval(function() {    
		if (repeat == 0) {
			clearInterval(timer);
			$(".box .btns,.btn_setting").fadeIn(100);
		} else {
			repeat--;
			//判断幸运值是否满100
			if( luckystar >= 100 ){
				//必出忍者信物，让raNum在0~3.5范围内即可
				raNum = 1;
			}else{
				//随机数生成
				raNum = Math.random()*100;
			}
			i++;
			$("#cishu").html(i+i_free);
			$("#cishujinbi").html(i*120);
			//返回结果
			A();
		}
	}, 500);

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
	$(".luckystars_num").html("0/100").attr("data-text","0/100");
	$(".luckystars_bar").css("height","0");
	$(".btn_baoxiang").addClass("tada","infinite").removeClass("opened");
	if($(".btn_free").hasClass("on")){
		$("#clik").hide();
		$("#clik_free").css("display","inline-block");
	}else{
		$("#clik").css("display","inline-block");
		$("#clik_free").hide();
	}
	$(".btn_baoxiang").hide(100);
	i = 0;
	i_free = 0;
	num_free = 7;
	$("#clik_free .num_free").html(num_free);
	num_s = 0;
	num_s_new = 0;
	num_a = 0;
	num_a_new = 0;
	num_b = 0;
	num_c = 0;
	//是否领取首付 重置
	isaddsuipian_s = 0;
	isaddsuipian_a = 0;
	//首付奖励宝箱变为关闭外观
	$(".baoxianglist .item").removeClass("open");
	//重置悲剧指数
	sad = 0;
	//重置幸运值
	luckystar = 0;
	//是否弹出过获得新忍者图 重置
	istanchunewninja = 0;
	//你真黑的次数
	var count_nizhenhei = 0;
	//是否弹出过你是真的黑toast
	var toast_nizhenhei = 0;
	//重新判断首付奖励按钮是否出现
	ifshowshoufu_s();
}
$('#reset').on('click',function() {
	playaudio(4);
	chongzhi();
});


//输出碎片
function writelog(a,j,h,m){
	$(".resultlist").append("<div class='animated fadeIn item_wrap'><div class='item item_"+j+"'><div class='img img"+m+"'></div><div class='fg'><p class='num'>"+h+"</p></div><div class='yanwu'></div></div><p class='text'>"+a+"</p></div>");
	// console.log(m);
	playaudio(1);
}


//恭喜提示
function gongxi(obj,t){
	$(obj).show("300");
	$(obj).animate({opacity:0},0);
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

//toast提示，obj对象，t提示的内容
function toast(obj,t){
	clearTimeout(timer);
	$(obj).html(t);
	$(obj).parent().stop(true,true);
	$(obj).parent().fadeIn(0);
	var timer = setTimeout(function(){
		$(obj).parent().fadeOut(300);
	},2000);
}

//悲剧指数反馈
function showsad(){
	if($(".btn_sad").hasClass("on")){
		$("html").attr("class","gray"+sad);
	}else{
		$("html").attr("class","gray0");
		//sad = 0;
	}
}

//幸运值反馈，影响概率值
function doluckyevent(){
	$(".luckystars_bar").css("height",luckystar+"%");
	$(".luckystars_num").html(luckystar+"/100");
	$(".luckystars_num").attr("data-text",luckystar+"/100");
}


//定义事件：是否出现解封奖励
function ifshowshoufu_s(){
	if(i+i_free>=60 && isaddsuipian_s == 0 && $(".btn_shoufu_s").hasClass("on")){
		$(".btn_baoxiang").show(100);
	}else{
		//$(".btn_baoxiang").hide(100);
	}	
}
//领取S首付奖励
function addsuipian_s(n){
	//增加s碎片数量
	num_s = num_s + n;
	num_s_new = num_s_new +n;
	$("#num_s").html(num_s);
	$("#num_s_new").html(num_s_new);
	//是否领取解封奖励状态变为1
	isaddsuipian_s = 1;
	//解封奖励变为已领取状态
	$(".btn_baoxiang").addClass("opened");
	//恭喜文字提示
	gongxi("#congratulation","已领取解封60次奖励 <span>忍者信物 × "+n+"</span>");
}






//返回结果进入数据统计
function A(){
	
	console.log("随机数="+raNum+",次数="+i+",");
	if(0 < raNum && raNum <= gailv_s ){
			//信物 出现2片和1片的概率，先判断是否幸运值满100，若是则必出2片
			if( luckystar == 100 ){
				var n = 1;
			}else{
				var n = parseInt(Math.random()*(2-1+1)+1,10);
			}
			//抽到信物，幸运值重置
			luckystar = 0;
			doluckyevent();
			console.log("幸运值为"+luckystar+"；s概率目前为"+gailv_s+"；a目前概率为"+gailv_a+"；b目前概率为"+gailv_b+"；c目前概率为"+gailv_c);
			if(n==1){
				num_this = 2;
				num_s = num_s+2;
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
			num_s_new_zengjia = num_s_new_zengjia + num_this;
			$("#num_s_new").html(num_s_new);
			//gongxi("#congratulation","恭喜你获得 <span>"+name_s_new+"碎片 × "+num_this+"</span>");
			//return;
		}else if(gailv_s+gailv_a < raNum && raNum <= gailv_s+gailv_a+gailv_b){
			//B忍
			num_this = 1;
			num_b++;
			//抽不到忍者信物，幸运值+5
			luckystar=luckystar+5;
			doluckyevent();
			console.log("幸运值为"+luckystar+"；信物目前为"+gailv_s+"；a目前概率为"+gailv_a+"；b目前概率为"+gailv_b+"；c目前概率为"+gailv_c);
			//随机出现某个忍者 1-3
			//var m = parseInt(Math.random()*10);
			var m = parseInt(Math.random()*(3-1+1)+1,10);
			writelog("B碎片 × "+num_this,"b",num_this,m);
			$("#num_b").html(num_b);
			//return;
		}else if(gailv_s+gailv_a+gailv_b < raNum && raNum <= 100){
			//C忍
			num_this = 1;
			num_c++;
			//抽不到忍者信物，幸运值+5
			luckystar=luckystar+5;
			doluckyevent();
			console.log("幸运值为"+luckystar+"；信物目前为"+gailv_s+"；a目前概率为"+gailv_a+"；b目前概率为"+gailv_b+"；c目前概率为"+gailv_c);
			//随机出现某个忍者 1-3
			//var m = parseInt(Math.random()*10);
			var m = parseInt(Math.random()*(3-1+1)+1,10);
			writelog("C碎片 × "+num_this,"c",num_this,m);
			$("#num_c").html(num_c);
			//return;
		}
	//console.log("s="+num_s+",a="+num_a+",a_new="+num_a_new+",b="+num_b+",c="+num_c+",");
				
		//事件：解封奖励是否出现
		ifshowshoufu_s();

}
