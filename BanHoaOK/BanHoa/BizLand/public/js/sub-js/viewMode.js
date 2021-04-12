function viewMode(){
    $(document).ready(function(){
        //- View mode: grid, list in collection.pug
        $('.view-mode button').click(function(){
            $('.view-mode button').removeClass('active')
            if($(this).hasClass('active')){
                $(this).removeClass('active')
            }else{
                $(this).addClass('active')
            }
        })
        $('#view-list').click(function(){
            $('.products-view').addClass('list')

        })
        $('#view-grid').click(function(){
            $('.products-view').removeClass('list')
        })

        //- Button btn buy, to open modal when submit
        $('#formAddProduct .btn-buy').click(function(e){
            $('#modalAddProduct').modal();
            e.preventDefault();
        })
    });
}

export {viewMode};