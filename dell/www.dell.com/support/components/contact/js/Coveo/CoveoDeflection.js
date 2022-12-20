(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else if (typeof exports === 'object')
        exports["CoveoExtension"] = factory();
    else
        root["CoveoExtension"] = factory();
})(this, function () {
    return /******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
                /******/
            };
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
            /******/
        }
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
        /******/
    })
/************************************************************************/
/******/([
/* 0 */
/***/ (function (module, exports, __webpack_require__) {

            module.exports = __webpack_require__(1);


            /***/
        }),
/* 1 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";
            var _this = this;
            var Deflection_1 = __webpack_require__(2);
            exports.Deflection = Deflection_1.Deflection;
            var DeflectionViewMore_1 = __webpack_require__(3);
            exports.DeflectionViewMore = DeflectionViewMore_1.DeflectionViewMore;
            var CustomClick_1 = __webpack_require__(5);
            exports.CustomClick = CustomClick_1.CustomClick;
            var Version_1 = __webpack_require__(6);
            exports.custoVersion = Version_1.custoVersion;
            // Webpack output a library target with a temporary name.
            // This is to allow end user to put CoveoPSComponents.js before or after the main CoveoJsSearch.js, without breaking
            // This code swap the current module to the "real" Coveo variable.
            var swapVar = function () {
                if (window['Coveo'] == undefined) {
                    window['Coveo'] = _this;
                }
                else {
                    _.each(_.keys(_this), function (k) {
                        window['Coveo'][k] = _this[k];
                    });
                }
            };
            swapVar();


            /***/
        }),
