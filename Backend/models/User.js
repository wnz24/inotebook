import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
 name: {
    type: String,
    required : true,
    
},
Email: {
    type: String,
    required : true,
    unique: true

},
Passwor:{
    type: String,
    required : true
},
Date: {
    type: String,
default: Date.now,

}
}
);
module.exports= mongoose.model('user', UserSchema);