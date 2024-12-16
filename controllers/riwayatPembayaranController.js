// controllers/riwayatPembayaranController.js
const pool = require('../db/connection');

// Get All RiwayatPembayaran
exports.getAllRiwayatPembayaran = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM RiwayatPembayaran');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching RiwayatPembayaran:', error);
    res.status(500).json({ error: 'Gagal mengambil data riwayat pembayaran' });
  }
};

// Get RiwayatPembayaran By ID
exports.getRiwayatPembayaranById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM RiwayatPembayaran WHERE id_pembayaran = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Riwayat pembayaran tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching RiwayatPembayaran:', error);
    res.status(500).json({ error: 'Gagal mengambil data riwayat pembayaran' });
  }
};

// Create New RiwayatPembayaran
exports.createRiwayatPembayaran = async (req, res) => {
  const { id_pengguna, id_konsultasi, jumlah_bayar, tanggal_bayar } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO RiwayatPembayaran (id_pengguna, id_konsultasi, jumlah_bayar, tanggal_bayar, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [id_pengguna, id_konsultasi, jumlah_bayar, tanggal_bayar]
    );
    res.status(201).json({ message: 'Riwayat pembayaran berhasil dibuat', id: result.insertId });
  } catch (error) {
    console.error('Error creating RiwayatPembayaran:', error);
    res.status(500).json({ error: 'Gagal membuat riwayat pembayaran' });
  }
};

// Update RiwayatPembayaran
exports.updateRiwayatPembayaran = async (req, res) => {
  const { id } = req.params;
  const { jumlah_bayar, tanggal_bayar } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE RiwayatPembayaran SET jumlah_bayar = ?, tanggal_bayar = ?, updated_at = NOW() WHERE id_pembayaran = ?',
      [jumlah_bayar, tanggal_bayar, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Riwayat pembayaran tidak ditemukan' });
    }
    res.status(200).json({ message: 'Riwayat pembayaran berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating RiwayatPembayaran:', error);
    res.status(500).json({ error: 'Gagal memperbarui riwayat pembayaran' });
  }
};

// Delete RiwayatPembayaran
exports.deleteRiwayatPembayaran = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM RiwayatPembayaran WHERE id_pembayaran = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Riwayat pembayaran tidak ditemukan' });
    }
    res.status(200).json({ message: 'Riwayat pembayaran berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting RiwayatPembayaran:', error);
    res.status(500).json({ error: 'Gagal menghapus riwayat pembayaran' });
  }
};
