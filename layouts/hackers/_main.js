/****************************************************************************************************
 * 해커스영어 공통 스크립트
 ****************************************************************************************************/

$.ajaxSetup({ cache: false });

// module : movie - 강의 팝업
var openMovieView = function(lec_id, lec_kang, teacher_code, self, obj) {

    if ($.inArray(parseInt(lec_id), [7,19,20]) > -1) {
        var width = 1189;
    } else {
        var width = 1220;
    }


    var url = '/?r=hackers&m=movie&mode=intro&lec_id=' + lec_id + '&lec_kang=' + lec_kang + '&t=' + teacher_code + '&iframe=Y';
    if(self=="Y"){
        window.parent.window.location = url;
    }else{
        var popupMovie = window.open(url, 'popupMovie', 'width=' + width + 'px,height=950px,innerHeight=1000px,top=0,left=0,status=no,scrollbars=yes,toolbar=no');
        popupMovie.focus();

        if(obj=='Y') {
            return popupMovie;
        }
    }


};


var openPopupSms = function(id,view,date) {
    if(id){
        var tar = $('#'+id);
        tar.html('').parents('.wrap_pop').css({"display":"none"})
        if(view == 'open'){
            tar.html('').parents('.wrap_pop').css({"display":"block"})
            tar.append("<iframe name='"+id+"'width='800' height='1220' src='/?m=event&uid=34&category="+date+"&page=popup01&iframe=Y&type=fullservice' frameborder='0' scrolling='no'></iframe>")
        }
    }else{
        window.open('/?m=event&uid=34&category='+date+'&page=popup01&iframe=Y&type=fullservice', 'sms', 'toolbar=0, scrollbars=yes, status=0, width=820, height=760');
    }
}


// module : movie - 선생님 소개 팝업
var openTeacherIntro = function(code) {
    var teacher_code = code;
    var url = '/?r=hackers&m=movie&mode=teacher_intro&t=' + teacher_code + '&iframe=Y';
    var popupTeacher = window.open(url, 'popupTeacher', 'width=810px,height=600px,innerHeight=650px,status=no,scrollbars=yes,toolbar=no');
    popupTeacher.focus();
};


// 플래시 호출
var makeFlash = function(url, width, height) {
    document.writeln("<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0\" width=\"" + width + "\" height=\"" + height + "\">");
    document.writeln("<param name=\"movie\" value=\"" + url + "\">");
    document.writeln("<param name=\"quality\" value=\"high\" />");
    document.writeln("<param name=\"wmode\" value=\"transparent\">");
    document.writeln("<param name=\"allowScriptAccess\" value=\"always\" />");
    document.writeln("<embed src=\"" + url + "\" quality=\"high\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" wmode=\"transparent\" width=\"" + width + "\"  height=\"" + height + "\"></embed>");
    document.writeln("</object>");
};




// sns
var useFacebook = function() {
    // (function(d, s, id){
    // 	var js, fjs = d.getElementsByTagName(s)[0];
    // 	if (d.getElementById(id)) {return;}
    // 	js = d.createElement(s); js.id = id;
    // 	js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.0";
    // 	fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));
};


var shareSns = function(type, sns) {
    if (type == 'f') {
        alert('준비중입니다.');
        return;

        FB.init({
            appId      : '771393746214225',
            xfbml      : true,
            version    : 'v2.0'
        });

        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                //var uid = response.authResponse.userID;
                //var accessToken = response.authResponse.accessToken;
                meFeed(sns);
            } else if (response.status === 'not_authorized') {
            } else {
                FB.login(function(response) {
                    if (response.authResponse) {
                        meFeed(sns);
                    }
                }, {scope:'publish_actions'});
            }
        });

        function meFeed(sns) {
            FB.api(
                "/me/feed", 'post', {
                    message: sns.message,
                    link: sns.link,
                    name: sns.name,
                    picture: sns.picture
                },
                function (response) {
                    if (response && !response.error) {
                        var snsUrl = 'https://www.facebook.com/me';

                        var popupSns = window.open(snsUrl, 'popupsns', 'toolbar=0, status=0');
                        if (popupSns) {
                            popupSns.focus();
                        }
                    } else {
                    }
                }
            );
        }

    } else if (type == 't') {
        var ranNum = Math.floor(Math.random() * 10); // 퍼가기 캐싱 방지
        var text = "[" + sns.title + "] " + sns.description;
        var snsUrl = 'http://twitter.com/share?url='+encodeURIComponent( sns.url )+'&text='+encodeURIComponent( text )+"&nocache="+ranNum;

        var popupSns = window.open(snsUrl, 'popupsns', 'toolbar=0, status=0, width=626, height=436');
        if (popupSns) {
            popupSns.focus();
        }
    }
};


/****************************************************************************************************
 * 메인페이지 스크립트
 ****************************************************************************************************/
