import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, updatedTitle, updatedStatus } = req.body;

    let updatedTodo = {
      id: id,
    };
    if (updatedStatus) {
      updatedTodo.status = updatedStatus;
    } else {
      updatedTodo.title = updatedTitle;
    }

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
      if (updatedStatus) {
        const result = await db
          .collection("todos")
          .updateOne(
            { _id: ObjectId(id) },
            { $set: { status: updatedStatus } }
          );
      } else {
        const result = await db
          .collection("todos")
          .updateOne({ _id: ObjectId(id) }, { $set: { title: updatedTitle } });
      }
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Updating todo failed!" });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: "Successfully updated todo!", todo: updatedTodo });
  }
}

export default handler;
