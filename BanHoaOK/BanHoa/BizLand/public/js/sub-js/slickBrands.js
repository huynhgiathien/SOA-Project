function slickBrands(){
    $(document).ready(function(){
        //- Slick brands
        $('.slider-brands').slick({
            infinite: true,
            slidesToShow: 6,
            arrows: true,
            dots: false,
            speed: 600, 
            fade: false, //- Nếu có nhiều slide mà để fade: true thì nó chỉ hiện 1 item
            prevArrow: $('.prev-arrow1'),
            nextArrow: $('.next-arrow1'),
            responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: false
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                  }
                },
                {
                  breakpoint: 576,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                  }
                }
            ]
        });
    });
}

export {slickBrands};