import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Bedroom } from '.'

const app = () => express(apiRoot, routes)

let bedroom

beforeEach(async () => {
  bedroom = await Bedroom.create({})
})

test('POST /bedroom 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ light1: 'test', light2: 'test', light3: 'test', fan: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.light1).toEqual('test')
  expect(body.light2).toEqual('test')
  expect(body.light3).toEqual('test')
  expect(body.fan).toEqual('test')
})

test('GET /bedroom 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /bedroom/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${bedroom.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(bedroom.id)
})

test('GET /bedroom/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /bedroom/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${bedroom.id}`)
    .send({ light1: 'test', light2: 'test', light3: 'test', fan: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(bedroom.id)
  expect(body.light1).toEqual('test')
  expect(body.light2).toEqual('test')
  expect(body.light3).toEqual('test')
  expect(body.fan).toEqual('test')
})

test('PUT /bedroom/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ light1: 'test', light2: 'test', light3: 'test', fan: 'test' })
  expect(status).toBe(404)
})

test('DELETE /bedroom/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${bedroom.id}`)
  expect(status).toBe(204)
})

test('DELETE /bedroom/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
