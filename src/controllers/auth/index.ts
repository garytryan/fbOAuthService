import signupWithEmail from './signupWithEmail'
import signupWithFacebook from './signupWithFacebook'
import { logout as logoutFromZine } from '../../utils/identity'

export default {
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
    ctx.status = 200
  }
}
