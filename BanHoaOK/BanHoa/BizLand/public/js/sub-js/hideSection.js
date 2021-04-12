function hideSection(){
    //- Hide #topbar, #header, #footer ở checkout-page, done-page
    if($('body').hasClass("checkout-page") || $('body').hasClass("done-page")){
        $('#topbar, #header, #footer').hide();
    }else{
        $('#top, #header, #footer').show();
    }
}

export {hideSection};