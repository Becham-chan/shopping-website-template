import mongoose, {Schema} from "mongoose";

const ProductSchema = new Schema (
    {
        name:{
            type: String,
            required: true
        },
        brand:{
            type: String,
            required: true
        },
        producer:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
        },
        price:{
            type: Number,
            required : true
        },
        editor:{
            type : mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "TestUsers"
        },

    },
    {timestamps:true}, 
)

const Product = mongoose.models.Products2 || mongoose.model("Products2", ProductSchema)
export default Product