//在页面未加载完毕之前显示的loading Html自定义内容
var _LoadingHtml = '<div id="LoadingBar"><div class="div txt-c animated fadeIn"><div class="load-container load8"><div class="loader">Loading</div></div><p>啊……一天不抽手就痒了</p><span id="cantwaiting"></span></div></div>';
//呈现loading效果
document.write(_LoadingHtml);
setTimeout(function(){
	$("#LoadingBar p").html("服务器打瞌睡了……");
},10000)

//解决移动端300ms延迟点击
FastClick.attach(document.body);

//解决移动端按钮按下效果bug
document.body.addEventListener('touchstart', function () { }); 

//判断是否是pc
$(function(){
	if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) { 
		/*location.replace("http://www.huanyuweizhi.com/");*/  //此处填写跳转到的手机版网站页面
		$(".btn_audio").remove();
	}else{ 
		//$('body').before('你现在用的是电脑访问的'); 
	} 
})