/* 2 */
/***/ (function (module, exports) {

            "use strict";
            var __extends = (this && this.__extends) || function (d, b) {
                for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var Component = Coveo.Component;
            var Initialization = Coveo.Initialization;
            var ComponentOptions = Coveo.ComponentOptions;
            /**
             * This component
             */
            var Deflection = (function (_super) {
                __extends(Deflection, _super);
                function Deflection(element, options, bindings, result) {
                    var _this = this;
                    _super.call(this, element, Deflection.ID, bindings);
                    this.element = element;
                    this.options = options;
                    this.result = result;
                    this.HIDDEN_CLASS = 'coveo-hidden';
                    this.chatSubmitButton = {
                        name: 'submitButton',
                        type: 'chat'
                    };
                    this.chatCancelButton = {
                        name: 'cancelButton',
                        type: 'chat'
                    };
                    this.chatInputChange = {
                        name: 'inputChange',
                        type: 'chat'
                    };
                    this.options = ComponentOptions.initComponentOptions(element, Deflection, options);
                    // Initialization Events
                    this.bind.onRootElement(Coveo.InitializationEvents.afterComponentsInitialization, function () { return _this.handleAfterComponentsInit(); });
                    // Query events
                    this.bind.onRootElement(Coveo.QueryEvents.querySuccess, function (args) { return _this.handleQuerySucess(args); });
                    this.bind.onRootElement(Coveo.QueryEvents.buildingQuery, function (args) { return _this.handleBuildingQuery(args); });
                }
                Deflection.prototype.handleAfterComponentsInit = function () {
                    var _this = this;
                    if (this.options.context.isEMCProduct == 'true') {
                        this.handleBeforeFirstQuery();
                    }
                    else {
                        this.executeQuery(Coveo.analyticsActionCauseList.interfaceLoad);
                    }
                    Coveo.$$(document.body).findClass(this.options.inputFieldSelector).forEach(function (el) { return Coveo.$$(el).on('input', function () { return _this.handleFieldChange(); }); });
                    Coveo.$$(document.body).findClass(this.options.submitButtonSelector).forEach(function (el) { return Coveo.$$(el).on('click', function () { return _this.handleSubmitButton(el); }); });
                    Coveo.$$(document.body).findClass(this.options.cancelButtonSelector).forEach(function (el) { return Coveo.$$(el).on('click', function () { return _this.handleCancelButton(el); }); });
                };
                Deflection.prototype.handleBeforeFirstQuery = function () {
                    var self = this;
                    // var searchHub = this.getSearchHub();
                    var textAreaIds = Coveo.$$(document.body).findClass(this.options.inputFieldSelector);
                    var textAreaValues = "";
                    if (textAreaIds.length > 0) {
                        textAreaIds.forEach(function (el) {
                            if (el.value != undefined && el.value != "")
                                textAreaValues += el.value;
                        });
                    }
                    var ETApromise = new Promise(function (resolve, reject) {
                        var req = {
                            q: '@commont3tagids=' + self.options.context.productCode,
                            aq: '@kbarticletype=ETA',
                            numberOfResults: 1,
                            sortCriteria: '@date descending'
                        };
                        if (textAreaValues.length > 0) {
                            Coveo.SearchEndpoint.endpoints['default'].search(req).done(function (data) {
                                resolve(data);
                            });
                        }
                    });
                    var ESApromise = new Promise(function (resolve, reject) {
                        var req = {
                            q: '@commont3tagids=' + self.options.context.productCode,
                            aq: '@kbarticletype=ESA',
                            numberOfResults: 1,
                            sortCriteria: '@date descending'
                        };
                        if (textAreaValues.length > 0) {
                            Coveo.SearchEndpoint.endpoints['default'].search(req).done(function (data) {
                                resolve(data);
                            });
                        }
                    });
                    Promise.all([ETApromise, ESApromise]).then(function (_a) {
                        var eta = _a[0], esa = _a[1];
                        console.log(eta.results.length);
                        console.log(esa.results.length);
                        _.each(eta.results, function (res) {
                            self.options.context.etaarticle = res.raw.urihash;
                        });
                        _.each(esa.results, function (res) {
                            self.options.context.esaarticle = res.raw.urihash;
                        });
                        self.executeQuery(Coveo.analyticsActionCauseList.interfaceLoad);
                    });
                };
                // private getSearchHub():string{
                //   var searchHub = 'default';
                //   var coveoUAel = <HTMLElement>document.querySelector('.CoveoAnalytics');
                //   var coveoUAcmp = <Coveo.Analytics>Coveo.Component.get(coveoUAel, Coveo.Analytics);
                //   if (coveoUAcmp.options && coveoUAcmp.options.searchHub) {
                //     searchHub = coveoUAcmp.options.searchHub;
                //   }
                //   return searchHub;
                // }
                Deflection.prototype.executeQuery = function (cause) {
                    var _this = this;
                    this.searchInterface.queryController.deferExecuteQuery({
                        beforeExecuteQuery: function () {
                            _this.searchInterface.usageAnalytics.logSearchEvent(cause, {});
                        }
                    });
                };
                Deflection.prototype.handleSubmitButton = function (el) {
                    if (this.options.type == 'case') {
                        var cause = Coveo.analyticsActionCauseList.caseCreationSubmitButton;
                    }
                    else {
                        var cause = this.chatSubmitButton;
                    }
                    this.searchInterface.usageAnalytics.logCustomEvent(cause, {}, el);
                };
                Deflection.prototype.handleCancelButton = function (el) {
                    if (this.options.type == 'case') {
                        var cause = Coveo.analyticsActionCauseList.caseCreationCancelButton;
                    }
                    else {
                        var cause = this.chatCancelButton;
                    }
                    this.searchInterface.usageAnalytics.logCustomEvent(cause, {}, el);
                };
                Deflection.prototype.handleFieldChange = function () {
                    var _this = this;
                    if (this.options.type == 'case') {
                        var cause = Coveo.analyticsActionCauseList.caseCreationInputChange;
                    }
                    else {
                        var cause = this.chatInputChange;
                    }
                    this.cancelAnyPendingSearchTimeout();
                    this.searchTimeout = setTimeout(function () {
                        _this.executeQuery(cause);
                    }, this.options.refreshDelay);
                };
                Deflection.prototype.cancelAnyPendingSearchTimeout = function () {
                    if (Coveo.Utils.exists(this.searchTimeout)) {
                        clearTimeout(this.searchTimeout);
                        this.searchTimeout = undefined;
                    }
                };
                Deflection.prototype.handleQuerySucess = function (args) {
                    if (args.results.totalCount == 0) {
                        Coveo.$$(this.root).addClass(this.HIDDEN_CLASS);
                    }
                    else {
                        Coveo.$$(this.root).removeClass(this.HIDDEN_CLASS);
                    }
                    var callbackfunc = window.coveoQuerySuccess;
                    callbackfunc.call(this);
                    resultduration = args.results.duration;
                };
                Deflection.prototype.handleBuildingQuery = function (args) {
                    args.queryBuilder.context = {};
                    var textAreaIds = Coveo.$$(document.body).findClass(this.options.inputFieldSelector);
                    if (textAreaIds.length > 0) {
                        var textAreaValues = "";
                        textAreaIds.forEach(function (el) {
                            if (el.value != undefined && el.value != "" && el.hasAttribute('data-coveo-id'))
                                textAreaValues += el.value.toLowerCase();
                        });
                        if (textAreaValues.length <= coveoMaxLength) {
                            $('.popoverPosition').popover('dispose');
                            args.cancel = true;
                            return false;
                        }
                        else {
                            var typedWords = [];
                            typedWords = textAreaValues.split(/(\s+)/);
                            if (typedWords.length > 0) {
                                typedWords.forEach(function (word, index) {
                                    if (word != "" && stopKeywords.indexOf(word) > -1 && index == 0) {
                                        $('.popoverPosition').popover('dispose');
                                        args.cancel = true;
                                        return false;
                                    }
                                    else if (word != "") {
                                        args.cancel = false;
                                    }
                                    else {
                                        args.cancel = true;
                                    }
                                });
                            }
                        }
                    }
                    textAreaIds.forEach(function (el) {
                        if (el instanceof HTMLTextAreaElement) {
                            var txtArea = el;
                            if (txtArea.value.toLocaleLowerCase() != 'none' && txtArea.hasAttribute('data-coveo-id')) {
                                args.queryBuilder.context[txtArea.attributes['data-coveo-id'].value.toLowerCase()] = txtArea.value;
                            }
                        }
                        else if (el instanceof HTMLSpanElement) {
                            var spanEl = el;
                            if ($('#IssueType').val().indexOf('OTHER_ISSUE') && spanEl.textContent.toLowerCase() != 'none' && spanEl.hasAttribute('data-coveo-id')) {
                                args.queryBuilder.context[spanEl.attributes['data-coveo-id'].value.toLowerCase()] = spanEl.textContent;
                            }
                        }
                    });
                    for (var val in this.options.context) {
                        args.queryBuilder.context[val] = this.options.context[val];
                    }
                };
                Deflection.ID = 'Deflection';
                Deflection.options = {
                    context: ComponentOptions.buildJsonObjectOption(),
                    type: ComponentOptions.buildStringOption({ defaultValue: 'case' }),
                    refreshDelay: ComponentOptions.buildNumberOption({ defaultValue: 1500 }),
                    inputFieldSelector: ComponentOptions.buildStringOption({ defaultValue: 'coveo-query' }),
                    submitButtonSelector: ComponentOptions.buildStringOption({ defaultValue: 'coveo-submit' }),
                    cancelButtonSelector: ComponentOptions.buildStringOption({ defaultValue: 'coveo-cancel' }),
                };
                return Deflection;
            }(Component));
            exports.Deflection = Deflection;
            Initialization.registerAutoCreateComponent(Deflection);


            /***/
        }),
/* 3 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";
            var __extends = (this && this.__extends) || function (d, b) {
                for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var Component = Coveo.Component;
            var Initialization = Coveo.Initialization;
            var ComponentOptions = Coveo.ComponentOptions;
            var DellStringUtils_1 = __webpack_require__(4);
            /**
             * This component
             */
            var DeflectionViewMore = (function (_super) {
                __extends(DeflectionViewMore, _super);
                /**
                 * Create a new DeflectionViewMore
                 * @param element
                 * @param options
                 * @param bindings
                 * @param result
                 */
                function DeflectionViewMore(element, options, bindings) {
                    _super.call(this, element, DeflectionViewMore.ID, bindings);
                    this.element = element;
                    this.options = options;
                    this.options = ComponentOptions.initComponentOptions(element, DeflectionViewMore, options);
                    this.init();
                }
                DeflectionViewMore.prototype.init = function () {
                    var _this = this;
                    Coveo.$$(this.element).append(Coveo.$$('a', {}, this.options.caption).el);
                    //Coveo.$$(this.element).on('click', function () { return _this.redirectToSearch(); });
                    $(document).off('click', '.CoveoDeflectionViewMore').on('click', '.CoveoDeflectionViewMore', function () {
                        if (typeof dellmetricsTrack == 'function') {
                            dellmetricsTrack("890.222.133");
                        }
                        return _this.redirectToSearch();
                    });
                };
                DeflectionViewMore.prototype.logViewMoreEvent = function () {
                    var eventCause = { name: 'viewMoreLink', type: this.options.type };
                    Coveo.logCustomEvent(this.root, eventCause, {});
                };
                DeflectionViewMore.prototype.redirectToSearch = function () {
                    var q = DellStringUtils_1.DellStringUtils.cleanQuery(this.buildQuery());
                    var link = document.createElement('a');
                    link.href = this.options.searchPageUrl;
                    link.href = link.href; // IE11 needs this to correctly fill the properties that are used below.
                    var pathname = link.pathname.indexOf('/') == 0 ? link.pathname : '/' + link.pathname; // IE11 does not add a leading slash to this property.
                    var hash = link.hash ? link.hash + '&' : '#';
                    this.logViewMoreEvent();
                    var url = link.protocol + '//' + link.host + pathname + link.search;
                    if (q) {
                        url = url + hash + 'q=' + q;
                    }
                    if (this.options.openInNewWindow) {
                        window.open(url, '_blank');
                    }
                    else {
                        window.location.href = url;
                    }
                };
                DeflectionViewMore.prototype.buildQuery = function () {
                    var query = '';
                    Coveo.$$(document.body).findClass(this.options.inputFieldSelector).forEach(function (el) {
                        if (el instanceof HTMLTextAreaElement) {
                            var txtArea = el;
                            if (txtArea.value != '') {
                                query = query + ' ' + txtArea.value;
                            }
                        }
                        // else if (el instanceof HTMLSpanElement) {
                        //   var spanEl: HTMLSpanElement = <HTMLSpanElement>el;
                        //   if (spanEl.textContent != '') {
                        //     query = query + ' ' + spanEl.textContent
                        //   }
                        // }
                    });
                    return query.trim();
                };
                DeflectionViewMore.ID = 'DeflectionViewMore';
                DeflectionViewMore.options = {
                    searchPageUrl: ComponentOptions.buildStringOption(),
                    caption: ComponentOptions.buildStringOption({ defaultValue: 'View More' }),
                    type: ComponentOptions.buildStringOption({ defaultValue: 'case' }),
                    inputFieldSelector: ComponentOptions.buildStringOption({ defaultValue: 'coveo-query' }),
                    openInNewWindow: ComponentOptions.buildBooleanOption({ defaultValue: false })
                };
                return DeflectionViewMore;
            }(Component));
            exports.DeflectionViewMore = DeflectionViewMore;
            Initialization.registerAutoCreateComponent(DeflectionViewMore);


            /***/
        }),
