// src/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

// Inisialisasi dotenv
dotenv.config();

// Inisialisasi Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve file statis dari folder 'public'
app.use(express.static(path.join(__dirname, '..', 'public')));

// Import routes
const articlesRoutes = require('./routes/articles');
const beritaRoutes = require('./routes/berita');
const materiRoutes = require('./routes/materi');
const videosRoutes = require('./routes/videos'); // Jika sudah membuat

// Gunakan routes
app.use('/api/articles', articlesRoutes);
app.use('/api/berita', beritaRoutes);
app.use('/api/materi', materiRoutes);
app.use('/api/videos', videosRoutes); // Jika sudah membuat

// Route dasar
app.get("/", (req, res) => {
    res.send("Server sedang berjalan!");
});

// Global Error Handler (Opsional)
app.use((err, req, res, next) => {
    console.error("Global error handler:", err.message);
    res.status(500).json({ error: "Something went wrong" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
