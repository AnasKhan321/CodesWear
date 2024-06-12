import mongoose from "mongoose"
const ConnectToMongo = async()=>{
	  await mongoose.connect('mongodb://127.0.0.1:27017/CodesWear2');
}

module.exports = ConnectToMongo; 