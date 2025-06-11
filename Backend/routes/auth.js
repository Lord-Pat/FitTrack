const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { solicitarRecuperacion } = require('../controllers/passwordController'); // ← NUEVO

router.post('/register', registerUser);
router.post('/login', loginUser);

// Nueva ruta para recuperación de contraseña
router.post('/recuperar', solicitarRecuperacion); // ← NUEVO

const { resetearPassword } = require('../controllers/passwordController');
router.post('/resetear', resetearPassword);


module.exports = router;
