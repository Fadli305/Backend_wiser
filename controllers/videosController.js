// src/controllers/videosController.js
const pool = require('../db/connection');

// Mengambil semua video
exports.getAllVideos = async (req, res) => {
    try {
        const [results] = await pool.query("SELECT * FROM videos");
        res.status(200).json(results);
    } catch (err) {
        console.error("Error fetching videos:", err.message);
        res.status(500).json({ error: "Gagal mengambil data video" });
    }
};

// Mengambil video berdasarkan ID
exports.getVideoById = async (req, res) => {
    const { id } = req.params;

    const query = "SELECT * FROM videos WHERE id = ?";

    try {
        const [results] = await pool.query(query, [id]);

        if (results.length === 0) {
            return res.status(404).json({ error: "Video tidak ditemukan" });
        }

        res.status(200).json(results[0]);
    } catch (err) {
        console.error("Error fetching video by ID:", err.message);
        res.status(500).json({ error: "Gagal mengambil data video" });
    }
};

// Contoh: Menambahkan video baru dengan validasi
exports.addVideo = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { materi_id, title, description, duration, video_url, image_url, author, is_main } = req.body;
  
    const query = "INSERT INTO videos (materi_id, title, description, duration, video_url, image_url, author, is_main) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [materi_id, title, description, duration, video_url, image_url, author, is_main || 0];
  
    try {
      const [result] = await pool.query(query, values);
      res.status(201).json({ message: "Video berhasil disimpan", id: result.insertId });
    } catch (err) {
      console.error("Error inserting video:", err.message);
      res.status(500).json({ error: "Gagal menyimpan video" });
    }
  };

// Mengupdate video berdasarkan ID
exports.updateVideo = async (req, res) => {
    const { id } = req.params;
    const { title, description, duration, video_url, image_url, author, is_main } = req.body;

    if (!title || !description || !duration || !video_url || !image_url || !author) {
        return res.status(400).json({ error: "Semua field harus diisi" });
    }

    const query = "UPDATE videos SET title = ?, description = ?, duration = ?, video_url = ?, image_url = ?, author = ?, is_main = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
    const values = [title, description, duration, video_url, image_url, author, is_main, id];

    try {
        const [result] = await pool.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Video tidak ditemukan" });
        }

        res.status(200).json({ message: "Video berhasil diperbarui" });
    } catch (err) {
        console.error("Error updating video:", err.message);
        res.status(500).json({ error: "Gagal mengupdate video" });
    }
};

// Menghapus video berdasarkan ID
exports.deleteVideo = async (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM videos WHERE id = ?";

    try {
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Video tidak ditemukan" });
        }

        res.status(200).json({ message: "Video berhasil dihapus" });
    } catch (err) {
        console.error("Error deleting video:", err.message);
        res.status(500).json({ error: "Gagal menghapus video" });
    }
};
