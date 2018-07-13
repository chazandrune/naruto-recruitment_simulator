// 辅助程序开始
// 时间：20180703
// 作者：某熊
	//分辨率适应及横屏竖屏处理
/*    var adjust = function(){
		var width = document.documentElement.clientWidth;
		var height =  document.documentElement.clientHeight;
		if($(window).innerWidth() < 900){
			var fs = $(window).innerWidth()*100/900;
		}else{
			var fs = 900*100/900;
		}
		$('html').css('font-size',fs);
	};
	adjust();
	window.onresize = adjust;
	if ((navigator.userAgent.indexOf('MSIE') >= 0)&& (navigator.userAgent.indexOf('Opera') < 0)){
		window.attachEvent("onresize",adjust);
	};*/
	//关于弹窗
	$(".btn_info,.pop_info .btn_close").on('click',function(){
		if($(".pop_info").hasClass("on")){
			$(".pop_info").addClass("zoomOut");
			setTimeout(function(){
				$(".pop_info").removeClass("on");
			},500)
			$(".pop_mask").fadeOut(100);
		}else{
			$(".pop_info").addClass("on");
			$(".pop_info").removeClass("zoomOut");
			$(".pop_mask").fadeIn(100);
		}
	})
	
	//设置弹窗
	$(".btn_setting,.pop_setting .btn_close").on('click',function(){
		if($(".pop_setting").hasClass("on")){
			$(".pop_setting").addClass("zoomOut");
			setTimeout(function(){
				$(".pop_setting").removeClass("on");
			},500)
			$(".pop_mask").fadeOut(100);
		}else{
			$(".pop_setting").addClass("on");
			$(".pop_setting").removeClass("zoomOut");
			$(".pop_mask").fadeIn(100);
		}
	})
	
	//重来按钮
	$("#reset").on('click',function(){
		$(".pop_setting").addClass("on");
		$(".pop_setting").removeClass("zoomOut");
		$(".pop_mask").fadeIn(100);
		
		$(".pop_resultpic").addClass("zoomOut");
		setTimeout(function(){
			$(".pop_resultpic").removeClass("on");
		},500)
		
	})
	


////////////////////////////////textarea input框剩余字数效果///////////////////////////////////
function exeTextKeyUp(t){
	var max = parseInt(t.attr('maxlength'));
	if(t.length>0){
		if(t.val().length > max){
			t.val(t.val().substr(0, t.attr('maxlength')));
		}
		if (t.parent().find(".lastfont b").length>0)
		{
			t.parent().find(".lastfont b").html(max - t.val().length);
		} else if (t.parent().parent().find(".lastfont b").length>0) {
			t.parent().parent().find(".lastfont b").html(max - t.val().length);
		}
	} else {
		
	}
}
/*$(document).ready(function(){
	$('textarea[maxlength]').on('keyup',function(){
		exeTextKeyUp($(this));
	});
	$('textarea[maxlength]').on('blur',function(){
		exeTextKeyUp($(this));
	});
	
	$('input[maxlength]').on('keyup',function(){
		exeTextKeyUp($(this));
	});
	$('input[maxlength]').on('blur',function(){
		exeTextKeyUp($(this));
	});
	
	$.each($('textarea[maxlength]'),function(i,n){
		exeTextKeyUp($(this));
	});
	$.each($('input[maxlength]'),function(i,n){
		exeTextKeyUp($(this));
	});
});*/
////////////////////////////////上传附件时设定的最大积分数设定///////////////////////////////////
function MaxScore(e){
	var max_score = parseInt(e.attr('maxscore'));
	var cur_score = e.val();
	if(!isNaN(cur_score)){
		if(cur_score > max_score){
			e.val(max_score);
		} else {}
	} else {
		e.val('');
		}
}
/*$(document).ready(function(){
	$('textarea[maxscore]').on('keyup',function(){
		MaxScore($(this));
	});
	$('textarea[maxscore]').on('blur',function(){
		MaxScore($(this));
	});
	
	$('input[maxscore]').on('keyup',function(){
		MaxScore($(this));
	});
	$('input[maxscore]').on('blur',function(){
		MaxScore($(this));
	});
	
	$.each($('textarea[maxscore]'),function(i,n){
		MaxScore($(this));
	});
	$.each($('input[maxscore]'),function(i,n){
		MaxScore($(this));
	});
});*/


	

	
	






// 主要程序开始
// 时间：20180511
// 作者：某熊
var now =new Date();
var hours = now.getHours();
var minutes = now.getMinutes();
var seconds = now.getSeconds();
var t = hours+":"+minutes+":"+seconds;
console.log("页面打开时间："+t);





//定义用户名称和等级的同步显示
function tongbu(e,obj){
	var val=$(obj).val();
	var val_0=$(obj).attr("data-default");
	if(val==""){
		e.html(val_0)
	}else{
		e.html(val)
	}
}

//定义我的第几个忍者图片数字输出
function tongbuimg(e,obj){
	e.html("");
	//  % 取余
	var ninjanum=$(obj).val();
	var baiwei=parseInt(ninjanum/100); 
	var shiwei=parseInt((ninjanum%100)/10); 
	var gewei=parseInt(ninjanum%10);
	if(ninjanum==""){
		e.append('<img src="images/1.png"><img src="images/0.png"><img src="images/0.png">')
	}else{
		if(baiwei==0){
			if(shiwei==0){
				e.append('<img src="images/'+gewei+'.png">')
			}else{
				e.append('<img src="images/'+shiwei+'.png">')
				e.append('<img src="images/'+gewei+'.png">')
			}
		}else{
			e.append('<img src="images/'+baiwei+'.png">')
			e.append('<img src="images/'+shiwei+'.png">')
			e.append('<img src="images/'+gewei+'.png">')
		}
	}
}

//更新分享图上的忍者立绘和忍者名称
function updateimg(){
	var ninjaval = $("#select_ninja_select").val();
	var ninjarank = $("#select_ninja_select").find("option:selected").attr("data-rank");
	console.log(ninjarank);
	$('.ninja_avatar img').attr("src","images/ninja/ninja_avatar_"+ninjaval+".png");
	$('.ninja_name img').attr("src","images/ninja/ninja_name_"+ninjaval+".png");
	$('.txt_chenggong_rank img').attr("src","images/rank_"+ninjarank+".png");

}

//手动选择忍者
$("#select_ninja_select").on('change',function(){
	updateimg();
})

//定义随机选择忍者方法
function suijixuan(){
	var suijishu = parseInt(Math.random()*(11-0+1)+0,10);
	//parseInt(Math.random()*(max-min+1)+min,10);
	// Math.floor(Math.random()*(max-min+1)+min);
	console.log(suijishu);
	var options = document.getElementById('select_ninja_select').children;
    options[suijishu].selected=true;
	updateimg();
}

//输出最终图像
function print(){
	//$('.container_form').slideUp();
	$('.container_box_scroll').slideUp();
	$(".pop_resultpic").addClass("on");
	$(".pop_resultpic").removeClass("zoomOut");
	$(".pop_mask").fadeIn(100);

	html2canvas( $('#thepic')[0],{scale:2,logging:false,useCORS:true} ).then(function(canvas){
    		//document.body.appendChild(canvas);
			$('#canvas_import').append(canvas);
    		$('#avatar_import').attr( 'src' , canvas.toDataURL() ) ;
	});
	$(".pop_setting").addClass("zoomOut");
	setTimeout(function(){
		$(".pop_setting").removeClass("on");
	},500)
	$(".pop_mask").fadeOut(100);

}

