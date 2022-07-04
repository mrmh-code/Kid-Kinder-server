const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const cors = require("cors");

const app = express();
const port =process.env.PORT||  5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nq0twuc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("KidKinder");
    const ClassesCollection = database.collection("classes");
    const TeacherCollection = database.collection("teacher");
    const BlogCollection = database.collection("blog");
    const GalleryCollection = database.collection("gallery");
    const StudentsCollection = database.collection("students");

    app.get("/classes", async (req, res) => {
      const cursor = ClassesCollection.find({});
      const ClassData = await cursor.toArray();

      res.send(ClassData);
    });

    app.get("/teacher", async (req, res) => {
      const cursor = TeacherCollection.find({});
      const TeacherData = await cursor.toArray();

      res.send(TeacherData);
    });

    app.get("/blog", async (req, res) => {
      const cursor = BlogCollection.find({});
      const BlogData = await cursor.toArray();

      res.send(BlogData);
    });

    app.get("/gallery", async (req, res) => {
      const cursor = GalleryCollection.find({});
      const galleryData = await cursor.toArray();

      res.send(galleryData);
    });

    app.get("/students", async (req, res) => {
      const cursor = StudentsCollection.find({});
      const StudentsData = await cursor.toArray();

      res.send(StudentsData);
    });

    app.post("/students", async (req, res) => {
      const newUser = req.body;
      const result = await StudentsCollection.insertOne(newUser);
      console.log("got new user", req.body);
      console.log("Add new User", result);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("KidKinder server is running ....");
});

app.listen(port, (req, res) => {
  console.log("listen to port ", port);
});
