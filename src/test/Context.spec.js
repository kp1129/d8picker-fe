import {testHook, cleanup} from 'react-testing-library'

import {AuthContext, handleRegister} from '../react-context-hook'

afterEach(cleanup)

test('provides the default value from context', () => {
  let name
  testHook(() => (name = handleRegister()), NameContext)
  expect(name).toBe('Hello, Unknown!')
})

test('provides the custom value from context', () => {
  let name
  testHook(() => (name = handleRegister()), NameContext, 'CustomName')
  expect(name).toBe('Hello, CustomName!')
})