var mainpage = function() {

    this.init = function() {

        //해커스영어 TV bx슬라이드 부분 이혜원 20180104
        var bnrWrap = $('.slider_applyclass');
        var bnr_slider = bnrWrap.find('.bxslider');
        var defaultHackersTV = $('#defaultHackersTV').val();
        slider = bnr_slider.bxSlider({
            auto: false,
            mode : 'horizontal',
            cutLimit: 5,
            speed: 500,
            autoStart: false,
            pagerCustom: '.page_applyclass',
            startSlide : defaultHackersTV, //해당 부분 바꾸면 됨
            //pagerType: 'short',
            onSliderLoad: function(selector){
                bnrWrap.css("overflow","visible");
            }
        });
        $('.page_applyclass').mouseover(function(){
            //slider.startAuto();
        });

        var startSlide = 1;
        //main_banner
        $('#slides').slides({
            container: 'slide',
            pagination: true,
            //generatePagination: true,
            paginationClass: 'page',
            start: 1,
            effect: 'slide',
            //slideSpeed: 0,
            //slideSpeed: 350,
            play: 4000,
            pause: 1,
            hoverPause: 1,
            start: startSlide
        });


        //mini_banner
        $('#slides1').slides({
            container: 'slide',
            pagination: true,
            generatePagination: true,
            paginationClass: 'page',
            start: 1,
            effect: 'slide',
            slideSpeed: 0,
            //slideSpeed: 350,
            play: 10000,
            pause: 1,
            hoverPause: 1,
            start: startSlide
        });

        //mini_banner
        $('#main_br_list').slides({
            container: 'slide',
            pagination: true,
            //generatePagination: true,
            paginationClass: 'page',
            start: 1,
            effect: 'fade',
            fadeSpeed: 0,
            fadeEasing: "",
            //slideSpeed: 0,
            //slideSpeed: 350,
            play: 4000,
            pause: 1,
            hoverPause: 1,
            start: startSlide
        });

        //job_bnr
        $('#job_bnr').slides({
            container: 'slide',
            pagination: true,
            //generatePagination: true,
            paginationClass: 'page',
            start: 1,
            effect: 'slide',
            //slideSpeed: 0,
            //slideSpeed: 350,
            play: 4000,
            pause: 1,
            hoverPause: 1,
            start: startSlide
        });

        //movie_cnt_list
        $('.js-movie-1').slides({
            container: 'slide',
            generateNextPrev: true,
            next: "next",
            prev: "prev",
            pagination: false,
            //generatePagination: true,
            paginationClass: 'page',
            start: 1,
            effect: 'fade',
            fadeSpeed: 0,
            //slideSpeed: 0,
            //slideSpeed: 350,
            play: 4000,
            pause: 1,
            hoverPause: 1,
            start: startSlide
        });
        //movie_cnt_list
        $('.js-movie-2').slides({
            container: 'slide',
            generateNextPrev: true,
            next: "next",
            prev: "prev",
            pagination: false,
            //generatePagination: true,
            paginationClass: 'page',
            start: 1,
            effect: 'fade',
            fadeSpeed: 0,
            //slideSpeed: 0,
            //slideSpeed: 350,
            play: 4000,
            pause: 1,
            hoverPause: 1,
            start: startSlide
        });
        //movie_cnt_list
        $('.js-movie-3').slides({
            container: 'slide',
            generateNextPrev: true,
            next: "next",
            prev: "prev",
            pagination: false,
            //generatePagination: true,
            paginationClass: 'page',
            start: 1,
            effect: 'fade',
            fadeSpeed: 0,
            //slideSpeed: 0,
            //slideSpeed: 350,
            play: 4000,
            pause: 1,
            hoverPause: 1,
            start: startSlide
        });
        //tab
        $(".js-tab li a").mouseenter(function(){
            var $div = $(this).parent().parent().parent();
            var $li = $(this).parent();
            var nm = $li.parent().find("li").index($li);
            $li.siblings("li").removeClass("on");
            $li.addClass("on");
            $div.find(".js-tab-con").hide();
            $div.find(".js-tab-con").eq(nm).show();
            return false;
        });

        //메인 무료강의 인기게시글 아작스
        // $("#news_cast li a").mouseenter(function(){
        //     var $div = $(this).parent().parent().parent();
        //     var $li = $(this).parent();
        //     var nm = $li.parent().find("li").index($li);
        //     $li.siblings("li").removeClass("on");
        //     $li.addClass("on");
        //
        //     if($div.find('#' + $li.attr('data')).find('.movie_wrap').find('ul').find('li').length < 1) {
        //         $.ajax({
        //             url: '/',
        //             type: 'post',
        //             data: {
        //                 r: 'hackers',
        //                 _layoutAction: 'news_cast',
        //                 type: $li.attr('data'),
        //             },
        //             success: function (result) {
        //                 $div.find('#' + $li.attr('data')).find('.movie_wrap').find('ul').html(result);
        //             }
        //         });
        //     }
        //
        //     $div.find(".js-tab-con").hide();
        //     $div.find(".js-tab-con").eq(nm).show();
        //     return false;
        // });


        //js-rolling
        $(".js-rolling-con").each(function(){
            var liW = $("ul li",this).width();
            var liNm = $("ul li",this).length;
            $("ul",this).css("width",liW * liNm);
        });


        // 베스트셀러 교재 - 탭 마우스오버시

        $('.book-info').each(function(){
            $('.js-lecture-link').on('click', function() {
                var idx = $(this).data('idx');
                $('.lecture-link-pop').removeClass('on');
                $(this).siblings('.lecture-link-pop.pop'+idx).addClass('on');
                return false;
            });
            $('.lecture-link-pop .close').on('click', function() {
                $(this).parent('.lecture-link-pop').removeClass('on');
                return false;
            });
        });

        // 20180205 베스트셀러 메뉴 화살표 mouseover 수정
        $('.bestsell-tab-more').on('mouseover', function() {
            $(this).addClass('on');
            $(this).next('.bestsell-tab-more-box').addClass('on');
        });

        $('.bestsell-tab-more').on('mouseout', function() {
            if($(this).hasClass('on')){
                $('.bestsell-tab-more-box').removeClass('on');
                $(this).removeClass('on');
            }
        });
        $('.bestsell-tab-more-box').on('mouseover', function() {
            $(this).addClass('on');
            $('.bestsell-tab-more').addClass('on');
        });
        $('.bestsell-tab-more-box').on('mouseout', function() {
            $(this).removeClass('on');
            $('.bestsell-tab-more').removeClass('on');
        });

        $('#bestseller_book_tab li a').on('mouseover', function() {
            // var _this = $(this);
            // _this.parent().siblings("li").removeClass("on");
            // _this.parent().addClass("on");
            // var tab = _this.data('tab');
            // var path =  '/layouts/hackers/_cache/';
            // var file = path + 'bestSeller_10_' + tab + '.php';
            // $('#bestsell_book_tab_data').load(file, {}, function() {
            // 	$('.bestseller_div > div').find('.close').on('click', function() {
            // 		$('.bestseller_div > div').css({'display' : 'none'});
            // 	});
            // });
        });


        // 페이징 : 해커스잡 BEST 인기글, 마감/발표 일정
        $('.paging .pagebtn').on('click', function() {

            var _paging = $(this).parents('.paging'),
                _con = $(this).parents('.js-tab-con');

            var type = $(this).attr('data-type'),
                total = _paging.attr('data-total'),
                page = _paging.attr('data-page');

            _con.find('.page_contents').eq(page - 1).addClass('hide');

            if (type == 'prev') {
                page = (page == 1) ? total : parseInt(page) - 1;
            } else if (type == 'next') {
                page = (page == total) ? 1 : parseInt(page) + 1;
            }

            _con.find('.page_contents').eq(page - 1).removeClass('hide');

            _paging.find('strong').text(page);
            _paging.attr('data-page', page);
        });

        // 교재 랜덤출몰
        /*
        var rand_num = Math.floor((Math.random() * 10) + 1); // 1 ~ 10

        $('#bestsell_book_tab li a').eq(0).trigger('mouseover');

        if (rand_num >= 1 && rand_num <= 3) {
            $('#bestsell_book_tab li a').eq(0).trigger('mouseover');
        } else {
            $('#bestsell_book_tab li a').eq(10 - rand_num).trigger('mouseover');
        }
        */

        // 무료학습컨텐츠
        var freestusySize = 8;
        for (var i = 1; i <= freestusySize; i++) {
            var template = $('#freestudy_template_' + i).val();
            $('#freestudy_' + i).simpleSlideAjax({
                head: '7_' + i
            });
        }

        // 최신 토익시험 총평
        $('#review_box_toeic').simpleSlideAjax({
            head: '9_1'
        });

        // 최신 텝스시험 총평
        $('#review_box_teps').simpleSlideAjax({
            head: '9_2'
        });

        // 최신 토스시험 총평
        $('#review_box_tos').simpleSlideAjax({
            head: '9_3'
        });

        // 최신 토스시험 총평
        $('#review_box_opic').simpleSlideAjax({
            head: '9_4'
        });

        // 해커스 철학 / 지식나눔 페이징
        $('#learning_con').simpleSlideAjax({
            head: '6'
        });

        // 오늘의 HOT 채용공고
        $('#recruit_con').simpleSlideAjax({
            head: 'recruit'
        });

        // 무료학습컨텐츠 타이틀
        $("#learning_roll").jCarouselLite({
            visible: 1,
            auto: 4000,
            speed: 500,
            vertical: true
        });


        // 베스트셀러 교재 타이틀
        $("#bestsell_roll").jCarouselLite({
            visible: 1,
            auto: 2000,
            speed: 500,
            vertical: true
        });

        /*
        var realtime = function(idx) {
            var t = 4;
            return timer = function(idx) {
                console.log(idx);
                $(".review_list:eq(" + idx + ") li:eq(" + t + ") p").animate({marginTop : "-14px"},500,function(){
                    $(this).css('margin-top', '0px');
                    if (t == 0) {
                        t = 4;
                        setTimeout(function() {
                            timer(idx);
                        }, 2000);
                    } else {
                        t--;
                        timer(idx);
                    }
                });
            };
        };
        */

        //var t = 0;
        var t = [4, 4, 4, 4, 4, 4];
        var realtimer = function(idx, tmp_t) {
            $(".review_list:eq(" + idx + ") li:eq(" + tmp_t + ") p").animate({marginTop : "-14px"},200,function(){
                $(this).css('margin-top', '0px');
                if (t[idx] == 0) {
                    t[idx] = 4;
                    var extime = 3000;
                } else {
                    t[idx]--;
                    var extime = 1000;
                }

                setTimeout(function() {
                    realtimer(idx, t[idx]);
                }, extime);
            });
        };

        $(function() {
            setTimeout(function() { realtimer(0, t[0]); }, 1200);
            setTimeout(function() { realtimer(1, t[1]); }, 1200);
            setTimeout(function() { realtimer(2, t[2]); }, 1200);
            setTimeout(function() { realtimer(3, t[3]); }, 1200);
            setTimeout(function() { realtimer(4, t[4]); }, 1200);
            setTimeout(function() { realtimer(5, t[5]); }, 1200);
        });


        // 메인 중앙 레이어
        var main_center_layer = {
            init: function() {
                // 창닫기
                $('#main_breand_checkbox_close').on('click', function() {
                    $('.layer_new').fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다.
                    $('#main_breand').fadeOut();
                });

                // 오늘하루 보지않기
                $('#main_breand_checkbox').on('click', function() {
                    setCookie('main_breand_layer', 'NO', 1);
                    $('#main_breand_checkbox_close').trigger('click');
                });

                // 백그라운드, 하단창닫기
                $('#main_breand_bg, #main_breand_checkbox_close2').on('click', function() {
                    $('#main_breand_checkbox_close').trigger('click');
                });
            }
        };

        main_center_layer.init();

        //메인 상단 랜덤 노출
        var top_cnt = $('#topLayer .topbn').length;
        var top_layer_num = Math.ceil(Math.random() * top_cnt);

        // $('#topLayer').show();
        $('.topbn').eq(top_layer_num - 1).show();

        //서브 페이지 상단 랜덤 노출
        var sub_top_cnt = $('#topLayer .sub_topbn').length;
        var sub_top_layer_num = Math.ceil(Math.random() * sub_top_cnt);

        // $('#topLayer').show();
        $('.sub_topbn').eq(sub_top_layer_num - 1).show();

        if (getCookie('main_breand_layer') != 'NO') {
            var http_referer = document.getElementById('http_referer').value;
            var tmp_referer = '';
            var exception_string = ['hackers', 'hacademia', 'champstudy', 'pass'];
            var main_top_layer_flag = false;

            if (typeof http_referer != 'undefined') {
                if (http_referer != '') {
                    var arr_tmp1 = http_referer.split('//');
                    var arr_tmp2 = arr_tmp1[1].split('/');
                    tmp_referer = arr_tmp2[0];
                } else {
                    tmp_referer = http_referer;
                }

                for (var i = 0, len = exception_string.length; i < len; i++) {
                    if (tmp_referer.indexOf(exception_string[i]) > -1) {
                        main_top_layer_flag = true;
                    }
                }

                if (main_top_layer_flag == false) {
                    var item_cnt = $('#main_breand_layer .main_breand_layer_item').length;
                    var top_event_num = Math.ceil(Math.random() * 15);

                    var random_arr = [];
                    $.each($('#main_breand_layer .main_breand_layer_item').find('.frequency'), function(i, e){
                        for(var idx = 0; idx < $(e).val(); idx++) {
                            random_arr.push(i+1);
                        }
                    })
                    top_event_num = random_arr[Math.floor(Math.random() * random_arr.length)];

                    // if(top_event_num < 7) {
                    // 	top_event_num = 1;
                    // } else if(top_event_num > 6 && top_event_num < 11) {
                    // 	top_event_num = 2;
                    // // } else if(top_event_num > 9 && top_event_num < 14) {
                    // // 	top_event_num = 3;
                    // }else {
                    // 	top_event_num = 3;
                    // }

                    if(getCookie('main_breand_layer_history') == ''){
                        top_event_num = 1;
                        setCookie('main_breand_layer_history', 'YES', 1);
                    }

                    $('#main_breand_layer').show();
                    $('.main_breand_layer_item').eq(top_event_num - 1).show();

                    document.getElementById('main_breand_layer').style.height=document.body.getBoundingClientRect().bottom+(window.scrollY?window.scrollY:document.documentElement.scrollTop)+'px';

                }
            }
        }

        // 베스트셀러 교재 영역
        $('.bestseller_div > div').find('.close').on('click', function() {
            $('.bestseller_div > div').css({'display' : 'none'});
        });

        // 메인 무료학습실 스크립트 141215
        $('.lcb_con .play_btn2 > a').on({
            mouseover: function() {
                $(this).parents('.thumb2').find('strong.tit').css({'color':'#0768a9'});
            },
            mouseleave: function() {
                $(this).parents('.thumb2').find('strong.tit').css({'color':'#4c4a4a'});
            }
        });

        // 토익시험 FULL 서비스 롤링
        var full_rolling = function(){
            $(".fullservice_promote_wrap .f_r").find("ul").each(function(){
                $(this).animate({
                    marginTop:"-24px"
                },700, function(){
                    $(this).css("margin-top","0px");
                    $(this).append($(this).find("li:first-child"));
                })
            })
        }
        var full_roll_inter = setInterval(full_rolling, 5000);

        // 메인 FULL 서비스 D-Day 깜빡임 효과
        var full_dday_blink = function(){
            $(".tab_full_step").find(".toggleOn").toggleClass("on");
        }

        var full_dday_blink_inter = setInterval(full_dday_blink, 800);

        setInterval(function(){
            if($(".bestsell_roll_box_link li.on").index() == 0){
                $(".bestsell_roll_box_link li").removeClass("on");
                $(".bestsell_roll_box_link li").eq(1).addClass("on");
            }else if($(".bestsell_roll_box_link li.on").index() == 1){
                $(".bestsell_roll_box_link li").removeClass("on");
                $(".bestsell_roll_box_link li").eq(0).addClass("on");
            }
        },6000);//속도6초
    };

    var usePoll = false;
    var resultPollUid = '';

    // 해티즌 설문조사
    this.setPoll = function(uid) {
        var poll_answer = $('input[name=poll_answer]:checked').val();
        $.ajax({
            beforeSend: function() {
                if (usePoll) {
                    var url = '/?c=s_toge/toge_info/poll&uid=' + resultPollUid + '&poll_result=1';
                    var screenWidth = screen.availWidth,
                        screenHeight = screen.availHeight;
                    iPopup(url, '', screenWidth, screenHeight, 'yes', '');
                }
            },
            url: '/',
            type: 'post',
            data: {
                r: 'hackers',
                m: 'poll',
                a: 'update_cnt',
                uid: uid,
                answer: poll_answer,
                flag: 'main'
            },
            success: function(result) {
                usePoll = true;
                resultPollUid = result;

                if (result) {
                    //var url = '/?c=s_toge/toge_info/poll&uid=' + result + '&poll_result=1';
                    var url = '/?c=s_toge/toge_info/poll&uid=' + result;
                    var screenWidth = screen.availWidth,
                        screenHeight = screen.availHeight;
                    window.open(url, '');
                }
            }
        });
    };


    // 베스트셀러 교재
    this.bestseller_pop = function(id, view) {
        $('.bestseller_div > div').css({'display':'none'});
        if (view == 'open') {
            document.getElementById(id).style.display = 'block';
        } else {
            document.getElementById(id).style.display = 'none';
        }
    };

    $("#bestsell_book_tab_data").on('click', '.child_close', function(e){
        $(".pop_li").css('display','none');
    });

    // 메인 우측 베스트셀러교재 - 버튼 레이어 생성
    $('#bestsell_book_tab_data').on('click', '.children_layer_exist', function(e) {

        //기존 레이어 선제거
        if($('#bestsell_book_tab_data').find($('.pop_li')) ){
            $('.pop_li').css('display','none');
        }

        var _this = $(this);
        var li_index = _this.data('index'); //몇번째 li box에 있는건지
        var b_li_index = _this.data('li_no'); //해당 박스의 몇번째 부모(자식존재) 버튼인지
        var c_btn_cnt = $('#c_btn_cnt_'+li_index+'_'+b_li_index).val(); //자식 갯수
        var c_html = '';

        c_html += '<div class="pop_li"  id="c_layer_'+li_index+'_'+b_li_index+'" style="display:block; z-index:999999; width:115px;"  >';
        c_html += '<div class="pos_r">';
        c_html += '<div class="inside">';
        for (var i = 0; i < c_btn_cnt; i++) {
            var c_btn_name=  $("#c_li_"+li_index+"_"+b_li_index ).find( $('#c_name_'+li_index+'_'+b_li_index+'_'+i) ).val();
            var c_btn_link = $("#c_li_"+li_index+"_"+b_li_index ).find( $('#c_link_'+li_index+'_'+b_li_index+'_'+i) ).val();
            var c_btn_target = $("#c_li_"+li_index+"_"+b_li_index ).find( $('#c_target_'+li_index+'_'+b_li_index+'_'+i) ).val();
            c_html += '<a class="btn_a c_name" href="'+c_btn_link+'" target="'+c_btn_target+'">';
            c_html += c_btn_name;
            c_html += '<img src="//gscdn.hackers.co.kr/hackers/images/main/renewal/150417/ico_bestsell_pop_arrow.gif" alt="" >';
            c_html += '</a>';
        }
        c_html += '</div>';
        c_html += '<a class="close child_close">';
        c_html += '<img src="//gscdn.hackers.co.kr/hackers/images/main/renewal/150417/btn_bestsell_close.gif" alt="" >';
        c_html += '</a>';
        c_html += '</div>';
        c_html += '</div>';

        $("#c_li_"+li_index+"_"+b_li_index).before().append(c_html);
    });

    //main_movie_control
};

