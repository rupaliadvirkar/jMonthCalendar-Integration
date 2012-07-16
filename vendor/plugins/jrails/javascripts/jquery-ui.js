/*
 * jQuery UI 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
jQuery.ui || (function(c){
    var i = c.fn.remove, d = c.browser.mozilla && (parseFloat(c.browser.version) < 1.9);
    c.ui = {
        version: "1.7.2",
        plugin: {
            add: function(k, l, n){
                var m = c.ui[k].prototype;
                for (var j in n) {
                    m.plugins[j] = m.plugins[j] || [];
                    m.plugins[j].push([l, n[j]])
                }
            },
            call: function(j, l, k){
                var n = j.plugins[l];
                if (!n || !j.element[0].parentNode) {
                    return
                }
                for (var m = 0; m < n.length; m++) {
                    if (j.options[n[m][0]]) {
                        n[m][1].apply(j.element, k)
                    }
                }
            }
        },
        contains: function(k, j){
            return document.compareDocumentPosition ? k.compareDocumentPosition(j) & 16 : k !== j && k.contains(j)
        },
        hasScroll: function(m, k){
            if (c(m).css("overflow") == "hidden") {
                return false
            }
            var j = (k && k == "left") ? "scrollLeft" : "scrollTop", l = false;
            if (m[j] > 0) {
                return true
            }
            m[j] = 1;
            l = (m[j] > 0);
            m[j] = 0;
            return l
        },
        isOverAxis: function(k, j, l){
            return (k > j) && (k < (j + l))
        },
        isOver: function(o, k, n, m, j, l){
            return c.ui.isOverAxis(o, n, j) && c.ui.isOverAxis(k, m, l)
        },
        keyCode: {
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    };
    if (d) {
        var f = c.attr, e = c.fn.removeAttr, h = "http://www.w3.org/2005/07/aaa", a = /^aria-/, b = /^wairole:/;
        c.attr = function(k, j, l){
            var m = l !== undefined;
            return (j == "role" ? (m ? f.call(this, k, j, "wairole:" + l) : (f.apply(this, arguments) || "").replace(b, "")) : (a.test(j) ? (m ? k.setAttributeNS(h, j.replace(a, "aaa:"), l) : f.call(this, k, j.replace(a, "aaa:"))) : f.apply(this, arguments)))
        };
        c.fn.removeAttr = function(j){
            return (a.test(j) ? this.each(function(){
                this.removeAttributeNS(h, j.replace(a, ""))
            }) : e.call(this, j))
        }
    }
    c.fn.extend({
        remove: function(){
            c("*", this).add(this).each(function(){
                c(this).triggerHandler("remove")
            });
            return i.apply(this, arguments)
        },
        enableSelection: function(){
            return this.attr("unselectable", "off").css("MozUserSelect", "").unbind("selectstart.ui")
        },
        disableSelection: function(){
            return this.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function(){
                return false
            })
        },
        scrollParent: function(){
            var j;
            if ((c.browser.msie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                j = this.parents().filter(function(){
                    return (/(relative|absolute|fixed)/).test(c.curCSS(this, "position", 1)) && (/(auto|scroll)/).test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0)
            }
            else {
                j = this.parents().filter(function(){
                    return (/(auto|scroll)/).test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0)
            }
            return (/fixed/).test(this.css("position")) || !j.length ? c(document) : j
        }
    });
    c.extend(c.expr[":"], {
        data: function(l, k, j){
            return !!c.data(l, j[3])
        },
        focusable: function(k){
            var l = k.nodeName.toLowerCase(), j = c.attr(k, "tabindex");
            return (/input|select|textarea|button|object/.test(l) ? !k.disabled : "a" == l || "area" == l ? k.href || !isNaN(j) : !isNaN(j)) && !c(k)["area" == l ? "parents" : "closest"](":hidden").length
        },
        tabbable: function(k){
            var j = c.attr(k, "tabindex");
            return (isNaN(j) || j >= 0) && c(k).is(":focusable")
        }
    });
    function g(m, n, o, l){
        function k(q){
            var p = c[m][n][q] || [];
            return (typeof p == "string" ? p.split(/,?\s+/) : p)
        }
        var j = k("getter");
        if (l.length == 1 && typeof l[0] == "string") {
            j = j.concat(k("getterSetter"))
        }
        return (c.inArray(o, j) != -1)
    }
    c.widget = function(k, j){
        var l = k.split(".")[0];
        k = k.split(".")[1];
        c.fn[k] = function(p){
            var n = (typeof p == "string"), o = Array.prototype.slice.call(arguments, 1);
            if (n && p.substring(0, 1) == "_") {
                return this
            }
            if (n && g(l, k, p, o)) {
                var m = c.data(this[0], k);
                return (m ? m[p].apply(m, o) : undefined)
            }
            return this.each(function(){
                var q = c.data(this, k);
                (!q && !n && c.data(this, k, new c[l][k](this, p))._init());
                (q && n && c.isFunction(q[p]) && q[p].apply(q, o))
            })
        };
        c[l] = c[l] || {};
        c[l][k] = function(o, n){
            var m = this;
            this.namespace = l;
            this.widgetName = k;
            this.widgetEventPrefix = c[l][k].eventPrefix || k;
            this.widgetBaseClass = l + "-" + k;
            this.options = c.extend({}, c.widget.defaults, c[l][k].defaults, c.metadata && c.metadata.get(o)[k], n);
            this.element = c(o).bind("setData." + k, function(q, p, r){
                if (q.target == o) {
                    return m._setData(p, r)
                }
            }).bind("getData." + k, function(q, p){
                if (q.target == o) {
                    return m._getData(p)
                }
            }).bind("remove", function(){
                return m.destroy()
            })
        };
        c[l][k].prototype = c.extend({}, c.widget.prototype, j);
        c[l][k].getterSetter = "option"
    };
    c.widget.prototype = {
        _init: function(){
        },
        destroy: function(){
            this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled").removeAttr("aria-disabled")
        },
        option: function(l, m){
            var k = l, j = this;
            if (typeof l == "string") {
                if (m === undefined) {
                    return this._getData(l)
                }
                k = {};
                k[l] = m
            }
            c.each(k, function(n, o){
                j._setData(n, o)
            })
        },
        _getData: function(j){
            return this.options[j]
        },
        _setData: function(j, k){
            this.options[j] = k;
            if (j == "disabled") {
                this.element[k ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled").attr("aria-disabled", k)
            }
        },
        enable: function(){
            this._setData("disabled", false)
        },
        disable: function(){
            this._setData("disabled", true)
        },
        _trigger: function(l, m, n){
            var p = this.options[l], j = (l == this.widgetEventPrefix ? l : this.widgetEventPrefix + l);
            m = c.Event(m);
            m.type = j;
            if (m.originalEvent) {
                for (var k = c.event.props.length, o; k;) {
                    o = c.event.props[--k];
                    m[o] = m.originalEvent[o]
                }
            }
            this.element.trigger(m, n);
            return !(c.isFunction(p) && p.call(this.element[0], m, n) === false || m.isDefaultPrevented())
        }
    };
    c.widget.defaults = {
        disabled: false
    };
    c.ui.mouse = {
        _mouseInit: function(){
            var j = this;
            this.element.bind("mousedown." + this.widgetName, function(k){
                return j._mouseDown(k)
            }).bind("click." + this.widgetName, function(k){
                if (j._preventClickEvent) {
                    j._preventClickEvent = false;
                    k.stopImmediatePropagation();
                    return false
                }
            });
            if (c.browser.msie) {
                this._mouseUnselectable = this.element.attr("unselectable");
                this.element.attr("unselectable", "on")
            }
            this.started = false
        },
        _mouseDestroy: function(){
            this.element.unbind("." + this.widgetName);
            (c.browser.msie && this.element.attr("unselectable", this._mouseUnselectable))
        },
        _mouseDown: function(l){
            l.originalEvent = l.originalEvent || {};
            if (l.originalEvent.mouseHandled) {
                return
            }
            (this._mouseStarted && this._mouseUp(l));
            this._mouseDownEvent = l;
            var k = this, m = (l.which == 1), j = (typeof this.options.cancel == "string" ? c(l.target).parents().add(l.target).filter(this.options.cancel).length : false);
            if (!m || j || !this._mouseCapture(l)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function(){
                    k.mouseDelayMet = true
                }, this.options.delay)
            }
            if (this._mouseDistanceMet(l) && this._mouseDelayMet(l)) {
                this._mouseStarted = (this._mouseStart(l) !== false);
                if (!this._mouseStarted) {
                    l.preventDefault();
                    return true
                }
            }
            this._mouseMoveDelegate = function(n){
                return k._mouseMove(n)
            };
            this._mouseUpDelegate = function(n){
                return k._mouseUp(n)
            };
            c(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            (c.browser.safari || l.preventDefault());
            l.originalEvent.mouseHandled = true;
            return true
        },
        _mouseMove: function(j){
            if (c.browser.msie && !j.button) {
                return this._mouseUp(j)
            }
            if (this._mouseStarted) {
                this._mouseDrag(j);
                return j.preventDefault()
            }
            if (this._mouseDistanceMet(j) && this._mouseDelayMet(j)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, j) !== false);
                (this._mouseStarted ? this._mouseDrag(j) : this._mouseUp(j))
            }
            return !this._mouseStarted
        },
        _mouseUp: function(j){
            c(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                this._preventClickEvent = (j.target == this._mouseDownEvent.target);
                this._mouseStop(j)
            }
            return false
        },
        _mouseDistanceMet: function(j){
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - j.pageX), Math.abs(this._mouseDownEvent.pageY - j.pageY)) >= this.options.distance)
        },
        _mouseDelayMet: function(j){
            return this.mouseDelayMet
        },
        _mouseStart: function(j){
        },
        _mouseDrag: function(j){
        },
        _mouseStop: function(j){
        },
        _mouseCapture: function(j){
            return true
        }
    };
    c.ui.mouse.defaults = {
        cancel: null,
        distance: 1,
        delay: 0
    }
})(jQuery);
;
/*
 * jQuery UI Draggable 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	ui.core.js
 */
