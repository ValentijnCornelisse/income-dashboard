<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Income Dashboard</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="header-content">
                <h1>💰 Income Dashboard</h1>
                <p>Track your sales and reach your income goals</p>
            </div>
        </header>

        <!-- Main Dashboard -->
        <main class="dashboard">
            <!-- Goals Section -->
            <section class="goals-section">
                <div class="goal-card target-card">
                    <div class="goal-header">
                        <h2>Target Goal</h2>
                        <button class="btn-icon" onclick="openTargetModal()">⚙️</button>
                    </div>
                    <div class="goal-amount" id="targetAmount">$0.00</div>
                    <p class="goal-label">Income Target</p>
                </div>

                <div class="goal-card current-card">
                    <div class="goal-header">
                        <h2>Remaining Goal</h2>
                    </div>
                    <div class="goal-amount remaining" id="remainingAmount">$0.00</div>
                    <p class="goal-label">Amount Left to Earn</p>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progressFill"></div>
                    </div>
                    <p class="progress-text" id="progressText">0%</p>
                </div>

                <div class="goal-card earned-card">
                    <div class="goal-header">
                        <h2>Total Earned</h2>
                    </div>
                    <div class="goal-amount earned" id="earnedAmount">$0.00</div>
                    <p class="goal-label">Sales This Period</p>
                </div>
            </section>

            <!-- Action Buttons -->
            <section class="actions-section">
                <button class="btn btn-primary" onclick="openAddSaleModal()">
                    ➕ Add Sale
                </button>
                <button class="btn btn-secondary" onclick="openTargetModal()">
                    🎯 Set Target
                </button>
                <button class="btn btn-danger" onclick="resetData()">
                    🔄 Reset All
                </button>
            </section>

            <!-- Sales History -->
            <section class="history-section">
                <h2>Sales History</h2>
                <div class="sales-list" id="salesList">
                    <p class="no-sales">No sales recorded yet. Add your first sale!</p>
                </div>
            </section>
        </main>
    </div>

    <!-- Modal: Set Target -->
    <div id="targetModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Set Income Target</h2>
                <span class="close" onclick="closeTargetModal()">&times;</span>
            </div>
            <div class="modal-body">
                <label for="targetInput">Target Amount ($)</label>
                <input type="number" id="targetInput" placeholder="Enter target amount" min="0" step="0.01">
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeTargetModal()">Cancel</button>
                <button class="btn btn-primary" onclick="saveTarget()">Save Target</button>
            </div>
        </div>
    </div>

    <!-- Modal: Add Sale -->
    <div id="saleModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add New Sale</h2>
                <span class="close" onclick="closeSaleModal()">&times;</span>
            </div>
            <div class="modal-body">
                <label for="saleAmount">Sale Amount ($)</label>
                <input type="number" id="saleAmount" placeholder="Enter sale amount" min="0" step="0.01">
                <label for="saleDescription">Description (Optional)</label>
                <input type="text" id="saleDescription" placeholder="e.g., Invoice #123">
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeSaleModal()">Cancel</button>
                <button class="btn btn-primary" onclick="addSale()">Add Sale</button>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
