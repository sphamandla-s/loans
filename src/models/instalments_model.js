import mongoose from "mongoose";

const installmentsSchema = mongoose.Schema({
    emi: {
        type : Number,
        required : true
    },
    outstanding : Number,
    interest: Number,
    principal: Number,
});

const Instalment = mongoose.model('Instalment', installmentsSchema);

export default Instalment;