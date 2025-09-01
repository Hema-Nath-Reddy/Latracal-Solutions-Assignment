import {
  MongoClient,
  ReturnDocument,
  ServerApiVersion,
  ObjectId,
} from "mongodb";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
let db;
async function connectToDB() {
  try {
    const uri = `mongodb+srv://hemanathreddyyeruva_db_user:AT28owsEuLuhgEKG@cluster0.05ss5ar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();

    db = client.db("webathon");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

const port = process.env.PORT || 3001;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  console.log("Connecting to MongoDB...");
  await connectToDB();
});
