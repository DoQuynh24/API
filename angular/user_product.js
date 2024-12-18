var app = angular.module('AppUserProduct', []);

// Khởi tạo controller loginCtrl
app.controller('userProductCtrl', function ($scope, $http) {
    $scope.listProduct = []; // Khởi tạo mảng sản phẩm
    $scope.categories = []; // Danh sách danh mục
    $scope.colors = []; // Danh sách màu sắc
    $scope.sizes = []; // Danh sách size
    
    $scope.chunkedProducts = []; // Mảng lưu trữ các nhóm sản phẩm theo từng trang
    $scope.currentPage = 1; // Trang hiện tại
    $scope.itemsPerPage = 8; // Tổng số sản phẩm trên một trang
    $scope.productsPerRow = 4; // Số sản phẩm trên một dòng
    var current_url = "https://localhost:44366"; 


    // Hàm tạo URL ảnh
    $scope.getImageUrl = function (fileName) {
        return current_url + '/api/TuiXach/get-img/' + fileName;
    };

    $scope.LoadProduct = function() {
        $http({
            method: 'GET',
            url: current_url + '/api/TuiXach/get-all',
        }).then(function (response){
            $scope.listProduct = response.data;  
            console.log("Danh sách sản phẩm:", $scope.listProduct);
           
         // Chia nhỏ mảng sản phẩm theo hàng và trang
         $scope.preparePaginatedProducts();

        });
    };

    // Chuẩn bị danh sách sản phẩm theo từng trang và từng hàng
    $scope.preparePaginatedProducts = function () {
        let paginated = [];
        let totalItems = $scope.listProduct.length;

        // Chia nhỏ sản phẩm theo trang
        for (let i = 0; i < totalItems; i += $scope.itemsPerPage) {
            let pageProducts = $scope.listProduct.slice(i, i + $scope.itemsPerPage);

            // Chia nhỏ mỗi trang thành các hàng (4 sản phẩm một hàng)
            let rows = [];
            for (let j = 0; j < pageProducts.length; j += $scope.productsPerRow) {
                rows.push(pageProducts.slice(j, j + $scope.productsPerRow));
            }
            paginated.push(rows);
        }
        $scope.paginatedProductsList = paginated;
    };

    // Hàm trả về danh sách sản phẩm của trang hiện tại
    $scope.paginatedProducts = function () {
        return $scope.paginatedProductsList[$scope.currentPage - 1] || [];
    };

    // Hàm tính tổng số trang
    $scope.totalPages = function () {
        return Math.ceil($scope.listProduct.length / $scope.itemsPerPage);
    };

    // Chuyển đến trang cụ thể
    $scope.setPage = function (page) {
        if (page >= 1 && page <= $scope.totalPages()) {
            $scope.currentPage = page;
        }
    };


     // Lấy danh sách danh mục từ API
    $scope.loadCategories = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/DanhMucSanPham/all',
        }).then(function (response){
                $scope.categories = response.data; 
                console.log("Danh sách danh mục:", $scope.categories);
                $scope.categories = chunkArray(response.data, 3);
        });
    };
    // Hàm chia mảng thành các nhóm
    function chunkArray(array, chunkSize) {
        let results = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            results.push(array.slice(i, i + chunkSize));
        }
        return results;
    }


     // Lấy bảng màu từ API
    $scope.loadColor = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/MauSac/all',
        }).then(function (response){
                $scope.colors = response.data; 
                console.log("Mausac:", $scope.colors);
                $scope.colors = chunkArray(response.data, 3); // Chia danh sách màu thành nhóm 3
                console.log($scope.colors); // Dữ liệu màu từ API
                console.log($scope.colorMap); // Bảng ánh xạ tên màu và mã màu

            });
        };
    // Hàm chia mảng thành các nhóm
    function chunkArray(array, chunkSize) {
        let results = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            results.push(array.slice(i, i + chunkSize));
        }
        return results;
    }
    $scope.colorMap = {
        Beige: "#f5f5dc",
        Black: "#000000",
        Brown: "#a52a2a",
        Bule: "#0000ff",
        Gold: "#ecdb7c",
        Green: "#008000",
        Pink: "#FFC0CB",
        Red: "#FF0000",
        White: "#FFFFFF"
    };
    

      // Lấy bảng size từ API
      $scope.loadSize = function () { 
        $http({
            method: 'GET',
            url: current_url + '/api/Size/get-all',
        }).then(function (response){
                $scope.sizes = response.data; 
                console.log("Bảng size:", $scope.sizes);
            });
    };



});
