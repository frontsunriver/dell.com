// JavaScript Document

///////////////////////////////////////////
//  CONFIG
///////////////////////////////////////////

///////////////////////////////////////////
//  GLOBALS
///////////////////////////////////////////


///////////////////////////////////////////
//  MAIN
///////////////////////////////////////////

(function (videoTelco) {
  'use strict';

  /* HERO
  ========================================================================== */
  videoTelco.hero = {
    init: function () {
      console.log('TELCO HERO VIDEO videoTelco.hero.init');
      // add hero-has-video class to hero component
      if ($('.hero .hero-has-video').length > 0) {
        console.log('found .hero-has-video')
        videoTelco.hero.getBCIDByPage()
      }
    },

    getBCIDByPage: function () {
      var location = window.location
      var bcid = null
      console.log(location.pathname)

      // TODO: build JSON object that holds pathname and BCID
      if (location.pathname.indexOf('index.htm') > -1 || location.pathname.indexOf('industry/telecom/index.html') > -1) {
        console.log('found telecom/index.html')
        bcid = '6297959876001'
        videoTelco.hero.addMarkup(bcid)
      }
    },

    addMarkup: function (bcid) {
      $('.hero01-view .wrapper').prepend('<div class="bc-video-wrapper"><video id="bc-player" class="" data-account="694940018001" data-video-id="'+ bcid +'"  data-player="default"  data-embed="default"  class="video-js embed-responsive-item" autoplay="true" muted="true" loop="true" playsinline="true"></video></div>');
      // $('.hero01-view .cobrand').prepend('<div class="nvidia-logo"><div class="nvidia-logo-inner"><img src="' + videoTelco.utils.AEMPath + 'images/logo-nvidia.svg" class="nvidia-logo-img"></div></div>');
      // $('.hero01-view .content').addClass('animate');

      $.getScript('//players.brightcove.net/694940018001/default_default/index.min.js')
        .done(function () {          
          setTimeout(function (){
            $('#bc-player').css('visibility', 'visible');
            videoTelco.hero.resizeEventHandler();
          }, 1000);
        });

      window.addEventListener('resize', videoTelco.hero.resizeEventHandler);
      videoTelco.hero.resizeEventHandler();

      window.addEventListener('scroll', videoTelco.hero.scrollEventHandler);
      videoTelco.hero.scrollEventHandler();


      // $('.hero01-view .overlay-video-trigger').on('click', function () {
      //   console.log('vid button click');
      //   $('#bc-player video')[0].pause();

      //   $('.uw-overlay .btn-close, .uw-overlay .vjs-errors-ok-button-container').on('click', function () {
      //     $('#bc-player video')[0].play();
      //   })
      // });
    },

    resizeEventHandler: function () {
      var setAspectRatio = 16/9;
      var va_width = $('.hero01-view .wrapper').width();
      var va_height = $('.hero01-view .wrapper').height();
      var va_aspectRatio = va_width/va_height;
      // console.log('vid w:' + va_height * setAspectRatio);
      if(va_aspectRatio < setAspectRatio){
        $('#bc-player video').css({ 'height':'100%' });
        $('#bc-player video').css({ 'width':($('#bc-player video').height())*setAspectRatio });
      }else{
        setAspectRatio = 9/16;
        $('#bc-player video').css({ 'width':'100%' });
        $('#bc-player video').css({ 'height':$('#bc-player video').width()*setAspectRatio });
      }
      $('#bc-player video').css({ 'top':(va_height - $('#bc-player video').height())/2 });
      $('#bc-player video').css({ 'left':(va_width - $('#bc-player video').width())/2 });
    },

    scrollEventHandler: function () {
      var scrollTop;

      if(videoTelco.utils.is_safari()){
        scrollTop = $('body').scrollTop()
      } else {
        scrollTop = $('html').scrollTop()
      }
      if(scrollTop > $('.hero01-view').height() - 100 && videoTelco.app.bodyWidth > 1024){
        $('.hero01-view .wrapper').hide();
        $('.hero01-view .content').removeClass('animate');
      }else{
        $('.hero01-view .wrapper').show();
        videoTelco.hero.resizeEventHandler();
      }
    }
  };

  /* Utilities
  ========================================================================== */
  videoTelco.utils = {

    init: function () {
      this.AEMPath;
      videoTelco.utils.checkDevAssetPath();
    },


    /**
    Update assests path
    */
    checkDevAssetPath: function () {
      var that = this;
      this.AEMPath = '/content/dam/uwaem/production-design-assets/en/corporate/social-impact/images/';
      if (window.location.href.indexOf('local') > -1 || window.location.href.indexOf('thisisarebellion.com') > -1 || window.location.href.indexOf('rebellion-workspace') > -1) {
        jQuery('img').each(function () {
          jQuery(this).attr('src', jQuery(this).attr('src').replace(that.AEMPath, '../images/'));
        });
        jQuery('.thumbnail').each(function () {
          jQuery(this).attr('style', jQuery(this).attr('style').replace(that.AEMPath, '../images/'));
        });
        jQuery('a[href$=".pdf"]').each(function () {
          jQuery(this).attr('href', jQuery(this).attr('href').replace(that.AEMPath, ''));
        });

        var AEMIntelLogoPath = '/content/dam/uwaem/images/english/intel-logo/';
        jQuery('img').each(function () {
          jQuery(this).attr('src', jQuery(this).attr('src').replace(AEMIntelLogoPath, '../images/'));
        });

        var AEMOldImagePath = '/content/dam/delltechnologies/assets/corporate/images/progress-made-real/';
        jQuery('img').each(function () {
          jQuery(this).attr('src', jQuery(this).attr('src').replace(AEMOldImagePath, '../images/'));
        });
        this.AEMPath = '../';

        console.log(videoTelco.utils.AEMPath);
      }
    },

    is_safari: function () {
      var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      // console.log('is_safari: ' + is_safari);
      return is_safari;
    }
  };


  /* Init functions
  ========================================================================== */
  videoTelco.startup = {
    init: function () {
      videoTelco.utils.init();
      videoTelco.hero.init();
    }
  };
}(window.videoTelco = window.prs || {}));

jQuery(document).ready(window.videoTelco.startup.init); // Ready event
