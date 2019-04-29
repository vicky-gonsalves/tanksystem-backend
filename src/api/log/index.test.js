import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Log } from '.'

const app = () => express(apiRoot, routes)

let log

beforeEach(async () => {
  log = await Log.create({})
})

test('POST /logs 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ action: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.action).toEqual('test')
})

test('GET /logs 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /logs/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${log.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(log.id)
})

test('GET /logs/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /logs/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${log.id}`)
    .send({ action: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(log.id)
  expect(body.action).toEqual('test')
})

test('PUT /logs/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ action: 'test' })
  expect(status).toBe(404)
})

test('DELETE /logs/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${log.id}`)
  expect(status).toBe(204)
})

test('DELETE /logs/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
