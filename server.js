import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

// load pass.env instead of .env
dotenv.config({ path: "./pass.env" });

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                "You are ShadowX AI. Chill, intelligent, human-like. Keep replies concise unless asked."
            },
            {
              role: "user",
              content: userMessage
            }
          ]
        })
      }
    );

    const data = await groqResponse.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      "ShadowX couldn't generate a reply.";

    res.json({ reply });
  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`ShadowX backend running on http://localhost:${PORT}`);
});