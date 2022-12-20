if($j.UW.Id=="emc"){jQuery=$j;}
// File: _util.js
// Purpose: Extends UW.util from _core.js
// Dependencies: dependencies/uw/_breakpointhandler.js

(function ($, UW) {
    UW.util = UW.util.extend(UW.util, {
        // util: creates a random number
        // use : takes parameter limit to set random max, default is 1000
        // e.g.: UW.util.getRandomNumber() or UW.util.getRandomNumber(50);
        getRandomNumber: function (limit) {
            var maxLimit = 1000;
            if (!limit) {
                limit = maxLimit;
            }
            var sNum = Math.floor(Math.random() * limit) + 1;
            var sTime = (new Date).getTime();
            var rNum = sTime + '-' + sNum;
            return rNum;
        },

        /**
         *  Debounce funtion, named throttle for naming consistency with knockout
         *    @param {function} fn
         *    @param {Integer} delay /ms
         */
        throttle: function (fn, delay) {
            var timer = null;
            return function () {
                var context = this,
                    args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    fn.apply(context, args);
                }, delay);
            };
        },

        // util: gets URL parameter
        // use : determines the parameter from either the URL or a passed value
        // e.g.: grabs entire query string from URL
        //       UW.util.getUrlParameter();
        // e.g.: grabs "lang" from URL
        //       UW.util.getUrlParameter("lang");
        // e.g.: grabs "lang" from passed URL value
        //       UW.util.getUrlParameter("lang", "http://www.test.com?lang=en&c=UK");
        getUrlParameter: function (param, url) {
            var href = url ? url : window.location.href;
            var reg = new RegExp('[?&]' + param + '=([^&#]*)', 'i');
            var string = reg.exec(href);
            return string ? string[1] : null;
        },

        // util: set/remove URL parameter
        // use : set the parameter value or remove the parameter
        // e.g.: set the parameter value
        //       UW.util.setUrlParameter("key", "value");
        // e.g.: set the parameter with different value
        //       UW.util.setUrlParameter("key", "new_value");
        // e.g.: remove a parameter
        //       UW.util.setUrlParameter("key");
        setUrlParameter: function (key, value) { // 'value' is optional: if not passed, parameter 'key' is removed
            var url = document.location.href;
            var parameters = [];
            var query = document.location.search.substr(1);
            if (query) {
                parameters = $.grep(query.split('&'), function (p) {
                    return (p.indexOf(key) !== 0);
                });
            }
            if (value) {
                parameters.push(encodeURIComponent(key) + '=' + encodeURIComponent(value).split('%2F').join('/'));
            }
            query = parameters.join('&');
            var hash = document.location.hash;
            url = url.split('#')[0].split('?')[0]; // strip query and hash
            var length = url.length;
            url += (query ? '?' + query : '') + (hash.length > 1 ? hash : '');
            if (Modernizr.history && (url !== document.location.href)) {
                UW.debug.log('UW.util.setUrlParameter: _setParameter(): Changing "' + document.location.href.substr(length) + '" to "' + url.substr(length) + '"');
                history.replaceState({}, '', url);
            }
        },

        // util: remove a URL parameter
        // use : remove the parameter
        // e.g.: remove a parameter
        //       UW.util.removeUrlParameter("key");
        removeUrlParameter: function (key) { // 'value' is optional: if not passed, parameter 'key' is removed
            return this.setUrlParameter(key);
        },

        // util: remove all URL parameters
        // use : remove all URL parameters in current URL
        // e.g.: remove all parameters
        //       UW.util.removeAllUrlParameters();
        removeAllUrlParameters: function (key, value) {
            var url = document.location.href;
            var hash = document.location.hash;
            url = url.split('#')[0].split('?')[0]; // strip query and hash
            var length = url.length;
            url += (hash.length > 1 ? hash : '');
            if (Modernizr.history && (url !== document.location.href)) {
                UW.debug.log('UW.util.removeAllUrlParameters: _setParameter(): Changing "' + document.location.href.substr(length) + '" to "' + url.substr(length) + '"');
                history.replaceState({}, '', url);
            }
        },

        // util: sample function
        // use : simple example of new function formatting
        // e.g.: copy & paste to create a new function
        demo: function () {
            var x = 'success!';
            return x;
        },

        /**
         * Determinates if a given val should be considered as empty
         *
         * @param {type} val
         * @returns {Boolean}
         */
        isEmptyVal: function (val) {
            'use strict';
            return val === undefined || val === null || val === ''; // do not use !val because 0 and false are not empty vals ;)
        },

        /**
         * Search a user defined property on the given source object
         *
         * @param {object} source
         * @param {string} path dot notation property path through
         * @returns {(object|null|boolean|number|string|undefined)} Undefined only when property isn't defined or it's defined as undefined ( O.o weird )
         */
        getObjectProperty: function (source, path) {
            'use strict';

            var splittedPath = path.split('.'),
                splittedPathLength = splittedPath.length || 0,
                propertyName,
                currentProperty = source,
                i = 0;

            if (currentProperty && splittedPathLength) {
                for (i = 0; i < splittedPathLength; i += 1) {
                    propertyName = splittedPath[i];

                    if (currentProperty) {
                        currentProperty = currentProperty[propertyName];
                    }

                    if (UW.util.isEmptyVal(currentProperty)) {
                        break;
                    }
                }
            }

            return currentProperty;
        },

        onBreakpointChange: (function () {
            var scripts = [],
                previousBreakpoint = UW.breakpoint.getScreenSize(),
                currentBreakpoint = previousBreakpoint,
                scriptsOnLoad = [],
                loaded = false,
                timer;

            $j(window).on('load', function () {
                loaded = true;
                $.each(scriptsOnLoad, function (index, script) {
                    script.callback.call(script.context);
                });
            });

            $j(window).resize(function (event) {
                if(timer) {window.clearTimeout(timer);}
                timer = window.setTimeout(function(){
                    currentBreakpoint = UW.breakpoint.getScreenSize();
                    if (currentBreakpoint !== previousBreakpoint) {
                        previousBreakpoint = currentBreakpoint;
                        $.each(scripts, function (index, script) {
                            script.callback.call(script.context);
                        });
                    }
                },300);
            });

            return function (callback, runNow, context) {
                scripts.push({
                    callback: callback,
                    context: context
                });
                if (runNow == 'No'){
                    return false;
                }
                if (runNow) {
                    callback.call(context);
                } else if (!loaded) {
                    scriptsOnLoad.push({
                        callback: callback,
                        context: context
                    });
                } else {
                    callback.call(context);
                }
            };
        })(),
        image: (function () {
           
            return {
                srcSet: function (container, selector) {
                    var $target = typeof selector !== 'undefined' && container && $j(container).find(selector),
                        $transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
                        breakpoints = UW.breakpoint.breakpointsCode,
                        breakpointsSize = UW.breakpoint.breakpointsEdgeSize;
                        //Adding a calculated Height to avoid page dancing when blazing images
                        
                    function setSrcs(newExt) {
                        // $target.each(function () {
                        //     //Adding a calculated Height to avoid page dancing when blazing images
                        //     var ele = $j(this),
                        //     imgWidth = ele.attr('data-width'),
                        //     imgHeight = ele.attr('data-height');
                        //     if(imgWidth && imgHeight && ele.not(".b-loaded, .b-error")){ele.attr("height",imgHeight / imgWidth * ele.outerWidth());}
                        // });

                        //changing the dynamic value to the correct bp col grid value
                        $target.each(function () {
                            var ele = $j(this),
                                colParent = ele.closest(".col"),
                                origSrc = ele.attr('data-src') || ele.attr('data-src-original'),
                                extTemp='',
                                isTransparent = ele.attr('data-istransparent'),
                                /*crop = ele.attr('data-crop'),
                                cropStr="&c=wid,hei,gra&crop=xPos,0,wid,hei",
                                cropTemp,*/
                                imgWidth = ele.attr('data-width'),
                                imgHeight = ele.attr('data-height'),
                                //dynamicSufix = "?w=",
                                dynamicSufix = "?",
                                aemRenditionSufix = '/jcr:content/renditions/',
                                aemS7RenditionSufix = '/customrenditions/',
                                numCol = 1,
								scene7Domain=UW.util.s7domain || "https://i.dell.com/is/image/DellContent",
                                origSrcExt = (origSrc ? origSrc.split(".").pop() : '');

                            /*Second part of OR is just a fallback in case BE implementation of transparent property is still not working*/

                            if ((isTransparent && isTransparent != "false") || (!isTransparent && ["png", "gif"].indexOf(origSrcExt) != -1)) {
                                extTemp=newExt||origSrcExt;
                                dynamicSufix = dynamicSufix.replace('?', '?fmt=' + extTemp + '-alpha&');
                            }

                            if(origSrc){
                                newSrc = origSrc + dynamicSufix;
                            }

                            if (colParent && colParent.length) {
                                colParent = colParent.attr('class');
                            }

                            /*var cropBpArr = Object.keys(breakpoints),
                                validCropBpStr = ele.attr('data-crop-bp'),
                                validCropBp = {},
                                cropBpStart = 0,
                                cropBpEnd = cropBpArr.length-1;*/
                            UW.plugins = UW.plugins || {};
                            /*if(validCropBpStr && validCropBpStr.length > 0 && validCropBpStr != "all") {
                                var cropBpLimits = validCropBpStr.split("-");
                                cropBpStart = cropBpLimits[0];
                                cropBpEnd = cropBpLimits[1] ? (cropBpLimits[1] == "x" ? cropBpArr.length-1 : cropBpLimits[1]) : cropBpLimits[0];
                            }
                            for(var cropBpId in cropBpArr) {
                                validCropBp[cropBpArr[cropBpId]] = (cropBpId >= cropBpStart && cropBpId <= cropBpEnd);
                            }*/

                            for (var bp in breakpoints) {
								if (ele.attr('data-src-' + bp) == 'custom') {
                                	if ((isTransparent && isTransparent != "false") || (!isTransparent && ["png", "gif"].indexOf(origSrcExt) != -1)) {
                                        ele.attr('data-src-' + bp, scene7Domain + origSrc + aemS7RenditionSufix + bp +'.'+origSrcExt + '?fmt='+ origSrcExt + '-alpha');
                                    }else{
                                    	ele.attr('data-src-' + bp, scene7Domain + origSrc + aemS7RenditionSufix + bp +'.'+origSrcExt);
                                    }
                                } else if (ele.attr('data-src-' + bp) == 'dynamic') {
                                    	newSrc = scene7Domain + origSrc;
                                        numCol = 1;
                                        if (colParent.length) {
                                            numCol = colParent.split(breakpoints[bp] + '-');
                                            if (numCol[1]) {
                                                numCol = numCol[1][0];
                                            } else {
                                                numCol = 1;
                                            }
                                        }
                                        if (numCol == 1) {
                                            if (bp =="medium"){
                                                if (ele.parents('.text-width-half').length || ele.parents('.text-width-wide').length || ele.parents('.text-width-long').length || ele.parents('.text-width-narrow').length){
                                                    numCol=2;
                                                }
                                            }
                                            else if (bp =="large" || bp =="xlarge" || bp =="xxlarge"){
                                                if (ele.parents('.text-width-half').length || ele.parents('.text-width-wide').length){
                                                    numCol=2;
                                                }
                                                else if (ele.parents('.text-width-long').length){
                                                    numCol=3;
                                                }
                                                else if (ele.parents('.text-width-narrow').length){
                                                    numCol=1.5;
                                                }

                                            }
                                        }
                                        numCol = parseInt(breakpointsSize[bp] / numCol);

                                        /*if (crop && bp != 'xsmall' && bp != 'small' && imgHeight && imgWidth){
                                            cropTemp= cropStr.replace(/wid/g,numCol);
                                            switch (crop){
                                                case 'left':
                                                    cropTemp=cropTemp.replace('xPos',(imgWidth > numCol ? imgWidth-numCol : 0));
                                                    break;

                                                case 'both':
                                                    cropTemp=cropTemp.replace('xPos',(imgWidth > numCol ? (imgWidth-numCol)/2 : 0));
                                                    break;

                                                case 'right':
                                                    cropTemp=cropTemp.replace('xPos','0');
                                                    break;
                                            }
                                            numCol += cropTemp;
                                        }*/
                                        ele.attr('data-src-' + bp, newSrc + dynamicSufix + "wid=" + numCol + '&fit=constrain');
                                }

                            }
                        });
                    };
                    setSrcs();
                }
            };
        }()),

        // util: getJSON
        // use : Get json from element a data attribute
        //       @param element = jQuery element
        //       @param attribute = the name of the data attribute, format data-name
        // e.g.:  UW.util.getJSON($(".my-element"), "json");
        getJSON: function (element, attribute) {
            try {
                if (element.data(attribute)) {
                    var text = element.data(attribute).replace(/(\r\n|\n|\r)/gm, " ").replace(/\"/gm, "'").replace(/({|:|,)\s*(__)/gm, '$1"').replace(/(__)\s*(}|:|,)/gm, '"$2');
                    var json = eval("(" + text + ")");
                }
            } catch (err) {
                UW.debug.log("UW.util.getJSON: The JSON has invalid characters 'overlay-hbs.js' or the data-json is missing.");
                UW.debug.log(text);
                return;
            }

            return json || false;
        },

        rtl: (function () {
            return $j('html').hasClass('rtl');
        })(),

        // util: verifyUrl
        // use : Verify string url and prevent script injection
        //       @param url = String URL
        // e.g.:  UW.util.verifyUrl("myurl.html");
        verifyUrl: function (url) {
            var check = false,
                host = [
                    "\\.delltechnologies\\.com",
                    "\\.emc\\.com",
                    "\\.dellemc\\.com",
                    "\\.dell\\.com", 
                    "easypost-files\\.s3-us-west-2\\.amazonaws\\.com" // used for Recycling Forms view 03, js file recyclingapp-form.js
                ],
                domains = host.join("|");
            //to handle iframe overlay XSS issue new use case ASRC-5466 
            UW.plugins = UW.plugins || {};
            UW.plugins.subDomains = ["www",
            "education",
            "corporate",
            "stage",
            "preview",
            "preview-corporate",
            "test-prev",
            "test",
            "test-prev-corporate",
            "test-corporate",
            "test-b-corporate",
            "test-prevb-corporate",
            "test-b",
            "test-prevb",
            "dev",
            "dev-prev",
            "dev-corporate",
            "dev-prev-corporate",
            "uat",
            "uat-prev",
            "uat-corporate",
            "uat-prev-corporate",
            "uat1",
            "uat1-prev",
            "uat1-corporate",
            "uat1-prev-corporate",
            "dev-b",
            "dev-prevb",
            "www-wip",
            ""
            ];
            var subDomains = UW.plugins.subDomains.join("|"),
            domainsAllowed = new RegExp("^(http[s]?:\\/{2}|\\/{2})(" + subDomains + ")(" + domains + ")($|\\/)", "g");

            //check for custom overlay
            let idEl = UW.util.hash.get("overlay-custom");
            if (idEl) {
                let customOverlay = document.getElementsByClassName("custom-overlay");
                if (customOverlay) {
                    UW.debug.log("URL is custom overlay ID ,valid URL");
                    check = true;
                }
            }
            else {
                if (domainsAllowed.test(url)) {
                    UW.debug.log("UW.util.verifyUrl: Absolute URL OK and match with allowed domains.");
                    check = true;
                }

                //If relative path
                if (/^(?!http[s]?:\/{2}|\/{2}|www)^([\/])((?!:).)*$/g.test(url)) {
                    UW.debug.log("UW.util.verifyUrl: Relative URL OK");
                    check = true;
                }

                //If contains a "@"
                if (url.indexOf("@")!=-1){
                    UW.debug.log("URL has a '@' symbol, invalid URL");
                    check = false;
                }
            }
            return check;
        },

        getViewport: function () {
            var e = window,
                a = 'inner';

            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }

            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            };
        },

        getDocumentHeight: function () {
            var body = document.body,
                html = document.documentElement;

            return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        },

        // util: Takes the current url params and adds to all links on page
        // use : if link already has params, appends url params with & rather than ?
        // e.g.: UW.util.appendCurrentParamsToAllLinks()
        appendCurrentParamsToAllLinks: function (classname) {
            var queryString = window.location.search;
            var selectorName;

            (arguments[0]) ? selectorName = classname: selectorName = "section";
            if (queryString) {
                $(selectorName + " a").each(function () {
                    if (!this.getAttribute("data-url-appended")) {
                        this.setAttribute("data-url-appended", "true");
                        tempHref = this.href;
                        tempQueryString = queryString;
                        if (tempHref.indexOf("?") > -1) {
                            tempQueryString = tempQueryString.replace("?", "&");
                        }
                        this.href = tempHref + tempQueryString;
                    }

                })
            }

        }

    });

    UW.locale = (function () {
        var locale = ($j("body").data("locale") || "en");
        return {
            locale: locale,
            language: locale.split('-')[0],
            country: (locale.split('-')[1] || null)
        };
    })();

     
    UW.chat = (function() {
        return{
            chatLoaded: false
        }
    })();
    
})($j, window.UW || (window.UW = {}));

// File: _cta-referrer.js
// Purpose: CTA ListReferrer

$('body').on('click','.uc-form-link, #uc-form-link .category-nav-link',function(){
    var currentPageURL = encodeURI(UW.url.href);
    document.cookie = "ctaReferrerURL=" + currentPageURL+";path=/";
});
(function (root, utils) {
    if (typeof define === 'function' && define.amd) {
      define(utils);
    } else if (typeof exports === 'object') {
      module.exports = utils();
    } else {
      root.Utils = utils();
    }
  })(this, function () {
    return function Utils() {
        const self = this;
        self.getPolyfils = function() {
            if (!Element.prototype.matches) {
                Element.prototype.matches = Element.prototype.msMatchesSelector ||
                Element.prototype.webkitMatchesSelector;
            }
            if (!Element.prototype.closest) {  
                Element.prototype.closest = function(s) {
                    var el = this;
                    do {
                        if (el.matches(s)) return el;
                        el = el.parentElement || el.parentNode;
                    } while (el !== null && el.nodeType === 1);
                    return null;
                };
            }
            if (new Set([0]).size === 0) {
                const BuiltinSet = Set;
                Set = function Set(iterable) {
                    const set = new BuiltinSet();
                    if (iterable) {
                        iterable.forEach(set.add, set);
                    }
                    return set;
                };
                Set.prototype = BuiltinSet.prototype;
                Set.prototype.constructor = Set;
            }
        }
        self.arrayFromSet = function(set) {
            let arr = [];
            if(Array.from) {
                arr = Array.from(set);
            } else {
                set.forEach(function(item) {
                    arr.push(item);
                })
            }
            return arr;
        }
        self.throttle = function(fn, context, interval) {
            interval = interval || 200;
            let enabled = true;
            return function() {
                if (!enabled) return;
                fn.apply(context, Array.prototype.slice.call(arguments));
                enabled = false;
                window.setTimeout(function() { enabled = true;}, interval);
            };
        }
        self.debounce = function(fn, context, targets, interval) {
            interval = interval || 200;
            let debounceTimeout;
            return function() {
                clearTimeout(debounceTimeout);
                debounceTimeout = setTimeout(function() {
                    fn.call(context, targets, Array.prototype.slice.call(arguments));
                }, interval);
            }
        }
    };
});

(function(root, bpHandler) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register isVisible as an anonymous module
        define(bpHandler);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = bpHandler();
    } else {
        // Browser globals. Register bLazy on window
        root.BpHandler = bpHandler();
    }
})(this, function() {
    'use strict';
    return function BpHandler(options) {
        const self = this;
        init(self, options);
        
        self.getCurrentBreakpoint = function() {
            let lastBreakpoint, breakpoint = undefined,
                viewport = window.innerWidth || document.documentElement.clientWidth;
            for (breakpoint in self.options.richBreakpoints) {
                if (viewport < self.options.richBreakpoints[breakpoint].start) {
                    breakpoint = lastBreakpoint;
                    break;
                }
                lastBreakpoint = breakpoint;
            }
            return self.options.richBreakpoints[breakpoint];
        }   
        self.onBreakpointChange = (function() {
            let scripts = [],
                previousBreakpoint = self.getCurrentBreakpoint(),
                currentBreakpoint = previousBreakpoint,
                timer;

            window.addEventListener('resize', function (event) {
                if(timer) {window.clearTimeout(timer);}
                timer = window.setTimeout(function(){
                    currentBreakpoint = self.getCurrentBreakpoint();
                    if (currentBreakpoint.bp !== previousBreakpoint.bp) {
                        previousBreakpoint = currentBreakpoint;
                        scripts.forEach(function(script) {
                            script.callback.call(script.context, script.targets);
                        })
                    }
                },300);
            });

            return function (callback, context, targets) {
                scripts.push({
                    callback: callback,
                    targets: targets || null,
                    context: context
                });
            };
        })()
    };

    function init(self, options) {
        const defaultBreakpoints = [
            ["xsmall", 0],
            ["small", 640],
            ["medium", 768],
            ["large", 980],
            ["xlarge", 1280],
            ["xxlarge", 1600]  
        ]
        self.options = options || {};
        self.options.richBreakpoints = enrichBreakpoints(self.options.breakpoints || defaultBreakpoints);
    }

    function enrichBreakpoints(breakpoints) {
        let richBreakpoints = [];
        for(let breakpoint in breakpoints) {
            let bpIndex = Number(breakpoint), 
                bp = breakpoints[bpIndex], 
                bpName = bp[0].toLowerCase();
                richBreakpoints.push({
                    bp: bpName,
                    bpCapitalized: bpName.charAt(0).toUpperCase() + bpName.slice(1),
                    start: bp[1],
                    edge: bpIndex < breakpoints.length - 1 ? breakpoints[bpIndex+1][1] : breakpoints[bpIndex][1]
                })
        }
        return richBreakpoints;
    }
});

