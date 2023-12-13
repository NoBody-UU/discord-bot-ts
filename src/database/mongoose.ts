import mongoose from "mongoose";
import "dotenv/config";


export default async function () {
  if (!process.env.MongoURI) throw new Error("Mongo URI not provided");
  await mongoose.connect(process.env.MongoURI, {
    dbName: process.env.DBName,
  });
}

export const schemas = {}

