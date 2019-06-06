jQuery.fn.extend({
    autoHide: function(options) {
        var defaults =  {
        elem_move_duration:       300,
        delay_before_hide_elem:   1000,
        direction:                'bottom',
        before_hide:              function() {return true;},
        after_hide:               function() {return true;},
        before_show:              function() {return true;},
        after_show:               function() {return true;}
    };
    var settings = $.extend(true, {}, defaults, options);
    settings.direction = settings.direction.toLowerCase();
    return $(this).each(function(){
        var $element = $(this);
        var originalElementPosition = $element.css(settings.direction);
        var elemVisible = true;
        var timeoutHandler = null;
        var mouseInElem = false;

        var hideElem = function() {
            if (elemVisible) {
                elemVisible = false; // init there, to avoid multi animations
                var options = {opacity: 0};
                if (settings.direction == 'bottom' || settings.direction == 'top')
                    options[settings.direction] = -$element.height();
                else
                    options[settings.direction] = -$element.width();
                settings.before_hide();
                $element.animate(
                        options, 
                        settings.elem_move_duration, function() {
                            // Animation complete.
                            settings.after_hide();
                        });
            }
        }

        var showElem = function() {
            if (!elemVisible) {
                elemVisible = true; // init there, to avoid multi animations
                var options = {opacity: 1};
                options[settings.direction] = originalElementPosition;
                settings.before_show();
                $element.animate(
                        options, 
                        settings.elem_move_duration, function() {
                            // Animation complete.
                            settings.after_show();
                    });
                }
       }

        var cancelHideTimeout = function() {
            if (timeoutHandler) {
                clearTimeout(timeoutHandler);
            }
        };

        var setHideTimeout = function() {
            cancelHideTimeout();
            timeoutHandler = setTimeout(function(){
                timeoutHandler = null;
                hideElem();
                }, 
                settings.delay_before_hide_elem);
        };

        var setElemShowTrigger = function() {
            $(document).mousemove(function( event ) {
                if (!mouseInElem) {
                    showElem();
                    setHideTimeout();
                }
            });
            $element.mouseenter(function(){
                mouseInElem = true;
                cancelHideTimeout();
                showElem();
            });
            $element.mouseleave(function(){
                mouseInElem = false;
                setHideTimeout();
            });
       };

       hideElem();
       setElemShowTrigger();
   });
}
});