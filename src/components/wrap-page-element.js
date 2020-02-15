/** @jsx jsx */
import { jsx } from 'theme-ui'
import Layout from './layout'

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)
