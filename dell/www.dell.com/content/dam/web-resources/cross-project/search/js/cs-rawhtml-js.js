(function () {
    var e = $j("body").data("locale") || "en-us",
        o = e.split("-")[0] || "en",
        t = ["fr", "it", "de", "es", "ja", "ko"],
        a = t.indexOf(o) >= 0 && o;
    "pt-br" !== e && "pt-pt" !== e && "zh-cn" !== e && "zh-hk" !== e || (a = o), a && jQuery.ajax({
        url: "/content/dam/oaks-resources/search/translation/" + a + ".js",
        dataType: "script",
        async: !1
    })
})(), document.addEventListener("DOMContentLoaded", function () {
    UW.util.namespace("UW.search");
    var e = document.querySelector("#search"),
        o = "preview" === window.location.hostname.split("-")[0] || "www" === window.location.hostname.split(".")[0] || "www-wip" === window.location.hostname.split('.')[0] ? "dellprod" : "dellprod",
        t = "delltechnologies",
        a = "DES-dt-customerstories",
        c = "dellemc",
        s = "dtsearch",
        r = !0,
        n = "coveo.search",
        l = "customerstory.landingpage",
        u = "https://platform.cloud.coveo.com/rest/search",
        d = "/coveo/search/token",
        v = "https://usageanalytics.coveo.com",
        g = UW.locale.locale ? UW.locale.locale : "en-us",
        f = UW.locale.language ? UW.locale.language : "en",
        p = "/des/dictionaryByFilter";
    UW.search.FacetValueCaption = !1;
    var m = !1,
        y = 0,
        h = UW.util.hash.get("pdf-overlay"),
        b = UW.util.hash.get("video-overlay");
    $.ajax({
        url: d,
        data: {
            orgId: o,
            site: t,
            searchHub: a
        },
        type: "POST",
        success: function (d) {
            if (d.token) {
                var C = d.token.toString();
                Coveo.SearchEndpoint.endpoints.default = new Coveo.SearchEndpoint({
                    restUri: u,
                    accessToken: C,
                    queryStringArguments: {
                        organizationID: o,
                        site: t,
                        searchHub: a
                    },
                    renewAccessToken: function () {
                        window.location.reload()
                    }
                });
                var w = e;
                Coveo.$$(w).on("buildingQuery", function (o, a) {
                    var c = window.location.pathname.split("/");
                    c.length > 1 && c[1].indexOf("-") > -1 ? a.queryBuilder.addContext({
                        commongeo: c[1],
                        localeCustom: c[1],
                        searchpage: t
                    }) : a.queryBuilder.addContext({
                        commongeo: g,
                        localeCustom: g,
                        searchpage: t
                    }), a.queryBuilder.addFieldsToInclude("desindustrytagsid"), a.queryBuilder.addFieldsToInclude("descompanytagsid"), Coveo.cancelNextTime && (a.cancel = !0, Coveo.cancelNextTime = !1), (UW.util.hash.get("pdf-overlay") || UW.util.hash.get("video-overlay")) && Coveo.notFirstQuery && (a.cancel = !0, Coveo.cancelNextTime = !0), Coveo.notFirstQuery = !0, b && ($(e).coveo("state", "video-overlay", b), b = !1), h && ($(e).coveo("state", "pdf-overlay", h), h = !1), $(".overlay-video-trigger").on("click", function () {
                        var o = $(this).attr("data-video");
                        $(e).coveo("state", "video-overlay", o)
                    }), $(".overlay-pdf-trigger").on("click", function () {
                        var o = $(this).attr("data-iframe");
                        $(e).coveo("state", "pdf-overlay", o)
                    })
                }), Coveo.$$(w).on("deferredQuerySuccess", function (e, o) {
                    if (0 === o.results.totalCount && void 0 === o.query.aq) showErrorMessage();
                    else if (0 === o.results.totalCount) $(".coveo-results-header").addClass("no-results");
                    else {
                        UW.util.image.srcSet(".coveo-results-column", ".rendition"), setTimeout(function () {
                            UW.util.blazy.reinitialize(), $(".coveo-breadcrumb-clear-all.coveo-accessible-button div").text(UW.search.i18n["customerstory.landingpage.clearallfilters"])
                        }, 200), $(".CoveoFacet").find(".coveo-facet-header").attr("tabindex", "0"), $(".CoveoCategoryFacet").find(".coveo-category-facet-header").attr("tabindex", "0"), $(".coveo-accessible-button.coveo-facet-less, .coveo-accessible-button.coveo-facet-more").attr("tabindex", "-1");
                        UW.breakpoint.getScreenSize();
                        $(".coveo-dropdown-header-wrapper").is(":visible") && (m = !0), m && (Promise.resolve().then(function () {
                            $(".coveo-dropdown-header").on("click", function () {
                                $("body").addClass("noscroll"), $(".coveo-dropdown-content").on("scroll", function () {
                                    F()
                                }), setTimeout(function () {
                                    F()
                                }, 150)
                            })
                        }), setTimeout(function () {
                            F()
                        }, 150)), $(".coveo-dropdown-header").prop("href", "javascript: void(0);"), $(".coveo-results-header").removeClass("no-results")
                    }
                });
                var F = function () {
                        let e = UW.util.getViewport().height;
                        $(".coveo-dropdown-content").css({
                            "max-height": "625px",
                            "min-height": "300px",
                            height: .85 * e
                        });
                        var o = $(".CoveoFacet"),
                            t = $(".CoveoCategoryFacet"),
                            a = 0;
                        a += U(o), a += U(t);
                        var c, s = $(".coveo-dropdown-content").height();
                        y = 0, clearInterval(c), a < s ? c = setInterval(function () {
                            y++, a = 0, a += U(o), a += U(t), W(s, a, t, !0), y > 50 && clearInterval(c)
                        }, 100) : W(null, null, null, !1), $(".js-overlaySpacing").on("click", function e(o) {
                            $(".js-overlaySpacing").off("click", e), o.stopPropagation, setTimeout(function () {
                                F()
                            }, 100)
                        })
                    },
                    U = function (e) {
                        var o = 0;
                        return e.each(function () {
                            $(this).addClass("js-overlaySpacing");
                            let e = $(this).css("height");
                            e != isNaN && (o += 1 * e.substring(0, e.length - 2))
                        }), o
                    },
                    W = function (e, o, t, a) {
                        if (y > 0 && y < 50) {
                            if (a) {
                                var c = e - o + 4 * t.length;
                                c < 0 && (c = 0), c += "px"
                            }
                            let s = $(".js-overlaySpacing");
                            for (i = 0; i < s.length; i++) $(s[i]).css("margin-bottom", "0px"), a && i == s.length - 1 && $(".js-overlaySpacing").not(".coveo-hidden").last().css("margin-bottom", c)
                        }
                    };
                Coveo.Analytics.options.endpoint.defaultValue = v, Coveo.Analytics.options.organization.defaultValue = o, Coveo.Analytics.options.searchHub.defaultValue = a, Coveo.$$(w).on("afterComponentsInitialization", function () {
                    Coveo.state(w).registerNewAttribute("pdf-overlay"), Coveo.state(w).registerNewAttribute("video-overlay");
                    var e = document.querySelector(".CoveoAnalytics");
                    null != e && Coveo.get(e).setOriginContext("Hosted")
                }), Coveo.$$(w).on("changeAnalyticsCustomData", function (e, o) {
                    omnitureAnalytics(e, o), Promise.resolve().then(function () {
                        "interface" !== o.actionType && (k(), x())
                    })
                }), Coveo.$$(w).on("populateBreadcrumb", function (e, o) {
                    let t = '<span class="coveo-facet-breadcrumb-clear"><svg focusable="false" enable-background="new 0 0 13 13" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="m7.881 6.501 4.834-4.834c.38-.38.38-1.001 0-1.381s-1.001-.38-1.381 0l-4.834 4.834-4.834-4.835c-.38-.38-1.001-.38-1.381 0s-.38 1.001 0 1.381l4.834 4.834-4.834 4.834c-.38.38-.38 1.001 0 1.381s1.001.38 1.381 0l4.834-4.834 4.834 4.834c.38.38 1.001.38 1.381 0s .38-1.001 0-1.381z"></path></g></svg></span>';
                    Promise.resolve().then(function () {
                        if (0 !== o.breadcrumbs.length) {
                            let e = $(".show-mobile .coveo-category-facet-breadcrumb-title"),
                                o = $(".show-desktop .coveo-category-facet-breadcrumb-title"),
                                a = $(".coveo-active-category-facet-parent .coveo-category-facet-value-caption");
                            for (i = 0; i < o.length; i++) o[i].nextElementSibling.innerHTML = a[i].innerText + t, e[i].nextElementSibling.innerHTML = a[i].innerText + t
                        }
                        $(".coveo-facet-breadcrumb-multi-count") && $(".coveo-facet-breadcrumb-multi-count").parent().click()
                    })
                });
                let E = '<div class="coveo-category-facet-less coveo-accessible-button" role="button" aria-label="Collapse Solutions facet" tabindex="-1"><span class="coveo-facet-less-icon"><svg focusable="false" enable-background="new 0 0 10 6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg" class="coveo-facet-less-icon-svg"><g fill="currentColor"><path d="m5 .068c.222 0 .443.084.612.253l4.134 4.134c.338.338.338.886 0 1.224s-.886.338-1.224 0l-3.522-3.521-3.523 3.521c-.336.338-.886.338-1.224 0s-.337-.886.001-1.224l4.134-4.134c.168-.169.39-.253.612-.253z"></path></g></svg></span></div>',
                    j = '<div class="coveo-category-facet-more coveo-accessible-button" role="button" aria-label="Expand Services facet" tabindex="-1"><span class="coveo-facet-more-icon"><svg focusable="false" enable-background="new 0 0 10 6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg" class="coveo-facet-more-icon-svg"><g fill="currentColor"><path d="m5 5.932c-.222 0-.443-.084-.612-.253l-4.134-4.134c-.338-.338-.338-.886 0-1.224s.886-.338 1.224 0l3.522 3.521 3.523-3.521c.336-.338.886-.338 1.224 0s .337.886-.001 1.224l-4.135 4.134c-.168.169-.39.253-.611.253z"></path></g></svg></span></div>',
                    A = !0;
                Coveo.$$(w).on("newResultsDisplayed", function (e, o) {
                    A && ($(".coveo-category-facet-non-empty-path .coveo-category-facet-values").addClass("showFacet"), $(".coveo-active .coveo-facet-values").addClass("showFacet"), $("#industryFacet .coveo-facet-less").css("display", "block"), $("#industryFacet .coveo-facet-more").css("display", "none"), A = !1), Promise.resolve().then(function () {
                        k(), x()
                    })
                });
                var k = function () {
                        let e = ["#productFacet", "#solutionFacet", "#serviceFacet"];
                        e.forEach(function (e, o) {
                            $(e + " .coveo-category-facet-values").hasClass("showFacet") ? $(e + " .coveo-category-facet-more-less-container").html(E) : $(e + " .coveo-category-facet-more-less-container").html(j), D(e), S(e), $(e + " .coveo-category-facet-header").off(), $(e + " .coveo-category-facet-header").on("click", function (o) {
                                let t = 0 !== $(e + " .coveo-category-facet-less").length ? " .coveo-category-facet-less" : " .coveo-category-facet-more";
                                $(e + t).off(), D(e), S(e), $(e + t).click()
                            }), $(e + " .coveo-category-facet-header").on("keydown", function (o) {
                                if (13 === o.keyCode) {
                                    let o = 0 !== $(e + " .coveo-category-facet-less").length ? " .coveo-category-facet-less" : " .coveo-category-facet-more";
                                    $(e + o).off(), D(e), S(e), $(e + o).click()
                                }
                            }), $(e + " .coveo-category-facet-parent-value").on("click", function (o) {
                                $(e).coveo("deselectCurrentValue")
                            })
                        })
                    },
                    x = function () {
                        let e = ["#industryFacet", "#topicFacet", "#locationFacet"];
                        e.forEach(function (e, o) {
                            ($(e).hasClass("coveo-active") || $(e + " .coveo-facet-values").hasClass("showFacet")) && "none" === $(e + " .coveo-facet-more").css("display") ? ($(e + " .coveo-facet-less").css("display", "block"), $(e + " .coveo-facet-more").css("display", "none")) : ($(e + " .coveo-facet-less").css("display", "none"), $(e + " .coveo-facet-more").css("display", "block")), M(e), T(e), $(e + " .coveo-facet-header-title-section").on("click", function (o) {
                                $(e + " .coveo-facet-more").off(), M(e), T(e), $(e + " .coveo-facet-more").click()
                            }), $(e + " .coveo-facet-header").on("keydown", function (o) {
                                if (13 === o.keyCode) {
                                    let o = 0 !== $(e + " .showFacet").length ? " .coveo-facet-less" : " .coveo-facet-more";
                                    $(e + o).off(), M(e), T(e), $(e + o).click()
                                }
                            })
                        })
                    },
                    D = function (e) {
                        $(e + " .coveo-category-facet-less").on("click", function (o) {
                            o.preventDefault(), $(e + " .coveo-category-facet-values").removeClass("showFacet"), $(e + " .coveo-category-facet-more-less-container").html(j), S(e)
                        })
                    },
                    S = function (e) {
                        $(e + " .coveo-category-facet-more").on("click", function (o) {
                            o.preventDefault(), $(e + " .coveo-category-facet-values").addClass("showFacet"), $(e + " .coveo-category-facet-more-less-container").html(E), D(e)
                        })
                    },
                    M = function (e) {
                        $(e + " .coveo-facet-more").on("click", function (o) {
                            o.preventDefault(), $(e + " .coveo-facet-values").addClass("showFacet"), $(e + " .coveo-facet-less").css("display", "block"), $(e + " .coveo-facet-more").css("display", "none"), T(e)
                        })
                    },
                    T = function (e) {
                        $(e + " .coveo-facet-less").on("click", function (o) {
                            o.preventDefault(), $(e + " .coveo-facet-values").removeClass("showFacet"), $(e + " .coveo-facet-less").css("display", "none"), $(e + " .coveo-facet-more").css("display", "block"), M(e)
                        })
                    };
                $(".submit-absolute .mobile-close, .submit-absolute .mobile-apply, .coveo-dropdown-background-active").on("click", function () {
                    $(".coveo-dropdown-background-active").click(), $("body").removeClass("noscroll"), $(".coveo-dropdown-content").off("scroll")
                }), $.ajax({
                    type: "GET",
                    dataType: "json",
                    url: p,
                    data: {
                        locale: g,
                        facets: r,
                        taxonomy: c,
                        pagetype: s,
                        filter: [n, l]
                    },
                    traditional: !0,
                    success: function (o) {
                        UW.search.FacetValueCaption = o.facets, UW.search.i18n = o;
                        UW.locale.language;
                        var t = {};
                        t[f] = {
                            Products: UW.search.i18n["coveo.search.searchFacetTitle1"],
                            Solutions: UW.search.i18n["coveo.search.searchFacetTitle4"],
                            Services: UW.search.i18n["coveo.search.searchFacetTitle3"],
                            Topics: UW.search.i18n["coveo.search.searchFacetTitle9"],
                            Industry: UW.search.i18n["coveo.search.searchFacetTitle5"],
                            Filters: UW.search.i18n["customerstory.landingpage.filter"],
                            "Sort by: Newest": UW.search.i18n["customerstory.landingpage.sortby.newest"],
                            Newest: UW.search.i18n["customerstory.landingpage.newest"],
                            "Sort by: Relevancy": UW.search.i18n["customerstory.landingpage.sortby.mostrelevant"],
                            Relevancy: UW.search.i18n["customerstory.landingpage.mostrelevant"],
                            "Sort by: A-Z": UW.search.i18n["customerstory.landingpage.sortby.a_z"],
                            "A-Z": UW.search.i18n["customerstory.landingpage.a_z"],
                            "Sort by: Z-A": UW.search.i18n["customerstory.landingpage.sortby.z_a"],
                            "Z-A": UW.search.i18n["customerstory.landingpage.z_a"]
                        }, String.toLocaleString(t), $(".coveo-topSpace").text(UW.search.i18n["customerstory.landingpage.filter"]), $(".mobile-apply").text(UW.search.i18n["customerstory.landingpage.apply"]), Coveo.$$(w).on("newResultsDisplayed", function () {
                            $(".coveo-query-summary-no-results-string").text(UW.search.i18n["customerstory.landingpage.errormessageForFiltersWithNoResult"]), $(".coveo-query-summary-cancel-last").text(UW.search.i18n["customerstory.landingpage.cancelLastAction"]), $(".coveo-results-per-page-text").text(UW.search.i18n["customerstory.landingpage.resultsperpage"]), $(".coveo-facet-column").attr("aria-label", UW.search.i18n["customerstory.landingpage.aria.facet"]), $(".coveo-sort-section").attr("aria-label", UW.search.i18n["customerstory.landingpage.aria.sort"]), $(".CoveoPager").attr("aria-label", UW.search.i18n["customerstory.landingpage.aria.pager"]), $(".CoveoResultsPerPage").attr("aria-label", UW.search.i18n["customerstory.landingpage.resultsperpage"])
                        }), Coveo.$$(w).on("preprocessResults", function (e, o) {
                            try {
                                o.results.results.forEach(function (e) {
                                    let o = e.raw.descompanytagsid ? e.raw.descompanytagsid : [],
                                        t = "",
                                        a = !0;
                                    o.forEach(function (e, c) {
                                        let s = UW.search.FacetValueCaption.company[e];
                                        0 !== o.length ? (t = a ? s : t + ", " + s, a = !1) : t = s
                                    }), e.raw.descompanytagsname = t;
                                    let c = e.raw.desindustrytagsid ? e.raw.desindustrytagsid : [],
                                        s = "",
                                        r = !0;
                                    if (c.forEach(function (e, o) {
                                            let t = UW.search.FacetValueCaption.industry[e];
                                            0 !== c.length ? (s = r ? t : s + ", " + t, r = !1) : s = t
                                        }), e.raw.desindustrytagsname = s, e.raw.desindustrytagsname = "" !== e.raw.descompanytagsname && e.raw.descompanytagsname && "" !== e.raw.desindustrytagsname ? " | " + e.raw.desindustrytagsname : e.raw.desindustrytagsname, "/" == e.raw.displayurl[0])
                                        if ("DES-onedam-asset" == e.raw.source || "pdf" === e.raw.sysfiletype) e.raw.displayurl = "/" == e.raw.displayurl[0] ? "https://" + (UW.util.AEMDomain || "www.delltechnologies.com") + "/asset/" + g + e.raw.displayurl : e.raw.displayurl;
                                        else {
                                            var n = UW.url.host.split(".")[1],
                                                l = "dell" == n ? "/dt" : "";
                                            e.raw.displayurl = "/" + g + l + e.raw.displayurl
                                        } e.raw.desaccessibilitytext = e.raw.desaccessibilitytext ? e.raw.desaccessibilitytext : "mp4" == e.raw.filetype || "mov" == e.raw.filetype ? UW.search.i18n["customerstory.landingpage.watchvideo"] : "html" == e.raw.filetype ? UW.search.i18n["customerstory.landingpage.explorefullstory"] : "pdf" == e.raw.filetype ? UW.search.i18n["customerstory.landingpage.readpdf"] : ""
                                })
                            } catch (e) {
                                showErrorMessage()
                            }
                        }), UW.search.FacetValueCaption ? Coveo.init(e, {
                            productFacet: {
                                valueCaption: UW.search.FacetValueCaption.products
                            },
                            solutionFacet: {
                                valueCaption: UW.search.FacetValueCaption.solutions
                            },
                            serviceFacet: {
                                valueCaption: UW.search.FacetValueCaption.services
                            },
                            industryFacet: {
                                valueCaption: UW.search.FacetValueCaption.industry
                            },
                            topicFacet: {
                                valueCaption: UW.search.FacetValueCaption.topic
                            },
                            locationFacet: {
                                valueCaption: UW.search.FacetValueCaption['regions-and-countries']
                            }
                        }) : Coveo.init(e)
                    },
                    error: function (e, o, t) {
                        console.error("Error: Search Mapping Not Found."), showErrorMessage()
                    },
                    done: function (e) {}
                })
            } else showErrorMessage()
        },
        error: function (e, o, t) {
            console.error("Coveo Search " + o + ": " + t), showErrorMessage()
        },
        done: function (e) {}
    })
});
var showErrorMessage = function () {
        $("#error-message").removeClass("hide"), $(".raw-html").css("display", "none")
    },
    omnitureAnalytics = function (e, o) {
        buildMetrics(), "categoryFacetClear" != o.actionCause && setCommonAttr();
        var t = o.actionType;
        switch (t) {
            case "interface":
                "interfaceLoad" != o.actionCause && "searchFromLink" !== o.actionCause || sendEvent();
                break;
            case "facet":
                if ("facetSelect" == o.actionCause) {
                    var a = void 0,
                        c = void 0,
                        s = void 0,
                        r = void 0;
                    a = o.metaObject.facetId, c = o.metaObject.facetValue, s = o.metaObject.facetTitle, document.querySelector("[data-id=" + a + "]") && (r = Coveo.$$(document.querySelector("[data-id=" + a + "]"))), r && ("CoveoTimespanFacet" == r.el.className && (Dell.Metrics.sc.coveosearchrefinement = "facet:" + s + ":" + r.find(".coveo-selected div span.coveo-facet-value-caption").innerText), r.el.className.indexOf("CoveoFacet") >= 0 && (Dell.Metrics.sc.coveosearchrefinement = "facet:" + s + ":" + (r.el.CoveoFacet.options.valueCaption[c] || c))), sendEvent()
                }
                break;
            case "categoryFacet":
                if ("categoryFacetClear" != o.actionCause) {
                    a = void 0, c = void 0, s = void 0, r = void 0;
                    a = o.metaObject.categoryFacetId, c = o.metaObject.categoryFacetPath, s = o.metaObject.categoryFacetTitle, document.querySelector("[data-id=" + a + "]") && (r = Coveo.$$(document.querySelector("[data-id=" + a + "]"))), c && r && 0 !== c.length && r.el.CoveoCategoryFacet.options.valueCaption && (Dell.Metrics.sc.coveosearchrefinement = "facet:" + s + ":" + (r.el.CoveoCategoryFacet.options.valueCaption[c[c.length - 1]] || c[c.length - 1]), sendEvent())
                }
                break;
            case "breadcrumb":
                "breadcrumbResetAll" == o.actionCause ? Dell.Metrics.sc.coveosearchrefinement = "clearallfilter" : Dell.Metrics.sc.coveosearchrefinement = "clearfilter", sendEvent();
                break;
            case "getMoreResults":
                "pagerNumber" == o.actionCause && (Dell.Metrics.sc.pageNumber = o.metaObject.pagerNumber, sendEvent()), "pagerResize" == o.actionCause && (Dell.Metrics.sc.pageNumber = 1, Dell.Metrics.sc.detailpagename = "numresultsperpage- " + o.metaObject.currentResultsPerPage, sendEvent());
                break;
            case "misc":
                "datedescending" === o.metaObject.resultsSortBy ? Dell.Metrics.sc.coveosearchrefinement = "sort:datedescending" : "relevancy" === o.metaObject.resultsSortBy ? Dell.Metrics.sc.coveosearchrefinement = "sort:relevancy" : "@descompanytagsnameascending" === o.metaObject.resultsSortBy ? Dell.Metrics.sc.coveosearchrefinement = "sort:alphabeticallyascending" : "@descompanytagsnamedescending" === o.metaObject.resultsSortBy && (Dell.Metrics.sc.coveosearchrefinement = "sort:alphabeticallydescending"), sendEvent()
        }
    },
    sendEvent = function () {
        "undefined" != typeof pageView && pageView()
    },
    buildMetrics = function () {
        Dell = Dell || {}, Dell.Metrics = Dell.Metrics || {}, Dell.Metrics.sc = Dell.Metrics.sc || {};
        var e = document.querySelector(".CoveoPager"),
            o = Coveo.Component.get(e, Coveo.Pager);
        Dell.Metrics.sc.pageNumber = o.currentPage, Dell.Metrics.sc.coveovisitor = Coveo.Cookie.get("visitorId"), Dell.Metrics.sc.applicationname = "Search:Coveo", Dell.Metrics.sc.searchterm = "cs"
    },
    setCommonAttr = function () {
        Dell && Dell.Metrics.sc.detailpagename && delete Dell.Metrics.sc.detailpagename, Dell && Dell.Metrics.sc.coveosearchrefinement && delete Dell.Metrics.sc.coveosearchrefinement, Dell && Dell.Metrics.sc.btnname && delete Dell.Metrics.sc.btnname;
        var e = document.querySelector(".CoveoPager"),
            o = Coveo.Component.get(e, Coveo.Pager);
        Dell.Metrics.sc.pageNumber = o.currentPage, Dell.Metrics.sc.coveovisitor = Coveo.Cookie.get("visitorId")
    };