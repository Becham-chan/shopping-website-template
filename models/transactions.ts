import mongoose, {Schema} from "mongoose";

const TransactionSchema = new Schema (
    {
        customer:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"TestUsers",
        },
        list:{
            type:Object,
            required:true,
        },
        total:{
            type:Number,
            required:true,
        },
        user_approve:{
            type:Boolean,
            default:false,
        },
        store_approve:{
            type:Boolean,
            default:false,
        },
    },
    {timestamps: true}
)

const Transaction = mongoose.models.Transactions || mongoose.model("Transactions", TransactionSchema)
export default Transaction;