(function(a){
    a.widget("ui.draggable", a.extend({}, a.ui.mouse, {
        _init: function(){
            if (this.options.helper == "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
                this.element[0].style.position = "relative"
            }
            (this.options.addClasses && this.element.addClass("ui-draggable"));
            (this.options.disabled && this.element.addClass("ui-draggable-disabled"));
            this._mouseInit()
        },
        destroy: function(){
            if (!this.element.data("draggable")) {
                return
            }
            this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
            this._mouseDestroy()
        },
        _mouseCapture: function(b){
            var c = this.options;
            if (this.helper || c.disabled || a(b.target).is(".ui-resizable-handle")) {
                return false
            }
            this.handle = this._getHandle(b);
            if (!this.handle) {
                return false
            }
            return true
        },
        _mouseStart: function(b){
            var c = this.options;
            this.helper = this._createHelper(b);
            this._cacheHelperProportions();
            if (a.ui.ddmanager) {
                a.ui.ddmanager.current = this
            }
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            a.extend(this.offset, {
                click: {
                    left: b.pageX - this.offset.left,
                    top: b.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(b);
            this.originalPageX = b.pageX;
            this.originalPageY = b.pageY;
            if (c.cursorAt) {
                this._adjustOffsetFromHelper(c.cursorAt)
            }
            if (c.containment) {
                this._setContainment()
            }
            this._trigger("start", b);
            this._cacheHelperProportions();
            if (a.ui.ddmanager && !c.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(this, b)
            }
            this.helper.addClass("ui-draggable-dragging");
            this._mouseDrag(b, true);
            return true
        },
        _mouseDrag: function(b, d){
            this.position = this._generatePosition(b);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!d) {
                var c = this._uiHash();
                this._trigger("drag", b, c);
                this.position = c.position
            }
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            if (a.ui.ddmanager) {
                a.ui.ddmanager.drag(this, b)
            }
            return false
        },
        _mouseStop: function(c){
            var d = false;
            if (a.ui.ddmanager && !this.options.dropBehaviour) {
                d = a.ui.ddmanager.drop(this, c)
            }
            if (this.dropped) {
                d = this.dropped;
                this.dropped = false
            }
            if ((this.options.revert == "invalid" && !d) || (this.options.revert == "valid" && d) || this.options.revert === true || (a.isFunction(this.options.revert) && this.options.revert.call(this.element, d))) {
                var b = this;
                a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function(){
                    b._trigger("stop", c);
                    b._clear()
                })
            }
            else {
                this._trigger("stop", c);
                this._clear()
            }
            return false
        },
        _getHandle: function(b){
            var c = !this.options.handle || !a(this.options.handle, this.element).length ? true : false;
            a(this.options.handle, this.element).find("*").andSelf().each(function(){
                if (this == b.target) {
                    c = true
                }
            });
            return c
        },
        _createHelper: function(c){
            var d = this.options;
            var b = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [c])) : (d.helper == "clone" ? this.element.clone() : this.element);
            if (!b.parents("body").length) {
                b.appendTo((d.appendTo == "parent" ? this.element[0].parentNode : d.appendTo))
            }
            if (b[0] != this.element[0] && !(/(fixed|absolute)/).test(b.css("position"))) {
                b.css("position", "absolute")
            }
            return b
        },
        _adjustOffsetFromHelper: function(b){
            if (b.left != undefined) {
                this.offset.click.left = b.left + this.margins.left
            }
            if (b.right != undefined) {
                this.offset.click.left = this.helperProportions.width - b.right + this.margins.left
            }
            if (b.top != undefined) {
                this.offset.click.top = b.top + this.margins.top
            }
            if (b.bottom != undefined) {
                this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top
            }
        },
        _getParentOffset: function(){
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                b.left += this.scrollParent.scrollLeft();
                b.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)) {
                b = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function(){
            if (this.cssPosition == "relative") {
                var b = this.element.position();
                return {
                    top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function(){
            this.margins = {
                left: (parseInt(this.element.css("marginLeft"), 10) || 0),
                top: (parseInt(this.element.css("marginTop"), 10) || 0)
            }
        },
        _cacheHelperProportions: function(){
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function(){
            var e = this.options;
            if (e.containment == "parent") {
                e.containment = this.helper[0].parentNode
            }
            if (e.containment == "document" || e.containment == "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(e.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(e.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(e.containment) && e.containment.constructor != Array) {
                var c = a(e.containment)[0];
                if (!c) {
                    return
                }
                var d = a(e.containment).offset();
                var b = (a(c).css("overflow") != "hidden");
                this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (b ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (b ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
            else {
                if (e.containment.constructor == Array) {
                    this.containment = e.containment
                }
            }
        },
        _convertPositionTo: function(f, h){
            if (!h) {
                h = this.position
            }
            var c = f == "absolute" ? 1 : -1;
            var e = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = (/(html|body)/i).test(b[0].tagName);
            return {
                top: (h.top + this.offset.relative.top * c + this.offset.parent.top * c - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (g ? 0 : b.scrollTop())) * c)),
                left: (h.left + this.offset.relative.left * c + this.offset.parent.left * c - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : b.scrollLeft()) * c))
            }
        },
        _generatePosition: function(e){
            var h = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, i = (/(html|body)/i).test(b[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            var d = e.pageX;
            var c = e.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (e.pageX - this.offset.click.left < this.containment[0]) {
                        d = this.containment[0] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top < this.containment[1]) {
                        c = this.containment[1] + this.offset.click.top
                    }
                    if (e.pageX - this.offset.click.left > this.containment[2]) {
                        d = this.containment[2] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top > this.containment[3]) {
                        c = this.containment[3] + this.offset.click.top
                    }
                }
                if (h.grid) {
                    var g = this.originalPageY + Math.round((c - this.originalPageY) / h.grid[1]) * h.grid[1];
                    c = this.containment ? (!(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : (!(g - this.offset.click.top < this.containment[1]) ? g - h.grid[1] : g + h.grid[1])) : g;
                    var f = this.originalPageX + Math.round((d - this.originalPageX) / h.grid[0]) * h.grid[0];
                    d = this.containment ? (!(f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2]) ? f : (!(f - this.offset.click.left < this.containment[0]) ? f - h.grid[0] : f + h.grid[0])) : f
                }
            }
            return {
                top: (c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (i ? 0 : b.scrollTop())))),
                left: (d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : b.scrollLeft())))
            }
        },
        _clear: function(){
            this.helper.removeClass("ui-draggable-dragging");
            if (this.helper[0] != this.element[0] && !this.cancelHelperRemoval) {
                this.helper.remove()
            }
            this.helper = null;
            this.cancelHelperRemoval = false
        },
        _trigger: function(b, c, d){
            d = d || this._uiHash();
            a.ui.plugin.call(this, b, [c, d]);
            if (b == "drag") {
                this.positionAbs = this._convertPositionTo("absolute")
            }
            return a.widget.prototype._trigger.call(this, b, c, d)
        },
        plugins: {},
        _uiHash: function(b){
            return {
                helper: this.helper,
                position: this.position,
                absolutePosition: this.positionAbs,
                offset: this.positionAbs
            }
        }
    }));
    a.extend(a.ui.draggable, {
        version: "1.7.2",
        eventPrefix: "drag",
        defaults: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            cancel: ":input,option",
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            delay: 0,
            distance: 1,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        }
    });
    a.ui.plugin.add("draggable", "connectToSortable", {
        start: function(c, e){
            var d = a(this).data("draggable"), f = d.options, b = a.extend({}, e, {
                item: d.element
            });
            d.sortables = [];
            a(f.connectToSortable).each(function(){
                var g = a.data(this, "sortable");
                if (g && !g.options.disabled) {
                    d.sortables.push({
                        instance: g,
                        shouldRevert: g.options.revert
                    });
                    g._refreshItems();
                    g._trigger("activate", c, b)
                }
            })
        },
        stop: function(c, e){
            var d = a(this).data("draggable"), b = a.extend({}, e, {
                item: d.element
            });
            a.each(d.sortables, function(){
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    d.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) {
                        this.instance.options.revert = true
                    }
                    this.instance._mouseStop(c);
                    this.instance.options.helper = this.instance.options._helper;
                    if (d.options.helper == "original") {
                        this.instance.currentItem.css({
                            top: "auto",
                            left: "auto"
                        })
                    }
                }
                else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", c, b)
                }
            })
        },
        drag: function(c, f){
            var e = a(this).data("draggable"), b = this;
            var d = function(i){
                var n = this.offset.click.top, m = this.offset.click.left;
                var g = this.positionAbs.top, k = this.positionAbs.left;
                var j = i.height, l = i.width;
                var p = i.top, h = i.left;
                return a.ui.isOver(g + n, k + m, p, h, j, l)
            };
            a.each(e.sortables, function(g){
                this.instance.positionAbs = e.positionAbs;
                this.instance.helperProportions = e.helperProportions;
                this.instance.offset.click = e.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = a(b).clone().appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function(){
                            return f.helper[0]
                        };
                        c.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(c, true);
                        this.instance._mouseStart(c, true, true);
                        this.instance.offset.click.top = e.offset.click.top;
                        this.instance.offset.click.left = e.offset.click.left;
                        this.instance.offset.parent.left -= e.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= e.offset.parent.top - this.instance.offset.parent.top;
                        e._trigger("toSortable", c);
                        e.dropped = this.instance.element;
                        e.currentItem = e.element;
                        this.instance.fromOutside = e
                    }
                    if (this.instance.currentItem) {
                        this.instance._mouseDrag(c)
                    }
                }
                else {
                    if (this.instance.isOver) {
                        this.instance.isOver = 0;
                        this.instance.cancelHelperRemoval = true;
                        this.instance.options.revert = false;
                        this.instance._trigger("out", c, this.instance._uiHash(this.instance));
                        this.instance._mouseStop(c, true);
                        this.instance.options.helper = this.instance.options._helper;
                        this.instance.currentItem.remove();
                        if (this.instance.placeholder) {
                            this.instance.placeholder.remove()
                        }
                        e._trigger("fromSortable", c);
                        e.dropped = false
                    }
                }
            })
        }
    });
    a.ui.plugin.add("draggable", "cursor", {
        start: function(c, d){
            var b = a("body"), e = a(this).data("draggable").options;
            if (b.css("cursor")) {
                e._cursor = b.css("cursor")
            }
            b.css("cursor", e.cursor)
        },
        stop: function(b, c){
            var d = a(this).data("draggable").options;
            if (d._cursor) {
                a("body").css("cursor", d._cursor)
            }
        }
    });
    a.ui.plugin.add("draggable", "iframeFix", {
        start: function(b, c){
            var d = a(this).data("draggable").options;
            a(d.iframeFix === true ? "iframe" : d.iframeFix).each(function(){
                a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1000
                }).css(a(this).offset()).appendTo("body")
            })
        },
        stop: function(b, c){
            a("div.ui-draggable-iframeFix").each(function(){
                this.parentNode.removeChild(this)
            })
        }
    });
    a.ui.plugin.add("draggable", "opacity", {
        start: function(c, d){
            var b = a(d.helper), e = a(this).data("draggable").options;
            if (b.css("opacity")) {
                e._opacity = b.css("opacity")
            }
            b.css("opacity", e.opacity)
        },
        stop: function(b, c){
            var d = a(this).data("draggable").options;
            if (d._opacity) {
                a(c.helper).css("opacity", d._opacity)
            }
        }
    });
    a.ui.plugin.add("draggable", "scroll", {
        start: function(c, d){
            var b = a(this).data("draggable");
            if (b.scrollParent[0] != document && b.scrollParent[0].tagName != "HTML") {
                b.overflowOffset = b.scrollParent.offset()
            }
        },
        drag: function(d, e){
            var c = a(this).data("draggable"), f = c.options, b = false;
            if (c.scrollParent[0] != document && c.scrollParent[0].tagName != "HTML") {
                if (!f.axis || f.axis != "x") {
                    if ((c.overflowOffset.top + c.scrollParent[0].offsetHeight) - d.pageY < f.scrollSensitivity) {
                        c.scrollParent[0].scrollTop = b = c.scrollParent[0].scrollTop + f.scrollSpeed
                    }
                    else {
                        if (d.pageY - c.overflowOffset.top < f.scrollSensitivity) {
                            c.scrollParent[0].scrollTop = b = c.scrollParent[0].scrollTop - f.scrollSpeed
                        }
                    }
                }
                if (!f.axis || f.axis != "y") {
                    if ((c.overflowOffset.left + c.scrollParent[0].offsetWidth) - d.pageX < f.scrollSensitivity) {
                        c.scrollParent[0].scrollLeft = b = c.scrollParent[0].scrollLeft + f.scrollSpeed
                    }
                    else {
                        if (d.pageX - c.overflowOffset.left < f.scrollSensitivity) {
                            c.scrollParent[0].scrollLeft = b = c.scrollParent[0].scrollLeft - f.scrollSpeed
                        }
                    }
                }
            }
            else {
                if (!f.axis || f.axis != "x") {
                    if (d.pageY - a(document).scrollTop() < f.scrollSensitivity) {
                        b = a(document).scrollTop(a(document).scrollTop() - f.scrollSpeed)
                    }
                    else {
                        if (a(window).height() - (d.pageY - a(document).scrollTop()) < f.scrollSensitivity) {
                            b = a(document).scrollTop(a(document).scrollTop() + f.scrollSpeed)
                        }
                    }
                }
                if (!f.axis || f.axis != "y") {
                    if (d.pageX - a(document).scrollLeft() < f.scrollSensitivity) {
                        b = a(document).scrollLeft(a(document).scrollLeft() - f.scrollSpeed)
                    }
                    else {
                        if (a(window).width() - (d.pageX - a(document).scrollLeft()) < f.scrollSensitivity) {
                            b = a(document).scrollLeft(a(document).scrollLeft() + f.scrollSpeed)
                        }
                    }
                }
            }
            if (b !== false && a.ui.ddmanager && !f.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(c, d)
            }
        }
    });
    a.ui.plugin.add("draggable", "snap", {
        start: function(c, d){
            var b = a(this).data("draggable"), e = b.options;
            b.snapElements = [];
            a(e.snap.constructor != String ? (e.snap.items || ":data(draggable)") : e.snap).each(function(){
                var g = a(this);
                var f = g.offset();
                if (this != b.element[0]) {
                    b.snapElements.push({
                        item: this,
                        width: g.outerWidth(),
                        height: g.outerHeight(),
                        top: f.top,
                        left: f.left
                    })
                }
            })
        },
        drag: function(u, p){
            var g = a(this).data("draggable"), q = g.options;
            var y = q.snapTolerance;
            var x = p.offset.left, w = x + g.helperProportions.width, f = p.offset.top, e = f + g.helperProportions.height;
            for (var v = g.snapElements.length - 1; v >= 0; v--) {
                var s = g.snapElements[v].left, n = s + g.snapElements[v].width, m = g.snapElements[v].top, A = m + g.snapElements[v].height;
                if (!((s - y < x && x < n + y && m - y < f && f < A + y) || (s - y < x && x < n + y && m - y < e && e < A + y) || (s - y < w && w < n + y && m - y < f && f < A + y) || (s - y < w && w < n + y && m - y < e && e < A + y))) {
                    if (g.snapElements[v].snapping) {
                        (g.options.snap.release && g.options.snap.release.call(g.element, u, a.extend(g._uiHash(), {
                            snapItem: g.snapElements[v].item
                        })))
                    }
                    g.snapElements[v].snapping = false;
                    continue
                }
                if (q.snapMode != "inner") {
                    var c = Math.abs(m - e) <= y;
                    var z = Math.abs(A - f) <= y;
                    var j = Math.abs(s - w) <= y;
                    var k = Math.abs(n - x) <= y;
                    if (c) {
                        p.position.top = g._convertPositionTo("relative", {
                            top: m - g.helperProportions.height,
                            left: 0
                        }).top - g.margins.top
                    }
                    if (z) {
                        p.position.top = g._convertPositionTo("relative", {
                            top: A,
                            left: 0
                        }).top - g.margins.top
                    }
                    if (j) {
                        p.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: s - g.helperProportions.width
                        }).left - g.margins.left
                    }
                    if (k) {
                        p.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: n
                        }).left - g.margins.left
                    }
                }
                var h = (c || z || j || k);
                if (q.snapMode != "outer") {
                    var c = Math.abs(m - f) <= y;
                    var z = Math.abs(A - e) <= y;
                    var j = Math.abs(s - x) <= y;
                    var k = Math.abs(n - w) <= y;
                    if (c) {
                        p.position.top = g._convertPositionTo("relative", {
                            top: m,
                            left: 0
                        }).top - g.margins.top
                    }
                    if (z) {
                        p.position.top = g._convertPositionTo("relative", {
                            top: A - g.helperProportions.height,
                            left: 0
                        }).top - g.margins.top
                    }
                    if (j) {
                        p.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: s
                        }).left - g.margins.left
                    }
                    if (k) {
                        p.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: n - g.helperProportions.width
                        }).left - g.margins.left
                    }
                }
                if (!g.snapElements[v].snapping && (c || z || j || k || h)) {
                    (g.options.snap.snap && g.options.snap.snap.call(g.element, u, a.extend(g._uiHash(), {
                        snapItem: g.snapElements[v].item
                    })))
                }
                g.snapElements[v].snapping = (c || z || j || k || h)
            }
        }
    });
    a.ui.plugin.add("draggable", "stack", {
        start: function(b, c){
            var e = a(this).data("draggable").options;
            var d = a.makeArray(a(e.stack.group)).sort(function(g, f){
                return (parseInt(a(g).css("zIndex"), 10) || e.stack.min) - (parseInt(a(f).css("zIndex"), 10) || e.stack.min)
            });
            a(d).each(function(f){
                this.style.zIndex = e.stack.min + f
            });
            this[0].style.zIndex = e.stack.min + d.length
        }
    });
    a.ui.plugin.add("draggable", "zIndex", {
        start: function(c, d){
            var b = a(d.helper), e = a(this).data("draggable").options;
            if (b.css("zIndex")) {
                e._zIndex = b.css("zIndex")
            }
            b.css("zIndex", e.zIndex)
        },
        stop: function(b, c){
            var d = a(this).data("draggable").options;
            if (d._zIndex) {
                a(c.helper).css("zIndex", d._zIndex)
            }
        }
    })
})(jQuery);
;
/*
 * jQuery UI Droppable 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Droppables
 *
 * Depends:
 *	ui.core.js
 *	ui.draggable.js
 */
