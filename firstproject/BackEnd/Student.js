const mongoose = require('mongoose');

const schema = mongoose.Schema(
{
    Name : String,
    RollNo : Number,
    Enrollment : Number,
    Password : String,
    Att : [{
        Date : String,
        Pre : Boolean
    }]
}
);
module.exports = mongoose.model("Student",schema);