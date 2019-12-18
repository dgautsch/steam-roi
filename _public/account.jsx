const React = require('react')
const DefaultLayout = require('./layouts/default')

class Account extends React.Component {
  render () {
    return (
      <DefaultLayout title={this.props.title}>
        <div className='row'>
          <h1>Account</h1>
          <div className='col s12 m6'>
            <div className='card blue-grey darken-1 account-card'>
              <div className='card-content white-text'>
                <h2 className='card-title account-card--title'>
                  {this.props.user.displayName}
                </h2>
                <p>
                  <img
                    src={this.props.user.photos[2].value}
                    alt={this.props.user.displayName}
                  />
                </p>
                <p>ID: {this.props.user.id}</p>
                <p>
                  <a
                    className='waves-effect waves-light btn-large'
                    href={'/search?id=' + this.props.user.id}
                  >
                    Get your results!
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }
}

module.exports = Account
