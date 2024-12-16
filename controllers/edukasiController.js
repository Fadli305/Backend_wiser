// controllers/edukasiController.js
const pool = require('../db/connection');

// Get All Edukasi
exports.getAllEdukasi = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Edukasi');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching Edukasi:', error);
    res.status(500).json({ error: 'Gagal mengambil data edukasi' });
  }
};

// Get Edukasi By ID
exports.getEdukasiById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Edukasi WHERE id_edukasi = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Edukasi tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching Edukasi:', error);
    res.status(500).json({ error: 'Gagal mengambil data edukasi' });
  }
};

// Create New Edukasi
exports.createEdukasi = async (req, res) => {
  const { jenis_konten, judul, deskripsi, link_konten } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Edukasi (jenis_konten, judul, deskripsi, link_konten, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [jenis_konten, judul, deskripsi, link_konten]
    );
    res.status(201).json({ message: 'Edukasi berhasil dibuat', id: result.insertId });
  } catch (error) {
    console.error('Error creating Edukasi:', error);
    res.status(500).json({ error: 'Gagal membuat edukasi' });
  }
};

// Update Edukasi
exports.updateEdukasi = async (req, res) => {
  const { id } = req.params;
  const { jenis_konten, judul, deskripsi, link_konten } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Edukasi SET jenis_konten = ?, judul = ?, deskripsi = ?, link_konten = ?, updated_at = NOW() WHERE id_edukasi = ?',
      [jenis_konten, judul, deskripsi, link_konten, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Edukasi tidak ditemukan' });
    }
    res.status(200).json({ message: 'Edukasi berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating Edukasi:', error);
    res.status(500).json({ error: 'Gagal memperbarui edukasi' });
  }
};

// Delete Edukasi
exports.deleteEdukasi = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Edukasi WHERE id_edukasi = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Edukasi tidak ditemukan' });
    }
    res.status(200).json({ message: 'Edukasi berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting Edukasi:', error);
    res.status(500).json({ error: 'Gagal menghapus edukasi' });
  }
};
