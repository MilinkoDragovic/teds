
;(function($) {

    'use strict'

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var removePreloader = function() {
        $('.preloader').css('opacity', 0);
        setTimeout(function() {
            $('.preloader').hide();}, 600
        );
    };

    var retinaLogos = function() {
        var retina = window.devicePixelRatio > 1 ? true : false;

        if(retina) {
            $('.logo img').attr({src:'./images/logo@2x.png',width:'202',height:'66'});
        }
    };

    var postCarousel = function() {
        if ( $().owlCarousel ) {
            $(".roll-posts-carousel").owlCarousel({
                autoPlay: 4000,
                slideSpeed: 1000,
                navigation: false,
                pagination: false,
                itemsCustom: [[0, 2], [480, 4], [768, 5], [992, 6], [1200, 8]]
            });
        }
    };

    var testimonialCarousel = function(){
        if ( $().owlCarousel ) {
            $(".roll-testimonials").owlCarousel({
                navigation : false,
                pagination: true,
                responsive: true,
                items: 1,
                itemsDesktop: [3000,1],
                itemsDesktopSmall: [1400,1],
                itemsTablet:[970,1],
                itemsTabletSmall: [600,1],
                itemsMobile: [360,1],
                touchDrag: true,
                mouseDrag: true,
                autoHeight: true,
                autoPlay: false
            });
        }
    };

    var topSlider = function() {
        if ( $().flexslider ) {
            $('.top-slider .flexslider').flexslider({
                animation           : "fade",
                controlNav          : false,
                directionNav        : false,
                pauseOnHover        : false,
                pauseOnAction       : true,
                slideshow           : true,
                animationSpeed      : 500,
                slideshowSpeed      : 5000,
                prevText            :  '<i class="fa fa-angle-left"></i>',
                nextText            :  '<i class="fa fa-angle-right"></i>',
                controlsContainer   : '.flex-container',
                start: function(slider) {
                    slider.removeClass('loading');
                }
            });
        }
    };

    $(function () {

        var today = new Date();
        var dayIndex = today.getDay();
        if( dayIndex == 1 || dayIndex == 0){
            var day = $(".mon");
            $(day).addClass("active");
        }else if(dayIndex == 2){
            var day = $(".tue");
            $(day).addClass("active");
        }else if(dayIndex == 3){
            var day = $(".wed");
            $(day).addClass("active");
        }else if(dayIndex == 4){
            var monnday = $(".thu");
            $(monnday).addClass("active");
        }else if(dayIndex == 5){
            var monnday = $(".fri");
            $(monnday).addClass("active");
        }else if(dayIndex == 6){
            var monnday = $(".sat");
            $(monnday).addClass("active");
        }
        //console.log(dayIndex);

    });



    var foodMasonry = function() {
        if ( $().isotope ) {
            var $container = $('.daily-food');

            $container.imagesLoaded(function(){
                $container.isotope({
                    itemSelector: '.food',
                    transitionDuration: '0.8s',
                    hiddenStyle: { opacity: 0 },
                    visibleStyle: { opacity: 1 }
                }); // isotope
            });

            $('.days li').on('click',function() {
                var selector = $(this).find("a").attr('data-filter');

                $('.days li').removeClass('active');
                $(this).addClass('active');
                $container.isotope({ filter: selector });

                return false;
            }).filter('.active').trigger('click'); // end filter

        };
    };


    var galleryMasonry = function() {
        if ( $().isotope ) {
            var $container = $('.galleries-container');

            $container.imagesLoaded(function(){
                $container.isotope({
                    itemSelector: '.gallery',
                    transitionDuration: '0.8s'
                });
            });

            $('.gallery-filter li').on('click',function() {
                var selector = $(this).find("a").attr('data-filter');

                $('.gallery-filter li').removeClass('active');
                $(this).addClass('active');
                $container.isotope({ filter: selector });
                return false;
            }).filter('.active').trigger('click'); // filter


            $('.galleries-masonry .load-more a').on('click', function(e) {
                e.preventDefault();

                var el = $(this),
                    url = el.attr('href'),
                    page = parseInt(el.attr('data-page'), 10);

                el.addClass('loading').text('Loading...');

                $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "html",
                        async: false,   // wait result
                        data : { page : page }
                    })
                    .done(function (data) {
                        if ( data != null ) {
                            var newitem = $(data).find('.w4');

                            if ( el.is('.w3') )
                                newitem = $(data).find('.w3');

                            $container.append(newitem).isotope('appended', newitem);
                            el.removeClass('loading').text('Load more photos');
                            page = page + 1;
                            el.attr({'data-page': page, 'href': './ajax/g' + page + '.html'});
                            $(".roll-button").hide();
                        }
                    })
                    .fail(function () {
                        el.text('No more photos to load.');
                    })
            });

        };
    };


    var foodIsotope = function() {
        if ( $().isotope ) {
            var $container = $('.food-wrap');

            $container.imagesLoaded(function() {
                $container.isotope({
                    itemSelector: '.food-item',
                    transitionDuration: '0.6s',
                    hiddenStyle: { opacity: 0 },
                    visibleStyle: { opacity: 1 }
                }); // end isotope
            });

            $('.food-filter li').on('click',function() {
                var selector = $(this).find("a").attr('data-filter');

                $('.food-filter li').removeClass('active');
                $(this).addClass('active');
                $container.isotope({ filter: selector });

                return false;
            }).filter(':nth-child(1)').trigger('click'); // end filter

        };
    };

    var parallax = function() {
        var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;

        /* Please note that background attachment fixed doesn't work on iOS */
        if ( !iOS ) {
            $('.parallax').css({backgroundAttachment:'fixed'});
        } else {
            $('.parallax').css({backgroundAttachment:'scroll'});
        }

        if ( $().parallax && isMobile.any() == null ) {
            $('.parallax-bg1').parallax("50%", 0.5);
            $('.parallax-bg2').parallax("50%", 0.3);
            $('.parallax-bg3').parallax("50%", 0.5);
            $('.parallax-bg4').parallax("50%", 0.3);
            $('.parallax-bg5').parallax("50%", 0.5);
            $('.parallax-bg6').parallax("50%", 0.5);
            $('.parallax-bg7').parallax("50%", 0.5);
            $('.parallax-bg8').parallax("50%", 0.5);
            $('.parallax-bg9').parallax("50%", 0.5);
            $('.parallax-bg10').parallax("50%", 0.5);
        }
    };

    var rollAnimation = function() {
        if ( isMobile.any() == null ) {
            $('.roll-animation').each( function() {
                var rollElement = $(this),
                    rollAnimationClass = rollElement.data('animation'),
                    rollAnimationDelay = rollElement.data('animation-delay'),
                    rollAnimationOffset = rollElement.data('animation-offset');

                rollElement.css({
                    '-webkit-animation-delay':  rollAnimationDelay,
                    '-moz-animation-delay':     rollAnimationDelay,
                    'animation-delay':          rollAnimationDelay
                });

                rollElement.waypoint(function() {
                    rollElement.addClass('animated').addClass(rollAnimationClass);
                },{
                    triggerOnce: true,
                    offset: rollAnimationOffset
                });
            });
        }
    };

    var goTop = function() {
        $(window).scroll(function() {
            if ( $(this).scrollTop() > 800 ) {
                $('.go-top').addClass('show');
            } else {
                $('.go-top').removeClass('show');
            }
        });

        $('.go-top').on('click', function() {
            $("html, body").animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
            return false;
        });
    };


    var detectViewport = function() {
        $('[data-waypoint-active="yes"]').waypoint(function() {
            $(this).trigger('on-appear');
        }, { offset: '90%', triggerOnce: true });
    };

    var responsiveMenu = function() {
        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var currMenuType = 'desktop';

            if ( matchMedia( 'only screen and (max-width: 1199px)' ).matches ) {
                currMenuType = 'mobile';
            }

            if ( currMenuType !== menuType ) {
                menuType = currMenuType;

                if ( currMenuType === 'mobile' ) {
                    var $mobileMenu = $('#mainnav').attr('id', 'mainnav-mobi').hide();

                    $('#header').find('.header-wrap').after($mobileMenu);
                    $('.btn-menu').addClass('show');
                    $mobileMenu.find($('a[title=spacing]')).parent('li').hide();
                    $mobileMenu.css({'left': '50%', 'marginLeft': '-140px', 'top': '125px'});

                    var hasChildMenu = $('#mainnav-mobi').find('li:has(ul)');

                    hasChildMenu.children('ul').hide();
                    hasChildMenu.children('a').after('<span class="btn-submenu"></span>');
                    $('.btn-menu').removeClass('active');
                } else {
                    var $desktopMenu = $('#mainnav-mobi').attr('id', 'mainnav').removeAttr('style');

                    $desktopMenu.find('.sub-menu').removeAttr('style');
                    $desktopMenu.find($('a[title="spacing"]')).parent('li').removeAttr('style');
                    $('#header').find('.col-md-12').append($desktopMenu);
                    $('.btn-submenu').remove();
                    $('.btn-menu').removeClass('show');
                }
            }
        });

        $('.btn-menu').on('click', function() {
            $('#mainnav-mobi').slideToggle(300);
            $(this).toggleClass('active');
        });

        $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
            $(this).toggleClass('active').next('ul').slideToggle(300);
            $(this).closest('.has-sub').toggleClass('active');
            e.stopImmediatePropagation()
        });
    };

    var spacingMenu = function() {
        var spacingLi = $('#mainnav').find($('a[title="spacing"]'));
        var lastLi = $('#mainnav > ul li').filter(":last-child");

        lastLi.find('a').css('paddingRight', 0);
        spacingLi.css('width', 285);
    };

    // Dom Ready
    $(function() {
        responsiveMenu();
        testimonialCarousel();
        postCarousel();
        topSlider();
        foodMasonry();
        galleryMasonry();
        foodIsotope();
        spacingMenu()
        rollAnimation();
        goTop();
        retinaLogos();
        detectViewport();
        parallax();
        removePreloader();
    });





})(jQuery);