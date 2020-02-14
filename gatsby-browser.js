/* eslint-disable */
export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!(`IntersectionObserver` in window)) {
    import(`intersection-observer`)
  }
}

export { wrapPageElement } from './src/components/wrap-page-element'
