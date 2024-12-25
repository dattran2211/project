document.addEventListener('DOMContentLoaded', function () {
    const buyButton = document.getElementById('buyButton'); // Nút thêm vào giỏ hàng
    const productName = 'Chân váy Tuysi A 2 lớp'; // Tên sản phẩm từ tệp HTML
    const price = 850000; // Giá sản phẩm (đơn vị: đồng)
    const productImage = '../images/product/sp4.webp'; // Đường dẫn ảnh sản phẩm

    // Xử lý sự kiện thêm vào giỏ hàng
    buyButton.addEventListener('click', function () {
        // Lấy size đã chọn
        const selectedSize = document.querySelector('.size span.selected');
        if (!selectedSize) {
            alert('Vui lòng chọn size sản phẩm!');
            return;
        }

        // Lấy số lượng sản phẩm
        const quantityInput = document.querySelector('.quantity input');
        const quantity = parseInt(quantityInput.value, 10);

        if (quantity <= 0) {
            alert('Vui lòng nhập số lượng hợp lệ!');
            return;
        }

        // Tạo đối tượng sản phẩm
        const item = {
            name: productName,
            size: selectedSize.textContent.trim(),
            quantity: quantity,
            price: price,
            image: productImage,
        };

        // Lấy danh sách giỏ hàng từ localStorage
        let cartList = JSON.parse(localStorage.getItem('cartList')) || [];

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingItem = cartList.find(
            (cartItem) => cartItem.name === item.name && cartItem.size === item.size
        );

        if (existingItem) {
            // Nếu đã tồn tại, tăng số lượng
            existingItem.quantity += item.quantity;
        } else {
            // Nếu chưa tồn tại, thêm mới
            cartList.push(item);
        }

        // Lưu lại giỏ hàng vào localStorage
        localStorage.setItem('cartList', JSON.stringify(cartList));

        // Thông báo cho người dùng
        if (confirm('Sản phẩm đã được thêm vào giỏ hàng! Bạn có muốn xem giỏ hàng ngay bây giờ không?')) {
            window.location.href = 'cart.html';
        }
    });

    // Xử lý sự kiện chọn size
    const sizes = document.querySelectorAll('.size span');
    sizes.forEach((size) => {
        size.addEventListener('click', function () {
            sizes.forEach((s) => s.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
});
