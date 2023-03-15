const loanAmount = 1000000;
const interestRate = 10/100/12; // monthly interest rate
const paymentPeriod = 18;
const emi = calculateEMI(loanAmount, interestRate, paymentPeriod);

let openingBalance = loanAmount;
let totalInterestPaid = 0;
let totalPrincipalPaid = 0;

console.log("Month | Opening Balance | EMI | Interest | Principal | Closing Balance");

for (let i = 1; i <= paymentPeriod; i++) {
  const interest = openingBalance * interestRate;
  const principal = emi - interest;
  const closingBalance = openingBalance - principal;
  
  totalInterestPaid += interest;
  totalPrincipalPaid += principal;
  
  console.log(`${i} | ${openingBalance.toFixed(2)} | ${emi.toFixed(2)} | ${interest.toFixed(2)} | ${principal.toFixed(2)} | ${closingBalance.toFixed(2)}`);
  
  openingBalance = closingBalance;
}

console.log(`Total Interest Paid: ${totalInterestPaid.toFixed(2)}`);
console.log(`Total Principal Paid: ${totalPrincipalPaid.toFixed(2)}`);
console.log(`Outstanding Balance: ${openingBalance.toFixed(2)}`);

// Helper function to calculate the EMI using reducing balance method formula
function calculateEMI(loanAmount, interestRate, paymentPeriod) {
  const r = 1 + interestRate;
  const n = paymentPeriod;
  const p = loanAmount;
  
  return p * interestRate * Math.pow(r, n) / (Math.pow(r, n) - 1);
}


