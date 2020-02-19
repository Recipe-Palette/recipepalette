/* eslint-disable no-unused-vars */
/** @jsx jsx */
import { jsx } from 'theme-ui'

import { Label, Input, Container } from '@theme-ui/components'

import Title from './title'
import SearchForm from './search-form'

const SearchDrawer = ({ setDrawerIsOpen, ...props }) => (
  <div
    sx={{
      position: `absolute`,
      display: `flex`,
      zIndex: 1000,
      width: `100%`,
      bg: `background`,
      top: `80px`,
      boxShadow: `0px 0px 6px 2px rgba(187,187,187,0.2)`,
      transition: `all .25s ease-in-out`,
    }}
    {...props}
  >
    <Container>
      <Title>Search</Title>
      <SearchForm setDrawerIsOpen={setDrawerIsOpen} />
    </Container>
  </div>
)

export default SearchDrawer
