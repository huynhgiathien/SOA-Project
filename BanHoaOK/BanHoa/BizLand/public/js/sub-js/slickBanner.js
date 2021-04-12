function slickBanner(){
    $(document).ready(function(){
        //- Slick banner in slider.pug
        $('.slide-banners').slick({
            infinite: true,
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 2500,
            arrows: true,
            dots: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            prevArrow: $('.prev-arrow'),
            nextArrow: $('.next-arrow')
        });
    });
}

export {slickBanner};