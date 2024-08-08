
//==================================================================
//レスポンシブ画像置換
//==================================================================
$(function() {
  // 置換の対象とするclass属性。
  var $elem = $('.re_img');
  // 置換の対象とするsrc属性の末尾の文字列。
  var sp = '_sp.';
  var pc = '_pc.';
  // 画像を切り替えるウィンドウサイズ。
  var replaceWidth = 768;

  function imageSwitch() {
    var windowWidth = parseInt($(window).width());

    $elem.each(function() {
      var $this = $(this);
      if(windowWidth >= replaceWidth) {
        $this.attr('src', $this.attr('src').replace(sp, pc));
      } else {
        $this.attr('src', $this.attr('src').replace(pc, sp));
      }
    });
  }
  imageSwitch();

  var resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      imageSwitch();
    }, 200);
  });
});


// html例 (画像ファイルは末尾に_spと_pcのついた2種類を用意して、マークアップ時には_spを記述)
// 768px未満
// <img src="image_sp.png" alt="" class="re_img">
// 768px以上
// <img src="image_pc.png" alt="" class="re_img">

//==================================================================
//bg cahnge
//==================================================================
$(function() {
    bgCahnge();

    $(window).on('resize', function(){
    bgCahnge();
    });

    function bgCahnge() {
        var width = $(window).width();
        var border = 768;

      if( width <  border){
            $(".re_bg").each(function(e){
              var bg = $(this).css('background-image');
              bg = bg.replace("_pc","_sp");
              $(this).css('background-image',bg);
            })
          } else {
            $(".re_bg").each(function(e){
              var bg = $(this).css('background-image');
              bg = bg.replace("_sp","_pc");
              $(this).css('background-image',bg);
            })
          }
    }
});
//==================================================================
//pageHead
//==================================================================

$(function(){
    var setElm = $('.txtAnime2__txt'),
    className = '';
 
    setElm.children().addBack().contents().each(function(){
        var elmThis = $(this);
        if (this.nodeType == 3) {
            var $this = $(this);
            $this.replaceWith($this.text().replace(/(\S)/g, '<span>$&</span>'));
        }
        setElm.each(function(){
            $(this).find('span').each(function(i){
                i = i+1;
                $(this).addClass(className+i);
            });
        });
    });
    
    pageHeadAction();
    
});

function pageHeadAction(){
    anime.timeline({
//        loop: true
        delay:2000
    })
    .add({
            targets: '.pageHead__mv__bg',
            opacity: [0,1],
            scale: [1.3,1],
            easing: "easeOutQuint",
            duration: 2000,
            delay:300
      },0)
      .add({
            targets: '.pageHead__ttl__line.-left',
//            scale: [0,1],
            opacity: [0,1],
            translateX: ['-100%',0],
            easing: "easeOutExpo",
            duration: 550,
      },500)
    .add({
            targets: '.pageHead__ttl__line.-right',
//            scale: [0,1],
            opacity: [0,1],
            translateX: ['100%',0],
            easing: "easeOutExpo",
            duration: 550,
      },500)
        .add({
            targets: '.pageHead__ttl__ic.-left',
//            scale: [0,1],
            opacity: [0,1],
            left: ['100%',0],
            easing: "easeOutExpo",
            duration: 550,
      },800)
    .add({
            targets: '.pageHead__ttl__ic.-right',
//            scale: [0,1],
            opacity: [0,1],
            right: ['100%',0],
            easing: "easeOutExpo",
            duration: 550,
      },800)
    .add({
            targets: '.txtAnime2__txt span',
            scale: [2,1],
            opacity: [0,1],
            translateX: [40,0],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 550,
//            delay: anime.stagger(50, {start: 10})
        delay: anime.stagger(50)
//            delay: (el, i) => 70*i,
//            translateY:['=-10','0']
      })
    .add({
            targets: '.pageHead__ttl__main__sub',
            opacity: [0,1],
            easing: "easeOutQuint",
            duration: 550,
            delay:600
      },'-=600')
}
//==================================================================
//pc menu
//==================================================================
$(function () {
    $(".header__nv").clone().appendTo(".header__pcMenu__set");
    //2024
    $(".header__navi").clone().appendTo(".footer__menu__include");
});


(function($) {
    $(function() {
        $(".header__pcMenu__set .header__navi__gr").hide();
        
        $(document).click(function() {
            $('.header__pcMenu__set .header__navi__gr').hide();
            $('.header__bg2').fadeOut(100);
            $('.header__pcMenu__set .header__nv li a').removeClass("__open");
            if ($(this).scrollTop() < 800) {
                $('.header__logo').removeClass("-small");
            }
            
        });
        
        $('.header__pcMenu__set .header__nv li a:not(:only-child)').click(function(e) {
            
            
            
//            $('.header__nv li a').removeClass("__open");
            $(this).toggleClass("__open").siblings('.header__pcMenu__set .header__navi__gr').slideToggle(300);
//            $(".header__bg2").fadeToggle(100);
            if($(this).hasClass('__open')){
                $(".header__bg2").fadeIn(100);
                $(".header__logo").addClass("-small");
            }else{
                $(".header__bg2").fadeOut(100);
                
                if ($(window).scrollTop() < 800) {
                    $(".header__logo").removeClass("-small");
                }
            }
            
            var self = $(this);
            $('.header__pcMenu__set .header__nv li a').not(self).removeClass("__open");
            $('.header__pcMenu__set .header__navi__gr').not($(this).siblings()).hide();
            
            e.stopPropagation();
        });
    });
    $(window).scroll( function() {
      // サブメニューが出っぱなしなら消す。
        if ($(this).scrollTop() > 800) {
            $('.header__pcMenu__set .header__navi__gr').hide();
            $('.header__bg2').fadeOut(100);
            $('.header__pcMenu__set .header__nv li a').removeClass("__open");
            $(".header__logo").addClass("-small");
        }else {
            $(".header__logo").removeClass("-small");
        }
   });
    
})(jQuery);


