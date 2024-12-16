// controllers/mediaKomunitasController.js
const pool = require('../db/connection');

// Get All MediaKomunitas
exports.getAllMediaKomunitas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM MediaKomunitas');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching MediaKomunitas:', error);
    res.status(500).json({ error: 'Gagal mengambil data media komunitas' });
  }
};

// Get MediaKomunitas By ID
exports.getMediaKomunitasById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM MediaKomunitas WHERE id_media = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Media komunitas tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching MediaKomunitas:', error);
    res.status(500).json({ error: 'Gagal mengambil data media komunitas' });
  }
};

// Create New MediaKomunitas
exports.createMediaKomunitas = async (req, res) => {
  const { id_komunitas, jenis_media, link_media } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO MediaKomunitas (id_komunitas, jenis_media, link_media, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      [id_komunitas, jenis_media, link_media]
    );
    res.status(201).json({ message: 'Media komunitas berhasil dibuat', id: result.insertId });
  } catch (error) {
    console.error('Error creating MediaKomunitas:', error);
    res.status(500).json({ error: 'Gagal membuat media komunitas' });
  }
};

// Update MediaKomunitas
exports.updateMediaKomunitas = async (req, res) => {
  const { id } = req.params;
  const { jenis_media, link_media } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE MediaKomunitas SET jenis_media = ?, link_media = ?, updated_at = NOW() WHERE id_media = ?',
      [jenis_media, link_media, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Media komunitas tidak ditemukan' });
    }
    res.status(200).json({ message: 'Media komunitas berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating MediaKomunitas:', error);
    res.status(500).json({ error: 'Gagal memperbarui media komunitas' });
  }
};

// Delete MediaKomunitas
exports.deleteMediaKomunitas = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM MediaKomunitas WHERE id_media = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Media komunitas tidak ditemukan' });
    }
    res.status(200).json({ message: 'Media komunitas berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting MediaKomunitas:', error);
    res.status(500).json({ error: 'Gagal menghapus media komunitas' });
  }
};
