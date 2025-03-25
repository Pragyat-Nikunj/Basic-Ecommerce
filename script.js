document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 39.99 },
    { id: 3, name: "Product 3", price: 15.99 },
  ];

  // Load the cart from localStorage (parse the JSON) or initialize as an empty array.
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  // Render products list on the page
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-item");
    productDiv.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button data-id="${product.id}">Add to Cart</button>
        `;
    productList.appendChild(productDiv);
  });

  // Listen for clicks on the products list
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  // Function to add a product to the cart
  function addToCart(product) {
    cart.push(product);
    saveCart();
    renderCart();
  }

  // Function to save the cart array to localStorage as JSON
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Function to render the cart on the page
  function renderCart() {
    // Reset total price each time the cart is rendered
    let totalPrice = 0;
    // Clear previous cart items
    cartItems.innerHTML = "";

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("product-item");
        cartItem.innerHTML = `
                    <span>${item.name} - $${item.price.toFixed(2)}</span>
                    <button data-id="${item.id}">Remove</button>
                `;
        cartItems.appendChild(cartItem);
      });

      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      // When cart is empty, show the empty message and hide the total
      cartTotalMessage.classList.add("hidden");
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = "$0.00";
    }
  }

  // Checkout button clears the cart and updates localStorage
  checkOutBtn.addEventListener("click", () => {
    cart = [];
    saveCart();
    alert("Checkout Successful!");
    renderCart();
  });
  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const product_id = parseInt(e.target.getAttribute("data-id"));
        const product = cart.find(p => p.id == product_id);
        const index = cart.indexOf(product);
        if (index != -1) cart.splice(index, 1); 
        saveCart(); 
        renderCart();
    }
  })
  renderCart();
});
