import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { GetStatus } from '.'

const app = () => express(apiRoot, routes)

let getStatus

beforeEach(async () => {
  getStatus = await GetStatus.create({})
})

test('POST /get-statuses 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ motor: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.motor).toEqual('test')
})

test('GET /get-statuses 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /get-statuses/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${getStatus.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(getStatus.id)
})

test('GET /get-statuses/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /get-statuses/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${getStatus.id}`)
    .send({ motor: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(getStatus.id)
  expect(body.motor).toEqual('test')
})

test('PUT /get-statuses/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ motor: 'test' })
  expect(status).toBe(404)
})

test('DELETE /get-statuses/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${getStatus.id}`)
  expect(status).toBe(204)
})

test('DELETE /get-statuses/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
