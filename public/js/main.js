
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

    var blogSlider = function() {
        if ( $().flexslider ) {
            $('.blog-slider').each(function() {
                var $this = $(this),
                    easing = ( $this.data('effect') == 'fade' ) ? 'linear' : 'easeInOutExpo';

                $this.find('.flexslider').flexslider({
                    animation      :  $this.data('effect'),
                    direction      :  $this.data('direction'), // vertical
                    pauseOnHover   :  true,
                    useCSS         :  false,
                    easing         :  easing,
                    animationSpeed :  500,
                    slideshowSpeed :  5000,
                    controlNav     :  true,
                    directionNav   :  $this.data('nav'),
                    slideshow      :  $this.data('auto'),
                    prevText       :  '<i class="fa fa-angle-left"></i>',
                    nextText       :  '<i class="fa fa-angle-right"></i>',
                    smoothHeight   :  true
                }); // flexslider
            }); // blog-sider
        }
    };

    var blogMasonry = function() {
        if ( $().isotope ) {
            var $container = $('.posts-container');

            $container.imagesLoaded(function(){
                $container.isotope({
                    itemSelector: '.post',
                    transitionDuration: '0.8s'
                }); // isotope
            });

            $('.post-filter li').on('click',function() {
                var selector = $(this).find("a").attr('data-filter');

                $('.post-filter li').removeClass('active');
                $(this).addClass('active');
                $container.isotope({ filter: selector });

                return false;
            }).filter('.active').trigger('click'); // filter

            $('.posts-masonry .load-more a').on('click', function(e) {
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
                        var newitem = $(data);
                        $container.append(newitem).isotope('appended', newitem);
                        el.removeClass('loading').text('Load more');
                        page = page + 1;
                        el.attr({'data-page': page, 'href': './ajax/b' + page + '.html'});
                    }
                })
                .fail(function () {
                    el.text('No more posts to load.');
                })
            });

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
                        el.removeClass('loading').text('Load more');
                        page = page + 1;
                        el.attr({'data-page': page, 'href': './ajax/g' + page + '.html'});
                    }
                })
                .fail(function () {
                    el.text('No more posts to load.');
                })
            });

        };
    };

    var ajaxContactForm = function() {
        if ( $().validate ) {        
            $('.roll-contact-form').each(function() {
                $(this).validate({
                    submitHandler: function( form ) {
                        var $form = $(form),
                            str = $form.serialize(),
                            loading = $('<div />', { 'class': 'loading' });

                        $.ajax({
                            type: "POST",
                            url:  $form.attr('action'),
                            data: str,
                            beforeSend: function () {
                                $form.find('.send-wrap').prepend(loading);
                                $form.find('.roll-alert').remove();
                            },
                            success: function( msg ) {
                                var result, cls;

                                if ( msg == 'Success' ) {
                                    result = 'Your message has been sent. Thank you!';
                                    cls = 'msg-success';
                                } else {
                                    result = 'Error sending email.';
                                    cls = 'msg-error';
                                }

                                $form.prepend(
                                    $('<div />', {
                                        'class': 'roll-alert ' + cls,
                                        'text' : result
                                    }).append(
                                        $('<a class="remove" href="#"><i class="fa fa-close"></i></a>')
                                    )
                                );

                                $form.find(':input').not('.submit').val('');
                            },
                            complete: function( xhr, status, error_thrown ) {
                                $form.find('.loading').remove();
                            }
                        });
                    }
                });
            });
        }
        $(document).on('click', '.roll-alert .remove', function(e) {
            $(this).closest('.roll-alert').remove();
            e.preventDefault();
        })
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
            }).filter(':nth-child(2)').trigger('click'); // end filter

            $container.find('.added').mouseenter(function(){
                $(this).find('.add-cart').text('Remove');
            }).mouseleave(function(){
                $(this).find('.add-cart').text('Added');
            })
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

    var lastestTweets = function() {
        $('.latest-tweets').each(function() {
            var $this = $(this);

            if ( $().tweet ) {
                $this.tweet({
                    username: $this.data('username'),
                    join_text: "auto",
                    avatar_size: null,
                    count: $this.data('number'),
                    template: "{text}{time}",
                    loading_text: "loading tweets...",
                    modpath: $this.data('modpath')      
                }); // tweet
            }
            if ( $().newsTicker ) {
                $this.children('.tweet_list').newsTicker({
                    row_height: 40,
                    max_rows: $this.data('scroll'),
                    duration: 4000
                });
            }
        }); // lastest-tweets each
    };

    var flickrFeed = function() {
        if ( $().jflickrfeed ) {
            $('.flickr-photos').each( function() {
                $(this).jflickrfeed({
                    limit: 6,
                    qstrings: {
                    id: '130700496@N03' // Your Flickr Id
                    },
                    itemTemplate: '<li><a href="{{link}}" title="{{title}}" target="_blank"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
                });
            });
        }
    };

    var detectViewport = function() {
        $('[data-waypoint-active="yes"]').waypoint(function() {
            $(this).trigger('on-appear');
        }, { offset: '90%', triggerOnce: true });
    };

    var popupTeam = function() {
        if ( $().leanModal ) {
            $('.roll-team > .popup').leanModal({
                top: 300,
                overlay: 0.8,
                closeButton: ".close-modal"
            });

            $('.close-modal').on('click', function(e){
                e.preventDefault();
            })
        }
    };

    var gmapSetup = function() {
        if ( $().gmap3 ) {
            $("#map").gmap3({
                map:{
                    options:{
                        zoom: 14,
                        mapTypeId: 'burger_house_style',
                        mapTypeControlOptions: {
                            mapTypeIds: ['orches_style', google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID]
                        },
                        scrollwheel: false
                    }
                },
                getlatlng:{
                    address:  "3 London Rd London SE1 6JZ United Kingdom",
                    callback: function(results) {
                        if ( !results ) return;
                            $(this).gmap3('get').setCenter(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
                            $(this).gmap3({
                            marker:{
                            latLng:results[0].geometry.location
                            }
                        });
                    }
                },
                styledmaptype:{
                    id: "burger_house_style",
                    options:{
                        name: "Burger House Map"
                    },
                },
            });
        }
    };

    var ajaxSubscribe = {
        obj: {
            subscribeEmail    : $('#subscribe-email'),
            subscribeButton   : $('#subscribe-button'),
            subscribeMsg      : $('#subscribe-msg'),
            subscribeContent  : $("#subscribe-content"),
            dataMailchimp     : $('#subscribe-form').attr('data-mailchimp'),
            success_message   : '<div class="notification_ok">Thank you for joining our mailing list! Please check your email for a confirmation link.</div>',
            failure_message   : '<div class="notification_error">Error! <strong>There was a problem processing your submission.</strong></div>',
            noticeError       : '<div class="notification_error">{msg}</div>',
            noticeInfo        : '<div class="notification_error">{msg}</div>',
            basicAction       : 'mail/subscribe.php',
            mailChimpAction   : 'mail/subscribe-mailchimp.php'
        },

        eventLoad: function() {
            var objUse = ajaxSubscribe.obj;

            $(objUse.subscribeButton).on('click', function() {
                if ( window.ajaxCalling ) return;
                var isMailchimp = objUse.dataMailchimp === 'true';

                if ( isMailchimp ) {
                    ajaxSubscribe.ajaxCall(objUse.mailChimpAction);
                } else {
                    ajaxSubscribe.ajaxCall(objUse.basicAction);
                }
            });
        },

        ajaxCall: function (action) {
            window.ajaxCalling = true;
            var objUse = ajaxSubscribe.obj;
            var messageDiv = objUse.subscribeMsg.html('').hide();
            $.ajax({
                url: action,
                type: 'POST',
                dataType: 'json',
                data: {
                   subscribeEmail: objUse.subscribeEmail.val()
                },
                success: function (responseData, textStatus, jqXHR) {
                    if ( responseData.status ) {
                        objUse.subscribeContent.fadeOut(500, function () {
                            messageDiv.html(objUse.success_message).fadeIn(500);
                        });
                    } else {
                        switch (responseData.msg) {
                            case "email-required":
                                messageDiv.html(objUse.noticeError.replace('{msg}','Error! Email is required.'));
                                break;
                            case "email-err":
                                messageDiv.html(objUse.noticeError.replace('{msg}','Error! Email invalid.'));
                                break;
                            case "duplicate":
                                messageDiv.html(objUse.noticeError.replace('{msg}','Error! Email is duplicate.'));
                                break;
                            case "filewrite":
                                messageDiv.html(objUse.noticeInfo.replace('{msg}','Error! Mail list file is open.'));
                                break;
                            case "undefined":
                                messageDiv.html(objUse.noticeInfo.replace('{msg}','Error! undefined error.'));
                                break;
                            case "api-error":
                                objUse.subscribeContent.fadeOut(500, function () {
                                    messageDiv.html(objUse.failure_message);
                                });
                        }
                        messageDiv.fadeIn(500);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('Connection error');
                },
                complete: function (data) {
                    window.ajaxCalling = false;
                }
            });
        }
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
        popupTeam();
        blogSlider();
        blogMasonry();
        galleryMasonry();
        ajaxContactForm();
        foodIsotope();
        ajaxSubscribe.eventLoad();
        flickrFeed();
        spacingMenu()
        rollAnimation();
        goTop();
        retinaLogos();
        detectViewport();
        parallax();
        removePreloader();
        lastestTweets();
        gmapSetup();
    });

})(jQuery);