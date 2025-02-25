document.addEventListener("DOMContentLoaded", () => {
    const saveButton = document.getElementById("saveNote");
    const summarizeAndSaveButton = document.getElementById("summarizeAndSave");
    const textInput = document.getElementById("noteText");
    const summaryBox = document.getElementById("summaryResult");

    // Save without summarizing
    saveButton.addEventListener("click", () => {
        const text = textInput.value.trim();
        if (text) {
            saveNote(text, "No Summary");  // Saves only original text
            alert("Note saved successfully!");
            textInput.value = "";
        } else {
            alert("Please enter some text.");
        }
    });

    // Summarize & Save
    summarizeAndSaveButton.addEventListener("click", () => {
        const text = textInput.value.trim();
        if (text) {
            chrome.runtime.sendMessage({ action: "summarizeText", text }, (response) => {
                if (response && response.summary) {
                    summaryBox.innerText = response.summary;
                    saveNote(text, response.summary);
                    alert("Summary saved successfully!");
                    textInput.value = "";
                } else {
                    alert("Failed to generate summary.");
                }
            });
        } else {
            alert("Please enter some text.");
        }
    });

    // Open saved notes page
    document.getElementById("viewNotes").addEventListener("click", () => {
        chrome.tabs.create({ url: "notes.html" });
    });

    // Save note to Chrome Storage
    function saveNote(originalText, summary) {
        chrome.storage.sync.get(["notes"], (data) => {
            let notes = data.notes || [];
            notes.push({ originalText, summary, timestamp: new Date().toLocaleString() });

            chrome.storage.sync.set({ notes }, () => {
                console.log("Note saved!");
            });
        });
    }
});
