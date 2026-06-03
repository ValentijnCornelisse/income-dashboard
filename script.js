// Data Management
const DATA_FILE = 'data.json';

// Initialize data from localStorage or create default
function initializeData() {
    if (!localStorage.getItem('dashboardData')) {
        const defaultData = {
            target: 0,
            sales: [],
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('dashboardData', JSON.stringify(defaultData));
    }
}

function getData() {
    initializeData();
    return JSON.parse(localStorage.getItem('dashboardData'));
}

function saveData(data) {
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem('dashboardData', JSON.stringify(data));
    updateDisplay();
}

// Update Display
function updateDisplay() {
    const data = getData();
    
    // Update target
    document.getElementById('targetAmount').textContent = formatCurrency(data.target);
    
    // Calculate totals
    const totalEarned = data.sales.reduce((sum, sale) => sum + sale.amount, 0);
    const remaining = Math.max(0, data.target - totalEarned);
    
    // Update remaining and earned
    document.getElementById('remainingAmount').textContent = formatCurrency(remaining);
    document.getElementById('earnedAmount').textContent = formatCurrency(totalEarned);
    
    // Update progress bar
    const progressPercent = data.target > 0 ? (totalEarned / data.target) * 100 : 0;
    const progressFill = Math.min(progressPercent, 100);
    document.getElementById('progressFill').style.width = progressFill + '%';
    document.getElementById('progressText').textContent = Math.round(progressFill) + '%';
    
    // Update sales list
    updateSalesList(data.sales);
}

function updateSalesList(sales) {
    const salesList = document.getElementById('salesList');
    
    if (sales.length === 0) {
        salesList.innerHTML = '<p class="no-sales">No sales recorded yet. Add your first sale!</p>';
        return;
    }
    
    // Sort sales by date (newest first)
    const sortedSales = [...sales].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    salesList.innerHTML = sortedSales.map((sale, index) => `
        <div class="sale-item">
            <div class="sale-info">
                <div class="sale-description">${sale.description || 'Sale'}</div>
                <div class="sale-date">${formatDate(new Date(sale.date))}</div>
            </div>
            <div class="sale-amount">+${formatCurrency(sale.amount)}</div>
            <button class="sale-delete" onclick="deleteSale(${sales.length - 1 - index})">Delete</button>
        </div>
    `).join('');
}

// Modal Functions
function openTargetModal() {
    const data = getData();
    document.getElementById('targetInput').value = data.target || '';
    document.getElementById('targetModal').style.display = 'block';
    document.getElementById('targetInput').focus();
}

function closeTargetModal() {
    document.getElementById('targetModal').style.display = 'none';
}

function openAddSaleModal() {
    document.getElementById('saleAmount').value = '';
    document.getElementById('saleDescription').value = '';
    document.getElementById('saleModal').style.display = 'block';
    document.getElementById('saleAmount').focus();
}

function closeSaleModal() {
    document.getElementById('saleModal').style.display = 'none';
}

// Save Target
function saveTarget() {
    const targetInput = document.getElementById('targetInput').value;
    
    if (!targetInput || parseFloat(targetInput) < 0) {
        alert('Please enter a valid target amount');
        return;
    }
    
    const data = getData();
    data.target = parseFloat(targetInput);
    saveData(data);
    closeTargetModal();
}

// Add Sale
function addSale() {
    const amount = document.getElementById('saleAmount').value;
    const description = document.getElementById('saleDescription').value;
    
    if (!amount || parseFloat(amount) <= 0) {
        alert('Please enter a valid sale amount');
        return;
    }
    
    const data = getData();
    const sale = {
        amount: parseFloat(amount),
        description: description || 'Sale',
        date: new Date().toISOString()
    };
    
    data.sales.push(sale);
    saveData(data);
    closeSaleModal();
    
    // Show success message
    showNotification('Sale added successfully!');
}

// Delete Sale
function deleteSale(index) {
    if (confirm('Are you sure you want to delete this sale?')) {
        const data = getData();
        // Reverse the index because we display newest first
        const actualIndex = data.sales.length - 1 - index;
        data.sales.splice(actualIndex, 1);
        saveData(data);
        showNotification('Sale deleted');
    }
}

// Reset Data
function resetData() {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
        localStorage.removeItem('dashboardData');
        initializeData();
        updateDisplay();
        showNotification('All data has been reset');
    }
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #48BF84;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const targetModal = document.getElementById('targetModal');
    const saleModal = document.getElementById('saleModal');
    
    if (event.target === targetModal) {
        targetModal.style.display = 'none';
    }
    if (event.target === saleModal) {
        saleModal.style.display = 'none';
    }
};

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.getElementById('targetModal').style.display = 'none';
        document.getElementById('saleModal').style.display = 'none';
    }
    if (event.key === 'Enter') {
        if (document.getElementById('targetModal').style.display === 'block') {
            saveTarget();
        } else if (document.getElementById('saleModal').style.display === 'block') {
            addSale();
        }
    }
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    updateDisplay();
});
