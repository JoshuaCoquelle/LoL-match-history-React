import React from 'react'
import SummonerCard from '../SummonerCard/index'
import './index.css'

const SummonerHistory = (props) => {
  return (
    <div className='summoner-history'>
      <p className='summoner-history__latest-msg'>
        showing latest 10 matches
      </p>

      <SummonerCard />
      <SummonerCard />
    </div>
  )
}

export default SummonerHistory
