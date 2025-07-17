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

    // === DỮ LIỆU SẢN PHẨM ===
    const products = [
        {
            id: 1,
            name: '[IOS-NONJB] HACK MAP LIÊN QUÂN MOBILE PHIÊN BẢN XÓA TỐ/PHANG BỤI',
            category: 'clothing',
            image: 'https://i.imgur.com/o6wwhWq.jpeg',
            productCode: 'IOS-VIP',
            variations: [
                { price: 299000, label: '299,000đ / 1tháng xóa tố nemu, auto múa flo, aim all tướng,...' },
                { price: 360000, label: '360,000đ / 1tháng / key chơi đưuọc 3 game LQ xóa tố + PUBG + Tốc Chiến' },
            ]
        },
        {
            id: 2,
            name: '[IOS-NONJB] HACK MAP LIÊN QUÂN MOBILE PHIÊN BẢN ĐÁNH KÍN',
            category: 'clothing',
            image: 'https://i.imgur.com/9v2Q4Rm.jpeg',
            productCode: 'IOS-THƯỜNG',
            variations: [
                { price: 18000, label: '18,000đ /2giờ / đánh kín' },
                { price: 109000, label: '109,000đ /1 tuần' },
                { price: 209000, label: '209,000đ /1 tháng' },
            ]
        },
        {
            id: 3,
            name: '[ANDROID 32/64BIT] HACK MAP LIÊN QUÂN MOBILE PHIÊN BẢN XÓA TỐ/PHANG BỤI',
            category: 'clothing',
            image: 'https://i.imgur.com/JbmBgN5.jpeg',
            productCode: 'ADR-VIP1',
            variations: [
                { price: 60000, label: '60,000đ /1 ngày' },
                { price: 260000, label: '260,000đ /7 ngày' },
                { price: 600000, label: '600,000đ /30 ngày' },
            ]
        },
        {
            id: 4,
            name: '[ANDROID 32/64BIT] HACK MAP LIÊN QUÂN MOBILE PHIÊN BẢN XÓA TỐ/PHANG BỤI',
            category: 'clothing',
            image: 'https://i.imgur.com/yFuHsVg.jpeg',
            productCode: 'ADR-VIP2',
            variations: [
                { price: 360000, label: '360,000đ / tháng + 7 ngày' },
            ]
        },
        {
            id: 5,
            name: '[ANDROID 32/64BIT] HACK MAP LIÊN QUÂN MOBILE PHIÊN BẢN ĐÁNH KÍN',
            category: 'clothing',
            image: 'https://i.imgur.com/BV4wmGX.jpeg',
            productCode: 'ADR-THƯỜNG',
            variations: [
                { price: 45000, label: '45,000đ /1 ngày' },
                { price: 260000, label: '260,000đ /1 tháng' },
            ]
        },
        {
            id: 6,
            name: 'Acc Random Pubg Clone Vàng->Kim Cương',
            category: 'electronics',
            image: 'https://i.imgur.com/IEkz22M.jpeg',
            productCode: 'ACC RANDOM',
            variations: [
                { price: 110000, label: '110,000đ /ACC FB Rank' },
            ]
        },
        {
            id: 7,
            name: '[IOS - JB] Hack Pubg Zenin iOS Jailbreak Streamer',
            category: 'electronics',
            image: 'https://i.imgur.com/4QgWknM.jpeg',
            productCode: 'IOS-VIP1',
            variations: [
                { price: 1210000, label: '1,210,000đ /1 Mùa/2 Tháng ( máy JB 16.6.1 đổ xuống thì bản này là vua cân Acc VIP )' },
            ]
        },
        {
            id: 8,
            name: '[IOS - NONJB] HACK PUBG LUXURY ESP + MODSKIN',
            category: 'electronics',
            image: 'https://i.imgur.com/vc7GgRe.jpeg',
            productCode: 'IOS-VIP2',
            variations: [
                { price: 25000, label: '25,000đ /2 giờ' },
                { price: 260000, label: '260,000đ /1 tuần' },
                { price: 510000, label: '510,000đ /1 tháng' },
            ]
        },
        {
            id: 9,
            name: '[IOS - NONJB] HACK PUBG MOBILE DARCUMA',
            category: 'electronics',
            image: 'https://i.imgur.com/s2tLoMU.jpeg',
            productCode: 'IOS-HOC SINH',
            variations: [
                { price: 19000, label: '19,000đ /1 giờ' },
                { price: 209000, label: '209,000đ /1 tuần' },
                { price: 400000, label: '400,000đ /1 tháng' },
            ]
        },
        {
            id: 10,
            name: '[ ANDROID ] HACK PUBG ZOLO CHEAT HUYỂN THOẠI 32/64BIT',
            category: 'electronics',
            image: 'https://i.imgur.com/KnpNuYu.jpeg',
            productCode: 'ADR-VIP VUA',
            variations: [
                { price: 45000, label: '45,000đ /1 ngày' },
                { price: 160000, label: '160,000đ /1 tuần' },
                { price: 360000, label: '360,000đ /1 tháng' },
                { price: 600000, label: '600,000đ /1 tháng + Anti xóa tố safe 100%, chống quét off...' },
                { price: 800000, label: '800,000đ /2 tháng + Anti xóa tố safe 100%, chống quét off...' },
            ]
        },
        {
            id: 11,
            name: '[ ANDROID ] HACK PUBG TUNI PRO 32/64BIT',
            category: 'electronics',
            image: 'https://i.imgur.com/DjKa1fP.jpeg',
            productCode: 'ADR-SINH VIÊN',
            variations: [
                { price: 18000, label: '18,000đ /5 giờ' },
                { price: 24000, label: '24,000đ /1 ngày' },
                { price: 69000, label: '69,000đ /1 tuần' },
                { price: 290000, label: '290,000đ /1 tháng' },
                { price: 1000000, label: '1,000,000đ /5 tháng' },
            ]
        },
        {
            id: 12,
            name: '[ ANDROID ] HACK PUBG TUNI ESP 32/64BIT',
            category: 'electronics',
            image: 'https://i.imgur.com/SyfXA17.jpeg',
            productCode: 'ADR-HỌC SINH',
            variations: [
                { price: 200000, label: '200,000đ /1 tháng' },
                { price: 300000, label: '300,000đ /1 Mùa /60 ngày' },
            ]
        },
        {
            id: 13,
            name: 'Hack Play Together Android VNG và Global - No Root/Root, Pc-Giả lập',
            category: 'books',
            image: 'https://i.imgur.com/izyb7u9.jpeg',
            productCode: 'ADR',
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
            id: 14,
            name: 'Hack Play Together iOS NO Jb/Jb',
            category: 'books',
            image: 'https://i.imgur.com/3N1jHqe.jpeg',
            productCode: 'ADR',
            variations: [
                { price: 130000, label: '130,000đ /1 tuần' },
                { price: 290000, label: '290,000đ /1 tháng' },
                { price: 600000, label: '600,000đ /10 tháng' },
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
        accountInfoSection && accountInfoSection.classList.add('hidden'); // Ẩn phần tài khoản
        authOverlay && authOverlay.classList.add('hidden'); // Ẩn overlay và các form
        loginForm && loginForm.classList.add('hidden');
        registerForm && registerForm.classList.add('hidden');
        userDropdownMenu && userDropdownMenu.classList.add('hidden'); // Đóng menu dropdown
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
                // Sắp xếp lịch sử mua hàng từ mới nhất đến cũ nhất
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
        });

        if (filteredProducts.length === 0) {
            productList.innerHTML = '<p>Không tìm thấy sản phẩm nào trong danh mục này.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            let selectOptionsHtml = '';
            product.variations.forEach((variant, index) => {
                selectOptionsHtml += `<option value="${index}">${variant.label}</option>`;
            });

            const defaultPrice = product.variations[0].price;

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
        if (product && product.variations[selectedVariantIndex]) {
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

        if (product && product.variations[selectedVariantIndex]) {
            const selectedVariant = product.variations[selectedVariantIndex];
            const orderItem = {
                id: product.id,
                name: product.name,
                variantLabel: selectedVariant.label,
                price: selectedVariant.price,
                quantity: 1,
                image: product.image,
                productCode: product.productCode // Đảm bảo productCode có sẵn ở đây
            };

            const totalAmount = orderItem.price * orderItem.quantity;
            const orderId = Date.now().toString().slice(-6);
            // SỬA ĐỔI TẠI ĐÂY: nội dung chuyển khoản thành DAMUA + mã sản phẩm
            const transferText = `DAMUA_${orderItem.productCode}`;

            lastOrderDetailsForCopy = {
                orderId: orderId,
                items: [orderItem],
                total: totalAmount,
                transferContent: transferText,
                timestamp: new Date().toISOString() // Lưu thời gian giao dịch
            };

            showSection(depositSection, 'deposit-section');
            transferContentSpan && (transferContentSpan.textContent = transferText);

            alert(`Đơn hàng của bạn đã được ghi nhận. Vui lòng chuyển khoản để hoàn tất thanh toán. Nội dung chuyển khoản: ${transferText}`);
        }
    }

    // === HÀM XỬ LÝ THANH TOÁN ===
    if (depositOkBtn) {
        depositOkBtn.addEventListener('click', async () => {
            if (lastOrderDetailsForCopy) {
                let copyText = `Thông tin đơn hàng đã thanh toán:\n\n`;
                lastOrderDetailsForCopy.items.forEach((item, index) => {
                    copyText += `${index + 1}. Sản phẩm: ${item.name}\n`;
                    copyText += `    Mã SP: ${item.productCode || 'N/A'}\n`;
                    copyText += `    Chi tiết: ${item.variantLabel}\n`;
                    copyText += `    Số lượng: ${item.quantity}\n`;
                    copyText += `    Tổng tiền: ${formatVND(item.price * item.quantity)}\n\n`;
                });
                copyText += `Tổng cộng: ${formatVND(lastOrderDetailsForCopy.total)}\n`;
                copyText += `Nội dung chuyển khoản: ${lastOrderDetailsForCopy.transferContent}\n\n`;
                // THÔNG BÁO CẢM ƠN ĐÃ SỬA ĐỔI
                copyText += `Cảm ơn ${currentUser.username} đã mua HACK!`;

                try {
                    await navigator.clipboard.writeText(copyText);
                    alert('Đã sao chép thông tin đơn hàng vào bộ nhớ tạm!');

                    // Lưu lịch sử mua hàng vào currentUser và localStorage
                    if (currentUser) {
                        currentUser.purchaseHistory.push(lastOrderDetailsForCopy);
                        const users = loadUsers();
                        users[currentUser.username].purchaseHistory = currentUser.purchaseHistory;
                        saveUsers(users);
                        saveCurrentUser(); // Cập nhật currentUser trong localStorage
                        console.log('Lịch sử mua hàng đã được lưu:', currentUser.purchaseHistory);
                    }

                } catch (err) {
                    console.error('Không thể sao chép thông tin đơn hàng vào clipboard:', err);
                    alert('Có lỗi khi sao chép thông tin đơn hàng. Vui lòng sao chép thủ công.');
                }

                window.open('https://t.me/buffuytin', '_blank'); // Chuyển hướng đến Telegram
                showSection(homeSection, 'home'); // Quay lại trang chủ
                lastOrderDetailsForCopy = null; // Xóa thông tin đã sao chép để tránh sao chép lại đơn cũ
            } else {
                console.warn('Không có thông tin đơn hàng để sao chép.');
                alert('Không có thông tin đơn hàng mới để sao chép.');
            }
        });
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

    // Event listener cho biểu tượng hamburger
    if (hamburgerMenuIcon) {
        hamburgerMenuIcon.addEventListener('click', () => {
            userDropdownMenu && userDropdownMenu.classList.toggle('hidden');
        });
    }

    // Event listeners cho các nút Đóng form
    closeFormButtons.forEach(button => {
        button.addEventListener('click', () => {
            authOverlay.classList.add('hidden');
            loginForm.classList.add('hidden');
            registerForm.classList.add('hidden');
        });
    });

    // Event listeners cho chuyển đổi form Đăng nhập/Đăng ký
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

    // Event listener cho form Đăng ký
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
            // THAY ĐỔI MỚI: Kiểm tra dấu cách trong tên đăng nhập
            if (username.includes(' ')) {
                alert('Tên đăng nhập không được chứa dấu cách.');
                return;
            }

            if (registerUser(username, password)) {
                e.target.reset(); // Xóa form
                loginForm.classList.remove('hidden'); // Hiện form đăng nhập
                registerForm.classList.add('hidden');
            }
        });
    }

    // Event listener cho form Đăng nhập
    if (loginUserForm) {
        loginUserForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = e.target.elements['login-username'].value.trim();
            const password = e.target.elements['login-password'].value;

            if (loginUser(username, password)) {
                e.target.reset(); // Xóa form
                authOverlay.classList.add('hidden');
            }
        });
    }

    // Event listener cho nút Đăng xuất
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
    loadCurrentUser(); // Tải người dùng hiện tại nếu có
    updateUserUI(); // Cập nhật menu dropdown dựa trên trạng thái đăng nhập

    if (window.location.hash) {
        navigateToSectionFromHash();
    } else {
        showSection(homeSection, 'home', false); // Hiển thị trang chủ mặc định
    }

    // Xử lý nút quay lại/tiến của trình duyệt
    window.addEventListener('popstate', (event) => {
        navigateToSectionFromHash();
    });
});