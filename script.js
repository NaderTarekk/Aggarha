// ========================================
// DUMMY DATA
// ========================================

const carsData = [
    {
        id: 1,
        name: 'BMW X7',
        model: '2024',
        price: 450,
        city: 'الرياض',
        rating: 5,
        fuel: 'بنزين',
        transmission: 'أوتوماتيك',
        seats: 7,
        type: 'SUV',
        image: 'https://cdn.pixabay.com/photo/2017/08/09/02/13/bmw-2615009_640.jpg',
        description: 'SUV فاخرة',
        color: 'from-purple-400 to-blue-400'
    },
    {
        id: 2,
        name: 'Mercedes-AMG C63',
        model: '2023',
        price: 550,
        city: 'جدة',
        rating: 5,
        fuel: 'بنزين',
        transmission: 'أوتوماتيك',
        seats: 4,
        type: 'سيدان',
        image: 'https://cdn.pixabay.com/photo/2015/11/08/23/30/car-1033592_640.jpg',
        description: 'سيدان رياضية',
        color: 'from-blue-400 to-purple-400'
    },
    {
        id: 3,
        name: 'Porsche 911 Turbo',
        model: '2024',
        price: 750,
        city: 'الدمام',
        rating: 5,
        fuel: 'بنزين',
        transmission: 'أوتوماتيك',
        seats: 2,
        type: 'رياضية',
        image: 'https://cdn.pixabay.com/photo/2014/03/29/09/17/car-297821_640.jpg',
        description: 'رياضية فاخرة',
        color: 'from-pink-400 to-purple-400'
    },
    {
        id: 4,
        name: 'Range Rover Sport',
        model: '2023',
        price: 500,
        city: 'الخبر',
        rating: 4,
        fuel: 'بنزين',
        transmission: 'أوتوماتيك',
        seats: 5,
        type: 'SUV',
        image: 'https://cdn.pixabay.com/photo/2019/03/07/14/42/land-rover-4038341_640.jpg',
        description: 'SUV رياضية',
        color: 'from-indigo-400 to-blue-400'
    },
    {
        id: 5,
        name: 'Tesla Model S',
        model: '2024',
        price: 600,
        city: 'الرياض',
        rating: 5,
        fuel: 'كهربائي',
        transmission: 'أوتوماتيك',
        seats: 5,
        type: 'سيدان',
        image: 'https://cdn.pixabay.com/photo/2016/10/11/13/48/tesla-1730645_640.jpg',
        description: 'سيدان كهربائية',
        color: 'from-red-400 to-pink-400'
    },
    {
        id: 6,
        name: 'Audi A8',
        model: '2023',
        price: 400,
        city: 'جدة',
        rating: 4,
        fuel: 'بنزين',
        transmission: 'أوتوماتيك',
        seats: 5,
        type: 'سيدان',
        image: 'https://cdn.pixabay.com/photo/2014/04/14/20/41/audi-326645_640.jpg',
        description: 'سيدان فاخرة',
        color: 'from-violet-400 to-purple-400'
    },
    {
        id: 7,
        name: 'Lamborghini Urus',
        model: '2024',
        price: 900,
        city: 'الرياض',
        rating: 5,
        fuel: 'بنزين',
        transmission: 'أوتوماتيك',
        seats: 4,
        type: 'SUV',
        image: 'https://cdn.pixabay.com/photo/2018/05/24/21/47/supercar-3428742_640.jpg',
        description: 'SUV رياضية خارقة',
        color: 'from-yellow-400 to-red-400'
    },
    {
        id: 8,
        name: 'Ferrari F8',
        model: '2023',
        price: 1200,
        city: 'جدة',
        rating: 5,
        fuel: 'بنزين',
        transmission: 'أوتوماتيك',
        seats: 2,
        type: 'رياضية',
        image: 'https://cdn.pixabay.com/photo/2015/01/20/13/13/ferrari-604237_640.jpg',
        description: 'رياضية إيطالية',
        color: 'from-red-500 to-orange-400'
    }
];

// ========================================
// GLOBAL STATE
// ========================================

let currentPage = 'home-page';
let currentUser = null;
let isLoggedIn = false;

// ========================================
// PAGE NAVIGATION
// ========================================

