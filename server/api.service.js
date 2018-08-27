const axios = require('axios')

const {
  REACT_APP_LOL_API_BASE,
  REACT_APP_LOL_API_KEY
} = require('../keys')

module.exports = {
  async searchSummoner ({ params }, res) {
    const summonerByName = `${REACT_APP_LOL_API_BASE}/summoner/v3/summoners/by-name`
    const summonerMatchlist = `${REACT_APP_LOL_API_BASE}/match/v3/matchlists/by-account`

    try {
      const accountId = await module.exports.accountIdByName(summonerByName, params.name)
      const matchlist = await module.exports.matchlistByAccountId(summonerMatchlist, accountId)

      res.status(200).json({ accountId, matchlist })
    } catch (err) {
      res.status(500).json({ err })
    }
  },

  async accountIdByName (path, name) {
    try {
      const summonerByNameURL = `${path}/${name}?api_key=${REACT_APP_LOL_API_KEY}`
      const response = await axios.get(summonerByNameURL)
      return response.data.accountId
    } catch (err) {
      console.error(err)
    }
  },

  async matchlistByAccountId (path, accountId) {
    try {
      const summonerMatchlistUrl = `${path}/${accountId}?api_key=${REACT_APP_LOL_API_KEY}`
      const response = await axios.get(summonerMatchlistUrl)
      return response.data
    } catch (err) {
      console.error(err)
    }
  }
}
