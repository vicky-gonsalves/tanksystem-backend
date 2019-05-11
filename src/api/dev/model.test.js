import { Dev } from '.'

let dev

beforeEach(async () => {
  dev = await Dev.create({ identifier: 'test', distance: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = dev.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(dev.id)
    expect(view.identifier).toBe(dev.identifier)
    expect(view.distance).toBe(dev.distance)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = dev.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(dev.id)
    expect(view.identifier).toBe(dev.identifier)
    expect(view.distance).toBe(dev.distance)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