//main_movie_control
var main_movie;
function main_movie_play() {
    main_movie = setTimeout(function(){
        $('.movie-control-play').show();

        var _this = $(".tab_banner li.on");
        var curriculum = _this.data('curriculum');

        jwplayer('movie-box').setup({
            file: curriculum,
            width: '1000',
            height: '384',
            image: "",
            aspectratio: '16:9',
            primary: 'HTML5',
            autostart: true,
            icons: false
        });

    }, 3000);
}
function main_movie_stop() {
    clearTimeout(main_movie);
}


// 리스트 페이징
$.fn.simpleSlide = function(option) {
    var _this = this;
    var defaults = {
        auto: false,
        duration: 1000,
        tag: 'li',
        cnt: 3,
        total: 0,
        current: 1,
        paging_tag: 'page_num'
    };

    $.extend(defaults, option);
    defaults.total = _this.find(defaults.tag).size();
    defaults.totalPage = Math.ceil(defaults.total / defaults.cnt);

    if (defaults.auto) {
        // 롤링
        var time = setInterval(function() { move('next'); }, defaults.duration);
    }

    $(this).find('.pagebtn').on('click', function() {
        var type = $(this).attr('data-type');

        var start = getStart();
        var end = getEnd(start);
        _this.find(defaults.tag).slice(start, end).addClass('hide');

        if (type == 'prev') {
            defaults.current = (defaults.current == 1) ? defaults.totalPage : defaults.current - 1;
        } else {
            defaults.current = (defaults.current == defaults.totalPage) ? 1 : defaults.current + 1;
        }

        start = getStart();
        end = getEnd(start);
        _this.find(defaults.tag).slice(start, end).removeClass('hide');
        _this.find('.' + defaults.paging_tag).text(defaults.current);
    });

    var getStart = function() {
        return (defaults.current == 1) ? 0 : (parseInt(defaults.current) - 1) * parseInt(defaults.cnt);
    };

    var getEnd = function(start) {
        return parseInt(start) + parseInt(defaults.cnt);
    };

    var move = function(direction) {
        _this.find('.pagebtn[data-type=' + direction + ']').trigger('click');
    };
};

