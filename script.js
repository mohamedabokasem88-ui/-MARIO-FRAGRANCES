// State Management
let currentLang = 'ar';
let ownerPassword = localStorage.getItem('mario_owner_password') || 'mario2026';
let ownerWhatsApp = localStorage.getItem('mario_owner_whatsapp') || '201000000000';
let vfWallet = localStorage.getItem('mario_vf_wallet') || '01000000000';
let savedHeroTitle = localStorage.getItem('mario_hero_title') || 'اكتشف توقيعك العطري مع MARIO';
let savedHeroSub = localStorage.getItem('mario_hero_sub') || 'تركيبات عطرية فريدة بثبات عالي وفوحان استثنائي، تصلك لباب بيتك مع الدفع عند الاستلام أو فودافون كاش.';
let savedThemeColor = localStorage.getItem('mario_theme_color') || '#D4AF37';

// Apply saved theme color and hero content
document.documentElement.style.setProperty('--primary-gold', savedThemeColor);
const heroTitleEl = document.getElementById('hero-title-display');
const heroSubEl = document.getElementById('hero-sub-display');
if (heroTitleEl) heroTitleEl.innerText = savedHeroTitle;
if (heroSubEl) heroSubEl.innerText = savedHeroSub;

// Default products list
let products = JSON.parse(localStorage.getItem('mario_products')) || [
    {
        id: 1,
        name_ar: "ماريو نوار (Mario Noir)",
        name_en: "Mario Noir",
        category: "men",
        price: 850,
        stock: 25,
        notes_ar: "برغموت، فلفل أسود، عنبر، خشب الصندل",
        notes_en: "Bergamot, Black Pepper, Amber, Sandalwood",
        size: "100ml EDP",
        image: "",
        color: "from-zinc-800 to-black"
    },
    {
        id: 2,
        name_ar: "ماريو فيلفيت روز (Velvet Rose)",
        name_en: "Mario Velvet Rose",
        category: "women",
        price: 900,
        stock: 18,
        notes_ar: "ورد دمشقي، فانيليا مدغشقر، مسك أبيض",
        notes_en: "Damask Rose, Madagascar Vanilla, White Musk",
        size: "100ml EDP",
        image: "",
        color: "from-rose-950/60 to-black"
    },
    {
        id: 3,
        name_ar: "ماريو رويال عود (Royal Oud)",
        name_en: "Mario Royal Oud",
        category: "unisex",
        price: 1100,
        stock: 12,
        notes_ar: "عود كمبودي، زعفران، باتشولي، جلد",
        notes_en: "Cambodian Oud, Saffron, Patchouli, Leather",
        size: "100ml Extrait",
        image: "",
        color: "from-amber-950/60 to-black"
    }
];

let cart = JSON.parse(localStorage.getItem('mario_cart')) || [];
let orders = JSON.parse(localStorage.getItem('mario_orders')) || [];