//==================================================================
//sp menu
//==================================================================
$(function() {


    if (window.matchMedia('screen and (max-width:767px)').matches) {

    fit();

    $(window).resize(function() {
        fit();
    })


    function fit() {
        var h = $(window).height();
        //      $('.header__open').css("height", h);
        $('.header__open').css("height", "100vh");
    }

    $(document).on('click', '.header__spmenu,.header__openBody,.header__bg', function() {
        $(".header__navi > ul > li > a").removeClass("open");

        if (!$(".header__spmenu").hasClass("menuon")) {
            $(".header__bg").fadeIn(100);
            
            $(".hamburgerLink").addClass("active");
            
            $(".header__openBody").animate({ scrollTop: 0 }, 100);
            $(".header__spmenu,.header__open").addClass("menuon");

            $('.header__open').animate({ 'marginRight': '100%' }, 300);

            bodyFix();


        } else {
            $(".header__spmenu,.header__open").removeClass("menuon");
            $(".hamburgerLink").removeClass("active");
            $(".header__bg").fadeOut(100);
            $('.header__open').animate({ 'marginRight': '0' }, 300);
            bodyFixReset();
//            $(".header__navi ul li ul").css("display", "none");
            $(".header__navi__gr").css("display", "none");
        }
    });

    //サブメニュ
//    $(".header__navi ul > li > ul,.header__navi__gr").css("display", "none");
        $(".header__navi__gr").css("display", "none");
    $(".header__open .header__navi > ul > li > a:not(.-notsub)").click(function() {
        $(this).toggleClass("open").next().slideToggle("fast");
        return false;
    });


//    $('.sidemenu').clone().appendTo('.header__cv');
//    $('.checkNews').clone().appendTo('.header__news');
        
    }

});
//==================================================================
//footer__menu__include
//==================================================================
$(function() {

    //サブメニュ
    $(".footer__menu__include .header__navi__gr").css("display", "none");
    $(".footer__menu__include .header__navi > ul > li > a:not(.-notsub)").click(function() {
        $(this).toggleClass("open").next().slideToggle("fast");
        return false;
    });


});

//==================================================================
//body固定関数
//==================================================================
if (window.matchMedia('screen and (min-width:767px)').matches) {
    //PC 
    var bodyElm = $("body");
} else {
    //sp
    var bodyElm = $("body");
}

var scrollPosi;

function bodyFix() {
    scrollPosi = $(window).scrollTop();
    bodyElm.css({
        'position': 'fixed',
        'width': '100%',
        //          'z-index': '1',
        'top': -scrollPosi
    });
}

//body fixリセット
function bodyFixReset() {
    bodyElm.css({
        'position': 'relative',
        'width': 'auto',
        'top': 'auto'
    });
    //scroll位置を調整
    $("html, body").scrollTop(scrollPosi);
}


//==================================================================
//scrollin
//==================================================================

 jQuery(function(){
    jQuery(window).scroll(function (){
        jQuery('.scrollin').each(function(){
            var elemPos = jQuery(this).offset().top;
            var scroll = jQuery(window).scrollTop();
            var windowHeight = jQuery(window).height();
//            if (scroll > elemPos - windowHeight + 300){
            if (scroll > elemPos - windowHeight + windowHeight/4){
                jQuery(this).addClass('__action');
            }
        });
    });

  });

jQuery(function(){
    jQuery(window).scroll(function (){
        jQuery('.scrollin2').each(function(){
            var elemPos = jQuery(this).offset().top;
            var scroll = jQuery(window).scrollTop();
            var windowHeight = jQuery(window).height();
//            if (scroll > elemPos - windowHeight + 300){
            if (scroll > elemPos - windowHeight + windowHeight/6){
                jQuery(this).addClass('__action');
            }
        });
    });

  });



//==================================================================
//link
//==================================================================

$(function () {

 var notList = '.tabArea a,a.accordionSet__more,.p_pageNavi a,.pagetop, .notfixlink a';  
 $('a[href^="#"]').not(notList).click(function(){
     
      var headerHight; 
    
    if($('.p_pageNavi').hasClass('__fixed')){
        headerHight = 150; 
    } else {
//        headerHight = 250; 
        headerHight = 100; 
    }
     
     var href= $(this).attr("href");
       var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top - headerHight; 
     $("html, body").animate({scrollTop:position}, 550, "swing");
        return false;
   });
});

// 別ページからのリンク
$(window).on('load', function() {
    var headerHight = 150; //ヘッダの高さ
    if(document.URL.match("#")) {
    var str = location.href ;
    var cut_str = "#";
    var index = str.indexOf(cut_str);
    var href = str.slice(index);
    var target = href;
    var position = $(target).offset().top - headerHight;
    $("html, body").scrollTop(position);
    return false;
}
});
//==================================================================
//modal
//==================================================================
$(function(){
$('.modal-link').modaal({
    type: 'inline',
    animation_speed: '500', 
    background: '#87131b',
  overlay_opacity: '0.8',
});
$('.modal__section__close').click(function(){
  $('.modal-link').modaal('close');
});

});