// 리스트 페이징(ajax)
$.fn.simpleSlideAjax = function(option) {
    var _this = this;
    var defaults = {
        path: '/vocaTest/layouts/hackers/_cache/',
        head: '',
        auto: false,
        duration: 1000,
        cnt: 3,
        current: 1,
        paging_tag: 'page_num'
    };

    $.extend(defaults, option);

    defaults.change_area = _this.find('.simpleSlideAjax_changeArea');
    defaults.totalPage = _this.data('total');

    if (defaults.auto) {
        // 롤링
        var time = setInterval(function() { move('next'); }, defaults.duration);
    }

    $(this).find('.pagebtn').on('click', function() {
        var type = $(this).attr('data-type');

        var start = getStart();
        var end = getEnd(start);

        if (type == 'prev') {
            defaults.current = (defaults.current == 1) ? defaults.totalPage : defaults.current - 1;
        } else {
            defaults.current = (defaults.current == defaults.totalPage) ? 1 : defaults.current + 1;
        }

        start = getStart();
        end = getEnd(start);
        var file = defaults.path + defaults.head + '_' + defaults.current + '.php';
        defaults.change_area.load(file);

        _this.find('.' + defaults.paging_tag).text(defaults.current);
    });

    var getStart = function() {
        return (defaults.current == 1) ? 0 : (parseInt(defaults.current) - 1) * parseInt(defaults.cnt);
    };

    var getEnd = function(start) {
        return parseInt(start) + parseInt(defaults.cnt);
    };

    var move = function(direction) {
        _this.find('.pagebtn[data-type=' + direction + ']').trigger('click');
    };
};


