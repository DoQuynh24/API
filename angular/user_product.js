var app = angular.module('AppUserProduct', []);

// Khởi tạo controller loginCtrl
app.controller('userProductCtrl', function ($scope, $http) {
    $scope.listProduct = []; // Khởi tạo mảng sản phẩm
    $scope.categories = []; // Danh sách danh mục
    $scope.colors = []; // Danh sách màu sắc
    $scope.sizes = []; // Danh sách size
    
    $scope.chunkedProducts = []; // Mảng lưu trữ các nhóm sản phẩm theo từng trang
    $scope.currentPage = 0; // Trang hiện tại
    $scope.itemsPerPage = 12; // Tổng số sản phẩm trên một trang
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
           
         // Chia danh sách sản phẩm thành các nhóm 4 sản phẩm (mỗi nhóm cho một dòng)
         $scope.chunkedProducts = chunkArray($scope.listProduct, $scope.productsPerRow);
         $scope.updatePage($scope.currentPage);
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

    // Hàm cập nhật các sản phẩm hiển thị trên trang hiện tại
    $scope.updatePage = function(page) {
        $scope.currentPage = page;
        var start = page * $scope.itemsPerPage;
        var end = start + $scope.itemsPerPage;
        $scope.currentProducts = $scope.listProduct.slice(start, end);

        // Chia các sản phẩm hiển thị trên trang thành các nhóm 4 sản phẩm mỗi dòng
        $scope.currentPageProducts = chunkArray($scope.currentProducts, $scope.productsPerRow);
    };

    // Hàm tính toán số trang cần hiển thị
    $scope.numberOfPages = function() {
        return Math.ceil($scope.listProduct.length / $scope.itemsPerPage);
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