(function(root, componentLoader) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register isVisible as an anonymous module
        define(componentLoader);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = componentLoader();
    } else {
        // Browser globals. Register bLazy on window
        root.ComponentLoader = componentLoader();
    }
})(this, function() {
    'use strict';
    return function ComponentLoader(options) {
        const self = this;
        init(self, options);

        self.getUnloadedComponents = function(container) {
            let _container = container || document;
            return Array.prototype.slice.call(_container.querySelectorAll("." + self.options.selectorClass + ":not(." + self.options.successClass + "):not(." + self.options.errorClass + ")")); 
        };
        
        self.loadComponent = function(element) {
            loadElement(element, self.options);
        };

        self.loadComponents = function(components) {
            components.forEach(function (cmp){
                self.loadComponent(cmp);
            });
        };
    };

    function init(self, options) {
        self.options = options || {};
        self.options.selectorClass = self.options.selectorClass || 'js-component';
        self.options.successClass = self.options.successClass || 'js-cmp-loaded';
        self.options.errorClass = self.options.errorClass || 'js-cmp-error';
        self.options.successCallback = self.options.successCallback || null;
    }

    function loadElement(element, options) {
        let contentUrl = element.dataset.nodeContentUrl;             
        if(!contentUrl || typeof CQ != 'undefined') {
            return;
        }
        contentUrl=contentUrl.replace("/content/emc","");
        if (location.hostname.indexOf('dell.com')>-1 && window.UW && UW.locale){
            contentUrl=contentUrl.replace(UW.locale.locale,UW.locale.locale + '/dt');
        }
        if (location.hostname.indexOf('corporate')>-1){
            contentUrl=contentUrl.replace("/corporate","");
        }
        else if (location.hostname.indexOf('delltechnologiesworld')>-1){
            contentUrl='/' + contentUrl.split('/dellemcworld/')[1];
        }
        /*        
        $j.get(contentUrl,function(result) {
            if(!result) {
                return;
            }
            var containerEl=$(result).insertAfter($j(element));
            setTimeout(function(){
                $j(element).remove();
                $j(document).trigger("ajaxContentLoaded", containerEl);
            },300);
        }); */
    }


    function itemLoaded(element, options) {
        if (options.successCallback) options.successCallback(element);
    }
});

(function(root, imageLoader) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register isVisible as an anonymous module
        define(imageLoader);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = imageLoader();
    } else {
        // Browser globals. Register bLazy on window
        root.ImageLoader = imageLoader();
    }
})(this, function() {
    'use strict';
    return function ImageLoader(options) {
        const self = this;
        init(self, options);

        self.getUnloadedImages = function(container) {
            let _container = container || document;
            return Array.prototype.slice.call(_container.querySelectorAll("." + self.options.selectorClass + ":not(." + self.options.successClass + "):not(." + self.options.errorClass + ")")); 
        }
        
        self.loadImage = function(element) {
            loadElement(element, self.options);
        }

        self.loadImages = function(images) {
            images.forEach(function (img){
                self.loadImage(img);
            })
        }
    };

    function init(self, options) {
        self.options = options || {};
        self.options.selectorClass = self.options.selectorClass || 'js-lazyload';
        self.options.successClass = self.options.successClass || 'b-loaded';
        self.options.errorClass = self.options.errorClass || 'b-error';
        self.options.renditionClass = self.options.renditionClass || 'rendition';
        self.options.notPosClass = self.options.notPosClass || 'img-no-pos';
        self.options.separator = self.options.separator || '|';
        self.options.cropModeEnabled = self.options.cropModeEnabled || false;
        self.options.successCallback = self.options.successCallback || null;
        self.options.maxWidth = self.options.maxWidth || 1600;
        self.options.isRetina = window.devicePixelRatio > 1;
        self.options.currentBreakpoint = null;
        self.options.warningHandler = console.warn.bind(console, "[ImageLoader]"),
        self.options.debug = 0 ? console.log.bind(console, "[ImageLoader]") : function() {};
        self.options.bpHandler = new BpHandler();
    }

    function objectFitFallback(element){
        let imgWrapper = element.closest(".object-fit-image-container"),
        objectFitFallback = imgWrapper && !element.classList.contains("logo") && !element.classList.contains("img-icon");
        if(objectFitFallback) {
            if (element.src) {
                imgWrapper.style.backgroundImage = 'url(' + element.src + ')';
                imgWrapper.classList.add('compat-object-fit');
            }  
        }
    }

    function loadElement(element, options) {
        let dataSrcObj = getImgSrc(element,options),
            dataSrc = dataSrcObj.dataSrc;
        if (dataSrc) {
            let dataSrcSplitted = dataSrc.split(options.separator),
                src = dataSrcSplitted[options.isRetina && dataSrcSplitted.length > 1 ? 1 : 0],
                isImage = isElementOfType(element, 'img');
            // Image or background image
            if (isImage || element.src === undefined) {
                let errorHandler = function() {
                        element.classList.add(options.errorClass);
                        element.removeEventListener('error', errorHandler);
                        element.removeEventListener('load', loadHandler);
                    },
                    loadHandler = function() {
                        // Is element an image
                        element.classList.add(options.successClass);
                        element.removeEventListener('error', errorHandler);
                        element.removeEventListener('load', loadHandler);
                    };
                if(isImage){
                    checkForImgNotPos(element, options);
                    element.addEventListener('error', errorHandler);
                    element.addEventListener('load', loadHandler);
                    element.src = src;
                    //objectFit fallback for IE11 - promo02 image
                    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
                    if(isIE11 && element.dataset.objectFit && UW.breakpoint.getScreenSize() != 'xsmall'){
                        objectFitFallback(element);
                    }
                }else{
                    element.style.backgroundImage = 'url("' + src + '")';
                }
                itemLoaded(element, options);
            } else { // An item with src like iframe, unity, simpelvideo etc
                element.src = src;
                itemLoaded(element, options);
            }
        } else {
            // video with child source
            if (isElementOfType(element, 'video')) {
                each(element.getElementsByTagName('source'), function(source) {
                    handleSource(source, 'src');
                });
                element.load();
                itemLoaded(element, options);
            } else {
                element.classList.add(options.errorClass);
            }
        }
    }

    function getImgSrc(element,options) { 
        UW.util.s7domain = UW.util.s7domain || 'https://i.dell.com/is/image/DellContent';
        let  dataSrc=element.dataset.src
            ,single='Single'
            ,aemRenditionSufix = '/customrenditions/'
            ,isTransparent = element.dataset.istransparent
            ,origSrc = element.dataset.src || element.dataset.srcOriginal
            ,origSrcExt = element.dataset.imageextension
            ,fullpath = UW.util.s7domain + origSrc;

            options.currentBreakpoint = options.bpHandler.getCurrentBreakpoint();
            if(origSrcExt === "svg") return {single: single, dataSrc: origSrc};
            if (element.classList.contains(options.renditionClass)){
                dataSrc = element.dataset['src' + (options.currentBreakpoint.bpCapitalized ? options.currentBreakpoint.bpCapitalized : '')];
                single='';
                if (["custom","dynamic"].indexOf(dataSrc)!=-1){
                    if (dataSrc == 'custom'){
                        var renditionType=dataSrc;
                        dataSrc = fullpath + aemRenditionSufix + options.currentBreakpoint.bp + "." + origSrcExt;
                    }
                    else{
                        dataSrc= fullpath + getImgSize(element, options);
                    }
                    if ((isTransparent && isTransparent != "false")) {
                        dataSrc = dataSrc + (renditionType ? '?' : '&' ) + 'fmt=' + origSrcExt + '-alpha';
                    }
                    element.dataset['src' + (options.currentBreakpoint.bpCapitalized ? options.currentBreakpoint.bpCapitalized : '')] = dataSrc;
                }
            }

        return { dataSrc: dataSrc,
                 single: single};    
    }

    function ruleOfThree(a, b, c) {
        return a * b / c;
    }

    function generateNewImageSizeKeepingAR(containerSize, options, cropMode, freeImageMode) {
        let containerSizeAR = containerSize.width / containerSize.height,
            newImage = {
                size: {}
            },
            widthShouldChange,
            heightShouldChange;
        
        switch (cropMode) {
            case "contain":
                widthShouldChange = (containerSizeAR >= options.focalPointSizeAR && containerSizeAR <= options.fullImageWidthByFocalPointHeight) || (containerSizeAR < options.focalPointWidthByFullImageHeight),
                heightShouldChange = (containerSizeAR >= options.focalPointWidthByFullImageHeight && containerSizeAR < options.focalPointSizeAR) || (containerSizeAR > options.fullImageWidthByFocalPointHeight),
                newImage.cropMode = "contain";
                if(widthShouldChange) {
                    newImage.size.height = options.focalPointSize.height,
                    newImage.size.width = Math.round(ruleOfThree(newImage.size.height, containerSize.width, containerSize.height));
                    newImage.widthChange = true;
                } else if (heightShouldChange) {
                    newImage.size.width = options.focalPointSize.width,
                    newImage.size.height = Math.round(ruleOfThree(newImage.size.width, containerSize.height, containerSize.width));
                    newImage.heightChange = true;
                } else {
                    options.warningHandler("Unexpected case for " + cropMode + " in crop mode");
                }
                let areaOfNewImage = newImage.size.width * newImage.size.height,
                    areaOfContainer = containerSize.width * containerSize.height;
                if(!((areaOfNewImage < areaOfContainer) || (newImage.size.width < options.focalPointSize.width || newImage.size.height < options.focalPointSize.height))) { // O si newImageSize < focalPointSize
                    break;
                }
            // case "fit":
            //     newImage.size.width = containerSize.width,
            //     newImage.size.height = containerSize.height;
            //     break;
            default:
                if(freeImageMode === "free") {
                    newImage = null;
                    break;
                }
                widthShouldChange = containerSizeAR <= options.fullImageAR,
                heightShouldChange = containerSizeAR > options.fullImageAR,
                newImage.cropMode = "cover";
                if(widthShouldChange) {
                    newImage.size.height = options.fullImageSize.height,
                    newImage.size.width = Math.round(ruleOfThree(newImage.size.height, containerSize.width, containerSize.height));
                    newImage.widthChange = true;
                } else if (heightShouldChange) {
                    newImage.size.width = options.fullImageSize.width,
                    newImage.size.height = Math.round(ruleOfThree(newImage.size.width, containerSize.height, containerSize.width));
                    newImage.heightChange = true;
                } else {
                    options.warningHandler("Unexpected case for " + cropMode + " in crop mode");
                }
                break;
        }
        return newImage;
    };

    function calculateCropPositions(cropPosition, imageSize, focalPointSize, newImage) {
        let xPoint, yPoint, cropPosiblePositions,
            imageHeightMinusFPHeightDividedByTwo = (imageSize.height - focalPointSize.height)/2,
            imageWidthMinusFPWidthDividedByTwo = (imageSize.width - focalPointSize.width)/2,
            imageHeightMinusNewImageHeight = imageSize.height - newImage.size.height,
            imageWidthMinusNewImageWidth = imageSize.width - newImage.size.width;
        if(newImage.cropMode === "cover") {
            if(newImage.heightChange) {
                cropPosiblePositions = {
                    "top": [0, imageHeightMinusFPHeightDividedByTwo],
                    "middle": [0, imageHeightMinusNewImageHeight/2],
                    "bottom": [0, imageHeightMinusNewImageHeight - imageHeightMinusFPHeightDividedByTwo]
                }
                cropPosition = cropPosition.split("-")[0];
            } else if(newImage.widthChange) {
                cropPosiblePositions = {
                    "left": [0, 0],
                    "center": [imageWidthMinusNewImageWidth/2, 0],
                    "right": [imageWidthMinusNewImageWidth, 0]
                }
                cropPosition = cropPosition.split("-")[1];
            }
        } else {
            if(newImage.heightChange) {
                cropPosiblePositions = {
                    "top": [imageWidthMinusFPWidthDividedByTwo, 0],
                    "middle": [imageWidthMinusFPWidthDividedByTwo, imageHeightMinusNewImageHeight/2],
                    "bottom": [imageWidthMinusFPWidthDividedByTwo, imageHeightMinusNewImageHeight]
                }
                cropPosition = cropPosition.split("-")[0];
            } else if(newImage.widthChange) {
                cropPosiblePositions = {
                    "left": [0, imageHeightMinusFPHeightDividedByTwo],
                    "center": [imageWidthMinusNewImageWidth/2, imageHeightMinusFPHeightDividedByTwo],
                    "right": [imageWidthMinusNewImageWidth, imageHeightMinusFPHeightDividedByTwo]
                }
                cropPosition = cropPosition.split("-")[1];
            }
        }
        xPoint = cropPosiblePositions[cropPosition][0];
        yPoint = cropPosiblePositions[cropPosition][1];
        return {x: xPoint, y: yPoint, fromXAxisTo: newImage.size.width, fromYAxisTo: newImage.size.height};
    }

    function isCroppableImage(imageSize, availableSizesForCropping) {
        return availableSizesForCropping.some(function(eachSize) {
            return imageSize.width === eachSize.width && imageSize.height === eachSize.height;
        });
    }

    function getImgSize(element, options) {
        let cropStr;
            options.availableSizesForCropping = options.croppingSizes || options.availableSizesForCropping || [{width:2400, height: 2000}],
            options.fullImageSize = options.fullImageSize || {
                width: parseInt(element.dataset.width),
                height: parseInt(element.dataset.height),
            };
        window.UW = UW || {};
        UW.plugins = UW.plugins || {};
        if(!(UW.plugins.cropping === false) && isCroppableImage(options.fullImageSize, options.availableSizesForCropping)) {
            options.focalPointSize = options.focalPointSize || {width: options.fullImageSize.width*0.6, height: options.fullImageSize.height*0.6};
            options.fullImageAR = options.fullImageAR || (options.fullImageSize.width / options.fullImageSize.height);
            options.focalPointSizeAR = options.focalPointSizeAR || (options.focalPointSize.width / options.focalPointSize.height);
            options.fullImageWidthByFocalPointHeight = options.fullImageWidthByFocalPointHeight || (options.fullImageSize.width / options.focalPointSize.height);
            options.focalPointWidthByFullImageHeight = options.focalPointWidthByFullImageHeight || (options.focalPointSize.width / options.fullImageSize.height);
            
            let cropPosition = element.dataset.crop || "top-left",
                cropContainerMode = element.dataset.cropCont,
                cropMode = element.alt ? "contain" : "cover",
                containerSize = {},
                isFreeImageMode = element.dataset.freeImageMode;
            if(cropContainerMode=='parent') {
                containerSize.height=parseInt(element.offsetParent.offsetHeight);
                containerSize.width=parseInt(element.offsetParent.offsetWidth);
            } else {
                containerSize.height=parseInt(element.offsetHeight); 
                containerSize.width=parseInt(element.offsetWidth);
            }
            let newImage = generateNewImageSizeKeepingAR(containerSize, options, cropMode, isFreeImageMode);
            if(newImage) {
                if(isFreeImageMode) {
                    if(containerSize.width >= newImage.size.width) {
                        cropStr = "?crop=" + 0 + "," + 0 + "," + focalPointSize.width + "," + focalPointSize.height + "&wid=" +  containerSize.width + "&fit=constrain";
                    } else {
                        cropStr = '?wid='+ /*(contWidth > 1 ? contWidth :*/ options.currentBreakpoint.edge/*)*/ + '&fit=constrain';
                    }
                    return cropStr;
                }
                let cropPositions = calculateCropPositions(cropPosition, options.fullImageSize, options.focalPointSize, newImage),
                    cropStr = "?crop=" + cropPositions.x + "," + cropPositions.y + "," + cropPositions.fromXAxisTo + "," + cropPositions.fromYAxisTo + "&wid=" + containerSize.width + "&fit=constrain";
                return cropStr;
            }
        }
        cropStr = '?wid='+ /*(contWidth > 1 ? contWidth :*/ options.currentBreakpoint.edge/*)*/ + '&fit=constrain';
        return cropStr;
    }

    // function getContainerWidthBP(element, options){
    //     let contWidth = element.offsetParent.offsetWidth,
    //         winWidth = (window.innerWidth > options.maxWidth ? options.maxWidth : window.innerWidth),
    //         cols = parseInt(winWidth/contWidth),
    //         padding = winWidth-(cols*contWidth);
    //         return parseInt((options.currentBreakpoint.edge-padding)/cols);
    // }

    function itemLoaded(element, options) {
        if (options.successCallback) options.successCallback(element);
    }

    function handleSource(element, attr) {
        let dataSrc = element.dataset[attr];
        if (dataSrc) {
            element[attr] = dataSrc;
            delete element.dataset[attr];
        }
    }

    function checkForImgNotPos(element, options) {
        let imgWrapper = element.closest(".wrapper-image"),
            needsHeightCheck = imgWrapper && !element.classList.contains("logo") && !element.classList.contains("img-icon") && imgWrapper.classList.contains('width-100');
        if(needsHeightCheck) {
            let clientRectImgWrapper = getClientRect(imgWrapper);
            if(element.classList.contains(options.notPosClass)) {
                window.requestAnimationFrame(function() {
                    imgWrapper.classList.remove(options.notPosClass);
                });
            }
            if(!(parseInt(element.dataset.height) || parseInt(element.dataset.width)) || (parseInt(element.dataset.height) / parseInt(element.dataset.width)) < parseInt(clientRectImgWrapper.height) / parseInt(clientRectImgWrapper.width)) {
                window.requestAnimationFrame(function(){
                    imgWrapper.classList.add(options.notPosClass);
                });
            }
        }
    }

    function getClientRect(element) {
        try {
            return element.getBoundingClientRect();
        } catch(e) {
            return { top: 0, bottom: 0, left: 0, width: 0, height: 0, right: 0 }; 
        }
    } 

    function isElementOfType(element, name) {
        return element.nodeName.toLowerCase() === name;
    }

    function each(object, fn) {
        if (object && fn) {
            var l = object.length;
            for (var i = 0; i < l && fn(object[i], i) !== false; i++) {}
        }
    }
});
(function(root, visibilityObserver) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register isVisible as an anonymous module
        define(visibilityObserver);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = visibilityObserver();
    } else {
        // Browser globals. Register bLazy on window
        root.VisibilityObserver = visibilityObserver();
    }
})(this, function() {
    if (typeof Object.assign != 'function') {
        Object.assign = function(target, varArgs) { // .length of function is 2
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }
        
            var to = Object(target);
        
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        };
    }
    const internalState = function(target, stateObject) {
        target.visibilityInformation = Object.assign({}, target.visibilityInformation, stateObject);
    };
    return function VisibilityObserver(options) {
        const self = this;
        self.observeTargets = function(newTargets) {
            if(!newTargets || !Array.isArray(newTargets)) return;
            newTargets.forEach(function(target) {
              internalState(target, {
                actualStatus: "observation phase",
                wasAddedUsingAjax: false,
                observingFreq: self.options.freq,
              })
              target.observerOptions = target.observerOptions || {};
              target.observerOptions.shouldObserve = true;
              target.observerOptions.skipOnce = target.classList.contains(self.options.skipOnceClass);
              target.dataset.isVisible = false
            })
            if(self.isObserverSupported) {
                const uniqueTargets = new Set(newTargets);
                self.targets = self.utils.arrayFromSet(uniqueTargets);
                self.targets.forEach(function(target){
                    self.observer.observe(target);
                });
            } else {
                self.targets = newTargets;
                checkVisibility(self);
            }
        }
        self.unobserveTarget = function(target) {
            internalState(target, {
                wasUnobserved: true,
            })
            target.observerOptions = target.observerOptions || {};
            target.observerOptions.shouldObserve = false;
            delete target.dataset.isVisible;
            if(self.isObserverSupported) {
                self.observer.unobserve(target);
            }
        }
        self.reobserveTargets = function() {
            self.targets.forEach(function(target) {
                internalState(target, {
                    revalidated: true
                })
                target.observerOptions = target.observerOptions || {};
                target.observerOptions.shouldObserve = true;
                target.dataset.isVisible = false;
                if(self.isObserverSupported) {
                    self.observer.observe(target);
                } else {
                    checkVisibility(self);
                }
            })
        }
        self.add = function(targets, parentElementFlag, domContainer) {
            if(targets) {
                if(parentElementFlag === false) {
                    targets = new Array(targets);
                } else {
                    targets = Array.prototype.slice.call(targets.querySelectorAll(self.options.selector));
                }
            } else { //This logic was added because rawHTML doesn't send anything into this function parameter
                domContainer = domContainer || document;
                targets = Array.prototype.slice.call(domContainer.querySelectorAll(self.options.selector + ":not(."+self.options.successClass+"):not(."+self.options.errorClass+")"));
            }
            self.targets = self.targets.concat(targets);
            targets.forEach(function(target) {
                target.observerOptions = target.observerOptions || {};
                target.observerOptions.shouldObserve = true;
                internalState(target, {
                    actualStatus: "observation phase",
                    wasAddedUsingAjax: true,
                    observingFreq: self.options.freq,
                })
                if(self.isObserverSupported) {
                    self.observer.observe(target);
                } else {
                    checkVisibility(self);
                }
            });
        }
        init(self, options);
    };

    function init(self, options) {
        self.utils = new Utils();
        self.options = options || {};
        self.options.action = self.options.action || null;
        self.options.offset = self.options.offset || 0;
        self.options.freq = ['onResize','onBpChange','onVisible'].indexOf(self.options.freq) > -1 ? self.options.freq : 'once';
        self.options.skipOnceClass = self.options.skipOnceClass || 'b-skip-once';
        self.options.onError = self.options.onError;
        self.options.selector = self.options.selector;
        self.options.errorClass = self.options.errorClass;
        self.options.successClass = self.options.successClass;
        self.options.threshold = self.options.threshold || 0.0;
        self.plugins = ["imageLoader", "matchHeight", "componentLoader"];
        self.isObserverSupported = ('IntersectionObserver' in window);
        self.targets = [];
        self.viewport = {};
        self.viewport.top = 0 - self.options.offset;
        self.viewport.left = 0 - self.options.offset;

        //These two lines are needed because sometimes rawHTML use UW.util.blazy, so we decided to create an alias pointing to add
        (window.UW || (window.UW = {})) && (window.UW.util || (window.UW.util = {})) && (window.UW.util.blazy = {});
        UW.util.blazy.reinitialize = self.add;
        UW.util.blazy.run = function() {};

        let error = optionsErrorsValidator(self);
        if(error){
          self.options.onError && self.options.onError();
          throw Error(error);
        }

        if(self.isObserverSupported) {
            const   observerConfig = {
                        root: null,
                        rootMargin: '0px',
                        threshold: self.options.threshold
                    };
            self.observer = new IntersectionObserver(observerCallback.bind(self), observerConfig);
        } else {
            const   checkVisibilityT = self.utils.throttle(function() {checkVisibility(self);}, self),
                    saveViewportOffsetT = self.utils.throttle(function() {saveViewportOffset(self);}, self);

            window.addEventListener("resize", saveViewportOffsetT);
            window.addEventListener("resize", checkVisibilityT);
            window.addEventListener("scroll", checkVisibilityT);
            saveViewportOffset(self);
        }
        if (typeof self.options.action === "string") {
          let initiator, unloadedTargets, skipOnceTargets, skipOnceSelector;
          if (self.options.action === "imageLoader") {
            self.options.errorClass = self.options.errorClass || 'b-error';
            self.options.successClass = self.options.successClass || 'b-loaded';
            skipOnceSelector = ((self.options.selector || ".js-lazyload") + "." + self.options.skipOnceClass);
            self.options.selector = (self.options.selector || ".js-lazyload") + ":not(." + self.options.successClass + "):not(." + self.options.errorClass + ")";

            unloadedTargets = Array.prototype.slice.call(document.querySelectorAll(self.options.selector));
            skipOnceTargets = Array.prototype.slice.call(document.querySelectorAll(skipOnceSelector));
            unloadedTargets = skipOnceTargets.length ? unloadedTargets.concat(skipOnceTargets) : unloadedTargets;
            if (unloadedTargets) {
              initiator = new ImageLoader({  
                croppingSizes: [{width: 2400, height:2000}]
              });
              self.options.action = initiator.loadImage;
              self.observeTargets(unloadedTargets);
            }
          }
          if (self.options.action === "matchHeight") {
            self.options.selector = (self.options.selector || ".js-same-height");

            unloadedTargets = Array.prototype.slice.call(document.querySelectorAll(self.options.selector));
            if (unloadedTargets) {
              initiator = new HeightMatcher();
              self.options.action = initiator.applySameHeight;
              self.observeTargets(unloadedTargets);
            }
          }
          if (self.options.action === "componentLoader") {
            self.options.errorClass = self.options.errorClass || 'js-cmp-error';
            self.options.successClass = self.options.successClass || 'js-cmp-loaded';
            self.options.selector = (self.options.selectorClass || ".js-component") + ":not(." + (self.options.successClass || "js-cmp-loaded") + "):not(." + (self.options.errorClass || "js-cmp-error") + ")";

            unloadedTargets = Array.prototype.slice.call(document.querySelectorAll(self.options.selector));
            if (unloadedTargets) {
              initiator = new ImageLoader();
              self.options.action = initiator.loadComponent;
              self.observeTargets(unloadedTargets);
            }
          }
        }
        if(self.options.freq === 'onBpChange') {
            let bpHandler = new BpHandler();
            bpHandler.onBreakpointChange(self.reobserveTargets, null);
        }
        if(self.options.freq === 'onResize') {
            const reobserveTargetsD = self.utils.debounce(self.reobserveTargets, self);
            window.addEventListener("resize", reobserveTargetsD);
        }
    }
    function observerCallback(entries, observer) {
        const self = this;
        entries.forEach(function(entry){
            entry.target.observerOptions = entry.target.observerOptions || {};
            if(entry.isIntersecting) {
                executeCallback(self, entry.target);
            } else {
                entry.target.dataset.isVisible = false;
            }
        });
    }
    function checkVisibility(self) {
        self.targets.forEach(function (target) {
            target.observerOptions = target.observerOptions || {};
            if(!target.observerOptions.shouldObserve) return;
            let isInView = elementInView(self, target);
            if (isInView && target.dataset.isVisible != "true") {
                executeCallback(self, target);
            } else if(!isInView && target.dataset.isVisible == "true") {
                target.dataset.isVisible = false;
            }
        });
    }
    function executeCallback(self, target) {
        let actualStatus;
        target.observerOptions = target.observerOptions || {};
        
        target.dataset.isVisible = true;
        let error;
        try {
            if(target.observerOptions.skipOnce) {
                target.observerOptions.skipOnce = false;
                actualStatus = "Skip once"
            } else {
                self.options.action(target);
                actualStatus = "Visibility applied"
            }
        } catch (e) {
            error = e;
            if (self.options.onError) {
                self.options.onError();
            }
            throw e;
        } finally {
            internalState(target, {
                actualStatus : (error ? "error" : actualStatus),
                initializer : self.options.action,
                error: error || undefined,
                onError: self.options.onError
            })
        }
        const shouldDelete = self.options.freq === 'once' || target.dataset.observeItemOnce === 'true';
        if(self.options.freq !== 'onVisible' || shouldDelete) {
            self.unobserveTarget(target);
        }
        if(shouldDelete) {
            self.targets.splice(self.targets.indexOf(target),1);
        }
    }
    function elementInView(self, element) {
        let rect = getBoundingClientRect(element);
        return (
            rect.bottom >= self.viewport.top && rect.top <= self.viewport.bottom && rect.width > 0 && rect.height > 0
        );
    }
    function getBoundingClientRect(element) {
        try {
            return element.getBoundingClientRect();
        } catch(e) {
            return { top: 0, bottom: 0, left: 0, width: 0, height: 0, right: 0 };
        }
    }
    function optionsErrorsValidator(self) {
      if(!(typeof self.options.action === "string" || typeof self.options.action === "function")) {
        return "Action type in VisibilityObserver library should be a function or a plugin in string";
      }
      if(typeof self.options.action === "string" && self.plugins.indexOf(self.options.action) === -1) {
        return "The plugin that you insert in the VisibilityObserver is not valid. Valid plugins are: " + self.plugins.join(", ");
      }
    }
    function saveViewportOffset(self) {
        self.viewport.bottom = (window.innerHeight || document.documentElement.clientHeight) + self.options.offset;
        self.viewport.right = (window.innerWidth || document.documentElement.clientWidth) + self.options.offset;
    }
});
(function (root, heightMatcher) {
  if (typeof define === 'function' && define.amd) {
    define(heightMatcher);
  } else if (typeof exports === 'object') {
    module.exports = heightMatcher();
  } else {
    root.HeightMatcher = heightMatcher();
  }
})(this, function () {
  /*Just declaring self here to avoid space complexity problems*/
  function HeightMatcher(options) {
    let self = this;
    self.options = options || {};
    self.options.containerClass = self.options.containerClass || 'js-same-height',
    self.options.dataAttrMode = self.options.dataAttrMode || 'sameHeightMode',
    self.options.dataAttrItems = self.options.dataAttrItems || 'sameHeightItems'
    /*All "private" and utils functions for sameHeightLogic here*/
    let sameHeightLogic = {
      _getTallest: function (elements, elementsHeight) {
        var tallestElements = {};
        elements.forEach(function(element, i) {
          if(Object.keys(tallestElements).length === 0) {
            tallestElements[element.nodeName] = elementsHeight[i];
          } else {
            //Just compare with higher last (of the same type) element
            if (tallestElements[element.nodeName] && (elementsHeight[i] > tallestElements[element.nodeName])) {
              tallestElements[element.nodeName] = elementsHeight[i];
            } else if(!tallestElements[element.nodeName]) {
              //First new type of elements
              tallestElements[element.nodeName] = elementsHeight[i];
            }
          }
        })

        return tallestElements;
      },

      _paintLogic: function(rows) {
        let tallest;
        let elementsHeight, elementsStyleHeightFromCSS;
        if(rows[0].length) {
          /*Important point here. Why I separate those forEach if I can do all the logic in one loop? Because we'll 
          add time complexity to the script. And  Why I'm iterating in @elementsHeight and passing them at the function?
          because otherwise 
          I would need to select them within each function and that would invalidate the layout causing a reflow*/
          rows.forEach(function(row) {
            elementsHeight = row.map(function(el) {
              return el.offsetHeight;
            });
          });

          rows.forEach(function(row) {
            elementsStyleHeightFromCSS= row.map(function(el) {
              return el.style;
            });
          });

          rows.forEach(function (row) {
            tallest = this._getTallest(row, elementsHeight);
            window.requestAnimationFrame(function() {
              this._applyStyles(tallest, row, elementsHeight, elementsStyleHeightFromCSS);
            }.bind(this));
          }.bind(this));
        } else {
          elementsHeight = rows.map(function(el) {
            return el.offsetHeight;
          });
          
          elementsStyleHeightFromCSS= rows.map(function(el) {
            return el.style;
          });
          tallest = this._getTallest(rows, elementsHeight);
          window.requestAnimationFrame(function() {
            this._applyStyles(tallest, rows, elementsHeight, elementsStyleHeightFromCSS);
          }.bind(this));
        }
      },

      _applyStyles: function (tallestElements, elements, elementsHeight, elementsStyleHeightFromCSS) {      
        elements.forEach(function (element, i) {
          if(tallestElements[element.nodeName] === elementsHeight[i]) return;
          elementsStyleHeightFromCSS[i].cssText = "height:" + tallestElements[element.nodeName] + "px;";
        });
      },

      /*This is needed because style props are strings*/
      _parseNaN: function (property) {
        return parseFloat(property) || 0;
      },

      /* This will create a set of rows based on the height of the top
      positions of the items, you can run debugger befor forEach if
      you want to really undestand whats going on */
      _rowMaker: function (elements, offset) {
        let lastTop,
        lastRow,
        referenceElementTopPosition,
        rows = [],
        display,
        marginTop,
        lastClassList,
        elementStyleFromAttribute = elements.map(function(el) {
          return el.getAttribute("style");
        }),
        elementStylesFromCSS = elements.map(function(el) {
          return el.style;
        }),
        elementsTopPosition = [];
        
        //Offset will be the "tolerated error"
        offset = 5 || offset;
        elements.forEach(function(element,i) {
          display = (elementStylesFromCSS[i].cssText.match(/display: *([^;]+);/i) || ["", ""])[1];
          marginTop = (elementStylesFromCSS[i].cssText.match(/margin-top: *([^;]+);/i) || ["", ""])[1];
          if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
            display = 'block';
          }
          element.styleCache = elementStyleFromAttribute[i];
        }.bind(this));

        elementsTopPosition = elements.map(function(element, i) {
          elementStylesFromCSS[i].cssText = "display:"+display+";padding-top:0;padding-bottom:0;margin-bottom:0;margin-top:0;border-top-width:0;border-bottom-width:0;height:100px;overflow:hidden;";
          return elementsTopPosition.push(element.getBoundingClientRect().top + element.ownerDocument.defaultView.pageYOffset - this._parseNaN(marginTop));
        }.bind(this));

        elements.forEach(function (element, i) {
          referenceElementTopPosition = elementsTopPosition[i];
            let referenceElementClass = element.sameHeightParentSelector;
          lastRow = rows.length > 0 ? rows[rows.length - 1] : null;
          if (lastRow === null) {
            rows.push(new Array(element));
          } else {
            if ((Math.floor(Math.abs(lastTop - referenceElementTopPosition)) <= offset) && (referenceElementClass === lastClassList)) {
              rows[rows.length - 1] = lastRow.concat(element);
            } else {
              rows.push(new Array(element));
            }
          }
          lastClassList = referenceElementClass;
          lastTop = referenceElementTopPosition;
        }.bind(this));

        elements.forEach(function(element) {
          element.style = element.setAttribute("style", element.styleCache || '');
          element.styleCache = undefined;
        })

        return rows;
      },

      getRow: function (container, offset) {
        if (container.classList.contains(self.options.containerClass)) {
          offset = offset || 5;
          let elementsToAlign = [],
            sameHeightItemAttr = container.sameHeightMode || container.dataset[self.options.dataAttrItems];
          if (sameHeightItemAttr) {
            if(!container.alreadyHasSameHeight) {
              sameHeightItemAttr = sameHeightItemAttr.split(",");
              sameHeightItemAttr.forEach(function (element) {
                let elementTrim = element.trim();
                let elements = Array.prototype.slice.call(container.querySelectorAll(element));

                elements.forEach(function(domElement) {
                  domElement.sameHeightParentSelector = (elementTrim[0] === "." || elementTrim[0] === "#") ? elementTrim.substring(1) : elementTrim;
                })
                //For each element in sameHeightItem attribute
                elementsToAlign.push.apply(
                  elementsToAlign,
                  elements
                );

              });
              if(!elementsToAlign.length) {
                console.warn("[SameHeight] Becareful, sameheight was not able to find the desired element");
                return [];
              }
              container.sameHeightMode = (container.dataset[self.options.dataAttrMode] === "row" && container.dataset[self.options.dataAttrMode]) || "absolute";
              container.alreadyHasSameHeight = elementsToAlign;
            }
            return container.sameHeightMode === "row" ? sameHeightLogic._rowMaker(container.alreadyHasSameHeight) : container.alreadyHasSameHeight;
          }
          throw new Error("There is no items to align in same height item attribute");
        }
        throw new Error("Container doesn't have the same-height class");
      },
    };

    self.getContainers = function() {
      return Array.prototype.slice.call(document.querySelectorAll("." + self.options.containerClass));
    }

    self.applySameHeight = function(container, offset) {
      if(container) {
        let rows = sameHeightLogic.getRow(container, offset);
        if(rows.length === 0) return;
        sameHeightLogic._paintLogic(rows);
      }
    }  
  }

  //Just creating a dom prototype in case you need to call document.querySelector(".same-height").sameHeight()
  HTMLElement.prototype.sameHeight = function (offset) {
    if (this.classList.contains("js-same-height") && this.hasAttribute("data-same-height-items")) {
      new HeightMatcher().applySameHeight(this, offset);
    }
  };
  return HeightMatcher;
});

