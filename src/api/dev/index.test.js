import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Dev } from '.'

const app = () => express(apiRoot, routes)

let dev

beforeEach(async () => {
  dev = await Dev.create({})
})

test('POST /dev 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ identifier: 'test', distance: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.identifier).toEqual('test')
  expect(body.distance).toEqual('test')
})

test('GET /dev 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /dev/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${dev.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(dev.id)
})

test('GET /dev/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /dev/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${dev.id}`)
    .send({ identifier: 'test', distance: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(dev.id)
  expect(body.identifier).toEqual('test')
  expect(body.distance).toEqual('test')
})

test('PUT /dev/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ identifier: 'test', distance: 'test' })
  expect(status).toBe(404)
})

test('DELETE /dev/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${dev.id}`)
  expect(status).toBe(204)
})

test('DELETE /dev/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
