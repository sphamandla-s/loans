// Define routes and templates
const routes = {
    "/": { templateId: "home-template", getData: null },
    "/about": { templateId: "about-template", getData: getAbout },
    "/contact": { templateId: "contact-template", getData: getContact },
  };
  
  // Define Handlebars helpers
  Handlebars.registerHelper("formatDate", function(date) {
    return new Date(date).toLocaleDateString();
  });
  
  // Handle hash changes
  function handleHashChange() {
    const hash = location.hash || "#/";
    const route = routes[hash];
    if (!route) {
      return;
    }
  
    const main = document.getElementById("main");
    const template = document.getElementById(route.templateId).innerHTML;
    const compiledTemplate = Handlebars.compile(template);
  
    if (route.getData) {
      route.getData().then((data) => {
        const html = compiledTemplate(data);
        main.innerHTML = html;
      });
    } else {
      const html = compiledTemplate();
      main.innerHTML = html;
    }
  }
  
  // Fetch data from API
  async function getAbout() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await response.json();
    return data;
  }
  
  async function getContact() {
    const response = await fetch("https://jsonplaceholder.typicode.com/comments/1");
    const data = await response.json();
    return data;
  }
  
  // Initialize application
  window.addEventListener("hashchange", handleHashChange);
  handleHashChange();
  