import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check (very important for Render)
app.get("/", (req, res) => {
  res.json({
    status: "online",
    service: "ShadowX Backend",
  });
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.json({ reply: "No message received." });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are ShadowX AI, calm and helpful." },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content || "No response from AI.";

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.json({ reply: "ShadowX is offline right now." });
  }
});

// 🚨 THIS IS THE FIX THAT SAVES YOU
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("ShadowX backend running on port", PORT);
});
