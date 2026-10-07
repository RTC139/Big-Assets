const cellContainer = document.getElementById('cell-container');
const numCells = 100;

for (let i = 0; i < numCells; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  const size = Math.random() * 30 + 10 + 'px';
  const posX = Math.random() * 100 + '%';
  const posY = Math.random() * 100 + '%';

  cell.style.width = size;
  cell.style.height = size;
  cell.style.top = posY;
  cell.style.left = posX;

  cellContainer.appendChild(cell);
}

// Theme switching functionality
const toggleSwitch = document.querySelector('#checkbox');
const currentTheme = localStorage.getItem('theme') || 'light';

// Check for saved theme preference or use OS preference
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Update toggle position if dark theme
  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
}

// Handle theme switch
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
}

// Listen for toggle changes
toggleSwitch.addEventListener('change', switchTheme, false);

function toggleCategory(element) {
  const allCategories = document.querySelectorAll('.category');
  allCategories.forEach(cat => cat.classList.remove('active'));
  element.classList.add('active');
}

function computePay() {
  const income = parseFloat(document.getElementById("income").value) || 0;
  const sss = parseFloat(document.getElementById("sss").value) || 0;
  const philhealth = parseFloat(document.getElementById("philhealth").value) || 0;
  const pagibig = parseFloat(document.getElementById("pagibig").value) || 0;
  const nonTaxable = parseFloat(document.getElementById("nonTaxable").value) || 0;

  // Calculate taxable income after deductions
  const taxableIncome = income - (sss + philhealth + pagibig + nonTaxable);
  
  // Convert monthly taxable income to annual for tax calculation
  const annualTaxableIncome = taxableIncome * 12;
  
  // Calculate tax based on Philippine tax brackets (TRAIN law)
  let annualTax = 0;
  if (annualTaxableIncome <= 250000) {
    annualTax = 0;
  } else if (annualTaxableIncome <= 400000) {
    // 20% of the excess over 250,000
    annualTax = (annualTaxableIncome - 250000) * 0.20;
  } else if (annualTaxableIncome <= 800000) {
    // 30,000 + 25% of the excess over 400,000
    annualTax = 30000 + (annualTaxableIncome - 400000) * 0.25;
  } else if (annualTaxableIncome <= 2000000) {
    // 130,000 + 30% of the excess over 800,000
    annualTax = 130000 + (annualTaxableIncome - 800000) * 0.30;
  } else if (annualTaxableIncome <= 8000000) {
    // 490,000 + 32% of the excess over 2,000,000
    annualTax = 490000 + (annualTaxableIncome - 2000000) * 0.32;
  } else {
    // 2,410,000 + 35% of the excess over 8,000,000
    annualTax = 2410000 + (annualTaxableIncome - 8000000) * 0.35;
  }
  
  // Convert annual tax to monthly tax
  const monthlyTax = annualTax / 12;
  
  // Calculate take-home pay
  const takeHomePay = income - (sss + philhealth + pagibig + monthlyTax);

  // Update the display
  document.getElementById("screenDisplay").innerText = '₱' + income.toFixed(2);
  document.getElementById("taxOwed").innerText = '₱' + monthlyTax.toFixed(2) + ' Tax Owed';
  document.getElementById("takeHomePay").innerText = '₱' + takeHomePay.toFixed(2) + ' Take-home Pay';

  updateGraph(income, monthlyTax, takeHomePay);
}

let chart;
function updateGraph(income, taxOwed, takeHomePay) {
  const ctx = document.getElementById('taxChart').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Income', 'Tax Owed', 'Take-home Pay'],
      datasets: [{
        label: 'Amount in PHP',
        data: [income, taxOwed, takeHomePay],
        backgroundColor: ['#ffcc00', '#ffb400', '#2a3547'],
        borderColor: ['#1d2633', '#1d2633', '#ffcc00'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '₱' + value.toLocaleString();
            }
          }
        }
      },
      maintainAspectRatio: false,
    }
  });
}