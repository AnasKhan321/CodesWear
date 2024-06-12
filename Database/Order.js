import mongoose from "mongoose"
const {Schema ,  model }   = mongoose ; 

const OrderSchema = new Schema({
    shippingAddress : {
        type : Object , 
        default : {}
    },
    orderitem : {
        type : Object , 
        default : {}
    },
    useremail : {
        type : String , 
        required : true 
    },
    placedAt : {type : Date , default : Date.now}, 
})



export default mongoose.models.Order || model("Order"  , OrderSchema); 