import express from "express";
import cors from "cors";
import { User } from "./models/Users.js";

const app = express();

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Server is working");
// });

app.post("/createuser", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// get users
app.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/getUser/:id", async (req, res) => {
  try {
    const id = req.params.id
    const users = await User.findById({_id:id});

    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});


app.put("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
      },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
export default app;