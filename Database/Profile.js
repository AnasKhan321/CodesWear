import mongoose from "mongoose"
const {Schema ,  model }   = mongoose ; 

const ProfleSchema = new Schema({
    email : {type : String  , required : true , unique : true}, 
    firstName : {type : String  },
    lastName : {type : String  },
    Phone : {type : String  },
    City : {type : String  },
    State : {type : String  },
    Address : {type : String  },
    PinCode : {type : String  },
    createdAt : {type : Date , default : Date.now}, 
})



export default mongoose.models.Profile || model("Profile"  , ProfleSchema); 