(function() {
    var loaded = false;

    loadPerformance();
    document.addEventListener('DOMContentLoaded', loadPerformance);

    function loadPerformance() {
        if (document.readyState != 'loading' && !loaded) {
            loaded = true;
            init();
        }
    }
    function init() {
        let utils = new Utils();
        utils.getPolyfils();
    };
})();

/*let componentObserver = new VisibilityObserver({
    action: "componentLoader",
    freq: "once"
})*/


// File: _util.js
// Purpose: Extends UW.util from _core.js 
(function(UW) {
    UW.util.assets = {
        js: "/etc/designs/uwaem/assets/js/uw/",
        css: "", 
        images: ""
    };
    UW.util.manifests = {
        js: "/etc/designs/uwaem/manifests/js/",
        css: "",
        images: ""
    };
})(UW || {});
// File: _templates.js
// Purpose: Single place for all templates
(function(UW) {
    UW.templates = {
        "pagePicker": {
            "eventRow": '{{#each events}}'+
                            '<tr>'+
                                '<td><span>{{code}}</span><a href="{{url}}" target="_blank">{{name}}</a></td>'+
                                '<td>{{formattedDate}}</td>'+
                            '</tr>'+
                        '{{/each}}'
        },
        "scrollTop": {
            "button": '<a href="javascript:void(0);" class="btn primary arrow-up-2 scroll-top-btn">' +
                      '<span class="icn"></span>' +
                      '<span></span>' +
                      '</a>'
        },
        "video": {
            "inline": "<div><div class='video-wrap'><object class='BrightcoveExperience'><param name='bgcolor' value='#FFFFFF' /><param name='@videoPlayer' value='{{vidid}}' /><param name='autoStart' value='true' /><param name='bgcolor' value='#000000'/><param name='dynamicStreaming' value='true' /><param name='includeAPI' value='true' /><param name='isUI' value='true' /><param name='isVid' value='true' /><param name='playerID' value='{{playid}}' /><param name='playerKey' value='{{playkey}}' /><param name='templateLoadHandler' value='onTemplateLoad' /><param name='templateReadyHandler' value='onTemplateReady' /><param name='wmode' value='transparent'/><param name='htmlFallback' value='true'/></object></div></div>",
            "modal": {
                "overlay": "<div class='video-overlay hide-overlay show-video'><div class='overlay-bg'></div><div class='overlay'><div class='overlay-wrap'><div class='overlay-header'><div class='title'><a href='javascript:void(0)' id='overlay-share' class='addthis_button_compact hide'  addthis:services_compact='facebook,twitter,linkedin,google_plusone_share,email'><span>Share</span><span class='share-icon icn'></span></a></div><div class='btn-close cta-metric' title='close'></div></div><div class='overlay-content'><div class='video-wrap'></div></div></div></div></div>",
                "videoObject": "<object id='video-overlay' class='BrightcoveExperience'><param name='bgcolor' value='#000000' /><param name='isVid' value='true' /><param name='isUI' value='true' /><param name='dynamicStreaming' value='true' /><param name='includeAPI' value='true' /><param name='templateLoadHandler' value='UW.overlayVideo.videoPlayerLoad'/><param name='autoStart' value='true' /></object>",
                "videoObjectHtml5": "<video data-account='694940018001' data-player='kWLcgmDnr' data-embed='default' class='video-js' controls style='width: 100%; height: 100%;'></video>",
                "iframe": "<iframe style='width: 100%; height: 98%;'></iframe>",
                "image": "<img class='image-overlay'/>",
                "videoYoutube2": "<div style='width: 100%; height: 100%;'><embed wmode='transparent' type='application/x-shockwave-flash' width='100%' height='100%' allowfullscreen='true'></div>",
                "videoYoutube":"<div id='youtube-player'></div>",
                "customOverlay":"<div class='custom-overlay'></div>",
                "pdfView":"<div id='adobe-dc-view'></div>",
            }
        },
        "overlays": {
            "default": '<div class="uw-overlay default" tabindex="0" hidden>' +
                           '<div class="card">' +
                             '<div class="header">' +
                                 '<div class="share">' +
                                     '<a href="#share" id="overlay-hbs-share" tabindex="0" class="addthis_button_compact" addthis:services_compact="facebook,twitter,linkedin,google_plusone_share,email"><span>Share</span><span class="share-icon icn"></span></a>' +
                                 '</div>' +
                                 '<div class="header-content"></div>' +
                                 '<a href="javascript:void(0);" class="btn-close cta-metric icn" tabindex="0" title="close"></a>' +
                             '</div>' +
                             '<div class="company-header"></div>' +
                             '<div class="content">' +
                             '</div>' +
                             '<div class="company-footer"></div>' +
                           '</div>' +
                       '</div>',
            "takeover": '<div class="uw-overlay default overlay-assets takeover" tabindex="0" hidden>' +
                            '<div class="overlay-header">' +
                                '<div class="header-container">' +
                                    '<div class="header-content"></div>' +
                                    '<div class="download hide">' +
                                        '<a href="#download" id="overlay-hbs-download" class="js-download" tabindex="0" target="_blank" rel="noopener" download><span class="download-icon icn"></span></a>' +
                                    '</div>' +
                                    '<div class="share share-new">' +
                                        '<a href="#share" tabindex="0"><span class="share-icon icn"></span></a>' +
                                        '<div class="social-share show-social-share">' +
                                            '<div class="social-icons facebook-url">' +
                                                '<a href="" tabindex="0"><span class="icon-share-facebook icn" ></span></a>' +
                                            '</div>' +
                                            '<div class="social-icons twitter-url">' +
                                                '<a href="" tabindex="0"><span class="icon-share-twitter icn"></span></a>' +
                                            '</div>' +
                                            '<div class="social-icons linkedin-url">' +
                                                '<a href="" tabindex="0"><span class="icon-share-linkedin icn"></span></a>' +
                                            '</div>' +
                                            '<div class="social-icons email-url">' +
                                                '<a href="" tabindex="0"><span class="icon-share-email icn"></span></a>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<a href="javascript:void(0);" class="btn-close cta-metric icn js-close" tabindex="0" title="close"></a>' +
                                '</div>' +
                            '</div>' +
                            '<div class="scroll-container">' +
                                '<div class="card">' +
                                    '<div class="content">' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>',
            "modal": '<div class="uw-overlay default overlay-assets modal" tabindex="0" hidden>' +
                        '<div class="scroll-container">' +
                            '<div class="card">' +
                                '<div class="overlay-header">' +
                                    '<div class="header-container">' +
                                        '<div class="header-content"></div>' +
                                        '<div class="download hide">' +
                                            '<a href="#download" id="overlay-hbs-download" class="js-download" tabindex="0" target="_blank" rel="noopener" download><span class="download-icon icn"></span></a>' +
                                        '</div>' +
                                        '<div class="share share-new">' +
                                        '<a href="#share" tabindex="0"><span class="share-icon icn"></span></a>' +
                                        '<div class="social-share show-social-share">' +
                                            '<div class="social-icons facebook-url">' +
                                                '<a href="" tabindex="0"><span class="icon-share-facebook icn" ></span></a>' +
                                            '</div>' +
                                            '<div class="social-icons twitter-url">' +
                                                '<a href="" tabindex="0"><span class="icon-share-twitter icn"></span></a>' +
                                            '</div>' +
                                            '<div class="social-icons linkedin-url">' +
                                                '<a href="" tabindex="0"><span class="icon-share-linkedin icn"></span></a>' +
                                            '</div>' +
                                            '<div class="social-icons email-url">' +
                                                '<a href="" tabindex="0"><span class="icon-share-email icn"></span></a>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                        '<a href="javascript:void(0);" class="btn-close cta-metric icn js-close" tabindex="0" title="close"></a>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="content">' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>',
            "alert": '<div class="uw-overlay default" tabindex="0" hidden>' +
                        '<div class="alert-bg">' +
                            '<div class="alert-popup">' +
                                '<a href="javascript:void(0);" class="btn-close cta-metric icn js-close" tabindex="0" title="close"></a>' +
                                '<div class="general-error"></div>' +
                                '<a href="#" class="general-error-url btn primary cta-v2">' +
                                    '<div class="cta-body">' +
                                        '<span class="cta-text"></span>' +
                                    '</div>' +
                                '</a>' +
                            '</div>' +
                            '</div>' + 
                        '<div class="alert-img-view">' +
                            '<div class="alert-popup">' +
                                '<a href="javascript:void(0);" class="btn-close cta-metric icn js-close" tabindex="0" title="close"></a>' +
                                '<img src="" alt="" />' +
                                '<div class="img-text"></div>' +
                            '</div>' +
                        '</div>' +
                      '</div>',

            "noHeader": '<div class="uw-overlay bio">' +
                            '<div class="card">' +
                                '<div class="company-header"></div>' +
                                '<div class="content"></div>' +
                                '<div class="company-footer"></div>' +
                            '</div>' +
                            '<div class="btn-close cta-metric icn" title="close"></div>' +
                        '</div>',
            "bioTemplate":
                '<div class="bio-wrap">' +
                    '<div class="aside">' +
                        '<img src="{{photo}}" alt="{{altText}}">' +
                        '<ul class="icons">' +
                            '{{#if twitter}}' +
                                '<li><a href="{{twitter}}" class="twitter dellmetrics-socialtwitter" target="_blank">Twitter</a></li>' +
                            '{{/if}}' +
                            '{{#if linkedin}}' +
                                '<li><a href="{{linkedin}}" class="linkedin dellmetrics-sociallinkedin" target="_blank">LinkedIn</a></li>' +
                            '{{/if}}' +
                        '</ul>' +
                    '</div>' +
                    '<div class="main">' +
                        '<div class="name">' +
                            '<h5 class="heading">{{name}}</h5>' +
                            '<p>{{role}}</p>' +
                        '</div>' +
                        '<div class="text">' +
                            '<a href="{{keynoteURL}}" class="btn-secondary">{{keynoteText}}</a>' +
                            '<div class="rte">{{{text}}}</div>' +
                        '</div>' +
                    '</div>' +
                '</div>',

            "bioTemplateV2":
                '<div class="bio-wrap">' +
                    '<div class="name-on-top">' +
                        '<div class="btn-close btn-back cta-metric icn" title="close"></div>' +
                        '<div class="top-title">' +
                            '<h5 class="heading">{{name}}</h5>' +
                            '<h5 class="subheading">{{role}}</h5>' +
                        '</div>' +
                    '</div>' +
                    '<div class="container">' +
                        '<div class="aside">' +
                            '<div class="aside-image">' +
                                '<img src="{{photo}}" alt="{{altText}}">' +
                            '</div>' +
                            '<div class="info">' +
                                '<div class="name-on-middle">' +
                                    '<{{titleHValue}} class="heading" >{{name}}</{{titleHValue}}>' +
                                    '<{{subtitleHValue}} class="subheading">{{role}}</{{subtitleHValue}}>' +
                                '</div>' +
                                '<ul class="icons">' +
                                    '{{#if facebook}}' +
                                        '<li>' +
                                            '<a href="{{facebook}}" class="facebook cta primary" target="_blank">' +
                                                '<span class="icn"></span>' +
                                                '<span class="icon-text">{{facebook}}</span>' +
                                            '</a>' +
                                        '</li>' +
                                    '{{/if}}' +
                                    '{{#if twitter}}' +
                                        '<li>' +
                                            '<a href="https://twitter.com/{{twitter}}" class="twitter cta primary" target="_blank">' +
                                                '<span class="icn"></span>' +
                                                '<span class="icon-text">@{{twitter}}</span>' +
                                            '</a>' +
                                        '</li>' +
                                    '{{/if}}' +
                                    '{{#if linkedin}}' +
                                        '<li>' +
                                            '<a href="{{linkedin}}" class="linkedin cta primary" target="_blank">' +
                                                '<span class="icn"></span>' +
                                                '<span class="icon-text">Visit Link</span>' +
                                            '</a>' +
                                        '</li>' +
                                    '{{/if}}' +
                                    '{{#if download}}' +
                                        '<li>' +
                                            '<a href="{{download}}" class="download cta primary" target="_blank">' +
                                                '<span class="icn"></span>' +
                                                '<span class="icon-text">Download the press photo</span>' +
                                            '</a>' +
                                        '</li>' +
                                    '{{/if}}' +
                                '</ul>' +
                            '</div>' +
                        '</div>' +
                        '<div class="main">' +
                            '<div class="text">' +
                                '<div class="rte">{{{text}}}</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>',

            "bioV3":
                '<div class="overlay-bio-v3">' +
                    '<div class="wrapper-content">' +
                        '<div class="image">' +
                            '<img src="{{photo}}" alt="{{altText}}">' +
                        '</div>' +
                        '<div class="info">' +
                            '<h5 class="heading">{{title}}</h5>' +
                            '{{#if subtitle}}' +
                                '<h5 class="subheading">{{subtitle}}</h5>' +
                            '{{/if}}' +
                            '{{#if linkText}}' +
                                '<a href="{{link}}" target="_blank">{{linkText}}</a>' +
                            '{{/if}}' +
                        '</div>' +
                    '</div>' +
                    '<div class="main">' +
                        '<div class="rte">{{{text}}}</div>' +
                    '</div>' +
                '</div>',

            "agendaSave":
                '<div class="overlay-agenda">' +
                    '<div class="agenda-expanded-content save" id="{{saveAgendaId}}{{retreiveAgendaId}}">'+
                        '<form class="form">'+
                            '<h3 class="subheading">{{agendaDescription}}</h3>'+
                            '<h3 class="subheading error hide">{{agendaError}}</h3>'+
                            '<input type="email" name="userEmail" class="email" placeholder="example@myemail.com" required />'+
                            '<label class="agreement"><input type="checkbox" name="termsAgreement" required/>{{{termsCopy}}}</label>'+
                            '{{#if saveAgendaId}}'+
                                '<a href="javascript:void(0);" class="btn primary save disabled" data-btn-type="save-agenda">'+
                                    '<span class="">{{saveButton}}</span>'+
                                '</a>'+
                            '{{/if}}'+
                            '{{#if retreiveAgendaId}}'+
                                '<a href="javascript:void(0);" class="btn primary retreive disabled" data-btn-type="retreive-agenda">'+
                                    '<span class="">{{retrieveButton}}</span>'+
                                '</a>'+
                            '{{/if}}'+
                            '<input type="submit" class="hide">'+
                        '</form>'+
                        '<div class="message">{{agendaSuccessMessage}}</div>'+
                    '</div>'+

                '</div>',
            "agendaReadMore":
                '<div class="overlay-agenda">' +

                    '<div class="agenda-expanded-content read-more">'+
                        '<div class="read-more-text">{{agendaSessionReadMore}}</div>'+
                    '</div>'+

                '</div>',
            "agendaAboutTracks":
                '<div class="overlay-agenda">' +
                    '<div class="agenda-filters">'+
                        '<ul>'+
                            '{{#each categories}}'+
                                '<li class="column">'+
                                    '<h4 class="subheading">{{name}}</h4>'+
                                    '<div>'+
                                        '{{description}}'+
                                    '</div>'+
                                '</li>'+
                            '{{/each}}'+
                        '</ul>'+
                    '</div>'+

                '</div>',
            "iframe":
                '<iframe src="{{src}}"></iframe>',
            "CSF":
                '<div class="language"><p>{{{text}}}</p></div>',
            "profileList":
                '<div class="wrapper">' +
                '<div class="wrapper-image">' +
                    '<img src="{{photo}}" alt="{{altText}}">' +
                    '<div class="hide-medium hide-large hide-xlarge hide-xxlarge align-center">' +
                        '<h5 class="heading">{{name}}</h5>' +
                        '<h6 class="subheading">{{role}}</h5>'+
                    '</div>' +
                    '<ul class="icons">' +
                        '{{#if twitter}}' +
                            '<li><a href="{{twitter}}" class="twitter dellmetrics-socialtwitter" target="_blank">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-6.4615384615,-6.4615384615,36.9230769231,36.9230769231"><path d="M32 7.075c-1.175 0.525-2.444 0.875-3.769 1.031 1.356-0.813 2.394-2.1 2.887-3.631-1.269 0.75-2.675 1.3-4.169 1.594-1.2-1.275-2.906-2.069-4.794-2.069-3.625 0-6.563 2.938-6.563 6.563 0 0.512 0.056 1.012 0.169 1.494-5.456-0.275-10.294-2.888-13.531-6.862-0.563 0.969-0.887 2.1-0.887 3.3 0 2.275 1.156 4.287 2.919 5.463-1.075-0.031-2.087-0.331-2.975-0.819 0 0.025 0 0.056 0 0.081 0 3.181 2.263 5.838 5.269 6.437-0.55 0.15-1.131 0.231-1.731 0.231-0.425 0-0.831-0.044-1.237-0.119 0.838 2.606 3.263 4.506 6.131 4.563-2.25 1.762-5.075 2.813-8.156 2.813-0.531 0-1.050-0.031-1.569-0.094 2.913 1.869 6.362 2.95 10.069 2.95 12.075 0 18.681-10.006 18.681-18.681 0-0.287-0.006-0.569-0.019-0.85 1.281-0.919 2.394-2.075 3.275-3.394z" /></svg>' +
                            '</a></li>' +
                        '{{/if}}' +
                        '{{#if linkedin}}' +
                            '<li><a href="{{linkedin}}" class="linkedin dellmetrics-sociallinkedin" target="_blank">'+
                            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-6.4615384615,-6.4615384615,36.9230769231,36.9230769231">                                <path d="M12 12h5.535v2.837h0.079c0.77-1.381 2.655-2.837 5.464-2.837 5.842 0 6.922 3.637 6.922 8.367v9.633h-5.769v-8.54c0-2.037-0.042-4.657-3.001-4.657-3.005 0-3.463 2.218-3.463 4.509v8.688h-5.767v-18z M2 12h6v18h-6v-18z M8 7c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z" /></svg>' +
                            '</a></li>' +
                            '</a></li>' +
                        '{{/if}}' +
                    '</ul>' +
                    '{{#if aditionalCtas}}' +
                        '<div class="aditional-ctas hide-small hide-xsmall">' +
                            'Aditional links:'+
                            '{{#each aditionalCtas}}'+
                                '<a href="{{ctaUrl}}">{{ctaText}}</a>'+
                            '{{/each}}'+
                        '</div>' +
                    '{{/if}}' +
                '</div>' +
                '<div class="wrapper-text">' +
                    '<div class="hide-xsmall hide-small">' +
                        '<h5 class="heading">{{name}}</h5>' +
                        '<h6 class="subheading">{{role}}</h5>'+
                    '</div>' +
                    '<div class="rte">' +
                        '<p>{{{text}}}</p>' +
                    '</div>' +
                    '<div class="hide-medium hide-large hide-xlarge hide-xxlarge">' +
                        '{{#if aditionalCtas}}' +
                            '<hr>'+
                            '<div class="aditional-ctas align-center">' +
                                'Aditional links:'+
                                '{{#each aditionalCtas}}'+
                                    '<a href="{{ctaUrl}}">{{ctaText}}</a>'+
                                '{{/each}}'+
                            '</div>' +
                        '{{/if}}' +
                    '</div>' +
                '</div>' +
            '</div>'
        },
        "header": {
            "default": '<div><span class="title">{{title}}</span><span class="subtitle">{{subtitle}}</span></div>'
        },
        "sponsor": {
            "header": {
                "default": '<table>' +
                                '<tbody>' +
                                    '<tr>' +
                                        '<td class="company-logo-1">' +
                                            '<a href="{{logo1Href}}">' +
                                                '<img title="{{logo1Alt}}" alt="{{logo1Alt}}" src="{{logo1}}">' +
                                            '</a>' +
                                        '</td>' +
                                        '{{#if logo2}}' +
                                            '<td class="company-logo-2">' +
                                                '<a title="{{logo2Alt}}" alt="{{logo2Alt}}" href="{{logo2Href}}">' +
                                                    '<img src="{{logo2}}">' +
                                                '</a>' +
                                            '</td>' +
                                        '{{/if}}' +
                                        '{{#if logo3}}' +
                                            '<td class="company-logo-3">' +
                                                '<a title="{{logo3Alt}}" alt="{{logo3Alt}}" href="{{logo3Href}}">' +
                                                    '<img src="{{logo3}}">' +
                                                '</a>' +
                                            '</td>' +
                                        '{{/if}}' +
                                        '<td class="company-text">' +
                                            '<div>{{{text}}}</div>' +
                                        '</td>' +
                                    '</tr>' +
                                '</tbody>' +
                            '</table>',
                "overlay":  '{{#if text}}' +
                                '<div class="company-text">{{{text}}}</div>' +
                            '{{/if}}' +
                            '{{#if logo1}}' +
                                '<div class="company-logo-1">' +
                                    '<a href="{{logo1Href}}">' +
                                        '<img title="{{logo1Alt}}" alt="{{logo1Alt}}" src="{{logo1}}">' +
                                    '</a>' +
                                '</div>' +
                            '{{/if}}' +
                            '{{#if logo2}}' +
                                '<div class="company-logo-2">' +
                                    '<a title="{{logo2Alt}}" alt="{{logo2Alt}}" href="{{logo2Href}}">' +
                                        '<img src="{{logo2}}">' +
                                    '</a>' +
                                '</div>' +
                            '{{/if}}' +
                            '{{#if logo3}}' +
                                '<div class="company-logo-3">' +
                                    '<a title="{{logo3Alt}}" alt="{{logo3Alt}}" href="{{logo3Href}}">' +
                                        '<img src="{{logo3}}">' +
                                    '</a>' +
                                '</div>' +
                            '{{/if}}'
            },
            "footer": {
                "default": "<span>{{{copyright}}}</span>",
                "overlay": '{{#if text}}' +
                                '<div class="company-text">{{{text}}}</div>' +
                            '{{/if}}' +
                            '{{#if logo1}}' +
                                '<div class="company-logo-1">' +
                                    '<a href="{{logo1Href}}">' +
                                        '<img title="{{logo1Alt}}" alt="{{logo1Alt}}" src="{{logo1}}">' +
                                    '</a>' +
                                '</div>' +
                            '{{/if}}' +
                            '{{#if logo2}}' +
                                '<div class="company-logo-2">' +
                                    '<a title="{{logo2Alt}}" alt="{{logo2Alt}}" href="{{logo2Href}}">' +
                                        '<img src="{{logo2}}">' +
                                    '</a>' +
                                '</div>' +
                            '{{/if}}' +
                            '{{#if logo3}}' +
                                '<div class="company-logo-3">' +
                                    '<a title="{{logo3Alt}}" alt="{{logo3Alt}}" href="{{logo3Href}}">' +
                                        '<img src="{{logo3}}">' +
                                    '</a>' +
                                '</div>' +
                            '{{/if}}'
            }
        },
        "disclaimer":{
            "default":
                '<div class="footer-disclaimer">' +
                    '<a href="#">{{linkText}}</a>' +
                    '<div class="disclaimer-holder">' +
                        '<div class="disclaimer">' +
                            '{{{disclaimerText}}}' +
                        '</div>'+
                        '<div class="disclaimer-arrow"></div>' +
                    '</div>'    +
                '</div>'
        },
        "followus": {
            "twitterCard":
                '<ul>'+
                    '{{#each statuses}}'+
                        '<li class="card">'+
                            '<div class="author">'+
                                '<p>'+
                                    '<span class="author-name">{{this.user.name}}</span> '+
                                    '<span class="screen_name">@{{this.user.screen_name}}</span>'+
                                    '<a class="twitter"><span class="icn"></span></a>'+
                                '</p>'+
                            '</div>'+
                            '<p class="text-entry">{{{this.tweet}}}</p>'+
                            '<div class="action-list">'+
                                '<a href="https://twitter.com/intent/tweet?in_reply_to={{id_str}}" target="_blank" class="reply"><span class="icn-reply"></span></a> '+
                                '<a href="https://twitter.com/intent/retweet?tweet_id={{id_str}}" target="_blank" class="retweet"><span class="icn-retweet"></span></a> '+
                                '<a href="https://twitter.com/intent/like?tweet_id={{id_str}}" target="_blank" class="like"><span class="icn-like"></span></a> '+
                            '</div>'+
                            '<div class="time-ago">'+
                                '<span>{{created_at}}</span>'+
                            '</div>'+
                        '</li>'+
                    '{{/each}}'+
                '</ul>'
        },
        "arrow": {
            "svg":
                '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 80 80" style="enable-background:new 0 0 80 80;" xml:space="preserve">'+
                    '<g>'+
                    '<path d="M2.9,23.1l37.1,30.2l37-30.2l3,4.2L40.1,60.1L0,27.3L2.9,23.1z"/>'+
                    '</g>'+
                '</svg>'
        },
    };
})(UW||{});

