
document.addEventListener("DOMContentLoaded", function () {

    const headerContainer =
        document.getElementById("site-header");

    if (!headerContainer) {
        return;
    }

    fetch("components/header.html")
        .then(function (response) {

            if (!response.ok) {
                throw new Error(
                    "Unable to load header.html"
                );
            }

            return response.text();
        })

        .then(function (html) {

            headerContainer.innerHTML = html;

        })

        .catch(function (error) {

            console.error(
                "Header loading error:",
                error
            );

        });

});

