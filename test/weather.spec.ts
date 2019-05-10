import Weather from '../src/weather'

/**
 * Weather test
 */
describe('Weather test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('Weather class is instantiable', () => {
    expect(new Weather()).toBeInstanceOf(Weather)
  })
})
