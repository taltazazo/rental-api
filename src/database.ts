import * as mongoose from "mongoose";

const uri = process.env.DB_URI || `mongodb://127.0.0.1:27017/di_db`;

export const connect = async () => mongoose.connect(uri);

export default mongoose;
