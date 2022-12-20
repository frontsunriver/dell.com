/* Script name:         demoSetup.js
*
* Version:              1.1
*
* Author:               Martin McMahon, Nathan Bennis Whelan
*
* Version Date:         09 Apr 2019
*
* Functionality:        Setup demo front page based on config.json file in js directory
*
* Changes:				Split into new file
*						All menu items can now be disabled/enabled - plus bug fixes
*******************************************************************************/

// the next two variables are passed from the wrapper HTML. Defaults are for local use.
// this variable is passed from the wrapper HTML. Defaults are for local use.
// if we're running locally and don't need this, otherwise we set it and pass to the demo in the URL for localisation.js to pick up and use when loading localisation JS files
var demoFolderPathParam = "";
if (window.location.protocol !== "file:") {
	demoFolderPathParam = "&demoFolderPath=" + demoFolderRoot;
}

var adsIframe;
// Version checking on/off
var newVersionCheck = false;
// Wrapper text for translation
var wrapperLocObj = {};

$.ajaxPrefilter( "json script", function( options ) {
	options.crossDomain = true;
});

var loadGlobalConfig = async function(){
	await $.getScript('/content/dam/web-resources/project-specific/interactive/product-demos/wrapper/js/globalconfig.js')
}

	
// Call ADS with formatted URLs
var showDemo = function(url) {
	if (url.indexOf('?') == -1) url += '?';
	if (!$("#hts").is(":checked")) url += "&hideHotspots";
	if (!$("#cls").is(":checked")) url += "&hideCallouts";
	if ($("#apl").is(":checked")) url += "&autoplay";
	//Added language to url with value from language dropdown selection 
	var langDrpdwn = $('#localdrpdwn').val();
	if(!url.includes("lang")){
		url+= "&lang=" + $('#localdrpdwn').val();
		url+= "&lang-autoscale=1"
		url+= "&lang-flexible"
	}

	adsIframe.src = url;
	adsIframe.classList.add('show');
}

// Hide ADS iFrame
var hideDemo = function() {
	adsIframe.classList.remove('show');
	adsIframe.src = '';
	$("#startHeading").removeClass("in");
}

// Configure AutoStart
var autoStart = function(url) {
	setTimeout(
		function() {
			showDemo(url);
		}, 3000);
}

// Add any media required from config.json into front page
var setupMedia = function(media) {
	
	if (media.video.show) {
		$("#primaryFooter #vids").removeClass("hide");
		$("#rightNav #vids").removeClass("hide");
		
		for (var i = 0; i < media.video.items.length; i++) {
			$('#videoBody').append('<div class="col-md-4"><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="' + media.video.items[i].link + '" allowfullscreen=""></iframe></div></div>');
		}
	}
	if (media.virtualRack.show) {
		$("#primaryFooter #vrack").removeClass("hide");
		$("#rightNav #vrack").removeClass("hide");
		
		$("#vRackIframe").attr('src', media.virtualRack.link);
	}
	if (media.mainImage.show) {
		$("#demoImage").removeClass("hide");
		$("#demoImage").attr('src', demoFolderRoot + "/" + media.mainImage.path);
	}
	
	try {
		if(media.customBackground.show){
			$('body').css('background-image', 'url('+demoFolderRoot+'/'+media.customBackground.path+')');
		}
	} catch (error) {
		
	}
	
	if (media.tour3d.show) {
		$("#primaryFooter #tour").removeClass("hide");
		$("#rightNav #tour").removeClass("hide");
		
		$("#tourIframe").attr('src', media.tour3d.link);
	}
	
	var dellLogoImage = document.getElementById("dellLogo").firstElementChild.firstElementChild;
	dellLogoImage.src = "/content/dam/web-resources/project-specific/interactive/product-demos/wrapper/siteimages/delltech-logo-gry2.png";
	
	//var demoLogoImage = document.getElementsByClassName("div-cell-middle text-center")[3].childNodes[1].childNodes[0];
	//demoLogoImage.style.height="40px";
}

