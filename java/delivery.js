$(document).ready(function () {
    // Lấy giỏ hàng từ localStorage hoặc tạo mảng rỗng nếu không có
    const cart = JSON.parse(localStorage.getItem('cartList')) || [];

    // Hàm kiểm tra email hợp lệ
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Xử lý khi form checkout được submit
    $('#checkout-form').submit(function (event) {
        event.preventDefault(); // Ngăn hành động mặc định

        if (cart.length === 0) {
            alert('Giỏ của bạn đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng.');
            return;
        }

        // Lấy dữ liệu từ các ô input
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const address = $('#address').val().trim();
        const phone = $('#phone').val().trim();
        const zip = $('#zip').val().trim();
        

        // Kiểm tra các ô bắt buộc
        if (!name || !email || !address || !phone) {
            alert('Xin vui lòng điền đầy đủ thông tin vào các ô bắt buộc!');
            return;
        }

        // Kiểm tra họ và tên
        if (!name) {
            alert('Xin vui lòng nhập tên');
            return;
        } else if (name.length < 3) {
            alert('Họ và tên phải lớn hơn 3 kí tự');
            return;
        }

        // Kiểm tra email hợp lệ
        if (!isValidEmail(email)) {
            alert('Email không hợp lệ. Vui lòng kiểm tra lại!');
            return;
        }

        if (!phone) {
            alert('Xin vui lòng nhập số điện thoại');
            return;
        } else if (!/^\d{10}$/.test(phone)) {
            alert('Số điện thoại gồm 10 chữ số');
            return;
        } 

        // Tạo đối tượng đơn hàng
        const order = {
            name: name,
            email: email,
            address: address,
            phone: phone,
            zip: zip || 'N/A', // Nếu zip trống thì gán "N/A"
            items: cart, // Danh sách sản phẩm trong giỏ hàng
        };

        // Lưu đơn hàng vào localStorage
        localStorage.setItem('order', JSON.stringify(order));

        // Hiển thị thông báo và điều hướng về trang chủ
        const confirmMessage = `MUA HÀNG THÀNH CÔNG:\n\nTên: ${name}\nEmail: ${email}\nĐịa chỉ: ${address}\nSố điện thoại: ${phone}\nZip code: ${zip || 'N/A'}\n\nTrang thanh toán`;
        if (confirm(confirmMessage)) {
            window.location.href = 'payment.html';
        }
    });
});
