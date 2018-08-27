const express = require('express')
const router = express.Router()
const { searchSummonerHandler } = require('../api.service')

router.get('/summoner/:name', searchSummonerHandler)

module.exports = router
