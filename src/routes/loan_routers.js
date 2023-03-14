import express from "express";
const loanRouters = express.Router()

loanRouters.get('/', (req, res)=>{
    res.send('Im working')
})


export default loanRouters;