// File: _overlay.js
// Purpose: Extends UW.util from _core.js

(function($, UW) {
    var overlayKey = 0, clickCount = 0;

    if(UW.util.getUrlParameter("i") !== null) {
        UW.util.removeUrlParameter("i");
    }

    UW.util = UW.util.extend(UW.util, {

        overlay: function(template, content, defaultShare) {
            //Private Properties
            var $body = $("body"),
                classes = {
                    overlay: {
                        close: "btn-close",
                        active: "overflow-active",
                        open: "open"
                    }
                },
                selectors = {
                    overlay: {
                        content: ".content",
                        heading: ".header-content",
                        share: ".share"
                    }
                },
                overlay = {
                    template: UW.templates.overlays["default"],
                    $el: "",
                    $elements: {
                        heading: "",
                        content: "",
                        share: ""
                    },
                    findElements: function () {
                        var overlay = this.$elements;

                        overlay.heading = this.$el.find(selectors.overlay.heading);
                        overlay.content = this.$el.find(selectors.overlay.content);
                        overlay.share = this.$el.find(selectors.overlay.share);
                        overlay.trigger = $j({});
                    },
                    addContent: function(content) {
                        this.$elements.content.html(content);
                    }
                },
                header = {
                    template: UW.templates.header["default"],
                    templateRelPath:'/header/',
                    templateName:'default',
                    compile: function(data) {
                        if(data) {
                            if(UW.plugins && !UW.plugins.enableWebWorker){
                                overlay.$elements.heading.html(compileHBS(this.template,'','',data));
                            }
                            else {
                                compileHBS(this.template,this.templateRelPath,this.templateName, data).then(function(data) {
                                    overlay.$elements.heading.html(data);
                                }, function(data){
                                    console.log(data);//Worker threw an error
                                });
                            }
                            overlay.$elements.heading.removeClass('hide');
                        } else {
                            overlay.$elements.heading.empty();
                            overlay.$elements.heading.addClass('hide');
                        }
                    }
                },
                share = {
                    compile: function() {
                        if(!defaultShare){
                            if (overlay.$elements.trigger.data("share")) {
                                overlay.$elements.share.removeClass("hide");
                            }else{
                                overlay.$elements.share.addClass("hide");
                            }
                        }
                    }
                };

            //Private Methods
            var create = function (template, content) {

                template = template || overlay.template;
                overlay.$el = $(template).appendTo($body);
                //Accesing the DOM only one time and creating the direct parameters to the sections to be modified
                overlay.findElements();
                if (content) {
                    overlay.addContent(content);
                }
                bindEventHandlers();
                socialShareUrl();
                localStorage.removeItem('count');
            };

            var bindEventHandlers = function() {
                overlay.$el.on("click", function(e) {
                    var el = e.target;
                    if (el !== this && !$(el).hasClass(classes.overlay.close)) {
                        return;
                    }

                    hide();
                });

                //Focusback to the CTA that triggered the overlay
                var focusedtrigger;
                $(".overlay-video-trigger,.overlay-image-trigger,.overlay-pdf-trigger,.overlay-custom-trigger,.contactus-popup-trigger").on('click', function (e) {
                    focusedtrigger = e.currentTarget;
                });
                $("body").on('click', '.js-close', function () {
                    if (focusedtrigger.nodeName == "A") {
                        focusedtrigger.focus();
                    } else {
                        focusedtrigger.firstElementChild.focus();
                    }
                });

                overlay.$el.on("click",'.share-new > a', function(e) {
                    clickCount += 1;
                    localStorage.setItem("count", clickCount);
                    e.preventDefault();

                    //Reset the Share button Counter Value
                    if(localStorage.getItem("count") == 0){
                        $(".social-share").animate({
                        }, 100, function () { $(this).removeAttr('style'); });
                    }

                    if(($(window).width()) < UW.breakpoint.breakpoints["medium"]) {
                        $(".social-share").animate({
                            width: "toggle",
                            opacity: "show",
                            right: 37
                        }, 800);
                    }else{
                        $(".social-share").animate({
                            width: "toggle",
                            opacity: "show",
                            left: 57
                        }, 800);
                    }
                });
            };

            //Refactor this
            var compileHBS = function(template,templateRelPath,templateName, data) {
                var overlayHtml;
                if(UW.plugins && !UW.plugins.enableWebWorker) {
                    var compiledTemplate = Handlebars.compile(template);
                    overlayHtml = compiledTemplate(data);
                } else {
                    return UW.content.runWorker({ID: '', action:'compile-content', ajaxUrl: '', jsonData:data, modifiedDate: '', templateRelPath:templateRelPath, templateName: templateName, workerName:'get-content-worker'});
                }
                return overlayHtml;
            };

            var centerOverlay= function() {
                let screenHeight = UW.util.getViewport().height;
                let screenWidth = UW.util.getViewport().width;
                let contentHeight = $('.uw-overlay .card').height() + 160;
                let counts = parseInt(localStorage.getItem("count"));
                if(counts % 2 == 1 ) {
                    if (($(window).width()) < UW.breakpoint.breakpoints["medium"]) {
                        $(".social-share").css({"display": "block", "left":"auto", "right": "37px"});
                    } else {
                        $(".social-share").css({"display": "block", "left":"57px", "right": "none"});
                    }
                }
                else {
                    $(".social-share").css({"display": "none"});
                }

                if ((contentHeight < screenHeight) && screenWidth > 979.9) {
                    $('.uw-overlay').addClass('center-overlay');
                }
                else {
                    // $('.uw-overlay').removeClass('center-overlay');
                    $('.uw-overlay').addClass('center-overlay');
                }
            };

            //Public Methods
            // x.show()
            // x.show({ header: { title: "my Title", subtitle: "this is the subtitle" }, content: "<p>I'm the content</p>", extraClass: "extraClass" } )
            var show = function(data) {


                header.compile(UW.util.getJSON(overlay.$elements.trigger, "heading")||(data?data.header:""));

                if (data && data.content) {
                    overlay.addContent(data.content);
                }

                if (data && data.extraClass) {
                    overlay.$el.addClass(data.extraClass);
                }

                share.compile();

                $body.addClass(classes.overlay.active);
                overlay.$el.addClass(classes.overlay.open);

                // Center content when it is smaller than the screen size
                centerOverlay();
                $(window).resize(centerOverlay);

            };

            var hide = function(element) {
                if (overlay.$el.hasClass(classes.overlay.open)){
                	$body.removeClass(classes.overlay.active);
                	overlay.$el.removeClass(classes.overlay.open);
                }

                if (overlay.callbackHide) {
                    overlay.callbackHide();
                }
                return overlay.$elements.content.children().clone(true);
            };

            var onHide = function(callback) {
                overlay.callbackHide = callback;
            };

            var setTrigger = function(trigger) {
                overlay.$elements.trigger = trigger;
            };

            var getTrigger = function() {
                return overlay.$elements.trigger;
            };

            var callDictionary = function() {
                var _locale = (UW.locale.locale ? UW.locale.locale : "en-us");
                var _filter = "overlay.label";
                var _language = (UW.locale.language ? UW.locale.language : "en");
                $.ajax({
                    type: "GET",
                    dataType: 'json',
                    url: "/des/dictionaryByFilter",
                    data: { locale: _locale, filter: _filter },
                    success: function (response) {
                        UW.util.overlay.i18n = response;
                        var languageTrans={};
                        languageTrans[_language]={
                            "share": UW.util.overlay.i18n['overlay.label.share'],
                            "download": UW.util.overlay.i18n['overlay.label.download'],
                            "close": UW.util.overlay.i18n['overlay.label.close']
                        };
                        $(".js-share").attr({
                            "title": languageTrans[_language]['share'],
                            "aria-label": languageTrans[_language]['share']
                        });
                        $(".js-download").attr({
                            "title": languageTrans[_language]['download'],
                            "aria-label": languageTrans[_language]['download']
                        });
                        $(".js-close").attr({
                            "title": languageTrans[_language]['close'],
                            "aria-label": languageTrans[_language]['close']
                        });
                    },
                    error: function(xhr, status, error) {
                        console.error('Error: Dictionary API Error.');
                    },
                    done: function(data){

                    }
                });
            };

            var getRevisedUrl = function (tempURL) {

                //Absolute URLS
                if (/^(https?:)?\/\//i.test(tempURL)){
                    tempURL = tempURL.replace( /^(https?:)?/i, '');
                    //Temporal fix for removing the domain to solve Cross doamin issues, PDF's not loading the first time.
                    tempURL = tempURL.replace(/^.*\/\/[^\/]+/, '');

                }
                //Coveo is changing the "/" in 'pdf-overlay' in url to "%2F" hence pdfs not loading the first time. Hence sanitizing the URL to replace "%2F" to "/".
                tempURL = tempURL.replace(/%2F/g, "/");

                //Here the extra //host value is getting removed, the host name was getting appended twice. ALso the correct host is being added throught the host variable later
                if(tempURL.search("//www.delltechnologies.com") != -1){
                    tempURL = tempURL.replace( "//www.delltechnologies.com", '');
                }else if(tempURL.search("//"+UW.url.host) != -1){
                    tempURL = tempURL.replace( "//"+UW.url.host, '');
                }else if(tempURL.search("//preview.delltechnologies.com") != -1){
                    tempURL = tempURL.replace( "//preview.delltechnologies.com", '');
                }

                let host = UW.url.host;
                // If the path is in the asset or collaterals folder, use delltechnologies.com
                if(tempURL.search("/asset/") != -1 || tempURL.search("/collaterals/") != -1) {
                    host = (UW.url.host == "www.dell.com") ? 'www.delltechnologies.com' : (UW.url.host == "www-wip.dell.com") ? 'preview.delltechnologies.com' : (UW.url.host == "www-poc.dell.com") ? 'test.delltechnologies.com' : (UW.url.host == "test-stage.dell.com") ? 'uat.delltechnologies.com' : UW.url.host;
                }
                //Check if path is an AEM URL, a Resource or if locale is present
                if (/^(\/content\/)/g.test(tempURL) || /^(\/resources\/)/g.test(tempURL) || /^(\/[a-z]{2}\-[a-z]{2})/.test(tempURL) || /(\/[a-z]{2}\-[a-z]{2})/.test(tempURL)){
                    tempURL = "//" + host + tempURL;
                }// Add the locale if it's not present
                else {
                    tempURL = "//" + host + "/" + UW.locale.locale + tempURL;
                }

                tempURL = tempURL.replace(/(\/[a-z]{2}\-[a-z]{2}\/)/,"/" + UW.locale.locale +"/");

                return tempURL;
            };

            var sanitizeUrl = function (url) {

                var tempUrl = url.toLowerCase();
                if(tempUrl.indexOf('javascript') > -1 || tempUrl.indexOf('<') > -1) {
                    tempUrl = "";
                    return tempUrl;
                } else {
                    return url;
                }

            };

            var socialShareUrl = function(){
                var shareURL = "";
                var buttonAction = "none";
                var pageURL = escape(
                    UW.url.protocol +
                        "//" +
                        UW.url.hostname +
                        UW.url.pathname +
                        UW.url.search +
                        UW.url.hash
                );
                if($(".social-share").hasClass("show-social-share")){
                    $(".social-icons").each(function (i, el) {
                        if ($(el).hasClass("facebook-url")){
                            $(el).find("> a").addClass("dellmetrics-emcbutton-facebook");
                            shareURL = "https://www.facebook.com/sharer/sharer.php?u=" + pageURL;
                            buttonAction = "new";
                        }
                        else if ($(el).hasClass("twitter-url")){
                            $(el).find("> a").addClass("dellmetrics-emcbutton-twitter");
                            shareURL = "https://twitter.com/intent/tweet?&url=" + pageURL + "&via=delltech";
                            buttonAction = "new";
                        }
                        else if ($(el).hasClass("linkedin-url")){
                            $(el).find("> a").addClass("dellmetrics-emcbutton-linkedin");
                            var tString = document.title;
                            tString = tString.slice(0, 199);
                            shareURL = "https://www.linkedin.com/shareArticle?mini=true&url=" + pageURL + "&title=" + encodeURIComponent(tString);
                            if (jQuery('meta[name="description"]').length) {
                                var dString = jQuery('meta[name="description"]').attr("content");
                                dString = dString.slice(0, 255);
                                shareURL += "&summary=" + encodeURIComponent(dString);
                            }
                            buttonAction = "new";
                        }
                        else if ($(el).hasClass("email-url")){
                            $(el).find("> a").addClass("dellmetrics-emcbutton-email");
                            shareURL = "mailto:?subject=" + encodeURIComponent(document.title) + "&body=" + encodeURIComponent(document.title) + " " + pageURL;
                            buttonAction = "same";
                        }
                        else {
                            jQuery(el).remove();
                        }
                        if (buttonAction == "new") {
                            jQuery(el).find("> a")
                                .attr("href", shareURL)
                                .attr("target", "_blank")
                                .attr("rel", "noopener");
                        } else if (buttonAction == "same") {
                            jQuery(el).find("> a").attr("href", shareURL);
                        }
                    });
                }
            };

            //Run
            create(template, content);

            return {
                element: overlay.$el,
                show: show,
                hide: hide,
                onHide: onHide,
                setTrigger: setTrigger,
                getTrigger: getTrigger,
                callDictionary: callDictionary,
                getRevisedUrl: getRevisedUrl,
                sanitizeUrl: sanitizeUrl
            };
        }
    });
})($j, window.UW || (window.UW = {}));

