// controllers/komunitasController.js
const pool = require('../db/connection');

// Get All Komunitas
exports.getAllKomunitas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Komunitas');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching Komunitas:', error);
    res.status(500).json({ error: 'Gagal mengambil data komunitas' });
  }
};

// Get Komunitas By ID
exports.getKomunitasById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Komunitas WHERE id_komunitas = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Komunitas tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching Komunitas:', error);
    res.status(500).json({ error: 'Gagal mengambil data komunitas' });
  }
};

// Create New Komunitas
exports.createKomunitas = async (req, res) => {
  const { jenis_konten, judul, deskripsi, tanggal_posting, id_pengguna } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Komunitas (jenis_konten, judul, deskripsi, tanggal_posting, id_pengguna, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      [jenis_konten, judul, deskripsi, tanggal_posting, id_pengguna]
    );
    res.status(201).json({ message: 'Komunitas berhasil dibuat', id: result.insertId });
  } catch (error) {
    console.error('Error creating Komunitas:', error);
    res.status(500).json({ error: 'Gagal membuat komunitas' });
  }
};

// Update Komunitas
exports.updateKomunitas = async (req, res) => {
  const { id } = req.params;
  const { jenis_konten, judul, deskripsi, tanggal_posting } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Komunitas SET jenis_konten = ?, judul = ?, deskripsi = ?, tanggal_posting = ?, updated_at = NOW() WHERE id_komunitas = ?',
      [jenis_konten, judul, deskripsi, tanggal_posting, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Komunitas tidak ditemukan' });
    }
    res.status(200).json({ message: 'Komunitas berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating Komunitas:', error);
    res.status(500).json({ error: 'Gagal memperbarui komunitas' });
  }
};

// Delete Komunitas
exports.deleteKomunitas = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Komunitas WHERE id_komunitas = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Komunitas tidak ditemukan' });
    }
    res.status(200).json({ message: 'Komunitas berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting Komunitas:', error);
    res.status(500).json({ error: 'Gagal menghapus komunitas' });
  }
};
