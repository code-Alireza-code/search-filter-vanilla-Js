//* search and filter products
//# install json-server and use db.json
//# server address : http://localhost:3000/items

//global Vars
let allProductsData = [];

const filters = {
  searchItems: "",
};

// select elements :
const searchInput = document.querySelector("#search");
const productsDom = document.querySelector(".products-center");
const btns = document.querySelectorAll(".btn");

// events & funcs

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      allProductsData = res.data;
      //render products on DOM
      renderProducts(res.data, filters);
    })
    .catch((err) => console.log(err));
});

function renderProducts(products, _filters) {
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(_filters.searchItems.trim().toLowerCase())
  );
  // render to DOM
  productsDom.innerHTML = "";
  filteredProducts.forEach((item) => {
    // create
    const productDiv = document.createElement("div");
    // content
    productDiv.classList.add("product");
    // append
    productDiv.innerHTML = `<div class="image-container">
    <img src=${item.image} alt=${item.title} />
  </div>
  <div class="product-desc">
    <p class="product-price">$${item.price}</p>
    <p>${item.title}</p>
  </div>`;
    productsDom.appendChild(productDiv);
  });
}

searchInput.addEventListener("input", (e) => {
  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filterValue = e.target.dataset.filter;
    filters.searchItems = filterValue;
    renderProducts(allProductsData, filters);
  });
});
