import mongoose from "mongoose";

const parentSchema = new mongoose.Schema({
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: String,
        email: String,
        cellphone_number: String
})

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    cellphone_number: String,
    hipersensibility_description: String,
    parents_control: [parentSchema]
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User