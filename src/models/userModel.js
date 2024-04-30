import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const { Schema } = mongoose;
const collections = "users"

const SchemaDB = new Schema ({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    number: Number,
    role: String,
    password: String,
    cart: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "product",
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
})


SchemaDB.plugin(mongoosePaginate)

const userModel = mongoose.model(collections, SchemaDB)

export default userModel