/* 4 */
/***/ (function (module, exports) {

            "use strict";
            var DellStringUtils = (function () {
                function DellStringUtils() {
                }
                DellStringUtils.cleanQuery = function (kw) {
                    kw = kw.replace(/[^a-z0-9\s\-\d]/gi, ' ');
                    kw = kw.replace("-", ' ');
                    return kw;
                };
                DellStringUtils.format = function (stringToReplace) {
                    var replacements = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        replacements[_i - 1] = arguments[_i];
                    }
                    var args = replacements;
                    return stringToReplace.replace(/{(\d+)}/g, function (match, number) {
                        return typeof args[number] != 'undefined' ? args[number] : match;
                    });
                };
                DellStringUtils.containsLeftSquareBracket = function (value) {
                    return value.indexOf(DellStringUtils.DELIMITER.arrayStart) > -1;
                };
                DellStringUtils.containsEncodedLeftSquareBracket = function (value) {
                    var encodedBracket = DellStringUtils.safeEncodeURIComponent(DellStringUtils.DELIMITER.arrayStart);
                    return value.indexOf(encodedBracket) > -1;
                };
                DellStringUtils.replaceAll = function (str, find, replace) {
                    return str.replace(new RegExp(find, 'g'), replace);
                };
                DellStringUtils.safeEncodeURIComponent = function (rawString) {
                    // yiiip...
                    // Explanation : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
                    // Solution : https://stackoverflow.com/a/17109094
                    // Basically some unicode character (low-high surrogate) will throw an "invalid malformed URI" error when being encoded as an URI component, and the pair of character is incomplete.
                    // This simply removes those pesky characters
                    if (_.isString(rawString)) {
                        return encodeURIComponent(rawString
                            .replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])/g, '')
                            .split('')
                            .reverse()
                            .join('')
                            .replace(/[\uDC00-\uDFFF](?![\uD800-\uDBFF])/g, '')
                            .split('')
                            .reverse()
                            .join(''));
                    }
                    else {
                        // If the passed value is not a string, we probably don't want to do anything here...
                        // The base browser function should be resilient enough
                        return encodeURIComponent(rawString);
                    }
                };
                DellStringUtils.DELIMITER = {
                    objectStart: '{',
                    objectEnd: '}',
                    arrayStart: '[',
                    arrayEnd: ']',
                    arrayStartRegExp: /^\[/,
                    arrayEndRegExp: /\]$/
                };
                return DellStringUtils;
            }());
            exports.DellStringUtils = DellStringUtils;


            /***/
        }),
