var html = $('html');

$(function () {
    applyDarkMode();
    darkModeToggle();
    carousel();
});

function applyDarkMode() {
    // Check if 'alto_dark' is set to true in localStorage and add the dark-mode class if it is
    if (localStorage.getItem('alto_dark') === 'true') {
        html.addClass('dark-mode');
    }
}

function darkModeToggle() {
    $('.toggle-track').on('click', function () {
        // Toggle the 'dark-mode' class on the HTML element
        html.toggleClass('dark-mode');
        
        // Update localStorage with the current state of dark mode
        if (html.hasClass('dark-mode')) {
            localStorage.setItem('alto_dark', true);
        } else {
            localStorage.setItem('alto_dark', false);
        }

        // Reload iframe element in comments
        /*
            Why? Because the comments section in a post, which is
            rendered as an iframe element, was not updating when
            the dark mode toggle was applied due to being rendered
            once per page load with styling from its parent element.
            
            See ("auto") in the comments attributes here in the docs:
            https://ghost.org/docs/themes/helpers/comments/#attributes

            The `ghost-comments-root` id appears to be universal, so
            this should apply regardless of any custom comment styling.

            Why not all iframe elements? Because that could have negative
            performance implications in the post page and beyond.
        */
            $('#ghost-comments-root iframe').each(function() {
                // Reference: https://stackoverflow.com/questions/4249809/reload-an-iframe-with-jquery
                /*
                    Note that this causes a "Source map error" because, briefly,
                    the iframe is loading from an invalid URL (as it is effectively
                    being "reset" by the code below).
                */
                var srcdoc = $(this).attr('srcdoc');
                $(this).attr('srcdoc', srcdoc);
            });
    });
}

function carousel() {
    var carousel = $('.carousel');
    var postImage = carousel.find('.post-image');
    var imageHeight, nav;

    function moveNav() {
        imageHeight = postImage.height();
        if (!nav) {
            nav = carousel.find('.owl-prev, .owl-next');
        }
        nav.css({
            top: imageHeight / 2 + 'px',
            opacity: 1,
        });
    }

    carousel.owlCarousel({
        dots: false,
        margin: 28,
        nav: true,
        navText: [
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><path d="M20.547 22.107l-6.107-6.107 6.107-6.12-1.88-1.88-8 8 8 8 1.88-1.893z"></path></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><path d="M11.453 22.107l6.107-6.107-6.107-6.12 1.88-1.88 8 8-8 8-1.88-1.893z"></path></svg>',
        ],
        onInitialized: function () {
            moveNav();
            carousel.css('visibility', 'visible');
        },
        onResized: function () {
            moveNav();
        },
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
        },
    });
}
