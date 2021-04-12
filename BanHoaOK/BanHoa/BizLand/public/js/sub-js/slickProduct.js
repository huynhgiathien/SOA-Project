function slickProduct(){
    $(document).ready(function(){
        //- Slick slider
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            speed: 400,
            prevArrow: $('.prev-arrow2'),
            nextArrow: $('.next-arrow2'),
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            arrows: false,
            centerMode: true,
            focusOnSelect: true,
            vertical: true,
            speed: 400,
            infinite: true,
            centerPadding: '20px',
            responsive: [
                {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    vertical: false,
                }
                },
                {
                    breakpoint: 576,
                    settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    vertical: false,
                    }
                }    
            ]
        });
    });
}

export {slickProduct};