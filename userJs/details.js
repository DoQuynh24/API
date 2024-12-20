    
document.addEventListener('DOMContentLoaded', function(){
var nameLogo = document.getElementById('name');
if (nameLogo) { 
nameLogo.addEventListener('click', function(){
window.location.href = '/user/index.html';
    });
    }
});


function showForm(tabId) {
    var descriptionContent = document.getElementById('description-content');
    var sizeContent = document.getElementById('size-content');
    var preserveContent = document.getElementById('preserve-content');
    
    var descriptionTab = document.getElementById('description'); 
    var sizeTab = document.getElementById('size'); 
    var preserveTab = document.getElementById('preserve'); 
    
    // Ẩn tất cả nội dung của các tab
    descriptionContent.style.display = 'none';
    sizeContent.style.display = 'none';
    preserveContent.style.display = 'none';
    
    // Bỏ lớp 'active' khỏi tất cả các tab
    descriptionTab.classList.remove('active');
    sizeTab.classList.remove('active');
    preserveTab.classList.remove('active');
    
    // Hiển thị tab và nội dung tương ứng
    if (tabId === 'description-form') {
        descriptionContent.style.display = 'block';
        descriptionTab.classList.add('active');
    } else if (tabId === 'size-form') {
        sizeContent.style.display = 'block';
        sizeTab.classList.add('active');
    } else if (tabId === 'preserve-form') {
        preserveContent.style.display = 'block';
        preserveTab.classList.add('active');
    }
}

// Mặc định hiển thị tab "Mô tả sản phẩm" khi trang tải
document.addEventListener('DOMContentLoaded', function() {
    showForm('description-form');
});

function toggleContent(tabId) {
    var text = document.getElementById(tabId + '-text');
    var details = document.getElementById(tabId + '-details');
    var toggle = document.getElementById(tabId + '-toggle');
    
    // Kiểm tra xem nội dung đang hiển thị đầy đủ hay bị thu gọn
    if (details.style.display === 'none') {
        details.style.display = 'block';  // Mở rộng nội dung
        toggle.textContent = 'See less';  // Thay đổi nhãn thành "See less"
    } else {
        details.style.display = 'none';   // Thu gọn nội dung
        toggle.textContent = 'See more';  // Thay đổi nhãn thành "See more"
    }
}



function toggleDescription() {
    var details = document.getElementById('description-details');
    details.style.display = details.style.display === 'none' ? 'block' : 'none';
    document.getElementById('description-toggle').textContent = details.style.display === 'block' ? 'See less' : 'See more';
}

function togglePreserve() {
    var details = document.getElementById('preserve-details');
    details.style.display = details.style.display === 'none' ? 'block' : 'none';
    document.getElementById('preserve-toggle').textContent = details.style.display === 'block' ? 'See less' : 'See more';
}
document.getElementById("add-to-cart-btn").addEventListener("click", function() {
    // Lấy thông tin người dùng đăng nhập
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
        return;
    }

    // Lấy thông tin sản phẩm
    const productName = document.querySelector(".name-bag").innerText;
    const productPrice = document.querySelector(".price").innerText;
    const productImage = document.getElementById("main-image").src;

    // Tạo một đối tượng sản phẩm
    const product = {
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1 // Thêm thuộc tính số lượng
    };
    
    // Lưu sản phẩm vào giỏ hàng của người dùng
    const cartKey = `cart_${loggedInUser.phone}`; // Giỏ hàng cho người dùng cụ thể
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    
    if (existingProductIndex > -1) {
        // Nếu sản phẩm đã có trong giỏ hàng, chỉ cần tăng số lượng
        cart[existingProductIndex].quantity += 1;
    } else {
        // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
        cart.push(product);
    }
    
    localStorage.setItem(cartKey, JSON.stringify(cart));

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateCartCount();

    alert("Sản phẩm đã được thêm vào giỏ hàng!");
});

// Hàm cập nhật số lượng giỏ hàng
function updateCartCount() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const cartKey = `cart_${loggedInUser.phone}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const cartCount = cart.reduce((total, product) => total + (product.quantity || 1), 0);
    document.getElementById("cart-count").innerText = cartCount;
}




document.addEventListener("DOMContentLoaded", function() {
    var cartIcon = document.getElementById("cart");
    cartIcon.addEventListener("click", function() {
        window.location.href = "/user/cart.html";
    });
});