/* 5 */
/***/ (function (module, exports) {

            "use strict";
            var __extends = (this && this.__extends) || function (d, b) {
                for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var Component = Coveo.Component;
            var Initialization = Coveo.Initialization;
            var ComponentOptions = Coveo.ComponentOptions;
            var Assert = Coveo.Assert;
            var CustomClick = (function (_super) {
                __extends(CustomClick, _super);
                /**
                 * Create a new CustomClick
                 * @param element
                 * @param options
                 * @param bindings
                 * @param result
                 */

                function CustomClick(element, options, bindings, result) {
                    var _this = this;
                    _super.call(this, element, CustomClick.ID, bindings);
                    this.element = element;
                    this.options = options;
                    this.result = result;
                    this.options = ComponentOptions.initComponentOptions(element, CustomClick, options);
                    setTimeout(function () {
                         _this.CustomClick();
                    }, resultduration);
                    this.result = this.result || this.resolveResult();
                    Assert.exists(this.result);
                    Coveo.$$(this.element).on('click', function () {
                        return _this.logClickEvent();
                    });
                }
                CustomClick.prototype.CustomClick = function () {
                    var _this = this;
                    $(document).off('click', '.CoveoCustomClick').on('click', '.CoveoCustomClick', function (e, args) {
                        return _this.customClickEvent(e.target.href);
                    });
                };
                CustomClick.prototype.customClickEvent = function (hreffUrl) {
                    var searchEventCause = { name: 'customclickevent', type: coveoDeflectionType + '_Recommendations' };
                    var metadata = { custom_event: hreffUrl };
                    Coveo.logCustomEvent(this.root, searchEventCause, metadata);
                };
                CustomClick.prototype.init = function () {
                    //debugger;
                    var queryString = '&ref=chat_recom_resources';
                    for (var i = 0; i < Coveo.$$(document.body).findClass("CoveoResultLink").length; i++) {
                        var url = Coveo.$$(document.body).findClass("CoveoResultLink")[i].href;
                        if (url.indexOf(queryString) === -1) {
                            Coveo.$$(document.body).findClass("CoveoResultLink")[i].href = url + '&ref=chat_recom_resources';
                        }
                    }
                };
                CustomClick.prototype.logClickEvent = function () {
                    var meta = {
                        documentURL: this.result.clickUri,
                        documentTitle: this.result.title
                    };
                    Coveo.logClickEvent(this.root, Coveo.analyticsActionCauseList.documentOpen, meta, this.result);
                };
                CustomClick.ID = 'CustomClick';
                CustomClick.options = {};
                return CustomClick;
            }(Component));
            exports.CustomClick = CustomClick;
            Initialization.registerAutoCreateComponent(CustomClick);
            /***/
        }),
/* 6 */
/***/ (function (module, exports) {
            "use strict";
            exports.custoVersion = {
                lib: '20.1.2'
            };
            /***/
        })
/******/])
});
;
//# sourceMappingURL=Coveo.DellEMC.Deflection.js.map