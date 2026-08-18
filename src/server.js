const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const jobRoutes = require("./routes/job.routes");
const applicationRoutes = require("./routes/application.routes");
const paymentRoutes = require("./routes/payment.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const offerRoutes = require("./routes/offer.routes");
const interviewRoutes = require("./routes/interview.routes");
const statusRoutes = require("./routes/status.routes");
const collegeRoutes = require("./routes/college.routes");
const collegeAdminRoutes = require("./routes/collegeAdmin.routes");
const reportRoutes = require("./routes/report.routes");

const companyRoutes = require("./routes/company.routes");
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/applications", statusRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/college-admins", collegeAdminRoutes);
app.use("/api/colleges", reportRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Marketplace API Running 🚀"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});