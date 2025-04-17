import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    //Array of products in the order
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    //Session ID for payment tracking
    sessionId: {
        type: String,
    },

    purchaseDate: {
        type: Date,
        default: Date.now,
    },

    address:{
        type: String,
        
    },
    //Total amount of the order
    totalAmount: {
        type: Number,
        required: true,
    },
    //Payment status of the order
    totalStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending',
    },
    //Shipping status of the order
    shippingStatus: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending', 
    }
},
{
    timestamps: true,
});
//exporting the order model
export default mongoose.model('Order', orderSchema);