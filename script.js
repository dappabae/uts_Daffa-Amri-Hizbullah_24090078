function navigateTo(page) {
    window.location.href = page;
}

function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const errorMessage = document.getElementById('errorMessage');
            
            if (!email || !password) {
                errorMessage.classList.add('show');
                return;
            }
            
            errorMessage.classList.remove('show');
            alert('Login berhasil!');
            window.location.href = 'dashboard.html';
        });
    }

    const googleBtn = document.querySelector('.google-btn');
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            alert('Google login clicked - ini hanya simulasi broow!');
        });
    }
}

const summary = {
    totalProducts: 50,
    totalSales: 25,
    totalRevenue: 5000000
};

function initDashboard() {
    renderSummaryCards();
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

function renderSummaryCards() {
    const cardsContainer = document.getElementById('summaryCards');
    
    const cards = [
        {
            icon: '📦',
            title: 'Total Produk',
            value: summary.totalProducts,
            unit: 'produk'
        },
        {
            icon: '💰',
            title: 'Total Penjualan',
            value: summary.totalSales,
            unit: 'transaksi'
        },
        {
            icon: '💵',
            title: 'Total Revenue',
            value: formatCurrency(summary.totalRevenue),
            unit: ''
        }
    ];

    cardsContainer.innerHTML = cards.map(card => `
        <div class="card">
            <div class="card-icon">${card.icon}</div>
            <h3>${card.title}</h3>
            <div class="number ${card.title === 'Total Revenue' ? 'revenue' : ''}">
                ${card.value}
            </div>
            <div class="unit">${card.unit}</div>
        </div>
    `).join('');
}

// ✅ PRODUCTS PAGE DATA & FUNCTIONS
const products = [
    { id: 1, name: "Kopi item", price: 5000, stock: 50 },
    { id: 2, name: "Teh susu", price: 6000, stock: 30 },
    { id: 3, name: "Butterschoth", price: 15000, stock: 20 },
    { id: 4, name: "Kopi Gula Aren", price: 15000, stock: 15 },
    { id: 5, name: "kopsu", price: 13000, stock: 8 }
];

function getStockClass(stock) {
    if (stock > 30) return 'stock-high';
    if (stock > 10) return 'stock-medium';
    return 'stock-low';
}

function editProduct(productId, productName) {
    alert(`Edit produk: ${productName}`);
}

function deleteProduct(productId, buttonElement) {
    if (confirm("Yakin hapus produk ini?")) {
        const row = buttonElement.closest('tr');
        row.remove();
        
        const productIndex = products.findIndex(product => product.id === productId);
        if (productIndex > -1) {
            products.splice(productIndex, 1);
        }
        
        alert('Produk berhasil dihapus!');
        initProductsPage();
    }
}

function initProductsPage() {
    const tableBody = document.getElementById('productsTableBody');
    if (tableBody) {
        tableBody.innerHTML = products.map((product, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${formatCurrency(product.price)}</td>
                <td class="${getStockClass(product.stock)}">${product.stock}</td>
                <td>
                    <div class="action-buttons">
                        <button class="edit-btn" onclick="editProduct(${product.id}, '${product.name}')">
                            ✏️ Edit
                        </button>
                        <button class="delete-btn" onclick="deleteProduct(${product.id}, this)">
                            🗑️ Delete
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
}

// ✅ AUTO INITIALIZE PAGES
document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on
    if (document.getElementById('loginForm')) {
        initLoginPage();
    }
    
    if (document.getElementById('summaryCards')) {
        initDashboard();
    }
    
    if (document.getElementById('productsTableBody')) {
        initProductsPage();
    }
});