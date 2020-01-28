/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { ToastProvider } from 'react-toast-notifications'

export const wrapRootElement = ({ element }) => (
  <ToastProvider
    autoDismiss
    autoDismissTimeout={5000}
    placement="bottom-center"
  >
    {element}
  </ToastProvider>
)
