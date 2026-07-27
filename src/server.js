const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const companyRoutes = require("./routes/company.routes");
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/company", companyRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Marketplace API Running 🚀"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});