//==================================================================
//modal-link--slide (modaal + slick)
//==================================================================
$(function(){
$('.modal-link--slide').modaal({
    type: 'inline',
    animation_speed: '500', 
    background: '#87131b',
  overlay_opacity: '0.8',
});
$('.modal__section__close').click(function(){
  $('.modal-link--slide').modaal('close');
});

});


$(function () {
    var slider = $('.modal-link--slide__list').slick({
        infinite: true,
        slidesToShow: 1,
        
        prevArrow: '<button class="slide-arrow prev-arrow"></button>',
        nextArrow: '<button class="slide-arrow next-arrow"></button>',
        autoplay:true,
        dots:false,

        responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          }
        }
      ]

    });
     $('.modal-link--slide').click(function(e){
         e.preventDefault();
         e.stopPropagation();
            slider.css('opacity',0);
            slider.animate({'z-index':1},100,function(){
                slider.slick('setPosition');
                slider.animate({'opacity':1});
            });
        });

});

//==================================================================
//accordion
//==================================================================

$(function() {
    $(".accordionSet__target").hide();
    if($(".accordionSet__target").hasClass("__open")){
        $(".accordionSet__target.__open").show();
    }
    $(".accordionSet__more").click(function(){
      $(this).toggleClass("__open");
        $(this).prev().toggleClass("__open").slideToggle("fast");
        return false;
      
    });
    
});
//==================================================================
//tab
//==================================================================

//html ex
/*
<ul class="tabArea">
<li><a href="#tab01" class="is_active">すべてのニュース</a></li>
<li><a href="#tab02">受験生の方へ</a></li>
<li><a href="#tab03">在学生へ（コロナ）</a></li>
</ul>
<div class="tab_main" id="tab01">
tab01
</div>
<div class="tab_main" id="tab02">
tab02
</div>
<div class="tab_main" id="tab03">
tab03
</div>
*/

$(function() {

        
  var tabMenu = function() {

    /**
     * 変数の指定
     * $tab_area          : tabの親要素のjQueryオブジェクト
     * $content           : tabによって切り替わる要素のjQueryオブジェクト
     * TAB_ACTIVE_CLASS   : tabが選択されたスタイルを変更するclass名
     * CONTENT_SHOW_CLASS : contentを表示させるためのclass名
     * id_arr             : $contentのIDを配列に格納
     */
    var $tab_area          = $('.tabArea');
    var $content           = $('.tab_main');
    var TAB_ACTIVE_CLASS   = 'is_active';
    var CONTENT_SHOW_CLASS = 'is_show';
    var id_arr             = $content.map(function() { return '#' + $(this).attr('id');}).get();


    /**
     * 該当するhashデータがある場合、hashを返す
     * 該当とは id_arr[] に含まれるもの
     * @return {string} 該当する場合
     * @return {false} 該当しない（存在しない）場合
     */
    var getHash = function() {
      var hash = window.location.hash;
      var index = id_arr.indexOf(hash);

      if (index === -1) {
        return false;
      } else {
        return id_arr[index];
      }
    };


    /**
     * ページ読み込み時に実行
     * 1. hashがあれば、hashをhrefに持つタブのスタイル変更（専用のclass付与）
     * 2. hashがあれば、hashをidに持つコンテンツを表示（専用のclassを付与）
     * 3. hashがなければ、タブの先頭が選択された状態とする
     */
    var initialize = function() {
      var hash = getHash();

      if (hash) {
        $tab_area.find('a[href="'+hash+'"]').addClass(TAB_ACTIVE_CLASS); // 1
        $(hash).addClass(CONTENT_SHOW_CLASS); // 2
        $(window).on('load',function(){
          setTimeout(function(){
            $('html,body').animate({ scrollTop: 0 }, 400, 'swing');
          },100);
        });

      } else {
        $tab_area.find('.one_tab:first > a').addClass(TAB_ACTIVE_CLASS); // 3
        $($content[0]).addClass(CONTENT_SHOW_CLASS); // 3
      }
    };


    /**
     * タブのクリックイベント
     * 1. クリックされたタブのhref, 該当するcontentを取得
     * 2. 既にクリック済みの状態であればスキップ
     * 3. 一旦タブ・contentの専用classを全削除
     * 4. クリックしたタブのスタイルを変更、該当するcontentを表示（それぞれ専用のclassを付与）
     */
    var addEvent = function() {
      $tab_area.find('a').on('click', function() {
        var href = $(this).attr('href'); // 1
        var $targetContent = $(href); // 1

        // 2
        if ($(this).hasClass(TAB_ACTIVE_CLASS)) {
          return false;
        }

        // 3
        $tab_area.find('a').removeClass(TAB_ACTIVE_CLASS);
        $content.removeClass(CONTENT_SHOW_CLASS);

        // 4
        $(this).addClass(TAB_ACTIVE_CLASS);
        $targetContent.addClass(CONTENT_SHOW_CLASS);

        return false;
      });
    };

    return [initialize(), addEvent()];
  };

  // 実行
  tabMenu();
        

});

