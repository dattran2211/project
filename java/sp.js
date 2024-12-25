document.addEventListener('DOMContentLoaded', function () {
    const cartListContainer = document.getElementById('cartList');
    const totalPriceElement = document.getElementById('totalPrice');
    const cartList = JSON.parse(localStorage.getItem('cartList')) || [];

    function renderCartItems() {
        cartListContainer.innerHTML = '';

        if (cartList.length === 0) {
            cartListContainer.innerHTML = '<p style="font-size: 17px;">Giỏ hàng rỗng, Hãy thêm sản phẩm vào giỏ hàng </p>';
            totalPriceElement.textContent = '0₫';
            return;
        }

        let totalPrice = 0;

        cartList.forEach((item, index) => {
            const itemRow = document.createElement('div');
            itemRow.classList.add('row', 'cart-item');

            itemRow.innerHTML = `
                <div class="col-2">
                    <img src="${item.image}" alt="Product Image" style="max-width: 100%; height: auto;">
                </div>
                <div class="col-10">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="mb-0" style="font-size: 15px">${item.name}</h5>
                            <button class="btn btn-link text-danger btn-remove" data-index="${index}"><i class="fa fa-trash btn-remove" style="font-size: 17px"></i></button>
                        
                        
                    </div>
                    <p class="mb-0" style="font-size: 12px">Số lượng: 
                        <div class="input-group" style="display: flex; align-items: center; position: relative;">
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-number btn-sm btn-minus" data-type="minus" data-index="${index}" style="z-index: 5; margin-right: 5px;">-</button>
                            </span>
                            <input type="number" class="form-control input-number" value="${item.quantity}" min="1" max="10" disabled style="height: 19px; width: 50px; font-size: 1.3rem; flex: 0.005 1 auto; margin-left:13px;">
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-number btn-sm btn-plus" data-type="plus" data-index="${index}" style="z-index: 5; margin-left: 5px;">+</button>
                            </span>
                        </div>

                    </p>
                    <p class="mb-0" style="font-size: 12px">Đơn giá: ${formatCurrency(item.price)}</p>
                    <hr>
                </div>
            `;

            cartListContainer.appendChild(itemRow);

            // Tính tổng tiền
            totalPrice += item.quantity * item.price;
        });

        totalPriceElement.textContent = formatCurrency(totalPrice);
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }

    renderCartItems();

    // Xử lý sự kiện xóa sản phẩm
    cartListContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-remove')) {
            const index = event.target.getAttribute('data-index');
            cartList.splice(index, 1);
            localStorage.setItem('cartList', JSON.stringify(cartList));
            renderCartItems();
        }
    });

    // Xử lý sự kiện thay đổi số lượng
    cartListContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-number')) {
            const type = event.target.getAttribute('data-type');
            const index = event.target.getAttribute('data-index');
            let inputValue = event.target.parentNode.parentNode.querySelector('.input-number');
            let currentValue = parseInt(inputValue.value);

            if (type === 'minus') {
                if (currentValue > 1) {
                    currentValue--;
                }
            } else if (type === 'plus') {
                if (currentValue < 10) {
                    currentValue++;
                }
            }

            cartList[index].quantity = currentValue;
            localStorage.setItem('cartList', JSON.stringify(cartList));
            renderCartItems();
        }
    });
});
