// 辅助程序开始
// 时间：20180703
// 作者：某熊
//解决移动端300ms延迟点击
FastClick.attach(document.body);
//解决移动端按钮按下效果bug
document.body.addEventListener('touchstart', function () {},false); 
//解决微信禁止上下滑动
// document.body.addEventListener('touchmove', function (e) {
//   e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
// }, {passive: false});

	//判断全面屏
console.log("屏幕尺寸："+window.screen.width+"*"+window.screen.height);
var screen_w = window.screen.width;
var screen_h = window.screen.height;
var quanmianping = 0;
if(window.screen.width > window.screen.height){
	screen_w = window.screen.height;
	screen_h = window.screen.width;
}
if( screen_h / screen_w > 1.8 ){
	quanmianping = 1;
	$(".container").addClass("quanmianping");
	//$(".container").css("width",640*screen_h / screen_w+"px");
}

	//分辨率适应及横屏竖屏处理
    var adjust = function(){
		var width = document.documentElement.clientWidth;
		var height =  document.documentElement.clientHeight;
		if( height < 1000 && height >= 600){
			var fs = height*100/1000;
		}else if( height < 600 ){
			var fs = 600*100/1000;
		}else{
			var fs = 1000*100/1000;
		}
		$('html').css('font-size',fs);
	};
	adjust();
	window.onresize = adjust;
	if ((navigator.userAgent.indexOf('MSIE') >= 0)&& (navigator.userAgent.indexOf('Opera') < 0)){
		window.attachEvent("onresize",adjust);
	};
	//关于弹窗
	$(".btn_info,.pop_info #btn_close").on('click',function(){
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
	
	//公众号弹窗
	$(".jump_gzh,.pop_gzh .btn_close").on('click',function(){
		if($(".pop_gzh").hasClass("on")){
			$(".pop_gzh").addClass("zoomOut");
			setTimeout(function(){
				$(".pop_gzh").removeClass("on");
			},500);
		}else{
			$(".pop_gzh").addClass("on");
			$(".pop_gzh").removeClass("zoomOut");
		}
	});
	
	//重来按钮
	$("#reset").on('click',function(){
		$(".pop_form").addClass("on");
		$(".pop_form").removeClass("zoomOut");
		$(".pop_mask").fadeIn(100);
		
		$(".pop_resultpic").addClass("zoomOut");
		setTimeout(function(){
			$(".pop_resultpic").removeClass("on");
		},500)
		
	})


	//重来按钮
	$("#retry").on('click',function(){
		$(".pop_form").addClass("on");
		$(".pop_form").removeClass("zoomOut");
		$(".pop_mask").fadeOut(100);
		//$('#canvas_import').empty();
		$('#avatar_import').attr('src','');
		
		$(".pop_resultpic").addClass("zoomOut");
		setTimeout(function(){
			$(".pop_resultpic").removeClass("on");
		},500)
		
	})	

	//生成按钮
    $('#btn_import,#refresh').on('click',function(){
		//suijixuan();
        setTimeout(function(){printimg();},300);
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


$("input").on("blur",function(){
	window.scroll(0,0);//失焦后强制让页面归位
});	



//js本地图片预览，兼容ie[6-9]、火狐、Chrome17+、Opera11+、Maxthon3
function PreviewImage(fileObj,imgPreviewId,imgPreviewId2,divPreviewId){
    var allowExtention=".jpg,jpeg,JPG,JPEG,.bmp,.gif,.png"; //允许上传文件的后缀名document.getElementById("hfAllowPicSuffix").value;
    var extention=fileObj.value.substring(fileObj.value.lastIndexOf(".")+1).toLowerCase();            
    var browserVersion= window.navigator.userAgent.toUpperCase();
    if(allowExtention.indexOf(extention)>-1){ 
        if(fileObj.files){ //HTML5实现预览，兼容chrome、火狐7+等
            if(window.FileReader){
                var reader = new FileReader(); 
                reader.onload = function(e){
                    document.getElementById(imgPreviewId).setAttribute("src",e.target.result);
                    document.getElementById(imgPreviewId2).setAttribute("src",e.target.result);
                }  
                reader.readAsDataURL(fileObj.files[0]);
            }else if(browserVersion.indexOf("SAFARI")>-1){
                alert("不支持Safari6.0以下浏览器的图片预览!");
            }
        }else if (browserVersion.indexOf("MSIE")>-1){
            if(browserVersion.indexOf("MSIE 6")>-1){//ie6
                document.getElementById(imgPreviewId).setAttribute("src",fileObj.value);
                document.getElementById(imgPreviewId2).setAttribute("src",fileObj.value);
            }else{//ie[7-9]
                fileObj.select();
                if(browserVersion.indexOf("MSIE 9")>-1)
                    fileObj.blur();//不加上document.selection.createRange().text在ie9会拒绝访问
                var newPreview =document.getElementById(divPreviewId+"New");
                if(newPreview==null){
                    newPreview =document.createElement("div");
                    newPreview.setAttribute("id",divPreviewId+"New");
                    newPreview.style.width = document.getElementById(imgPreviewId).width+"px";
                    newPreview.style.height = document.getElementById(imgPreviewId).height+"px";
                    newPreview.style.border="solid 1px #d2e2e2";
                }
                newPreview.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";                            
                var tempDivPreview=document.getElementById(divPreviewId);
                tempDivPreview.parentNode.insertBefore(newPreview,tempDivPreview);
                tempDivPreview.style.display="none";                    
            }
        }else if(browserVersion.indexOf("FIREFOX")>-1){//firefox
            var firefoxVersion= parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
            if(firefoxVersion<7){//firefox7以下版本
                document.getElementById(imgPreviewId).setAttribute("src",fileObj.files[0].getAsDataURL());
                document.getElementById(imgPreviewId2).setAttribute("src",fileObj.files[0].getAsDataURL());
            }else{//firefox7.0+                    
                document.getElementById(imgPreviewId).setAttribute("src",window.URL.createObjectURL(fileObj.files[0]));
                document.getElementById(imgPreviewId2).setAttribute("src",window.URL.createObjectURL(fileObj.files[0]));
            }
        }else{
            document.getElementById(imgPreviewId).setAttribute("src",fileObj.value);
            document.getElementById(imgPreviewId2).setAttribute("src",fileObj.value);
        }         
    }else{
        alert("仅支持"+allowExtention+"为后缀名的文件!");
        fileObj.value="";//清空选中文件
        if(browserVersion.indexOf("MSIE")>-1){                        
            fileObj.select();
            document.selection.clear();
        }                
        fileObj.outerHTML=fileObj.outerHTML;
    }
}
	






// 主要程序开始
// 时间：20190925
// 作者：某熊
var now =new Date();
var hours = now.getHours();
var minutes = now.getMinutes();
var seconds = now.getSeconds();
var t = hours+":"+minutes+":"+seconds;
console.log("页面打开时间："+t);
//分享类型，默认0，是忍者分享，1是战力分享
var whichshare = 0;

//分享类型的变化
$("#whichshare_select").on('change',function(){
	"use strict";
	whichshare = $(this).val();
	console.log(whichshare);
	if( whichshare == 0 ){
		//0、忍者分享
		$(".thepic").removeClass("sharetype_zhanli");
		$(".thepic").removeClass("sharetype_ninja2");
		$(".form_item_zhanli").hide();
		$(".form_item_ninja").show();
		$(".pop_setninja .ninjalist .item_wrap").show();
	}
});

//定义我的战力图片数字输出
function tongbuzhanli(e,obj){
	"use strict";
	e.html("");
	var zhanlinum = $(obj).val();
	var zhanlinum_0 = $(obj).attr("data-default");
    if( zhanlinum == "" ){
	    var zhanli_split = zhanlinum_0.split("");
    }else{
	    var zhanli_split = zhanlinum.split("");
    }
	var zhanli = "";
    for(var i = 0; i < zhanli_split.length; i++) {
        zhanli += '<img src="images/zl_' + zhanli_split[i] + '.png" />';
    }
    e.html(zhanli);
}

//定义用户名称和等级的同步显示
function tongbu(e,obj){
	var val=$(obj).val();
	var val_0=$(obj).attr("data-default");
	if(val==""){
		e.html(val_0);
		$("#"+e.attr("id")+"_shadow").html(val_0);
	}else{
		e.html(val)
		$("#"+e.attr("id")+"_shadow").html(val);
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

	$('.ninja_touxiangkuang img').attr("src","");

	$(".loadtoast p").html("正在配置");
	var gengxinchaoshi = setTimeout(function(){
		$(".loadtoast p").html('响应较慢<br>你可以继续等待或者<a onclick="location.reload()">点击刷新</a>');
	},5000)
	$(".loadtoast").show();
	var ninjaid = cache_id;
	var ninjarank = cache_rank;
	var ninjaname = cache_name;
	console.log(ninjarank)
	if(ninjarank !='s'){
		$('#thepic').addClass('game');
		$('.btn_upload').addClass('game');
	}else{
		$('#thepic').removeClass('game');
		$('.btn_upload').removeClass('game');
	}

	$('.ninja_touxiangkuang img').attr("src","images/PictureFrames/PictureFrames_"+ninjaid+".png");
	$('#input_ninja').val(ninjaname);
	$(".ninja_touxiangkuang img").load(function(){
		console.log("图片加载完成");
		$(".loadtoast").hide();
		clearTimeout(gengxinchaoshi);
		//关闭忍者配置弹窗
		$(".pop_setninja").addClass("zoomOut");
		setTimeout(function(){
			$(".pop_setninja").removeClass("on");
		},1000);

	})
}

//select手动选择忍者
// $("#select_ninja_select").on('change',function(){
// 	updateimg();
// })

//忍者配置操作
//tab切换
$(".tabbox .tabbox_hd .tabbox_hd_item").on("click",function(){
	//playaudio(2);
	var i = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$(".tabbox .tabbox_bd .tabbox_bd_item").eq(i).addClass("active").siblings().removeClass("active");
});
//定义几个暂存配置数据的变量，包含新S忍者头像的x坐标、y坐标、忍者名称，新A忍者头像的x坐标、y坐标、忍者名称
var cache_id = $(".pop_setninja .tabbox_bd_item .item_wrap.active").attr("data-id");
var cache_rank = $(".pop_setninja .tabbox_bd_item .item_wrap.active").attr("data-rank");
var cache_name = $(".pop_setninja .tabbox_bd_item .item_wrap.active").attr("data-name");
//选中忍者时，把数据存入到暂存变量中
$(".pop_setninja .tabbox_bd_item .item_wrap").on("click",function(){
	//playaudio(2);
	$(".pop_setninja .tabbox_bd_item .item_wrap").removeClass("active");
	$(this).addClass("active");
	cache_id = $(this).attr("data-id");
	cache_rank = $(this).attr("data-rank");
	cache_name = $(this).attr("data-name");
});
//忍者配置弹窗操作，除了控制弹窗的关闭外，还需要判断确认操作和放弃操作
$(".btn_setninja,.pop_setninja .btn_close").on('click',function(){
	if( $(".pop_setninja").hasClass("on") ){
		//放弃配置忍者，重置暂存数据，默认回到第一个（需要注意的是默认最新忍者排在第一个，按照时间倒序排列忍者）
		cache_id = $(".pop_setninja .tabbox_bd_item .item_wrap:eq(0)").attr("data-id");
		cache_rank = $(".pop_setninja .tabbox_bd_item .item_wrap:eq(0)").attr("data-rank");
		cache_name = $(".pop_setninja .tabbox_bd_item .item_wrap:eq(0)").attr("data-name");
		$(".pop_setninja .tabbox_bd_item .item_wrap").removeClass("active");
		$(".pop_setninja .tabbox_bd_item .item_wrap:eq(0)").addClass("active");
		$(".tabbox .tabbox_hd .tabbox_hd_item:eq(0)").addClass("active").siblings().removeClass("active");
		$(".tabbox .tabbox_bd .tabbox_bd_item:eq(0)").addClass("active").siblings().removeClass("active");

		//playaudio(3);
		$(".pop_setninja").addClass("zoomOut");
		setTimeout(function(){
			$(".pop_setninja").removeClass("on");
		},500);
	}else{
		//playaudio(2);
		$(".pop_setninja").addClass("on");
		$(".pop_setninja").removeClass("zoomOut");
	}
});
$(".pop_setninja .btn_done").on('click',function(){
		//配置忍者生效
		updateimg();
		//$(".tabbox .tabbox_hd .tabbox_hd_item:eq(0)").addClass("active").siblings().removeClass("active");
		//$(".tabbox .tabbox_bd .tabbox_bd_item:eq(0)").addClass("active").siblings().removeClass("active");


});



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

//定义选择上一个、下一个头像框方法
function prev_tx(){
	var previtem = $(".pop_setninja .tabbox_bd_item .item_wrap.active").prev(".item_wrap");
	var lastitem = $(".pop_setninja .tabbox_bd_item .item_wrap:last");
	//console.log(previtem.length)
	if( previtem.length != 0 ){
		previtem.addClass("active").siblings().removeClass("active");
		cache_id = previtem.attr("data-id");
		cache_rank = previtem.attr("data-rank");
		cache_name = previtem.attr("data-name");
	}else{
		lastitem.addClass("active").siblings().removeClass("active");
		cache_id = lastitem.attr("data-id");
		cache_rank = lastitem.attr("data-rank");
		cache_name = lastitem.attr("data-name");
	}
	updateimg();
}
function next_tx(){
	var nextitem = $(".pop_setninja .tabbox_bd_item .item_wrap.active").next(".item_wrap");
	var firstitem = $(".pop_setninja .tabbox_bd_item .item_wrap:eq(0)");
	//console.log(nextitem.length)
	if( nextitem.length != 0 ){
		nextitem.addClass("active").siblings().removeClass("active");
		cache_id = nextitem.attr("data-id");
		cache_rank = nextitem.attr("data-rank");
		cache_name = nextitem.attr("data-name");
	}else{
		firstitem.addClass("active").siblings().removeClass("active");
		cache_id = firstitem.attr("data-id");
		cache_rank = firstitem.attr("data-rank");
		cache_name = firstitem.attr("data-name");
	}
	updateimg();
}
$(".btn_arrow.btn_prev").on('click',function(){
	prev_tx();
});
$(".btn_arrow.btn_next").on('click',function(){
	next_tx();
});

//输出最终图像
function printimg(){
	//$('.container_form').slideUp();
	//$('.container_box_scroll').slideUp();
	//关闭表单弹窗
	$(".pop_form").addClass("zoomOut");
	//setTimeout(function(){
		$(".pop_form").removeClass("on");
	//},500)
	$(".pop_mask").fadeOut(100);
	//loading正在生成
	$(".loadtoast p").html("正在生成");
	$(".loadtoast").show();
	var shengchengchaoshi = setTimeout(function(){
		$(".loadtoast p").html('响应较慢<br>你可以继续等待或者<a onclick="location.reload()">点击刷新</a>');
	},10000)

	var canvas = document.createElement("canvas");
	if($('#thepic').hasClass('game')){
		canvas.width = 176;
		canvas.height = 176;		
	}else{
		canvas.width = 300;
		canvas.height = 300;		
	}
	
	html2canvas( $('#thepic')[0],{scale:1,canvas:canvas,logging:true,useCORS:true} ).then(function(canvas){
			//document.body.appendChild(canvas);
			//$('#canvas_import').append(canvas);
			$('#avatar_import').attr( 'src' , canvas.toDataURL() ) ;
			//最终结果图片弹出
			$(".pop_resultpic").addClass("on");
			$(".pop_resultpic").removeClass("zoomOut");
			$(".pop_mask").fadeIn(100);
			$(".loadtoast").hide();
			clearTimeout(shengchengchaoshi);
	});

}


