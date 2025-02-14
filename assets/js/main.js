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
