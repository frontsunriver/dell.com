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

var dtc = dtc || {};


/* Utilities
========================================================================== */
dtc.utils = {
  init: function () {
    dtc.utils.setupBreakpoints(); 
    
    if (jQuery('.match-height').length > 0) {
      jQuery('.match-height').matchHeight();
    }
    if (jQuery('.social-block').length > 0) {
      jQuery('.social-block').matchHeight();
    }
  },
  setupBreakpoints: function () {
    jQuery('body').append('<div class="device-xs visible-xs"></div><div class="device-sm visible-sm"></div><div class="device-md visible-md"></div><div class="device-lg visible-lg"></div>');
  },
  isBreakpoint: function (alias) {
    return jQuery('.device-' + alias).is(':visible');
  }
};

dtc.spd = {
  init: function () {
    this.controller = new ScrollMagic.Controller({
      globalSceneOptions : {
        // reverse : false
        triggerHook: 0.3
      }
    });

    this.scene = [];

    setTimeout(function () {
      console.log('first achor')
      dtc.spd.anchorNavState()
    }, 3000)

    window.addEventListener('resize', this.resizeEventHandler)

    var anchorNavItems = document.getElementsByClassName('rdc-anchor-nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')
    // console.log(anchorNavItems)
    for (var i = anchorNavItems.length - 1; i >= 0; i--) {
      // var myItem = anchorNavItems[i]
      // var text = myItem.getElementsByClassName('title')[0].innerHTML
      // console.log(text)
      // var span = document.createElement('span')
      // span.innerHTML = text
      // span.classList.add('duplicate')
      // myItem.getElementsByTagName('a')[0].appendChild(span);
    }

    $('.rdc-anchor-nav .rdc-header-right a').on('click', function (e) {
      // console.log('.rdc-anchor-nav .rdc-header-right a');
      // console.log(this);
      // console.log('window.innerWidth ', window.innerWidth)
      if (window.innerWidth < 980) {
        e.preventDefault();
        $('.rdc-anchor-nav .rdc-header-page-title').removeClass('title-expanded');
        $('.rdc-anchor-nav .rdc-header-right').removeClass('expanded');
        $('.rdc-anchor-nav.rdc-header-subnav').removeClass('subnav-expanded');
        // console.log('anchornav item clicked');
      }
    })
  },

  anchorNavState: function () {
    var that = this;
    $('.first-tier-list a.dt-anchor-nav-link').each(function (i, e) {
      // console.log(i, e);
      var anchorString = $(e).attr('href').replace('#', '');
      // console.log(anchorString);
      // console.log('length', $('#' + anchorString).length);

      that.setAnchorNavScrollMagic(anchorString, $(e).parent())
    })
  },

  destroy: function (CCelement) {
    // console.log(dtc.spd.scene[CCelement])
    if(dtc.spd.scene[CCelement]){
      dtc.spd.scene[CCelement].destroy(true)
    }
  },

  setAnchorNavScrollMagic: function (CCelement, anchor) {
    var el = document.getElementById(CCelement);
    // console.log(el)
    var el_style = el.currentStyle || window.getComputedStyle(el);
    var el_style_marginBottom = parseInt(el_style['margin-bottom'].replace('px', ''))
    // console.log(parseInt(el_style_marginBottom))

    var duration = document.getElementById(CCelement).offsetHeight;
    duration += el_style_marginBottom;
    // console.log(parseInt(duration));

    // Overview Active
    this.scene[CCelement] = new ScrollMagic.Scene({ triggerElement: '#' + CCelement, duration: duration })
      .addTo(this.controller)
      // .addIndicators({ name: CCelement }) // add indicators (requires plugin)
      .on('enter', function () {
        // $('.anchor-nav-area li a').removeClass('anchor-active');
        $(anchor).addClass('active');
        // console.log('enter: ' + CCelement)
      })
      .on('leave', function () {
        // $('.anchor-nav-area li a').removeClass('anchor-active');
        $(anchor).removeClass('active');
        // console.log('leave: ' + CCelement)
      })
  },

  resizeEventHandler: function () {
    // console.log('resizeEventHandler')

    $('.first-tier-list a.dt-anchor-nav-link').parent().removeClass('active');

    $('.first-tier-list a.dt-anchor-nav-link').each(function (i, e) {
      // console.log(i, e);
      var anchorString = $(e).attr('href').replace('#', '');
      // console.log(anchorString);
      // console.log('length', $('#' + anchorString).length);

      dtc.spd.destroy(anchorString)
    })

    dtc.spd.anchorNavState()
  }
};

/* Init functions
========================================================================== */
dtc.startup = {
  init: function () {
    dtc.utils.init();
    dtc.spd.init();
    UW.util.getHeaderHeight=function (){
      var bp = UW.breakpoint.getScreenSize(),
        isSmall=(bp =='xsmall' || bp == 'small' || bp == 'medium');
      return isSmall ? 40 : 70;
    };
  }
};

jQuery(document).ready(dtc.startup.init); // Ready event
