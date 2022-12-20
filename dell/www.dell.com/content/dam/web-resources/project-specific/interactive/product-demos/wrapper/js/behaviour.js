var autoLangSelect = true;
var wrapperLangScript;
var behaviour = {
    switchScreen: function(a, c) {
        var b = "demo/index.htm?";
        if (c == "wrapper") {
            behaviour.showWrapperJSON();
        } else {
            if (a != null) {
				if(isNaN(a)){
                    var screenNum = cf.screens.items.find((x)=>x.text==a).value;
                    if(!isNaN(screenNum)){
                        b += "screen=" + screenNum +"&";
                    }
                }
                else{
                    b += "screen=" + a +"&";
                }
            }
            if (c != null & c != "en" & c != "") {
                b += "lang=" + c;
            }
            b += "&lang-autoscale=1" + demoFolderPathParam;
            showDemo(b);
        }
    },
    populateLangDropdown: function() {
        var a = document.getElementById("localdrpdwn");
        var b = cf.locale.dropdown.items;
        for (var c = 0; c < b.length; c++) {
            var d = document.createElement("option");
            d.text = b[c].text;
            d.value = b[c].value;
            a.add(d);
        }
    },
    getLocalLang: function() {
        if (autoLangSelect) {
            var b = "en";
            var a = document.body.getAttribute("data-lang");
            if (jQuery("#localdrpdwn option[value=" + a + "]").length > 0) {
                b = a;
            }
            document.getElementById("localdrpdwn").value = b;
        }
    },
    showWrapperJSON: function() {
        document.body.innerHTML = "";
        var a = document.createElement("textarea");
        wrapperLocObj = JSON.stringify(wrapperLocObj, null, 4);
        wrapperLocObj = "var WrapperDemoLocalisation = " + wrapperLocObj;
        a.value = wrapperLocObj;
        a.setAttribute("style", "width:100%;height:100%;border:0;display:block;font-family:monospace");
        document.body.appendChild(a);
        window.onload = null;
    }
};
window.onload = function() {
    var a = document.getElementById("localdrpdwn");
    translateWrapper($(a).val());
    a.addEventListener("change", function() {
        translateWrapper($(this).val());
    }, false);
};
var translateWrapper = function(d) {
    $.ajaxPrefilter("json script", function(e) {
        e.crossDomain = true;
    });
    if (d == "en" || d == "default") {
        var c = document.getElementsByClassName("MainMenu");
        var a = 0;
        for (var b in wrapperLocObj) {
            c[a].firstChild.nodeValue = wrapperLocObj[b];
            a++;
        }
        $.getScript("/content/dam/web-resources/project-specific/interactive/product-demos/wrapper/js/wrappergloballocalisation.js", function() {
            var k = document.querySelectorAll("a[href='#startHeading']");
            k[0].firstChild.nodeValue = wrapperGlobalLocalisation.en.start;
            var h = document.getElementsByClassName("rightNavItem");
            h[0].childNodes[2].nodeValue = wrapperGlobalLocalisation.en.instructions.text;
            h[1].childNodes[3].firstChild.nodeValue = wrapperGlobalLocalisation.en.learnMore;
            h[2].childNodes[2].nodeValue = wrapperGlobalLocalisation.en.virtualRack;
            h[3].childNodes[2].nodeValue = wrapperGlobalLocalisation.en.videos;
            h[4].childNodes[2].nodeValue = wrapperGlobalLocalisation.en.tour3d;
            var e = document.getElementsByClassName("navKeyText");
            e[0].firstChild.nodeValue = wrapperGlobalLocalisation.en.instructions.modal.restartDemo;
            e[1].firstChild.nodeValue = wrapperGlobalLocalisation.en.instructions.modal.moveBack;
            e[2].firstChild.nodeValue = wrapperGlobalLocalisation.en.instructions.modal.moveForward;
            e[3].firstChild.nodeValue = wrapperGlobalLocalisation.en.instructions.modal.forBestExperience;
            e[4].firstChild.nodeValue = wrapperGlobalLocalisation.en.instructions.modal.demoFlow;
            e[5].firstChild.nodeValue = wrapperGlobalLocalisation.en.instructions.modal.paragraph;
            var g = document.getElementById("keyControls");
            g.children[0].children[0].children[1].firstChild.nodeValue = wrapperGlobalLocalisation.en.instructions.modal.demoInstructions;
            var i = document.getElementsByClassName("leftFooterItem");
            i[0].childNodes[5].childNodes[0].nodeValue = wrapperGlobalLocalisation.en.instructions.text;
            i[1].childNodes[5].childNodes[1].nodeValue = wrapperGlobalLocalisation.en.learnMore;
            i[2].childNodes[5].childNodes[0].nodeValue = wrapperGlobalLocalisation.en.virtualRack;
            i[3].childNodes[5].childNodes[0].nodeValue = wrapperGlobalLocalisation.en.videos;
            i[4].childNodes[5].childNodes[0].nodeValue = wrapperGlobalLocalisation.en.tour3d;
            var j = document.getElementById("hotspots");
            j.childNodes[1].childNodes[3].childNodes[0].nodeValue = wrapperGlobalLocalisation.en.autoplay;
            j.childNodes[3].childNodes[3].childNodes[0].nodeValue = wrapperGlobalLocalisation.en.hotspots;
            j.childNodes[5].childNodes[3].childNodes[0].nodeValue = wrapperGlobalLocalisation.en.callouts;
            var f = document.getElementById("survey");
            f.childNodes[5].firstChild.nodeValue = wrapperGlobalLocalisation.en.feedback;
        });
    } else {
        $.getScript(demoFolderRoot + "/wrapperdemolocalisation-" + d + ".js", function() {
            var g = document.getElementsByClassName("MainMenu");
            var e = 0;
            for (var f in WrapperDemoLocalisation) {
                g[e].firstChild.nodeValue = WrapperDemoLocalisation[f];
                e++;
            }
        });
        $.getScript("/content/dam/web-resources/project-specific/interactive/product-demos/wrapper/js/wrappergloballocalisation.js", function() {
            var k = document.querySelectorAll("a[href='#startHeading']");
            k[0].firstChild.nodeValue = wrapperGlobalLocalisation[d].start;
            var h = document.getElementsByClassName("rightNavItem");
            h[0].childNodes[2].nodeValue = wrapperGlobalLocalisation[d].instructions.text;
            h[1].childNodes[3].firstChild.nodeValue = wrapperGlobalLocalisation[d].learnMore;
            h[2].childNodes[2].nodeValue = wrapperGlobalLocalisation[d].virtualRack;
            h[3].childNodes[2].nodeValue = wrapperGlobalLocalisation[d].videos;
            h[4].childNodes[2].nodeValue = wrapperGlobalLocalisation[d].tour3d;
            var e = document.getElementsByClassName("navKeyText");
            e[0].firstChild.nodeValue = wrapperGlobalLocalisation[d].instructions.modal.restartDemo;
            e[1].firstChild.nodeValue = wrapperGlobalLocalisation[d].instructions.modal.moveBack;
            e[2].firstChild.nodeValue = wrapperGlobalLocalisation[d].instructions.modal.moveForward;
            e[3].firstChild.nodeValue = wrapperGlobalLocalisation[d].instructions.modal.forBestExperience;
            e[4].firstChild.nodeValue = wrapperGlobalLocalisation[d].instructions.modal.demoFlow;
            e[5].firstChild.nodeValue = wrapperGlobalLocalisation[d].instructions.modal.paragraph;
            var g = document.getElementById("keyControls");
            g.children[0].children[0].children[1].firstChild.nodeValue = wrapperGlobalLocalisation[d].instructions.modal.demoInstructions;
            var i = document.getElementsByClassName("leftFooterItem");
            i[0].childNodes[5].childNodes[0].nodeValue = wrapperGlobalLocalisation[d].instructions.text;
            i[1].childNodes[5].childNodes[1].nodeValue = wrapperGlobalLocalisation[d].learnMore;
            i[2].childNodes[5].childNodes[0].nodeValue = wrapperGlobalLocalisation[d].virtualRack;
            i[3].childNodes[5].childNodes[0].nodeValue = wrapperGlobalLocalisation[d].videos;
            i[4].childNodes[5].childNodes[0].nodeValue = wrapperGlobalLocalisation[d].tour3d;
            var j = document.getElementById("hotspots");
            j.childNodes[1].childNodes[3].childNodes[0].nodeValue = wrapperGlobalLocalisation[d].autoplay;
            j.childNodes[3].childNodes[3].childNodes[0].nodeValue = wrapperGlobalLocalisation[d].hotspots;
            j.childNodes[5].childNodes[3].childNodes[0].nodeValue = wrapperGlobalLocalisation[d].callouts;
            var f = document.getElementById("survey");
            f.childNodes[5].firstChild.nodeValue = wrapperGlobalLocalisation[d].feedback;
        });
    }
};