// タブ連動
//$(function(){
//  // tab01
//  $('.tabArea .one_tab:nth-child(1) a').on('click',function(){
//    $('.tabArea .one_tab:nth-child(1) a').addClass('select');
//  });
//  $('.tabArea .one_tab:not(:nth-child(1)) a').on('click',function(){
//    $('.tabArea .one_tab:nth-child(1) a').removeClass('select');
//  });
//  // tab02
//  $('.tabArea .one_tab:nth-child(2) a').on('click',function(){
//    $('.tabArea .one_tab:nth-child(2) a').addClass('select');
//  });
//  $('.tabArea .one_tab:not(:nth-child(2)) a').on('click',function(){
//    $('.tabArea .one_tab:nth-child(2) a').removeClass('select');
//  });
//  // tab03
//  $('.tabArea .one_tab:nth-child(3) a').on('click',function(){
//    $('.tabArea .one_tab:nth-child(3) a').addClass('select');
//  });
//  $('.tabArea .one_tab:not(:nth-child(3)) a').on('click',function(){
//    $('.tabArea .one_tab:nth-child(3) a').removeClass('select');
//  });
//});

//==================================================================
//mvTxtAnime__txt
//==================================================================
//==================================================================
//　jquery.inview.min.js
//==================================================================

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){function i(){var b,c,d={height:f.innerHeight,width:f.innerWidth};return d.height||(b=e.compatMode,(b||!a.support.boxModel)&&(c="CSS1Compat"===b?g:e.body,d={height:c.clientHeight,width:c.clientWidth})),d}function j(){return{top:f.pageYOffset||g.scrollTop||e.body.scrollTop,left:f.pageXOffset||g.scrollLeft||e.body.scrollLeft}}function k(){if(b.length){var e=0,f=a.map(b,function(a){var b=a.data.selector,c=a.$element;return b?c.find(b):c});for(c=c||i(),d=d||j();e<b.length;e++)if(a.contains(g,f[e][0])){var h=a(f[e]),k={height:h[0].offsetHeight,width:h[0].offsetWidth},l=h.offset(),m=h.data("inview");if(!d||!c)return;l.top+k.height>d.top&&l.top<d.top+c.height&&l.left+k.width>d.left&&l.left<d.left+c.width?m||h.data("inview",!0).trigger("inview",[!0]):m&&h.data("inview",!1).trigger("inview",[!1])}}}var c,d,h,b=[],e=document,f=window,g=e.documentElement;a.event.special.inview={add:function(c){b.push({data:c,$element:a(this),element:this}),!h&&b.length&&(h=setInterval(k,250))},remove:function(a){for(var c=0;c<b.length;c++){var d=b[c];if(d.element===this&&d.data.guid===a.guid){b.splice(c,1);break}}b.length||(clearInterval(h),h=null)}},a(f).on("scroll resize scrollstop",function(){c=d=null}),!g.addEventListener&&g.attachEvent&&g.attachEvent("onfocusin",function(){d=null})});


//==================================================================
//top section ttl
//==================================================================



$(function(){
    var setElm = $('.txtAnime__txt'),
    className = '';
 
    setElm.children().addBack().contents().each(function(){
        var elmThis = $(this);
        if (this.nodeType == 3) {
            var $this = $(this);
            $this.replaceWith($this.text().replace(/(\S)/g, '<span>$&</span>'));
        }
        setElm.each(function(){
            $(this).find('span').each(function(i){
                i = i+1;
                $(this).addClass(className+i);
            });
        });
    });
});



var counter = 0;
$('.txtAnime').on('inview', function(event, isInView) {
  if (isInView) {
//      $(this).find('.txtAnime__txt').fadeIn(1000);
        anime.timeline({loop: false})
          .add({
            targets: $(this).find('.txtAnime__txt span').get(),
            scale: [1,1],
            opacity: [0,1],
            translateX: [40,0],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 600,
            delay: anime.stagger(50, {start: 500}),
            translateY:['=-10','0'],
          })
      
    }else {
        $(this).find('.txtAnime__txt').removeClass('txtAnime__txt');
    }
});

//==================================================================
//p_pageNavi
//==================================================================
$(function() {
    var nav = $('.p_pageNavi');
    var header = $('.header');
    if ($(".p_pageNavi").length) {
    var navTop = nav.offset().top;
    }
    //スクロールするたびに実行
    
    //pcだけ
    if (window.matchMedia('screen and (min-width:768px)').matches) {
        
    $(window).scroll(function () {
        var winTop = $(this).scrollTop() + 90;
        //スクロール位置がnavの位置より下だったらクラスfixedを追加
        if (winTop >= navTop) {
            nav.addClass('__fixed');
            header.addClass('__fixed');
        } else if (winTop <= navTop) {
            nav.removeClass('__fixed');
            header.removeClass('__fixed');
        }
    });
    
    }
    //pcだけ
    

    $('.p_pageNavi a[href^="#"]').click(function(){

        var adjust;
        
        if($('.p_pageNavi').hasClass('__fixed')){
                if (window.matchMedia('screen and (min-width:767px)').matches) {
                    adjust = -100;
                }else {
                    adjust = -55;
                }
             } else {
                 if (window.matchMedia('screen and (max-width:767px)').matches) {
//                    adjust = -200;
//                     adjust = 0;
                     adjust = -50;
                }else {
                    adjust = -150;
                }
            }
        
        
        
        
//        var adjust = -100;

        var speed = 500;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top + adjust;
        

        
        $("html, body").animate({scrollTop:position}, speed, "swing");
        return false;
    });
});



    

