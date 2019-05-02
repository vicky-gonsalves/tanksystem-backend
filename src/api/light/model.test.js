import { Light } from '.'

let light

beforeEach(async () => {
  light = await Light.create({ light1: 'test', light2: 'test', light3: 'test', light4: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = light.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(light.id)
    expect(view.light1).toBe(light.light1)
    expect(view.light2).toBe(light.light2)
    expect(view.light3).toBe(light.light3)
    expect(view.light4).toBe(light.light4)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = light.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(light.id)
    expect(view.light1).toBe(light.light1)
    expect(view.light2).toBe(light.light2)
    expect(view.light3).toBe(light.light3)
    expect(view.light4).toBe(light.light4)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
