import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env.ATLAS_URI || "";

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db; // Declare a variable to hold the database connection

async function connectDB() {
  if (!db) {
    try {
      // Connect the client to the server
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");

      // Set the db variable to your database name
      db = client.db("employees"); // Replace with your actual database name
    } catch (err) {
      console.error("Failed to connect to MongoDB:", err);
      throw err; // Re-throw the error to be handled by the caller
    }
  }

  return db; // Return the connected database instance
}

export default connectDB;
