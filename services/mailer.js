const nodemailer = require('nodemailer');

class mailer {
  static async sendMail (body) {
    const outputUser = `Bonjour ${body.name}`;
    const outputAdmin = `${body.message}`

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