//==================================================================
//match-heigh
//==================================================================
/*
* jquery-match-height 0.7.0 by @liabru
* http://brm.io/jquery-match-height/
* License MIT
*/
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){var e=-1,o=-1,i=function(t){return parseFloat(t)||0},a=function(e){var o=1,a=t(e),n=null,r=[];return a.each(function(){var e=t(this),a=e.offset().top-i(e.css("margin-top")),s=r.length>0?r[r.length-1]:null;null===s?r.push(e):Math.floor(Math.abs(n-a))<=o?r[r.length-1]=s.add(e):r.push(e),n=a}),r},n=function(e){var o={
byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(o,e):("boolean"==typeof e?o.byRow=e:"remove"===e&&(o.remove=!0),o)},r=t.fn.matchHeight=function(e){var o=n(e);if(o.remove){var i=this;return this.css(o.property,""),t.each(r._groups,function(t,e){e.elements=e.elements.not(i)}),this}return this.length<=1&&!o.target?this:(r._groups.push({elements:this,options:o}),r._apply(this,o),this)};r.version="0.7.0",r._groups=[],r._throttle=80,r._maintainScroll=!1,r._beforeUpdate=null,
r._afterUpdate=null,r._rows=a,r._parse=i,r._parseOptions=n,r._apply=function(e,o){var s=n(o),h=t(e),l=[h],c=t(window).scrollTop(),p=t("html").outerHeight(!0),d=h.parents().filter(":hidden");return d.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),d.css("display","block"),s.byRow&&!s.target&&(h.each(function(){var e=t(this),o=e.css("display");"inline-block"!==o&&"flex"!==o&&"inline-flex"!==o&&(o="block"),e.data("style-cache",e.attr("style")),e.css({display:o,"padding-top":"0",
"padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),l=a(h),h.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(l,function(e,o){var a=t(o),n=0;if(s.target)n=s.target.outerHeight(!1);else{if(s.byRow&&a.length<=1)return void a.css(s.property,"");a.each(function(){var e=t(this),o=e.attr("style"),i=e.css("display");"inline-block"!==i&&"flex"!==i&&"inline-flex"!==i&&(i="block");var a={
display:i};a[s.property]="",e.css(a),e.outerHeight(!1)>n&&(n=e.outerHeight(!1)),o?e.attr("style",o):e.css("display","")})}a.each(function(){var e=t(this),o=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(o+=i(e.css("border-top-width"))+i(e.css("border-bottom-width")),o+=i(e.css("padding-top"))+i(e.css("padding-bottom"))),e.css(s.property,n-o+"px"))})}),d.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),r._maintainScroll&&t(window).scrollTop(c/p*t("html").outerHeight(!0)),
this},r._applyDataApi=function(){var e={};t("[data-match-height], [data-mh]").each(function(){var o=t(this),i=o.attr("data-mh")||o.attr("data-match-height");i in e?e[i]=e[i].add(o):e[i]=o}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){r._beforeUpdate&&r._beforeUpdate(e,r._groups),t.each(r._groups,function(){r._apply(this.elements,this.options)}),r._afterUpdate&&r._afterUpdate(e,r._groups)};r._update=function(i,a){if(a&&"resize"===a.type){var n=t(window).width();if(n===e)return;e=n;
}i?-1===o&&(o=setTimeout(function(){s(a),o=-1},r._throttle)):s(a)},t(r._applyDataApi),t(window).bind("load",function(t){r._update(!1,t)}),t(window).bind("resize orientationchange",function(t){r._update(!0,t)})});





 $(function () {
	$('.matchHeight div').matchHeight();
	$('.matchHeight li').matchHeight();
	$('.matchHeight dl').matchHeight();
	$('.matchHeight dt, dd').matchHeight();
	$('.matchHeight dt.matchDt').matchHeight();
	$('.matchHeight dd.matchDd').matchHeight();
	$('.matchHeight a').matchHeight();
     $('.matchHeightItem').matchHeight();
//     $('.p_linklist li').matchHeight();
     
}); 


/**
 * Modules in this bundle
 * @license
 *
 * scroll-hint:
 *   license: MIT (http://opensource.org/licenses/MIT)
 *   author: steelydylan
 *   version: 1.2.3
 *
 * es6-object-assign:
 *   license: MIT (http://opensource.org/licenses/MIT)
 *   author: Rubén Norte <rubennorte@gmail.com>
 *   maintainers: rubennorte <rubennorte@gmail.com>
 *   homepage: https://github.com/rubennorte/es6-object-assign
 *   version: 1.1.0
 *
 * This header is generated by licensify (https://github.com/twada/licensify)
 */
