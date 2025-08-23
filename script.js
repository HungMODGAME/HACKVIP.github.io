document.addEventListener('DOMContentLoaded', () => {
    // === KHAI BÁO CÁC PHẦN TỬ DOM ===
    const categoriesGrid = document.querySelector('.categories-grid');
    const productsSection = document.getElementById('products-section');
    const productList = document.getElementById('product-list');

    const homeSection = document.getElementById('home');

    // Các phần tử liên quan đến thanh toán
    const depositSection = document.getElementById('deposit-section');
    const copyButtons = document.querySelectorAll('.copy-btn');
    const depositOkBtn = document.getElementById('deposit-ok-btn');
    const transferContentSpan = document.getElementById('transfer-content');

    // Khai báo biểu tượng hamburger và menu dropdown
    const hamburgerMenuIcon = document.getElementById('hamburger-menu-icon');
    const userDropdownMenu = document.getElementById('user-dropdown-menu');

    // Các phần tử liên quan đến Đăng nhập/Đăng ký/Tài khoản
    const authOverlay = document.getElementById('auth-overlay');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const accountInfoSection = document.getElementById('account-info-section');
    const accountUsernameSpan = document.getElementById('account-username');
    const purchaseHistoryList = document.getElementById('purchase-history-list');

    const showLoginBtn = document.getElementById('show-login');
    const showRegisterBtn = document.getElementById('show-register');
    const loginUserForm = document.getElementById('login-user-form');
    const registerUserForm = document.getElementById('register-user-form');
    const logoutBtn = document.getElementById('logout-btn');
    const closeFormButtons = document.querySelectorAll('.auth-form-container .close-btn');

    // === BIẾN TRẠNG THÁI ===
    let lastOrderDetailsForCopy = null;
    let currentCategory = 'all';
    let isLoggedIn = false;
    let currentUser = null; // { username: "...", password: "...", purchaseHistory: [] }

    // --- DỮ LIỆU SẢN PHẨM ---
    const products = [
        {
            id: 1,
            name: '[IOS-NONJB] HACK MAP LIÊN QUÂN MOBILE PHIÊN BẢN XÓA TỐ/PHANG BỤI',
            category: 'clothing',
            image: 'https://i.imgur.com/o6wwhWq.jpeg',
            productCode: 'LQ IOS-VIP',
            variations: [
                { price: 299000, label: '299,000đ / 1tháng xóa tố nemu, auto múa flo, aim all tướng,...' },
                { price: 360000, label: '360,000đ / 1tháng / key chơi được 3 game LQ xóa tố + PUBG + Tốc Chiến' },
            ]
        },
        {
            id: 2,
            name: 'MAP LIÊN QUÂN BẢN KÍN & LOG SONG SONG',
            category: 'clothing',
            image: 'https://i.imgur.com/xccrkPi.jpeg',
            productCode: 'LQ IOS-VIP1',
            variations: [
                { price: 350000, label: '350,000đ / 1tháng' },
            ]
        },
        {
            id: 3,
            name: 'MAP LIÊN QUÂN BẢN ESP PHANG BỤI CHẤP TỐ',
            category: 'clothing',
            image: 'https://i.imgur.com/59cR27Y.jpeg',
            productCode: 'LQ IOS-VIP2',
            variations: [
                { price: 700000, label: '700,000đ / 1tháng' },
            ]
        },
        {
            id: 4,
            name: '[IOS-NONJB] HACK MAP LIÊN QUÂN MOBILE PHIÊN BẢN ĐÁNH KÍN',
            category: 'clothing',
            image: 'https://i.imgur.com/9v2Q4Rm.jpeg',
            productCode: 'LQ IOS-THƯỜNG',
            variations: [
                { price: 18000, label: '18,000đ /2giờ / đánh kín' },
                { price: 109000, label: '109,000đ /1 tuần' },
                { price: 209000, label: '209,000đ /1 tháng' },
            ]
        },
        {
            id: 5,
            name: 'MAP LIÊN QUÂN BẢN KÍN & CHẤP TỐ',
            category: 'clothing',
            image: 'https://i.imgur.com/wZhMCiY.jpeg',
            productCode: 'LQ ADR-VIP',
            variations: [
                { price: 280000, label: '280,000đ /1 tháng ( KÍN )' },
                { price: 830000, label: '830,000đ /1 tháng ( VIP CHẤP TỐ )' },
            ]
        },
        {
            id: 6,
            name: '[ANDROID 32/64BIT] HACK MAP LIÊN QUÂN MOBILE PHIÊN BẢN XÓA TỐ/PHANG BỤI',
            category: 'clothing',
            image: 'https://i.imgur.com/JbmBgN5.jpeg',
            productCode: 'LQ ADR-VIP1',
            variations: [
                { price: 60000, label: '60,000đ /1 ngày' },
                { price: 260000, label: '260,000đ /7 ngày' },
                { price: 600000, label: '600,000đ /30 ngày' },
            ]
        },
        {
            id: 7,
            name: '[ANDROID 32/64BIT] HACK MAP LIÊN QUÂN MOBILE PHIÊN BẢN XÓA TỐ/PHANG BỤI',
            category: 'clothing',
            image: 'https://i.imgur.com/yFuHsVg.jpeg',
            productCode: 'LQ ADR-VIP2',
            variations: [
                { price: 360000, label: '360,000đ / tháng + 7 ngày' },
            ]
        },
        {
            id: 8,
            name: '[ANDROID 32/64BIT] HACK MAP LIÊN QUÂN MOBILE PHIÊN BẢN ĐÁNH KÍN',
            category: 'clothing',
            image: 'https://i.imgur.com/BV4wmGX.jpeg',
            productCode: 'LQ ADR-THƯỜNG',
            variations: [
                { price: 45000, label: '45,000đ /1 ngày' },
                { price: 260000, label: '260,000đ /1 tháng' },
            ]
        },
        {
            id: 9,
            name: 'Acc Random Pubg Clone Vàng->Kim Cương',
            category: 'electronics',
            image: 'https://i.imgur.com/IEkz22M.jpeg',
            productCode: 'PUBG ACC RANDOM',
            variations: [
                { price: 110000, label: '110,000đ /ACC FB Rank' },
            ]
        },
        {
            id: 10,
            name: '[IOS - JB] Hack Pubg Zenin iOS Jailbreak Streamer',
            category: 'electronics',
            image: 'https://i.imgur.com/4QgWknM.jpeg',
            productCode: 'PUBG IOS-VIP1',
            variations: [
                { price: 1210000, label: '1,210,000đ /1 Mùa/2 Tháng ( máy JB 16.6.1 đổ xuống thì bản này là vua cân Acc VIP )' },
            ]
        },
        {
            id: 11,
            name: '[IOS - NONJB] HACK PUBG LUXURY ESP + MODSKIN',
            category: 'electronics',
            image: 'https://i.imgur.com/vc7GgRe.jpeg',
            productCode: 'PUBG IOS-VIP2',
            variations: [
                { price: 25000, label: '25,000đ /2 giờ' },
                { price: 260000, label: '260,000đ /1 tuần' },
                { price: 510000, label: '510,000đ /1 tháng' },
            ]
        },
        {
            id: 12,
            name: '[IOS - NONJB] HACK PUBG MOBILE DARCUMA',
            category: 'electronics',
            image: 'https://i.imgur.com/l2joGkz.jpeg',
            productCode: 'PUBG IOS-HOC SINH',
            variations: [
                { price: 19000, label: '19,000đ /1 giờ' },
                { price: 209000, label: '209,000đ /1 tuần' },
                { price: 400000, label: '400,000đ /1 tháng' },
            ]
        },
        {
            id: 13,
            name: '[ ANDROID ] HACK PUBG ZOLO CHEAT HUYỂN THOẠI 32/64BIT',
            category: 'electronics',
            image: 'https://i.imgur.com/KnpNuYu.jpeg',
            productCode: 'PUBG ADR-VIP VUA',
            variations: [
                { price: 45000, label: '45,000đ /1 ngày' },
                { price: 160000, label: '160,000đ /1 tuần' },
                { price: 360000, label: '360,000đ /1 tháng' },
                { price: 600000, label: '600,000đ /1 tháng + Anti xóa tố safe 100%, chống quét off...' },
                { price: 800000, label: '800,000đ /2 tháng + Anti xóa tố safe 100%, chống quét off...' },
            ]
        },
        {
            id: 14,
            name: '[ ANDROID ] HACK PUBG TUNI PRO 32/64BIT',
            category: 'electronics',
            image: 'https://i.imgur.com/DjKa1fP.jpeg',
            productCode: 'PUBG ADR-SINH VIÊN',
            variations: [
                { price: 18000, label: '18,000đ /5 giờ' },
                { price: 24000, label: '24,000đ /1 ngày' },
                { price: 69000, label: '69,000đ /1 tuần' },
                { price: 290000, label: '290,000đ /1 tháng' },
                { price: 1000000, label: '1,000,000đ /5 tháng' },
            ]
        },
        {
            id: 15,
            name: '[ ANDROID ] HACK PUBG TUNI ESP 32/64BIT',
            category: 'electronics',
            image: 'https://i.imgur.com/SyfXA17.jpeg',
            productCode: 'PUBG ADR-HỌC SINH',
            variations: [
                { price: 200000, label: '200,000đ /1 tháng' },
                { price: 300000, label: '300,000đ /1 Mùa /60 ngày' },
            ]
        },
        {
            id: 16,
            name: 'Hack Play Together Android VNG và Global - No Root/Root, Pc-Giả lập',
            category: 'books',
            image: 'https://i.imgur.com/izyb7u9.jpeg',
            productCode: 'ADR PLAY',
            variations: [
                { price: 13000, label: '13,000đ /2 giờ' },
                { price: 20000, label: '20,000đ /1 ngày' },
                { price: 60000, label: '60,000đ /1 tuần' },
                { price: 160000, label: '160,000đ /1 tháng' },
                { price: 259000, label: '259,000đ /2 tháng/ 1key sài được 2 máy' },
                { price: 360000, label: '360,000đ /3 tháng/ 1key sài được 2 máy' },
            ]
        },
        {
            id: 17,
            name: 'Hack Play Together iOS NO Jb/Jb',
            category: 'books',
            image: 'https://i.imgur.com/3N1jHqe.jpeg',
            productCode: 'IOS PLAY',
            variations: [
                { price: 130000, label: '130,000đ /1 tuần' },
                { price: 290000, label: '290,000đ /1 tháng' },
                { price: 600000, label: '600,000đ /10 tháng' },
            ]
        },
        {
            id: 18,
            name: 'MENU IPA V1',
            category: 'FF',
            buyNowLink: "https://t.me/FF_IOS_FREE_bot",
            image: 'https://i.imgur.com/ST8ndX1.jpeg',
            productCode: 'IPA FF V1',
            variations: [
                { price: 0, label: 'FREE' },
            ]
        },
        {
            id: 19,
            name: 'MENU IPA V2',
            category: 'FF',
            buyNowLink: "https://t.me/FF_IOS_FREE_bot",
            image: 'https://i.imgur.com/7CQSQO6.jpeg',
            productCode: 'IPA FF V2',
            variations: [
                { price: 0, label: 'FREE' },
            ]
        },
        {
            id: 20,
            name: '- Chờ 3-4 ngày cho các dòng iPhone XS trở lên<br>- HSD 8 Tháng<br>- Bảo hành 250 ngày<br>- Chứng chỉ dùng<br> 1 thiết bị<br>- Gói Gồm Chứng chỉ và Link Cài APP<br>- Gói này không hỗi trợ thiết bị Ẩn Icloud và Bypass<br>- Chứng chỉ cho iPhone Xs trở lên<br>- Kí không giới hạn ứng dụng crack, hack, IPA<br>- Nhân bản ứng dụng không giới hạn<br>- Bạn sẽ phải chờ 18-35 ngày nếu thiết bị của bạn bị dính Blacklist' ,
            category: 'CC',
            image: 'https://i.imgur.com/iq3470z.png',
            productCode: 'ESIGN',
            variations: [
                { price: 45000, label: '45,000đ' },
            ]
        },
        {
            id: 21,
            name: '- Gói này bạn cần chờ<br>3-4 ngày<br>- HSD 10 Tháng<br>- Bảo hành 300 ngày<br>- Chứng chỉ dùng<br> 1 thiết bị<br>- Gói Gồm Chứng chỉ và Link Cài APP<br>- Gói này không hỗi trợ thiết bị Ẩn Icloud và Bypass<br>- Chứng chỉ cho tất cả iPhone, iPad, iPod, AppleTV<br>- Kí không giới hạn ứng dụng crack, hack, IPA<br>- Nhân bản ứng dụng không giới hạn<br>- Bạn sẽ phải chờ 18-35 ngày nếu thiết bị của bạn bị dính Blacklist' ,
            category: 'CC',
            image: 'https://i.imgur.com/iq3470z.png',
            productCode: 'ESIGN',
            variations: [
                { price: 60000, label: '60,000đ' },
            ]
        },
        {
            id: 22,
            name: '- Gói này bạn cần chờ<br>1 ngày<br>- HSD 11 Tháng<br>- Bảo hành 300 ngày<br>- Chứng chỉ dùng <br>1 thiết bị<br>- Gói Gồm Chứng chỉ và Link Cài APP<br>- Gói này không hỗi trợ thiết bị Ẩn Icloud và Bypass<br>- Chứng chỉ cho tất cả iPhone, iPad, iPod, AppleTV<br>- Kí không giới hạn ứng dụng crack, hack, IPA<br>- Nhân bản ứng dụng không giới hạn<br>- Bạn sẽ phải chờ 18-35 ngày nếu thiết bị của bạn bị dính Blacklist' ,
            category: 'CC',
            image: 'https://i.imgur.com/iq3470z.png',
            productCode: 'ESIGN',
            variations: [
                { price: 110000, label: '110,000đ' },
            ]
        },
        {
            id: 23,
            name: '- Gói này Sử Dụng Luôn<br>- HSD 12 Tháng<br>- Bảo hành 300 ngày<br>- Chứng chỉ dùng<br> 1 thiết bị<br>- Gói Gồm Chứng chỉ và Link Cài APP<br>- Gói này không hỗi trợ thiết bị Ẩn Icloud và Bypass<br>- Chứng chỉ cho tất cả iPhone, iPad, iPod, AppleTV<br>- Kí không giới hạn ứng dụng crack, hack, IPA<br>- Nhân bản ứng dụng không giới hạn<br>- Bạn sẽ phải chờ 18-35 ngày nếu thiết bị của bạn bị dính Blacklist' ,
            category: 'CC',
            image: 'https://i.imgur.com/iq3470z.png',
            productCode: 'ESIGN',
            variations: [
                { price: 160000, label: '160,000đ' },
            ]
        },
        {
            id: 24,
            name: '- Gói UNBAN<br>- Gói này bạn có thể sử dụng cho các thiết bị BLACKLIST<br>- Có thể Sử Dụng Luôn<br>- HSD 12 Tháng<br>- Bảo hành 300 ngày<br>- Chứng chỉ dùng <br>1 thiết bị<br>- Gói Gồm Chứng chỉ và Link Cài APP<br>- Gói này không hỗi trợ thiết bị Ẩn Icloud và Bypass<br>- Chứng chỉ cho tất cả iPhone, iPad, iPod, AppleTV<br>- Kí không giới hạn ứng dụng crack, hack, IPA<br>- Nhân bản ứng dụng không giới' ,
            category: 'CC',
            image: 'https://i.imgur.com/iq3470z.png',
            productCode: 'ESIGN',
            variations: [
                { price: 190000, label: '190,000đ' },
            ]
        },
        {
            id: 25,
            name: '- iPad Tức Thì<br>- Gói này Sử Dụng Luôn<br>- HSD 12 Tháng<br>- Bảo hành 300 ngày<br>- Chứng chỉ dùng <br>1 thiết bị<br>- Gói Gồm Chứng chỉ và Link Cài APP<br>- Gói này không hỗi trợ thiết bị Ẩn Icloud và Bypass<br>- Chứng chỉ cho tất cả iPhone, iPad, iPod, AppleTV<br>- Kí không giới hạn ứng dụng crack, hack, IPA<br>- Nhân bản ứng dụng không giới hạn<br>- Bạn sẽ phải chờ 18-35 ngày nếu thiết bị của bạn bị dính Blacklist' ,
            category: 'CC',
            image: 'https://i.imgur.com/iq3470z.png',
            productCode: 'ESIGN',
            variations: [
                { price: 90000, label: '90,000đ' },
            ]
        },
        {
            id: 26,
            name: 'FACEBOOK',
            category: 'MXH',
            image: 'https://i.imgur.com/uKFMjw3.png',
            productCode: 'MXH FACEBOOK',
            variations: [
                { price: 0, label: 'ib giá cả và số lượng' },
            ]
        },
        {
            id: 27,
            name: 'TIKTOK',
            category: 'MXH',
            image: 'https://i.imgur.com/4ijy5tg.png',
            productCode: 'MXH TIKTOK',
            variations: [
                { price: 0, label: 'ib giá cả và số lượng' },
            ]
        },
    ];

    // === HÀM TIỆN ÍCH ===
    function formatVND(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    function hideAllSections() {
        homeSection && homeSection.classList.add('hidden');
        productsSection && productsSection.classList.add('hidden');
        depositSection && depositSection.classList.add('hidden');
        accountInfoSection && accountInfoSection.classList.add('hidden');
        authOverlay && authOverlay.classList.add('hidden');
        loginForm && loginForm.classList.add('hidden');
        registerForm && registerForm.classList.add('hidden');
        userDropdownMenu && userDropdownMenu.classList.add('hidden');
    }

    function showSection(sectionElement, sectionName, pushState = true) {
        hideAllSections();
        if (sectionElement) {
            sectionElement.classList.remove('hidden');
        }
        if (pushState) {
            history.pushState({ section: sectionName }, '', `#${sectionName}`);
        } else {
            history.replaceState({ section: sectionName }, '', `#${sectionName}`);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // === QUẢN LÝ NGƯỜI DÙNG VÀ ĐĂNG NHẬP ===
    function loadUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : {};
    }

    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    function saveCurrentUser() {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }

    function loadCurrentUser() {
        const user = localStorage.getItem('currentUser');
        if (user) {
            currentUser = JSON.parse(user);
            isLoggedIn = true;
            updateUserUI();
            return true;
        }
        return false;
    }

    function registerUser(username, password) {
        const users = loadUsers();
        if (users[username]) {
            alert('Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.');
            return false;
        }
        users[username] = { password: password, purchaseHistory: [] };
        saveUsers(users);
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        return true;
    }

    function loginUser(username, password) {
        const users = loadUsers();
        if (users[username] && users[username].password === password) {
            currentUser = { username: username, purchaseHistory: users[username].purchaseHistory };
            isLoggedIn = true;
            saveCurrentUser();
            alert('Đăng nhập thành công!');
            updateUserUI();
            showSection(homeSection, 'home');
            return true;
        }
        alert('Tên đăng nhập hoặc mật khẩu không đúng.');
        return false;
    }

    function logoutUser() {
        isLoggedIn = false;
        currentUser = null;
        saveCurrentUser();
        alert('Bạn đã đăng xuất.');
        updateUserUI();
        showSection(homeSection, 'home');
    }

    function updateUserUI() {
        userDropdownMenu.innerHTML = ''; // Xóa menu cũ

        // Thêm mục "Trang chủ" luôn hiển thị
        const homeMenuItem = document.createElement('div');
        homeMenuItem.classList.add('dropdown-item');
        homeMenuItem.textContent = 'Trang chủ';
        homeMenuItem.id = 'menu-home';
        userDropdownMenu.appendChild(homeMenuItem);

        if (isLoggedIn) {
            const welcomeItem = document.createElement('div');
            welcomeItem.classList.add('dropdown-item');
            welcomeItem.textContent = `Chào mừng, ${currentUser.username}`;
            userDropdownMenu.appendChild(welcomeItem);

            const accountItem = document.createElement('div');
            accountItem.classList.add('dropdown-item');
            accountItem.textContent = 'Tài khoản của tôi';
            accountItem.id = 'menu-account-info';
            userDropdownMenu.appendChild(accountItem);

            const logoutItem = document.createElement('div');
            logoutItem.classList.add('dropdown-item');
            logoutItem.textContent = 'Đăng xuất';
            logoutItem.id = 'menu-logout';
            userDropdownMenu.appendChild(logoutItem);

            // Gắn event listener cho các mục mới
            document.getElementById('menu-home').addEventListener('click', () => {
                showSection(homeSection, 'home');
            });
            document.getElementById('menu-account-info').addEventListener('click', () => {
                showSection(accountInfoSection, 'account-info-section');
                renderAccountInfo();
            });
            document.getElementById('menu-logout').addEventListener('click', logoutUser);

        } else {
            const loginItem = document.createElement('div');
            loginItem.classList.add('dropdown-item');
            loginItem.textContent = 'Đăng nhập';
            loginItem.id = 'menu-login';
            userDropdownMenu.appendChild(loginItem);

            const registerItem = document.createElement('div');
            registerItem.classList.add('dropdown-item');
            registerItem.textContent = 'Đăng ký';
            registerItem.id = 'menu-register';
            userDropdownMenu.appendChild(registerItem);

            // Gắn event listener cho các mục mới
            document.getElementById('menu-home').addEventListener('click', () => {
                showSection(homeSection, 'home');
            });
            document.getElementById('menu-login').addEventListener('click', () => {
                authOverlay.classList.remove('hidden');
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
            });
            document.getElementById('menu-register').addEventListener('click', () => {
                authOverlay.classList.remove('hidden');
                registerForm.classList.remove('hidden');
                loginForm.classList.add('hidden');
            });
        }
    }

    function renderAccountInfo() {
        if (currentUser && accountUsernameSpan && purchaseHistoryList) {
            accountUsernameSpan.textContent = currentUser.username;
            purchaseHistoryList.innerHTML = '';
            if (currentUser.purchaseHistory && currentUser.purchaseHistory.length > 0) {
                const sortedHistory = [...currentUser.purchaseHistory].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

                sortedHistory.forEach(order => {
                    const orderDate = new Date(order.timestamp).toLocaleString('vi-VN', {
                        year: 'numeric', month: '2-digit', day: '2-digit',
                        hour: '2-digit', minute: '2-digit'
                    });
                    const orderItemHtml = `
                        <div class="history-item">
                            <p><strong>Mã đơn hàng:</strong> ${order.orderId}</p>
                            <p><strong>Sản phẩm:</strong> ${order.items[0].name} (${order.items[0].variantLabel})</p>
                            <p><strong>Tổng tiền:</strong> ${formatVND(order.total)}</p>
                            <p class="date">Ngày: ${orderDate}</p>
                        </div>
                    `;
                    purchaseHistoryList.innerHTML += orderItemHtml;
                });
            } else {
                purchaseHistoryList.innerHTML = '<p>Bạn chưa có giao dịch nào.</p>';
            }
        }
    }

    // === HÀM LIÊN QUAN ĐẾN SẢN PHẨM ===
    function displayProducts() {
        if (!productList) return;

        productList.innerHTML = '';
        const filteredProducts = products.filter(product => {
            return (currentCategory === 'all' || product.category === currentCategory);
        }).map(product => {
            if (!product.variations && product.variances) { // Fallback cho lỗi chính tả cũ
                product.variations = product.variances;
                delete product.variances;
            }
            return product;
        });

        if (filteredProducts.length === 0) {
            productList.innerHTML = '<p>Không tìm thấy sản phẩm nào trong danh mục này.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            let selectOptionsHtml = '';
            if (product.variations && product.variations.length > 0) {
                product.variations.forEach((variant, index) => {
                    selectOptionsHtml += `<option value="${index}">${variant.label}</option>`;
                });
            } else {
                selectOptionsHtml += `<option value="0">Không có gói nào</option>`;
            }

            const defaultPrice = (product.variations && product.variations.length > 0) ? product.variations[0].price : 0;

            productItem.innerHTML = `
                <div class="product-code">${product.productCode}</div>
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <label for="size-price-${product.id}" class="size-price-label">Chọn Gói:</label>
                <select id="size-price-${product.id}" class="size-price-select" data-product-id="${product.id}">
                    ${selectOptionsHtml}
                </select>
                <p class="display-price">${formatVND(defaultPrice)}</p>
                <button class="buy-now-btn" data-product-id="${product.id}">Mua ngay</button>
            `;
            productList.appendChild(productItem);
        });

        document.querySelectorAll('.size-price-select').forEach(select => {
            select.addEventListener('change', updateDisplayedPrice);
        });

        document.querySelectorAll('.buy-now-btn').forEach(button => {
            button.addEventListener('click', buyNow);
        });
    }

    function updateDisplayedPrice(event) {
        const selectElement = event.target;
        const productId = parseInt(selectElement.dataset.productId);
        const selectedVariantIndex = parseInt(selectElement.value);

        const product = products.find(p => p.id === productId);
        if (product && product.variations && product.variations[selectedVariantIndex]) {
            const newPrice = product.variations[selectedVariantIndex].price;
            const displayPriceElement = selectElement.closest('.product-item').querySelector('.display-price');
            displayPriceElement && (displayPriceElement.textContent = formatVND(newPrice));
        }
    }

    function buyNow(event) {
    if (!isLoggedIn) {
        alert('Bạn cần đăng nhập để mua sản phẩm.');
        authOverlay.classList.remove('hidden');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        return;
    }

    const productId = parseInt(event.target.dataset.productId);
    const productItemElement = event.target.closest('.product-item');
    const selectElement = productItemElement.querySelector('.size-price-select');
    const selectedVariantIndex = parseInt(selectElement.value);

    const product = products.find(p => p.id === productId);

    if (product) {
        // Kiểm tra nếu sản phẩm có liên kết Mua Ngay riêng
        if (product.buyNowLink) {
            alert('Sau khi đến trang Telegram, hãy nhắn tin để nhận sản phẩm.');
            window.open(product.buyNowLink, '_blank');
            showSection(homeSection, 'home');
            return;
        }

        // Đoạn code cũ cho các sản phẩm còn lại
        if (product.variations && product.variations[selectedVariantIndex]) {
            const selectedVariant = product.variations[selectedVariantIndex];
            const productCode = product.productCode;
            const productPrice = selectedVariant.price;

            // Tạo nội dung để sao chép
            const copyText = `Mã sản phẩm: ${productCode}\nGiá sản phẩm: ${formatVND(productPrice)}`;

            // Tự động sao chép nội dung vào clipboard
            navigator.clipboard.writeText(copyText)
                .then(() => {
                    alert('Sau khi đến trang Telegram hãy Dán nội dung và nhấn \' Gửi \'');
                    window.open('https://t.me/buffuytin', '_blank');
                    showSection(homeSection, 'home');
                })
                .catch(err => {
                    console.error('Không thể tự động sao chép nội dung:', err);
                    alert('Có lỗi khi sao chép tự động. Vui lòng sao chép thủ công và chuyển đến trang Telegram.');
                    window.open('https://t.me/buffuytin', '_blank');
                });
        }
    }
}

    // === EVENT LISTENERS CHUNG ===
    if (categoriesGrid) {
        categoriesGrid.addEventListener('click', (event) => {
            const targetButton = event.target.closest('.view-products-btn');
            if (targetButton) {
                const categoryItem = targetButton.closest('.category-item');
                currentCategory = categoryItem.dataset.category;
                showSection(productsSection, 'products-section');
                displayProducts();
            }
        });
    }

    if (hamburgerMenuIcon) {
        hamburgerMenuIcon.addEventListener('click', () => {
            userDropdownMenu && userDropdownMenu.classList.toggle('hidden');
        });
    }

    closeFormButtons.forEach(button => {
        button.addEventListener('click', () => {
            authOverlay.classList.add('hidden');
            loginForm.classList.add('hidden');
            registerForm.classList.add('hidden');
        });
    });

    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        });
    }

    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        });
    }

    if (registerUserForm) {
        registerUserForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = e.target.elements['register-username'].value.trim();
            const password = e.target.elements['register-password'].value;
            const confirmPassword = e.target.elements['register-confirm-password'].value;

            if (password !== confirmPassword) {
                alert('Mật khẩu xác nhận không khớp.');
                return;
            }
            if (username.length < 3 || password.length < 6) {
                alert('Tên đăng nhập phải có ít nhất 3 ký tự và mật khẩu phải có ít nhất 6 ký tự.');
                return;
            }
            if (username.includes(' ')) {
                alert('Tên đăng nhập không được chứa dấu cách.');
                return;
            }

            if (registerUser(username, password)) {
                e.target.reset();
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
            }
        });
    }

    if (loginUserForm) {
        loginUserForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = e.target.elements['login-username'].value.trim();
            const password = e.target.elements['login-password'].value;

            if (loginUser(username, password)) {
                e.target.reset();
                authOverlay.classList.add('hidden');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }

    // === XỬ LÝ NÚT COPY THÔNG TIN NGÂN HÀNG ===
    copyButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const targetId = event.target.dataset.target;
            const textToCopyElement = document.getElementById(targetId);
            if (textToCopyElement) {
                const textToCopy = textToCopyElement.textContent;
                try {
                    await navigator.clipboard.writeText(textToCopy);
                    alert(`Đã sao chép "${textToCopy}" vào bộ nhớ tạm!`);
                } catch (err) {
                    console.error('Không thể sao chép:', err);
                    alert('Có lỗi khi sao chép. Vui lòng sao chép thủ công.');
                }
            }
        });
    });


    // === KHỞI TẠO VÀ XỬ LÝ LỊCH SỬ DUYỆT WEB (NÚT QUAY LẠI TRÌNH DUYỆT) ===
    function navigateToSectionFromHash() {
        const hash = window.location.hash.substring(1);
        let targetSection = homeSection;
        let sectionName = 'home';

        const sectionsMap = {
            'products-section': productsSection,
            'deposit-section': depositSection,
            'account-info-section': accountInfoSection
        };

        if (sectionsMap[hash]) {
            targetSection = sectionsMap[hash];
            sectionName = hash;
        }

        hideAllSections();
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }

        if (sectionName === 'products-section') {
            displayProducts();
        } else if (sectionName === 'account-info-section') {
            renderAccountInfo();
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Khởi tạo UI, tải trạng thái đăng nhập và xử lý hash khi tải trang
    loadCurrentUser();
    updateUserUI();

    if (window.location.hash) {
        navigateToSectionFromHash();
    } else {
        showSection(homeSection, 'home', false);
    }

    window.addEventListener('popstate', (event) => {
        navigateToSectionFromHash();
    });
});