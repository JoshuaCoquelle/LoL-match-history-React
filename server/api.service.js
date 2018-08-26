// const axios = require('axios')

module.exports = {
  accountIdByName (req, res, next) {
    res.json({ lol: process.env.REACT_APP_LOL_API_KEY })
    // axios.get('/foo')
  }
}
