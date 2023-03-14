import express from "express";
import { takeLoan, viewLoan } from "../controllers/loan_controller.js";
const loanRouters = express.Router()

loanRouters.post('/take', takeLoan);
loanRouters.get('/view', viewLoan);



export default loanRouters;