// Translations Dictionary
const i18n = {
    ar: {
        nav_store: "المتجر",
        nav_admin: "لوحة تحكم المالك",
        hero_tag: "عطور مصممة لتدوم",
        hero_cta: "تسوق المجموعة الآن",
        collection_title: "مجموعة عطور MARIO",
        filter_all: "الكل",
        filter_men: "رجالي",
        filter_women: "حريمي",
        filter_unisex: "للجنسين",
        add_to_cart: "أضف للسلة",
        out_of_stock: "نفدت الكمية",
        notes_lbl: "النوتات:",
        cart_title: "سلة التسوق الذكية",
        smart_suggest_lbl: "✨ اقتراح ذكي يكمل ذوقك:",
        btn_add_short: "+ أضف",
        total_lbl: "الإجمالي:",
        lbl_payment_method: "اختر طريقة الدفع:",
        btn_confirm_order: "تأكيد الطلب وإرسال التفاصيل لواتساب المتجر",
        chat_btn: "خدمة العملاء (واتساب)",
        admin_title: "لوحة تحكم المالك (Owner Dashboard)",
        admin_sub: "منطقة محمية: تحكم كامل في المبيعات، المخزون، الأسعار، الصور، وفودافون كاش من داخل الموقع",
        back_store: "العودة للمتجر ←",
        btn_logout: "تسجيل الخروج",
        stat_sales: "إجمالي المبيعات",
        stat_orders: "عدد الطلبات",
        stat_stock: "إجمالي الزجاجات بالمخزن",
        ui_customizer_title: "إعدادات المتجر، الواتساب وفودافون كاش",
        lbl_owner_whatsapp: "رقم واتساب المالك وخدمة العملاء (WhatsApp)",
        lbl_owner_pass: "تغيير كلمة مرور المالك (Owner Password)",
        lbl_vf_wallet: "رقم محفظة فودافون كاش (Vodafone Cash)",
        lbl_hero_title: "عنوان البنر الرئيسي (عربي)",
        lbl_accent_color: "لون هوية البراند (Accent Color)",
        btn_save_ui: "حفظ الإعدادات والتعديلات",
        add_product_title: "إضافة عطر جديد للمتجر",
        btn_add_perfume: "إضافة العطر",
        orders_list_title: "الطلبات الواردة من الزبائن (خانة المالك)",
        auth_modal_title: "منطقة خاصة بالمالك فقط",
        auth_modal_sub: "يرجى إدخال كلمة مرور المالك للوصول إلى لوحة التحكم والتعديل على المتجر",
        btn_login_admin: "تسجيل الدخول كمالك",
        btn_cancel: "إلغاء والعودة للمتجر"
    },
    en: {
        nav_store: "Store",
        nav_admin: "Owner Dashboard",
        hero_tag: "SCENTS CRAFTED TO LAST",
        hero_cta: "Shop Collection",
        collection_title: "MARIO Signature Collection",
        filter_all: "All",
        filter_men: "Men",
        filter_women: "Women",
        filter_unisex: "Unisex",
        add_to_cart: "Add to Cart",
        out_of_stock: "Out of Stock",
        notes_lbl: "Notes:",
        cart_title: "Smart Shopping Cart",
        smart_suggest_lbl: "✨ Smart Pairing Suggestion:",
        btn_add_short: "+ Add",
        total_lbl: "Total:",
        lbl_payment_method: "Select Payment Method:",
        btn_confirm_order: "Confirm Order & Send to Store WhatsApp",
        chat_btn: "WhatsApp Support",
        admin_title: "Owner Dashboard",
        admin_sub: "Protected Zone: Full control over sales, inventory, prices, photos, and Vodafone Cash inside the site",
        back_store: "← Back to Store",
        btn_logout: "Logout",
        stat_sales: "Total Revenue",
        stat_orders: "Total Orders",
        stat_stock: "Bottles in Stock",
        ui_customizer_title: "Storefront, WhatsApp & Vodafone Cash Settings",
        lbl_owner_whatsapp: "Owner & Support WhatsApp Number",
        lbl_owner_pass: "Change Owner Password",
        lbl_vf_wallet: "Vodafone Cash Wallet Number",
        lbl_hero_title: "Main Hero Headline",
        lbl_accent_color: "Brand Accent Color",
        btn_save_ui: "Save Settings & Changes",
        add_product_title: "Add New Perfume",
        btn_add_perfume: "Add Perfume",
        orders_list_title: "Incoming Customer Orders (Owner Box)",
        auth_modal_title: "Owner Only Access",
        auth_modal_sub: "Please enter the Owner Password to access management tools and inventory",
        btn_login_admin: "Login as Owner",
        btn_cancel: "Cancel & Back to Store"
    }
};

// Clean & Format WhatsApp Phone Numbers
function cleanWhatsAppNumber(phone) {
    let num = (phone || '').replace(/\D/g, '');
    if (num.startsWith('01') && num.length === 11) {
        num = '2' + num;
    }
    return num || '201000000000';
}

