const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const marketingRoutes = require("./src/routes/marketingRoutes");
const penjualanRoutes = require("./src/routes/penjualanRoutes");
const hasilPerhitunganRoutes = require("./src/routes/hasilPerhitunganRoutes");

app.use(express.json());

app.use("/api/marketings", marketingRoutes);
app.use("/api/penjualans", penjualanRoutes);
app.use("/api/hasil", hasilPerhitunganRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
