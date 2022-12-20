/*
*  Overlay Parameter
* 
*  Provides legacy support for the PDF and video overlay parameters ?vid=<Brightcove ID> or ?pdf=<path to PDF file>
*  as well as the global sponsor parameters ?i=m and ?i=x.
*
*/

'use strict';

;(function ( $, window, document, undefined ) {

	var aemLocale = aemLocale;
	var fwDomain = fwDomain;
	var legacyDomain = '//' + window.location.hostname;

/*
	var images = {
		'dellemc': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAASCAMAAACaR4u6AAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMAQL+An89g7xAwIN9wUK+PmTE4/AAAAWlJREFUOMu9lduOwyAMRG0uDoQm9f9/7WKbkCihXR5WOy8ZhOSjjo0LQ72Y4A+0ImY13OTOsinUczAvN2By1cMh5EMLgOcCpwp7/VLRazlwV8yNH3kG4rFJILz1G2KFJMduW9fNcewQhSoFF/EEQPkrBA8rkMX1g1sUEvh1XHqpEhEpsBhph+E0M5qGBF6bX/ktEOS9x1d6lSw/gJLBUsuMZiG1dPOheq+fc4rOKiTVrR1nZrOQGlJSm2pwAun53Tpb2ETXzGYhWxt64k0h7McQZ4wM18w+Q4ozkUKgxNYABeAvkJgvmX2B7N6EBvGMNtlPyDOuW2azcUHioG1P8Ixr1PizHRwnIVbfSPfGJxyOMIf+7OchyL6aXN1thN88eIzqLiMcUZUEYnYdQSCW1v3HYxyvlfPIXei69UMIcbA5vq4VM+MFaSP8EfJYkCBaeIEOSTs7yrIgw8SqH0Eeq76vQtFj1f/Ln9YPjcMll1Z3xfsAAAAASUVORK5CYII=',
		'intel':   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAA8CAMAAAA+GTZJAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMAgL9AEO9gnyDPMN9Qj69wew6SfQAAAtxJREFUWMO1mNmWrCAMRUmYR/n/r71VcQi6sBS9fV7alriNhwAFYkxKGrDoK0sjwiSVeCWVAHU9U7RGPeVmXy+F43g3YZsgFgCQswyAbT9GWzeS8eQ3aoEU+p0A/PbbdFnWz4Wr7kpWL7nDnZRNnPPNSYiB+OrdVSRoiptGHDR6Tj1ckyO40YIqDP/1fivFA5nfcOe/PfJ0qMnZS3XSWqN5CObMc78xGPFKQHAn/kSeBtHxc+CjBzAallKIpMkLSYmrTswLtsVYvhVCg8jcZjv4SF6xvcevz9PBFPubTd8JF+yASNkGKkNG1/dsVm1Bli6D/OglmyuF0Wz9ezYbQN7bXQ0CSzZs3Eo0ACJac8Wm56La3aqNdFrZJCLj8k9MfbZeI1WkhiOblQ5sqbnN9NhqyyLXiuIXO+7ZQbeNocNOZOBSjK7Hho+QrmTj9xKlcwK9Io5sSzPh3FBEj023aCGZ2joJ2/ysCO6YvbMkzaHpnA3EbNl5eXAd21PL5mf0nH8UA2wOWm6WI9vpdTrR9GeAreteyOyGUt3cpWmIXS/YUNe0M1fJa3a70KsFJ8Y9AZZhNqFJZolEMd6XrjtXkQ28LtRhdm5mRBV27OBXm8bZNKMFapyWX0mmZWMleTXGdnXRSoil+NXZvGNbxatP3Nj5nC2wP1eR9bJlw4ajcB5RZ2wmij1ckyl2Y/sgNu1nguBP2LwgUA72uAUxntjRHMsnC1agTpLbouy+VwtA8VKtEnyUlNiJ4liWpqy/kZn7+k/k1rp9L9n/bWH/Azli15T3riTkMdjIv4HzzrLLlpUET8kh61q7bJ4X0T0pBd7vd9liadagnoB/s9Uaogc2winHulcRfTgHGHXrCKgeFc35PpzlswmnVZygcL4s/6vOpmMwZgC5KQEA9s+rbmz9HdZn8neOqeQgfex8RdoRrh48t1Om3OLGMoVnh4H4GwvJiRcKCSzuX4GIAHIg23+ZHGbE4jTfyAAAAABJRU5ErkJggg==',
		'xeon':	   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAArlBMVEX6+/vk6Orr7e7v8fLZ3+PR1tjz9PUAdLw5kcf29vcEWpwAbbIDZ6gEi80Df8DJztAFSol+t9q9wsW0ubzg4+UchMCss7Z8goanrbCLss2hp6zEycyKkJSGocJ3r9MPeryZwtxlmsGSmZ1yqMlMmMh2j6yZoKOwzN0AnNxgpc+70uApgLQgn9qeu9MGc7Onxdtsd35Wh60Vcq251+p8y+6XyudSWVxmuOMYZaAraKRDdM8BAAAERUlEQVQ4y13ViXqiMBQF4CSAiUCQfVFZFATBtdp2Ou//YnMSddqZ068C4ecSNCREHo9H6e33UvKzJ6X0XpHeWR86ruNwB5+uTzzv7No+lw5O2Zxzx68PrrATJ3Fs28W/7duP+D4548P5Pb4Hvz6C3Qa5bnZvLf42mzd1OGLz1h1cl9s+cX3f/hVTU8VarMIozZdIjqRpGkXhahWm6+vuhruQ5HZomWXFMaz1wyLaKpxH6bX1PJ/w84FalBBmLsIoX/bb7Xb9DHb7JWB//VwvP988m0j5i1pkNpvPZzNDhTFGaazuFMf0mcVnf93YCr+bMZkRlfnspZk5DCZjhg621/V6x4E9PB6Zgz44chmFkwjhcBEwHBq4LXDp2uQo3ylD5VdYJcZmMgwQs0lqE5ejUrbeVtIlnnxnbP6NDw0jACAwZITGdp5ttzuFeQBszLWkHxVBjDsjSCC6oA505zS2iePvKJ09MD00LZ0m484LYprAgykE2mdGtu3Ls01cGcQxHkJpcQ9EwHndcKflvAoAxYjCBsv6foex4dqlaeIrAx4EARYGr/jEheDAd96gE+yFPbu1LGCUDgKNicZdEATCrAWZA9OsXyos3QCYKdy9cIO6tcCuEAasQWm2XJa2qlwuFjOmNJwxUJPcDfNuNAFVD0lg2V9c++VqNdd4Qgd/pkmUfeA8VzixgWcUej4feXd/QtqMNee6MHCc5anG/hPrR+ScCxUHO0lLYRVmcZamxZ6TY9IAx1Th+ZwFHaBTY3ygv9o+cTRKhxx5sFrMTJQG1oHQgweB1ZhmUbS5uUS4Lb4NKwYGQTRQWndY53+M0hAqGkyTvg5F2ROHG4zngwwWC0Njo60nfsGEUo14PCYSw6n4E4fhzgbevy8W7IFpUncGL4aBDzSpBG+cYWDsheWZJE8cUzSPvDG4EAU3mKjEoXYGiuYnTm4kcau/eOBdTXXl6lI3ohX8AozQdRjtPIfU+2BhPTAdK9oVQogGL9/IxuIiJqo0jddRVAJ76IbGuvk79GfMdZQWkqtRZwGrKUV5y9QnLUx+P6y1TjE2bOL5O2BTBxcUp8tkDZdiCoZpqpqnBc5L1yXS3ij8Snvokq6rOrzYSW1pG5vWap3nqvKeV5bJ6De+iJOAbauuMF92tc2Xhe1qbDGtLeRUDEXRnk5VO1VtrKmatfvlPxit/8VENF2F4RWTjP3oc0gNhmn/lW9swYKG+Wefvfk3Ip3ECkNLt+vos1GUqiWgVzN7dr1+Zn3W3Y7kKMTHIl/q9QPp0/vHR1EUp9Op2Ka4KlWrQd9n5e3rSLyvr6S0wgfNl1l5lMfkcEgSkbwt0Anlt1m2++1g1O0RV2yKy2lZXoqyOGAJxaLHsVTe8AupOzS7crRtRy1Avu+5WD6xGJ09lePedeuDdG3XlZ50ayy/vsN9HALjGtvH/tnR4VJ6SZ1IBwXw0qDdhYRA/gD403XMgxvLkgAAAABJRU5ErkJggg=='
	};

	var defaults = {
		'dellemcLogo':   	images.dellemc,
		'intelLogo':   		images.intel,
		'xeonLogo':			images.xeon,
		'masterMention':	'Dell EMC solutions powered by Intel<sup>®</sup>',
		'xeonMention':		'Dell EMC solutions powered by Intel<sup>®</sup> Xeon<sup>®</sup> processors',
		'footerText':		'<a href="{legacyDomain}/legal/intel-trademark.htm" target="_blank">Intel Trademark</a>',
		'emcLink':          'https://www.dellemc.com/{ll}-{cc}/index.htm',
		'intelLink':        'http://www.dell.com/learn/{cc}/{ll}/555/large-business/intel-xeon'
	};

	var translations = {
		'de': {
			'masterMention':	'Dell EMC Lösungen in Kooperation mit Intel<sup>®</sup>',
			'xeonMention':		'Dell EMC Lösungen nutzen Intel<sup>®</sup> Xeon<sup>®</sup>-Prozessoren',
			'footerText':		'<a href="{legacyDomain}/legal/intel-trademark.htm" target="_blank">Marke von Intel</a>'
		},
		'es': {
			'masterMention':	'Soluciones de Dell EMC con tecnología de Intel<sup>®</sup>',
			'xeonMention':		'Soluciones de Dell EMC con tecnología de los procesadores Intel<sup>®</sup> Xeon<sup>®</sup>',
			'footerText':		'<a href="{legacyDomain}/legal/intel-trademark.htm" target="_blank">Marca comercial de Intel</a>'
		},
		'fr': {
			'masterMention':	'Les solutions Dell EMC sont basées sur des technologies Intel<sup>®</sup>',
			'xeonMention':		'Les solutions Dell EMC sont optimisées par les processeurs  Intel<sup>®</sup> Xeon<sup>®</sup>',
			'footerText':		'<a href="{legacyDomain}/legal/intel-trademark.htm" target="_blank">Marque commerciale Intel</a>'
		},
		'it': {
			'masterMention':	'Soluzioni Dell EMC con tecnologia Intel<sup>®</sup>',
			'xeonMention':		'Soluzioni Dell EMC basate sulla tecnologia dei processori Intel<sup>®</sup> Xeon<sup>®</sup>',
			'footerText':		'<a href="{legacyDomain}/legal/intel-trademark.htm" target="_blank">Marchio Intel</a>'
		},
		'ja': {
			'masterMention':	'インテル<sup>®</sup> 搭載のDell EMCソリューション',
			'xeonMention':		'インテル<sup>®</sup> Xeon<sup>®</sup> プロセッサー搭載のDell EMCソリューション',
			'footerText':		'<a href="{legacyDomain}/legal/intel-trademark.htm" target="_blank">インテル商標</a>'
		},
		'ko': {
			'masterMention':	'인텔<sup>®</sup> 기반의 Dell EMC 솔루션',
			'xeonMention':		'인텔<sup>®</sup> 제온<sup>®</sup> 프로세서 기반의 Dell EMC 솔루션',
			'footerText':		'<a href="{legacyDomain}/legal/intel-trademark.htm" target="_blank">Intel 상표</a>'
		},
		'pt': {
			'masterMention':	'Soluções Dell EMC habilitadas pela Intel<sup>®</sup>',
			'xeonMention':		'Soluções Dell EMC habilitadas pelos processadores Intel<sup>®</sup> Xeon<sup>®</sup>',
			'footerText':		'<a href="{legacyDomain}/legal/intel-trademark.htm" target="_blank">Marca registrada da Intel</a>'
		},
		'ru': {
			'masterMention':	'Решения Dell EMC на базе Intel<sup>®</sup>',
			'xeonMention':		'Решения Dell EMC на базе процессоров Intel<sup>®</sup> Xeon<sup>®</sup>',
			'footerText':		'<a href="{legacyDomain}/legal/intel-trademark.htm" target="_blank">Товарные знаки Intel</a>'
		},
		'zh': {
			'masterMention':	'Dell EMC 解决方案由 Intel<sup>®</sup> 提供支持',
			'xeonMention':		'Dell EMC 解决方案由 Intel<sup>®</sup> Xeon<sup>®</sup> 处理器提供支持',
			'footerText':		'<a href="{legacyDomain}/legal/intel-trademark.htm" target="_blank">Intel 商标</a>'
		}
	};

	var localizations = {
		'en-au': {
			'intelLink': 'http://www.dell.com/learn/au/en/aubsd1/large-business/intel-xeon'
		},
		'en-gb': {
			'intelLink': 'http://www.dell.com/learn/uk/en/555/large-business/intel-xeon'
		},
		'en-sg': {
			'intelLink': 'http://www.dell.com/learn/sg/en/sgbsd1/large-business/intel-xeon'
		},
		'es-mx': {
			'intelLink': 'http://www.dell.com/learn/mx/es/mxbsdt1/campaigns/intel-core?c=mx&l=es&s=bsd&cs=mxbsdt1'
		},
		'hi-in': {
			'intelLink': 'http://www.dell.com/learn/in/en/inbsd1/large-business/intel-xeon'
		},
		'ja-jp': {
			'intelLink': 'http://www.dell.com/learn/us/en/555/large-business/intel-xeon?c=jp&l=ja&s=biz'
		},
		'ko-kr': {
			'intelLink': 'http://www.dell.com/learn/kr/ko/krbsd1/campaigns/intel-core?c=kr&l=ko&s=bsd&cs=krbsd1'
		},
		'ms-my': {
			'intelLink': 'http://www.dell.com/learn/my/en/555/large-business/intel-xeon'
		},
		'pt-br': {
			'intelLink': 'http://www.dell.com/learn/us/en/555/large-business/intel-xeon?c=br&l=pt&s=biz'
		},
		'ru-ru': {
			'intelLink': 'http://www.dell.com/Learn/ru/ru/rudhsc/campaigns/productivity-and-entertainment-dhs?c=ru&l=ru&s=dhs'
		}
	};
*/
	var noLegacyDomain = [ 'en-us', 'en-sg' ];

	var trustedDomains = [ 'delltechnologies.com', 'dell.com', 'dellemc.com', 'emc.com' ];

//	var cleanHashes = [ 'dropdown', 'tab', 'tabv3' ];

	var sponsors = {
		'i': {
			'm': '__logo1__:__{dellemcLogo}__,__logo1Href__:__{emcLink}__,__logo2__:__{intelLogo}__,__logo2Href__:__{intelLink}__,__text__:__{masterMention}__,__copyright__:__{footerText}__',
			'x': '__logo1__:__{dellemcLogo}__,__logo1Href__:__{emcLink}__,__logo2__:__{xeonLogo}__,__logo2Href__:__{intelLink}__,__text__:__{xeonMention}__,__copyright__:__{footerText}__'
		}
	};
/*
	var extraStyles =
		' .uw-overlay .card { max-width: 120vh; }' +
		' .uw-overlay .company-header table td img { max-height: 47px; }' +
		' .uw-overlay .company-footer a { color: #fff; }' +
		' .uw-overlay .company-footer a:hover { text-decoration: underline; }';

	var iframeStyles =
		' .appleios  .overlay-parameter-iframe.overflow-active,' +
		' .android   .overlay-parameter-iframe.overflow-active,' +
		' .winmobile .overlay-parameter-iframe.overflow-active { position: fixed; }' +
		' .overlay-parameter-iframe .uw-overlay { height: 100%; z-index: -1; }' +
		' .overlay-parameter-iframe .uw-overlay.open { z-index: 10001; }' +
		' .overlay-parameter-iframe .uw-overlay .card { height: calc(100% - 140px); margin-top: 20px; max-width: none; }' +
		' .overlay-parameter-iframe .uw-overlay .share { display: block; float: left; white-space: nowrap; width: auto; margin-right: 15px; }' +
		' .overlay-parameter-iframe .uw-overlay .content { display: table-cell; height: 100%; }' +
		' .appleios .overlay-parameter-iframe .uw-overlay .content { -webkit-overflow-scrolling: touch; overflow-y: scroll }' +
		' .overlay-parameter-iframe .uw-overlay .content iframe { display: block; }' +
		' .overlay-parameter-iframe .uw-overlay .header { display: table-cell; height: 1px; padding-right: 55px; }' +
		' .overlay-parameter-iframe .uw-overlay .header-content { display: block; width: auto; overflow: hidden; }' +
		' .overlay-parameter-iframe .uw-overlay .btn-close { display: block; position: absolute; top: 20px; right: 20px; }' +
		' .touch .overlay-parameter-iframe .uw-overlay .btn-close { background-position: center; top: 0; right: 0; width: 60px; height: 60px; }' +
		' .overlay-parameter-iframe .uw-overlay .company-header, ' +
		' .overlay-parameter-iframe .uw-overlay .company-footer { display: table-row; height: 1px; }' +
		' .overlay-parameter-iframe .uw-overlay .company-header { font-size: 1.4rem; }' +
		' .overlay-parameter-iframe .uw-overlay .company-header table { padding-right: 18px }' +
		' .overlay-parameter-iframe .uw-overlay .company-header table td.company-logo-2 { border-left: none; }' +
		' @media screen and (max-width: 39.99em) { .overlay-parameter-iframe .uw-overlay .company-header table td.company-logo-2 { padding-left: 0 } }' +
		' @media screen and (min-width: 40em) { .overlay-parameter-iframe .uw-overlay .card { width: 90% } }' +
		' @media screen and (min-width: 61.25em) { .overlay-parameter-iframe .uw-overlay { z-index: 1003; } .overlay-parameter-iframe .uw-overlay .card { margin-top: 60px } }' +
		' @media screen and (min-width: 80em) { .overlay-parameter-iframe .uw-overlay .card { width: 66%; } }';
*/
	var main = function () {
		UW.debug.log( 'overlay-parameter.js: main()' );
		var $link = $();
		var $endOfPage = $( 'script' ).last();
//		$('head').append( '<style type="text/css">' + extraStyles + iframeStyles +'</style>' );
		_initLocales();
		legacyDomain = _getLegacyDomain();
		var sponsorData = _getSponsorData();
		$.each( widgets, function( trigger, widget ) {
/*			cleanHashes.push( widget.hash );
			widget.init( trigger );
*/			var $links = $( '.' + trigger  );
			var id = _getDeepLink( widget );
			if ( id ) {
				$link = $links.filter( '[' + widget.attribute + '*="' + id + '"]' );
				if ( !$link.length ) {
					UW.debug.log( 'overlay-parameter.js: main(): No matching ' + widget.name + ' link found, adding new one' );
					$link = $( widget.template.split( '{id}' ).join( id ) );
					$link.insertBefore( $endOfPage );
					$links = $links.add( $link );
				}
				$link.attr( 'data-sponsor', '{' + sponsorData + '}' );
			}
			if ( $links.length ) {
				UW.debug.log( 'overlay-parameter.js: main(): ' + $links.length + ' ' + widget.name + ' links found');
				var instance = _getInstance( widget.name, $( 'body' ).add( $links ) );
				if ( typeof instance === 'undefined' ) {
					UW.debug.log( 'overlay-parameter.js: main(): Creating new ' + widget.name + ' widget, bind to <' + $links[0].nodeName.toLowerCase() + '> element');
					instance = $links.first()[ widget.name ]()[ widget.name ]( 'instance' );	// create new widget
				}
				if ( $link.length ) {
					instance.overlay.setTrigger( $link );
				}
				if ( typeof widget.activate === 'function' ) {
					UW.debug.log( 'overlay-parameter.js: main(): Replacing deep link handler for #' + widget.hash + ' by widget.activate()' );
					UW.util.deepLink( widget.hash, widget.activate, instance );
				}
				if ( id && ( id !== UW.util.hash.get( widget.hash ) ) ) {
					UW.util.hash.set( widget.hash, id );
				}
//				$( '.addthis_button_compact' ).on( 'click', _cleanUrl );
			}
		});
	};

	var _initLocales = function() {
		var domainMap = ( typeof UW.domainArrayFW === 'object' ? UW.domainArrayFW : { 'en-us' : { fwLocale: 'www' } } );
		if ( typeof aemLocale === 'undefined' ) {
			aemLocale = window.location.pathname.slice( 1 );
			aemLocale = aemLocale.slice( 0, aemLocale.indexOf( '/' ) );
			aemLocale = domainMap.hasOwnProperty( aemLocale ) ? aemLocale : 'en-us';
		}
		if ( typeof fwDomain === 'undefined' ) {
			var subdomain = domainMap[ aemLocale ][ 'fwLocale' ];
			if ( $.inArray( subdomain, [ 'stageprev', 'preview', 'stage', 'www' ] ) !== -1 ) {
				fwDomain = subdomain + '.dellemc.com';
			} else {
				fwDomain = subdomain + '.emc.com';
			}
		}
	};

	var _getInstance = function( widgetName, $candidates ) {
		var instance;
		var $el;
		$candidates.each( function() {
			$el = $( this );
			if ( typeof $el[ widgetName ] === 'function' ) {
				instance = $el[ widgetName ]( 'instance' );
			}
			return !instance;
		});
		if ( typeof instance === 'object' ) {
			UW.debug.log( 'overlay-parameter.js: _getInstance(): Existing ' + widgetName + ' widget is bound to <' + $el[0].nodeName.toLowerCase() + '> element.' );
		} else {
			UW.debug.log( 'overlay-parameter.js: _getInstance(): No preexisting ' + widgetName + ' widget found.' );
		}
		return instance;
	};

	var _getDeepLink = function( widget ) {
		var id = decodeURIComponent( _getParameter( widget.parameter ) || '' ).replace( /\s/g, '' );
		if ( id ) {
			id = widget.sanitize( id );
			_removeParameter( widget.parameter );
		}
		if ( !id ) {
			id = widget.sanitize( decodeURIComponent( UW.util.hash.get( widget.hash ) || '' ).replace( /\s/g, '' ) );
		}
		return id;
	};

	var _sanitizeVideoId = function( videoId ) {
		if ( videoId ) {
			var videoNumber = parseInt( videoId );
			if ( videoNumber < 3000000000000 ) {
				UW.debug.log( 'overlay-parameter.js: _sanitizeVideoId(): videoID does not look like a Brightcove ID, ignoring it' );
			} else {
				return videoNumber.toString();
			}
		}
		return '';
	};

	var _sanitizeIframeLink = function( url ) {
		if ( !url ) {
			return '';
		}
		var testString = url;
		var parts = /^([a-z]+:)?\/\/([^\/]+)(.*)/i.exec( testString );
		if ( parts ) {
			var domainLabels = parts[ 2 ].toLowerCase().split( '.' );	// domain
			var secondLevelDomain = domainLabels.slice( domainLabels.length - 2 ).join( '.' );
			if ( $.inArray( secondLevelDomain, trustedDomains ) === -1 ) {
				UW.debug.log( 'overlay-parameter.js: _sanitizeIframeLink(): Link points to non-whitelisted domain, ignoring it' );
				return '';
			}
			testString = parts[ 3 ];	// path
		}
		if ( /\/\/|[:<>"']/.test( testString ) ) {
			UW.debug.log( 'overlay-parameter.js: _sanitizeIframeLink(): Link contains forbidden characters (//, :, <, >, ", \'), ignoring it: ' + testString );
			return '';
		}
		url = _normalizeUrl( url );
		return url;
	};
/*
	var _trackDownload = function( url ) {
		if ( url && ( typeof trackUnlockedDownload === 'function' ) ) {
			if ( url.indexOf('//') === 0 ) {
				url = window.location.protocol + url;
			} else if ( url.indexOf( window.location.protocol + '//' ) !== 0 ) {
				url = window.location.protocol + '//' + window.location.hostname + url;
			}
			UW.debug.log( 'overlay-parameter.js: _trackDownload(): Calling trackUnlockedDownload("' + url + '")');
			trackUnlockedDownload( url );
		}
	};

	var _initPdfLinks = function( trigger ) {
		var $pdfLinks = $( 'a[href$=".pdf"], a[href^="/"][href*="/collateral/"]' );
		$pdfLinks.not( '.' + trigger ).each( function() {
			var $link = $(this);
			var pdfPath = _normalizeUrl( $link.attr('href') );
			if ( ( window.location.protocol === 'https:' ) && /^http:/i.test( pdfPath ) ) {
				UW.debug.log('overlay-parameter.js: _initPdfLinks(): Skipping ' + pdfPath + ' to avoid mixed content errors');
			} else {
				$link.addClass( trigger );
				$link.attr( 'data-share', 'true' ).data( 'share', 'true' );
				$link.attr( 'data-iframe', pdfPath ).data( 'iframe', pdfPath );
				UW.debug.log('overlay-parameter.js: _initPdfLinks(): Enabling overlay for ' + pdfPath );
			}
		});
		$( 'a.' + trigger ).on( 'click', function( ev ) {
			ev.preventDefault();
		});
	};
*/
	var _getSponsorData = function() {
		var dataTemplate = '';
		$.each( sponsors, function( key, values ) {
			$.each( values, function( value, template ) {
				if ( _getParameter( key ) === value ) {
					_removeParameter( key );	// replace legacy query parameters by hash parameters
					UW.util.hash.set( key, value );
				}
/*				if ( UW.util.hash.get( key ) === value ) {
					UW.debug.log( 'overlay-parameter.js: _getSponsorData(): Found ' + key + '=' + value );
					dataTemplate = template;
					return false;
				}
*/			});
			return ( dataTemplate === '' );
		});
/*		if ( dataTemplate ) {
			var locale = aemLocale.split('-');
			var data = $.extend( {}, defaults, ( translations[locale[0]] || {} ), ( localizations[aemLocale] || {} ) );
			$.each( data, function( key, value ) {
				dataTemplate = dataTemplate.split( '{' + key + '}' ).join( value );
			});
			data = {
				'll': 			locale[0],
				'cc': 			locale[1],
				'legacyDomain': legacyDomain
			};
			$.each( data, function( key, value ) {
				dataTemplate = dataTemplate.split( '{' + key + '}' ).join( value );
			});
		}
*/		return dataTemplate;
	};

	var _getLegacyDomain = function () {
		var domain = '';
		var subdomain = window.location.hostname.substr( 0, window.location.hostname.indexOf('.') );
		var international = ( $.inArray( aemLocale, noLegacyDomain ) === -1 ) && ( $.inArray( subdomain, [ 'stageprev', 'preview', 'stage', 'www' ] ) !== -1 );
		if ( international ) {
			domain = '//' + ( subdomain === 'www' ? '' : subdomain + '-' ) + fwDomain;
		} else if ( subdomain.substr(0, 5) === 'test-' ) {
			domain = '//preview.dellemc.com';
		}
		UW.debug.log( 'overlay-parameter.js: _getLegacyDomain(): ' + domain )
		return domain;
	};
/*
	var _openIframeOverlay = function() {
		UW.debug.log( 'overlay-parameter.js: _openIframeOverlay()' );
		var it = this;
		var url = UW.util.hash.get( it.options.hash );
		UW.overlayIframe.src = url;
		if ( url ){
			it.options.scrollY = $( window ).scrollTop();
			$( 'body' ).addClass( 'overlay-parameter-iframe' );
			if ( url.indexOf( '.pdf' ) !== -1 ) {
				_trackDownload( url );
				// Use Google Docs viewer for PDF overlays on mobile devices
				if ( Modernizr.appleios || Modernizr.android || Modernizr.winmobile ) {
					var gviewUrl = url.replace( /^(https?:)?\/\//i, '' );
					if ( ( gviewUrl === url ) && ( gviewUrl.charAt(0) === '/' ) ) {
						var hostname = document.location.hostname;
						var subdomain = hostname.substr( 0, hostname.indexOf('.') );
						if ( ( $.inArray( subdomain, [ 'stageprev', 'preview', 'stage', 'notebook' ] ) !== -1) || ( subdomain.substr( 0, 5 ) === 'test-' ) ) {
							hostname = 'www.dellemc.com';
						} else {
							hostname = hostname.replace( 'preview-', '' );
						}
						gviewUrl = hostname + gviewUrl;
					}
					gviewUrl = 'https://docs.google.com/gview?embedded=true&url=' + encodeURIComponent( gviewUrl );
					it.options.src = url;
					it.iframe.src = gviewUrl;
					UW.debug.log( 'overlay-parameter.js: _openIframeOverlay(): Mobile device detected, using Google Docs Viewer: ' + gviewUrl );
				}
			}
		} else {
			$( 'body' ).removeClass( 'overlay-parameter-iframe' );
			if ( typeof it.options.scrollY !== 'undefined' ) {
				$( window ).scrollTop( it.options.scrollY );
			}
		}
		it._openOverlay.call( it );	// call original _openOverlay()
	};

	var _cleanUrl = function () {
		if ( Modernizr.history ) {
			var url = document.location.href;
			var parts = url.split( '#' );
			url = parts.shift();
			var length = url.length;
			var hashes = [];
			var keep = new RegExp( '^(' + cleanHashes.join( '|' ) + ')[0-9]*$' );
			$.each( UW.util.hash.getAll( parts.join( '#' ) ), function( key, value ) {
				if ( keep.test( key ) ) {
					hashes.push( key + '=' + value );
				}
			});
			url += ( hashes.length ? '#' + hashes.join( '&' ) : '' );
			if ( url !== '' + document.location.href ) {
				UW.debug.log( 'overlay-parameter.js: _cleanUrl(): Cleaning URL from ' + document.location.href.substr(length) + ' to ' + url.substr(length) );
				history.replaceState( {}, '', url );
			}
		}
	};
*/
	var _normalizeUrl = function( url ) {
		var originalUrl = url;
		if ( /^https?:\/\/[^.]+\.(dell)?emc\.com\//i.test( url ) ) {
			url = url.substr( url.indexOf( ':' ) + 1 );	// strip protocol from URL
		}
		var siteUrl = '//www.dellemc.com';
		var pos = url.indexOf( siteUrl );
		if ( pos !== -1 ) {
			url = url.substr( pos + siteUrl.length );	// strip domain from URL
		}
		// If the URL starts with /ll-cc/collateral/ and ends in .htm, remove leading '/ll-cc' and replace .htm by .pdf
		// in order to avoid redirects that result in mixed content warnings
		if ( /^\/[a-z]{2}-[a-z]{2}\/collateral\/.+\.htm$/.test( url ) ) {
			url = url.substr( 6, url.length - 9 ) + 'pdf';
		}
		if ( ( url.charAt(0) !== '/' ) && ( !/^https?:/i.test( url ) ) ) {
			url = '/collateral/' + url;
		}
		if ( url.indexOf( '/collateral/' ) === 0 ) {
			url = legacyDomain + url;
		}
		if ( ( url.toLowerCase().substr( -4 ) !== '.pdf' ) && ( url.toLowerCase().substr( -4 ) !== '.htm' ) && ( url.indexOf( '.pdf#page=' ) === -1 ) ) {
			url += '.pdf';
		}
		if ( originalUrl !== url ) {
			UW.debug.log( 'overlay-parameter.js: _normalizeUrl(): Change url from ' + originalUrl + ' to ' + url );
		}
		return url;
	};

	var _getParameter = UW.util.getUrlParameter;

	var _setParameter = function( key, value ) {	// 'value' is optional: if not passed, parameter 'key' is removed
		var url = document.location.href;
		var parameters = [];
		var query = document.location.search.substr(1);
		if ( query ) {
			parameters = $.grep( query.split( '&' ), function( p ) {
				return ( p.indexOf( key ) !== 0);
			} );
		}
		if ( value ) {
			parameters.push( encodeURIComponent( key ) + '=' + encodeURIComponent( value ).split( '%2F' ).join( '/' ) );
		}
		query = parameters.join( '&' );
		var hash = document.location.hash;
		url = url.split( '#' )[0].split( '?' )[0]; // strip query and hash
		var length = url.length;
		url += ( query ? '?' + query : '' ) + ( hash.length > 1 ? hash : '' );
		if ( Modernizr.history && ( url !== document.location.href ) ) {
			UW.debug.log( 'overlay-parameter.js: _setParameter(): Changing "' + document.location.href.substr(length) + '" to "' + url.substr(length) + '"' );
			history.replaceState( {}, '', url );
		}
	};

	var _removeParameter = _setParameter;

	var widgets = {
		'overlay-video-trigger': {
			'attribute': 'data-video',
			'name': 'overlayVideo',
			'hash': 'video-overlay',
			'parameter': 'vid',
			'sanitize': _sanitizeVideoId,
			'template': '<a data-video="{id}" href="javascript:void(0)" class="overlay-video-trigger" data-share="true"></a>',
// 			'init': function() { $( '.overlay-video-trigger' ).data( 'share', 'true' ); }
		},
		'overlay-iframe-trigger': {
			'attribute': 'data-iframe',
			'name': 'overlayIframe',
			'hash': 'overlay',
			'parameter': 'pdf',
			'sanitize': _sanitizeIframeLink,
			'template': '<a data-iframe="{id}" href="{id}" class="overlay-iframe-trigger" data-share="true"></a>',
/*			'init': _initPdfLinks,
			'activate': _openIframeOverlay
*/		}
	};

	main();

})( jQuery, window, document );
 