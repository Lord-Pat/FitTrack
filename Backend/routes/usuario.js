const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

// Obtener perfil del usuario autenticado
router.get('/perfil', verifyToken, async (req, res) => {
  try {
    // El ID del usuario viene del token
    const id = req.usuario.id;
    const [rows] = await require('../db').execute(
      'SELECT id, nombre, email FROM usuarios WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    res.json({ usuario: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener el perfil.' });
  }
});

// Actualizar ajustes del usuario autenticado
router.put('/ajustes', verifyToken, async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const id = req.usuario.id;

    await require('../db').execute(
      'UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?',
      [nombre, email, id]
    );

    res.json({ mensaje: 'Ajustes actualizados correctamente.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al actualizar los ajustes.' });
  }
});

module.exports = router;
