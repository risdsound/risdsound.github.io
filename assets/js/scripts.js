// Sticky menu
var new_scroll_position = 0;
var last_scroll_position;
var header = document.getElementById("js-header");

window.addEventListener('scroll', function (e) {
    last_scroll_position = window.scrollY;

    // Scrolling down
    if (new_scroll_position < last_scroll_position && last_scroll_position > 40) {
        header.classList.remove("is-visible");
        header.classList.add("is-hidden");

        // Scrolling up
    } else if (new_scroll_position > last_scroll_position) {
        header.classList.remove("is-hidden");
        header.classList.add("is-visible");
    }

    if (last_scroll_position < 1) {
        header.classList.remove("is-visible");
    }

    new_scroll_position = last_scroll_position;
});


// Toggle menu
document.getElementById('js-toggle').onclick = function () {
    var el = document.getElementById("js-navbar-menu");
    // If my-class is set remove it, otherwise add it
    el.classList.toggle("is-visible");
};


// Sidebar menu - mobile view
(function() {
    if (window.innerWidth > 900) {
		return;
	}
    var accordion = document.getElementsByClassName("js-sidebar-menu").item(0);
    var sections = [];

    if (accordion) {
          sections = accordion.getElementsByClassName("has-submenu");
    }

    for (var i = 0; i < sections.length; i++) {
        (function() {
            var section = sections.item(i),
                anchor = sections.item(i).children[0],
                below = sections.item(i).children[1];


            anchor.onclick = function (e) {
                if (anchor.tagName === 'A' && !section.classList.contains('active')) {
                    e.preventDefault();
                }

                if (section.classList.contains('active')) {
                    section.classList.remove('active');
                } else {
                    section.classList.add('active');
                }
            }
        })();
    }
})();

// Newsletter popup
(function() {
    var newsletter_submit = document.querySelector('.newsletter-popup__submit');
    var newsletter = document.querySelector('.newsletter-popup');
    var showOnScroll = newsletter.getAttribute('data-show-on-scroll');
    var showAfterTime = newsletter.getAttribute('data-show-after-time');

    if (showOnScroll) {
        showOnScroll = parseInt(showOnScroll, 10);
    } else {
        showOnScroll = false;
    }

    if (showAfterTime) {
        showAfterTime = parseInt(showAfterTime, 10);
    } else {
        showAfterTime = false;
    }

    function showNewsletterOnScroll (e) {
        var position = window.scrollY;

        if (position > showOnScroll && !newsletter.classList.contains('is-visible')) {
                newsletter.classList.add('is-visible');
        }
    }

    if (newsletter_submit) {
        newsletter_submit.addEventListener('click', function () {
            localStorage.setItem('newsletter-subscribe', 'true');
        });

        document.querySelector('.newsletter-popup__close').addEventListener('click', function (event) {
            event.preventDefault();
            localStorage.setItem('newsletter-subscribe', new Date().getTime());
            newsletter.classList.remove('is-visible');

            if (showOnScroll) {
                window.removeEventListener('scroll', showNewsletterOnScroll);
            }
        });
    }

    // Newsletter display
    if (
        newsletter &&
        localStorage.getItem('newsletter-subscribe') !== 'true' &&
        (
            !localStorage.getItem('newsletter-subscribe') ||
            new Date().getTime() - parseInt(localStorage.getItem('newsletter-subscribe'), 10) > (1000 * 60 * 60 * 24 * 30)
        )
    ) {
        if (showOnScroll) {
            window.addEventListener('scroll', showNewsletterOnScroll);
        }

        if (showAfterTime) {
            setTimeout(function () {
                newsletter.classList.add('is-visible');
            }, showAfterTime);
        }
    }
})();

// Share buttons pop-up
(function () {
    // share popup
    let shareButton = document.querySelector('.post__share-button');
    let sharePopup = document.querySelector('.post__share-popup');

    if (shareButton) {
        sharePopup.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        shareButton.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            sharePopup.classList.toggle('is-visible');
        });

        document.body.addEventListener('click', function () {
            sharePopup.classList.remove('is-visible');
        });
    }

    // link selector and pop-up window size
    var Config = {
        Link: ".js-share",
        Width: 500,
        Height: 500
    };
    // add handler links
    var slink = document.querySelectorAll(Config.Link);
    for (var a = 0; a < slink.length; a++) {
        slink[a].onclick = PopupHandler;
    }
    // create popup
    function PopupHandler(e) {
        e = (e ? e : window.event);
        var t = (e.target ? e.target : e.srcElement);
        // hide share popup
        if (sharePopup) {
            sharePopup.classList.remove('is-visible');
        }
        // popup position
        var px = Math.floor(((screen.availWidth || 1024) - Config.Width) / 2),
            py = Math.floor(((screen.availHeight || 700) - Config.Height) / 2);
        // open popup
        var link_href = t.href ? t.href : t.parentNode.href;
        var popup = window.open(link_href, "social",
            "width=" + Config.Width + ",height=" + Config.Height +
            ",left=" + px + ",top=" + py +
            ",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
        if (popup) {
            popup.focus();
            if (e.preventDefault) e.preventDefault();
            e.returnValue = false;
        }

        return !!popup;
    }
})();


