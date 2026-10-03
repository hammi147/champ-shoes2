// ==========================================
// CHAMP SHOES - COMPLETE JAVASCRIPT
// ==========================================


// ==========================================
// ELEMENTS
// ==========================================

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const categoryCards = document.querySelectorAll(".category-card");

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const closeCartBtn = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const searchBtn = document.getElementById("searchBtn");
const wishlistBtn = document.getElementById("wishlistBtn");
const menuBtn = document.getElementById("menuBtn");

const checkoutBtn = document.getElementById("checkoutBtn");


// ==========================================
// CART
// ==========================================

let cart = [];


// Add product to cart
const addCartButtons = document.querySelectorAll(".add-cart");

addCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingProduct = cart.find(item => item.name === name);

        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        updateCart();

        openCart();

        showMessage(`${name} added to cart`);

    });

});


// Update cart
function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let totalItems = 0;


    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    } else {

        cart.forEach((item, index) => {

            total += item.price * item.quantity;

            totalItems += item.quantity;


            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";


            cartItem.innerHTML = `
                
                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>
                        $${item.price} × ${item.quantity}
                    </p>

                </div>


                <div class="cart-item-actions">

                    <button 
                        class="quantity-btn"
                        onclick="changeQuantity(${index}, -1)">
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button 
                        class="quantity-btn"
                        onclick="changeQuantity(${index}, 1)">
                        +
                    </button>


                    <button 
                        class="remove-item"
                        onclick="removeFromCart(${index})">
                        ×
                    </button>

                </div>

            `;


            cartItems.appendChild(cartItem);

        });

    }


    cartCount.textContent = totalItems;

    cartTotal.textContent = `$${total.toFixed(2)}`;

}


// Change quantity
function changeQuantity(index, amount) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


// Remove product
function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }


    const productName = cart[index].name;

    cart.splice(index, 1);

    updateCart();

    showMessage(`${productName} removed from cart`);

}


// Open cart
function openCart() {

    cartDrawer.classList.add("active");

    overlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


// Close cart
function closeCart() {

    cartDrawer.classList.remove("active");

    overlay.classList.remove("active");

    document.body.style.overflow = "";

}


// Cart button
cartBtn.addEventListener("click", openCart);


// Close cart
closeCartBtn.addEventListener("click", closeCart);


// Close when clicking overlay
overlay.addEventListener("click", closeCart);


// ==========================================
// PRODUCT FILTER
// ==========================================

function filterProducts(category) {

    // Update filter button
    filterButtons.forEach(button => {

        button.classList.remove("active");

        if (button.dataset.filter === category) {
            button.classList.add("active");
        }

    });


    // Filter products
    productCards.forEach(card => {

        const productCategory = card.dataset.category;


        if (
            category === "All" ||
            productCategory === category
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });


    // Scroll to shop
    document.getElementById("shop").scrollIntoView({
        behavior: "smooth"
    });

}


// Filter buttons
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.filter;

        filterProducts(category);

    });

});


// ==========================================
// CATEGORY CARDS
// ==========================================

categoryCards.forEach(card => {

    card.addEventListener("click", () => {

        const category = card.dataset.category;

        filterProducts(category);

    });

});


// ==========================================
// WISHLIST / HEART BUTTONS
// ==========================================

const heartButtons = document.querySelectorAll(".heart-btn");

let wishlist = [];


heartButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const card = button.closest(".product-card");

        const productName =
            card.querySelector("h3").textContent;


        button.classList.toggle("liked");


        if (button.classList.contains("liked")) {

            button.textContent = "♥";

            wishlist.push(productName);

            showMessage(`${productName} added to wishlist`);

        } else {

            button.textContent = "♡";

            wishlist = wishlist.filter(
                item => item !== productName
            );

            showMessage(`${productName} removed from wishlist`);

        }

    });

});


// Header wishlist button
wishlistBtn.addEventListener("click", () => {

    const likedProducts =
        document.querySelectorAll(".heart-btn.liked");


    if (likedProducts.length === 0) {

        showMessage("Your wishlist is empty.");

        return;

    }


    showMessage(
        `${likedProducts.length} item${likedProducts.length > 1 ? "s" : ""} in your wishlist`
    );

});


// ==========================================
// SEARCH
// ==========================================