// Redirect Customer Support directly to Owner's WhatsApp
function openWhatsAppCustomerService(e) {
    if (e) e.preventDefault();
    const num = cleanWhatsAppNumber(ownerWhatsApp);
    const text = currentLang === 'ar'
        ? encodeURIComponent('مرحباً متجر MARIO للعطور، أود الاستفسار بخصوص أحد العطور وطلب المساعدة في اختيار العطر المناسب.')
        : encodeURIComponent('Hello MARIO Perfumes, I would like to ask about your luxury perfumes.');
    window.open(`https://wa.me/${num}?text=${text}`, '_blank');
}

// Owner Authentication System
function isOwnerAuthenticated() {
    return sessionStorage.getItem('mario_owner_authenticated') === 'true';
}

function openAdminAuth() {
    if (isOwnerAuthenticated()) {
        switchView('admin');
        return;
    }
    const modal = document.getElementById('admin-auth-modal');
    const input = document.getElementById('admin-pass-input');
    const err = document.getElementById('admin-auth-error');
    if (err) err.classList.add('hidden');
    if (input) {
        input.value = '';
        input.classList.remove('shake-input');
    }
    if (modal) modal.classList.remove('hidden');
    setTimeout(() => { if (input) input.focus(); }, 150);
}

function closeAdminAuth() {
    const modal = document.getElementById('admin-auth-modal');
    if (modal) modal.classList.add('hidden');
}

function handleAdminLogin(e) {
    e.preventDefault();
    const input = document.getElementById('admin-pass-input');
    const err = document.getElementById('admin-auth-error');
    const entered = (input ? input.value : '').trim();

    if (entered === ownerPassword) {
        sessionStorage.setItem('mario_owner_authenticated', 'true');
        closeAdminAuth();
        switchView('admin');
    } else {
        if (err) {
            err.innerText = currentLang === 'ar' ? 'عفواً! كلمة المرور غير صحيحة.' : 'Incorrect Password! Access Denied.';
            err.classList.remove('hidden');
        }
        if (input) {
            input.classList.remove('shake-input');
            void input.offsetWidth; // Trigger reflow
            input.classList.add('shake-input');
            input.focus();
        }
    }
}

function adminLogout() {
    sessionStorage.removeItem('mario_owner_authenticated');
    switchView('store');
    alert(currentLang === 'ar' ? 'تم تسجيل خروج المالك بنجاح.' : 'Logged out successfully.');
}

// Payment Option Toggle
function handlePaymentChange() {
    const paymentSelect = document.getElementById('payment-method');
    if (!paymentSelect) return;
    const method = paymentSelect.value;
    const vfBox = document.getElementById('vf-cash-box');
    const vfDisplay = document.getElementById('vf-wallet-display');
    if (vfDisplay) vfDisplay.innerText = vfWallet;
    if (vfBox) {
        if (method === 'vodafone_cash') {
            vfBox.classList.remove('hidden');
        } else {
            vfBox.classList.add('hidden');
        }
    }
}

