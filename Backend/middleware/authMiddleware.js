const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ mensaje: 'Token no proporcionado.' });
    }

    const token = authHeader.split(' ')[1]; // Extrae el token real

    // Verificar el token con la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adjuntamos el usuario a la petición
    req.usuario = decoded;

    next(); // Pasa al siguiente middleware o controlador
  } catch (err) {
    console.error('❌ Token inválido o expirado:', err);
    res.status(401).json({ mensaje: 'Token inválido o expirado.' });
  }
};

module.exports = verifyToken;
