(function($) {

    /*
     * Magnific popup init
     */

    $('.mfp-handler').magnificPopup({
        type: 'inline',
        removalDelay: 200,
        showCloseBtn: false
    });


    /*
     * jQuery Countdown init
     */

    let newYear = new Date(new Date().getFullYear() + 1, 0, 1);

    $('#new-year').countdown({
        until: newYear,
        format: 'DHM',
        layout: '<div class="countdown__container">' +
            '{d<}' +
            '<div class="countdown__section">' +
                '<span class="countdown__value">' +
                    '<span class="countdown__digit">' +
                        '{d100}' +
                    '</span>' +
                    '<span class="countdown__digit">' +
                        '{d10}' +
                    '</span>' +
                    '<span class="countdown__digit">' +
                        '{d1}' +
                    '</span>' +
                '</span>' +
                '<span class="countdown__label">' +
                    '{dl}' +
                '</span>' +
            '</div>' +
            '{d>}' +
            '{h<}' +
            '<div class="countdown__section">' +
                '<span class="countdown__value">' +
                    '<span class="countdown__digit">' +
                        '{h10}' +
                    '</span>' +
                    '<span class="countdown__digit">' +
                        '{h1}' +
                    '</span>' +
                '</span>' +
                '<span class="countdown__label">' +
                    '{hl}' +
                '</span>' +
            '</div>' +
            '{h>}' +
            '{m<}' +
            '<div class="countdown__section">' +
                '<span class="countdown__value">' +
                    '<span class="countdown__digit">' +
                        '{m10}' +
                    '</span>' +
                    '<span class="countdown__digit">' +
                        '{m1}' +
                    '</span>' +
                '</span>' +
                '<span class="countdown__label">' +
                    '{ml}' +
                '</span>' +
            '</div>' +
            '{m>}' +
        '</div>'
    });


})(jQuery);
