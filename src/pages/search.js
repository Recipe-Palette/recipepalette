/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Router } from '@reach/router'

import Search from '../templates/search'

const SearchRoutes = () => {
  return (
    <Router basepath="search">
      <Search path="/" />
    </Router>
  )
}

export default SearchRoutes
