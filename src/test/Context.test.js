import React from 'react'

import {testHook, cleanup} from '@testing-library/react'

import {AuthContext, handleRegister} from '../hooks/useAuth'

afterEach(cleanup)

test.skip('provides the default value from context', () => {
  let name
  useAuth(() => (name = handleRegister()), AuthContext)
  expect(name).toBe(null)
})

test.skip('provides the custom value from context', () => {
  let name
  useAuth(() => (name = handleRegister()), AuthContext, 'Jeremy')
  expect(name).toBe('Jeremy')
})