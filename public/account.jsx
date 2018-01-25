const React = require('react')
const DefaultLayout = require('./layouts/default')

class Account extends React.Component {
  
  render () {
    return (
      <DefaultLayout title={this.props.title}>
        <h1>Account</h1>
        <p><img src={this.props.user.photos[2].value} alt='Your Avatar Image' /></p>
        <p>ID: {this.props.user.id}</p>
        <p>Name: {this.props.user.displayName}</p>
      </DefaultLayout>
    )
  }
}

module.exports = Account
