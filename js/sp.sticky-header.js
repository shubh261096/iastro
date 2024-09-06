// stycky header v1 created by Swarup Porel
(function($) {
    "use strict";
    $.fn.spSticyheader = function(options) {
        
        var defaults = {
            HeaderTarget: jQuery(this),
            hideHeaderTarget: '.header-top',
            scrollHeader: 300,
            customClass:'none',
            mobileHeader:false
        };
        options = $.extend(defaults, options);
        
        
        
        return this.each(function() {
            var HeaderTarget = options.HeaderTarget;
            var hideHeaderTarget = options.hideHeaderTarget;
            var scrollHeader = options.scrollHeader;
            var customClass = options.customClass;
            var mobileHeader = options.mobileHeader;
            var isMobile = false;
            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i))) {
                isMobile = true;
            }
            
            
            var createSticky = function() {
                /////////
                var targetHeight = HeaderTarget.outerHeight();
                var targetHideHeight = HeaderTarget.find(hideHeaderTarget).outerHeight();
                
                HeaderTarget.addClass('sp-sticky');
                if(customClass != 'none'){
                    HeaderTarget.addClass(customClass);
                }
                HeaderTarget.find(hideHeaderTarget).addClass('sp-sticky-child')
                $('body').css({'padding-top':targetHeight});
                function stickyHeader() {
                    if ($(window).scrollTop() >= scrollHeader) {
                        HeaderTarget.addClass("sp-active");
                        HeaderTarget.find(hideHeaderTarget).css({'margin-top':'-'+targetHideHeight+'px'});
                        $('body').addClass('header-sticky');
                    } else {
                        HeaderTarget.removeClass("sp-active");
                        HeaderTarget.find(hideHeaderTarget).css({'margin-top':'0px'})
                        $('body').removeClass('header-sticky');
                    }
                }
                stickyHeader();
                window.onscroll = function() {
                    stickyHeader()
                };
                ////////
            };
            if(isMobile == true){
                if(mobileHeader == true){
                    createSticky();
                }
            }else{
                createSticky();
            }
           
        });
    };
})(jQuery);