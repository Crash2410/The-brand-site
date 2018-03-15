// Generate products makup with content
(function() {
  function generateProducts() {
    var productArray = [
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
    var data = {
      products: []
    };

    var min = 13;
    var max = 1033;
    var minImg = 21;
    var maxImg = 37;

    // Create products
    for (var i = 1; i < 9; i++) {
      var price = Math.floor(min + Math.random() * (max + 1 - min));
      var name = productArray[Math.floor(Math.random() * productArray.length)];
      var rnum = Math.floor(minImg + Math.random() * (maxImg + 1 - minImg));
      var urlP = `img/item-${rnum}.jpg`;

      data.products.push({
        id: i,
        name: name,
        price: price,
        url: urlP
      });
    }
    return data;
  }

  var productsGridElem = document.querySelector(".products-grid");
  if (!productsGridElem) console.log("Problem productsGridElem not found");

  var items = generateProducts();
  var data = items.products;
  var productStrElem = "";
  var productsStrMainElem = "";

  for (var i = 0; i < 8; i++) {
    for (var key in data[i]) {
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
  var now = new Date();
  var currentYear = now.getFullYear();
  var currentYearElem = document.getElementById("current-year");
  currentYearElem.textContent = currentYear;
};
// URL for AJAX request handling cart
var CART_URL = "http://localhost:3800/cart";

// Class Cart
function Cart() {
  this._storage = [];
  this._item = {};
  this._cartId = 0;
}
Cart.prototype.getCartId = function() {
  return this._cartId;
};

Cart.prototype.setNextCartId = function() {
  return this._cartId++;
};

Cart.prototype.resetItem = function() {
  this._item = {};
};

/**
 * addToStorage - add item to storage
 */
Cart.prototype.addToStorage = function(item) {
  if (typeof item === "object") {
    this._storage.push(item);
  }
  return;
};
/**
 * headerCartRender - отрисовка содержимого
 * корзины, по факту  запроса
 * @return {[type]} [description]
 */
Cart.prototype.headerCartRender = function() {
  $.get(CART_URL + "/", function(result) {
    if (result) {
      var subSum = 0;
      var totalSum = 0;
      var totalAmount = 0;

      console.log(result);

      result.forEach(function(item, index) {
        subSum = parseInt(item.quantity) * parseFloat(item.price);
        totalSum += subSum;
        totalAmount += parseInt(item.quantity);
      });
      $(".cart-amount").text("Total amount: " + totalAmount);
      $(".cart-sum").text("Total sum: $" + totalSum);
    } else {
      console.log("Server not response");
    }
  });
};

let cart = new Cart();

//  обработчики событий
// нажатие на кнопку добавления в корзину
$(".product").on("click", function() {
  // Получение значений из HTML "item Id", "item Name"
  // присвоение артибутам экзепляра класса cart
  cart._item.itemId = $(this).attr("data-id");
  cart._item.itemName = $(this)
    .find(".product__title")
    .text()
    .trim();
  cart._item.itemPrice = $(this)
    .find(".product__price_accent")
    .text()
    .trim()
    .slice(1);
  cart.setNextCartId();

  console.log(cart._item);

  // Генерация модульного окна
  // Generate wrap with -/+ input element for dialog window
  var inputForWindow = $("<div>");
  var subtitle = $("<div>")
    .addClass("fibe-subtitle")
    .text("How much do you want?");
  var form = $("<div>").addClass("add-form");
  var minusBtn = $("<div>").addClass("minus-btn disable");
  var minus = $("<i>").addClass("fas fa-minus");
  var plusBtn = $("<div>").addClass("plus-btn");
  var plus = $("<i>").addClass("fas fa-plus");
  var input = $("<input>")
    .addClass("items-to-add-val")
    .attr({
      name: "quantity",
      type: "number",
      min: 1,
      max: 50,
      step: 1,
      value: 1
    });

  minusBtn.append(minus);
  plusBtn.append(plus);
  form
    .append(minusBtn)
    .append(input)
    .append(plusBtn);
  inputForWindow.append(subtitle).append(form);
  // END of generate wrap

  // Displaying dialog window passing wrap
  fibe(
    cart._item.itemName,
    {
      text: inputForWindow,
      button1: { name: "Cancel" },
      button2: {
        name: "Add to cart",
        action: function() {
          $.post(
            CART_URL + "/",
            {
              id: cart.getCartId(),
              itemId: cart._item.itemId,
              itemName: cart._item.itemName,
              price: cart._item.itemPrice,
              quantity: cart._item._currentItemAmount
                ? cart._item._currentItemAmoun
                : 1
            }, // Callback after POST
            function(data) {
              cart.addToStorage(cart._item);
              cart.resetItem();
              cart.headerCartRender();

              var addedName = data.itemName;
              var message = $("<span>").text("Added! ");
              var wrap = $("<div>")
                .append(message)
                .append(data.quantity + " piece`s in cart.");

              // Displaying 'success' dialog window
              fibe(addedName, "success", false, {
                text: wrap,
                button1: {
                  name: "Continue shopping"
                },
                button2: {
                  action: function() {
                    window.location = "shopping-cart.html";
                  },
                  name: "Make order"
                }
              });
            }
          );
        }
      }
    },
    false
  );
});

// Обработка ввода количества товаров, +/-
// Handler for 'click' on '.minus-btn'
$("body").on("click", ".minus-btn", function() {
  cart._item._currentItemAmount = Number($(".items-to-add-val").val());
  if (cart._item._currentItemAmount <= 1) {
    return;
  }
  $(".items-to-add-val").val(cart._item._currentItemAmount - 1);
  cart._item._currentItemAmount--;
  if (cart._item._currentItemAmount <= 1) {
    $(".minus-btn").addClass("disable");
  }
  if (cart._item._currentItemAmount < 50) {
    $(".plus-btn").removeClass("disable");
  }
});
// Handler for 'click' on '.plus-btn'
$("body").on("click", ".plus-btn", function() {
  cart._item._currentItemAmount = Number($(".items-to-add-val").val());
  if (cart._item._currentItemAmount >= 50) {
    return;
  }
  $(".items-to-add-val").val(cart._item._currentItemAmount + 1);
  cart._item._currentItemAmount++;
  if (cart._item._currentItemAmount >= 50) {
    $(".plus-btn").addClass("disable");
  }
  if (cart._item._currentItemAmount > 1) {
    $(".minus-btn").removeClass("disable");
  }
});
// Handler for 'blur' on '.items-to-add-val', check Number of cart._item._currentItemAmount
$("body").on("blur", ".items-to-add-val", function() {
  var num = Number($(".items-to-add-val").val());
  if (num >= 1 && num <= 50) {
    cart._item._currentItemAmount = num;
    if (cart._item._currentItemAmount >= 50) {
      $(".plus-btn").addClass("disable");
    }
    if (cart._item._currentItemAmount > 1) {
      $(".minus-btn").removeClass("disable");
    }
    if (cart._item._currentItemAmount <= 1) {
      $(".minus-btn").addClass("disable");
    }
    if (cart._item._currentItemAmount < 50) {
      $(".plus-btn").removeClass("disable");
    }
  } else {
    $(".items-to-add-val").val(1);
  }
});

// Перенаправление на страницу cart.html
$(".row-order-btn").on("click", function() {
  window.location = "shopping-cart.html";
});
