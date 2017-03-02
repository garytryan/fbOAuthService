import test from 'ava'
import * as request from 'request-promise-native'


test(
'/auth/signup: should return 400 when facebookUserID is missing',
async t => {
  try {
     await request('http://localhost:3001/auth/signup', {
      method: "POST",
      body: {
        facebookUserId: '',
        facebookUserAccessToken: 'access_token',
        vendor: 'facebook'
      },
      json: true
    })
  } catch (error) {
    t.is(error.statusCode, 400)
  }
})


test(
'/auth/signup: should return 400 when facebookUserAccessToken is missing',
async t => {
  try {
     await request('http://localhost:3001/auth/signup', {
      method: "POST",
      body: {
        facebookUserId: 'user_id',
        facebookUserAccessToken: '',
        vendor: 'facebook'
      },
      json: true
    })
  } catch (error) {
    t.is(error.statusCode, 400)
  }
})


test(
'/auth/signup: should return 401 when credentials are invalid',
async t => {
  try {
     await request('http://localhost:3001/auth/signup', {
      method: "POST",
      body: {
        facebookUserId: 'user_id',
        facebookUserAccessToken: 'access_token',
        vendor: 'facebook'
      },
      json: true
    })
  } catch (error) {
    t.is(error.statusCode, 401)
  }
})
