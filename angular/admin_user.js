
app.controller('userCtrl', function($scope, $http) { 
    
    $scope.listUser = []; 
    $scope.newUser = {};
    $scope.currentUser = {}; 
    $scope.isEditMode = false;
    $scope.page = 1;
    $scope.itemsPerPage = 10;
    $scope.totalPages = 10;
    $scope.searchQuery = { taikhoan: '', hoten: '', diachi: '' };

    // URL API
    var current_url = "https://localhost:44366"; 

    $scope.searchUsers = function(page) {
        $scope.page = page || 1; 
        var searchRequest = {
            taikhoan: $scope.searchQuery.taikhoan,  
            hoten: $scope.searchQuery.hoten,  
            diachi: $scope.searchQuery.diachi,  
            Page: $scope.page,  
            PageSize: 10
        };
    
        // Gọi API với dữ liệu tìm kiếm
        $http({
            method: 'POST',
            url: current_url + '/api/User/search',  
            headers: { 'Content-Type': 'application/json' },  
            data: searchRequest  
        })
        .then(function(response) {
            if (response.data.success) { 
                
                $scope.listUser = response.data.data;  
                $scope.totalRecords = response.data.totalRecords;  
                $scope.totalPages = response.data.totalPages;  
                $scope.currentPage = response.data.currentPage;  
                createPagination($scope.totalPages);  
            } else {
                console.error('Tìm kiếm thất bại:', response.data.message);  
            }
        }, function(error) {
            console.error('Lỗi khi gọi API:', error.data);  
        });
    };
    
  
    $scope.searchUsers($scope.page);
   
    $scope.LoadUser = function() {
        $http({
            method: 'GET',
            url: current_url + '/api/User/get-all-users',
            params: {
                page: $scope.page,
                itemsPerPage: $scope.itemsPerPage,
                taikhoan: $scope.searchQuery.taikhoan, 
                hoten: $scope.searchQuery.hoten, 
                diachi: $scope.searchQuery.diachi
            }
        }).then(function(response) {
            $scope.listUser = response.data.data;
            $scope.totalPages = Math.ceil(response.data.total / $scope.itemsPerPage);
            createPagination($scope.totalPages);  
            
        });
    };

    // Hàm tạo phân trang (mũi tên)
    function createPagination(totalPages) {
        const pagination = document.querySelector('#pagination .pagination');
      
        pagination.innerHTML = ''; 

        // Nút "Previous" với mũi tên
        const prevItem = document.createElement('li');
        prevItem.className = `page-item ${$scope.page === 1 ? 'disabled' : ''}`;
        prevItem.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>`;
        prevItem.onclick = function(e) {
            e.preventDefault();
            if ($scope.page > 1) {
                $scope.page--;
                $scope.LoadUser(); 
            }
        };
        pagination.appendChild(prevItem);

        // Các nút số trang
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = `page-item ${i === $scope.page ? 'active' : ''}`;
            pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            pageItem.onclick = function(e) {
                e.preventDefault();
                $scope.page = i;
                $scope.LoadUser();  // Gọi lại API khi chuyển trang
            };
            pagination.appendChild(pageItem);
        }

        // Nút "Next" với mũi tên
        const nextItem = document.createElement('li');
        nextItem.className = `page-item ${$scope.page === totalPages ? 'disabled' : ''}`;
        nextItem.innerHTML = `<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>`;
        nextItem.onclick = function(e) {
            e.preventDefault();
            if ($scope.page < totalPages) {
                $scope.page++;
                $scope.LoadUser();  // Gọi lại API khi chuyển trang
            }
        };
        pagination.appendChild(nextItem);
    }


     // Hàm đăng ký người dùng mới
     $scope.addUser = function () {
        
        if (!$scope.taikhoan || !$scope.matkhau || !$scope.hoten ) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        
    
        var formData = new FormData();
        formData.append("TaiKhoan", $scope.taikhoan);
        formData.append("MatKhau", $scope.matkhau);
        formData.append("HoTen", $scope.hoten);
        formData.append('NgaySinh', $scope.ngaysinh);
        formData.append("GioiTinh", $scope.gioitinh);
        formData.append("DiaChi", $scope.diachi);
        formData.append("Role", $scope.role || 'Khách hàng');
        
        $http({
            method: 'POST',
            url: current_url + '/api/User/create-user',
            headers: { 'Content-Type': undefined },
            data: formData
        }).then(function (response) {
            alert("Đăng ký người dùng thành công!");
            $scope.LoadUser();
            $scope.resetForm();
        }, function (error) {
            alert("Đăng ký người dùng thất bại!");
        });
    };
    

   
     // Hàm sửa người dùng
     $scope.editUser = function(user) {
        $scope.isEditMode = true;
        $scope.perid = user.perID;
        $scope.taikhoan = user.taiKhoan;
        $scope.matkhau = user.matKhau;
        $scope.hoten = user.hoTen;
        $scope.ngaysinh = user.ngaySinh ? new Date(user.ngaySinh) : null; 
        $scope.gioitinh = user.gioiTinh;
        $scope.diachi = user.diaChi;
        $scope.role = (user.role && user.role.toLowerCase() === 'admin') ? 'Admin' : 'Khách hàng';
    };

    // Hàm lưu (thêm mới hoặc sửa)
    $scope.saveUser = function() {
        var formData = new FormData();
        if ($scope.ngaysinh) {
            if ($scope.ngaysinh instanceof Date) {
                $scope.ngaysinh = $scope.ngaysinh.toISOString().split('T')[0];
            }
        }
        formData.append("PerID", $scope.perid);  
        formData.append("TaiKhoan", $scope.taikhoan);
        formData.append("MatKhau", $scope.matkhau);
        formData.append("HoTen", $scope.hoten);
        formData.append('NgaySinh', $scope.ngaysinh);
        formData.append("GioiTinh", $scope.gioitinh);
        formData.append("DiaChi", $scope.diachi);
        formData.append("Role", $scope.role);  

        var url = $scope.isEditMode ? '/api/User/update-user' : '/api/User/create-user';
        var method = $scope.isEditMode ? 'PUT' : 'POST'; 


        $http({
            method: method,
            url: current_url + url,
            headers: { 'Content-Type': undefined },
            data: formData
        }).then(function(response) {
            alert($scope.isEditMode ? "Cập nhật người dùng thành công!" : "Đăng ký người dùng thành công!");
            $scope.LoadUser(); 
            $scope.clearForm();
        }, function(error) {
            console.error("Lỗi cập nhật:", error.data);
            alert($scope.isEditMode ? "Cập nhật người dùng thất bại!" : "Đăng ký người dùng thất bại!");
        });
    };
    
      // Hàm xóa người dùng
    $scope.deleteUser = function(userID) {
        // Hiển thị hộp thoại xác nhận
        var confirmation = confirm("Bạn có chắc chắn muốn xóa người dùng này không?");
        if (confirmation) {
            // Nếu người dùng đồng ý, gọi API xóa
            $http.delete(current_url + '/api/User/delete-user/' + userID).then(function(response) {
                alert("Xóa người dùng thành công!");
                $scope.LoadUser(); // Reload danh sách người dùng sau khi xóa
            }, function(error) {
                alert("Xóa người dùng thất bại!");
            });
        } else {
            alert("Đã hủy thao tác xóa.");
        }
    };

    // Hàm xóa form khi mở modal
    $scope.clearForm = function() {
        $scope.taikhoan = '';
        $scope.matkhau = '';
        $scope.hoten = '';
        $scope.ngaysinh = '';
        $scope.gioitinh = '';
        $scope.diachi = '';
        $scope.role = 'user'; // Default role là 'user'
        $scope.isEditMode = false; // Chế độ thêm mới
    };

    // Tải danh sách người dùng khi trang được load
    $scope.LoadUser();
    
    
});
