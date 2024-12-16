// controllers/favoritController.js
const pool = require('../db/connection');

// Get All Favorit
exports.getAllFavorit = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT Favorit.*, Pengguna.nama AS nama_pengguna, Edukasi.judul AS judul_edukasi
      FROM Favorit
      JOIN Pengguna ON Favorit.id_pengguna = Pengguna.id_pengguna
      JOIN Edukasi ON Favorit.id_edukasi = Edukasi.id_edukasi
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching Favorit:', error);
    res.status(500).json({ error: 'Gagal mengambil data favorit' });
  }
};

// Get Favorit By ID
exports.getFavoritById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`
      SELECT Favorit.*, Pengguna.nama AS nama_pengguna, Edukasi.judul AS judul_edukasi
      FROM Favorit
      JOIN Pengguna ON Favorit.id_pengguna = Pengguna.id_pengguna
      JOIN Edukasi ON Favorit.id_edukasi = Edukasi.id_edukasi
      WHERE Favorit.id_favorit = ?
    `, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Favorit tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching Favorit:', error);
    res.status(500).json({ error: 'Gagal mengambil data favorit' });
  }
};

// Create New Favorit
exports.createFavorit = async (req, res) => {
  const { id_pengguna, id_edukasi } = req.body;
  try {
    // Cek apakah favorit sudah ada
    const [existingFavorit] = await pool.query('SELECT * FROM Favorit WHERE id_pengguna = ? AND id_edukasi = ?', [id_pengguna, id_edukasi]);
    if (existingFavorit.length > 0) {
      return res.status(400).json({ error: 'Favorit sudah disimpan' });
    }

    const [result] = await pool.query(
      'INSERT INTO Favorit (id_pengguna, id_edukasi, tanggal_disimpan, created_at, updated_at) VALUES (?, ?, NOW(), NOW(), NOW())',
      [id_pengguna, id_edukasi]
    );
    res.status(201).json({ message: 'Favorit berhasil disimpan', id: result.insertId });
  } catch (error) {
    console.error('Error creating Favorit:', error);
    res.status(500).json({ error: 'Gagal membuat favorit' });
  }
};

// Delete Favorit
exports.deleteFavorit = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Favorit WHERE id_favorit = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Favorit tidak ditemukan' });
    }
    res.status(200).json({ message: 'Favorit berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting Favorit:', error);
    res.status(500).json({ error: 'Gagal menghapus favorit' });
  }
};
