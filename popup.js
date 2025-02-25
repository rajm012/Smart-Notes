document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.getElementById("saveNote");
    const summarizeButton = document.getElementById("summarizeSave");
    const textInput = document.getElementById("noteInput");
    const categorySelect = document.getElementById("category");
    const darkModeToggle = document.getElementById("darkModeToggle");

    // Dark Mode Preference
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    }

    //  Dark Mode
    darkModeToggle.addEventListener("change", function () {
        document.body.classList.toggle("dark-mode", darkModeToggle.checked);
        localStorage.setItem("darkMode", darkModeToggle.checked);
    });


    saveButton.addEventListener("click", function () {
        const text = textInput.value.trim();
        const category = categorySelect.value;

        if (text) {
            chrome.storage.sync.get(["notes"], function (data) {
                let notes = data.notes || [];
                notes.push({ text, category, summary: null, timestamp: new Date().toLocaleString() });
                chrome.storage.sync.set({ notes }, function () {
                    alert("Note saved successfully!");
                    textInput.value = "";
                });
            });
        } else {
            alert("Please enter some text.");
        }
    });

    summarizeButton.addEventListener("click", function () {
        const text = textInput.value.trim();
        const category = categorySelect.value;

        if (!text) {
            alert("Please enter text to summarize.");
            return;
        }

        fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDEpxmnU8CMO4Pf6Nmu12vwtgweCe2tI2k", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Summarize this text: ${text}` }] }]
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.candidates && data.candidates.length > 0) {
                const summary = data.candidates[0].content.parts[0].text;

                chrome.storage.sync.get(["notes"], function (data) {
                    let notes = data.notes || [];
                    notes.push({ text, category, summary, timestamp: new Date().toLocaleString() });

                    chrome.storage.sync.set({ notes }, function () {
                        alert("Summarized & saved successfully!");
                        textInput.value = "";
                    });
                });
            } else {
                alert("Error: AI summarization failed.");
            }
        })
        .catch(error => {
            console.error("Fetch Error:", error);
            alert("Error: Unable to reach Gemini API.");
        });
    });

    document.getElementById("viewNotes").addEventListener("click", function () {
        chrome.tabs.create({ url: "notes.html" });
    });
});
