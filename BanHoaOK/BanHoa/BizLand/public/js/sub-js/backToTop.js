function backToTop(){
    $(document).ready(function(){
        // Back to top button
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').addClass('open');
            } else {
                $('.back-to-top').removeClass('open');
            }
        });

        $('.back-to-top').click(function() {
            $('html, body').animate({
            scrollTop: 0
            }, 1500, 'easeInOutExpo');
            return false; //- Do có tag a nên dùng để tránh bị trở về đầu trang
        });
    });
}

export {backToTop};