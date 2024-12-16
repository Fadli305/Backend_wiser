// src/controllers/materiController.js
const pool = require('../db/connection');

// Mengambil semua materi dengan pagination
exports.getAllMateri = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
  
    try {
      const [countResult] = await pool.query("SELECT COUNT(*) as count FROM materi");
      const totalItems = countResult[0].count;
      const totalPages = Math.ceil(totalItems / limit);
  
      const [results] = await pool.query("SELECT * FROM materi LIMIT ? OFFSET ?", [limit, offset]);
  
      res.status(200).json({
        totalItems,
        totalPages,
        currentPage: page,
        data: results,
      });
    } catch (err) {
      console.error("Error fetching materi:", err.message);
      res.status(500).json({ error: "Gagal mengambil data materi" });
    }
  };

// Mengambil materi berdasarkan ID beserta videos dan related_materi
exports.getMateriById = async (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT * FROM materi WHERE id = ?;
        SELECT * FROM videos WHERE materi_id = ?;
        SELECT * FROM related_materi WHERE materi_id = ?;
    `;

    try {
        const [results] = await pool.query(query, [id, id, id]);

        if (results[0].length === 0) {
            return res.status(404).json({ error: "Materi tidak ditemukan" });
        }

        res.status(200).json({
            materi: results[0][0],
            videos: results[1],
            related_materi: results[2]
        });
    } catch (err) {
        console.error("Error fetching materi by ID:", err.message);
        res.status(500).json({ error: "Gagal mengambil data materi" });
    }
};

// Menambahkan materi baru
exports.addMateri = async (req, res) => {
    const { title, description, main_image_url, author } = req.body;

    if (!title || !description || !main_image_url || !author) {
        return res.status(400).json({ error: "Semua field harus diisi" });
    }

    const query = "INSERT INTO materi (title, description, main_image_url, author) VALUES (?, ?, ?, ?)";
    const values = [title, description, main_image_url, author];

    try {
        const [result] = await pool.query(query, values);
        res.status(201).json({ message: "Materi berhasil disimpan", id: result.insertId });
    } catch (err) {
        console.error("Error inserting materi:", err.message);
        res.status(500).json({ error: "Gagal menyimpan materi" });
    }
};

// Mengupdate materi berdasarkan ID
exports.updateMateri = async (req, res) => {
    const { id } = req.params;
    const { title, description, main_image_url, author } = req.body;

    if (!title || !description || !main_image_url || !author) {
        return res.status(400).json({ error: "Semua field harus diisi" });
    }

    const query = "UPDATE materi SET title = ?, description = ?, main_image_url = ?, author = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
    const values = [title, description, main_image_url, author, id];

    try {
        const [result] = await pool.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Materi tidak ditemukan" });
        }

        res.status(200).json({ message: "Materi berhasil diperbarui" });
    } catch (err) {
        console.error("Error updating materi:", err.message);
        res.status(500).json({ error: "Gagal mengupdate materi" });
    }
};

// Menghapus materi berdasarkan ID
exports.deleteMateri = async (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM materi WHERE id = ?";

    try {
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Materi tidak ditemukan" });
        }

        res.status(200).json({ message: "Materi berhasil dihapus" });
    } catch (err) {
        console.error("Error deleting materi:", err.message);
        res.status(500).json({ error: "Gagal menghapus materi" });
    }
};

// Mengambil semua video untuk sebuah materi
exports.getVideosByMateriId = async (req, res) => {
    const { id } = req.params;

    const query = "SELECT * FROM videos WHERE materi_id = ?";

    try {
        const [results] = await pool.query(query, [id]);
        res.status(200).json(results);
    } catch (err) {
        console.error("Error fetching videos:", err.message);
        res.status(500).json({ error: "Gagal mengambil data video" });
    }
};

// Menambahkan video baru ke sebuah materi
exports.addVideoToMateri = async (req, res) => {
    const { id } = req.params;
    const { title, description, duration, video_url, image_url, author, is_main } = req.body;

    if (!title || !description || !duration || !video_url || !image_url || !author) {
        return res.status(400).json({ error: "Semua field harus diisi" });
    }

    const query = "INSERT INTO videos (materi_id, title, description, duration, video_url, image_url, author, is_main) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [id, title, description, duration, video_url, image_url, author, is_main || 0];

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

// Mengambil semua related_materi untuk sebuah materi
exports.getRelatedMateriById = async (req, res) => {
    const { id } = req.params;

    const query = "SELECT * FROM related_materi WHERE materi_id = ?";

    try {
        const [results] = await pool.query(query, [id]);
        res.status(200).json(results);
    } catch (err) {
        console.error("Error fetching related_materi:", err.message);
        res.status(500).json({ error: "Gagal mengambil data related_materi" });
    }
};

// Menambahkan related_materi baru ke sebuah materi
exports.addRelatedMateri = async (req, res) => {
    const { id } = req.params;
    const { title, description, image_url, page_url } = req.body;

    if (!title || !description || !image_url || !page_url) {
        return res.status(400).json({ error: "Semua field harus diisi" });
    }

    const query = "INSERT INTO related_materi (materi_id, title, description, image_url, page_url) VALUES (?, ?, ?, ?, ?)";
    const values = [id, title, description, image_url, page_url];

    try {
        const [result] = await pool.query(query, values);
        res.status(201).json({ message: "Related materi berhasil disimpan", id: result.insertId });
    } catch (err) {
        console.error("Error inserting related_materi:", err.message);
        res.status(500).json({ error: "Gagal menyimpan related_materi" });
    }
};