!function(f){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=f();else if("function"==typeof define&&define.amd)define([],f);else{var g;(g="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).ScrollHint=f()}}((function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,(function(e){var n=t[o][1][e];return s(n||e)}),l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";function assign(target,firstSource){if(null==target)throw new TypeError("Cannot convert first argument to object");for(var to=Object(target),i=1;i<arguments.length;i++){var nextSource=arguments[i];if(null!=nextSource)for(var keysArray=Object.keys(Object(nextSource)),nextIndex=0,len=keysArray.length;nextIndex<len;nextIndex++){var nextKey=keysArray[nextIndex],desc=Object.getOwnPropertyDescriptor(nextSource,nextKey);void 0!==desc&&desc.enumerable&&(to[nextKey]=nextSource[nextKey])}}return to}function polyfill(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:assign})}module.exports={assign:assign,polyfill:polyfill}},{}],2:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_es6ObjectAssign=require("es6-object-assign"),_util=require("./util");function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var defaults={suggestClass:"is-active",scrollableClass:"is-scrollable",scrollableRightClass:"is-right-scrollable",scrollableLeftClass:"is-left-scrollable",scrollHintClass:"scroll-hint",scrollHintIconClass:"scroll-hint-icon",scrollHintIconAppendClass:"",scrollHintIconWrapClass:"scroll-hint-icon-wrap",scrollHintText:"scroll-hint-text",scrollHintBorderWidth:10,remainingTime:-1,enableOverflowScrolling:!0,applyToParents:!1,suggestiveShadow:!1,offset:0,i18n:{scrollable:"scrollable"}},ScrollHint=function(){function ScrollHint(ele,option){var _this=this;_classCallCheck(this,ScrollHint),this.opt=(0,_es6ObjectAssign.assign)({},defaults,option),this.items=[];var elements="string"==typeof ele?document.querySelectorAll(ele):ele,applyToParents=this.opt.applyToParents;[].forEach.call(elements,(function(element){applyToParents&&(element=element.parentElement),element.style.position="relative",element.style.overflow="auto",_this.opt.enableOverflowScrolling&&("overflowScrolling"in element.style?element.style.overflowScrolling="touch":"webkitOverflowScrolling"in element.style&&(element.style.webkitOverflowScrolling="touch"));var item={element:element,scrolledIn:!1,interacted:!1};document.addEventListener("scroll",(function(e){e.target===element&&(item.interacted=!0,_this.updateItem(item))}),!0),(0,_util.addClass)(element,_this.opt.scrollHintClass),(0,_util.append)(element,'<div class="'+_this.opt.scrollHintIconWrapClass+'" data-target="scrollable-icon">\n        <span class="'+_this.opt.scrollHintIconClass+(_this.opt.scrollHintIconAppendClass?" "+_this.opt.scrollHintIconAppendClass:"")+'">\n          <div class="'+_this.opt.scrollHintText+'">'+_this.opt.i18n.scrollable+"</div>\n        </span>\n      </div>"),_this.items.push(item)})),window.addEventListener("scroll",(function(){_this.updateItems()})),window.addEventListener("resize",(function(){_this.updateItems()})),this.updateItems()}return _createClass(ScrollHint,[{key:"isScrollable",value:function isScrollable(item){var offset=this.opt.offset,element=item.element,offsetWidth;return element.offsetWidth+offset<element.scrollWidth}},{key:"checkScrollableDir",value:function checkScrollableDir(item){var _opt=this.opt,scrollHintBorderWidth=_opt.scrollHintBorderWidth,scrollableRightClass=_opt.scrollableRightClass,scrollableLeftClass=_opt.scrollableLeftClass,element=item.element,child,width=element.children[0].scrollWidth,parentWidth=element.offsetWidth,scrollLeft=element.scrollLeft;parentWidth+scrollLeft<width-scrollHintBorderWidth?(0,_util.addClass)(element,scrollableRightClass):(0,_util.removeClass)(element,scrollableRightClass),parentWidth<width&&scrollLeft>scrollHintBorderWidth?(0,_util.addClass)(element,scrollableLeftClass):(0,_util.removeClass)(element,scrollableLeftClass)}},{key:"needSuggest",value:function needSuggest(item){var scrolledIn=item.scrolledIn,interacted;return!item.interacted&&scrolledIn&&this.isScrollable(item)}},{key:"updateItems",value:function updateItems(){var _this2=this;[].forEach.call(this.items,(function(item){_this2.updateItem(item)}))}},{key:"updateStatus",value:function updateStatus(item){var _this3=this,element=item.element,scrolledIn;item.scrolledIn||(0,_util.getOffset)(element).top+Math.min(element.offsetHeight,window.innerHeight)/2<(0,_util.getScrollTop)()+window.innerHeight&&(item.scrolledIn=!0,-1!==this.opt.remainingTime&&setTimeout((function(){item.interacted=!0,_this3.updateItem(item)}),this.opt.remainingTime))}},{key:"updateItem",value:function updateItem(item){var opt=this.opt,element=item.element,target=element.querySelector('[data-target="scrollable-icon"]');this.updateStatus(item),this.isScrollable(item)?(0,_util.addClass)(element,opt.scrollableClass):(0,_util.removeClass)(element,opt.scrollableClass),this.needSuggest(item)?(0,_util.addClass)(target,opt.suggestClass):(0,_util.removeClass)(target,opt.suggestClass),opt.suggestiveShadow&&this.checkScrollableDir(item)}}]),ScrollHint}();exports.default=ScrollHint,module.exports=exports.default},{"./util":3,"es6-object-assign":1}],3:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var append=exports.append=function append(element,string){var div=document.createElement("div");for(div.innerHTML=string;div.children.length>0;)element.appendChild(div.children[0])},addClass=exports.addClass=function addClass(element,className){element.classList?element.classList.add(className):element.className+=" "+className},removeClass=exports.removeClass=function removeClass(element,className){element.classList?element.classList.remove(className):element.className=element.className.replace(new RegExp("(^|\\b)"+className.split(" ").join("|")+"(\\b|$)","gi")," ")},getScrollTop=exports.getScrollTop=function getScrollTop(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},getScrollLeft=exports.getScrollLeft=function getScrollLeft(){return window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0},getOffset=exports.getOffset=function getOffset(el){var rect=el.getBoundingClientRect();return{top:rect.top+getScrollTop(),left:rect.left+getScrollLeft()}}},{}]},{},[2])(2)}));