// Add all text and menus required from config.json into front page
var setupText = function(text) {
	document.title = "Interactive Demo: " + text.demoName;
	$("#versionText").html("v" + text.demoVersion);
	//Check for new version of the demo
	if(newVersionCheck){
		$("#versionAlert").html("A new version is available");
	}
	$("#titleHeading").html("<span class='hidden-sm hidden-xs'>Interactive Demo: </span>" + text.demoName);
	$("#pageHeading").html(text.demoName);
	
	if (text.instructions.show) {
		$("#primaryFooter #inst").removeClass("hide");
		$("#rightNav #inst").removeClass("hide");
	}
	if (text.learnMore.show) {
		$("#primaryFooter #learn").removeClass("hide");
		$("#rightNav #learn").removeClass("hide");
		
		$("#learn a").each(function() {
			$(this).attr('href', text.learnMore.link);
		});
	}
    
	if (gcf.text.survey.show) {
		var surveyLink = gcf.text.survey.link + text.labCode + '&2=' + text.nullValue + '&3=' + text.nullValue;
		$('#srvFrame').attr('src', surveyLink);
		$("#primaryFooter #survey").removeClass("hide");
	}

	if (text.menu.show) {
		for (var i = 0; i < text.menu.items.length; i++) {
			if (text.menu.items[i].isMenu == true) {
				var menuLayout = '<div class="panel panel-default">';
				menuLayout += '<a data-toggle="collapse" class="list-group-item MainMenu" data-parent="#accordion" href="#menu' + i + '">' + text.menu.items[i].text + '<span class="caret"></span></a>';
				menuLayout += '<div id="menu' + i + '" class="panel-collapse collapse">';
				for (var j = 0; j < text.menu.items[i].menuItems.length; j++) {
					menuLayout += '<div class="panel-body">';
					menuLayout += '<a id="demoMenu-' + text.menu.items[i].menuItems[j].slide + '" class="list-group-item dellmetrics-dataclick MainMenu" data-metrics="{\'btnname\':\'demo|'+ text.menu.items[i].menuItems[j].text +':'+ cf.text.labCode +':'+ cf.text.demoName +':'+ cf.text.demoType +':'+ cf.text.demoVersion +'\'}" href="#">' + text.menu.items[i].menuItems[j].text + '</a>';
					menuLayout += '</div>';
				}
				menuLayout += '</div></div>';
				$('#accordion').append(menuLayout);
			}
			else if (text.menu.items[i].isMenu == false) {
				var menuLayout = '<div class="panel panel-default">';
				menuLayout += '<div class="panel-body">';
				menuLayout += '<a id="demoMenu-' + text.menu.items[i].slide + '" class="list-group-item dellmetrics-dataclick MainMenu" data-metrics="{\'btnname\':\'demo|'+ text.menu.items[i].text +':'+ cf.text.labCode +':'+ cf.text.demoName +':'+ cf.text.demoType +':'+ cf.text.demoVersion +'\'}" href="#">' + text.menu.items[i].text + '</a>';
				menuLayout += '</div></div>';
				$('#accordion').append(menuLayout);
			}
		}
		
		$("[id^='demoMenu-']").click(function(e){ 
			imgSelect = e.target.id.replace('demoMenu-','');
			showDemo('demo/index.htm?screen=' + imgSelect + demoFolderPathParam );
		});
	}
	
	//Remove old demo center logo text
	var demoLogoText = document.getElementsByClassName("div-cell-middle text-center")[3].childNodes[5];
	demoLogoText.remove();
	
	//Add exit button

	/*var exitBtn = '<div id="dtweBtn">';
	exitBtn += '<button id="exitBtn" type="button" class="dtwBtn">CLICK HERE TO EXIT DEMO</button>'
	exitBtn += '</div>';
	$('#dellLogo').append(exitBtn);*/
}

// Add language dropdown from config.js into front page
var setupLocale = function(locale) {
	
	if (locale.dropdown.show) {
		$("#localdrpdwn").removeClass("hide");
	}
}

// Create the demo menu local object
var setupWrapperDemoLocale = function(text) {

	if (text.menu.show) {
		for (var i = 0; i < text.menu.items.length; i++) {
			if (text.menu.items[i].isMenu == true) {
				if(!(text.menu.items[i].text in wrapperLocObj)){
					wrapperLocObj[text.menu.items[i].text] = text.menu.items[i].text;
				}else{
					wrapperLocObj[text.menu.items[i].text+i] = text.menu.items[i].text;
				}
				
				
				for (var j = 0; j < text.menu.items[i].menuItems.length; j++) {
					if(!(wrapperLocObj[text.menu.items[i].menuItems[j].text in wrapperLocObj])){
						wrapperLocObj[text.menu.items[i].menuItems[j].text+i+j] = text.menu.items[i].menuItems[j].text;
					}else{
						wrapperLocObj[text.menu.items[i].menuItems[j].text] = text.menu.items[i].menuItems[j].text;
					}
					
				}
			}
			else if (text.menu.items[i].isMenu == false) {
				if(!(text.menu.items[i].text in wrapperLocObj)){
					wrapperLocObj[text.menu.items[i].text] = text.menu.items[i].text;
				}else{
					wrapperLocObj[text.menu.items[i].text+i] = text.menu.items[i].text;
				}
			}
		}
	}
	
}

// Handle Esc key
window.onkeydown = function(e) {
	switch (e.keyCode) {
		case 27: hideDemo(); break;
	}
};

// Listen for restart event
window.addEventListener("message", function(e) {
	if ( e.data.type == 'restart' ) hideDemo();
	e.data.hideHotspots == true ? $("#hts").prop('checked', false) : $("#hts").prop('checked', true);
	e.data.hideCallouts == true ? $("#cls").prop('checked', false) : $("#cls").prop('checked', true);
	if (e.data.autoplay == true) {
		$("#apl").prop('checked', true);
		autoStart('demo/index.htm?screen=2' + demoFolderPathParam);
	}
	else {
		$("#apl").prop('checked', false);
	}
});

var demoSetup = function() {
	loadGlobalConfig().then(()=>{
		setupMedia(cf.media);
		setupText(cf.text);
	});
	setupWrapperDemoLocale(cf.text);
	Dell.Metrics.sc.productdemo = cf.text.labCode + "|" + cf.text.demoType + "|" + cf.text.demoName + "|" + cf.text.demoVersion;
	adsIframe = document.getElementById('ads-iframe');
	
	$("#apl").change(function() {
		if (this.checked) {
			autoStart('demo/index.htm?screen=2' + demoFolderPathParam);
		}
	});
	
	$('#survey').on('click', function(e){
		e.preventDefault();
		$('#surveyModal').modal('show');
		
		// (Perfectly legal) chicanery to get around Chrome's iFrame security
		// Note the $('#srvFrame').one instead of $('#srvFrame').on - this registers
		// the event only once per load.
		$('#srvFrame').one('load', function(){
			setTimeout(
				function() {
					$('#surveyModal').modal('hide');
					$('#srvFrame').attr('src', $('#srvFrame').attr('src'));
				}, 2000);
		});
	});
	// Handle Exit button
	/*$('#exitBtn').click(function(e){ 
		open(location, '_self').close();
	});*/
}