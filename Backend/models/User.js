const mongoose= require ('mongoose');
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
Password:{
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