const React = require('react')
const DefaultLayout = require('./layouts/default')
const Card = require('./components/card.jsx')

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.gameData = props.data
  }

  render () {
    return (
      <DefaultLayout title={this.props.title}>
        {this.props.error &&
          <div className='card-panel red lighten-3'>That user ID is invalid.</div>
        }
        <div className='row'>
          <div className='col s6'>
            <h5>Search for a user</h5>
            <p>Use a steam id to find what games a user plays, how much they cost, and what their value per dollar is. You can find a user's steam <a href='https://steamidfinder.com/'>ID here.</a></p>
            <p>If you don't know a user to look up, here is a sample ID: <pre>76561198028619700</pre></p>
          </div>
          <div className='col s6'>
            <div className='card-panel black'>
              <div className='input-field'>
                <form role='search' method='get' className='form' action='/search'>
                  <input id='search' type='search' className='validate black white-text' name='id' />
                  <label for='search' className='active white-text'>Search</label>
                </form>
              </div>
            </div>
          </div>
          {this.gameData &&
          <div className='col s12'>
            {this.gameData.map((item, idx) => (
              <div className='col s6' key={idx}>
                <Card data={item} />
              </div>
            ))}
          </div>
          }
        </div>
      </DefaultLayout>
    )
  }
}

module.exports = Search
