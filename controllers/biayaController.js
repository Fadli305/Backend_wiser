// controllers/biayaController.js
const pool = require('../db/connection');

// Get All Biaya
exports.getAllBiaya = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Biaya');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching Biaya:', error);
    res.status(500).json({ error: 'Gagal mengambil data biaya' });
  }
};

// Get Biaya By ID
exports.getBiayaById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Biaya WHERE id_biaya = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Biaya tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching Biaya:', error);
    res.status(500).json({ error: 'Gagal mengambil data biaya' });
  }
};

// Create New Biaya
exports.createBiaya = async (req, res) => {
  const { id_gedung, jenis_biaya, jumlah, tanggal } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Biaya (id_gedung, jenis_biaya, jumlah, tanggal, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [id_gedung, jenis_biaya, jumlah, tanggal]
    );
    res.status(201).json({ message: 'Biaya berhasil dibuat', id: result.insertId });
  } catch (error) {
    console.error('Error creating Biaya:', error);
    res.status(500).json({ error: 'Gagal membuat biaya' });
  }
};

// Update Biaya
exports.updateBiaya = async (req, res) => {
  const { id } = req.params;
  const { jenis_biaya, jumlah, tanggal } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Biaya SET jenis_biaya = ?, jumlah = ?, tanggal = ?, updated_at = NOW() WHERE id_biaya = ?',
      [jenis_biaya, jumlah, tanggal, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Biaya tidak ditemukan' });
    }
    res.status(200).json({ message: 'Biaya berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating Biaya:', error);
    res.status(500).json({ error: 'Gagal memperbarui biaya' });
  }
};

// Delete Biaya
exports.deleteBiaya = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Biaya WHERE id_biaya = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Biaya tidak ditemukan' });
    }
    res.status(200).json({ message: 'Biaya berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting Biaya:', error);
    res.status(500).json({ error: 'Gagal menghapus biaya' });
  }
};
