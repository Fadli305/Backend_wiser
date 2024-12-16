// controllers/penggunaController.js
const pool = require('../db/connection');
const bcrypt = require('bcrypt');

// Get All Pengguna
exports.getAllPengguna = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id_pengguna, nama, email, tanggal_daftar, created_at, updated_at FROM Pengguna');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching Pengguna:', error);
    res.status(500).json({ error: 'Gagal mengambil data pengguna' });
  }
};

// Get Pengguna By ID
exports.getPenggunaById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT id_pengguna, nama, email, tanggal_daftar, created_at, updated_at FROM Pengguna WHERE id_pengguna = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching Pengguna:', error);
    res.status(500).json({ error: 'Gagal mengambil data pengguna' });
  }
};

// Create New Pengguna
exports.createPengguna = async (req, res) => {
  const { nama, email, kata_sandi } = req.body;
  try {
    // Cek apakah email sudah digunakan
    const [existingUser] = await pool.query('SELECT * FROM Pengguna WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email sudah digunakan' });
    }

    // Hash kata sandi
    const hashedPassword = await bcrypt.hash(kata_sandi, 10);

    // Insert pengguna baru
    const [result] = await pool.query(
      'INSERT INTO Pengguna (nama, email, kata_sandi, tanggal_daftar, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW(), NOW())',
      [nama, email, hashedPassword]
    );
    res.status(201).json({ message: 'Pengguna berhasil dibuat', id: result.insertId });
  } catch (error) {
    console.error('Error creating Pengguna:', error);
    res.status(500).json({ error: 'Gagal membuat pengguna' });
  }
};

// Update Pengguna
exports.updatePengguna = async (req, res) => {
  const { id } = req.params;
  const { nama, email, kata_sandi } = req.body;
  try {
    // Cek apakah pengguna ada
    const [existingUser] = await pool.query('SELECT * FROM Pengguna WHERE id_pengguna = ?', [id]);
    if (existingUser.length === 0) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }

    // Persiapkan data yang akan diupdate
    let updateFields = [];
    let updateValues = [];

    if (nama) {
      updateFields.push('nama = ?');
      updateValues.push(nama);
    }
    if (email) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }
    if (kata_sandi) {
      const hashedPassword = await bcrypt.hash(kata_sandi, 10);
      updateFields.push('kata_sandi = ?');
      updateValues.push(hashedPassword);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'Tidak ada data yang diupdate' });
    }

    updateFields.push('updated_at = NOW()');

    const query = `UPDATE Pengguna SET ${updateFields.join(', ')} WHERE id_pengguna = ?`;
    updateValues.push(id);

    const [result] = await pool.query(query, updateValues);
    res.status(200).json({ message: 'Pengguna berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating Pengguna:', error);
    res.status(500).json({ error: 'Gagal memperbarui pengguna' });
  }
};

// Delete Pengguna
exports.deletePengguna = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Pengguna WHERE id_pengguna = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }
    res.status(200).json({ message: 'Pengguna berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting Pengguna:', error);
    res.status(500).json({ error: 'Gagal menghapus pengguna' });
  }
};
