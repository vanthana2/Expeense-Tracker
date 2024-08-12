let balance = 12560.00;
const expenseList = document.getElementById('expense-list');
const reminderList = document.getElementById('reminder-list');
const balanceElement = document.getElementById('balance');
const expenseChartCtx = document.getElementById('expenseChart').getContext('2d');
const statisticsChartCtx = document.getElementById('statisticsChart').getContext('2d');

document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();
    addExpense();
});

document.getElementById('reminder-form').addEventListener('submit', function(event) {
    event.preventDefault();
    addReminder();
});

function addExpense() {
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (name && amount) {
        const li = document.createElement('li');
        li.innerHTML = `${name} <span>₹${amount.toFixed(2)}</span>`;
        expenseList.appendChild(li);

        balance -= amount;
        balanceElement.textContent = balance.toFixed(2);

        document.getElementById('expense-name').value = '';
        document.getElementById('expense-amount').value = '';

        updateCharts();
    }
}

function addReminder() {
    const date = document.getElementById('reminder-date').value;
    const description = document.getElementById('reminder-description').value;

    if (date && description) {
        const li = document.createElement('li');
        li.innerHTML = `${date} <span>${description}</span>`;
        reminderList.appendChild(li);

        document.getElementById('reminder-date').value = '';
        document.getElementById('reminder-description').value = '';
    }
}

function updateCharts() {
    // Example data for charts, replace with actual data
    const expenseData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Expenses',
            data: [1200, 1500, 1000, 1800, 1300, 1600, 1900, 1400, 1700, 1500, 1300, 1100],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const statisticsData = {
        labels: ['Shopping', 'Food', 'Education', 'Bills'],
        datasets: [{
            label: 'Expenses by Category',
            data: [5000, 3000, 2000, 4000],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
    };

    const expenseChart = new Chart(expenseChartCtx, {
        type: 'line',
        data: expenseData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const statisticsChart = new Chart(statisticsChartCtx, {
        type: 'doughnut',
        data: statisticsData,
        options: {
            responsive: true
        }
    });
}

// Initialize charts
updateCharts();
