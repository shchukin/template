(function($) {
    $(function() {

        /*
         * Svg for everybody init
         */
        svg4everybody();


        /*
         * Magnific popup init
         */

        $('.magnific-popup').magnificPopup({
            type: 'inline',
            showCloseBtn: false
        });

        $('.magnific-close').on( "click", function() {
            $.magnificPopup.close();
        });

    });
})(jQuery);
