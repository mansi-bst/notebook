const {default:mongoose}=require('mongoose')
const noteSchema=new mongoose.Schema({
    title:{
        type:String,
         required: [true, "title required!"],
        minlength:[ 5, "title must be atleast 5 characters!"]
    },
    description:{
        type:String,
         required: [true, "description required!"],
        minlength:[ 5, "title must be atleast 10 characters!"]
    },
    tag:[String],
    image:{
        type:String,
        default:''
    },
    isPrivate:{
        type:Boolean,
        default:true
    },
    createdBy:{
        require:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})


const Note = mongoose.model("Note", noteSchema)

module.exports = Note;