// Render Products Grid
function renderProducts(filter = 'all') {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-zinc-500">${currentLang === 'ar' ? 'لا توجد عطور في هذا القسم حالياً. أضف عطورك من لوحة تحكم المالك!' : 'No fragrances in this section. Add perfumes from Owner Dashboard!'}</div>`;
        return;
    }

    filtered.forEach(product => {
        const name = currentLang === 'ar' ? product.name_ar : (product.name_en || product.name_ar);
        const notes = currentLang === 'ar' ? product.notes_ar : (product.notes_en || product.notes_ar);
        const btnText = product.stock > 0 ? i18n[currentLang].add_to_cart : i18n[currentLang].out_of_stock;

        const visualHtml = product.image
            ? `<img src="${product.image}" alt="${name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">`
            : `<div class="w-20 h-28 border-2 border-[#D4AF37]/70 rounded-t-lg rounded-b-md flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm shadow-2xl group-hover:scale-105 transition">
                   <div class="w-6 h-4 bg-[#D4AF37] -mt-6 mb-3 rounded-t-sm"></div>
                   <span class="brand-font text-xs tracking-widest gold-text font-bold">MARIO</span>
                   <span class="text-[9px] text-zinc-400 mt-1">${product.size || '100ml'}</span>
               </div>`;

        grid.innerHTML += `
            <div class="bg-[#161616] rounded-2xl border border-zinc-800/90 overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/60 transition group">
                <div>
                    <div class="h-64 bg-gradient-to-b ${product.color || 'from-zinc-800 to-black'} flex flex-col items-center justify-center relative overflow-hidden">
                        ${visualHtml}
                        <span class="absolute top-3 right-3 text-[11px] bg-black/75 px-2.5 py-1 rounded-full text-zinc-200 border border-zinc-700">
                            ${product.category.toUpperCase()} • ${product.size || '100ml'}
                        </span>
                    </div>

                    <div class="p-6">
                        <div class="flex justify-between items-start mb-2 gap-2">
                            <h3 class="text-lg font-bold text-white">${name}</h3>
                            <span class="font-bold gold-text text-lg whitespace-nowrap">${product.price} EGP</span>
                        </div>
                        <p class="text-xs text-zinc-400 mb-4">
                            <strong class="text-zinc-300">${i18n[currentLang].notes_lbl}</strong> ${notes}
                        </p>
                    </div>
                </div>

                <div class="px-6 pb-6">
                    <button onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''} 
                        class="w-full py-2.5 rounded-xl font-bold text-sm transition ${product.stock > 0 ? 'gold-bg text-black hover:opacity-90' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}">
                        ${btnText}
                    </button>
                </div>
            </div>
        `;
    });
}

// Category Filter Handling
function filterProducts(cat) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('gold-bg', 'text-black', 'font-semibold', 'border-[#D4AF37]');
        btn.classList.add('border-zinc-700');
        if (btn.dataset.filter === cat) {
            btn.classList.add('gold-bg', 'text-black', 'font-semibold', 'border-[#D4AF37]');
        }
    });
    renderProducts(cat);
}

// Add Item to Cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product || product.stock <= 0) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id: product.id, name_ar: product.name_ar, name_en: product.name_en || product.name_ar, price: product.price, qty: 1 });
    }
    saveAndRenderCart();
    toggleCart(true);
}

// Smart Upsell Item
function addUpsellToCart() {
    const existing = cart.find(item => item.id === 999);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id: 999, name_ar: "عينة استكشاف MARIO (15ml)", name_en: "MARIO Discovery Sample (15ml)", price: 150, qty: 1 });
    }
    saveAndRenderCart();
}

// Remove from Cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveAndRenderCart();
}

