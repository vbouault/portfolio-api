const db = require('../db.js');

class Contact {

  static async create (contact) {
    return db.query('INSERT INTO contacts SET ?', contact).then(res => { contact.id = res.insertId; return contact; });
  }

}

module.exports = Contact;
