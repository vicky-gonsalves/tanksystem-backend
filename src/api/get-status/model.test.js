import { GetStatus } from '.'

let getStatus

beforeEach(async () => {
  getStatus = await GetStatus.create({ motor: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = getStatus.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(getStatus.id)
    expect(view.motor).toBe(getStatus.motor)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = getStatus.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(getStatus.id)
    expect(view.motor).toBe(getStatus.motor)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
