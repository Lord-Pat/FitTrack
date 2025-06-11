const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const nodemailer = require('nodemailer');

// 📩 Función para enviar el enlace de recuperación
const solicitarRecuperacion = async (req, res) => {
  const { email } = req.body;

  try {
    // Buscar el usuario por correo
    const [usuarios] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (usuarios.length === 0) {
      return res.status(404).json({ mensaje: 'Correo no registrado.' });
    }

    const usuario = usuarios[0];

    // Crear token de recuperación
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Crear transportador con cuenta de prueba (Ethereal)
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Construir enlace de recuperación
    const link = `http://localhost:5173/resetPassword?token=${token}`;

    // Enviar correo
    const info = await transporter.sendMail({
      from: '"GymTrack 🔒" <no-reply@gymtrack.com>',
      to: email,
      subject: 'Restablece tu contraseña',
      html: `<p>Hola ${usuario.nombre},</p>
             <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
             <a href="${link}">${link}</a>
             <p><strong>Este enlace caduca en 15 minutos.</strong></p>`
    });

    console.log('📧 Vista previa del correo:', nodemailer.getTestMessageUrl(info));

    res.json({ mensaje: 'Enlace de recuperación enviado.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al procesar la solicitud.' });
  }
};

// 🔒 Función para cambiar la contraseña usando el token
const resetearPassword = async (req, res) => {
  const { token, nueva } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hash = await bcrypt.hash(nueva, 10);

    await db.execute('UPDATE usuarios SET psswd = ? WHERE id = ?', [hash, decoded.id]);

    res.json({ mensaje: 'Contraseña actualizada correctamente.' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ mensaje: 'Token inválido o expirado.' });
  }
};

module.exports = {
  solicitarRecuperacion,
  resetearPassword
};
