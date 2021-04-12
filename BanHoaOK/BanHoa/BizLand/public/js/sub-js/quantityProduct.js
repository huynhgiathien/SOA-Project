function quantityProduct(){
    $(document).ready(function(){
        //- Increase, decrease amount of product in product-info.pug
        $('.minus-icon').click(function(){
            let quantity = parseInt($('#quantity').val());
            if(quantity > 0){
                quantity -= 1;
                $('.form-product #quantity').val(quantity);
            }
            else{
                $('.form-product #quantity').val(parseInt(0));
            }

        });
        $('.plus-icon').click(function(){
            let quantity = parseInt($('.form-product #quantity').val());
            quantity += 1;
            $('.form-product #quantity').val(quantity);
        });
    });
}

export {quantityProduct};