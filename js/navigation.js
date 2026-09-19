
document.addEventListener("DOMContentLoaded", function () {

    const navigationContainer =
        document.getElementById("site-navigation");

    if (!navigationContainer) {
        return;
    }

    fetch("components/navigation.html")
        .then(function (response) {

            if (!response.ok) {
                throw new Error(
                    "Unable to load navigation.html"
                );
            }

            return response.text();
        })

        .then(function (html) {

            navigationContainer.innerHTML = html;

            /*
             * Initialize Foundation dropdown
             * after navigation has been loaded.
             */

            if (
                typeof Foundation !== "undefined" &&
                typeof jQuery !== "undefined"
            ) {

                jQuery(document).foundation();

            }

            /*
             * Highlight current page
             */

            setActiveNavigation();

        })

        .catch(function (error) {

            console.error(
                "Navigation loading error:",
                error
            );

        });


    /*
    =====================================================
    ACTIVE PAGE
    =====================================================
    */

    function setActiveNavigation() {

        const currentPath =
            window.location.pathname
                .replace(/\/+$/, "")
                .toLowerCase();


        const links =
            document.querySelectorAll(
                "#main-nav a"
            );


        links.forEach(function (link) {

            const href =
                link.getAttribute("href");


            if (
                !href ||
                href === "#" ||
                href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("javascript:")
            ) {
                return;
            }


            try {

                const linkPath =
                    new URL(
                        href,
                        window.location.href
                    ).pathname
                    .replace(/\/+$/, "")
                    .toLowerCase();


                if (linkPath === currentPath) {

                    link.classList.add("active");

                    /*
                     * Highlight parent dropdown
                     */

                    let parent =
                        link.parentElement;

                    while (parent) {

                        if (
                            parent.classList &&
                            parent.classList.contains(
                                "has-dropdown"
                            )
                        ) {

                            parent.classList.add(
                                "active"
                            );

                        }

                        parent =
                            parent.parentElement;

                    }

                }

            } catch (error) {

                console.error(
                    "Navigation link error:",
                    error
                );

            }

        });

    }

});


document.addEventListener("DOMContentLoaded", function () {

    /*
    =====================================================
    CSSES WEBSITE
    MOBILE OFF-CANVAS NAVIGATION
    =====================================================

    Controls:

    #mySidenav  = mobile side navigation
    #openNav    = open menu button
    #closeNav   = close menu button

    =====================================================
    */


    /* ==================================================
       ELEMENTS
    ================================================== */

    const sideNav =
        document.getElementById("mySidenav");

    const openButton =
        document.getElementById("openNav");

    const closeButton =
        document.getElementById("closeNav");


    /*
    If the mobile navigation does not exist,
    stop the script.
    */

    if (!sideNav) {

        console.warn(
            "Mobile navigation #mySidenav was not found."
        );

        return;

    }


    /* ==================================================
       OPEN MOBILE NAVIGATION
    ================================================== */

    function openNav() {

        sideNav.classList.add("open");

        sideNav.style.width = "300px";

        document.body.classList.add(
            "mobile-menu-open"
        );

    }


    /* ==================================================
       CLOSE MOBILE NAVIGATION
    ================================================== */

    function closeNav() {

        sideNav.classList.remove("open");

        sideNav.style.width = "0";

        document.body.classList.remove(
            "mobile-menu-open"
        );

    }


    /* ==================================================
       OPEN BUTTON
    ================================================== */

    if (openButton) {

        openButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openNav();

            }
        );

    }


    /* ==================================================
       CLOSE BUTTON
    ================================================== */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeNav();

            }
        );

    }


    /* ==================================================
       CLOSE WHEN CLICKING OUTSIDE
    ================================================== */

    document.addEventListener(
        "click",
        function (event) {

            /*
            Don't close when clicking
            inside the mobile menu.
            */

            if (
                sideNav.contains(event.target)
            ) {

                return;

            }


            /*
            Don't close when clicking
            the menu button.
            */

            if (
                openButton &&
                openButton.contains(event.target)
            ) {

                return;

            }


            closeNav();

        }
    );


    /* ==================================================
       ESC KEY
    ================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeNav();

            }

        }
    );


    /* ==================================================
       MOBILE SUBMENUS
    ================================================== */

    const menuItems =
        sideNav.querySelectorAll("li");


    menuItems.forEach(function (item) {

        /*
        Only find direct child link
        and direct child submenu.
        */

        const link =
            item.querySelector(":scope > a");

        const submenu =
            item.querySelector(":scope > ul");


        /*
        Ignore menu items without
        a submenu.
        */

        if (!link || !submenu) {

            return;

        }


        /*
        Mark the link as a submenu link.
        */

        link.classList.add(
            "has-mobile-submenu"
        );


        /*
        Create submenu indicator.
        */

        const indicator =
            document.createElement("span");

        indicator.className =
            "mobile-submenu-arrow";

        indicator.innerHTML = "&#9656;";


        /*
        Add indicator only if
        one doesn't already exist.
        */

        if (
            !link.querySelector(
                ".mobile-submenu-arrow"
            )
        ) {

            link.appendChild(indicator);

        }


        /*
        Initially hide submenu.
        */

        submenu.classList.add(
            "mobile-submenu"
        );


        /*
        Toggle submenu.
        */

        link.addEventListener(
            "click",
            function (event) {

                /*
                If this is a "#" link,
                prevent navigation.
                */

                if (
                    link.getAttribute("href") ===
                    "#"
                ) {

                    event.preventDefault();

                }


                /*
                Toggle current submenu.
                */

                item.classList.toggle(
                    "submenu-open"
                );


                submenu.classList.toggle(
                    "submenu-visible"
                );


                /*
                Rotate arrow.
                */

                indicator.classList.toggle(
                    "arrow-open"
                );

            }
        );

    });


    /* ==================================================
       CLOSE MENU WHEN A REAL PAGE LINK IS CLICKED
    ================================================== */

    const pageLinks =
        sideNav.querySelectorAll(
            "a[href]"
        );


    pageLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");


        if (
            !href ||
            href === "#" ||
            href === "" ||
            href.startsWith("javascript:")
        ) {

            return;

        }


        link.addEventListener(
            "click",
            function () {

                /*
                Give the browser time to
                follow the link.
                */

                setTimeout(
                    function () {

                        closeNav();

                    },
                    100
                );

            }
        );

    });


    /* ==================================================
       RESET MOBILE MENU WHEN SCREEN
       BECOMES DESKTOP SIZE
    ================================================== */

    window.addEventListener(
        "resize",
        function () {

            /*
            Foundation "large" breakpoint
            is normally 1024px.
            */

            if (
                window.innerWidth >= 1024
            ) {

                closeNav();

            }

        }
    );


});


