    
document.addEventListener('DOMContentLoaded', function(){
var nameLogo = document.getElementById('name');
if (nameLogo) { 
nameLogo.addEventListener('click', function(){
window.location.href = '/user/index.html';
    });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    autoPlay(); // Gọi autoPlay sau khi toàn bộ DOM đã tải
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



// Mảng chứa slideshow mặc định và Other color
var defaultImages = ["images/1.png", "images/1.1.png", "images/1.2.png"];
var otherColorImages = ["images/9.png", "images/9.1.png", "images/9.2.png"];
var images = defaultImages; // Mảng hình ảnh đang được sử dụng
var current = 0;
var autoPlayInterval;
var isDefaultSlideshow = true; // Biến để theo dõi trạng thái slideshow hiện tại

// Mảng chứa tên tương ứng cho mỗi bộ hình ảnh
var defaultSubName = "Black Patent Calfskin";
var otherColorSubName = "Rope Beige Patent Calfskin";

// Hàm thay đổi hình ảnh chính trong slideshow
function slideshow() {
    var mainImage = document.getElementById("main-image");
    if (mainImage) {
        current = (current + 1) % images.length; 
        mainImage.src = images[current];
    }
}

// Hàm bắt đầu slideshow
function autoPlay() {
    autoPlayInterval = setInterval(slideshow, 3000); 
}

// Hàm dừng slideshow
function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Hàm hoán đổi hình ảnh, slideshow và sub-name khi nhấp vào Other Color
function changeSlideshow() {
    stopAutoPlay(); // Dừng slideshow hiện tại

    var mainImage = document.getElementById("main-image");
    var subName = document.querySelector('.sub-name');

    if (isDefaultSlideshow) {
        // Nếu đang ở slideshow mặc định, đổi sang slideshow Other color
        mainImage.src = otherColorImages[0]; // Đặt ảnh đầu tiên của Other color
        images = otherColorImages; // Cập nhật mảng hình ảnh mới
        subName.textContent = otherColorSubName; // Cập nhật sub-name mới
        document.querySelector('.img-color').src = defaultImages[0]; // Đổi ảnh other color thành ảnh đầu tiên của slideshow mặc định
    } else {
        // Nếu đang ở slideshow Other color, đổi lại sang slideshow mặc định
        mainImage.src = defaultImages[0]; // Đặt ảnh đầu tiên của slideshow mặc định
        images = defaultImages; // Đổi lại mảng hình ảnh
        subName.textContent = defaultSubName; // Cập nhật lại sub-name mặc định
        document.querySelector('.img-color').src = otherColorImages[0]; // Đổi ảnh other color về ảnh ban đầu
    }

    isDefaultSlideshow = !isDefaultSlideshow; // Đảo ngược trạng thái slideshow
    current = 0; // Đặt lại chỉ số ảnh hiện tại
    autoPlay(); // Bắt đầu slideshow mới
}

// Đoạn mã này sẽ lấy id từ URL và hiển thị chi tiết sản phẩm tương ứng
document.addEventListener('DOMContentLoaded', function() {
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id');
    
    if (productId) {
        showProductDetails(productId);
    }
});

function showProductDetails(productId) {
    var productDetails = {
        1: {
            name: 'Miss Dior Flap Bag',
            price: '95.000.000 ₫',
            description: 'Mới cho mùa Đông 2024, túi nắp Miss Dior định nghĩa lại nét sang trọng hiện đại...',
            images: ['images/1.png', 'images/1.1.png', 'images/1.2.png'],
            material: 'Black Patent Calfskin',
            size: '22 x 11 x 6 cm',
            otherColor: ['images/9.png', 'images/9.1.png', 'images/9.2.png']
        },
        2: {
            name: 'Dior Groove 20 Bag',
            price: '83.000.000 ₫',
            description: 'Túi Dior Groove 20 là một sáng tạo thanh lịch...',
            images: ['images/2.png', 'images/2.1.png','images/2.2.png' ],
            material: 'Blue Dior Oblique Jacquard',
            size: '20 x 15 x 7 cm',
            otherColor: ['images/10.png', 'images/10.1.png', 'images/10.2.png']
        } 
    };

    var product = productDetails[productId];
    
    if (product) {
        // Cập nhật thông tin chi tiết sản phẩm
        document.querySelector('#main-image').src = product.images[0];
        document.querySelector('.name-bag').textContent = product.name;
        document.querySelector('.price').textContent = product.price;
        document.querySelector('#description-text').textContent = product.description;
        document.querySelector('.sub-name').textContent = product.material;

        // Cập nhật slideshow mặc định và Other color
        defaultImages = product.images;
        otherColorImages = product.otherColor;
        images = defaultImages; // Gán mảng hình ảnh đang sử dụng là mảng mặc định
        current = 0; // Đặt lại chỉ số ảnh hiện tại
        
        // Cập nhật ảnh đầu tiên cho slideshow
        document.getElementById("main-image").src = defaultImages[current];

        // Bắt đầu autoplay cho slideshow
        autoPlay();

        // Cập nhật ảnh Other color thành ảnh đầu tiên của Other color
        document.querySelector('.img-color').src = otherColorImages[0];
    }
}

function showProductDetails(productId) {
    var productDetails = {
        1: {
            name: 'Miss Dior Flap Bag',
            price: '95.000.000 ₫',
            description: 'Mới cho mùa Đông 2024, túi nắp Miss Dior định nghĩa lại nét sang trọng hiện đại...',
            images: ['images/1.png', 'images/1.1.png', 'images/1.2.png'],
            material: 'Black Patent Calfskin',
            size: '22 x 11 x 6 cm',
            care: 'Tránh xa nước và ẩm ướt. Lau sạch bằng khăn mềm.',
            otherColor: ['images/9.png', 'images/9.1.png', 'images/9.2.png']
        },
        2: {
            name: 'Dior Groove 20 Bag',
            price: '83.000.000 ₫',
            description: 'Túi Dior Groove 20 là một sáng tạo thanh lịch...',
            images: ['images/2.png', 'images/2.1.png','images/2.2.png' ],
            material: 'Blue Dior Oblique Jacquard',
            size: '20 x 15 x 7 cm',
            care: 'Duy trì bằng cách lau sạch và bảo quản ở nơi khô ráo.',
            otherColor: ['images/10.png', 'images/10.1.png', 'images/10.2.png']
        } 
    };

    var product = productDetails[productId];
    
    if (product) {
        // Cập nhật thông tin chi tiết sản phẩm
        document.querySelector('#main-image').src = product.images[0];
        document.querySelector('.name-bag').textContent = product.name;
        document.querySelector('.price').textContent = product.price;
        document.querySelector('#description-text').textContent = product.description;
        document.querySelector('.sub-name').textContent = product.material;
        
        // Cập nhật thông tin kích thước
        document.querySelector('#size-content').innerHTML = `
            <ul style="margin-left: 100px; margin-top: 20px;">
                <li>Kích thước: ${product.size}</li>
                <li>Kích thước phù hợp để điện thoại, ví và son môi</li>
                <li>Chiều dài tay cầm trên cùng: 50 - 70 cm / 19,5 - 27,5 inch</li>
                <li>Chiều dài thả tay cầm trên cùng: 19- 30 cm / 7,5 - 12 inch</li>
                <li>Trọng lượng: 540g/19 ounce</li>
            </ul>
        `;

        // Cập nhật hướng dẫn bảo quản
        document.querySelector('#preserve-content').innerHTML = `
           
            <ul style="margin-left: 100px; margin-top: 20px; display: none;">
                <li>${product.care}</li>
                <li><img class="hd" src="images/hd1.jpg"/>Không giặt</li>
                <li><img class="hd" src="images/hd2.jpg"/>Không sử dụng nước tẩy/thuốc tẩy</li>
                <li><img class="hd" src="images/hd3.jpg"/>Không là</li>
                <li><img class="hd" src="images/hd4.jpg"/>Không giặt ướt/khô</li>
                <li><img class="hd" src="images/hd5.jpg"/>Không sử dụng máy sấy</li>
            </ul>
        `;

        // Cập nhật slideshow mặc định và Other color
        defaultImages = product.images;
        otherColorImages = product.otherColor;
    }
}

// Hàm để toggle xem thêm mô tả
function toggleContent(type) {
    var details = document.getElementById('description-details');
    if (type === 'description') {
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
        document.getElementById('description-toggle').textContent = details.style.display === 'block' ? 'See less' : 'See more';
    }
}

document.getElementById("add-to-cart-btn").addEventListener("click", function() {
    // Lấy thông tin sản phẩm
    const productName = document.querySelector(".name-bag").innerText;
    const productPrice = document.querySelector(".price").innerText;
    const productImage = document.getElementById("main-image").src; // Hoặc thay bằng đường dẫn hình ảnh bạn muốn

    // Tạo một đối tượng sản phẩm
    const product = {
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1 // Thêm thuộc tính số lượng
    };
    
    // Lưu sản phẩm vào localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    
    if (existingProductIndex > -1) {
        // Nếu sản phẩm đã có trong giỏ hàng, chỉ cần tăng số lượng
        cart[existingProductIndex].quantity += 1;
    } else {
        // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
        cart.push(product);
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateCartCount();

    alert("Sản phẩm đã được thêm vào giỏ hàng!");
});

document.addEventListener("DOMContentLoaded", function() {
    var cartIcon = document.getElementById("cart");
    cartIcon.addEventListener("click", function() {
        window.location.href = "/user/cart.html";
    });
});

