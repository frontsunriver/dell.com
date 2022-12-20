///////////////////////////////////////////
//	CONFIG
///////////////////////////////////////////



///////////////////////////////////////////
//	GLOBALS
///////////////////////////////////////////


///////////////////////////////////////////
//	MAIN
///////////////////////////////////////////


(function (progressMadeReal) {
    'use strict';

    /* APP
	========================================================================== */
    progressMadeReal.app = {
    	init: function () {
            console.log('progressMadeReal.app.init');
            progressMadeReal.app.bindEvents();
    	},

    	bindEvents: function () {

            //Goals container overflow Content
            $('.slide-control').on('click', function(e){
                e.preventDefault();
                $('.slide-control').not(this).parent().removeClass('slid-up');
                $(this).parent().toggleClass('slid-up');
            });
        }
    };

    progressMadeReal.overlay = {
        init: function(){
            //$('.learn-more-overlay').hide();
            $('.featured-card .learn-more').on('click', function(e){
                e.preventDefault();
                var featuredOverlay = $(this).data('overlay');
                var offset = $(this).parents('.featured-card').position();
                var containerOffset = $('.featured-goals-container').offset();
                var scrollPos = $(window).scrollTop();
                var menuHeight = 80;
                // console.log('offset:'+ offset.top);
                // console.log('scrollPos:'+ scrollPos);
                // console.log('containerOffset:'+ containerOffset.top);
                // Set the poisiton for mobile
                if ($("body").width() < 641) {
                    $('.overlay-' + featuredOverlay).css('top', scrollPos - containerOffset.top + menuHeight).fadeIn(600);
                }
                else {
                    $('.overlay-' + featuredOverlay).fadeIn(600);
                }

            });

            // ESG PROFILE EXPAND
            $('.expand-read-more').on('click', function(e){
                console.log('Read more clicked');
                $(this).parent().parent().find('.expand-profile').slideToggle();
                $(this).toggle();
                e.preventDefault();
            });

            $('.expand-read-less').on('click', function(e){
                console.log('Read less clicked');
                $(this).parent().parent().slideToggle();
                $(this).parent().parent().parent().find('.expand-read-more').toggle();
                e.preventDefault();
            });

            // ESG GOALS EXPAND
            $('.esg-goals-expand-intro a').attr("aria-expanded","false");
            $('.esg-goals-expand-intro a').attr("role","button");
            $('.esg-goals-expand-intro a').on('click', function(e){
                $('.esg-goals-expand .list-component, .esg-goals-expand .CTA-list-component').slideToggle();
                $(this).toggleClass( "expanded" );
                if ($(this).hasClass("expanded")) {
                    $(this).attr("aria-expanded","true");
                } else {
                    $(this).attr("aria-expanded","false");
                }
            });
            $('.close-overlay').on('click', function(e){
                $('.learn-more-overlay').fadeOut(600);
                e.preventDefault();
            });
            $('.esg-reports-table-col-header').matchHeight();
            $('.block-top').matchHeight();
            $('.block-bottom').matchHeight();
            $('.promo-wall-block-content-container').matchHeight();
            $('.promo-wall-block-cta').matchHeight();


            // home promo slider
            $('.promo-slider-container').slick({
              slidesToShow: 3,
              slidesToScroll: 1,
              arrows: true,
              infinite: false,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 700,
                  settings: {
                    slidesToShow: 1
                  }
                }
              ]
            });
        }
    };

    progressMadeReal.modal = {
        init: function(){
            //$('.modal-open').hide();
            //$('.modal-container').hide();
            $('.featured-card .learn-more-modal').on('click', function(e){
                e.preventDefault();
                var featuredModal = $(this).data('modal');
                $('.modal-open').fadeIn(300);
                $('.modal-' + featuredModal).fadeIn(300);
                $('html').css({
                    'overflow':'hidden'
                });

                //var offset = $(this).parents('.featured-card').position();
                //var containerOffset = $('.featured-goals-container').offset();
                //var scrollPos = $(window).scrollTop();
                //var menuHeight = 80;
                // console.log('offset:'+ offset.top);
                // console.log('scrollPos:'+ scrollPos);
                // console.log('containerOffset:'+ containerOffset.top);
                // Set the poisiton for mobile
                // if ($("body").width() < 641) {
                //     $('.overlay-' + featuredModal).css('top', scrollPos - containerOffset.top + menuHeight).fadeIn(600);
                // }
                // else {
                //     $('.overlay-' + featuredModal).fadeIn(600);
                // }

            });

            $('.main-card .modal-icon-trigger').on('click', function(e){
                e.preventDefault();
                var mainModal = $(this).data('modal');
                $('.modal-open').fadeIn(300);
                $('.modal-' + mainModal).fadeIn();
                $('html').css({
                    'overflow':'hidden'
                });
            })

            $('.close-modal').on('click', function(e){
                e.preventDefault();
                $('.modal-open').fadeOut(600);
                $('.modal-container').fadeOut(600);
                $('html').css({
                    'overflow':'auto'
                });
            });

            $('.modal-open').on('click', function(e){
                e.preventDefault();
                $(this).fadeOut(600);
                $('.modal-container').fadeOut(600);
                $('html').css({
                    'overflow':'auto'
                });
            });
        }
    };

    // progressMadeReal.filter = {
    //     init: function(){
    //         var filterTest = $('.filter-select [data-filter]');
    //         var cards = $('.goals [data-goal]');
    //
    //         $(filterTest).on('click', function(e){
    //             e.preventDefault();
    //             //var this = $(this);
    //
    //             $(filterTest).removeClass('active');
    //             $(this).addClass('active');
    //
    //             var filterGoal = $(this).attr('data-filter');
    //
    //             if($(filterGoal == 'all')){
    //                 $(cards).removeClass('is-animated').fadeOut().promise().done(function(){
    //                     $(cards).addClass('is-animated').fadeIn();
    //                 });
    //             } else {
    //                 $(cards).removeClass('is-animated').fadeOut().promise().done(function (){
    //                     $(cards).filter('[data-goal = "' + filterGoal + '"]').addClass('is-animated').fadeIn();
    //                 })
    //             }
    //         });
    //     }
    // };

    progressMadeReal.goalFilter = {
        init: function(){

            // Goals filter select
            $('.filter-handle span').on('click', function(e){
                e.preventDefault();
                $(this).toggleClass('open-select');
                $(this).parent().next('.filter-select').toggleClass('open-select');
            });
            $('.label').on('click', function(){
                $(this).toggleClass('open-select');
                $('.filter-select, .filter-handle').removeClass('open-select');
            });

            var filterSelect = $('.filter-select [data-filter]');
            var goals = $('.goals [data-goal]');

            $(filterSelect).on('click', function(e) {
                e.preventDefault();
                console.log($(this).parent().parent().parent() );
                $(this).parent().parent().parent().find('.goal-value').html($(this).text());

                var thisIs = $(this);

                $(filterSelect).removeClass('active');
                $(thisIs).addClass('active');

                var filterGoal = $(thisIs).attr('data-filter');

                if (filterGoal == 'all') {
                    $(goals).removeClass('is-animated').fadeOut().promise().done(function() {
                        $(goals).fadeIn().parent().removeClass('single-goal');
                        progressMadeReal.hash.updateHashValue(Array({key:"filter", value:"all"}));
                    });
                } else {
                    $(goals).removeClass('is-animated').fadeOut().promise().done(function() {
                        $(goals).filter('[data-goal = "' + filterGoal + '"]').addClass('is-animated').fadeIn().parent().addClass('single-goal');
                        progressMadeReal.hash.updateHashValue(Array({key:"filter", value:filterGoal}));
                    })
                }
            });
             this.checkHash();
        },

        checkHash: function () {
            var myHash = progressMadeReal.hash.getHashValue("filter");
            if (myHash) {
                console.log("has hash: " + myHash);
                this.filter(myHash);
            }else{
                console.log("has no hash");
            }
        },

        filter: function(el) {
            if (el != 'all') {
                $(".filter-select [data-filter='" + el +"']").trigger('click');
            }
        }

    };

    progressMadeReal.hero = {
        init: function () {
            console.log('progressMadeReal.hero.init');
            // add hero-has-video class to hero component
            if ($('.hero .hero-has-video').length > 0) {
                console.log('found .hero-has-video')
                progressMadeReal.hero.getBCIDByPage()
            }
        },

        getBCIDByPage: function () {
            var location = window.location
            var bcid = null
            console.log(location.pathname)

            bcid = '6304787332001'
            progressMadeReal.hero.addMarkup(bcid)
        },

        addMarkup: function (bcid) {
          $('.hero-view .wrapper .rendition').after('<div class="bc-video-wrapper"><video id="bc-player" class="" data-account="694940018001" data-video-id="'+ bcid +'"  data-player="BJ7t7Rlq"  data-embed="default"  class="video-js embed-responsive-item" autoplay="true" muted="true" loop="true" playsinline="true"></video></div>');
          // $('.hero01-view .cobrand').prepend('<div class="nvidia-logo"><div class="nvidia-logo-inner"><img src="' + progressMadeReal.utils.AEMPath + 'images/logo-nvidia.svg" class="nvidia-logo-img"></div></div>');
          // $('.hero01-view .content').addClass('animate');

          $.getScript('//players.brightcove.net/694940018001/BJ7t7Rlq_default/index.min.js')
            .done(function (script, textStatus) {
              // console.log(script)
              // console.log(textStatus);
                            
              setTimeout(function(){
                $('#bc-player').css('visibility','visible');
                progressMadeReal.hero.resizeEventHandler();
              },1000);
            });

          window.addEventListener('resize', progressMadeReal.hero.resizeEventHandler);
          progressMadeReal.hero.resizeEventHandler();

          window.addEventListener('scroll', progressMadeReal.hero.scrollEventHandler);
          progressMadeReal.hero.scrollEventHandler();


          // $('.hero01-view .overlay-video-trigger').on('click', function () {
          //   console.log('vid button click');
          //   $('#bc-player video')[0].pause();

          //   $('.uw-overlay .btn-close, .uw-overlay .vjs-errors-ok-button-container').on('click', function () {
          //     $('#bc-player video')[0].play();
          //   })
          // });
        },

        resizeEventHandler: function () {
          var setAspectRatio = 16/5;
          var va_width = $('.hero-view .wrapper').width();
          var va_height = $('.hero-view .wrapper').height();
          var va_aspectRatio = va_width/va_height;
          // console.log('vid w:' + va_height * setAspectRatio);
          if(va_aspectRatio < setAspectRatio){
            $('#bc-player video').css({ 'height':'100%' });
            $('#bc-player video').css({ 'width':($('#bc-player video').height())*setAspectRatio });
          }else{
            setAspectRatio = 5/16;
            $('#bc-player video').css({ 'width':'100%' });
            $('#bc-player video').css({ 'height':$('#bc-player video').width()*setAspectRatio });
          }
          $('#bc-player video').css({ 'top':(va_height - $('#bc-player video').height())/2 });
          $('#bc-player video').css({ 'left':(va_width - $('#bc-player video').width())/2 });
        },

        scrollEventHandler: function () {
          var scrollTop;

          if(progressMadeReal.utils.is_safari()){
            scrollTop = $('body').scrollTop()
          } else {
            scrollTop = $('html').scrollTop()
          }
          if(scrollTop > $('.hero-view').height() - 100 && progressMadeReal.app.bodyWidth > 1024){
            $('.hero-view .wrapper').hide();
            $('.hero-view .content').removeClass('animate');
          }else{
            $('.hero-view .wrapper').show();
            progressMadeReal.hero.resizeEventHandler();
          }
        }
      };

    /* HASH
========================================================================== */
progressMadeReal.hash = {
    init: function () {
        progressMadeReal.hash.bindEvents();
    },

    bindEvents : function (){
    },

    /**
    Gets the hash value for the given hash key
    @param {string} key  - key of key=value
    @return {string} Value of hash key given
    */
    getHashValue: function (key) {
        var matches = location.hash.match(new RegExp(key + '=([^&]*)'));
        return matches ? matches[1] : null;
    },

    /**
    Updates the hash value for the given hash key
    @param {array} hashArray  - Array of hash objects. Array({key:'autoplay', value:'false'},{key:'transcript', value:'false'},{key:'episode', value:'101'})
    */
    updateHashValue: function (hashArray) {
        hashArray.forEach(function (element) {
            UW.util.hash.set(element.key, element.value);
        });
    }

};

    /* Utilities
	========================================================================== */
	progressMadeReal.utils = {

		init: function() {
            this.AEMPath;
			progressMadeReal.utils.checkDevAssetPath();
		},


		/**
        Update assests path
        */
        checkDevAssetPath: function () {
            var that = this;
            this.AEMPath = '/content/dam/uwaem/production-design-assets/en/corporate/social-impact/images/';
            if (window.location.href.indexOf("local") > -1 || window.location.href.indexOf("thisisarebellion.com") > -1 || window.location.href.indexOf("rebellion-workspace") > -1) {
                jQuery('img').each(function () {
                    jQuery(this).attr('src', jQuery(this).attr('src').replace(that.AEMPath, '../images/'));
                });
                jQuery('.thumbnail').each(function () {
                    jQuery(this).attr('style', jQuery(this).attr('style').replace(that.AEMPath, '../images/'));
                });
                jQuery('a[href$=".pdf"]').each(function () {
                    jQuery(this).attr('href', jQuery(this).attr('href').replace(that.AEMPath, ''));
                });

                var AEMIntelLogoPath = "/content/dam/uwaem/images/english/intel-logo/";
                jQuery('img').each(function () {
                    jQuery(this).attr('src', jQuery(this).attr('src').replace(AEMIntelLogoPath, '../images/'));
                });

                var AEMOldImagePath = "/content/dam/delltechnologies/assets/corporate/images/progress-made-real/";
                    jQuery('img').each(function () {
                        jQuery(this).attr('src', jQuery(this).attr('src').replace(AEMOldImagePath, '../images/'));
                    });


                this.AEMPath = '../';

                console.log(progressMadeReal.utils.AEMPath);

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
	progressMadeReal.startup = {
		init: function() {
			progressMadeReal.utils.init();
			progressMadeReal.app.init();
            progressMadeReal.utils.init();
            progressMadeReal.overlay.init();
            progressMadeReal.modal.init();
            progressMadeReal.goalFilter.init();
            progressMadeReal.hash.init();
            progressMadeReal.hero.init();
		}
	};

}(window.progressMadeReal = window.prs || {}));

jQuery(document).ready(window.progressMadeReal.startup.init); // Ready event


