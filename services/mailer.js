const nodemailer = require('nodemailer');

class mailer {
  static async sendMail (body) {
    const outputUser = `
    <p>Bonjour ${body.name},</p>
    <p>je vous remercie de votre intérêt, j'ai bien reçu votre message et je vous répondrai au plus vite.</p>
    <p>Cordialement,</p><br>
    <p>Vianney Bouault</p>
    <p>06 58 37 82 06</p>
    `;
    const outputAdmin = `
    <p>Message : ${body.message}</p>
    <p>Email : ${body.email}</p>
    <p>Nom : ${body.name}</p>
    `;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    const mailOptionsUser = {
      from: `"Vianney Bouault" <${process.env.MAIL_USER}>`,
      to: body.email,
      subject: `Vianney Bouault, confirmation de prise de contact`,
      html: outputUser
    };

    const mailOptionsAdmin = {
      from: `"Vianney Bouault" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: 'Prise de contact - Portfolio',
      html: outputAdmin
    };

    const sendMailPromisified = (option) => {
      return new Promise((resolve, reject) => {
        transporter.sendMail(option, (error, info) => {
          if (error) {
            reject(error);
          }
          resolve();
        });
      });
    };

    if (process.env.NODE_ENV !== 'test') {
      return Promise.all([sendMailPromisified(mailOptionsUser), sendMailPromisified(mailOptionsAdmin)]);
    }
  }
}

module.exports = mailer;
