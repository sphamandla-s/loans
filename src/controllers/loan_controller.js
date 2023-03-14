import Loan from "../models/loan_model.js";
import Instalment from "../models/instalments_model.js";

// Helper function to calculate the EMI using reducing balance method formula
function calculateEMI(loanAmount, interestRate, paymentPeriod) {
    const r = 1 + interestRate;
    const n = paymentPeriod;
    const p = loanAmount;
    
    return p * interestRate * Math.pow(r, n) / (Math.pow(r, n) - 1);
  }



export const takeLoan = async (req, res) => {

    try {

        const { userId, balance } = req.body;
        // const loansdd = await Loan.deleteMany({})
        // const loansddf = await Instalment.deleteMany({})
        const loans = await Loan.find({ userId })


        if (loans.length === 0 || loans[0].balance === 0) {

            const emiCal = calculateEMI(balance, 10/100/12, 18)
        
            const newInstallment = new Instalment({
                emi :  emiCal.toFixed(3)
            })

            await newInstallment.save();
            const instalment = await Instalment.find();

            const newLoan = new Loan({
                userId,
                balance,
                installments: instalment
            });
            await newLoan.save();
            const loan = await Loan.find();
            return res.status(201).json(loan);
        }


        res.status(400).json({ msg: "You have an outstanding balance on your previous loan" });

    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}


export const viewLoan = async (req, res) => {
    try {
        const { userId } = req.query;
        const loan = await Loan.find({ userId })
        res.status(200).json(loan[0].Installments)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


export const makePayments = async (req, res) => {
    try {

        {}
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}