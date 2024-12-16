// src/controllers/articlesController.js
const pool = require('../db/connection');

// Mengambil semua artikel
exports.getAllArticles = async (req, res) => {
    try {
        const [results] = await pool.query("SELECT * FROM articles");
        res.status(200).json(results);
    } catch (err) {
        console.error("Error fetching articles:", err.message);
        res.status(500).json({ error: "Gagal mengambil data artikel" });
    }
};

// Mengambil artikel berdasarkan ID beserta references dan comments
exports.getArticleById = async (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT * FROM articles WHERE id = ?;
        SELECT * FROM reference WHERE article_id = ?;
        SELECT * FROM comments WHERE article_id = ?;
    `;

    try {
        const [results] = await pool.query(query, [id, id, id]);

        if (results[0].length === 0) {
            return res.status(404).json({ error: "Artikel tidak ditemukan" });
        }

        res.status(200).json({
            article: results[0][0],
            references: results[1],
            comments: results[2]
        });
    } catch (err) {
        console.error("Error fetching article by ID:", err.message);
        res.status(500).json({ error: "Gagal mengambil data artikel" });
    }
};

// Menambahkan komentar baru pada artikel
exports.addComment = async (req, res) => {
    const { id } = req.params; // ID artikel
    const { user, content } = req.body; // Data dari frontend

    if (!user || !content) {
        return res.status(400).json({ error: "Nama dan komentar harus diisi" });
    }

    const query = "INSERT INTO comments (article_id, user, content, date) VALUES (?, ?, ?, ?)";
    const values = [id, user, content, new Date()];

    try {
        await pool.query(query, values);
        res.status(201).json({ message: "Komentar berhasil disimpan" });
    } catch (err) {
        console.error("Error inserting comment:", err.message);
        res.status(500).json({ error: "Gagal menyimpan komentar" });
    }
};