// 퀵 어플 레이어
/* 모바일 다운로드 퀵메뉴 추가 작업 / 다운로드팝업 leewj 20140627 */
var quick_page = function() {
    var target_slide = $(".lnb_area");
    var currentPop = 0
    var beforePop = 0
    target_slide.find(".menu").bind("click",function(){
        var obj = $(this);
        if(target_slide.hasClass("fixed")){
            target_slide.find(".lnb_sub").slideUp(300);
        }else{
            target_slide.find(".lnb_sub").slideDown(300);
        }
        if(target_slide.hasClass("fixed")){
            target_slide.find(".lnb_sub").parent().removeClass("fixed");
        }else{
            target_slide.find(".lnb_sub").parent().addClass("fixed");
        }
    });

    this.init = function(direct,num) {
        // 숫자만 입력
        $('#outer_quick').on('keydown', '.numberic', function(e) {
            return ((48 <= e.which && e.which <= 57)  || (96 <= e.which && e.which <= 105) || e.which == 0 || e.which == 45 || e.which == 46 || e.which == 8 || e.which == 9) ? true : false;
        });
        if(direct == "go"){
            /*if(target_slide.hasClass("fixed")){
                //target_slide.find(".lnb_sub").slideUp(300).parent().removeClass("fixed");
            }else{
                target_slide.find(".lnb_sub").slideDown(300).parent().addClass("fixed");
            }*/
            lnb_tab_append(num,"open")

        }else{
            target_slide.find(".lnb_sub li").hover(lnb_on,lnb_off);

        }

        //var cate_array = ['','h_toeic','toeic_voca','ToeicListening2','HackersConv','MPPlayer','h_teps','VocaTepsI','VocaTepsA'];

        function lnb_on(direct,num){
            var index;
            if(direct == "go"){
                index = num;
                //$("#outer_quick").css({"top":"186px"})
            }else{
                index  = $(this).index()+1;
            }
            var cate_array = ['','h_toeic','toeic_voca','ToeicListening2','HackersConv','MPPlayer','h_teps','VocaTepsI','VocaTepsA']; //어플순서 , 추가시 순서대로 등록 (3곳)
            //alert("::"+currentPop+"::"+index)
            if(currentPop != index){
                pop_off(beforePop); //팝업닫고 다시열기
                currentPop = index;
                $('.send input[name=sub_category]').val(cate_array[index]);
                var imsi = target_slide.find(".lnb_sub li:eq("+(index-1)+")")
                imsi.find("img").attr("src",imsi.find("img").attr("src").split("off.gif").join("on.gif") );
                lnb_sub_append(index,"open")
                beforePop = index;
            }
        }
        function lnb_off(){
            //var index = $(this).index()+1;
            //$(this).find("img").attr("src",$(this).find("img").attr("src").split("on.gif").join("off.gif") );
            //lnb_sub_append(index,"close")
        }
        function pop_off(num) {
            chkPop = target_slide.find(".lnb_sub li:eq("+(num-1)+")")
            chkPop.find("img").attr("src",chkPop.find("img").attr("src").split("on.gif").join("off.gif") );
            lnb_sub_append(num,"close")
            currentPop = 0
            beforePop = 0
        }
        function lnb_sub_append(idx,view){
            var cate_array = ['','h_toeic','toeic_voca','ToeicListening2','HackersConv','MPPlayer','h_teps','VocaTepsI','VocaTepsA']; //어플순서 , 추가시 순서대로 등록 (3곳)
            if(view =="open"){
                var src = target_slide.find(".lnb_sub li:eq("+(idx-1)+")");
                var _this = $('#pop_sub').html();
                src.append(""+_this+"");

                /* 퀵 해당어플 클릭시 페이지로 이동 140917 leewj  */
                /*$(".pop_sub").find('.inside').bind("click",function(){
                    lnb_href(cate_array[idx]);
                })*/

                var chang1Img = src.find(".pop_sub .inside .change1").find("img")
                var chang2Img = src.find(".pop_sub .inside .change2").find("img")
                var chang3Img = src.find(".pop_sub .inside .change3").find("img")
                chang1Img.attr("src",chang1Img.attr("src").replace("type1","type"+idx));
                chang2Img.attr("src",chang2Img.attr("src").replace("type1","type"+idx));
                chang3Img.attr("src",chang3Img.attr("src").replace("type1","type"+idx));

                src.find(".pop_sub .inside .close_pop").bind("click",function(){
                    var chkNum = $(this).parents("li").attr("class").replace("f","");
                    currentPop = chkNum
                    pop_off(currentPop)
                });

            }else{
                var src = target_slide.find(".lnb_sub li:eq("+(idx-1)+") .pop_sub");
                src.remove();
            }
        }

        function lnb_tab_append(idx,view){
            var src = $("#appliersPos");
            var cate_array = ['','h_toeic','toeic_voca','ToeicListening2','HackersConv','MPPlayer','h_teps','VocaTepsI','VocaTepsA']; //어플순서 , 추가시 순서대로 등록 (3곳)
            if(view =="open"){
                var _this = $('#pop_sub').html();
                src.append(""+_this+"").find(".pop_sub").css({"left":-199,"top":104});
                $('.send input[name=sub_category]').val(cate_array[idx]);

                /* 퀵 해당어플 클릭시 페이지로 이동 140917 leewj  */
                /*$(".pop_sub").find('.inside').css({'cursor':'pointer'}).bind("click",function(){
                    lnb_href(cate_array[idx]);
                })*/

                var chang1Img = src.find(".pop_sub .inside .change1").find("img")
                var chang2Img = src.find(".pop_sub .inside .change2").find("img")
                var chang3Img = src.find(".pop_sub .inside .change3").find("img")
                chang1Img.attr("src",chang1Img.attr("src").replace("type1","type"+idx));
                chang2Img.attr("src",chang2Img.attr("src").replace("type1","type"+idx));
                chang3Img.attr("src",chang3Img.attr("src").replace("type1","type"+idx));

                src.find(".pop_sub .inside .close_pop").bind("click",function(){
                    src.find(".pop_sub").remove();
                }).css({"cursor":"pointer"})

            }else{
                src.find(".pop_sub").remove();
            }
        }

        //퀵 해당어플 클릭시 페이지 설정 140917 leewj - 추가시 등록
        function lnb_href(app){
            switch (app){
                case 'h_toeic' : location.href="/?c=s_toeic/toeic_board/app_introduce_toeic&idx="+app; break;
                case 'toeic_voca' :  location.href="/?c=s_toeic/toeic_board/app_introduce_toeic&idx="+app; break;
                case 'ToeicListening2' :  location.href="/?c=s_toeic/toeic_board/app_introduce_toeic&idx="+app; break;
                case 'HackersConv' :  location.href="/?c=s_eng/eng_board/app_introduce&idx="+app; break;
                case 'MPPlayer' : location.href="/?c=s_eng/eng_board/app_introduce&idx="+app; break;
                case 'h_teps' : location.href="/?c=s_teps/teps_board/app_introduce_teps&idx="+app; break;
                case 'VocaTepsI' :  location.href="/?c=s_teps/teps_board/app_introduce_teps&idx="+app; break;
                case 'VocaTepsA' :  location.href="/?c=s_teps/teps_board/app_introduce_teps&idx="+app; break;
            }
        }
    };


};


/****************************************************************************************************
 * 통합검색 스크립트
 ****************************************************************************************************/
$(function() {

    // 상단 통합검색
    var mask_over = $('#notice_r_mask_over').html();
    var src = $(".ranking_h_pos #ranking_header");
    src.find("#notice_r_mask").append(""+mask_over+"");
    var src2 = $(".l_ranking #l_ranking_target");
    src2.append(""+mask_over+"");

    var notice_r_var = $("#ranking_header li")
    var notice_r_total= notice_r_var.size();
    for (var i = 0; i < notice_r_total; i++) {
        $("#ranking_header li:eq("+(i)+")").addClass("notice_r_num"+(i)+"");
    }
    rolling_banner();

    var rank_src1 = $(".ranking_h_pos");
    rank_src1.find("#ranking_header").mouseover( function(){
        ranking_append('open');
    }).mouseleave( function(){
    }).bind("click",function(){
    });
    var rank_src2 = $(".ranking_h_pos")
    rank_src2.find("#ranking_header_over").mouseover( function(){
    }).mouseleave( function(){
        ranking_append('close');
    }).bind("click",function(){
    });

    $('#q').on({
        'focus': function() {
            if ($('#q_tmp').val() == $(this).val()) {
                $(this).val('');
            }
        },
        'blur': function() {
            if ($.trim($(this).val()) == '') {
                var keyword = $('#q_tmp').val();
                $('#q').val(keyword);
            }
        }
    });
});

function ranking_append(view){
    if(view == "open"){
        var src = $(".ranking_h_pos #ranking_header_over")
        var _this = $('#notice_r_mask_over').html();
        src.css({"display":"block"}) //.find("#notice_r_mask_over").append(""+_this+"")
    }else{
        var src =$(".ranking_h_pos #ranking_header_over")
        src.css({"display":"none"}) //.find(".keyword").remove()
    }
}

function rolling_banner(){
    var id = $("#ranking_header");
    var pos = $("#ranking_header").find(".keyword");
    var total = pos.find("li").size()-1;
    var imgsize = 21;
    var cachedEl = pos.children("li");
    var totalNum = pos.find("li").size()
    var currentNum = 1
    //init();
    function motion(num){
        var target = pos.find(">li.notice_r_num"+num).detach().clone();
        target.insertAfter(pos.find(">li:first-child"));
        pos.stop().animate({"top":-(imgsize)},200,function(){
            pos.empty().append(cachedEl);
            var prevAll = pos.children("li").eq(num).prevAll().detach().get().reverse();
            pos.append(prevAll).css("top",0);
        });//animate
    }//motion
    function motion_next(num){
        var target = pos.find(">li.notice_r_num"+num).detach().clone();
        target.insertBefore(pos.find(">li:first-child"));
        pos.css("top",-(imgsize));
        pos.stop().animate({"top":0},200,function(){
        })
    }//motion
    function autorun(){
        myInterval = setInterval (motion_setintervarl, 3000);
    }
    function runstop(){
        clearInterval(myInterval);
    }
    function motion_setintervarl(c){
        if(c=="next" ){
            currentNum ++
            if(currentNum == totalNum+1){
                currentNum = 1
            }
            motion_next(currentNum-1);
            return;
        } else if(c=="prev"  || c== undefined){
            currentNum --
            if(currentNum == 0){
                currentNum = totalNum
            }
            motion(currentNum-1);
            return;
        }
    }
    autorun();
}//rolling_banner

/****************************************************************************************************
 * FOOTER 스크립트
 ****************************************************************************************************/
$(function() {
    //패밀리사이트 마우스 벗어날때
    $(".fam-site dd").mouseleave(function(){
        fam_site();
    });
});

var fam_list = 1;
var book_state = 1;

function textbook_list_show(){
    $(".textbook dd").toggle("normal");

    if(book_state == 1){
        var state = "닫기 ▲";
        book_state = 0;
    }else{
        var state = "열기 ▼";
        book_state = 1;
    }
    $(".txt_book_state").html(state);
}

// footer toggle 수정 0112
/*var book_state02 = false;
$(".txt_book_state").on("click",function(){
	if(!book_state02){
		$(".textbook dd").slideDown();
		$(".txt_book_state").html("닫기 ▲");
		book_state02 = true;
	} else {
		$(".textbook dd").slideUp();
		$(".txt_book_state").html("열기 ▼");
		book_state02 = false;
	}
});*/


