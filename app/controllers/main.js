$(document).ready(function(){
    var nguoiDungService = new NguoiDungService();

    layDanhSachNguoiDung();

    function setHeaderFooter(title, titleButton, idButton){
        $(".modal-title").html(title);

        var footer = `
            <button class= "btn btn-success" id="${idButton}">${titleButton}</button>
        `
        $(".modal-footer").html(footer);
    }
//TAO NUT them Moi
    $("#btnThemNguoiDung").click(function(){
        setHeaderFooter("Thêm Người Dùng", "Thêm Mới", "btnThem");
    })
//TAO NUT Sua - Chưa có sẵn trong index - sinh ra sau phải dùng DELEGATE
    $("body").delegate(".btnSua", "click", function(){
        setHeaderFooter("Sửa Người Dùng", "Cập Nhật", "btnCapNhat");
        //LẤY ĐƯỢC TÀI KHOẢN QUA ATTRIBUTE
        var taiKhoan = $(this).data('taikhoan');
        var nguoiDung = nguoiDungService.layThongTinNguoiDUng(taiKhoan);
        console.log(nguoiDung);
        $('#TaiKhoan').val(nguoiDung.TaiKhoan);
        $('#HoTen').val(nguoiDung.HoTen);
        $('#MatKhau').val(nguoiDung.MatKhau);
        $('#Email').val(nguoiDung.Email);
        $('#SoDienThoai').val(nguoiDung.SoDT);
        // $('#loaiNguoiDung').val(nguoiDung.TenLoaiNguoiDung);
    })

//THEM MOI
    $("body").delegate("#btnThem", "click", function(){
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDienThoai = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDung").val();

        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDienThoai, loaiNguoiDung);

        nguoiDungService.themNguoiDung(nguoiDung);
    })
//xoa
$("body").delegate(".btnXoa", "click", function(){
    var taiKhoan = $(this).data('taikhoan');
    nguoiDungService.xoaNguoiDung(taiKhoan);
    console.log(taiKhoan);
})

    //DOM CAP NHAT
    $("body").delegate(".btnCapNhat", "click", function(){
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDienThoai = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDung").val();
   
        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDienThoai, loaiNguoiDung);
        nguoiDungService.capNhatNguoiDung(nguoiDung);
    })

    function layDanhSachNguoiDung(){
        nguoiDungService.layDanhSachNguoiDung();
    }

})