function showPage(pageName) {
    // Redirect register to login page with register tab
    if (pageName === 'register') {
        pageName = 'login';
        setTimeout(() => switchAuthTab('register'), 100);
    }

    // Close mobile menu on any navigation
    closeMobileMenu();

    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Show selected page
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.style.display = 'block';
        currentPage = pageName + '-page';
        window.scrollTo(0, 0);

        // Initialize page-specific content
        if (pageName === 'cars') {
            loadCarsGrid();
        } else if (pageName === 'admin-dashboard') {
            loadAdminDashboard();
        } else if (pageName === 'dashboard') {
            loadUserDashboard();
        } else if (pageName === 'login') {
            // Default to login tab unless register was requested
            if (!document.getElementById('register-form-content').classList.contains('hidden')) return;
            switchAuthTab('login');
        }
    }
}

// Initialize with home page
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
    initializeEventListeners();
    loadCarsGrid();
    loadHomeCarsPreview();
    
    // Add scroll event listener for nav enhancement
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }
    });
});

// ========================================
// EVENT LISTENERS INITIALIZATION
// ========================================

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.getElementById('menu-toggle');
    if (mobileMenu) {
        mobileMenu.style.display = 'none';
    }
    if (menuToggle) {
        menuToggle.querySelector('i').className = 'fas fa-bars';
    }
}

function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.getElementById('menu-toggle');
    if (mobileMenu) {
        mobileMenu.style.display = 'block';
    }
    if (menuToggle) {
        menuToggle.querySelector('i').className = 'fas fa-times';
    }
}

function initializeEventListeners() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
                openMobileMenu();
            } else {
                closeMobileMenu();
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('nav');
        if (mobileMenu && mobileMenu.style.display === 'block' && !nav.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Search Form
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showPage('cars');
        });
    }

    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register Form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Booking Form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBooking);
    }
}

// ========================================
// CARS LISTING PAGE
// ========================================

function loadCarsGrid() {
    const grid = document.getElementById('cars-grid');
    if (!grid) return;

    grid.innerHTML = '';

    carsData.forEach(car => {
        const carCard = createCarCard(car);
        grid.appendChild(carCard);
    });
}

function createCarCard(car) {
    const card = document.createElement('div');
    card.className = 'group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 card-hover';

    card.innerHTML = `
        <div class="relative h-64 bg-gray-200 overflow-hidden">
            <img src="${car.image}" alt="${car.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-300" onerror="this.onerror=null;this.style.background='linear-gradient(135deg,#9333ea,#3b82f6)';this.style.objectFit='contain';this.alt='${car.name}'" />
            ${car.id === 1 ? '<span class="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold animate-pulse">جديد</span>' : ''}
            <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition duration-300"></div>
        </div>
        <div class="p-6">
            <h3 class="text-xl font-bold mb-1">${car.name}</h3>
            <p class="text-purple-600 font-semibold mb-3 text-sm">${car.description}</p>
            <p class="text-gray-600 mb-4 text-sm">
                <i class="fas fa-calendar ml-2 text-purple-600"></i>${car.model}
                <span class="mx-2">•</span>
                <i class="fas fa-gas-pump ml-2 text-blue-600"></i>${car.fuel}
            </p>
            <div class="flex justify-between items-center mb-4">
                <div>
                    <p class="text-gray-500 text-xs">السعر اليومي</p>
                    <p class="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">${car.price} ر.س</p>
                </div>
                <div class="text-center">
                    <div class="flex gap-0.5">
                        ${[...Array(5)].map((_, i) => `<i class="fas fa-star ${i < car.rating ? 'text-yellow-400' : 'text-gray-300'} text-xs"></i>`).join('')}
                    </div>
                    <p class="text-xs text-gray-500 mt-1">${car.rating}.0</p>
                </div>
            </div>
            <button onclick="goToCarDetails(${car.id})" class="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-bold hover:shadow-lg transition hover:brightness-110">
                <i class="fas fa-arrow-left ml-2"></i>عرض التفاصيل
            </button>
        </div>
    `;

    return card;
}