// Save Cart State & Update Drawer UI
function saveAndRenderCart() {
    localStorage.setItem('mario_cart', JSON.stringify(cart));
    const countEl = document.getElementById('cart-count');
    const itemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const upsellBox = document.getElementById('smart-upsell');

    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

    if (countEl) countEl.innerText = totalQty;
    if (totalEl) totalEl.innerText = `${totalPrice} EGP`;

    if (upsellBox) {
        if (cart.length > 0 && !cart.some(i => i.id === 999)) {
            upsellBox.classList.remove('hidden');
        } else {
            upsellBox.classList.add('hidden');
        }
    }

    if (!itemsEl) return;
    if (cart.length === 0) {
        itemsEl.innerHTML = `<p class="text-zinc-500 text-sm text-center py-6">${currentLang === 'ar' ? 'السلة فارغة حالياً' : 'Your cart is empty'}</p>`;
        return;
    }

    itemsEl.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center bg-zinc-900 p-3 rounded-xl border border-zinc-800">
            <div>
                <p class="text-sm font-bold">${currentLang === 'ar' ? item.name_ar : item.name_en}</p>
                <p class="text-xs text-zinc-400">${item.price} EGP × ${item.qty}</p>
            </div>
            <button onclick="removeFromCart(${item.id})" class="text-red-400 text-xs hover:underline">
                ${currentLang === 'ar' ? 'حذف' : 'Remove'}
            </button>
        </div>
    `).join('');
}

// Toggle Cart Open/Closed
function toggleCart(forceOpen = false) {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    handlePaymentChange();
    if (forceOpen) drawer.classList.remove('hidden');
    else drawer.classList.toggle('hidden');
}

// Checkout and Submit Order: Records in Owner Dashboard + Forwards to WhatsApp
function submitOrder(e) {
    e.preventDefault();
    if (cart.length === 0) {
        alert(currentLang === 'ar' ? 'أضف منتجات للسلة أولاً!' : 'Cart is empty!');
        return;
    }

    const method = document.getElementById('payment-method').value;
    const senderPhone = document.getElementById('vf-sender-phone').value.trim();
    const custName = document.getElementById('cust-name').value.trim();
    const custPhone = document.getElementById('cust-phone').value.trim();
    const custAddress = document.getElementById('cust-address').value.trim();

    const paymentLabel = method === 'vodafone_cash'
        ? `فودافون كاش (رقم المحول: ${senderPhone || 'غير مسجل'})`
        : 'الدفع عند الاستلام (Cash on Delivery)';

    const now = new Date();
    const formattedDate = now.toLocaleDateString('ar-EG', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    const orderTotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const orderItemsSummary = cart.map(i => `${i.name_ar} (${i.qty})`).join(' + ');

    const newOrder = {
        id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
        date: formattedDate,
        customer: custName,
        phone: custPhone,
        address: custAddress,
        items: orderItemsSummary,
        total: orderTotal,
        payment: paymentLabel,
        method: method,
        status: 'جديد (قيد المراجعة)'
    };

    // Deduct Stock
    cart.forEach(item => {
        const prod = products.find(p => p.id === item.id);
        if (prod) prod.stock = Math.max(0, prod.stock - item.qty);
    });

    // 1. Record into Owner Dashboard
    orders.unshift(newOrder);
    localStorage.setItem('mario_orders', JSON.stringify(orders));
    localStorage.setItem('mario_products', JSON.stringify(products));

    // 2. Prepare WhatsApp Order Message for the Store Owner
    const itemsDetailText = cart.map(i => `• ${i.name_ar} × ${i.qty} = ${i.price * i.qty} EGP`).join('\n');
    const waOrderMessage = `🛍️ *طلب جديد من متجر MARIO Perfumes*
----------------------------------------
📦 *رقم الطلب:* ${newOrder.id}
📅 *التاريخ:* ${formattedDate}

👤 *اسم العميل:* ${custName}
📞 *رقم الموبايل:* ${custPhone}
📍 *العنوان:* ${custAddress}

🧴 *المنتجات المطلوبة:*
${itemsDetailText}

💰 *الإجمالي المستحق:* ${orderTotal} EGP
💳 *طريقة الدفع:* ${paymentLabel}
----------------------------------------
تم تسجيل الطلب في لوحة المالك بنجاح.`;

    const ownerNum = cleanWhatsAppNumber(ownerWhatsApp);
    const waUrl = `https://wa.me/${ownerNum}?text=${encodeURIComponent(waOrderMessage)}`;

    cart = [];
    saveAndRenderCart();
    renderProducts();
    if (isOwnerAuthenticated()) renderAdmin();
    toggleCart();
    e.target.reset();
    handlePaymentChange();

    alert(currentLang === 'ar' 
        ? `تم تسجيل طلبك بنجاح برقم: ${newOrder.id}!\nسيتوجه المتصفح الآن لإرسال نسخة الطلب لواتساب المتجر لتأكيده وشحنه فوراً.` 
        : `Order Recorded! Order ID: ${newOrder.id}\nOpening WhatsApp to confirm your order with MARIO support.`);

    // Automatically open WhatsApp with complete order details
    window.open(waUrl, '_blank');
}

// Switch between Storefront and Protected Admin Dashboard
function switchView(view) {
    if (view === 'admin') {
        if (!isOwnerAuthenticated()) {
            openAdminAuth();
            return;
        }
    }
    const storeView = document.getElementById('store-view');
    const adminView = document.getElementById('admin-view');
    if (storeView) storeView.classList.toggle('hidden', view !== 'store');
    if (adminView) adminView.classList.toggle('hidden', view !== 'admin');
    if (view === 'admin') renderAdmin();
}

// Update Order Status directly from Dashboard
function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        localStorage.setItem('mario_orders', JSON.stringify(orders));
        renderAdmin();
    }
}

