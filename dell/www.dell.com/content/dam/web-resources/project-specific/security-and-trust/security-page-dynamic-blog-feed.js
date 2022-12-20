var emclp = {
    overrides: {
        useLP: false,
        hideStickyNav: true,
        chatType: 'OFF'
    }
};

(function() { 
    jQuery(document).ready(function() {

        var langToLoad = "en-us";
        var p9s = {
            en: "en-us",
            de: "de-de",
            es: "es-es",
            fr: "fr-fr",
            it: "it-it",
            ja: "ja-jp",
        }
        if (p9s[UW.locale.language]) {
            langToLoad = p9s[UW.locale.language];
        }

        function placeBlogHTML(html) {
            if (typeof html != "undefined") {
                if (jQuery("#js-security-blogs-promo .wrapper-text > .rte").length > 0) {
                    setTimeout(function() { jQuery("#js-security-blogs-promo .wrapper-text > .rte").html(html); }, 1);
                } else {
                    setTimeout(function() { placeBlogHTML(html); }, 500);
                }
            }
        }

        jQuery.ajax({
            url: "https://www.dell.com/" + langToLoad + "/blog/categories/security-privacy/feed/",
            method: "get",
            success: function(data, status) {
                if (status === "success") {
                    var rss = jQuery(data).find("item");
                    var html = "";
                    for (var i = 0; i < rss.length; i++) {
                        if (i < 5) {
                            html += '<p><a href="' + jQuery(rss[i]).find("link").text() + '">' + jQuery(rss[i]).find("title").text() + '</a></p>';
                        }
                    }
                    placeBlogHTML(html);
                }
            }
        });

    });
})(jQuery);
