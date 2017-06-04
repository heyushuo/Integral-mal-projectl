(function($) {
    var old = $.fn.drag;

    function Drag(element, options) {
        this.ver = '1.0';
        this.$element = $(element);
        this.options = $.extend({}, $.fn.drag.defaults, options);
        this.init();
    }

    Drag.prototype = {
        constructor: Drag,
        init: function() {
            var options = this.options;

            // ready drag
            this.$element.on('touchstart.drag.founder mousedown.drag.founder', function(e) {
                var ev = e.type == 'touchstart' ? e.originalEvent.touches[0] : e, 
                    startPos = $(this).position(), 
                    initX = startPos.left, 
                    initY = startPos.top, 
                    disX = ev.pageX - startPos.left, 
                    disY = ev.pageY - startPos.top, 
                    that = this;

                // 记录初始位置, 以便复位使用
                $(this).data('startPos', startPos);
                // console.log("here start : "+JSON.stringify(startPos))

                if (options.before && $.isFunction(options.before)) {
                    options.before.call(that, ev);
                }

                // draging
                $(document).on('touchmove.drag.founder mousemove.drag.founder', function(e) {
                    var ev = e.type == 'touchmove' ? e.originalEvent.touches[0] : e,
                        $this = $(that),
                        $parent = $this.offsetParent(),
                        $parent=$parent.is(':root')?$(window):$parent,
                        pPos = $parent.offset(),
                        pPos=pPos?pPos:{left:0,top:0},
                        left = ev.pageX - disX - pPos.left,
                        top = ev.pageY - disY - pPos.top,
                        r = $parent.width() - $this.outerWidth(true),
                        d = $parent.height() - $this.outerHeight(true);

                    // console.log("pageX : "+ev.pageX + ", disX : "+disX + ", left : "+pPos.left);
                    // console.log("pageY : "+ev.pageY + ", disY : "+disY + ", top : "+pPos.top);

                    $(that).css({
                        left: left + 'px',
                        top: top + 'px'
                    });

                    if (options.process && $.isFunction(options.process)) {
                        options.process.call(that, ev);
                    }

                    e.preventDefault();
                });

                // drag over
                $(document).on('touchend.drag.founder mouseup.drag.founder', function(e) {
                    var ev = e.type == 'touchend' ? e.originalEvent.changedTouches[0] : e,
                    startPosed = $(that).position(),
                    dragX = startPosed.left,
                    dragY = startPosed.top;

                    if (options.end && $.isFunction(options.end)) {
                        options.end.call(that, ev);
                    }

                    $(document).off('.drag.founder');
                    // console.log("here : "+initX+" - "+dragX+", "+initY+" - "+dragY)
                    // 位置无变化时, 跳转页面(购物车页面)
                    if(initX == dragX && initY == dragY) {
                        window.location.href = "shop-cart.html";
                    }
                });

                e.preventDefault();
            });
        }
    };

    //jQ 插件模式
    $.fn.drag = function(options) {
        return this.each(function() {
            var $this = $(this),
                instance = $this.data('drag');

            if (!instance) {
                instance = new Drag(this, options);
                $this.data('drag', instance);
            } else {
                instance.init();
            }

            if (typeof options === 'string') {
                //instance.options[options].call(this);
            }

        });
    };

    $.fn.drag.defaults = {
        before: $.noop,
        process: $.noop,
        end: $.noop
    };

    $.fn.drag.noConflict = function() {
        $.fn.drag = old;
        return this;
    };
})(jQuery);