searchBtn.addEventListener("click", () => {

    const searchTerm = prompt(
        "Search for a shoe:"
    );


    if (!searchTerm) {
        return;
    }


    const searchValue =
        searchTerm.trim().toLowerCase();


    let found = false;


    productCards.forEach(card => {

        const productName =
            card.querySelector("h3").textContent.toLowerCase();


        const category =
            card.dataset.category.toLowerCase();


        if (
            productName.includes(searchValue) ||
            category.includes(searchValue)
        ) {

            card.style.display = "";

            found = true;

        } else {

            card.style.display = "none";

        }

    });


    document.getElementById("shop").scrollIntoView({
        behavior: "smooth"
    });


    if (found) {

        showMessage(
            `Showing results for "${searchTerm}"`
        );

    } else {

        showMessage(
            `No shoes found for "${searchTerm}"`
        );

    }

});


// ==========================================
// MOBILE MENU
// ==========================================

let mobileMenuOpen = false;


function createMobileMenu() {

    const existingMenu =
        document.getElementById("mobileNav");


    if (existingMenu) {
        return existingMenu;
    }


    const mobileNav =
        document.createElement("div");


    mobileNav.id = "mobileNav";


    mobileNav.innerHTML = `

        <a href="#home">Home</a>

        <a href="#shop">Shop</a>

        <a href="#about">About</a>

        <a href="#contact">Contact</a>

    `;


    document.body.appendChild(mobileNav);


    // Basic mobile menu styling
    mobileNav.style.position = "fixed";
    mobileNav.style.top = "65px";
    mobileNav.style.left = "0";
    mobileNav.style.right = "0";
    mobileNav.style.background = "#ffffff";
    mobileNav.style.padding = "25px";
    mobileNav.style.display = "none";
    mobileNav.style.flexDirection = "column";
    mobileNav.style.gap = "20px";
    mobileNav.style.zIndex = "999";
    mobileNav.style.borderBottom = "1px solid #e5e5e5";


    const links =
        mobileNav.querySelectorAll("a");


    links.forEach(link => {

        link.style.fontWeight = "600";


        link.addEventListener("click", () => {

            mobileNav.style.display = "none";

            mobileMenuOpen = false;

            menuBtn.textContent = "☰";

        });

    });


    return mobileNav;

}


const mobileNav = createMobileMenu();


menuBtn.addEventListener("click", () => {

    mobileMenuOpen = !mobileMenuOpen;


    if (mobileMenuOpen) {

        mobileNav.style.display = "flex";

        menuBtn.textContent = "×";

    } else {

        mobileNav.style.display = "none";

        menuBtn.textContent = "☰";

    }

});


// ==========================================
// NEWSLETTER
// ==========================================

const newsletterForm =
    document.getElementById("newsletterForm");


newsletterForm.addEventListener("submit", event => {

    event.preventDefault();


    const email =
        document.getElementById("newsletterEmail").value.trim();


    if (!email) {

        showMessage("Please enter your email.");

        return;

    }


    showMessage(
        "Thanks! You're on the list."
    );


    newsletterForm.reset();

});


// ==========================================
// CHECKOUT
// ==========================================

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        showMessage(
            "Your cart is empty."
        );

        return;

    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    showMessage(
        `Demo checkout — Total: $${total.toFixed(2)}`
    );

});


// ==========================================
// DEMO MESSAGE
// ==========================================

function showMessage(message) {

    const oldMessage =
        document.querySelector(".demo-message");


    if (oldMessage) {
        oldMessage.remove();
    }


    const messageBox =
        document.createElement("div");


    messageBox.className =
        "demo-message";


    messageBox.textContent =
        message;


    // Message styling
    messageBox.style.position = "fixed";
    messageBox.style.left = "50%";
    messageBox.style.bottom = "30px";
    messageBox.style.transform = "translateX(-50%)";
    messageBox.style.background = "#111111";
    messageBox.style.color = "#ffffff";
    messageBox.style.padding = "13px 20px";
    messageBox.style.borderRadius = "30px";
    messageBox.style.fontSize = "13px";
    messageBox.style.fontWeight = "600";
    messageBox.style.zIndex = "5000";
    messageBox.style.boxShadow =
        "0 10px 30px rgba(0,0,0,0.2)";


    document.body.appendChild(messageBox);


    setTimeout(() => {

        if (messageBox) {
            messageBox.remove();
        }

    }, 2500);

}


// ==========================================
// INITIALIZE
// ==========================================

updateCart();