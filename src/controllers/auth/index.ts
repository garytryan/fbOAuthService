import * as Twitter from 'twitter'
import signupWithEmail from './signupWithEmail'
import signupWithFacebook from './signupWithFacebook'
import signinWithFacebook from './signinWithFacebook'
import { logout as logoutFromZine } from '../../utils/identity'

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

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
    const oauthRequestToken = await new Promise(resolve => {
      twitter.post('/oauth/request_token', { oauth_callback: encodeURI('http://www.zine.media') }, resolve)
    })

    console.log('oauthRequestToken',oauthRequestToken)

    ctx.body = oauthRequestToken
  },

  twitterCallback: async ctx => {
  }
}
