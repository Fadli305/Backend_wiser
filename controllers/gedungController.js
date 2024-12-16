// controllers/gedungController.js
const pool = require('../db/connection');

// Get All Gedung
exports.getAllGedung = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Gedung');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching Gedung:', error);
    res.status(500).json({ error: 'Gagal mengambil data gedung' });
  }
};

// Get Gedung By ID
exports.getGedungById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Gedung WHERE id_gedung = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Gedung tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching Gedung:', error);
    res.status(500).json({ error: 'Gagal mengambil data gedung' });
  }
};

// Create New Gedung
exports.createGedung = async (req, res) => {
  const { id_pengguna, nama_gedung, lokasi } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Gedung (id_pengguna, nama_gedung, lokasi, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      [id_pengguna, nama_gedung, lokasi]
    );
    res.status(201).json({ message: 'Gedung berhasil dibuat', id: result.insertId });
  } catch (error) {
    console.error('Error creating Gedung:', error);
    res.status(500).json({ error: 'Gagal membuat gedung' });
  }
};

// Update Gedung
exports.updateGedung = async (req, res) => {
  const { id } = req.params;
  const { nama_gedung, lokasi } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Gedung SET nama_gedung = ?, lokasi = ?, updated_at = NOW() WHERE id_gedung = ?',
      [nama_gedung, lokasi, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Gedung tidak ditemukan' });
    }
    res.status(200).json({ message: 'Gedung berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating Gedung:', error);
    res.status(500).json({ error: 'Gagal memperbarui gedung' });
  }
};

// Delete Gedung
exports.deleteGedung = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Gedung WHERE id_gedung = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Gedung tidak ditemukan' });
    }
    res.status(200).json({ message: 'Gedung berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting Gedung:', error);
    res.status(500).json({ error: 'Gagal menghapus gedung' });
  }
};
