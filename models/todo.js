var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
});

var Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;