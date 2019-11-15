/* lee wang ju - update 140701 */

//check browser
var isie=(/msie/i).test(navigator.userAgent); //ie
var isie6=(/msie 6/i).test(navigator.userAgent); //ie 6
var isie7=(/msie 7/i).test(navigator.userAgent); //ie 7
var isie8=(/msie 8/i).test(navigator.userAgent); //ie 8
var isie9=(/msie 9/i).test(navigator.userAgent); //ie 9
var isie10=(/msie 10/i).test(navigator.userAgent); //ie 9
var isfirefox=(/firefox/i).test(navigator.userAgent); //firefox
var isapple=(/applewebkit/i).test(navigator.userAgent); //safari,chrome
var isopera=(/opera/i).test(navigator.userAgent); //opera
var isios=(/(ipod|iphone|ipad)/i).test(navigator.userAgent);//ios
var isipad=(/(ipad)/i).test(navigator.userAgent);//ipad
var isandroid=(/android/i).test(navigator.userAgent);//android
var device;
//if(isie7 || isie8 || isie9){ isie6=false;}
//if(isie9){ isie=false;}
//if(isapple || isios || isipad || isandroid){}else{}
var isie=(/msie/i).test(navigator.userAgent); //ie
var isie6=(/msie 6/i).test(navigator.userAgent); //ie 6
var isie7=(/msie 7/i).test(navigator.userAgent); //ie 7
var isie8=(/msie 8/i).test(navigator.userAgent); //ie 8
var isie9=(/msie 9/i).test(navigator.userAgent); //ie 9
var isie10=(/msie 10/i).test(navigator.userAgent); //ie 9
var isfirefox=(/firefox/i).test(navigator.userAgent); //firefox
var isapple=(/applewebkit/i).test(navigator.userAgent); //safari,chrome
var isopera=(/opera/i).test(navigator.userAgent); //opera
var isios=(/(ipod|iphone|ipad)/i).test(navigator.userAgent);//ios
var isipad=(/(ipad)/i).test(navigator.userAgent);//ipad
var isandroid=(/android/i).test(navigator.userAgent);//android
var device;
//if(isie7 || isie8 || isie9){ isie6=false;}
//if(isie9){ isie=false;}
//if(isapple || isios || isipad || isandroid){}else{}

function totalHeight (){  
	var totalHeight = 0;
	var userAgent = navigator.userAgent.toLowerCase();
	var browser = {
		msie    : /msie/.test( userAgent ) && !/opera/.test( userAgent ),
		safari  : /webkit/.test( userAgent ),
		firefox : /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ),
		opera   : /opera/.test( userAgent )
	};   
	if( browser.msie ){ //IE
    var scrollHeight = document.documentElement.scrollHeight;
    var browserHeight = document.documentElement.clientHeight;
    totalHeight = scrollHeight < browserHeight ? browserHeight : scrollHeight;
	} else if ( browser.safari ){ //Chrome || Safari
    totalHeight = document.body.scrollHeight;
	} else if ( browser.firefox ){ // Firefox || NS
    var bodyHeight = document.body.clientHeight;
    totalHeight = window.innerHeight < bodyHeight ? bodyHeight : window.innerHeight;
	} else if ( browser.opera ){ // Opera
    var bodyHeight = document.body.clientHeight;
    totalHeight = window.innerHeight < bodyHeight ? bodyHeight : window.innerHeight;
	} else { 
    //alert("지원하지 않는 브라우져!!");
	}
	return(totalHeight);
}
//totalHeight();

















