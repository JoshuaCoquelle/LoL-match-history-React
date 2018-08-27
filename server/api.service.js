const axios = require('axios')

const {
  REACT_APP_LOL_API_BASE,
  REACT_APP_LOL_API_KEY
} = require('../keys')

module.exports = {
  async searchSummonerHandler ({ params }, res) {
    const summonerByName = `${REACT_APP_LOL_API_BASE}/summoner/v3/summoners/by-name`
    const summonerMatchlist = `${REACT_APP_LOL_API_BASE}/match/v3/matchlists/by-account`
    const summonerGameData = `${REACT_APP_LOL_API_BASE}/match/v3/matches`

    try {
      const accountId = await module.exports.accountIdByName(summonerByName, params.name)
      const matchlist = await module.exports.matchlistByAccountId(summonerMatchlist, accountId)
      const lastFiveMatches = await module.exports.lastFiveMatches(summonerGameData, matchlist, accountId)

      res.status(200).json({
        accountId,
        lastFiveMatches
      })
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
      return response.data.matches
    } catch (err) {
      console.error(err)
    }
  },

  async lastFiveMatches (path, matchlist, accountId) {
    const matches = matchlist.slice(0, 5).map(match => {
      return axios.get(`${path}/${match.gameId}?api_key=${REACT_APP_LOL_API_KEY}`)
    })

    try {
      const results = await Promise.all(matches)

      return results.map(result => {
        const {
          gameDuration,
          participants,
          participantIdentities
        } = result.data

        const playerId = participantIdentities
          .filter(participant => participant.player.accountId === accountId)
          .map(player => player.participantId)[0]

        const playerData = participants
          .filter(participant => participant.participantId === playerId)
          .map(data => {
            const { stats, spell1Id, spell2Id } = data
            return { stats, spell1Id, spell2Id }
          })

        const reducedPlayerData = playerData.reduce((accum, data) => {
          const { stats } = data
          const { spell1Id, spell2Id } = data

          return {
            win: stats.win,
            champLevel: stats.champLevel,
            creepScore: stats.totalMinionsKilled,
            creepScorePerMin: +(stats.totalMinionsKilled / (gameDuration / 60)).toFixed(1),
            kda: [stats.kills, stats.deaths, stats.assists],
            spells: [spell1Id, spell2Id],
            items: [stats.item0, stats.item1, stats.item2, stats.item3, stats.item4, stats.item5, stats.item6]
          }
        }, {})

        return { gameDuration, reducedPlayerData }
      })
    } catch (err) {
      console.error(err)
    }
  }
}
