import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.body;

    let client;
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
      const result = await db
        .collection("todos")
        .deleteOne({ _id: ObjectId(id) });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Deleting todo failed!" });
      return;
    }

    client.close();

    res.status(201).json({ message: "Successfully deleted todo!", id: id });
  }
}

export default handler;
