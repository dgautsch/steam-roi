const React = require('react')
const DefaultLayout = require('./layouts/default')

class Error extends React.Component {
  render () {
    return (
      <DefaultLayout title={this.props.title}>
        <h2>Woops!, We encountered an error.</h2>
        <a href="/">Return Home</a>
        <hr />
        <pre>{this.props.error}</pre>
      </DefaultLayout>
    )
  }
}

module.exports = Error