(function(a){
    a.widget("ui.droppable", {
        _init: function(){
            var c = this.options, b = c.accept;
            this.isover = 0;
            this.isout = 1;
            this.options.accept = this.options.accept && a.isFunction(this.options.accept) ? this.options.accept : function(e){
                return e.is(b)
            };
            this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            };
            a.ui.ddmanager.droppables[this.options.scope] = a.ui.ddmanager.droppables[this.options.scope] || [];
            a.ui.ddmanager.droppables[this.options.scope].push(this);
            (this.options.addClasses && this.element.addClass("ui-droppable"))
        },
        destroy: function(){
            var b = a.ui.ddmanager.droppables[this.options.scope];
            for (var c = 0; c < b.length; c++) {
                if (b[c] == this) {
                    b.splice(c, 1)
                }
            }
            this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable")
        },
        _setData: function(b, c){
            if (b == "accept") {
                this.options.accept = c && a.isFunction(c) ? c : function(e){
                    return e.is(c)
                }
            }
            else {
                a.widget.prototype._setData.apply(this, arguments)
            }
        },
        _activate: function(c){
            var b = a.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.addClass(this.options.activeClass)
            }
            (b && this._trigger("activate", c, this.ui(b)))
        },
        _deactivate: function(c){
            var b = a.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.removeClass(this.options.activeClass)
            }
            (b && this._trigger("deactivate", c, this.ui(b)))
        },
        _over: function(c){
            var b = a.ui.ddmanager.current;
            if (!b || (b.currentItem || b.element)[0] == this.element[0]) {
                return
            }
            if (this.options.accept.call(this.element[0], (b.currentItem || b.element))) {
                if (this.options.hoverClass) {
                    this.element.addClass(this.options.hoverClass)
                }
                this._trigger("over", c, this.ui(b))
            }
        },
        _out: function(c){
            var b = a.ui.ddmanager.current;
            if (!b || (b.currentItem || b.element)[0] == this.element[0]) {
                return
            }
            if (this.options.accept.call(this.element[0], (b.currentItem || b.element))) {
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("out", c, this.ui(b))
            }
        },
        _drop: function(c, d){
            var b = d || a.ui.ddmanager.current;
            if (!b || (b.currentItem || b.element)[0] == this.element[0]) {
                return false
            }
            var e = false;
            this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){
                var f = a.data(this, "droppable");
                if (f.options.greedy && a.ui.intersect(b, a.extend(f, {
                    offset: f.element.offset()
                }), f.options.tolerance)) {
                    e = true;
                    return false
                }
            });
            if (e) {
                return false
            }
            if (this.options.accept.call(this.element[0], (b.currentItem || b.element))) {
                if (this.options.activeClass) {
                    this.element.removeClass(this.options.activeClass)
                }
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("drop", c, this.ui(b));
                return this.element
            }
            return false
        },
        ui: function(b){
            return {
                draggable: (b.currentItem || b.element),
                helper: b.helper,
                position: b.position,
                absolutePosition: b.positionAbs,
                offset: b.positionAbs
            }
        }
    });
    a.extend(a.ui.droppable, {
        version: "1.7.2",
        eventPrefix: "drop",
        defaults: {
            accept: "*",
            activeClass: false,
            addClasses: true,
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect"
        }
    });
    a.ui.intersect = function(q, j, o){
        if (!j.offset) {
            return false
        }
        var e = (q.positionAbs || q.position.absolute).left, d = e + q.helperProportions.width, n = (q.positionAbs || q.position.absolute).top, m = n + q.helperProportions.height;
        var g = j.offset.left, c = g + j.proportions.width, p = j.offset.top, k = p + j.proportions.height;
        switch (o) {
            case "fit":
                return (g < e && d < c && p < n && m < k);
                break;
            case "intersect":
                return (g < e + (q.helperProportions.width / 2) && d - (q.helperProportions.width / 2) < c && p < n + (q.helperProportions.height / 2) && m - (q.helperProportions.height / 2) < k);
                break;
            case "pointer":
                var h = ((q.positionAbs || q.position.absolute).left + (q.clickOffset || q.offset.click).left), i = ((q.positionAbs || q.position.absolute).top + (q.clickOffset || q.offset.click).top), f = a.ui.isOver(i, h, p, g, j.proportions.height, j.proportions.width);
                return f;
                break;
            case "touch":
                return ((n >= p && n <= k) || (m >= p && m <= k) || (n < p && m > k)) && ((e >= g && e <= c) || (d >= g && d <= c) || (e < g && d > c));
                break;
            default:
                return false;
                break
        }
    };
    a.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(e, g){
            var b = a.ui.ddmanager.droppables[e.options.scope];
            var f = g ? g.type : null;
            var h = (e.currentItem || e.element).find(":data(droppable)").andSelf();
            droppablesLoop: for (var d = 0; d < b.length; d++) {
                if (b[d].options.disabled || (e && !b[d].options.accept.call(b[d].element[0], (e.currentItem || e.element)))) {
                    continue
                }
                for (var c = 0; c < h.length; c++) {
                    if (h[c] == b[d].element[0]) {
                        b[d].proportions.height = 0;
                        continue droppablesLoop
                    }
                }
                b[d].visible = b[d].element.css("display") != "none";
                if (!b[d].visible) {
                    continue
                }
                b[d].offset = b[d].element.offset();
                b[d].proportions = {
                    width: b[d].element[0].offsetWidth,
                    height: b[d].element[0].offsetHeight
                };
                if (f == "mousedown") {
                    b[d]._activate.call(b[d], g)
                }
            }
        },
        drop: function(b, c){
            var d = false;
            a.each(a.ui.ddmanager.droppables[b.options.scope], function(){
                if (!this.options) {
                    return
                }
                if (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance)) {
                    d = this._drop.call(this, c)
                }
                if (!this.options.disabled && this.visible && this.options.accept.call(this.element[0], (b.currentItem || b.element))) {
                    this.isout = 1;
                    this.isover = 0;
                    this._deactivate.call(this, c)
                }
            });
            return d
        },
        drag: function(b, c){
            if (b.options.refreshPositions) {
                a.ui.ddmanager.prepareOffsets(b, c)
            }
            a.each(a.ui.ddmanager.droppables[b.options.scope], function(){
                if (this.options.disabled || this.greedyChild || !this.visible) {
                    return
                }
                var e = a.ui.intersect(b, this, this.options.tolerance);
                var g = !e && this.isover == 1 ? "isout" : (e && this.isover == 0 ? "isover" : null);
                if (!g) {
                    return
                }
                var f;
                if (this.options.greedy) {
                    var d = this.element.parents(":data(droppable):eq(0)");
                    if (d.length) {
                        f = a.data(d[0], "droppable");
                        f.greedyChild = (g == "isover" ? 1 : 0)
                    }
                }
                if (f && g == "isover") {
                    f.isover = 0;
                    f.isout = 1;
                    f._out.call(f, c)
                }
                this[g] = 1;
                this[g == "isout" ? "isover" : "isout"] = 0;
                this[g == "isover" ? "_over" : "_out"].call(this, c);
                if (f && g == "isout") {
                    f.isout = 0;
                    f.isover = 1;
                    f._over.call(f, c)
                }
            })
        }
    }
})(jQuery);
;
/*
 * jQuery UI Sortable 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	ui.core.js
 */
