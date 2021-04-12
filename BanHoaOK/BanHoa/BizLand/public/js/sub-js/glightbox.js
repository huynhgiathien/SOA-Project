function glightbox(){
    $(document).ready(function(){
        /**
            * Initiate portfolio lightbox 
        **/
        const portfolioLightbox = GLightbox({
            selector: '.portfokio-lightbox',
            loop: true,
        });
    });
}

export {glightbox};