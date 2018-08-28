const axios = require('axios')

const {
  REACT_APP_LOL_API_BASE,
  REACT_APP_LOL_API_KEY
} = require('../keys')

module.exports = class LeagueAPI {
  /**
   * Handler for summoner search route by name.
   * /summoner/:name
   *
   * @static
   * @param {string} { params } - express params for name
   * @param {object} res - express response object
   * @returns {object}
   */
  static async searchSummonerHandler ({ params }, res) {
    const summonerByName = `${REACT_APP_LOL_API_BASE}/summoner/v3/summoners/by-name`
    const summonerMatchlist = `${REACT_APP_LOL_API_BASE}/match/v3/matchlists/by-account`
    const summonerGameData = `${REACT_APP_LOL_API_BASE}/match/v3/matches`

    try {
      const accountId = await LeagueAPI.accountIdByName(summonerByName, params.name)
      const matchlist = await LeagueAPI.matchlistByAccountId(summonerMatchlist, accountId)
      const matches = await LeagueAPI.getMatchesBatch(5, summonerGameData, matchlist)
      const payload = LeagueAPI._buildPayload(accountId, matches)

      res.status(200).json({ payload })
    } catch (err) {
      res.status(500).json({ err })
    }
  }

  /**
   * Retrieve the account ID by username
   *
   * @static
   * @param {string} path - request url for API
   * @param {string} name - the user name to query
   * @returns {promise}
   */
  static async accountIdByName (path, name) {
    try {
      const summonerByNameURL = `${path}/${name}?api_key=${REACT_APP_LOL_API_KEY}`
      const response = await axios.get(summonerByNameURL)

      return response.data.accountId
    } catch (err) {
      return err
    }
  }

  /**
   * Get matchlist for the desired account ID
   *
   * @static
   * @param {string} path - request url for API
   * @param {any} accountId - user account ID
   * @returns
   */
  static async matchlistByAccountId (path, accountId) {
    try {
      const summonerMatchlistUrl = `${path}/${accountId}?api_key=${REACT_APP_LOL_API_KEY}`
      const response = await axios.get(summonerMatchlistUrl)

      return response.data.matches
    } catch (err) {
      return err
    }
  }

  /**
   * Create matches batch axios request for getting individual match data
   *
   * @static
   * @param {number} batchSize - how many matches to retrieve
   * @param {string} path - request url for API
   * @param {array} matchlist - list of user account matches
   * @returns {promise}
   */
  static async getMatchesBatch (batchSize, path, matchlist) {
    const matches = matchlist.slice(0, batchSize)
    const batch = matches.map(
      match => axios.get(`${path}/${match.gameId}?api_key=${REACT_APP_LOL_API_KEY}`)
    )

    try {
      const results = await Promise.all(batch)
      return results.map(result => result.data)
    } catch (err) {
      return err
    }
  }

  /**
   * Build payload with class helper methods for returning to client
   *
   * @static
   * @param {number} accountId - user account ID
   * @param {array} matches - batch of matches to parse
   * @returns {object}
   */
  static _buildPayload (accountId, matches) {
    return matches.map(match => {
      const playerId = LeagueAPI._parsePlayerId(accountId, match.participantIdentities)
      const playerMatchData = LeagueAPI._parsePlayerMatchData(playerId, match.participants)
      const stats = LeagueAPI._parseStatsForPayload(playerMatchData, match.gameDuration)

      return stats
    })
  }

  /**
   * Helper to extract player ID from particpants collection
   *
   * @static
   * @param {any} accountId - user account ID
   * @param {any} participantIdentities - all matches participants
   * @returns
   */
  static _parsePlayerId (accountId, participantIdentities) {
    return participantIdentities
      .filter(participant => participant.player.accountId === accountId)
      .map(player => player.participantId)[0]
  }

  /**
   * Parse only desired data from full match data
   *
   * @static
   * @param {number} playerId - the current players ID for the match
   * @param {array} participants - list of all participants
   * @returns
   */
  static _parsePlayerMatchData (playerId, participants) {
    return participants
      .filter(participant => participant.participantId === playerId)
      .map(playerData => {
        const { stats, spell1Id, spell2Id, championId } = playerData
        return { stats, spell1Id, spell2Id, championId }
      })
  }

  /**
   * Reduce all stat data from the players match data to return to client
   *
   * @static
   * @param {array} playerData - player data chunk from each match
   * @param {number} gameDuration - game duration in (ms)
   * @returns
   */
  static _parseStatsForPayload (playerData, gameDuration) {
    return playerData.reduce((accum, data) => {
      const { stats, spell1Id, spell2Id, championId } = data

      return {
        championId,
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
