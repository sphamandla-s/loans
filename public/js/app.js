$(document).ready(function () {
    // Define routes
    var routes = [
        { path: "/", template: "signin-template" },
        { path: "/signup", template: "signup-template" },
        { path: "/dashboard", template: "dashboard-template" }
    ];

    // Define templates  
    var templates = {};
    templates["signin-template"] = Handlebars.compile($("#signin-template").html());
    templates["signup-template"] = Handlebars.compile($("#signup-template").html());
    templates["dashboard-template"] = Handlebars.compile($("#dashboard-template").html());

    // Define functions to get JSON data from API
    async function getUserData(formData) {

        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'email': formData.email, 'password': formData.password }),
            };

            const response = await fetch("http://localhost:3009/auth/login", options);
            console.log(response)

            if (response.status !== 200) {
                alert("Invalid credentials!")
            }

            return response

        } catch (error) {
            console.log(error)
            alert("An error occurred please refresh the page!");
        }


    }

    async function registerUserData(formData) {
        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'firstName' : formData.firstName, 'lastName' : formData.lastName, 'email': formData.email, 'password': formData.password }),
            };

            const response = await fetch("http://localhost:3009/auth/signup", options);
            console.log(response)

            if (response.status !== 201) {
                alert("Invalid credentials!")
            }

            return response

        } catch (error) {
            console.log(error)
            alert("An error occurred please refresh the page!");
        }
    }

    // Define helper functions
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    // Define function to render template
    function render(template, data) {
        $("#content").html(templates[template](data));
    }

    // Handle hash change event
    $(window).on("hashchange", function () {
        var path = location.hash.substring(1);
        var route = routes.find(function (r) { return r.path === path; });

        if (route) {
            render(route.template);
        } else {
            render("404-template");
        }
    });

    // Load initial page
    if (!location.hash) {
        render("signin-template");
    } else {
        $(window).trigger("hashchange");
    }

    // Handle form submit events
    $("#signin-form").on("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        getUserData(formProps).then(function (data) {
            if (data.statusText === "Bad Request") {
                window.location.reload()

            } else {
                render("dashboard-template", data);
                location.hash = "#/dashboard";
            }

        })
    });

    $("#signup-form").on("submit", function (e) {
        e.preventDefault();
        // Handle form submission to API and redirect to dashboard page
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        registerUserData(formProps).then(function (data) {
            if (data.status === 500) {
                window.location.reload()

            } else {
                render("dashboard-template", data);
                location.hash = "#/dashboard";
            }

        })
    });
});