function loadHomeCarsPreview() {
    const grid = document.getElementById('home-cars-grid');
    if (!grid) return;
    grid.innerHTML = '';
    carsData.slice(0, 3).forEach((car, i) => {
        const card = document.createElement('div');
        card.className = 'group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100';
        card.innerHTML = `
            <div class="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <img src="${car.image}" alt="${car.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700" onerror="this.onerror=null;this.style.background='linear-gradient(135deg,#9333ea,#3b82f6)';this.style.objectFit='contain';" />
                ${i === 0 ? '<span class="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">الأكثر طلباً</span>' : ''}
                <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>
            <div class="p-6">
                <div class="flex items-start justify-between mb-3">
                    <div>
                        <h3 class="text-xl font-black text-gray-900">${car.name}</h3>
                        <p class="text-purple-600 font-semibold text-xs mt-1">${car.description}</p>
                    </div>
                    <div class="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                        <i class="fas fa-star text-amber-400 text-xs"></i>
                        <span class="text-xs font-bold text-amber-700">${car.rating}.0</span>
                    </div>
                </div>
                <div class="flex items-center gap-3 mb-4 text-xs text-gray-500">
                    <span class="flex items-center gap-1"><i class="fas fa-calendar text-purple-400"></i>${car.model}</span>
                    <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span class="flex items-center gap-1"><i class="fas fa-gas-pump text-blue-400"></i>${car.fuel}</span>
                    <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span class="flex items-center gap-1"><i class="fas fa-users text-green-400"></i>${car.seats}</span>
                </div>
                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                        <p class="text-xs text-gray-400">يومياً</p>
                        <p class="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">${car.price} <span class="text-sm">ر.س</span></p>
                    </div>
                    <button onclick="goToCarDetails(${car.id})" class="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-sm shadow-md shadow-purple-600/20 hover:shadow-lg hover:shadow-purple-600/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                        التفاصيل
                        <i class="fas fa-arrow-left text-xs"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function goToCarDetails(carId) {
    const car = carsData.find(c => c.id === carId);
    if (car) {
        // Update car details page with selected car
        sessionStorage.setItem('selectedCar', JSON.stringify(car));
        showPage('car-details');
    }
}

// ========================================
// AUTHENTICATION PAGES
// ========================================

function handleLogin(event) {
    event.preventDefault();

    const form = document.getElementById('login-form');
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    // Simulate login
    if (email && password) {
        currentUser = {
            name: 'محمد أحمد',
            email: email,
            phone: '+966 50 123 4567',
            city: 'الرياض'
        };
        isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(currentUser));

        showNotification('تم تسجيل الدخول بنجاح!', 'success');
        setTimeout(() => {
            showPage('dashboard');
        }, 1000);
    }
}

function handleRegister(event) {
    event.preventDefault();

    const form = document.getElementById('register-form');
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (name && email && phone && password) {
        currentUser = {
            name: name,
            email: email,
            phone: phone,
            city: 'الرياض'
        };
        isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(currentUser));

        showNotification('تم إنشاء الحساب بنجاح! مرحباً بك', 'success');
        setTimeout(() => {
            showPage('dashboard');
        }, 1000);
    }
}

function handleLogout() {
    currentUser = null;
    isLoggedIn = false;
    localStorage.removeItem('user');
    showNotification('تم تسجيل الخروج بنجاح', 'info');
    setTimeout(() => {
        showPage('home');
    }, 1000);
}

// ========================================
// DASHBOARD PAGES
// ========================================

function loadUserDashboard() {
    // Update user name in dashboard
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
        currentUser = user;
    }
}

function switchDashboardTab(tab) {
    const tabs = document.querySelectorAll('.dashboard-tab');
    tabs.forEach(t => t.classList.remove('active'));

    const contents = document.querySelectorAll('.dashboard-content');
    contents.forEach(c => c.classList.add('hidden'));

    if (tab === 'bookings') {
        document.querySelector('.dashboard-tab:nth-child(1)').classList.add('active');
        document.getElementById('bookings-tab').classList.remove('hidden');
    } else if (tab === 'profile') {
        document.querySelector('.dashboard-tab:nth-child(2)').classList.add('active');
        document.getElementById('profile-tab').classList.remove('hidden');
    }
}

// ========================================
// ADMIN DASHBOARD
// ========================================

function loadAdminDashboard() {
    // This would load admin data in a real application
}

function switchAdminTab(tab) {
    const tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(t => t.classList.remove('active'));

    const contents = document.querySelectorAll('.admin-tab-content');
    contents.forEach(c => c.classList.add('hidden'));

    if (tab === 'cars') {
        document.querySelector('.admin-tab:nth-child(1)').classList.add('active');
        document.getElementById('cars-tab').classList.remove('hidden');
    } else if (tab === 'bookings') {
        document.querySelector('.admin-tab:nth-child(2)').classList.add('active');
        document.getElementById('bookings-tab').classList.remove('hidden');
    } else if (tab === 'users') {
        document.querySelector('.admin-tab:nth-child(3)').classList.add('active');
        document.getElementById('users-tab').classList.remove('hidden');
    }
}

// ========================================
// BOOKING HANDLER
// ========================================

function handleBooking(event) {
    event.preventDefault();

    const pickupDate = event.target.querySelector('input[type="date"]:nth-of-type(1)').value;
    const returnDate = event.target.querySelector('input[type="date"]:nth-of-type(2)').value;
    const city = event.target.querySelector('select').value;

    if (pickupDate && returnDate && city) {
        if (!isLoggedIn) {
            showNotification('يجب تسجيل الدخول أولاً', 'warning');
            setTimeout(() => {
                showPage('login');
            }, 1000);
        } else {
            showNotification('تم تأكيد الحجز! سيتم التواصل معك قريباً', 'success');
        }
    } else {
        showNotification('يرجى ملء جميع الحقول', 'error');
    }
}

// ========================================
// AUTH TAB SWITCHING
// ========================================

function switchAuthTab(tab) {
    const loginBtn = document.getElementById('login-tab-btn');
    const registerBtn = document.getElementById('register-tab-btn');
    const loginContent = document.getElementById('login-form-content');
    const registerContent = document.getElementById('register-form-content');

    if (!loginBtn || !registerBtn) return;

    if (tab === 'login') {
        loginBtn.className = 'auth-tab-btn flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md';
        registerBtn.className = 'auth-tab-btn flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 text-gray-500 hover:text-gray-700';
        loginContent.classList.remove('hidden');
        registerContent.classList.add('hidden');
        // Re-trigger animation
        loginContent.style.animation = 'none';
        loginContent.offsetHeight;
        loginContent.style.animation = '';
    } else {
        registerBtn.className = 'auth-tab-btn flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md';
        loginBtn.className = 'auth-tab-btn flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 text-gray-500 hover:text-gray-700';
        registerContent.classList.remove('hidden');
        loginContent.classList.add('hidden');
        // Re-trigger animation
        registerContent.style.animation = 'none';
        registerContent.offsetHeight;
        registerContent.style.animation = '';
    }
}

function togglePassword(btn) {
    const input = btn.parentElement.querySelector('input');
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// ========================================
// MODAL/SEARCH HANDLER
// ========================================

function showSearchModal() {
    showPage('cars');
}

// ========================================
// NOTIFICATIONS
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-4 max-w-md p-4 rounded-lg text-white z-50 toast shadow-lg`;

    // Set color based on type
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    };

    notification.className += ` ${colors[type] || colors.info}`;
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Format currency
function formatCurrency(amount) {
    return `${amount} ر.س`;
}

// Format date
function formatDate(date) {
    return new Date(date).toLocaleDateString('ar-SA');
}

// Calculate days between dates
function calculateDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Search cars
function searchCars(filters) {
    return carsData.filter(car => {
        return true; // Simplified filtering
    });
}

// ========================================
// ANIMATIONS
// ========================================

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideIn 0.5s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card-hover').forEach(card => {
        observer.observe(card);
    });
});

// ========================================
// RESPONSIVE ADJUSTMENTS
// ========================================

// Handle window resize
window.addEventListener('resize', () => {
    // Adjust layout for different screen sizes
    if (window.innerWidth < 768) {
        // Mobile adjustments
    } else {
        // Desktop adjustments
    }
});

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }

    // Admin shortcut (Ctrl + Shift + A)
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        showPage('admin-dashboard');
    }
});

// ========================================
// LOCAL STORAGE
// ========================================

// Load user data on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
    }
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                imageObserver.unobserve(entry.target);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// EXPORT FOR TESTING
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showPage,
        handleLogin,
        handleRegister,
        handleLogout,
        handleBooking,
        showNotification,
        formatCurrency,
        formatDate,
        calculateDays,
        searchCars
    };
}
