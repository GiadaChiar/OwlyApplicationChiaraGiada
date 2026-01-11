








import fetch from "node-fetch";

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const languageMap = {
    "en": "en",
    "it": "it",
    "fr": "fr",
    "es": "es"
};

app.post("/translate", async (req, res) => {
    const { text, target } = req.body;

    if (!text || !target) {
        return res.status(400).json({ error: "Testo o lingua mancante" });
    }

    const targetCode = languageMap[target] || "en";

    try {
        //const response = await fetch("https://libretranslate.de/translate", {
            const response = await fetch("https://translate.argosopentech.com/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                q: text,
                source: "auto",
                target: targetCode,
                format: "text"
            })
        });

        if (!response.ok) {
            throw new Error(`Errore LibreTranslate: ${response.status}`);
        }

        const data = await response.json();
        res.json({ translatedText: data.translatedText ?? text });

    } catch (error) {
        console.error("Errore traduzione:", error);
        res.json({ translatedText: text }); // fallback sicuro
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});





/*
import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // serve per Node.js

const app = express();

app.use(cors());
app.use(express.json());

const languageMap = {
    "en": "en",
    "it": "it",
    "fr": "fr",
    "es": "es"
};

app.post("/translate", async (req, res) => {
    const { text, target } = req.body;

    if (!text || !target) {
        return res.status(400).json({ error: "Testo o lingua mancante" });
    }

    const targetCode = languageMap[target] || "en";

    try {
        const response = await fetch("https://libretranslate.com/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                q: text,
                source: "en", // puoi anche usare "auto"
                target: targetCode,
                format: "text"
            })
        });

        if (!response.ok) throw new Error(`Errore LibreTranslate: ${response.status}`);

        const data = await response.json();
        res.json({ translatedText: data.translatedText ?? text });

    } catch (error) {
        console.error("Errore traduzione:", error);
        res.json({ translatedText: text });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
*/


/*
import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // importante per Node.js

const app = express();
app.use(cors());
app.use(express.json());

const languageMap = {
  "en": "en",
  "it": "it",
  "fr": "fr",
  "es": "es"
};

app.post("/translate", async (req, res) => {
  const { text, target } = req.body;
  if (!text || !target) return res.status(400).json({ error: "Testo o lingua mancante" });

  const targetCode = languageMap[target] || "en";

  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: targetCode,
        format: "text"
      })
    });

    if (!response.ok) throw new Error(`Errore LibreTranslate: ${response.status}`);
    const data = await response.json();

    res.json({ translatedText: data.translatedText ?? text });
  } catch (err) {
    console.error("Errore traduzione:", err);
    res.status(500).json({ translatedText: text, error: err.message });
  }
});

app.listen(3000, () => console.log("Server avviato su http://localhost:3000"));
*/