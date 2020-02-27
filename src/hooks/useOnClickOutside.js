// Hook from https://usehooks.com/useOnClickOutside/
import { useEffect } from 'react'

export const useOnClickOutside = (ref, ref2, ref3, handler) => {
  useEffect(
    () => {
      const listener = e => {
        console.log(e)
        // Do nothing if clicking ref's element or descendent elements
        if (
          !ref.current ||
          ref.current.contains(e.target) ||
          (ref2.current && ref2.current.contains(e.target)) ||
          (ref3.current && ref3.current.contains(e.target))
        ) {
          return
        }

        handler(e)
      }

      document.addEventListener('mouseup', listener)
      document.addEventListener('touchstart', listener)

      return () => {
        document.removeEventListener('mouseup', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new function on every render that will cause this effect callback/cleanup to run every render. It's not a big deal but to optimize you can wrap handler in useCallback before ¸¸passing it into this hook.
    [ref, ref2, ref3, handler]
  )
}
