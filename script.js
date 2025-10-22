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

    // --- DỮ LIỆU SẢN PHẨM (ĐÃ CHỈNH SỬA) ---
    const products = [
        {
            id: 1,
            name: '[IOS-NONJB] HACK MAP LIÊN QUÂN MOBILE', // Đã rút gọn tên
            detail: 'Phiên bản XÓA TỐ/PHANG BỤI - Hỗ trợ Auto Múa Flo, Aim All Tướng.', // <<< THÊM MỤC CHI TIẾT
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
            name: '[IOS-NONJB] HACK MAP LIÊN QUÂN MOBILE', // Đã rút gọn tên
            detail: 'Phiên bản ĐÁNH KÍN - Giá rẻ cho học sinh sinh viên.', // <<< THÊM MỤC CHI TIẾT
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
            buyNowLink: "https://t.me/ffgameios_bot",
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
            buyNowLink: "https://t.me/ffgameios_bot",
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
        {
            id: 28,
            name: '# MOBILE',
            detail: ' <span style="font-size: 1.3em; color: blue;"><b> Root di động 64bit </b><br><span style="font-size: 1.1em; color: red;"><b> Memory </b><br><span style="font-size: 0.8em; color: black;">• SilentKill - Ngẫu nhiên Body	 và Đầu<br>• Toàn Đầu (⚠ Rủi ro)<br>• Speed Hack<br>• Ghost Hack<br>• Telekill<br>• Up Player<br><br><br><span style="font-size: 1.1em; color: red;"><b> ESP Player </b><br><span style="font-size: 0.9em; color: black;">• ESP Linha<br>• Hộp ESP<br>• Sức khỏe ESP<br><br>⚠️ Lưu ý:<br>Sản phẩm này chỉ hoạt động trên thiết bị có ROOT - 64bit .<br>❌Không hỗ trợ sử dụng trên máy ảo.<br>✅Hoạt động trên LD Cloud (phiên bản trả phí) .<br>➡️Bạn nên kiểm tra khả năng tương thích trước khi mua. ',
            category: 'panel',
            image: 'https://i.imgur.com/XNxxlgs.jpeg',
            productCode: 'BR Mods ADR',
            variations: [
                { price: 65000, label: '65,000VND - 2,50$ /1Day' },
                { price: 198000, label: '198,000VND - 7,50$ /7Day' },
                { price: 250000, label: '250,000VND - 9,50$ /15Day' },
                { price: 375000, label: '375,000VND - 14.30$ /30Day' },
            ]
        },
        {
            id: 29,
            name: '# MOBILE CRACK',
            detail: ' <span style="font-size: 1.3em; color: blue;"><b> Root di động 64bit </b><br><span style="font-size: 1.1em; color: red;"><b> Memory </b><br><span style="font-size: 0.8em; color: black;">• SilentKill - Ngẫu nhiên Body	 và Đầu<br>• Toàn Đầu (⚠ Rủi ro)<br>• Speed Hack<br>• Ghost Hack<br>• Telekill<br>• Up Player<br><br><br><span style="font-size: 1.1em; color: red;"><b> ESP Player </b><br><span style="font-size: 0.9em; color: black;">• ESP Linha<br>• Hộp ESP<br>• Sức khỏe ESP<br><br>⚠️ Lưu ý:<br>Sản phẩm này chỉ hoạt động trên thiết bị có ROOT - 64bit .<br>❌Không hỗ trợ sử dụng trên máy ảo.<br>✅Hoạt động trên LD Cloud (phiên bản trả phí) .<br>➡️Bạn nên kiểm tra khả năng tương thích trước khi mua. ',
            category: 'panel',
            image: 'https://i.imgur.com/XNxxlgs.jpeg',
            productCode: 'BR Mods ADR',
            variations: [
                { price: 120000, label: '120,000VND - 4,55$ /10Day' },
                { price: 170000, label: '170,000VND - 6,45$ /15Day' },
                { price: 320000, label: '320,000VND - 12,14$ /30Day' },
            ]
        },
        {
            id: 30,
            name: '# PC + Bypass',
            detail: ' <span style="color: blue;"><b>• Bypass Emulado - Xếp hạng 50 người chơi<br></b><br><span style="font-size: 1.3em; color: red;"><b> Memory </b><span style="font-size: 0.8em; color: black;"><br>• Aimbot Ombro<br>• Aimbot Beta - ( An toàn / Band )<br>• Fov<br>• Số lượng đạn body/head<br>• Ghost Hack<br>• Under Player<br>• Tp Wall<br>• Wall Hack<br>• Speed Hack<br><br><span style="font-size: 1.3em; color: red;"><b> Esp Players </b><span style="font-size: 0.8em; color: black;"><br>• Hiển thị tên<br>• Hiển thị dây<br>• Hộp trưng hộp<br>• Hiển thị khoảng cách<br>• Hiển thị hp<br><br><span style="font-size: 1.3em; color: red;"><b> ESP Config </b><span style="font-size: 0.8em; color: black;"><br>• Màu ESP<br>• Vị trí dòng (Trên, Dưới) <br>• Tên Kích thước văn bản<br>• Khoảng cách Kích thước văn bản ',
            category: 'panel',
            image: 'https://i.imgur.com/3YU3moV.jpeg',
            productCode: 'BR Mods PC',
            variations: [
                { price: 105000, label: '105,000VND - 4$ /1Day' },
                { price: 345000, label: '345,000VND - 13$ /10Day' },
                { price: 635000, label: '635,000VND - 23$ /30Day' },
            ]
        },
        {
            id: 31,
            name: '# PC NO Bypass',
            detail: ' <br><span style="font-size: 1.3em; color: red;"><b> Memory </b><span style="font-size: 0.8em; color: black;"><br>• Aimbot Ombro<br>• Aimbot Beta - ( An toàn / Band )<br>• Fov<br>• Số lượng đạn body/head<br>• Ghost Hack<br>• Under Player<br>• Tp Wall<br>• Wall Hack<br>• Speed Hack<br><br><span style="font-size: 1.3em; color: red;"><b> Esp Players </b><span style="font-size: 0.8em; color: black;"><br>• Hiển thị tên<br>• Hiển thị dây<br>• Hộp trưng hộp<br>• Hiển thị khoảng cách<br>• Hiển thị hp<br><br><span style="font-size: 1.3em; color: red;"><b> ESP Config </b><span style="font-size: 0.8em; color: black;"><br>• Màu ESP<br>• Vị trí dòng (Trên, Dưới) <br>• Tên Kích thước văn bản<br>• Khoảng cách Kích thước văn bản ',
            category: 'panel',
            image: 'https://i.imgur.com/3YU3moV.jpeg',
            productCode: 'BR Mods PC',
            variations: [
                { price: 105000, label: '105,000VND - 4$ /1Day' },
                { price: 210000, label: '210,000VND - 8$ /10Day' },
                { price: 395000, label: '395,000VND - 15$ /30Day' },
            ]
        },
        {
            id: 32,
            name: '# Bypass',
            category: 'panel',
            image: 'https://i.imgur.com/QOw6nfF.jpeg',
            productCode: 'Bypass',
            variations: [
                { price: 395000, label: '395,000VND - 15$ /30Day' },
                { price: 1190000, label: '1,190,000VND - 45$ / Vĩnh Viễn - Forever' },
            ]
        },
                {
            id: 33,
            name: 'Quân Đoàn <b>LUXURY•VIP✓</b>',
            detail: ' <span style="font-size: 1.5em; color: red;"><b> ID: 3085462326 </b><br><span style="font-size: 1.3em; color: blue;"><b> Yêu Cầu </b><br><span style="font-size: 0.8em; color: black;">1. Đổi tên có ký tự: <b>LUX.</b><br>vd: LUX.abc<br>2. Ảnh Moco<br>3. Nền mặc định<br><br><span style="font-size: 1.3em; color: blue;"><b> Quyền Lợi </b><br><span style="font-size: 0.8em; color: black;">1. Được Kéo Rank Free. ',
            category: 'qd',
            image: 'https://i.imgur.com/T76leBd.jpeg',
            productCode: 'LUXURY•VIP✓',
            
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

    function showSection(section) {
        hideAllSections();
        section && section.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- HÀM TẢI VÀ LƯU TRẠNG THÁI NGƯỜI DÙNG ---
    function saveCurrentUser() {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    }

    function loadCurrentUser() {
        const storedUser = localStorage.getItem('currentUser');
        const storedLogin = localStorage.getItem('isLoggedIn');
        if (storedUser) {
            currentUser = JSON.parse(storedUser);
            isLoggedIn = storedLogin === 'true';
        }
    }

    function updateUserUI() {
        const loginMenuItem = document.getElementById('menu-login');
        const logoutMenuItem = document.getElementById('menu-logout');
        const accountMenuItem = document.getElementById('menu-account');
        const depositMenuItem = document.getElementById('menu-deposit');

        if (isLoggedIn && currentUser) {
            loginMenuItem.classList.add('hidden');
            showRegisterBtn.classList.add('hidden');
            logoutMenuItem.classList.remove('hidden');
            accountMenuItem.classList.remove('hidden');
            depositMenuItem.classList.remove('hidden');
        } else {
            loginMenuItem.classList.remove('hidden');
            showRegisterBtn.classList.remove('hidden');
            logoutMenuItem.classList.add('hidden');
            accountMenuItem.classList.add('hidden');
            depositMenuItem.classList.add('hidden');
        }
    }

    // === HÀM HIỂN THỊ SẢN PHẨM (ĐÃ CHỈNH SỬA) ===
    function displayProducts(category = currentCategory) {
        const filteredProducts = products.filter(product => {
            return category === 'all' || product.category === category;
        });

        const productHTML = filteredProducts.map(product => {
            let variationsHTML = '';
            let displayPrice = '';
            let buyButtonHTML = '';

            // Handle variations (select box or single price)
            if (product.variations && product.variations.length > 0) {
                if (product.variations.length === 1 && product.variations[0].price === 0 && product.buyNowLink) {
                    // Case: FREE product with Telegram link (ID 18, 19)
                    displayPrice = `<div class="display-price">Miễn phí</div>`;
                    buyButtonHTML = `<button class="buy-now-btn" data-buynow-link="${product.buyNowLink}">MUA NGAY</button>`;
                } else {
                    // Case: Standard product with variations
                    const defaultPrice = product.variations[0].price;
                    displayPrice = `<div class="display-price" data-initial-price="${defaultPrice}">${formatVND(defaultPrice)}</div>`;

                    variationsHTML = `
                        <select class="size-price-select" data-product-id="${product.id}">
                            ${product.variations.map((v, index) => 
                                `<option value="${v.price}" data-label="${v.label}">${v.label}</option>`
                            ).join('')}
                        </select>
                    `;
                    buyButtonHTML = `<button class="buy-now-btn" data-product-id="${product.id}">MUA NGAY</button>`;
                }
            } else if (product.buyNowLink) {
                // Case: Product with only a buy now link (should not happen if variations handled correctly, but kept as fallback)
                buyButtonHTML = `<button class="buy-now-btn" data-buynow-link="${product.buyNowLink}">MUA NGAY</button>`;
            }

            // Tạo HTML cho chi tiết sản phẩm
            const productDetailHTML = product.detail ? `<p class="product-detail">${product.detail}</p>` : ''; // <<< DÒNG MỚI

            return `
                <div class="product-item" data-id="${product.id}">
                    <span class="product-code">${product.productCode}</span>
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    ${productDetailHTML}  <div class="variation-selector">
                        ${variationsHTML}
                    </div>
                    ${displayPrice}
                    ${buyButtonHTML}
                </div>
            `;
        }).join('');

        productList.innerHTML = productHTML;
        productsSection.classList.remove('hidden');
    }

    // === HÀM XỬ LÝ SỰ KIỆN ===

    // Xử lý click trên Menu Hamburger
    hamburgerMenuIcon.addEventListener('click', () => {
        userDropdownMenu.classList.toggle('hidden');
    });

    // Xử lý click chọn danh mục
    categoriesGrid && categoriesGrid.addEventListener('click', (e) => {
        const categoryItem = e.target.closest('.category-item');
        if (categoryItem) {
            currentCategory = categoryItem.dataset.category;
            window.location.hash = 'products-section';
            displayProducts(currentCategory);
        }
    });

    // Xử lý thay đổi biến thể (variation)
    productList && productList.addEventListener('change', (e) => {
        if (e.target.classList.contains('size-price-select')) {
            const select = e.target;
            const priceElement = select.closest('.product-item').querySelector('.display-price');
            const selectedPrice = select.value;
            priceElement.innerHTML = formatVND(selectedPrice);
        }
    });

    // Xử lý click nút MUA NGAY
    productList && productList.addEventListener('click', (e) => {
        const buyBtn = e.target.closest('.buy-now-btn');
        if (buyBtn) {
            const productItem = buyBtn.closest('.product-item');
            const productId = parseInt(productItem.dataset.id);
            const product = products.find(p => p.id === productId);

            // Xử lý nút MUA NGAY với link trực tiếp (vd: Free Fire)
            if (buyBtn.dataset.buynowLink) {
                window.open(buyBtn.dataset.buynowLink, '_blank');
                return;
            }

            if (!product) return;

            // Xử lý mua hàng thông thường
            const selectElement = productItem.querySelector('.size-price-select');
            let selectedVariation = product.variations[0]; // Mặc định là variation đầu tiên

            if (selectElement) {
                const selectedOption = selectElement.options[selectElement.selectedIndex];
                const selectedPrice = parseInt(selectedOption.value);
                const selectedLabel = selectedOption.dataset.label;
                selectedVariation = { price: selectedPrice, label: selectedLabel };
            }

            if (!isLoggedIn) {
                alert('Vui lòng đăng nhập để thực hiện giao dịch!');
                showLoginPopup();
                return;
            }

            // Giả lập xử lý thanh toán và tạo lệnh
            const orderAmount = selectedVariation.price;
            const orderContent = `LUXURY${Date.now().toString().slice(-6)}`; // Mã chuyển khoản giả lập
            const productName = product.name;
            const productLabel = selectedVariation.label.split('/')[0].trim(); // Lấy phần giá

            lastOrderDetailsForCopy = {
                amount: orderAmount,
                content: orderContent
            };

            // Hiển thị thông tin chuyển khoản
            document.getElementById('product-name-info').textContent = productName;
            document.getElementById('product-price-info').textContent = productLabel;
            document.getElementById('transfer-amount').textContent = formatVND(orderAmount);
            document.getElementById('transfer-content').textContent = orderContent;
            
            showSection(depositSection);
            window.location.hash = 'deposit-section';
        }
    });

    // Xử lý nút Copy trong phần nạp tiền
    copyButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const target = e.target.dataset.target;
            const textToCopy = document.getElementById(target).textContent;

            try {
                await navigator.clipboard.writeText(textToCopy.trim());
                button.textContent = 'Đã Sao Chép!';
                setTimeout(() => {
                    button.textContent = 'Sao Chép';
                }, 1500);
            } catch (err) {
                console.error('Không thể sao chép:', err);
                alert('Có lỗi khi sao chép. Vui lòng sao chép thủ công.');
            }
        });
    });

    // Xử lý nút "Đã chuyển tiền"
    depositOkBtn && depositOkBtn.addEventListener('click', () => {
        if (!lastOrderDetailsForCopy) {
            alert('Không tìm thấy thông tin đơn hàng.');
            return;
        }

        const { amount, content } = lastOrderDetailsForCopy;

        // Giả lập thêm vào lịch sử mua hàng
        if (currentUser) {
            const now = new Date();
            const dateString = now.toLocaleDateString('vi-VN') + ' ' + now.toLocaleTimeString('vi-VN');
            const historyItem = {
                product: document.getElementById('product-name-info').textContent,
                price: amount,
                content: content,
                date: dateString
            };
            currentUser.purchaseHistory.push(historyItem);
            saveCurrentUser();
        }

        alert(`Giao dịch ${content} đã được ghi nhận. Vui lòng đợi hệ thống xử lý trong vòng 5-10 phút.`);
        
        // Quay về trang chủ
        window.location.hash = 'home';
        showSection(homeSection);
    });

    // --- XỬ LÝ ĐĂNG NHẬP / ĐĂNG KÝ ---

    function showLoginPopup() {
        showSection(authOverlay);
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    }

    function showRegisterPopup() {
        showSection(authOverlay);
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    }

    showLoginBtn && showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginPopup();
    });

    showRegisterBtn && showRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showRegisterPopup();
    });

    // Xử lý chuyển đổi form
    document.getElementById('show-register').addEventListener('click', (e) => {
        e.preventDefault();
        showRegisterPopup();
    });

    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        showLoginPopup();
    });

    closeFormButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            authOverlay.classList.add('hidden');
        });
    });
    
    authOverlay && authOverlay.addEventListener('click', (e) => {
        if (e.target.id === 'auth-overlay') {
            authOverlay.classList.add('hidden');
        }
    });

    // Giả lập Đăng ký
    registerUserForm && registerUserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        if (password !== confirmPassword) {
            alert('Xác nhận mật khẩu không khớp!');
            return;
        }

        // Trong thực tế, bạn sẽ gửi dữ liệu này lên server.
        // Giả lập lưu người dùng và đăng nhập ngay
        currentUser = { username: username, password: password, purchaseHistory: [] };
        isLoggedIn = true;
        saveCurrentUser();
        alert(`Đăng ký thành công cho tài khoản: ${username}`);
        updateUserUI();
        authOverlay.classList.add('hidden');
    });

    // Giả lập Đăng nhập
    loginUserForm && loginUserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // Giả lập kiểm tra (Trong thực tế phải kiểm tra với dữ liệu server)
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.username === username && user.password === password) {
                currentUser = user;
                isLoggedIn = true;
                saveCurrentUser();
                alert(`Chào mừng, ${username}!`);
                updateUserUI();
                authOverlay.classList.add('hidden');
            } else {
                alert('Tên đăng nhập hoặc mật khẩu không đúng!');
            }
        } else if (username === 'test' && password === 'test') {
            // Tài khoản demo mặc định nếu chưa có ai đăng ký
            currentUser = { username: 'test', password: 'test', purchaseHistory: [] };
            isLoggedIn = true;
            saveCurrentUser();
            alert(`Chào mừng, ${username}! (Tài khoản demo)`);
            updateUserUI();
            authOverlay.classList.add('hidden');
        } else {
             alert('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    });

    // Xử lý Đăng xuất
    logoutBtn && logoutBtn.addEventListener('click', () => {
        isLoggedIn = false;
        currentUser = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        updateUserUI();
        window.location.hash = 'home';
        showSection(homeSection);
        alert('Bạn đã đăng xuất.');
    });

    // Hàm hiển thị thông tin tài khoản và lịch sử mua hàng
    function renderAccountInfo() {
        if (!isLoggedIn || !currentUser) {
            showLoginPopup();
            return;
        }

        accountUsernameSpan.textContent = currentUser.username;
        purchaseHistoryList.innerHTML = ''; // Xóa nội dung cũ

        if (currentUser.purchaseHistory && currentUser.purchaseHistory.length > 0) {
            const reversedHistory = [...currentUser.purchaseHistory].reverse(); // Hiển thị đơn mới nhất trước
            reversedHistory.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('history-item');
                li.innerHTML = `
                    <strong>Sản phẩm:</strong> ${item.product} (${item.price ? formatVND(item.price) : '0đ'})<br>
                    <strong>Mã giao dịch:</strong> ${item.content}<br>
                    <span class="date">${item.date}</span>
                `;
                purchaseHistoryList.appendChild(li);
            });
        } else {
            purchaseHistoryList.innerHTML = '<li class="history-item">Bạn chưa có giao dịch nào.</li>';
        }
    }

    // Xử lý chuyển hướng từ menu dropdown
    userDropdownMenu && userDropdownMenu.addEventListener('click', (e) => {
        userDropdownMenu.classList.add('hidden');
        if (e.target.id === 'menu-deposit') {
            window.location.hash = 'deposit-section';
            showSection(depositSection);
        } else if (e.target.id === 'menu-account') {
            window.location.hash = 'account-info-section';
            showSection(accountInfoSection);
            renderAccountInfo();
        } else if (e.target.id === 'menu-login') {
            showLoginPopup();
        } else if (e.target.id === 'menu-logout') {
            logoutBtn.click();
        }
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

    // Xử lý khi có thay đổi hash (ví dụ: nút quay lại/tiến lên của trình duyệt)
    window.addEventListener('hashchange', navigateToSectionFromHash);

    // Khởi tạo UI, tải trạng thái đăng nhập và xử lý hash khi tải trang
    loadCurrentUser();
    updateUserUI();

    if (window.location.hash) {
        navigateToSectionFromHash();
    } else {
        showSection(homeSection);
    }
});