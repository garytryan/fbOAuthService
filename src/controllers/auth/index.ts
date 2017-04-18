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
  }
}
