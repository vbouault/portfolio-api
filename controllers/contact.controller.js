const Contact = require('../models/contact.model.js');
const Mailer = require('../services/mailer.js');

class ContactController {
  static async create (req, res) {
    try {
      if (!req.body.message) {
        return res.status(400).send({ errorMessage: 'Message can not be empty!' });
      }
  
      if (!req.body.email) {
        return res.status(400).send({ errorMessage: 'Email can not be empty!' });
      }
  
      if (!req.body.name) {
        return res.status(400).send({ errorMessage: 'Name can not be empty!' });
      }
        const data = await Contact.create(req.body);
        await Mailer.sendMail(req.body);
        res.status(201).send({ data });
    } catch (err) {
      res.status(500).send({
        errorMessage: err.message || 'Some error occurred while creating the contact.'
      });
    }
  }
}

module.exports = ContactController;
