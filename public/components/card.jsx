const React = require('react')

class Card extends React.Component {
  constructor (props) {
    super(props)
    this.game = props.data
  }

  pricePerHour (cost, playtime) {
    if (playtime === 0) {
      return 'Unplayed, no value yet.'
    }
    return (((parseInt(cost) / 100) / parseInt(playtime))).toFixed(2) + ' $/hr'
  }

  render () {
    return (
      <div className='card hoverable'>
        <div className='card-image'>
          <img src={this.game.header_image} />
          <span className='card-title'>{this.game.data}</span>
        </div>
        <div className='card-content black-text'>
          <p>Playtime: {this.game.playTime} hours</p>
          <p>Cost: ${(this.game.price_overview.final / 100).toFixed(2)}</p> 
          <p>Value: {this.pricePerHour(this.game.price_overview.final, this.game.playTime)}</p>
        </div>
        <div className='card-action'>
          <a href={this.game.website}>Visit Game Site</a>
        </div>
      </div>
    )
  }
}

module.exports = Card
