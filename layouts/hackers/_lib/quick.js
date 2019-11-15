/**
 * jquery 라이브러리 필요
 * 
 * @brief 	퀵메뉴 클래스
 * @author	Junho Park <up561@nate.com>
 * @since	April 2013
 * @param	{Object}	objQuick
 * @param	{Number}	top
 * @param	{Number}	fixQuickTop
 * @param	{Function}	initialize	초기화
 * @param	{Function}	event	이동/고정
 * @param	{Function}	move	스크롤이동
 * @param	{Function}	subMenuToggle	메뉴토글
 */


/* 리뉴얼 퀵메뉴 버튼 변경

*/
"use strict";
var quick = {
	objQuick: null,
	lockId: 'quick_img',
	lockImgMove: '//gscdn.hackers.co.kr/hackers/images/sprites/main/quick_btn_on.gif',
	lockImgStop: '//gscdn.hackers.co.kr/hackers/images/sprites/main/quick_btn_off.gif',
	lockState: 1,
	top: null,
	initTop: null,
	fixQuickTop: null,
	exception: [null, "null", ""],
	initialize: function( id, top ) {
		this.objQuick = $("#" + id);
		this.top = top;
		this.initTop = top;
		this.fixQuickTop = getCookie("fixQuickTop");
		this.minus_top = 0;
		
		if(	(__getParam('c')==false // 메인페이지
		||	__getParam('c')=='' // 메인페이지
		||	location.referrer=='' // url 직접 입력해서 들어온 경우
		||	document.referrer.match(/hackers.co.kr/ig)==null) && $(document).scrollTop() > 500
		){
			this.minus_top = 500;
		}

		/*   2016-07-29 추가   */
		var _document = $(document);
		var top = $('.topbnbox').height() + $('#util_gnb').height() + $('#header').height();
		if(_document.scrollTop() > top) {
			var extop = _document.scrollTop() - top + 5;
		} else {
			if(	__getParam('c') == false || __getParam('c') == '' ) {
				var extop = 5;
				var extop = 0; // main 20180105 
			}else{
				var extop = 0;
			}
		}

		if ($.inArray(this.fixQuickTop, this.exception) != -1) {
			$("#" + this.lockId).attr("src", this.lockImgMove);
			// this.objQuick.animate({"top" : $(document).scrollTop() - this.minus_top + this.top + "px"}, 500); // GNB 상단 이벤트 붙으면서 + 15px 해줌
			this.objQuick.animate({"top" : extop + "px"}, 500);
		} else {
			$("#" + this.lockId).attr("src", this.lockImgStop);
		}

		// this.objQuick.css("top", parseInt(this.fixQuickTop == '' ? 0 : this.fixQuickTop) + parseInt(this.top == '' ? 0 : this.top) + "px");
		this.objQuick.css("top", extop + "px");
		this.event();
		
		var _this = this;
		$(window).scroll(function() {
			_this.move();
		});
	},
	event: function() {
		var _this = this;
		$("#" + this.lockId).click(function(event) {
			if ($(this).attr("src") == _this.lockImgStop) { // 고정
				$(this).attr("src", _this.lockImgMove);
				setCookie( "fixQuickTop", null, -1 ); //쿠기 삭제
				_this.fixQuickTop = null;
				_this.move();
				return false;
			} else {
				$(this).attr("src", _this.lockImgStop);
				var _document = $(document);
				setCookie( "fixQuickTop", _document.scrollTop(), 1 ); //쿠기 저장 기간은 1일로 한다.
				_this.fixQuickTop = _document.scrollTop();
				return false;
			}
		});
	},
	move: function() {
		var _document = $(document);
		var wrapperHeight = _document.height() + this.initTop,
			limitHeight = _document.scrollTop() + this.objQuick.height() + this.initTop,
			limitTop = _document.scrollTop(),
			changePx = this.initTop - limitTop,
			extop = this.initTop;

		if(_document.scrollTop() > $('#topLayer').height()){
			var top = $('.topbnbox').height() + $('#util_gnb').height() + $('#header').height();

			if(_document.scrollTop() > top) {
				var extop = _document.scrollTop() - top + 5;
			} else {
				var extop = 5;
			}
			// var extop = _document.scrollTop() - $('#topLayer').height();
		} else {
			if(	__getParam('c') == false || __getParam('c') == '' ) {
				//var extop = 5;
				var extop = 0;// main 20180105 
			}else{
				var extop = 0;
			}
		}

		if (wrapperHeight > limitHeight) {
			if ($.inArray(this.fixQuickTop, this.exception) != -1) {
				// this.objQuick.stop().animate({"top" : _document.scrollTop() - this.minus_top + extop + "px"}, 800);
				this.objQuick.stop().animate({"top" : extop + "px"}, 800);
			}
		}
	},
	subMenuToggle: function( no ) {
		for (var i = 1; i < 6; i++) {
			if (i != no) {
				$("#row" + i).hide(); 
			}
		}
		
		var _id = $("#row" + no);
		
		if ($(_id).is(":hidden") == true) {
			$(_id).show();
		} else {
			$(_id).hide();
		}
	},
	getParam: function(idx){
		var vars={},hash;
		var hashes=window.location.search.slice(window.location.search.indexOf('?')+1).split('&');
		for(var i=0;i<hashes.length;i++){
			if(hashes[i]){
				hash=hashes[i].split('=');
				vars[hash[0]]=hash[1]?hash[1].toString().split('#')[0]:''
			}
		}
		return idx===undefined?vars:(vars[idx]!==undefined?vars[idx]:false)
	}
};