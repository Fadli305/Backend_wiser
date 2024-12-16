// controllers/obrolanController.js
const pool = require('../db/connection');

// Get All Obrolan
exports.getAllObrolan = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT Obrolan.*, Pengguna.nama AS nama_pengguna, Komunitas.judul AS judul_komunitas
      FROM Obrolan
      JOIN Pengguna ON Obrolan.id_pengguna = Pengguna.id_pengguna
      JOIN Komunitas ON Obrolan.id_komunitas = Komunitas.id_komunitas
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching Obrolan:', error);
    res.status(500).json({ error: 'Gagal mengambil data obrolan' });
  }
};

// Get Obrolan By ID
exports.getObrolanById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`
      SELECT Obrolan.*, Pengguna.nama AS nama_pengguna, Komunitas.judul AS judul_komunitas
      FROM Obrolan
      JOIN Pengguna ON Obrolan.id_pengguna = Pengguna.id_pengguna
      JOIN Komunitas ON Obrolan.id_komunitas = Komunitas.id_komunitas
      WHERE Obrolan.id_obrolan = ?
    `, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Obrolan tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching Obrolan:', error);
    res.status(500).json({ error: 'Gagal mengambil data obrolan' });
  }
};

// Create New Obrolan
exports.createObrolan = async (req, res) => {
  const { id_komunitas, id_pengguna, pesan } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Obrolan (id_komunitas, id_pengguna, pesan, tanggal_kirim, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW(), NOW())',
      [id_komunitas, id_pengguna, pesan]
    );
    res.status(201).json({ message: 'Obrolan berhasil dibuat', id: result.insertId });
  } catch (error) {
    console.error('Error creating Obrolan:', error);
    res.status(500).json({ error: 'Gagal membuat obrolan' });
  }
};

// Update Obrolan
exports.updateObrolan = async (req, res) => {
  const { id } = req.params;
  const { pesan } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Obrolan SET pesan = ?, updated_at = NOW() WHERE id_obrolan = ?',
      [pesan, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Obrolan tidak ditemukan' });
    }
    res.status(200).json({ message: 'Obrolan berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating Obrolan:', error);
    res.status(500).json({ error: 'Gagal memperbarui obrolan' });
  }
};

// Delete Obrolan
exports.deleteObrolan = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Obrolan WHERE id_obrolan = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Obrolan tidak ditemukan' });
    }
    res.status(200).json({ message: 'Obrolan berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting Obrolan:', error);
    res.status(500).json({ error: 'Gagal menghapus obrolan' });
  }
};