(function(a){
    a.widget("ui.sortable", a.extend({}, a.ui.mouse, {
        _init: function(){
            var b = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? (/left|right/).test(this.items[0].item.css("float")) : false;
            this.offset = this.element.offset();
            this._mouseInit()
        },
        destroy: function(){
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var b = this.items.length - 1; b >= 0; b--) {
                this.items[b].item.removeData("sortable-item")
            }
        },
        _mouseCapture: function(e, f){
            if (this.reverting) {
                return false
            }
            if (this.options.disabled || this.options.type == "static") {
                return false
            }
            this._refreshItems(e);
            var d = null, c = this, b = a(e.target).parents().each(function(){
                if (a.data(this, "sortable-item") == c) {
                    d = a(this);
                    return false
                }
            });
            if (a.data(e.target, "sortable-item") == c) {
                d = a(e.target)
            }
            if (!d) {
                return false
            }
            if (this.options.handle && !f) {
                var g = false;
                a(this.options.handle, d).find("*").andSelf().each(function(){
                    if (this == e.target) {
                        g = true
                    }
                });
                if (!g) {
                    return false
                }
            }
            this.currentItem = d;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function(e, f, b){
            var g = this.options, c = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(e);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            a.extend(this.offset, {
                click: {
                    left: e.pageX - this.offset.left,
                    top: e.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(e);
            this.originalPageX = e.pageX;
            this.originalPageY = e.pageY;
            if (g.cursorAt) {
                this._adjustOffsetFromHelper(g.cursorAt)
            }
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            if (this.helper[0] != this.currentItem[0]) {
                this.currentItem.hide()
            }
            this._createPlaceholder();
            if (g.containment) {
                this._setContainment()
            }
            if (g.cursor) {
                if (a("body").css("cursor")) {
                    this._storedCursor = a("body").css("cursor")
                }
                a("body").css("cursor", g.cursor)
            }
            if (g.opacity) {
                if (this.helper.css("opacity")) {
                    this._storedOpacity = this.helper.css("opacity")
                }
                this.helper.css("opacity", g.opacity)
            }
            if (g.zIndex) {
                if (this.helper.css("zIndex")) {
                    this._storedZIndex = this.helper.css("zIndex")
                }
                this.helper.css("zIndex", g.zIndex)
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                this.overflowOffset = this.scrollParent.offset()
            }
            this._trigger("start", e, this._uiHash());
            if (!this._preserveHelperProportions) {
                this._cacheHelperProportions()
            }
            if (!b) {
                for (var d = this.containers.length - 1; d >= 0; d--) {
                    this.containers[d]._trigger("activate", e, c._uiHash(this))
                }
            }
            if (a.ui.ddmanager) {
                a.ui.ddmanager.current = this
            }
            if (a.ui.ddmanager && !g.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(this, e)
            }
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(e);
            return true
        },
        _mouseDrag: function(f){
            this.position = this._generatePosition(f);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) {
                this.lastPositionAbs = this.positionAbs
            }
            if (this.options.scroll) {
                var g = this.options, b = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - f.pageY < g.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = b = this.scrollParent[0].scrollTop + g.scrollSpeed
                    }
                    else {
                        if (f.pageY - this.overflowOffset.top < g.scrollSensitivity) {
                            this.scrollParent[0].scrollTop = b = this.scrollParent[0].scrollTop - g.scrollSpeed
                        }
                    }
                    if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - f.pageX < g.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = b = this.scrollParent[0].scrollLeft + g.scrollSpeed
                    }
                    else {
                        if (f.pageX - this.overflowOffset.left < g.scrollSensitivity) {
                            this.scrollParent[0].scrollLeft = b = this.scrollParent[0].scrollLeft - g.scrollSpeed
                        }
                    }
                }
                else {
                    if (f.pageY - a(document).scrollTop() < g.scrollSensitivity) {
                        b = a(document).scrollTop(a(document).scrollTop() - g.scrollSpeed)
                    }
                    else {
                        if (a(window).height() - (f.pageY - a(document).scrollTop()) < g.scrollSensitivity) {
                            b = a(document).scrollTop(a(document).scrollTop() + g.scrollSpeed)
                        }
                    }
                    if (f.pageX - a(document).scrollLeft() < g.scrollSensitivity) {
                        b = a(document).scrollLeft(a(document).scrollLeft() - g.scrollSpeed)
                    }
                    else {
                        if (a(window).width() - (f.pageX - a(document).scrollLeft()) < g.scrollSensitivity) {
                            b = a(document).scrollLeft(a(document).scrollLeft() + g.scrollSpeed)
                        }
                    }
                }
                if (b !== false && a.ui.ddmanager && !g.dropBehaviour) {
                    a.ui.ddmanager.prepareOffsets(this, f)
                }
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            for (var d = this.items.length - 1; d >= 0; d--) {
                var e = this.items[d], c = e.item[0], h = this._intersectsWithPointer(e);
                if (!h) {
                    continue
                }
                if (c != this.currentItem[0] && this.placeholder[h == 1 ? "next" : "prev"]()[0] != c && !a.ui.contains(this.placeholder[0], c) && (this.options.type == "semi-dynamic" ? !a.ui.contains(this.element[0], c) : true)) {
                    this.direction = h == 1 ? "down" : "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(e)) {
                        this._rearrange(f, e)
                    }
                    else {
                        break
                    }
                    this._trigger("change", f, this._uiHash());
                    break
                }
            }
            this._contactContainers(f);
            if (a.ui.ddmanager) {
                a.ui.ddmanager.drag(this, f)
            }
            this._trigger("sort", f, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function(c, d){
            if (!c) {
                return
            }
            if (a.ui.ddmanager && !this.options.dropBehaviour) {
                a.ui.ddmanager.drop(this, c)
            }
            if (this.options.revert) {
                var b = this;
                var e = b.placeholder.offset();
                b.reverting = true;
                a(this.helper).animate({
                    left: e.left - this.offset.parent.left - b.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                    top: e.top - this.offset.parent.top - b.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                }, parseInt(this.options.revert, 10) || 500, function(){
                    b._clear(c)
                })
            }
            else {
                this._clear(c, d)
            }
            return false
        },
        cancel: function(){
            var b = this;
            if (this.dragging) {
                this._mouseUp();
                if (this.options.helper == "original") {
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                }
                else {
                    this.currentItem.show()
                }
                for (var c = this.containers.length - 1; c >= 0; c--) {
                    this.containers[c]._trigger("deactivate", null, b._uiHash(this));
                    if (this.containers[c].containerCache.over) {
                        this.containers[c]._trigger("out", null, b._uiHash(this));
                        this.containers[c].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder[0].parentNode) {
                this.placeholder[0].parentNode.removeChild(this.placeholder[0])
            }
            if (this.options.helper != "original" && this.helper && this.helper[0].parentNode) {
                this.helper.remove()
            }
            a.extend(this, {
                helper: null,
                dragging: false,
                reverting: false,
                _noFinalSort: null
            });
            if (this.domPosition.prev) {
                a(this.domPosition.prev).after(this.currentItem)
            }
            else {
                a(this.domPosition.parent).prepend(this.currentItem)
            }
            return true
        },
        serialize: function(d){
            var b = this._getItemsAsjQuery(d && d.connected);
            var c = [];
            d = d || {};
            a(b).each(function(){
                var e = (a(d.item || this).attr(d.attribute || "id") || "").match(d.expression || (/(.+)[-=_](.+)/));
                if (e) {
                    c.push((d.key || e[1] + "[]") + "=" + (d.key && d.expression ? e[1] : e[2]))
                }
            });
            return c.join("&")
        },
        toArray: function(d){
            var b = this._getItemsAsjQuery(d && d.connected);
            var c = [];
            d = d || {};
            b.each(function(){
                c.push(a(d.item || this).attr(d.attribute || "id") || "")
            });
            return c
        },
        _intersectsWith: function(m){
            var e = this.positionAbs.left, d = e + this.helperProportions.width, k = this.positionAbs.top, j = k + this.helperProportions.height;
            var f = m.left, c = f + m.width, n = m.top, i = n + m.height;
            var o = this.offset.click.top, h = this.offset.click.left;
            var g = (k + o) > n && (k + o) < i && (e + h) > f && (e + h) < c;
            if (this.options.tolerance == "pointer" || this.options.forcePointerForContainers || (this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > m[this.floating ? "width" : "height"])) {
                return g
            }
            else {
                return (f < e + (this.helperProportions.width / 2) && d - (this.helperProportions.width / 2) < c && n < k + (this.helperProportions.height / 2) && j - (this.helperProportions.height / 2) < i)
            }
        },
        _intersectsWithPointer: function(d){
            var e = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, d.top, d.height), c = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, d.left, d.width), g = e && c, b = this._getDragVerticalDirection(), f = this._getDragHorizontalDirection();
            if (!g) {
                return false
            }
            return this.floating ? (((f && f == "right") || b == "down") ? 2 : 1) : (b && (b == "down" ? 2 : 1))
        },
        _intersectsWithSides: function(e){
            var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top + (e.height / 2), e.height), d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left + (e.width / 2), e.width), b = this._getDragVerticalDirection(), f = this._getDragHorizontalDirection();
            if (this.floating && f) {
                return ((f == "right" && d) || (f == "left" && !d))
            }
            else {
                return b && ((b == "down" && c) || (b == "up" && !c))
            }
        },
        _getDragVerticalDirection: function(){
            var b = this.positionAbs.top - this.lastPositionAbs.top;
            return b != 0 && (b > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function(){
            var b = this.positionAbs.left - this.lastPositionAbs.left;
            return b != 0 && (b > 0 ? "right" : "left")
        },
        refresh: function(b){
            this._refreshItems(b);
            this.refreshPositions()
        },
        _connectWith: function(){
            var b = this.options;
            return b.connectWith.constructor == String ? [b.connectWith] : b.connectWith
        },
        _getItemsAsjQuery: function(b){
            var l = this;
            var g = [];
            var e = [];
            var h = this._connectWith();
            if (h && b) {
                for (var d = h.length - 1; d >= 0; d--) {
                    var k = a(h[d]);
                    for (var c = k.length - 1; c >= 0; c--) {
                        var f = a.data(k[c], "sortable");
                        if (f && f != this && !f.options.disabled) {
                            e.push([a.isFunction(f.options.items) ? f.options.items.call(f.element) : a(f.options.items, f.element).not(".ui-sortable-helper"), f])
                        }
                    }
                }
            }
            e.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : a(this.options.items, this.element).not(".ui-sortable-helper"), this]);
            for (var d = e.length - 1; d >= 0; d--) {
                e[d][0].each(function(){
                    g.push(this)
                })
            }
            return a(g)
        },
        _removeCurrentsFromItems: function(){
            var d = this.currentItem.find(":data(sortable-item)");
            for (var c = 0; c < this.items.length; c++) {
                for (var b = 0; b < d.length; b++) {
                    if (d[b] == this.items[c].item[0]) {
                        this.items.splice(c, 1)
                    }
                }
            }
        },
        _refreshItems: function(b){
            this.items = [];
            this.containers = [this];
            var h = this.items;
            var p = this;
            var f = [[a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {
                item: this.currentItem
            }) : a(this.options.items, this.element), this]];
            var l = this._connectWith();
            if (l) {
                for (var e = l.length - 1; e >= 0; e--) {
                    var m = a(l[e]);
                    for (var d = m.length - 1; d >= 0; d--) {
                        var g = a.data(m[d], "sortable");
                        if (g && g != this && !g.options.disabled) {
                            f.push([a.isFunction(g.options.items) ? g.options.items.call(g.element[0], b, {
                                item: this.currentItem
                            }) : a(g.options.items, g.element), g]);
                            this.containers.push(g)
                        }
                    }
                }
            }
            for (var e = f.length - 1; e >= 0; e--) {
                var k = f[e][1];
                var c = f[e][0];
                for (var d = 0, n = c.length; d < n; d++) {
                    var o = a(c[d]);
                    o.data("sortable-item", k);
                    h.push({
                        item: o,
                        instance: k,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function(b){
            if (this.offsetParent && this.helper) {
                this.offset.parent = this._getParentOffset()
            }
            for (var d = this.items.length - 1; d >= 0; d--) {
                var e = this.items[d];
                if (e.instance != this.currentContainer && this.currentContainer && e.item[0] != this.currentItem[0]) {
                    continue
                }
                var c = this.options.toleranceElement ? a(this.options.toleranceElement, e.item) : e.item;
                if (!b) {
                    e.width = c.outerWidth();
                    e.height = c.outerHeight()
                }
                var f = c.offset();
                e.left = f.left;
                e.top = f.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            }
            else {
                for (var d = this.containers.length - 1; d >= 0; d--) {
                    var f = this.containers[d].element.offset();
                    this.containers[d].containerCache.left = f.left;
                    this.containers[d].containerCache.top = f.top;
                    this.containers[d].containerCache.width = this.containers[d].element.outerWidth();
                    this.containers[d].containerCache.height = this.containers[d].element.outerHeight()
                }
            }
        },
        _createPlaceholder: function(d){
            var b = d || this, e = b.options;
            if (!e.placeholder || e.placeholder.constructor == String) {
                var c = e.placeholder;
                e.placeholder = {
                    element: function(){
                        var f = a(document.createElement(b.currentItem[0].nodeName)).addClass(c || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!c) {
                            f.style.visibility = "hidden"
                        }
                        return f
                    },
                    update: function(f, g){
                        if (c && !e.forcePlaceholderSize) {
                            return
                        }
                        if (!g.height()) {
                            g.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10))
                        }
                        if (!g.width()) {
                            g.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            b.placeholder = a(e.placeholder.element.call(b.element, b.currentItem));
            b.currentItem.after(b.placeholder);
            e.placeholder.update(b, b.placeholder)
        },
        _contactContainers: function(d){
            for (var c = this.containers.length - 1; c >= 0; c--) {
                if (this._intersectsWith(this.containers[c].containerCache)) {
                    if (!this.containers[c].containerCache.over) {
                        if (this.currentContainer != this.containers[c]) {
                            var h = 10000;
                            var g = null;
                            var e = this.positionAbs[this.containers[c].floating ? "left" : "top"];
                            for (var b = this.items.length - 1; b >= 0; b--) {
                                if (!a.ui.contains(this.containers[c].element[0], this.items[b].item[0])) {
                                    continue
                                }
                                var f = this.items[b][this.containers[c].floating ? "left" : "top"];
                                if (Math.abs(f - e) < h) {
                                    h = Math.abs(f - e);
                                    g = this.items[b]
                                }
                            }
                            if (!g && !this.options.dropOnEmpty) {
                                continue
                            }
                            this.currentContainer = this.containers[c];
                            g ? this._rearrange(d, g, null, true) : this._rearrange(d, null, this.containers[c].element, true);
                            this._trigger("change", d, this._uiHash());
                            this.containers[c]._trigger("change", d, this._uiHash(this));
                            this.options.placeholder.update(this.currentContainer, this.placeholder)
                        }
                        this.containers[c]._trigger("over", d, this._uiHash(this));
                        this.containers[c].containerCache.over = 1
                    }
                }
                else {
                    if (this.containers[c].containerCache.over) {
                        this.containers[c]._trigger("out", d, this._uiHash(this));
                        this.containers[c].containerCache.over = 0
                    }
                }
            }
        },
        _createHelper: function(c){
            var d = this.options;
            var b = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [c, this.currentItem])) : (d.helper == "clone" ? this.currentItem.clone() : this.currentItem);
            if (!b.parents("body").length) {
                a(d.appendTo != "parent" ? d.appendTo : this.currentItem[0].parentNode)[0].appendChild(b[0])
            }
            if (b[0] == this.currentItem[0]) {
                this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }
            }
            if (b[0].style.width == "" || d.forceHelperSize) {
                b.width(this.currentItem.width())
            }
            if (b[0].style.height == "" || d.forceHelperSize) {
                b.height(this.currentItem.height())
            }
            return b
        },
        _adjustOffsetFromHelper: function(b){
            if (b.left != undefined) {
                this.offset.click.left = b.left + this.margins.left
            }
            if (b.right != undefined) {
                this.offset.click.left = this.helperProportions.width - b.right + this.margins.left
            }
            if (b.top != undefined) {
                this.offset.click.top = b.top + this.margins.top
            }
            if (b.bottom != undefined) {
                this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top
            }
        },
        _getParentOffset: function(){
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                b.left += this.scrollParent.scrollLeft();
                b.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)) {
                b = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function(){
            if (this.cssPosition == "relative") {
                var b = this.currentItem.position();
                return {
                    top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function(){
            this.margins = {
                left: (parseInt(this.currentItem.css("marginLeft"), 10) || 0),
                top: (parseInt(this.currentItem.css("marginTop"), 10) || 0)
            }
        },
        _cacheHelperProportions: function(){
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function(){
            var e = this.options;
            if (e.containment == "parent") {
                e.containment = this.helper[0].parentNode
            }
            if (e.containment == "document" || e.containment == "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(e.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(e.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(e.containment)) {
                var c = a(e.containment)[0];
                var d = a(e.containment).offset();
                var b = (a(c).css("overflow") != "hidden");
                this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (b ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (b ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function(f, h){
            if (!h) {
                h = this.position
            }
            var c = f == "absolute" ? 1 : -1;
            var e = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = (/(html|body)/i).test(b[0].tagName);
            return {
                top: (h.top + this.offset.relative.top * c + this.offset.parent.top * c - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (g ? 0 : b.scrollTop())) * c)),
                left: (h.left + this.offset.relative.left * c + this.offset.parent.left * c - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : b.scrollLeft()) * c))
            }
        },
        _generatePosition: function(e){
            var h = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, i = (/(html|body)/i).test(b[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            var d = e.pageX;
            var c = e.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (e.pageX - this.offset.click.left < this.containment[0]) {
                        d = this.containment[0] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top < this.containment[1]) {
                        c = this.containment[1] + this.offset.click.top
                    }
                    if (e.pageX - this.offset.click.left > this.containment[2]) {
                        d = this.containment[2] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top > this.containment[3]) {
                        c = this.containment[3] + this.offset.click.top
                    }
                }
                if (h.grid) {
                    var g = this.originalPageY + Math.round((c - this.originalPageY) / h.grid[1]) * h.grid[1];
                    c = this.containment ? (!(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : (!(g - this.offset.click.top < this.containment[1]) ? g - h.grid[1] : g + h.grid[1])) : g;
                    var f = this.originalPageX + Math.round((d - this.originalPageX) / h.grid[0]) * h.grid[0];
                    d = this.containment ? (!(f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2]) ? f : (!(f - this.offset.click.left < this.containment[0]) ? f - h.grid[0] : f + h.grid[0])) : f
                }
            }
            return {
                top: (c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (i ? 0 : b.scrollTop())))),
                left: (d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : b.scrollLeft())))
            }
        },
        _rearrange: function(g, f, c, e){
            c ? c[0].appendChild(this.placeholder[0]) : f.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction == "down" ? f.item[0] : f.item[0].nextSibling));
            this.counter = this.counter ? ++this.counter : 1;
            var d = this, b = this.counter;
            window.setTimeout(function(){
                if (b == d.counter) {
                    d.refreshPositions(!e)
                }
            }, 0)
        },
        _clear: function(d, e){
            this.reverting = false;
            var f = [], b = this;
            if (!this._noFinalSort && this.currentItem[0].parentNode) {
                this.placeholder.before(this.currentItem)
            }
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var c in this._storedCSS) {
                    if (this._storedCSS[c] == "auto" || this._storedCSS[c] == "static") {
                        this._storedCSS[c] = ""
                    }
                }
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            }
            else {
                this.currentItem.show()
            }
            if (this.fromOutside && !e) {
                f.push(function(g){
                    this._trigger("receive", g, this._uiHash(this.fromOutside))
                })
            }
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !e) {
                f.push(function(g){
                    this._trigger("update", g, this._uiHash())
                })
            }
            if (!a.ui.contains(this.element[0], this.currentItem[0])) {
                if (!e) {
                    f.push(function(g){
                        this._trigger("remove", g, this._uiHash())
                    })
                }
                for (var c = this.containers.length - 1; c >= 0; c--) {
                    if (a.ui.contains(this.containers[c].element[0], this.currentItem[0]) && !e) {
                        f.push((function(g){
                            return function(h){
                                g._trigger("receive", h, this._uiHash(this))
                            }
                        }).call(this, this.containers[c]));
                        f.push((function(g){
                            return function(h){
                                g._trigger("update", h, this._uiHash(this))
                            }
                        }).call(this, this.containers[c]))
                    }
                }
            }
            for (var c = this.containers.length - 1; c >= 0; c--) {
                if (!e) {
                    f.push((function(g){
                        return function(h){
                            g._trigger("deactivate", h, this._uiHash(this))
                        }
                    }).call(this, this.containers[c]))
                }
                if (this.containers[c].containerCache.over) {
                    f.push((function(g){
                        return function(h){
                            g._trigger("out", h, this._uiHash(this))
                        }
                    }).call(this, this.containers[c]));
                    this.containers[c].containerCache.over = 0
                }
            }
            if (this._storedCursor) {
                a("body").css("cursor", this._storedCursor)
            }
            if (this._storedOpacity) {
                this.helper.css("opacity", this._storedOpacity)
            }
            if (this._storedZIndex) {
                this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex)
            }
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!e) {
                    this._trigger("beforeStop", d, this._uiHash());
                    for (var c = 0; c < f.length; c++) {
                        f[c].call(this, d)
                    }
                    this._trigger("stop", d, this._uiHash())
                }
                return false
            }
            if (!e) {
                this._trigger("beforeStop", d, this._uiHash())
            }
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            if (this.helper[0] != this.currentItem[0]) {
                this.helper.remove()
            }
            this.helper = null;
            if (!e) {
                for (var c = 0; c < f.length; c++) {
                    f[c].call(this, d)
                }
                this._trigger("stop", d, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function(){
            if (a.widget.prototype._trigger.apply(this, arguments) === false) {
                this.cancel()
            }
        },
        _uiHash: function(c){
            var b = c || this;
            return {
                helper: b.helper,
                placeholder: b.placeholder || a([]),
                position: b.position,
                absolutePosition: b.positionAbs,
                offset: b.positionAbs,
                item: b.currentItem,
                sender: c ? c.element : null
            }
        }
    }));
    a.extend(a.ui.sortable, {
        getter: "serialize toArray",
        version: "1.7.2",
        eventPrefix: "sort",
        defaults: {
            appendTo: "parent",
            axis: false,
            cancel: ":input,option",
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            delay: 0,
            distance: 1,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1000
        }
    })
})(jQuery);
;
/*
 * jQuery UI Effects 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/
 */
