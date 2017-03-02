import test from 'ava'
import * as request from 'request-promise-native'

test(
'/auth/signup: should return 400 when vendor is missing',
async t => {
  try {
    await request('http://localhost:3001/auth/signup', {
      method: "POST",
      body: { vendor: '' },
      json: true
    })
  } catch (error) {
    t.is(error.statusCode, 400)
  }
})
