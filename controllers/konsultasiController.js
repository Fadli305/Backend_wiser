// controllers/konsultasiController.js
const pool = require('../db/connection');

// Get All Konsultasi
exports.getAllKonsultasi = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT Konsultasi.*, Pengguna.nama AS nama_pengguna, Pakar.nama_pakar AS nama_pakar
      FROM Konsultasi
      JOIN Pengguna ON Konsultasi.id_pengguna = Pengguna.id_pengguna
      JOIN Pakar ON Konsultasi.id_pakar = Pakar.id_pakar
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching Konsultasi:', error);
    res.status(500).json({ error: 'Gagal mengambil data konsultasi' });
  }
};

// Get Konsultasi By ID
exports.getKonsultasiById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`
      SELECT Konsultasi.*, Pengguna.nama AS nama_pengguna, Pakar.nama_pakar AS nama_pakar
      FROM Konsultasi
      JOIN Pengguna ON Konsultasi.id_pengguna = Pengguna.id_pengguna
      JOIN Pakar ON Konsultasi.id_pakar = Pakar.id_pakar
      WHERE Konsultasi.id_konsultasi = ?
    `, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Konsultasi tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching Konsultasi:', error);
    res.status(500).json({ error: 'Gagal mengambil data konsultasi' });
  }
};

// Create New Konsultasi
exports.createKonsultasi = async (req, res) => {
  const { id_pengguna, id_pakar, status_pembayaran, tanggal_konsultasi, durasi } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Konsultasi (id_pengguna, id_pakar, status_pembayaran, tanggal_konsultasi, durasi, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      [id_pengguna, id_pakar, status_pembayaran, tanggal_konsultasi, durasi]
    );
    res.status(201).json({ message: 'Konsultasi berhasil dibuat', id: result.insertId });
  } catch (error) {
    console.error('Error creating Konsultasi:', error);
    res.status(500).json({ error: 'Gagal membuat konsultasi' });
  }
};

// Update Konsultasi
exports.updateKonsultasi = async (req, res) => {
  const { id } = req.params;
  const { status_pembayaran, tanggal_konsultasi, durasi } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Konsultasi SET status_pembayaran = ?, tanggal_konsultasi = ?, durasi = ?, updated_at = NOW() WHERE id_konsultasi = ?',
      [status_pembayaran, tanggal_konsultasi, durasi, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Konsultasi tidak ditemukan' });
    }
    res.status(200).json({ message: 'Konsultasi berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating Konsultasi:', error);
    res.status(500).json({ error: 'Gagal memperbarui konsultasi' });
  }
};

// Delete Konsultasi
exports.deleteKonsultasi = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Konsultasi WHERE id_konsultasi = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Konsultasi tidak ditemukan' });
    }
    res.status(200).json({ message: 'Konsultasi berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting Konsultasi:', error);
    res.status(500).json({ error: 'Gagal menghapus konsultasi' });
  }
};
