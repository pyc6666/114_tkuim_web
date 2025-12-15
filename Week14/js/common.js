/**
 * 共用工具函數和 UI 處理
 */

// ==========================================
// 工具函數
// ==========================================
const Utils = {
    /**
     * 格式化日期
     */
    formatDate(dateStr, options = {}) {
        const date = new Date(dateStr);
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        };
        return date.toLocaleDateString('zh-TW', { ...defaultOptions, ...options });
    },

    /**
     * 判斷是否為同一天
     */
    isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    },

    /**
     * 防抖函數
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * 取得課程類型文字
     */
    getTypeText(type) {
        const types = {
            required: '必修',
            elective: '選修',
            general: '通識',
            assignment: '作業',
            exam: '考試',
            class: '課程',
            deadline: '截止日',
            other: '其他'
        };
        return types[type] || type;
    },

    /**
     * 取得漸層顏色
     */
    getGradientColors(key) {
        const gradients = {
            cs: '#667eea 0%, #764ba2 100%',
            ee: '#f093fb 0%, #f5576c 100%',
            math: '#4facfe 0%, #00f2fe 100%',
            physics: '#43e97b 0%, #38f9d7 100%',
            assignment: '#1976d2',
            exam: '#c2185b',
            class: '#7b1fa2',
            deadline: '#f57c00',
            other: '#388e3c'
        };
        return gradients[key] || '#667eea 0%, #764ba2 100%';
    }
};

// ==========================================
// UI 處理
// ==========================================
const UI = {
    /**
     * 顯示彈窗
     */
    showModal(title, content) {
        const modal = document.getElementById('eventModal');
        if (!modal) return;

        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        if (modalTitle) modalTitle.textContent = title;
        if (modalBody) modalBody.innerHTML = content;

        modal.classList.add('active');
    },

    /**
     * 隱藏彈窗
     */
    hideModal() {
        const modal = document.getElementById('eventModal');
        if (modal) {
            modal.classList.remove('active');
        }
    },

    /**
     * 切換側邊欄（手機版）
     */
    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.toggle('active');
        }
    },

    /**
     * 初始化彈窗關閉事件
     */
    initModalClose() {
        const modal = document.getElementById('eventModal');
        const closeBtn = document.getElementById('closeModal');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                UI.hideModal();
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    UI.hideModal();
                }
            });
        }
    }
};

// ==========================================
// 導航處理
// ==========================================
const Navigation = {
    /**
     * 初始化導航
     */
    init() {
        this.setActivePage();
        this.initMobileMenu();
    },

    /**
     * 設定當前頁面的導航高亮
     */
    setActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    /**
     * 初始化手機版選單
     */
    initMobileMenu() {
        if (window.innerWidth <= 768) {
            const navLeft = document.querySelector('.nav-left');

            // 檢查是否已經有漢堡選單
            if (navLeft && !navLeft.querySelector('.hamburger-menu')) {
                const hamburger = document.createElement('button');
                hamburger.className = 'hamburger-menu';
                hamburger.innerHTML = '☰';
                hamburger.style.cssText = 'background: none; border: none; color: white; font-size: 24px; cursor: pointer; margin-right: 10px;';
                hamburger.addEventListener('click', UI.toggleSidebar);
                navLeft.insertBefore(hamburger, navLeft.firstChild);
            }
        }
    }
};

// ==========================================
// 響應式處理
// ==========================================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
        }
    }
});

// ==========================================
// 頁面載入時初始化
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    UI.initModalClose();
});
