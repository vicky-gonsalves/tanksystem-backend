import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Light } from '.'

const app = () => express(apiRoot, routes)

let light

beforeEach(async () => {
  light = await Light.create({})
})

test('POST /lights 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ light1: 'test', light2: 'test', light3: 'test', light4: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.light1).toEqual('test')
  expect(body.light2).toEqual('test')
  expect(body.light3).toEqual('test')
  expect(body.light4).toEqual('test')
})

test('GET /lights 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /lights/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${light.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(light.id)
})

test('GET /lights/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /lights/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${light.id}`)
    .send({ light1: 'test', light2: 'test', light3: 'test', light4: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(light.id)
  expect(body.light1).toEqual('test')
  expect(body.light2).toEqual('test')
  expect(body.light3).toEqual('test')
  expect(body.light4).toEqual('test')
})

test('PUT /lights/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ light1: 'test', light2: 'test', light3: 'test', light4: 'test' })
  expect(status).toBe(404)
})

test('DELETE /lights/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${light.id}`)
  expect(status).toBe(204)
})

test('DELETE /lights/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
