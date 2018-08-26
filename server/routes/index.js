const express = require('express')
const router = express.Router()
const api = require('../api.service')

router.get('/summoner/:name', api.accountIdByName)

module.exports = router
