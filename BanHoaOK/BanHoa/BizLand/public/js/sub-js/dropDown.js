function dropDown(){
    $(document).ready(function(){
        //- Toggle for products-page
        $('.aside-category .dropdown').click(function(e){
            $(this).find('> ul').slideToggle(350);
            //- Rotate icon i
            $(this).find('> a i').toggleClass("rotate180deg");
        });

        $('.dropdown-btn').click(function(e){
            e.preventDefault();        
        });
    });
}

export {dropDown};