(function ($) {

    /* Select placeholder */
    $('select.input__widget').on('change', function () {
        if ($(this).val() === 'placeholder') {
            $(this).parent('.input').addClass('input--placeholder-is-chosen')
        } else {
            $(this).parent('.input').removeClass('input--placeholder-is-chosen')
        }
    });

    /* Expanding textarea */
    function expandTextarea(element) {
        element.css('height', 'auto');
        element.css('height', (element[0].scrollHeight + 2 * parseInt(element.css('border-width'), 10)) + 'px');
    }

    $('.input--expandable .input__widget').each(function () {
        expandTextarea($(this));
    }).on('input', function () {
        expandTextarea($(this));
    })

    /* Error field */
    $('.input__widget').on('focus', function () {
        $(this).parents('.input').removeClass('input--error');
        $(this).parents('.input').nextUntil(':not(.helper--output)').remove();
    });

})(jQuery);
