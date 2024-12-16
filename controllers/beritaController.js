// src/controllers/beritaController.js
const pool = require('../db/connection');

// Mengambil semua berita
exports.getAllBerita = async (req, res) => {
    try {
        const [results] = await pool.query("SELECT * FROM berita");
        res.status(200).json(results);
    } catch (err) {
        console.error("Error fetching berita:", err.message);
        res.status(500).json({ error: "Gagal mengambil data berita" });
    }
};

// Mengambil berita berdasarkan ID beserta references
exports.getBeritaById = async (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT * FROM berita WHERE id = ?;
        SELECT * FROM berita_references WHERE berita_id = ?;
    `;

    try {
        const [results] = await pool.query(query, [id, id]);

        if (results[0].length === 0) {
            return res.status(404).json({ error: "Berita tidak ditemukan" });
        }

        res.status(200).json({
            berita: results[0][0],
            references: results[1]
        });
    } catch (err) {
        console.error("Error fetching berita by ID:", err.message);
        res.status(500).json({ error: "Gagal mengambil data berita" });
    }
};

// Menambahkan berita baru
exports.addBerita = async (req, res) => {
    const { title, author, date, mainPhoto, content } = req.body;

    if (!title || !author || !date || !mainPhoto || !content) {
        return res.status(400).json({ error: "Semua field harus diisi" });
    }

    const query = "INSERT INTO berita (title, author, date, mainPhoto, content) VALUES (?, ?, ?, ?, ?)";
    const values = [title, author, date, mainPhoto, content];

    try {
        const [result] = await pool.query(query, values);
        res.status(201).json({ message: "Berita berhasil disimpan", id: result.insertId });
    } catch (err) {
        console.error("Error inserting berita:", err.message);
        res.status(500).json({ error: "Gagal menyimpan berita" });
    }
};

// Menambahkan referensi berita
exports.addBeritaReference = async (req, res) => {
    const { id } = req.params; // ID berita
    const { url, description } = req.body;

    if (!url || !description) {
        return res.status(400).json({ error: "URL dan deskripsi harus diisi" });
    }

    const query = "INSERT INTO berita_references (berita_id, url, description) VALUES (?, ?, ?)";
    const values = [id, url, description];

    try {
        const [result] = await pool.query(query, values);
        res.status(201).json({ message: "Referensi berhasil disimpan", id: result.insertId });
    } catch (err) {
        console.error("Error inserting referensi berita:", err.message);
        res.status(500).json({ error: "Gagal menyimpan referensi" });
    }
};
