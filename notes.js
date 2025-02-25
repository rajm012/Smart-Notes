document.addEventListener("DOMContentLoaded", () => {
    loadNotes();

    document.getElementById("downloadNotes").addEventListener("click", () => {
        chrome.storage.sync.get(["notes"], (data) => {
            const notes = data.notes || [];
            if (notes.length === 0) {
                alert("No notes to download!");
                return;
            }

            let text = "Smart Notes Saver - Downloaded Notes\n\n";
            notes.forEach((note, index) => {
                text += `Note ${index + 1}:\nOriginal: ${note.originalText}\nSummary: ${note.summary}\nSaved On: ${note.timestamp}\n\n`;
            });

            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "SavedNotes.txt";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    });
});

function loadNotes() {
    chrome.storage.sync.get(["notes"], (data) => {
        const notes = data.notes || [];
        const notesContainer = document.getElementById("notesList");

        if (notes.length === 0) {
            notesContainer.innerHTML = "<p>No saved notes yet.</p>";
            return;
        }

        notes.forEach((note) => {
            const noteDiv = document.createElement("div");
            noteDiv.classList.add("note-container");

            noteDiv.innerHTML = `
                <p><strong>Original:</strong> ${note.originalText}</p>
                <p><strong>Summary:</strong> ${note.summary}</p>
                <p><small>Saved On: ${note.timestamp}</small></p>
            `;

            notesContainer.appendChild(noteDiv);
        });
    });
}
