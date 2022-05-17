import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "GET") {
    let client;
    let result;
    const connectionString =
      "mongodb+srv://testing:5sqICjKxolt4GXMc@cluster0.1be7k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db = client.db();

    try {
      result = await db.collection("todos").find().toArray();
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Fetching todos failed!" });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: "Successfully fetched todos!", items: result });
  }
}

export default handler;
