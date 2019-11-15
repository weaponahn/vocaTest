/// 에러메시지 포멧 정의 ///
var NO_BLANK = "{name+을를} 입력하여 주십시오.";
var NO_CHECK = "{name+을를} 선택하여 주십시오.";
var NOT_VALID = "{name+이가} 올바르지 않습니다.";
var TOO_LONG = "{name}의 길이가 초과되었습니다. (최대 {maxbyte}바이트)";
var SPACE = (navigator.appVersion.indexOf("MSIE")!=-1) ? "          " : "";

// form.js 버젼 표기
var form_js = {
	Version: '1.0 r081208'
};

/// 스트링 객체에 메소드 추가 ///
String.prototype.trim = function(str) {
	str = this != window ? this : str;
	return str.replace(/^\s+/g,'').replace(/\s+$/g,'');
}

String.prototype.hasFinalConsonant = function(str) {
	str = this != window ? this : str;
	var strTemp = str.substr(str.length-1);
	return ((strTemp.charCodeAt(0)-16)%28!=0);
}

String.prototype.bytes = function(str) {
	str = this != window ? this : str;
	for(var i=0, len=0; i<str.length; i++) {
		var chr = str.charAt(i);
		if(escape(chr).length > 4) len += 2;
		else if(chr != '\r') len++;
	}
	return len;
}

String.prototype.number_format = function() {
	var num = this.replace(/,/g,'');
	return num.replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1,');
}

/*
Array.prototype.shuffle = function() {
	return this.concat().sort(function() {
		return Math.random() - Math.random();
	});
}
*/

function in_array(value, array, similar) {
	for(var i=0; i<array.length; i++) {
		if(similar==true) {
			if(value.indexOf(array[i]) != -1) return true; // 비슷한 값
		} else {
			if(array[i]==value) return true; // 동일한 값
		}
	}
	return false;
}

function josa(str,tail) {
	return (str.hasFinalConsonant()) ? tail.substring(0,1) : tail.substring(1,2);
}

function checkMultiBox(el) {
	var obj = document.getElementsByName(el.name);
	for (var i=0; i<obj.length; i++){
		if(obj[i].checked==true) return true;
		if(obj[i].name == "agree_join6") return true;
	}
	return false;
}

function get_form_element(form, element) { // 2009.10.26 added
	try { form.each(function(el) { if(el.name==element || el.id==element) throw el }) } // form : array()
	catch(el) { return el }
	return null;
}

