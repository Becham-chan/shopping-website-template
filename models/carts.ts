import mongoose, {Schema} from "mongoose";

const CartSchema = new Schema (
    {
        customer:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"TestUsers",
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Products2",
        },
        list:{
            type:Object,
            required:true,
        },
    },
    {timestamps: true}
)

const Cart = mongoose.models.Carts || mongoose.model("Carts", CartSchema)
export default Cart;