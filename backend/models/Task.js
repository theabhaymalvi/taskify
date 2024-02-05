const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    userId:
    {
        type: Schema.Types.ObjectId,
        required: true
    },
    title:
    {
        type: String,
        required: [true, "Title is required!"],
        validate: {
            validator: value => {
                if (value.length < 3 || value.length > 20)
                return false;
                else
                return true;
            },
            message: value => {
                if(value.length < 3)
                return `Title length must be atleast 3`;
                else if(value.length > 20)
                return `Title length must be atmost 20`;
            }
        }
    },
    dueDate:
    {
        type: String,
        // required: [true, "Date is required"]
    },
    dueTime:
    {
        type: String,
        // required: [false, "Time is required"]
    },
    description:
    {
        type: String,
    },
    important:
    {
        type: Boolean,
        required: true
    },
    urgent:
    {
        type: Boolean,
        required: true
    },
    completed:
    {
        type: Boolean,
        required: false,
        default: false,
    }
});

module.exports = mongoose.model("task", taskSchema);