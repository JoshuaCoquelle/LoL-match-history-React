import React from 'react'
import SummonerCard from '../SummonerCard/index'
import './index.css'

const renderMatchCards = (matches) => {
  return matches.map((card, $i) => <SummonerCard key={$i} />)
}

const SummonerHistory = ({ matches }) => {
  return (
    <div className='history'>
      <p className='history__latest-msg'>
        showing latest 5 matches
      </p>

      {renderMatchCards(matches)}
    </div>
  )
}

export default SummonerHistory