function fam_site() {
    if(fam_list == 1){
        $(".fam-site dd").show();
        $(".fam-site .state").html("▲");
        fam_list = 0;
    }
    else{
        $(".fam-site dd").hide();
        $(".fam-site .state").html("▼");
        fam_list = 1;
    }
}


/****************************************************************************************************
 * 문서 준비
 ****************************************************************************************************/
$(function() {


    //서브페이지 상단 랜덤 노출	//스피킹나눔터 페이지 보여주기
    var sub_top_cnt = $('#sub_topLayer .sub_topbn').length;
    var sub_top_layer_num = Math.ceil(Math.random() * sub_top_cnt);

    $('#sub_topLayer').show();
    $('.sub_topbn').eq(sub_top_layer_num - 1).show();


    // 숫자만 입력
    $('.numberic').on('keydown', function(e) {
        return ((48 <= e.which && e.which <= 57)  || (96 <= e.which && e.which <= 105) || e.which == 0 || e.which == 45 || e.which == 46 || e.which == 8 || e.which == 9) ? true : false;
    });

    // footer
    $(".footer_noitce_btn").click(function(){
        if($(".footer_noitce").hasClass("on") != 1){
            $(".open_box").slideDown(300);
            $(".footer_noitce").addClass("on");
        }else{
            $(".open_box").slideUp(300,function(){
                $(".footer_noitce").removeClass("on");
            });
        }
        return false;
    });

    //gnb
    $(".gnb_menu > li > a").mouseenter(function(){
        $(this).parent().parent().find("li").removeClass("on");
        $(this).parent().addClass("on");
    });
    $(".gnb_menu").mouseleave(function(){
        $(this).find("li").removeClass("on");
    });

    if(	__getParam('c')==false
        ||	__getParam('c')==''
    ){
        //quick.initialize("outer_quick", 5);
        quick.initialize("outer_quick", 0); //main 수정
    }else{
        quick.initialize("outer_quick", 0);
    }

    /*if(	__getParam('c')==false
    ||	__getParam('c')==''
    ){
        // 메인페이지는 패스
        if($(".top_line_renew_open_v2").hasClass("fixed") == 0){ // 닫힘
                $("#outer_quick").removeClass("outer_quick_br");
            }else{// 열림
                $("#outer_quick").addClass("outer_quick_br");//750px
            }
    }else{
        // 서브페이지에서만 실행
        quick.initialize("outer_quick", 250);
    }*/

    if ($('#container').attr('class') != 'main') {
        var sQuick = new quick_page();
        sQuick.init();
    }

    // if ($('.fb-like').length > 0) {
    // 	useFacebook();
    // }

    // 하단 띠 배너
    if (getCookie('floor_layer') != 'NO') {
        var item_cnt = $('#floor_layer_pop .floor_layer_item').length;
        var main_check = $('#main_check').val();

        if (item_cnt > 0) {
            var top_event_num = Math.ceil(Math.random() * item_cnt);

            var select_item = $('.floor_layer_item').eq(top_event_num - 1);
            var floor_bg = select_item.find('input[name=floor_bg]').val();

            $('#floor_layer_pop').css({
                'background': floor_bg
            });

            $('#floor_layer_pop').show();
            select_item.show();
            $('.cookie_chk').show();
        }
    }

    //tab
    if($(".js-tab-type1").length > 0){
        $(".js-tab-type1 li a").click(function(){
            var $div = $(this).parent().parent().parent();
            var $li = $(this).parent();
            var nm = $li.parent().find("li").index($li);
            $li.siblings("li").removeClass("on");
            $li.addClass("on");
            $div.find(".js-tab-con").hide();
            $div.find(".js-tab-con").eq(nm).show();
            return false;
        });
    }
});


$(document).ready(function(){
    //if($(location).attr("search").length > 0){
    var url = $(location).attr("search").split("tab=");
    var nm = "#" + url[1];
	var hasFind = $('.tab-box > .js-tab-type1').hasClass('eq_two');

    //alert(nm);
    if(nm == "#undefined"){
		//두번째 on if 조건
		if(hasFind == false){
   		 $(".js-tab-type1 li").eq(0).addClass("on");
		 $(".js-tab-type1-con").eq(0).show();
		}

    }else{
        $(".js-tab-type1 a").each(function(){
            var $li = $(this).parent().siblings("li");
            var $id = $(this).attr("href");

            if($id == nm){
                $li.removeClass("on");
                $(this).parent().addClass("on");

                $(".js-tab-type1-con").hide();
                $($id).show();
            }
            if (typeof autoMap != 'undefined') {
                autoMap.printMap();
            }

        });
    }
    //}

    if($(".js-tab-type1").length > 0){
        $(".js-tab-type1 a").click(function(){
            var $li = $(this).parent().siblings("li");
            var $id = $(this).attr("href");

            $li.removeClass("on");
            $(this).parent().addClass("on");

            $(".js-tab-type1-con").hide();
            $($id).show();
            if (typeof autoMap != 'undefined') {
                autoMap.printMap();
            }
        });
    }

    if($(".js-tab-type2").length > 0){
        $(".js-tab-type2 a").click(function(){
            if($(this).attr("target") != "_blank"){
                var $li = $(this).parent().siblings("li");
                var $div = $(this).parent().parent().parent();
                var $id = $(this).attr("href");

                if($(this).hasClass('return')) { //2018-04-07 배동균
                    alert('준비중입니다.');
                } else {
                    $li.removeClass("on");
                    $(this).parent().addClass("on");

                    $("> .js-tab-type2-con", $div).hide(); //바로 아래로 수정 2016-12-28 이혜원
                    $($id).show();
                    return false;
                }
            }else{
                $(this).parent().removeClass("on");
            }
        });
    }

    var url1 = $(location).attr("search").split("mode=");
    var nm1 = "#" + url1[1];

    if(nm1 == "#undefined"){
        $(".js-tab-type3 li").eq(0).addClass("on");
        $(".js-tab-type3-con").eq(0).show();
    }else{
        $(".js-tab-type3 a").each(function(){
            var $li = $(this).parent().siblings("li");
            var $id = $(this).attr("href");

            if($id == nm1){
                $li.removeClass("on");
                $(this).parent().addClass("on");

                $(".js-tab-type3-con").hide();
                $($id).show();
            }
            //autoMap.printMap();
        });
    }

    if($(".js-tab-type3").length > 0){
        $(".js-tab-type3 a").click(function(){
            var $li = $(this).parent().siblings("li");
            var $div = $(this).parent().parent().parent();
            var $id = $(this).attr("href");
            $li.removeClass("on");
            $(this).parent().addClass("on");

            $(".js-tab-type3-con",$div).hide();
            $($id).show();
            return false;
        });
    }

    //자세히 보기
    $('.js-detail-btn').click(function(){
        if($(this).hasClass("on")  == 0){
            $(this).addClass("on");
            $($(this).attr('href')).show();
        }else{
            $(this).removeClass("on");
            $($(this).attr('href')).hide();
        }
        return false;
    });
});


//레이어닫기
var layer_close =  function(el){
    $("#"+el).hide();
}

// 하단 띠 배너 닫기
var floor_layer_close = function() {
    $('#floor_layer_pop').fadeOut();
};

// 하단 띠 배너 오늘하루 닫기
var floor_layer_close_today = function(_this) {
    setCookie('floor_layer', 'NO', 1);
    floor_layer_close();
};

function Poll_set(uid) {
    var sMain = new mainpage();
    sMain.setPoll(uid);
}


// main
$(document).ready(function() {

    if ($('#container').attr('class') == 'main') {

        var sMain = new mainpage();
        sMain.init();

        var sQuick = new quick_page();
        sQuick.init();

        try {
            m_sMain = new m_link_page();
            m_sMain.init();
        } catch (e) {

        }

        try {
            main_banner = new main_banner();
            main_banner.init();
        } catch (e) {

        }
        //useYoutube();
    }

});

function isObject(a) {
    return (a && typeof a == 'object');
}

