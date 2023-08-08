(function ($) {

    $('.input--select .input__widget').on('change', function () {
        if ($(this).val() === 'placeholder') {
            $(this).parent('.input').addClass('input--placeholder-is-chosen')
        } else {
            $(this).parent('.input').removeClass('input--placeholder-is-chosen')
        }
    });

    $('.input--expandable .input__widget').each(function () {
        $(this).css('height', ($(this)[0].scrollHeight + 2 * parseInt($(this).css('border-width'), 10)) + 'px');
    }).on('input', function () {
        $(this).css('height', 'auto');
        $(this).css('height', ($(this)[0].scrollHeight + 2 * parseInt($(this).css('border-width'), 10)) + 'px');
    });

    $('.input__widget').on('focus', function () {
        $(this).parents('.input').removeClass('input--error');
        $(this).parents('.input').nextUntil(':not(.hint--output)').remove();
    });

})(jQuery);