/* 탭메뉴 이미지 플러그인 */
(function($){
	$.fn.tab_image_Setting = function(o){
		o = $.extend({
		}, o || {});
		return this.each(function(){
			var e = $(this);
			var tabW = o.width;
			var tabH = o.height;
			var tabM_L = o.marginleft;
			var tabM_T = o.marginTop;
			var tabCur = 0;
			var tabChk = 0;
			var tabVar = e.find("#tabMenuBox .listBox>a");
			var tabTot = tabVar.size();
			var tabCol = o.colNum
			var tabRow = Math.ceil(tabTot/4);
			var tabBottom = o.outHeight
			var tabTop = o.overHeight;
			var tabCon = o.contentBox;
			var tabCateUse = o.categoryUse;
			var tabCate;
			var tabCateName;
			var tabCateTot;
			if(tabCateUse){
				tabCate = o.category;
				tabCateName = o.cateName
				tabCateTot = tabCate.length;
			}

			var ePosXArr = [];
			var ePosYArr = [];

			/* 초기 백그라운드 셋팅 */
			tabVar.css({	
				"background-image":"url("+o.background+")",
				"background-repeat":"no-repeat",
				"background-position":"0px 0px"
				})
			e.find("#tabMenuBox .listBox>a:eq("+(0)+")").addClass("first-row") // 첫줄 첫번째 마진값없애기
			e.find("#tabMenuBox .listBox>a:eq("+(tabCol)+")").addClass("first-row") // 두번줄 첫번째 마진값없애기
			// 현재 2줄 탭까지 가능 3줄부터는 추가 
			for(i=0; i<tabTot; i++){
				var eVar = e.find("#tabMenuBox .listBox>a:eq("+(i)+")");
				if(i<tabCol){ 
					if(eVar.hasClass("first-row")){
						ePosX = -(tabW*i)-(i*tabM_L);
						ePosY = -(tabBottom);
						ePosXArr[i] = ePosX
						ePosYArr[i] = ePosY
						eVar.css({
						"width" : tabW,
						"height" : tabH,
						"background-position" : ePosX+"px "+ePosY+"px"
						}).addClass("first-col");
					}else{
						ePosX = -(tabW*i)-(i*tabM_L);
						ePosY = -(tabBottom);
						ePosXArr[i] = ePosX
						ePosYArr[i] = ePosY
						eVar.css({
						"width" : tabW,
						"height" : tabH,
						"margin-left" : tabM_L,
						"background-position" : ePosX+"px "+ePosY+"px"
						}).addClass("first-col");
					}
				}else{ 
					if(eVar.hasClass("first-row")){
						ePosX = -(tabW*(i-tabCol))-((i-tabCol)*tabM_L);
						ePosY = -(tabBottom)-(tabH+tabM_T);
						ePosXArr[i] = ePosX
						ePosYArr[i] = ePosY
						eVar.css({
						"width" : tabW,
						"height" : tabH,
						"background-position" : ePosX+"px "+ePosY+"px"
						}).addClass("second-col");
					}else{
						ePosX = -(tabW*(i-tabCol))-((i-tabCol)*tabM_L);
						ePosY = -(tabBottom)-(tabH+tabM_T);
						ePosXArr[i] = ePosX
						ePosYArr[i] = ePosY
						eVar.css({
						"width" : tabW,
						"height" : tabH,
						"margin-left" : tabM_L,
						"background-position" : ePosX+"px "+ePosY+"px"
						}).addClass("second-col");
					}
				} // 현재 2줄 탭까지 가능 3줄부터는 if문 추가 
			}
			
			if(tabCateUse){ // cat 배열비교시
				var getParameter = function (param) {
					var returnValue;
					var url = location.toString(); 
					var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
					for (var i = 0; i < parameters.length; i++) {
						var varName = parameters[i].split('=')[0];
						if (varName.toUpperCase() == param.toUpperCase()) {
							returnValue = parameters[i].split('=')[1];
							for (var i = 0; i < tabCateTot; i++) {
								if(tabCate[i] == decodeURIComponent(returnValue)){
									return i+1;
								}
							}
						}
					}
				};
			}else{ // mod 숫자체크시
				var getParameter = function (param) {
					var returnValue;
					var url = location.toString(); 
					var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
					for (var i = 0; i < parameters.length; i++) {
						var varName = parameters[i].split('=')[0];
						if (varName.toUpperCase() == param.toUpperCase()) {
							returnValue = parameters[i].split('=')[1];
							return decodeURIComponent(returnValue);
						}
					}
				};
			}
		
			function fn_tab_Change(tabCur,tabChk){
				for(i=0; i<tabTot; i++){
					var eVar = e.find("#tabMenuBox .listBox>a:eq("+(i)+")");
					eVar.removeClass("active");
					if(tabCon){ //컨텐츠박스 있을때
						tabPart =  e.find("#tabContentBox #tab_"+(i+1)+"");
						tabPart.css("display","none");
					}
				}
				if(tabChk<tabCol+1){ //tabChk는 1부터 계산하기때문에 tabCol+1
					e.find("#tabMenuBox .listBox>a:eq("+(tabChk-1)+")").css({
						"background-position-y":-(tabBottom)
					});
				}else{
					e.find("#tabMenuBox .listBox>a:eq("+(tabChk-1)+")").css({"background-position-y":-(tabBottom+tabH+tabM_T)});
				}
				e.find("#tabMenuBox .listBox>a:eq("+(tabCur-1)+")").addClass("active");
				if(tabCon){ //컨텐츠박스 있을때
					 e.find("#tabContentBox #tab_"+(tabCur)+"").css("display","block");
				}
			}
			
			$(function(){
				/* e.find("#tabMenuBox .listBox>a").mouseover( function(){ 
				}).mouseleave( function(){ 
				}).bind("click",function(){
				});*/
				var leaveTimeOut;
				var tabSpeed = 300;
				var tabEasingIn = "easeInQuad";
				var tabEasingOut = "easeOutQuad";
				var tabSet ={
					init:function(){
						/* 초기 인식 셋팅 */
						if(tabCateUse){  // cat 배열비교
							var mod=getParameter(tabCateName);
						}else{ // mod 숫자체크시
							var mod=getParameter('mod');
						}
						if(mod){
							if(mod == "" || mod == "undefined" ){
								tabCur = 1;
								tabChk = 1;
								fn_tab_Change(tabCur,tabChk);		
								e.find("#tabMenuBox .listBox>a:eq("+(tabCur-1)+")").css({
									//"background-position-y":-(tabBottom+tabTop)
									"background-position" : ePosXArr[tabCur-1]+"px "+(-(tabBottom+tabTop))+"px"
									});
							}else{
								if(e.find("#tabMenuBox .listBox>a:eq("+(mod-1)+")").hasClass("first-col")){
									tabCur = mod;
									tabChk = mod;
									fn_tab_Change(tabCur,tabChk);
									e.find("#tabMenuBox .listBox>a:eq("+(mod-1)+")").css({
										//"background-position-y":-(tabBottom+tabTop)
										"background-position" : ePosXArr[tabCur-1]+"px "+(-(tabBottom+tabTop))+"px"
									});
								}else{
									tabCur = mod;
									tabChk = mod;
									fn_tab_Change(tabCur,tabChk);
									e.find("#tabMenuBox .listBox>a:eq("+(mod-1)+")").css({
									//"background-position-y":-(tabBottom+tabTop+tabH+tabM_T)
										"background-position" : ePosXArr[tabCur-1]+"px "+(-(tabBottom+tabTop+tabH+tabM_T))+"px"
									});
								}
							}
						}else{
							tabCur = 1;
							tabChk = 1;
							fn_tab_Change(tabCur,tabChk);
							e.find("#tabMenuBox .listBox>a:eq("+(tabCur-1)+")").css({
								//"background-position-y":-(tabBottom+tabTop)
								"background-position" : ePosXArr[tabCur-1]+"px "+(-(tabBottom+tabTop))+"px"
								
							});
						}
					},//init
					mEnter:function(){
						//var elemt = $(this);
						if($(this).hasClass("first-col")){
							$(this).css({
								//"background-position-y":-(tabBottom+tabTop)
								"background-position" : ePosXArr[$(this).index()]+"px "+(-(tabBottom+tabTop))+"px"
							});
						}else{
							$(this).css({
								//"background-position-y":-(tabBottom+tabTop+tabH+tabM_T)
								"background-position" : ePosXArr[$(this).index()]+"px "+(-(tabBottom+tabTop+tabH+tabM_T))+"px"
							});
						}
					},//mEnter
					mLeave:function(){
						//var elemt = $(this);
						leaveTimeOut = setTimeout(function(){
						},1000);
						//tabChk = $(this).index()+1;
						if($(this).hasClass("active")){
						}else{
							if($(this).hasClass("first-col")){
								$(this).css({
								//"background-position-y":-(tabBottom)
								"background-position" : ePosXArr[$(this).index()]+"px "+(-(tabBottom))+"px"
								});
							}else{
								$(this).css({
									//"background-position-y":-(tabBottom+tabH+tabM_T)
									"background-position" : ePosXArr[$(this).index()]+"px "+(-(tabBottom+tabH+tabM_T))+"px"
								});
							}
						}
					},//mLeave
					mClick:function(){
						if(tabCon){ //컨텐츠박스 있을때
							var index = $(this).index()+1;
							if(tabCur != index){
								tabCur = index
								fn_tab_Change(tabCur,tabChk);
								tabChk = index
								return false;
							}
						}
					},//mClick
					reSize:function(){
						//var elemt;
						//target.stop().animate({"left":lft,"width":w},tabSpeed,tabEasingIn);
						//console.log("resize");
					}//resize
				}//tabSet
				 tabVar.bind("mouseenter",tabSet.mEnter).bind("mouseleave",tabSet.mLeave);
				 tabVar.bind("click",tabSet.mClick);
				 tabSet.init();
				//$(window).resize(tabSet.reSize); 

			});
		});
	} /* e: $.fn.tab_image_Setting */
})(jQuery);











