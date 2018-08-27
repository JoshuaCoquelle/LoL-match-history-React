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
      LeagueAPI._buildPayload(accountId, matches)

      res.status(200).json({})
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

  static _buildPayload (accountId, matches) {
    matches.map(match => {
      const playerId = LeagueAPI._parsePlayerId(accountId, match.participantIdentities)
      const playerMatchData = LeagueAPI._parsePlayerMatchData(playerId, match.participants)
      const stats = LeagueAPI._parseStatsForPayload(playerMatchData, match.gameDuration)

      console.log('----------------------------------')
      console.log(stats)
    })
  }

  static _parsePlayerId (accountId, participantIdentities) {
    return participantIdentities
      .filter(participant => participant.player.accountId === accountId)
      .map(player => player.participantId)[0]
  }

  static _parsePlayerMatchData (playerId, participants) {
    return participants
      .filter(participant => participant.participantId === playerId)
      .map(playerData => {
        const { stats, spell1Id, spell2Id } = playerData
        return { stats, spell1Id, spell2Id }
      })
  }

  static _parseStatsForPayload (playerData, gameDuration) {
    return playerData.reduce((accum, data) => {
      const { stats, spell1Id, spell2Id } = data

      return {
        win: stats.win,
        champLevel: stats.champLevel,
        creepScore: stats.totalMinionsKilled,
        creepScorePerMin: +(stats.totalMinionsKilled / (gameDuration / 60)).toFixed(1),
        kda: [stats.kills, stats.deaths, stats.assists],
        spells: [spell1Id, spell2Id],
        items: [stats.item0, stats.item1, stats.item2, stats.item3, stats.item4, stats.item5, stats.item6],
        get gameDuration () {
          const duration = new Date(0)
          duration.setSeconds(gameDuration)
          return duration.toISOString().substr(11, 8)
        }
      }
    }, {})
  }
}
