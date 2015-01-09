(function($) {


    $(function() {
        $('input, textarea').placeholder();
    });


    $(function() {
        /*
         Carousel initialization
         */
        $('.jcarousel_skeleton .jcarousel__viewport')
            .jcarousel({
                // Options go here
            })
            .jcarouselAutoscroll({
                interval: 5000,
                target: '+=3'
            });

        /*
         Prev control initialization
         */
        $('.jcarousel_skeleton .jcarousel__control_prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('jcarousel__control_disabled');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('jcarousel__control_disabled');
            })
            .jcarouselControl({
                // Options go here
                target: '-=3'
            });

        /*
         Next control initialization
         */
        $('.jcarousel_skeleton .jcarousel__control_next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('jcarousel__control_disabled');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('jcarousel__control_disabled');
            })
            .jcarouselControl({
                // Options go here
                target: '+=3'
            });

        /*
         Pagination initialization
         */
        $('.jcarousel_skeleton .jcarousel__pagination')
            .on('jcarouselpagination:active', '.jcarousel__pagination__item', function() {
                $(this).addClass('jcarousel__pagination__item_active');
            })
            .on('jcarouselpagination:inactive', '.jcarousel__pagination__item', function() {
                $(this).removeClass('jcarousel__pagination__item_active');
            })
            .jcarouselPagination({
                'item': function(page, carouselItems) {
                    return '<div class="jcarousel__pagination__item">' + page + '</div>';
                }
            });
    });


})(jQuery);