jQuery.effects || (function(d){
    d.effects = {
        version: "1.7.2",
        save: function(g, h){
            for (var f = 0; f < h.length; f++) {
                if (h[f] !== null) {
                    g.data("ec.storage." + h[f], g[0].style[h[f]])
                }
            }
        },
        restore: function(g, h){
            for (var f = 0; f < h.length; f++) {
                if (h[f] !== null) {
                    g.css(h[f], g.data("ec.storage." + h[f]))
                }
            }
        },
        setMode: function(f, g){
            if (g == "toggle") {
                g = f.is(":hidden") ? "show" : "hide"
            }
            return g
        },
        getBaseline: function(g, h){
            var i, f;
            switch (g[0]) {
                case "top":
                    i = 0;
                    break;
                case "middle":
                    i = 0.5;
                    break;
                case "bottom":
                    i = 1;
                    break;
                default:
                    i = g[0] / h.height
            }
            switch (g[1]) {
                case "left":
                    f = 0;
                    break;
                case "center":
                    f = 0.5;
                    break;
                case "right":
                    f = 1;
                    break;
                default:
                    f = g[1] / h.width
            }
            return {
                x: f,
                y: i
            }
        },
        createWrapper: function(f){
            if (f.parent().is(".ui-effects-wrapper")) {
                return f.parent()
            }
            var g = {
                width: f.outerWidth(true),
                height: f.outerHeight(true),
                "float": f.css("float")
            };
            f.wrap('<div class="ui-effects-wrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');
            var j = f.parent();
            if (f.css("position") == "static") {
                j.css({
                    position: "relative"
                });
                f.css({
                    position: "relative"
                })
            }
            else {
                var i = f.css("top");
                if (isNaN(parseInt(i, 10))) {
                    i = "auto"
                }
                var h = f.css("left");
                if (isNaN(parseInt(h, 10))) {
                    h = "auto"
                }
                j.css({
                    position: f.css("position"),
                    top: i,
                    left: h,
                    zIndex: f.css("z-index")
                }).show();
                f.css({
                    position: "relative",
                    top: 0,
                    left: 0
                })
            }
            j.css(g);
            return j
        },
        removeWrapper: function(f){
            if (f.parent().is(".ui-effects-wrapper")) {
                return f.parent().replaceWith(f)
            }
            return f
        },
        setTransition: function(g, i, f, h){
            h = h || {};
            d.each(i, function(k, j){
                unit = g.cssUnit(j);
                if (unit[0] > 0) {
                    h[j] = unit[0] * f + unit[1]
                }
            });
            return h
        },
        animateClass: function(h, i, k, j){
            var f = (typeof k == "function" ? k : (j ? j : null));
            var g = (typeof k == "string" ? k : null);
            return this.each(function(){
                var q = {};
                var o = d(this);
                var p = o.attr("style") || "";
                if (typeof p == "object") {
                    p = p.cssText
                }
                if (h.toggle) {
                    o.hasClass(h.toggle) ? h.remove = h.toggle : h.add = h.toggle
                }
                var l = d.extend({}, (document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle));
                if (h.add) {
                    o.addClass(h.add)
                }
                if (h.remove) {
                    o.removeClass(h.remove)
                }
                var m = d.extend({}, (document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle));
                if (h.add) {
                    o.removeClass(h.add)
                }
                if (h.remove) {
                    o.addClass(h.remove)
                }
                for (var r in m) {
                    if (typeof m[r] != "function" && m[r] && r.indexOf("Moz") == -1 && r.indexOf("length") == -1 && m[r] != l[r] && (r.match(/color/i) || (!r.match(/color/i) && !isNaN(parseInt(m[r], 10)))) && (l.position != "static" || (l.position == "static" && !r.match(/left|top|bottom|right/)))) {
                        q[r] = m[r]
                    }
                }
                o.animate(q, i, g, function(){
                    if (typeof d(this).attr("style") == "object") {
                        d(this).attr("style")["cssText"] = "";
                        d(this).attr("style")["cssText"] = p
                    }
                    else {
                        d(this).attr("style", p)
                    }
                    if (h.add) {
                        d(this).addClass(h.add)
                    }
                    if (h.remove) {
                        d(this).removeClass(h.remove)
                    }
                    if (f) {
                        f.apply(this, arguments)
                    }
                })
            })
        }
    };
    function c(g, f){
        var i = g[1] && g[1].constructor == Object ? g[1] : {};
        if (f) {
            i.mode = f
        }
        var h = g[1] && g[1].constructor != Object ? g[1] : (i.duration ? i.duration : g[2]);
        h = d.fx.off ? 0 : typeof h === "number" ? h : d.fx.speeds[h] || d.fx.speeds._default;
        var j = i.callback || (d.isFunction(g[1]) && g[1]) || (d.isFunction(g[2]) && g[2]) || (d.isFunction(g[3]) && g[3]);
        return [g[0], i, h, j]
    }
    d.fn.extend({
        _show: d.fn.show,
        _hide: d.fn.hide,
        __toggle: d.fn.toggle,
        _addClass: d.fn.addClass,
        _removeClass: d.fn.removeClass,
        _toggleClass: d.fn.toggleClass,
        effect: function(g, f, h, i){
            return d.effects[g] ? d.effects[g].call(this, {
                method: g,
                options: f || {},
                duration: h,
                callback: i
            }) : null
        },
        show: function(){
            if (!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0]))) {
                return this._show.apply(this, arguments)
            }
            else {
                return this.effect.apply(this, c(arguments, "show"))
            }
        },
        hide: function(){
            if (!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0]))) {
                return this._hide.apply(this, arguments)
            }
            else {
                return this.effect.apply(this, c(arguments, "hide"))
            }
        },
        toggle: function(){
            if (!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0])) || (d.isFunction(arguments[0]) || typeof arguments[0] == "boolean")) {
                return this.__toggle.apply(this, arguments)
            }
            else {
                return this.effect.apply(this, c(arguments, "toggle"))
            }
        },
        addClass: function(g, f, i, h){
            return f ? d.effects.animateClass.apply(this, [{
                add: g
            }, f, i, h]) : this._addClass(g)
        },
        removeClass: function(g, f, i, h){
            return f ? d.effects.animateClass.apply(this, [{
                remove: g
            }, f, i, h]) : this._removeClass(g)
        },
        toggleClass: function(g, f, i, h){
            return ((typeof f !== "boolean") && f) ? d.effects.animateClass.apply(this, [{
                toggle: g
            }, f, i, h]) : this._toggleClass(g, f)
        },
        morph: function(f, h, g, j, i){
            return d.effects.animateClass.apply(this, [{
                add: h,
                remove: f
            }, g, j, i])
        },
        switchClass: function(){
            return this.morph.apply(this, arguments)
        },
        cssUnit: function(f){
            var g = this.css(f), h = [];
            d.each(["em", "px", "%", "pt"], function(j, k){
                if (g.indexOf(k) > 0) {
                    h = [parseFloat(g), k]
                }
            });
            return h
        }
    });
    d.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function(g, f){
        d.fx.step[f] = function(h){
            if (h.state == 0) {
                h.start = e(h.elem, f);
                h.end = b(h.end)
            }
            h.elem.style[f] = "rgb(" + [Math.max(Math.min(parseInt((h.pos * (h.end[0] - h.start[0])) + h.start[0], 10), 255), 0), Math.max(Math.min(parseInt((h.pos * (h.end[1] - h.start[1])) + h.start[1], 10), 255), 0), Math.max(Math.min(parseInt((h.pos * (h.end[2] - h.start[2])) + h.start[2], 10), 255), 0)].join(",") + ")"
        }
    });
    function b(g){
        var f;
        if (g && g.constructor == Array && g.length == 3) {
            return g
        }
        if (f = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(g)) {
            return [parseInt(f[1], 10), parseInt(f[2], 10), parseInt(f[3], 10)]
        }
        if (f = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(g)) {
            return [parseFloat(f[1]) * 2.55, parseFloat(f[2]) * 2.55, parseFloat(f[3]) * 2.55]
        }
        if (f = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(g)) {
            return [parseInt(f[1], 16), parseInt(f[2], 16), parseInt(f[3], 16)]
        }
        if (f = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(g)) {
            return [parseInt(f[1] + f[1], 16), parseInt(f[2] + f[2], 16), parseInt(f[3] + f[3], 16)]
        }
        if (f = /rgba\(0, 0, 0, 0\)/.exec(g)) {
            return a.transparent
        }
        return a[d.trim(g).toLowerCase()]
    }
    function e(h, f){
        var g;
        do {
            g = d.curCSS(h, f);
            if (g != "" && g != "transparent" || d.nodeName(h, "body")) {
                break
            }
            f = "backgroundColor"
        }
        while (h = h.parentNode);
        return b(g)
    }
    var a = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    };
    d.easing.jswing = d.easing.swing;
    d.extend(d.easing, {
        def: "easeOutQuad",
        swing: function(g, h, f, j, i){
            return d.easing[d.easing.def](g, h, f, j, i)
        },
        easeInQuad: function(g, h, f, j, i){
            return j * (h /= i) * h + f
        },
        easeOutQuad: function(g, h, f, j, i){
            return -j * (h /= i) * (h - 2) + f
        },
        easeInOutQuad: function(g, h, f, j, i){
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h + f
            }
            return -j / 2 * ((--h) * (h - 2) - 1) + f
        },
        easeInCubic: function(g, h, f, j, i){
            return j * (h /= i) * h * h + f
        },
        easeOutCubic: function(g, h, f, j, i){
            return j * ((h = h / i - 1) * h * h + 1) + f
        },
        easeInOutCubic: function(g, h, f, j, i){
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h * h + f
            }
            return j / 2 * ((h -= 2) * h * h + 2) + f
        },
        easeInQuart: function(g, h, f, j, i){
            return j * (h /= i) * h * h * h + f
        },
        easeOutQuart: function(g, h, f, j, i){
            return -j * ((h = h / i - 1) * h * h * h - 1) + f
        },
        easeInOutQuart: function(g, h, f, j, i){
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h * h * h + f
            }
            return -j / 2 * ((h -= 2) * h * h * h - 2) + f
        },
        easeInQuint: function(g, h, f, j, i){
            return j * (h /= i) * h * h * h * h + f
        },
        easeOutQuint: function(g, h, f, j, i){
            return j * ((h = h / i - 1) * h * h * h * h + 1) + f
        },
        easeInOutQuint: function(g, h, f, j, i){
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h * h * h * h + f
            }
            return j / 2 * ((h -= 2) * h * h * h * h + 2) + f
        },
        easeInSine: function(g, h, f, j, i){
            return -j * Math.cos(h / i * (Math.PI / 2)) + j + f
        },
        easeOutSine: function(g, h, f, j, i){
            return j * Math.sin(h / i * (Math.PI / 2)) + f
        },
        easeInOutSine: function(g, h, f, j, i){
            return -j / 2 * (Math.cos(Math.PI * h / i) - 1) + f
        },
        easeInExpo: function(g, h, f, j, i){
            return (h == 0) ? f : j * Math.pow(2, 10 * (h / i - 1)) + f
        },
        easeOutExpo: function(g, h, f, j, i){
            return (h == i) ? f + j : j * (-Math.pow(2, -10 * h / i) + 1) + f
        },
        easeInOutExpo: function(g, h, f, j, i){
            if (h == 0) {
                return f
            }
            if (h == i) {
                return f + j
            }
            if ((h /= i / 2) < 1) {
                return j / 2 * Math.pow(2, 10 * (h - 1)) + f
            }
            return j / 2 * (-Math.pow(2, -10 * --h) + 2) + f
        },
        easeInCirc: function(g, h, f, j, i){
            return -j * (Math.sqrt(1 - (h /= i) * h) - 1) + f
        },
        easeOutCirc: function(g, h, f, j, i){
            return j * Math.sqrt(1 - (h = h / i - 1) * h) + f
        },
        easeInOutCirc: function(g, h, f, j, i){
            if ((h /= i / 2) < 1) {
                return -j / 2 * (Math.sqrt(1 - h * h) - 1) + f
            }
            return j / 2 * (Math.sqrt(1 - (h -= 2) * h) + 1) + f
        },
        easeInElastic: function(g, i, f, m, l){
            var j = 1.70158;
            var k = 0;
            var h = m;
            if (i == 0) {
                return f
            }
            if ((i /= l) == 1) {
                return f + m
            }
            if (!k) {
                k = l * 0.3
            }
            if (h < Math.abs(m)) {
                h = m;
                var j = k / 4
            }
            else {
                var j = k / (2 * Math.PI) * Math.asin(m / h)
            }
            return -(h * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k)) + f
        },
        easeOutElastic: function(g, i, f, m, l){
            var j = 1.70158;
            var k = 0;
            var h = m;
            if (i == 0) {
                return f
            }
            if ((i /= l) == 1) {
                return f + m
            }
            if (!k) {
                k = l * 0.3
            }
            if (h < Math.abs(m)) {
                h = m;
                var j = k / 4
            }
            else {
                var j = k / (2 * Math.PI) * Math.asin(m / h)
            }
            return h * Math.pow(2, -10 * i) * Math.sin((i * l - j) * (2 * Math.PI) / k) + m + f
        },
        easeInOutElastic: function(g, i, f, m, l){
            var j = 1.70158;
            var k = 0;
            var h = m;
            if (i == 0) {
                return f
            }
            if ((i /= l / 2) == 2) {
                return f + m
            }
            if (!k) {
                k = l * (0.3 * 1.5)
            }
            if (h < Math.abs(m)) {
                h = m;
                var j = k / 4
            }
            else {
                var j = k / (2 * Math.PI) * Math.asin(m / h)
            }
            if (i < 1) {
                return -0.5 * (h * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k)) + f
            }
            return h * Math.pow(2, -10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k) * 0.5 + m + f
        },
        easeInBack: function(g, h, f, k, j, i){
            if (i == undefined) {
                i = 1.70158
            }
            return k * (h /= j) * h * ((i + 1) * h - i) + f
        },
        easeOutBack: function(g, h, f, k, j, i){
            if (i == undefined) {
                i = 1.70158
            }
            return k * ((h = h / j - 1) * h * ((i + 1) * h + i) + 1) + f
        },
        easeInOutBack: function(g, h, f, k, j, i){
            if (i == undefined) {
                i = 1.70158
            }
            if ((h /= j / 2) < 1) {
                return k / 2 * (h * h * (((i *= (1.525)) + 1) * h - i)) + f
            }
            return k / 2 * ((h -= 2) * h * (((i *= (1.525)) + 1) * h + i) + 2) + f
        },
        easeInBounce: function(g, h, f, j, i){
            return j - d.easing.easeOutBounce(g, i - h, 0, j, i) + f
        },
        easeOutBounce: function(g, h, f, j, i){
            if ((h /= i) < (1 / 2.75)) {
                return j * (7.5625 * h * h) + f
            }
            else {
                if (h < (2 / 2.75)) {
                    return j * (7.5625 * (h -= (1.5 / 2.75)) * h + 0.75) + f
                }
                else {
                    if (h < (2.5 / 2.75)) {
                        return j * (7.5625 * (h -= (2.25 / 2.75)) * h + 0.9375) + f
                    }
                    else {
                        return j * (7.5625 * (h -= (2.625 / 2.75)) * h + 0.984375) + f
                    }
                }
            }
        },
        easeInOutBounce: function(g, h, f, j, i){
            if (h < i / 2) {
                return d.easing.easeInBounce(g, h * 2, 0, j, i) * 0.5 + f
            }
            return d.easing.easeOutBounce(g, h * 2 - i, 0, j, i) * 0.5 + j * 0.5 + f
        }
    })
})(jQuery);
;
/*
 * jQuery UI Effects Blind 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Blind
 *
 * Depends:
 *	effects.core.js
 */
