// controllers/produksiController.js
const pool = require('../db/connection');

// Get All Produksi
exports.getAllProduksi = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Produksi');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching Produksi:', error);
    res.status(500).json({ error: 'Gagal mengambil data produksi' });
  }
};

// Get Produksi By ID
exports.getProduksiById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Produksi WHERE id_produksi = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Produksi tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching Produksi:', error);
    res.status(500).json({ error: 'Gagal mengambil data produksi' });
  }
};

// Create New Produksi
exports.createProduksi = async (req, res) => {
  const { id_gedung, laporan_perkembangan, tanggal_laporan } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Produksi (id_gedung, laporan_perkembangan, tanggal_laporan, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      [id_gedung, laporan_perkembangan, tanggal_laporan]
    );
    res.status(201).json({ message: 'Produksi berhasil dibuat', id: result.insertId });
  } catch (error) {
    console.error('Error creating Produksi:', error);
    res.status(500).json({ error: 'Gagal membuat produksi' });
  }
};

// Update Produksi
exports.updateProduksi = async (req, res) => {
  const { id } = req.params;
  const { laporan_perkembangan, tanggal_laporan } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Produksi SET laporan_perkembangan = ?, tanggal_laporan = ?, updated_at = NOW() WHERE id_produksi = ?',
      [laporan_perkembangan, tanggal_laporan, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Produksi tidak ditemukan' });
    }
    res.status(200).json({ message: 'Produksi berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating Produksi:', error);
    res.status(500).json({ error: 'Gagal memperbarui produksi' });
  }
};

// Delete Produksi
exports.deleteProduksi = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Produksi WHERE id_produksi = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Produksi tidak ditemukan' });
    }
    res.status(200).json({ message: 'Produksi berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting Produksi:', error);
    res.status(500).json({ error: 'Gagal menghapus produksi' });
  }
};
