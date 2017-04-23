(function() {
    "use strict";
    
    //Carousel
    var carousel = $(".owl-carousel");

    if (carousel.length > 0) {
        carousel.owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            autoWidth: false,

            navText: ['<i class="fa fa-arrow-circle-left" title="Anterior"></i>', '<i class="fa  fa-arrow-circle-right" title="Siguiente"></i>'],
            responsive: {
                0: {
                    items: 1
                },
                500: {
                    items: 2,
                    margin: 20
                },
                800: {
                    items: 3,
                    margin: 20
                },
                1000: {
                    items: 4,
                    margin: 20
                }
            }
        });
    }

    //Bootstrap modals
    var myModal = $("#myModal");

    if (myModal.length > 0) {
        var title = myModal.find(".modal-title"),
            image = myModal.find(".img-fluid");

        $("#modal-1").click(function() {
            title.text("Desarrollo de Aplicaciones Mobiles");
            image.attr({
                src: "../images/service-1.svg",
                alt: "service 1"
            });
        });

        $("#modal-2").click(function() {
            title.text("Consultoría Tecnológica");
            image.attr({
                src: "../images/service-2.svg",
                alt: "service 2"
            });
        });

        $("#modal-3").click(function() {
            title.text("Marketing y publicidad Movil");
            image.attr({
                src: "../images/service-3.svg",
                alt: "service 3"
            });
        });
    }

    //Tooltip
    $("[data-toggle='tooltip']").tooltip();

    //Wow animation
    new WOW().init();

    //Init Smooth scroll
    var mainHeader = $(".main-header"),
        goUpIcon = $(".go-top"),
        xWindow = $(window);

    smoothScroll.init({
        speed: 1000,
        offset: 80
    });

    xWindow.scroll(function () {
        var scrolltop = $(this).scrollTop();

        if (scrolltop >= 50) {
            goUpIcon.addClass("show");
        } else {
            goUpIcon.removeClass("show");
        }
    });

    //Header animation
    xWindow.scroll(function () {
        var scroll = xWindow.scrollTop();

        if (scroll >= 80) {
            mainHeader.addClass("header-animated");
        } else {
            mainHeader.removeClass("header-animated");
        }
    });
})();