(function(a){
    a.effects.blind = function(b){
        return this.queue(function(){
            var d = a(this), c = ["position", "top", "left"];
            var h = a.effects.setMode(d, b.options.mode || "hide");
            var g = b.options.direction || "vertical";
            a.effects.save(d, c);
            d.show();
            var j = a.effects.createWrapper(d).css({
                overflow: "hidden"
            });
            var e = (g == "vertical") ? "height" : "width";
            var i = (g == "vertical") ? j.height() : j.width();
            if (h == "show") {
                j.css(e, 0)
            }
            var f = {};
            f[e] = h == "show" ? i : 0;
            j.animate(f, b.duration, b.options.easing, function(){
                if (h == "hide") {
                    d.hide()
                }
                a.effects.restore(d, c);
                a.effects.removeWrapper(d);
                if (b.callback) {
                    b.callback.apply(d[0], arguments)
                }
                d.dequeue()
            })
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Bounce 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Bounce
 *
 * Depends:
 *	effects.core.js
 */
(function(a){
    a.effects.bounce = function(b){
        return this.queue(function(){
            var e = a(this), l = ["position", "top", "left"];
            var k = a.effects.setMode(e, b.options.mode || "effect");
            var n = b.options.direction || "up";
            var c = b.options.distance || 20;
            var d = b.options.times || 5;
            var g = b.duration || 250;
            if (/show|hide/.test(k)) {
                l.push("opacity")
            }
            a.effects.save(e, l);
            e.show();
            a.effects.createWrapper(e);
            var f = (n == "up" || n == "down") ? "top" : "left";
            var p = (n == "up" || n == "left") ? "pos" : "neg";
            var c = b.options.distance || (f == "top" ? e.outerHeight({
                margin: true
            }) / 3 : e.outerWidth({
                margin: true
            }) / 3);
            if (k == "show") {
                e.css("opacity", 0).css(f, p == "pos" ? -c : c)
            }
            if (k == "hide") {
                c = c / (d * 2)
            }
            if (k != "hide") {
                d--
            }
            if (k == "show") {
                var h = {
                    opacity: 1
                };
                h[f] = (p == "pos" ? "+=" : "-=") + c;
                e.animate(h, g / 2, b.options.easing);
                c = c / 2;
                d--
            }
            for (var j = 0; j < d; j++) {
                var o = {}, m = {};
                o[f] = (p == "pos" ? "-=" : "+=") + c;
                m[f] = (p == "pos" ? "+=" : "-=") + c;
                e.animate(o, g / 2, b.options.easing).animate(m, g / 2, b.options.easing);
                c = (k == "hide") ? c * 2 : c / 2
            }
            if (k == "hide") {
                var h = {
                    opacity: 0
                };
                h[f] = (p == "pos" ? "-=" : "+=") + c;
                e.animate(h, g / 2, b.options.easing, function(){
                    e.hide();
                    a.effects.restore(e, l);
                    a.effects.removeWrapper(e);
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                })
            }
            else {
                var o = {}, m = {};
                o[f] = (p == "pos" ? "-=" : "+=") + c;
                m[f] = (p == "pos" ? "+=" : "-=") + c;
                e.animate(o, g / 2, b.options.easing).animate(m, g / 2, b.options.easing, function(){
                    a.effects.restore(e, l);
                    a.effects.removeWrapper(e);
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                })
            }
            e.queue("fx", function(){
                e.dequeue()
            });
            e.dequeue()
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Clip 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Clip
 *
 * Depends:
 *	effects.core.js
 */
(function(a){
    a.effects.clip = function(b){
        return this.queue(function(){
            var f = a(this), j = ["position", "top", "left", "height", "width"];
            var i = a.effects.setMode(f, b.options.mode || "hide");
            var k = b.options.direction || "vertical";
            a.effects.save(f, j);
            f.show();
            var c = a.effects.createWrapper(f).css({
                overflow: "hidden"
            });
            var e = f[0].tagName == "IMG" ? c : f;
            var g = {
                size: (k == "vertical") ? "height" : "width",
                position: (k == "vertical") ? "top" : "left"
            };
            var d = (k == "vertical") ? e.height() : e.width();
            if (i == "show") {
                e.css(g.size, 0);
                e.css(g.position, d / 2)
            }
            var h = {};
            h[g.size] = i == "show" ? d : 0;
            h[g.position] = i == "show" ? 0 : d / 2;
            e.animate(h, {
                queue: false,
                duration: b.duration,
                easing: b.options.easing,
                complete: function(){
                    if (i == "hide") {
                        f.hide()
                    }
                    a.effects.restore(f, j);
                    a.effects.removeWrapper(f);
                    if (b.callback) {
                        b.callback.apply(f[0], arguments)
                    }
                    f.dequeue()
                }
            })
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Drop 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Drop
 *
 * Depends:
 *	effects.core.js
 */
(function(a){
    a.effects.drop = function(b){
        return this.queue(function(){
            var e = a(this), d = ["position", "top", "left", "opacity"];
            var i = a.effects.setMode(e, b.options.mode || "hide");
            var h = b.options.direction || "left";
            a.effects.save(e, d);
            e.show();
            a.effects.createWrapper(e);
            var f = (h == "up" || h == "down") ? "top" : "left";
            var c = (h == "up" || h == "left") ? "pos" : "neg";
            var j = b.options.distance || (f == "top" ? e.outerHeight({
                margin: true
            }) / 2 : e.outerWidth({
                margin: true
            }) / 2);
            if (i == "show") {
                e.css("opacity", 0).css(f, c == "pos" ? -j : j)
            }
            var g = {
                opacity: i == "show" ? 1 : 0
            };
            g[f] = (i == "show" ? (c == "pos" ? "+=" : "-=") : (c == "pos" ? "-=" : "+=")) + j;
            e.animate(g, {
                queue: false,
                duration: b.duration,
                easing: b.options.easing,
                complete: function(){
                    if (i == "hide") {
                        e.hide()
                    }
                    a.effects.restore(e, d);
                    a.effects.removeWrapper(e);
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Fold 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Fold
 *
 * Depends:
 *	effects.core.js
 */
(function(a){
    a.effects.fold = function(b){
        return this.queue(function(){
            var e = a(this), k = ["position", "top", "left"];
            var h = a.effects.setMode(e, b.options.mode || "hide");
            var o = b.options.size || 15;
            var n = !(!b.options.horizFirst);
            var g = b.duration ? b.duration / 2 : a.fx.speeds._default / 2;
            a.effects.save(e, k);
            e.show();
            var d = a.effects.createWrapper(e).css({
                overflow: "hidden"
            });
            var i = ((h == "show") != n);
            var f = i ? ["width", "height"] : ["height", "width"];
            var c = i ? [d.width(), d.height()] : [d.height(), d.width()];
            var j = /([0-9]+)%/.exec(o);
            if (j) {
                o = parseInt(j[1], 10) / 100 * c[h == "hide" ? 0 : 1]
            }
            if (h == "show") {
                d.css(n ? {
                    height: 0,
                    width: o
                } : {
                    height: o,
                    width: 0
                })
            }
            var m = {}, l = {};
            m[f[0]] = h == "show" ? c[0] : o;
            l[f[1]] = h == "show" ? c[1] : 0;
            d.animate(m, g, b.options.easing).animate(l, g, b.options.easing, function(){
                if (h == "hide") {
                    e.hide()
                }
                a.effects.restore(e, k);
                a.effects.removeWrapper(e);
                if (b.callback) {
                    b.callback.apply(e[0], arguments)
                }
                e.dequeue()
            })
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Highlight 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Highlight
 *
 * Depends:
 *	effects.core.js
 */
(function(a){
    a.effects.highlight = function(b){
        return this.queue(function(){
            var e = a(this), d = ["backgroundImage", "backgroundColor", "opacity"];
            var h = a.effects.setMode(e, b.options.mode || "show");
            var c = b.options.color || "#ffff99";
            var g = e.css("backgroundColor");
            a.effects.save(e, d);
            e.show();
            e.css({
                backgroundImage: "none",
                backgroundColor: c
            });
            var f = {
                backgroundColor: g
            };
            if (h == "hide") {
                f.opacity = 0
            }
            e.animate(f, {
                queue: false,
                duration: b.duration,
                easing: b.options.easing,
                complete: function(){
                    if (h == "hide") {
                        e.hide()
                    }
                    a.effects.restore(e, d);
                    if (h == "show" && a.browser.msie) {
                        this.style.removeAttribute("filter")
                    }
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Pulsate 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Pulsate
 *
 * Depends:
 *	effects.core.js
 */
(function(a){
    a.effects.pulsate = function(b){
        return this.queue(function(){
            var d = a(this);
            var g = a.effects.setMode(d, b.options.mode || "show");
            var f = b.options.times || 5;
            var e = b.duration ? b.duration / 2 : a.fx.speeds._default / 2;
            if (g == "hide") {
                f--
            }
            if (d.is(":hidden")) {
                d.css("opacity", 0);
                d.show();
                d.animate({
                    opacity: 1
                }, e, b.options.easing);
                f = f - 2
            }
            for (var c = 0; c < f; c++) {
                d.animate({
                    opacity: 0
                }, e, b.options.easing).animate({
                    opacity: 1
                }, e, b.options.easing)
            }
            if (g == "hide") {
                d.animate({
                    opacity: 0
                }, e, b.options.easing, function(){
                    d.hide();
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                })
            }
            else {
                d.animate({
                    opacity: 0
                }, e, b.options.easing).animate({
                    opacity: 1
                }, e, b.options.easing, function(){
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                })
            }
            d.queue("fx", function(){
                d.dequeue()
            });
            d.dequeue()
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Scale 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Scale
 *
 * Depends:
 *	effects.core.js
 */
(function(a){
    a.effects.puff = function(b){
        return this.queue(function(){
            var f = a(this);
            var c = a.extend(true, {}, b.options);
            var h = a.effects.setMode(f, b.options.mode || "hide");
            var g = parseInt(b.options.percent, 10) || 150;
            c.fade = true;
            var e = {
                height: f.height(),
                width: f.width()
            };
            var d = g / 100;
            f.from = (h == "hide") ? e : {
                height: e.height * d,
                width: e.width * d
            };
            c.from = f.from;
            c.percent = (h == "hide") ? g : 100;
            c.mode = h;
            f.effect("scale", c, b.duration, b.callback);
            f.dequeue()
        })
    };
    a.effects.scale = function(b){
        return this.queue(function(){
            var g = a(this);
            var d = a.extend(true, {}, b.options);
            var j = a.effects.setMode(g, b.options.mode || "effect");
            var h = parseInt(b.options.percent, 10) || (parseInt(b.options.percent, 10) == 0 ? 0 : (j == "hide" ? 0 : 100));
            var i = b.options.direction || "both";
            var c = b.options.origin;
            if (j != "effect") {
                d.origin = c || ["middle", "center"];
                d.restore = true
            }
            var f = {
                height: g.height(),
                width: g.width()
            };
            g.from = b.options.from || (j == "show" ? {
                height: 0,
                width: 0
            } : f);
            var e = {
                y: i != "horizontal" ? (h / 100) : 1,
                x: i != "vertical" ? (h / 100) : 1
            };
            g.to = {
                height: f.height * e.y,
                width: f.width * e.x
            };
            if (b.options.fade) {
                if (j == "show") {
                    g.from.opacity = 0;
                    g.to.opacity = 1
                }
                if (j == "hide") {
                    g.from.opacity = 1;
                    g.to.opacity = 0
                }
            }
            d.from = g.from;
            d.to = g.to;
            d.mode = j;
            g.effect("size", d, b.duration, b.callback);
            g.dequeue()
        })
    };
    a.effects.size = function(b){
        return this.queue(function(){
            var c = a(this), n = ["position", "top", "left", "width", "height", "overflow", "opacity"];
            var m = ["position", "top", "left", "overflow", "opacity"];
            var j = ["width", "height", "overflow"];
            var p = ["fontSize"];
            var k = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"];
            var f = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"];
            var g = a.effects.setMode(c, b.options.mode || "effect");
            var i = b.options.restore || false;
            var e = b.options.scale || "both";
            var o = b.options.origin;
            var d = {
                height: c.height(),
                width: c.width()
            };
            c.from = b.options.from || d;
            c.to = b.options.to || d;
            if (o) {
                var h = a.effects.getBaseline(o, d);
                c.from.top = (d.height - c.from.height) * h.y;
                c.from.left = (d.width - c.from.width) * h.x;
                c.to.top = (d.height - c.to.height) * h.y;
                c.to.left = (d.width - c.to.width) * h.x
            }
            var l = {
                from: {
                    y: c.from.height / d.height,
                    x: c.from.width / d.width
                },
                to: {
                    y: c.to.height / d.height,
                    x: c.to.width / d.width
                }
            };
            if (e == "box" || e == "both") {
                if (l.from.y != l.to.y) {
                    n = n.concat(k);
                    c.from = a.effects.setTransition(c, k, l.from.y, c.from);
                    c.to = a.effects.setTransition(c, k, l.to.y, c.to)
                }
                if (l.from.x != l.to.x) {
                    n = n.concat(f);
                    c.from = a.effects.setTransition(c, f, l.from.x, c.from);
                    c.to = a.effects.setTransition(c, f, l.to.x, c.to)
                }
            }
            if (e == "content" || e == "both") {
                if (l.from.y != l.to.y) {
                    n = n.concat(p);
                    c.from = a.effects.setTransition(c, p, l.from.y, c.from);
                    c.to = a.effects.setTransition(c, p, l.to.y, c.to)
                }
            }
            a.effects.save(c, i ? n : m);
            c.show();
            a.effects.createWrapper(c);
            c.css("overflow", "hidden").css(c.from);
            if (e == "content" || e == "both") {
                k = k.concat(["marginTop", "marginBottom"]).concat(p);
                f = f.concat(["marginLeft", "marginRight"]);
                j = n.concat(k).concat(f);
                c.find("*[width]").each(function(){
                    child = a(this);
                    if (i) {
                        a.effects.save(child, j)
                    }
                    var q = {
                        height: child.height(),
                        width: child.width()
                    };
                    child.from = {
                        height: q.height * l.from.y,
                        width: q.width * l.from.x
                    };
                    child.to = {
                        height: q.height * l.to.y,
                        width: q.width * l.to.x
                    };
                    if (l.from.y != l.to.y) {
                        child.from = a.effects.setTransition(child, k, l.from.y, child.from);
                        child.to = a.effects.setTransition(child, k, l.to.y, child.to)
                    }
                    if (l.from.x != l.to.x) {
                        child.from = a.effects.setTransition(child, f, l.from.x, child.from);
                        child.to = a.effects.setTransition(child, f, l.to.x, child.to)
                    }
                    child.css(child.from);
                    child.animate(child.to, b.duration, b.options.easing, function(){
                        if (i) {
                            a.effects.restore(child, j)
                        }
                    })
                })
            }
            c.animate(c.to, {
                queue: false,
                duration: b.duration,
                easing: b.options.easing,
                complete: function(){
                    if (g == "hide") {
                        c.hide()
                    }
                    a.effects.restore(c, i ? n : m);
                    a.effects.removeWrapper(c);
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                    c.dequeue()
                }
            })
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Shake 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Shake
 *
 * Depends:
 *	effects.core.js
 */
(function(a){
    a.effects.shake = function(b){
        return this.queue(function(){
            var e = a(this), l = ["position", "top", "left"];
            var k = a.effects.setMode(e, b.options.mode || "effect");
            var n = b.options.direction || "left";
            var c = b.options.distance || 20;
            var d = b.options.times || 3;
            var g = b.duration || b.options.duration || 140;
            a.effects.save(e, l);
            e.show();
            a.effects.createWrapper(e);
            var f = (n == "up" || n == "down") ? "top" : "left";
            var p = (n == "up" || n == "left") ? "pos" : "neg";
            var h = {}, o = {}, m = {};
            h[f] = (p == "pos" ? "-=" : "+=") + c;
            o[f] = (p == "pos" ? "+=" : "-=") + c * 2;
            m[f] = (p == "pos" ? "-=" : "+=") + c * 2;
            e.animate(h, g, b.options.easing);
            for (var j = 1; j < d; j++) {
                e.animate(o, g, b.options.easing).animate(m, g, b.options.easing)
            }
            e.animate(o, g, b.options.easing).animate(h, g / 2, b.options.easing, function(){
                a.effects.restore(e, l);
                a.effects.removeWrapper(e);
                if (b.callback) {
                    b.callback.apply(this, arguments)
                }
            });
            e.queue("fx", function(){
                e.dequeue()
            });
            e.dequeue()
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Slide 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Slide
 *
 * Depends:
 *	effects.core.js
 */
(function(a){
    a.effects.slide = function(b){
        return this.queue(function(){
            var e = a(this), d = ["position", "top", "left"];
            var i = a.effects.setMode(e, b.options.mode || "show");
            var h = b.options.direction || "left";
            a.effects.save(e, d);
            e.show();
            a.effects.createWrapper(e).css({
                overflow: "hidden"
            });
            var f = (h == "up" || h == "down") ? "top" : "left";
            var c = (h == "up" || h == "left") ? "pos" : "neg";
            var j = b.options.distance || (f == "top" ? e.outerHeight({
                margin: true
            }) : e.outerWidth({
                margin: true
            }));
            if (i == "show") {
                e.css(f, c == "pos" ? -j : j)
            }
            var g = {};
            g[f] = (i == "show" ? (c == "pos" ? "+=" : "-=") : (c == "pos" ? "-=" : "+=")) + j;
            e.animate(g, {
                queue: false,
                duration: b.duration,
                easing: b.options.easing,
                complete: function(){
                    if (i == "hide") {
                        e.hide()
                    }
                    a.effects.restore(e, d);
                    a.effects.removeWrapper(e);
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Transfer 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Transfer
 *
 * Depends:
 *	effects.core.js
 */
(function(a){
    a.effects.transfer = function(b){
        return this.queue(function(){
            var f = a(this), h = a(b.options.to), e = h.offset(), g = {
                top: e.top,
                left: e.left,
                height: h.innerHeight(),
                width: h.innerWidth()
            }, d = f.offset(), c = a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.options.className).css({
                top: d.top,
                left: d.left,
                height: f.innerHeight(),
                width: f.innerWidth(),
                position: "absolute"
            }).animate(g, b.duration, b.options.easing, function(){
                c.remove();
                (b.callback && b.callback.apply(f[0], arguments));
                f.dequeue()
            })
        })
    }
})(jQuery);
;
