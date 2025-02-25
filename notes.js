document.addEventListener("DOMContentLoaded", function () {
    loadNotes();

    document.getElementById("downloadNotes").addEventListener("click", function () {
        chrome.storage.sync.get(["notes"], function (data) {
            const notes = data.notes || [];
            if (notes.length === 0) {
                alert("No notes to download!");
                return;
            }

            let text = "Saved Notes\n\n";
            notes.forEach((note, index) => {
                text += `Note ${index + 1}:\nCategory: ${note.category}\nText: ${note.text}\nSaved On: ${note.timestamp}\n\n`;
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
    chrome.storage.sync.get(["notes"], function (data) {
        const notes = data.notes || [];
        const notesContainer = document.getElementById("notesList");

        if (notes.length === 0) {
            notesContainer.innerHTML = "<p>No saved notes yet.</p>";
            return;
        }

        notes.forEach((note) => {
            const noteDiv = document.createElement("div");
            noteDiv.classList.add("note-container");
            noteDiv.innerHTML = `<p><strong>${note.category}:</strong> ${note.text} <br><small>Saved On: ${note.timestamp}</small></p>`;
            notesContainer.appendChild(noteDiv);
        });
    });
}
