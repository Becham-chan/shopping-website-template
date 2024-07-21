import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema (
    {
        firstname:{
            type: String,
            required: true
        },
        lastname:{
            type: String,
            required: true
        },
        username:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
        },
        id:{
            type: String,
            required: true,
        },
        address:{
            type: String,
            required : true
        },
        password:{
            type:String,
            required: true,
        },
        role:{
            type: String,
            default: "Member"
        }

    },
    {timestamps:true}, 
)

const User = mongoose.models.TestUsers || mongoose.model("TestUsers", UserSchema)
export default User