function validate(form, skip) { // 2009.04.01 fixed
	for (var i=0; i<form.length; i++) {
		try {
			var el = form[i];
			if(el.tagName.match(/fieldset/i) || el.disabled===true) continue;
			if(skip && in_array(el.name, skip.split('|'), true)===true) continue;
			if(el.type.toLowerCase() != "file" && el.getAttribute("NOTRIM")==null && el.value) el.value = el.value.trim(); // 수정 :: 파폭 보안 문제

			// 첨부파일 필터링 설정시
			if(el.type.toLowerCase() == "file" && el.value && (el.getAttribute("filter")!=null || el.getAttribute("antifilter")!=null)) {
				var file_infos = el.value.split('.');
				var _ext = file_infos[file_infos.length-1].toLowerCase();
				if(el.getAttribute("antifilter")!=null && in_array(_ext, el.getAttribute("antifilter").split(','))) {
					return doError(el,"선택하신 {name+은는} 첨부할 수 없습니다.("+el.getAttribute("antifilter")+" 파일은 첨부불가)");
				}
				else if(!in_array(_ext, el.getAttribute("filter").split(','))) {
					return doError(el,"선택하신 {name+은는} 첨부할 수 없습니다.("+el.getAttribute("filter")+" 파일만 첨부가능)");
				}
			}

			// 기타 필드에 필터링 설정시 - 08.03.21 추가
			if(el.getAttribute("antifilter")!=null) {
				var filters = el.getAttribute("antifilter").split(',');
				var _contents = el.value.replace(/ /g,'').replace(/&nbsp;/g,''); // 공백문자 제거
				for(var x=0; x<filters.length; x++) {
					if(!filters[x]) continue;
					if(_contents.indexOf(filters[x])!=-1) {
						return doError(el, "{name}에는 '"+filters[x]+"'를 입력할 수 없습니다.");
					}
				}
			}
			
			var PATTERN = el.getAttribute("PATTERN");
			var minbyte = el.getAttribute("MINBYTE");
			var maxbyte = el.getAttribute("MAXBYTE");
			var minval = el.getAttribute("MINVAL");
			var maxval = el.getAttribute("MAXVAL");
			var option = el.getAttribute("OPTION");
			var ignore0 = el.getAttribute("IGNORE0");
			var match = el.getAttribute("MATCHING"); // 수정 :: Prototype JS 와 충돌하여 'MATCH' 에서 'MATCHING' 으로 변경
			var glue = el.getAttribute("GLUE");
			var unit = el.getAttribute("UNIT");
			var or = el.getAttribute("OR"); // 추가 :: 둘 중 하나의 값을 입력 받고자 하는 경우(이경우, REQUIRED 는 사용하지 말 것)
			if(unit == null) unit = '';

			if (el.getAttribute("REQUIRED") != null) {
				if(el.getAttribute('nofocus')==null && el.style.display=='none') continue; // 2009.05.06 추가
				var ERR_MSG = (el.getAttribute("MESSAGE") != null) ? el.getAttribute("MESSAGE") : null;
				if ((el.type.toLowerCase() == "radio" || el.type.toLowerCase() == "checkbox") && !checkMultiBox(el)) return (ERR_MSG) ? doError(el, ERR_MSG) : doError(el, NO_CHECK);
				if (el.tagName.toLowerCase() == "select" && (el.value == null || el.value == "")) return (ERR_MSG) ? doError(el,ERR_MSG) : doError(el,NO_CHECK);
				if (el.value == null || el.value == "" || (ignore0==null && el.value=="0") || (el.getAttribute("DEFAULT")!=null && el.value == el.getAttribute("DEFAULT"))) return (ERR_MSG) ? doError(el,ERR_MSG) : doError(el,NO_BLANK);
			}
		}
		catch(e) {
			//alert(e.message+form[i].name+":"+form[i].checked +":"+ form[i].value);
		}

		if (minbyte != null && el.value != "" && el.value.bytes() < parseInt(minbyte)) {
			if(unit=='') unit = "바이트";
			return doError(el,"{name+은는} 최소 "+new String(minbyte).number_format()+unit+" 이상 입력하셔야 합니다.");
		}
		if (maxbyte != null && el.value != "" && el.value.bytes() > parseInt(maxbyte)) {
			if(unit=='') unit = "바이트";
			return doError(el,"{name+은는} 최대 "+new String(maxbyte).number_format()+unit+" 이하로 입력하셔야 합니다.");
		}
		
		/*console.log(minval + '/' + el.value + '/' + el.value + '<' + parseInt(minval));*/
		if (minval != null && el.value != "" && el.value.length < parseInt(minval)) return doError(el,"{name+은는} 최하 "+new String(minval).number_format()+unit+" 이상 입력하셔야 합니다.");
		if (maxval != null && el.value != "" && el.value.length > parseInt(maxval)) return doError(el,"{name+은는} 최고 "+new String(maxval).number_format()+unit+" 이하로 입력하셔야 합니다.");
		if (PATTERN != null && el.value != "" && !PATTERN(el,pattern)) return false;

		if (match != null) { // 2009.10.26 fixed
			var match_el = form[match];
			if(match_el==undefined) match_el = get_form_element(form, match);
			if(el.value != match_el.value) return doError(el,"{name+이가} 일치하지 않습니다.");
		}
		/*if (or != null && (el.value == null || el.value == "")) { // 2009.10.26 fixed
			var or_el = form[or];

			if(or_el==undefined) or_el = get_form_element(form, or);
			if (or_el.getAttribute('default') != null) {
				var _default = or_el.getAttribute('default');
				var _val = or_el.value;
				var _val = _val.replace(_default,'');
			}
			var _type = or_el.getAttribute('TYPE');
			if(_val==null || _val == "" || (_type == 'CHECKBOX' && or_el.checked == false)) {
				var name2 = (hname = or_el.getAttribute("HNAME")) ? hname : or_el.getAttribute("NAME");
				return doError(el,"{name+} 또는 "+name2+" 중 하나는 입력하셔야 합니다.");
			}
		}*/
		if (or != null && (el.value == null || el.value == "")) { // 2014.04.17 fixed
			var or_el = form[or];
			if(or_el==undefined) or_el = get_form_element(form, or);
			if(or_el.value==null || or_el.value == "") {
				var name2 = (hname = or_el.getAttribute("HNAME")) ? hname : or_el.getAttribute("NAME");
				return doError(el,"{name+} 또는 "+name2+" 중 하나는 입력하셔야 합니다.");
			}
		}
		
		if (option != null && el.value != "") {
			if (el.getAttribute('SPAN') != null) {
				var _value = new Array();
				for (var span=0; span<el.getAttribute('SPAN');span++ ) _value[span] = form[i+span].value;
				var value = _value.join(glue == null ? '' : glue);
				if (!funcs[option](el,value)) return false;
			} else {
				try{ if (!funcs[option](el)) return false; } catch(e) {} // 수정 :: 익스7에서 'runtime' 오류 발생으로 변경
			}
		}
	}
	return true;
}


