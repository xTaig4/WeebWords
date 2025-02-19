const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./anime_quotes.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS quotes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            anime TEXT NOT NULL,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            quote TEXT NOT NULL,
            image_url TEXT
        )
    `);
});

const cors = require("cors");
const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());  // Allow frontend to communicate with backend

// Set up storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Endpoint to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const fileUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
    res.json({ fileUrl });
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post("/add-quote", (req, res) => {
    const { anime, firstName, lastName, quote, img_url } = req.body;

    if (!anime || !firstName || !quote) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const sql = `INSERT INTO quotes (anime, firstName, lastName, quote, image_url) VALUES (?, ?, ?, ?, ?)`;
    const params = [anime, firstName, lastName, quote, img_url];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Quote added", id: this.lastID });
    });
});

// Fetch all quotes
app.get("/api/quotes", (req, res) => {
    db.all("SELECT * FROM quotes", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});