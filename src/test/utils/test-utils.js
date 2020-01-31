import { render } from '@testing-library/react'
import { AuthProvider } from '../../contexts/AuthContext'

import defaultStrings from 'i18n/en-x-default'

const AllTheProviders = ({ children }) => {
  return (
    
      <AuthProvider messages={defaultStrings}>
        {children}
      </AuthProvider>
    
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }