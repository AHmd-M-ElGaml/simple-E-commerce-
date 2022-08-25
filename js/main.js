// Open & Close - Cart
// let cartIcon = document.querySelector("#cart-icon");
// let closeCart = document.querySelector("#close-cart");
let cart = document.querySelector(".cart");
openCart = () => {
  cart.classList.add("active");
};
closeCart = () => {
  cart.classList.remove("active");
};
// -------- Cart Working JS -------------.
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Making All Function
function ready() {
  // Remove Items Form Cart
  var removeCartBtn = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeCartBtn.length; i++) {
    var btn = removeCartBtn[i];
    btn.addEventListener("click", removeItem);
  }

  // Quantity Changes (input-Number)
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  // add Items to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var add = addCart[i];
    add.addEventListener("click", addItemCart);
  }

  // Buy Btn Work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyProduct);
}

// Buy Btn
function buyProduct() {
  alert("Your Order is placed");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  upDateTotal();
}

// Remove Items
function removeItem(event) {
  var btnClicked = event.target;
  btnClicked.parentElement.remove();
  upDateTotal();
}

// Quantity Changed
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  upDateTotal();
}

// add Items to Cart
function addItemCart(event) {
  var add = event.target;
  var shopProd = add.parentElement;
  var title = shopProd.getElementsByClassName("product-title")[0].innerText;
  var price = shopProd.getElementsByClassName("price")[0].innerText;
  var img = shopProd.getElementsByClassName("product-img")[0].src;
  addProdTo(title, price, img);
  upDateTotal();
}
function addProdTo(title, price, img) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsName = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsName.length; i++) {
    if (cartItemsName[i].innerText == title) {
      alert("you have already add this item to cart");
      return;
    }
  }

  var cartBoxContent = `
                          <img src="${img}" alt="" class="cart-img">
                          <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                          </div>
                          <!-- Remove Cart -->
                          <i class="bx bxs-trash-alt cart-remove"></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

// Update Total
function upDateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxs = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  // Counter items
  var counter = (document.getElementsByClassName("items")[0].value =
    cartBoxs.length);
  for (var i = 0; i < cartBoxs.length; i++) {
    var cartBox = cartBoxs[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var price = parseFloat(priceElement.innerHTML.replace("$", ""));
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  // if price contain some cents value
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  console.log(counter);
  return counter;
}
