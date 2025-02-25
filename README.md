# 📌 **Smart Notes Saver - Chrome Extension**  

🚀 **Smart Notes Saver** is a powerful and lightweight Chrome extension that lets you **save, categorize, and summarize text snippets from any webpage**. It also comes with a **Dark Mode Toggle** and the ability to **download saved notes** as a text file.

---

## 📜 **Features**  
✔ **Save Notes** with categories (`General`, `Work`, `Personal`)(You can add yours too)  
✔ **Summarize & Save** text snippets using **Google Gemini AI**  
✔ **Dark Mode Toggle** for a better UI experience  
✔ **View Saved Notes** on a separate page  
✔ **Download Notes** as a `.txt` file  

---

## 📥 **Installation Guide**  
1. **Download the Repository**  
   - Click on **Code > Download ZIP** or clone it using:  
     ```sh
     git clone https://github.com/rajm012/quick-notes.git
     ```
   - Extract the ZIP file to your computer.

2. **Load the Extension in Chrome**  
   - Open `chrome://extensions/` in Google Chrome.  
   - Enable **Developer Mode** (toggle at the top-right).  
   - Click **Load Unpacked** and select the extracted project folder.  
   - The extension is now installed! 🎉  

---

## 🎮 **How to Use the Extension**  
### **1️⃣ Save Notes**  
1. Select or enter the text you want to save.  
2. Choose a **category** (`General`, `Work`, `Personal`).  
3. Click **"Save Note"** – your note is now saved!  

### **2️⃣ Summarize & Save with AI**  
1. Select or enter a text snippet.  
2. Click **"Summarize & Save"** – AI generates a concise summary.  
3. The **original text and summary** are saved together.  

### **3️⃣ View and Download Saved Notes**  
1. Click **"View Saved Notes"** to see all notes.  
2. Click **"Download Notes"** to save them as a `.txt` file.  

### **4️⃣ Enable Dark Mode**  
1. Toggle the **Dark Mode switch** to reduce eye strain.  
2. The preference is saved automatically.  

---

## ⚡ **API Setup (Google Gemini AI)**  
To use the **Summarize & Save** feature, you need a **Google Gemini API Key**:  
1. Go to **[Google AI Studio](https://aistudio.google.com)**.  
2. Generate an API Key.  
3. Open `popup.js` and replace:  
   ```js
   const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";
   ```
4. Save the file and **reload the extension**.

---

## 🛠 **Project Structure**  
```
📂 smart-notes-saver/
│── 📜 manifest.json       # Chrome Extension Manifest (Permissions & CSP)
│── 📜 popup.html          # Extension UI (Popup Window)
│── 📜 popup.js            # Handles Note Saving, Dark Mode & Summarization
│── 📜 popup.css           # Styles for Popup UI
│── 📜 notes.html          # Saved Notes Viewer
│── 📜 notes.js            # Handles Notes Display & Download
│── 📜 background.js       # Background Script (Handles AI Requests)
│── 📜 README.md           # Documentation (You’re Here!)
└── 📂 libs/
    ├── firebase-app.js       # Firebase Core (Future Login Implementation)
    ├── firebase-auth.js      # Firebase Authentication (Future)
    ├── firebase-firestore.js # Firebase Database (Future)
```

---

## 🛠 **Tech Stack**  
✅ **JavaScript (Vanilla JS)** – Handles core functionalities  
✅ **Chrome Storage API** – Stores notes locally  
✅ **Google Gemini API** – Summarizes text snippets  
✅ **HTML/CSS** – User interface & styling  

---

## 🎯 **Upcoming Features**  
🔹 **Login & Sync Notes with Firebase** (Multi-device support)  
🔹 **Google Drive Integration** (Save notes to Google Drive)  
🔹 **Custom Note Tags** (More organization options)  
🔹 **Export Notes as PDF/CSV**  

---

## 📜 **License**  
This project is licensed under the **MIT License**. You are free to use, modify, and distribute it.  

---
  
🚀 **Enjoy using Smart Notes Saver!** If you have any feedback, feel free to contribute. 😊