// Message Customer on WhatsApp from Owner Dashboard
function contactCustomerWhatsApp(phone, orderId) {
    const num = cleanWhatsAppNumber(phone);
    const msg = encodeURIComponent(`مرحباً بك من متجر MARIO للعطور! بخصوص طلبك رقم ${orderId}، نود إخبارك بأنه تم استلامه وجاري تجهيزه.`);
    window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
}

// Render Admin Dashboard
function renderAdmin() {
    const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

    const statSalesEl = document.getElementById('stat-total-sales');
    const statOrdersEl = document.getElementById('stat-total-orders');
    const statStockEl = document.getElementById('stat-total-stock');
    if (statSalesEl) statSalesEl.innerText = `${totalSales} EGP`;
    if (statOrdersEl) statOrdersEl.innerText = orders.length;
    if (statStockEl) statStockEl.innerText = totalStock;

    const heroTitleDisp = document.getElementById('hero-title-display');
    const heroSubDisp = document.getElementById('hero-sub-display');
    const editHeroTitle = document.getElementById('edit-hero-title');
    const editHeroSub = document.getElementById('edit-hero-sub');
    const editVfWallet = document.getElementById('edit-vf-wallet');
    const editOwnerPass = document.getElementById('edit-owner-pass');
    const editOwnerWhatsApp = document.getElementById('edit-owner-whatsapp');

    if (editHeroTitle && heroTitleDisp) editHeroTitle.value = heroTitleDisp.innerText;
    if (editHeroSub && heroSubDisp) editHeroSub.value = heroSubDisp.innerText;
    if (editVfWallet) editVfWallet.value = vfWallet;
    if (editOwnerPass) editOwnerPass.value = ownerPassword;
    if (editOwnerWhatsApp) editOwnerWhatsApp.value = ownerWhatsApp;

    // Render Admin Products Table
    const prodTbody = document.getElementById('admin-products-table');
    if (prodTbody) {
        prodTbody.innerHTML = products.length ? products.map(p => `
            <tr>
                <td class="py-3 font-bold">${p.name_ar} <span class="text-xs text-zinc-500">(${p.size || '100ml'})</span></td>
                <td class="py-3 text-xs uppercase text-zinc-400">${p.category}</td>
                <td class="py-3 gold-text font-bold">${p.price} EGP</td>
                <td class="py-3">${p.stock}</td>
                <td class="py-3 flex gap-2">
                    <button onclick="editProduct(${p.id})" class="text-xs bg-zinc-800 hover:bg-zinc-700 px-2.5 py-1 rounded text-amber-300">تعديل</button>
                    <button onclick="deleteProduct(${p.id})" class="text-xs bg-red-950/50 hover:bg-red-900/60 px-2.5 py-1 rounded text-red-400">حذف</button>
                </td>
            </tr>
        `).join('') : `<tr><td colspan="5" class="py-6 text-center text-zinc-500">لا توجد عطور مضافة بعد</td></tr>`;
    }

    // Render Orders Table (Owner Box)
    const tbody = document.getElementById('orders-table-body');
    if (tbody) {
        tbody.innerHTML = orders.length ? orders.map(o => `
            <tr>
                <td class="py-3 font-mono gold-text">
                    ${o.id}<br>
                    <span class="text-[10px] text-zinc-500">${o.date || ''}</span>
                </td>
                <td class="py-3 font-bold">${o.customer}</td>
                <td class="py-3 text-xs text-zinc-400">${o.phone}<br>${o.address}</td>
                <td class="py-3 text-xs text-zinc-300 max-w-xs">${o.items}</td>
                <td class="py-3 font-bold gold-text whitespace-nowrap">${o.total} EGP</td>
                <td class="py-3 text-xs text-zinc-300">${o.payment || ''}</td>
                <td class="py-3">
                    <select onchange="updateOrderStatus('${o.id}', this.value)" class="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-amber-300">
                        <option value="جديد (قيد المراجعة)" ${o.status === 'جديد (قيد المراجعة)' ? 'selected' : ''}>جديد (قيد المراجعة)</option>
                        <option value="تم التأكيد" ${o.status === 'تم التأكيد' ? 'selected' : ''}>تم التأكيد</option>
                        <option value="جاري الشحن" ${o.status === 'جاري الشحن' ? 'selected' : ''}>جاري الشحن</option>
                        <option value="تم التسليم" ${o.status === 'تم التسليم' ? 'selected' : ''}>تم التسليم</option>
                        <option value="ملغي" ${o.status === 'ملغي' ? 'selected' : ''}>ملغي</option>
                    </select>
                </td>
                <td class="py-3">
                    <button onclick="contactCustomerWhatsApp('${o.phone}', '${o.id}')" class="text-xs bg-emerald-950/60 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 px-2.5 py-1.5 rounded flex items-center gap-1">
                        <span>💬</span> <span>مراسلة</span>
                    </button>
                </td>
            </tr>
        `).join('') : `<tr><td colspan="8" class="py-8 text-center text-zinc-500">لا توجد طلبات مسجلة حتى الآن</td></tr>`;
    }
}

