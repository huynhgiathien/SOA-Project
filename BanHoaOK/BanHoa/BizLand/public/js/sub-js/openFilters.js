function openFilters(){
    $(document).ready(function(){
    //- Open filter in collection.pug
        $('.open-filters').click(function(e){
            //- Chuyển icon
            if($(this).find('i').hasClass('bxs-filter-alt')){
                $(this).find('i').removeClass('bxs-filter-alt')
                $(this).find('i').addClass('bx-x')
            }else{
                $(this).find('i').removeClass('bx-x')
                $(this).find('i').addClass('bxs-filter-alt')
            }
            
            //- Mở filters
            if($('aside, .open-filters').hasClass('open') || $('.open-filters').hasClass('open')){
                $('aside, .open-filters').removeClass('open')
            }
            else{
                $('aside, .open-filters').addClass('open')
            }
        })
    });
}

export {openFilters};