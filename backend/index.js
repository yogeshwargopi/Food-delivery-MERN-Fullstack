const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

//mongodb connection

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

// model

const userModel = mongoose.model("user", userSchema);

//api
app.get("/", (req, res) => {
  res.send("server is run");
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  try {
    const result = await userModel.findOne({ email: email });
    //console.log(result);
    //console.log(err);
    if (result) {
      res.send({ message: "Email id is already registered", alert: false });
    } else {
      const data = new userModel(req.body);
      const save = await data.save();
      res.send({ message: "successfully sign up", alert: true });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  const result = await userModel.findOne({ email: email });
  if (result) {
    const datasend = {
      _id: result._id,
      firstName: result.firstname,
      lastName: result.lastname,
      email: result.email,
      image: result.image,
    };
    console.log(datasend);
    res.send({ message: "Login is successfull", alert: true, data: datasend });
  } else {
    res.send({
      message: "Email not available Signup",
      alert: false,
    });
  }
});

//product section

const SchemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

const productMOdel = mongoose.model("product", SchemaProduct);

//save product in data

app.post("/uploadProduct", async (req, res) => {
  console.log(req.body);
  const data = productMOdel(req.body);
  const datasave = await data.save();

  res.send({ message: "upload successfully" });
});

//product

app.get("/product", async (req, res) => {
  const data = await productMOdel.find({});
  res.send(JSON.stringify(data));
});

//server is ruuning

app.listen(PORT, () => console.log("server runn on port" + PORT));
