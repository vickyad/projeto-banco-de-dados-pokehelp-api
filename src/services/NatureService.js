const database = require('../database')

module.exports = {
  getAll: () => {
    return new Promise((accepted, rejected) => {
      database.query('SELECT * from Natures', (error, results) => {
        if (error) {
          rejected(error)
          return
        }
        accepted(results)
      })
    })
  },
}
