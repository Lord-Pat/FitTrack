const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

// REGISTRO DE USUARIO
const registerUser = async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;
    console.log("📥 Datos recibidos en el registro:", req.body);

    const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
    }

    const hash = await bcrypt.hash(contraseña, 10);
    console.log("🔐 Contraseña encriptada:", hash);

    await db.execute(
      'INSERT INTO usuarios (nombre, email, psswd) VALUES (?, ?, ?)',
      [nombre, email, hash]
    );

    res.status(201).json({ mensaje: 'Usuario registrado correctamente.' });

  } catch (err) {
    console.error("❌ ERROR en el registro:", err);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

// LOGIN DE USUARIO
const loginUser = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    console.log("🔐 Intento de login con:", email);

    const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    const usuario = rows[0];

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.psswd);
    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
    }

    // ✅ Generar token JWT
    const token = jwt.sign(
      {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso.',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (err) {
    console.error("❌ ERROR en el login:", err);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

module.exports = { registerUser, loginUser };
