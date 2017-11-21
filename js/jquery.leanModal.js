(function($) {
    $.fn.extend({
        leanModal: function(options) {
            var defaults = {
                top: 100,
                overlay: 0.7,
                closeButton: null
            };
            var overlay = $("<div id='lean_overlay'></div>");
            $('body').append(overlay);
            options = $.extend(defaults, options);

            return this.each(function() {
                var o = options;
                $(this).click(function(e) {
                    var modal_id = $(this).attr('content');
                    $('#lean_overlay').click(function() {
                        close_modal(modal_id);
                    });

                    function onDocumentKeyUp(event) {
                        if (event.keyCode === 27) {
                            close_modal(modal_id);
                        }
                    }

                    document.addEventListener('keyup', onDocumentKeyUp, false);
                    $(o.closeButton).click(function() {
                        close_modal(modal_id);
                    });
                    var modal_height = $(modal_id).outerHeight();
                    var modal_width = $(modal_id).outerWidth();
                    $('#lean_overlay').css({
                        'display': 'block',
                        opacity: 0
                    });
                    $('#lean_overlay').fadeTo(200, o.overlay);
                    $(modal_id).css({
                        'display': 'block',
                        'position': 'fixed',
                        'opacity': 0,
                        'z-index': 11000,
                        'left': 50 + '%',
                        'margin-left': -(modal_width / 2) + 'px',
                        'top': o.top + 'px'
                    });
                    $(modal_id).fadeTo(200, 1);
                    $('a.back-to-top').fadeOut(400);
                    $('html').css('overflow-y', 'hidden');
                    $('#downloadother-contents').scrollTop(0);
                    e.preventDefault();
                });
            });

            function close_modal(modal_id) {
                $('#lean_overlay').fadeOut(200);
                $('html').css('overflow-y', 'visible');
                $(modal_id).css({
                    'display': 'none'
                });
            }
        }
    });
})(jQuery);