function doError(el,type,action) {
	var pattern = /{([a-zA-Z0-9_]+)\+?([가-힝]{2})?}/g;
	var name = (hname = el.getAttribute("HNAME")) ? hname : el.getAttribute("NAME");
	pattern.exec(type);

	try {
		var tail = (RegExp.$2) ? josa(eval(RegExp.$1),RegExp.$2) : '';
		alert(type.replace(pattern,eval(RegExp.$1) + tail) + SPACE);
	}
	catch(e) { // checkbox 에서 오류가 발생할 가능성이 높다
		var message = el.getAttribute("message");
		if(message!=null) alert(message+SPACE);
		else doError(el,NO_CHECK);
		return false;
	}
	if(action == "sel") el.select();
	else if(action == "del")	el.value = "";
	if(el.getAttribute("NOFOCUS") == null) {
		el.focus();
		if(el.getAttribute("DEFAULT")!=null) el.value = el.getAttribute("DEFAULT");
	}
	if(el.getAttribute("SETFOCUS") != null && el.getAttribute("SETFOCUS") !='') el.form.elements[el.getAttribute("SETFOCUS")].focus();
	return false;
}

/// 특수 패턴 검사 함수 매핑 ///
var funcs = new Array();
funcs['domain'] = isValidDomain;
funcs['email'] = isValidEmail;
funcs['hphone'] = isValidHPhone;
funcs['phone'] = isValidPhone;
funcs['phones'] = isValidPhones;
funcs['userid'] = isValidUserid;
funcs['passwd'] = isValidUserpw;
funcs['userpw'] = isValidUserpw;

funcs['hangul'] = hasHangul;
funcs['number'] = isNumeric;
funcs['float'] = isFloat;
funcs['engonly'] = alphaOnly;
funcs['normal'] = isSpecialCharacter;
funcs['jumin'] = isValidJumin;
funcs['bizno'] = isValidBizNo;


/// 패턴 검사 함수들 ///
function isBlank(el,value) { // 2008.07.12 추가
	var value = value ? value : el.value;
	return value.trim() ? true : doError(el,NO_BLANK);
}

