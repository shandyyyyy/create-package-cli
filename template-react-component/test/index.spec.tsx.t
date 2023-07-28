/**
 * @jest-environment jsdom
 */

import {{ COMPONENT_NAME }} from '../src/index'
import { isolateComponent } from 'isolate-react'

describe('{{ COMPONENT_NAME }} test suite', () => {

  test('render', () => {
    let wrapper = isolateComponent(<{{ COMPONENT_NAME }} name = "John" />)
    expect(wrapper.exists('div'), 'div should be there for some reason').toBe(true)
    expect(wrapper.findOne('div')!.content().startsWith('Hello John')).toBe(true)
  })

})
