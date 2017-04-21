import * as request from 'request-promise-native'
import signupWithEmail from './signupWithEmail'
import signupWithFacebook from './signupWithFacebook'
import signinWithFacebook from './signinWithFacebook'
import { logout as logoutFromZine } from '../../utils/identity'

export default {
  signin: async ctx => {
    ctx.checkBody('vendor').notBlank()

    if(ctx.errors) {
      ctx.throw(
        400,
        'incorrectly formatted request',
        { errors: ctx.errors }
      )
      return
    }

    if (ctx.request.body.vendor === 'facebook') {
      await signinWithFacebook(ctx)
    }
  },

  signup: async ctx => {
    ctx.checkBody('vendor').notBlank()

    if(ctx.errors) {
      ctx.throw(
        400,
        'incorrectly formatted request',
        { errors: ctx.errors }
      )
      return
    }

    if(ctx.request.body.vendor === 'zine') {
      await signupWithEmail(ctx)
    }
    else if (ctx.request.body.vendor === 'facebook') {
      await signupWithFacebook(ctx)
    }
  },

  logout: async ctx => {
    logoutFromZine(ctx)
    ctx.body = ctx.loggedInUser
  },

  twitter: async ctx => {
    const oauthToken = await request(`https://api.twitter.com/oauth/request_token?oauth_callback=${ctx.request.origin}/auth/twitter/callback`, { method: 'POST' })
    console.log('oauthToken', oauthToken)
    ctx.body = 'yeah'
  },

  twitterCallback: async ctx => {
  }
}
