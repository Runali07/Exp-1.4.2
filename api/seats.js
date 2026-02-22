import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("test");
    const seatsCollection = db.collection("seats");
    const count = await seatsCollection.countDocuments();
    if (count === 0) {
      const seats = [];
      for (let i = 1; i <= 20; i++) {
        seats.push({ seatNo: i, booked: false });
      }
      await seatsCollection.insertMany(seats);
    }
    const seats = await seatsCollection.find({}).toArray();
    await client.close();
    res.status(200).json(seats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}