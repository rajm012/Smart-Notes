chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "summarizeText") {
        const apiKey = "AIzaSyDEpxmnU8CMO4Pf6Nmu12vwtgweCe2tI2k";  

        fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Summarize this text: ${message.text}` }] }]
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Gemini API Response:", data);

            if (data.candidates && data.candidates.length > 0) {
                const summary = data.candidates[0].content.parts[0].text;
                sendResponse({ summary });
            } else {
                sendResponse({ summary: "Error: Unexpected API response." });
            }
        })
        .catch(error => {
            console.error("Fetch Error:", error);
            sendResponse({ summary: "Error: Unable to reach Gemini API." });
        });

        return true; // Keeps response channel open for async response
    }
});
