app.controller('homeCtrl',function($scope, $http,)  {
    $scope.totalProducts = 0; // Tổng số sản phẩm
    $scope.listProduct = []; // Khởi tạo mảng sản phẩm

    $scope.listUser = []; 
    $scope.totalUser = 0; 

    $scope.listHoaDon = []; 
    $scope.totalHoaDon = 0; 

    var current_url = "https://localhost:44366"; 

    $scope.LoadProduct = function() {
        $http({
            method: 'GET',
            url: current_url + '/api/TuiXach/get-all',
        }).then(function (response){
            $scope.listProduct = response.data; 
            $scope.filteredProducts = $scope.listProduct; 
            $scope.totalProducts = $scope.listProduct.length; 
         
           
        })
    };
    $scope.LoadProduct();

    $scope.LoadUser = function() {
        $http({
            method: 'GET',
            url: current_url + '/api/User/get-all-users',
           
        }).then(function(response) {
            $scope.listUser = response.data.data;
            $scope.totalUser = $scope.listUser.length;
            
        });
    };
    $scope.LoadUser();


    $scope.LoadHoaDon = function(trangThai) {
    
        let url = current_url + '/api/HoaDon/get-all';

        // Nếu có trạng thái, lọc hóa đơn theo trạng thái
        if (trangThai && trangThai !== 'Tất cả') {
            url += '?trangThai=' + trangThai;
        }

        $http({
            method: 'GET',
            url: url
        }).then(function(response) {
            $scope.listHoaDon = response.data;
            // Nếu có trạng thái, chỉ hiển thị những hóa đơn có trạng thái tương ứng
            if (trangThai && trangThai !== 'Tất cả') {
                $scope.filteredHoaDon = $scope.listHoaDon.filter(function(hd) {
                    return hd.trangThai === trangThai;
                });
                
                
            } else {
                $scope.filteredHoaDon = $scope.listHoaDon;
                console.log("Danh sách hóa đơn:", $scope.listHoaDon);
            }
        }).catch(function(error) {
            console.error('Lỗi khi tải hóa đơn:', error);
            
        });
    };
    $scope.LoadHoaDon();

    

});
