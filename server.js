import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ ROOT ROUTE (THIS IS THE KEY)
app.get("/", (req, res) => {
  res.status(200).send("ShadowX Backend is running ⚡");
});

// example API route
app.post("/chat", async (req, res) => {
  res.json({ reply: "ShadowX online ⚡" });
});

// ✅ MUST listen like this
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});