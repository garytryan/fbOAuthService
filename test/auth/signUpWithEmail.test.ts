import test from 'ava'
import * as request from 'request-promise-native'

test(
'/auth/signup: should return 400 when email is invalid',
async t => {
  try {
    await request('http://localhost:3001/auth/signup', {
      method: "POST",
      body: {
        email: 'email',
        name: 'name',
        password: 'password',
        vendor: 'zine'
      },
      json: true
    })
  } catch (error) {
    t.is(error.statusCode, 400)
  }
})

test(
'/auth/signup: should return 400 when name is missing',
async t => {
  try {
    await request('http://localhost:3001/auth/signup', {
      method: "POST",
      body: {
        email: 'email@email.email',
        name: '',
        password: 'password',
        vendor: 'zine'
      },
      json: true
    })
  } catch (error) {
    t.is(error.statusCode, 400)
  }
})

test(
'/auth/signup: should return 400 when password is missing',
async t => {
  try {
    await request('http://localhost:3001/auth/signup', {
      method: "POST",
      body: {
        email: 'email@email.email',
        name: 'name',
        password: '',
        vendor: 'zine'
      },
      json: true
    })
  } catch (error) {
    t.is(error.statusCode, 400)
  }
})

test(
'/auth/signup: should return 200 when ok',
async t => {
  let response
  try {
    response = await request('http://localhost:3001/auth/signup', {
      method: "POST",
      body: {
        email: 'email@email.email',
        name: 'name',
        password: 'password',
        vendor: 'zine',
      },
      json: true
    })
  } catch (error) {
    t.fail(error.message)
  }

  t.deepEqual(response, {
    name: 'name',
    email: 'email@email.email',
    profileImage: {
      isEmpty: true,
      url: ''
    }
  })
})
