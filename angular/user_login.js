
var app = angular.module('AppLogin', []);

// Khởi tạo controller loginCtrl
app.controller('loginCtrl', function ($scope, $http) {
    var current_url = "https://localhost:44366"; 


     // Hàm tải thông tin người dùng
     $scope.loadUserInfo = function () {
        const perId = localStorage.getItem("PerID"); 
        if (!perId) {
            alert("Vui lòng đăng nhập lại!");
            return;
        }

        $http({
            method: 'GET',
            url: `${current_url}/api/User/get-user/${perId}`,
            headers: {
                'Content-Type': 'application/json',
                
            }
        }).then(function (response) {
            console.log(response);
            const user = response.data.user;
            // Gán thông tin người dùng vào các biến trong scope
            $scope.taikhoan = user.taiKhoan;
            $scope.matkhau = user.matKhau;
            $scope.hoten = user.hoTen;
            $scope.gioitinh = user.gioiTinh;
            $scope.diachi = user.diaChi;
            $scope.ngaysinh = user.ngaySinh ? new Date(user.ngaySinh) : null; 
        }).catch(function (error) {
            console.error("Lỗi khi tải thông tin người dùng:", error.data);
            alert("Không thể tải thông tin người dùng. Vui lòng đăng nhập lại!");
        });
    };

    // Hàm lưu thông tin người dùng sau khi thay đổi
    $scope.saveUser = function () {
        const userId = localStorage.getItem("PerID");
        if (!userId) {
            alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại!");
            return;
        }

        const userData = {
            PerID: userId,
            TaiKhoan: $scope.taikhoan,
            MatKhau: $scope.matkhau,
            HoTen: $scope.hoten,
            GioiTinh: $scope.gioitinh,
            DiaChi: $scope.diachi,
            NgaySinh: $scope.ngaysinh
        };

        $http({
            method: 'PUT',
            url: `${current_url}/api/User/update-user/${userId}`,
            data: userData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            alert("Thông tin đã được cập nhật thành công!");
        }).catch(function (error) {
            console.error("Lỗi khi cập nhật thông tin:", error);
            alert("Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại!");
        });
    };

    // Gọi hàm loadUserInfo để tải thông tin khi trang được tải
    $scope.loadUserInfo();
    

 // Lấy HoTen từ localStorage khi tải trang
    $scope.HoTen = localStorage.getItem("HoTen");
    $scope.TaiKhoan = localStorage.getItem("TaiKhoan");
    $scope.login = function () {
        // Lấy dữ liệu từ input
        var current_url = "https://localhost:44366"; 
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
      

        // Kiểm tra dữ liệu nhập vào
        if (!username || !password) {
            $scope.errorMessage = "Vui lòng nhập đầy đủ thông tin!";
            return;
        }

        $http({
            method: 'POST',
            url: current_url + '/api/User/login',
            data: { 
                TaiKhoan: username,  
                MatKhau: password    
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            console.log(response.data);
            // Kiểm tra token và role trong response
            if (response.data && response.data.token && response.data.user_id && response.data.hoten) {
                alert("Đăng nhập thành công!");
                // Lưu token vào localStorage
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("PerID", response.data.user_id);
                localStorage.setItem("HoTen", response.data.hoten);
                localStorage.setItem("TaiKhoan", response.data.taikhoan);

                $scope.HoTen = response.data.hoten;
                $scope.TaiKhoan = response.data.taikhoan;

                //Kiểm tra Role
                if (response.data.role === "Admin") {
                    // Chuyển hướng đến trang admin
                    window.location.href = "http://127.0.0.1:5500/admin.html";
                } else if (response.data.role === "Khách hàng") {
                    // Chuyển hướng đến trang khách hàng
                    window.location.href = "/user/index.html";
                } else {
                    $scope.errorMessage = "Không thể xác định quyền truy cập!";
                    console.error("Role không hợp lệ:", response.data.role);
                }
            } else {
                $scope.errorMessage = "Tên đăng nhập hoặc mật khẩu không đúng!";
                console.error("Dữ liệu không hợp lệ:", response.data);
            }
        }).catch(function (error) {
            // Xử lý lỗi
            console.error("Đã xảy ra lỗi khi đăng nhập:", error);
            if (error.status === -1) {
                $scope.errorMessage = "Không thể kết nối tới máy chủ. Vui lòng kiểm tra lại!";
            } else {
                $scope.errorMessage = "Lỗi máy chủ. Vui lòng thử lại sau!";
            }
        });        
    };

     
    $scope.registerUser = function () {
        // Kiểm tra các trường bắt buộc
        if (!$scope.taikhoan || !$scope.matkhau || !$scope.hoten ) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        
    
        // Kiểm tra đồng ý với các điều khoản
        if (!$scope.agree) {
            $scope.errorMessage = "Bạn cần đồng ý với Điều khoản và Chính sách Quyền riêng tư!";
            return;
        }
    
        var formData = new FormData();
        formData.append("TaiKhoan", $scope.taikhoan);
        formData.append("MatKhau", $scope.matkhau);
        formData.append("HoTen", $scope.hoten);
    
        // Gửi yêu cầu POST đến API
        $http({
            method: 'POST',
            url: current_url + '/api/User/create-user',
            headers: { 'Content-Type': undefined },
            data: formData
        }).then(function (response) {
            // Kiểm tra kết quả trả về từ API
            if (response.data.success) {
                alert("Đăng ký thành công! Bạn có thể đăng nhập");
            
                window.location.href = "/user/login.html";
                
            } else {
                $scope.errorMessage = "Đăng ký không thành công. Vui lòng thử lại!";
            }
        }).catch(function (error) {
            console.error("Đã xảy ra lỗi khi đăng ký:", error);
            $scope.errorMessage = "Lỗi máy chủ. Vui lòng thử lại sau!";
        });
    };
    
    
});