function flashMovie(fid, src, wid, hei, fvs, wmd) {
    this.fPrint = '';
    this.Id = document.getElementById(fid);
    this.Src = src;
    this.Width = wid;
    this.Height = hei;
    this.FlashVars = (fvs != undefined)? fvs :'';
    this.Wmod = (wmd != undefined)? wmd :'transparent';
    if (isObject(Id)) {
        fPrint = '<object id="obj_' + fid + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0"';
        fPrint += ' width="' + Width + '"';
        fPrint += ' height="' + Height + '">';
        fPrint += '<param name="movie" value="' + Src + '">';
        fPrint += '<param name="allowScriptAccess" value="always" />';
        fPrint += '<param name="wmode" value="transparent" />';
        fPrint += '<param name="quality" value="high">';
        fPrint += (FlashVars != null) ? '<param name="FlashVars" value="' + FlashVars + '">' : '';
        fPrint += (Wmod != null) ? '<param name="wmode" value="' + Wmod + '">' : '';
        fPrint += '<embed';
        fPrint += ' src="' + Src + '"';
        fPrint += (FlashVars != null) ? ' FlashVars="' + FlashVars + '"' : '';
        fPrint += (Wmod != null) ? ' wmode="' + Wmod + '"' : '';
        fPrint += ' quality="high"';
        fPrint += ' pluginspage="http://www.macromedia.com/go/getflashplayer"';
        fPrint += ' type="application/x-shockwave-flash"';
        fPrint += ' width="' + Width + '"';
        fPrint += ' height="' + Height + '"';
        fPrint += '></embed>';
        fPrint += '</object>';
        Id.innerHTML = fPrint;
    }
}

/* 상단 레이어배너 컨트롤 Start */
//메인/서브 페이지 구분값
function __getParam(idx){
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

function top_line_renew_layer(){
    var target_slide = $(".top_line_renew_open_v2");
    $(".top_line_ban_renew_box2").animate({
        height: "toggle"
    }, {
        duration:250
        ,progress:function(){}
        ,step:function(){}
        ,complete:function(){
            //quick_initialize();
            //quick_initialize();
        }
    });
    if(target_slide.hasClass("fixed")){ //열림
        target_slide.removeClass("fixed");
        target_slide.find(".btn_slider").addClass("active");
        $("#outer_quick").removeClass("outer_quick_br");
    }else{ //닫힘
        doOpenTopLayer();
        target_slide.addClass("fixed");
        target_slide.find(".btn_slider").removeClass("active");
        $("#outer_quick").addClass("outer_quick_br");
    }
    //quick_initialize();
}

$(function(){
    $(".top_line_renew_open_v2").on('click', top_line_renew_layer);
    $(".top_line_close_v2").on('click', top_line_renew_layer);
});
/* 상단 레이어배너 컨트롤 End */
function doOpenTopLayer(){
    $('.top_line_ban_renew_box2 .top_line_inner').each(function(idx, attr){
        var ifr = document.createElement("iframe");
        ifr.src="http://www.hackers.ac/site/top_line_banner.php?addr=hackers";
        ifr.width="1000px";
        ifr.height="497px";
        ifr.setAttribute('frameborder','no');
        ifr.setAttribute('frameBorder','no');
        ifr.setAttribute('scrolling',"no");
        ifr.setAttribute('allowtransparency',"true");
        if(	__getParam('c')==false // 메인페이지
            ||	__getParam('c')=='' // 메인페이지
            ||	location.referrer=='' // url 직접 입력해서 들어온 경우
            ||	document.referrer.match(/hackers.co.kr/ig)==null
        ){
            if(ifr.attachEvent){
                ifr.attachEvent("onload",function(e){
                    // top_line_renew_layer();
                })
            }else{
                ifr.addEventListener('load',function(e){
                    // top_line_renew_layer();
                },false)
            }
        }
        $('.top_line_ban_renew_box2 .top_line_inner').append(ifr);
    });
}


function get_version_of_IE() {
    var word;
    var version = "N/A";

    var agent = navigator.userAgent.toLowerCase();
    var name = navigator.appName;

    // IE old version ( IE 10 or Lower )
    if ( name == "Microsoft Internet Explorer" ) word = "msie ";

    else {
        // IE 11
        if ( agent.search("trident") > -1 ) word = "trident/.*rv:";

        // Microsoft Edge
        else if ( agent.search("edge/") > -1 ) word = "edge/";
    }

    var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" );

    if (  reg.exec( agent ) != null  ) version = RegExp.$1 + RegExp.$2;

    return version;
}



/**
 * Created by Fabbit :: 2017-04-04
 *
 *  포커스 된 객체에 대해 이벤트를 줄수 있는 인터페이스 함수
 *  Image lazyload for JQuery 를 토대로 만들었습니다.
 *
 */

(function($, window, document, undefined){

    var $window = $(window);

    var loadingFlag = false;

    $.fn.Looker = function(options) {

        var elements = this;
        var settings = {
            'async': false,
            'threshold' : 0,
            'cointainer': window,
            'event': 'scroll',

            /* 콜백 함수 */
            'on'  : null,
            'off' : null,
            'one' : null
        };

        function update() {

            var counter = 0;
            elements.each(function () {
                var $this = $(this);

                if ($.lazyup(this, settings) || $.lazydown(this, settings)) {
                    // UnLook
                    if(settings.async === true && this.loading === true){

                        this.loading = this.loading ? this.loading : false;

                        if(this.loading === true){
                            this.loading = false;
                            loadingFlag = false;
                        }
                    }
                    $this.trigger("off");

                } else if ($.inviewpoart(this, settings)) {
                    //Look
                    if(settings.async === true){

                        if(loadingFlag !== true){

                            var flag = false;
                            elements.each(function () {
                                if( this.loading === false ) {
                                    flag = true;
                                    return true;
                                }
                            });

                            if(flag !== true){
                                loadingFlag = true;
                                this.loading = this.loading ? this.loading : true;
                            }
                        }

                        if(loadingFlag === true && this.loading !== true){
                            return false;
                        }
                    }
                    $this.trigger("on");
                    counter++;
                }
            });
        }

        if (options) {
            $.extend(settings, options);
        }

        $container = (settings.container === undefined || settings.container === window) ? $window : $(settings.container);

        if (0 === settings.event.indexOf("scroll")) {
            $container.on(settings.event, function() {
                return update();
            });
        }

        this.each(function () {
            var self = this;
            var $self = $(self);

            if( self.loaded === 'undefined' ){
                self.loaded = false;
            }

            //한번만 실행
            $self.one("on", function () {
                if (this.oneloaded !== true && settings.one) {
                    settings.one($self);
                }
                self.oneloaded = true;
            });

            //가시영역
            $self.on("on", function () {
                if (this.loaded !== true && settings.on) {
                    settings.on($self);
                }
                self.loaded = true;
            });

            //비가시영역
            $self.on("off", function () {
                if (this.loaded === true && settings.off) {
                    settings.off($self);
                }
                self.loaded = false;
            });

            //scroll 이벤트가 아닐경우
            if (0 !== settings.event.indexOf("scroll")) {
                $self.on(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("on");
                        if(!settings.one) self.loaded = false;
                    }
                });
            }
        });

        $window.on("resize", function() {
            update();
        });

        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.on("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("on");
                    });
                }
            });
        }

        $(document).ready(function() {
            update();
        });

    };

    $.lazyup = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.lazydown = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.inviewpoart = function(element, settings) {
        return !$.lazyup(element, settings) && !$.lazydown(element, settings);
    };

})(jQuery, window, document);


document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        jwplayer('jw_movie').setMute();
    }
};