// Save or Update Product
function saveProduct(e) {
    e.preventDefault();
    const editId = document.getElementById('edit-prod-id').value;
    const fileInput = document.getElementById('new-image-file');

    const finalizeSave = (imgBase64) => {
        const prodData = {
            id: editId ? Number(editId) : Date.now(),
            name_ar: document.getElementById('new-name-ar').value,
            name_en: document.getElementById('new-name-en').value || document.getElementById('new-name-ar').value,
            price: Number(document.getElementById('new-price').value),
            stock: Number(document.getElementById('new-stock').value),
            category: document.getElementById('new-cat').value,
            size: document.getElementById('new-size').value || "100ml EDP",
            notes_ar: document.getElementById('new-notes-ar').value,
            notes_en: document.getElementById('new-notes-en').value || document.getElementById('new-notes-ar').value,
            image: imgBase64,
            color: "from-zinc-800 to-black"
        };

        if (editId) {
            const idx = products.findIndex(p => p.id === Number(editId));
            if (idx !== -1) {
                if (!imgBase64) prodData.image = products[idx].image;
                products[idx] = prodData;
            }
        } else {
            products.push(prodData);
        }

        localStorage.setItem('mario_products', JSON.stringify(products));
        renderProducts();
        renderAdmin();
        resetProductForm();
        alert(editId ? 'تم تعديل العطر بنجاح!' : 'تمت إضافة العطر للمتجر بنجاح!');
    };

    if (fileInput && fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(ev) {
            finalizeSave(ev.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        finalizeSave('');
    }
}

// Populate Product Form for Editing
function editProduct(id) {
    const p = products.find(item => item.id === id);
    if (!p) return;
    document.getElementById('edit-prod-id').value = p.id;
    document.getElementById('new-name-ar').value = p.name_ar;
    document.getElementById('new-name-en').value = p.name_en;
    document.getElementById('new-price').value = p.price;
    document.getElementById('new-stock').value = p.stock;
    document.getElementById('new-cat').value = p.category;
    document.getElementById('new-size').value = p.size || '100ml EDP';
    document.getElementById('new-notes-ar').value = p.notes_ar;
    document.getElementById('new-notes-en').value = p.notes_en;

    document.getElementById('product-form-heading').innerText = 'تعديل بيانات العطر';
    document.getElementById('save-prod-btn').innerText = 'حفظ التعديلات';
    document.getElementById('cancel-edit-btn').classList.remove('hidden');
    document.getElementById('product-form').scrollIntoView({ behavior: 'smooth' });
}

// Reset Product Form
function resetProductForm() {
    const form = document.getElementById('product-form');
    if (form) form.reset();
    document.getElementById('edit-prod-id').value = '';
    document.getElementById('product-form-heading').innerText = 'إضافة عطر جديد للمتجر';
    document.getElementById('save-prod-btn').innerText = 'إضافة العطر';
    document.getElementById('cancel-edit-btn').classList.add('hidden');
}

// Delete Product
function deleteProduct(id) {
    if (!confirm('هل أنت متأكد من حذف هذا العطر؟')) return;
    products = products.filter(p => p.id !== id);
    localStorage.setItem('mario_products', JSON.stringify(products));
    renderProducts();
    renderAdmin();
}

// Clear Demo Products
function clearDemoProducts() {
    if (!confirm('سيتم مسح جميع العطور الحالية لتبدأ بإضافة عطورك من الصفر. هل أنت متأكد؟')) return;
    products = [];
    localStorage.setItem('mario_products', JSON.stringify(products));
    renderProducts();
    renderAdmin();
}

// Export JSON Backup
function exportBackup() {
    const data = {
        ownerPassword,
        ownerWhatsApp,
        vfWallet,
        heroTitle: savedHeroTitle,
        heroSub: savedHeroSub,
        themeColor: savedThemeColor,
        products,
        orders
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MARIO_Store_Backup.json';
    a.click();
}

// Dynamic Theme Accent Color Change
function changeThemeColor(hex) {
    savedThemeColor = hex;
    localStorage.setItem('mario_theme_color', hex);
    document.documentElement.style.setProperty('--primary-gold', hex);
}

// Save Storefront, WhatsApp, Security & Vodafone Settings
function saveStoreSettings() {
    const newTitle = document.getElementById('edit-hero-title').value;
    const newSub = document.getElementById('edit-hero-sub').value;
    const newWallet = document.getElementById('edit-vf-wallet').value.trim();
    const newPass = document.getElementById('edit-owner-pass').value.trim();
    const newWhatsApp = document.getElementById('edit-owner-whatsapp').value.trim();

    if (newWhatsApp) {
        ownerWhatsApp = cleanWhatsAppNumber(newWhatsApp);
        localStorage.setItem('mario_owner_whatsapp', ownerWhatsApp);
        document.getElementById('edit-owner-whatsapp').value = ownerWhatsApp;
    }
    if (newPass) {
        ownerPassword = newPass;
        localStorage.setItem('mario_owner_password', ownerPassword);
    }
    if (newTitle.trim()) {
        savedHeroTitle = newTitle;
        localStorage.setItem('mario_hero_title', savedHeroTitle);
        document.getElementById('hero-title-display').innerText = savedHeroTitle;
    }
    if (newSub.trim()) {
        savedHeroSub = newSub;
        localStorage.setItem('mario_hero_sub', savedHeroSub);
        document.getElementById('hero-sub-display').innerText = savedHeroSub;
    }
    if (newWallet) {
        vfWallet = newWallet;
        localStorage.setItem('mario_vf_wallet', vfWallet);
        const vfDisp = document.getElementById('vf-wallet-display');
        if (vfDisp) vfDisp.innerText = vfWallet;
    }
    alert(currentLang === 'ar' ? 'تم حفظ الإعدادات، رقم الواتساب، كلمة المرور ورقم فودافون كاش!' : 'Settings, WhatsApp number, Owner password, and Vodafone Cash wallet saved!');
}

// Multi-language Toggle (Arabic / English)
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    const langLabel = document.getElementById('lang-label');
    if (langLabel) langLabel.innerText = currentLang === 'ar' ? 'EN' : 'عربي';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang] && i18n[currentLang][key]) {
            el.innerText = i18n[currentLang][key];
        }
    });

    const heroTitleDisplay = document.getElementById('hero-title-display');
    const heroSubDisplay = document.getElementById('hero-sub-display');
    if (currentLang === 'en') {
        if (heroTitleDisplay) heroTitleDisplay.innerText = "Discover Your Signature Scent with MARIO";
        if (heroSubDisplay) heroSubDisplay.innerText = "Unique long-lasting luxury fragrances delivered to your doorstep with Cash on Delivery or Vodafone Cash.";
    } else {
        if (heroTitleDisplay) heroTitleDisplay.innerText = savedHeroTitle;
        if (heroSubDisplay) heroSubDisplay.innerText = savedHeroSub;
    }

    renderProducts();
    saveAndRenderCart();
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    saveAndRenderCart();
    handlePaymentChange();
});
