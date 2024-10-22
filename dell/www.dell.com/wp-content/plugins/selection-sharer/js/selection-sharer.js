!function (e) {
	var t = function (t) {
		var n = this;
		t = t || {}, "string" == typeof t && (t = {elements: t}), this.sel = null, this.textSelection = "", this.htmlSelection = "", this.appId = e('meta[property="fb:app_id"]').attr("content") || e('meta[property="fb:app_id"]').attr("value"), this.url2share = e('meta[property="og:url"]').attr("content") || e('meta[property="og:url"]').attr("value") || window.location.href, this.getSelectionText = function (e) {
			var t = "", o = "", e = e || window.getSelection();
			if (e.rangeCount) {
				for (var i = document.createElement("div"), r = 0, a = e.rangeCount; a > r; ++r) i.appendChild(e.getRangeAt(r).cloneContents());
				o = i.textContent, t = i.innerHTML
			}
			return n.textSelection = o, n.htmlSelection = t || o, o
		}, this.selectionDirection = function (e) {
			var t = e || window.getSelection(), n = document.createRange();
			if (!t.anchorNode) return 0;
			n.setStart(t.anchorNode, t.anchorOffset), n.setEnd(t.focusNode, t.focusOffset);
			var o = n.collapsed ? "backward" : "forward";
			return n.detach(), o
		}, this.showPopunder = function () {
			n.popunder = n.popunder || document.getElementById("selectionSharerPopunder");
			var e = window.getSelection(), t = n.getSelectionText(e);
			if (e.isCollapsed || t.length < 10 || !t.match(/ /)) return n.hidePopunder();
			if (n.popunder.classList.contains("fixed")) return n.popunder.style.bottom = 0;
			var o = e.getRangeAt(0), i = o.endContainer.parentNode;
			if (n.popunder.classList.contains("show")) {
				if (Math.ceil(n.popunder.getBoundingClientRect().top) == Math.ceil(i.getBoundingClientRect().bottom)) return;
				return n.hidePopunder(n.showPopunder)
			}
			if (i.nextElementSibling) n.pushSiblings(i); else {
				n.placeholder || (n.placeholder = document.createElement("div"), n.placeholder.className = "selectionSharerPlaceholder");
				var r = window.getComputedStyle(i).marginBottom;
				n.placeholder.style.height = r, n.placeholder.style.marginBottom = -2 * parseInt(r, 10) + "px", i.parentNode.insertBefore(n.placeholder)
			}
			var a = window.pageYOffset + i.getBoundingClientRect().bottom;
			n.popunder.style.top = Math.ceil(a) + "px", setTimeout(function () {
				n.placeholder && n.placeholder.classList.add("show"), n.popunder.classList.add("show")
			}, 0)
		}, this.pushSiblings = function (e) {
			for (; e = e.nextElementSibling;) e.classList.add("selectionSharer"), e.classList.add("moveDown")
		}, this.hidePopunder = function (e) {
			if (e = e || function () {
				}, "fixed" == n.popunder) return n.popunder.style.bottom = "-50px", e();
			n.popunder.classList.remove("show"), n.placeholder && n.placeholder.classList.remove("show");
			for (var t = document.getElementsByClassName("moveDown"); el = t[0];) el.classList.remove("moveDown");
			setTimeout(function () {
				n.placeholder && document.body.insertBefore(n.placeholder), e()
			}, 600)
		}, this.show = function (e) {
			setTimeout(function () {
				var t = window.getSelection(), o = n.getSelectionText(t);
				if (!t.isCollapsed && o && o.length > 10 && o.match(/ /)) {
					var i = t.getRangeAt(0), r = i.getBoundingClientRect().top - 5,
						a = r + window.pageYOffset - n.$popover.height(), l = 0;
					if (e) l = e.pageX; else {
						var s = t.anchorNode.parentNode;
						l += s.offsetWidth / 2;
						do l += s.offsetLeft; while (s = s.offsetParent)
					}
					switch (n.selectionDirection(t)) {
						case"forward":
							l -= n.$popover.width();
							break;
						case"backward":
							l += n.$popover.width();
							break;
						default:
							return
					}
					n.$popover.removeClass("anim").css("top", a + 10).css("left", l).show(), setTimeout(function () {
						n.$popover.addClass("anim").css("top", a)
					}, 0)
				}
			}, 10)
		}, this.hide = function () {
			n.$popover.hide()
		}, this.smart_truncate = function (e, t) {
			if (!e || !e.length) return e;
			var n = e.length > t, o = n ? e.substr(0, t - 1) : e;
			return o = n ? o.substr(0, o.lastIndexOf(" ")) : o, n ? o + "..." : o
		}, this.getRelatedTwitterAccounts = function () {
			var t = [],
				n = e('meta[name="twitter:creator"]').attr("content") || e('meta[name="twitter:creator"]').attr("value");
			n && t.push(n);
			for (var o = document.getElementsByTagName("a"), i = 0, r = o.length; r > i; i++) if (o[i].attributes.href && "string" == typeof o[i].attributes.href.value) {
				var a = o[i].attributes.href.value.match(/^https?:\/\/twitter\.com\/([a-z0-9_]{1,20})/i);
				a && a.length > 1 && -1 == ["widgets", "intent"].indexOf(a[1]) && t.push(a[1])
			}
			return t.length > 0 ? t.join(",") : ""
		}, this.shareTwitter = function (e) {
			e.preventDefault();
			var t = "“" + n.smart_truncate(n.textSelection.trim(), 114) + "”",
				o = "http://twitter.com/intent/tweet?text=" + encodeURIComponent(t) + "&related=" + n.relatedTwitterAccounts + "&url=" + encodeURIComponent(window.location.href);
			n.viaTwitterAccount && t.length < 114 - n.viaTwitterAccount.length && (o += "&via=" + n.viaTwitterAccount);
			var i = 640, r = 440, a = screen.width / 2 - i / 2, l = screen.height / 2 - r / 2 - 100;
			return window.open(o, "share_twitter", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + i + ", height=" + r + ", top=" + l + ", left=" + a), n.hide(), !1
		}, this.shareFacebook = function (e) {
			e.preventDefault();
			var t = n.htmlSelection.replace(/<p[^>]*>/gi, "\n").replace(/<\/p>|  /gi, "").trim(),
				o = "https://www.facebook.com/dialog/share?app_id=" + n.appId + "&display=popup&quote=" + encodeURIComponent(t) + "&href=" + encodeURIComponent(n.url2share),
				i = 640, r = 440, a = screen.width / 2 - i / 2, l = screen.height / 2 - r / 2 - 100;
			window.open(o, "share_facebook", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + i + ", height=" + r + ", top=" + l + ", left=" + a)
		}, this.shareLinkedIn = function (e) {
			e.preventDefault();
			var t = n.htmlSelection.replace(/<p[^>]*>/gi, "\n").replace(/<\/p>|  /gi, "").trim(),
				o = "https://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(n.url2share) + "&title=" + encodeURIComponent(t),
				i = 640, r = 440, a = screen.width / 2 - i / 2, l = screen.height / 2 - r / 2 - 100;
			window.open(o, "share_linkedin", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + i + ", height=" + r + ", top=" + l + ", left=" + a)
		}, this.shareEmail = function () {
			var t = n.htmlSelection.replace(/<p[^>]*>/gi, "\n").replace(/<\/p>|  /gi, "").trim(), o = {};
			return o.subject = encodeURIComponent("Quote from " + document.title), o.body = encodeURIComponent("“" + t + "”") + "%0D%0A%0D%0AFrom: " + document.title + "%0D%0A" + window.location.href, e(this).attr("href", "mailto:?subject=" + o.subject + "&body=" + o.body), n.hide(), !0
		}, this.render = function () {
			var t = '<div class="selectionSharer" id="selectionSharerPopover" style="position:absolute;">  <div id="selectionSharerPopover-inner">    <ul>      <li><a class="action tweet" href="" title="Share this selection on Twitter" target="_blank">Tweet</a></li>      <li><a class="action facebook" href="" title="Share this selection on Facebook" target="_blank">Facebook</a></li>      <li><a class="action linkedin" href="" title="Share this selection on LinkedIn" target="_blank">LinkedIn</a></li>      <li><a class="action email" href="" title="Share this selection by email" target="_blank"><svg width="20" height="20"><path stroke="#FFF" stroke-width="6" d="m16,25h82v60H16zl37,37q4,3 8,0l37-37M16,85l30-30m22,0 30,30"/></svg></a></li>    </ul>  </div>  <div class="selectionSharerPopover-clip"><span class="selectionSharerPopover-arrow"></span></div></div>',
				o = '<div id="selectionSharerPopunder" class="selectionSharer">  <div id="selectionSharerPopunder-inner">    <label>Share this selection</label>    <ul>      <li><a class="action tweet" href="" title="Share this selection on Twitter" target="_blank">Tweet</a></li>      <li><a class="action facebook" href="" title="Share this selection on Facebook" target="_blank">Facebook</a></li>      <li><a class="action linkedin" href="" title="Share this selection on LinkedIn" target="_blank">LinkedIn</a></li>      <li><a class="action email" href="" title="Share this selection by email" target="_blank"><svg width="20" height="20"><path stroke="#FFF" stroke-width="6" d="m16,25h82v60H16zl37,37q4,3 8,0l37-37M16,85l30-30m22,0 30,30"/></svg></a></li>    </ul>  </div></div>';
			n.$popover = e(t), n.$popover.find("a.tweet").click(n.shareTwitter), n.$popover.find("a.facebook").click(n.shareFacebook), n.$popover.find("a.linkedin").click(n.shareLinkedIn), n.$popover.find("a.email").click(n.shareEmail), e("body").append(n.$popover), n.$popunder = e(o), n.$popunder.find("a.tweet").click(n.shareTwitter), n.$popunder.find("a.facebook").click(n.shareFacebook), n.$popunder.find("a.linkedin").click(n.shareLinkedIn), n.$popunder.find("a.email").click(n.shareEmail), e("body").append(n.$popunder), n.appId && n.url2share && e(".selectionSharer a.facebook").css("display", "inline-block")
		}, this.setElements = function (t) {
			"string" == typeof t && (t = e(t)), n.$elements = t instanceof e ? t : e(t), n.$elements.mouseup(n.show).mousedown(n.hide).addClass("selectionShareable"), n.$elements.bind("touchstart", function () {
				n.isMobile = !0
			}), document.onselectionchange = n.selectionChanged
		}, this.selectionChanged = function (e) {
			n.isMobile && (n.lastSelectionChanged && clearTimeout(n.lastSelectionChanged), n.lastSelectionChanged = setTimeout(function () {
				n.showPopunder(e)
			}, 300))
		}, this.render(), t.elements && this.setElements(t.elements)
	};
	e.fn.selectionSharer = function () {
		var e = new t;
		return e.setElements(this), this
	}, "function" == typeof define ? define(function () {
		return t.load = function (e, n, o) {
			var i = new t;
			i.setElements("p"), o()
		}, t
	}) : window.SelectionSharer = t
}(jQuery);