$(document).ready(function (){
    if($("#jw_movie_pos").length == 1){
        var mov_state = "";
        var mov_flag = true;

        $("#jw_movie_pos").click(function(){
            mov_state = jwplayer('jw_movie').getState();
            if(mov_flag == true){
                if(mov_state == "PAUSED") {	mov_flag = false; } // 클릭으로 정지 > 스크롤 이동으로 재시작 없음.
            } else {
                if(mov_state == "PAUSED") {	mov_flag = true; } // 클릭으로 재시작 > 스크롤 이동으로 재시작.
            }
        });

        $('#jw_movie_pos').Looker({
            one : function(obj){
                jwplayer("jw_movie").setup({
                    playlist: [ // 영상 1
                        {  'file': '//cdndown.hackers.com/oap/mp4/190813_WeakPoint_System.mp4' }, //  영상1
                        {  'file': '//cdndown.hackers.com/oap/mp4/190822_0won_full.mp4'}, // 영상 2
                        {  'file': '//cdndown.hackers.com/oap/mp4/171208_douglas%20park_viral_3(6).mp4' }, // 영상3
                        {  'file': '//cdndown.hackers.com/hackers/mp4/hackersbasic/free/171213_imagemapping_7.mp4' }, // 영상4
                        {  'file': '//cdndown.hackers.com/oap/mp4/171226_0wonfreepass_30s.mp4' }], // 영상5
                    width: '295',
                    height: '130',
                    aspectratio: '16:9',
                    primary: 'HTML5',
                    icons: false,
                    volume : 25
                });
                jwplayer('jw_movie').setVolume(10);
            },
            on : function(obj){
                mov_state = jwplayer('jw_movie').getState();
                if(mov_state != "PLAYING" && mov_flag){
                    jwplayer('jw_movie').play();
                }
            },
            off : function(obj){
                mov_state = jwplayer('jw_movie').getState();
                if(mov_state != "PAUSED"){
                    jwplayer('jw_movie').pause(true);
                }
            }
        });
    }

    var get_state = 'Y';
    $('#jw_movie_pos').click(function(){
        //$('#jw_movie_pos').live("click", function(){
        //document.onclick = function(event) {
        var state = jwplayer("jw_movie").getState();

        if(state=="PAUSED" && get_state=="Y"){ //정지상태일때 스크롤가능
            get_state = "N";
        }else if(state=="PAUSED" && get_state=="N"){
            get_state = "Y";
        }
    });

    if ($("#jw_movie_pos").length > 0) {

        $('#jw_movie_pos').Looker({
            on: function (obj) {
                if (get_state == "Y") {
                    jwplayer("jw_movie").play();
                }
            },
            off: function (obj) {
                jwplayer("jw_movie").pause(true);
            }
        });

    }

    var div_id = __getParam('scroll_div');
    if(div_id) {
        $("html,body").scrollTop($('#'+div_id).offset().top);
    }

    /* 상단 슬라이드 배너
    if($('.js-top_bnr').length){
        $(".top_open,.top_open_close").click(top_line_layer);
    };*/

    /* facebook icon */
    if($('.js-facebook').length){
        $('.js-facebook-open a').click(function(){
            //alert('1111');
            $(this).toggleClass('on');
            $('.top-view-area').toggleClass('active');
            $('.top-view-list').toggle();
            return false;
        });
    };
});


/* 상단 슬라이드 배너
function top_line_layer(){
	var target_slide = $(".top_open"),
		$topOpenBox = $('.top_open_box'),
		$slider = $topOpenBox.find('.bxslider-default'),
		$wrapper = $slider.find('.bx-wrapper');

	if( $wrapper.length > 0 ) {

			__globalBxslider.bxList.forEach(function (obj, i) {
				if( $slider[0] == $(obj[0]).closest('.bxslider-default')[0] ) {
					var $bx = __globalBxslider.bxList[i];
					if( $topOpenBox.is(':visible') ) {
						$bx.stopAuto();
					} else {
						$bx.startAuto();
					}
				}
			});
	}
	$(".top_open_box").animate({
		height: 'toggle'
	}, 200, function() {
		if( $wrapper.length === 0 ) {
			__globalBxslider.init( 	$(this).find('.bxslider-default') );
		}
	});

	target_slide.find(".btn_slider").toggleClass("active");
}*/

/* footer 수상내역 */
function cer_cate1(){
    var popUrl = "//www.hackers.ac/popup/certificate/certificate1.html";
    var popOption = "width=800, height=700, resizable=no, scrollbars=yes, status=no;";
    window.open(popUrl,"",popOption);
}
function cer_cate2(){
    var popUrl = "//www.hackers.ac/popup/certificate/certificate2.html";
    var popOption = "width=800, height=700, resizable=no, scrollbars=yes, status=no;";
    window.open(popUrl,"",popOption);
}
function cer_cate3(){
    var popUrl = "//www.hackers.ac/popup/certificate/certificate3.html";
    var popOption = "width=800, height=700, resizable=no, scrollbars=yes, status=no;";
    window.open(popUrl,"",popOption);
}
function cer_cate4(){
    var popUrl = "//www.hackers.ac/popup/certificate/certificate4.html";
    var popOption = "width=800, height=700, resizable=no, scrollbars=yes, status=no;";
    window.open(popUrl,"",popOption);
}
function cer_cate5(){
    var popUrl = "//www.hackers.ac/popup/certificate/certificate5.html";
    var popOption = "width=800, height=700, resizable=no, scrollbars=yes, status=no;";
    window.open(popUrl,"",popOption);
}
function cer_cate6(){
    var popUrl = "//www.hackers.ac/popup/certificate/certificate6.html";
    var popOption = "width=800, height=700, resizable=no, scrollbars=yes, status=no;";
    window.open(popUrl,"",popOption);
}
function cer_cate7(){
    var popUrl = "//www.hackers.ac/popup/certificate/certificate7.html";
    var popOption = "width=800, height=700, resizable=no, scrollbars=yes, status=no;";
    window.open(popUrl,"",popOption);
}
function cer_cate8(){
    var popUrl = "//www.hackers.ac/popup/certificate/certificate8.html";
    var popOption = "width=800, height=700, resizable=no, scrollbars=yes, status=no;";
    window.open(popUrl,"",popOption);
}
function cer_cate9(){
    var popUrl = "//www.hackers.ac/popup/certificate/certificate9.html";
    var popOption = "width=800, height=700, resizable=no, scrollbars=yes, status=no;";
    window.open(popUrl,"",popOption);
}
function cer_cate10(){
    var popUrl = "//www.hackers.ac/popup/certificate/certificate10.html";
    var popOption = "width=800, height=700, resizable=no, scrollbars=yes, status=no;";
    window.open(popUrl,"",popOption);
}
function cer_cate11(){
    var popUrl = "//www.hackers.ac/popup/certificate/certificate11.html";
    var popOption = "width=600, height=700, resizable=no, scrollbars=yes, status=no;";
    window.open(popUrl,"",popOption);
}

//layer
function layerComPop(el, func, cl) {
    var temp = $('#' + el);

    var bg = temp.prev().hasClass('bg');
    var id = temp.attr('id');

    if(bg){
        temp.parent().fadeIn();
        $('html, body').css({'overflow':'hidden'});
        if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
        else temp.css('top', '0px');
    }else{
        temp.parent().fadeIn();
        temp.parent().css({'position':'absolute'});
        temp.css({'top':'30px'});
    }

    if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
    else temp.css('left', '0px');

    temp.find('.js_pop_close').click(function(e){
        if(cl == false) return false;
        temp.parent().fadeOut();
        $('html, body').removeAttr('style');
    });

    temp.parent().find('.bg').click(function(e){
        temp.parent().fadeOut();
        $('html, body').removeAttr('style');
    });

    if(typeof func=='function'){
        func();
    }
    //__bxslider.resize();
}


/****************************************************************************************************
 * 해커스영어 서브메인 공통 스크립트

 20180117 서브메인 양정현

 ****************************************************************************************************/

/* 서브 메인 선생님 rolling 슬라이드 */

$(function(){
    if ($("#teacher_list_rolling").length > 0) {
        $('#teacher_list_rolling').slides({
            container: 'teacher_list',
            pagination: true,
            generateNextPrev: true,
            next: 'next',
            prev: 'prev',
            effect: 'slide',
            play: 4000,
            slideSpeed: 200
        })
    }
})


function main_click(uid, url){
    $.ajax({
        type: "post",
        url: "/?m=sitemanager&a=link",
        data: {
            uid : uid,
            url : url
        }
    });
}