new ScrollHint('.scrollTable', {
		// scrollHintIconAppendClass: 'scroll-hint-icon-white'
		// remainingTime: 5000
	});


//==================================================================
//　modal news
//==================================================================
//$(function () {
////  $('.item_info_news').delay(2000).fadeIn(200);
//  
//  var scrollend = $('.topSpInfo').offset().top ; 
//  var distance = 0;
//  $(document).scroll(function(){
//    distance = $(this).scrollTop(); 
//    if (scrollend <= distance) {
//      $('.item_info_news').fadeOut();
//    } else{
//      $('.item_info_news').fadeIn();
//    }
//  });
//  
//});

//$(function() {
//    $(window).scroll(function () {
//        if ($(this).scrollTop() > 100) {
//            $('.item_info_news').fadeIn();
//        } else {
//            $('.item_info_news').fadeOut();
//        }
//    });
//});
//$(document).on("click",'#overlay,.item_info_news .close_modal', function(){
//    
//    $('.item_info_news').fadeOut(200);
//});


$(function () {
    var display = function () {
    if ($(this).scrollTop() > 150) { //scroll量
            $(".item_info_news").fadeIn();
        } else {
            $(".item_info_news").fadeOut();
        }
    };
    $(window).on("scroll", display);
    //click
    $(".item_info_news .close_modal").click(function(){
    $(".item_info_news").fadeOut();
    $(window).off("scroll", display);
    });
});

/* ----------------------------------------------
topSchoolList__list
---------------------------------------------- */

$(function(){
    if (window.matchMedia('screen and (min-width:768px)').matches) {
    $(".topNewsList .newsTab__colum").each(function() {
//        var contentsCount = $(".topNewsList .newsList li").length;
        var contentsCount = $(this).find(".newsList li").length;
        var n = 3;//記事の表示の数
        if(contentsCount <= n) {
            $(this).find(".btnOpen__btn").hide();
        } else {
            $(this).find("li").slice(n).hide();

            $(this).find(".btnOpen__btn").click( 'click', function(e){
                e.preventDefault();
//                var $thisSet = $(this).closest(".newsList li");
//                var $thisSet = $(".topNewsList .newsList li");
                var $thisSet = $(this).closest(".newsTab__colum").find(".newsList li");
                if ($thisSet.slice(n).is(':hidden')) {
                    $thisSet.slice(n).slideDown();
                    $(this).text('閉じる');
                    $(this).addClass('-on');
                } else {
                    $thisSet.slice(n).slideUp();
                    $(this).text('もっと見る');
                    $(this).removeClass('-on');
                    
//                    var offset = $(this).parent().parent().offset().top;
//                    $(window).scrollTop( offset );
                }
            });
        }
    });
    } else {
        $(".topNewsList .btnOpen__btn").hide();
    }
});
/* ----------------------------------------------
topNewsList_listType
---------------------------------------------- */

$(function(){
    $(".topNewsList_listType .newsTab__colum").each(function() {
//        var contentsCount = $(".topNewsList .newsList li").length;
        var contentsCount = $(this).find(".newsList li").length;
        var n = 4;//記事の表示の数
        if(contentsCount <= n) {
            $(this).find(".btnOpen__btn").hide();
        } else {
            $(this).find("li").slice(n).hide();

            $(this).find(".btnOpen__btn").click( 'click', function(e){
                e.preventDefault();
//                var $thisSet = $(this).closest(".newsList li");
//                var $thisSet = $(".topNewsList .newsList li");
                var $thisSet = $(this).closest(".newsTab__colum").find(".newsList li");
                if ($thisSet.slice(n).is(':hidden')) {
                    $thisSet.slice(n).slideDown();
                    $(this).text('閉じる');
                    $(this).addClass('-on');
                } else {
                    $thisSet.slice(n).slideUp();
                    $(this).text('もっと見る');
                    $(this).removeClass('-on');
                    
//                    var offset = $(this).parent().parent().offset().top;
//                    $(window).scrollTop( offset );
                }
            });
        }
    });
    
});

/* ----------------------------------------------
topCardNews 2024
---------------------------------------------- */

$(function(){
    if (window.matchMedia('screen and (max-width:767px)').matches) {
    $(".topCardNews .newsTab__colum").each(function() {
//        var contentsCount = $(".topNewsList .newsList li").length;
        var contentsCount = $(this).find(".newsList li").length;
        var n = 4;//記事の表示の数
        if(contentsCount <= n) {
            $(this).find(".btnOpen__btn").hide();
        } else {
            $(this).find("li").slice(n).hide();

            $(this).find(".btnOpen__btn").click( 'click', function(e){
                e.preventDefault();
//                var $thisSet = $(this).closest(".newsList li");
//                var $thisSet = $(".topNewsList .newsList li");
                var $thisSet = $(this).closest(".newsTab__colum").find(".newsList li");
                if ($thisSet.slice(n).is(':hidden')) {
                    $thisSet.slice(n).slideDown();
                    $(this).text('閉じる');
                    $(this).addClass('-on');
                } else {
                    $thisSet.slice(n).slideUp();
                    $(this).text('もっと見る');
                    $(this).removeClass('-on');
                    
//                    var offset = $(this).parent().parent().offset().top;
//                    $(window).scrollTop( offset );
                }
            });
        }
    });
    }
});



