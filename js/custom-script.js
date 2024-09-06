
// ************************************** //
// STICKY HEADER
// ************************************** //

jQuery(document).ready(function ($) {
    $('#demo-header').spSticyheader({
        hideHeaderTarget: '.header-top',
        scrollHeader: 200,
        customClass: 'make-small',
        mobileHeader: true
    })
});



// ************************************** //
// CSS MENU
// ************************************** //

(function ($) {
    $.fn.menumaker = function (options) {

        var cssmenu = $(this), settings = $.extend({
            title: "Menu",
            format: "dropdown",
            sticky: false
        }, options);
        return this.each(function () {
            cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
            $(this).find("#menu-button").on('click', function () {
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.hide().removeClass('open');
                }
                else {
                    mainmenu.show().addClass('open');
                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').show();
                    }
                }
            });
            cssmenu.find('li ul').parent().addClass('has-sub');
            $(".has-sub").append('<span class="submenu-button"></span>');
            $('.submenu-button').click(function () {
                $(this).toggleClass('submenu-opened');
                if ($(this).siblings('ul').hasClass('open')) {
                    $(this).siblings('ul').removeClass('open').hide();
                }
                else {
                    $(this).siblings('ul').addClass('open').show();
                }
            });


            /* multiTg = function() {
            cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
            cssmenu.find('.submenu-button').on('click', function() {
            $(this).toggleClass('submenu-opened');
            if ($(this).siblings('ul').hasClass('open')) {
            $(this).siblings('ul').removeClass('open').hide();
            }
            else {
            $(this).siblings('ul').addClass('open').show();
            }
            });
            };
            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');
            if (settings.sticky === true) cssmenu.css('position', 'fixed');
            resizeFix = function() {
            if ($( window ).width() > 767) {
            cssmenu.find('ul').show();
            }
            if ($(window).width() <= 767) {
            cssmenu.find('ul').hide().removeClass('open');
            }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);*/

        });
    };
})(jQuery);
(function ($) {
    $(document).ready(function () {
        $(document).ready(function () {
            $("#cssmenu").menumaker({
                title: "",
                format: "multitoggle"
            });
            $("#cssmenu").prepend("<div id='menu-line'></div>");
            var foundActive = false, activeElement, linePosition = 0, menuLine = $("#cssmenu #menu-line"), lineWidth, defaultPosition, defaultWidth;
            $("#cssmenu > ul > li").each(function () {
                if ($(this).hasClass('active')) {
                    activeElement = $(this);
                    foundActive = true;
                }
            });
            if (foundActive === false) {
                activeElement = $("#cssmenu > ul > li").first();
            }
            defaultWidth = lineWidth = activeElement.width();
            defaultPosition = linePosition = activeElement.position().left;
            menuLine.css("width", lineWidth);
            menuLine.css("left", linePosition);
            $("#cssmenu > ul > li").hover(function () {
                activeElement = $(this);
                lineWidth = activeElement.width();
                linePosition = activeElement.position().left;
                menuLine.css("width", lineWidth);
                menuLine.css("left", linePosition);
            },
                function () {
                    menuLine.css("left", defaultPosition);
                    menuLine.css("width", defaultWidth);
                });
        });
    });
})(jQuery);



// ************************************** //
// ASTROLOGER CAROUSEL
// ************************************** //


$(document).ready(function () {
    $("#ourAstrologers").owlCarousel({
        items: 3,
        nav: false,
        dots: false,
        loop: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        margin: 0,
        // navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
            0: {
                items: 1,
            },
            767: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    });
});

$(document).ready(function () {
    $("#naTestimonial").owlCarousel({
        items: 3,
        nav: true,
        dots: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        margin: 0,
        // navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
            0: {
                items: 1,
            },
            767: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    });
});


// ************************************** //
// RESPONSIVE FOOTER
// ************************************** //
$(document).ready(function () {
    $(".nav-footer h4").click(function () {
        $(this).parent(".nav").toggleClass("open");
    });
    if (window.screen.width > 1200) {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('header').addClass("active");
                $('header').removeClass("translucent");
            } else {
                $('header').removeClass("active");
                $('header').addClass("translucent");
            }
        });
    }
});



// ************************************** //
// READ MORE-LESS
// ************************************** //

$(function () {
    $.fn.readmore = function (options) {

        var settings = $.extend({
            div: this,
            hideText: "Read Less...",
            readText: "Read More...",
            isTextShown: false,
            effect: true,
            effectOption: "fast",
            buttonClasses: "btn-primary opacity-rollover",
            id: "read-more-action"
        }, options);

        if (settings.isTextShown === false) {
            $(settings.div).hide();
            $(settings.div).parent().append("<button id='" + settings.id + "' class='" + settings.buttonClasses + "'>" + settings.readText + "</button>");
        } else {
            $(settings.div).parent().append("<button id='" + settings.id + "' class='" + settings.buttonClasses + "'>" + settings.hideText + "</button>");
        }

        $(settings.div).parent().find("#" + settings.id).bind("click.readmore", function () {
            if (settings.isTextShown === false) {
                $(settings.div).parent().find("#" + settings.id).text(settings.hideText);
                if (settings.effect === true) {
                    $(settings.div).fadeIn(settings.effectOption);
                } else {
                    $(settings.div).show();
                }
                settings.isTextShown = true;
            } else {
                $(settings.div).parent().find("#" + settings.id).text(settings.readText);
                if (settings.effect === true) {
                    $(settings.div).hide();
                } else {
                    $(settings.div).fadeOut(settings.effectOption);
                }
                settings.isTextShown = false;
            }
        });

    };
});


// SIDE BAR
window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