function isValidDomain(el,value) {
	if(el.getAttribute('required')==null) {
		var default_val = el.getAttribute('default');
		if(default_val!=null && el.value==default_val) return true;
	}
	var value = value ? value : el.value;
//	var pattern = /^[_a-zA-Z가-힝0-9-]+\.[a-zA-Z가-힝0-9-\.]+[a-zA-Z]+$/;
	var pattern = /^[_a-zA-Z가-힝0-9-]+\.[a-zA-Z가-힝0-9-\.]+[a-zA-Z]+/;
	return (pattern.test(value.replace(/(http|https):\/\//g, ''))) ? true : doError(el,NOT_VALID);
}

function isValidEmail(el,value) {
	var value = value ? value : el.value;
	var pattern = /^[_a-zA-Z0-9-\.]+@[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/;
	return (pattern.test(value)) ? true : doError(el,NOT_VALID);
}

function isValidUserid(el) { // 2008.07.14 doError 수정
	var pattern = /^[a-z]{1}[a-z0-9]{3,15}$/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+은는} 영문 소문자로 시작하는 4~15자의 영문 소문자와 숫자의 조합만 사용할 수 있습니다.");
}

function isValidUserpw(el) { // 2008.07.14 doError 수정
	var pattern = /[a-zA-Z]/;		//영어가 하나라도 들어가면 true;
	var pattern1 = /[0-9]/;			//숫자가 하나라도 들어가면 true;
	var pattern2 = /[^a-zA-Z0-9_]/; //특수문자가 하나라도 들어가면 true;
	var arr = Array(pattern.test(el.value),pattern1.test(el.value),pattern2.test(el.value));
	var p_bool = 0;
	for(var i=0; i<arr.length;i++){
		if(arr[i]) p_bool+=1;
	}
	if(p_bool > 1){
		if(el.value.length > 7 && el.value.length < 16)	return true;	//길이가 8부터 16사이
		else return doError(el,"{name+은는} 8~15자의 영문자와 숫자의 조합만 사용할 수 있습니다.");
	}else{
		return doError(el,"{name+은는} 8~15자의 영문자와 숫자의 조합만 사용할 수 있습니다.");
	}
}

function hasHangul(el) {
	var pattern = /[가-힝]/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+은는} 반드시 한글을 포함해야 합니다.");
}

function alphaOnly(el) {
	var pattern = /^[a-zA-Z]+$/;
	return (pattern.test(el.value)) ? true : doError(el,NOT_VALID);
}

function isSpecialCharacter(el) {
	var pattern = /[a-zA-Z가-힝0-9]/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+은는} 특수문자를 입력할 수 없습니다.");
}

function isNumeric(el) {
	var pattern = /^[0-9.-]+$/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+은는} 반드시 숫자로만 입력해야 합니다.");
}

function isFloat(el) {
	var pattern = /^[0-9]+(\.[0-9]{1,4})?$/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+은는} 반드시 정수 또는 소수 넷째 자리까지만 입력해야 합니다.");
}

function isValidJumin(el,value) {
    var pattern = /^([0-9]{6})-?([0-9]{7})$/;
	var num = value ? value : el.value;
    if (!pattern.test(num)) return doError(el,NOT_VALID);
    num = RegExp.$1 + RegExp.$2;

	var sum = 0;
	var last = num.charCodeAt(12) - 0x30;
	var bases = "234567892345";
	for (var i=0; i<12; i++) {
		if (isNaN(num.substring(i,i+1))) return doError(el,NOT_VALID);
		sum += (num.charCodeAt(i) - 0x30) * (bases.charCodeAt(i) - 0x30);
	}
	var mod = sum % 11;
	return ((11 - mod) % 10 == last) ? true : doError(el,NOT_VALID);

	/* 상위 계산방식에 걸리는 주민등록번호가 있을 경우에 아래와 같이 처리
	var num = value ? value : el.value;
	num = num.replace(/[^0-9]/g,'');
	num = num.substr(0,13);
	if(num.length<13) doError(el, NOT_VALID);
	else {
		num = num.replace(/([0-9]{6})([0-9]{7}$)/,"$1-$2");
		el.value = num;
		return true;
	}
	*/
}

function isValidBizNo(el, value) {
    var pattern = /([0-9]{3})-?([0-9]{2})-?([0-9]{5})/;
	var num = value ? value : el.value;
    if (!pattern.test(num)) return doError(el,NOT_VALID);
    num = RegExp.$1 + RegExp.$2 + RegExp.$3;
	/* 408-81-72269
	var cVal = 0;
    for (var i=0; i<8; i++) {
        var cKeyNum = parseInt(((_tmp = i % 3) == 0) ? 1 : ( _tmp  == 1 ) ? 3 : 7);
        cVal += (parseFloat(num.substring(i,i+1)) * cKeyNum) % 10;
    }
    var li_temp = parseFloat(num.substring(i,i+1)) * 5 + '0';
    cVal += parseFloat(li_temp.substring(0,1)) + parseFloat(li_temp.substring(1,2));
    return (parseInt(num.substring(9,10)) == 10-(cVal % 10)%10) ? true : doError(el,NOT_VALID);
	*/
	var cVal = 0;
	var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
	for (var i=0; i<8; i++) cVal += checkID[i]*num.charAt(i);
	var li_temp = '0' + (checkID[8]*num.charAt(8));
	li_temp = li_temp.substring(li_temp.length-2, li_temp.length);
	cVal += parseFloat(li_temp.charAt(0)) + parseFloat(li_temp.charAt(1));
	return (parseInt(num.charAt(9))==(10-(cVal%10))%10) ? true : doError(el,NOT_VALID);
}