/* OVERLAY COMPONENT
Description:
Opens an Overlay with a provided content from the Trigger
*/

(function (UW) {
    $j.widget("UW.overlayVideo", {
        options: {
            hash: "video-overlay",
            classEl: ".overlay-video-trigger",
            videoId: 0,
            classInline: ".video-inline",
            minWidthInline: 480
        },
        _create: function() {
            var it = this;
            var oldParameterValue=UW.util.getUrlParameter('vid');
            if (oldParameterValue){UW.util.removeUrlParameter('vid');UW.util.hash.set(it.options.hash, oldParameterValue);}

            //Create Overlay and append it to the body
            it.overlay = UW.util.overlay(UW.templates.overlays["takeover"], UW.templates.video.modal.videoObjectHtml5, true);

            it.overlay.onHide(function() {
                //Removing the hash value to close the overlay
                UW.util.hash.remove(it.options.hash);
                it._pauseVideo();
                if (document.exitPictureInPicture && document.pictureInPictureElement) {
                    document.exitPictureInPicture();
                }
            });

            it.appleios = $("html").hasClass("appleios");
            it.android = $("html").hasClass("android");
            it.isMobile = /iPhone|iPad|iPod|Android|BlackBerry|Windows Phone/i.test($(navigator)[0].userAgent)|| (navigator.userAgentData && navigator.userAgentData.mobile);

            it.overlay.element.find(".content").addClass("content-video");
            it.overlay.element.find(".download").empty();

            UW.overlayVideo = {};

            //Checking if we have a hash, finding first item with the video ID and getting the playId and Key
            UW.overlayVideo.newVideo = UW.util.hash.get(it.options.hash);
            //Finding the first trigger item with the same video id
            if (UW.overlayVideo.newVideo) {
                //Adding the call for metrics requested by Tyrone
                UW.debug.log("UW.overlayVideo._create: Adding [data-video] metric code.");
                it.overlay.setTrigger($j(it.options.classEl+ '[data-video="'+UW.overlayVideo.newVideo+'"]'));
            }
            it._renewPlayer();
            //Create an Object called overlayVideo, this object will store everything about the overlay video
            it._bindEventHandlers();
            UW.util.deepLink(it.options.hash, it._openOverlay, it, true);
        },

        _renewPlayer: function() {
            var it = this;
            it.html5=it.overlay.element.find("video");
            it.html5=it.html5[0];

            // Polyfill for endsWith function (for the included brightcove js below) - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
            if (!String.prototype.endsWith) {
                String.prototype.endsWith = function(search, length) {
                    if (length === undefined || length > this.length) {
                        length = this.length;
                    }
                    return this.substring(length - search.length, length) === search;
                };
            }
        },

        _loadLibrary: function(runAfter){
            var it = this;
            if(!it.libraryLoaded){
                UW.util.loader.js(["//players.brightcove.net/694940018001/kWLcgmDnr_default/index.min.js"],function(){
                    it.libraryLoaded =true;
                    runAfter();
                });
            } else{
                runAfter();
            }
        },

        _initiateBC: function(){
            var it = this;
            it._loadLibrary(function() {
                it.libraryLoaded=true;
                it.videoPlayerbc = bc(it.html5);
                it._heightAnalyze();
                //it.spinner = $(it.html5).nextAll(".vjs-loading-spinner");
                if(!it.appleios) {
                    it.videoPlayerbc.on('loadeddata', function() {
                        //Showing the overlay when the video is ready
                        it._showVideo();
                        it._playVideo();
                    });
                }
                //Just to make sure the video is not playing on the background
                it.videoPlayerbc.on('play', function() {
                    if(!UW.util.hash.get(it.options.hash)) {
                        it._pauseVideo();
                    }
                    else{
                        UW.HVE.triggerHVEEvent("brightcove",{},it.overlay.getTrigger());
                        it._overlaytabbing();
                    }
                });
                it._loadVideo();
            });
        },
        _initiateInlineBC: function(elem){
            var it = this;
            it._loadLibrary(function() {
                var $elem=$j(elem);
                var videoInlineEls=$j(it.options.classEl + it.options.classInline);
                elem.html5=$elem.find("video")[0];
                    elem.videoPlayerbc = bc(elem.html5);
                    elem.videoPlayerbc.catalog.getVideo($elem.attr("data-video"), function(error, video) {
                        if(error) {
                            console.log('Something unexpected happened loading video ' + $elem.attr("data-video") +' !, the error is: ' + video[0].error_code);
                            elem.videoPlayerbc.src("");
                            elem.error = true;
                            $j(elem.html5).show();
                        return;
                        }
                        elem.error = false;
                        $elem[0].videoPlayerbc.catalog.load(video);
                        elem.videoPlayerbc.play();
                    });
                    elem.videoPlayerbc.on('ended',function(){
                        $j($elem[0]).removeClass("video-active");

                    });
                    elem.videoPlayerbc.on('play',function(){
                        UW.HVE.triggerHVEEvent("brightcove",{},it.overlay.getTrigger());
                        videoInlineEls.each(function(){
                            if(this.videoPlayerbc && (this.videoPlayerbc !== $elem[0].videoPlayerbc)){
                                this.videoPlayerbc.pause();
                            }

                        });

                    });
            });


        },
        _showVideo: function() {
            var it = this;
            //it.spinner.hide();
        },

        _overlaytabbing: function(){
            var it = this;
            var firstFocusableElement = $('.uw-overlay.open').find('a:visible:first');
            var lastFocusableElement = $(".uw-overlay.open button.vjs-fullscreen-control");
            if($('.uw-overlay').hasClass("open")){
                document.addEventListener('keydown', function (e) {
                    let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
    
                    if (!isTabPressed) {
                        return;
                    }
    
                    if (e.shiftKey) { // if shift key pressed for shift + tab combination
                        if (document.activeElement=== firstFocusableElement[0]) {
                            lastFocusableElement.focus(); // add focus for the last focusable element
                            e.preventDefault();
                        }
                    } else { // if tab key is pressed
                        if (document.activeElement=== lastFocusableElement[0]) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                            firstFocusableElement.focus(); // add focus for the first focusable element
                            e.preventDefault();
                        }
                    }
                },true);
                firstFocusableElement.focus();
            }
        },

        _hideVideo: function() {
            var it = this;
            if(!it.android) {
                //it.spinner.show();
            }
        },
        _loadVideo : function (){
            var it = this;
            it.videoPlayerbc.catalog.getVideo(UW.overlayVideo.newVideo, function(error, video) {
                if(error) {
                    UW.debug.log("UW.overlayVideo._addVideo: Something unexpected happened loading video " + UW.overlayVideo.newVideo + " !, the error is: " + video[0].error_code);
                    it.videoPlayerbc.src("");
                    it.error = true;
                    setTimeout(function() { 
                        $('#vjs-errors-dialog .vjs-close-button').addClass('hide');
                    }, 10);
                    it._showVideo();
                    return;
                }
                it.error = false;
                it.videoPlayerbc.catalog.load(video);
                if(it._checkIfMobileFullscreen()) {it.videoPlayerbc.requestFullscreen();} 
                window.videoo = it.videoPlayerbc;
            });
        },
        _addVideo: function() {
            var it = this;
            if(it.videoPlayerbc){
                it._loadVideo();
            }
            else{
                it._initiateBC();
            }
        },

        _pauseVideo: function() {
            var it = this;
            if (it.videoPlayerbc){
                it.videoPlayerbc.pause();
            }
        },

        _playVideo: function() {
            var it = this;
            if(it._checkIfMobileFullscreen()) {it.videoPlayerbc.requestFullscreen();} 
            it.videoPlayerbc.play();
        },

        _bindEventHandlers: function() {
            var it = this;
            //Event to close the overlay
            it.overlay.element.on('click', '.vjs-errors-ok-button, .vjs-close-button, .scroll-container', function(e) {
                if (e.target.className === 'vjs-errors-ok-button' || e.target.className === 'vjs-close-button' || (e.target.className === 'scroll-container' && UW.util.getViewport().width >= 980) ) {
                    e.stopPropagation();
                    it._closeOverlay();
                }
            });
            //Event to set the hash, so the overlay will open
            $j("body").on('click', it.options.classEl, function() {

                var $this= $j(this);
                //So users can pause the video
                if ($this.hasClass("video-active")){
                 return;
                }
                if ($this.hasClass("video-inline")){

                    //var imageItem= $this.find(".rendition");
                    //if(imageItem.length && imageItem.width()>it.options.minWidthInline){
                    $this.addClass("video-active");

                    if (this.videoPlayerbc){
                        this.videoPlayerbc.play();
                    }
                    else{
                        it._initiateInlineBC(this);
                    }
                    return;
                    //}
                }
                else {
                    // when video opens in overlay, inline video should be paused
                     var videoInlineEls=$j(it.options.classEl + it.options.classInline);
                    videoInlineEls.each(function(){
                        if(this.videoPlayerbc){
                            this.videoPlayerbc.pause();
                        }
                    });
                }
                //get the Video info
                UW.overlayVideo.newVideo = $j(this).data('video');

                //Brightcove Id length check to handle new 19 digit ID's
                if(UW.overlayVideo.newVideo.length > 13){
                    UW.overlayVideo.newVideo = $j(this).data('video');
                } else {
                    UW.overlayVideo.newVideo = parseInt($j(this).data('video'));
                }

                //Adding the Trigger to be used on the overlay library
                it.overlay.setTrigger($this);
                UW.util.hash.set(it.options.hash, UW.overlayVideo.newVideo);
            });
            window.onkeyup = function (event) {
              if(event.keyCode == 27 && !it.overlay.element.find('video-js').hasClass('vjs-fullscreen')){
                    event.stopPropagation();
                    it._closeOverlay();
                }
            }
        },

        _showOverlay: function() {
            var it = this;
            it.overlay.show();
            it.overlay.element.focus();
            const   heightAnalyzeT = UW.util.throttle(function() {it._heightAnalyze();}, it)
            window.addEventListener("resize", heightAnalyzeT);
            it.overlay.callDictionary();
        },

        _heightAnalyze: function() {
            // adjust video sizing if video height is bigger than overlay viewport
            var paddingHorizontal = ["xsmall", "small"].indexOf(UW.breakpoint.getScreenSize()) != -1 ? 1 : .83333333333;
            var videoRatio = .5625;
            var videoCont = $(".uw-overlay .content-video");
            var vidCard = $(videoCont).parent(".card");
            var vidCardPaddingVertical = parseFloat(vidCard.css("padding-top")) + parseFloat(vidCard.css("padding-bottom"));
            var headerHeight = $(".header-container").height();
            var vidHeight = videoCont.css("height");
            vidHeight = (vidHeight.substring(0, vidHeight.length -2) * 1) + videoCont.offset().top - headerHeight;
            var maxHeight = $(window).height() - headerHeight - vidCardPaddingVertical;
            var maxWidth = Math.min(maxHeight / (videoRatio * paddingHorizontal), $(window).width(), 1600) + "px"; // adjust width of container to proper 16:9 aspect ratio, to keep controls aligned to width of video itself.
            maxHeight  = (maxWidth.substring(0, maxWidth.length -2) * videoRatio * paddingHorizontal) + "px";
            $(".uw-overlay .content-video").css("padding-bottom", maxHeight);
            $(".card").find(".content-video").parent(".card").css({"width":maxWidth}); // to make sure it applies only to video overlay
        },

        _openOverlay: function() {
            var it = this;
            //Close the overlay if the hash doesn't exists
            UW.overlayVideo.newVideo = UW.util.hash.get(it.options.hash);
            if(!UW.overlayVideo.newVideo) {
                it._closeOverlay();
                return false;
            }

            if(it.options.videoId !== UW.overlayVideo.newVideo || it.error) {
                it.options.videoId = UW.overlayVideo.newVideo;

                if(!it.appleios) {
                    it._hideVideo();
                }
                it._addVideo();
            } else {
                it._playVideo();
            }

            it._showOverlay();
        },

        _closeOverlay: function() {
            //Fix To avoid the page scroll top when the overlay is closed
            this.overlay.hide();
        },

        _checkIfMobileFullscreen: function() {
            //Check if a mobile device is being used and if the breakpoint is xsmall, small, or medium
            return (this.isMobile && UW.util.getViewport().width < 980);
        }

    });
})(window.UW || {});

