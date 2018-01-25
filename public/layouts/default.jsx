var React = require('react')
 
class DefaultLayout extends React.Component {
  render () {
    return (
      <html lang='en'>

        <head>
          <meta charset='UTF-8' />
          <title>{this.props.title}</title>
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css' />
          <link rel='stylesheet' href='/styles/styles.css' />
        </head>

        <body>
          {this.props.children}
        </body>

      </html>
    )
  }
}
 
module.exports = DefaultLayout
