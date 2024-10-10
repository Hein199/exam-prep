import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    }
}, { strict: false });

const Supplier = mongoose.models.Supplier || mongoose.model("Supplier", SupplierSchema);

export default Supplier;
