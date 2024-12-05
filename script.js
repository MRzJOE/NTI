//update cart counter in navbar
function updateCartCounter() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  let cartCounter = document.getElementById("cart-counter");
  if (cartCounter) {
    cartCounter.innerText = totalItems;
  }
}

//initialize counter
document.addEventListener("DOMContentLoaded", function () {
  updateCartCounter();
});

// XMLHttpRequest for fetching products
let xhr = new XMLHttpRequest();
let cartItems = [];
let dataCartItems;
let subTotla;
let totlaPriceElem;

xhr.open("get", "https://fakestoreapi.com/products");
xhr.send();
xhr.addEventListener("readystatechange", function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    let products = JSON.parse(xhr.responseText);
    let products1 = document.getElementById("products1");
    let tbody = document.getElementsByTagName("tbody")[1];
    let items = document.getElementsByClassName("items");

    if (products1) {
      for (const product of products) {
        products1.innerHTML += `
          <div class="col-md-3 mb-5 col-4">
            <div class="card border-0">
              <a href="products-details.html"><img src="${product.image}" class="card-img-top" alt="Product1" width="200px" height="300px"></a>
              <div class="card-body text-center">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">$${product.price}</p>
                <a href="#" class=" btn-sm btn-outline-dark items btn-item" id="${product.id}">Buy Now</a>
              </div>
            </div>
          </div>
        `;
      }
    }

    for (const item of items) {
      item.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent page reload or jump

        let itemID = Number(event.target.id);
        if (localStorage.getItem("cartItems") == null) {
          cartItems.push(products[itemID - 1]);
          cartItems.forEach((obj) => (obj.quantity = 1));
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
        } else {
          cartItems = JSON.parse(localStorage.getItem("cartItems"));
          for (const cartItem of cartItems) {
            if (!("quantity" in cartItem)) {
              cartItems.forEach((obj) => (obj.quantity = 1));
            }
          }
          let cartItem = cartItems.find((item) => item.id === itemID);
          if (cartItem) {
            cartItem.quantity += 1;
          } else {
            cartItems.push(products[itemID - 1]);
            cartItems.forEach((obj) => (obj.quantity = 1));
          }
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }

        // Update the cart counter immediately after adding the item
        updateCartCounter();
      });
    }

    dataCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (tbody) {
      for (const dataCartItem of dataCartItems) {
        subTotla = dataCartItem.price * dataCartItem.quantity;
        tbody.innerHTML += `
          <tr>
            <td>
              <div class="cart-info">
                <img src="${dataCartItem.image}" />
                <div>
                  <p>${dataCartItem.title}</p>
                  <small>Price: $${dataCartItem.price}</small><br />
                  <a id="remove-${dataCartItem.id}" onclick="removeElem(this)" href="#">Remove</a>
                </div>
              </div>
            </td>
            <td><input id="input-${dataCartItem.id}" type="number" onclick="newCounterFun(this)" value="${dataCartItem.quantity}" /></td>
            <td class="sub_total" value="${subTotla}">$${subTotla}</td>
          </tr>
        `;
      }

      let SubTotalElems = document.getElementsByClassName("sub_total");
      let totlePrice = 0;
      let valueOfEle;

      for (const SubTotalElem of SubTotalElems) {
        valueOfEle = Number(SubTotalElem.getAttribute("value"));
        totlePrice += valueOfEle;
      }
      totlePrice = parseFloat(totlePrice.toFixed(2));
      totlaPriceElem = document.getElementsByClassName("total-price")[0];
      totlaPriceElem.innerHTML = `
        <table>
          <tr>
            <td>Total</td>
            <td>$${totlePrice}</td>
          </tr>
        </table>
      `;
    }
    const buttons = document.querySelectorAll(".btn-item");

    // Add event listeners for click events
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        // Add the 'clicked' class
        button.classList.add("clicked");

        // Remove the 'clicked' class after the animation ends
        setTimeout(() => {
          button.classList.remove("clicked");
        }, 1000); // Match the animation duration (1s)
      });
    });
  }
});

// Update item quantity from cart page
let newCounter;
let inputID;
let cartItemIndex;
let cartItem;

function newCounterFun(_this) {
  newCounter = Number(_this.value);
  inputID = _this.id.split("-")[1];
  cartItems = JSON.parse(localStorage.getItem("cartItems"));
  cartItem = cartItems.find((item) => item.id == inputID);
  if (cartItem) {
    cartItem.quantity = newCounter;
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Update the cart counter after updating the quantity
  updateCartCounter();
  setTimeout(() => {
    location.reload();
  }, 2000);
}

// Remove item from cart
let removeID;
function removeElem(_this) {
  removeID = _this.id.split("-")[1];
  cartItems = JSON.parse(localStorage.getItem("cartItems"));
  cartItem = cartItems.find((item) => item.id == removeID);
  cartItemIndex = cartItems.indexOf(cartItem);
  cartItems.splice(cartItemIndex, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Update the cart counter after removing the item
  updateCartCounter();

  setTimeout(() => {
    location.reload();
  }, 1000);
}
let form = document.getElementsByTagName("form");
var storedUsername = localStorage.getItem("username");
var storedPassword = localStorage.getItem("password");
let userName = document.getElementById("user_name");

if (!(form[0] == undefined)) {
  document
    .getElementById("RegForm")
    .addEventListener("submit", function (event) {
      var username = document.getElementById("username").value;
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;

      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    });

  document
    .getElementById("LoginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var loginUsername = document.getElementById("loginUsername").value;
      var loginPassword = document.getElementById("loginPassword").value;

      if (loginUsername == storedUsername && loginPassword == storedPassword) {
        alert("valed user name and password");
        window.location.href = "index.html";
      } else {
        alert("invaled user name or password !");
      }
    });
}
if (userName) {
  userName.innerHTML = `
  <span>${storedUsername}</span>
  `;
}
