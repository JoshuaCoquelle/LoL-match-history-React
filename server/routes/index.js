const express = require('express')
const router = express.Router()
const LeagueAPI = require('../league-api.service')

router.get('/summoner/:name', LeagueAPI.searchSummonerHandler)

module.exports = router
