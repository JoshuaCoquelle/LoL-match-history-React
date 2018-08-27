const axios = require('axios')

const {
  REACT_APP_LOL_API_BASE,
  REACT_APP_LOL_API_KEY
} = require('../keys')

module.exports = class LeagueAPI {
  static async searchSummonerHandler ({ params }, res) {
    const summonerByName = `${REACT_APP_LOL_API_BASE}/summoner/v3/summoners/by-name`
    const summonerMatchlist = `${REACT_APP_LOL_API_BASE}/match/v3/matchlists/by-account`
    const summonerGameData = `${REACT_APP_LOL_API_BASE}/match/v3/matches`

    try {
      const accountId = await LeagueAPI.accountIdByName(summonerByName, params.name)
      const matchlist = await LeagueAPI.matchlistByAccountId(summonerMatchlist, accountId)
      const matches = await LeagueAPI.getMatchesBatch(5, summonerGameData, matchlist)
      const data = { accountId, matches }

      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ err })
    }
  }

  static async accountIdByName (path, name) {
    try {
      const summonerByNameURL = `${path}/${name}?api_key=${REACT_APP_LOL_API_KEY}`
      const response = await axios.get(summonerByNameURL)

      return response.data.accountId
    } catch (err) {
      console.error(err)
    }
  }

  static async matchlistByAccountId (path, accountId) {
    try {
      const summonerMatchlistUrl = `${path}/${accountId}?api_key=${REACT_APP_LOL_API_KEY}`
      const response = await axios.get(summonerMatchlistUrl)

      return response.data.matches
    } catch (err) {
      console.error(err)
    }
  }

  static async getMatchesBatch (batchSize, path, matchlist) {
    const matches = matchlist.slice(0, batchSize)
    const batch = matches.map(
      match => axios.get(`${path}/${match.gameId}?api_key=${REACT_APP_LOL_API_KEY}`)
    )

    try {
      const results = await Promise.all(batch)
      return results.map(result => result.data)
    } catch (err) {
      console.error(err)
    }
  }
}
