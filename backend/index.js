const express = require("express");
const { configDotenv } = require("dotenv");
const connectToDB = require("./db.config");
configDotenv();
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route")
const orderRouter = require("./routes/order.route")
const cors = require("cors")



const app = express();

app.use(express.json())
app.use(cors())

app.use("/api",userRouter)
app.use("/api",productRouter)
app.use("/api",orderRouter)


app.get("/", (req, res) => {
  res.json({ msg: "Server is running..." });
});

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
  connectToDB();
});