/* OVERLAY COMPONENT
Description:
Opens an Overlay with a provided content from the Trigger
*/
(function (UW) {
    $j.widget("UW.overlayIframe", {
        options: {
            hash: "overlay",
            classEl: ".overlay-iframe-trigger",
            src: "",
            mustTrack: true,
            fileExtensions:['.exe','.zip','.wav','.mp3','.mov','.mpg','.avi','.wmv','.pdf','.doc','.docx','.xls','.xlsx','.ppt','.pptx','.download','.mp4','.xlsm','.dotx','.docm','.ppsx','.vmdk','.ovf','.ova','.mobi','.epub','.ibooks','.gz','.vmoapp','.xlsb','.ics','.pptm']
        },

        _create: function () {
            var it = this;
            //Replace  old parameter with New Hash parameters
            var oldParameterValue=UW.util.getUrlParameter('pdf');
            if (oldParameterValue){UW.util.removeUrlParameter('pdf');UW.util.hash.set(it.options.hash, oldParameterValue);}
            //Create Overlay and append it to the body

            it.overlay = UW.util.overlay(UW.templates.overlays["takeover"], UW.templates.video.modal.iframe, true);

            it.overlay.onHide(function() {
                //Removing the hash value to close the overlay
                UW.util.hash.remove(it.options.hash);
                it.overlay.element.removeClass('overlay-iframe');
                it.overlay.element.removeClass('overlay-pdf');
            });

            UW.overlayIframe = {};

            //Checking if we have a hash, finding first item with the src
            UW.overlayIframe.src = UW.util.hash.get(it.options.hash);
            it._verifyUrl();

            //Finding the first trigger item with the same src
            if (UW.overlayIframe.src) {
                it.overlay.setTrigger($j(it.options.classEl+ '[data-iframe="'+UW.overlayIframe.src+'"]'));

                //The next code is HVE code
                var hrefIsDoc = it.options.fileExtensions.indexOf("." + UW.overlayIframe.src.split(".").pop()) != -1;
                if (hrefIsDoc) {
                    if (window.CustomEvent) {
                        var event = new CustomEvent("hve", {
                            detail: {
                                type: 'download',
                                target: UW.overlayIframe.src
                            },
                            bubbles: true,
                            cancelable: true
                        });
                        $j(window).on('load',function(){
                            document.dispatchEvent(event);
                        });
                    }
                }
            }
            it.iframe = it.overlay.element.find("iframe")[0];

            it._bindEventHandlers();
            UW.util.deepLink(it.options.hash, it._openOverlay, it, true);
        },

        _bindEventHandlers: function() {
            var it = this;
            //Event to close the overlay
            //Event to set the hash, so the overlay will open
            $j("body").on('click', it.options.classEl, function (e) {
                //Removing Domain if it is the same as the page domain
                if(this.hostname == location.hostname){
					this.href=this.pathname;
                }
                //get the iframe url
                UW.overlayIframe.src = $j(this).attr("href");
                it.options.mustTrack = false;
                it._verifyUrl();
                e.preventDefault();
                //e.stopPropagation(); Removing to enable the HVE tracking.
                it.overlay.setTrigger($j(this));
                UW.util.hash.set(it.options.hash, UW.overlayIframe.src);
            });
        },

        _showOverlay: function() {
            function resizeContent(){
                if (UW.breakpoint.getScreenSize() === 'xsmall') {
                    var headerHeight = it.overlay.element.find('.header').outerHeight(),
                        windowHeight = $(window).height();

                    it.overlay.element.find('.content').height(windowHeight - headerHeight);
                }
                else{
                    it.overlay.element.find('.content').css('height', '');
                }

            }

            var OVERLAY_SHOW_MS = 700,
                it = this;
            it.overlay.element.addClass('overlay-iframe');

            // Listener to close overlay
            $j('.overlay-iframe .scroll-container').on('click', function(e) {
                if (e.target.className === 'scroll-container' && UW.util.getViewport().width >= 980) {
                    e.stopPropagation();
                    it._closeOverlay();
                }
            });
            setTimeout(function(){
                it.overlay.show();
                if (UW.overlayIframe.src.indexOf( '.pdf' ) !== -1 && it.options.mustTrack) {
                    it._trackDownload( UW.overlayIframe.src );
                };
                it.overlay.callDictionary();
            }, OVERLAY_SHOW_MS);

            setTimeout(function(){
                setTimeout(resizeContent);
            }, OVERLAY_SHOW_MS + 100);

            $(window).on('resize', function(){
                resizeContent();
            });
        },

        _closeOverlay: function() {
            this.overlay.hide();
        },

        _openOverlay: function() {
            var it = this;

            //Close the overlay if the hash doesn't exists
            UW.overlayIframe.src = UW.util.hash.get(it.options.hash);
            it._verifyUrl();

            if(UW.overlayIframe.src && UW.overlayIframe.src.length > 3 && UW.overlayIframe.src.substr(-3) == "pdf"){it.overlay.element.addClass('overlay-pdf');}

            if (!UW.overlayIframe.src) {
                it._closeOverlay();
                return false;
            }

            if (it.options.src !== UW.overlayIframe.src) {
                it.options.src = UW.overlayIframe.src;
                it.iframe.src = it.overlay.getRevisedUrl(UW.overlayIframe.src);
            }

            // Show/hide the download button
            var hrefIsDoc = it.options.fileExtensions.indexOf("." + UW.overlayIframe.src.split(".").pop()) != -1;
            if (hrefIsDoc) {
                var isMobile = /iPhone|iPad|iPod|Android|BlackBerry|Windows Phone/i.test($(navigator)[0].userAgent)|| (navigator.userAgentData && navigator.userAgentData.mobile);
                if(!isMobile && it.iframe.src) {
                    // hide download icon in blue header bar until new pdf viewer is available
                    // $('.overlay-assets .download a').attr('href', it.iframe.src);
                    // $('.overlay-assets .download').removeClass('hide');
                }
                else {
                    $('.overlay-assets .download').addClass('hide');
                    $('.overlay-assets .download').empty();
                }
            }

            it._showOverlay();
        },
        _verifyUrl: function() {
            if (UW.overlayIframe.src && !UW.util.verifyUrl(UW.overlayIframe.src)) {
                UW.debug.log("Incorrect URL");
                UW.overlayIframe.src = null;
            }
        },
        _addLocale: function(){
            var self = this;
            var regexFileExt = self._buildRegExp();
            var tempURL = UW.overlayIframe.src;
            var subdomain = window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
            if ($j.inArray(subdomain, ['stageprev', 'preview', 'stage']) !== -1){
                if(UW.domainArrayFW[UW.locale.locale] && UW.domainArrayFW[UW.locale.locale].fwLocale != 'www'){
                    subdomain =subdomain + '-' + (UW.domainArrayFW[UW.locale.locale] ? UW.domainArrayFW[UW.locale.locale].fwLocale : 'www') ;
                }
            }
            else{
				subdomain = (UW.domainArrayFW[UW.locale.locale] ? UW.domainArrayFW[UW.locale.locale].fwLocale : 'www');
            }

            //Absolute URLS
            if(/^(https?:)?\/\//i.test(tempURL)){
                tempURL = tempURL.replace( /^(https?:)?/i, '');
                //Temporal fix for removing the domain to solve Cross doamin issues, PDF's not loading the first time.
                if(/\/collaterals\//g.test(tempURL)){
                    tempURL=tempURL.replace(/^.*\/\/[^\/]+/, '');
                }

            }//Relative URLS that start with "/"
            else if(/^(\/)/.test(tempURL)) {
                //FW we don't add the locale, but we change the domain to be a FW domain
                if(/^(\/collateral\/)/g.test(tempURL)){
                    tempURL= "//" + subdomain + ".emc.com" + tempURL;
                }
//                else if(/^(\/collaterals\/)/g.test(tempURL)){
//                    tempURL= "//www.dellemc.com/" + UW.locale.locale + tempURL;
//                }
//                else if(/\/collaterals\//g.test(tempURL)){
//                    tempURL= "//www.dellemc.com" + tempURL;
//                }
                //AEM URL, we don't add the locale, it is already on it or Check if the locale is already on it
                else  if(/^(\/content\/)/g.test(tempURL) || /^(\/[a-z]{2}\-[a-z]{2})/.test(tempURL)){
                    tempURL= "//" + UW.url.host + tempURL;
                }//no locale is detected
                else{
                    tempURL= "//" + UW.url.host + "/" + UW.locale.locale + tempURL;
                }
            }
            //Relative URLs that start with text
            else{
                tempURL= "//" + subdomain + ".emc.com/collateral/" + tempURL;
            }
            tempURL = tempURL.replace(/(\/[a-z]{2}\-[a-z]{2}\/)/,"/" + UW.locale.locale +"/");
            //If PDF and Mobile
            if(/(\.pdf)$/g.test(tempURL) && ( Modernizr.appleios || Modernizr.android || Modernizr.winmobile ) ){
                tempURL = self._applyGoogleView(tempURL);
            }

            var testStr = tempURL;
            var patt = /(\/\D{2}-\D{2}\/)+/g;
            var result = testStr.match(patt);
            if(result != null && result.length >= 2) { /* ex: //test-prevb.delltechnologies.com/en-us/asset/en-us/services/testing/cc.pdf  */
                tempURL = testStr.replace(/(\/\D{2}-\D{2})/, ''); // remove first locale if more than one in param value
            }

            return tempURL;
        },
        _applyGoogleView: function(url) {
            var tempURL = '';
            tempURL=url.replace("//","");
            tempURL='https://docs.google.com/gview?embedded=true&url=' + encodeURIComponent(tempURL);

            return tempURL;
        },
        _buildRegExp: function() {
            var self = this;
            var regex = new RegExp('(' + self.options.fileExtensions.join('|').replace(/\./g, '\\.') + ')$', 'gi');

            return regex;
        },
        _trackDownload: function( url ) {
            if ( url && ( typeof trackUnlockedDownload === 'function' ) ) {
                if ( url.indexOf('//') === 0 ) {
                    url = window.location.protocol + url;
                } else if ( url.indexOf( window.location.protocol + '//' ) !== 0 ) {
                    url = window.location.protocol + '//' + window.location.hostname + url;
                }
                UW.debug.log( 'overlay-iframe.js: _trackDownload(): Calling trackUnlockedDownload("' + url + '")');
                trackUnlockedDownload( url );
                dellmetricsemcautodownload( url );
            }
        }
    });
})(window.UW || {});

/* OVERLAY COMPONENT
Description:
Opens an Overlay with a provided content from the Trigger
*/
(function (UW) {
    $j.widget("UW.overlayImage", {
        options: {
            hash: "image-overlay",
            classEl: ".overlay-image-trigger",
            src: "",
            fileExtensions:['.gif','.jpg','.jpeg','.png','.svg','.tiff']
        },

        _create: function () {
            var it = this;
            // //Replace  old parameter with New Hash parameters
            // var oldParameterValue=UW.util.getUrlParameter('img');
            // if (oldParameterValue){UW.util.removeUrlParameter('img');UW.util.hash.set(it.options.hash, oldParameterValue);}

            //Create Overlay and append it to the body            
            it.overlay = UW.util.overlay(UW.templates.overlays["takeover"], UW.templates.video.modal.image, true);

            it.overlay.onHide(function() {
                //Removing the hash value to close the overlay
                UW.util.hash.remove(it.options.hash);
                it.overlay.element.removeClass('overlay-image');
            });

            UW.overlayImage = {};

            //Checking if we have a hash, finding first item with the src
            UW.overlayImage.src = UW.util.hash.get(it.options.hash);
            it._verifyUrl();

            it._bindEventHandlers();
            UW.util.deepLink(it.options.hash, it._openOverlay, it, true);
        }
        ,

        _bindEventHandlers: function() {
            var it = this;
            //Event to close the overlay
            //Event to set the hash, so the overlay will open
            $j("body").on('click', it.options.classEl, function (e) {
                //Removing Domain if it is the same as the page domain
                if(this.hostname == location.hostname){
					this.href=this.pathname;
                }
                //get the image url 
                UW.overlayImage.src = $j(this).attr("href");

                it._verifyUrl();
                e.preventDefault();
                it.overlay.setTrigger($j(this)); 
                UW.util.hash.set(it.options.hash, UW.overlayImage.src);                  
            });
        },

        _showOverlay: function() {            
            var OVERLAY_SHOW_MS = 700,
                it = this;
            it.overlay.element.addClass('overlay-image');

            // Listener to close overlay
            $j('.overlay-image .scroll-container').on('click', function(e) { 
                if (e.target.className === 'scroll-container' && UW.util.getViewport().width >= 980) { 
                    e.stopPropagation();
                    it._closeOverlay();
                }
            });

            setTimeout(function(){
                it.overlay.show();
                it.overlay.callDictionary();
                it._overlaytabbing();
            }, OVERLAY_SHOW_MS); 

        },

        _closeOverlay: function() {
            $('.overlay-assets .download').addClass('hide');
            this.overlay.hide();
        },

        _openOverlay: function() {
            var it = this;

            //Close the overlay if the hash doesn't exists
            UW.overlayImage.src = UW.util.hash.get(it.options.hash);

            it._verifyUrl();

            if (!UW.overlayImage.src) {
                it._closeOverlay();
                return false;
            }

            if (it.options.src !== UW.overlayImage.src) {
                it.options.src = UW.overlayImage.src;
                it.options.src = it._addLocale();
            }

            // Add the source to the image tag that will show up in the overlay
            $('.image-overlay').attr('src', it.options.src);

            // Show/hide the download button
            var hrefIsDoc = it.options.fileExtensions.indexOf("." + UW.overlayImage.src.split(".").pop()) != -1;
            if (hrefIsDoc) {                    
                var isMobile = /iPhone|iPad|iPod|Android|BlackBerry|Windows Phone/i.test($(navigator)[0].userAgent)|| (navigator.userAgentData && navigator.userAgentData.mobile);
                if(!isMobile && it.options.src) {
                    $('.overlay-assets .download a').attr('href', it.options.src);
                    $('.overlay-assets .download').removeClass('hide');
                }
                else {
                    $('.overlay-assets .download').addClass('hide'); 
                    $('.overlay-assets .download').empty();
                }
            }

            it._showOverlay();
        },
        _verifyUrl: function() {
            if (UW.overlayImage.src && !UW.util.verifyUrl(UW.overlayImage.src)) {
                UW.debug.log("Incorrect URL");
                UW.overlayImage.src = null;
            }
        },

        _overlaytabbing: function(){
            var it = this;
            var firstFocusableElement = $('.uw-overlay.open').find('a:visible:first');
            var lastFocusableElement = $('.uw-overlay.open').find('a:visible:last');
            if($('.uw-overlay').hasClass("open")){
                document.addEventListener('keydown', function (e) {
                    let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
    
                    if (!isTabPressed) {
                        return;
                    }
    
                    if (e.shiftKey) { // if shift key pressed for shift + tab combination
                        if (document.activeElement=== firstFocusableElement[0]) {
                            lastFocusableElement.focus(); // add focus for the last focusable element
                            e.preventDefault();
                        }
                    } else { // if tab key is pressed
                        if (document.activeElement=== lastFocusableElement[0]) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                            firstFocusableElement.focus(); // add focus for the first focusable element
                            e.preventDefault();
                        }
                    }
                },true);
                firstFocusableElement.focus();
            }
        },

        _addLocale: function(){
            var tempURL = UW.overlayImage.src;
            var absURL;
            var subdomain = window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
            if ($j.inArray(subdomain, ['stageprev', 'preview', 'stage']) !== -1){
                if(UW.domainArrayFW[UW.locale.locale] && UW.domainArrayFW[UW.locale.locale].fwLocale != 'www'){
                    subdomain =subdomain + '-' + (UW.domainArrayFW[UW.locale.locale] ? UW.domainArrayFW[UW.locale.locale].fwLocale : 'www') ;
                }
            }
            else{
				subdomain = (UW.domainArrayFW[UW.locale.locale] ? UW.domainArrayFW[UW.locale.locale].fwLocale : 'www');
            }

            //Absolute URLS
            if(/^(https?:)?\/\//i.test(tempURL)){
                tempURL = tempURL.replace( /^(https?:)?/i, '');
                absURL=tempURL;
                //Temporal fix for removing the domain to solve Cross doamin issues, PDF's not loading the first time.
                if(/\/collaterals\//g.test(tempURL)){
                    tempURL=tempURL.replace(/^.*\/\/[^\/]+/, '');
                }
                
            }//Relative URLS that start with "/"
            else if(/^(\/)/.test(tempURL)) {
                //FW we don't add the locale, but we change the domain to be a FW domain
                if(/^(\/collateral\/)/g.test(tempURL)){
                    tempURL= "//" + subdomain + ".emc.com" + tempURL;
                }
                //AEM URL, we don't add the locale, it is already on it or Check if the locale is already on it
                else  if(/^(\/content\/)/g.test(tempURL) || /^(\/[a-z]{2}\-[a-z]{2})/.test(tempURL)){
                    tempURL= "//" + UW.url.host + tempURL;
                }//no locale is detected
                else{
                    tempURL= "//" + UW.url.host + "/" + UW.locale.locale + tempURL;    
                }
                absURL=tempURL;
            }    
            //Relative URLs that start with text
            else{
                tempURL= "//" + subdomain + ".emc.com/collateral/" + tempURL;
                absURL=tempURL;
            }

            return tempURL;
        }
    });
})(window.UW || {});