//==================================================================
// topbtn
//==================================================================

$(document).ready(function(){
    
        
    $(".pagetop").hide();
    
    if (window.matchMedia('screen and (max-width:767px)').matches) {
    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 100) {
            $(".pagetop").fadeIn("fast");
        } else {
            $(".pagetop").fadeOut("fast");
        }
//        scrollHeight = $(document).height(); //ドキュメントの高さ 
//        scrollPosition = $(window).height() + $(window).scrollTop(); //現在地 
//        footHeight = $(".footer__main").innerHeight(); //footerの高さ（＝止めたい位置）
//        if ( scrollHeight - scrollPosition  <= footHeight ) { //ドキュメントの高さと現在地の差がfooterの高さ以下になったら
//            $(".pagetop").css({
//                "position":"absolute", 
//                "bottom": 20
//            });
//        } else { //それ以外の場合は
//            $(".pagetop").css({
//                "position":"fixed", //固定表示
//                "bottom": "20px" //下から20px上げた位置に
//            });
//        }
    });
        }
    
    
    $('.pagetop').on('click',function(){
        var pos=$(".p_pageNavi").offset().top;
        $('body,html').animate({
//        scrollTop: 0
            scrollTop: pos - 150
        }, 400);
        return false;
    });
});
//==================================================================
// exLectureList
//==================================================================
$(function() {
    $(".accordionSet__target2").hide();
    if($(".accordionSet__target2").hasClass("__open")){
        $(".accordionSet__target2.__open").show();
    }
    $(".accordionSet__more2").click(function(){
      $(this).toggleClass("__open");
        $(this).closest(".exLectureList__main").next().toggleClass("__open").slideToggle("fast");
        return false;
      
    });
    
});

/* ----------------------------------------------
/side navi Active
---------------------------------------------- */
//$(function(){
$(window).on('load',function(){
// var url = window.location.pathname;
// var url_new = url.replace(/http:/, '');

var url = window.location.href;
// var url_new = window.location.href;

var url_new = window.location.pathname;

$('.pageMainArea__menu__list a').each(function(){
$('.pageMainArea__menu__list a[href="'+url_new+'"]').addClass('-active');
$('.pageMainArea__menu__list a[href="'+url_new+'index.html"]').addClass('-active');
});
});

//==================================================================
//footer 調整
//==================================================================

$(function() {
    if($('div').hasClass('pageMainArea')){
        $('.footer').toggleClass("footer--pageMainArea");
        $('.dirList').toggleClass("dirList--pageMainArea");
        $('.p_pageNavi').toggleClass("p_pageNavi--pageMainArea");
    }
});
//==================================================================
//重要なお知らせ
//==================================================================
//$(function(){
//	var contentsCount2 = $(".topSpInfo__colum").length;
//	var n = 1;//1件だけ表示
//
//	if(contentsCount2 <= n) {
//		$(".topSpInfo__btn").hide();
//	} else {
//		$(".topSpInfo__colum").slice(n).hide();
//
//		$(".topSpInfo__btn").click(function(){
//			if ($(".topSpInfo__colum").slice(n).is(':hidden')) {
//				$(".topSpInfo__colum").slice(n).slideDown();
//				$(this).text('閉じる');
//                $(this).addClass('-on');
//			} else {
//				$(".topSpInfo__colum").slice(n).slideUp();
//				$(this).text('すべて');
//                $(this).removeClass('-on');
//			}
//		});
//	}
//});

//==================================================================
//faq
//==================================================================
$(function(){
  $('.faqList__header').click(function(){
    $(this).next('.faqList__inner').slideToggle();
    $(this).toggleClass("open");
      $(this).find(".faqIcon").toggleClass('open');
  });
});
//==================================================================
//header__Smenu
//==================================================================

$(function(){
    $('.header__Smenu__ddmenu__open').hide();
  $('.header__Smenu__ddmenu').click(function(e) {
      
      $('.header__pcMenu__set .header__navi__gr').hide();
    $('.header__bg2').fadeOut(100);
    $('.header__pcMenu__set .header__nv li a').removeClass("__open");
      
      
      
    $(this).toggleClass("active");
    $(this).next().slideToggle(300);
      e.stopPropagation();
  });
    $('html,.header__nv li a').click(function() { 
        $('.header__Smenu__ddmenu__open').slideUp(10);
        $('.header__Smenu__ddmenu').removeClass("active");
    });
});

//==================================================================
//調整
//==================================================================
$(document).ready(function() {
  if (document.URL.match("/teachers/")) {
    $('body').addClass('body_teachers');
  }
    if (document.URL.match("/news/")) {
    $('body').addClass('body_news');
    }
    if (document.URL.match("/yamato_times/")) {
    $('body').addClass('body_yamato_times');
    }
});

//==================================================================
//NEWS
//==================================================================
$(function() {
	var array = [
    "/assets/images/v2024/news_head1.jpg",
    "/assets/images/v2024/news_head2.jpg",
    "/assets/images/v2024/news_head3.jpg",
    "/assets/images/v2024/news_head4.jpg",
    "/assets/images/v2024/news_head5.jpg",
    "/assets/images/v2024/news_head6.jpg"

    ];
    var l = array.length;
    var r = Math.floor(Math.random()*l);
    var bgimgurl = array[r];
    $(".pageHead__mv__bg--news").css('background-image',('url("'+bgimgurl+'")'));
});

