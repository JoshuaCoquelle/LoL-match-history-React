const express = require('express')
const router = express.Router()
const { searchSummoner } = require('../api.service')

router.get('/summoner/:name', searchSummoner)

module.exports = router
