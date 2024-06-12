import mongoose from "mongoose"
const {Schema ,  model }   = mongoose ; 

const UserScheam = new Schema({
    email : {type : String }, 
    name : {type : String  },
    username : {type : String  , required : true },
    profilepic : {type : String    },
    createdAt : {type : Date , default : Date.now}, 
    updatedAt : {type : Date , default : Date.now}
})



export default mongoose.models.User || model("User"  , UserScheam); 