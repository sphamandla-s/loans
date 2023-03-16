$(document).ready(function () {
    // Define routes
    var routes = [
        { path: "/", template: "signin-template" },
        { path: "/signup", template: "signup-template" },
        { path: "/dashboard", template: "dashboard-template" },
        { path: "/take", template: "takeloan-template" },
        { path: "/pay", template: "payloan-template" },
        { path: "/successfully", template: "success-template" },
        { path: "/statement", template: "statement-template" },


    ];

    // Define templates  
    var templates = {};
    templates["signin-template"] = Handlebars.compile($("#signin-template").html());
    templates["signup-template"] = Handlebars.compile($("#signup-template").html());
    templates["dashboard-template"] = Handlebars.compile($("#dashboard-template").html());
    templates["takeloan-template"] = Handlebars.compile($("#takeloan-template").html());
    templates["payloan-template"] = Handlebars.compile($("#payloan-template").html());
    templates["success-template"] = Handlebars.compile($("#success-template").html());
    templates["statement-template"] = Handlebars.compile($("#statement-template").html());
    templates["404-template"] = Handlebars.compile($("#404-template").html());


    // Define functions to get JSON data from API
    async function getUserData(formData) {

        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'email': formData.email, 'password': formData.password }),
            };

            const response = await fetch("http://localhost:3001/auth/login", options);


            return response.json()

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
                body: JSON.stringify({ 'firstName': formData.firstName, 'lastName': formData.lastName, 'email': formData.email, 'password': formData.password }),
            };

            const response = await fetch("http://localhost:3001/auth/signup", options);


            return response.json()

        } catch (error) {
            console.log(error)
            alert("An error occurred please refresh the page!");
        }
    }


    async function takeALoan(formData) {

        try {

            const storedUser = JSON.parse(sessionStorage.getItem("user"));
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'userId': storedUser._id, 'balance': formData.balance }),
            };

            const response = await fetch("http://localhost:3001/loans/take", options);


            return response.json()

        } catch (error) {
            console.log(error)
            alert("An error occurred please refresh the page!");
        }


    }



    async function payLoan() {

        try {

            const storedUser = JSON.parse(sessionStorage.getItem("user"));
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'userId': storedUser._id }),
            };

            const response = await fetch("http://localhost:3001/loans/pay", options);


            return response.json()

        } catch (error) {
            console.log(error)
            alert("An error occurred please refresh the page!");
        }


    }

    async function getStatement() {

        try {

            const storedUser = JSON.parse(sessionStorage.getItem("user"));
            const options = {
                method: 'GET',
            };

            const response = await fetch(`http://localhost:3001/loans/view/?userId=${storedUser._id}`, options);


            return response.json()

        } catch (error) {
            console.log(error)
            alert("An error occurred please refresh the page!");
        }


    }

    function getStatementHelper() {
        console.log('clicked')
        getStatement().then(function (data) {
            if (data.msg) {
                alert(data.msg)
                window.location.reload()

            } else {
                sessionStorage.setItem("installmentsView", JSON.stringify(data));
                const storedInstallment = JSON.parse(sessionStorage.getItem("installmentView"));
                render("statement-template", storedInstallment);
                console.log(storedInstallment)
                location.hash = "#/statement";
            }
        })

    }


    $("#statement").on("click", ()=>{
        getStatementHelper()
    })
    

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

        const storedLoan = JSON.parse(sessionStorage.getItem("loan"));
        const storedInstallment = JSON.parse(sessionStorage.getItem("installment"));
        const storedInstallmentsView = JSON.parse(sessionStorage.getItem("installmentsView"));

        // if (route.path === "/statement") {
        //     // getStatementHelper()
        //     render(route.template, storedInstallmentsView)
        // } else if (route.path === '/pay') {
        //     render(route.template, storedLoan)
        // } else if (route.path === '/successfully') {
        //     render(route.template, storedInstallment)
        //     console.log('Started Here')
        //     console.log(storedInstallment)
        // }
        // else
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

            try {

                if (data.msg) {
                    alert(data.msg)
                    window.location.reload()
    
                } else {
                    console.log(data.user)
                    sessionStorage.setItem("user", JSON.stringify(data.user));
                    render("dashboard-template", data);
                    location.hash = "#/dashboard";
                }
                
            } catch (error) {
                alert(error)
            }

           

        })
    });

    $("#signup-form").on("submit", function (e) {
        e.preventDefault();
        // Handle form submission to API and redirect to dashboard page
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        registerUserData(formProps).then(function (data) {
            try {

                if (data.error) {
                    alert('User already exists please login')
                    window.location.reload()
    
                } else {
    
                    sessionStorage.setItem("user", JSON.stringify(data.user));
                    render("dashboard-template", data);
                    location.hash = "#/dashboard";
                }
                
            } catch (error) {
                console.log(error)
            }
            

        })
    });

    $("#take-loan-form").on("submit", function (e) {
        e.preventDefault();
        // Handle form submission to API and redirect to dashboard page
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        takeALoan(formProps).then(function (data) {
            try {

                if (data.msg) {
                    alert(data.msg)
                    window.location.reload()
    
                } else {
                    sessionStorage.setItem("loan", JSON.stringify(data[0]));
                    location.hash = "#/dashboard";
                }
                
            } catch (error) {
                alert(error)
            }
            

        })
    });

    $("#pay-loan-form").on("submit", function (e) {
        e.preventDefault();
        payLoan().then(function (data) {
            try {
                if (data.msg) {
                    alert(data.msg)
                    window.location.reload()
    
                } else {
                    sessionStorage.setItem("installment", JSON.stringify(data));
                    const storedInstallment = JSON.parse(sessionStorage.getItem("installment"));
                    render("success-template", storedInstallment);
    
                    console.log(storedInstallment)
                    location.hash = "#/successfully";
                }
                
            } catch (error) {
                alert(error)
            }

        })
    });
});

// window.onbeforeunload = function() {
//     sessionStorage.removeItem('installmentsView')
//     sessionStorage.removeItem('loan')
//     sessionStorage.removeItem('installment')
//     sessionStorage.removeItem('user')
// }