const { default: mongoose } = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name required!"],
    },
    email: {
        type: String,
        required: [true, "email required!"],
        lowercase: true,
        match: [/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/, "Invalid email!"],
    },
    subject: {
        type: String,
        required: [true, "subject required!"],
        minlength: [5, "subject must be atleast 5 characters!"]
    },
    message: {
        type: String,
        required: [true, "message required!"],
        minlength: [10, "message must be atleast 5 characters!"]
    }
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact;