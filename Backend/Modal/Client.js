import mongoose from "mongoose";

const Clientschema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
})

const ClientModel = mongoose.model('Client', Clientschema);

export default ClientModel;