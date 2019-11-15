/**
 * Created by tk on 2017/1/11.
 */
(function (window, document) {
    var Q_Arr = [];//문제 배열
    var dapArr = [];//답 배열
    var random = [];//랜덤 배열
    var special;//셀렉트 배열
    var sndArr = [];//사운드 배열
    var selArr = [];
    var dayNum;//날짜
    var Q_num = 0;//푼 문제 갯수
    var time = 5;//시간 길이
    var stopTime = 0;//멈출때!!
    var stopTimeLeng = 1;
    var length;//문제 총갯수
    var leng = 4;//체크갯수
    var i = 0;
    var myNum = -1;//내 답
    var timer;//타이머
    var answerNum = 0;//맞은 숫자
    var wrongNum = 0;//틀린 숫자
    var globalStr;//사운드 관련
    var xmlUrl;
    var testMode = false;//테스트할때는 true
    var qsnd = 'on';

    $(document).ready(function () {
        $('#tepsVoca_jpd').jPlayer({
            swfPath: "/vocaTest/modules/contents/lang.korean/pages/tepsvoca/swf",
            supplied: "mp3",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true,
            remainingDuration: true,
            toggleDuration: true,
            ended: function () {
                onSndComp()
            }
        });

        $('#tepsVoca_jpd2').jPlayer({
            swfPath: "/vocaTest/modules/contents/lang.korean/pages/tepsvoca/swf",
            supplied: "mp3",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true,
            remainingDuration: true,
            toggleDuration: true,
            ended: function () {
            }
        });

        getParam();

        //===========xml 파싱============
        // Load the xml file using ajax
        $.ajax({
            type: "GET",
            url: xmlUrl,
            dataType: "xml",
            success: function (xml) {
				
                // Xml파싱
                //var teps = $(xml).find("voca");
                var Question = $(xml).find('Question');

                length = Question.length;//총문제 길이

                //이중배열 생성
                selArr = new Array(length);
                var idx = 0;
                //데이타 찾기
                Question.each(function () {
		    if ( qsnd == "off") {
                    	Q_Arr.push("");
		    } else {
                    	Q_Arr.push($(this).find('Q').text());
		    }
                    dapArr.push($(this).find('dap').text());
                    sndArr.push($(this).find('Q').attr('snd'));
                    idx = Question.index(this);

                    //xml의 selc에서 텍스트 추출
                    special = [];

                    $(this).find("selc").each(function (idx) {
                        special.push($(this).text());
                    });

                    //==================이중배열 만들기!!!!!==================
                    selArr[idx] = [dapArr[idx], special[0], special[1], special[2]];
                });

                //상단 데이 이슈 참여자
		/*
                appendTxt($('.hackers_tepsVoca .top span.day h1'), teps.attr('day'));
                appendTxt($('.hackers_tepsVoca .top span.issue h2'), teps.attr('title'));
                appendTxt($('.hackers_tepsVoca .top span.people h3'), teps.attr('people'));
                var wid = 243 + $('.hackers_tepsVoca .top span.people h3').width() + 'px';
                $('.hackers_tepsVoca .top span.myung').css('left', wid);
		*/
                start();//스타트!!
            }
        });
    });

    function getParam() {
		
	var param = new Array();
	var xmlbase='';
	globalStr = "";


	// 현재 페이지의 url
	var url = decodeURIComponent(location.href);
	// url이 encodeURIComponent 로 인코딩 되었을때는 다시 디코딩 해준다.
	url = decodeURIComponent(url);

	var params;
	// url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
	params = url.substring( url.indexOf('?')+1, url.length );
	// 파라미터 구분자("&") 로 분리
	params = params.split("&");

	// params 배열을 다시 "=" 구분자로 분리하여 param 배열에 key = value 로 담는다.
	var size = params.length;
	var key, value;
	for(var i=0 ; i < size ; i++) {
		key = params[i].split("=")[0];
		value = params[i].split("=")[1];

		param[key] = value;
	}

	dayNum = param["dayNum"];
	dayNum = "00"+dayNum;
	dayNum = dayNum.substring(dayNum.length - 2, dayNum.length);	

	xmlbase = param["xmlbase"];
	qsnd= param["qsnd"];

        if (testMode) {
            xmlUrl = "data.xml";
        } else {
            //xmlUrl = "/?r=hackers&m=contents&a=tepsvoca2017/xml&part="+part+"&seq="+dayNum;
            xmlUrl = "/vocaTest/xml/"+xmlbase+"/"+xmlbase+"-"+dayNum+".xml";
        }
		//console.log(xmlUrl);
    }

    //텍스트가 2줄이면 위치값 변경
    function addClassHeight(obj, len, str) {
        if (obj.height() >= len) {
            obj.addClass(str);
        }
    }

    //랜덤
    function randomHandler($arr) {
        var $temp = [];
        var $returnTemp = [];
        for (i = 0; i < $arr.length; i++) {
            $temp.push($arr[i])
        }
        for (i = 0; i < $arr.length; i++) {
            $returnTemp.push($temp.splice(Math.random() * ($temp.length), 1))
        }
        return $returnTemp;
    }

    function makeRandom($arr, len) {
        for (i = 0; i < len; i++) {
            $arr.push(i);
        }
        return randomHandler($arr);
    }

    //답체크
    function dapChk() {
        notChkClick();//클릭안되게
        var type;
        var dapNum;
        for (var i = 0; i < random.length; i++) {
            if (random[i] == 0) {
                dapNum = i;
                break;
            }
        }
        if (myNum != -1 || myNum != null) {
            if (myNum == 0) {
                type = "dap";
                answerNum++;
                hgmPlay(1);//효과음 id: 0-시계, 1-맞음, 2-틀림, 3-버튼
            } else {
                type = "nodap";
                wrongNum++;
                hgmPlay(2);//효과음 id: 0-시계, 1-맞음, 2-틀림, 3-버튼
                $('.hackers_tepsVoca .chkBox li').eq(dapNum).addClass('dap');
            }
        } else {
            wrongNum++;
            type = "nodap";
            hgmPlay(2);//효과음 id: 0-시계, 1-맞음, 2-틀림, 3-버튼
            $('.hackers_tepsVoca .chkBox li').eq(dapNum).addClass('dap');
        }
        oxControll(type);
        continueQuiz();//퀴즈 계속할지 안할지
    }

    //체크 클릭
    function chkClick() {
        //체크 버튼
        $('.hackers_tepsVoca .chkBox li').click(function () {
            var idx = $('.hackers_tepsVoca .chkBox li').index(this);
            $('.hackers_tepsVoca .chkBox li').removeClass('on').eq(idx).addClass('on');
            $('.hackers_tepsVoca .chkBox li h2').removeClass('on').eq(idx).addClass('on');
            myNum = random[idx];
            sndPause();//사운드 정지
            dapChk();//답체크
        });
    }

    //효과음 id: 0-시계, 1-맞음, 2-틀림, 3-버튼
    function hgmPlay(id) {
        var hgmStr;

        switch (id) {
            case 0:
                hgmStr = '/vocaTest/files/_etc/contents/tepsvoca/snd/clock7.mp3';
                break;
            case 1:
                hgmStr = '/vocaTest/files/_etc/contents/tepsvoca/snd/right.mp3';
                break;
            case 2:
                hgmStr = '/vocaTest/files/_etc/contents/tepsvoca/snd/ding.mp3';
                break;
            case 3:
                hgmStr = '/vocaTest/files/_etc/contents/tepsvoca/snd/final.mp3';
                break;
        }
        $("#tepsVoca_jpd2").jPlayer("setMedia", {
            mp3: hgmStr // Defines the m4v url
        }).jPlayer("play");
    }

    function onSndComp() {
        hgmPlay(0);//효과음 id: 0-시계, 1-맞음, 2-틀림, 3-버튼
        timer = setInterval(timeRolling, 1000);//셋타이머
    }

    //문제 사운드
    function sndPlay(id) {
        var sndStr = globalStr + sndArr[id];

	$("#tepsVoca_jpd").jPlayer("setMedia", {
	    mp3: sndStr, // Defines the m4v url
	    ended: function () {
		onSndComp()
	    }
	}).jPlayer("play");
    }

    var bgm_timer;

    //시간 텍스트
    function timeTxt(num) {
        $('.hackers_tepsVoca .timeBox h1').empty().append(num);

        var posx;

        if (num == 0)//시간이 0이면 마지막
        {
            posx = -(5 * 55);
        } else {
            posx = -(num * 55);
        }

        $('.hackers_tepsVoca .timeBox span.tbox').css('background-position', posx + 'px');
    }

    function dizit(c) {
        return "0" + c;
    }

    //타이머
    function timeRolling() {
        if (time == 0)//시간이 끝나면
        {
            dapChk();
            timeTxt(dizit(0));//시간 텍스트
        } else {
            time--;
            timeTxt(dizit(time));//시간 텍스트
        }
    }

    //사운드 정지
    function sndPause() {
        clearInterval(bgm_timer);
        $("#tepsVoca_jpd").jPlayer("stop");
        $("#tepsVoca_jpd2").jPlayer("stop");
    }

    //버튼 사운드
    function btnPlay() {
        $('#tepsVoca_jpd2').jPlayer("setMedia", {
            mp3: "/vocaTest/files/_etc/contents/tepsvoca/snd/click.mp3"
        }).jPlayer("play"); // Attempts to Auto-Play the media
    }

    function bgm_go() {
        clearInterval(bgm_timer);
        $('#tepsVoca_jpd2').jPlayer("setMedia", {
            mp3: "/vocaTest/files/_etc/contents/tepsvoca/snd/bgm.mp3"

        }).jPlayer("play"); // Attempts to Auto-Play the media
    }

    //bgm플레이
    function bgmPlay() {
        bgm_timer = setInterval(bgm_go, 500);
    }

    function quizInit(id) {
        //변수선언
        var selTxt = "";

        //타이틀 만들기
        $('.hackers_tepsVoca .txtBox h2').append(Q_Arr[id]).addClass('title');

        //텍스트가 2줄이면 위치값 변경
        addClassHeight($('.hackers_tepsVoca .txtBox h2'), 36, 'height');

        //셀렉트 텍스트 만들기
        random = makeRandom(random, leng);//랜덤 만들기

        for (i = 0; i < leng; i++) {
            selTxt = selArr[id][random[i]];
            $('.hackers_tepsVoca .chkBox li h2').eq(i).append(selTxt);

            //텍스트가 2줄이면 위치값 변경
            addClassHeight($('.hackers_tepsVoca .chkBox li h2').eq(i), 26, 'height');
        }

        chkClick();//체크 클릭
	//onSndComp();		//sndPlay(id);//사운드
	sndPlay(id);//사운드
        $('.hackers_tepsVoca .timeBox span.tbox').css({'background-position': '0px'});
    }

    //클릭안되게
    function notChkClick() {
        $('.hackers_tepsVoca .chkBox li').unbind('click');
    }

    //리프레시
    function reFresh() {
        $('.hackers_tepsVoca .txtBox h2').removeClass('title height').empty();
        $('.hackers_tepsVoca .chkBox li h2').removeClass('on height').empty();
        $('.hackers_tepsVoca .chkBox li').removeClass('on dap');
        $('.hackers_tepsVoca .btnBox li').removeClass('on');
        $('.hackers_tepsVoca .oxBox li').removeClass('on');
        timeTxt(dizit(5));//시간 텍스트
        random = [];
        myNum = -1;
    }

    //올리프레시
    function allReFresh() {
        reFresh();//리프레시
        notChkClick();//클릭안되게
        Q_num = 0;
        stopTime = 0;
        time = 5;
        answerNum = 0;
        wrongNum = 0;

        clearInterval(timer);

        appendTxt($('.hackers_tepsVoca .correctBox h1.answer'), answerNum);
        appendTxt($('.hackers_tepsVoca .correctBox h1.wrong'), wrongNum);
    }

    //버튼 클릭
    function btnClick() {
        //재시작 및 끝내기
        $('.hackers_tepsVoca .btnBox li').hover(function () {
            $('.hackers_tepsVoca .btnBox li').removeClass('on').eq($(this).index()).addClass('on');
        }, function () {
            $('.hackers_tepsVoca .btnBox li').removeClass('on');
        });

        $('.hackers_tepsVoca .btnBox li').click(function () {
            sndPause();//사운드 정지
            btnPlay();//버튼 사운드

            if ($(this).index() == 0)//재시작
            {
                allReFresh();//올리프레시
                quizInit(Q_num);//퀴즈 만들기
            } else {//끝내기
                window.open('about:blank', '_self').self.close();
            }
        });
    }


    //퀴즈 계속할지 안할지
    function continueQuiz() {
        time = 5;
        clearInterval(timer);
        if (Q_num == length - 1) {
            timer = setInterval(quizFinal, 500);
        } else {
            Q_num++;
            timer = setInterval(timeRollingStop, 500);
        }
    }

    //퀴즈 다 끝나면
    function quizFinal() {
        clearInterval(timer);

        sndPause();
        hgmPlay(3);

        $('.hackers_tepsVoca .final').addClass('on');
        $('.hackers_tepsVoca .finalBtn').hover(function () {
            $(this).addClass('on');
        }, function () {
            $(this).removeClass('on');
        });

        $('.hackers_tepsVoca .finalBtn').click(function () {
            sndPause();
            btnPlay();
            $('.hackers_tepsVoca .final').removeClass('on');
        });
    }

    //문제 맞춘후 잠깐 멈추는 타이머
    function timeRollingStop() {
        if (stopTime == stopTimeLeng)//시간이 끝나면
        {
            clearInterval(timer);
            stopTime = 0;
            reFresh();//리프레시
            quizInit(Q_num);//퀴즈 만들기
            $('.hackers_tepsVoca .timeBox span.tbox').css('background-position', '0px');
        } else {
            stopTime++;
        }
    }

    //ox
    function oxControll(type) {
        if (type == "dap") {
            $('.hackers_tepsVoca .oxBox li.o').addClass('on');
            appendTxt($('.hackers_tepsVoca .correctBox h1.answer'), answerNum);
        } else {
            $('.hackers_tepsVoca .oxBox li.x').addClass('on');
            appendTxt($('.hackers_tepsVoca .correctBox h1.wrong'), wrongNum);
        }
    }

    function appendTxt(obj, str) {
        obj.empty();
        obj.append(str);
    }

    //스타트
    function start() {
        //bgm플레이
        bgmPlay();
        //재시작 및 끝내기
        $('.hackers_tepsVoca .startBtn').hover(function () {
            $('.hackers_tepsVoca .startOver, .hackers_tepsVoca .startOut').addClass('on');
        }, function () {
            $('.hackers_tepsVoca .startOver, .hackers_tepsVoca .startOut').removeClass('on');
        });

        $('.hackers_tepsVoca .startBtn').click(function () {
            $('.hackers_tepsVoca .startOut').empty();
            $('.hackers_tepsVoca .start').addClass('on');
            sndPause();//사운드 정지
            btnPlay();//버튼 사운드
            quizInit(Q_num);//퀴즈 만들기
            btnClick();//버튼 클릭
        });
    }
})(window, document);
