const mongoose =  require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type : String,
        required : true
    },
    email: {
        type: String,
        requried : true
    },
    password: {
        type: Schema.Types.Mixed,
        required: true
    }
});

const User = mongoose.model('User', userSchema)

module.exports = User;