/* OVERLAY COMPONENT
Description:
Opens an Overlay with a provided content from the Trigger
*/
(function (UW) {
    $j.widget("UW.overlayCustom", {
        options: {
            hash: "overlay-custom",
            classEl: ".overlay-custom-trigger",
            src: "",
            customOverlayID: "",
            customOverlayView: "",
            fileExtensions:[''],
            targetContentAttr: "data-overlay-content-url",
            triggerSelectorVisible: ".custom-overlay-views",
            overlayTakeover: "overlay01",
            overlayModal: "overlay02",
        },

        _create: function () {
            var it = this;
            //Create Overlay views and append it to the body
            it.overlay = UW.util.overlay(UW.templates.overlays["takeover"], UW.templates.video.modal.customOverlay, true);
            it.overlayModal = UW.util.overlay(UW.templates.overlays["modal"], UW.templates.video.modal.customOverlay, true);

            //Open overlay when it opened in newTab
            $('.overlay-custom-trigger').mousedown(function() {
                var currentObject = $(this),
                    dataURL= UW.url.href,
                    dataParam  = currentObject.attr('data-iframe'),
                    overlayParam;
                    if (/(^#|[^&]#)/gi.test(dataURL)){
                        overlayParam = "&overlay-custom=";
                        it._addHref(dataURL, overlayParam, dataParam, currentObject);
                    } else {
                        overlayParam = "#overlay-custom=";
                        it._addHref(dataURL, overlayParam, dataParam, currentObject);
                    }
            });

            it.overlay.onHide(function() {
                //Removing the hash value to close the overlay
                UW.util.hash.remove(it.options.hash);
                it.overlay.element.removeClass('overlay-custom');
                $('.custom-overlay').parent('.content').attr('class', 'content');
                $('.custom-overlay').empty();
            });
            it.overlayModal.onHide(function() {
                //Removing the hash value to close the overlay
                UW.util.hash.remove(it.options.hash);
                it.overlayModal.element.removeClass('overlay-custom');
                $('.custom-overlay').parent('.content').attr('class', 'content');
                $('.custom-overlay').empty();
            });

            UW.overlayCustom = {};

            //Checking if we have a hash, finding first item with the src
            UW.overlayCustom.src = UW.util.hash.get(it.options.hash);
            it._verifyUrl();

            it._bindEventHandlers();
            UW.util.deepLink(it.options.hash, it._openOverlay, it, true);
        },

        _bindEventHandlers: function() {
            var it = this;
            //Event to set the hash, so the overlay will open
            $j("body").on('click', it.options.classEl, function (e) {
                //Removing Domain if it is the same as the page domain
                if(this.hostname == location.hostname){
					this.href=this.pathname;
                }
                //get overlay ID and overlay view
                UW.overlayCustom.customOverlayID = $j(this).attr("data-iframe");
                UW.overlayCustom.customOverlayView = $('[data-id=' + UW.overlayCustom.customOverlayID + ']').attr("data-view");
                //setting background color for the overlay
                it._changeBGColor($('[data-id=' + UW.overlayCustom.customOverlayID + ']').attr("data-bg-color"));
                it._verifyUrl();
                e.preventDefault();
                //set trigger based on the view selected
                (UW.overlayCustom.customOverlayView == it.options.overlayTakeover) ? it.overlay.setTrigger($j(this)) : (UW.overlayCustom.customOverlayView == it.options.overlayModal) ? it.overlayModal.setTrigger($j(this)) : '';
                UW.util.hash.set(it.options.hash, UW.overlayCustom.customOverlayID);
            });

            //Keydown listener to Close the Overlay when we click on Escape button
            document.addEventListener('keydown', function (evt) {
                var e = evt || window.event,
                    isEscape = false;
                    if($('.uw-overlay').hasClass("open")) {
                        if ("key" in e) {
                            isEscape = (e.key === "Escape" || e.key === "Esc");
                        } else {
                            isEscape = (e.keyCode === 27);
                        }
                        if (isEscape) {
                            e.stopPropagation();
                            it._closeOverlay();
                        }
                    }
            });
        },

        _addHref: function(dataURL, overlayParam, dataParam, currentObject) {
            var bindURL, bindHref;
                bindURL = dataURL +  overlayParam + dataParam;
                bindHref = currentObject.attr('href', bindURL);
                bindHref.attr('target','_blank');
        },

        _changeBGColor: function(bgColor) {
            var it = this,
                defaultBGcolor = "bg-tertiary",
                defaultPattern = "bg-light",
                backgroundColor = typeof bgColor === "undefined" ? "" : bgColor.split(" "),
                colorPattern = backgroundColor[0],
                colorType = backgroundColor[1];
                $('.overlay-custom .custom-overlay').parent('.content').css("background-color", "");
                $('.overlay-custom .custom-overlay').parent('.content').removeClass(colorPattern);

            if(bgColor){
                $('.overlay-custom .custom-overlay').parent('.content').addClass(colorPattern);
                $('.overlay-custom .custom-overlay').parent('.content').css("background-color", it._addBGColor(colorType));
            } else{
               $('.overlay-custom .custom-overlay').parent('.content').addClass(defaultPattern);
               $('.overlay-custom .custom-overlay').parent('.content').css("background-color", it._addBGColor(defaultBGcolor));
            }
        },

        _addBGColor: function(colorType) {
            var applyBGColor;
            if(colorType == "bg-tertiary") {
                applyBGColor = "#fff";
            } else if(colorType == "bg-quinary") {
                applyBGColor = "#eee";
            } else if(colorType == "bg-denary") {
                applyBGColor = "#666";
            } else if(colorType == "bg-primary") {
                applyBGColor = "#0076ce";
            } else if(colorType == "bg-septenary") {
                applyBGColor = "#1a1a1a";
            } else if(colorType == "bg-quaternary") {
                applyBGColor = "#000000";
            } else if(colorType == "bg-senary") {
                applyBGColor = "#444444";
            }
            return applyBGColor;
        },

        _showOverlay: function() {
            var OVERLAY_SHOW_MS = 700,
                it = this;
            // Listener to close overlay
            $j('.overlay-custom .scroll-container').on('click', function(e) {
                if (e.target.className === 'scroll-container' && UW.util.getViewport().width >= 980) {
                    e.stopPropagation();
                    it._closeOverlay();
                }
            });

            setTimeout(function(){
                (UW.overlayCustom.customOverlayView == it.options.overlayTakeover) ? it.overlay.show({header:UW.overlayCustom.title, done:setTimeout(function(){UW.util.blazy.reinitialize();},100)}) : (UW.overlayCustom.customOverlayView == it.options.overlayModal) ? it.overlayModal.show({header:UW.overlayCustom.title, done:setTimeout(function(){UW.util.blazy.reinitialize();},100)}) : '';
                it.overlay.callDictionary();
                it._heightAnalyze();
                it._overlaytabbing();
            }, OVERLAY_SHOW_MS);

            // RFQ analytics
            setTimeout(function(){
                if($('.uw-overlay.has-rfq-popup').hasClass('open')){
                    $('.sendOpenMetrics')[0].click();
                }
            }, 3000);
        },

        _overlaytabbing: function () {
            var it = this;
            var firstFocusableElement = $('.uw-overlay.open').find('a:visible:first');
            var lastFocusableElement = $('.uw-overlay.open').find('button:visible:last') || $('.uw-overlay.open').find('a:visible:last');
            document.addEventListener('keydown', function (e) {
                if ($('.uw-overlay').hasClass("open")) {
                    let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

                    if (!isTabPressed) {
                        return;
                    }

                    if (e.shiftKey) { // if shift key pressed for shift + tab combination
                        if (document.activeElement === firstFocusableElement[0]) {
                            lastFocusableElement.focus(); // add focus for the last focusable element
                            e.preventDefault();
                        }
                    } else { // if tab key is pressed
                        if (document.activeElement === lastFocusableElement[0]) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                            firstFocusableElement.focus(); // add focus for the first focusable element
                            e.preventDefault();
                        }
                    }
                }
            }, true);
            firstFocusableElement.focus();
        },

        _heightAnalyze: function() {
            var takeoverHeight = $(".overlay-assets.overlay-custom.takeover .content").height();
            var modalHeight = $(".overlay-assets.overlay-custom.modal .content .custom-overlay").height();
            var windowHeight = $(window).height() * 70 / 100;
            var minHeight = 350;
            $(".takeover .scroll-container").scroll(function() {
                if(takeoverHeight >= windowHeight) {
                    if($(this).scrollTop() > 0){
                        $(".overlay-custom.takeover .overlay-header").addClass("header-drop-shadow");
                    }else{
                        $(".overlay-custom.takeover .overlay-header").removeClass("header-drop-shadow");
                    }
                }
            });
            $(".modal .content").scroll(function() {
                if(modalHeight >= minHeight) {
                    if($(this).scrollTop() > 0){
                        $(".overlay-custom.modal .card .overlay-header").addClass("header-drop-shadow");
                    }else{
                        $(".overlay-custom.modal .card .overlay-header").removeClass("header-drop-shadow");
                    }
                }
            });
            if(UW.breakpoint.breakpoints[UW.breakpoint.getScreenSize()] <= UW.breakpoint.breakpoints["medium"] || takeoverHeight >= windowHeight) {
                $(".overlay-assets.overlay-custom.takeover .scroll-container").css("justify-content","flex-start");
            }else{
                $(".overlay-assets.overlay-custom.takeover .scroll-container").css("justify-content","center");
                $(".overlay-custom.takeover .overlay-header").removeClass("header-drop-shadow");
            }

            if(modalHeight <= minHeight) {
                $(".overlay-assets.overlay-custom.modal .scroll-container").css("align-items","center");
                $(".overlay-custom.modal .card > .content").css("height","auto");
                $(".overlay-custom.modal .card .overlay-header").removeClass("header-drop-shadow");
            }else{
                $(".overlay-assets.overlay-custom.modal .scroll-container").css("align-items","center");
                $(".overlay-custom.modal .card > .content").css("height","auto");
            }
        },

        _closeOverlay: function() {
            (UW.overlayCustom.customOverlayView == this.options.overlayTakeover) ? this.overlay.hide() : (UW.overlayCustom.customOverlayView == this.options.overlayModal) ? this.overlayModal.hide() : '';
        },

        _openOverlay: function() {
            var it = this;
            //Close the overlay if the hash doesn't exists
            UW.overlayCustom.src = UW.util.hash.get(it.options.hash);

            it.overlay.element.addClass('overlay-custom');
            it.overlayModal.element.addClass('overlay-custom');

            it._verifyUrl();

            if (!UW.overlayCustom.src) {
                it._closeOverlay();
                return false;
            }

            if (it.options.src !== UW.overlayCustom.src) {
                it.options.src = UW.overlayCustom.src;
            }

            //Get overlay ID and view for deeplink
            UW.overlayCustom.customOverlayID = UW.overlayCustom.src;
            UW.overlayCustom.customOverlayView = $('[data-id=' + UW.overlayCustom.customOverlayID + ']').attr("data-view");

            // Show/hide share
            UW.overlayCustom.share =  $('[data-id=' + UW.overlayCustom.customOverlayID + ']').attr("data-display-share");

            //Overlay Title
            UW.overlayCustom.title =  $('[data-id=' + UW.overlayCustom.customOverlayID + ']').attr("data-overlay-title");

            //Overlay Alt Text
            UW.overlayCustom.alt =  $('[data-id=' + UW.overlayCustom.customOverlayID + ']').attr("data-overlay-alt");

            //Overlay Background color
            UW.overlayCustom.bgcolor =  $('[data-id=' + UW.overlayCustom.customOverlayID + ']').attr("data-bg-color");

            //Get content to overlay
            it._getOverlayContent(UW.overlayCustom.customOverlayID, UW.overlayCustom.customOverlayView, UW.overlayCustom.share, UW.overlayCustom.title, UW.overlayCustom.alt, UW.overlayCustom.bgcolor);

            it._showOverlay();
        },

        _getOverlayContent: function(overlayDataId, overlayIdView, overlayShare, overlayTitle, overlayAlt, overlayBGColor) {
            var it=this;

            overlayContentUrl = $j('[data-id=' + overlayDataId + ']').attr(it.options.targetContentAttr);
            if(UW.url.host.indexOf("dell.com") > -1) {
                overlayContentUrl = overlayContentUrl.replace(UW.locale.locale,UW.locale.locale +"/dt");
            }

            if((overlayIdView == it.options.overlayTakeover ) || (overlayIdView == it.options.overlayModal)) {
                overlayIdView = (overlayIdView == it.options.overlayTakeover) ? 'takeover' : (overlayIdView == it.options.overlayModal) ? 'modal' : 'default';
            } else {
                UW.util.hash.remove(it.options.hash);
            }

            if(overlayShare == 'true'){
                $j(".overlay-custom"+ "." + overlayIdView).find('.share').addClass("show");
            }
            else if(overlayShare == 'false'){
                $j(".overlay-custom"+ "." + overlayIdView).find('.share').addClass("hide");
            }

            var titleText = $j(".overlay-custom"+ "." + overlayIdView).find('.header-content')[0];

            setTimeout(function(){
                $(titleText).text(overlayTitle);
                $(titleText).attr('aria-label',overlayAlt);
            },800);

            $j.get(overlayContentUrl,function(result) {
                if(!result) {
                    return;
                }
                var overlayContainerEl=$j(".uw-overlay"+ "." + overlayIdView).find('.custom-overlay')[0];
                overlayContainerEl.innerHTML = result;
                $j(document).trigger("ajaxContentLoaded", overlayContainerEl);
                //Need to parse result to check for any JS
                //Trigger a custom event "ajaxContentLoaded"
                //UW.util.ajaxContentLoaded(overlayContainerEl);
            });

            //Apply background color for deeplink scenario
            it._changeBGColor(overlayBGColor);
        },

        _verifyUrl: function() {
            if (UW.overlayCustom.src && !UW.util.verifyUrl(UW.overlayCustom.src)) {
                UW.debug.log("Incorrect URL");
                UW.overlayCustom.src = null;
            }
        }

    });
})(window.UW || {});

/* OVERLAY COMPONENT
Description:
Opens an Overlay with a provided content from the Trigger
*/
(function (UW) {
    $j.widget("UW.overlayAlert", {
        options: {
            hash: "alert-overlay",
            classEl: ".overlay-alert-trigger",
            src: ""
        },

        _create: function () {
            var it = this;
            //Create Overlay and append it to the body            
            it.overlay = UW.util.overlay(UW.templates.overlays["alert"], UW.templates.video.modal.customOverlay, true);

            it.overlay.onHide(function() {
                //Removing the hash value to close the overlay
                UW.util.hash.remove(it.options.hash);
                it.overlay.element.removeClass('overlay-alert');
            });

            UW.overlayAlert = {};

            //Checking if we have a hash, finding first item with the src
            UW.overlayAlert.src = UW.util.hash.get(it.options.hash);

            it._bindEventHandlers();
            UW.util.deepLink(it.options.hash, it._openOverlay, it, true);
        },

        _bindEventHandlers: function() {
            var it = this;
            //Event to close the overlay
            //Event to set the hash, so the overlay will open
            $j("body").on('click', it.options.classEl, function (e) {
                UW.overlayAlert.src = $j(this).attr("href");
                e.preventDefault();
                it.overlay.setTrigger($j(this)); 
                UW.util.hash.set(it.options.hash, UW.overlayAlert.src);                  
            });
        },

        _showOverlay: function() {            
            var OVERLAY_SHOW_MS = 700,
                it = this;
            it.overlay.element.addClass('overlay-alert');
            // Listener to close overlay
            $j('.alert-popup .cta-body').on('click', function(e) { 
                e.stopPropagation();
                it._closeOverlay();
            });
            setTimeout(function(){
                it.overlay.show();
                it.overlay.callDictionary();
            }, OVERLAY_SHOW_MS); 

        },

        _closeOverlay: function() {
            this.overlay.hide();
            $('.general-error').empty();
            $('.alert-img-view img').attr('src', '');
            $('.alert-img-view .img-text').empty();
        },

        _openOverlay: function() {
            var it = this;
            //Close the overlay if the hash doesn't exists
            UW.overlayAlert.src = UW.util.hash.get(it.options.hash);
            if (!UW.overlayAlert.src) {
                it._closeOverlay();
                return false;
            }
            it._showOverlay();
        }
    });
})(window.UW || {});

/* OVERLAY COMPONENT
Description:
Opens an Overlay with a provided content from the Trigger
*/

(function (UW) {
    $j.widget("UW.overlayPdf", {
        options: {
            hash: "pdf-overlay",
            classEl: ".overlay-pdf-trigger",
            classInline: ".pdf-inline",
            clientID: (UW.url.host.indexOf("dell.com") > 0 ? "2af5b9ae89494ff6ad53bdf37783e54b": "1177241c446d497194831c63cb90e9c4"),
            //clientID: "847813766c3e49dfb1445224ccc19404", /* client ID to run locally*/
        },
        _create: function() {
            var it = this,
                OVERLAY_SHOW_MS = 5000;

            //Create Overlay and append it to the body
            it.overlay = UW.util.overlay(UW.templates.overlays["takeover"], UW.templates.video.modal.pdfView, true);

            it.overlay.onHide(function() {
                //Removing the hash value to close the overlay
                UW.util.hash.remove(it.options.hash);
                $(".pdf-container div").empty();
            });

            it.overlay.element.find(".content").addClass("pdf-container");
            it.overlay.element.find(".content").closest(".takeover").addClass("pdf-overlay");

            UW.overlayPdf = {};

            UW.overlayPdf.newPdf = UW.util.hash.get(it.options.hash);

            if (UW.overlayPdf.newPdf) {
                it._initiateBC();
                setTimeout(function(){
                    it._trackDownload( UW.overlayPdf.newPdf);
                }, OVERLAY_SHOW_MS);
                document.addEventListener("adobe_dc_view_sdk.ready", function(){
                    it._adobedcView();
                    it._overlaytabbing();
                });
            }
            it._verifyUrl();
            it._bindEventHandlers();
            UW.util.deepLink(it.options.hash, it._openOverlay, it, true);
        },

        _adobedcView: function(){
            var it = this;
            (UW.url.href.indexOf('//www.dell.com') > 0 || UW.url.href.indexOf('//www.emc.com') > 0 || UW.url.href.indexOf('//www.dellemc.com') > 0 || UW.url.href.indexOf('//www.delltechnologies.com') > 0 || UW.url.href.indexOf('//corporate.delltechnologies.com') > 0) ? it.options.AnalyticsReportSuiteId = "dellglobalonlinemaster" : it.options.AnalyticsReportSuiteId = "dellglobalonlinemasterdev";

            var adobeDCView = new AdobeDC.View({clientId: it.options.clientID, divId: "adobe-dc-view", reportSuiteId: it.options.AnalyticsReportSuiteId});
                adobeDCView.previewFile({
                content:{location: {url: UW.overlayPdf.newPdf}},
                metaData:{fileName: " "}
            }, {defaultViewMode: "FIT_WIDTH", showAnnotationTools: false, showLeftHandPanel: false,
			dockPageControls: false, showPrintPDF: true});
        },

        _loadLibrary: function(){
            var it = this;
            if(!it.libraryLoaded){
                var libs=["https://documentcloud.adobe.com/view-sdk/main.js"];
                if (UW.util.hash.get("pdfAnalytics")|| (UW.plugins && UW.plugins.pdfAnalytics)){
                    libs.unshift("/etc/designs/uwaem/assets/js/uw/_widgets/overlay/appmeasurement.js");
                    libs.unshift("/etc/designs/uwaem/assets/js/uw/_widgets/overlay/visitorapi.js");
                }
                UW.util.loader.js(libs,function(){
                    it.libraryLoaded =true;
                });
            }
        },

        _initiateBC: function(){
            var it = this;
            it._loadLibrary(function() {
                it.libraryLoaded=true;
            });
        },
        _initiateInlineBC: function(elem){
            var it = this;
            it._loadLibrary();
        },

        _bindEventHandlers: function() {
            var it = this;
            //Event to close the overlay
            it.overlay.element.on('click', '.scroll-container','.card', function(e) {
                if ((e.target.className === 'scroll-container' || e.target.className === 'card' && UW.util.getViewport().width >= 980) ) {
                    e.stopPropagation();
                    it._closeOverlay();
                }
            });
            //Event to set the hash, so the overlay will open
            $j("body").on('click', it.options.classEl, function(e) {
                e.preventDefault();
                var $this= $j(this);
                //get the pdf info
                UW.overlayPdf.newPdf = $j(this).data('iframe');
                UW.overlayPdf.newPdf = it.overlay.getRevisedUrl(UW.overlayPdf.newPdf)
                it._initiateInlineBC(this);

                (window.AdobeDC) ? it._adobedcView() : document.addEventListener("adobe_dc_view_sdk.ready", function(){it._adobedcView();it._overlaytabbing();});

                //Adding the Trigger to be used on the overlay library
                it.overlay.setTrigger($this);
                UW.util.hash.set(it.options.hash, UW.overlayPdf.newPdf);
            });

            window.onkeyup = function (event) {
              if(event.keyCode == 27){
                    event.stopPropagation();
                    it._closeOverlay();
                }
            }
        },

        _showOverlay: function() {
            var it = this;
            it.overlay.callDictionary();
            it.overlay.show();
            it.overlay.element.focus();
        },

        _openOverlay: function() {
            var it = this;
            //Close the overlay if the hash doesn't exists
            UW.overlayPdf.newPdf = UW.util.hash.get(it.options.hash);
            if(!UW.overlayPdf.newPdf) {
                it._closeOverlay();
                return false;
            }
            UW.overlayPdf.newPdf = it.overlay.getRevisedUrl(UW.overlayPdf.newPdf);
            it._showOverlay();
            it._verifyUrl();
            var isMobile = /iPhone|iPad|iPod|Android|BlackBerry|Windows Phone/i.test($(navigator)[0].userAgent)|| (navigator.userAgentData && navigator.userAgentData.mobile);
                if(!isMobile) {
                    UW.overlayPdf.newPdf = it.overlay.sanitizeUrl(UW.overlayPdf.newPdf);
                    $('.overlay-assets .download a').attr('href', UW.overlayPdf.newPdf);
                    $('.overlay-assets .download').removeClass('hide');
                }
                else {
                    $('.overlay-assets .download').addClass('hide');
                    $('.overlay-assets .download').empty();
                }
        },

        _closeOverlay: function() {
            //Fix To avoid the page scroll top when the overlay is closed
            this.overlay.hide();
        },

        _verifyUrl: function() {
            if (UW.overlayPdf.newPdf && !UW.util.verifyUrl(UW.overlayPdf.newPdf)) {
                UW.debug.log("Incorrect URL");
                UW.overlayPdf.newPdf = null;
            }
        },

        _overlaytabbing: function(){
            var it = this;
            var isTabPressed;
            var firstFocusableElement = $('.uw-overlay.open').find('a:visible:first');
            var lastFocusableElement = $("#prompt-chat");
            document.addEventListener('keydown', function (e) {
                if ($('.uw-overlay').hasClass("open")) {
                    isTabPressed = e.key === 'Tab' || e.keyCode === 9;

                    if (!isTabPressed) {
                        return;
                    }

                    if (e.shiftKey) { // if shift key pressed for shift + tab combination
                        if (document.activeElement.id === "overlay-hbs-download") {
                            lastFocusableElement.focus(); // add focus for the last focusable element
                            e.preventDefault();
                        }
                    } else { // if tab key is pressed
                        if (document.activeElement.id === "prompt-chat") { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                            firstFocusableElement.focus(); // add focus for the first focusable element
                            e.preventDefault();
                        }
                    }
                }
            }, true);
            firstFocusableElement.focus();
        },

        _trackDownload: function( url ) {
            if ( url && ( typeof dellmetricsemcautodownload === 'function' ) ) {
                if ( url.indexOf('//') === 0 ) {
                    url = window.location.protocol + url;
                } else if ( url.indexOf( window.location.protocol + '//' ) !== 0 ) {
                    url = window.location.protocol + '//' + window.location.hostname + url;
                }
                UW.debug.log( 'overlay-pdf.js: _trackDownload(): Calling trackUnlockedDownload("' + url + '")');
                dellmetricsemcautodownload( url );
            }
        }
    });
})(window.UW || {});

document.addEventListener("keydown", function (a) {
    a = a || window.event;
    if (a.key == "Tab" && document.activeElement) {
        document.activeElement.classList.remove("kb-focus");
        setTimeout(function () {
            document.activeElement.classList.add("kb-focus");
        }, 300);
    }
}, true);
// File: _plugin-loader.js
// Purpose: Pulls in dependent files when matching class is found
// Dependencies:
// - dependencies/uw/_breakpointhandler.js
// - dependencies/uw/core.js
// Notes: List alphabetically unless otherwise stated.


