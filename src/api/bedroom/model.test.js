import { Bedroom } from '.'

let bedroom

beforeEach(async () => {
  bedroom = await Bedroom.create({ light1: 'test', light2: 'test', light3: 'test', fan: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = bedroom.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bedroom.id)
    expect(view.light1).toBe(bedroom.light1)
    expect(view.light2).toBe(bedroom.light2)
    expect(view.light3).toBe(bedroom.light3)
    expect(view.fan).toBe(bedroom.fan)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = bedroom.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bedroom.id)
    expect(view.light1).toBe(bedroom.light1)
    expect(view.light2).toBe(bedroom.light2)
    expect(view.light3).toBe(bedroom.light3)
    expect(view.fan).toBe(bedroom.fan)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
