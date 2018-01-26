const React = require('react')
const DefaultLayout = require('./layouts/default')

class Error extends React.Component {
  render () {
    return (
      <DefaultLayout title={this.props.title}>
        <div>
          <h2>Whoops! We encountered an error.</h2>
          <a href='/'>Return Home</a>
          <hr />
          <pre>{this.props.error.message}</pre>
        </div>
      </DefaultLayout>
    )
  }
}

module.exports = Error
