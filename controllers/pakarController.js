// controllers/pakarController.js
const pool = require('../db/connection');

// Get All Pakar
exports.getAllPakar = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Pakar');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching Pakar:', error);
    res.status(500).json({ error: 'Gagal mengambil data pakar' });
  }
};

// Get Pakar By ID
exports.getPakarById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Pakar WHERE id_pakar = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pakar tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching Pakar:', error);
    res.status(500).json({ error: 'Gagal mengambil data pakar' });
  }
};

// Create New Pakar
exports.createPakar = async (req, res) => {
  const { nama_pakar, spesialisasi, harga, rating } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Pakar (nama_pakar, spesialisasi, harga, rating, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [nama_pakar, spesialisasi, harga, rating]
    );
    res.status(201).json({ message: 'Pakar berhasil dibuat', id: result.insertId });
  } catch (error) {
    console.error('Error creating Pakar:', error);
    res.status(500).json({ error: 'Gagal membuat pakar' });
  }
};

// Update Pakar
exports.updatePakar = async (req, res) => {
  const { id } = req.params;
  const { nama_pakar, spesialisasi, harga, rating } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Pakar SET nama_pakar = ?, spesialisasi = ?, harga = ?, rating = ?, updated_at = NOW() WHERE id_pakar = ?',
      [nama_pakar, spesialisasi, harga, rating, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pakar tidak ditemukan' });
    }
    res.status(200).json({ message: 'Pakar berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating Pakar:', error);
    res.status(500).json({ error: 'Gagal memperbarui pakar' });
  }
};

// Delete Pakar
exports.deletePakar = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Pakar WHERE id_pakar = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pakar tidak ditemukan' });
    }
    res.status(200).json({ message: 'Pakar berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting Pakar:', error);
    res.status(500).json({ error: 'Gagal menghapus pakar' });
  }
};