function isValidPhone(el,value) {
	var isKeyNum = false;
	try { isKeyNum = isKeyNumber(undefined, el) } catch(e) {}
	var pattern = isKeyNum ? /^([0-9]{2,4})-?([0-9]{4})-?([0-9]{0,4})$/ : /^([0]{1}[0-9]{1,3})-?([1-9]{1}[0-9]{2,3})-?([0-9]{3,4})$/;
	var num = value ? value : el.value;
	if (pattern.exec(num)) {
		var phones = new Array("02","031","032","033","041","042","043","051","052","053","054","055","061","062","063","064","070","080","0303","0502","0503","0504","0505","0506"); // ,"060" 제외
		if(isKeyNum || in_array(RegExp.$1, phones, false)) {
			if(el.getAttribute('NOGLUE')!=null) {
				el.value = RegExp.$1 + RegExp.$2 + RegExp.$3;
			} else if(!el.getAttribute('SPAN')) el.value = RegExp.$1 + "-" + RegExp.$2 + "-" + RegExp.$3;
			return true;
		}
	}
	return doError(el,NOT_VALID);
}

function isValidHPhone(el,value) {
	var pattern = /^([0]{1}[0-9]{1,2})-?([1-9]{1}[0-9]{2,3})-?([0-9]{4})$/;
	var num = value ? value : el.value;
	if (pattern.exec(num)) {
		var hphones = new Array("011","016","017","018","019","010");
		if(in_array(RegExp.$1, hphones, false)) {
			if(el.getAttribute('NOGLUE')!=null) {
				el.value = RegExp.$1 + RegExp.$2 + RegExp.$3;
			} else if(!el.getAttribute('SPAN')) el.value = RegExp.$1 + "-" + RegExp.$2 + "-" + RegExp.$3;
			return true;
		}
	}
	return doError(el,NOT_VALID);
}

function isValidPhones(el,value) {
	var isKeyNum = false;
	try { isKeyNum = isKeyNumber(undefined, el) } catch(e) {}
	var pattern = isKeyNum ? /^([0-9]{2,4})-?([0-9]{4})-?([0-9]{0,4})$/ : /^([0]{1}[0-9]{1,3})-?([1-9]{1}[0-9]{2,3})-?([0-9]{3,4})$/;
	var num = value ? value : el.value;
	if (pattern.exec(num)) {
		var phones = new Array("011","016","017","018","019","010","02","031","032","033","041","042","043","051","052","053","054","055","061","062","063","064","070","080","0303","0502","0503","0504","0505","0506"); // ,"060" 제외
		if(isKeyNum || in_array(RegExp.$1, phones, false)) {
			if(!el.getAttribute('SPAN')) el.value = RegExp.$1 + "-" + RegExp.$2 + "-" + RegExp.$3;
			return true;
		}
	}
	return doError(el,NOT_VALID);
}
/*
// 대표/평생번호 체크 - 2008.12.04 추가
function isKeyNumber(event, el) {
	if(el==undefined) el = event!=undefined ? Event.element(event) : event;
	var item = $(el.getAttribute('keynum'));
	var pattern = /^([0-9]{3,4})+$/;
	var num = el.value;
	if (pattern.exec(num)) {
		// 아래 배열에 ○○○○-○○○○ 형태의 전화번호의 국번을 추가할 것
		var phones = new Array("1544","1577","1588","1644","1688");
		if(in_array(RegExp.$1, phones, false)) {
			item.style.display = "none";
			item.getElementsByTagName('input')[0].value = '';
			return true;
		}
	}
	item.style.display = "inline";
	return false;
}

// 대표/평생번호 체크 이벤트 생성 - 2008.12.04
function setKeyNumber() {
	if(document.setKeyNumber==true) return true;
	if(!document.body.id) document.body.id = "_body_";
	var tmp_phones = $(document.body.id).getElementsBySelector('input[keynum]');
	tmp_phones.each(function(el) {
		Event.observe(el, 'keyup', isKeyNumber);
		isKeyNumber(undefined, el);
	});
	document.setKeyNumber = true;
}

// 대표/평생번호 체크 이벤트 자동생성
Event.observe(window, 'load', setKeyNumber);
*/