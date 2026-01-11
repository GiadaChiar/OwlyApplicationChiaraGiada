import fetch from "node-fetch";

async function testTranslation() {
    try {
        const response = await fetch("https://libretranslate.com/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        q: "This is my full life, I want something more",
        source: "auto",
        target: "fr",
        format: "text"
    })
});

        const data = await response.json();
        console.log("Traduzione:", data.translatedText);

    } catch (err) {
        console.error("Errore:", err);
    }
}

testTranslation();