(function() {
	UW = window.UW || {};
    UW.loader = {
        widgetLibrary: null,
        init: function() {
            var jsExt = (UW.util.getUrlParameter("debugClientLibs") ? "" : ".min") + ".js",
        		widgetsPath= "/etc/designs/uwaem/clientlibs/js/widgets/uw/",
        		libsPath="_libs/";
			UW.util.widgetElements = UW.util.widgetElements || {};
            $j.extend(UW.util.widgetElements, {
                "cta-trigger": {
                    widget: "",
                    dependencies: "",
                    runOnce: true,
                    callBack: function() {
                        $j(document).on("click", ".cta-trigger", function(event) {
                            var clickFlag = false;
                            event.stopPropagation();
                            if (event.target.nodeName !== "A") {
                                var ctaTargets=$j(this).find(".cta-target");
                                ctaTargets.each(function(){
                                    var $t = $j(this);
                                    if ($t.is(":visible")){
                                        clickFlag = true;
                                        this.click();
                                    }

                                });
                                if(!clickFlag && ctaTargets[0]) ctaTargets[0].click();
                            }
                        });
                    }
                },
                "widget-form": {
                    widget: "",
                    dependencies: [widgetsPath + "form" + jsExt],
                    callBack: function() {
                        for (var i = 0; i < this.elements.length; i++) {
                            $j(this.elements[i]).form();
                        }
                    }
                },
                "widget-recyclingapp-form": {
                    widget: "recyclingapp-form",
                    dependencies: [widgetsPath + "recyclingapp-form" + jsExt],
                    callBack: "",
                    customClass: "recycle-show" // also defined in recyclingapp-form.js as recycleShowCssClass
                },
                "widget-contactus-form": {
                    widget: "contactus-form",
                    dependencies: [widgetsPath + "contactus-form" + jsExt],
                    callBack: ""
                },
                "widget-contactus-popup": {
                    widget: "contactus-popup",
                    dependencies: [widgetsPath + "contactus-form" + jsExt, widgetsPath + "contactus-popup" + jsExt],
                    callBack: ""
                },
                "widget-rfq-popup": {
                    widget: "rfq-popup",
                    dependencies: [widgetsPath + "rfq-popup" + jsExt],
                    callback: ""
                },
                "widget-livechat": {
                    widget: "livechat",
                    dependencies: [widgetsPath + "livechat" + jsExt],
                    callBack: ""
                },
                "widget-software-download-form": {
                    widget: "software-download-form",
                    dependencies: [widgetsPath + "software-download-form" + jsExt],
                    callBack: ""
                },
                "widget-right-rail": {
                    widget: "chatRightRail",
                    dependencies: [widgetsPath + "right-rail" + jsExt],
                    callBack: ""
                },
                "widget-disclaimer": {
                    widget: "",
                    dependencies: [widgetsPath + "disclaimer" + jsExt],
                    callBack: function() {
                        $j('.nav-copyright').disclaimer();
                    }
                },
                "js-ellipsis": {
                    widget: "ellipsis",
                    dependencies: [libsPath + "ellipsis/jquery.dotdotdot" + jsExt, widgetsPath + "ellipsis" + jsExt],
                    callBack: function() {
                        window.ellipsisElements = this.elements;
                    }
                },
                "dropdown-toc-trigger": {
                    widget: "",
                    dependencies: [widgetsPath + "dropdown-toc" + jsExt],
                    callBack: function() {
                        for (var i = 0; i < this.elements.length; i++) {
                            $j(this.elements[i]).dropdownTOC();
                        }
                    }
                },
                "dropdown-subnav-trigger": {
                    widget: "dropdownSubNav",
                    dependencies: [widgetsPath + "dropdown-subnav" + jsExt],
                },
                "content-submission-form-v2": {
                    widget: "contentSubmissionFormV2",
                    dependencies: [widgetsPath + "content-submission-form-v2" + jsExt],
                    callBack: ""
                },

                "plx-scroll,plx-scroll-inverted,plx-opacity,plx-zoom": {
                    widget: "parallax",
                    dependencies: [widgetsPath + "parallax" + jsExt],
                    callBack: ""
                },

                "overlay-hbs-trigger": {
                    widget: "",
                    dependencies: [widgetsPath + "overlay-hbs" + jsExt],
                    runOnce: true,
                    callBack: function() {
                        this.elements.each(function(index, el) {
                            $j(el).attr("data-key", index);
                        });

                        $j(this.elements[0]).overlayHBS();

                    }
                },
                "overlay-hbs-bio-trigger": {
                    widget: "",
                    dependencies: [widgetsPath + "overlay-hbs" + jsExt],
                    runOnce: true,
                    callBack: function() {
                        this.elements.each(function(index, el) {
                            $j(el).attr("data-key", index);
                        });

                        $j(this.elements[0]).overlayHBS({
                            classEl: ".overlay-hbs-bio-trigger",
                            template: UW.templates.overlays["noHeader"]
                        });
                        $(window).on("overlay-open", function(event, element) {
                            var nameOnTopHeight,
                                sponsorHeaderHeight,
                                sponsorFooterHeight,
                                $container = element.find(".container"),
                                viewportHeight;
                            $j(window).resize(function(event) {
                                var currentBreakpoint = UW.breakpoint.getScreenSize();
                                if (currentBreakpoint === "xsmall") {
                                    nameOnTopHeight = parseInt($(".name-on-top").css("height"));
                                    sponsorHeaderHeight = parseInt($(".company-header").css("height"));
                                    sponsorFooterHeight = parseInt($(".company-footer").css("height"));
                                    viewportHeight = window.innerHeight || document.documentElement.clientHeight || $j('body')[0].clientHeight;
                                    var finalHeight = viewportHeight - nameOnTopHeight - sponsorHeaderHeight - sponsorFooterHeight;
                                    $container.css({
                                        "height": finalHeight + "px"
                                    });
                                } else {
                                    $container.removeAttr("style");
                                }
                            }).trigger('resize');
                        });
                    }
                },
                "overlay-bio-trigger": {
                    widget: "overlay-bio",
                    dependencies: [widgetsPath + "overlay-bio" + jsExt],
                    callBack: ""
                },
                "overlay-video-trigger": {
                    widget: "",
                    dependencies: "",
                    runOnce: true,
                    callBack: (function() {
                        if (UW.util.hash.get("video-overlay")) {
                            $j("body").overlayVideo();
                        } else {
                            return function() {
                                $j(this.elements[0]).overlayVideo();
                            };
                        }
                    })()
                },
                "overlay-iframe-trigger": {
                    widget: "",
                    dependencies: "",
                    runOnce: true,
                    callBack: (function() {
                        if (UW.util.hash.get("overlay")) {
                            $j("body").overlayIframe();
                        } else {
                            return function() {
                                $j(this.elements[0]).overlayIframe();
                            };
                        }
                    })()

                },
                "overlay-image-trigger": {
                    widget: "",
                    dependencies: "",
                    runOnce: true,
                    callBack: (function() {
                        if (UW.util.hash.get("image-overlay")) {
                            $j("body").overlayImage();
                        } else {
                            return function() {
                                $j(this.elements[0]).overlayImage();
                            };
                        }
                    })()
                },
                "overlay-custom-trigger": {
                    widget: "",
                    dependencies: "",
                    runOnce: true,
                    callBack: (function() {
                        if (UW.util.hash.get("overlay-custom")) {
                            $j("body").overlayCustom();
                        } else {
                            return function() {
                                $j(this.elements[0]).overlayCustom();
                            };
                        }
                    })()

                },
                "overlay-alert-trigger": {
                    widget: "",
                    dependencies: "",
                    runOnce: true,
                    callBack: (function() {
                        if (UW.util.hash.get("overlay-alert")) {
                            $j("body").overlayAlert();
                        } else {
                            return function() {
                                $j(this.elements[0]).overlayAlert();
                            };
                        }
                    })()
                },
                "overlay-pdf-trigger": {
                    widget: "",
                    dependencies: "",
                    runOnce: true,
                    callBack: (function() {
                        if (UW.util.hash.get("pdf-overlay")) {
                            $j("body").overlayPdf();
                        } else {
                            return function() {
                                $j(this.elements[0]).overlayPdf();
                            };
                        }
                    })()

                },
                "overlay-youtube-trigger": {
                    widget: "",
                    dependencies: "",
                    runOnce: true,
                    callBack: (function() {
                        if (UW.util.hash.get("youtube-overlay")) {
                            $j("body").overlayYoutube();
                        } else {
                            return function() {
                                $j(this.elements[0]).overlayYoutube();
                            };
                        }
                    })()

                },
                "dropdown-trigger": {
                    widget: "",
                    dependencies: "",
                    runOnce: true,
                    callBack: (function() {
                        $(".cta-dropdown").parents('.btn-wrapper').css('max-width','300px');
                        $(".cta-dropdown").click(function(event) {
                            $(this).toggleClass('open');
                            if($(this).hasClass('open')){
                                $(this).parents('.col').css('overflow-y','inherit');
                            }
                            else{
                                 $(this).parents('.col').css('overflow-y','hidden');
                            }
                         });

                         $(".cta-dropdown li").click(function(e){
                            $selElement = $(this).parents('.cta-dropdown');
                            $selDefaultText = $selElement.find('.form-text');
                            if($selDefaultText.text() !=  $(this).text()){
                                $selElement.find('li').removeClass('active');
                            }
                            $selElement.find('a').removeClass('disabled');
                            $selDefaultText.text($(this).text());
                            $(this).toggleClass('active');
                            if($(this).hasClass('active')){
                                $(this).find('a').addClass('disabled');
                            }
                            if($(this).parents(".dropdown-option").find('li').hasClass('active') == false){
                                $selDefaultText.text($selDefaultText.attr('default-text'));
                            }
                         });

                         $(document).on('click', function(event){
                            var trigger = $('.cta-dropdown');
                            if(trigger !== event.target && !trigger.has(event.target).length){
                                $('.cta-dropdown').removeClass('open');
                                $('.cta-dropdown').parents('.col').css('overflow-y','hidden');
                            }
                        });
                    })()
                },
                "split-v3-view": {
                    widget: "",
                    dependencies: [widgetsPath + "split-v3" + jsExt],
                    callBack: ""
                },
                "intel-brand": {
                    widget: "uwIntelBrand",
                    dependencies: [widgetsPath + "intel-brand" + jsExt],
                    callBack: ""
                },
                "twitter-feed": {
                    widget: "twitterFeed",
                    dependencies: [widgetsPath + "twitter" + jsExt, libsPath + "moment/moment.js"],
                    callBack: ""
                },
                "twitter-cards": {
                    widget: "twitterCards",
                    dependencies: [widgetsPath + "twitter-cards" + jsExt, libsPath + "moment/moment.js"],
                    callBack: ""
                },
                "uw-selector": {
                    widget: "uwSelector",
                    dependencies: [widgetsPath + "selector" + jsExt],
                    callBack: ""
                },
                "video-inline-trigger": {
                    widget: "videoPlayer",
                    dependencies: [widgetsPath + "videoPlayer" + jsExt],
                    runOnce: true,
                    callBack: function() {
                        $j(document).on("click.accordion-trigger", function() {
                            var inlineVideos = $j('.video-container-wrap.old');
                            inlineVideos.remove();
                            $j('.video-container-wrap').addClass('old');
                        });
                    }
                },
                "widget-accordion": {
                    widget: "accordion",
                    dependencies: [widgetsPath + "accordion" + jsExt],
                    callBack: ""
                },
                "widget-carousel": {
                    widget: "carousel",
                    dependencies: [libsPath + "hammer/jquery.hammer.min.js", widgetsPath + "carousel" + jsExt],
                    callBack: function() {
                        $j(document).ready(function(){
                            if(window.ellipsisElements !== undefined){
                                window.ellipsisElements.each(function(index, el) {
                                    $j(el).trigger("update.dot");
                                });
                            }
                        });

                    }
                },
                "widget-carousel-v3": {
                    widget: "carouselV3",
                    dependencies: [libsPath + "hammer/jquery.hammer.min.js", widgetsPath + "carousel-v3" + jsExt],
                    callBack: ""
                },
                "gallery-v2-view": {
                    widget: "galleryV2",
                    dependencies: [widgetsPath + "views/gallery-v2" + jsExt],
                    callBack: ""
                }, //Gallery needs to be after Widget Carousel
                "widget-dropdown": {
                    widget: "dropdown",
                    dependencies: [widgetsPath + "dropdown" + jsExt],
                    callBack: ""
                },
                "widget-collapse": {
                    widget: "",
                    dependencies: [widgetsPath + "collapse" + jsExt],
                    callBack: function() {
                        $j($j(".dashboard-view .widget-collapse")[0]).collapse({
                            triggerSelector: ".dashboard-view .collapse-trigger"
                        });
                        $j($j(".collapse-control .widget-collapse")[0]).collapse({
                            triggerSelector: ".collapse-control .collapse-trigger"
                        });
                    }
                },
                "widget-pagination": {
                    widget: "pagination",
                    dependencies: [libsPath + "hammer/jquery.hammer.min.js", widgetsPath + "pagination" + jsExt],
                    callBack: ""
                },
                "widget-slider": {
                    widget: "uwSlider",
                    dependencies: [widgetsPath + "slider" + jsExt],
                    callBack: ""
                },
                "widget-sticky": {
                    widget: "",
                    dependencies: [libsPath + "sticky/jquery.sticky" + jsExt, widgetsPath + "sticky" + jsExt],
                    callBack: function() {
                        UW.util.sticky = {
                            stickyItems: [],
                            stickyItemsHeight: 0
                        };
                        UW.util.sticky.globalNav = $("#globalnav-header-wrap");
                        var totalTopSpace = (UW.util.sticky.globalNav !== undefined) ? UW.util.sticky.globalNav.height() : 0;
                        $(".widget-sticky").each(function() {
                            var stickyElement = $(this);
                            elementHeight = stickyElement.outerHeight();
                            stickyElement.unstick();
                            stickyElement.sticky({
                                topSpacing: totalTopSpace,
                                zIndex: 9000
                            });
                            totalTopSpace += elementHeight;
                        });
                    }
                },
                "widget-tab": { //Dashboard
                    widget: "accordion",
                    dependencies: [widgetsPath + "accordion" + jsExt],
                    callBack: function() {
                        var self = this;
                        UW.util.onBreakpointChange(function() {
                            if (UW.breakpoint.breakpoints[UW.breakpoint.getScreenSize()] >= UW.breakpoint.breakpoints.large) {
                                self.elements.each(
                                    function(index, el) {
                                        el.options.toggle = false;
                                        el.options.animationIn = "fadeIn";
                                        el.options.animationOut = "fadeOut";
                                    });
                            } else {
                                self.elements.each(
                                    function(index, el) {
                                        el.options.toggle = true;
                                        el.options.animationIn = "slideDown";
                                        el.options.animationOut = "slideUp";
                                    });
                            }

                        }, true, self);
                    }
                },
                "widget-tab-nav": { //Tab control that has the accordion html structure(trigge-target,trigger-target...)
                    widget: "accordion",
                    dependencies: [widgetsPath + "accordion" + jsExt],
                    callBack: ""
                },
                "widget-tab-v2": { //Tab control with all triggers in one container and targets in another container
                    widget: "tab",
                    dependencies: [widgetsPath + "tab" + jsExt],
                    callBack: ""
                },
                "widget-tab-v3": { //Tab control with all triggers in one container and targets in another container
                    widget: "tab-v3",
                    dependencies: [widgetsPath + "tab-v3" + jsExt],
                    callBack: ""
                },
                "widget-tab-control": { //Tab control with all triggers in one container and targets in another container
                    widget: "tabControl",
                    dependencies: [widgetsPath + "tab-control" + jsExt],
                    callBack: ""
                },
                "widget-tooltip": { //Tooltip
                    widget: "tooltip",
                    dependencies: [widgetsPath + "tooltip" + jsExt],
                    callBack: ""
                },
                "uw-scroll-top": {
                    widget: "uwScrollTop",
                    dependencies: [widgetsPath + "scroll-top" + jsExt],
                    callBack: ""
                },
                "js-same-height": {
                    widget: "",
                    sameHeightObserver: false,
                    callBack: function() {
                        if(this.sameHeightObserver) {
                            let self = this;
                            this.elements.each(function() {
                                self.sameHeightObserver.add(this, false);
                            });
                        } else {
                            UW.instances = UW.instances || {};
                            UW.instances.sameHeightObser = this.sameHeightObserver = new VisibilityObserver({
                                action: "matchHeight",
                                freq: 'onResize',
                                threshold: 0.4
                            });
                        }
                    }
                },
                "widget-category-nav": {
                    widget: "categoryNav",
                    dependencies: [widgetsPath + "views/category-nav" + jsExt],
                    callBack: function() {
                        $j(document).ready(function(){
                            $j('.hero:eq(0) .wrapper').addClass('has-category-nav');
                        });
                    }
                },
                "widget-footnotes": {
                    widget: "footNotes",
                    dependencies: [widgetsPath + "views/footnotes" + jsExt]
                },
                "widget-breadcrumb04": {
                    widget: "breadcrumb04",
                    dependencies: [widgetsPath + "views/breadcrumb04" + jsExt],
                    callBack: ""
                },
                "widget-scroll": {
                    widget: "scroll",
                    dependencies: [widgetsPath + "scroll" + jsExt],
                    callBack: ""
                },
                "widget-map": {
                    widget: "mapWidget",
                    dependencies: ["//maps.googleapis.com/maps/api/js?key=1", libsPath + "bootstrap/bootstrap.min.js", libsPath + "addEvent/ate.min.js", widgetsPath + "map" + jsExt],
                    callBack: ""
                },
                "map-picker-page": {
                    widget: "pickerPageMap",
                    dependencies: ["//maps.googleapis.com/maps/api/js?key=1", libsPath + "bootstrap/bootstrap.min.js", libsPath + "addEvent/ate.min.js", widgetsPath + "picker-page-map" + jsExt],
                    callBack: ""
                },
                "widget-agenda": {
                    widget: "agendaWidget",
                    dependencies: [widgetsPath + "views/agenda" + jsExt],
                    callBack: ""
                },
                "widget-page-picker": {
                    widget: "pagePickerWidget",
                    dependencies: [libsPath + "moment/moment.js", widgetsPath + "views/page-picker" + jsExt],
                    callBack: ""
                },
                "widget-layout-dynamic": {
                    widget: "layout-dynamic",
                    dependencies: [widgetsPath + "layout-dynamic" + jsExt],
                    callBack: ""
                },
                "widget-image-info": {
                    widget: "image-info",
                    dependencies: [widgetsPath + "image-info" + jsExt],
                    callBack: ""
                },
                "widget-sw-license": {
                    widget: "swLicenseRequestForm",
                    dependencies: [widgetsPath + "sw-license-request-form" + jsExt],
                    callBack: ""
                },
                "accordion-schedule-archive-widget": {
                    widget: "accordionScheduleArchive",
                    dependencies: [widgetsPath + "accordion-schedule-archive" + jsExt],
                    callBack: ""
                },
                "append-url-params": {
                    widget: "",
                    dependencies: [],
                    callBack: function() {
                        UW.util.appendCurrentParamsToAllLinks();
                    }
                },
                "copy-clipboard-loader": {
                    widget: "",
                    dependencies: [widgetsPath + "copy-clipboard" + jsExt, libsPath + "clipboardjs/clipboard.js"],
                    callBack: ""
                 }
            });
            this.widgetLibrary = UW.util.widgetElements;
        },
        _usingElements: function(widgetElementsList, widget) {
			return widgetElementsList.filter(function(item) {
                var widgetArr = widget.split(","),
                    isUsed = false;
                    for(var i = 0; i < widgetArr.length; i++) {
                        if(item.classList.contains(widgetArr[i])) {
                        isUsed = true;
                    }
                }
                return isUsed;
            })
        },
        load: function(domElement) {
            const _keys = Object.keys(this.widgetLibrary),
           		  widgetElementsArray = [],
                  self = this;

			for(i=0; i < _keys.length; i++) {
                classes = _keys[i].split(',');
                for(classId=0; classId < classes.length; classId++) {
                    widgetElementsArray.push("." + classes[classId]);
                }
            }
			const widgetElementsList = Array.prototype.slice.call(domElement.querySelectorAll(widgetElementsArray.join(",")));
			$j(_keys).each(function(idx,widget) {
            	var elements = self._usingElements(widgetElementsList, widget);
                if(elements.length > 0) {
                	var el = "." + widget.split(",").join(",."),
                    	widgetObj = self.widgetLibrary[widget];
                    widgetObj.elements = $j(elements);
                    var runCode = function() {
                    	try {
                        	if (widgetObj.widget) {
                            	widgetObj.elements[widgetObj.widget]();
                            }
                            if (widgetObj.callBack) {
                                widgetObj.callBack.apply(widgetObj);
                                if(widgetObj.runOnce) {
                                	delete self.widgetLibrary[widget];
                                }
                            }
                        }
                        catch(error) {
                	        console.log(el + " " + error );
                        }
                    };
                   	//Check if it has dependencies
                   	if (widgetObj.dependencies) {
                    	//Adding the prefix UW.util.assets.js to the dependencies
                        widgetObj.dependencies = widgetObj.dependencies.map(function(widgetElement) {
                            if (widgetElement[0] !== "/" && widgetElement.indexOf("http")==-1 ) { // such as "_libs"
                                return UW.util.assets.js + widgetElement;
                            }
                            return widgetElement;
                        });
                        //Using the loader to load the dependencies
                        UW.util.loader.js(widgetObj.dependencies, function() {
                            runCode();
                        });
                    } else { //Running the widget and callback code directly
                        runCode();
                    }
                }
            });
        }
    }
    UW.loader.init();
})();

$j(function() {
    UW.loader.load(document);
    // iOS Orientation Change - BugFix
    if (Modernizr.appleios) {
        UW.util.loader.js([UW.util.assets.js + '_libs/ios/ios-orientationchange-fix.min.js']);
    }
    UW.util.loader.js(['/etc/designs/uwaem/assets/js/uw/hve.min.js']);
    //Fix for custom text links that open pdf in an overlay
    if ($j(".overlay-iframe-trigger").length==0 && $j('a[href^="#overlay="]').length>0){
        $j("body").overlayIframe();
    }
    UW.instances = UW.instances || {};
    UW.instances.imageObserver = new VisibilityObserver({
        action: "imageLoader",
        freq: 'onBpChange'
    });
});

(function ($, UW) {
    
    UW.util.anchorWidget = function (domContainer) {
        var anchorHash = 'anchor',
            anchorLinks = $(domContainer).find('a[href*="' + anchorHash + '="]'),
            anchorTarget = UW.util.hash.get(anchorHash),
            headerSize = 100,
            animationTime = 1000,
            adjustTime = 400,
            delay= 600,
            activeTargetClass = 'anchor-active',
            prevTarget = $(''),
            scrollToTarget = function (target) {
                target = $('#' + target);
                target = target.length ? target : $('[name=' + $(this).attr("data-anchor") + ']');
                // Does a scroll target exist?
                prevTarget.removeClass(activeTargetClass);
                if (target.length) {
                    prevTarget = target;
                    prevTarget.addClass(activeTargetClass);
                    //var tabParent=target.parents(".tab-target");
                    //if (tabParent.length){

                    //}
                    $('html, body,.tab-target').animate({
                        scrollTop: (target.offset().top - headerSize)
                    }, animationTime).promise().then(function() {
                        setTimeout(function(){
                            $('html, body,.tab-target').animate({
                                scrollTop: (target.offset().top - headerSize)
                            }, adjustTime)
                        }, delay);
                    });
                }
            };
        anchorLinks.each(function (i, el) {
            var $el = $(el);
            $el.attr("data-anchor", UW.util.hash.getAll($el.attr("href"))["anchor"]);
        });

        if (anchorTarget && 'scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        if(document.readyState === "complete") {
            doScroll();
        } else {
        	window.addEventListener("load", doScroll);
        }

        function doScroll() {
			if (anchorTarget) {
                scrollToTarget(anchorTarget);
            }
        }
        
        anchorLinks.on('click', function (event) {
            var targetVal = $(this).attr("data-anchor");
            event.preventDefault();
            event.stopPropagation();
            UW.util.hash.set(anchorHash, targetVal);
            scrollToTarget(targetVal);
        });

        UW.util.header=$j("#ghf-header-container");

        UW.util.getHeaderHeight=function(){
            var headerHeight,
                bp = UW.breakpoint.getScreenSize(),
                isSmall=(bp =='xsmall' || bp == 'small' || bp == 'medium');
            if (headerHeight=UW.util.header.height()){
                if (headerHeight>70){
                    return isSmall ? 200 : 285;
                }
                else{
                    return isSmall ? 100 : 180;
                }
            }
            else{
                 return 100;
            }
        };
        //Regular Anchors    
        $(domContainer).find('a[href*="#"]')
            // Remove links that don't actually link to anything
            .not('[href="#"]')
            .not('[href="#0"]')
            .not('[href*="="]')
            .click(function (event) {
                // On-page links
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname && !$(this).hasClass("category-nav-link")) {
                    // Figure out element to scroll to
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    // Does a scroll target exist?
                    if (target.length) {
                        var scrollAnimationTime = 1000;
                        event.preventDefault();
                        UW.util.hash.set(this.hash, '');
                        $('html, body').animate({
                            scrollTop: (target.offset().top - UW.util.getHeaderHeight())
                        }, scrollAnimationTime);
                    }
                }
            });
    }
})($j, window.UW || (window.UW = {}));

UW.util.anchorWidget(document);

$j( document ).on( "ajaxContentLoaded", function( event, domElement) {
    UW.util.anchorWidget(domElement);
    UW.loader.load(domElement);
    //componentObserver.add(domElement);
    UW.instances.imageObserver.add(domElement);
    var scriptsEl = $j(domElement).find("script");
    scriptsEl.each(function(){
        var scriptSrc=this.getAttribute("src");
        if(scriptSrc){
            UW.util.loader.js(scriptSrc);
        }
    });
});

