window.onload = function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const lableElement = document.getElementById("lable");
    const totalQuantityElement = document.getElementById("total-quantity");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let totalQuantity = 0;
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Giỏ hàng trống!</p>";
            lableElement.style.display = 'none';
            checkoutBtn.style.display = 'none';
        } else {
            cart.forEach((product, index) => {
                const cleanPrice = parseInt(product.price.replace(/[^\d]/g, ''));
                totalQuantity += product.quantity || 1;
                totalPrice += cleanPrice * (product.quantity || 1);

                const itemDiv = document.createElement("div");
                itemDiv.classList.add("cart-item");
                itemDiv.innerHTML = `
                    <button class="btn-remove" data-index="${index}">✖︎</button>
                    <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3 class="cart-item-name">${product.name}</h3>
                        <p class="cart-item-price">${cleanPrice.toLocaleString('vi-VN')} VNĐ</p>
                        <div class="button">
                            <button class="btn-decrease" data-index="${index}">-</button>
                            <span class="item-quantity">${product.quantity || 1}</span>
                            <button class="btn-increase" data-index="${index}">+</button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(itemDiv);
            });

            totalQuantityElement.innerText = totalQuantity;
            totalPriceElement.innerText = totalPrice.toLocaleString('vi-VN');
            lableElement.style.display = 'block';
            checkoutBtn.style.display = 'block';
        }
    }

    function updateCart(index, action) {
        const product = cart[index];
        if (action === "increase") {
            product.quantity = (product.quantity || 1) + 1;
        } else if (action === "decrease") {
            if (product.quantity > 1) {
                product.quantity--;
            } else {
                cart.splice(index, 1);
            }
        } else if (action === "remove") {
            cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    }

    cartItemsContainer.addEventListener("click", function (event) {
        const target = event.target;
        const index = parseInt(target.dataset.index);
        if (target.classList.contains("btn-increase")) {
            updateCart(index, "increase");
        } else if (target.classList.contains("btn-decrease")) {
            updateCart(index, "decrease");
        } else if (target.classList.contains("btn-remove")) {
            updateCart(index, "remove");
        }
    });

   

    updateCartDisplay();


    // Thêm sự kiện click cho biểu tượng giỏ hàng
    document.getElementById("cart").addEventListener("click", function() {
        window.location.href = "/user/cart.html"; // Chuyển hướng đến cart.html
    });

    // Nút thanh toán
    document.getElementById("checkout-btn").addEventListener("click", function() {
        
        const totalPrice = document.getElementById("total-price").innerText; 
        localStorage.setItem("totalPrice", totalPrice);
        window.location.href = "/user/checkout.html"; 
    });
};