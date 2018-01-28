const React = require('react')

class Card extends React.Component {
  constructor (props) {
    super(props)
    this.game = props.data
  }

  minutesToHours (mins) {
    let hours = parseInt(mins / 60)
    let minutes = mins % 60
    return `${hours} hours ${minutes} minutes` 
  }

  pricePerHour (cost, playtime) {
    if (playtime === 0) {
      return 'Unplayed, no value yet.'
    }
    if (playtime < 60) {
      return cost / 100
    }
    return (((parseInt(cost) / 100) / (parseInt(playtime) / 60))).toFixed(2)
  }

  render () {
    return (
      <div className='card hoverable'>
        <div className='card-image'>
          <img src={this.game.header_image} />
          <span className='card-title'>{this.game.data}</span>
        </div>
        <div className='card-content black-text'>
          <p>Playtime: {this.minutesToHours(this.game.playTime)} </p>
          <p>Cost: ${(this.game.price_overview.final / 100).toFixed(2)}</p> 
          <p>Value Per Hour: ${this.pricePerHour(this.game.price_overview.final, this.game.playTime)}</p>
        </div>
        <div className='card-action'>
          <a href={this.game.website}>Visit Game Site</a>
        </div>
      </div>
    )
  }
}

module.exports = Card
