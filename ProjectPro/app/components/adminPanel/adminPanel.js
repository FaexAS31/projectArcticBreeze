import { toggleContent } from "../sidemenu/sidemenu.js";

export const init = () => {
    setButtons();
}

function setButtons() {
    let product = {
        module: "productCRUD",
        parent: "content",
        url: "components/productCRUD",
    };
    
    let users = {
        module: "userCRUD",
        parent: "content",
        url: "components/userCRUD",
    };
    
    let sales = {
        module: "saleCRUD",
        parent: "content",
        url: "components/saleCRUD",
    };

    if(document.getElementById("product-btn") !== null){
        document.getElementById("product-btn").addEventListener("click", () => toggleContent(product));
        document.getElementById("user-btn").addEventListener("click", () => toggleContent(users));
        document.getElementById("sale-btn").addEventListener("click", () => toggleContent(sales));
    }
}
