// controllers/notifikasiController.js
const pool = require('../db/connection');

// Get All Notifikasi
exports.getAllNotifikasi = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT Notifikasi.*, Pengguna.nama AS nama_pengguna
      FROM Notifikasi
      JOIN Pengguna ON Notifikasi.id_pengguna = Pengguna.id_pengguna
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching Notifikasi:', error);
    res.status(500).json({ error: 'Gagal mengambil data notifikasi' });
  }
};

// Get Notifikasi By ID
exports.getNotifikasiById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`
      SELECT Notifikasi.*, Pengguna.nama AS nama_pengguna
      FROM Notifikasi
      JOIN Pengguna ON Notifikasi.id_pengguna = Pengguna.id_pengguna
      WHERE Notifikasi.id_notifikasi = ?
    `, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Notifikasi tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching Notifikasi:', error);
    res.status(500).json({ error: 'Gagal mengambil data notifikasi' });
  }
};

// Create New Notifikasi
exports.createNotifikasi = async (req, res) => {
  const { id_pengguna, pesan, tanggal_dikirim, status_baca } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Notifikasi (id_pengguna, pesan, tanggal_dikirim, status_baca, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [id_pengguna, pesan, tanggal_dikirim, status_baca]
    );
    res.status(201).json({ message: 'Notifikasi berhasil dibuat', id: result.insertId });
  } catch (error) {
    console.error('Error creating Notifikasi:', error);
    res.status(500).json({ error: 'Gagal membuat notifikasi' });
  }
};

// Update Notifikasi
exports.updateNotifikasi = async (req, res) => {
  const { id } = req.params;
  const { pesan, tanggal_dikirim, status_baca } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Notifikasi SET pesan = ?, tanggal_dikirim = ?, status_baca = ?, updated_at = NOW() WHERE id_notifikasi = ?',
      [pesan, tanggal_dikirim, status_baca, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Notifikasi tidak ditemukan' });
    }
    res.status(200).json({ message: 'Notifikasi berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating Notifikasi:', error);
    res.status(500).json({ error: 'Gagal memperbarui notifikasi' });
  }
};

// Delete Notifikasi
exports.deleteNotifikasi = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Notifikasi WHERE id_notifikasi = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Notifikasi tidak ditemukan' });
    }
    res.status(200).json({ message: 'Notifikasi berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting Notifikasi:', error);
    res.status(500).json({ error: 'Gagal menghapus notifikasi' });
  }
};
