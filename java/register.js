// Lấy các phần tử HTML cần thiết
const signupLink = document.querySelector('.signup-link'); // Liên kết chuyển đến form đăng ký
const loginLink = document.querySelector('.login-link'); // Liên kết chuyển đến form đăng nhập
const formContainer = document.querySelector('.wrapper-login .login'); // Form chính
const formMessage = document.querySelector('.form-message-check-login'); // Thông báo lỗi khi đăng nhập

// Chuyển đổi giữa form Đăng ký và Đăng nhập
if (signupLink) {
    signupLink.addEventListener('click', () => {
        formContainer.classList.remove('active'); // Bỏ lớp "active" để hiển thị form đăng ký
    });
}

if (loginLink) {
    loginLink.addEventListener('click', () => {
        formContainer.classList.add('active'); // Thêm lớp "active" để hiển thị form đăng nhập
    });
}

// Đăng ký tài khoản
function register() {
    const fullNameUser = document.getElementById('fullname').value.trim();
    const phoneUser = document.getElementById('phone-login').value.trim();
    const passwordUser = document.getElementById('password').value;
    const passwordConfirmation = document.getElementById('password_confirmation').value;
    const checkSignup = document.getElementById('checkbox-signup').checked;

    // Kiểm tra nhập liệu
    if (!fullNameUser) {
        document.querySelector('.form-message-name').textContent = 'Vui lòng nhập họ và tên';
        return;
    } else if (fullNameUser.length < 3) {
        document.querySelector('.form-message-name').textContent = 'Họ và tên phải lớn hơn 3 kí tự';
        return;
    } else {
        document.querySelector('.form-message-name').textContent = '';
    }

    if (!phoneUser) {
        document.querySelector('.phonelog').textContent = 'Vui lòng nhập số điện thoại';
        return;
    } else if (!/^\d{10}$/.test(phoneUser)) {
        document.querySelector('.phonelog').textContent = 'Số điện thoại phải gồm 10 chữ số';
        return;
    } else {
        document.querySelector('.phonelog').textContent = '';
    }

    if (!passwordUser) {
        document.querySelector('.form-message-password').textContent = 'Vui lòng nhập mật khẩu';
        return;
    } else if (passwordUser.length < 6) {
        document.querySelector('.form-message-password').textContent = 'Mật khẩu phải lớn hơn 6 kí tự';
        return;
    } else {
        document.querySelector('.form-message-password').textContent = '';
    }

    if (!passwordConfirmation) {
        document.querySelector('.form-message-password-confi').textContent = 'Vui lòng nhập lại mật khẩu';
        return;
    } else if (passwordConfirmation !== passwordUser) {
        document.querySelector('.form-message-password-confi').textContent = 'Mật khẩu không khớp';
        return;
    } else {
        document.querySelector('.form-message-password-confi').textContent = '';
    }

    if (!checkSignup) {
        document.querySelector('.form-message-checkbox').textContent = 'Vui lòng đồng ý với chính sách';
        return;
    } else {
        document.querySelector('.form-message-checkbox').textContent = '';
    }

    // Lưu thông tin tài khoản vào LocalStorage
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    if (accounts.some(account => account.phone === phoneUser)) {
        alert('Số điện thoại này đã được đăng ký!');
    } else {
        const newUser = {
            fullname: fullNameUser,
            phone: phoneUser,
            password: passwordUser,
            join: new Date(),
            cart: [],
            status: 1,
        };
        accounts.push(newUser);
        localStorage.setItem('accounts', JSON.stringify(accounts));
        alert('Đăng ký thành công!');
        window.location.href = 'login.html'; // Chuyển về trang đăng nhập
    }
}

// Đăng nhập tài khoản
function kiemTradangnhap() {
    const phonelog = document.getElementById('phone-login').value.trim();
    const passlog = document.getElementById('password-login').value;
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');

    if (!phonelog) {
        document.querySelector('.phonelog').textContent = 'Vui lòng nhập số điện thoại';
        return;
    } else if (!/^\d{10}$/.test(phonelog)) {
        document.querySelector('.phonelog').textContent = 'Số điện thoại phải gồm 10 chữ số';
        return;
    } else {
        document.querySelector('.phonelog').textContent = '';
    }

    if (!passlog) {
        formMessage.textContent = 'Vui lòng nhập mật khẩu';
        return;
    } else if (passlog.length < 6) {
        formMessage.textContent = 'Mật khẩu phải lớn hơn 6 kí tự';
        return;
    } else {
        formMessage.textContent = '';
    }

    const user = accounts.find(account => account.phone === phonelog && account.password === passlog);
    if (user) {
        if (user.status === 0) {
            alert('Tài khoản của bạn đã bị khóa!');
        } else {
            localStorage.setItem('currentuser', JSON.stringify(user));
            alert('Đăng nhập thành công!');
            window.location.href = 'index.html'; // Chuyển về trang chủ
        }
    } else {
        alert('Số điện thoại hoặc mật khẩu không chính xác!');
    }
}