import User from '../../models/User'
import { login } from '../../utils/identity'

export const signIn = async ctx => {}

export const signUp = async ctx => {
  ctx.checkBody('email').notBlank()
  ctx.checkBody('password').notBlank()

  if(ctx.errors) {
    return ctx.throw(
      400,
      'incorrectly formatted request',
      { errors: ctx.errors }
    )
  }

  const existingUser = await User.findOne({ email: ctx.request.body.email })

  if(existingUser) {
    const passwordDoesMatch = await existingUser.comparePasswords(ctx.request.body.password)

    if(passwordDoesMatch) {
      login(ctx, existingUser)

      ctx.body = existingUser.serialize(ctx)
    }
    else {
      ctx.throw(401, 'password does not match email')
    }
  }
  else {
    let user = await User({
      email: ctx.request.body.email,
      password: ctx.request.body.password
    }).save()

    login(ctx, user)

    ctx.body = user.serialize(ctx)
  }
}
