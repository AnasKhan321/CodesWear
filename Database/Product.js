import mongoose from "mongoose"
const {Schema ,  model }   = mongoose ; 

const ProductSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Category : {
    type:String,
    required : true
  },

  imageurl : {
    type : String,
    required : true
  },
  availabelQty : {
    type: String  , 
    required : true,
  },
  price : {
    type: String,
    required : true
  },
  desc : {
    type : String , 
    required : true
  },
  Size: {
    type: [String], 
    default : []
  },
  Color: {
    type: [String],
    default : []
  }

 
});
export default mongoose.models.Product || model("Product"  , ProductSchema); 