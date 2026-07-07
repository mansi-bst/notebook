const {default:mongoose}=require('mongoose')
const profileschema=new mongoose.Schema({
    
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        lowercase:true,
        unique:true,
        require:true,
        match:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
    },
     phone: {
      type: Number,
      match: /[+][9][1]-[7-9]\d{9}/,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    age: {
      type: Number,
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female", ""],
      default: "",
    },
    avatar: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    pincode: {
      type: String,
      default: null,
    },
},{timestamps:true
})
const Profile=mongoose.model('profile',profileschema)
exports.default=Profile;