/* 탭메뉴 텍스트 플러그인 */
(function($){
	$.fn.tab_text_Setting = function(o){
		o = $.extend({
		}, o || {});
		return this.each(function(){
			var e = $(this);
			var tabW = o.width;
			var tabM_L = o.marginleft;
			var tabM_T = o.marginTop;
			var tabCur = 0;
			var tabChk = 0;
			var tabVar = e.find("#tabTextBox .listBox>a");
			var tabTot = tabVar.size();
			var tabBorderOutColor = o.borderOutColor;
			var tabBorderOverColor = o.borderOverColor;
			var tabFontOutColor = o.fontOutColor;
			var tabFontOverColor = o.fontOverColor;
			var tabBackOutColor= o.backOutColor;
			var tabBackOverColor = o.backOverColor;
			var tabWeight = o.weight;
			var tabSize = o.size;
			var tabPadding = o.padding;
			var tabFocusBoolean = o.focusBoolean;
			var tabFocusWidth = o.focusWidth;
			var tabFocusHeight = o.focusHeight;
			var tabFocusTop = o.focusTop;
			var tabFocusImage = o.focusImage;
			var tabCon = o.contentBox
			var tabCateUse = o.categoryUse;
			var tabCate;
			var tabCateName;
			var tabCateTot;
			if(tabCateUse){
				tabCate = o.category;
				tabCateName = o.cateName
				tabCateTot = tabCate.length;
			}

			/* 초기 백그라운드 셋팅 */
			//tabVar.css({ "background" : tabBackOutColor })
			e.find("#tabTextBox .listBox>a:eq("+(0)+")").addClass("first-row") // 첫줄 첫번째 마진값없애기
			 tabVar.css({
				"width" : tabW,
				"border-color" : tabBorderOutColor,
				"color" : tabFontOutColor,
				"background" : tabBackOutColor,
				"font-weight" : tabWeight,
				"font-size" : tabSize,
				"line-height" : tabSize,
				"padding-top" : tabPadding,
				"padding-bottom" : tabPadding
			})
			
			// 현재 1줄 탭까지 가능 2줄부터는 추가 
			for(i=0; i<tabTot; i++){
				eVar = e.find("#tabTextBox .listBox>a:eq("+(i)+")");
				ePosX = -(tabW*i)-((i*tabM_L)+1)
				ePosY = 0;
				eVar.css({
				"border-color" : tabBorderOutColor,
				"color" : tabFontOutColor,
				"background" : tabBackOutColor
				}).addClass("first-col")
			}
			if(tabCateUse){ // cat 배열비교시
				var getParameter = function (param) {
					var returnValue;
					var url = location.toString(); 
					var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
					for (var i = 0; i < parameters.length; i++) {
						var varName = parameters[i].split('=')[0];
						if (varName.toUpperCase() == param.toUpperCase()) {
							returnValue = parameters[i].split('=')[1];
							for (var i = 0; i < tabCateTot; i++) {
								if(tabCate[i] == decodeURIComponent(returnValue)){
									return i+1;
								}
							}
						}
					}
				};
			}else{ // mod 숫자체크시
				var getParameter = function (param) {
					var returnValue;
					var url = location.toString(); 
					var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
					for (var i = 0; i < parameters.length; i++) {
						var varName = parameters[i].split('=')[0];
						if (varName.toUpperCase() == param.toUpperCase()) {
							returnValue = parameters[i].split('=')[1];
							return decodeURIComponent(returnValue);
						}
					}
				};
			}
			function fn_tab_Change(tabCur,tabChk){
				for(i=0; i<tabTot; i++){
					var eVar = e.find("#tabTextBox .listBox>a:eq("+(i)+")");
					eVar.removeClass("active").css({
						"border-color" : tabBorderOutColor,
						"color" : tabFontOutColor,
						"background" : tabBackOutColor
					}).find("span.focus").remove();
					if(tabCon){ //컨텐츠박스 있을때
						tabPart =  e.find("#tabContentBox #tab_"+(i+1)+"");
						tabPart.css("display","none");
					}
				}
				e.find("#tabTextBox .listBox>a:eq("+(tabCur-1)+")").css({
					"border-color" : tabBorderOverColor,
					"color" : tabFontOverColor,
					"background" : tabBackOverColor,
					"position":"relative"
				})
						
				//포커스 이미지
				if(tabFocusBoolean){	
					e.find("#tabTextBox .listBox>a:eq("+(tabCur-1)+")").append("<span class='focus'><img src="+tabFocusImage+" /></span>").find("span.focus").css({
					"position" : "absolute",
					"left" : "50%",
					"top" : tabFocusTop,
					"width": tabFocusWidth,
					"margin-left" : -(tabFocusWidth/2),
					"height": tabFocusHeight
					});
				}
				e.find("#tabTextBox .listBox>a:eq("+(tabCur-1)+")").addClass("active");
				if(tabCon){ //컨텐츠박스 있을때
					 e.find("#tabContentBox #tab_"+(tabCur)+"").css("display","block");
				}
			}
			$(function(){
				/* e.find("#tabTextBox .listBox>a").mouseover( function(){ 
				}).mouseleave( function(){ 
				}).bind("click",function(){
				});*/
				var leaveTimeOut;
				var tabSpeed = 300;
				var tabEasingIn = "easeInQuad";
				var tabEasingOut = "easeOutQuad";
				var tabSet ={
					init:function(){
						/* 초기 인식 셋팅 */
						if(tabCateUse){  // cat 배열비교
							var mod=getParameter(tabCateName);
						}else{ // mod 숫자체크시
							var mod=getParameter('mod');
						}
						if(mod){
							if(mod == "" || mod == "undefined" ){
								tabCur = 1;
								tabChk = 1;
								fn_tab_Change(tabCur,tabChk);		
								e.find("#tabTextBox .listBox>a:eq("+(tabCur-1)+")").css({
								});
							}else{
								if(e.find("#tabTextBox .listBox>a:eq("+(mod-1)+")").hasClass("first-col")){
									tabCur = mod;
									tabChk = mod;
									fn_tab_Change(tabCur,tabChk);
									e.find("#tabTextBox .listBox>a:eq("+(mod-1)+")").css({
									});
								}else{
									tabCur = mod;
									tabChk = mod;
									fn_tab_Change(tabCur,tabChk);
									e.find("#tabTextBox .listBox>a:eq("+(mod-1)+")").css({
									});
								}
							}
						}else{
							tabCur = 1;
							tabChk = 1;
							fn_tab_Change(tabCur,tabChk);
							e.find("#tabTextBox .listBox>a:eq("+(tabCur-1)+")").css({
							});
						}
						//포커스 이미지
						if(tabFocusBoolean){
							e.find("#tabTextBox .listBox>a:eq("+(tabCur-1)+")").css({
								"position":"relative"
							}).append("<span class='focus'><img src="+tabFocusImage+" /></span>").find("span.focus").css({
								"position" : "absolute",
								"left" : "50%",
								"top" : tabFocusTop,
								"width": tabFocusWidth,
								"margin-left" : -(tabFocusWidth/2),
								"height": tabFocusHeight
							});
						}
					},//init
					mEnter:function(){
						//var elemt = $(this);
						if($(this).hasClass("first-col")){
							$(this).css({
								"border-color" : tabBorderOverColor,
								"color" : tabFontOverColor,
								"background" : tabBackOverColor
							});
						}
					},//mEnter
					mLeave:function(){
						//var elemt = $(this);
						leaveTimeOut = setTimeout(function(){
						},1000);
						//tabChk = $(this).index()+1;
						if($(this).hasClass("active")){
						}else{
							if($(this).hasClass("first-col")){
								$(this).css({
									"border-color" : tabBorderOutColor,
									"color" : tabFontOutColor,
									"background" : tabBackOutColor
								});
							}
						}
					},//mLeave
					mClick:function(){
						if(tabCon){ //컨텐츠박스 있을때
							var index = $(this).index()+1;
							if(tabCur != index){
								tabCur = index
								fn_tab_Change(tabCur,tabChk);
								tabChk = index
								return false;
							}
						}
					},//mClick
					reSize:function(){
						//var elemt;
						//target.stop().animate({"left":lft,"width":w},tabSpeed,tabEasingIn);
						//console.log("resize");
					}//resize
				}//tabSet
				 tabVar.bind("mouseenter",tabSet.mEnter).bind("mouseleave",tabSet.mLeave);
				 tabVar.bind("click",tabSet.mClick);
				 tabSet.init();
				//$(window).resize(tabSet.reSize); 
			});
		});
	} /* e: $.fn.tab_image_Setting */
})(jQuery);









/* 탭메뉴 맵 플러그인 */
(function($){
	$.fn.tab_map_Setting = function(o){
		o = $.extend({
		}, o || {});
		return this.each(function(){
			var e = $(this);
			var tabW = o.width;
			var tabH = o.height;
			var tabM_T = o.marginTop;
			var tabCur = 0;
			var tabChk = 0;
			var tabVar = e.find("#tabMapBox .listBox .mapBox");
			var tabTot = o.size;
			var tabCon = o.contentBox;
			var tabCateUse = o.categoryUse;
			var tabCate;
			var tabCateName;
			var tabCateTot;
			if(tabCateUse){
				tabCate = o.category;
				tabCateName = o.cateName
				tabCateTot = tabCate.length;
			}
			
			/* 초기 백그라운드 셋팅 */
			tabVar.css({"background":"url('"+o.background+"') no-repeat 0px 0px"})
			tabVar.css({
					"width" : tabW,
					"height" : tabH	
			})
				
			if(tabCateUse){ // cat 배열비교시
				var getParameter = function (param) {
					var returnValue;
					var url = location.toString(); 
					var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
					for (var i = 0; i < parameters.length; i++) {
						var varName = parameters[i].split('=')[0];
						if (varName.toUpperCase() == param.toUpperCase()) {
							returnValue = parameters[i].split('=')[1];
							for (var i = 0; i < tabCateTot; i++) {
								if(tabCate[i] == decodeURIComponent(returnValue)){
									return i+1;
								}
							}
						}
					}
				};
			}else{ // mod 숫자체크시
				var getParameter = function (param) {
					var returnValue;
					var url = location.toString(); 
					var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
					for (var i = 0; i < parameters.length; i++) {
						var varName = parameters[i].split('=')[0];
						if (varName.toUpperCase() == param.toUpperCase()) {
							returnValue = parameters[i].split('=')[1];
							return decodeURIComponent(returnValue);
						}
					}
				};
			}
			function fn_tab_Change(tabCur,tabChk){
				for(i=0; i<tabTot; i++){
					if(tabCon){ //컨텐츠박스 있을때
						tabPart =  e.find("#tabContentBox #tab_"+(i+1)+"");
						tabPart.css("display","none");
					}
				}
				tabVar.css({"background-position-y":-((tabCur-1)*tabH+(tabCur-1)*tabM_T)});
				if(tabCon){ //컨텐츠박스 있을때
					 e.find("#tabContentBox #tab_"+(tabCur)+"").css("display","block");
				}
			}
			
			$(function(){
				/* e.find("#tabMenuBox .listBox>a").mouseover( function(){ 
				}).mouseleave( function(){ 
				}).bind("click",function(){
				});*/
				var leaveTimeOut;
				var tabSpeed = 300;
				var tabEasingIn = "easeInQuad";
				var tabEasingOut = "easeOutQuad";
				var tabSet ={
					init:function(){
						/* 초기 인식 셋팅 */
						if(tabCateUse){  // cat 배열비교
							var mod=getParameter(tabCateName);
						}else{ // mod 숫자체크시
							var mod=getParameter('mod');
						}
						if(mod){
							if(mod == "" || mod == "undefined" ){
								tabCur = 1;
								tabChk = 1;
								fn_tab_Change(tabCur,tabChk);	
								tabVar.css({"background-position-y":-((tabCur-1)*tabH+(tabCur-1)*tabM_T)});
							}else{
								tabCur = mod;
								tabChk = mod;
								fn_tab_Change(tabCur,tabChk);	
								tabVar.css({"background-position-y":-((tabCur-1)*tabH+(tabCur-1)*tabM_T)});
							}
						}else{
							tabCur = 1;
							tabChk = 1;
							fn_tab_Change(tabCur,tabChk);
								tabVar.css({"background-position-y":-((tabCur-1)*tabH+(tabCur-1)*tabM_T)});
						}
					},//init
					mEnter:function(){
						//var elemt = $(this);
					},//mEnter
					mLeave:function(){
						//var elemt = $(this);
						leaveTimeOut = setTimeout(function(){
						},1000);
						//tabChk = $(this).index()+1;
						
					},//mLeave
					mClick:function(){
						if(tabCon){ //컨텐츠박스 있을때
							var index = $(this).index()+1;
							if(tabCur != index){
								tabCur = index
								fn_tab_Change(tabCur,tabChk);
								tabChk = index
								return false;
							}
						}
					},//mClick
					reSize:function(){
						//var elemt;
						//target.stop().animate({"left":lft,"width":w},tabSpeed,tabEasingIn);
						//console.log("resize");
					}//resize
				}//tabSet

				//tabVar.find("area").bind("mouseenter",tabSet.mEnter).find("area").bind("mouseleave",tabSet.mLeave);
				tabVar.find("area").bind("click",tabSet.mClick);
				tabSet.init();
				//$(window).resize(tabSet.reSize); 
			});
		});
	} /* e: $.fn.tab_image_Setting */
})(jQuery);

