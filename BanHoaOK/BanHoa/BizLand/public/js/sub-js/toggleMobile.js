function toggleMobile(){
    $(document).ready(function(){
        //- Toggle for products-page
        $('#nav-mobile-hamburger').click(function(e){
            $('.list-nav-mobile').slideToggle(350);
        });
    });
}

export {toggleMobile};