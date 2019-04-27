function NguoiDungService() {

    this.layDanhSachNguoiDung = function () {
        $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
            type: "GET" //Lấy dữ liệu về
        })
            .done(function (result) {
                //LUU DANH SACH NGUOI DUNG XUONG LOCAL
                localStorage.setItem("DSND", JSON.stringify(result));
                console.log(result);
                taoBang(result);
            })
            .fail(function (err) {
                console.log(err);
            })
    }
    this.themNguoiDung = function (nguoiDung) {
        $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
            type: "POST",
            data: nguoiDung //ĐẨY DỮ LIỆU LÊN
        })
        .done(function(result){
            if(result === "tai khoan da ton tai !"){
                alert(result);
            } else{
                location.reload();
            }
        })
        .fail(function(err){
            console.log(err);
        })
    }

//cap nhat nguoi dung
    this.capNhatNguoiDung = function(nguoiDung){
        var ngd = JSON.stringify(nguoiDung);
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung`,
            type: 'PUT',
            data: ngd,
            contentType: 'application/json',
            dataType: 'json',
        })
        .done(function(res){
            console.log('XONG');
            location.reload();
        })
        .fail(function(err){
            console.log(err);
        })
    }

    this.xoaNguoiDung = function (taiKhoan){
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${taiKhoan}`,
            type: "DELETE"
        })
        .done(function(result){
            location.reload();
        })
        .fail(function(err){
            console.log(err);
        })
    }
    this.layThongTinNguoiDUng = function(taiKhoan){
        //lấy mảng về biến chuổi thành JSON
        var danhSachNguoiDung = JSON.parse(localStorage.getItem("DSND"));
        var nguoiDung;
        //DUYỆT THÔNG TIN NGƯỜI DÙNG CÓ TÌM THẤY KO
        danhSachNguoiDung.map(function(item){
            if(item.TaiKhoan === taiKhoan ){
                nguoiDung = item;
                return nguoiDung;
            }
        })
        return nguoiDung;
    }
}


function taoBang(danhSachMang) {

    var tblBody = ``;
    danhSachMang.map(function(item, index) {
        tblBody += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.TaiKhoan}</td>
                <td>${item.MatKhau}</td>
                <td>${item.HoTen}</td>
                <td>${item.Email}</td>
                <td>${item.SoDT}</td>
                <td>${item.TenLoaiNguoiDung}</td>
                <td>
                    <button class="btn btn-success btnSua" data-taikhoan ="${item.TaiKhoan}" data-toggle="modal" data-target="#myModal">Sửa</button>
                    <button class= "btn btn-danger btnXoa" data-taikhoan ="${item.TaiKhoan}">Xóa</button>
                </td>
            </tr>
        `
    })

    $("#tblDanhSachNguoiDung").html(tblBody);
}