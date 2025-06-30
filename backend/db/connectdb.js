

import mongoose from "mongoose"

const connectdb = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to db successfully" , res.connection.host)
    } catch (e) {
        console.log("Error while conencting to db" , e);
        process.exit(1);
    }
}

export default connectdb;