const nodemailer = require('nodemailer');

async function sendRecoveryEmail(toEmail, token) {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"GymTrack 👟" <no-reply@gymtrack.com>',
    to: toEmail,
    subject: 'Recuperación de contraseña - GymTrack',
    html: `
      <h3>Hola,</h3>
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="http://localhost:5173/resetPassword?token=${token}">Recuperar contraseña</a>
      <br><br>
      <small>Este enlace expirará en 15 minutos.</small>
    `,
  });

  console.log('✅ Correo enviado a:', toEmail);
  console.log('🔗 Vista previa del correo:', nodemailer.getTestMessageUrl(info));
}

module.exports = { sendRecoveryEmail };
