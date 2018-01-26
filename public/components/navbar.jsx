const React = require('react')

class NavBar extends React.Component {
  render () {
    return (
      <nav className='grey darken-4'>
        <div className='nav-wrapper'>
          <a href='/' className='brand-logo'>Steam Value Finder</a>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li><a href='account'>Account</a></li>
            <li><a href='search'>Search</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

module.exports = NavBar
