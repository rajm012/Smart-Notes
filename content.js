chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "summarize") {
        chrome.storage.local.get("openai_api_key", (data) => {
            const apiKey = data.openai_api_key;
            if (!apiKey) {
                alert("Please set the OpenAI API key in the extension options.");
                return;
            }

            fetch("https://api.openai.com/v1/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    prompt: `Summarize the following text:\n\n"${request.text}"`,
                    max_tokens: 50
                })
            })
            .then(response => response.json())
            .then(data => {
                const summary = data.choices[0]?.text?.trim() || "Summary unavailable.";
                chrome.storage.local.get({ notes: [] }, (store) => {
                    const newNote = { text: request.text, summary, category: "Uncategorized" };
                    const notes = [...store.notes, newNote];
                    chrome.storage.local.set({ notes });
                    alert("Summary saved successfully!");
                });
            })
            .catch(error => console.error("API Request Failed:", error));
        });
    }

    if (request.action === "save") {
        chrome.storage.local.get({ notes: [] }, (store) => {
            const newNote = { text: request.text, summary: "", category: "Uncategorized" };
            const notes = [...store.notes, newNote];
            chrome.storage.local.set({ notes });
            alert("Note saved successfully!");
        });
    }
});
