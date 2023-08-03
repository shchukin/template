(function ($) {

    $('.input--select .input__widget').on('change', function () {
        if ($(this).val() === 'placeholder') {
            $(this).parent('.input').addClass('input--placeholder-is-chosen')
        } else {
            $(this).parent('.input').removeClass('input--placeholder-is-chosen')
        }
    });


    $('.input--expandable .input__widget').each(function () {
        this.setAttribute('style', 'height:' + (this.scrollHeight + 2) + 'px;');
    }).on('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight + 2) + 'px';
    });


})(jQuery);
