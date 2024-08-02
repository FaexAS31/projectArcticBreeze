
export var settings = {
  apiUrl: "http://localhost/lastDance5to/ProjectPro/app/api/",
  azureUrl: "https://arcticbreezeapi20240729165031.azurewebsites.net/",
  load: {
    components: [
      {
        module: "header",
        parent: "header",
        url: "components/header",
      },
      {
        module: "sidemenu",
        parent: "sidemenu",
        url: "components/sidemenu",
      },
      {
        module: "dashboard",
        parent: "content",
        url: "components/dashboard",
      },
      {
        module: "products",
        parent: "content",
        url: "components/products",
      },
      {
        module: "cart",
        parent: "content",
        url: "components/cart",
      },
      {
        module: "adminPanel",
        parent: "content",
        url: "components/adminPanel",
      },
      {
        module: "login",
        parent: "content",
        url: "components/login",
      },
      {
        module: "home",
        parent: "content",
        url: "components/home",
      },
      {
        module: "footer",
        parent: "footer",
        url: "components/footer",
      },
    ],
  },
};
