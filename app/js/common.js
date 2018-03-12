// Generate products makup with content
(function() {
  function generateProducts() {
    const productArray = [
      "Mongo people t-short",
      "Dress",
      "Man's jacket",
      "Women's dress",
      "Women's jacket",
      "Man's suit",
      "Man's trousers",
      "Women's autumn jacket",
      "Man's autumn jacket",
      "Man's costume",
      "Women's costume",
      "Drawstring Shorts",
      "Tank Top",
      "Short-Sleeved T-Shirt",
      "Dip-Back Gothic-Print T-Shirt",
      "Trim Hooded Couple Parka",
      "Striped & Star Print Knit Top",
      "Long-Sleeve Raglan Knit Top",
      "Striped Jogger Pants",
      "Hooded Denim Top",
      "Printed Socks",
      "Short-Sleeve T-Shirt",
      "Slim Fit Pants",
      "Lettering Sweatshirt",
      "Sweatshirt",
      "Hooded Panel Pullover",
      "Knit Top",
      "Pullover"
    ];
    let data = {
      products: []
    };

    const min = 13;
    const max = 1033;
    const minImg = 21;
    const maxImg = 37;

    // Create products
    for (let i = 1; i < 9; i++) {
      let price = Math.floor(min + Math.random() * (max + 1 - min));
      let name = productArray[Math.floor(Math.random() * productArray.length)];
      let rnum = Math.floor(minImg + Math.random() * (maxImg + 1 - minImg));
      let urlP = `img/item-${rnum}.jpg`;

      data.products.push({
        id: i,
        name: name,
        price: price,
        url: urlP
      });
    }
    return data;
  }

  let productsGridElem = document.querySelector(".products-grid");
  if (!productsGridElem) console.log("Problem productsGridElem not found");

  let items = generateProducts();
  let data = items.products;
  let productStrElem = "";
  let productsStrMainElem = "";

  for (let i = 0; i < 8; i++) {
    for (let key in data[i]) {
      productStrElem = `
        <div class="product" data-id=${data[i].id}>
            <img src=${
              data[i].url
            } alt="items image" class="product__item" width="260" height="280">
            <div class="product__title">${data[i].name}</div>
            <div class="product__price_accent">
                &#36;${data[i].price}
            </div>
        </div>
        `;
    }
    productsStrMainElem += productStrElem;
  }

  productsGridElem.innerHTML = productsStrMainElem;
})();
// Update current Year
window.onload = function() {
  let now = new Date();
  let currentYear = now.getFullYear();
  let currentYearElem = document.getElementById("current-year");
  currentYearElem.textContent = currentYear;
};
